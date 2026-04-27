/**
 * table_utils.js
 * Shared column-sort and column-resize utilities for PIMS data grids.
 *
 * Sort API
 * ─────────
 *   tuInitSort(tbodyId)
 *     Wire click-to-sort on every th[data-column] in the table that owns
 *     the given <tbody>. Re-orders visible DOM rows on each click so it
 *     works regardless of which JS module populated the data.
 *
 * Resize API
 * ──────────
 *   tuInitResize(tableId)
 *     Add drag-to-resize handle to every <th> in the table identified by id.
 *
 *   tuInitResizeByTbody(tbodyId)
 *     Same but locates the table via its <tbody> id (use when the <table>
 *     has no id or a duplicate id).
 */

// ── SORT ──────────────────────────────────────────────────────────────────────
var _tuSortStates = {};

/**
 * @param {string} tbodyId
 */
function tuInitSort(tbodyId) {
  var tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  var table = tbody.closest("table");
  if (!table) return;
  var headers = Array.from(table.querySelectorAll("th[data-column]"));
  if (!headers.length) return;

  headers.forEach(function (th) {
    th.style.cursor = "pointer";
    th.style.userSelect = "none";
    th.addEventListener("click", function () {
      var colIdx = parseInt(this.dataset.column, 10);
      var prev = (_tuSortStates[tbodyId] || {})[colIdx];
      var order = prev === "asc" ? "desc" : "asc";
      _tuSortStates[tbodyId] = {};
      _tuSortStates[tbodyId][colIdx] = order;

      // Reset all sort indicators for this table
      headers.forEach(function (h) {
        h.classList.remove("sorted-asc", "sorted-desc");
        var icon = h.querySelector(".sort-icon");
        if (icon) icon.innerHTML = "";
      });

      // Mark active header
      this.classList.add(order === "asc" ? "sorted-asc" : "sorted-desc");
      var icon = this.querySelector(".sort-icon");
      if (icon) icon.innerHTML = order === "asc" ? " ▲" : " ▼";

      // Sort visible tbody rows
      var rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort(function (a, b) {
        var ac = a.cells[colIdx];
        var bc = b.cells[colIdx];
        if (!ac || !bc) return 0;
        var at = ac.textContent.trim();
        var bt = bc.textContent.trim();
        var an = parseFloat(at.replace(/[^0-9.-]/g, ""));
        var bn = parseFloat(bt.replace(/[^0-9.-]/g, ""));
        if (!isNaN(an) && !isNaN(bn)) {
          return order === "asc" ? an - bn : bn - an;
        }
        return order === "asc"
          ? at.localeCompare(bt, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          : bt.localeCompare(at, undefined, {
              numeric: true,
              sensitivity: "base",
            });
      });
      rows.forEach(function (r) {
        tbody.appendChild(r);
      });
    });
  });
}

// ── RESIZE ────────────────────────────────────────────────────────────────────

/**
 * @param {string} tableId
 */
function tuInitResize(tableId) {
  var table = document.getElementById(tableId);
  if (!table) return;
  _tuSetupResize(table);
}

/**
 * @param {string} tbodyId
 */
function tuInitResizeByTbody(tbodyId) {
  var tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  var table = tbody.closest("table");
  if (!table) return;
  _tuSetupResize(table);
}

function _tuSetupResize(table) {
  if (table.dataset.tuResizeInit) return; // prevent double-init
  table.dataset.tuResizeInit = "1";
  // NOTE: do NOT set tableLayout="fixed" here — hidden tables have no
  // measured widths yet, so fixed layout would equalize all columns.
  // It is set inside ensurePxWidths() once real pixel widths are known.

  // Collect matching <col> elements (if colgroup exists)
  var cols = Array.from(table.querySelectorAll("colgroup col"));

  var ths = Array.from(table.querySelectorAll("thead th"));

  // Convert % colgroup widths to px so they can be adjusted precisely
  function ensurePxWidths() {
    if (table.dataset.tuResizePxInit) return;
    ths.forEach(function (th, i) {
      var w = th.getBoundingClientRect().width;
      if (w > 0) {
        th.style.width = w + "px";
        if (cols[i]) cols[i].style.width = w + "px";
      }
    });
    // Keep table at its current rendered width (do NOT set to "auto")
    var tableW = table.getBoundingClientRect().width;
    if (tableW > 0) table.style.width = tableW + "px";
    // Now safe to lock layout — all columns have explicit px widths
    table.style.tableLayout = "fixed";
    table.dataset.tuResizePxInit = "1";
  }

  // Run eagerly if table is already visible (e.g. default active tab)
  if (table.getBoundingClientRect().width > 0) ensurePxWidths();

  // Pre-init on first hover so hidden-tab tables lock to px widths before
  // the user drags (prevents a layout jump on the very first drag)
  table.addEventListener(
    "mouseenter",
    function () {
      if (!table.dataset.tuResizePxInit) ensurePxWidths();
    },
    { once: true },
  );

  ths.forEach(function (th, i) {
    th.classList.add("col-resizable");

    // Skip the last column — no resize handle on the right edge of the grid
    if (i === ths.length - 1) return;

    // Skip Actions columns (they contain buttons and must not shrink/grow)
    var thClass = (th.className || "").toLowerCase();
    var thText = (th.textContent || "").trim().toLowerCase();
    if (thClass.indexOf("actions") !== -1 || thText === "actions") return;

    // Mark this th as having a resize handle so it can be used as a compensation target
    th.dataset.tuResizable = "1";

    var handle = document.createElement("div");
    handle.className = "col-resizer";
    handle.setAttribute("aria-hidden", "true");
    th.appendChild(handle);

    var startX, startWidth, nextTh, nextStartWidth;

    handle.addEventListener("mousedown", function (e) {
      // Lazy init for hidden-tab tables
      ensurePxWidths();

      startX = e.clientX;
      startWidth = th.getBoundingClientRect().width;

      // Find the next resizable sibling th to compensate (skip Actions columns)
      nextTh = null;
      nextStartWidth = 0;
      for (var j = i + 1; j < ths.length; j++) {
        var nClass = (ths[j].className || "").toLowerCase();
        var nText = (ths[j].textContent || "").trim().toLowerCase();
        var isActions = nClass.indexOf("actions") !== -1 || nText === "actions";
        var isVisible =
          ths[j].offsetParent !== null ||
          ths[j].getBoundingClientRect().width > 0;
        if (isVisible && !isActions) {
          nextTh = ths[j];
          nextStartWidth = ths[j].getBoundingClientRect().width;
          break;
        }
      }

      handle.classList.add("resizing");
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      e.preventDefault();
      e.stopPropagation(); // don't fire sort click
    });

    // A bare click on the handle must not bubble to the th's sort handler
    handle.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    function onMove(e) {
      var delta = e.clientX - startX;
      var newW = Math.max(40, startWidth + delta);
      var actualDelta = newW - startWidth;

      th.style.width = newW + "px";
      th.style.minWidth = newW + "px";
      if (cols[i]) cols[i].style.width = newW + "px";

      // Shrink/grow the next column by the same amount to keep total width stable
      if (nextTh) {
        var nextW = Math.max(40, nextStartWidth - actualDelta);
        nextTh.style.width = nextW + "px";
        nextTh.style.minWidth = nextW + "px";
        var nextIdx = ths.indexOf(nextTh);
        if (cols[nextIdx]) cols[nextIdx].style.width = nextW + "px";
      }
    }

    function onUp() {
      handle.classList.remove("resizing");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  if (typeof initializeTable === "function") {
    initializeTable();
  }
});

function renderEmptyRow(tbodyId, colSpan, message) {
  var tbody = document.getElementById(tbodyId);
  if (!tbody) {
    return;
  }

  tbody.innerHTML = "";
  var row = document.createElement("tr");
  row.className = "govuk-table__row";
  row.innerHTML =
    '<td class="govuk-table__cell" colspan="' +
    colSpan +
    '">' +
    message +
    "</td>";
  tbody.appendChild(row);
}

function goToPage(page, totalPages, onNavigate) {
  if (page < 1 || page > totalPages) {
    return;
  }

  if (typeof onNavigate === "function") {
    onNavigate(page);
  }
}

function renderPagination(
  records,
  currentPage,
  perPage,
  paginationListId,
  onPageClick,
) {
  var paginationList = document.getElementById(paginationListId);
  if (!paginationList) {
    return;
  }

  var totalRecords = records.length;
  var totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  var prevDisabled = currentPage <= 1;
  var nextDisabled = currentPage >= totalPages;

  var html = "";

  html +=
    '<li class="govuk-pagination__prev ' +
    (prevDisabled ? "govuk-pagination__item--disabled" : "") +
    '">';
  html +=
    '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' +
    (currentPage - 1) +
    ", " +
    totalPages +
    ", window." +
    onPageClick.name +
    ');" aria-label="Previous page">';
  html +=
    '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
  html +=
    '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>';
  html += "</svg>";
  html += '<span class="govuk-pagination__link-title">Previous</span>';
  html += "</a></li>";

  for (var i = 1; i <= totalPages; i++) {
    html +=
      '<li class="govuk-pagination__item ' +
      (i === currentPage ? "govuk-pagination__item--current" : "") +
      '">';
    html +=
      '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' +
      i +
      ", " +
      totalPages +
      ", window." +
      onPageClick.name +
      ');" aria-label="Page ' +
      i +
      '">' +
      i +
      "</a>";
    html += "</li>";
  }

  html +=
    '<li class="govuk-pagination__next ' +
    (nextDisabled ? "govuk-pagination__item--disabled" : "") +
    '">';
  html +=
    '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' +
    (currentPage + 1) +
    ", " +
    totalPages +
    ", window." +
    onPageClick.name +
    ');" aria-label="Next page">';
  html += '<span class="govuk-pagination__link-title">Next</span>';
  html +=
    '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
  html +=
    '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>';
  html += "</svg>";
  html += "</a></li>";

  paginationList.innerHTML = html;
}

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }
  modal.classList.add("show");
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }
  modal.classList.remove("show");
}

function showTab(targetId) {
  document.querySelectorAll(".govuk-tabs__panel").forEach(function (panel) {
    panel.classList.add("govuk-tabs__panel--hidden");
    panel.hidden = true;
  });
  document.querySelectorAll(".govuk-tabs__tab").forEach(function (link) {
    link.setAttribute("aria-selected", "false");
    link.setAttribute("tabindex", "-1");
  });
  var activePanel = document.getElementById(targetId);
  if (activePanel) {
    activePanel.classList.remove("govuk-tabs__panel--hidden");
    activePanel.hidden = false;
  }
  var activeLink = document.querySelector('[aria-controls="' + targetId + '"]');
  if (activeLink) {
    activeLink.setAttribute("aria-selected", "true");
    activeLink.setAttribute("tabindex", "0");
    activeLink.focus();
  }
}

function getPerPage(selectId) {
  var el = document.getElementById(selectId || "recordsPerPage");
  return (el && parseInt(el.value, 10)) || 5;
}
