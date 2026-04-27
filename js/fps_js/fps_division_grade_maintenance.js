'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, divGrade: 'A_APH SC', gradeCode: 'A', division: 'R&D',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  2, divGrade: 'A_DIU',    gradeCode: 'A', division: 'SPI',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  3, divGrade: 'A_EUExit', gradeCode: 'A', division: 'EU Exit', chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  4, divGrade: 'A_Field',  gradeCode: 'A', division: 'Ops',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  5, divGrade: 'A_INSP',   gradeCode: 'A', division: 'INSP',    chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  6, divGrade: 'A_PH-B-A', gradeCode: 'A', division: 'PH-B-Adv',chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  7, divGrade: 'A_PHINSI', gradeCode: 'A', division: 'INSP',    chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  8, divGrade: 'A_SPI',    gradeCode: 'A', division: 'SPI',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id:  9, divGrade: 'A-BSD',    gradeCode: 'A', division: 'BSD',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 10, divGrade: 'A-CSG',    gradeCode: 'A', division: 'R&D',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 11, divGrade: 'A-H&S',    gradeCode: 'A', division: 'BSD',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 12, divGrade: 'A-Ops',    gradeCode: 'A', division: 'Ops',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 13, divGrade: 'A-R&D',    gradeCode: 'A', division: 'R&D',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 14, divGrade: 'A-Surv',   gradeCode: 'A', division: 'Surv',    chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 15, divGrade: 'A-Vet Dir',gradeCode: 'A', division: 'Vet',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 16, divGrade: 'B_APH SC', gradeCode: 'B', division: 'R&D',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 17, divGrade: 'B_DIU',    gradeCode: 'B', division: 'SPI',     chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' },
    { id: 18, divGrade: 'B_EUExit', gradeCode: 'B', division: 'EU Exit', chargeRate: '£0.00', directRate: '£0.00', payRate: '£0.00', npr: '£0.00', ohr: '£0.00' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingDivGradeId = null;
var dgSortState = {
    key: null,
    direction: 'asc'
};

function parseDGSortValue(value, fieldKey) {
    if (fieldKey === 'chargeRate' || fieldKey === 'directRate' || fieldKey === 'payRate' || fieldKey === 'npr' || fieldKey === 'ohr') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    return String(value || '').toLowerCase();
}

function sortDGRecords() {
    if (!dgSortState.key) {
        return;
    }

    var fieldKey = dgSortState.key;
    var multiplier = dgSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseDGSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseDGSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateDGSortIcons() {
    var headers = document.querySelectorAll('#tblDivGrade th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (dgSortState.key === column) {
            header.classList.add(dgSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = dgSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleDGSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    dgSortState.direction = dgSortState.key === fieldKey && dgSortState.direction === 'asc' ? 'desc' : 'asc';
    dgSortState.key = fieldKey;
    currentPage = 1;
    sortDGRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupDGTableSorting() {
    var headers = document.querySelectorAll('#tblDivGrade th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleDGSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleDGSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateDGSortIcons();
}

function measureDGTextWidth(text, className) {
    var measurer = document.getElementById('dg-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'dg-width-measurer';
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

function getDGColumnValues(columnKey) {
    return allRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getDGColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureDGTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getDGColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureDGTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncDGColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getDGColumnMinimumWidth(table, header, columnKey);
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

function setupDGColumnResizing() {
    var table = document.getElementById('tblDivGrade');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncDGColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncDGColumnMinimumWidths(table, true);
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
    var tbody = document.getElementById('tblDivGradeBody');
    if (!tbody) { return; }
    sortDGRecords();
    updateDGSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblDivGradeBody', 9, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.divGrade + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.gradeCode + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.division + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.chargeRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.directRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.payRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.npr + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.ohr + '</td>';
        html += '<td class="govuk-table__cell dg-actions-cell">';
        html += '<button class="dg-action-button" onclick=\'openTblDivGradeEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit division grade ' + item.divGrade + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit division grade ' + item.divGrade + '" width="20">';
        html += '</button>';
        html += '<button class="dg-action-button" onclick="handleTblDivGradeDelete(' + item.id + ')" aria-label="Delete division grade ' + item.divGrade + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete division grade ' + item.divGrade + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblDivGrade') && document.getElementById('tblDivGrade').dataset.resizeSized === 'true') {
        syncDGColumnMinimumWidths(document.getElementById('tblDivGrade'), true);
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

function openTblDivGradeAddModal() {
    editingDivGradeId = null;
    document.getElementById('tblDivGradeModalLabel').textContent = 'Add Division Grade';
    document.getElementById('tblDivGradeSaveBtn').classList.remove('dg-hidden');
    document.getElementById('tblDivGradeUpdateBtn').classList.add('dg-hidden');
    clearDivGradeModalValidation();
    ['modal-dg-divgrade','modal-dg-gradecode','modal-dg-division',
     'modal-dg-chargerate','modal-dg-directrate','modal-dg-payrate',
     'modal-dg-npr','modal-dg-ohr'].forEach(function (id) {
        document.getElementById(id).value = '';
    });
    openModal('tblDivGradeModal');
    document.getElementById('modal-dg-divgrade').focus();
}

function openTblDivGradeEditModal(item) {
    editingDivGradeId = item.id;
    document.getElementById('tblDivGradeModalLabel').textContent = 'Edit Division Grade';
    document.getElementById('tblDivGradeSaveBtn').classList.add('dg-hidden');
    document.getElementById('tblDivGradeUpdateBtn').classList.remove('dg-hidden');
    clearDivGradeModalValidation();
    document.getElementById('modal-dg-divgrade').value    = item.divGrade;
    document.getElementById('modal-dg-gradecode').value   = item.gradeCode;
    document.getElementById('modal-dg-division').value    = item.division;
    document.getElementById('modal-dg-chargerate').value  = item.chargeRate.replace('£','');
    document.getElementById('modal-dg-directrate').value  = item.directRate.replace('£','');
    document.getElementById('modal-dg-payrate').value     = item.payRate.replace('£','');
    document.getElementById('modal-dg-npr').value         = item.npr.replace('£','');
    document.getElementById('modal-dg-ohr').value         = item.ohr.replace('£','');
    openModal('tblDivGradeModal');
    document.getElementById('modal-dg-divgrade').focus();
}

function closeTblDivGradeModal() {
    clearDivGradeModalValidation();
    closeModal('tblDivGradeModal');
    editingDivGradeId = null;
}

function clearDivGradeModalValidation() {
    document.querySelectorAll('#formTblDivGrade .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblDivGrade .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblDivGrade .govuk-input--error, #formTblDivGrade .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-input--error', 'govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showDivGradeFieldError(fieldId, message) {
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

function validateDivGradeModal() {
    var errors = [];
    var divGrade = document.getElementById('modal-dg-divgrade').value.trim();
    var gradeCode = document.getElementById('modal-dg-gradecode').value;
    var division = document.getElementById('modal-dg-division').value;
    var chargeRate = document.getElementById('modal-dg-chargerate').value.trim();
    var directRate = document.getElementById('modal-dg-directrate').value.trim();
    var payRate = document.getElementById('modal-dg-payrate').value.trim();
    var npr = document.getElementById('modal-dg-npr').value.trim();
    var ohr = document.getElementById('modal-dg-ohr').value.trim();

    function isValidNumber(value) {
        return !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, '')));
    }

    clearDivGradeModalValidation();

    if (!divGrade) { errors.push({ fieldId: 'modal-dg-divgrade', message: 'Division grade is required' }); }
    if (!gradeCode) { errors.push({ fieldId: 'modal-dg-gradecode', message: 'Grade code is required' }); }
    if (!division) { errors.push({ fieldId: 'modal-dg-division', message: 'Division is required' }); }

    [
        { id: 'modal-dg-chargerate', value: chargeRate, label: 'Charge rate' },
        { id: 'modal-dg-directrate', value: directRate, label: 'Direct rate' },
        { id: 'modal-dg-payrate', value: payRate, label: 'Pay rate' },
        { id: 'modal-dg-npr', value: npr, label: 'NPR' },
        { id: 'modal-dg-ohr', value: ohr, label: 'OHR' }
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
        showDivGradeFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildDivGradeRecord(id) {
    return {
        id: id,
        divGrade:   document.getElementById('modal-dg-divgrade').value.trim(),
        gradeCode:  document.getElementById('modal-dg-gradecode').value,
        division:   document.getElementById('modal-dg-division').value,
        chargeRate: fmtRate(document.getElementById('modal-dg-chargerate').value),
        directRate: fmtRate(document.getElementById('modal-dg-directrate').value),
        payRate:    fmtRate(document.getElementById('modal-dg-payrate').value),
        npr:        fmtRate(document.getElementById('modal-dg-npr').value),
        ohr:        fmtRate(document.getElementById('modal-dg-ohr').value)
    };
}

function saveTblDivGrade() {
    if (!validateDivGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-dg-divgrade').value.trim()) {
        document.getElementById('modal-dg-divgrade').focus(); return;
    }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildDivGradeRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblDivGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblDivGrade() {
    if (!validateDivGradeModal()) {
        return;
    }

    if (!document.getElementById('modal-dg-divgrade').value.trim()) {
        document.getElementById('modal-dg-divgrade').focus(); return;
    }
    var updated = buildDivGradeRecord(editingDivGradeId);
    allRecords      = allRecords.map(function (r) { return r.id === editingDivGradeId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingDivGradeId ? updated : r; });
    closeTblDivGradeModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblDivGradeDelete(id) {
    if (!window.confirm('Delete this division grade record?')) { return; }
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
    setupDGTableSorting();
    setupDGColumnResizing();
});
