'use strict';

(function () {
    function normalizeSortValue(value) {
        var text = String(value || '').replace(/\s+/g, ' ').trim();
        if (!text) {
            return '';
        }

        var numericText = text.replace(/[£,$%]/g, '').replace(/,/g, '');
        var numericValue = Number(numericText);

        if (!Number.isNaN(numericValue) && numericText !== '') {
            return numericValue;
        }

        return text.toLowerCase();
    }

    function compareValues(valueA, valueB, order) {
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return order === 'asc' ? valueA - valueB : valueB - valueA;
        }

        var textA = String(valueA);
        var textB = String(valueB);

        return order === 'asc'
            ? textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' })
            : textB.localeCompare(textA, undefined, { numeric: true, sensitivity: 'base' });
    }

    function syncAllRecordsWithFiltered() {
        if (!Array.isArray(window.allRecords) || !Array.isArray(window.filteredRecords)) {
            return;
        }

        if (window.allRecords.length !== window.filteredRecords.length) {
            return;
        }

        window.allRecords = window.filteredRecords.slice();
    }

    function sortDataBackedTable(columnIndex, order) {
        if (!Array.isArray(window.filteredRecords) || typeof window.renderTable !== 'function') {
            return false;
        }

        var firstRecord = window.filteredRecords[0];
        if (!firstRecord) {
            return false;
        }

        var sortableKeys = Object.keys(firstRecord).filter(function (key) {
            return key !== 'id';
        });
        var sortKey = sortableKeys[columnIndex];

        if (!sortKey) {
            return false;
        }

        window.filteredRecords.sort(function (recordA, recordB) {
            return compareValues(
                normalizeSortValue(recordA[sortKey]),
                normalizeSortValue(recordB[sortKey]),
                order
            );
        });

        syncAllRecordsWithFiltered();
        if (typeof window.currentPage === 'number') {
            window.currentPage = 1;
        }
        window.renderTable();

        if (typeof window.renderPagination === 'function' && typeof window.getPerPage === 'function' && typeof window.onPageClick === 'function') {
            window.renderPagination(window.filteredRecords, window.currentPage || 1, window.getPerPage(), 'pagination', window.onPageClick);
        }

        return true;
    }

    function sortDomTable(table, columnIndex, order) {
        var tbody = table.tBodies && table.tBodies[0];
        if (!tbody) {
            return;
        }

        var rows = Array.from(tbody.rows);
        if (!rows.length || (rows.length === 1 && rows[0].cells.length === 1)) {
            return;
        }

        rows.sort(function (rowA, rowB) {
            var cellA = rowA.cells[columnIndex];
            var cellB = rowB.cells[columnIndex];

            if (!cellA || !cellB) {
                return 0;
            }

            return compareValues(
                normalizeSortValue(cellA.textContent),
                normalizeSortValue(cellB.textContent),
                order
            );
        });

        rows.forEach(function (row) {
            tbody.appendChild(row);
        });
    }

    function updateHeaderState(headers, activeHeader, order) {
        headers.forEach(function (header) {
            header.dataset.sortOrder = header === activeHeader ? order : 'none';
            header.setAttribute('aria-sort', header === activeHeader ? (order === 'asc' ? 'ascending' : 'descending') : 'none');
            header.classList.toggle('sorted-asc', header === activeHeader && order === 'asc');
            header.classList.toggle('sorted-desc', header === activeHeader && order === 'desc');
        });
    }

    function getColumnContentMinWidth(table, headers, colIdx) {
        var header = headers[colIdx];
        if (!header) {
            return 60;
        }

        var thMin = header.scrollWidth;
        var tbody = table.tBodies && table.tBodies[0];
        var tdMax = 0;

        if (tbody) {
            Array.from(tbody.rows).forEach(function (row) {
                var cell = row.cells[colIdx];
                if (cell) {
                    tdMax = Math.max(tdMax, cell.scrollWidth);
                }
            });
        }

        return Math.max(60, thMin, tdMax);
    }

    function initSorting(table) {
        var thead = table.tHead;
        var tbody = table.tBodies && table.tBodies[0];
        if (!thead || !tbody || table.dataset.mtSortInit === '1') {
            return;
        }

        table.dataset.mtSortInit = '1';

        var headers = Array.from(thead.querySelectorAll('th'));
        headers.forEach(function (header, index) {
            var label = header.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
            if (!label || label === 'action' || label === 'actions') {
                return;
            }

            header.classList.add('mt-th-sortable');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-sort', 'none');
            header.dataset.sortOrder = 'none';

            if (!header.querySelector('.mt-sort-icon')) {
                var icon = document.createElement('span');
                icon.className = 'mt-sort-icon';
                icon.setAttribute('aria-hidden', 'true');
                header.appendChild(icon);
            }

            function handleSort() {
                var nextOrder = header.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
                updateHeaderState(headers, header, nextOrder);

                if (!sortDataBackedTable(index, nextOrder)) {
                    sortDomTable(table, index, nextOrder);
                }
            }

            header.addEventListener('click', handleSort);
            header.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSort();
                }
            });
        });
    }

    function initResizing(table) {
        var thead = table.tHead;
        if (!thead || table.dataset.mtResizeInit === '1') {
            return;
        }

        table.dataset.mtResizeInit = '1';

        // Snapshot natural widths BEFORE applying table-layout:fixed.
        var headers = Array.from(thead.querySelectorAll('th'));

        var naturalWidths = headers.map(function (h) { return h.offsetWidth; });
        var naturalTableWidth = table.offsetWidth;

        table.style.tableLayout = 'fixed';
        table.style.width = naturalTableWidth + 'px';

        headers.forEach(function (header, i) {
            header.style.width = naturalWidths[i] + 'px';
            header.style.boxSizing = 'border-box';

            var label = header.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
            var isActionColumn = label === 'action' || label === 'actions';
            var isLastColumn = i === headers.length - 1;

            if (isActionColumn || isLastColumn) {
                return;
            }

            header.classList.add('mt-th-resizable');

            if (header.querySelector('.mt-resizer')) {
                return;
            }

            var resizer = document.createElement('div');
            resizer.className = 'mt-resizer';
            resizer.innerHTML = '&nbsp;';
            header.appendChild(resizer);

            resizer.addEventListener('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var headerIndex = headers.indexOf(header);
                var nextHeader = headers[headerIndex + 1] || null;

                var startX = event.pageX;
                var startWidth = header.offsetWidth;
                var startNextWidth = nextHeader ? nextHeader.offsetWidth : 0;
                var minWidth = getColumnContentMinWidth(table, headers, headerIndex);
                var nextMinWidth = nextHeader ? getColumnContentMinWidth(table, headers, headerIndex + 1) : 0;

                resizer.classList.add('resizing');

                function onMouseMove(moveEvent) {
                    var delta = moveEvent.pageX - startX;
                    var newWidth = Math.max(minWidth, startWidth + delta);

                    if (nextHeader) {
                        var newNextWidth = startNextWidth - (newWidth - startWidth);
                        if (newNextWidth < nextMinWidth) {
                            newWidth = startWidth + (startNextWidth - nextMinWidth);
                            newNextWidth = nextMinWidth;
                        }
                        nextHeader.style.width = newNextWidth + 'px';
                    }

                    header.style.width = newWidth + 'px';
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

    function initMaintenanceTables() {
        var tables = document.querySelectorAll('main .govuk-table.custom-table');
        tables.forEach(function (table) {
            table.classList.add('mt-table-enhanced');
            initSorting(table);
            initResizing(table);
        });
    }

    document.addEventListener('DOMContentLoaded', initMaintenanceTables);
}());