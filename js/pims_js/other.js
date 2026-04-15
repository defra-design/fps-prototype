"use strict";

/* =====================================================
   Other Tab – List Description + Values grids
   PIMS Report Admin Maintenance
   ===================================================== */

// ── Dataset definitions ──────────────────────────────
var OTHER_LISTS = [
  {
    key: "Frequency",
    label: "Frequency",
    idCol: "FrequencyID",
    valCol: "Frequency",
    data: [
      { id: 0, value: "Weekly" },
      { id: 1, value: "Monthly" },
      { id: 2, value: "Quarterly" },
      { id: 3, value: "Annually" },
    ],
  },
  {
    key: "PublicationTypes",
    label: "PublicationTypes",
    idCol: "PublicationTypeID",
    valCol: "PublicationType",
    data: [
      { id: "NPR", value: "Non peer-reviewed publication." },
      { id: "PRP", value: "Peer-reviewed publication." },
    ],
  },
  {
    key: "ReportGroups",
    label: "ReportGroups",
    idCol: "GroupID",
    valCol: "Description",
    data: [
      { id: 1, value: "Annual & Final" },
      { id: 2, value: "EU" },
      { id: 3, value: "Deliverables" },
      { id: 4, value: "Invoicing" },
      { id: 5, value: "Milestones" },
      { id: 6, value: "Programme & Project Monitoring" },
      { id: 7, value: "Survailance Contracts" },
    ],
  },
  {
    key: "ReviewItems",
    label: "ReviewItems",
    idCol: "ItemID",
    valCol: "Item",
    data: [
      { id: 1, value: "Meetings" },
      { id: 2, value: "Status Report" },
      { id: 3, value: "Risk Register" },
      { id: 7, value: "Financial Performance" },
      { id: 8, value: "Milestones" },
      { id: 9, value: "Gantt Chart" },
      { id: 10, value: "Work Breakdown Structure" },
    ],
  },
  {
    key: "Risk",
    label: "Risk",
    idCol: "RiskID",
    valCol: "Risk",
    data: [
      { id: 0, value: "Low" },
      { id: 1, value: "Medium" },
      { id: 2, value: "High" },
      { id: 3, value: "Very High" },
    ],
  },
];

// ── State ────────────────────────────────────────────
var otherState = {
  selectedKey: "Frequency",
  sortCol: null, // "id" | "value"
  sortDir: "asc",
  currentPage: 1,
  rowsPerPage: 5,
  filtered: [],
};

// ── Helpers ──────────────────────────────────────────
function otherEscape(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function otherGetList(key) {
  for (var i = 0; i < OTHER_LISTS.length; i++) {
    if (OTHER_LISTS[i].key === key) return OTHER_LISTS[i];
  }
  return null;
}

// ── Initialise ───────────────────────────────────────
function initOtherTab() {
  renderListDescriptionGrid();
  renderValuesPanel("Frequency");
}

// ── Left panel: List Description ─────────────────────
function renderListDescriptionGrid() {
  var tbody = document.getElementById("otherListBody");
  if (!tbody) return;

  var html = "";
  for (var i = 0; i < OTHER_LISTS.length; i++) {
    var list = OTHER_LISTS[i];
    var selected =
      list.key === otherState.selectedKey ? " other-row-selected" : "";
    html +=
      '<tr class="' +
      selected +
      '" data-key="' +
      otherEscape(list.key) +
      '" ' +
      'tabindex="0" role="row" aria-selected="' +
      (selected ? "true" : "false") +
      '">' +
      "<td>" +
      otherEscape(list.label) +
      "</td>" +
      "</tr>";
  }
  tbody.innerHTML = html;

  // Attach click & keyboard events
  var rows = tbody.querySelectorAll("tr");
  for (var j = 0; j < rows.length; j++) {
    (function (row) {
      row.addEventListener("click", function () {
        otherSelectRow(row.getAttribute("data-key"));
      });
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          otherSelectRow(row.getAttribute("data-key"));
        }
      });
    })(rows[j]);
  }
}

function otherSelectRow(key) {
  otherState.selectedKey = key;
  otherState.currentPage = 1;
  otherState.sortCol = null;
  otherState.sortDir = "asc";
  renderListDescriptionGrid();
  renderValuesPanel(key);
}

// ── Right panel: Values ───────────────────────────────
function renderValuesPanel(key) {
  var panel = document.getElementById("otherValuesPanel");
  if (!panel) return;

  if (!key) {
    panel.innerHTML =
      '<p class="other-no-selection">Select a list on the left to view its values.</p>';
    return;
  }

  var list = otherGetList(key);
  if (!list) return;

  // Build sorted + paginated data
  var data = list.data.slice(); // copy
  if (otherState.sortCol) {
    var col = otherState.sortCol;
    var dir = otherState.sortDir === "asc" ? 1 : -1;
    data.sort(function (a, b) {
      var av = col === "id" ? a.id : a.value;
      var bv = col === "id" ? b.id : b.value;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  otherState.filtered = data;
  var total = data.length;
  var rpp = otherState.rowsPerPage;
  var totalPages = Math.max(1, Math.ceil(total / rpp));
  if (otherState.currentPage > totalPages) otherState.currentPage = totalPages;
  var start = (otherState.currentPage - 1) * rpp;
  var pageData = data.slice(start, start + rpp);

  // Sort icons
  function sortIcon(col) {
    if (otherState.sortCol !== col)
      return '<span class="other-sort-icon" aria-hidden="true"></span>';
    var cls =
      otherState.sortDir === "asc" ? " other-sort-asc" : " other-sort-desc";
    return cls; // returned as class suffix
  }

  function thClass(col) {
    if (otherState.sortCol !== col) return "";
    return otherState.sortDir === "asc"
      ? " other-sort-asc"
      : " other-sort-desc";
  }

  // Build table rows
  var rowsHtml = "";
  if (pageData.length === 0) {
    rowsHtml =
      '<tr class="other-empty-row"><td colspan="3">No records found.</td></tr>';
  } else {
    for (var i = 0; i < pageData.length; i++) {
      var rec = pageData[i];
      rowsHtml +=
        "<tr>" +
        '<td class="other-col-id">' +
        otherEscape(rec.id) +
        "</td>" +
        "<td>" +
        otherEscape(rec.value) +
        "</td>" +
        '<td class="other-col-actions">' +
        '<button type="button" class="action-btn ra-btn-action ra-btn-edit other-edit-btn" ' +
        'data-id="' +
        otherEscape(rec.id) +
        '" ' +
        'style="border:none;background:#fff;" ' +
        'aria-label="Edit ' +
        otherEscape(rec.value) +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" class="editjobcode" width="20"></button> ' +
        '<button type="button" class="action-btn ra-btn-action ra-btn-delete other-delete-btn" ' +
        'data-id="' +
        otherEscape(rec.id) +
        '" ' +
        'style="border:none;background:#fff;" ' +
        'aria-label="Delete ' +
        otherEscape(rec.value) +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button>' +
        "</td>" +
        "</tr>";
    }
  }

  // Build pagination
  var paginationHtml = buildOtherPagination(totalPages, total);

  var html =
    '<div class="other-panel-header" style="display:flex;justify-content:space-between;align-items:center;">' +
    "<span>Values</span>" +
    '<button type="button" class="govuk-button govuk-button--primary sup_margin_0 other-btn-add-value" ' +
    'style="font-size:14px;padding:5px 4px;" aria-label="Add new ' +
    otherEscape(list.label) +
    ' value">+ Add ' +
    otherEscape(list.label) +
    "</button>" +
    "</div>" +
    '<div class="other-table-scroll">' +
    '<table class="govuk-table custom-table other-values-table" id="otherValuesTable" ' +
    'aria-label="' +
    otherEscape(list.label) +
    ' values grid">' +
    '<thead class="govuk-table__head">' +
    '<tr class="govuk-table__row">' +
    '<th scope="col" class="govuk-table__header other-th-sortable other-col-id' +
    thClass("id") +
    '" ' +
    'data-sort="id" tabindex="0" aria-sort="' +
    (otherState.sortCol === "id"
      ? otherState.sortDir === "asc"
        ? "ascending"
        : "descending"
      : "none") +
    '">' +
    otherEscape(list.idCol) +
    '<span class="other-sort-icon" aria-hidden="true"></span>' +
    "</th>" +
    '<th scope="col" class="govuk-table__header other-th-sortable' +
    thClass("value") +
    '" ' +
    'data-sort="value" tabindex="0" aria-sort="' +
    (otherState.sortCol === "value"
      ? otherState.sortDir === "asc"
        ? "ascending"
        : "descending"
      : "none") +
    '">' +
    otherEscape(list.valCol) +
    '<span class="other-sort-icon" aria-hidden="true"></span>' +
    "</th>" +
    '<th scope="col" class="govuk-table__header ra-col-actions">Actions</th>' +
    "</tr>" +
    "</thead>" +
    '<tbody class="govuk-table__body" id="otherValuesBody">' +
    rowsHtml +
    "</tbody>" +
    "</table>" +
    "</div>" +
    paginationHtml;

  panel.innerHTML = html;

  // Attach sort events to headers
  var ths = panel.querySelectorAll(".other-th-sortable");
  for (var j = 0; j < ths.length; j++) {
    (function (th) {
      th.addEventListener("click", function () {
        otherHandleSort(th.getAttribute("data-sort"));
      });
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          otherHandleSort(th.getAttribute("data-sort"));
        }
      });
    })(ths[j]);
  }

  // Attach pagination events
  attachOtherPaginationEvents();
  // Attach action button events (Add / Edit / Delete)
  attachOtherActionEvents();
}

// ── Sorting ───────────────────────────────────────────
function otherHandleSort(col) {
  if (otherState.sortCol === col) {
    otherState.sortDir = otherState.sortDir === "asc" ? "desc" : "asc";
  } else {
    otherState.sortCol = col;
    otherState.sortDir = "asc";
  }
  otherState.currentPage = 1;
  renderValuesPanel(otherState.selectedKey);
}

// ── Pagination ────────────────────────────────────────
function buildOtherPagination(totalPages, total) {
  var rpp = otherState.rowsPerPage;
  var cur = otherState.currentPage;

  var prevDisabled = cur <= 1;
  var nextDisabled = cur >= totalPages;

  // Records per page select
  var rppOptions = [5, 10, 15, 20]
    .map(function (v) {
      return (
        '<option value="' +
        v +
        '"' +
        (rpp === v ? " selected" : "") +
        ">" +
        v +
        "</option>"
      );
    })
    .join("");

  // Page number buttons (show max 5 pages around current)
  var pagesHtml = "";
  var pageStart = Math.max(1, cur - 2);
  var pageEnd = Math.min(totalPages, pageStart + 4);
  if (pageEnd - pageStart < 4) pageStart = Math.max(1, pageEnd - 4);

  for (var p = pageStart; p <= pageEnd; p++) {
    var isCurrent = p === cur;
    pagesHtml +=
      '<li class="govuk-pagination__item' +
      (isCurrent ? " govuk-pagination__item--current" : "") +
      '">' +
      '<a class="govuk-link govuk-pagination__link other-page-btn" data-page="' +
      p +
      '" ' +
      'aria-label="Page ' +
      p +
      '"' +
      (isCurrent ? ' aria-current="page"' : "") +
      ">" +
      p +
      "</a>" +
      "</li>";
  }

  return (
    '<div class="sup_pagination_footer sup_border">' +
    '<div class="sup_pagination_wrapper">' +
    '<div class="sup_margin_top_bottom_5_10">' +
    '<label class="pagination-label" for="otherRecordsPerPage">Records per page</label>&nbsp;' +
    '<select id="otherRecordsPerPage" class="govuk-select sup_select_pagination_width">' +
    rppOptions +
    "</select>" +
    "</div>" +
    '<nav class="govuk-pagination govuk-!-margin-bottom-0" aria-label="Values grid pagination">' +
    '<ul class="govuk-pagination__list" id="otherPaginationList">' +
    '<li class="govuk-pagination__item' +
    (prevDisabled ? " disabled" : "") +
    '">' +
    '<a class="govuk-link govuk-pagination__link other-prev-btn"' +
    (prevDisabled ? ' aria-disabled="true" tabindex="-1"' : "") +
    ">" +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">' +
    '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path></svg>' +
    '<span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>' +
    "</a></li>" +
    pagesHtml +
    '<li class="govuk-pagination__item' +
    (nextDisabled ? " disabled" : "") +
    '">' +
    '<a class="govuk-link govuk-pagination__link other-next-btn"' +
    (nextDisabled ? ' aria-disabled="true" tabindex="-1"' : "") +
    ">" +
    '<span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">' +
    '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path></svg>' +
    "</a></li>" +
    "</ul>" +
    "</nav>" +
    "</div></div>"
  );
}

function attachOtherPaginationEvents() {
  // Prev
  var prevBtn = document.querySelector(".other-prev-btn");
  if (prevBtn && !prevBtn.getAttribute("aria-disabled")) {
    prevBtn.addEventListener("click", function () {
      if (otherState.currentPage > 1) {
        otherState.currentPage--;
        renderValuesPanel(otherState.selectedKey);
      }
    });
  }

  // Next
  var nextBtn = document.querySelector(".other-next-btn");
  if (nextBtn && !nextBtn.getAttribute("aria-disabled")) {
    nextBtn.addEventListener("click", function () {
      var list = otherGetList(otherState.selectedKey);
      if (!list) return;
      var total = otherState.filtered.length;
      var totalPages = Math.ceil(total / otherState.rowsPerPage);
      if (otherState.currentPage < totalPages) {
        otherState.currentPage++;
        renderValuesPanel(otherState.selectedKey);
      }
    });
  }

  // Page buttons
  var pageBtns = document.querySelectorAll(".other-page-btn");
  for (var i = 0; i < pageBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        otherState.currentPage = parseInt(btn.getAttribute("data-page"), 10);
        renderValuesPanel(otherState.selectedKey);
      });
    })(pageBtns[i]);
  }

  // Records per page
  var rppSel = document.getElementById("otherRecordsPerPage");
  if (rppSel) {
    rppSel.addEventListener("change", function () {
      otherState.rowsPerPage = parseInt(rppSel.value, 10);
      otherState.currentPage = 1;
      renderValuesPanel(otherState.selectedKey);
    });
  }
}

// ── Action events (Add / Edit / Delete) ──────────────
function attachOtherActionEvents() {
  var addBtn = document.querySelector(".other-btn-add-value");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      openOtherAddModal();
    });
  }

  var editBtns = document.querySelectorAll(".other-edit-btn");
  for (var i = 0; i < editBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var list = otherGetList(otherState.selectedKey);
        if (!list) return;
        var rec = null;
        for (var j = 0; j < list.data.length; j++) {
          if (String(list.data[j].id) === id) {
            rec = list.data[j];
            break;
          }
        }
        if (rec) openOtherEditModal(rec);
      });
    })(editBtns[i]);
  }

  var deleteBtns = document.querySelectorAll(".other-delete-btn");
  for (var k = 0; k < deleteBtns.length; k++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var list = otherGetList(otherState.selectedKey);
        if (!list) return;
        var rec = null;
        for (var j = 0; j < list.data.length; j++) {
          if (String(list.data[j].id) === id) {
            rec = list.data[j];
            break;
          }
        }
        if (rec) otherDeleteRecord(rec);
      });
    })(deleteBtns[k]);
  }
}

// ── Validation helpers ────────────────────────────────
function otherSetFieldError(groupId, errorId, inputId) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.add("govuk-form-group--error");
  if (err) err.style.display = "";
  if (input) input.classList.add("govuk-input--error");
}

function otherClearFieldError(groupId, errorId, inputId) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.remove("govuk-form-group--error");
  if (err) err.style.display = "none";
  if (input) input.classList.remove("govuk-input--error");
}

function otherShowDbError(message) {
  var banner = document.getElementById("otherDbError");
  var text = document.getElementById("otherDbErrorText");
  if (banner) {
    banner.style.display = "";
    banner.focus();
  }
  if (text) text.textContent = message || "";
}

function otherHideDbError() {
  var banner = document.getElementById("otherDbError");
  if (banner) banner.style.display = "none";
}

// ── Modal state ───────────────────────────────────────
var _otherModalMode = null; // "add" | "edit"
var _otherEditOrigId = null;

// ── Add modal ─────────────────────────────────────────
function openOtherAddModal() {
  var list = otherGetList(otherState.selectedKey);
  if (!list) return;
  _otherModalMode = "add";
  _otherEditOrigId = null;

  var idLabel = document.getElementById("otherEditIdLabel");
  var valLabel = document.getElementById("otherEditValueLabel");
  if (idLabel) idLabel.textContent = list.idCol;
  if (valLabel) valLabel.textContent = list.valCol;

  var title = document.getElementById("otherEditModalTitle");
  if (title) title.textContent = "Add " + list.label + " Value";

  var idInput = document.getElementById("otherEditId");
  var valInput = document.getElementById("otherEditValue");
  if (idInput) {
    idInput.value = "";
    idInput.readOnly = false;
    idInput.style.backgroundColor = "";
    idInput.style.cursor = "";
  }
  if (valInput) valInput.value = "";

  otherClearFieldError("otherEditIdGroup", "otherEditIdError", "otherEditId");
  otherClearFieldError(
    "otherEditValueGroup",
    "otherEditValueError",
    "otherEditValue",
  );
  otherHideDbError();

  var modal = document.getElementById("otherEditModal");
  if (modal) {
    modal.hidden = false;
    if (idInput) idInput.focus();
  }
}

// ── Edit modal ────────────────────────────────────────
function openOtherEditModal(rec) {
  var list = otherGetList(otherState.selectedKey);
  if (!list) return;
  _otherModalMode = "edit";
  _otherEditOrigId = rec.id;

  var idLabel = document.getElementById("otherEditIdLabel");
  var valLabel = document.getElementById("otherEditValueLabel");
  if (idLabel) idLabel.textContent = list.idCol;
  if (valLabel) valLabel.textContent = list.valCol;

  var title = document.getElementById("otherEditModalTitle");
  if (title) title.textContent = "Edit " + list.label + " Value";

  var idInput = document.getElementById("otherEditId");
  var valInput = document.getElementById("otherEditValue");
  if (idInput) {
    idInput.value = rec.id;
    idInput.readOnly = false;
    idInput.style.backgroundColor = "";
    idInput.style.cursor = "";
  }
  if (valInput) valInput.value = rec.value;

  otherClearFieldError("otherEditIdGroup", "otherEditIdError", "otherEditId");
  otherClearFieldError(
    "otherEditValueGroup",
    "otherEditValueError",
    "otherEditValue",
  );
  otherHideDbError();

  var modal = document.getElementById("otherEditModal");
  if (modal) {
    modal.hidden = false;
    if (valInput) valInput.focus();
  }
}

// ── Save modal ────────────────────────────────────────
function saveOtherModal() {
  otherHideDbError();
  var list = otherGetList(otherState.selectedKey);
  if (!list) return;

  var hasError = false;
  var idInput = document.getElementById("otherEditId");
  var valInput = document.getElementById("otherEditValue");
  var idVal = idInput ? idInput.value.trim() : "";
  var valVal = valInput ? valInput.value.trim() : "";

  // ── Validate ID ──
  if (!idVal) {
    var idErrText = document.getElementById("otherEditIdErrorText");
    if (idErrText) idErrText.textContent = list.idCol + " is required";
    otherSetFieldError("otherEditIdGroup", "otherEditIdError", "otherEditId");
    hasError = true;
  } else if (_otherModalMode === "add") {
    var duplicate = false;
    for (var i = 0; i < list.data.length; i++) {
      if (String(list.data[i].id) === idVal) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) {
      var idErrText2 = document.getElementById("otherEditIdErrorText");
      if (idErrText2) idErrText2.textContent = list.idCol + " already exists";
      otherSetFieldError("otherEditIdGroup", "otherEditIdError", "otherEditId");
      hasError = true;
    } else {
      otherClearFieldError(
        "otherEditIdGroup",
        "otherEditIdError",
        "otherEditId",
      );
    }
  } else {
    otherClearFieldError("otherEditIdGroup", "otherEditIdError", "otherEditId");
  }

  // ── Validate Value ──
  if (!valVal) {
    otherSetFieldError(
      "otherEditValueGroup",
      "otherEditValueError",
      "otherEditValue",
    );
    hasError = true;
  } else {
    otherClearFieldError(
      "otherEditValueGroup",
      "otherEditValueError",
      "otherEditValue",
    );
  }

  if (hasError) {
    var firstErr = document.querySelector(
      "#otherEditModal .govuk-input--error",
    );
    if (firstErr) firstErr.focus();
    return;
  }

  if (_otherModalMode === "add") {
    var newId = !isNaN(idVal) && idVal !== "" ? Number(idVal) : idVal;
    list.data.unshift({ id: newId, value: valVal });
  } else {
    for (var j = 0; j < list.data.length; j++) {
      if (String(list.data[j].id) === String(_otherEditOrigId)) {
        list.data[j].value = valVal;
        break;
      }
    }
  }

  closeOtherModal();
  renderValuesPanel(otherState.selectedKey);
}

function closeOtherModal() {
  var modal = document.getElementById("otherEditModal");
  if (modal) modal.hidden = true;
}

// ── Delete ────────────────────────────────────────────
function otherDeleteRecord(rec) {
  showGovukConfirm("Are you sure you want to delete this record?").then((result) => {
    if (!result) return;
    var list = otherGetList(otherState.selectedKey);
    if (!list) return;
    list.data = list.data.filter(function (r) {
      return String(r.id) !== String(rec.id);
    });
    var totalPages = Math.max(
      1,
      Math.ceil(list.data.length / otherState.rowsPerPage),
    );
    if (otherState.currentPage > totalPages) otherState.currentPage = totalPages;
    renderValuesPanel(otherState.selectedKey);
  });
}

// ── Bootstrap on DOMContentLoaded ────────────────────
document.addEventListener("DOMContentLoaded", function () {
  // Always init so the values panel is dynamically populated from JS data
  otherState._inited = true;
  initOtherTab();

  // Re-render when the tab is clicked (keeps state fresh on re-activation)
  var tabLink = document.getElementById("tab-other-link");
  if (tabLink) {
    tabLink.addEventListener("click", function () {
      renderValuesPanel(otherState.selectedKey);
    });
  }

  // ── Modal button bindings ──
  var b;
  b = document.getElementById("btnSaveOtherEdit");
  if (b) b.addEventListener("click", saveOtherModal);
  b = document.getElementById("btnCancelOtherEdit");
  if (b) b.addEventListener("click", closeOtherModal);
  b = document.getElementById("btnCloseOtherEdit");
  if (b) b.addEventListener("click", closeOtherModal);

  // Backdrop click and Escape key
  document.addEventListener("click", function (e) {
    var editModal = document.getElementById("otherEditModal");
    if (editModal && !editModal.hidden && e.target === editModal)
      closeOtherModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var editModal = document.getElementById("otherEditModal");
    if (editModal && !editModal.hidden) closeOtherModal();
  });
});
