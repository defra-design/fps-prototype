'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, accShortName: 'Animals',        accountDescription: 'Operating Consumables',           constituentAccountCodes: '5224101311', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: false },
    { id:  2, accShortName: 'AnimalSup',       accountDescription: 'Animal supplies',                 constituentAccountCodes: '2841-2849',  accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id:  3, accShortName: 'AnimalSupps',     accountDescription: 'Operating Consumables',           constituentAccountCodes: '5224101312', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: false },
    { id:  4, accShortName: 'BuildMaint',      accountDescription: 'Building Maintenance',            constituentAccountCodes: '2221-2224',  accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id:  5, accShortName: 'BusCons',         accountDescription: 'Business Consultancy',            constituentAccountCodes: '2703',       accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id:  6, accShortName: 'Cap',             accountDescription: 'Capital Charges',                 constituentAccountCodes: '2211',       accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id:  7, accShortName: 'Cloth',           accountDescription: 'Clothing',                        constituentAccountCodes: '2131-2132',  accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id:  8, accShortName: 'ConfFee',         accountDescription: 'Staff Support',                   constituentAccountCodes: '5212100004', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: false },
    { id:  9, accShortName: 'Consultancy',     accountDescription: 'Consultancy',                     constituentAccountCodes: '5211200000', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: false },
    { id: 10, accShortName: 'Consumables',     accountDescription: 'Operating Consumables',           constituentAccountCodes: '5224101309', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: false },
    { id: 11, accShortName: 'ContAcc',         accountDescription: 'Contract Services - Accommodation',constituentAccountCodes: '2241-2249', accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  },
    { id: 12, accShortName: 'Courier and Post',accountDescription: 'Courier and Postage Costs',       constituentAccountCodes: '5217100002', accountType: 'NPRC', forProjectSpecificCosts: true,  forResourceCentres: true  },
    { id: 13, accShortName: 'Equip',           accountDescription: 'Equipment Purchases (1500-12000)',constituentAccountCodes: '2441-2446',  accountType: 'NPRC', forProjectSpecificCosts: false, forResourceCentres: true  }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingAccCatId = null;

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

function applyFilters() {
    var filterType = 'all';
    var radios = document.querySelectorAll('input[name="filterType"]');
    radios.forEach(function (r) { if (r.checked) { filterType = r.value; } });

    if (filterType === 'rc') {
        filteredRecords = allRecords.filter(function (r) { return r.forResourceCentres; });
    } else if (filterType === 'ps') {
        filteredRecords = allRecords.filter(function (r) { return r.forProjectSpecificCosts; });
    } else {
        filteredRecords = allRecords.slice();
    }

    if (typeof applyCurrentSort === 'function') {
        applyCurrentSort();
    }
    currentPage = 1;
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}



function renderTable() {
    var tbody = document.getElementById('tblAccCatBody');
    if (!tbody) { return; }
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblAccCatBody', 7, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        var fpscChecked = item.forProjectSpecificCosts ? ' checked' : '';
        var frcChecked  = item.forResourceCentres ? ' checked' : '';
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.accShortName + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.accountDescription + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.constituentAccountCodes + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.accountType + '</td>';
        html += '<td class="govuk-table__cell ac-actions-cell">';
        html += '<div class="govuk-checkboxes govuk-checkboxes--small ac-table-checkboxes">';
        html += '<div class="govuk-checkboxes__item">';
        html += '<input class="govuk-checkboxes__input" id="ac-fpsc-' + item.id + '" type="checkbox"' + fpscChecked + ' onchange="toggleForProjectSpecificCosts(' + item.id + ', this.checked)">';
        html += '<label class="govuk-label govuk-checkboxes__label" for="ac-fpsc-' + item.id + '"><span class="govuk-visually-hidden">For project specific costs</span></label>';
        html += '</div></div></td>';
        html += '<td class="govuk-table__cell ac-actions-cell">';
        html += '<div class="govuk-checkboxes govuk-checkboxes--small ac-table-checkboxes">';
        html += '<div class="govuk-checkboxes__item">';
        html += '<input class="govuk-checkboxes__input" id="ac-frc-' + item.id + '" type="checkbox"' + frcChecked + ' onchange="toggleForResourceCentres(' + item.id + ', this.checked)">';
        html += '<label class="govuk-label govuk-checkboxes__label" for="ac-frc-' + item.id + '"><span class="govuk-visually-hidden">For resource centres</span></label>';
        html += '</div></div></td>';
        html += '<td class="govuk-table__cell ac-actions-cell">';
        html += '<button class="ac-action-button" onclick=\'openTblAccCatEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit account category ' + item.accShortName + '">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit account category ' + item.accShortName + '" width="20">';
        html += '</button>';
        html += '<button class="ac-action-button" onclick="handleTblAccCatDelete(' + item.id + ')" aria-label="Delete account category ' + item.accShortName + '">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete account category ' + item.accShortName + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblAccCat') && document.getElementById('tblAccCat').dataset.resizeSized === 'true') {
        syncAccCatColumnMinimumWidths(document.getElementById('tblAccCat'), true);
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

function openTblAccCatAddModal() {
    editingAccCatId = null;
    document.getElementById('tblAccCatModalLabel').textContent = 'Add Account Category';
    document.getElementById('tblAccCatSaveBtn').classList.remove('ac-hidden');
    document.getElementById('tblAccCatUpdateBtn').classList.add('ac-hidden');
    clearAccCatModalValidation();
    document.getElementById('modal-ac-shortname').value = '';
    document.getElementById('modal-ac-description').value = '';
    document.getElementById('modal-ac-codes').value = '';
    document.getElementById('modal-ac-type').value = '';
    document.getElementById('modal-ac-forps').checked = false;
    document.getElementById('modal-ac-forrc').checked = false;
    openModal('tblAccCatModal');
    document.getElementById('modal-ac-shortname').focus();
}

function openTblAccCatEditModal(item) {
    editingAccCatId = item.id;
    document.getElementById('tblAccCatModalLabel').textContent = 'Edit Account Category';
    document.getElementById('tblAccCatSaveBtn').classList.add('ac-hidden');
    document.getElementById('tblAccCatUpdateBtn').classList.remove('ac-hidden');
    clearAccCatModalValidation();
    document.getElementById('modal-ac-shortname').value = item.accShortName;
    document.getElementById('modal-ac-description').value = item.accountDescription;
    document.getElementById('modal-ac-codes').value = item.constituentAccountCodes;
    document.getElementById('modal-ac-type').value = item.accountType;
    document.getElementById('modal-ac-forps').checked = item.forProjectSpecificCosts;
    document.getElementById('modal-ac-forrc').checked = item.forResourceCentres;
    openModal('tblAccCatModal');
    document.getElementById('modal-ac-shortname').focus();
}

function closeTblAccCatModal() {
    clearAccCatModalValidation();
    closeModal('tblAccCatModal');
    editingAccCatId = null;
}

function clearAccCatModalValidation() {
    document.querySelectorAll('#formTblAccCat .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblAccCat .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblAccCat .govuk-input--error').forEach(function (field) {
        field.classList.remove('govuk-input--error');
        field.removeAttribute('aria-invalid');
        if (field.dataset.baseDescribedby) {
            field.setAttribute('aria-describedby', field.dataset.baseDescribedby);
        } else {
            field.removeAttribute('aria-describedby');
        }
    });
}

function showAccCatFieldError(fieldId, message) {
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

    field.classList.add('govuk-input--error');
    field.setAttribute('aria-invalid', 'true');

    errorMessage.className = 'govuk-error-message';
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;
    field.insertAdjacentElement('afterend', errorMessage);

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + ' ' + errorId : errorId;
    field.setAttribute('aria-describedby', describedBy.trim());
}

function validateAccCatModal() {
    var errors = [];
    var shortName = document.getElementById('modal-ac-shortname').value.trim();
    var description = document.getElementById('modal-ac-description').value.trim();
    var codes = document.getElementById('modal-ac-codes').value.trim();
    var type = document.getElementById('modal-ac-type').value.trim();

    clearAccCatModalValidation();

    if (!shortName) { errors.push({ fieldId: 'modal-ac-shortname', message: 'Acc short name is required' }); }
    if (!description) { errors.push({ fieldId: 'modal-ac-description', message: 'Account description is required' }); }
    if (!codes) { errors.push({ fieldId: 'modal-ac-codes', message: 'Constituent account codes are required' }); }
    if (!type) { errors.push({ fieldId: 'modal-ac-type', message: 'Account type is required' }); }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showAccCatFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function buildAccCatRecord(id) {
    return {
        id: id,
        accShortName:             document.getElementById('modal-ac-shortname').value.trim(),
        accountDescription:       document.getElementById('modal-ac-description').value.trim(),
        constituentAccountCodes:  document.getElementById('modal-ac-codes').value.trim(),
        accountType:              document.getElementById('modal-ac-type').value.trim(),
        forProjectSpecificCosts:  document.getElementById('modal-ac-forps').checked,
        forResourceCentres:       document.getElementById('modal-ac-forrc').checked
    };
}

function saveTblAccCat() {
    if (!validateAccCatModal()) {
        return;
    }

    var name = document.getElementById('modal-ac-shortname').value.trim();
    if (!name) { document.getElementById('modal-ac-shortname').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push(buildAccCatRecord(newId));
    filteredRecords = allRecords.slice();
    closeTblAccCatModal();
    applyFilters();
}

function updateTblAccCat() {
    if (!validateAccCatModal()) {
        return;
    }

    var name = document.getElementById('modal-ac-shortname').value.trim();
    if (!name) { document.getElementById('modal-ac-shortname').focus(); return; }
    var updated = buildAccCatRecord(editingAccCatId);
    allRecords      = allRecords.map(function (r) { return r.id === editingAccCatId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingAccCatId ? updated : r; });
    closeTblAccCatModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function toggleForProjectSpecificCosts(id, checked) {
    allRecords = allRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { forProjectSpecificCosts: checked }) : r;
    });
    filteredRecords = filteredRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { forProjectSpecificCosts: checked }) : r;
    });
}

function toggleForResourceCentres(id, checked) {
    allRecords = allRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { forResourceCentres: checked }) : r;
    });
    filteredRecords = filteredRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { forResourceCentres: checked }) : r;
    });
}

function handleTblAccCatDelete(id) {
    if (!window.confirm('Delete this account category record?')) { return; }
    allRecords      = allRecords.filter(function (r) { return r.id !== id; });
    filteredRecords = filteredRecords.filter(function (r) { return r.id !== id; });
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

document.addEventListener('DOMContentLoaded', function () {
    /* Wire filter radio buttons */
    document.querySelectorAll('input[name="filterType"]').forEach(function (radio) {
        radio.addEventListener('change', applyFilters);
    });
    document.getElementById('recordsPerPage').addEventListener('change', function () {
        currentPage = 1;
        renderTable();
        renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
    });

    initTable(allRecords);
    setupResizers();
});

/**
 * Column resizer functionality
 */
function measureAccCatTextWidth(text, className) {
    var measurer = document.getElementById('ac-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'ac-width-measurer';
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

function getAccCatColumnValues(columnIndex) {
    if (columnIndex === 0) {
        return allRecords.map(function (record) { return record.accShortName || ''; });
    }
    if (columnIndex === 1) {
        return allRecords.map(function (record) { return record.accountDescription || ''; });
    }
    if (columnIndex === 2) {
        return allRecords.map(function (record) { return record.constituentAccountCodes || ''; });
    }
    if (columnIndex === 3) {
        return allRecords.map(function (record) { return record.accountType || ''; });
    }
    if (columnIndex === 4) {
        return allRecords.map(function (record) { return record.forProjectSpecificCosts ? 'Yes' : 'No'; });
    }
    if (columnIndex === 5) {
        return allRecords.map(function (record) { return record.forResourceCentres ? 'Yes' : 'No'; });
    }
    return ['Actions'];
}

function getAccCatColumnMinimumWidth(table, header, columnIndex) {
    var headerWidth = measureAccCatTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getAccCatColumnValues(columnIndex).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureAccCatTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncAccCatColumnMinimumWidths(table, preserveExpandedWidths) {
    var wrapper = table ? table.parentElement : null;
    var headers = table ? Array.prototype.slice.call(table.querySelectorAll('th')) : [];
    var totalWidth = 0;
    var actionColumnWidth = 96;

    if (!table || !wrapper || !headers.length) {
        return;
    }

    headers.forEach(function (header, index) {
        var isActionColumn = index === headers.length - 1;
        var minWidth = isActionColumn ? actionColumnWidth : getAccCatColumnMinimumWidth(table, header, index);
        var currentWidth = parseFloat(header.style.width) || header.offsetWidth || minWidth;
        var appliedWidth = isActionColumn ? minWidth : (preserveExpandedWidths ? Math.max(currentWidth, minWidth) : minWidth);

        header.dataset.minWidth = String(minWidth);
        header.style.minWidth = minWidth + 'px';
        header.style.width = appliedWidth + 'px';
        header.style.boxSizing = 'border-box';
        totalWidth += appliedWidth;
    });

    table.style.tableLayout = 'fixed';
    table.style.minWidth = '100%';
    table.style.width = totalWidth + 'px';
}

function setupResizers() {
    var table = document.getElementById("tblAccCat");
    var wrapper = table ? table.parentElement : null;
    var resizers = table ? table.querySelectorAll(".resizer") : [];
    
    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncAccCatColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncAccCatColumnMinimumWidths(table, true);
    }
    
    resizers.forEach(function(resizer) {
        if (resizer.dataset.bound === 'true') {
            return;
        }

        resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            var th = this.parentElement;
            var startX = e.pageX;
            var startWidth = th.offsetWidth;
            var tableStartWidth = table.offsetWidth;
            var minWidth = parseFloat(th.dataset.minWidth) || 60;
            
            resizer.classList.add("resizing");
            
            function onMouseMove(e) {
                e.preventDefault();
                var diff = e.pageX - startX;
                var newWidth = Math.max(minWidth, startWidth + diff);
                
                th.style.width = newWidth + "px";
                table.style.width = Math.max(wrapper.clientWidth, tableStartWidth + (newWidth - startWidth)) + 'px';
            }
            
            function onMouseUp() {
                resizer.classList.remove("resizing");
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
            
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        resizer.dataset.bound = 'true';
    });
}
