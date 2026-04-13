"use strict";

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK DATA
// ─────────────────────────────────────────────────────────────────────────────
var PIMS_PROG_DATA = [
  { id: 1, programme: "APHA_MISC", publicationPrefix: "" },
  { id: 2, programme: "BOVINE_TB", publicationPrefix: "BTB" },
  { id: 3, programme: "DSG", publicationPrefix: "COMM" },
  { id: 4, programme: "END_RES", publicationPrefix: "" },
  { id: 5, programme: "END_SURV", publicationPrefix: "" },
  { id: 6, programme: "EU Exit", publicationPrefix: "" },
  { id: 7, programme: "EU_PROG", publicationPrefix: "" },
  { id: 8, programme: "FES_RES", publicationPrefix: "" },
  { id: 9, programme: "FES_SURV", publicationPrefix: "" },
  { id: 10, programme: "FS_SURV", publicationPrefix: "FES" },
  { id: 11, programme: "FSZ_RES", publicationPrefix: "FES" },
  { id: 12, programme: "FSZ_RESMVN", publicationPrefix: "FES" },
  { id: 13, programme: "GM", publicationPrefix: "" },
  { id: 14, programme: "HPE_PROG", publicationPrefix: "" },
  { id: 15, programme: "IMT", publicationPrefix: "" },
  { id: 16, programme: "IT_SURV", publicationPrefix: "" },
  { id: 17, programme: "IT_WB", publicationPrefix: "" },
  { id: 18, programme: "MISC", publicationPrefix: "" },
  { id: 19, programme: "NFC", publicationPrefix: "" },
  { id: 20, programme: "NI_PROG", publicationPrefix: "" },
  { id: 21, programme: "PHSI", publicationPrefix: "" },
  { id: 22, programme: "PLANT_HEALTH", publicationPrefix: "PH" },
  { id: 23, programme: "RABIES", publicationPrefix: "" },
  { id: 24, programme: "SA_SURV", publicationPrefix: "" },
  { id: 25, programme: "SHE", publicationPrefix: "" },
  { id: 26, programme: "TBSE", publicationPrefix: "" },
  { id: 27, programme: "VIG", publicationPrefix: "" },
  { id: 28, programme: "WB_SURV", publicationPrefix: "" },
  { id: 29, programme: "WLD_HEALTH", publicationPrefix: "" },
  { id: 30, programme: "ZOO_PROG", publicationPrefix: "ZOO" },
];

var USERS_NOTIF_DATA = [
  { id: 1, name: "Sarah Johnson", programme: "FES_SURV" },
  { id: 2, name: "Michael Brown", programme: "EU_PROG" },
  { id: 3, name: "Emma Davis", programme: "PHSI" },
  { id: 4, name: "James Wilson", programme: "IMT" },
  { id: 5, name: "Laura Martinez", programme: "GM" },
  { id: 6, name: "David Thompson", programme: "DSG" },
  { id: 7, name: "Rachel Clarke", programme: "FS_SURV" },
  { id: 8, name: "Tom Harris", programme: "TBSE" },
  { id: 9, name: "Emily White", programme: "PLANT_HEALTH" },
  { id: 10, name: "Chris Lee", programme: "BOVINE_TB" },
  { id: 11, name: "Olivia Green", programme: "HPE_PROG" },
  { id: 12, name: "Daniel Walker", programme: "END_RES" },
  { id: 13, name: "Sophia Hall", programme: "FES_RES" },
  { id: 14, name: "Matthew Allen", programme: "EU Exit" },
  { id: 15, name: "Isabella Young", programme: "FSZ_RES" },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────
var progState = {
  pimsProg: {
    data: [],
    filtered: [],
    currentPage: 1,
    rowsPerPage: 5,
    sortCol: null,
    sortDir: "asc",
    tbodyId: "pimsProgTableBody",
    paginationId: "pimsProgPagination",
    rppId: "pimsProgRecordsPerPage",
  },
  usersNotif: {
    data: [],
    filtered: [],
    currentPage: 1,
    rowsPerPage: 5,
    sortCol: null,
    sortDir: "asc",
    tbodyId: "usersNotifTableBody",
    paginationId: "usersNotifPagination",
    rppId: "usersNotifRecordsPerPage",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function progEsc(val) {
  if (val === null || val === undefined) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER TABLE
// ─────────────────────────────────────────────────────────────────────────────
function progRenderTable(tableKey) {
  var s = progState[tableKey];
  var tbody = document.getElementById(s.tbodyId);
  if (!tbody) return;

  var start = (s.currentPage - 1) * s.rowsPerPage;
  var pageData = s.filtered.slice(start, start + s.rowsPerPage);

  if (pageData.length === 0) {
    tbody.innerHTML =
      '<tr class="govuk-table__row">' +
      '<td class="govuk-table__cell" colspan="3" style="text-align:center;color:#505a5f;">' +
      "No records found</td></tr>";
    return;
  }

  var rows = pageData.map(function (r) {
    var recLabel = tableKey === "pimsProg" ? r.programme : r.name;
    var actions =
      '<td class="govuk-table__cell ra-col-actions" style="white-space:nowrap">' +
      '<button type="button" class="action-btn edit-btn ra-btn-action ra-btn-edit" ' +
      'data-id="' +
      r.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Edit ' +
      progEsc(recLabel) +
      '" style="border:none;background:#fff;">' +
      '<img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for selected record" class="editjobcode" width="20"></button> ' +
      '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete" ' +
      'data-id="' +
      r.id +
      '" data-table="' +
      tableKey +
      '" ' +
      'aria-label="Delete ' +
      progEsc(recLabel) +
      '" style="border:none;background:#fff;">' +
      '<img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record" width="20"></button>' +
      "</td>";
    if (tableKey === "pimsProg") {
      return (
        '<tr class="govuk-table__row">' +
        '<td class="govuk-table__cell tab-font-size">' +
        progEsc(r.programme) +
        "</td>" +
        '<td class="govuk-table__cell tab-font-size">' +
        progEsc(r.publicationPrefix) +
        "</td>" +
        actions +
        "</tr>"
      );
    }
    return (
      '<tr class="govuk-table__row">' +
      '<td class="govuk-table__cell tab-font-size">' +
      progEsc(r.name) +
      "</td>" +
      '<td class="govuk-table__cell tab-font-size">' +
      progEsc(r.programme) +
      "</td>" +
      actions +
      "</tr>"
    );
  });

  tbody.innerHTML = rows.join("");
  progBindActionButtons(tableKey);
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────────────────────────────
var PROG_PREV_SVG =
  '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" ' +
  'xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" ' +
  'focusable="false" viewBox="0 0 15 13">' +
  '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768' +
  'h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path></svg>';

var PROG_NEXT_SVG =
  '<svg class="govuk-pagination__icon govuk-pagination__icon--next" ' +
  'xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" ' +
  'focusable="false" viewBox="0 0 15 13">' +
  '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 ' +
  '3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path></svg>';

function progPageRange(current, total) {
  // Show a fixed set of 3 page numbers; the set advances when current crosses a boundary.
  // Set 1 → pages 1-3, Set 2 → pages 4-6, Set 3 → pages 7-9, …
  var setStart = Math.floor((current - 1) / 3) * 3 + 1;
  var pages = [];
  for (var i = setStart; i < setStart + 3 && i <= total; i++) {
    pages.push(i);
  }
  return pages;
}

function progGoToPage(tableKey, page) {
  var s = progState[tableKey];
  var totalPages = Math.max(1, Math.ceil(s.filtered.length / s.rowsPerPage));
  if (page < 1 || page > totalPages) return;
  s.currentPage = page;
  progRenderTable(tableKey);
  progRenderPagination(tableKey);
}

function progRenderPagination(tableKey) {
  var s = progState[tableKey];
  var ul = document.getElementById(s.paginationId);
  if (!ul) return;

  var totalPages = Math.max(1, Math.ceil(s.filtered.length / s.rowsPerPage));
  ul.innerHTML = "";

  // -- Previous --
  var prevLi = document.createElement("li");
  prevLi.className =
    "govuk-pagination__prev" +
    (s.currentPage === 1 ? " prog-page-disabled" : "");
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  prevA.setAttribute("href", "#");
  prevA.setAttribute("rel", "prev");
  prevA.innerHTML =
    PROG_PREV_SVG +
    '<span class="govuk-pagination__link-title">Previous' +
    '<span class="govuk-visually-hidden"> page</span></span>';
  if (s.currentPage > 1) {
    (function (k, pg) {
      prevA.addEventListener("click", function (e) {
        e.preventDefault();
        progGoToPage(k, pg - 1);
      });
    })(tableKey, s.currentPage);
  }
  prevLi.appendChild(prevA);
  ul.appendChild(prevLi);

  // -- Page numbers --
  progPageRange(s.currentPage, totalPages).forEach(function (p) {
    var li = document.createElement("li");
    if (p === "...") {
      li.className = "govuk-pagination__item govuk-pagination__item--ellipsis";
      li.innerHTML = "&ctdot;";
    } else {
      li.className =
        "govuk-pagination__item" +
        (p === s.currentPage ? " govuk-pagination__item--current" : "");
      var a = document.createElement("a");
      a.className = "govuk-link govuk-pagination__link";
      a.href = "#";
      a.textContent = String(p);
      if (p !== s.currentPage) {
        (function (k, page) {
          a.addEventListener("click", function (e) {
            e.preventDefault();
            progGoToPage(k, page);
          });
        })(tableKey, p);
      }
      li.appendChild(a);
    }
    ul.appendChild(li);
  });

  // -- Next --
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__next" +
    (s.currentPage === totalPages ? " prog-page-disabled" : "");
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  nextA.setAttribute("href", "#");
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next' +
    '<span class="govuk-visually-hidden"> page</span></span>' +
    PROG_NEXT_SVG;
  if (s.currentPage < totalPages) {
    (function (k, pg) {
      nextA.addEventListener("click", function (e) {
        e.preventDefault();
        progGoToPage(k, pg + 1);
      });
    })(tableKey, s.currentPage);
  }
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

// ─────────────────────────────────────────────────────────────────────────────
// SORT
// ─────────────────────────────────────────────────────────────────────────────
function progSortData(tableKey, col) {
  var s = progState[tableKey];
  if (!s) return;
  s.sortDir =
    s.sortCol === col ? (s.sortDir === "asc" ? "desc" : "asc") : "asc";
  s.sortCol = col;
  s.filtered.sort(function (a, b) {
    var av = String(
      a[col] === null || a[col] === undefined ? "" : a[col],
    ).toLowerCase();
    var bv = String(
      b[col] === null || b[col] === undefined ? "" : b[col],
    ).toLowerCase();
    if (av < bv) return s.sortDir === "asc" ? -1 : 1;
    if (av > bv) return s.sortDir === "asc" ? 1 : -1;
    return 0;
  });
  s.currentPage = 1;
  progRenderTable(tableKey);
  progRenderPagination(tableKey);
}

function progBindSortHeaders() {
  document.querySelectorAll(".prog-th-sortable").forEach(function (th) {
    th.addEventListener("click", function () {
      var col = th.getAttribute("data-col");
      var tableKey = th.getAttribute("data-table");
      var s = progState[tableKey];
      if (!s) return;

      // Reset all headers in this table
      document
        .querySelectorAll('[data-table="' + tableKey + '"].prog-th-sortable')
        .forEach(function (t) {
          t.classList.remove("prog-sort-asc", "prog-sort-desc");
          t.setAttribute("aria-sort", "none");
          var icon = t.querySelector(".prog-sort-icon");
          if (icon) icon.innerHTML = "";
        });

      progSortData(tableKey, col);
      th.classList.add(
        s.sortDir === "asc" ? "prog-sort-asc" : "prog-sort-desc",
      );
      th.setAttribute(
        "aria-sort",
        s.sortDir === "asc" ? "ascending" : "descending",
      );
      var icon = th.querySelector(".prog-sort-icon");
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

// ─────────────────────────────────────────────────────────────────────────────
// RECORDS PER PAGE
// ─────────────────────────────────────────────────────────────────────────────
function progBindRppSelects() {
  ["pimsProg", "usersNotif"].forEach(function (key) {
    var sel = document.getElementById(progState[key].rppId);
    if (!sel) return;
    sel.addEventListener("change", function () {
      progState[key].rowsPerPage = parseInt(sel.value, 10);
      progState[key].currentPage = 1;
      progRenderTable(key);
      progRenderPagination(key);
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function progSetFieldError(groupId, errorId, inputId, isSelect) {
  var group = document.getElementById(groupId);
  var error = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.add("govuk-form-group--error");
  if (error) error.style.display = "";
  if (input) {
    if (isSelect) input.classList.add("govuk-select--error");
    else if (input.tagName === "TEXTAREA")
      input.classList.add("govuk-textarea--error");
    else input.classList.add("govuk-input--error");
  }
}

function progClearFieldError(groupId, errorId, inputId) {
  var group = document.getElementById(groupId);
  var error = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.remove("govuk-form-group--error");
  if (error) error.style.display = "none";
  if (input) {
    input.classList.remove("govuk-input--error");
    input.classList.remove("govuk-textarea--error");
    input.classList.remove("govuk-select--error");
  }
}

function progShowDbError(bannerId, textId, message) {
  var banner = document.getElementById(bannerId);
  var text = document.getElementById(textId);
  if (banner) banner.style.display = "";
  if (text) text.textContent = message;
}

function progHideDbError(bannerId) {
  var banner = document.getElementById(bannerId);
  if (banner) banner.style.display = "none";
}

// ─────────────────────────────────────────────────────────────────────────────
// PIMS PROGRAMME MODAL
// ─────────────────────────────────────────────────────────────────────────────
function progOpenProgModal(id) {
  progHideDbError("progProgDbError");
  progClearFieldError("progProgNameGroup", "progProgNameError", "progProgName");
  var title = document.getElementById("progProgModalTitle");
  if (id) {
    var rec = progState.pimsProg.data.filter(function (r) {
      return r.id === id;
    })[0];
    document.getElementById("progProgRecordId").value = id;
    document.getElementById("progProgName").value = rec ? rec.programme : "";
    document.getElementById("progProgPrefix").value = rec
      ? rec.publicationPrefix
      : "";
    title.textContent = "Edit PIMS Program";
  } else {
    document.getElementById("progProgRecordId").value = "";
    document.getElementById("progProgName").value = "";
    document.getElementById("progProgPrefix").value = "";
    title.textContent = "Add PIMS Program";
  }
  document.getElementById("progProgEditModal").removeAttribute("hidden");
  document.getElementById("progProgName").focus();
}

function progCloseProgModal() {
  document.getElementById("progProgEditModal").setAttribute("hidden", "");
}

function progSaveProgModal() {
  var nameVal = document.getElementById("progProgName").value.trim();
  progClearFieldError("progProgNameGroup", "progProgNameError", "progProgName");
  if (!nameVal) {
    progSetFieldError(
      "progProgNameGroup",
      "progProgNameError",
      "progProgName",
      true,
    );
    document.getElementById("progProgName").focus();
    return;
  }
  var id = document.getElementById("progProgRecordId").value;
  var prefixVal = document.getElementById("progProgPrefix").value.trim();
  if (id) {
    var rec = progState.pimsProg.data.filter(function (r) {
      return r.id === parseInt(id, 10);
    })[0];
    if (rec) {
      rec.programme = nameVal;
      rec.publicationPrefix = prefixVal;
    }
  } else {
    var ids = progState.pimsProg.data.map(function (r) {
      return r.id;
    });
    var newId = ids.length ? Math.max.apply(null, ids) + 1 : 1;
    progState.pimsProg.data.unshift({
      id: newId,
      programme: nameVal,
      publicationPrefix: prefixVal,
    });
  }
  progState.pimsProg.filtered = progState.pimsProg.data.slice();
  progRenderTable("pimsProg");
  progRenderPagination("pimsProg");
  progCloseProgModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// USER NOTIFICATION MODAL
// ─────────────────────────────────────────────────────────────────────────────
function progOpenUserModal(id) {
  progHideDbError("progUserDbError");
  progClearFieldError("progUserNameGroup", "progUserNameError", "progUserName");
  progClearFieldError(
    "progUserProgrammeGroup",
    "progUserProgrammeError",
    "progUserProgramme",
  );
  var title = document.getElementById("progUserModalTitle");
  if (id) {
    var rec = progState.usersNotif.data.filter(function (r) {
      return r.id === id;
    })[0];
    document.getElementById("progUserRecordId").value = id;
    document.getElementById("progUserName").value = rec ? rec.name : "";
    document.getElementById("progUserProgramme").value = rec
      ? rec.programme
      : "";
    title.textContent = "Edit User Notification";
  } else {
    document.getElementById("progUserRecordId").value = "";
    document.getElementById("progUserName").value = "";
    document.getElementById("progUserProgramme").value = "";
    title.textContent = "Add User Notification";
  }
  document.getElementById("progUserEditModal").removeAttribute("hidden");
  document.getElementById("progUserName").focus();
}

function progCloseUserModal() {
  document.getElementById("progUserEditModal").setAttribute("hidden", "");
}

function progSaveUserModal() {
  var nameVal = document.getElementById("progUserName").value.trim();
  var progVal = document.getElementById("progUserProgramme").value;
  progClearFieldError("progUserNameGroup", "progUserNameError", "progUserName");
  progClearFieldError(
    "progUserProgrammeGroup",
    "progUserProgrammeError",
    "progUserProgramme",
  );
  var hasError = false;
  if (!nameVal) {
    progSetFieldError(
      "progUserNameGroup",
      "progUserNameError",
      "progUserName",
      true,
    );
    hasError = true;
  }
  if (!progVal) {
    progSetFieldError(
      "progUserProgrammeGroup",
      "progUserProgrammeError",
      "progUserProgramme",
      true,
    );
    hasError = true;
  }
  if (hasError) {
    document
      .getElementById(!nameVal ? "progUserName" : "progUserProgramme")
      .focus();
    return;
  }
  var id = document.getElementById("progUserRecordId").value;
  if (id) {
    var rec = progState.usersNotif.data.filter(function (r) {
      return r.id === parseInt(id, 10);
    })[0];
    if (rec) {
      rec.name = nameVal;
      rec.programme = progVal;
    }
  } else {
    var ids = progState.usersNotif.data.map(function (r) {
      return r.id;
    });
    var newId = ids.length ? Math.max.apply(null, ids) + 1 : 1;
    progState.usersNotif.data.unshift({
      id: newId,
      name: nameVal,
      programme: progVal,
    });
  }
  progState.usersNotif.filtered = progState.usersNotif.data.slice();
  progRenderTable("usersNotif");
  progRenderPagination("usersNotif");
  progCloseUserModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE MODAL
// ─────────────────────────────────────────────────────────────────────────────
function progDeleteRecord(id, tableKey) {
  var rec = progState[tableKey].data.filter(function (r) {
    return r.id === id;
  })[0];
  var label = rec
    ? tableKey === "pimsProg"
      ? rec.programme
      : rec.name
    : String(id);
  if (!confirm("Are you sure you want to delete this record?")) return;
  progState[tableKey].data = progState[tableKey].data.filter(function (r) {
    return r.id !== id;
  });
  progState[tableKey].filtered = progState[tableKey].filtered.filter(
    function (r) {
      return r.id !== id;
    },
  );
  var totalPages = Math.max(
    1,
    Math.ceil(
      progState[tableKey].filtered.length / progState[tableKey].rowsPerPage,
    ),
  );
  if (progState[tableKey].currentPage > totalPages)
    progState[tableKey].currentPage = totalPages;
  progRenderTable(tableKey);
  progRenderPagination(tableKey);
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION BUTTONS (per row)
// ─────────────────────────────────────────────────────────────────────────────
function progBindActionButtons(tableKey) {
  var tbody = document.getElementById(progState[tableKey].tbodyId);
  if (!tbody) return;
  tbody.querySelectorAll(".ra-btn-edit").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"), 10);
      if (tableKey === "pimsProg") progOpenProgModal(id);
      else progOpenUserModal(id);
    });
  });
  tbody.querySelectorAll(".ra-btn-delete").forEach(function (btn) {
    btn.addEventListener("click", function () {
      progDeleteRecord(parseInt(btn.getAttribute("data-id"), 10), tableKey);
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL BUTTON BINDINGS
// ─────────────────────────────────────────────────────────────────────────────
function progBindModalButtons() {
  document
    .getElementById("btnSaveProgEdit")
    .addEventListener("click", progSaveProgModal);
  document
    .getElementById("btnCancelProgEdit")
    .addEventListener("click", progCloseProgModal);
  document
    .getElementById("btnCloseProgModal")
    .addEventListener("click", progCloseProgModal);

  document
    .getElementById("btnSaveUserEdit")
    .addEventListener("click", progSaveUserModal);
  document
    .getElementById("btnCancelUserEdit")
    .addEventListener("click", progCloseUserModal);
  document
    .getElementById("btnCloseUserModal")
    .addEventListener("click", progCloseUserModal);

  ["progProgEditModal", "progUserEditModal"].forEach(function (modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.setAttribute("hidden", "");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    ["progProgEditModal", "progUserEditModal"].forEach(function (modalId) {
      var m = document.getElementById(modalId);
      if (m && !m.hasAttribute("hidden")) m.setAttribute("hidden", "");
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  progState.pimsProg.data = PIMS_PROG_DATA.slice();
  progState.pimsProg.filtered = PIMS_PROG_DATA.slice();
  progState.usersNotif.data = USERS_NOTIF_DATA.slice();
  progState.usersNotif.filtered = USERS_NOTIF_DATA.slice();

  // progUserProgramme options are static in HTML

  progRenderTable("pimsProg");
  progRenderPagination("pimsProg");
  progRenderTable("usersNotif");
  progRenderPagination("usersNotif");
  progBindSortHeaders();
  progBindRppSelects();
  progBindModalButtons();

  var btnAddProg = document.getElementById("btnAddProg");
  if (btnAddProg)
    btnAddProg.addEventListener("click", function () {
      progOpenProgModal(null);
    });
});
