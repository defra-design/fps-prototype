"use strict";

/* =====================================================
   Admin Maintenance Tab – Users & User Access grids
   PIMS Report Admin Maintenance
   ===================================================== */

// ── User name options for Access modal dropdown ──────────────
var ADMIN_USER_NAME_OPTIONS = [
  "Martin, Steve",
  "Gage, Amanda",
  "Fowler, Ayesha",
  "Ritchie, Stephanie",
  "Northcott, Emma",
  "Narayanan, Vidhya",
  "Butler, Tom",
  "Foxon, Janee",
  "Jackson, George",
  "Moran, Michaela",
  "Bateman, Rebecca",
  "Moore, Tony",
  "Bell, Howard",
  "Lambert, Abby",
];

// ── Dataset: Users ───────────────────────────────────
var ADMIN_USERS = [
  { id: 1, ntlogin: "f000178", username: "Ferguson, Jennifer" },
  { id: 2, ntlogin: "m1000014", username: "Gage, Amanda" },
  { id: 3, ntlogin: "m1000664", username: "Brown, Kiera" },
  { id: 4, ntlogin: "m1011391", username: "Lambert, Abby" },
  { id: 5, ntlogin: "m1015641", username: "Bell, Howard" },
  { id: 6, ntlogin: "m1017648", username: "Adeola, Adedapo" },
  { id: 7, ntlogin: "m1019002", username: "Patel, Ravi" },
  { id: 8, ntlogin: "m1021445", username: "Hughes, Ceri" },
  { id: 9, ntlogin: "m1024781", username: "Okafor, Emeka" },
  { id: 10, ntlogin: "m1027839", username: "Singh, Priya" },
  { id: 11, ntlogin: "m1031002", username: "Taylor, Marcus" },
  { id: 12, ntlogin: "m1034567", username: "Walker, Beth" },
  { id: 13, ntlogin: "m1038901", username: "Byrne, Ciara" },
  { id: 14, ntlogin: "m1041234", username: "Jones, Andrea" },
  { id: 15, ntlogin: "m1044678", username: "Reed, Thomas" },
  { id: 16, ntlogin: "m1048012", username: "Khan, Amir" },
  { id: 17, ntlogin: "m1051345", username: "Clarke, Fiona" },
  { id: 18, ntlogin: "m1054789", username: "Morris, Graham" },
  { id: 19, ntlogin: "m1058123", username: "Murphy, Siobhan" },
  { id: 20, ntlogin: "m1061456", username: "Evans, Dylan" },
  { id: 21, ntlogin: "m1064890", username: "Hart, Naomi" },
  { id: 22, ntlogin: "m1068223", username: "Griffiths, Scott" },
];

// ── Dataset: Access Levels ────────────────────────────
var ACCESS_LEVELS = ["Admin", "Maintenance", "Programme Manager", "Read Only"];

// ── Dataset: User Access ─────────────────────────────
var ADMIN_ACCESS = [
  { id: 1, user: "Ferguson, Jennifer", accessLevel: "Maintenance" },
  { id: 2, user: "Martin, Steve", accessLevel: "Maintenance" },
  { id: 3, user: "Bateman, Rebecca", accessLevel: "Maintenance" },
  { id: 4, user: "Foxon, Janee", accessLevel: "Maintenance" },
  { id: 5, user: "Fowler, Ayesha", accessLevel: "Maintenance" },
  { id: 6, user: "Narayanan, Vidhya", accessLevel: "Maintenance" },
  { id: 7, user: "Patel, Ravi", accessLevel: "Admin" },
  { id: 8, user: "Hughes, Ceri", accessLevel: "Read Only" },
  { id: 9, user: "Singh, Priya", accessLevel: "Programme Manager" },
  { id: 10, user: "Taylor, Marcus", accessLevel: "Maintenance" },
  { id: 11, user: "Walker, Beth", accessLevel: "Admin" },
];

// ── State: Users grid ─────────────────────────────────
var adminUsersState = {
  sortCol: null,
  sortDir: "asc",
  currentPage: 1,
  rowsPerPage: 5,
  filtered: [],
  nextId: 23,
};

// ── State: Access grid ────────────────────────────────
var adminAccessState = {
  sortCol: null,
  sortDir: "asc",
  currentPage: 1,
  rowsPerPage: 5,
  filtered: [],
  nextId: 12,
};

// ── Modal state ───────────────────────────────────────
var _adminUserModalMode = null;
var _adminUserEditOrigId = null;
var _adminAccessModalMode = null;
var _adminAccessEditOrigId = null;

// ── HTML escape helper ────────────────────────────────
function adminEscape(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Initialise ────────────────────────────────────────
function initAdminTab() {
  renderAdminUsersTable();
  renderAdminAccessTable();
}

// ════════════════════════════════════════════════════
//  USERS GRID
// ════════════════════════════════════════════════════

function renderAdminUsersTable() {
  var tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  // Sort
  var data = ADMIN_USERS.slice();
  if (adminUsersState.sortCol) {
    var col = adminUsersState.sortCol;
    var dir = adminUsersState.sortDir === "asc" ? 1 : -1;
    data.sort(function (a, b) {
      var av = String(a[col] || "").toLowerCase();
      var bv = String(b[col] || "").toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }
  adminUsersState.filtered = data;

  // Paginate
  var total = data.length;
  var rpp = adminUsersState.rowsPerPage;
  var totalPages = Math.max(1, Math.ceil(total / rpp));
  if (adminUsersState.currentPage > totalPages)
    adminUsersState.currentPage = totalPages;
  var start = (adminUsersState.currentPage - 1) * rpp;
  var pageData = data.slice(start, start + rpp);

  // Rows
  var rowsHtml = "";
  if (pageData.length === 0) {
    rowsHtml =
      '<tr class="admin-empty-row"><td colspan="3">No records found.</td></tr>';
  } else {
    for (var i = 0; i < pageData.length; i++) {
      var rec = pageData[i];
      rowsHtml +=
        '<tr data-id="' +
        rec.id +
        '">' +
        '<td class="admin-col-ntlogin">' +
        adminEscape(rec.ntlogin) +
        "</td>" +
        "<td>" +
        adminEscape(rec.username) +
        "</td>" +
        '<td class="admin-col-actions">' +
        '<button type="button" class="action-btn ra-btn-action ra-btn-edit admin-user-edit-btn" ' +
        'data-id="' +
        rec.id +
        '" style="border:none;background:transparent;" ' +
        'aria-label="Edit ' +
        adminEscape(rec.username) +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" class="editjobcode" width="20">' +
        "</button> " +
        '<button type="button" class="action-btn ra-btn-action ra-btn-delete admin-user-delete-btn" ' +
        'data-id="' +
        rec.id +
        '" style="border:none;background:transparent;" ' +
        'aria-label="Delete ' +
        adminEscape(rec.username) +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20">' +
        "</button>" +
        "</td></tr>";
    }
  }
  tbody.innerHTML = rowsHtml;

  // Sort icon classes on headers
  adminUpdateSortIcons("adminUsers");

  // Row action events
  adminAttachUserRowEvents();

  // Pagination
  var bar = document.getElementById("adminUsersPaginationBar");
  if (bar) {
    bar.innerHTML = buildAdminPagination(
      "adminUsers",
      totalPages,
      total,
      adminUsersState,
    );
    attachAdminPaginationEvents("adminUsers");
  }
}

function adminAttachUserRowEvents() {
  var editBtns = document.querySelectorAll(".admin-user-edit-btn");
  for (var i = 0; i < editBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var rec = adminGetUserById(parseInt(btn.getAttribute("data-id"), 10));
        if (rec) openAdminUserEditModal(rec);
      });
    })(editBtns[i]);
  }

  var deleteBtns = document.querySelectorAll(".admin-user-delete-btn");
  for (var j = 0; j < deleteBtns.length; j++) {
    (function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var rec = adminGetUserById(parseInt(btn.getAttribute("data-id"), 10));
        if (rec) adminUserDeleteRecord(rec);
      });
    })(deleteBtns[j]);
  }
}

function adminGetUserById(id) {
  for (var i = 0; i < ADMIN_USERS.length; i++) {
    if (ADMIN_USERS[i].id === id) return ADMIN_USERS[i];
  }
  return null;
}

function adminUsersHandleSort(col) {
  if (adminUsersState.sortCol === col) {
    adminUsersState.sortDir =
      adminUsersState.sortDir === "asc" ? "desc" : "asc";
  } else {
    adminUsersState.sortCol = col;
    adminUsersState.sortDir = "asc";
  }
  adminUsersState.currentPage = 1;
  renderAdminUsersTable();
}

// ════════════════════════════════════════════════════
//  ACCESS GRID
// ════════════════════════════════════════════════════

function renderAdminAccessTable() {
  var tbody = document.getElementById("adminAccessTableBody");
  if (!tbody) return;

  // Sort
  var data = ADMIN_ACCESS.slice();
  if (adminAccessState.sortCol) {
    var col = adminAccessState.sortCol;
    var dir = adminAccessState.sortDir === "asc" ? 1 : -1;
    data.sort(function (a, b) {
      var av = String(a[col] || "").toLowerCase();
      var bv = String(b[col] || "").toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }
  adminAccessState.filtered = data;

  // Paginate
  var total = data.length;
  var rpp = adminAccessState.rowsPerPage;
  var totalPages = Math.max(1, Math.ceil(total / rpp));
  if (adminAccessState.currentPage > totalPages)
    adminAccessState.currentPage = totalPages;
  var start = (adminAccessState.currentPage - 1) * rpp;
  var pageData = data.slice(start, start + rpp);

  // Rows
  var rowsHtml = "";
  if (pageData.length === 0) {
    rowsHtml =
      '<tr class="admin-empty-row"><td colspan="3">No records found.</td></tr>';
  } else {
    for (var i = 0; i < pageData.length; i++) {
      var rec = pageData[i];
      rowsHtml +=
        '<tr data-id="' +
        rec.id +
        '">' +
        "<td>" +
        adminEscape(rec.user) +
        "</td>" +
        '<td class="admin-col-access">' +
        adminEscape(rec.accessLevel) +
        "</td>" +
        '<td class="admin-col-actions">' +
        '<button type="button" class="action-btn ra-btn-action ra-btn-edit admin-access-edit-btn" ' +
        'data-id="' +
        rec.id +
        '" style="border:none;background:transparent;" ' +
        'aria-label="Edit access for ' +
        adminEscape(rec.user) +
        '">' +
        '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" class="editjobcode" width="20">' +
        "</button> " +
        '<button type="button" class="action-btn ra-btn-action ra-btn-delete admin-access-delete-btn" ' +
        'data-id="' +
        rec.id +
        '" style="border:none;background:transparent;" ' +
        'aria-label="Delete access for ' +
        adminEscape(rec.user) +
        '">' +
        '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20">' +
        "</button>" +
        "</td></tr>";
    }
  }
  tbody.innerHTML = rowsHtml;

  adminUpdateSortIcons("adminAccess");
  adminAttachAccessRowEvents();

  var bar = document.getElementById("adminAccessPaginationBar");
  if (bar) {
    bar.innerHTML = buildAdminPagination(
      "adminAccess",
      totalPages,
      total,
      adminAccessState,
    );
    attachAdminPaginationEvents("adminAccess");
  }
}

function adminAttachAccessRowEvents() {
  var editBtns = document.querySelectorAll(".admin-access-edit-btn");
  for (var i = 0; i < editBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var rec = adminGetAccessById(parseInt(btn.getAttribute("data-id"), 10));
        if (rec) openAdminAccessEditModal(rec);
      });
    })(editBtns[i]);
  }

  var deleteBtns = document.querySelectorAll(".admin-access-delete-btn");
  for (var j = 0; j < deleteBtns.length; j++) {
    (function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var rec = adminGetAccessById(parseInt(btn.getAttribute("data-id"), 10));
        if (rec) adminAccessDeleteRecord(rec);
      });
    })(deleteBtns[j]);
  }
}

function adminGetAccessById(id) {
  for (var i = 0; i < ADMIN_ACCESS.length; i++) {
    if (ADMIN_ACCESS[i].id === id) return ADMIN_ACCESS[i];
  }
  return null;
}

function adminAccessHandleSort(col) {
  if (adminAccessState.sortCol === col) {
    adminAccessState.sortDir =
      adminAccessState.sortDir === "asc" ? "desc" : "asc";
  } else {
    adminAccessState.sortCol = col;
    adminAccessState.sortDir = "asc";
  }
  adminAccessState.currentPage = 1;
  renderAdminAccessTable();
}

// ════════════════════════════════════════════════════
//  SORT ICON UPDATES
// ════════════════════════════════════════════════════

function adminUpdateSortIcons(gridId) {
  var state = gridId === "adminUsers" ? adminUsersState : adminAccessState;
  var ths = document.querySelectorAll("." + gridId + "-th");
  for (var i = 0; i < ths.length; i++) {
    ths[i].classList.remove("admin-sort-asc", "admin-sort-desc");
    if (ths[i].getAttribute("data-sort") === state.sortCol) {
      ths[i].classList.add(
        state.sortDir === "asc" ? "admin-sort-asc" : "admin-sort-desc",
      );
    }
  }
}

// ════════════════════════════════════════════════════
//  PAGINATION
// ════════════════════════════════════════════════════

function buildAdminPagination(gridId, totalPages, total, state) {
  var rpp = state.rowsPerPage;
  var cur = state.currentPage;
  var prevDisabled = cur <= 1;
  var nextDisabled = cur >= totalPages;
  var rppId = gridId + "RecordsPerPage";
  var prevClass = gridId + "-prev-btn";
  var nextClass = gridId + "-next-btn";
  var pageClass = gridId + "-page-btn";

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

  var pageStart = Math.max(1, cur - 2);
  var pageEnd = Math.min(totalPages, pageStart + 4);
  if (pageEnd - pageStart < 4) pageStart = Math.max(1, pageEnd - 4);

  var pagesHtml = "";
  for (var p = pageStart; p <= pageEnd; p++) {
    var isCurrent = p === cur;
    pagesHtml +=
      '<li class="govuk-pagination__item' +
      (isCurrent ? " govuk-pagination__item--current" : "") +
      '">' +
      '<a class="govuk-link govuk-pagination__link ' +
      pageClass +
      '" data-page="' +
      p +
      '" ' +
      'aria-label="Page ' +
      p +
      '"' +
      (isCurrent ? ' aria-current="page"' : "") +
      ">" +
      p +
      "</a></li>";
  }

  return (
    '<div class="sup_pagination_footer sup_border">' +
    '<div class="sup_pagination_wrapper">' +
    '<div class="sup_margin_top_bottom_5_10">' +
    '<label class="pagination-label" for="' +
    rppId +
    '">Records per page</label>&nbsp;' +
    '<select id="' +
    rppId +
    '" class="govuk-select sup_select_pagination_width">' +
    rppOptions +
    "</select>" +
    "</div>" +
    '<nav class="govuk-pagination govuk-!-margin-bottom-0" aria-label="' +
    gridId +
    ' pagination">' +
    '<ul class="govuk-pagination__list">' +
    '<li class="govuk-pagination__item' +
    (prevDisabled ? " disabled" : "") +
    '">' +
    '<a class="govuk-link govuk-pagination__link ' +
    prevClass +
    '"' +
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
    '<a class="govuk-link govuk-pagination__link ' +
    nextClass +
    '"' +
    (nextDisabled ? ' aria-disabled="true" tabindex="-1"' : "") +
    ">" +
    '<span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">' +
    '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path></svg>' +
    "</a></li>" +
    "</ul></nav>" +
    "</div></div>"
  );
}

function attachAdminPaginationEvents(gridId) {
  var state = gridId === "adminUsers" ? adminUsersState : adminAccessState;
  var renderFn =
    gridId === "adminUsers" ? renderAdminUsersTable : renderAdminAccessTable;

  var prevBtn = document.querySelector("." + gridId + "-prev-btn");
  if (prevBtn && !prevBtn.getAttribute("aria-disabled")) {
    prevBtn.addEventListener("click", function () {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderFn();
      }
    });
  }

  var nextBtn = document.querySelector("." + gridId + "-next-btn");
  if (nextBtn && !nextBtn.getAttribute("aria-disabled")) {
    nextBtn.addEventListener("click", function () {
      var totalPages = Math.ceil(state.filtered.length / state.rowsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage++;
        renderFn();
      }
    });
  }

  var pageBtns = document.querySelectorAll("." + gridId + "-page-btn");
  for (var i = 0; i < pageBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        state.currentPage = parseInt(btn.getAttribute("data-page"), 10);
        renderFn();
      });
    })(pageBtns[i]);
  }

  var rppSel = document.getElementById(gridId + "RecordsPerPage");
  if (rppSel) {
    rppSel.addEventListener("change", function () {
      state.rowsPerPage = parseInt(rppSel.value, 10);
      state.currentPage = 1;
      renderFn();
    });
  }
}

// ════════════════════════════════════════════════════
//  USER MODAL – ADD / EDIT / SAVE / CLOSE
// ════════════════════════════════════════════════════

function openAdminUserAddModal() {
  _adminUserModalMode = "add";
  _adminUserEditOrigId = null;

  var title = document.getElementById("adminUserModalTitle");
  if (title) title.textContent = "Add User";

  var ntloginInput = document.getElementById("adminUserNTLogin");
  var usernameInput = document.getElementById("adminUserName");
  if (ntloginInput) ntloginInput.value = "";
  if (usernameInput) usernameInput.value = "";

  adminClearUserErrors();
  adminHideUserDbError();

  var modal = document.getElementById("adminUserEditModal");
  if (modal) {
    modal.hidden = false;
    if (ntloginInput) ntloginInput.focus();
  }
}

function openAdminUserEditModal(rec) {
  _adminUserModalMode = "edit";
  _adminUserEditOrigId = rec.id;

  var title = document.getElementById("adminUserModalTitle");
  if (title) title.textContent = "Edit User";

  var ntloginInput = document.getElementById("adminUserNTLogin");
  var usernameInput = document.getElementById("adminUserName");
  if (ntloginInput) ntloginInput.value = rec.ntlogin;
  if (usernameInput) usernameInput.value = rec.username;

  adminClearUserErrors();
  adminHideUserDbError();

  var modal = document.getElementById("adminUserEditModal");
  if (modal) {
    modal.hidden = false;
    if (ntloginInput) ntloginInput.focus();
  }
}

function saveAdminUserModal() {
  adminHideUserDbError();
  adminClearUserErrors();

  var ntloginInput = document.getElementById("adminUserNTLogin");
  var usernameInput = document.getElementById("adminUserName");
  var ntloginVal = ntloginInput ? ntloginInput.value.trim() : "";
  var usernameVal = usernameInput ? usernameInput.value.trim() : "";
  var hasError = false;

  // Validate NTLogin
  if (!ntloginVal) {
    adminSetUserFieldError(
      "adminUserNTLoginGroup",
      "adminUserNTLoginError",
      "adminUserNTLogin",
      "NTLogin is required",
    );
    hasError = true;
  } else if (_adminUserModalMode === "add") {
    for (var i = 0; i < ADMIN_USERS.length; i++) {
      if (ADMIN_USERS[i].ntlogin.toLowerCase() === ntloginVal.toLowerCase()) {
        adminSetUserFieldError(
          "adminUserNTLoginGroup",
          "adminUserNTLoginError",
          "adminUserNTLogin",
          "NTLogin already exists",
        );
        hasError = true;
        break;
      }
    }
  }

  // Validate UserName
  if (!usernameVal) {
    adminSetUserFieldError(
      "adminUserNameGroup",
      "adminUserNameError",
      "adminUserName",
      "UserName is required",
    );
    hasError = true;
  }

  if (hasError) {
    var firstErr = document.querySelector(
      "#adminUserEditModal .govuk-input--error",
    );
    if (firstErr) firstErr.focus();
    return;
  }

  if (_adminUserModalMode === "add") {
    ADMIN_USERS.unshift({
      id: adminUsersState.nextId++,
      ntlogin: ntloginVal,
      username: usernameVal,
    });
  } else {
    for (var j = 0; j < ADMIN_USERS.length; j++) {
      if (ADMIN_USERS[j].id === _adminUserEditOrigId) {
        ADMIN_USERS[j].ntlogin = ntloginVal;
        ADMIN_USERS[j].username = usernameVal;
        break;
      }
    }
  }

  closeAdminUserModal();
  renderAdminUsersTable();
}

function closeAdminUserModal() {
  var modal = document.getElementById("adminUserEditModal");
  if (modal) modal.hidden = true;
}

// ════════════════════════════════════════════════════
//  USER MODAL – DELETE
// ════════════════════════════════════════════════════

function adminUserDeleteRecord(rec) {
  if (!confirm("Are you sure you want to delete this record?")) return;
  ADMIN_USERS = ADMIN_USERS.filter(function (r) {
    return r.id !== rec.id;
  });
  var totalPages = Math.max(
    1,
    Math.ceil(ADMIN_USERS.length / adminUsersState.rowsPerPage),
  );
  if (adminUsersState.currentPage > totalPages)
    adminUsersState.currentPage = totalPages;
  renderAdminUsersTable();
}

// ════════════════════════════════════════════════════
//  ACCESS MODAL – ADD / EDIT / SAVE / CLOSE
// ════════════════════════════════════════════════════

function openAdminAccessAddModal() {
  _adminAccessModalMode = "add";
  _adminAccessEditOrigId = null;

  var title = document.getElementById("adminAccessModalTitle");
  if (title) title.textContent = "Add User Access";

  var userInput = document.getElementById("adminAccessUser");
  var levelSelect = document.getElementById("adminAccessLevel");

  // Populate user dropdown
  if (userInput) {
    var optHtml = '<option value="">-- Select User --</option>';
    ADMIN_USER_NAME_OPTIONS.forEach(function (n) {
      optHtml += '<option value="' + n + '">' + n + "</option>";
    });
    userInput.innerHTML = optHtml;
    userInput.value = "";
  }
  if (levelSelect) levelSelect.value = "";

  adminClearAccessErrors();
  adminHideAccessDbError();

  var modal = document.getElementById("adminAccessEditModal");
  if (modal) {
    modal.hidden = false;
    if (userInput) userInput.focus();
  }
}

function openAdminAccessEditModal(rec) {
  _adminAccessModalMode = "edit";
  _adminAccessEditOrigId = rec.id;

  var title = document.getElementById("adminAccessModalTitle");
  if (title) title.textContent = "Edit User Access";

  var userInput = document.getElementById("adminAccessUser");
  var levelSelect = document.getElementById("adminAccessLevel");

  // Populate user dropdown and pre-select current value
  if (userInput) {
    var optHtml = '<option value="">-- Select User --</option>';
    ADMIN_USER_NAME_OPTIONS.forEach(function (n) {
      optHtml +=
        '<option value="' +
        n +
        '"' +
        (n === rec.user ? " selected" : "") +
        ">" +
        n +
        "</option>";
    });
    userInput.innerHTML = optHtml;
  }
  if (levelSelect) levelSelect.value = rec.accessLevel;

  adminClearAccessErrors();
  adminHideAccessDbError();

  var modal = document.getElementById("adminAccessEditModal");
  if (modal) {
    modal.hidden = false;
    if (userInput) userInput.focus();
  }
}

function saveAdminAccessModal() {
  adminHideAccessDbError();
  adminClearAccessErrors();

  var userInput = document.getElementById("adminAccessUser");
  var levelSelect = document.getElementById("adminAccessLevel");
  var userVal = userInput ? userInput.value : "";
  var levelVal = levelSelect ? levelSelect.value.trim() : "";
  var hasError = false;

  if (!userVal) {
    adminSetAccessFieldError(
      "adminAccessUserGroup",
      "adminAccessUserError",
      "adminAccessUser",
      "Please select a user",
    );
    hasError = true;
  }

  if (!levelVal) {
    adminSetAccessFieldError(
      "adminAccessLevelGroup",
      "adminAccessLevelError",
      "adminAccessLevel",
      "Access Level is required",
    );
    hasError = true;
  }

  if (hasError) {
    var firstErr = document.querySelector(
      "#adminAccessEditModal .govuk-input--error, #adminAccessEditModal .govuk-select--error",
    );
    if (firstErr) firstErr.focus();
    return;
  }

  if (_adminAccessModalMode === "add") {
    ADMIN_ACCESS.unshift({
      id: adminAccessState.nextId++,
      user: userVal,
      accessLevel: levelVal,
    });
  } else {
    for (var j = 0; j < ADMIN_ACCESS.length; j++) {
      if (ADMIN_ACCESS[j].id === _adminAccessEditOrigId) {
        ADMIN_ACCESS[j].user = userVal;
        ADMIN_ACCESS[j].accessLevel = levelVal;
        break;
      }
    }
  }

  closeAdminAccessModal();
  renderAdminAccessTable();
}

function closeAdminAccessModal() {
  var modal = document.getElementById("adminAccessEditModal");
  if (modal) modal.hidden = true;
}

// ════════════════════════════════════════════════════
//  ACCESS MODAL – DELETE
// ════════════════════════════════════════════════════

function adminAccessDeleteRecord(rec) {
  if (!confirm("Are you sure you want to delete this record?")) return;
  ADMIN_ACCESS = ADMIN_ACCESS.filter(function (r) {
    return r.id !== rec.id;
  });
  var totalPages = Math.max(
    1,
    Math.ceil(ADMIN_ACCESS.length / adminAccessState.rowsPerPage),
  );
  if (adminAccessState.currentPage > totalPages)
    adminAccessState.currentPage = totalPages;
  renderAdminAccessTable();
}

// ════════════════════════════════════════════════════
//  VALIDATION HELPERS – USERS
// ════════════════════════════════════════════════════

function adminSetUserFieldError(groupId, errorId, inputId, message) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.add("govuk-form-group--error");
  if (err) {
    err.style.display = "";
    var span = err.querySelector(".admin-error-text");
    if (span && message) span.textContent = message;
  }
  if (input) input.classList.add("govuk-input--error");
}

function adminClearUserErrors() {
  var ids = [
    {
      g: "adminUserNTLoginGroup",
      e: "adminUserNTLoginError",
      i: "adminUserNTLogin",
    },
    { g: "adminUserNameGroup", e: "adminUserNameError", i: "adminUserName" },
  ];
  for (var k = 0; k < ids.length; k++) {
    var grp = document.getElementById(ids[k].g);
    var err = document.getElementById(ids[k].e);
    var inp = document.getElementById(ids[k].i);
    if (grp) grp.classList.remove("govuk-form-group--error");
    if (err) err.style.display = "none";
    if (inp) inp.classList.remove("govuk-input--error");
  }
}

function adminHideUserDbError() {
  var banner = document.getElementById("adminUserDbError");
  if (banner) banner.style.display = "none";
}

// ════════════════════════════════════════════════════
//  VALIDATION HELPERS – ACCESS
// ════════════════════════════════════════════════════

function adminSetAccessFieldError(groupId, errorId, inputId, message) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.add("govuk-form-group--error");
  if (err) {
    err.style.display = "";
    var span = err.querySelector(".admin-error-text");
    if (span && message) span.textContent = message;
  }
  if (input) {
    input.classList.add("govuk-input--error");
    input.classList.add("govuk-select--error");
  }
}

function adminClearAccessErrors() {
  var ids = [
    {
      g: "adminAccessUserGroup",
      e: "adminAccessUserError",
      i: "adminAccessUser",
    },
    {
      g: "adminAccessLevelGroup",
      e: "adminAccessLevelError",
      i: "adminAccessLevel",
    },
  ];
  for (var k = 0; k < ids.length; k++) {
    var grp = document.getElementById(ids[k].g);
    var err = document.getElementById(ids[k].e);
    var inp = document.getElementById(ids[k].i);
    if (grp) grp.classList.remove("govuk-form-group--error");
    if (err) err.style.display = "none";
    if (inp) {
      inp.classList.remove("govuk-input--error");
      inp.classList.remove("govuk-select--error");
    }
  }
}

function adminHideAccessDbError() {
  var banner = document.getElementById("adminAccessDbError");
  if (banner) banner.style.display = "none";
}

// ════════════════════════════════════════════════════
//  BOOTSTRAP ON DOMContentLoaded
// ════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function () {
  initAdminTab();

  // Re-render on tab activation
  var tabLink = document.getElementById("tab-admin-maintenance-link");
  if (tabLink) {
    tabLink.addEventListener("click", function () {
      renderAdminUsersTable();
      renderAdminAccessTable();
    });
  }

  // Sort headers – Users
  var userThs = document.querySelectorAll(".adminUsers-th");
  for (var i = 0; i < userThs.length; i++) {
    (function (th) {
      th.addEventListener("click", function () {
        adminUsersHandleSort(th.getAttribute("data-sort"));
      });
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          adminUsersHandleSort(th.getAttribute("data-sort"));
        }
      });
    })(userThs[i]);
  }

  // Sort headers – Access
  var accessThs = document.querySelectorAll(".adminAccess-th");
  for (var j = 0; j < accessThs.length; j++) {
    (function (th) {
      th.addEventListener("click", function () {
        adminAccessHandleSort(th.getAttribute("data-sort"));
      });
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          adminAccessHandleSort(th.getAttribute("data-sort"));
        }
      });
    })(accessThs[j]);
  }

  // Toolbar Add buttons
  var btnAddUser = document.getElementById("btnAddUser");
  if (btnAddUser) btnAddUser.addEventListener("click", openAdminUserAddModal);

  var btnAddAccess = document.getElementById("btnAddAccess");
  if (btnAddAccess)
    btnAddAccess.addEventListener("click", openAdminAccessAddModal);

  // User modal button bindings
  var b;
  b = document.getElementById("btnSaveAdminUser");
  if (b) b.addEventListener("click", saveAdminUserModal);
  b = document.getElementById("btnCancelAdminUser");
  if (b) b.addEventListener("click", closeAdminUserModal);
  b = document.getElementById("btnCloseAdminUser");
  if (b) b.addEventListener("click", closeAdminUserModal);

  // Access modal button bindings
  b = document.getElementById("btnSaveAdminAccess");
  if (b) b.addEventListener("click", saveAdminAccessModal);
  b = document.getElementById("btnCancelAdminAccess");
  if (b) b.addEventListener("click", closeAdminAccessModal);
  b = document.getElementById("btnCloseAdminAccess");
  if (b) b.addEventListener("click", closeAdminAccessModal);

  // Escape key closes any open admin modal
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var modals = ["adminUserEditModal", "adminAccessEditModal"];
    for (var mi = 0; mi < modals.length; mi++) {
      var modal = document.getElementById(modals[mi]);
      if (modal && !modal.hidden) {
        modal.hidden = true;
        break;
      }
    }
  });
});
