(function () {
    'use strict';

    var DEFAULT_MIN_WIDTH = 60;

    function setColumnWidth(table, colIndex, widthPx) {
        var width = Math.max(DEFAULT_MIN_WIDTH, widthPx);
        var rows = table.querySelectorAll('tr');
        rows.forEach(function (row) {
            if (!row || !row.children || !row.children[colIndex]) {
                return;
            }
            row.children[colIndex].style.width = width + 'px';
            row.children[colIndex].style.minWidth = width + 'px';
        });
    }

    function makeHeaderResizable(table, th, colIndex) {
        if (th.querySelector('.column-resizer')) {
            return;
        }

        var resizer = document.createElement('span');
        resizer.className = 'column-resizer';
        resizer.setAttribute('aria-hidden', 'true');
        th.appendChild(resizer);

        resizer.addEventListener('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var startX = event.pageX;
            var startWidth = th.getBoundingClientRect().width;
            var frameRequested = false;
            var pendingWidth = startWidth;

            function applyWidth() {
                frameRequested = false;
                setColumnWidth(table, colIndex, pendingWidth);
            }

            function onMouseMove(moveEvent) {
                pendingWidth = startWidth + (moveEvent.pageX - startX);
                if (!frameRequested) {
                    frameRequested = true;
                    requestAnimationFrame(applyWidth);
                }
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Prevent accidental sort/click from firing on handle click.
        resizer.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function enableColumnResize(tableElement) {
        if (!tableElement) {
            return;
        }

        tableElement.classList.add('column-resize-enabled');

        var headRows = tableElement.querySelectorAll('thead tr');
        if (!headRows.length) {
            return;
        }

        // Use the last header row for column handles.
        var headerCells = headRows[headRows.length - 1].querySelectorAll('th');
        headerCells.forEach(function (th, index) {
            makeHeaderResizable(tableElement, th, index);
        });
    }

    function initAllCostbookTables() {
        document.querySelectorAll('table').forEach(function (table) {
            enableColumnResize(table);
        });
    }

    function observeDynamicHeaders() {
        var observer = new MutationObserver(function (mutations) {
            var shouldReinit = mutations.some(function (mutation) {
                return mutation.type === 'childList';
            });

            if (!shouldReinit) {
                return;
            }

            document.querySelectorAll('table').forEach(function (table) {
                enableColumnResize(table);
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initAllCostbookTables();
            observeDynamicHeaders();
        });
    } else {
        initAllCostbookTables();
        observeDynamicHeaders();
    }

    window.enableColumnResize = enableColumnResize;
}());
