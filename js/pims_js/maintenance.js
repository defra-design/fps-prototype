"use strict";

// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
var state = {
  maintenance: {
    data: [],
    filtered: [],
    currentPage: 1,
    rowsPerPage: 5,
    sortCol: null,
    sortDir: "asc",
  },
  groups: {
    data: [],
    filtered: [],
    currentPage: 1,
    rowsPerPage: 5,
    sortCol: null,
    sortDir: "asc",
  },
};

var selectedMaintenanceId = null;
var allGroups = [];
var reportGroupLinks = {};

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
function escapeHtml(str) {
  if (str === null || str === undefined || str === "") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getNextId(arr) {
  if (arr.length === 0) return 1;
  return (
    Math.max.apply(
      null,
      arr.map(function (r) {
        return r.id;
      }),
    ) + 1
  );
}

// ─────────────────────────────────────────────────────
// FALLBACK DATA — all records inline for file:// use
// ─────────────────────────────────────────────────────
var FALLBACK_DATA = {
  maintenanceList: [
    {
      id: 1,
      name: "rptAHWDGInvoicesForYear_Detail",
      description: "AHWDG Contracts for Year - Detail",
      reportHelp: "AHWDG Contracts for Financial Year",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 2,
      name: "qryAllContractsMonitoring",
      description: "All Contracts Query",
      reportHelp: "Export query for contracts monitoring data.",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 3,
      name: "rptAnnualandFinalReportHistory",
      description: "Annual & Final Report History",
      reportHelp: "Annual & Final report tracking for each of the years where",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 31,
    },
    {
      id: 4,
      name: "rptAnnualandFinalReportTracking",
      description: "Annual & Final Report Tracking",
      reportHelp: "Annual & Final Report Tracking for financial year",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 31,
    },
    {
      id: 5,
      name: "qryAnnualAndFinalReports_Exceptions",
      description: "Annual & Final Reports - Exceptions",
      reportHelp: "Shows those reports (Annual or Final) where the report",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 6,
      name: "qryAnnualAndFinalReports",
      description: "Annual & Final Reports",
      reportHelp: "Shows both Annual and Final reports across financial years",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 7,
      name: "rptAnnualReportSummary",
      description: "Annual Report Summary",
      reportHelp: "Summary of annual report data by programme",
      mailComment: "",
      mailTitle: "",
      emailable: true,
      order: 10,
    },
    {
      id: 8,
      name: "rptBudgetVarianceAnalysis",
      description: "Budget Variance Analysis",
      reportHelp: "Analysis of budget versus actual spend across projects",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 9,
      name: "rptContractExpenditureByMonth",
      description: "Contract Expenditure By Month",
      reportHelp:
        "Monthly breakdown of contract expenditure for each programme",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 10,
      name: "rptContractorHoursLog",
      description: "Contractor Hours Log",
      reportHelp: "Detailed log of contractor hours recorded against projects",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 11,
      name: "rptCostCentreAllocation",
      description: "Cost Centre Allocation",
      reportHelp: "Allocation of costs to individual cost centres per project",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 5,
    },
    {
      id: 12,
      name: "rptDeliverable_Milestones",
      description: "Deliverable Milestones",
      reportHelp: "Tracks milestones and deliverables for all active projects",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 13,
      name: "rptExceptionalCostsSummary",
      description: "Exceptional Costs Summary",
      reportHelp: "Summary of all exceptional costs for current financial year",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
    {
      id: 14,
      name: "rptExpenditureByProgramme",
      description: "Expenditure By Programme",
      reportHelp: "Total expenditure breakdown categorised by programme",
      mailComment: "",
      mailTitle: "",
      emailable: true,
      order: 20,
    },
    {
      id: 15,
      name: "rptFinalReportHistoryAll",
      description: "Final Report History - All",
      reportHelp: "Complete history of all final reports submitted",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: "",
    },
  ],
  reportGroupsList: [
    {
      id: 1,
      name: "EU",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 1,
    },
    {
      id: 2,
      name: "Annual & Final",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 2,
    },
    {
      id: 3,
      name: "Deliverables",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 3,
    },
    {
      id: 4,
      name: "Invoicing",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 4,
    },
    {
      id: 5,
      name: "Milestones",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 5,
    },
    {
      id: 6,
      name: "Programme & Project Monitoring",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 6,
    },
    {
      id: 7,
      name: "Surveilance Contracts",
      description: "",
      reportHelp: "",
      mailComment: "",
      mailTitle: "",
      emailable: false,
      order: 7,
    },
  ],
  reportGroupLinks: {
    1: [4],
    2: [6],
    3: [2],
    4: [2],
    5: [2],
    6: [2],
    7: [2, 6],
    8: [6],
    9: [4, 6],
    10: [4],
    11: [6],
    12: [3, 5],
    13: [6],
    14: [1, 6],
    15: [2],
  },
};

// ─────────────────────────────────────────────────────
// DATA LOAD
// ─────────────────────────────────────────────────────
function loadData() {
  initGrids(FALLBACK_DATA);
}

function initGrids(data) {
  state.maintenance.data = data.maintenanceList.slice();
  state.maintenance.filtered = data.maintenanceList.slice();
  allGroups = data.reportGroupsList.slice();
  reportGroupLinks = JSON.parse(JSON.stringify(data.reportGroupLinks || {}));

  renderTable("maintenance");
  renderPagination("maintenance");
  renderTable("groups"); // shows placeholder until a row is selected

  bindRowsPerPage("maintenanceRecordsPerPage", "maintenance");
  bindSortHeaders();
  bindAddButtons();
  bindModalButtons();
  bindMaintenanceRowClick();

  // Auto-select first row
  if (state.maintenance.filtered.length > 0) {
    selectMaintenanceRow(state.maintenance.filtered[0].id);
  }
}

// ─────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────
function initTabs() {
  var tabLinks = document.querySelectorAll(".ra-tabs .govuk-tabs__tab");
  if (!tabLinks.length) return;

  tabLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      activateTab(link);
    });
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateTab(link);
      }
    });
  });

  // Auto-activate the tab already marked selected in HTML
  var selectedLink = document.querySelector(
    ".ra-tabs .govuk-tabs__list-item--selected .govuk-tabs__tab",
  );
  if (selectedLink) activateTab(selectedLink);
}

function activateTab(link) {
  if (!link) return;
  document
    .querySelectorAll(".ra-tabs .govuk-tabs__list-item")
    .forEach(function (li) {
      li.classList.remove("govuk-tabs__list-item--selected");
    });
  document.querySelectorAll(".ra-tabs .govuk-tabs__tab").forEach(function (t) {
    t.setAttribute("aria-selected", "false");
    t.setAttribute("tabindex", "-1");
  });
  document
    .querySelectorAll(".ra-tabs .govuk-tabs__panel")
    .forEach(function (p) {
      p.classList.add("govuk-tabs__panel--hidden");
    });
  link
    .closest(".govuk-tabs__list-item")
    .classList.add("govuk-tabs__list-item--selected");
  link.setAttribute("aria-selected", "true");
  link.setAttribute("tabindex", "0");
  var targetId = link.getAttribute("href").replace("#", "");
  var panel = document.getElementById(targetId);
  if (panel) panel.classList.remove("govuk-tabs__panel--hidden");
}

// ─────────────────────────────────────────────────────
// RENDER TABLE
// ─────────────────────────────────────────────────────
function renderTable(tableKey) {
  var s = state[tableKey];
  var pageRows;
  if (tableKey === "groups") {
    pageRows = s.filtered.slice(); // show all rows, no paging
  } else {
    var start = (s.currentPage - 1) * s.rowsPerPage;
    var end = start + s.rowsPerPage;
    pageRows = s.filtered.slice(start, end);
  }

  var tbodyId =
    tableKey === "maintenance"
      ? "maintenanceTableBody"
      : "reportGroupsTableBody";
  var tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  if (pageRows.length === 0) {
    var emptyMsg =
      tableKey === "groups"
        ? !selectedMaintenanceId
          ? "Select a row in the Reports grid above to view linked groups."
          : "No groups linked. Use \u201c+ Add Group\u201d on the row to add one."
        : "No records found.";
    var emptySpan = tableKey === "groups" ? 2 : 8;
    tbody.innerHTML =
      '<tr class="govuk-table__row">' +
      '<td class="govuk-table__cell" colspan="' +
      emptySpan +
      '" style="text-align:center;color:#505a5f;">' +
      emptyMsg +
      "</td>" +
      "</tr>";
    updateRecordCount(tableKey);
    return;
  }

  var rows = pageRows.map(function (row) {
    var actionBtns =
      '<button type="button" class="action-btn edit-btn ra-btn-action ra-btn-edit" ' +
      'data-id="' +
      row.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Edit ' +
      escapeHtml(row.name) +
      '" style="border: none; background: #fff;">' +
      '<img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for selected record" class="editjobcode" width="20"></button> ' +
      '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete" ' +
      'data-id="' +
      row.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Delete ' +
      escapeHtml(row.name) +
      '" style="border: none; background: #fff;">' +
      '<img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record" width="20"></button>';

    var addGroupBtn =
      tableKey === "maintenance"
        ? ' <button type="button" class="govuk-button govuk-button--primary sup_margin_0 ra-btn-add-group" ' +
          'data-id="' +
          row.id +
          '" data-module="govuk-button" ' +
          'aria-label="Add Report Group for ' +
          escapeHtml(row.name) +
          '" ' +
          'style="font-size:12px;padding:3px 8px;margin-left:4px;">+ Add Group</button>'
        : "";

    if (tableKey === "groups") {
      var groupDeleteBtn =
        '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete" ' +
        'data-id="' +
        row.id +
        '" data-table="' +
        tableKey +
        '" ' +
        'aria-label="Delete ' +
        escapeHtml(row.name) +
        '" style="border: none; background: #fff;">' +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record" width="20"></button>';
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell">' +
        escapeHtml(row.name) +
        "</td>" +
        '<td class="govuk-table__cell ra-action-cell" style="text-align:center;">' +
        groupDeleteBtn +
        "</td>" +
        "</tr>"
      );
    }

    var emailCheck =
      '<input type="checkbox"' +
      (row.emailable ? " checked" : "") +
      ' aria-label="Email-able for ' +
      escapeHtml(row.name) +
      '" disabled />';
    var orderVal =
      row.order !== "" && row.order !== null && row.order !== undefined
        ? escapeHtml(row.order)
        : "";

    var maintRowClass =
      "govuk-table__row" +
      (row.id === selectedMaintenanceId ? " ra-row-selected" : "");
    return (
      '<tr class="' +
      maintRowClass +
      '" data-row-id="' +
      row.id +
      '" style="cursor:pointer">' +
      '<td class="govuk-table__cell">' +
      escapeHtml(row.name) +
      "</td>" +
      '<td class="govuk-table__cell">' +
      escapeHtml(row.description) +
      "</td>" +
      '<td class="govuk-table__cell">' +
      escapeHtml(row.reportHelp) +
      "</td>" +
      '<td class="govuk-table__cell">' +
      escapeHtml(row.mailComment) +
      "</td>" +
      '<td class="govuk-table__cell">' +
      escapeHtml(row.mailTitle) +
      "</td>" +
      '<td class="govuk-table__cell ra-cell-emailable">' +
      emailCheck +
      "</td>" +
      '<td class="govuk-table__cell ra-cell-order">' +
      orderVal +
      "</td>" +
      '<td class="govuk-table__cell">' +
      actionBtns +
      addGroupBtn +
      "</td>" +
      "</tr>"
    );
  });

  tbody.innerHTML = rows.join("");
  updateRecordCount(tableKey);
  bindActionButtons(tableKey);
}

function updateRecordCount(tableKey) {
  var s = state[tableKey];
  var countId =
    tableKey === "maintenance" ? "maintenanceRecordCount" : "groupsRecordCount";
  var el = document.getElementById(countId);
  if (!el) return;
  var total = s.filtered.length;
  var start = total === 0 ? 0 : (s.currentPage - 1) * s.rowsPerPage + 1;
  var end = Math.min(s.currentPage * s.rowsPerPage, total);
  el.textContent =
    "Showing " + start + " to " + end + " of " + total + " records";
}

// ─────────────────────────────────────────────────────
// PAGINATION — GOV.UK style with Prev/Next + page numbers
// ─────────────────────────────────────────────────────
function renderPagination(tableKey) {
  var s = state[tableKey];
  var totalPages = Math.ceil(s.filtered.length / s.rowsPerPage);
  var ulId =
    tableKey === "maintenance" ? "maintenancePagination" : "groupsPagination";
  var paginationUl = document.getElementById(ulId);
  if (!paginationUl) return;
  paginationUl.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__item" + (s.currentPage === 1 ? " disabled" : "");
  prevLi.setAttribute("aria-disabled", s.currentPage === 1);
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  (function (key) {
    prevA.onclick = function () {
      goToPage(key, s.currentPage - 1);
    };
  })(tableKey);
  prevA.innerHTML =
    '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>' +
    '<span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>';
  prevLi.appendChild(prevA);
  paginationUl.appendChild(prevLi);

  // Page numbers
  for (var i = 1; i <= totalPages; i++) {
    var pageLi = document.createElement("li");
    pageLi.className =
      "govuk-pagination__item" +
      (i === s.currentPage ? " govuk-pagination__item--current" : "");
    pageLi.setAttribute("aria-disabled", false);
    var pageA = document.createElement("a");
    pageA.className = "govuk-link govuk-pagination__link";
    (function (page, key) {
      pageA.onclick = function () {
        goToPage(key, page);
      };
    })(i, tableKey);
    pageA.textContent = i;
    pageLi.appendChild(pageA);
    paginationUl.appendChild(pageLi);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__item govuk-pagination__next" +
    (s.currentPage === totalPages ? " disabled" : "");
  nextLi.setAttribute("aria-disabled", s.currentPage === totalPages);
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  (function (key) {
    nextA.onclick = function () {
      goToPage(key, s.currentPage + 1);
    };
  })(tableKey);
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next</span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>';
  nextLi.appendChild(nextA);
  paginationUl.appendChild(nextLi);
}

function goToPage(tableKey, page) {
  var s = state[tableKey];
  var totalPages = Math.ceil(s.filtered.length / s.rowsPerPage);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  s.currentPage = page;
  renderTable(tableKey);
  renderPagination(tableKey);
}

// ─────────────────────────────────────────────────────
// ROWS PER PAGE
// ─────────────────────────────────────────────────────
function bindRowsPerPage(selectId, tableKey) {
  var sel = document.getElementById(selectId);
  if (!sel) return;
  sel.addEventListener("change", function () {
    state[tableKey].rowsPerPage = parseInt(sel.value, 10);
    state[tableKey].currentPage = 1;
    renderTable(tableKey);
    renderPagination(tableKey);
  });
}

// ─────────────────────────────────────────────────────
// MAINTENANCE ROW CLICK → load linked groups
// ─────────────────────────────────────────────────────
function bindMaintenanceRowClick() {
  var tbody = document.getElementById("maintenanceTableBody");
  if (!tbody) return;
  tbody.addEventListener("click", function (e) {
    if (e.target.closest(".action-btn, .ra-btn-add-group")) return;
    var tr = e.target.closest("tr[data-row-id]");
    if (!tr) return;
    selectMaintenanceRow(parseInt(tr.getAttribute("data-row-id"), 10));
  });
}

function selectMaintenanceRow(id) {
  selectedMaintenanceId = id;
  // Highlight selected row
  var tbody = document.getElementById("maintenanceTableBody");
  if (tbody) {
    tbody.querySelectorAll("tr[data-row-id]").forEach(function (tr) {
      tr.classList.remove("ra-row-selected");
    });
    var sel = tbody.querySelector('tr[data-row-id="' + id + '"]');
    if (sel) sel.classList.add("ra-row-selected");
  }
  // Update groups section label
  var mRecord = null;
  for (var k = 0; k < state.maintenance.data.length; k++) {
    if (state.maintenance.data[k].id === id) {
      mRecord = state.maintenance.data[k];
      break;
    }
  }
  var lbl = document.getElementById("reportGroupsLabel");
  if (lbl && mRecord) lbl.textContent = "Report Groups for: " + mRecord.name;
  refreshGroupsGrid();
}

function refreshGroupsGrid() {
  var linkIds = selectedMaintenanceId
    ? reportGroupLinks[selectedMaintenanceId] || []
    : [];
  state.groups.data = allGroups.filter(function (g) {
    return linkIds.indexOf(g.id) !== -1;
  });
  state.groups.filtered = state.groups.data.slice();
  state.groups.currentPage = 1;
  renderTable("groups");
}

// ─────────────────────────────────────────────────────
// SORT
// ─────────────────────────────────────────────────────
function sortData(tableKey, col) {
  var s = state[tableKey];
  if (!s) return;
  if (s.sortCol === col) {
    s.sortDir = s.sortDir === "asc" ? "desc" : "asc";
  } else {
    s.sortCol = col;
    s.sortDir = "asc";
  }
  s.filtered.sort(function (a, b) {
    var aVal = a[col] === null || a[col] === undefined ? "" : a[col];
    var bVal = b[col] === null || b[col] === undefined ? "" : b[col];
    if (typeof aVal === "boolean") {
      aVal = aVal ? 1 : 0;
      bVal = bVal ? 1 : 0;
    }
    if (
      aVal !== "" &&
      bVal !== "" &&
      !isNaN(Number(aVal)) &&
      !isNaN(Number(bVal))
    ) {
      aVal = Number(aVal);
      bVal = Number(bVal);
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    if (aVal < bVal) return s.sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return s.sortDir === "asc" ? 1 : -1;
    return 0;
  });
  s.currentPage = 1;
  renderTable(tableKey);
  renderPagination(tableKey);
}

function bindSortHeaders() {
  document.querySelectorAll(".ra-th-sortable").forEach(function (th) {
    th.addEventListener("click", function () {
      var col = th.getAttribute("data-col");
      var tableKey = th.getAttribute("data-table");
      var s = state[tableKey];
      // Reset all headers for this table
      document
        .querySelectorAll('[data-table="' + tableKey + '"].ra-th-sortable')
        .forEach(function (t) {
          t.classList.remove("ra-sort-asc", "ra-sort-desc");
          t.setAttribute("aria-sort", "none");
          var icon = t.querySelector(".ra-sort-icon");
          if (icon) icon.innerHTML = "";
        });
      sortData(tableKey, col);
      th.classList.add(s.sortDir === "asc" ? "ra-sort-asc" : "ra-sort-desc");
      th.setAttribute(
        "aria-sort",
        s.sortDir === "asc" ? "ascending" : "descending",
      );
      var icon = th.querySelector(".ra-sort-icon");
      if (icon) icon.innerHTML = s.sortDir === "asc" ? "&#9650;" : "&#9660;";
    });
    th.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        th.click();
      }
    });
  });
}

// ─────────────────────────────────────────────────────
// ACTION BUTTONS (Edit / Delete per row)
// ─────────────────────────────────────────────────────
function bindActionButtons(tableKey) {
  var tbodyId =
    tableKey === "maintenance"
      ? "maintenanceTableBody"
      : "reportGroupsTableBody";
  var tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  tbody.querySelectorAll(".ra-btn-edit").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"), 10);
      var tbl = btn.getAttribute("data-table");
      if (tbl === "groups") {
        openGroupModal(id);
      } else {
        openEditModal(id, tbl);
      }
    });
  });

  tbody.querySelectorAll(".ra-btn-delete").forEach(function (btn) {
    btn.addEventListener("click", function () {
      deleteRecord(
        parseInt(btn.getAttribute("data-id"), 10),
        btn.getAttribute("data-table"),
      );
    });
  });

  tbody.querySelectorAll(".ra-btn-add-group").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var rowId = parseInt(btn.getAttribute("data-id"), 10);
      selectMaintenanceRow(rowId);
      openGroupModal(null);
    });
  });
}

// ─────────────────────────────────────────────────────
// ADD BUTTONS
// ─────────────────────────────────────────────────────
function bindAddButtons() {
  var btnAdd = document.getElementById("btnAddReport");
  if (btnAdd)
    btnAdd.addEventListener("click", function () {
      openAddModal("maintenance");
    });

  // Add Report Group buttons are rendered per-row; bindings handled in bindActionButtons
}

// ─────────────────────────────────────────────────────
// VALIDATION HELPERS (GOV.UK / Defra standard)
// ─────────────────────────────────────────────────────
function raSetFieldError(groupId, errorId, inputId, isSelect) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.add("govuk-form-group--error");
  if (err) err.style.display = "";
  if (input) {
    if (isSelect) {
      input.classList.add("govuk-select--error");
    } else if (input.tagName.toLowerCase() === "textarea") {
      input.classList.add("govuk-textarea--error");
    } else {
      input.classList.add("govuk-input--error");
    }
  }
}

function raClearFieldError(groupId, errorId, inputId, isSelect) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.remove("govuk-form-group--error");
  if (err) err.style.display = "none";
  if (input) {
    input.classList.remove("govuk-select--error");
    input.classList.remove("govuk-textarea--error");
    input.classList.remove("govuk-input--error");
  }
}

function raShowDbError(bannerId, textId, message) {
  var banner = document.getElementById(bannerId);
  var text = document.getElementById(textId);
  if (banner) {
    banner.style.display = "";
    banner.focus();
  }
  if (text) text.textContent = message || "";
}

function raHideDbError(bannerId) {
  var banner = document.getElementById(bannerId);
  if (banner) banner.style.display = "none";
}

// ─────────────────────────────────────────────────────
// GROUP EDIT MODAL (dedicated modal for Report Groups)
// ─────────────────────────────────────────────────────
function openGroupModal(id) {
  var formGroup = document.getElementById("groupFormGroup");
  var errMsg = document.getElementById("groupReportGroupError");
  var select = document.getElementById("groupReportGroup");
  var title = document.getElementById("groupEditModalTitle");

  document.getElementById("groupEditRecordId").value = id || "";
  select.value = "";
  raClearFieldError(
    "groupFormGroup",
    "groupReportGroupError",
    "groupReportGroup",
    true,
  );
  raHideDbError("groupDbError");

  if (id) {
    var s = state["groups"];
    for (var i = 0; i < s.data.length; i++) {
      if (s.data[i].id === id) {
        select.value = s.data[i].name || "";
        break;
      }
    }
    if (title) title.textContent = "Edit Report Group";
  } else {
    if (title) title.textContent = "Add Report Group";
  }

  var modal = document.getElementById("groupEditModal");
  modal.hidden = false;
  select.focus();
}

function saveGroupModal() {
  raHideDbError("groupDbError");
  var val = document.getElementById("groupReportGroup").value;

  if (!val) {
    raSetFieldError(
      "groupFormGroup",
      "groupReportGroupError",
      "groupReportGroup",
      true,
    );
    document.getElementById("groupReportGroup").focus();
    return;
  }
  raClearFieldError(
    "groupFormGroup",
    "groupReportGroupError",
    "groupReportGroup",
    true,
  );

  if (!selectedMaintenanceId) {
    closeGroupModal();
    return;
  }

  // Find the group object matching the selected name
  var newGroupObj = null;
  for (var j = 0; j < allGroups.length; j++) {
    if (allGroups[j].name === val) {
      newGroupObj = allGroups[j];
      break;
    }
  }
  if (!newGroupObj) {
    closeGroupModal();
    return;
  }

  if (!reportGroupLinks[selectedMaintenanceId]) {
    reportGroupLinks[selectedMaintenanceId] = [];
  }
  var links = reportGroupLinks[selectedMaintenanceId];
  var idVal = document.getElementById("groupEditRecordId").value;

  if (idVal) {
    // Editing: swap the old linked group for the new one
    var oldId = parseInt(idVal, 10);
    var idx = links.indexOf(oldId);
    if (idx !== -1) {
      links[idx] = newGroupObj.id;
    } else if (links.indexOf(newGroupObj.id) === -1) {
      links.push(newGroupObj.id);
    }
  } else {
    // Adding: only link if not already linked
    if (links.indexOf(newGroupObj.id) === -1) {
      links.push(newGroupObj.id);
    }
  }

  refreshGroupsGrid();
  closeGroupModal();
}

function closeGroupModal() {
  var modal = document.getElementById("groupEditModal");
  if (modal) modal.hidden = true;
}

// ─────────────────────────────────────────────────────
// EDIT MODAL (maintenance records only)
// ─────────────────────────────────────────────────────
function openEditModal(id, tableKey) {
  var s = state[tableKey];
  var record = null;
  for (var i = 0; i < s.data.length; i++) {
    if (s.data[i].id === id) {
      record = s.data[i];
      break;
    }
  }
  if (!record) return;

  document.getElementById("editRecordId").value = id;
  document.getElementById("editName").value = record.name || "";
  document.getElementById("editDescription").value = record.description || "";
  document.getElementById("editReportHelp").value = record.reportHelp || "";
  document.getElementById("editMailComment").value = record.mailComment || "";
  document.getElementById("editMailTitle").value = record.mailTitle || "";
  document.getElementById("editEmailable").checked = !!record.emailable;
  document.getElementById("editOrder").value =
    record.order !== "" && record.order !== null && record.order !== undefined
      ? record.order
      : "";
  // Reset all field validation + DB error
  raClearFieldError("editNameGroup", "editNameError", "editName", false);
  raClearFieldError(
    "editDescriptionGroup",
    "editDescriptionError",
    "editDescription",
    false,
  );
  raClearFieldError(
    "editReportHelpGroup",
    "editReportHelpError",
    "editReportHelp",
    false,
  );
  raClearFieldError(
    "editMailCommentGroup",
    "editMailCommentError",
    "editMailComment",
    false,
  );
  raClearFieldError(
    "editMailTitleGroup",
    "editMailTitleError",
    "editMailTitle",
    false,
  );
  raClearFieldError("editOrderGroup", "editOrderError", "editOrder", false);
  raHideDbError("maintDbError");
  document.getElementById("maintenanceEditModalTitle").textContent =
    "Edit Record";

  var modal = document.getElementById("maintenanceEditModal");
  modal.hidden = false;
  document.getElementById("editName").focus();
}

function openAddModal(tableKey) {
  document.getElementById("editRecordId").value = "";
  document.getElementById("editName").value = "";
  document.getElementById("editDescription").value = "";
  document.getElementById("editReportHelp").value = "";
  document.getElementById("editMailComment").value = "";
  document.getElementById("editMailTitle").value = "";
  document.getElementById("editEmailable").checked = false;
  document.getElementById("editOrder").value = "";
  // Reset all field validation + DB error
  raClearFieldError("editNameGroup", "editNameError", "editName", false);
  raClearFieldError(
    "editDescriptionGroup",
    "editDescriptionError",
    "editDescription",
    false,
  );
  raClearFieldError(
    "editReportHelpGroup",
    "editReportHelpError",
    "editReportHelp",
    false,
  );
  raClearFieldError(
    "editMailCommentGroup",
    "editMailCommentError",
    "editMailComment",
    false,
  );
  raClearFieldError(
    "editMailTitleGroup",
    "editMailTitleError",
    "editMailTitle",
    false,
  );
  raClearFieldError("editOrderGroup", "editOrderError", "editOrder", false);
  raHideDbError("maintDbError");
  document.getElementById("maintenanceEditModalTitle").textContent =
    "Add Record";

  var modal = document.getElementById("maintenanceEditModal");
  modal.hidden = false;
  document.getElementById("editName").focus();
}

function saveEditModal() {
  raHideDbError("maintDbError");
  var hasError = false;

  // ── Name (required) ──
  var nameVal = document.getElementById("editName").value.trim();
  if (!nameVal) {
    raSetFieldError("editNameGroup", "editNameError", "editName", false);
    hasError = true;
  } else {
    raClearFieldError("editNameGroup", "editNameError", "editName", false);
  }

  // ── Description (required) ──
  var descVal = document.getElementById("editDescription").value.trim();
  if (!descVal) {
    raSetFieldError(
      "editDescriptionGroup",
      "editDescriptionError",
      "editDescription",
      false,
    );
    hasError = true;
  } else {
    raClearFieldError(
      "editDescriptionGroup",
      "editDescriptionError",
      "editDescription",
      false,
    );
  }

  // ── Report Help (required) ──
  var reportHelpVal = document.getElementById("editReportHelp").value.trim();
  if (!reportHelpVal) {
    raSetFieldError(
      "editReportHelpGroup",
      "editReportHelpError",
      "editReportHelp",
      false,
    );
    hasError = true;
  } else {
    raClearFieldError(
      "editReportHelpGroup",
      "editReportHelpError",
      "editReportHelp",
      false,
    );
  }

  // ── Mail Comment (required) ──
  var mailCommentVal = document.getElementById("editMailComment").value.trim();
  if (!mailCommentVal) {
    raSetFieldError(
      "editMailCommentGroup",
      "editMailCommentError",
      "editMailComment",
      false,
    );
    hasError = true;
  } else {
    raClearFieldError(
      "editMailCommentGroup",
      "editMailCommentError",
      "editMailComment",
      false,
    );
  }

  // ── Mail Title (required) ──
  var mailTitleVal = document.getElementById("editMailTitle").value.trim();
  if (!mailTitleVal) {
    raSetFieldError(
      "editMailTitleGroup",
      "editMailTitleError",
      "editMailTitle",
      false,
    );
    hasError = true;
  } else {
    raClearFieldError(
      "editMailTitleGroup",
      "editMailTitleError",
      "editMailTitle",
      false,
    );
  }

  // ── Order (optional; whole number >= 0) ──
  var orderRaw = document.getElementById("editOrder").value.trim();
  var orderVal = "";
  if (orderRaw !== "") {
    var orderNum = Number(orderRaw);
    if (isNaN(orderNum) || orderNum < 0 || Math.floor(orderNum) !== orderNum) {
      raSetFieldError("editOrderGroup", "editOrderError", "editOrder", false);
      hasError = true;
    } else {
      raClearFieldError("editOrderGroup", "editOrderError", "editOrder", false);
      orderVal = orderNum;
    }
  } else {
    raClearFieldError("editOrderGroup", "editOrderError", "editOrder", false);
  }

  if (hasError) {
    var firstErr = document.querySelector(
      "#maintenanceEditModal .govuk-input--error, #maintenanceEditModal .govuk-textarea--error, #maintenanceEditModal .govuk-select--error",
    );
    if (firstErr) firstErr.focus();
    return;
  }

  var idVal = document.getElementById("editRecordId").value;
  var s = state["maintenance"];

  if (idVal) {
    var id = parseInt(idVal, 10);
    for (var i = 0; i < s.data.length; i++) {
      if (s.data[i].id === id) {
        s.data[i].name = nameVal;
        s.data[i].description = descVal;
        s.data[i].reportHelp = reportHelpVal;
        s.data[i].mailComment = mailCommentVal;
        s.data[i].mailTitle = mailTitleVal;
        s.data[i].emailable = document.getElementById("editEmailable").checked;
        s.data[i].order = orderVal;
        break;
      }
    }
  } else {
    s.data.unshift({
      id: getNextId(s.data),
      name: nameVal,
      description: descVal,
      reportHelp: reportHelpVal,
      mailComment: mailCommentVal,
      mailTitle: mailTitleVal,
      emailable: document.getElementById("editEmailable").checked,
      order: orderVal,
    });
  }

  s.filtered = s.data.slice();
  s.currentPage = 1;
  renderTable("maintenance");
  renderPagination("maintenance");
  closeEditModal();
}

function closeEditModal() {
  document.getElementById("maintenanceEditModal").hidden = true;
}

// ─────────────────────────────────────────────────────
// DELETE MODAL
// ─────────────────────────────────────────────────────
function deleteRecord(id, tableKey) {
  var s = state[tableKey];
  var record = null;
  for (var i = 0; i < s.data.length; i++) {
    if (s.data[i].id === id) {
      record = s.data[i];
      break;
    }
  }
  if (!record) return;

  if (!confirm("Are you sure you want to delete this record?")) return;

  if (tableKey === "groups") {
    if (selectedMaintenanceId && reportGroupLinks[selectedMaintenanceId]) {
      reportGroupLinks[selectedMaintenanceId] = reportGroupLinks[
        selectedMaintenanceId
      ].filter(function (gid) {
        return gid !== id;
      });
    }
    refreshGroupsGrid();
    return;
  }

  s.data = s.data.filter(function (r) {
    return r.id !== id;
  });
  s.filtered = s.data.slice();
  if (id === selectedMaintenanceId) {
    selectedMaintenanceId = null;
    var lbl = document.getElementById("reportGroupsLabel");
    if (lbl)
      lbl.textContent =
        "Report Groups that this report will appear in. Select a row above to view linked groups.";
    refreshGroupsGrid();
  }
  var totalPages = Math.ceil(s.filtered.length / s.rowsPerPage);
  if (s.currentPage > totalPages) s.currentPage = Math.max(1, totalPages);
  renderTable(tableKey);
  renderPagination(tableKey);
}

// ─────────────────────────────────────────────────────
// BIND ALL MODAL BUTTONS
// ─────────────────────────────────────────────────────
function bindModalButtons() {
  var b;
  b = document.getElementById("btnSaveMaintenanceEdit");
  if (b) b.addEventListener("click", saveEditModal);
  b = document.getElementById("btnCancelMaintenanceEdit");
  if (b) b.addEventListener("click", closeEditModal);
  b = document.getElementById("btnCloseMaintenanceEdit");
  if (b) b.addEventListener("click", closeEditModal);
  b = document.getElementById("btnSaveGroupEdit");
  if (b) b.addEventListener("click", saveGroupModal);
  b = document.getElementById("btnCancelGroupEdit");
  if (b) b.addEventListener("click", closeGroupModal);
  b = document.getElementById("btnCloseGroupModal");
  if (b) b.addEventListener("click", closeGroupModal);
  // Close on backdrop click or Escape
  document.addEventListener("click", function (e) {
    var maintModal = document.getElementById("maintenanceEditModal");
    if (maintModal && !maintModal.hidden && e.target === maintModal)
      closeEditModal();
    var grpModal = document.getElementById("groupEditModal");
    if (grpModal && !grpModal.hidden && e.target === grpModal)
      closeGroupModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var maintModal = document.getElementById("maintenanceEditModal");
    if (maintModal && !maintModal.hidden) closeEditModal();
    var grpModal = document.getElementById("groupEditModal");
    if (grpModal && !grpModal.hidden) closeGroupModal();
  });
}

// ─────────────────────────────────────────────────────
// SIDEBAR TOGGLE
// ─────────────────────────────────────────────────────
function toggleSidebar() {
  var sidebar = document.querySelector(".sidenav");
  if (sidebar) sidebar.classList.toggle("collapsed");
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  loadData();
});
