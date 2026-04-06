// ============================================
// JSON Data – Project Costs Query
// ============================================
var projectCostsData = [
  {
    project: "2024/122c",
    category: "Consumables",
    total: 9000.0,
    y2026: 0.0,
    y2027: 2200.0,
    y2028: 2300.0,
    y2029: 2300.0,
    y2030: 2200.0,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    category: "Other Costs",
    total: 0.0,
    y2026: 0.0,
    y2027: 0.0,
    y2028: 0.0,
    y2029: 0.0,
    y2030: 0.0,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    category: "Overheads",
    total: 121001.16,
    y2026: 6958.18,
    y2027: 24161.91,
    y2028: 31534.54,
    y2029: 31534.54,
    y2030: 24161.91,
    y2031: 2650.08,
  },
  {
    project: "2024/122c",
    category: "Pay",
    total: 155527.56,
    y2026: 8929.73,
    y2027: 31056.75,
    y2028: 40537.91,
    y2029: 40537.91,
    y2030: 31056.75,
    y2031: 3408.51,
  },
  {
    project: "2024/122c",
    category: "Sub-contracts",
    total: 1000.0,
    y2026: 1000.0,
    y2027: 0.0,
    y2028: 0.0,
    y2029: 0.0,
    y2030: 0.0,
    y2031: 0.0,
  },
  {
    project: "2024/122c",
    category: "Travel",
    total: 2000.0,
    y2026: 0.0,
    y2027: 400.0,
    y2028: 400.0,
    y2029: 400.0,
    y2030: 400.0,
    y2031: 400.0,
  },
];

// ============================================
// Column definitions – keeps rendering generic
// ============================================
var pcqColumns = [
  { key: "project", label: "Project", type: "string" },
  { key: "category", label: "Category", type: "string" },
  { key: "total", label: "Total", type: "currency" },
  { key: "y2026", label: "2026", type: "currency" },
  { key: "y2027", label: "2027", type: "currency" },
  { key: "y2028", label: "2028", type: "currency" },
  { key: "y2029", label: "2029", type: "currency" },
  { key: "y2030", label: "2030", type: "currency" },
  { key: "y2031", label: "2031", type: "currency" },
];

// ============================================
// State
// ============================================
var pcqCurrentPage = 1;
var pcqRecordsPerPage = 5;
var pcqSortColumn = null;
var pcqSortDirection = "asc";
var pcqDisplayData = projectCostsData.slice();

// ============================================
// Helpers
// ============================================
function pcqFormatCurrency(value) {
  if (value === 0) return "\u00A30.00";
  return "\u00A3" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ============================================
// Build <thead> from column definitions
// ============================================
function pcqRenderHeader() {
  var thead = document.querySelector("#projectCostsTable thead");
  thead.innerHTML = "";
  var tr = document.createElement("tr");

  for (var i = 0; i < pcqColumns.length; i++) {
    var col = pcqColumns[i];
    var th = document.createElement("th");
    th.className =
      "govuk-table__header tab-font" +
      (col.type === "currency" ? " govuk-table__header--numeric" : "");
    th.setAttribute("data-column", i);
    th.setAttribute("data-type", col.type);
    th.setAttribute("aria-sort", "none");
    th.innerHTML = col.label + ' <span class="sort-indicator"></span>';
    tr.appendChild(th);
  }

  thead.appendChild(tr);
}

// ============================================
// Render table rows for current page
// ============================================
function pcqRenderTable() {
  var tbody = document.getElementById("projectCostsTableBody");
  tbody.innerHTML = "";

  var start = (pcqCurrentPage - 1) * pcqRecordsPerPage;
  var end = Math.min(start + pcqRecordsPerPage, pcqDisplayData.length);

  for (var i = start; i < end; i++) {
    var row = pcqDisplayData[i];
    var tr = document.createElement("tr");
    tr.className = "govuk-table__row";

    for (var c = 0; c < pcqColumns.length; c++) {
      var col = pcqColumns[c];
      var td = document.createElement("td");
      td.className =
        "govuk-table__cell tab-font-size" +
        (col.type === "currency" ? " govuk-table__cell--numeric" : "");

      if (col.type === "currency") {
        td.textContent = pcqFormatCurrency(row[col.key]);
      } else {
        td.textContent = row[col.key];
      }
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  // Update record count in footer bar
  pcqUpdateRecordCount();
}

// ============================================
// Record count bar
// ============================================
function pcqUpdateRecordCount() {
  var el = document.getElementById("pcqRecordCount");
  if (el) {
    var total = pcqDisplayData.length;
    var start = (pcqCurrentPage - 1) * pcqRecordsPerPage + 1;
    var end = Math.min(pcqCurrentPage * pcqRecordsPerPage, total);
    el.textContent = start + "-" + end + " of " + total;
  }
}

// ============================================
// Pagination
// ============================================
function pcqGetTotalPages() {
  return Math.ceil(pcqDisplayData.length / pcqRecordsPerPage);
}

function pcqRenderPagination() {
  var totalPages = pcqGetTotalPages();
  var ul = document.getElementById("pcqPagination");
  ul.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__item" + (pcqCurrentPage === 1 ? " disabled" : "");
  prevLi.setAttribute("aria-disabled", pcqCurrentPage === 1 ? "true" : "false");
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  prevA.setAttribute("onclick", "pcqGoToPage(" + (pcqCurrentPage - 1) + ")");
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
        (pageNum === pcqCurrentPage ? " govuk-pagination__item--current" : "");
      li.setAttribute("aria-disabled", "true");
      var a = document.createElement("a");
      a.className = "govuk-link govuk-pagination__link";
      a.setAttribute("onclick", "pcqGoToPage(" + pageNum + ")");
      a.textContent = pageNum;
      li.appendChild(a);
      ul.appendChild(li);
    })(p);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__next" +
    (pcqCurrentPage === totalPages ? " disabled" : "");
  nextLi.setAttribute(
    "aria-disabled",
    pcqCurrentPage === totalPages ? "true" : "false",
  );
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  nextA.setAttribute("onclick", "pcqGoToPage(" + (pcqCurrentPage + 1) + ")");
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next</span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>';
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

function pcqGoToPage(page) {
  var totalPages = pcqGetTotalPages();
  if (page < 1 || page > totalPages) return;
  pcqCurrentPage = page;
  pcqRenderTable();
  pcqRenderPagination();
}

// ============================================
// Sorting
// ============================================
function pcqSortTable(colIndex) {
  var key = pcqColumns[colIndex].key;
  if (pcqSortColumn === colIndex) {
    pcqSortDirection = pcqSortDirection === "asc" ? "desc" : "asc";
  } else {
    pcqSortColumn = colIndex;
    pcqSortDirection = "asc";
  }

  pcqDisplayData.sort(function (a, b) {
    var valA = a[key];
    var valB = b[key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      if (valA < valB) return pcqSortDirection === "asc" ? -1 : 1;
      if (valA > valB) return pcqSortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return pcqSortDirection === "asc" ? valA - valB : valB - valA;
  });

  // Update sort indicators on all headers
  var headers = document.querySelectorAll(
    "#projectCostsTable thead th[data-column]",
  );
  headers.forEach(function (th) {
    var indicator = th.querySelector(".sort-indicator");
    if (parseInt(th.getAttribute("data-column")) === colIndex) {
      th.setAttribute(
        "aria-sort",
        pcqSortDirection === "asc" ? "ascending" : "descending",
      );
      indicator.textContent =
        pcqSortDirection === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });

  pcqCurrentPage = 1;
  pcqRenderTable();
  pcqRenderPagination();
}

// ============================================
// Initialise
// ============================================
function initProjectCostsQuery() {
  // Build header from column definitions
  pcqRenderHeader();

  // Read records-per-page
  var rppEl = document.getElementById("pcqRecordsPerPage");
  if (rppEl) {
    pcqRecordsPerPage = parseInt(rppEl.value);
  }

  // Attach sort handlers
  document
    .querySelectorAll("#projectCostsTable thead th[data-column]")
    .forEach(function (th) {
      th.addEventListener("click", function () {
        pcqSortTable(parseInt(this.getAttribute("data-column")));
      });
    });

  // Records-per-page change
  if (rppEl) {
    rppEl.addEventListener("change", function () {
      pcqRecordsPerPage = parseInt(this.value);
      pcqCurrentPage = 1;
      pcqRenderTable();
      pcqRenderPagination();
    });
  }

  // Initial render
  pcqRenderTable();
  pcqRenderPagination();
}

// Run init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectCostsQuery);
} else {
  initProjectCostsQuery();
}
