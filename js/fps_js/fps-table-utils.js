/**
 * fps-table-utils.js
 * ──────────────────────────────────────────────────────────────────────────
 * Reusable column sort (ascending / descending) and column resize for ALL
 * FPS table grids.
 *
 * Matches behaviour and UI of PACT reference:
 *   docs/pact/project_management_five.opttwo.html  (Project's Job Code grid)
 *
 * Sort icon classes  : .sort-icon  (same as PACT custom_style.css)
 * Resize handle class: .resizer    (same as PACT custom_style.css)
 * Sort state classes : .sorted-asc / .sorted-desc
 *
 * Auto-initialises on DOMContentLoaded for every
 *   table.govuk-table, table.custom-table, table.table
 *
 * Manual init for JS-rendered tables:
 *   window.initFpsTable(tableElement);
 *
 * Accessibility:
 *   • aria-sort="none|ascending|descending" kept in sync on <th>
 *   • Keyboard: Enter / Space triggers sort on focused header
 *   • tabindex="0" added to sortable headers
 */
(function () {
    'use strict';

    var MIN_COL_WIDTH = 40;
    var MAX_COL_WIDTH = 600;

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Initialise sort and/or resize on a table.
     * @param {HTMLTableElement} table
     * @param {Object}  [opts]
     * @param {boolean} [opts.sort=true]
     * @param {boolean} [opts.resize=true]
     */
    function initFpsTable(table, opts) {
        if (!(table instanceof HTMLElement)) return;
        if (table.dataset.fpsTableInit) return; // idempotent
        table.dataset.fpsTableInit = '1';

        var options = Object.assign({ sort: true, resize: true }, opts);
        if (options.sort)   enableSort(table);
        if (options.resize) enableResize(table);
    }

    // ── Sorting ───────────────────────────────────────────────────────────────

    function enableSort(table) {
        var thead = table.querySelector('thead');
        var tbody = table.querySelector('tbody');
        if (!thead || !tbody) return;

        var ths = Array.from(thead.querySelectorAll('th'));

        ths.forEach(function (th, colIdx) {
            // Skip Action/Actions columns — not sortable
            var label = th.textContent.trim().toLowerCase().replace(/\s+/g, '');
            if (label === 'actions' || label === 'action') return;

            th.classList.add('fps-th-sortable');
            th.setAttribute('tabindex', '0');
            th.setAttribute('aria-sort', 'none');

            function handleSort() {
                var currentOrder = th.dataset.sortOrder || 'none';
                var newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

                // Clear all other headers
                ths.forEach(function (h) {
                    if (h === th) return;
                    h.dataset.sortOrder = 'none';
                    h.setAttribute('aria-sort', 'none');
                    h.classList.remove('sorted-asc', 'sorted-desc');
                    var icon = h.querySelector('.sort-icon');
                    if (icon) icon.remove();
                });

                // Update clicked header
                th.dataset.sortOrder = newOrder;
                th.setAttribute('aria-sort', newOrder === 'asc' ? 'ascending' : 'descending');
                th.classList.toggle('sorted-asc',  newOrder === 'asc');
                th.classList.toggle('sorted-desc', newOrder === 'desc');

                // Ensure no sort indicator remains on the active header.
                var activeIcon = th.querySelector('.sort-icon');
                if (activeIcon) activeIcon.remove();

                sortTableByColumn(tbody, colIdx, newOrder);
            }

            th.addEventListener('click', handleSort);
            th.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSort();
                }
            });
        });
    }

    function sortTableByColumn(tbody, colIdx, order) {
        var rows = Array.from(tbody.querySelectorAll('tr'));
        if (rows.length === 0) return;

        rows.sort(function (rowA, rowB) {
            var cellA = rowA.cells[colIdx];
            var cellB = rowB.cells[colIdx];
            if (!cellA || !cellB) return 0;

            // Prefer input value over cell text (editable cells)
            var inputA = cellA.querySelector('input:not([type=checkbox]):not([type=button])');
            var inputB = cellB.querySelector('input:not([type=checkbox]):not([type=button])');
            var valA = (inputA ? inputA.value : cellA.textContent).trim();
            var valB = (inputB ? inputB.value : cellB.textContent).trim();

            // Numeric comparison (strip currency symbols)
            var numA = parseFloat(valA.replace(/[£$,]/g, ''));
            var numB = parseFloat(valB.replace(/[£$,]/g, ''));
            if (!isNaN(numA) && !isNaN(numB)) {
                return order === 'asc' ? numA - numB : numB - numA;
            }

            return order === 'asc'
                ? valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' })
                : valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
        });

        rows.forEach(function (row) { tbody.appendChild(row); });
    }

    // ── Column Resize ─────────────────────────────────────────────────────────

    function enableResize(table) {
        var thead = table.querySelector('thead');
        if (!thead) return;

        // fixed layout so explicit widths are respected
        table.style.tableLayout = 'fixed';

        var ths = Array.from(thead.querySelectorAll('th'));

        ths.forEach(function (th, i) {
            // Skip last column (Actions)
            if (i === ths.length - 1) return;

            th.classList.add('fps-th-resizable');
            th.style.position = 'relative';

            // Avoid double-adding a resizer
            if (th.querySelector('.resizer')) return;

            var resizer = document.createElement('div');
            resizer.className = 'resizer';
            resizer.innerHTML = '&nbsp;';
            th.appendChild(resizer);

            resizer.addEventListener('mousedown', function (e) {
                e.stopPropagation(); // prevent sort click firing
                var startX     = e.pageX;
                var startWidth = th.offsetWidth;

                resizer.classList.add('resizing');

                function onMouseMove(e) {
                    var newWidth = Math.min(MAX_COL_WIDTH,
                                   Math.max(MIN_COL_WIDTH,
                                            startWidth + (e.pageX - startX)));
                    th.style.width = newWidth + 'px';
                }

                function onMouseUp() {
                    resizer.classList.remove('resizing');
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });
    }

    // ── Auto-init ─────────────────────────────────────────────────────────────

    function autoInit() {
        document.querySelectorAll(
            'table.govuk-table, table.custom-table, table.table'
        ).forEach(function (table) {
            initFpsTable(table);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

    // Expose for manual init (e.g. workgroupresources.html after JS renders table)
    window.initFpsTable = initFpsTable;

}());
