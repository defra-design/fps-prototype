'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id: 1, gradeCode: 'A',   description: 'A (G6)',              avSalary: '£53,840.00' },
    { id: 2, gradeCode: 'B',   description: 'B (G7)',              avSalary: '£44,000.00' },
    { id: 3, gradeCode: 'C',   description: 'C (Equiv SEO/SSO)',   avSalary: '£33,559.00' },
    { id: 4, gradeCode: 'D',   description: 'D (Equiv HEO/HSO)',   avSalary: '£25,403.00' },
    { id: 5, gradeCode: 'E',   description: 'E/EO',                avSalary: '£21,795.00' },
    { id: 6, gradeCode: 'F',   description: 'F/AO',                avSalary: '£16,576.00' },
    { id: 7, gradeCode: 'G',   description: 'G/AA',                avSalary: '£12,471.00' },
    { id: 8, gradeCode: 'GD5', description: 'Grade 5',             avSalary: '£69,454.00' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingGradeId = null;
var grSortState = {
    key: null,
    direction: 'asc'
};

function parseGRSortValue(value, fieldKey) {
    if (fieldKey === 'avSalary') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    return String(value || '').toLowerCase();
}

function sortGRRecords() {
    if (!grSortState.key) {
        return;
    }

    var fieldKey = grSortState.key;
    var multiplier = grSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseGRSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseGRSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateGRSortIcons() {
    var headers = document.querySelectorAll('#tblGrade th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (grSortState.key === column) {
            header.classList.add(grSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = grSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleGRSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    grSortState.direction = grSortState.key === fieldKey && grSortState.direction === 'asc' ? 'desc' : 'asc';
    grSortState.key = fieldKey;
    currentPage = 1;
    sortGRRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupGRTableSorting() {
    var headers = document.querySelectorAll('#tblGrade th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleGRSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleGRSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateGRSortIcons();
}

function measureGRTextWidth(text, className) {
    var measurer = document.getElementById('gr-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'gr-width-measurer';
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

function getGRColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getGRColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureGRTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getGRColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureGRTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncGRColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getGRColumnMinimumWidth(table, header, columnKey);
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

function setupGRColumnResizing() {
    var table = document.getElementById('tblGrade');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncGRColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncGRColumnMinimumWidths(table, true);
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
    var tbody = document.getElementById('tblGradeBody');
    if (!tbody) { return; }
    sortGRRecords();
    updateGRSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblGradeBody', 4, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.gradeCode + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.description + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.avSalary + '</td>';
        html += '<td class="govuk-table__cell gr-actions-cell">';
        html += '<button class="gr-action-button" onclick=\'openTblGradeEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit grade ' + item.gradeCode + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit grade ' + item.gradeCode + '" width="20">';
        html += '</button>';
        html += '<button class="gr-action-button" onclick="handleTblGradeDelete(' + item.id + ')" aria-label="Delete grade ' + item.gradeCode + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete grade ' + item.gradeCode + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblGrade') && document.getElementById('tblGrade').dataset.resizeSized === 'true') {
        syncGRColumnMinimumWidths(document.getElementById('tblGrade'), true);
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

function openTblGradeAddModal() {
    editingGradeId = null;
    document.getElementById('tblGradeModalLabel').textContent = 'Add Grade';
    document.getElementById('tblGradeSaveBtn').classList.remove('gr-hidden');
    document.getElementById('tblGradeUpdateBtn').classList.add('gr-hidden');
    clearGradeModalValidation();
    document.getElementById('modal-grade-code').value = '';
    document.getElementById('modal-grade-description').value = '';
    document.getElementById('modal-grade-avsalary').value = '';
    openModal('tblGradeModal');
    document.getElementById('modal-grade-code').focus();
}

function openTblGradeEditModal(item) {
    editingGradeId = item.id;
    document.getElementById('tblGradeModalLabel').textContent = 'Edit Grade';
    document.getElementById('tblGradeSaveBtn').classList.add('gr-hidden');
    document.getElementById('tblGradeUpdateBtn').classList.remove('gr-hidden');
    clearGradeModalValidation();
    document.getElementById('modal-grade-code').value = item.gradeCode;
    document.getElementById('modal-grade-description').value = item.description;
    var salary = item.avSalary.replace('£', '').replace(/,/g, '');
    document.getElementById('modal-grade-avsalary').value = salary;
    openModal('tblGradeModal');
    document.getElementById('modal-grade-code').focus();
}

function closeTblGradeModal() {
    clearGradeModalValidation();
    closeModal('tblGradeModal');
    editingGradeId = null;
}

function clearGradeModalValidation() {
    document.querySelectorAll('#formTblGrade .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblGrade .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblGrade .govuk-input--error').forEach(function (field) {
        field.classList.remove('govuk-input--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showGradeFieldError(fieldId, message) {
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

    field.classList.add('govuk-input--error');
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

function validateGradeModal() {
    var errors = [];
    var code = document.getElementById('modal-grade-code').value.trim();
    var desc = document.getElementById('modal-grade-description').value.trim();
    var salary = document.getElementById('modal-grade-avsalary').value.trim();

    function isValidNumber(value) {
        return !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, '')));
    }

    clearGradeModalValidation();

    if (!code) { errors.push({ fieldId: 'modal-grade-code', message: 'Grade code is required' }); }
    if (!desc) { errors.push({ fieldId: 'modal-grade-description', message: 'Description is required' }); }
    if (!salary) {
        errors.push({ fieldId: 'modal-grade-avsalary', message: 'Average salary is required' });
    } else if (!isValidNumber(salary)) {
        errors.push({ fieldId: 'modal-grade-avsalary', message: 'Average salary must be a valid number' });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showGradeFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function saveTblGrade() {
    if (!validateGradeModal()) {
        return;
    }

    var code = document.getElementById('modal-grade-code').value.trim();
    var desc = document.getElementById('modal-grade-description').value.trim();
    var sal  = document.getElementById('modal-grade-avsalary').value.trim();
    if (!code) { document.getElementById('modal-grade-code').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    var salFormatted = sal ? '£' + parseFloat(sal.replace(/[^0-9.]/g, '')).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '£0.00';
    allRecords.push({ id: newId, gradeCode: code, description: desc, avSalary: salFormatted });
    filteredRecords = allRecords.slice();
    closeTblGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblGrade() {
    if (!validateGradeModal()) {
        return;
    }

    var code = document.getElementById('modal-grade-code').value.trim();
    var desc = document.getElementById('modal-grade-description').value.trim();
    var sal  = document.getElementById('modal-grade-avsalary').value.trim();
    if (!code) { document.getElementById('modal-grade-code').focus(); return; }
    var salFormatted = sal ? '£' + parseFloat(sal.replace(/[^0-9.]/g, '')).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '£0.00';
    allRecords = allRecords.map(function (r) {
        return r.id === editingGradeId ? { id: r.id, gradeCode: code, description: desc, avSalary: salFormatted } : r;
    });
    filteredRecords = filteredRecords.map(function (r) {
        return r.id === editingGradeId ? { id: r.id, gradeCode: code, description: desc, avSalary: salFormatted } : r;
    });
    closeTblGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblGradeDelete(id) {
    if (!window.confirm('Delete this grade record?')) { return; }
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
    setupGRTableSorting();
    setupGRColumnResizing();
});
