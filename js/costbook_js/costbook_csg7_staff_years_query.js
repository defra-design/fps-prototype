// ============================================
// JSON Data – CSG7 Staff Years Query
// Values represent staff years (decimal numbers)
// ============================================
var csg7Data = [
  {
    project: "2024/122c",
    grade: "A",
    total: 0.01,
    y2026: 0.01,
    y2027: 0.0,
    y2028: 0.0,
    y2029: 0.0,
    y2030: 0.0,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    grade: "B",
    total: 0.02,
    y2026: 0.0,
    y2027: 0.0,
    y2028: 0.0,
    y2029: 0.0,
    y2030: 0.02,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    grade: "C",
    total: 1.01,
    y2026: 0.09,
    y2027: 0.2,
    y2028: 0.25,
    y2029: 0.25,
    y2030: 0.2,
    y2031: 0.02,
  },
  {
    project: "2024/122c",
    grade: "D",
    total: 0.75,
    y2026: 0.0,
    y2027: 0.16,
    y2028: 0.22,
    y2029: 0.22,
    y2030: 0.15,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    grade: "E",
    total: 0.25,
    y2026: 0.0,
    y2027: 0.05,
    y2028: 0.07,
    y2029: 0.07,
    y2030: 0.06,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    grade: "F",
    total: 0.0,
    y2026: 0.0,
    y2027: 0.0,
    y2028: 0.0,
    y2029: 0.0,
    y2030: 0.0,
    y2031: 0.0,
  },
];

// ============================================
// Column definitions
// ============================================
var csg7Columns = [
  { key: "project", label: "Project", type: "string" },
  { key: "grade", label: "Grade", type: "string" },
  { key: "total", label: "Total", type: "decimal" },
  { key: "y2026", label: "2026", type: "decimal" },
  { key: "y2027", label: "2027", type: "decimal" },
  { key: "y2028", label: "2028", type: "decimal" },
  { key: "y2029", label: "2029", type: "decimal" },
  { key: "y2030", label: "2030", type: "decimal" },
  { key: "y2031", label: "2031", type: "decimal" },
];

// ============================================
// State
// ============================================
var csg7CurrentPage = 1;
var csg7RecordsPerPage = 5;
var csg7SortColumn = null;
var csg7SortDirection = "asc";
var csg7DisplayData = csg7Data.slice();

// ============================================
// Helpers
// ============================================
function csg7FormatDecimal(value) {
  return value.toFixed(2);
}

// ============================================
// Build <thead> from column definitions
// ============================================
function csg7RenderHeader() {
  var thead = document.querySelector("#csg7Table thead");
  thead.innerHTML = "";
  var tr = document.createElement("tr");

  for (var i = 0; i < csg7Columns.length; i++) {
    var col = csg7Columns[i];
    var th = document.createElement("th");
    th.className =
      "govuk-table__header tab-font" +
      (col.type !== "string" ? " govuk-table__header--numeric" : "");
    th.setAttribute("data-column", i);
    th.setAttribute("data-type", col.type);
    th.setAttribute("aria-sort", "none");
    th.innerHTML = col.label + ' <span class="csg7-sort-indicator"></span>';
    tr.appendChild(th);
  }

  thead.appendChild(tr);
}

// ============================================
// Render table rows for current page
// ============================================
function csg7RenderTable() {
  var tbody = document.getElementById("csg7TableBody");
  tbody.innerHTML = "";

  var start = (csg7CurrentPage - 1) * csg7RecordsPerPage;
  var end = Math.min(start + csg7RecordsPerPage, csg7DisplayData.length);

  for (var i = start; i < end; i++) {
    var row = csg7DisplayData[i];
    var tr = document.createElement("tr");
    tr.className = "govuk-table__row";

    for (var c = 0; c < csg7Columns.length; c++) {
      var col = csg7Columns[c];
      var td = document.createElement("td");
      td.className =
        "govuk-table__cell tab-font-size" +
        (col.type !== "string" ? " govuk-table__cell--numeric" : "");

      if (col.type === "decimal") {
        td.textContent = csg7FormatDecimal(row[col.key]);
      } else {
        td.textContent = row[col.key];
      }
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  csg7UpdateRecordCount();
}

// ============================================
// Record count bar
// ============================================
function csg7UpdateRecordCount() {
  var el = document.getElementById("csg7RecordCount");
  if (el) {
    var total = csg7DisplayData.length;
    var start = (csg7CurrentPage - 1) * csg7RecordsPerPage + 1;
    var end = Math.min(csg7CurrentPage * csg7RecordsPerPage, total);
    el.textContent = start + "-" + end + " of " + total;
  }
}

// ============================================
// Pagination
// ============================================
function csg7GetTotalPages() {
  return Math.ceil(csg7DisplayData.length / csg7RecordsPerPage);
}

function csg7RenderPagination() {
  var totalPages = csg7GetTotalPages();
  var ul = document.getElementById("csg7Pagination");
  ul.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__item" + (csg7CurrentPage === 1 ? " disabled" : "");
  prevLi.setAttribute(
    "aria-disabled",
    csg7CurrentPage === 1 ? "true" : "false",
  );
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  prevA.setAttribute("onclick", "csg7GoToPage(" + (csg7CurrentPage - 1) + ")");
  prevA.innerHTML =
    '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>' +
    '<span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>';
  prevLi.appendChild(prevA);
  ul.appendChild(prevLi);

  // Page numbers
  for (var p = 1; p <= totalPages; p++) {
    (function (pageNum) {
      var li = document.createElement("li");
      li.className =
        "govuk-pagination__item" +
        (pageNum === csg7CurrentPage ? " govuk-pagination__item--current" : "");
      li.setAttribute("aria-disabled", "true");
      var a = document.createElement("a");
      a.className = "govuk-link govuk-pagination__link";
      a.setAttribute("onclick", "csg7GoToPage(" + pageNum + ")");
      a.textContent = pageNum;
      li.appendChild(a);
      ul.appendChild(li);
    })(p);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__next" +
    (csg7CurrentPage === totalPages ? " disabled" : "");
  nextLi.setAttribute(
    "aria-disabled",
    csg7CurrentPage === totalPages ? "true" : "false",
  );
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  nextA.setAttribute("onclick", "csg7GoToPage(" + (csg7CurrentPage + 1) + ")");
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next</span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>';
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

function csg7GoToPage(page) {
  var totalPages = csg7GetTotalPages();
  if (page < 1 || page > totalPages) return;
  csg7CurrentPage = page;
  csg7RenderTable();
  csg7RenderPagination();
}

// ============================================
// Sorting
// ============================================
function csg7SortTable(colIndex) {
  var key = csg7Columns[colIndex].key;
  if (csg7SortColumn === colIndex) {
    csg7SortDirection = csg7SortDirection === "asc" ? "desc" : "asc";
  } else {
    csg7SortColumn = colIndex;
    csg7SortDirection = "asc";
  }

  csg7DisplayData.sort(function (a, b) {
    var valA = a[key];
    var valB = b[key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      if (valA < valB) return csg7SortDirection === "asc" ? -1 : 1;
      if (valA > valB) return csg7SortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return csg7SortDirection === "asc" ? valA - valB : valB - valA;
  });

  // Update sort indicators
  var headers = document.querySelectorAll("#csg7Table thead th[data-column]");
  headers.forEach(function (th) {
    var indicator = th.querySelector(".csg7-sort-indicator");
    if (parseInt(th.getAttribute("data-column")) === colIndex) {
      th.setAttribute(
        "aria-sort",
        csg7SortDirection === "asc" ? "ascending" : "descending",
      );
      indicator.textContent =
        csg7SortDirection === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });

  csg7CurrentPage = 1;
  csg7RenderTable();
  csg7RenderPagination();
}

// ============================================
// Initialise
// ============================================
function initCsg7() {
  // Build header from column definitions
  csg7RenderHeader();

  // Read records-per-page
  var rppEl = document.getElementById("csg7RecordsPerPage");
  if (rppEl) {
    csg7RecordsPerPage = parseInt(rppEl.value);
  }

  // Attach sort handlers
  document
    .querySelectorAll("#csg7Table thead th[data-column]")
    .forEach(function (th) {
      th.addEventListener("click", function () {
        csg7SortTable(parseInt(this.getAttribute("data-column")));
      });
    });

  // Records-per-page change
  if (rppEl) {
    rppEl.addEventListener("change", function () {
      csg7RecordsPerPage = parseInt(this.value);
      csg7CurrentPage = 1;
      csg7RenderTable();
      csg7RenderPagination();
    });
  }

  // Initial render
  csg7RenderTable();
  csg7RenderPagination();
}

// Run init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCsg7);
} else {
  initCsg7();
}
