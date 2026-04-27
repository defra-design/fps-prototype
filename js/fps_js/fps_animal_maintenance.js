'use strict';

/* Sample data — rows from the Access form screenshot */
var allRecords = [
    { id:  1, animalType: 'B&B Fixed Price, Avian',                species: 'Avian',                    securityLevel: 'As required', dailyRate: '£1.00',     defraDailyRate: '£1.00',     planFullWeeks: false },
    { id:  2, animalType: 'B&B Fixed Price, Large Animals',         species: 'Large Animals',             securityLevel: 'As required', dailyRate: '£1.00',     defraDailyRate: '£1.00',     planFullWeeks: false },
    { id:  3, animalType: 'B&B Fixed Price, Small Animals',         species: 'Small Animals',             securityLevel: 'As required', dailyRate: '£1.00',     defraDailyRate: '£1.00',     planFullWeeks: false },
    { id:  4, animalType: 'B&B Fixed Price, TSE Mice',              species: 'TSE Mice',                  securityLevel: 'As required', dailyRate: '£1.00',     defraDailyRate: '£1.00',     planFullWeeks: false },
    { id:  5, animalType: 'B&B Fixed Price, TSE Mice (Breeding)',   species: 'TSE Mice (Breeding Colony)',securityLevel: 'As required', dailyRate: '£1.00',     defraDailyRate: '£1.00',     planFullWeeks: false },
    { id:  6, animalType: 'Cow, Field',                             species: 'Bovine',                    securityLevel: 'Field',       dailyRate: '£7.68',     defraDailyRate: '£7.53',     planFullWeeks: false },
    { id:  7, animalType: 'Cow, High Security',                     species: 'Bovine',                    securityLevel: 'High',        dailyRate: '£696.76',   defraDailyRate: '£208.51',   planFullWeeks: false },
    { id:  8, animalType: 'Cow, Low Security',                      species: 'Bovine',                    securityLevel: 'Low',         dailyRate: '£22.22',    defraDailyRate: '£19.13',    planFullWeeks: false },
    { id:  9, animalType: 'Cow, Medium Security',                   species: 'Bovine',                    securityLevel: 'Medium',      dailyRate: '£32.87',    defraDailyRate: '£32.23',    planFullWeeks: false },
    { id: 10, animalType: 'Eggs (Chicken) - Hatching',              species: 'Egg',                       securityLevel: 'Hatching',    dailyRate: '£1.10',     defraDailyRate: '£1.10',     planFullWeeks: false },
    { id: 11, animalType: 'Ferrets - Cages (1 Room)',               species: 'Ferret',                    securityLevel: 'High',        dailyRate: '£305.19',   defraDailyRate: '£181.94',   planFullWeeks: false },
    { id: 12, animalType: 'Ferrets, Medium Security',               species: 'Ferret',                    securityLevel: 'Medium',      dailyRate: '£120.28',   defraDailyRate: '£90.92',    planFullWeeks: false },
    { id: 13, animalType: 'Goat, Field',                            species: 'Caprine',                   securityLevel: 'Field',       dailyRate: '£5.30',     defraDailyRate: '£3.37',     planFullWeeks: false },
    { id: 14, animalType: 'Goat, Low Security',                     species: 'Caprine',                   securityLevel: 'Low',         dailyRate: '£7.44',     defraDailyRate: '£7.29',     planFullWeeks: false },
    { id: 15, animalType: 'Goat, Medium Security',                  species: 'Caprine',                   securityLevel: 'Medium',      dailyRate: '£11.48',    defraDailyRate: '£10.33',    planFullWeeks: false },
    { id: 16, animalType: 'Goats, High Security',                   species: 'Caprine',                   securityLevel: 'High',        dailyRate: '£696.76',   defraDailyRate: '£208.51',   planFullWeeks: false },
    { id: 17, animalType: 'Guinea Pig, High - Per Room',            species: 'Guinea Pig',                securityLevel: 'High',        dailyRate: '£251.76',   defraDailyRate: '£181.94',   planFullWeeks: false },
    { id: 18, animalType: 'Guinea Pig, Low - Per Room',             species: 'Guinea Pig',                securityLevel: 'Low',         dailyRate: '£43.21',    defraDailyRate: '£42.36',    planFullWeeks: false },
    { id: 19, animalType: 'Guinea Pig, Medium - Per Room',          species: 'Guinea Pig',                securityLevel: 'Medium',      dailyRate: '£43.21',    defraDailyRate: '£42.36',    planFullWeeks: false },
    { id: 20, animalType: 'Horse, Field',                           species: 'Equine',                    securityLevel: 'Field',       dailyRate: '£12.90',    defraDailyRate: '£12.65',    planFullWeeks: false },
    { id: 21, animalType: 'Horse, High Security',                   species: 'Equine',                    securityLevel: 'High',        dailyRate: '£696.76',   defraDailyRate: '£208.51',   planFullWeeks: false },
    { id: 22, animalType: 'Horse, Low Security',                    species: 'Equine',                    securityLevel: 'Low',         dailyRate: '£22.22',    defraDailyRate: '£19.13',    planFullWeeks: false }
];
var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingAnimalId = null;
var animalSortState = {
    key: null,
    direction: 'asc'
};

function parseAnimalSortValue(value, fieldKey) {
    if (fieldKey === 'dailyRate' || fieldKey === 'defraDailyRate') {
        return Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
    }

    if (fieldKey === 'planFullWeeks') {
        return value ? 1 : 0;
    }

    return String(value || '').toLowerCase();
}

function sortAnimalRecords() {
    if (!animalSortState.key) {
        return;
    }

    var fieldKey = animalSortState.key;
    var multiplier = animalSortState.direction === 'asc' ? 1 : -1;

    filteredRecords.sort(function (recordA, recordB) {
        var valueA = parseAnimalSortValue(recordA[fieldKey], fieldKey);
        var valueB = parseAnimalSortValue(recordB[fieldKey], fieldKey);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' }) * multiplier;
    });

    if (filteredRecords.length === allRecords.length) {
        allRecords = filteredRecords.slice();
    }
}

function updateAnimalSortIcons() {
    var headers = document.querySelectorAll('#tblAnimal th[data-column]');

    headers.forEach(function (header) {
        var column = header.dataset.column;
        header.classList.remove('sorted-asc', 'sorted-desc');

        var existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        if (animalSortState.key === column) {
            header.classList.add(animalSortState.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');

            var icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = animalSortState.direction === 'asc' ? '\u25B2' : '\u25BC';
            header.appendChild(icon);
        }
    });
}

function handleAnimalSort(header) {
    var fieldKey = header.dataset.column;
    if (!fieldKey) {
        return;
    }

    animalSortState.direction = animalSortState.key === fieldKey && animalSortState.direction === 'asc' ? 'desc' : 'asc';
    animalSortState.key = fieldKey;
    currentPage = 1;
    sortAnimalRecords();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function setupAnimalTableSorting() {
    var headers = document.querySelectorAll('#tblAnimal th[data-column]');

    headers.forEach(function (header) {
        if (header.dataset.sortBound === 'true') {
            return;
        }

        header.style.cursor = 'pointer';
        header.tabIndex = 0;

        header.addEventListener('click', function () {
            handleAnimalSort(header);
        });

        header.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleAnimalSort(header);
            }
        });

        header.dataset.sortBound = 'true';
    });

    updateAnimalSortIcons();
}

function measureAnimalTextWidth(text, className) {
    var measurer = document.getElementById('an-width-measurer');

    if (!measurer) {
        measurer = document.createElement('span');
        measurer.id = 'an-width-measurer';
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

function getAnimalColumnValues(columnKey) {
    if (columnKey === 'planFullWeeks') {
        return allRecords.map(function (record) { return record.planFullWeeks ? 'Yes' : 'No'; });
    }
    return allRecords.map(function (record) { return record[columnKey] || ''; });
}

function getAnimalColumnMinimumWidth(table, header, columnKey) {
    var headerWidth = measureAnimalTextWidth(header.textContent.replace(/\s+/g, ' ').trim(), 'govuk-table__header govuk-!-font-size-16');
    var contentWidth = 0;

    getAnimalColumnValues(columnKey).forEach(function (value) {
        contentWidth = Math.max(contentWidth, measureAnimalTextWidth(String(value), 'govuk-table__cell govuk-!-font-size-16'));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncAnimalColumnMinimumWidths(table, preserveExpandedWidths) {
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
            minWidth = getAnimalColumnMinimumWidth(table, header, columnKey);
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

function setupAnimalColumnResizing() {
    var table = document.getElementById('tblAnimal');
    var wrapper = table ? table.parentElement : null;
    var headers = table ? table.querySelectorAll('th[data-column]') : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== 'true') {
        syncAnimalColumnMinimumWidths(table, false);
        table.dataset.resizeSized = 'true';
    } else {
        syncAnimalColumnMinimumWidths(table, true);
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
    if (!tbody) { return; }
    tbody.innerHTML = '';
    var row = document.createElement('tr');
    row.className = 'govuk-table__row';
    row.innerHTML = '<td class="govuk-table__cell" colspan="' + colSpan + '">' + message + '</td>';
    tbody.appendChild(row);
}

function goToPage(page, totalPages, onNavigate) {
    if (page < 1 || page > totalPages) { return; }
    if (typeof onNavigate === 'function') { onNavigate(page); }
}

function renderPagination(records, currentPageValue, perPage, paginationListId, onPageClick) {
    var paginationList = document.getElementById(paginationListId);
    if (!paginationList) { return; }
    var totalRecords = records.length;
    var totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    if (currentPageValue > totalPages) { currentPageValue = totalPages; }
    var prevDisabled = currentPageValue <= 1;
    var nextDisabled = currentPageValue >= totalPages;
    var html = '';
    html += '<li class="govuk-pagination__prev ' + (prevDisabled ? 'govuk-pagination__item--disabled' : '') + '">';
    html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + (currentPageValue - 1) + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Previous page">';
    html += '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
    html += '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>';
    html += '</svg><span class="govuk-pagination__link-title">Previous</span></a></li>';
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
    html += '</svg></a></li>';
    paginationList.innerHTML = html;
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) { return; }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) { return; }
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function getPerPage() {
    var sel = document.getElementById('recordsPerPage');
    return sel ? parseInt(sel.value, 10) : 10;
}

function renderTable() {
    var tbody = document.getElementById('tblAnimalBody');
    if (!tbody) { return; }
    sortAnimalRecords();
    updateAnimalSortIcons();
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var rows = filteredRecords.slice(start, start + perPage);

    if (rows.length === 0) {
        renderEmptyRow('tblAnimalBody', 7, 'No records found.');
        return;
    }

    var html = '';
    rows.forEach(function (item) {
        var pfwChecked = item.planFullWeeks ? ' checked' : '';
        html += '<tr class="govuk-table__row">';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.animalType + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.species + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.securityLevel + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.dailyRate + '</td>';
        html += '<td class="govuk-table__cell govuk-!-font-size-16">' + item.defraDailyRate + '</td>';
        html += '<td class="govuk-table__cell an-actions-cell">';
        html += '<div class="govuk-checkboxes govuk-checkboxes--small an-table-checkboxes">';
        html += '<div class="govuk-checkboxes__item">';
        html += '<input class="govuk-checkboxes__input" type="checkbox" id="pfw-' + item.id + '"' + pfwChecked + ' onchange="togglePlanFullWeeks(' + item.id + ', this.checked)" aria-label="Plan full weeks for ' + item.animalType + '">';
        html += '<label class="govuk-label govuk-checkboxes__label" for="pfw-' + item.id + '"></label>';
        html += '</div></div>';
        html += '</td>';
        html += '<td class="govuk-table__cell an-actions-cell">';
        html += '<button onclick=\'openTblAnimalEditModal(' + JSON.stringify(item) + ')\' aria-label="Edit animal ' + item.animalType + '" class="an-action-button">';
        html += '<img src="../images/pen-to-square-regular-full.svg" alt="Edit animal ' + item.animalType + '" width="20">';
        html += '</button>';
        html += '<button onclick="handleTblAnimalDelete(' + item.id + ')" aria-label="Delete animal ' + item.animalType + '" class="an-action-button">';
        html += '<img src="../images/trash-can-regular-full.svg" alt="Delete animal ' + item.animalType + '" width="20">';
        html += '</button>';
        html += '</td>';
        html += '</tr>';
    });

    tbody.innerHTML = html;

    if (document.getElementById('tblAnimal') && document.getElementById('tblAnimal').dataset.resizeSized === 'true') {
        syncAnimalColumnMinimumWidths(document.getElementById('tblAnimal'), true);
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

function openTblAnimalAddModal() {
    editingAnimalId = null;
    document.getElementById('tblAnimalModalLabel').textContent = 'Add Animal';
    document.getElementById('tblAnimalSaveBtn').textContent = 'Save';
    clearAnimalModalValidation();
    document.getElementById('modal-animal-type').value = '';
    document.getElementById('modal-animal-species').value = '';
    document.getElementById('modal-animal-security').value = '';
    document.getElementById('modal-animal-dailyrate').value = '';
    document.getElementById('modal-animal-defradailyrate').value = '';
    document.getElementById('modal-animal-planfullweeks').checked = false;
    openModal('tblAnimalModal');
    document.getElementById('modal-animal-type').focus();
}

function openTblAnimalEditModal(item) {
    editingAnimalId = item.id;
    document.getElementById('tblAnimalModalLabel').textContent = 'Edit Animal';
    document.getElementById('tblAnimalSaveBtn').textContent = 'Save';
    clearAnimalModalValidation();
    document.getElementById('modal-animal-type').value = item.animalType;
    document.getElementById('modal-animal-species').value = item.species;
    document.getElementById('modal-animal-security').value = item.securityLevel;
    document.getElementById('modal-animal-dailyrate').value = item.dailyRate.replace('£', '').replace(/,/g, '');
    document.getElementById('modal-animal-defradailyrate').value = item.defraDailyRate.replace('£', '').replace(/,/g, '');
    document.getElementById('modal-animal-planfullweeks').checked = item.planFullWeeks;
    openModal('tblAnimalModal');
    document.getElementById('modal-animal-type').focus();
}

function closeTblAnimalModal() {
    clearAnimalModalValidation();
    closeModal('tblAnimalModal');
    editingAnimalId = null;
}

function formatRate(val) {
    var num = parseFloat(val.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? '£0.00' : '£' + num.toFixed(2);
}

function clearAnimalModalValidation() {
    document.querySelectorAll('#formTblAnimal .govuk-form-group--error').forEach(function (group) {
        group.classList.remove('govuk-form-group--error');
    });

    document.querySelectorAll('#formTblAnimal .govuk-error-message').forEach(function (message) {
        message.remove();
    });

    document.querySelectorAll('#formTblAnimal .govuk-input--error').forEach(function (input) {
        input.classList.remove('govuk-input--error');
        input.removeAttribute('aria-invalid');
        if (input.dataset.baseDescribedby) {
            input.setAttribute('aria-describedby', input.dataset.baseDescribedby);
        } else {
            input.removeAttribute('aria-describedby');
        }
    });
}

function showAnimalFieldError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var formGroup;
    var fieldContainer;
    var errorId;
    var errorMessage;
    var describedBy;

    if (!input) {
        return;
    }

    if (typeof input.dataset.baseDescribedby === 'undefined') {
        input.dataset.baseDescribedby = input.getAttribute('aria-describedby') || '';
    }

    formGroup = input.closest('.govuk-form-group');
    fieldContainer = input.closest('.govuk-input__wrapper') || input;
    errorId = fieldId + '-error';
    errorMessage = document.createElement('p');

    if (formGroup) {
        formGroup.classList.add('govuk-form-group--error');
    }

    input.classList.add('govuk-input--error');
    input.setAttribute('aria-invalid', 'true');

    errorMessage.className = 'govuk-error-message';
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;

    if (fieldContainer) {
        fieldContainer.insertAdjacentElement('afterend', errorMessage);
    } else if (formGroup) {
        formGroup.appendChild(errorMessage);
    }

    describedBy = input.dataset.baseDescribedby ? input.dataset.baseDescribedby + ' ' + errorId : errorId;
    input.setAttribute('aria-describedby', describedBy.trim());
}

function validateAnimalModal() {
    var errors = [];
    var animalType = document.getElementById('modal-animal-type').value.trim();
    var species = document.getElementById('modal-animal-species').value.trim();
    var securityLevel = document.getElementById('modal-animal-security').value.trim();
    var dailyRate = document.getElementById('modal-animal-dailyrate').value.trim();
    var defraDailyRate = document.getElementById('modal-animal-defradailyrate').value.trim();

    function isValidRate(value) {
        var parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''));
        return !isNaN(parsed);
    }

    clearAnimalModalValidation();

    if (!animalType) {
        errors.push({ fieldId: 'modal-animal-type', message: 'Animal type is required' });
    }
    if (!species) {
        errors.push({ fieldId: 'modal-animal-species', message: 'Species is required' });
    }
    if (!securityLevel) {
        errors.push({ fieldId: 'modal-animal-security', message: 'Security level is required' });
    }
    if (!dailyRate) {
        errors.push({ fieldId: 'modal-animal-dailyrate', message: 'Daily rate is required' });
    } else if (!isValidRate(dailyRate)) {
        errors.push({ fieldId: 'modal-animal-dailyrate', message: 'Daily rate must be a valid number' });
    }
    if (!defraDailyRate) {
        errors.push({ fieldId: 'modal-animal-defradailyrate', message: 'Defra daily rate is required' });
    } else if (!isValidRate(defraDailyRate)) {
        errors.push({ fieldId: 'modal-animal-defradailyrate', message: 'Defra daily rate must be a valid number' });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach(function (error) {
        showAnimalFieldError(error.fieldId, error.message);
    });

    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function handleTblAnimalSave() {
    if (!validateAnimalModal()) {
        return;
    }

    if (editingAnimalId === null) {
        saveTblAnimal();
        return;
    }
    updateTblAnimal();
}

function saveTblAnimal() {
    var type = document.getElementById('modal-animal-type').value.trim();
    if (!type) { document.getElementById('modal-animal-type').focus(); return; }
    var newId = allRecords.length ? Math.max.apply(null, allRecords.map(function (r) { return r.id; })) + 1 : 1;
    allRecords.push({
        id: newId,
        animalType:    type,
        species:       document.getElementById('modal-animal-species').value.trim(),
        securityLevel: document.getElementById('modal-animal-security').value.trim(),
        dailyRate:     formatRate(document.getElementById('modal-animal-dailyrate').value),
        defraDailyRate:formatRate(document.getElementById('modal-animal-defradailyrate').value),
        planFullWeeks: document.getElementById('modal-animal-planfullweeks').checked
    });
    filteredRecords = allRecords.slice();
    closeTblAnimalModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function updateTblAnimal() {
    var type = document.getElementById('modal-animal-type').value.trim();
    if (!type) { document.getElementById('modal-animal-type').focus(); return; }
    var updated = {
        id: editingAnimalId,
        animalType:    type,
        species:       document.getElementById('modal-animal-species').value.trim(),
        securityLevel: document.getElementById('modal-animal-security').value.trim(),
        dailyRate:     formatRate(document.getElementById('modal-animal-dailyrate').value),
        defraDailyRate:formatRate(document.getElementById('modal-animal-defradailyrate').value),
        planFullWeeks: document.getElementById('modal-animal-planfullweeks').checked
    };
    allRecords      = allRecords.map(function (r) { return r.id === editingAnimalId ? updated : r; });
    filteredRecords = filteredRecords.map(function (r) { return r.id === editingAnimalId ? updated : r; });
    closeTblAnimalModal();
    renderTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'pagination', onPageClick);
}

function togglePlanFullWeeks(id, checked) {
    allRecords = allRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { planFullWeeks: checked }) : r;
    });
    filteredRecords = filteredRecords.map(function (r) {
        return r.id === id ? Object.assign({}, r, { planFullWeeks: checked }) : r;
    });
}

function handleTblAnimalDelete(id) {
    if (!window.confirm('Delete this animal record?')) { return; }
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
    setupAnimalTableSorting();
    setupAnimalColumnResizing();
});
