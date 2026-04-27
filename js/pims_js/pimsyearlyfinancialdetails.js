"use strict";

/* ─── Project data ──────────────────────────────────────────────────────── */
var yfdProjects = [
  {
    code: "MD3024",
    startDate: "01/07/1996",
    endDate: "31/03/2007",
    records: [
      {
        id: 2,
        year: 2000,
        ppAcc: "",
        customerIncome: 1009649,
        vlaBudget: 1009649,
        actualExp: 847399,
        seedcorn: 0,
        manHours: 0,
        payCosts: 0,
        nonPayOH: 0,
        testCosts: 408,
        projectSpecific: 75,
        animal: 775813,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 3,
        year: 2001,
        ppAcc: "",
        customerIncome: 1009649,
        vlaBudget: 1009649,
        actualExp: 881141,
        seedcorn: 0,
        manHours: 0,
        payCosts: 0,
        nonPayOH: 0,
        testCosts: 0,
        projectSpecific: 7309,
        animal: 826640,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 4,
        year: 2002,
        ppAcc: "",
        customerIncome: 1110614,
        vlaBudget: 1110614,
        actualExp: 1013647,
        seedcorn: 0,
        manHours: 0,
        payCosts: 0,
        nonPayOH: 0,
        testCosts: 12556,
        projectSpecific: 5047,
        animal: 848106,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 5,
        year: 2003,
        ppAcc: "",
        customerIncome: 1110614,
        vlaBudget: 1110614,
        actualExp: 904734,
        seedcorn: 0,
        manHours: 0,
        payCosts: 48471,
        nonPayOH: 43077,
        testCosts: 39253,
        projectSpecific: 2599,
        animal: 771333,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 6,
        year: 2004,
        ppAcc: "",
        customerIncome: 1110614,
        vlaBudget: 1110614,
        actualExp: 991041,
        seedcorn: 0,
        manHours: 0,
        payCosts: 74763,
        nonPayOH: 55242,
        testCosts: 32007,
        projectSpecific: 42647,
        animal: 786382,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 7,
        year: 2005,
        ppAcc: "",
        customerIncome: 319903,
        vlaBudget: 319903,
        actualExp: 306395,
        seedcorn: 0,
        manHours: 0,
        payCosts: 78724,
        nonPayOH: 56718,
        testCosts: 60155,
        projectSpecific: 43255,
        animal: 67543,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 8,
        year: 2006,
        ppAcc: "13500",
        customerIncome: 9878,
        vlaBudget: 23378,
        actualExp: 19967,
        seedcorn: 0,
        manHours: 0,
        payCosts: 6147,
        nonPayOH: 2870,
        testCosts: 8396,
        projectSpecific: 2554,
        animal: 0,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 9,
        year: 2007,
        ppAcc: "",
        customerIncome: 0,
        vlaBudget: 0,
        actualExp: -203,
        seedcorn: 0,
        manHours: 0,
        payCosts: 54,
        nonPayOH: 43,
        testCosts: 0,
        projectSpecific: -300,
        animal: 0,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 10,
        year: 2008,
        ppAcc: "",
        customerIncome: 2469,
        vlaBudget: 2469,
        actualExp: 257,
        seedcorn: 0,
        manHours: 0,
        payCosts: 131,
        nonPayOH: 74,
        testCosts: 52,
        projectSpecific: 0,
        animal: 0,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 11,
        year: 2009,
        ppAcc: "14200",
        customerIncome: 18500,
        vlaBudget: 20000,
        actualExp: 17340,
        seedcorn: 0,
        manHours: 0,
        payCosts: 7200,
        nonPayOH: 3100,
        testCosts: 4800,
        projectSpecific: 2240,
        animal: 0,
        exceptionalAdj: -500,
        adjComment:
          "Minor credit adjustment applied\nCarried forward from prior year\nAgreed with finance team",
        manDays: 0,
        manYears: 0,
        adjustment: -500,
        adjComment2:
          "Adjustment relates to underspend on test costs\nApproved by project lead in Q3\nNo further action required",
        actualPactDetails:
          "Actual costs reported via PACT system\nAll invoices reconciled and signed off\nFinal figures submitted 14/02/2010",
        dateFixed: "14/02/2010",
        fixedBy: "R.Hughes",
        fixed: true,
      },
      {
        id: 12,
        year: 2010,
        ppAcc: "14200",
        customerIncome: 5100,
        vlaBudget: 5100,
        actualExp: 4890,
        seedcorn: 0,
        manHours: 0,
        payCosts: 1950,
        nonPayOH: 870,
        testCosts: 1200,
        projectSpecific: 870,
        animal: 0,
        exceptionalAdj: 0,
        adjComment:
          "Final year close-out\nAll remaining accruals cleared\nProject formally closed March 2010",
        manDays: 0,
        manYears: 0,
        adjustment: 0,
        adjComment2:
          "Close-out review completed\nNo outstanding purchase orders\nAudit trail retained on shared drive",
        actualPactDetails:
          "Final PACT return submitted\nZero balance confirmed by finance\nProject closure notification sent to sponsor",
        dateFixed: "31/03/2010",
        fixedBy: "R.Hughes",
        fixed: true,
      },
    ],
  },
  {
    code: "MD3031",
    startDate: "01/04/2002",
    endDate: "31/03/2010",
    records: [
      {
        id: 101,
        year: 2002,
        ppAcc: "",
        customerIncome: 450000,
        vlaBudget: 450000,
        actualExp: 412300,
        seedcorn: 0,
        manHours: 1200,
        payCosts: 95000,
        nonPayOH: 32000,
        testCosts: 18500,
        projectSpecific: 12400,
        animal: 254400,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 150,
        manYears: 0.58,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 102,
        year: 2003,
        ppAcc: "",
        customerIncome: 520000,
        vlaBudget: 520000,
        actualExp: 498750,
        seedcorn: 5000,
        manHours: 1450,
        payCosts: 110000,
        nonPayOH: 38500,
        testCosts: 22100,
        projectSpecific: 15600,
        animal: 312550,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 181,
        manYears: 0.7,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 103,
        year: 2004,
        ppAcc: "APH22",
        customerIncome: 610000,
        vlaBudget: 625000,
        actualExp: 589000,
        seedcorn: 0,
        manHours: 1600,
        payCosts: 128000,
        nonPayOH: 44000,
        testCosts: 27500,
        projectSpecific: 19000,
        animal: 370500,
        exceptionalAdj: 2000,
        adjComment: "Minor variance",
        manDays: 200,
        manYears: 0.77,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "15/09/2004",
        fixedBy: "J.Smith",
        fixed: true,
      },
      {
        id: 104,
        year: 2005,
        ppAcc: "APH22",
        customerIncome: 680000,
        vlaBudget: 695000,
        actualExp: 671200,
        seedcorn: 0,
        manHours: 1750,
        payCosts: 142000,
        nonPayOH: 51000,
        testCosts: 31800,
        projectSpecific: 22500,
        animal: 423900,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 219,
        manYears: 0.84,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 105,
        year: 2006,
        ppAcc: "APH22",
        customerIncome: 720000,
        vlaBudget: 735000,
        actualExp: 715400,
        seedcorn: 2500,
        manHours: 1820,
        payCosts: 155000,
        nonPayOH: 55000,
        testCosts: 34200,
        projectSpecific: 25600,
        animal: 445600,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 228,
        manYears: 0.88,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "30/11/2006",
        fixedBy: "M.Jones",
        fixed: true,
      },
      {
        id: 106,
        year: 2007,
        ppAcc: "",
        customerIncome: 390000,
        vlaBudget: 390000,
        actualExp: 385000,
        seedcorn: 0,
        manHours: 980,
        payCosts: 82000,
        nonPayOH: 29000,
        testCosts: 18000,
        projectSpecific: 11500,
        animal: 244500,
        exceptionalAdj: 0,
        adjComment: "",
        manDays: 123,
        manYears: 0.47,
        adjustment: 0,
        adjComment2: "",
        actualPactDetails: "",
        dateFixed: "",
        fixedBy: "",
        fixed: false,
      },
      {
        id: 107,
        year: 2008,
        ppAcc: "APH25",
        customerIncome: 445000,
        vlaBudget: 460000,
        actualExp: 438200,
        seedcorn: 3000,
        manHours: 1100,
        payCosts: 92000,
        nonPayOH: 33500,
        testCosts: 20400,
        projectSpecific: 14800,
        animal: 277500,
        exceptionalAdj: 1500,
        adjComment:
          "Additional lab costs incurred in Q2\nApproved by programme manager\nInvoice reference: INV-2008-0341",
        manDays: 138,
        manYears: 0.53,
        adjustment: 1500,
        adjComment2:
          "Exceptional item relates to equipment calibration\nOne-off cost not expected to recur\nFinance notified and agreed",
        actualPactDetails:
          "PACT submission completed on schedule\nAll staff time sheets reconciled\nExternal contractor costs verified against PO",
        dateFixed: "28/03/2009",
        fixedBy: "M.Jones",
        fixed: true,
      },
      {
        id: 108,
        year: 2009,
        ppAcc: "APH25",
        customerIncome: 410000,
        vlaBudget: 410000,
        actualExp: 402600,
        seedcorn: 0,
        manHours: 1050,
        payCosts: 88000,
        nonPayOH: 31000,
        testCosts: 19200,
        projectSpecific: 13600,
        animal: 250800,
        exceptionalAdj: 0,
        adjComment:
          "Year progressed within budget\nNo significant variances to report\nStaff allocation reviewed mid-year",
        manDays: 131,
        manYears: 0.5,
        adjustment: 0,
        adjComment2:
          "All deliverables met as per work programme\nQuarterly reports submitted to customer\nFinal review meeting held December 2009",
        actualPactDetails:
          "PACT submission reviewed by senior accountant\nMinor rounding differences resolved\nSigned off by head of finance on 15/03/2010",
        dateFixed: "15/03/2010",
        fixedBy: "T.Williams",
        fixed: true,
      },
    ],
  },
];

var yfdProjectMap = {}; // keyed by project code
yfdProjects.forEach(function (p) {
  yfdProjectMap[p.code] = p;
});
var yfdAllRecords = [
  {
    id: 1,
    year: 1998,
    ppAcc: "",
    customerIncome: 0,
    vlaBudget: 0,
    actualExp: 0,
    seedcorn: 0,
    manHours: 0,
    payCosts: 0,
    nonPayOH: 0,
    testCosts: 0,
    projectSpecific: 0,
    animal: 0,
    exceptionalAdj: 0,
    adjComment: "",
    ppAccValue: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 2,
    year: 2000,
    ppAcc: "",
    customerIncome: 1009649,
    vlaBudget: 1009649,
    actualExp: 847399,
    seedcorn: 0,
    manHours: 0,
    payCosts: 0,
    nonPayOH: 0,
    testCosts: 408,
    projectSpecific: 75,
    animal: 775813,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 3,
    year: 2001,
    ppAcc: "",
    customerIncome: 1009649,
    vlaBudget: 1009649,
    actualExp: 881141,
    seedcorn: 0,
    manHours: 0,
    payCosts: 0,
    nonPayOH: 0,
    testCosts: 0,
    projectSpecific: 7309,
    animal: 826640,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 4,
    year: 2002,
    ppAcc: "",
    customerIncome: 1110614,
    vlaBudget: 1110614,
    actualExp: 1013647,
    seedcorn: 0,
    manHours: 0,
    payCosts: 0,
    nonPayOH: 0,
    testCosts: 12556,
    projectSpecific: 5047,
    animal: 848106,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 5,
    year: 2003,
    ppAcc: "",
    customerIncome: 1110614,
    vlaBudget: 1110614,
    actualExp: 904734,
    seedcorn: 0,
    manHours: 0,
    payCosts: 48471,
    nonPayOH: 43077,
    testCosts: 39253,
    projectSpecific: 2599,
    animal: 771333,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 6,
    year: 2004,
    ppAcc: "",
    customerIncome: 1110614,
    vlaBudget: 1110614,
    actualExp: 991041,
    seedcorn: 0,
    manHours: 0,
    payCosts: 74763,
    nonPayOH: 55242,
    testCosts: 32007,
    projectSpecific: 42647,
    animal: 786382,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 7,
    year: 2005,
    ppAcc: "",
    customerIncome: 319903,
    vlaBudget: 319903,
    actualExp: 306395,
    seedcorn: 0,
    manHours: 0,
    payCosts: 78724,
    nonPayOH: 56718,
    testCosts: 60155,
    projectSpecific: 43255,
    animal: 67543,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 8,
    year: 2006,
    ppAcc: "13500",
    customerIncome: 9878,
    vlaBudget: 23378,
    actualExp: 19967,
    seedcorn: 0,
    manHours: 0,
    payCosts: 6147,
    nonPayOH: 2870,
    testCosts: 8396,
    projectSpecific: 2554,
    animal: 0,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 9,
    year: 2007,
    ppAcc: "",
    customerIncome: 0,
    vlaBudget: 0,
    actualExp: -203,
    seedcorn: 0,
    manHours: 0,
    payCosts: 54,
    nonPayOH: 43,
    testCosts: 0,
    projectSpecific: -300,
    animal: 0,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
  {
    id: 10,
    year: 2008,
    ppAcc: "",
    customerIncome: 2469,
    vlaBudget: 2469,
    actualExp: 257,
    seedcorn: 0,
    manHours: 0,
    payCosts: 131,
    nonPayOH: 74,
    testCosts: 52,
    projectSpecific: 0,
    animal: 0,
    exceptionalAdj: 0,
    adjComment: "",
    manDays: 0,
    manYears: 0,
    adjustment: 0,
    adjComment2: "",
    actualPactDetails: "",
    dateFixed: "",
    fixedBy: "",
    fixed: false,
  },
];

var yfdFilteredRecords = yfdAllRecords.slice();
var yfdCurrentPage = 1;
var editingYFDId = null;
var yfdDeleteId = null;
var yfdNextId = 11;

/* ─── Sort state ──────────────────────────────────────────────────────────── */
var yfdSortState = {};
var yfdColumnKeys = [
  "year",
  "ppAcc",
  "customerIncome",
  "vlaBudget",
  "actualExp",
  "seedcorn",
  "manHours",
  "payCosts",
  "nonPayOH",
  "testCosts",
  "projectSpecific",
  "animal",
  "exceptionalAdj",
  "adjComment",
];

function sortYFD(columnIndex) {
  var key = yfdColumnKeys[columnIndex];
  if (!key) return;

  var headers = document.querySelectorAll("#tblYFD th.sortable-header");

  /* Clear all sort icons */
  headers.forEach(function (h) {
    h.classList.remove("sorted-asc", "sorted-desc");
    var icon = h.querySelector(".sort-icon");
    if (icon) icon.innerHTML = "";
  });

  /* Toggle sort direction */
  yfdSortState[key] = yfdSortState[key] === "asc" ? "desc" : "asc";
  var order = yfdSortState[key];

  /* Sort the data */
  yfdFilteredRecords.sort(function (a, b) {
    var av = a[key] !== undefined ? a[key] : "";
    var bv = b[key] !== undefined ? b[key] : "";
    var cmp;
    if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    } else {
      cmp = String(av).localeCompare(String(bv), "en", {
        numeric: true,
        sensitivity: "base",
      });
    }
    return order === "asc" ? cmp : -cmp;
  });

  /* Update icon on active header */
  var activeHeader = document.querySelector(
    "#tblYFD th.sortable-header[data-column='" + columnIndex + "']",
  );
  if (activeHeader) {
    activeHeader.classList.add(order === "asc" ? "sorted-asc" : "sorted-desc");
    var icon = activeHeader.querySelector(".sort-icon");
    if (icon) icon.innerHTML = order === "asc" ? " \u25b2" : " \u25bc";
  }

  yfdCurrentPage = 1;
  renderYFDTable();
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  renderPagination(
    yfdFilteredRecords,
    yfdCurrentPage,
    perPage,
    "yfdPagination",
    yfdOnPageClick,
  );
}

/* ─── Formatting helpers ───────────────────────────────────────────────────── */
function yfdFmt(val) {
  if (val === 0 || val === "" || val === null || val === undefined) {
    return "";
  }
  var n = parseFloat(val);
  if (isNaN(n)) {
    return val;
  }
  return (
    "£" +
    n.toLocaleString("en-GB", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

/* ─── Pagination callback ──────────────────────────────────────────────────── */
function yfdOnPageClick(page) {
  yfdCurrentPage = page;
  renderYFDTable();
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  renderPagination(
    yfdFilteredRecords,
    yfdCurrentPage,
    perPage,
    "yfdPagination",
    yfdOnPageClick,
  );
}

/* ─── Render table rows ────────────────────────────────────────────────────── */
function renderYFDTable() {
  var tbody = document.getElementById("tblYFDBody");
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  var start = (yfdCurrentPage - 1) * perPage;
  var slice = yfdFilteredRecords.slice(start, start + perPage);

  if (slice.length === 0) {
    renderEmptyRow("tblYFDBody", 15, "No records found.");
    return;
  }

  tbody.innerHTML = slice
    .map(function (r) {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell" style="text-align:center; ">' +
        r.year +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.ppAcc || "") +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.customerIncome) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.vlaBudget) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.actualExp) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.seedcorn) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.manHours || "") +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.payCosts) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.nonPayOH) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.testCosts) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.projectSpecific) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.animal) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        yfdFmt(r.exceptionalAdj) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.adjComment || "") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:center;white-space:nowrap;vertical-align:middle;">' +
        "<button type='button' class='govuk-button govuk-button--secondary govuk-!-font-size-16 sup_margin_0'style='padding: 0 6px;' onclick='openYFDDetailsModal(" +
        JSON.stringify(r) +
        ")' aria-label='Show details for year " +
        r.year +
        "'>Show Details</button>" +
        "<button type='button' style='border:none;background:#fff; ' onclick='openYFDEditModal(" +
        JSON.stringify(r) +
        ")' aria-label='Edit record for year " +
        r.year +
        "'>" +
        '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20"></button>' +
        " <button type='button' style='border:none;background:#fff;' onclick='openYFDDeleteModal(" +
        r.id +
        ", " +
        r.year +
        ")' aria-label='Delete record for year " +
        r.year +
        "'>" +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button>' +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
}
// side nav bar toggle
function toggleSidebar() {
  const sidebar = document.querySelector(".sidenav");
  sidebar.classList.toggle("collapsed");
}
/* ─── initTable ─────────────────────────────────────────────────────────────  */
/* ─── Render totals row ──────────────────────────────────────────────────── */
function renderYFDTotals() {
  var totals = {
    customerIncome: 0,
    vlaBudget: 0,
    actualExp: 0,
    seedcorn: 0,
    manHours: 0,
    payCosts: 0,
    nonPayOH: 0,
    testCosts: 0,
    projectSpecific: 0,
    animal: 0,
  };
  yfdAllRecords.forEach(function (r) {
    totals.customerIncome += r.customerIncome || 0;
    totals.vlaBudget += r.vlaBudget || 0;
    totals.actualExp += r.actualExp || 0;
    totals.seedcorn += r.seedcorn || 0;
    totals.manHours += r.manHours || 0;
    totals.payCosts += r.payCosts || 0;
    totals.nonPayOH += r.nonPayOH || 0;
    totals.testCosts += r.testCosts || 0;
    totals.projectSpecific += r.projectSpecific || 0;
    totals.animal += r.animal || 0;
  });
  document.getElementById("totalCustomerIncome").textContent = yfdFmt(
    totals.customerIncome,
  );
  document.getElementById("totalVLABudget").textContent = yfdFmt(
    totals.vlaBudget,
  );
  document.getElementById("totalActualExp").textContent = yfdFmt(
    totals.actualExp,
  );
  document.getElementById("totalSeedcorn").textContent = yfdFmt(
    totals.seedcorn,
  );
  document.getElementById("totalManHours").textContent = totals.manHours
    ? totals.manHours.toLocaleString("en-GB")
    : "";
  document.getElementById("totalPayCosts").textContent = yfdFmt(
    totals.payCosts,
  );
  document.getElementById("totalNonPay").textContent = yfdFmt(totals.nonPayOH);
  document.getElementById("totalTestCosts").textContent = yfdFmt(
    totals.testCosts,
  );
  document.getElementById("totalProjectSpecific").textContent = yfdFmt(
    totals.projectSpecific,
  );
  document.getElementById("totalAnimal").textContent = yfdFmt(totals.animal);
}

function initYFDTable(records) {
  yfdAllRecords = records;
  yfdFilteredRecords = yfdAllRecords.slice();
  yfdCurrentPage = 1;
  renderYFDTable();
  renderYFDTotals();
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  renderPagination(
    yfdFilteredRecords,
    yfdCurrentPage,
    perPage,
    "yfdPagination",
    yfdOnPageClick,
  );
}

/* ─── Modal open / close ────────────────────────────────────────────────────  */
function openYFDAddModal() {
  editingYFDId = null;
  yfdClearAllErrors();
  _yfdSetCostingPanelEnabled(false);
  document.getElementById("yfdModalTitle").textContent =
    "Add New Yearly Record";
  document.getElementById("formYFD").reset();
  document.getElementById("yfdModalProject").value =
    document.getElementById("yfdProject").value || "MD3024";
  document.getElementById("yfdSaveBtn").style.display = "";
  document.getElementById("yfdUpdateBtn").style.display = "none";
  document.getElementById("yfdActualExpReported").textContent = "—";
  document.getElementById("yfdActualManYearsReported").textContent = "—";
  document.getElementById("yfdModal").classList.add("open");
  yfdRefreshAllPounds();
  document.getElementById("yfdModalYear").focus();
}

function openYFDEditModal(item) {
  editingYFDId = item.id;
  yfdClearAllErrors();
  _yfdSetCostingPanelEnabled(false);
  document.getElementById("yfdModalTitle").textContent =
    "Show Details — Year " + item.year;
  document.getElementById("yfdModalProject").value =
    document.getElementById("yfdProject").value || "MD3024";
  document.getElementById("yfdModalYear").value = item.year || "";
  document.getElementById("yfdModalPPAcc").value = item.ppAcc || "";
  document.getElementById("yfdModalCustomerIncome").value =
    item.customerIncome || "";
  document.getElementById("yfdModalVLABudget").value = item.vlaBudget || "";
  document.getElementById("yfdModalSeedcorn").value = item.seedcorn || "";
  document.getElementById("yfdModalPayCosts").value = item.payCosts || "";
  document.getElementById("yfdModalNonPay").value = item.nonPayOH || "";
  document.getElementById("yfdModalTestCosts").value = item.testCosts || "";
  document.getElementById("yfdModalAnimalCosts").value = item.animal || "";
  document.getElementById("yfdModalProjectSpecific").value =
    item.projectSpecific || "";
  document.getElementById("yfdModalManHours").value = item.manHours || "";
  document.getElementById("yfdModalManDays").value = item.manDays || "";
  document.getElementById("yfdModalManYears").value = item.manYears || "";
  document.getElementById("yfdModalTotalCosts").value =
    item.totalCosts || "0.00";
  document.getElementById("yfdModalAdjustment").value = item.adjustment || "";
  document.getElementById("yfdModalAdjComment").value = item.adjComment2 || "";
  document.getElementById("yfdModalActualPact").value =
    item.actualPactDetails || "";
  document.getElementById("yfdModalDateFixed").value = item.dateFixed || "";
  document.getElementById("yfdModalFixedBy").value = item.fixedBy || "";
  document.getElementById("yfdModalFixed").checked = !!item.fixed;
  document.getElementById("yfdActualExpReported").textContent =
    item.actualExpReported || "—";
  document.getElementById("yfdActualManYearsReported").textContent =
    item.actualManYearsReported || "—";
  document.getElementById("yfdSaveBtn").style.display = "none";
  document.getElementById("yfdUpdateBtn").style.display = "";
  document.getElementById("yfdModal").classList.add("open");
  yfdRefreshAllPounds();
  document.getElementById("yfdModalYear").focus();
}

function closeYFDModal() {
  document.getElementById("yfdModal").classList.remove("open");
}

/* ─── Details / View Modal ──────────────────────────────────────────────────  */
function openYFDDetailsModal(item) {
  document.getElementById("yfdDetailsModalTitle").textContent =
    "PIMS Details \u2014 Year " + item.year;
  document.getElementById("detProject").value =
    document.getElementById("yfdProject").value || "MD3024";
  document.getElementById("detYear").value = item.year || "";
  document.getElementById("detPPAcc").value = item.ppAcc || "";
  document.getElementById("detCustomerIncome").value = item.customerIncome
    ? yfdFmt(item.customerIncome)
    : "";
  document.getElementById("detVLABudget").value = item.vlaBudget
    ? yfdFmt(item.vlaBudget)
    : "";
  document.getElementById("detSeedcorn").value = item.seedcorn
    ? yfdFmt(item.seedcorn)
    : "";
  document.getElementById("detPayCosts").value = item.payCosts
    ? yfdFmt(item.payCosts)
    : "";
  document.getElementById("detNonPay").value = item.nonPayOH
    ? yfdFmt(item.nonPayOH)
    : "";
  document.getElementById("detTestCosts").value = item.testCosts
    ? yfdFmt(item.testCosts)
    : "";
  document.getElementById("detAnimalCosts").value = item.animal
    ? yfdFmt(item.animal)
    : "";
  document.getElementById("detProjectSpecific").value = item.projectSpecific
    ? yfdFmt(item.projectSpecific)
    : "";
  document.getElementById("detManHours").value = item.manHours || "";
  document.getElementById("detManDays").value = item.manDays || "";
  document.getElementById("detManYears").value = item.manYears || "";
  document.getElementById("detTotalCosts").value =
    item.totalCosts != null ? yfdFmt(item.totalCosts) : "0.00";
  document.getElementById("detAdjustment").value = item.adjustment || "";
  document.getElementById("detAdjComment").value = item.adjComment2 || "";

  // Populate Actual (Pact) Details
  var fmtCurr = function (v) {
    var n = parseFloat(v);
    if (isNaN(n)) return "";
    return (
      "£" +
      n.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };
  var totalTimeCosts =
    (parseFloat(item.payCosts) || 0) + (parseFloat(item.nonPayOH) || 0);
  var manYears = item.manYears != null ? parseFloat(item.manYears) : null;
  document.getElementById("pactCustomerIncome").value = fmtCurr(
    item.customerIncome,
  );
  document.getElementById("pactVLABudget").value = fmtCurr(item.vlaBudget);
  document.getElementById("pactPay").value =
    item.payCosts != null && item.payCosts !== "" ? fmtCurr(item.payCosts) : "";
  document.getElementById("pactNonPayOH").value =
    item.nonPayOH != null && item.nonPayOH !== "" ? fmtCurr(item.nonPayOH) : "";
  document.getElementById("pactTotalTimeCosts").value = fmtCurr(totalTimeCosts);
  document.getElementById("pactTest").value = fmtCurr(item.testCosts);
  document.getElementById("pactAnimal").value = fmtCurr(item.animal);
  document.getElementById("pactProjectSpecific").value = fmtCurr(
    item.projectSpecific,
  );
  document.getElementById("pactTotalCosts").value = fmtCurr(item.totalCosts);
  document.getElementById("pactManHours").value =
    item.manHours != null ? String(item.manHours) : "";
  document.getElementById("pactManDays").value =
    item.manDays != null ? String(item.manDays) : "";
  document.getElementById("pactManYears").value =
    manYears != null ? manYears.toFixed(3) : "";

  document.getElementById("detFixed").checked = !!item.fixed;
  document.getElementById("detDateFixed").value = item.dateFixed || "";
  document.getElementById("detFixedBy").value = item.fixedBy || "";
  document.getElementById("detActualExpReported").textContent =
    item.actualExpReported || "\u2014";
  document.getElementById("detActualManYearsReported").textContent =
    item.actualManYearsReported || "\u2014";
  document.getElementById("yfdDetailsModal").classList.add("open");
}

function closeYFDDetailsModal() {
  document.getElementById("yfdDetailsModal").classList.remove("open");
}

/* ─── Validation helpers ───────────────────────────────────────────────────────  */
function yfdShowFieldError(fieldId, msg) {
  var el = document.getElementById(fieldId);
  if (!el) return;
  var group = el.closest(".govuk-form-group");
  if (!group) return;
  group.classList.add("govuk-form-group--error");
  if (el.tagName === "TEXTAREA") {
    el.classList.add("govuk-textarea--error");
  } else {
    el.classList.add("govuk-input--error");
  }
  var errId = fieldId + "-error";
  var errEl = document.getElementById(errId);
  if (!errEl) {
    errEl = document.createElement("p");
    errEl.id = errId;
    errEl.className = "govuk-error-message";
    errEl.style.fontSize = "13px";
    errEl.style.marginTop = "4px";
    var label = group.querySelector("label");
    if (label) {
      label.insertAdjacentElement("afterend", errEl);
    } else {
      group.insertBefore(errEl, group.firstElementChild);
    }
  }
  errEl.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + msg;
  errEl.style.display = "";
  var desc = (el.getAttribute("aria-describedby") || "")
    .split(" ")
    .filter(Boolean);
  if (desc.indexOf(errId) === -1) {
    desc.unshift(errId);
    el.setAttribute("aria-describedby", desc.join(" "));
  }
}

function yfdClearAllErrors() {
  var form = document.getElementById("formYFD");
  if (!form) return;
  form.querySelectorAll(".govuk-form-group--error").forEach(function (g) {
    g.classList.remove("govuk-form-group--error");
  });
  form.querySelectorAll(".govuk-input--error").forEach(function (i) {
    i.classList.remove("govuk-input--error");
  });
  form.querySelectorAll(".govuk-textarea--error").forEach(function (t) {
    t.classList.remove("govuk-textarea--error");
  });
  form.querySelectorAll(".govuk-error-message").forEach(function (e) {
    e.style.display = "none";
  });
  yfdClearFormError();
}

function yfdShowFormError(msg) {
  var el = document.getElementById("yfdFormError");
  var msgEl = document.getElementById("yfdFormErrorMsg");
  if (el) {
    el.style.display = "";
    el.focus();
  }
  if (msgEl) {
    msgEl.textContent = msg;
  }
}

function yfdClearFormError() {
  var el = document.getElementById("yfdFormError");
  if (el) {
    el.style.display = "none";
  }
}

/* ─── Save / Update ─────────────────────────────────────────────────────────  */
function saveYFD() {
  yfdClearAllErrors();
  var yearVal = document.getElementById("yfdModalYear").value.trim();
  var valid = true;

  /* --- Year (mandatory) --- */
  // if (!yearVal) {
  //   yfdShowFieldError("yfdModalYear", "Enter a year");
  //   valid = false;
  // }
  // } else if (
  //   !/^\d{4}$/.test(yearVal) ||
  //   parseInt(yearVal, 10) < 1900 ||
  //   parseInt(yearVal, 10) > 2099
  // ) {
  //   yfdShowFieldError(
  //     "yfdModalYear",
  //     "Enter a valid 4-digit year, for example 2026",
  //   );
  //   valid = false;
  // }

  /* --- Numeric fields (optional, but must be a number if filled) --- */
  var numFields = [
    { id: "yfdModalCustomerIncome", label: "Customer Income" },
    { id: "yfdModalVLABudget", label: "VLA Budget" },
    { id: "yfdModalSeedcorn", label: "Seedcorn" },
    { id: "yfdModalPayCosts", label: "Pay Costs" },
    { id: "yfdModalNonPay", label: "Non-Pay \u0026 OH Costs" },
    { id: "yfdModalTestCosts", label: "Test Costs" },
    { id: "yfdModalAnimalCosts", label: "Animal Costs" },
    { id: "yfdModalProjectSpecific", label: "Project-Specific Costs" },
    { id: "yfdModalAdjustment", label: "Adjustment" },
    { id: "yfdModalManHours", label: "Appr. Man Hours" },
    { id: "yfdModalManDays", label: "Appr. Man Days" },
    { id: "yfdModalManYears", label: "Appr. Man Years" },
  ];
  numFields.forEach(function (f) {
    var v = document
      .getElementById(f.id)
      .value.trim()
      .replace(/£/g, "")
      .replace(/,/g, "");
    if (v !== "" && isNaN(parseFloat(v))) {
      yfdShowFieldError(f.id, f.label + " must be a number");
      valid = false;
    }
  });

  /* --- Date Fixed: DD/MM/YYYY if supplied --- */
  var dateFixedVal = document.getElementById("yfdModalDateFixed").value.trim();
  if (dateFixedVal && !/^\d{2}\/\d{2}\/\d{4}$/.test(dateFixedVal)) {
    yfdShowFieldError(
      "yfdModalDateFixed",
      "Enter a date in DD/MM/YYYY format, for example 14/04/2026",
    );
    valid = false;
  }

  if (!valid) {
    var firstErr = document.querySelector(
      "#formYFD .govuk-form-group--error .govuk-input--error, #formYFD .govuk-form-group--error .govuk-textarea--error",
    );
    if (firstErr) {
      firstErr.focus();
    }
    return;
  }

  var record = {
    id: editingYFDId || yfdNextId++,
    year: parseInt(yearVal) || yearVal,
    ppAcc: document.getElementById("yfdModalPPAcc").value.trim(),
    customerIncome:
      parseFloat(
        document
          .getElementById("yfdModalCustomerIncome")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    vlaBudget:
      parseFloat(
        document
          .getElementById("yfdModalVLABudget")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    actualExp: 0,
    seedcorn:
      parseFloat(
        document
          .getElementById("yfdModalSeedcorn")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    manHours:
      parseFloat(document.getElementById("yfdModalManHours").value) || 0,
    manDays: parseFloat(document.getElementById("yfdModalManDays").value) || 0,
    manYears:
      parseFloat(document.getElementById("yfdModalManYears").value) || 0,
    payCosts:
      parseFloat(
        document
          .getElementById("yfdModalPayCosts")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    nonPayOH:
      parseFloat(
        document
          .getElementById("yfdModalNonPay")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    testCosts:
      parseFloat(
        document
          .getElementById("yfdModalTestCosts")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    projectSpecific:
      parseFloat(
        document
          .getElementById("yfdModalProjectSpecific")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    animal:
      parseFloat(
        document
          .getElementById("yfdModalAnimalCosts")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    exceptionalAdj: 0,
    adjComment: "",
    adjustment:
      parseFloat(
        document
          .getElementById("yfdModalAdjustment")
          .value.replace(/£/g, "")
          .replace(/,/g, ""),
      ) || 0,
    adjComment2: document.getElementById("yfdModalAdjComment").value,
    actualPactDetails: document.getElementById("yfdModalActualPact").value,
    dateFixed: document.getElementById("yfdModalDateFixed").value,
    fixedBy: document.getElementById("yfdModalFixedBy").value,
    fixed: document.getElementById("yfdModalFixed").checked,
    totalCosts: document.getElementById("yfdModalTotalCosts").value,
    actualExpReported: document.getElementById("yfdActualExpReported")
      .textContent,
    actualManYearsReported: document.getElementById("yfdActualManYearsReported")
      .textContent,
  };

  if (editingYFDId !== null) {
    yfdAllRecords = yfdAllRecords.filter(function (r) {
      return r.id !== editingYFDId;
    });
    yfdAllRecords.unshift(record);
  } else {
    yfdAllRecords.unshift(record);
  }
  yfdFilteredRecords = yfdAllRecords.slice();
  closeYFDModal();
  renderYFDTable();
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  renderPagination(
    yfdFilteredRecords,
    yfdCurrentPage,
    perPage,
    "yfdPagination",
    yfdOnPageClick,
  );
}

/* ─── Delete ────────────────────────────────────────────────────────────────  */
function openYFDDeleteModal(id, year) {
  yfdDeleteId = id;
  document.getElementById("yfdDeleteYearLabel").textContent = year;
  document.getElementById("yfdDeleteModal").classList.add("open");
}

function closeYFDDeleteModal() {
  document.getElementById("yfdDeleteModal").classList.remove("open");
}

function confirmDeleteYFD() {
  yfdAllRecords = yfdAllRecords.filter(function (r) {
    return r.id !== yfdDeleteId;
  });
  yfdFilteredRecords = yfdAllRecords.slice();
  yfdDeleteId = null;
  closeYFDDeleteModal();
  renderYFDTable();
  var perPage =
    parseInt(document.getElementById("yfdRecordsPerPage").value) || 5;
  renderPagination(
    yfdFilteredRecords,
    yfdCurrentPage,
    perPage,
    "yfdPagination",
    yfdOnPageClick,
  );
}

/* ─── £ currency-prefix helpers ────────────────────────────────────────────  */
var yfdCurrencyFieldIds = [
  "yfdModalCustomerIncome",
  "yfdModalVLABudget",
  "yfdModalSeedcorn",
  "yfdModalPayCosts",
  "yfdModalNonPay",
  "yfdModalTestCosts",
  "yfdModalAnimalCosts",
  "yfdModalProjectSpecific",
  "yfdModalTotalCosts",
  "yfdModalAdjustment",
];

function yfdTogglePound(inputEl) {
  // Format on blur: £X,XXX.XX inside the input value
  var raw = inputEl.value.trim().replace(/£/g, "").replace(/,/g, "");
  if (raw === "" || raw === "-") return;
  var n = parseFloat(raw);
  if (isNaN(n)) return;
  inputEl.value =
    "£" +
    n.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

function yfdRefreshAllPounds() {
  yfdCurrencyFieldIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) yfdTogglePound(el);
  });
}

/* ─── Costing panel stubs ───────────────────────────────────────────────────  */
function _yfdSetCostingPanelEnabled(enabled) {
  var panel = document.getElementById("yfdCostingPanel");
  if (!panel) return;
  if (enabled) {
    panel.classList.remove("yfd-costing-panel--disabled");
    panel.removeAttribute("aria-disabled");
  } else {
    panel.classList.add("yfd-costing-panel--disabled");
    panel.setAttribute("aria-disabled", "true");
  }
}
function updateCosting() {
  _yfdSetCostingPanelEnabled(true);
  /* stub — would call API in production */
}
function fixCosting() {
  _yfdSetCostingPanelEnabled(true);
  document.getElementById("yfdModalFixed").checked = true;
  var today = new Date();
  document.getElementById("yfdModalDateFixed").value =
    ("0" + today.getDate()).slice(-2) +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    today.getFullYear();
}

/* ─── Load a project into the grid ─────────────────────────────────────────  */
function loadProject(code) {
  var proj = yfdProjectMap[code];
  if (!proj) return;
  document.getElementById("yfdStartDate").value = proj.startDate || "";
  document.getElementById("yfdEndDate").value = proj.endDate || "";
  yfdNextId =
    proj.records.reduce(function (max, r) {
      return Math.max(max, r.id);
    }, 0) + 1;
  initYFDTable(proj.records);
}

/* ─── DOMContentLoaded wiring ───────────────────────────────────────────────  */
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("yfdRecordsPerPage")
    .addEventListener("change", function () {
      yfdCurrentPage = 1;
      renderYFDTable();
      var perPage = parseInt(this.value) || 5;
      renderPagination(
        yfdFilteredRecords,
        yfdCurrentPage,
        perPage,
        "yfdPagination",
        yfdOnPageClick,
      );
    });

  /* Populate project dropdown from inline data */
  var sel = document.getElementById("yfdProject");
  sel.innerHTML = "";
  yfdProjects.forEach(function (proj) {
    var opt = document.createElement("option");
    opt.value = proj.code;
    opt.textContent = proj.code;
    sel.appendChild(opt);
  });
  if (yfdProjects.length > 0) {
    loadProject(yfdProjects[0].code);
  }

  /* Reload grid when project changes */
  document.getElementById("yfdProject").addEventListener("change", function () {
    yfdCurrentPage = 1;
    loadProject(this.value);
  });

  /* Wire sortable column header clicks */
  document
    .querySelectorAll("#tblYFD th.sortable-header")
    .forEach(function (th) {
      th.addEventListener("click", function () {
        sortYFD(parseInt(th.dataset.column, 10));
      });
    });

  /* Wire £ inline formatting on blur/focus for monetary modal fields */
  yfdCurrencyFieldIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("blur", function () {
      yfdTogglePound(this);
    });
    el.addEventListener("focus", function () {
      // Strip £ and commas so user edits raw number
      var raw = this.value.trim().replace(/£/g, "").replace(/,/g, "");
      this.value = raw;
    });
  });

  /* Sync horizontal scroll between data table and totals table */
  var dataWrapper = document.getElementById("yfdDataScrollWrapper");
  var totalsWrapper = document.getElementById("yfdTotalsScrollWrapper");
  if (dataWrapper && totalsWrapper) {
    var syncing = false;
    dataWrapper.addEventListener("scroll", function () {
      if (syncing) return;
      syncing = true;
      totalsWrapper.scrollLeft = dataWrapper.scrollLeft;
      syncing = false;
    });
    totalsWrapper.addEventListener("scroll", function () {
      if (syncing) return;
      syncing = true;
      dataWrapper.scrollLeft = totalsWrapper.scrollLeft;
      syncing = false;
    });
  }
});
