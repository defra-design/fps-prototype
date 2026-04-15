/* =====================================================
   Report Admin Maintenance
   report_admin_maintenance.js
   ===================================================== */

"use strict";

// ──────────────────────────────────────────────────────
// 1.  SAMPLE DATA  (41 records – matches image "1 of 41")
// ──────────────────────────────────────────────────────
const maintenanceData = [
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
    reportHelp: "Monthly breakdown of contract expenditure for each programme",
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
  {
    id: 16,
    name: "rptFinancialYearEndSummary",
    description: "Financial Year End Summary",
    reportHelp: "End of financial year summary including all programme totals",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 1,
  },
  {
    id: 17,
    name: "rptInvoicesByMonth",
    description: "Invoices By Month",
    reportHelp: "Lists all invoices issued, grouped by month",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 18,
    name: "rptInvoicesOutstanding",
    description: "Invoices Outstanding",
    reportHelp: "All invoices that remain unpaid or partially paid",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 19,
    name: "rptOvertimeAndExpenses",
    description: "Overtime And Expenses",
    reportHelp: "Overtime hours and expense claims recorded by staff",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 20,
    name: "rptPortfolioStatusReport",
    description: "Portfolio Status Report",
    reportHelp: "High level status of all portfolios for current quarter",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 15,
  },
  {
    id: 21,
    name: "rptProjectBudgetStatus",
    description: "Project Budget Status",
    reportHelp: "Current budget status for all active and planning projects",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 22,
    name: "rptProjectClosedownChecklist",
    description: "Project Closedown Checklist",
    reportHelp: "Checklist status for projects approaching close-down phase",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 23,
    name: "rptProjectCostsByCategory",
    description: "Project Costs By Category",
    reportHelp: "Breakdown of project costs into staff, travel, and materials",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 24,
    name: "rptProjectIncomeVsExpenditure",
    description: "Project Income Vs Expenditure",
    reportHelp:
      "Comparison of income received against total project expenditure",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 25,
    name: "rptProjectProgressByProgramme",
    description: "Project Progress By Programme",
    reportHelp: "Progress status of all projects grouped under each programme",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 26,
    name: "rptQtrlyFinancialReview",
    description: "Quarterly Financial Review",
    reportHelp: "Quarterly review of all financial data across programmes",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 25,
  },
  {
    id: 27,
    name: "rptRiskRegisterSummary",
    description: "Risk Register Summary",
    reportHelp:
      "Summary of risks logged per project with current mitigation status",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 28,
    name: "rptStaffAllocationReport",
    description: "Staff Allocation Report",
    reportHelp: "Allocation of staff time across all active projects",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 29,
    name: "rptStaffCostsByGrade",
    description: "Staff Costs By Grade",
    reportHelp: "Total staff costs broken down by grade for each programme",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 30,
    name: "rptStaffCostsByProject",
    description: "Staff Costs By Project",
    reportHelp: "Individual project staff costs for reconciliation purposes",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 31,
    name: "rptSubContractExpenditure",
    description: "Sub-Contract Expenditure",
    reportHelp: "Total sub-contract expenditure by project and supplier",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 32,
    name: "rptSupportCostAllocation",
    description: "Support Cost Allocation",
    reportHelp: "Allocation of overhead and support costs to projects",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 33,
    name: "rptSurveilanceContractDetails",
    description: "Surveilance Contract Details",
    reportHelp:
      "Details of all active surveilance contracts including value and status",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 34,
    name: "rptTimecardSummary",
    description: "Timecard Summary",
    reportHelp: "Summary of hours recorded per staff member per week",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 35,
    name: "rptTimeRecordingByProject",
    description: "Time Recording By Project",
    reportHelp: "All time recordings posted against each project",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 36,
    name: "rptTravelExpensesLog",
    description: "Travel Expenses Log",
    reportHelp: "Log of all travel expenses claimed by staff members",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 37,
    name: "rptUnclaimedOutputs",
    description: "Unclaimed Outputs",
    reportHelp: "Outputs posted but not yet matched to an invoice or contract",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 38,
    name: "rptVFMAnalysis",
    description: "Value For Money Analysis",
    reportHelp: "VFM analysis report for programme and portfolio level review",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 40,
  },
  {
    id: 39,
    name: "rptWIPByProgramme",
    description: "Work In Progress By Programme",
    reportHelp: "Current work in progress totals segmented by programme",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 40,
    name: "rptWorkgroupCapacityPlan",
    description: "Workgroup Capacity Plan",
    reportHelp: "Projected capacity availability for each workgroup by month",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
  {
    id: 41,
    name: "rptYearToDateExpenditure",
    description: "Year To Date Expenditure",
    reportHelp: "Year-to-date spend against budget for all active programmes",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: "",
  },
];

const reportGroupsData = [
  {
    id: 1,
    name: "grpSurveilanceContracts",
    description: "Surveilance Contracts",
    reportHelp: "Group for all Surveilance contract reports",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 1,
  },
  {
    id: 2,
    name: "grpAnnualFinalReports",
    description: "Annual & Final Reports",
    reportHelp: "Annual and final report group for end of year submissions",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 2,
  },
  {
    id: 3,
    name: "grpFinancialSummary",
    description: "Financial Summary",
    reportHelp: "All financial summary and year end review reports",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 3,
  },
  {
    id: 4,
    name: "grpProjectReports",
    description: "Project Reports",
    reportHelp: "Reports related to individual project tracking and costs",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 4,
  },
  {
    id: 5,
    name: "grpProgrammeReports",
    description: "Programme Reports",
    reportHelp: "Programme-level summary and status reports",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 5,
  },
  {
    id: 6,
    name: "grpStaffReports",
    description: "Staff Reports",
    reportHelp: "Reports covering staff time, costs, and allocation",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 6,
  },
  {
    id: 7,
    name: "grpInvoiceReports",
    description: "Invoice Reports",
    reportHelp: "Invoice and sub-contract expenditure report group",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 7,
  },
  {
    id: 8,
    name: "grpQuarterlyReview",
    description: "Quarterly Review",
    reportHelp: "Quarterly financial and performance review report group",
    mailComment: "",
    mailTitle: "",
    emailable: true,
    order: 8,
  },
  {
    id: 9,
    name: "grpPortfolioReports",
    description: "Portfolio Reports",
    reportHelp: "High-level portfolio status and VFM reports",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 9,
  },
  {
    id: 10,
    name: "grpMiscellaneous",
    description: "Miscellaneous",
    reportHelp: "Miscellaneous and ad-hoc report group",
    mailComment: "",
    mailTitle: "",
    emailable: false,
    order: 10,
  },
];

// ──────────────────────────────────────────────────────
// 2.  STATE
// ──────────────────────────────────────────────────────
const state = {
  maintenance: {
    data: [...maintenanceData],
    filtered: [...maintenanceData],
    currentPage: 1,
    rowsPerPage: 10,
    sortCol: null,
    sortDir: "asc",
  },
  groups: {
    data: [...reportGroupsData],
    filtered: [...reportGroupsData],
    currentPage: 1,
    rowsPerPage: 10,
    sortCol: null,
    sortDir: "asc",
  },
};

let pendingDeleteId = null;
let pendingDeleteTable = null;

// ──────────────────────────────────────────────────────
// 3.  HELPERS
// ──────────────────────────────────────────────────────
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
  return arr.length === 0 ? 1 : Math.max(...arr.map((r) => r.id)) + 1;
}

// ──────────────────────────────────────────────────────
// 4.  TABS  (manual implementation – no govuk-frontend JS dependency)
// ──────────────────────────────────────────────────────
function initTabs() {
  const tabLinks = document.querySelectorAll(".ra-tabs .govuk-tabs__tab");
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
}

function activateTab(link) {
  // deactivate all
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

  // activate chosen
  link
    .closest(".govuk-tabs__list-item")
    .classList.add("govuk-tabs__list-item--selected");
  link.setAttribute("aria-selected", "true");
  link.setAttribute("tabindex", "0");

  const targetId = link.getAttribute("href").replace("#", "");
  const panel = document.getElementById(targetId);
  if (panel) panel.classList.remove("govuk-tabs__panel--hidden");
}

// ──────────────────────────────────────────────────────
// 5.  SORT
// ──────────────────────────────────────────────────────
function sortData(tableKey, col) {
  const s = state[tableKey];
  if (s.sortCol === col) {
    s.sortDir = s.sortDir === "asc" ? "desc" : "asc";
  } else {
    s.sortCol = col;
    s.sortDir = "asc";
  }

  s.filtered.sort(function (a, b) {
    const av =
      a[col] === "" || a[col] === null || a[col] === undefined ? "" : a[col];
    const bv =
      b[col] === "" || b[col] === null || b[col] === undefined ? "" : b[col];

    if (typeof av === "boolean") {
      return s.sortDir === "asc"
        ? av === bv
          ? 0
          : av
            ? -1
            : 1
        : av === bv
          ? 0
          : av
            ? 1
            : -1;
    }
    const aStr = String(av).toLowerCase();
    const bStr = String(bv).toLowerCase();
    if (aStr < bStr) return s.sortDir === "asc" ? -1 : 1;
    if (aStr > bStr) return s.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // update sort icons
  const tableId =
    tableKey === "maintenance" ? "maintenanceTable" : "reportGroupsTable";
  const headers = document.querySelectorAll("#" + tableId + " .ra-th-sortable");
  headers.forEach(function (th) {
    th.classList.remove("ra-sort-asc", "ra-sort-desc");
    if (th.dataset.col === col) {
      th.classList.add(s.sortDir === "asc" ? "ra-sort-asc" : "ra-sort-desc");
    }
  });

  s.currentPage = 1;
  renderTable(tableKey);
  renderPagination(tableKey);
}

// ──────────────────────────────────────────────────────
// 6.  RENDER TABLE
// ──────────────────────────────────────────────────────
function renderTable(tableKey) {
  const s = state[tableKey];
  const start = (s.currentPage - 1) * s.rowsPerPage;
  const end = start + s.rowsPerPage;
  const pageRows = s.filtered.slice(start, end);

  const tbodyId =
    tableKey === "maintenance"
      ? "maintenanceTableBody"
      : "reportGroupsTableBody";
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  if (pageRows.length === 0) {
    tbody.innerHTML =
      '<tr class="govuk-table__row"><td class="govuk-table__cell" colspan="8" style="text-align:center;color:#505a5f;">No records found.</td></tr>';
    updateRecordCount(tableKey);
    return;
  }

  const rows = pageRows.map(function (row) {
    const emailCheck =
      '<input type="checkbox" ' +
      (row.emailable ? "checked" : "") +
      ' aria-label="Email-able" disabled />';
    const orderVal =
      row.order !== "" && row.order !== null && row.order !== undefined
        ? escapeHtml(row.order)
        : "";
    return (
      '<tr class="govuk-table__row">' +
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
      '<div class="ra-action-cell">' +
      '<button type="button" class="ra-btn-edit" ' +
      'data-id="' +
      row.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Edit ' +
      escapeHtml(row.name) +
      '">Edit</button>' +
      '<button type="button" class="ra-btn-delete" ' +
      'data-id="' +
      row.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Delete ' +
      escapeHtml(row.name) +
      '">Delete</button>' +
      "</div>" +
      "</td>" +
      "</tr>"
    );
  });

  tbody.innerHTML = rows.join("");
  updateRecordCount(tableKey);
  bindActionButtons(tableKey);
}

function updateRecordCount(tableKey) {
  const s = state[tableKey];
  const total = s.filtered.length;
  const start = total === 0 ? 0 : (s.currentPage - 1) * s.rowsPerPage + 1;
  const end = Math.min(s.currentPage * s.rowsPerPage, total);
  const countId =
    tableKey === "maintenance" ? "maintenanceRecordCount" : "groupsRecordCount";
  const el = document.getElementById(countId);
  if (el) el.textContent = "Record: " + start + " – " + end + " of " + total;
}

// ──────────────────────────────────────────────────────
// 7.  PAGINATION
// ──────────────────────────────────────────────────────
function renderPagination(tableKey) {
  const s = state[tableKey];
  const total = s.filtered.length;
  const pages = Math.max(1, Math.ceil(total / s.rowsPerPage));
  const listId =
    tableKey === "maintenance" ? "maintenancePagination" : "groupsPagination";
  const paginationEl = document.getElementById(listId);
  if (!paginationEl) return;

  const items = [];
  const cur = s.currentPage;

  // Previous
  if (cur > 1) {
    items.push(
      makePaginationItem(
        "&laquo; Prev",
        cur - 1,
        tableKey,
        false,
        "Previous page",
      ),
    );
  }

  // Page numbers with ellipsis
  const window = 2;
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || (p >= cur - window && p <= cur + window)) {
      items.push(
        makePaginationItem(String(p), p, tableKey, p === cur, "Page " + p),
      );
    } else if (
      (p === cur - window - 1 && p > 1) ||
      (p === cur + window + 1 && p < pages)
    ) {
      items.push(
        '<li class="govuk-pagination__item govuk-pagination__item--ellipsis" aria-hidden="true">&hellip;</li>',
      );
    }
  }

  // Next
  if (cur < pages) {
    items.push(
      makePaginationItem("Next &raquo;", cur + 1, tableKey, false, "Next page"),
    );
  }

  paginationEl.innerHTML = items.join("");

  // bind clicks
  paginationEl.querySelectorAll(".ra-page-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = parseInt(link.dataset.page, 10);
      if (!isNaN(page)) {
        state[tableKey].currentPage = page;
        renderTable(tableKey);
        renderPagination(tableKey);
      }
    });
  });
}

function makePaginationItem(label, page, tableKey, isCurrent, ariaLabel) {
  const current = isCurrent ? " govuk-pagination__item--current" : "";
  return (
    '<li class="govuk-pagination__item' +
    current +
    '">' +
    '<a href="#" class="govuk-pagination__link ra-page-link" ' +
    'data-page="' +
    page +
    '" data-table="' +
    tableKey +
    '" ' +
    'aria-label="' +
    ariaLabel +
    '"' +
    (isCurrent ? ' aria-current="page"' : "") +
    ">" +
    label +
    "</a></li>"
  );
}

// ──────────────────────────────────────────────────────
// 8.  RECORDS PER PAGE
// ──────────────────────────────────────────────────────
function bindRowsPerPage(selectId, tableKey) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.addEventListener("change", function () {
    state[tableKey].rowsPerPage = parseInt(sel.value, 10);
    state[tableKey].currentPage = 1;
    renderTable(tableKey);
    renderPagination(tableKey);
  });
}

// ──────────────────────────────────────────────────────
// 9.  SORT HEADER BINDING
// ──────────────────────────────────────────────────────
function bindSortHeaders() {
  document.querySelectorAll(".ra-th-sortable").forEach(function (th) {
    th.addEventListener("click", function () {
      const col = th.dataset.col;
      const tableKey = th.dataset.table;
      if (col && tableKey) sortData(tableKey, col);
    });
    th.setAttribute("tabindex", "0");
    th.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const col = th.dataset.col;
        const tableKey = th.dataset.table;
        if (col && tableKey) sortData(tableKey, col);
      }
    });
  });
}

// ──────────────────────────────────────────────────────
// 10.  ACTION BUTTONS (Edit / Delete)
// ──────────────────────────────────────────────────────
function bindActionButtons(tableKey) {
  const tbodyId =
    tableKey === "maintenance"
      ? "maintenanceTableBody"
      : "reportGroupsTableBody";
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  tbody.querySelectorAll(".ra-btn-edit").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openEditModal(parseInt(btn.dataset.id, 10), btn.dataset.table);
    });
  });

  tbody.querySelectorAll(".ra-btn-delete").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openDeleteModal(parseInt(btn.dataset.id, 10), btn.dataset.table);
    });
  });
}

// ──────────────────────────────────────────────────────
// 11.  EDIT MODAL
// ──────────────────────────────────────────────────────
function getRecord(id, tableKey) {
  return state[tableKey].data.find(function (r) {
    return r.id === id;
  });
}

function openEditModal(id, tableKey) {
  const record = id === -1 ? null : getRecord(id, tableKey);
  const modal = document.getElementById("editModal");
  const title = document.getElementById("editModalTitle");

  document.getElementById("editRecordId").value = id === -1 ? "" : id;
  document.getElementById("editTableSource").value = tableKey;

  if (record) {
    title.textContent = "Edit Record";
    document.getElementById("editName").value = record.name;
    document.getElementById("editDescription").value = record.description;
    document.getElementById("editReportHelp").value = record.reportHelp;
    document.getElementById("editMailComment").value = record.mailComment;
    document.getElementById("editMailTitle").value = record.mailTitle;
    document.getElementById("editEmailable").checked = record.emailable;
    document.getElementById("editOrder").value =
      record.order !== "" ? record.order : "";
  } else {
    title.textContent = "Add Record";
    document.getElementById("editName").value = "";
    document.getElementById("editDescription").value = "";
    document.getElementById("editReportHelp").value = "";
    document.getElementById("editMailComment").value = "";
    document.getElementById("editMailTitle").value = "";
    document.getElementById("editEmailable").checked = false;
    document.getElementById("editOrder").value = "";
  }

  modal.hidden = false;
  document.getElementById("editName").focus();
}

function saveEditModal() {
  const id = document.getElementById("editRecordId").value;
  const tableKey = document.getElementById("editTableSource").value;
  const nameVal = document.getElementById("editName").value.trim();

  if (!nameVal) {
    showGovukAlert("Name is required.");
    document.getElementById("editName").focus();
    return;
  }

  const updated = {
    name: nameVal,
    description: document.getElementById("editDescription").value.trim(),
    reportHelp: document.getElementById("editReportHelp").value.trim(),
    mailComment: document.getElementById("editMailComment").value.trim(),
    mailTitle: document.getElementById("editMailTitle").value.trim(),
    emailable: document.getElementById("editEmailable").checked,
    order:
      document.getElementById("editOrder").value !== ""
        ? parseInt(document.getElementById("editOrder").value, 10)
        : "",
  };

  const s = state[tableKey];

  if (id === "") {
    // ADD
    updated.id = getNextId(s.data);
    s.data.push(updated);
  } else {
    // UPDATE
    const idx = s.data.findIndex(function (r) {
      return r.id === parseInt(id, 10);
    });
    if (idx !== -1) Object.assign(s.data[idx], updated);
  }

  s.filtered = [...s.data];
  reapplySort(tableKey);
  renderTable(tableKey);
  renderPagination(tableKey);
  closeEditModal();
  showNotification(
    id === "" ? "Record added successfully." : "Record updated successfully.",
  );
}

function closeEditModal() {
  document.getElementById("editModal").hidden = true;
}

// ──────────────────────────────────────────────────────
// 12.  DELETE MODAL
// ──────────────────────────────────────────────────────
function openDeleteModal(id, tableKey) {
  const record = getRecord(id, tableKey);
  if (!record) return;
  pendingDeleteId = id;
  pendingDeleteTable = tableKey;
  document.getElementById("deleteRecordName").textContent = record.name;
  document.getElementById("deleteModal").hidden = false;
}

function confirmDelete() {
  if (pendingDeleteId === null || pendingDeleteTable === null) return;
  const s = state[pendingDeleteTable];
  s.data = s.data.filter(function (r) {
    return r.id !== pendingDeleteId;
  });
  s.filtered = [...s.data];
  reapplySort(pendingDeleteTable);
  // Adjust page if necessary
  const pages = Math.max(1, Math.ceil(s.filtered.length / s.rowsPerPage));
  if (s.currentPage > pages) s.currentPage = pages;
  renderTable(pendingDeleteTable);
  renderPagination(pendingDeleteTable);
  closeDeleteModal();
  showNotification("Record deleted successfully.", true);
}

function closeDeleteModal() {
  document.getElementById("deleteModal").hidden = true;
  pendingDeleteId = null;
  pendingDeleteTable = null;
}

function reapplySort(tableKey) {
  const s = state[tableKey];
  if (s.sortCol) {
    s.filtered.sort(function (a, b) {
      const av = a[s.sortCol] === "" ? "" : a[s.sortCol];
      const bv = b[s.sortCol] === "" ? "" : b[s.sortCol];
      if (typeof av === "boolean") {
        return s.sortDir === "asc"
          ? av === bv
            ? 0
            : av
              ? -1
              : 1
          : av === bv
            ? 0
            : av
              ? 1
              : -1;
      }
      const aStr = String(av).toLowerCase();
      const bStr = String(bv).toLowerCase();
      if (aStr < bStr) return s.sortDir === "asc" ? -1 : 1;
      if (aStr > bStr) return s.sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }
}

// ──────────────────────────────────────────────────────
// 13.  NOTIFICATION
// ──────────────────────────────────────────────────────
function showNotification(message, isDelete) {
  const existing = document.querySelector(".ra-notification");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.className =
    "ra-notification" + (isDelete ? " ra-notification--error" : "");
  div.setAttribute("role", "alert");
  div.setAttribute("aria-live", "polite");
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 3500);
}

// ──────────────────────────────────────────────────────
// 14.  ADD BUTTONS
// ──────────────────────────────────────────────────────
function bindAddButtons() {
  const btnAddReport = document.getElementById("btnAddReport");
  if (btnAddReport) {
    btnAddReport.addEventListener("click", function () {
      openEditModal(-1, "maintenance");
    });
  }
  const btnAddGroup = document.getElementById("btnAddReportGroup");
  if (btnAddGroup) {
    btnAddGroup.addEventListener("click", function () {
      openEditModal(-1, "groups");
    });
  }
}

// ──────────────────────────────────────────────────────
// 15.  MODAL BUTTON BINDINGS
// ──────────────────────────────────────────────────────
function bindModalButtons() {
  document
    .getElementById("btnSaveEdit")
    .addEventListener("click", saveEditModal);
  document
    .getElementById("btnCancelEdit")
    .addEventListener("click", closeEditModal);
  document
    .getElementById("btnCloseEditModal")
    .addEventListener("click", closeEditModal);

  document
    .getElementById("btnConfirmDelete")
    .addEventListener("click", confirmDelete);
  document
    .getElementById("btnCancelDelete")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("btnCloseDeleteModal")
    .addEventListener("click", closeDeleteModal);

  // Close on backdrop click
  document.getElementById("editModal").addEventListener("click", function (e) {
    if (e.target === this) closeEditModal();
  });
  document
    .getElementById("deleteModal")
    .addEventListener("click", function (e) {
      if (e.target === this) closeDeleteModal();
    });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!document.getElementById("editModal").hidden) closeEditModal();
      if (!document.getElementById("deleteModal").hidden) closeDeleteModal();
    }
  });
}

// ──────────────────────────────────────────────────────
// 16.  INIT
// ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  initTabs();

  renderTable("maintenance");
  renderPagination("maintenance");
  bindRowsPerPage("maintenanceRecordsPerPage", "maintenance");

  renderTable("groups");
  renderPagination("groups");
  bindRowsPerPage("groupsRecordsPerPage", "groups");

  bindSortHeaders();
  bindAddButtons();
  bindModalButtons();
});
