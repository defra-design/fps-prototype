'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, centre: 'ADMIN',     rcName: 'All Admin (support) Departments',         division: 'BSD',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id:  2, centre: 'BDU',       rcName: 'Business Development Unit',                division: 'BSD',    contributionTarget: '£0.00', rcHead: 'Busato, Claudio', emailRecipient: '' },
    { id:  3, centre: 'Corp Financ',rcName: 'Corp Finance, CAPS',                      division: 'BSD',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id:  4, centre: 'CorpOffice', rcName: 'Corporate Office Wey (Exec Support)',     division: 'BSD',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id:  5, centre: 'CSU',        rcName: 'Central Sequencing Unit',                 division: 'BSD',    contributionTarget: '£0.00', rcHead: 'Line, Kirsty',    emailRecipient: '' },
    { id:  6, centre: 'IDBAC',      rcName: 'INACTIVE',                                division: 'BSD',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id:  7, centre: 'IMT',        rcName: 'DSG part of DoES',                        division: 'BSD',    contributionTarget: '£0.00', rcHead: 'Mitchell, Andrew',emailRecipient: '' },
    { id:  8, centre: 'PDPM',       rcName: 'Project Delivery & Performance Mgmt',    division: 'BSD',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id:  9, centre: 'SHaW',       rcName: 'Health and Safety - SHaW',               division: 'BSD',    contributionTarget: '£0.00', rcHead: 'Bryant, David',   emailRecipient: '' },
    { id: 10, centre: 'CPD',        rcName: 'CONTINGENCY PLANNING DIVISION',           division: 'CPD',    contributionTarget: '£0.00', rcHead: 'Anderson, Joanna',emailRecipient: '' },
    { id: 11, centre: 'EU Exit',    rcName: 'EU Exit',                                 division: 'EU Exit',contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id: 12, centre: 'HNC',        rcName: 'Hard & Notional Charges',                division: 'HNC',    contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id: 13, centre: 'PHITR',      rcName: 'Plant Health ITR',                        division: 'INSP',   contributionTarget: '£0.00', rcHead: 'Walker, Justine', emailRecipient: '' },
    { id: 14, centre: 'PHSI-ERC',   rcName: 'East Region Central',                    division: 'INSP',   contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' },
    { id: 15, centre: 'PHSI-ERN',   rcName: 'East Region North',                      division: 'INSP',   contributionTarget: '£0.00', rcHead: '',                emailRecipient: '' }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingRCId = null;
var rcSortState = {
    key: null,
    direction: 'asc'
};

function parseRCSortValue(value, fieldKey) {
    if (fieldKey === 'contributionTarget') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    return String(value || '').toLowerCase();
}

function sortRCRecords() {
    if (!rcSortState.key) {
        return;
    }

    var fieldKey = rcSortState.key;
    var multiplier = rcSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseRCSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseRCSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateRCSortIcons() {
    var headers = document.querySelectorAll('#tblRC th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (rcSortState.key === column) {
            header.classList.add(rcSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');

            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = rcSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleRCSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    rcSortState.direction = rcSortState.key === fieldKey && rcSortState.direction === 'asc' ? 'desc' : 'asc';
    rcSortState.key = fieldKey;
    currentPage = 1;
    sortRCRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupRCTableSorting() {
    var headers = document.querySelectorAll('#tblRC th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleRCSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleRCSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateRCSortIcons();
}

function measureRCTextWidth(text, className) {
    var measurer = document.getElementById('rc-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'rc-width-measurer';
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

function getRCColumnValues(columnKey) {
    return filteredRecords.map(function (record) {
        return record[columnKey] || '';
    });
}

function getRCColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureRCTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getRCColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureRCTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncRCColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getRCColumnMinimumWidth(table, header, columnKey);
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

function setupRCColumnResizing() {
    var table = document.getElementById('tblRC');
    var wrapper = table ? table.parentElement : null;
    var allHeaders = table ? Array.prototype.slice.call(table.querySelectorAll('th')) : [];
    var headers = document.querySelectorAll('#tblRC th[data-column]');

    if (!table || !wrapper || !allHeaders.length) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncRCColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncRCColumnMinimumWidths(table, true);
    }

    headers.forEach(function (header) {
        if (!header.querySelector('.pp-resizer')) {
            var resizer = document.createElement('div');
            resizer.className = 'pp-resizer';
            resizer.innerHTML = '&nbsp;';
            header.appendChild(resizer);
        }
    });

    var resizers = document.querySelectorAll('#tblRC .pp-resizer');

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
    var tbody = document.getElementById('tblRCBody');
    if (!tbody) { return; }
    sortRCRecords();
    updateRCSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblRCBody', 7, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.centre + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.rcName + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.division + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.contributionTarget + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.rcHead + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.emailRecipient + '</td>';
        html += '<td class="govuk-table__cell" style="text-align: center;">';
        html += '<button onclick=\'openTblRCEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit resource centre ' + item.centre + '" style="background:none;border:none;cursor:pointer;padding:4px;">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit resource centre ' + item.centre + '" width="20">';
        html += '</button>';
        html += '<button onclick="handleTblRCDelete(' + item.id + ')" aria-label="Delete resource centre ' + item.centre + '" style="background:none;border:none;cursor:pointer;padding:4px;">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete resource centre ' + item.centre + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblRC') && document.getElementById('tblRC').dataset.resizeSized === 'true') {
        syncRCColumnMinimumWidths(document.getElementById('tblRC'), true);
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

function openTblRCAddModal() {
    editingRCId = null;
    document.getElementById('tblRCModalLabel').textContent = 'Add Resource Centre';
    document.getElementById('tblRCSaveBtn').textContent = 'Save';
    clearRCModalValidation();
    document.getElementById('modal-rc-centre').value = '';
    document.getElementById('modal-rc-name').value = '';
    document.getElementById('modal-rc-division').value = '';
    document.getElementById('modal-rc-contribtarget').value = '';
    document.getElementById('modal-rc-head').value = '-- Select --';
    document.getElementById('modal-rc-email').value = '';
    openModal('tblRCModal');
    document.getElementById('modal-rc-centre').focus();
}

function openTblRCEditModal(item) {
    editingRCId = item.id;
    document.getElementById('tblRCModalLabel').textContent = 'Edit Resource Centre';
    document.getElementById('tblRCSaveBtn').textContent = 'Save';
    clearRCModalValidation();
    document.getElementById('modal-rc-centre').value = item.centre;
    document.getElementById('modal-rc-name').value = item.rcName;
    document.getElementById('modal-rc-division').value = item.division;
    document.getElementById('modal-rc-contribtarget').value = item.contributionTarget.replace('£', '').replace(/,/g, '');
    document.getElementById('modal-rc-head').value = item.rcHead || '';
    document.getElementById('modal-rc-email').value = item.emailRecipient;
    openModal('tblRCModal');
    document.getElementById('modal-rc-centre').focus();
}

function closeTblRCModal() {
    clearRCModalValidation();
    closeModal('tblRCModal');
    editingRCId = null;
}

function clearRCModalValidation() {
    document.querySelectorAll('#formTblRC .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblRC .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblRC .govuk-input--error, #formTblRC .govuk-select--error').forEach(function (field) {
        field.classList.remove('govuk-input--error', 'govuk-select--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showRCFieldError(fieldId, message) {
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

function validateRCModal() {
    var errors = [];
    var centre = document.getElementById('modal-rc-centre').value.trim();
    var rcName = document.getElementById('modal-rc-name').value.trim();
    var division = document.getElementById('modal-rc-division').value;
    var contribution = document.getElementById('modal-rc-contribtarget').value.trim();
    var rcHead = document.getElementById('modal-rc-head').value;
    var email = document.getElementById('modal-rc-email').value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function isValidNumber(value) {
        return !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, '')));
    }

    clearRCModalValidation();

    if (!centre) { errors.push({ fieldId: 'modal-rc-centre', message: 'Centre is required' }); }
    if (!rcName) { errors.push({ fieldId: 'modal-rc-name', message: 'RC name is required' }); }
    if (!division) { errors.push({ fieldId: 'modal-rc-division', message: 'Division is required' }); }
    if (!contribution) {
        errors.push({ fieldId: 'modal-rc-contribtarget', message: 'Contribution target is required' });
    } else if (!isValidNumber(contribution)) {
        errors.push({ fieldId: 'modal-rc-contribtarget', message: 'Contribution target must be a valid number' });
    }
    if (!rcHead) { errors.push({ fieldId: 'modal-rc-head', message: 'RC head is required' }); }
    if (!email) {
        errors.push({ fieldId: 'modal-rc-email', message: 'Email recipient is required' });
    } else if (!emailPattern.test(email)) {
        errors.push({ fieldId: 'modal-rc-email', message: 'Email recipient must be a valid email address' });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showRCFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildRCRecord(id) {
    var ct = document.getElementById('modal-rc-contribtarget').value.trim();
    var num = parseFloat(ct.replace(/[^0-9.]/g, ''));
    return {
        id: id,
        centre:             document.getElementById('modal-rc-centre').value.trim(),
        rcName:             document.getElementById('modal-rc-name').value.trim(),
        division:           document.getElementById('modal-rc-division').value,
        contributionTarget: isNaN(num) ? '£0.00' : '£' + num.toFixed(2),
        rcHead:             document.getElementById('modal-rc-head').value.trim(),
        emailRecipient:     document.getElementById('modal-rc-email').value.trim()
    };
}

function handleTblRCSave() {
    if (!validateRCModal()) {
        return;
    }

    if (editingRCId === null) {
        saveTblRC();
        return;
    }
    updateTblRC();
}

function saveTblRC() {
    var centre = document.getElementById('modal-rc-centre').value.trim();
    if (!centre) { document.getElementById('modal-rc-centre').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildRCRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblRCModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblRC() {
    var centre = document.getElementById('modal-rc-centre').value.trim();
    if (!centre) { document.getElementById('modal-rc-centre').focus(); return; }
    var updated = buildRCRecord(editingRCId);
    allRecords      = allRecords.map(function (r) { return r.id === editingRCId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingRCId ? updated : r; });
    closeTblRCModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function handleTblRCDelete(id) {
    if (!window.confirm('Delete this resource centre record?')) { return; }
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
    setupRCTableSorting();
    setupRCColumnResizing();
});
