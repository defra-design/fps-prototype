'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, workGroup: 'APH SCAH',    resourceCentre: 'APH SCAH',     costCentre: '10066400', owner: '',                  description: 'Weybridge Site Devt',                    centralOverhead: '£0.00' },
    { id:  2, workGroup: 'AS2',          resourceCentre: 'ASU',           costCentre: '10066227', owner: 'Harry, Denise',     description: 'ASU - Scientific',                       centralOverhead: '£0.00' },
    { id:  3, workGroup: 'AS3',          resourceCentre: 'ASU',           costCentre: '10066227', owner: 'Harry, Denise',     description: 'ASU - Farm Managers',                    centralOverhead: '£0.00' },
    { id:  4, workGroup: 'BAC1',         resourceCentre: 'Bact',          costCentre: '10066218', owner: 'Marquet, Kort',     description: 'Bacteriology',                           centralOverhead: '£0.00' },
    { id:  5, workGroup: 'BAC2',         resourceCentre: 'Bact',          costCentre: '10066218', owner: 'Marquet, Kort',     description: 'Bacteriology',                           centralOverhead: '£0.00' },
    { id:  6, workGroup: 'BAC3',         resourceCentre: 'Bact',          costCentre: '10066218', owner: 'Marquet, Kort',     description: 'Bacteriology',                           centralOverhead: '£0.00' },
    { id:  7, workGroup: 'BAC5',         resourceCentre: 'Bact',          costCentre: '10066218', owner: 'Sampey, Jaime',     description: 'Brucella & Mycoplasma',                  centralOverhead: '£0.00' },
    { id:  8, workGroup: 'Bees',         resourceCentre: 'Bees England',  costCentre: '10063201', owner: 'Seagrave, Mariska', description: 'Bees Inspectorate',                      centralOverhead: '£0.00' },
    { id:  9, workGroup: 'Bees Advice',  resourceCentre: 'Bees England',  costCentre: '10065152', owner: 'Seagrave, Mariska', description: 'NBU - Bees Advice',                      centralOverhead: '£0.00' },
    { id: 10, workGroup: 'Bees Wales',   resourceCentre: 'Bees Wales',    costCentre: '10063400', owner: 'Seagrave, Mariska', description: 'NBU Advisory Team Wales',                centralOverhead: '£0.00' },
    { id: 11, workGroup: 'BAC4',         resourceCentre: 'BTB',           costCentre: '10066217', owner: 'Balloch, Matthaeus',description: 'Btb Bovine Tuberculosis',                centralOverhead: '£0.00' },
    { id: 12, workGroup: 'Bus Supp',     resourceCentre: 'Bus Supp',      costCentre: '10069214', owner: '',                  description: 'Business Support Worcester',             centralOverhead: '£0.00' },
    { id: 13, workGroup: 'CIT',          resourceCentre: 'CIT',           costCentre: '10064222', owner: '',                  description: 'CSC INTERNATIONAL TRADE',                centralOverhead: '£0.00' },
    { id: 14, workGroup: 'CITB',         resourceCentre: 'CITB',          costCentre: '10064223', owner: '',                  description: 'CITES Intl Trade Bristol',               centralOverhead: '£0.00' },
    { id: 15, workGroup: 'BDU',          resourceCentre: 'Comm',          costCentre: '10061500', owner: 'Killik, Jania',     description: 'Dept Intl Devt, Innov, and Business',   centralOverhead: '£0.00' },
    { id: 16, workGroup: 'DASP',         resourceCentre: 'Comm',          costCentre: '10061500', owner: 'Killik, Jania',     description: 'Quality Assurance Sutton Research',      centralOverhead: '£0.00' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingWGId = null;
var wgSortState = {
    key: null,
    direction: 'asc'
};

function parseWGSortValue(value, fieldKey) {
    if (fieldKey === 'centralOverhead') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    return String(value || '').toLowerCase();
}

function sortWGRecords() {
    if (!wgSortState.key) {
        return;
    }

    var fieldKey = wgSortState.key;
    var multiplier = wgSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseWGSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseWGSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateWGSortIcons() {
    var headers = document.querySelectorAll('#tblWG th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (wgSortState.key === column) {
            header.classList.add(wgSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = wgSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleWGSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    wgSortState.direction = wgSortState.key === fieldKey && wgSortState.direction === 'asc' ? 'desc' : 'asc';
    wgSortState.key = fieldKey;
    currentPage = 1;
    sortWGRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupWGTableSorting() {
    var headers = document.querySelectorAll('#tblWG th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleWGSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleWGSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateWGSortIcons();
}

function measureWGTextWidth(text, className) {
    var measurer = document.getElementById('wg-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'wg-width-measurer';
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

function getWGColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getWGColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureWGTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getWGColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureWGTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncWGColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getWGColumnMinimumWidth(table, header, columnKey);
        } else {
            minWidth = Math.max(80, header.offsetWidth);
        }

        header.dataset.minWidth = String(minWidth);
        header.style.minWidth = minWidth + 'px';
        header.style.boxSizing = 'border-box';

        currentWidth = parseFloat(header.style.width) || header.offsetWidth || minWidth;
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

function setupWGColumnResizing() {
    var table = document.getElementById('tblWG');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncWGColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncWGColumnMinimumWidths(table, true);
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
    var tbody = document.getElementById('tblWGBody');
    if (!tbody) { return; }
    sortWGRecords();
    updateWGSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblWGBody', 7, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.workGroup + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.resourceCentre + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.costCentre + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.owner + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.description + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.centralOverhead + '</td>';
        html += '<td class="govuk-table__cell wg-actions-cell">';
        html += '<button class="wg-action-button" onclick=\'openTblWGEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit workgroup ' + item.workGroup + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit workgroup ' + item.workGroup + '" width="20">';
        html += '</button>';
        html += '<button class="wg-action-button" onclick="handleTblWGDelete(' + item.id + ')" aria-label="Delete workgroup ' + item.workGroup + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete workgroup ' + item.workGroup + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblWG') && document.getElementById('tblWG').dataset.resizeSized === 'true') {
        syncWGColumnMinimumWidths(document.getElementById('tblWG'), true);
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

function openTblWGAddModal() {
    editingWGId = null;
    document.getElementById('tblWGModalLabel').textContent = 'Add WorkGroup';
    document.getElementById('tblWGSaveBtn').classList.remove('wg-hidden');
    document.getElementById('tblWGUpdateBtn').classList.add('wg-hidden');
    clearWGModalValidation();
    document.getElementById('modal-wg-name').value = '';
    document.getElementById('modal-wg-rc').value = '';
    document.getElementById('modal-wg-cc').value = '-- Select --';
    document.getElementById('modal-wg-owner').value = '-- Select --';
    document.getElementById('modal-wg-desc').value = '';
    document.getElementById('modal-wg-overhead').value = '';
    openModal('tblWGModal');
    document.getElementById('modal-wg-name').focus();
}

function openTblWGEditModal(item) {
    editingWGId = item.id;
    document.getElementById('tblWGModalLabel').textContent = 'Edit WorkGroup';
    document.getElementById('tblWGSaveBtn').classList.add('wg-hidden');
    document.getElementById('tblWGUpdateBtn').classList.remove('wg-hidden');
    clearWGModalValidation();
    document.getElementById('modal-wg-name').value = item.workGroup;
    document.getElementById('modal-wg-rc').value = item.resourceCentre;
    document.getElementById('modal-wg-cc').value = item.costCentre || '';
    document.getElementById('modal-wg-owner').value = item.owner || '';
    document.getElementById('modal-wg-desc').value = item.description;
    document.getElementById('modal-wg-overhead').value = item.centralOverhead.replace('£', '').replace(/,/g, '');
    openModal('tblWGModal');
    document.getElementById('modal-wg-name').focus();
}

function closeTblWGModal() {
    clearWGModalValidation();
    closeModal('tblWGModal');
    editingWGId = null;
}

function clearWGModalValidation() {
    document.querySelectorAll('#formTblWG .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblWG .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblWG .govuk-input--error, #formTblWG .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-input--error', 'govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showWGFieldError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var formGroup;
    var fieldContainer;
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
    fieldContainer = field.closest('.govuk-input__wrapper') || field;
    errorId = fieldId + '-error';
    errorMessage = document.createElement('p');

    if (formGroup) {
        formGroup.classList.add('govuk-form-group--error');
    }

    if (field.tagName === 'SELECT') {
        field.classList.add('govuk-select--error');
    } else {
        field.classList.add('govuk-input--error');
    }
    field.setAttribute('aria-invalid', 'true');

    errorMessage.className = 'govuk-error-message';
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;

    if (fieldContainer) {
        fieldContainer.insertAdjacentElement('afterend', errorMessage);
    } else if (formGroup) {
        formGroup.appendChild(errorMessage);
    }

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + ' ' + errorId : errorId;
    field.setAttribute('aria-describedby', describedBy.trim());
}

function validateWGModal() {
    var errors = [];
    var name = document.getElementById('modal-wg-name').value.trim();
    var rc = document.getElementById('modal-wg-rc').value;
    var cc = document.getElementById('modal-wg-cc').value;
    var owner = document.getElementById('modal-wg-owner').value;
    var description = document.getElementById('modal-wg-desc').value.trim();
    var overhead = document.getElementById('modal-wg-overhead').value.trim();

    function isValidNumber(value) {
        return !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, '')));
    }

    clearWGModalValidation();

    if (!name) { errors.push({ fieldId: 'modal-wg-name', message: 'Workgroup is required' }); }
    if (!rc) { errors.push({ fieldId: 'modal-wg-rc', message: 'Resource centre is required' }); }
    if (!cc) { errors.push({ fieldId: 'modal-wg-cc', message: 'Cost centre is required' }); }
    if (!owner) { errors.push({ fieldId: 'modal-wg-owner', message: 'Owner is required' }); }
    if (!description) { errors.push({ fieldId: 'modal-wg-desc', message: 'Description is required' }); }
    if (!overhead) {
        errors.push({ fieldId: 'modal-wg-overhead', message: 'Central overhead is required' });
    } else if (!isValidNumber(overhead)) {
        errors.push({ fieldId: 'modal-wg-overhead', message: 'Central overhead must be a valid number' });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showWGFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildWGRecord(id) {
    var overhead = document.getElementById('modal-wg-overhead').value.trim();
    var num = parseFloat(overhead.replace(/[^0-9.]/g, ''));
    return {
        id: id,
        workGroup:      document.getElementById('modal-wg-name').value.trim(),
        resourceCentre: document.getElementById('modal-wg-rc').value,
        costCentre:     document.getElementById('modal-wg-cc').value.trim(),
        owner:          document.getElementById('modal-wg-owner').value.trim(),
        description:    document.getElementById('modal-wg-desc').value.trim(),
        centralOverhead: isNaN(num) ? '£0.00' : '£' + num.toFixed(2)
    };
}

function saveTblWG() {
    if (!validateWGModal()) {
        return;
    }

    var name = document.getElementById('modal-wg-name').value.trim();
    if (!name) { document.getElementById('modal-wg-name').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildWGRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblWGModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblWG() {
    if (!validateWGModal()) {
        return;
    }

    var name = document.getElementById('modal-wg-name').value.trim();
    if (!name) { document.getElementById('modal-wg-name').focus(); return; }
    var updated = buildWGRecord(editingWGId);
    allRecords      = allRecords.map(function (r) { return r.id === editingWGId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingWGId ? updated : r; });
    closeTblWGModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblWGDelete(id) {
    if (!window.confirm('Delete this workgroup record?')) { return; }
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
    setupWGTableSorting();
    setupWGColumnResizing();
});
