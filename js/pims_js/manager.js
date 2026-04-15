"use strict";

/* =====================================================
   Manager Tab – Manager grid + Program / Resource Centre
   sub-grids
   PIMS Report Admin Maintenance
   ===================================================== */

// ── Sample data ──────────────────────────────────────
var MGR_MANAGERS = [
  {
    id: 1,
    name: "Abad, Jasen",
    mnumber: "m310291",
    email: "Jasen.Abad@apha.gov.uk",
    disabled: false,
  },
  {
    id: 2,
    name: "Albury, Malynda",
    mnumber: "m187624",
    email: "Malynda.Albury@apha.gov.uk",
    disabled: false,
  },
  {
    id: 3,
    name: "Allardyce, Annabell",
    mnumber: "m133562",
    email: "Annabell.Allardyce@apha.gov.uk",
    disabled: false,
  },
  {
    id: 5,
    name: "Arguile, Wolfy",
    mnumber: "m187318",
    email: "Wolfy.Arguile@apha.gov.uk",
    disabled: false,
  },
  {
    id: 6,
    name: "Ashelford, Waverly",
    mnumber: "m995507",
    email: "Waverly.Ashelford@apha.gov.uk",
    disabled: false,
  },
  {
    id: 7,
    name: "Axby, Roanna",
    mnumber: "m171890",
    email: "Roanna.Axby@apha.gov.uk",
    disabled: false,
  },
  {
    id: 8,
    name: "Barwack, Clari",
    mnumber: "m176222",
    email: "Clari.Barwack@apha.gov.uk",
    disabled: false,
  },
  {
    id: 9,
    name: "Barz, Consuela",
    mnumber: "m310248",
    email: "Matthaeus.Balloch@apha.dfd.uk",
    disabled: false,
  },
  {
    id: 10,
    name: "Batie, Oliver",
    mnumber: "M302186",
    email: "Oliver.Batie@apha.gov.uk",
    disabled: false,
  },
  {
    id: 11,
    name: "Bennett, Sarah",
    mnumber: "m224501",
    email: "Sarah.Bennett@apha.gov.uk",
    disabled: false,
  },
  {
    id: 12,
    name: "Brown, Thomas",
    mnumber: "m331289",
    email: "Thomas.Brown@apha.gov.uk",
    disabled: false,
  },
  {
    id: 13,
    name: "Clarke, Michelle",
    mnumber: "m445677",
    email: "Michelle.Clarke@apha.gov.uk",
    disabled: false,
  },
  {
    id: 14,
    name: "Cooper, David",
    mnumber: "m556234",
    email: "David.Cooper@apha.gov.uk",
    disabled: false,
  },
  {
    id: 15,
    name: "Dalton, Emma",
    mnumber: "m667891",
    email: "Emma.Dalton@apha.gov.uk",
    disabled: false,
  },
  {
    id: 16,
    name: "Evans, Robert",
    mnumber: "m778456",
    email: "Robert.Evans@apha.gov.uk",
    disabled: true,
  },
  {
    id: 17,
    name: "Fletcher, Laura",
    mnumber: "m889012",
    email: "Laura.Fletcher@apha.gov.uk",
    disabled: false,
  },
  {
    id: 18,
    name: "Graham, James",
    mnumber: "m990678",
    email: "James.Graham@apha.gov.uk",
    disabled: false,
  },
  {
    id: 19,
    name: "Harris, Catherine",
    mnumber: "m112345",
    email: "Catherine.Harris@apha.gov.uk",
    disabled: false,
  },
  {
    id: 20,
    name: "Jones, Michael",
    mnumber: "m223901",
    email: "Michael.Jones@apha.gov.uk",
    disabled: false,
  },
  {
    id: 21,
    name: "King, Patricia",
    mnumber: "m334567",
    email: "Patricia.King@apha.gov.uk",
    disabled: false,
  },
  {
    id: 22,
    name: "Lewis, Derek",
    mnumber: "m445123",
    email: "Derek.Lewis@apha.gov.uk",
    disabled: false,
  },
  {
    id: 23,
    name: "Mitchell, Sandra",
    mnumber: "m556789",
    email: "Sandra.Mitchell@apha.gov.uk",
    disabled: false,
  },
  {
    id: 24,
    name: "Nelson, Kevin",
    mnumber: "m667345",
    email: "Kevin.Nelson@apha.gov.uk",
    disabled: true,
  },
  {
    id: 25,
    name: "Owen, Victoria",
    mnumber: "m778901",
    email: "Victoria.Owen@apha.gov.uk",
    disabled: false,
  },
  {
    id: 26,
    name: "Parker, Brian",
    mnumber: "m889456",
    email: "Brian.Parker@apha.gov.uk",
    disabled: false,
  },
  {
    id: 27,
    name: "Quinn, Angela",
    mnumber: "m990012",
    email: "Angela.Quinn@apha.gov.uk",
    disabled: false,
  },
  {
    id: 28,
    name: "Roberts, Steven",
    mnumber: "m101678",
    email: "Steven.Roberts@apha.gov.uk",
    disabled: false,
  },
  {
    id: 29,
    name: "Simpson, Claire",
    mnumber: "m212234",
    email: "Claire.Simpson@apha.gov.uk",
    disabled: false,
  },
  {
    id: 30,
    name: "Taylor, Philip",
    mnumber: "m323890",
    email: "Philip.Taylor@apha.gov.uk",
    disabled: false,
  },
];

var MGR_NAME_OPTIONS = [
  "Abad, Jasen",
  "Addinall, Lorita",
  "Ahrens, Sibeal",
  "Albury, Malynda",
  "Aleveque, Jone",
  "Allardyce, Annabell",
  "Alpe, Findley",
  "Amphlett, Eadie",
  "Andrivot, Ranee",
  "Anfrey, Richy",
  "Antcliffe, Wald",
  "Antognelli, Lambert",
  "Antowski, Mandi",
  "Arguile, Wolfy",
  "Ashelford, Waverly",
  "Axby, Roanna",
  "Barwack, Clari",
];

var MGR_PROGRAM_OPTIONS = [
  "ACUMisc",
  "ACUTest",
  "admin",
  "AHVLA_PROG",
  "ASU",
  "ASUMisc",
  "B&M",
  "Bact",
  "BactMisc",
  "BactTest",
  "Bee Advice",
  "Bee Insp",
  "BPUMisc",
];

var MGR_RC_OPTIONS = [
  "ACU",
  "ADMIN",
  "APH SCAH",
  "ASU",
  "B&M",
  "Bact",
  "BDU",
  "Bees",
  "Bees Advice",
  "Bees England",
  "Bees Wales",
  "BPU",
  "BTB",
  "BTD",
  "BTU",
];

// Pre-assigned programs per manager id
var MGR_PROGRAMS = {
  1: [
    { id: 101, value: "Wildlife Health" },
    { id: 102, value: "Bovine TB" },
  ],
  2: [{ id: 201, value: "Avian Influenza" }],
  5: [
    { id: 501, value: "Foot & Mouth Disease" },
    { id: 502, value: "Salmonella Control" },
  ],
  8: [{ id: 801, value: "AMR Programme" }],
  11: [
    { id: 1101, value: "Surveillance Networks" },
    { id: 1102, value: "Plant Health" },
  ],
  15: [{ id: 1501, value: "Newcastle Disease" }],
  20: [{ id: 2001, value: "Bee Health" }],
};

// Pre-assigned resource centres per manager id
var MGR_RESOURCES = {
  1: [{ id: 101, value: "APHA Weybridge" }],
  2: [
    { id: 201, value: "APHA York" },
    { id: 202, value: "APHA Bury St Edmunds" },
  ],
  3: [{ id: 301, value: "APHA Worcester" }],
  6: [
    { id: 601, value: "APHA Newcastle" },
    { id: 602, value: "APHA Carlisle" },
  ],
  11: [{ id: 1101, value: "APHA Gloucester" }],
  18: [
    { id: 1801, value: "APHA Cambridge" },
    { id: 1802, value: "APHA Preston" },
  ],
  25: [{ id: 2501, value: "APHA Starcross" }],
};

var mgrNextSubId = 9000;

// ── State ────────────────────────────────────────────
var mgrState = {
  sortCol: null,
  sortDir: "asc",
  page: 1,
  pageSize: 10,
  searchTerm: "",
  filtered: [],
  selectedId: null,
};

// ── Helpers ──────────────────────────────────────────
function mgrEsc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mgrGetManager(id) {
  for (var i = 0; i < MGR_MANAGERS.length; i++) {
    if (MGR_MANAGERS[i].id === id) return MGR_MANAGERS[i];
  }
  return null;
}

// ── Init ─────────────────────────────────────────────
function initManagerTab() {
  mgrState.page = 1;
  mgrState.searchTerm = "";
  var inp = document.getElementById("mgrSearchInput");
  if (inp) inp.value = "";
  mgrBuildFiltered();
  // Auto-select first row
  if (mgrState.filtered.length > 0) {
    mgrState.selectedId = mgrState.filtered[0].id;
  } else {
    mgrState.selectedId = null;
  }
  mgrRenderTable();
  mgrRenderPagination();
  if (mgrState.selectedId !== null) {
    renderMgrProgramGrid(mgrState.selectedId);
    renderMgrResourceGrid(mgrState.selectedId);
    document.getElementById("mgrSubGrids").style.display = "block";
  } else {
    document.getElementById("mgrSubGrids").style.display = "none";
  }
}

// ── Filter + Sort ─────────────────────────────────────
function mgrBuildFiltered() {
  var term = mgrState.searchTerm.toLowerCase();
  var list = MGR_MANAGERS.filter(function (m) {
    if (!term) return true;
    return (
      m.name.toLowerCase().indexOf(term) !== -1 ||
      m.mnumber.toLowerCase().indexOf(term) !== -1 ||
      m.email.toLowerCase().indexOf(term) !== -1
    );
  });

  list.sort(function (a, b) {
    var av = a[mgrState.sortCol];
    var bv = b[mgrState.sortCol];
    if (typeof av === "boolean") {
      av = av ? 1 : 0;
      bv = bv ? 1 : 0;
    } else {
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
    }
    if (av < bv) return mgrState.sortDir === "asc" ? -1 : 1;
    if (av > bv) return mgrState.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  mgrState.filtered = list;
}

// ── Render table ─────────────────────────────────────
function mgrRenderTable() {
  var tbody = document.getElementById("mgrTableBody");
  if (!tbody) return;

  var start = (mgrState.page - 1) * mgrState.pageSize;
  var slice = mgrState.filtered.slice(start, start + mgrState.pageSize);

  if (slice.length === 0) {
    tbody.innerHTML =
      '<tr class="govuk-table__row"><td class="govuk-table__cell" colspan="5" ' +
      'style="text-align:center;color:#505a5f;">No records found</td></tr>';
    return;
  }

  var html = "";
  for (var i = 0; i < slice.length; i++) {
    var m = slice[i];
    var sel = m.id === mgrState.selectedId ? " mgr-row-selected" : "";
    html +=
      '<tr class="govuk-table__row' +
      sel +
      '" data-mgr-id="' +
      m.id +
      '">' +
      '<td class="govuk-table__cell tab-font-size">' +
      mgrEsc(m.name) +
      "</td>" +
      '<td class="govuk-table__cell tab-font-size">' +
      mgrEsc(m.mnumber) +
      "</td>" +
      '<td class="govuk-table__cell tab-font-size">' +
      mgrEsc(m.email) +
      "</td>" +
      '<td class="govuk-table__cell mgr-disable-cell tab-font-size">' +
      '<input type="checkbox" class="mgr-checkbox-display"' +
      (m.disabled ? " checked" : "") +
      ' disabled aria-label="Disabled" />' +
      "</td>" +
      '<td class="govuk-table__cell ra-col-actions tab-font-size" style="white-space:nowrap">' +
      '<button type="button" class="action-btn edit-btn ra-btn-action ra-btn-edit mgr-edit-btn" data-id="' +
      m.id +
      '" aria-label="Edit ' +
      mgrEsc(m.name) +
      '" style="border:none;background:#fff;">' +
      '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" class="editjobcode" width="20"></button> ' +
      '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete mgr-delete-btn" data-id="' +
      m.id +
      '" aria-label="Delete ' +
      mgrEsc(m.name) +
      '" style="border:none;background:#fff;">' +
      '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button> ' +
      '<button type="button" class="action-btn govuk-button ra-btn-add mgr-prog-add-btn" data-id="' +
      m.id +
      '" >+ Add Program</button> ' +
      '<button type="button" class="action-btn govuk-button ra-btn-add mgr-rc-add-btn" data-id="' +
      m.id +
      '" style=";">+ Add Resource</button>' +
      "</td>" +
      "</tr>";
  }
  tbody.innerHTML = html;
  mgrAttachRowEvents();
}

// ── Row events ────────────────────────────────────────
function mgrAttachRowEvents() {
  var tbody = document.getElementById("mgrTableBody");
  if (!tbody) return;

  // Row click → select
  tbody.querySelectorAll("tr[data-mgr-id]").forEach(function (row) {
    row.addEventListener("click", function (e) {
      // Ignore clicks on or inside action buttons
      if (e.target.closest(".action-btn")) return;
      var id = parseInt(row.getAttribute("data-mgr-id"), 10);
      mgrSelectRow(id);
    });
  });

  // Edit buttons
  tbody.querySelectorAll(".mgr-edit-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var id = parseInt(btn.getAttribute("data-id"), 10);
      openMgrEditModal(id);
    });
  });

  // Delete buttons
  tbody.querySelectorAll(".mgr-delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var id = parseInt(btn.getAttribute("data-id"), 10);
      mgrDeleteRecord(id);
    });
  });

  // Add Program buttons (per row)
  tbody.querySelectorAll(".mgr-prog-add-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var id = parseInt(btn.getAttribute("data-id"), 10);
      mgrSelectRow(id);
      openMgrAssignEditModal("program", id, null);
    });
  });

  // Add Resource Centre buttons (per row)
  tbody.querySelectorAll(".mgr-rc-add-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var id = parseInt(btn.getAttribute("data-id"), 10);
      mgrSelectRow(id);
      openMgrAssignEditModal("rc", id, null);
    });
  });
}

// ── Select row → show sub-grids ───────────────────────
function mgrSelectRow(id) {
  mgrState.selectedId = id;
  mgrRenderTable(); // re-render to update selected highlight
  renderMgrProgramGrid(id);
  renderMgrResourceGrid(id);
  document.getElementById("mgrSubGrids").style.display = "block";
}

// ── Sort ──────────────────────────────────────────────
function mgrSortBy(col) {
  if (mgrState.sortCol === col) {
    mgrState.sortDir = mgrState.sortDir === "asc" ? "desc" : "asc";
  } else {
    mgrState.sortCol = col;
    mgrState.sortDir = "asc";
  }
  mgrState.page = 1;
  mgrBuildFiltered();
  mgrRenderTable();
  mgrRenderPagination();
  mgrUpdateSortIcons();
}

function mgrUpdateSortIcons() {
  var cols = ["name", "mnumber", "email", "disabled"];
  // Reset all headers
  cols.forEach(function (col) {
    var th = document.querySelector(
      '.ra-th-sortable[data-mgr-col="' + col + '"]',
    );
    if (!th) return;
    th.classList.remove("ra-sort-asc", "ra-sort-desc");
    th.setAttribute("aria-sort", "none");
    var icon = th.querySelector(".ra-sort-icon");
    if (icon) icon.innerHTML = "";
  });
  // Mark active column
  var activeTh = document.querySelector(
    '.ra-th-sortable[data-mgr-col="' + mgrState.sortCol + '"]',
  );
  if (activeTh) {
    activeTh.classList.add(
      mgrState.sortDir === "asc" ? "ra-sort-asc" : "ra-sort-desc",
    );
    activeTh.setAttribute(
      "aria-sort",
      mgrState.sortDir === "asc" ? "ascending" : "descending",
    );
    var icon = activeTh.querySelector(".ra-sort-icon");
    if (icon)
      icon.innerHTML = mgrState.sortDir === "asc" ? "&#9650;" : "&#9660;";
  }
}

// ── Pagination ────────────────────────────────────────
function mgrRenderPagination() {
  var total = mgrState.filtered.length;
  var totalPages = Math.max(1, Math.ceil(total / mgrState.pageSize));
  var page = mgrState.page;
  var start = total === 0 ? 0 : (page - 1) * mgrState.pageSize + 1;
  var end = Math.min(page * mgrState.pageSize, total);

  var countEl = document.getElementById("mgrRecordCount");
  if (countEl)
    countEl.textContent =
      "Showing " + start + " to " + end + " of " + total + " records";

  var ul = document.getElementById("mgrPagination");
  if (!ul) return;
  ul.innerHTML = "";

  // Previous button
  var prevLi = document.createElement("li");
  prevLi.className = "govuk-pagination__item" + (page === 1 ? " disabled" : "");
  prevLi.setAttribute("aria-disabled", String(page === 1));
  var prevA = document.createElement("a");
  prevA.className = "govuk-link govuk-pagination__link";
  (function (p) {
    prevA.onclick = function () {
      mgrGoToPage(p - 1);
    };
  })(page);
  prevA.innerHTML =
    '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path></svg>' +
    '<span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>';
  prevLi.appendChild(prevA);
  ul.appendChild(prevLi);

  // Page number items
  for (var i = 1; i <= totalPages; i++) {
    var pageLi = document.createElement("li");
    pageLi.className =
      "govuk-pagination__item" +
      (i === page ? " govuk-pagination__item--current" : "");
    var pageA = document.createElement("a");
    pageA.className = "govuk-link govuk-pagination__link";
    (function (pg) {
      pageA.onclick = function () {
        mgrGoToPage(pg);
      };
    })(i);
    pageA.textContent = i;
    pageLi.appendChild(pageA);
    ul.appendChild(pageLi);
  }

  // Next button
  var nextLi = document.createElement("li");
  nextLi.className =
    "govuk-pagination__item govuk-pagination__next" +
    (page >= totalPages ? " disabled" : "");
  nextLi.setAttribute("aria-disabled", String(page >= totalPages));
  var nextA = document.createElement("a");
  nextA.className = "govuk-link govuk-pagination__link";
  (function (p) {
    nextA.onclick = function () {
      mgrGoToPage(p + 1);
    };
  })(page);
  nextA.setAttribute("rel", "next");
  nextA.innerHTML =
    '<span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>' +
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path></svg>';
  nextLi.appendChild(nextA);
  ul.appendChild(nextLi);
}

function mgrGoToPage(n) {
  var pages = Math.max(
    1,
    Math.ceil(mgrState.filtered.length / mgrState.pageSize),
  );
  mgrState.page = Math.max(1, Math.min(n, pages));
  mgrRenderTable();
  mgrRenderPagination();
}

// ── Program sub-grid ──────────────────────────────────
function renderMgrProgramGrid(managerId) {
  var tbody = document.getElementById("mgrProgramTableBody");
  if (!tbody) return;

  var rows = MGR_PROGRAMS[managerId] || [];

  if (rows.length === 0) {
    tbody.innerHTML =
      '<tr class="govuk-table__row"><td class="govuk-table__cell tab-font-size" colspan="2" ' +
      'style="color:#505a5f;font-style:italic;">No programs assigned</td></tr>';
    return;
  }

  var html = "";
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    html +=
      '<tr class="govuk-table__row " data-prog-id="' +
      r.id +
      '" data-mgr-id="' +
      managerId +
      '">' +
      '<td class="govuk-table__cell tab-font-size">' +
      mgrEsc(r.value) +
      "</td>" +
      '<td class="govuk-table__cell ra-col-actions tab-font-size" style="white-space:nowrap">' +
      '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete mgr-prog-delete-btn" data-id="' +
      r.id +
      '" data-mgr="' +
      managerId +
      '" aria-label="Delete program" style="border:none;background:#fff;">' +
      '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button>' +
      "</td>" +
      "</tr>";
  }
  tbody.innerHTML = html;
  mgrAttachProgEvents();
}

function mgrAttachProgEvents() {
  var tbody = document.getElementById("mgrProgramTableBody");
  if (!tbody) return;
  tbody.querySelectorAll(".mgr-prog-delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"), 10);
      var mid = parseInt(btn.getAttribute("data-mgr"), 10);
      mgrAssignDeleteRecord("program", mid, id);
    });
  });
}

// ── Resource Centre sub-grid ──────────────────────────
function renderMgrResourceGrid(managerId) {
  var tbody = document.getElementById("mgrResourceTableBody");
  if (!tbody) return;

  var rows = MGR_RESOURCES[managerId] || [];

  if (rows.length === 0) {
    tbody.innerHTML =
      '<tr class="govuk-table__row"><td class="govuk-table__cell" colspan="2" ' +
      'style="color:#505a5f;font-style:italic;">No resource centres assigned</td></tr>';
    return;
  }

  var html = "";
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    html +=
      '<tr class="govuk-table__row" data-rc-id="' +
      r.id +
      '" data-mgr-id="' +
      managerId +
      '">' +
      '<td class="govuk-table__cell tab-font-size">' +
      mgrEsc(r.value) +
      "</td>" +
      '<td class="govuk-table__cell ra-col-actions tab-font-size" style="white-space:nowrap">' +
      '<button type="button" class="action-btn delete-btn ra-btn-action ra-btn-delete mgr-rc-delete-btn" data-id="' +
      r.id +
      '" data-mgr="' +
      managerId +
      '" aria-label="Delete resource centre" style="border:none;background:#fff;">' +
      '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20"></button>' +
      "</td>" +
      "</tr>";
  }
  tbody.innerHTML = html;
  mgrAttachRcEvents();
}

function mgrAttachRcEvents() {
  var tbody = document.getElementById("mgrResourceTableBody");
  if (!tbody) return;
  tbody.querySelectorAll(".mgr-rc-delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = parseInt(btn.getAttribute("data-id"), 10);
      var mid = parseInt(btn.getAttribute("data-mgr"), 10);
      mgrAssignDeleteRecord("rc", mid, id);
    });
  });
}

// ═══════════════════════════════════════════════════════
// ── Manager Edit / Add Modal ──────────────────────────
// ═══════════════════════════════════════════════════════
function openMgrEditModal(id) {
  var m = mgrGetManager(id);
  var isAdd = !m;
  var modal = document.getElementById("mgrManagerEditModal");
  var titleEl = document.getElementById("mgrManagerEditModalTitle");
  if (titleEl) titleEl.textContent = isAdd ? "Add Manager" : "Edit Manager";

  document.getElementById("mgrEditId").value = isAdd ? "" : m.id;

  // Populate name dropdown
  var nameSel = document.getElementById("mgrEditName");
  var currentName = isAdd ? "" : m.name;
  var nameOptHtml = '<option value="">-- Select Manager --</option>';
  MGR_NAME_OPTIONS.forEach(function (opt) {
    nameOptHtml +=
      '<option value="' +
      mgrEsc(opt) +
      '"' +
      (opt === currentName ? " selected" : "") +
      ">" +
      mgrEsc(opt) +
      "</option>";
  });
  nameSel.innerHTML = nameOptHtml;

  document.getElementById("mgrEditMNumber").value = isAdd ? "" : m.mnumber;
  document.getElementById("mgrEditEmail").value = isAdd ? "" : m.email;
  document.getElementById("mgrEditDisabled").checked = isAdd
    ? false
    : m.disabled;

  mgrClearFieldError("mgrEditNameGroup", "mgrEditNameError", "mgrEditName");
  mgrClearFieldError(
    "mgrEditMNumberGroup",
    "mgrEditMNumberError",
    "mgrEditMNumber",
  );
  mgrClearFieldError("mgrEditEmailGroup", "mgrEditEmailError", "mgrEditEmail");
  mgrHideMgrDbError();

  modal.hidden = false;
  document.getElementById("mgrEditName").focus();
}

function openMgrAddModal() {
  openMgrEditModal(null);
}

function closeMgrEditModal() {
  document.getElementById("mgrManagerEditModal").hidden = true;
}

function saveMgrEditModal() {
  var id = document.getElementById("mgrEditId").value;
  var name = document.getElementById("mgrEditName").value;
  var mnumber = document.getElementById("mgrEditMNumber").value.trim();
  var email = document.getElementById("mgrEditEmail").value.trim();
  var disabled = document.getElementById("mgrEditDisabled").checked;

  var valid = true;

  mgrClearFieldError("mgrEditNameGroup", "mgrEditNameError", "mgrEditName");
  mgrClearFieldError(
    "mgrEditMNumberGroup",
    "mgrEditMNumberError",
    "mgrEditMNumber",
  );
  mgrClearFieldError("mgrEditEmailGroup", "mgrEditEmailError", "mgrEditEmail");

  if (!name) {
    mgrSetFieldError(
      "mgrEditNameGroup",
      "mgrEditNameError",
      "mgrEditName",
      "Select a manager name",
    );
    valid = false;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mgrSetFieldError(
      "mgrEditEmailGroup",
      "mgrEditEmailError",
      "mgrEditEmail",
      "Enter a valid email address",
    );
    if (valid) {
      document.getElementById("mgrEditEmail").focus();
    }
    valid = false;
  }

  if (!valid) {
    if (!name) document.getElementById("mgrEditName").focus();
    return;
  }

  if (id) {
    // Edit existing
    var rec = mgrGetManager(parseInt(id, 10));
    if (rec) {
      rec.name = name;
      rec.mnumber = mnumber;
      rec.email = email;
      rec.disabled = disabled;
    }
  } else {
    // Add new
    var maxId = 0;
    MGR_MANAGERS.forEach(function (m) {
      if (m.id > maxId) maxId = m.id;
    });
    MGR_MANAGERS.unshift({
      id: maxId + 1,
      name: name,
      mnumber: mnumber,
      email: email,
      disabled: disabled,
    });
  }

  closeMgrEditModal();
  mgrBuildFiltered();
  mgrRenderTable();
  mgrRenderPagination();
}

// ── Manager Delete Modal ──────────────────────────────
function mgrDeleteRecord(id) {
  var m = mgrGetManager(id);
  if (!m) return;
  showGovukConfirm("Are you sure you want to delete this record?").then((result) => {
    if (!result) return;
    for (var i = 0; i < MGR_MANAGERS.length; i++) {
      if (MGR_MANAGERS[i].id === id) {
        MGR_MANAGERS.splice(i, 1);
        break;
      }
    }
    // Remove sub-data
    delete MGR_PROGRAMS[id];
    delete MGR_RESOURCES[id];

    if (mgrState.selectedId === id) {
      mgrState.selectedId = null;
      document.getElementById("mgrSubGrids").style.display = "none";
    }

    mgrBuildFiltered();

    var pages = Math.max(
      1,
      Math.ceil(mgrState.filtered.length / mgrState.pageSize),
    );
    if (mgrState.page > pages) mgrState.page = pages;
    mgrRenderTable();
    mgrRenderPagination();
  });
}

// ═══════════════════════════════════════════════════════
// ── Assignment (Program / RC) Edit Modal ──────────────
// ═══════════════════════════════════════════════════════
var mgrAssignContext = { type: null, managerId: null, assignId: null };

function openMgrAssignEditModal(type, managerId, assignId) {
  mgrAssignContext = { type: type, managerId: managerId, assignId: assignId };

  var isAdd = !assignId;
  var isProgram = type === "program";
  var options = isProgram ? MGR_PROGRAM_OPTIONS : MGR_RC_OPTIONS;
  var dataset = isProgram
    ? MGR_PROGRAMS[managerId] || []
    : MGR_RESOURCES[managerId] || [];

  var label = isProgram ? "Program" : "Resource Centre";
  var title = isAdd ? "Add " + label : "Edit " + label;

  document.getElementById("mgrAssignEditModalTitle").textContent = title;
  document.getElementById("mgrAssignLabel").textContent = label + ":";

  // Build select options
  var sel = document.getElementById("mgrAssignValue");
  var currentVal = "";
  if (!isAdd) {
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].id === assignId) {
        currentVal = dataset[i].value;
        break;
      }
    }
  }

  var optHtml = '<option value="">-- Select ' + label + " --</option>";
  options.forEach(function (opt) {
    optHtml +=
      '<option value="' +
      mgrEsc(opt) +
      '"' +
      (opt === currentVal ? " selected" : "") +
      ">" +
      mgrEsc(opt) +
      "</option>";
  });
  sel.innerHTML = optHtml;

  mgrClearFieldError(
    "mgrAssignValueGroup",
    "mgrAssignValueError",
    "mgrAssignValue",
  );
  mgrHideAssignDbError();

  document.getElementById("mgrAssignEditModal").hidden = false;
  sel.focus();
}

function openMgrAssignAddModal(type) {
  openMgrAssignEditModal(type, mgrState.selectedId, null);
}

function closeMgrAssignEditModal() {
  document.getElementById("mgrAssignEditModal").hidden = true;
}

function saveMgrAssignModal() {
  var val = document.getElementById("mgrAssignValue").value;
  var ctx = mgrAssignContext;

  mgrClearFieldError(
    "mgrAssignValueGroup",
    "mgrAssignValueError",
    "mgrAssignValue",
  );

  if (!val) {
    mgrSetFieldError(
      "mgrAssignValueGroup",
      "mgrAssignValueError",
      "mgrAssignValue",
      "Please select a value",
    );
    document.getElementById("mgrAssignValue").focus();
    return;
  }

  var isProgram = ctx.type === "program";
  var bucket = isProgram ? MGR_PROGRAMS : MGR_RESOURCES;

  if (!bucket[ctx.managerId]) bucket[ctx.managerId] = [];
  var rows = bucket[ctx.managerId];

  if (!ctx.assignId) {
    // Add
    mgrNextSubId++;
    rows.unshift({ id: mgrNextSubId, value: val });
  } else {
    // Edit
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === ctx.assignId) {
        rows[i].value = val;
        break;
      }
    }
  }

  closeMgrAssignEditModal();
  if (isProgram) {
    renderMgrProgramGrid(ctx.managerId);
  } else {
    renderMgrResourceGrid(ctx.managerId);
  }
}

// ── Assignment Delete Modal ───────────────────────────
var mgrAssignDelContext = { type: null, managerId: null, assignId: null };

function mgrAssignDeleteRecord(type, managerId, assignId) {
  var isProgram = type === "program";
  var bucket = isProgram ? MGR_PROGRAMS : MGR_RESOURCES;
  var rows = bucket[managerId] || [];
  var label = "";
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].id === assignId) {
      label = rows[i].value;
      break;
    }
  }
  showGovukConfirm("Are you sure you want to delete this record?").then((result) => {
    if (!result) return;
    for (var j = 0; j < rows.length; j++) {
      if (rows[j].id === assignId) {
        rows.splice(j, 1);
        break;
      }
    }
    if (isProgram) {
      renderMgrProgramGrid(managerId);
    } else {
      renderMgrResourceGrid(managerId);
    }
  });
}

// ═══════════════════════════════════════════════════════
// ── Validation helpers ────────────────────────────────
// ═══════════════════════════════════════════════════════
function mgrSetFieldError(groupId, errorId, inputId, message) {
  var g = document.getElementById(groupId);
  var e = document.getElementById(errorId);
  var i = document.getElementById(inputId);
  if (g) g.classList.add("govuk-form-group--error");
  if (e) {
    e.style.display = "block";
    e.querySelector("span:last-child").textContent = message;
  }
  if (i) {
    var errClass =
      i.tagName === "SELECT" ? "govuk-select--error" : "govuk-input--error";
    i.classList.add(errClass);
  }
}

function mgrClearFieldError(groupId, errorId, inputId) {
  var g = document.getElementById(groupId);
  var e = document.getElementById(errorId);
  var i = document.getElementById(inputId);
  if (g) g.classList.remove("govuk-form-group--error");
  if (e) e.style.display = "none";
  if (i) {
    i.classList.remove("govuk-input--error");
    i.classList.remove("govuk-select--error");
  }
}

function mgrHideMgrDbError() {
  var el = document.getElementById("mgrEditDbError");
  if (el) el.style.display = "none";
}

function mgrHideAssignDbError() {
  var el = document.getElementById("mgrAssignDbError");
  if (el) el.style.display = "none";
}

// ═══════════════════════════════════════════════════════
// ── DOMContentLoaded wiring ───────────────────────────
// ═══════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", function () {
  // Sort headers
  document
    .querySelectorAll(".ra-th-sortable[data-mgr-col]")
    .forEach(function (th) {
      th.addEventListener("click", function () {
        mgrSortBy(th.getAttribute("data-mgr-col"));
      });
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          mgrSortBy(th.getAttribute("data-mgr-col"));
        }
      });
    });

  // Pagination – records per page
  var rppSel = document.getElementById("mgrRecordsPerPage");
  if (rppSel) {
    rppSel.addEventListener("change", function () {
      mgrState.pageSize = parseInt(rppSel.value, 10);
      mgrState.page = 1;
      mgrBuildFiltered();
      mgrRenderTable();
      mgrRenderPagination();
    });
  }

  // Search
  var searchInp = document.getElementById("mgrSearchInput");
  if (searchInp) {
    searchInp.addEventListener("input", function () {
      mgrState.searchTerm = searchInp.value.trim();
      mgrState.page = 1;
      mgrBuildFiltered();
      mgrRenderTable();
      mgrRenderPagination();
    });
  }

  // Add Manager button
  var btnAddMgr = document.getElementById("btnAddManager");
  if (btnAddMgr) btnAddMgr.addEventListener("click", openMgrAddModal);

  // Manager Edit modal buttons
  var btnCloseMgrEdit = document.getElementById("btnCloseMgrEdit");
  var btnCancelMgrEdit = document.getElementById("btnCancelMgrEdit");
  var btnSaveMgrEdit = document.getElementById("btnSaveMgrEdit");
  if (btnCloseMgrEdit)
    btnCloseMgrEdit.addEventListener("click", closeMgrEditModal);
  if (btnCancelMgrEdit)
    btnCancelMgrEdit.addEventListener("click", closeMgrEditModal);
  if (btnSaveMgrEdit)
    btnSaveMgrEdit.addEventListener("click", saveMgrEditModal);

  // Sub-grid Add buttons
  var btnAddProg = document.getElementById("btnAddMgrProgram");
  var btnAddRc = document.getElementById("btnAddMgrResource");
  if (btnAddProg)
    btnAddProg.addEventListener("click", function () {
      openMgrAssignAddModal("program");
    });
  if (btnAddRc)
    btnAddRc.addEventListener("click", function () {
      openMgrAssignAddModal("rc");
    });

  // Assignment Edit modal buttons
  var btnCloseMgrAssign = document.getElementById("btnCloseMgrAssign");
  var btnCancelMgrAssign = document.getElementById("btnCancelMgrAssign");
  var btnSaveMgrAssign = document.getElementById("btnSaveMgrAssign");
  if (btnCloseMgrAssign)
    btnCloseMgrAssign.addEventListener("click", closeMgrAssignEditModal);
  if (btnCancelMgrAssign)
    btnCancelMgrAssign.addEventListener("click", closeMgrAssignEditModal);
  if (btnSaveMgrAssign)
    btnSaveMgrAssign.addEventListener("click", saveMgrAssignModal);

  // Backdrop click and Escape key to close modals
  ["mgrManagerEditModal", "mgrAssignEditModal"].forEach(function (mid) {
    var modal = document.getElementById(mid);
    if (!modal) return;
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    ["mgrManagerEditModal", "mgrAssignEditModal"].forEach(function (mid) {
      var modal = document.getElementById(mid);
      if (modal && !modal.hidden) modal.hidden = true;
    });
  });

  // Re-init when Manager tab is clicked
  var tabLink = document.getElementById("tab-manager-link");
  if (tabLink) {
    tabLink.addEventListener("click", function () {
      setTimeout(initManagerTab, 50);
    });
  }

  // Initial render
  initManagerTab();
  mgrUpdateSortIcons();
});
