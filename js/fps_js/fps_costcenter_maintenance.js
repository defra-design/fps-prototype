'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, costCentre: '10061007', profitCentre: 'PDPM'         },
    { id:  2, costCentre: '10061212', profitCentre: 'HNC'          },
    { id:  3, costCentre: '10061213', profitCentre: 'VetDir'       },
    { id:  4, costCentre: '10061253', profitCentre: 'IMT'          },
    { id:  5, costCentre: '10061300', profitCentre: 'Field Activity'},
    { id:  6, costCentre: '10061500', profitCentre: 'Comm'         },
    { id:  7, costCentre: '10062313', profitCentre: 'SLSD'         },
    { id:  8, costCentre: '10062400', profitCentre: 'SLSD'         },
    { id:  9, costCentre: '10063101', profitCentre: 'PHI Del'      },
    { id: 10, costCentre: '10063201', profitCentre: 'Bees England' },
    { id: 11, costCentre: '10063226', profitCentre: 'RONT'         },
    { id: 12, costCentre: '10063266', profitCentre: 'ROSW'         },
    { id: 13, costCentre: '10063300', profitCentre: 'ROSC'         },
    { id: 14, costCentre: '10063400', profitCentre: 'ROWA'         },
    { id: 15, costCentre: '10064110', profitCentre: 'PHSI-AD'      },
    { id: 16, costCentre: '10064200', profitCentre: 'CSCS'         },
    { id: 17, costCentre: '10064207', profitCentre: 'CSCW'         }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingCCId = null;
var ccSortState = {
    key: null,
    direction: 'asc'
};

function parseCCSortValue(value) {
    return String(value || '').toLowerCase();
}

function sortCCRecords() {
    if (!ccSortState.key) {
        return;
    }

    var fieldKey = ccSortState.key;
    var multiplier = ccSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseCCSortValue(recordA[fieldKey]);
        var valueB = parseCCSortValue(recordB[fieldKey]);
        return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateCCSortIcons() {
    var headers = document.querySelectorAll('#tblCostCentre th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (ccSortState.key === column) {
            header.classList.add(ccSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = ccSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleCCSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    ccSortState.direction = ccSortState.key === fieldKey && ccSortState.direction === 'asc' ? 'desc' : 'asc';
    ccSortState.key = fieldKey;
    currentPage = 1;
    sortCCRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupCCTableSorting() {
    var headers = document.querySelectorAll('#tblCostCentre th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleCCSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCCSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateCCSortIcons();
}

function measureCCTextWidth(text, className) {
    var measurer = document.getElementById('cc-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'cc-width-measurer';
        measurer.style.position = 'absolute';
        measurer.style.visibility = 'hidden';
        measurer.style.whiteSpace = 'nowrap';
        measurer.style.left = '-9999px';
        measurer.style.top = '-9999px';
        document.body.appendChild(measurer);
    }

    measurer.className = className || '';
    measurer.textContent = text || '';
    return measurer.offsetWidth;
}

function getCCColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getCCColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureCCTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getCCColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureCCTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncCCColumnMinimumWidths(table, preserveExpandedWidths) {
    var wrapper = table ? table.parentElement : null;
    var headers = table ? Array.prototype.slice.call(table.querySelectorAll('th')) : [];
    var totalWidth = 0;
    var actionColumnWidth = 96;

    if (!table || !wrapper || !headers.length) {
        return;
    }

    headers.forEach(function (header, index) {
        var columnKey = header.dataset.column;
        var isActionColumn = !columnKey && index === headers.length - 1;
        var minWidth;
        var currentWidth;
        var appliedWidth;

        if (isActionColumn) {
            minWidth = actionColumnWidth;
        } else if (columnKey) {
            minWidth = getCCColumnMinimumWidth(table, header, columnKey);
        } else {
            minWidth = Math.max(80, header.offsetWidth);
        }

        header.dataset.minWidth = String(minWidth);
        header.style.minWidth = minWidth + 'px';
        header.style.boxSizing = 'border-box';

        currentWidth = parseFloat(header.style.width) || (isActionColumn ? minWidth : (header.offsetWidth || minWidth));
        appliedWidth = isActionColumn
            ? minWidth
            : (preserveExpandedWidths ? Math.max(currentWidth, minWidth) : minWidth);
        header.style.width = appliedWidth + 'px';
        totalWidth += appliedWidth;
    });

    table.style.tableLayout = 'fixed';
    table.style.minWidth = '100%';
    table.style.width = totalWidth + 'px';
}

function setupCCColumnResizing() {
    var table = document.getElementById('tblCostCentre');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncCCColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncCCColumnMinimumWidths(table, true);
    }

    headers.forEach(function (header) {
        if (!header.querySelector('.pp-resizer')) {
            var resizer = document.createElement('div');
            resizer.className = 'pp-resizer';
            resizer.innerHTML = '&nbsp;';
            header.appendChild(resizer);
        }
    });

    var resizers = table.querySelectorAll('.pp-resizer');
    resizers.forEach(function (resizer) {
        if (resizer.dataset.bound === 'true') {
            return;
        }

        resizer.addEventListener('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var th = this.parentElement;
            var startX = event.pageX;
            var startWidth = th.offsetWidth;
            var startTableWidth = table.offsetWidth;
            var minWidth = parseFloat(th.dataset.minWidth) || 60;

            function onMouseMove(moveEvent) {
                var newWidth = Math.max(minWidth, startWidth + (moveEvent.pageX - startX));
                th.style.width = newWidth + 'px';
                table.style.width = Math.max(wrapper.clientWidth, startTableWidth + (newWidth - startWidth)) + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        resizer.dataset.bound = 'true';
    });
}

function renderEmptyRow(tbodyId, colSpan, message) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) {
        return;
    }

    tbody.innerHTML = '';
    var row = document.createElement('tr');
    row.className = 'govuk-table__row';
    row.innerHTML = '<td class="govuk-table__cell" colspan="' + colSpan + '">' + message + '</td>';
    tbody.appendChild(row);
}

function goToPage(page, totalPages, onNavigate) {
    if (page < 1 || page > totalPages) {
        return;
    }

    if (typeof onNavigate === 'function') {
        onNavigate(page);
    }
}

function renderPagination(records, currentPageValue, perPage, paginationListId, onPageClick) {
    var paginationList = document.getElementById(paginationListId);
    if (!paginationList) {
        return;
    }

    var totalRecords = records.length;
    var totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    if (currentPageValue > totalPages) {
        currentPageValue = totalPages;
    }

    var prevDisabled = currentPageValue <= 1;
    var nextDisabled = currentPageValue >= totalPages;

    var html = '';

    html += '<li class="govuk-pagination__prev ' + (prevDisabled ? 'govuk-pagination__item--disabled' : '') + '">';
    html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + (currentPageValue - 1) + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Previous page">';
    html += '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
    html += '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>';
    html += '</svg>';
    html += '<span class="govuk-pagination__link-title">Previous</span>';
    html += '</a></li>';

    for (var i = 1; i <= totalPages; i++) {
        html += '<li class="govuk-pagination__item ' + (i === currentPageValue ? 'govuk-pagination__item--current' : '') + '">';
        html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + i + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Page ' + i + '">' + i + '</a>';
        html += '</li>';
    }

    html += '<li class="govuk-pagination__next ' + (nextDisabled ? 'govuk-pagination__item--disabled' : '') + '">';
    html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + (currentPageValue + 1) + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Next page">';
    html += '<span class="govuk-pagination__link-title">Next</span>';
    html += '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
    html += '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>';
    html += '</svg>';
    html += '</a></li>';

    paginationList.innerHTML = html;
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function getPerPage() {
    var sel = document.getElementById('recordsPerPage');
    return sel ? parseInt(sel.value, 10) : 10;
}

function renderTable() {
    var tbody = document.getElementById('tblCostCentreBody');
    if (!tbody) { return; }
    sortCCRecords();
    updateCCSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblCostCentreBody', 3, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.costCentre + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.profitCentre + '</td>';
        html += '<td class="govuk-table__cell" style="text-align: center;">';
        html += '<button onclick=\'openTblCostCentreEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit cost centre ' + item.costCentre + '" style="background:none;border:none;cursor:pointer;padding:4px;">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit cost centre ' + item.costCentre + '" width="20">';
        html += '</button>';
        html += '<button onclick="handleTblCostCentreDelete(' + item.id + ')" aria-label="Delete cost centre ' + item.costCentre + '" style="background:none;border:none;cursor:pointer;padding:4px;">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete cost centre ' + item.costCentre + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblCostCentre') && document.getElementById('tblCostCentre').dataset.resizeSized === 'true') {
        syncCCColumnMinimumWidths(document.getElementById('tblCostCentre'), true);
    }
}

function onPageClick(page) {
    currentPage = page;
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function initTable(records) {
    allRecords = records;
    filteredRecords = allRecords.slice();
    currentPage = 1;
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function openTblCostCentreAddModal() {
    editingCCId = null;
    document.getElementById('tblCostCentreModalLabel').textContent = 'Add Cost Centre';
    document.getElementById('tblCostCentreSaveBtn').classList.remove('cc-hidden');
    document.getElementById('tblCostCentreUpdateBtn').classList.add('cc-hidden');
    clearCostCentreModalValidation();
    document.getElementById('modal-cc-number').value = '';
    document.getElementById('modal-cc-profit').value = '';
    openModal('tblCostCentreModal');
    document.getElementById('modal-cc-number').focus();
}

function openTblCostCentreEditModal(item) {
    editingCCId = item.id;
    document.getElementById('tblCostCentreModalLabel').textContent = 'Edit Cost Centre';
    document.getElementById('tblCostCentreSaveBtn').classList.add('cc-hidden');
    document.getElementById('tblCostCentreUpdateBtn').classList.remove('cc-hidden');
    clearCostCentreModalValidation();
    document.getElementById('modal-cc-number').value = item.costCentre;
    document.getElementById('modal-cc-profit').value = item.profitCentre;
    openModal('tblCostCentreModal');
    document.getElementById('modal-cc-number').focus();
}

function closeTblCostCentreModal() {
    clearCostCentreModalValidation();
    closeModal('tblCostCentreModal');
    editingCCId = null;
}

function clearCostCentreModalValidation() {
    document.querySelectorAll('#formTblCostCentre .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblCostCentre .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblCostCentre .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showCostCentreFieldError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var formGroup;
    var errorId;
    var errorMessage;
    var describedBy;

    if (!field) {
        return;
    }

    if (typeof field.dataset.baseDescribedby === 'undefined') {
        field.dataset.baseDescribedby = field.getAttribute('aria-describedby') || '';
    }

    formGroup = field.closest('.govuk-form-group');
    errorId = fieldId + '-error';
    errorMessage = document.createElement('p');

    if (formGroup) {
        formGroup.classList.add('govuk-form-group--error');
    }

    field.classList.add('govuk-select--error');
    field.setAttribute('aria-invalid', 'true');

    errorMessage.className = 'govuk-error-message';
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;
    field.insertAdjacentElement('afterend', errorMessage);

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + ' ' + errorId : errorId;
    field.setAttribute('aria-describedby', describedBy.trim());
}

function validateCostCentreModal() {
    var errors = [];
    var cc = document.getElementById('modal-cc-number').value.trim();
    var pc = document.getElementById('modal-cc-profit').value.trim();

    clearCostCentreModalValidation();

    if (!cc) { errors.push({ fieldId: 'modal-cc-number', message: 'Cost centre is required' }); }
    if (!pc) { errors.push({ fieldId: 'modal-cc-profit', message: 'Profit centre is required' }); }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showCostCentreFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function saveTblCostCentre() {
    if (!validateCostCentreModal()) {
        return;
    }

    var cc = document.getElementById('modal-cc-number').value.trim();
    var pc = document.getElementById('modal-cc-profit').value.trim();
    if (!cc) { document.getElementById('modal-cc-number').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push({ id: newId, costCentre: cc, profitCentre: pc });
    filteredRecords = allRecords.slice();
    closeTblCostCentreModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblCostCentre() {
    if (!validateCostCentreModal()) {
        return;
    }

    var cc = document.getElementById('modal-cc-number').value.trim();
    var pc = document.getElementById('modal-cc-profit').value.trim();
    if (!cc) { document.getElementById('modal-cc-number').focus(); return; }
    allRecords = allRecords.map(function (r) {
        return r.id === editingCCId ? { id: r.id, costCentre: cc, profitCentre: pc } : r;
    });
    filteredRecords = filteredRecords.map(function (r) {
        return r.id === editingCCId ? { id: r.id, costCentre: cc, profitCentre: pc } : r;
    });
    closeTblCostCentreModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblCostCentreDelete(id) {
    if (!window.confirm('Delete this cost centre record?')) { return; }
    allRecords      = allRecords.filter(function (r) { return r.id !== id; });
    filteredRecords = filteredRecords.filter(function (r) { return r.id !== id; });
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('recordsPerPage').addEventListener('change', function () {
        currentPage = 1;
        renderTable();
        renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
    });
    initTable(allRecords);
    setupCCTableSorting();
    setupCCColumnResizing();
});
