'use strict';

/* Sample data — rows for RC Grade maintenance */
var allRecords = [
    { id: 1, rcGrade: 'A-ADMIN', divisionGrade: 'A-R&D', grade: 'A', rc: 'ADMIN', chargeRate: '£129.72', directRate: '£0.00', payRate: '£70.90', npr: '£24.32', ohr: '£34.50', hrsAvail: '0' },
    { id: 2, rcGrade: 'C-ADMIN', divisionGrade: 'C-R&D', grade: 'C', rc: 'ADMIN', chargeRate: '£95.26', directRate: '£0.00', payRate: '£52.06', npr: '£17.86', ohr: '£25.34', hrsAvail: '0' },
    { id: 3, rcGrade: 'D-Admin', divisionGrade: 'D-BSD', grade: 'D', rc: 'ADMIN', chargeRate: '£80.27', directRate: '£0.00', payRate: '£43.88', npr: '£15.05', ohr: '£21.34', hrsAvail: '0' },
    { id: 4, rcGrade: 'E-Admin', divisionGrade: 'E-BSD', grade: 'E', rc: 'ADMIN', chargeRate: '£72.96', directRate: '£0.00', payRate: '£39.51', npr: '£13.83', ohr: '£19.62', hrsAvail: '0' },
    { id: 5, rcGrade: 'F-Admin', divisionGrade: 'F-BSD', grade: 'F', rc: 'ADMIN', chargeRate: '£56.29', directRate: '£0.00', payRate: '£33.37', npr: '£13.61', ohr: '£19.31', hrsAvail: '0' },
    { id: 6, rcGrade: 'A_APH SCA', divisionGrade: 'A_APH SCA', grade: 'A', rc: 'APH SCA', chargeRate: '£129.72', directRate: '£0.00', payRate: '£70.90', npr: '£24.32', ohr: '£34.50', hrsAvail: '0' },
    { id: 7, rcGrade: 'B_APH SCA', divisionGrade: 'B_APH SCA', grade: 'B', rc: 'APH SCA', chargeRate: '£115.43', directRate: '£0.00', payRate: '£53.09', npr: '£21.64', ohr: '£30.70', hrsAvail: '0' },
    { id: 8, rcGrade: 'C_APH SCA', divisionGrade: 'C_APH SCA', grade: 'C', rc: 'APH SCA', chargeRate: '£95.26', directRate: '£0.00', payRate: '£52.06', npr: '£17.86', ohr: '£25.34', hrsAvail: '0' },
    { id: 9, rcGrade: 'D_APH SCA', divisionGrade: 'D_APH SCA', grade: 'D', rc: 'APH SCA', chargeRate: '£80.27', directRate: '£0.00', payRate: '£43.88', npr: '£15.05', ohr: '£21.34', hrsAvail: '0' },
    { id: 10, rcGrade: 'E_APH SCA', divisionGrade: 'E_APH SCA', grade: 'E', rc: 'APH SCA', chargeRate: '£72.96', directRate: '£0.00', payRate: '£39.51', npr: '£13.83', ohr: '£19.62', hrsAvail: '0' },
    { id: 11, rcGrade: 'F_ACH SCA', divisionGrade: 'F_ACH SCA', grade: 'F', rc: 'APH SCA', chargeRate: '£66.29', directRate: '£0.00', payRate: '£33.37', npr: '£13.61', ohr: '£19.31', hrsAvail: '0' },
    { id: 12, rcGrade: 'A-ASU', divisionGrade: 'A-R&D', grade: 'A', rc: 'ASU', chargeRate: '£129.72', directRate: '£0.00', payRate: '£70.90', npr: '£24.32', ohr: '£34.50', hrsAvail: '0' },
    { id: 13, rcGrade: 'B-ASU', divisionGrade: 'B-R&D', grade: 'B', rc: 'ASU', chargeRate: '£115.43', directRate: '£0.00', payRate: '£63.09', npr: '£21.64', ohr: '£30.70', hrsAvail: '0' },
    { id: 14, rcGrade: 'C-ASU', divisionGrade: 'C-R&D', grade: 'C', rc: 'ASU', chargeRate: '£95.26', directRate: '£0.00', payRate: '£52.06', npr: '£17.86', ohr: '£25.34', hrsAvail: '0' },
    { id: 15, rcGrade: 'D-ASU', divisionGrade: 'D-R&D', grade: 'D', rc: 'ASU', chargeRate: '£80.27', directRate: '£0.00', payRate: '£43.88', npr: '£15.05', ohr: '£21.34', hrsAvail: '0' },
    { id: 16, rcGrade: 'E-ASU', divisionGrade: 'E-R&D', grade: 'E', rc: 'ASU', chargeRate: '£72.96', directRate: '£0.00', payRate: '£39.51', npr: '£13.83', ohr: '£13.62', hrsAvail: '0' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingRCGradeId = null;
var rcgSortState = {
    key: null,
    direction: 'asc'
};

function parseRCGSortValue(value, fieldKey) {
    if (fieldKey === 'chargeRate' || fieldKey === 'directRate' || fieldKey === 'payRate' || fieldKey === 'npr' || fieldKey === 'ohr') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    if (fieldKey === 'hrsAvail') {
        return Number(value || 0);
    }

    return String(value || '').toLowerCase();
}

function sortRCGRecords() {
    if (!rcgSortState.key) {
        return;
    }

    var fieldKey = rcgSortState.key;
    var multiplier = rcgSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseRCGSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseRCGSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateRCGSortIcons() {
    var headers = document.querySelectorAll('#tblRCGrade th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (rcgSortState.key === column) {
            header.classList.add(rcgSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = rcgSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleRCGSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    rcgSortState.direction = rcgSortState.key === fieldKey && rcgSortState.direction === 'asc' ? 'desc' : 'asc';
    rcgSortState.key = fieldKey;
    currentPage = 1;
    sortRCGRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupRCGTableSorting() {
    var headers = document.querySelectorAll('#tblRCGrade th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleRCGSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleRCGSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateRCGSortIcons();
}

function measureRCGTextWidth(text, className) {
    var measurer = document.getElementById('rcg-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'rcg-width-measurer';
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

function getRCGColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getRCGColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureRCGTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getRCGColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureRCGTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncRCGColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getRCGColumnMinimumWidth(table, header, columnKey);
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

function setupRCGColumnResizing() {
    var table = document.getElementById('tblRCGrade');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncRCGColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncRCGColumnMinimumWidths(table, true);
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

function fmtRate(val) {
    var n = parseFloat((val || '').replace(/[^0-9.]/g, ''));
    return isNaN(n) ? '£0.00' : '£' + n.toFixed(2);
}

function renderTable() {
    var tbody = document.getElementById('tblRCGradeBody');
    if (!tbody) { return; }
    sortRCGRecords();
    updateRCGSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblRCGradeBody', 11, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.rcGrade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.divisionGrade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.grade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.rc + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.chargeRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.directRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.payRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.npr + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.ohr + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.hrsAvail + '</td>';
        html += '<td class="govuk-table__cell rcg-actions-cell">';
        html += '<button class="rcg-action-button" onclick=\'openTblRCGradeEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit RC grade ' + item.rcGrade + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit RC grade ' + item.rcGrade + '" width="20">';
        html += '</button>';
        html += '<button class="rcg-action-button" onclick="handleTblRCGradeDelete(' + item.id + ')" aria-label="Delete RC grade ' + item.rcGrade + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete RC grade ' + item.rcGrade + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblRCGrade') && document.getElementById('tblRCGrade').dataset.resizeSized === 'true') {
        syncRCGColumnMinimumWidths(document.getElementById('tblRCGrade'), true);
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

function openTblRCGradeAddModal() {
    editingRCGradeId = null;
    document.getElementById('tblRCGradeModalLabel').textContent = 'Add RC Grade';
    document.getElementById('tblRCGradeSaveBtn').classList.remove('rcg-hidden');
    document.getElementById('tblRCGradeUpdateBtn').classList.add('rcg-hidden');
    clearRCGradeModalValidation();
    ['modal-rcg-rcgrade','modal-rcg-divgrade','modal-rcg-grade','modal-rcg-rc',
     'modal-rcg-chargerate','modal-rcg-directrate','modal-rcg-payrate',
     'modal-rcg-npr','modal-rcg-ohr','modal-rcg-hrsavail'].forEach(function (id) {
        document.getElementById(id).value = '';
    });
    openModal('tblRCGradeModal');
    document.getElementById('modal-rcg-rcgrade').focus();
}

function openTblRCGradeEditModal(item) {
    editingRCGradeId = item.id;
    document.getElementById('tblRCGradeModalLabel').textContent = 'Edit RC Grade';
    document.getElementById('tblRCGradeSaveBtn').classList.add('rcg-hidden');
    document.getElementById('tblRCGradeUpdateBtn').classList.remove('rcg-hidden');
    clearRCGradeModalValidation();
    document.getElementById('modal-rcg-rcgrade').value     = item.rcGrade;
    document.getElementById('modal-rcg-divgrade').value    = item.divisionGrade;
    document.getElementById('modal-rcg-grade').value       = item.grade;
    document.getElementById('modal-rcg-rc').value          = item.rc;
    document.getElementById('modal-rcg-chargerate').value  = item.chargeRate.replace('£','');
    document.getElementById('modal-rcg-directrate').value  = item.directRate.replace('£','');
    document.getElementById('modal-rcg-payrate').value     = item.payRate.replace('£','');
    document.getElementById('modal-rcg-npr').value         = item.npr.replace('£','');
    document.getElementById('modal-rcg-ohr').value         = item.ohr.replace('£','');
    document.getElementById('modal-rcg-hrsavail').value    = item.hrsAvail;
    openModal('tblRCGradeModal');
    document.getElementById('modal-rcg-rcgrade').focus();
}

function closeTblRCGradeModal() {
    clearRCGradeModalValidation();
    closeModal('tblRCGradeModal');
    editingRCGradeId = null;
}

function clearRCGradeModalValidation() {
    document.querySelectorAll('#formTblRCGrade .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblRCGrade .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblRCGrade .govuk-input--error, #formTblRCGrade .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-input--error', 'govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showRCGradeFieldError(fieldId, message) {
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

function validateRCGradeModal() {
    var errors = [];
    var rcGrade = document.getElementById('modal-rcg-rcgrade').value.trim();
    var divisionGrade = document.getElementById('modal-rcg-divgrade').value;
    var grade = document.getElementById('modal-rcg-grade').value;
    var rc = document.getElementById('modal-rcg-rc').value;
    var chargeRate = document.getElementById('modal-rcg-chargerate').value.trim();
    var directRate = document.getElementById('modal-rcg-directrate').value.trim();
    var payRate = document.getElementById('modal-rcg-payrate').value.trim();
    var npr = document.getElementById('modal-rcg-npr').value.trim();
    var ohr = document.getElementById('modal-rcg-ohr').value.trim();
    var hrsAvail = document.getElementById('modal-rcg-hrsavail').value.trim();

    function isValidNumber(value) {
        return !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, '')));
    }

    clearRCGradeModalValidation();

    if (!rcGrade) { errors.push({ fieldId: 'modal-rcg-rcgrade', message: 'RC grade is required' }); }
    if (!divisionGrade) { errors.push({ fieldId: 'modal-rcg-divgrade', message: 'Division grade is required' }); }
    if (!grade) { errors.push({ fieldId: 'modal-rcg-grade', message: 'Grade is required' }); }
    if (!rc) { errors.push({ fieldId: 'modal-rcg-rc', message: 'Resource centre is required' }); }

    [
        { id: 'modal-rcg-chargerate', value: chargeRate, label: 'Charge rate' },
        { id: 'modal-rcg-directrate', value: directRate, label: 'Direct rate' },
        { id: 'modal-rcg-payrate', value: payRate, label: 'Pay rate' },
        { id: 'modal-rcg-npr', value: npr, label: 'NPR' },
        { id: 'modal-rcg-ohr', value: ohr, label: 'OHR' },
        { id: 'modal-rcg-hrsavail', value: hrsAvail, label: 'Hours available' }
    ].forEach(function (item) {
        if (!item.value) {
            errors.push({ fieldId: item.id, message: item.label + ' is required' });
        } else if (!isValidNumber(item.value)) {
            errors.push({ fieldId: item.id, message: item.label + ' must be a valid number' });
        }
    });

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showRCGradeFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildRCGradeRecord(id) {
    return {
        id: id,
        rcGrade:    document.getElementById('modal-rcg-rcgrade').value.trim(),
        divisionGrade: document.getElementById('modal-rcg-divgrade').value,
        grade:      document.getElementById('modal-rcg-grade').value,
        rc:         document.getElementById('modal-rcg-rc').value,
        chargeRate: fmtRate(document.getElementById('modal-rcg-chargerate').value),
        directRate: fmtRate(document.getElementById('modal-rcg-directrate').value),
        payRate:    fmtRate(document.getElementById('modal-rcg-payrate').value),
        npr:        fmtRate(document.getElementById('modal-rcg-npr').value),
        ohr:        fmtRate(document.getElementById('modal-rcg-ohr').value),
        hrsAvail:   document.getElementById('modal-rcg-hrsavail').value
    };
}

function saveTblRCGrade() {
    if (!validateRCGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-rcg-rcgrade').value.trim()) {
        document.getElementById('modal-rcg-rcgrade').focus(); return;
    }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildRCGradeRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblRCGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblRCGrade() {
    if (!validateRCGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-rcg-rcgrade').value.trim()) {
        document.getElementById('modal-rcg-rcgrade').focus(); return;
    }
    var updated = buildRCGradeRecord(editingRCGradeId);
    allRecords      = allRecords.map(function (r) { return r.id === editingRCGradeId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingRCGradeId ? updated : r; });
    closeTblRCGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblRCGradeDelete(id) {
    if (!window.confirm('Delete this RC grade record?')) { return; }
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
    setupRCGTableSorting();
    setupRCGColumnResizing();
});
