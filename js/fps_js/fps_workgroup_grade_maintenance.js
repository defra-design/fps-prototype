'use strict';

/* Sample data — rows for WG Grade maintenance */
var allRecords = [
    { id: 1, wgGrade: 'A-Admin-WG1', pcGrade: 'A-PC1', grade: 'A', wg: 'Admin-WG1' },
    { id: 2, wgGrade: 'B-Admin-WG1', pcGrade: 'B-PC1', grade: 'B', wg: 'Admin-WG1' },
    { id: 3, wgGrade: 'C-Admin-WG1', pcGrade: 'C-PC1', grade: 'C', wg: 'Admin-WG1' },
    { id: 4, wgGrade: 'D-Admin-WG1', pcGrade: 'D-PC1', grade: 'D', wg: 'Admin-WG1' },
    { id: 5, wgGrade: 'E-Admin-WG1', pcGrade: 'E-PC1', grade: 'E', wg: 'Admin-WG1' },
    { id: 6, wgGrade: 'A-Operations-WG2', pcGrade: 'A-PC2', grade: 'A', wg: 'Operations-WG2' },
    { id: 7, wgGrade: 'B-Operations-WG2', pcGrade: 'B-PC2', grade: 'B', wg: 'Operations-WG2' },
    { id: 8, wgGrade: 'C-Operations-WG2', pcGrade: 'C-PC2', grade: 'C', wg: 'Operations-WG2' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingWGGradeId = null;
var wggSortState = {
    key: null,
    direction: 'asc'
};

function parseWGGSortValue(value) {
    return String(value || '').toLowerCase();
}

function sortWGGRecords() {
    if (!wggSortState.key) {
        return;
    }

    var fieldKey = wggSortState.key;
    var multiplier = wggSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseWGGSortValue(recordA[fieldKey]);
        var valueB = parseWGGSortValue(recordB[fieldKey]);
        return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateWGGSortIcons() {
    var headers = document.querySelectorAll('#tblWGGrade th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (wggSortState.key === column) {
            header.classList.add(wggSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = wggSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleWGGSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    wggSortState.direction = wggSortState.key === fieldKey && wggSortState.direction === 'asc' ? 'desc' : 'asc';
    wggSortState.key = fieldKey;
    currentPage = 1;
    sortWGGRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupWGGTableSorting() {
    var headers = document.querySelectorAll('#tblWGGrade th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleWGGSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleWGGSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateWGGSortIcons();
}

function measureWGGTextWidth(text, className) {
    var measurer = document.getElementById('wgg-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'wgg-width-measurer';
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

function getWGGColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getWGGColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureWGGTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getWGGColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureWGGTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncWGGColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getWGGColumnMinimumWidth(table, header, columnKey);
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

function setupWGGColumnResizing() {
    var table = document.getElementById('tblWGGrade');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncWGGColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncWGGColumnMinimumWidths(table, true);
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
    var tbody = document.getElementById('tblWGGradeBody');
    if (!tbody) { return; }
    sortWGGRecords();
    updateWGGSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblWGGradeBody', 5, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.wgGrade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.pcGrade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.grade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.wg + '</td>';
        html += '<td class="govuk-table__cell wgg-actions-cell">';
        html += '<button class="wgg-action-button" onclick=\'openTblWGGradeEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit WG grade ' + item.wgGrade + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit WG grade ' + item.wgGrade + '" width="20">';
        html += '</button>';
        html += '<button class="wgg-action-button" onclick="handleTblWGGradeDelete(' + item.id + ')" aria-label="Delete WG grade ' + item.wgGrade + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete WG grade ' + item.wgGrade + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblWGGrade') && document.getElementById('tblWGGrade').dataset.resizeSized === 'true') {
        syncWGGColumnMinimumWidths(document.getElementById('tblWGGrade'), true);
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

function openTblWGGradeAddModal() {
    editingWGGradeId = null;
    document.getElementById('tblWGGradeModalLabel').textContent = 'Add WG Grade';
    document.getElementById('tblWGGradeSaveBtn').classList.remove('wgg-hidden');
    document.getElementById('tblWGGradeUpdateBtn').classList.add('wgg-hidden');
    clearWGGradeModalValidation();
    document.getElementById('modal-wgg-wggrade').value = '';
    document.getElementById('modal-wgg-pcgrade').value = '';
    document.getElementById('modal-wgg-grade').value = '';
    document.getElementById('modal-wgg-wg').value = '';
    openModal('tblWGGradeModal');
    document.getElementById('modal-wgg-wggrade').focus();
}

function openTblWGGradeEditModal(item) {
    editingWGGradeId = item.id;
    document.getElementById('tblWGGradeModalLabel').textContent = 'Edit WG Grade';
    document.getElementById('tblWGGradeSaveBtn').classList.add('wgg-hidden');
    document.getElementById('tblWGGradeUpdateBtn').classList.remove('wgg-hidden');
    clearWGGradeModalValidation();
    document.getElementById('modal-wgg-wggrade').value = item.wgGrade;
    document.getElementById('modal-wgg-pcgrade').value = item.pcGrade;
    document.getElementById('modal-wgg-grade').value = item.grade;
    document.getElementById('modal-wgg-wg').value = item.wg;
    openModal('tblWGGradeModal');
    document.getElementById('modal-wgg-wggrade').focus();
}

function closeTblWGGradeModal() {
    clearWGGradeModalValidation();
    closeModal('tblWGGradeModal');
    editingWGGradeId = null;
}

function clearWGGradeModalValidation() {
    document.querySelectorAll('#formTblWGGrade .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblWGGrade .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblWGGrade .govuk-input--error, #formTblWGGrade .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-input--error', 'govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showWGGradeFieldError(fieldId, message) {
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

    if (field.tagName === 'SELECT') {
        field.classList.add('govuk-select--error');
    } else {
        field.classList.add('govuk-input--error');
    }
    field.setAttribute('aria-invalid', 'true');

    errorMessage.className = 'govuk-error-message';
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;
    field.insertAdjacentElement('afterend', errorMessage);

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + ' ' + errorId : errorId;
    field.setAttribute('aria-describedby', describedBy.trim());
}

function validateWGGradeModal() {
    var errors = [];
    var wgGrade = document.getElementById('modal-wgg-wggrade').value.trim();
    var pcGrade = document.getElementById('modal-wgg-pcgrade').value;
    var grade = document.getElementById('modal-wgg-grade').value;
    var wg = document.getElementById('modal-wgg-wg').value;

    clearWGGradeModalValidation();

    if (!wgGrade) { errors.push({ fieldId: 'modal-wgg-wggrade', message: 'WG grade is required' }); }
    if (!pcGrade) { errors.push({ fieldId: 'modal-wgg-pcgrade', message: 'PC grade is required' }); }
    if (!grade) { errors.push({ fieldId: 'modal-wgg-grade', message: 'Grade is required' }); }
    if (!wg) { errors.push({ fieldId: 'modal-wgg-wg', message: 'Workgroup is required' }); }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showWGGradeFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildWGGradeRecord(id) {
    return {
        id: id,
        wgGrade: document.getElementById('modal-wgg-wggrade').value.trim(),
        pcGrade: document.getElementById('modal-wgg-pcgrade').value.trim(),
        grade: document.getElementById('modal-wgg-grade').value,
        wg: document.getElementById('modal-wgg-wg').value.trim()
    };
}

function saveTblWGGrade() {
    if (!validateWGGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-wgg-wggrade').value.trim()) {
        document.getElementById('modal-wgg-wggrade').focus(); return;
    }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildWGGradeRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblWGGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblWGGrade() {
    if (!validateWGGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-wgg-wggrade').value.trim()) {
        document.getElementById('modal-wgg-wggrade').focus(); return;
    }
    var updated = buildWGGradeRecord(editingWGGradeId);
    allRecords      = allRecords.map(function (r) { return r.id === editingWGGradeId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingWGGradeId ? updated : r; });
    closeTblWGGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblWGGradeDelete(id) {
    if (!window.confirm('Delete this WG grade record?')) { return; }
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
    setupWGGTableSorting();
    setupWGGColumnResizing();
});
