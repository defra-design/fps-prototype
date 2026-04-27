"use strict";

/* ─── Sample data ─ Invoices (from screenshot, Record: 1 of 93) ─────────────  */
var invAllRecords = [
  {
    id: 1,
    project: "OR1005",
    contract: "",
    plannedAmt: -26885.2,
    amountDue: 19047.0,
    dateDue: "26/07/2009",
    amtInvoiced: 0,
    dateJSRaised: "",
    invoiceRef: "",
    paid: false,
    dateInvoiced: "",
  },
  {
    id: 2,
    project: "FT1422",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "26/04/2010",
    amtInvoiced: 1880.0,
    dateJSRaised: "12/04/2010",
    invoiceRef: "2-25000",
    paid: false,
    dateInvoiced: "12/04/2010",
  },
  {
    id: 3,
    project: "FT1422",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "26/06/2010",
    amtInvoiced: 2045.0,
    dateJSRaised: "26/05/2010",
    invoiceRef: "2-25359",
    paid: false,
    dateInvoiced: "26/05/2010",
  },
  {
    id: 4,
    project: "OR1005",
    contract: "",
    plannedAmt: 0,
    amountDue: 17926.09,
    dateDue: "26/07/2010",
    amtInvoiced: 0,
    dateJSRaised: "",
    invoiceRef: "",
    paid: false,
    dateInvoiced: "",
  },
  {
    id: 5,
    project: "FT1380",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "26/10/2010",
    amtInvoiced: 591.0,
    dateJSRaised: "26/10/2010",
    invoiceRef: "1-201043",
    paid: false,
    dateInvoiced: "26/10/2010",
  },
  {
    id: 6,
    project: "FT1488",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "26/10/2010",
    amtInvoiced: 12353.0,
    dateJSRaised: "26/10/2010",
    invoiceRef: "1-201041",
    paid: false,
    dateInvoiced: "26/10/2010",
  },
  {
    id: 7,
    project: "FT1489",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "26/10/2010",
    amtInvoiced: 12353.0,
    dateJSRaised: "26/10/2010",
    invoiceRef: "1-201040",
    paid: false,
    dateInvoiced: "26/10/2010",
  },
  {
    id: 8,
    project: "FT1318",
    contract: "",
    plannedAmt: 0,
    amountDue: 0,
    dateDue: "27/01/2011",
    amtInvoiced: 4510.0,
    dateJSRaised: "27/01/2011",
    invoiceRef: "2-26931",
    paid: false,
    dateInvoiced: "",
  },
  {
    id: 9,
    project: "RY0051",
    contract: "",
    plannedAmt: 84.0,
    amountDue: 84.0,
    dateDue: "27/01/2011",
    amtInvoiced: 84.0,
    dateJSRaised: "27/01/2011",
    invoiceRef: "2-26937",
    paid: false,
    dateInvoiced: "27/01/2011",
  },
];

var invFilteredRecords = invAllRecords.slice();
var invCurrentPage = 1;
var editingInvId = null;
var invDeleteId = null;
var invNextId = 10;

/* ─── Formatting helper ─────────────────────────────────────────────────────  */
function invFmt(val) {
  if (val === 0 || val === "" || val === null || val === undefined) {
    return "";
  }
  var n = parseFloat(val);
  if (isNaN(n)) {
    return val;
  }
  var prefix = n < 0 ? "-£" : "£";
  return (
    prefix +
    Math.abs(n).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/* ─── Pagination callback ───────────────────────────────────────────────────  */
function invOnPageClick(page) {
  invCurrentPage = page;
  renderInvTable();
  var perPage =
    parseInt(document.getElementById("invRecordsPerPage").value) || 5;
  renderPagination(
    invFilteredRecords,
    invCurrentPage,
    perPage,
    "invPagination",
    invOnPageClick,
  );
}

/* ─── Render table ──────────────────────────────────────────────────────────  */
function renderInvTable() {
  var tbody = document.getElementById("tblInvBody");
  var perPage =
    parseInt(document.getElementById("invRecordsPerPage").value) || 5;
  var start = (invCurrentPage - 1) * perPage;
  var slice = invFilteredRecords.slice(start, start + perPage);

  if (slice.length === 0) {
    renderEmptyRow("tblInvBody", 11, "No invoices found.");
    return;
  }

  tbody.innerHTML = slice
    .map(function (r) {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell">' +
        (r.project || "") +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.contract || "") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:right;">' +
        invFmt(r.plannedAmt) +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:right;">' +
        invFmt(r.amountDue) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.dateDue || "") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:right;">' +
        invFmt(r.amtInvoiced) +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.dateJSRaised || "") +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.invoiceRef || "") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:center;">' +
        (r.paid ? '<span aria-label="Paid">&#10003;</span>' : "") +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (r.dateInvoiced || "") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align:center;">' +
        "<button onclick='openInvEditModal(" +
        JSON.stringify(r) +
        ")'" +
        ' aria-label="Edit invoice for ' +
        (r.project || "") +
        " due " +
        (r.dateDue || "") +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20"></button>' +
        '<button onclick="openInvDeleteModal(' +
        r.id +
        ')"' +
        ' aria-label="Delete invoice for ' +
        (r.project || "") +
        " due " +
        (r.dateDue || "") +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button>' +
        "</td></tr>"
      );
    })
    .join("");
}

/* ─── Filters ───────────────────────────────────────────────────────────────  */
function applyInvoiceFilters() {
  var project = document.getElementById("invFilterProject").value;
  var surv = document.getElementById("invFilterSurvContract").value;
  var year = document.getElementById("invFilterYear").value;
  var program = document.getElementById("invFilterProgram").value;
  invFilteredRecords = invAllRecords.filter(function (r) {
    var projMatch = !project || r.project === project;
    var survMatch = !surv || r.contract === surv;
    return projMatch && survMatch;
  });
  invCurrentPage = 1;
  renderInvTable();
  var perPage =
    parseInt(document.getElementById("invRecordsPerPage").value) || 5;
  renderPagination(
    invFilteredRecords,
    invCurrentPage,
    perPage,
    "invPagination",
    invOnPageClick,
  );
}

/* ─── Modal open / close ────────────────────────────────────────────────────  */
function openInvAddModal() {
  editingInvId = null;
  document.getElementById("invModalTitle").textContent = "Add Invoice";
  document.getElementById("formInv").reset();
  document.getElementById("invSaveBtn").style.display = "";
  document.getElementById("invUpdateBtn").style.display = "none";
  document.getElementById("invModal").classList.add("open");
  document.getElementById("invModalProject").focus();
}

function openInvEditModal(item) {
  editingInvId = item.id;
  document.getElementById("invModalTitle").textContent = "Edit Invoice";
  document.getElementById("invModalProject").value = item.project || "";
  document.getElementById("invModalContract").value = item.contract || "";
  document.getElementById("invModalPlannedAmt").value = item.plannedAmt || "";
  document.getElementById("invModalAmountDue").value = item.amountDue || "";
  document.getElementById("invModalDateDue").value = item.dateDue || "";
  document.getElementById("invModalAmtInvoiced").value = item.amtInvoiced || "";
  document.getElementById("invModalDateJSRaised").value =
    item.dateJSRaised || "";
  document.getElementById("invModalInvoiceRef").value = item.invoiceRef || "";
  document.getElementById("invModalPaid").checked = !!item.paid;
  document.getElementById("invModalDateInvoiced").value =
    item.dateInvoiced || "";
  document.getElementById("invSaveBtn").style.display = "none";
  document.getElementById("invUpdateBtn").style.display = "";
  document.getElementById("invModal").classList.add("open");
  document.getElementById("invModalProject").focus();
}

function closeInvModal() {
  document.getElementById("invModal").classList.remove("open");
}

function saveInv() {
  var record = {
    id: editingInvId || invNextId++,
    project: document.getElementById("invModalProject").value,
    contract: document.getElementById("invModalContract").value.trim(),
    plannedAmt:
      parseFloat(document.getElementById("invModalPlannedAmt").value) || 0,
    amountDue:
      parseFloat(document.getElementById("invModalAmountDue").value) || 0,
    dateDue: document.getElementById("invModalDateDue").value.trim(),
    amtInvoiced:
      parseFloat(document.getElementById("invModalAmtInvoiced").value) || 0,
    dateJSRaised: document.getElementById("invModalDateJSRaised").value.trim(),
    invoiceRef: document.getElementById("invModalInvoiceRef").value.trim(),
    paid: document.getElementById("invModalPaid").checked,
    dateInvoiced: document.getElementById("invModalDateInvoiced").value.trim(),
  };
  if (editingInvId !== null) {
    invAllRecords = invAllRecords.map(function (r) {
      return r.id === editingInvId ? record : r;
    });
  } else {
    invAllRecords.push(record);
  }
  invFilteredRecords = invAllRecords.slice();
  closeInvModal();
  renderInvTable();
  var perPage =
    parseInt(document.getElementById("invRecordsPerPage").value) || 5;
  renderPagination(
    invFilteredRecords,
    invCurrentPage,
    perPage,
    "invPagination",
    invOnPageClick,
  );
}

/* ─── Delete ────────────────────────────────────────────────────────────────  */
function openInvDeleteModal(id) {
  invDeleteId = id;
  document.getElementById("invDeleteModal").classList.add("open");
}

function closeInvDeleteModal() {
  document.getElementById("invDeleteModal").classList.remove("open");
}

function confirmDeleteInv() {
  invAllRecords = invAllRecords.filter(function (r) {
    return r.id !== invDeleteId;
  });
  invFilteredRecords = invAllRecords.slice();
  invDeleteId = null;
  closeInvDeleteModal();
  renderInvTable();
  var perPage =
    parseInt(document.getElementById("invRecordsPerPage").value) || 5;
  renderPagination(
    invFilteredRecords,
    invCurrentPage,
    perPage,
    "invPagination",
    invOnPageClick,
  );
}

/* ─── DOMContentLoaded ──────────────────────────────────────────────────────  */
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("invRecordsPerPage")
    .addEventListener("change", function () {
      invCurrentPage = 1;
      renderInvTable();
      var perPage = parseInt(this.value) || 5;
      renderPagination(
        invFilteredRecords,
        invCurrentPage,
        perPage,
        "invPagination",
        invOnPageClick,
      );
    });

  document
    .getElementById("btnInvFilter")
    .addEventListener("click", applyInvoiceFilters);

  renderInvTable();
  renderPagination(
    invFilteredRecords,
    invCurrentPage,
    5,
    "invPagination",
    invOnPageClick,
  );
});
