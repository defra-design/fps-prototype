// ============================================
// JSON Data – Summary Staff Effort Query
// Values represent staff effort (decimal days/hours)
// ============================================
var sseData = [
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "A",
    name: "App admin",
    total: 6.2,
    y2026: 1.9,
    y2027: 0.8,
    y2028: 1.2,
    y2029: 1.1,
    y2030: 0.7,
    y2031: 0.5,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "C",
    name: "NACWO/NVS",
    total: 11.4,
    y2026: 1.3,
    y2027: 1.9,
    y2028: 2.9,
    y2029: 2.9,
    y2030: 1.3,
    y2031: 1.1,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "C",
    name: "NACWO/NVS D",
    total: 8.4,
    y2026: 0.9,
    y2027: 1.5,
    y2028: 2.1,
    y2029: 1.6,
    y2030: 0.4,
    y2031: 1.9,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "D",
    name: "husbandry",
    total: 41.4,
    y2026: 2.3,
    y2027: 7.5,
    y2028: 11.1,
    y2029: 11.1,
    y2030: 7.5,
    y2031: 3.8,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "D",
    name: "NACWO/NVS",
    total: 10.6,
    y2026: 1.9,
    y2027: 2.9,
    y2028: 1.8,
    y2029: 2.9,
    y2030: 1.1,
    y2031: 1.0,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "D",
    name: "NACWO/NVS c",
    total: 5.4,
    y2026: 0.6,
    y2027: 1.2,
    y2028: 1.4,
    y2029: 0.9,
    y2030: 0.5,
    y2031: 0.8,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "E",
    name: "husbandry",
    total: 45.7,
    y2026: 2.1,
    y2027: 7.5,
    y2028: 11.1,
    y2029: 11.1,
    y2030: 9.7,
    y2031: 4.2,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "E",
    name: "Procedural",
    total: 10.8,
    y2026: 0.8,
    y2027: 1.7,
    y2028: 2.5,
    y2029: 2.5,
    y2030: 2.4,
    y2031: 0.9,
  },
  {
    project: "2024/122c",
    workGroup: "AS2",
    gradeCode: "F",
    name: "App admin",
    total: 2.1,
    y2026: 0.3,
    y2027: 0.4,
    y2028: 0.5,
    y2029: 0.4,
    y2030: 0.3,
    y2031: 0.2,
  },
  {
    project: "2024/122c",
    workGroup: "SSP1",
    gradeCode: "E",
    name: "",
    total: 6.9,
    y2026: 0.8,
    y2027: 1.4,
    y2028: 1.7,
    y2029: 1.5,
    y2030: 0.8,
    y2031: 0.7,
  },
  {
    project: "2024/122c",
    workGroup: "SSP1",
    gradeCode: "E",
    name: "CAPS",
    total: 9.0,
    y2026: 0.8,
    y2027: 1.9,
    y2028: 2.1,
    y2029: 1.9,
    y2030: 1.5,
    y2031: 0.8,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "C",
    name: "Boniface, Blake",
    total: 6.7,
    y2026: 0.9,
    y2027: 1.4,
    y2028: 1.8,
    y2029: 1.5,
    y2030: 0.7,
    y2031: 0.4,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "C",
    name: "Deerness, Mari",
    total: 14.2,
    y2026: 1.2,
    y2027: 2.8,
    y2028: 3.9,
    y2029: 3.5,
    y2030: 2.1,
    y2031: 0.7,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "C",
    name: "Downage, Nat",
    total: 33.7,
    y2026: 2.8,
    y2027: 6.9,
    y2028: 10.4,
    y2029: 10.4,
    y2030: 2.0,
    y2031: 1.2,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "C",
    name: "Fletcher, Sam",
    total: 8.1,
    y2026: 0.7,
    y2027: 1.3,
    y2028: 2.5,
    y2029: 2.3,
    y2030: 0.7,
    y2031: 0.6,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "C",
    name: "Gordon, Pat",
    total: 12.5,
    y2026: 1.1,
    y2027: 2.1,
    y2028: 3.5,
    y2029: 3.6,
    y2030: 1.5,
    y2031: 0.7,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "D",
    name: "Harrison, Jo",
    total: 17.9,
    y2026: 1.3,
    y2027: 3.4,
    y2028: 5.1,
    y2029: 5.2,
    y2030: 1.4,
    y2031: 1.5,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "D",
    name: "Irving, Les",
    total: 12.4,
    y2026: 0.9,
    y2027: 2.3,
    y2028: 3.9,
    y2029: 3.5,
    y2030: 0.9,
    y2031: 0.9,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "E",
    name: "Jones, Kim",
    total: 10.2,
    y2026: 1.1,
    y2027: 1.6,
    y2028: 3.2,
    y2029: 2.9,
    y2030: 0.8,
    y2031: 0.6,
  },
  {
    project: "2024/122c",
    workGroup: "VI1",
    gradeCode: "E",
    name: "King, Robin",
    total: 6.6,
    y2026: 0.4,
    y2027: 1.5,
    y2028: 1.9,
    y2029: 1.8,
    y2030: 0.6,
    y2031: 0.4,
  },
  {
    project: "2024/122c",
    workGroup: "VI2",
    gradeCode: "C",
    name: "Lambert, Chris",
    total: 14.8,
    y2026: 1.0,
    y2027: 2.8,
    y2028: 4.9,
    y2029: 4.2,
    y2030: 0.6,
    y2031: 1.3,
  },
  {
    project: "2024/122c",
    workGroup: "VI2",
    gradeCode: "D",
    name: "Morris, Dean",
    total: 10.1,
    y2026: 0.7,
    y2027: 1.8,
    y2028: 3.4,
    y2029: 2.9,
    y2030: 0.5,
    y2031: 0.8,
  },
  {
    project: "2024/122c",
    workGroup: "VI2",
    gradeCode: "D",
    name: "Norris, Faye",
    total: 8.2,
    y2026: 0.5,
    y2027: 1.4,
    y2028: 2.7,
    y2029: 2.5,
    y2030: 0.6,
    y2031: 0.5,
  },
  {
    project: "2024/122c",
    workGroup: "VI2",
    gradeCode: "E",
    name: "Owen, Grace",
    total: 6.3,
    y2026: 0.7,
    y2027: 0.9,
    y2028: 1.9,
    y2029: 1.8,
    y2030: 0.7,
    y2031: 0.3,
  },
  {
    project: "2024/122c",
    workGroup: "VI2",
    gradeCode: "F",
    name: "Parker, Hugh",
    total: 3.8,
    y2026: 0.2,
    y2027: 0.5,
    y2028: 1.1,
    y2029: 1.0,
    y2030: 0.6,
    y2031: 0.4,
  },
];

// ============================================
// Column definitions
// ============================================
var sseColumns = [
  { key: "project", label: "Project", type: "string" },
  { key: "workGroup", label: "WorkGroup", type: "string" },
  { key: "gradeCode", label: "GradeCode", type: "string" },
  { key: "name", label: "Name", type: "string" },
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
var sseCurrentPage = 1;
var sseRecordsPerPage = 5;
var sseSortColumn = null;
var sseSortDirection = "asc";
var sseDisplayData = sseData.slice();

// ============================================
// Helpers
// ============================================
function sseFormatDecimal(value) {
  if (value === 0) return "";
  return value.toFixed(1);
}

// ============================================
// Build <thead> from column definitions
// ============================================
function sseRenderHeader() {
  var thead = document.querySelector("#sseTable thead");
  thead.innerHTML = "";
  var tr = document.createElement("tr");

  for (var i = 0; i < sseColumns.length; i++) {
    var col = sseColumns[i];
    var th = document.createElement("th");
    th.className =
      "govuk-table__header tab-font" +
      (col.type !== "string" ? " govuk-table__header--numeric" : "");
    th.setAttribute("data-column", i);
    th.setAttribute("data-type", col.type);
    th.setAttribute("aria-sort", "none");
    th.innerHTML = col.label + ' <span class="sse-sort-indicator"></span>';
    tr.appendChild(th);
  }

  thead.appendChild(tr);
}

// ============================================
// Render table rows for current page
// ============================================
function sseRenderTable() {
  var tbody = document.getElementById("sseTableBody");
  tbody.innerHTML = "";

  var start = (sseCurrentPage - 1) * sseRecordsPerPage;
  var end = Math.min(start + sseRecordsPerPage, sseDisplayData.length);

  for (var i = start; i < end; i++) {
    var row = sseDisplayData[i];
    var tr = document.createElement("tr");
    tr.className = "govuk-table__row";

    for (var c = 0; c < sseColumns.length; c++) {
      var col = sseColumns[c];
      var td = document.createElement("td");
      td.className =
        "govuk-table__cell tab-font-size" +
        (col.type !== "string" ? " govuk-table__cell--numeric" : "");

      if (col.type === "decimal") {
        td.textContent = sseFormatDecimal(row[col.key]);
      } else {
        td.textContent = row[col.key];
      }
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  sseUpdateRecordCount();
}

// ============================================
// Record count bar
// ============================================
function sseUpdateRecordCount() {
  var el = document.getElementById("sseRecordCount");
  if (el) {
    var total = sseDisplayData.length;
    var start = (sseCurrentPage - 1) * sseRecordsPerPage + 1;
    var end = Math.min(sseCurrentPage * sseRecordsPerPage, total);
    el.textContent = start + "-" + end + " of " + total;
  }
}

// ============================================
// Pagination
// ============================================
function sseGetTotalPages() {
  return Math.ceil(sseDisplayData.length / sseRecordsPerPage);
}

function sseRenderPagination() {
  var totalPages = sseGetTotalPages();
  var ul = document.getElementById("ssePagination");
  ul.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__item" + (sseCurrentPage === 1 ? " disabled" : "");
  prevLi.setAttribute("aria-disabled", sseCurrentPage === 1 ? "true" : "false");
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  prevA.setAttribute("onclick", "sseGoToPage(" + (sseCurrentPage - 1) + ")");
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
        (pageNum === sseCurrentPage ? " govuk-pagination__item--current" : "");
      li.setAttribute("aria-disabled", "true");
      var a = document.createElement("a");
      a.className = "govuk-link govuk-pagination__link";
      a.setAttribute("onclick", "sseGoToPage(" + pageNum + ")");
      a.textContent = pageNum;
      li.appendChild(a);
      ul.appendChild(li);
    })(p);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__next" +
    (sseCurrentPage === totalPages ? " disabled" : "");
  nextLi.setAttribute(
    "aria-disabled",
    sseCurrentPage === totalPages ? "true" : "false",
  );
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  nextA.setAttribute("onclick", "sseGoToPage(" + (sseCurrentPage + 1) + ")");
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next</span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>';
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

function sseGoToPage(page) {
  var totalPages = sseGetTotalPages();
  if (page < 1 || page > totalPages) return;
  sseCurrentPage = page;
  sseRenderTable();
  sseRenderPagination();
}

// ============================================
// Sorting
// ============================================
function sseSortTable(colIndex) {
  var key = sseColumns[colIndex].key;
  if (sseSortColumn === colIndex) {
    sseSortDirection = sseSortDirection === "asc" ? "desc" : "asc";
  } else {
    sseSortColumn = colIndex;
    sseSortDirection = "asc";
  }

  sseDisplayData.sort(function (a, b) {
    var valA = a[key];
    var valB = b[key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      if (valA < valB) return sseSortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sseSortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return sseSortDirection === "asc" ? valA - valB : valB - valA;
  });

  // Update sort indicators
  var headers = document.querySelectorAll("#sseTable thead th[data-column]");
  headers.forEach(function (th) {
    var indicator = th.querySelector(".sse-sort-indicator");
    if (parseInt(th.getAttribute("data-column")) === colIndex) {
      th.setAttribute(
        "aria-sort",
        sseSortDirection === "asc" ? "ascending" : "descending",
      );
      indicator.textContent =
        sseSortDirection === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });

  sseCurrentPage = 1;
  sseRenderTable();
  sseRenderPagination();
}

// ============================================
// Initialise
// ============================================
function initSse() {
  sseRenderHeader();

  var rppEl = document.getElementById("sseRecordsPerPage");
  if (rppEl) {
    sseRecordsPerPage = parseInt(rppEl.value);
  }

  document
    .querySelectorAll("#sseTable thead th[data-column]")
    .forEach(function (th) {
      th.addEventListener("click", function () {
        sseSortTable(parseInt(this.getAttribute("data-column")));
      });
    });

  if (rppEl) {
    rppEl.addEventListener("change", function () {
      sseRecordsPerPage = parseInt(this.value);
      sseCurrentPage = 1;
      sseRenderTable();
      sseRenderPagination();
    });
  }

  sseRenderTable();
  sseRenderPagination();
}

// Run init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSse);
} else {
  initSse();
}
