// ============================================
// JSON Data
// ============================================
var summaryData = [
  {
    financialYear: "2026/2027",
    additionalCosts: 1000.0,
    staffCosts: 15887.91,
    testCosts: 121.0,
    animalCosts: 123.0,
    totalYearCosts: 17131.91,
  },
  {
    financialYear: "2027/2028",
    additionalCosts: 2600.0,
    staffCosts: 55218.66,
    testCosts: 250.0,
    animalCosts: 180.0,
    totalYearCosts: 58248.66,
  },
  {
    financialYear: "2028/2029",
    additionalCosts: 2700.0,
    staffCosts: 72072.45,
    testCosts: 475.0,
    animalCosts: 310.0,
    totalYearCosts: 75557.45,
  },
  {
    financialYear: "2029/2030",
    additionalCosts: 2700.0,
    staffCosts: 72072.45,
    testCosts: 390.0,
    animalCosts: 275.0,
    totalYearCosts: 75437.45,
  },
  {
    financialYear: "2030/2031",
    additionalCosts: 2600.0,
    staffCosts: 55218.66,
    testCosts: 200.0,
    animalCosts: 150.0,
    totalYearCosts: 58168.66,
  },
  {
    financialYear: "2031/2032",
    additionalCosts: 400.0,
    staffCosts: 6058.59,
    testCosts: 85.0,
    animalCosts: 60.0,
    totalYearCosts: 6603.59,
  },
  {
    financialYear: "2026/2027",
    additionalCosts: 1000.0,
    staffCosts: 15887.91,
    testCosts: 95.0,
    animalCosts: 70.0,
    totalYearCosts: 17052.91,
  },
  {
    financialYear: "2027/2028",
    additionalCosts: 2600.0,
    staffCosts: 55218.66,
    testCosts: 175.0,
    animalCosts: 130.0,
    totalYearCosts: 58123.66,
  },
  {
    financialYear: "2028/2029",
    additionalCosts: 2700.0,
    staffCosts: 72072.45,
    testCosts: 320.0,
    animalCosts: 215.0,
    totalYearCosts: 75307.45,
  },
  {
    financialYear: "2029/2030",
    additionalCosts: 2700.0,
    staffCosts: 72072.45,
    testCosts: 340.0,
    animalCosts: 240.0,
    totalYearCosts: 75352.45,
  },
];

var summaryTotals = {
  totalAdditionalCosts: 21000.0,
  totalStaffCosts: 491780.19,
  totalTestCosts: 2451.0,
  totalAnimalCosts: 1753.0,
  totalCosts: 516984.19,
  inclProfit: 339445.55,
};

// ============================================
// State
// ============================================
var currentPage = 1;
var recordsPerPage = 5;
var sortColumn = null;
var sortDirection = "asc";
var displayData = summaryData.slice();

// ============================================
// Format currency
// ============================================
function formatCurrency(value) {
  return "\u00A3" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ============================================
// Render table rows for current page
// ============================================
function renderTable() {
  var tbody = document.getElementById("summaryTableBody");
  tbody.innerHTML = "";
  var start = (currentPage - 1) * recordsPerPage;
  var end = Math.min(start + recordsPerPage, displayData.length);

  for (var i = start; i < end; i++) {
    var row = displayData[i];
    var tr = document.createElement("tr");
    tr.className = "govuk-table__row";
    tr.innerHTML =
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      row.financialYear +
      "</td>" +
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      formatCurrency(row.additionalCosts) +
      "</td>" +
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      formatCurrency(row.staffCosts) +
      "</td>" +
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      formatCurrency(row.testCosts) +
      "</td>" +
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      formatCurrency(row.animalCosts) +
      "</td>" +
      '<td class="govuk-table__cell govuk-table__cell--numeric tab-font-size">' +
      formatCurrency(row.totalYearCosts) +
      "</td>";
    tbody.appendChild(tr);
  }
}

// ============================================
// Render footer totals from JSON
// ============================================
function renderFooterTotals() {
  var fields = {
    "total-additional-costs": summaryTotals.totalAdditionalCosts,
    "total-staff-costs": summaryTotals.totalStaffCosts,
    "total-test-costs": summaryTotals.totalTestCosts,
    "total-animal-costs": summaryTotals.totalAnimalCosts,
    "total-costs": summaryTotals.totalCosts,
    "incl-profit": summaryTotals.inclProfit,
  };
  for (var id in fields) {
    var value = formatCurrency(fields[id]);
    var el = document.getElementById(id);
    if (el) el.value = value;
    var elBtm = document.getElementById(id + "-btm");
    if (elBtm) elBtm.value = value;
  }
}

// ============================================
// Pagination
// ============================================
function getTotalPages() {
  return Math.ceil(displayData.length / recordsPerPage);
}

function renderPagination() {
  var totalPages = getTotalPages();
  var ul = document.getElementById("pagination");
  ul.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__item" + (currentPage === 1 ? " disabled" : "");
  prevLi.setAttribute("aria-disabled", currentPage === 1 ? "true" : "false");
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  prevA.setAttribute("onclick", "goToPage(" + (currentPage - 1) + ")");
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
        (pageNum === currentPage ? " govuk-pagination__item--current" : "");
      li.setAttribute("aria-disabled", "true");
      var a = document.createElement("a");
      a.className = "govuk-link govuk-pagination__link";
      a.setAttribute("onclick", "goToPage(" + pageNum + ")");
      a.textContent = pageNum;
      li.appendChild(a);
      ul.appendChild(li);
    })(p);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__next" + (currentPage === totalPages ? " disabled" : "");
  nextLi.setAttribute(
    "aria-disabled",
    currentPage === totalPages ? "true" : "false",
  );
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  nextA.setAttribute("onclick", "goToPage(" + (currentPage + 1) + ")");
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next</span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>';
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

function goToPage(page) {
  var totalPages = getTotalPages();
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  renderPagination();
}

// ============================================
// Sorting
// ============================================
var columnKeys = [
  "financialYear",
  "additionalCosts",
  "staffCosts",
  "testCosts",
  "animalCosts",
  "totalYearCosts",
];

function sortTable(colIndex) {
  var key = columnKeys[colIndex];
  if (sortColumn === colIndex) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = colIndex;
    sortDirection = "asc";
  }

  displayData.sort(function (a, b) {
    var valA = a[key];
    var valB = b[key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return sortDirection === "asc" ? valA - valB : valB - valA;
  });

  // Update sort indicators
  var headers = document.querySelectorAll(
    "#summaryTable thead th[data-column]",
  );
  headers.forEach(function (th) {
    var indicator = th.querySelector(".sort-indicator");
    if (parseInt(th.getAttribute("data-column")) === colIndex) {
      th.setAttribute(
        "aria-sort",
        sortDirection === "asc" ? "ascending" : "descending",
      );
      indicator.textContent = sortDirection === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });

  currentPage = 1;
  renderTable();
  renderPagination();
}

// ============================================
// Initialise
// ============================================
function initSummaryPage() {
  // Read the selected records-per-page value from the dropdown
  var rppEl = document.getElementById("recordsPerPage");
  if (rppEl) {
    recordsPerPage = parseInt(rppEl.value);
  }

  // Attach click handlers to sortable headers
  document
    .querySelectorAll("#summaryTable thead th[data-column]")
    .forEach(function (th) {
      th.style.cursor = "pointer";
      th.addEventListener("click", function () {
        sortTable(parseInt(this.getAttribute("data-column")));
      });
    });

  // Records per page change
  if (rppEl) {
    rppEl.addEventListener("change", function () {
      recordsPerPage = parseInt(this.value);
      currentPage = 1;
      renderTable();
      renderPagination();
    });
  }

  // Initial render
  renderTable();
  renderFooterTotals();
  renderPagination();
}

// Run init immediately if DOM is already ready, otherwise wait
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSummaryPage);
} else {
  initSummaryPage();
}
