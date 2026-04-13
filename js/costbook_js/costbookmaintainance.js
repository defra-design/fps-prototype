"use strict";

/* ════════════════════════════════════════════════════════════════
   costbookmaintainance.js
   Page-specific logic for the Costbook Maintainance screen.

   Shared utilities (showTab, renderPagination, getPerPage,
   openModal, closeModal, renderEmptyRow, formatCurrency,
   formatDate) are in js/common.js — called here, never duplicated.

   Three paginated grids, each with isolated JS state:
     · Tab 2 — Account Categories  (tblAccCat)
     · Tab 3 — CSG7 Inflation Options  (tblCsg7)
     · Tab 5 — CAPS Staff  (tblCapsStaff)
   ════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────────
   TAB 2 — Account Categories
   ─────────────────────────────────────────────────────────────── */

/* Sample data — rows visible in the Account Categories screenshot */
var allRecordsAccCat = [
  {
    id: 1,
    accountShortName: "Animals",
    description: "Operating Consumables",
    csg7Group: "Consumables",
  },
  {
    id: 2,
    accountShortName: "AnimalSupps",
    description: "Operating Consumables",
    csg7Group: "Consumables",
  },
  {
    id: 3,
    accountShortName: "ConfFee",
    description: "Staff Support",
    csg7Group: "Other Costs",
  },
  {
    id: 4,
    accountShortName: "Consultancy",
    description: "Consultancy",
    csg7Group: "Sub-contracts",
  },
  {
    id: 5,
    accountShortName: "Consumables",
    description: "Operating Consumables",
    csg7Group: "Consumables",
  },
  {
    id: 6,
    accountShortName: "Equipment",
    description: "Laboratory Equipment",
    csg7Group: "Equipment",
  },
  {
    id: 7,
    accountShortName: "FieldSupp",
    description: "Field Supplies",
    csg7Group: "Consumables",
  },
  {
    id: 8,
    accountShortName: "IT",
    description: "IT Hardware & Software",
    csg7Group: "Equipment",
  },
  {
    id: 9,
    accountShortName: "LabChems",
    description: "Laboratory Chemicals",
    csg7Group: "Consumables",
  },
  {
    id: 10,
    accountShortName: "LabTest",
    description: "Laboratory Testing Services",
    csg7Group: "Sub-contracts",
  },
  {
    id: 11,
    accountShortName: "Mileage",
    description: "Staff Travel Mileage",
    csg7Group: "Other Costs",
  },
  {
    id: 12,
    accountShortName: "Postage",
    description: "Postage & Courier Costs",
    csg7Group: "Other Costs",
  },
  {
    id: 13,
    accountShortName: "Printing",
    description: "Printing & Stationery",
    csg7Group: "Other Costs",
  },
  {
    id: 14,
    accountShortName: "Repairs",
    description: "Equipment Repairs & Maintenance",
    csg7Group: "Equipment",
  },
  {
    id: 15,
    accountShortName: "Staff",
    description: "Staff Costs",
    csg7Group: "Other Costs",
  },
  {
    id: 16,
    accountShortName: "Subcontract",
    description: "External Subcontract Work",
    csg7Group: "Sub-contracts",
  },
  {
    id: 17,
    accountShortName: "Training",
    description: "Staff Training & Development",
    csg7Group: "Other Costs",
  },
];
var filteredRecordsAccCat = allRecordsAccCat.slice();
var currentPageAccCat = 1;
var editingAccCatId = null;
var sortKeyAccCat = null;
var sortDirAccCat = "asc";

function updateSortIndicatorsAccCat(activeKey) {
  var headers = document.querySelectorAll("#tblAccCat th[data-sort-key]");
  headers.forEach(function (th) {
    var indicator = th.querySelector(".maint-sort-indicator");
    if (th.getAttribute("data-sort-key") === activeKey) {
      th.setAttribute(
        "aria-sort",
        sortDirAccCat === "asc" ? "ascending" : "descending",
      );
      indicator.textContent = sortDirAccCat === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });
}

function sortTableAccCat(key) {
  if (sortKeyAccCat === key) {
    sortDirAccCat = sortDirAccCat === "asc" ? "desc" : "asc";
  } else {
    sortKeyAccCat = key;
    sortDirAccCat = "asc";
  }
  filteredRecordsAccCat.sort(function (a, b) {
    var valA = String(a[key] || "").toLowerCase();
    var valB = String(b[key] || "").toLowerCase();
    if (valA < valB) return sortDirAccCat === "asc" ? -1 : 1;
    if (valA > valB) return sortDirAccCat === "asc" ? 1 : -1;
    return 0;
  });
  currentPageAccCat = 1;
  updateSortIndicatorsAccCat(key);
  renderTableAccCat();
  renderPagination(
    filteredRecordsAccCat,
    currentPageAccCat,
    getPerPage("recordsPerPageAccCat"),
    "paginationAccCat",
    onPageClickAccCat,
  );
}

function renderTableAccCat() {
  var perPage = getPerPage("recordsPerPageAccCat");
  var start = (currentPageAccCat - 1) * perPage;
  var rows = filteredRecordsAccCat.slice(start, start + perPage);
  var tbody = document.getElementById("tblAccCatBody");
  if (!tbody) {
    return;
  }

  if (rows.length === 0) {
    renderEmptyRow("tblAccCatBody", 4, "No records found.");
    return;
  }

  tbody.innerHTML = rows
    .map(function (item) {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell">' +
        item.accountShortName +
        "</td>" +
        '<td class="govuk-table__cell">' +
        item.description +
        "</td>" +
        '<td class="govuk-table__cell">' +
        item.csg7Group +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align: center;">' +
        "<button onclick='openTblAccCatEditModal(" +
        JSON.stringify(item) +
        ")' " +
        'aria-label="Edit account category ' +
        item.accountShortName +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" ' +
        'alt="Edit icon for ' +
        item.accountShortName +
        '" width="20">' +
        "</button> " +
        '<button onclick="handleTblAccCatDelete(' +
        item.id +
        ')" ' +
        'aria-label="Delete account category ' +
        item.accountShortName +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" ' +
        'alt="Delete icon for ' +
        item.accountShortName +
        '" width="20">' +
        "</button>" +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
}

function onPageClickAccCat(page) {
  currentPageAccCat = page;
  renderTableAccCat();
  renderPagination(
    filteredRecordsAccCat,
    currentPageAccCat,
    getPerPage("recordsPerPageAccCat"),
    "paginationAccCat",
    onPageClickAccCat,
  );
}

function initTableAccCat(records) {
  allRecordsAccCat = records;
  filteredRecordsAccCat = allRecordsAccCat.slice();
  currentPageAccCat = 1;
  renderTableAccCat();
  renderPagination(
    filteredRecordsAccCat,
    currentPageAccCat,
    getPerPage("recordsPerPageAccCat"),
    "paginationAccCat",
    onPageClickAccCat,
  );
}

/* ── Modal validation helpers ─────────────────────────────────────
   Shared by all three modal forms (AccCat, CSG7, CapsStaff).
   Follows GOV.UK error-handling pattern (SC 3.3.1, 3.3.3).
   ─────────────────────────────────────────────────────────────── */

/**
 * Clear all field errors and the DB-error banner for a modal form.
 * @param {string} formId — the <form> element's id
 */
function clearModalErrors(formId) {
  var form = document.getElementById(formId);
  if (!form) return;
  var dbErr = document.getElementById(formId + "-db-error");
  if (dbErr) dbErr.hidden = true;
  form.querySelectorAll(".govuk-form-group--error").forEach(function (fg) {
    fg.classList.remove("govuk-form-group--error");
  });
  form.querySelectorAll(".govuk-error-message").forEach(function (msg) {
    msg.hidden = true;
  });
  form
    .querySelectorAll(".govuk-input--error, .govuk-select--error")
    .forEach(function (el) {
      el.classList.remove("govuk-input--error");
      el.classList.remove("govuk-select--error");
    });
}

/**
 * Show a field-level validation error (GOV.UK pattern).
 * @param {string}  fieldId  — the input/select element id
 * @param {string}  errorId  — the error <p> element id
 * @param {string}  wrapId   — the wrapping .govuk-form-group element id
 * @param {boolean} isSelect — true when the control is a <select>
 */
function showFieldError(fieldId, errorId, wrapId, isSelect) {
  var fg = document.getElementById(wrapId);
  var msg = document.getElementById(errorId);
  var ctrl = document.getElementById(fieldId);
  if (fg) fg.classList.add("govuk-form-group--error");
  if (msg) msg.hidden = false;
  if (ctrl)
    ctrl.classList.add(isSelect ? "govuk-select--error" : "govuk-input--error");
}

/**
 * Show a server / DB error banner at the top of a modal form.
 * @param {string} formId  — the <form> element's id
 * @param {string} message — error text to display
 */
function showModalDbError(formId, message) {
  var banner = document.getElementById(formId + "-db-error");
  var msgEl = document.getElementById(formId + "-db-error-msg");
  if (msgEl) msgEl.textContent = message;
  if (banner) {
    banner.hidden = false;
    banner.focus();
  }
}

/**
 * Returns true if val is a non-empty finite number string.
 */
function isNumericValue(val) {
  return val !== "" && !isNaN(parseFloat(val)) && isFinite(val);
}

/* ─────────────────────────────────────────────────────────────── */

function openTblAccCatAddModal() {
  editingAccCatId = null;
  document.getElementById("tblAccCatModalLabel").textContent =
    "Add Account Category";
  document.getElementById("formTblAccCat").reset();
  clearModalErrors("formTblAccCat");
  document.getElementById("tblAccCatSaveBtn").style.display = "";
  document.getElementById("tblAccCatUpdateBtn").style.display = "none";
  openModal("tblAccCatModal");
}

function openTblAccCatEditModal(item) {
  editingAccCatId = item.id;
  document.getElementById("tblAccCatModalLabel").textContent =
    "Edit Account Category";
  clearModalErrors("formTblAccCat");
  document.getElementById("modal-acccat-shortname").value =
    item.accountShortName || "";
  document.getElementById("modal-acccat-description").value =
    item.description || "";
  document.getElementById("modal-acccat-csg7group").value =
    item.csg7Group || "";
  document.getElementById("tblAccCatSaveBtn").style.display = "none";
  document.getElementById("tblAccCatUpdateBtn").style.display = "";
  openModal("tblAccCatModal");
}

function closeTblAccCatModal() {
  closeModal("tblAccCatModal");
}

function handleTblAccCatDelete(id) {
  allRecordsAccCat = allRecordsAccCat.filter(function (r) {
    return r.id !== id;
  });
  filteredRecordsAccCat = allRecordsAccCat.slice();
  renderTableAccCat();
  renderPagination(
    filteredRecordsAccCat,
    currentPageAccCat,
    getPerPage("recordsPerPageAccCat"),
    "paginationAccCat",
    onPageClickAccCat,
  );
}

function saveTblAccCat() {
  clearModalErrors("formTblAccCat");

  var shortName = document
    .getElementById("modal-acccat-shortname")
    .value.trim();
  var description = document
    .getElementById("modal-acccat-description")
    .value.trim();
  var csg7Group = document
    .getElementById("modal-acccat-csg7group")
    .value.trim();

  var isValid = true;
  if (!shortName) {
    showFieldError(
      "modal-acccat-shortname",
      "modal-acccat-shortname-error",
      "fg-acccat-shortname",
      false,
    );
    isValid = false;
  }
  if (!description) {
    showFieldError(
      "modal-acccat-description",
      "modal-acccat-description-error",
      "fg-acccat-description",
      false,
    );
    isValid = false;
  }
  if (!csg7Group) {
    showFieldError(
      "modal-acccat-csg7group",
      "modal-acccat-csg7group-error",
      "fg-acccat-csg7group",
      true,
    );
    isValid = false;
  }
  if (!isValid) return;

  if (editingAccCatId !== null) {
    /* Edit branch */
    var idx = allRecordsAccCat.findIndex(function (r) {
      return r.id === editingAccCatId;
    });
    if (idx !== -1) {
      allRecordsAccCat[idx].accountShortName = shortName;
      allRecordsAccCat[idx].description = description;
      allRecordsAccCat[idx].csg7Group = csg7Group;
    }
  } else {
    /* Add branch */
    var newId =
      allRecordsAccCat.length > 0
        ? allRecordsAccCat[allRecordsAccCat.length - 1].id + 1
        : 1;
    allRecordsAccCat.push({
      id: newId,
      accountShortName: shortName,
      description: description,
      csg7Group: csg7Group,
    });
  }
  filteredRecordsAccCat = allRecordsAccCat.slice();
  renderTableAccCat();
  renderPagination(
    filteredRecordsAccCat,
    currentPageAccCat,
    getPerPage("recordsPerPageAccCat"),
    "paginationAccCat",
    onPageClickAccCat,
  );
  closeTblAccCatModal();
}

/* ────────────────────────────────────────────────────────────────
   TAB 3 — CSG7 Inflation Options
   ─────────────────────────────────────────────────────────────── */

/* Sample data — rows visible in the CSG7 Inflation Options screenshot */
var allRecordsCsg7 = [
  { id: 1, csg7Group: "Consumables", useInflation: false },
  { id: 2, csg7Group: "Equipment", useInflation: true },
  { id: 3, csg7Group: "LabTest", useInflation: false },
  { id: 4, csg7Group: "Other Costs", useInflation: false },
  { id: 5, csg7Group: "Sub-contracts", useInflation: false },
  { id: 6, csg7Group: "Staff", useInflation: true },
  { id: 7, csg7Group: "Travel", useInflation: false },
];
var filteredRecordsCsg7 = allRecordsCsg7.slice();
var currentPageCsg7 = 1;
var editingCsg7Id = null;
var sortKeyCsg7 = null;
var sortDirCsg7 = "asc";

function updateSortIndicatorsCsg7(activeKey) {
  var headers = document.querySelectorAll("#tblCsg7 th[data-sort-key]");
  headers.forEach(function (th) {
    var indicator = th.querySelector(".maint-sort-indicator");
    if (th.getAttribute("data-sort-key") === activeKey) {
      th.setAttribute(
        "aria-sort",
        sortDirCsg7 === "asc" ? "ascending" : "descending",
      );
      indicator.textContent = sortDirCsg7 === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });
}

function sortTableCsg7(key) {
  if (sortKeyCsg7 === key) {
    sortDirCsg7 = sortDirCsg7 === "asc" ? "desc" : "asc";
  } else {
    sortKeyCsg7 = key;
    sortDirCsg7 = "asc";
  }
  filteredRecordsCsg7.sort(function (a, b) {
    var valA = String(
      a[key] === true ? "Yes" : a[key] === false ? "No" : a[key] || "",
    ).toLowerCase();
    var valB = String(
      b[key] === true ? "Yes" : b[key] === false ? "No" : b[key] || "",
    ).toLowerCase();
    if (valA < valB) return sortDirCsg7 === "asc" ? -1 : 1;
    if (valA > valB) return sortDirCsg7 === "asc" ? 1 : -1;
    return 0;
  });
  currentPageCsg7 = 1;
  updateSortIndicatorsCsg7(key);
  renderTableCsg7();
  renderPagination(
    filteredRecordsCsg7,
    currentPageCsg7,
    getPerPage("recordsPerPageCsg7"),
    "paginationCsg7",
    onPageClickCsg7,
  );
}

function renderTableCsg7() {
  var perPage = getPerPage("recordsPerPageCsg7");
  var start = (currentPageCsg7 - 1) * perPage;
  var rows = filteredRecordsCsg7.slice(start, start + perPage);
  var tbody = document.getElementById("tblCsg7Body");
  if (!tbody) {
    return;
  }

  if (rows.length === 0) {
    renderEmptyRow("tblCsg7Body", 3, "No records found.");
    return;
  }

  tbody.innerHTML = rows
    .map(function (item) {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell">' +
        item.csg7Group +
        "</td>" +
        '<td class="govuk-table__cell">' +
        (item.useInflation ? "Yes" : "No") +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align: center;">' +
        "<button onclick='openTblCsg7EditModal(" +
        JSON.stringify(item) +
        ")' " +
        'aria-label="Edit CSG7 group ' +
        item.csg7Group +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" ' +
        'alt="Edit icon for ' +
        item.csg7Group +
        '" width="20">' +
        "</button> " +
        '<button onclick="handleTblCsg7Delete(' +
        item.id +
        ')" ' +
        'aria-label="Delete CSG7 group ' +
        item.csg7Group +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" ' +
        'alt="Delete icon for ' +
        item.csg7Group +
        '" width="20">' +
        "</button>" +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
}

function onPageClickCsg7(page) {
  currentPageCsg7 = page;
  renderTableCsg7();
  renderPagination(
    filteredRecordsCsg7,
    currentPageCsg7,
    getPerPage("recordsPerPageCsg7"),
    "paginationCsg7",
    onPageClickCsg7,
  );
}

function initTableCsg7(records) {
  allRecordsCsg7 = records;
  filteredRecordsCsg7 = allRecordsCsg7.slice();
  currentPageCsg7 = 1;
  renderTableCsg7();
  renderPagination(
    filteredRecordsCsg7,
    currentPageCsg7,
    getPerPage("recordsPerPageCsg7"),
    "paginationCsg7",
    onPageClickCsg7,
  );
}

function openTblCsg7AddModal() {
  editingCsg7Id = null;
  document.getElementById("tblCsg7ModalLabel").textContent = "Add CSG7 Group";
  document.getElementById("formTblCsg7").reset();
  clearModalErrors("formTblCsg7");
  document.getElementById("tblCsg7SaveBtn").style.display = "";
  document.getElementById("tblCsg7UpdateBtn").style.display = "none";
  openModal("tblCsg7Modal");
}

function openTblCsg7EditModal(item) {
  editingCsg7Id = item.id;
  document.getElementById("tblCsg7ModalLabel").textContent = "Edit CSG7 Group";
  clearModalErrors("formTblCsg7");
  document.getElementById("modal-csg7-group").value = item.csg7Group || "";
  document.getElementById("modal-csg7-useinflation").checked =
    item.useInflation || false;
  document.getElementById("tblCsg7SaveBtn").style.display = "none";
  document.getElementById("tblCsg7UpdateBtn").style.display = "";
  openModal("tblCsg7Modal");
}

function closeTblCsg7Modal() {
  closeModal("tblCsg7Modal");
}

function handleTblCsg7Delete(id) {
  allRecordsCsg7 = allRecordsCsg7.filter(function (r) {
    return r.id !== id;
  });
  filteredRecordsCsg7 = allRecordsCsg7.slice();
  renderTableCsg7();
  renderPagination(
    filteredRecordsCsg7,
    currentPageCsg7,
    getPerPage("recordsPerPageCsg7"),
    "paginationCsg7",
    onPageClickCsg7,
  );
}

function saveTblCsg7() {
  clearModalErrors("formTblCsg7");

  var csg7Group = document.getElementById("modal-csg7-group").value.trim();
  var useInflation = document.getElementById("modal-csg7-useinflation").checked;

  if (!csg7Group) {
    showFieldError(
      "modal-csg7-group",
      "modal-csg7-group-error",
      "fg-csg7-group",
      false,
    );
    return;
  }

  if (editingCsg7Id !== null) {
    /* Edit branch */
    var idx = allRecordsCsg7.findIndex(function (r) {
      return r.id === editingCsg7Id;
    });
    if (idx !== -1) {
      allRecordsCsg7[idx].csg7Group = csg7Group;
      allRecordsCsg7[idx].useInflation = useInflation;
    }
  } else {
    /* Add branch */
    var newId =
      allRecordsCsg7.length > 0
        ? allRecordsCsg7[allRecordsCsg7.length - 1].id + 1
        : 1;
    allRecordsCsg7.push({
      id: newId,
      csg7Group: csg7Group,
      useInflation: useInflation,
    });
  }
  filteredRecordsCsg7 = allRecordsCsg7.slice();
  renderTableCsg7();
  renderPagination(
    filteredRecordsCsg7,
    currentPageCsg7,
    getPerPage("recordsPerPageCsg7"),
    "paginationCsg7",
    onPageClickCsg7,
  );
  closeTblCsg7Modal();
}

/* ────────────────────────────────────────────────────────────────
   TAB 5 — CAPS Staff
   ─────────────────────────────────────────────────────────────── */

/* Sample data — rows visible in the CAPS Staff screenshot */
var allRecordsCapsStaff = [
  { id: 1, mNumber: "m1008304", name: "Jasbir Gill" },
  { id: 2, mNumber: "m1011391", name: "Abby Lambert" },
  { id: 3, mNumber: "m168601", name: "Steve Martin" },
  { id: 4, mNumber: "m185459", name: "Rebecca Bateman" },
  { id: 5, mNumber: "m304206", name: "Janee Foxon" },
  { id: 6, mNumber: "m310641", name: "Ayesha Fowler" },
  { id: 7, mNumber: "m412803", name: "Tom Hendricks" },
  { id: 8, mNumber: "m503917", name: "Laura Simmons" },
  { id: 9, mNumber: "m614228", name: "David Okafor" },
  { id: 10, mNumber: "m723450", name: "Claire Whitfield" },
  { id: 11, mNumber: "m831064", name: "Nathan Patel" },
];
var filteredRecordsCapsStaff = allRecordsCapsStaff.slice();
var currentPageCapsStaff = 1;
var editingCapsStaffId = null;
var sortKeyCapsStaff = null;
var sortDirCapsStaff = "asc";

function updateSortIndicatorsCapsStaff(activeKey) {
  var headers = document.querySelectorAll("#tblCapsStaff th[data-sort-key]");
  headers.forEach(function (th) {
    var indicator = th.querySelector(".maint-sort-indicator");
    if (th.getAttribute("data-sort-key") === activeKey) {
      th.setAttribute(
        "aria-sort",
        sortDirCapsStaff === "asc" ? "ascending" : "descending",
      );
      indicator.textContent =
        sortDirCapsStaff === "asc" ? " \u25B2" : " \u25BC";
    } else {
      th.setAttribute("aria-sort", "none");
      indicator.textContent = "";
    }
  });
}

function sortTableCapsStaff(key) {
  if (sortKeyCapsStaff === key) {
    sortDirCapsStaff = sortDirCapsStaff === "asc" ? "desc" : "asc";
  } else {
    sortKeyCapsStaff = key;
    sortDirCapsStaff = "asc";
  }
  filteredRecordsCapsStaff.sort(function (a, b) {
    var valA = String(a[key] || "").toLowerCase();
    var valB = String(b[key] || "").toLowerCase();
    if (valA < valB) return sortDirCapsStaff === "asc" ? -1 : 1;
    if (valA > valB) return sortDirCapsStaff === "asc" ? 1 : -1;
    return 0;
  });
  currentPageCapsStaff = 1;
  updateSortIndicatorsCapsStaff(key);
  renderTableCapsStaff();
  renderPagination(
    filteredRecordsCapsStaff,
    currentPageCapsStaff,
    getPerPage("recordsPerPageCapsStaff"),
    "paginationCapsStaff",
    onPageClickCapsStaff,
  );
}

function renderTableCapsStaff() {
  var perPage = getPerPage("recordsPerPageCapsStaff");
  var start = (currentPageCapsStaff - 1) * perPage;
  var rows = filteredRecordsCapsStaff.slice(start, start + perPage);
  var tbody = document.getElementById("tblCapsStaffBody");
  if (!tbody) {
    return;
  }

  if (rows.length === 0) {
    renderEmptyRow("tblCapsStaffBody", 3, "No records found.");
    return;
  }

  tbody.innerHTML = rows
    .map(function (item) {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell">' +
        item.mNumber +
        "</td>" +
        '<td class="govuk-table__cell">' +
        item.name +
        "</td>" +
        '<td class="govuk-table__cell" style="text-align: center;">' +
        "<button onclick='openTblCapsStaffEditModal(" +
        JSON.stringify(item) +
        ")' " +
        'aria-label="Edit staff member ' +
        item.name +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" ' +
        'alt="Edit icon for ' +
        item.name +
        '" width="20">' +
        "</button> " +
        '<button onclick="handleTblCapsStaffDelete(' +
        item.id +
        ')" ' +
        'aria-label="Delete staff member ' +
        item.name +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" ' +
        'alt="Delete icon for ' +
        item.name +
        '" width="20">' +
        "</button>" +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
}

function onPageClickCapsStaff(page) {
  currentPageCapsStaff = page;
  renderTableCapsStaff();
  renderPagination(
    filteredRecordsCapsStaff,
    currentPageCapsStaff,
    getPerPage("recordsPerPageCapsStaff"),
    "paginationCapsStaff",
    onPageClickCapsStaff,
  );
}

function initTableCapsStaff(records) {
  allRecordsCapsStaff = records;
  filteredRecordsCapsStaff = allRecordsCapsStaff.slice();
  currentPageCapsStaff = 1;
  renderTableCapsStaff();
  renderPagination(
    filteredRecordsCapsStaff,
    currentPageCapsStaff,
    getPerPage("recordsPerPageCapsStaff"),
    "paginationCapsStaff",
    onPageClickCapsStaff,
  );
}

function openTblCapsStaffAddModal() {
  editingCapsStaffId = null;
  document.getElementById("tblCapsStaffModalLabel").textContent =
    "Add Staff Member";
  document.getElementById("formTblCapsStaff").reset();
  clearModalErrors("formTblCapsStaff");
  document.getElementById("tblCapsStaffSaveBtn").style.display = "";
  document.getElementById("tblCapsStaffUpdateBtn").style.display = "none";
  openModal("tblCapsStaffModal");
}

function openTblCapsStaffEditModal(item) {
  editingCapsStaffId = item.id;
  document.getElementById("tblCapsStaffModalLabel").textContent =
    "Edit Staff Member";
  clearModalErrors("formTblCapsStaff");
  document.getElementById("modal-capsstaff-mnumber").value = item.mNumber || "";
  document.getElementById("modal-capsstaff-name").value = item.name || "";
  document.getElementById("tblCapsStaffSaveBtn").style.display = "none";
  document.getElementById("tblCapsStaffUpdateBtn").style.display = "";
  openModal("tblCapsStaffModal");
}

function closeTblCapsStaffModal() {
  closeModal("tblCapsStaffModal");
}

function handleTblCapsStaffDelete(id) {
  allRecordsCapsStaff = allRecordsCapsStaff.filter(function (r) {
    return r.id !== id;
  });
  filteredRecordsCapsStaff = allRecordsCapsStaff.slice();
  renderTableCapsStaff();
  renderPagination(
    filteredRecordsCapsStaff,
    currentPageCapsStaff,
    getPerPage("recordsPerPageCapsStaff"),
    "paginationCapsStaff",
    onPageClickCapsStaff,
  );
}

function saveTblCapsStaff() {
  clearModalErrors("formTblCapsStaff");

  var mNumber = document.getElementById("modal-capsstaff-mnumber").value.trim();
  var name = document.getElementById("modal-capsstaff-name").value.trim();

  var isValid = true;
  if (!mNumber) {
    showFieldError(
      "modal-capsstaff-mnumber",
      "modal-capsstaff-mnumber-error",
      "fg-capsstaff-mnumber",
      false,
    );
    isValid = false;
  }
  if (!name) {
    showFieldError(
      "modal-capsstaff-name",
      "modal-capsstaff-name-error",
      "fg-capsstaff-name",
      false,
    );
    isValid = false;
  }
  if (!isValid) return;

  if (editingCapsStaffId !== null) {
    /* Edit branch */
    var idx = allRecordsCapsStaff.findIndex(function (r) {
      return r.id === editingCapsStaffId;
    });
    if (idx !== -1) {
      allRecordsCapsStaff[idx].mNumber = mNumber;
      allRecordsCapsStaff[idx].name = name;
    }
  } else {
    /* Add branch */
    var newId =
      allRecordsCapsStaff.length > 0
        ? allRecordsCapsStaff[allRecordsCapsStaff.length - 1].id + 1
        : 1;
    allRecordsCapsStaff.push({ id: newId, mNumber: mNumber, name: name });
  }
  filteredRecordsCapsStaff = allRecordsCapsStaff.slice();
  renderTableCapsStaff();
  renderPagination(
    filteredRecordsCapsStaff,
    currentPageCapsStaff,
    getPerPage("recordsPerPageCapsStaff"),
    "paginationCapsStaff",
    onPageClickCapsStaff,
  );
  closeTblCapsStaffModal();
}

/* ────────────────────────────────────────────────────────────────
   DOMContentLoaded — tab wiring + grid initialisation
   ─────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  /* ── Tab click + arrow-key keyboard navigation ── */
  document.querySelectorAll(".govuk-tabs__tab").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showTab(this.getAttribute("aria-controls"));
    });

    link.addEventListener("keydown", function (e) {
      var tabs = Array.from(document.querySelectorAll(".govuk-tabs__tab"));
      var idx = tabs.indexOf(this);
      if (e.key === "ArrowRight" && idx < tabs.length - 1) {
        e.preventDefault();
        showTab(tabs[idx + 1].getAttribute("aria-controls"));
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        showTab(tabs[idx - 1].getAttribute("aria-controls"));
      }
    });
  });

  /* ── Activate the first tab on load ── */
  var firstTab = document.querySelector(".govuk-tabs__tab");
  if (firstTab) {
    showTab(firstTab.getAttribute("aria-controls"));
  }

  /* ── Records-per-page change handlers ── */
  document
    .getElementById("recordsPerPageAccCat")
    .addEventListener("change", function () {
      currentPageAccCat = 1;
      renderTableAccCat();
      renderPagination(
        filteredRecordsAccCat,
        currentPageAccCat,
        getPerPage("recordsPerPageAccCat"),
        "paginationAccCat",
        onPageClickAccCat,
      );
    });

  document
    .getElementById("recordsPerPageCsg7")
    .addEventListener("change", function () {
      currentPageCsg7 = 1;
      renderTableCsg7();
      renderPagination(
        filteredRecordsCsg7,
        currentPageCsg7,
        getPerPage("recordsPerPageCsg7"),
        "paginationCsg7",
        onPageClickCsg7,
      );
    });

  document
    .getElementById("recordsPerPageCapsStaff")
    .addEventListener("change", function () {
      currentPageCapsStaff = 1;
      renderTableCapsStaff();
      renderPagination(
        filteredRecordsCapsStaff,
        currentPageCapsStaff,
        getPerPage("recordsPerPageCapsStaff"),
        "paginationCapsStaff",
        onPageClickCapsStaff,
      );
    });

  /* ── Add button wiring — no data-bs-toggle, no data-bs-target ── */
  document
    .getElementById("btnTblAccCatAdd")
    .addEventListener("click", openTblAccCatAddModal);
  document
    .getElementById("btnTblCsg7Add")
    .addEventListener("click", openTblCsg7AddModal);
  document
    .getElementById("btnTblCapsStaffAdd")
    .addEventListener("click", openTblCapsStaffAddModal);

  /* ── Inflation form — submit + cancel ── */
  document
    .getElementById("formInflation")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      clearModalErrors("formInflation");
      var isValid = true;
      [
        {
          id: "inflAnimals",
          errId: "inflAnimals-error",
          wrapId: "fg-inflAnimals",
        },
        {
          id: "inflExceptionalCosts",
          errId: "inflExceptionalCosts-error",
          wrapId: "fg-inflExceptionalCosts",
        },
        { id: "inflStaff", errId: "inflStaff-error", wrapId: "fg-inflStaff" },
        { id: "inflTests", errId: "inflTests-error", wrapId: "fg-inflTests" },
        {
          id: "inflCurrentFinancialYear",
          errId: "inflCurrentFinancialYear-error",
          wrapId: "fg-inflCurrentFinancialYear",
        },
        {
          id: "inflWorkingHoursInDay",
          errId: "inflWorkingHoursInDay-error",
          wrapId: "fg-inflWorkingHoursInDay",
        },
        {
          id: "inflWorkingDaysInYear",
          errId: "inflWorkingDaysInYear-error",
          wrapId: "fg-inflWorkingDaysInYear",
        },
      ].forEach(function (f) {
        var val = document.getElementById(f.id).value.trim();
        if (!isNumericValue(val)) {
          showFieldError(f.id, f.errId, f.wrapId, false);
          isValid = false;
        }
      });
      if (!isValid) return;
      console.log("Inflation form saved");
    });
  document
    .getElementById("btnInflationCancel")
    .addEventListener("click", function () {
      clearModalErrors("formInflation");
      document.getElementById("formInflation").reset();
    });

  /* ── Profit Margins form — submit + cancel ── */
  document
    .getElementById("formProfitMargins")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      clearModalErrors("formProfitMargins");
      var isValid = true;
      [
        {
          id: "profitAnimals",
          errId: "profitAnimals-error",
          wrapId: "fg-profitAnimals",
        },
        {
          id: "profitExceptionalCosts",
          errId: "profitExceptionalCosts-error",
          wrapId: "fg-profitExceptionalCosts",
        },
        {
          id: "profitStaff",
          errId: "profitStaff-error",
          wrapId: "fg-profitStaff",
        },
        {
          id: "profitTests",
          errId: "profitTests-error",
          wrapId: "fg-profitTests",
        },
      ].forEach(function (f) {
        var val = document.getElementById(f.id).value.trim();
        if (!isNumericValue(val)) {
          showFieldError(f.id, f.errId, f.wrapId, false);
          isValid = false;
        }
      });
      if (!isValid) return;
      console.log("Profit Margins form saved");
    });
  document
    .getElementById("btnProfitMarginsCancel")
    .addEventListener("click", function () {
      clearModalErrors("formProfitMargins");
      document.getElementById("formProfitMargins").reset();
    });

  /* ── Initialise all three grids ── */
  initTableAccCat(allRecordsAccCat);
  initTableCsg7(allRecordsCsg7);
  initTableCapsStaff(allRecordsCapsStaff);
});
