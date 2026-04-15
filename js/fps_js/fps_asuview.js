'use strict';

var allRecords = [
    { id: 1, animalType: 'Poultry, High - Per Room', project: 'EXSE2213', animalDays: 0, cost: 0 },
    { id: 2, animalType: 'Poultry, High - Per Room', project: 'EXSE2227', animalDays: 42, cost: 7641.48 },
    { id: 3, animalType: 'Poultry, High - Per Room', project: 'EXSE2230', animalDays: 168, cost: 30565.92 },

    { id: 4, animalType: 'B and B Fixed Price, Avian', project: 'EXSE2228', animalDays: 0, cost: 0 },
    { id: 5, animalType: 'B and B Fixed Price, Avian', project: 'APHAH0047', animalDays: 0, cost: 0 },

    { id: 6, animalType: 'B and B Fixed Price, Small Animals', project: 'TSSE1962', animalDays: 0, cost: 0 },
    { id: 7, animalType: 'B and B Fixed Price, Small Animals', project: 'TSSE1963', animalDays: 36500, cost: 36500.00 },

    { id: 8, animalType: 'Eggs [Chicken] - Hatching', project: 'EXSE2223', animalDays: 0, cost: 0 },
    { id: 9, animalType: 'Eggs [Chicken] - Hatching', project: 'NCFT1517', animalDays: 3600, cost: 3960.00 },
    { id: 10, animalType: 'Eggs [Chicken] - Hatching', project: 'CSKZ0023', animalDays: 125, cost: 137.50 },

    { id: 11, animalType: 'Ferrets, Medium Security', project: 'EXSE2227', animalDays: 28, cost: 2545.76 },
    { id: 12, animalType: 'Ferrets, Medium Security', project: 'EXEU1677', animalDays: 0, cost: 0 },
    { id: 13, animalType: 'Ferrets, Medium Security', project: 'CSKV0078', animalDays: 0, cost: 0 },
    { id: 14, animalType: 'Ferrets, Medium Security', project: 'EXSE2230', animalDays: 36, cost: 3273.12 },
    { id: 15, animalType: 'Ferrets, Medium Security', project: 'EXOR1129', animalDays: 8, cost: 962.24 },
    { id: 16, animalType: 'Ferrets, Medium Security', project: 'EXOR1129', animalDays: 28, cost: 3367.84 }
];

var filteredRecords = allRecords.slice();
var currentPage = 1;
var editingAsuUsageId = null;

function getPerPage() {
    var perPageSelect = document.getElementById('asuRecordsPerPage');
    return parseInt(perPageSelect.value, 10) || 5;
}

function formatMoney(value) {
    return '£' + Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function getCurrentAnimalType() {
    var animalTypeFilter = document.getElementById('animalTypeFilter');
    return animalTypeFilter ? animalTypeFilter.value : '';
}

function applyAnimalTypeFilter() {
    var selectedType = getCurrentAnimalType();

    filteredRecords = allRecords.filter(function (record) {
        return record.animalType === selectedType;
    });

    currentPage = 1;
    renderAsuUsageTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'asuPagination', onPageClick);
    updateAsuSummary();
}

function onPageClick(page) {
    currentPage = page;
    renderAsuUsageTable();
    renderPagination(filteredRecords, currentPage, getPerPage(), 'asuPagination', onPageClick);
}

function renderAsuUsageTable() {
    var tbody = document.getElementById('asuUsageBody');
    var perPage = getPerPage();
    var start = (currentPage - 1) * perPage;
    var pageRows = filteredRecords.slice(start, start + perPage);

    if (!pageRows.length) {
        renderEmptyRow('asuUsageBody', 4, 'No records found for the selected animal type.');
        return;
    }

    tbody.innerHTML = '';

    pageRows.forEach(function (item) {
        var row = document.createElement('tr');
        row.className = 'govuk-table__row';

        row.innerHTML =
            '<td class="govuk-table__cell">' + item.project + '</td>' +
            '<td class="govuk-table__cell">' + item.animalDays + '</td>' +
            '<td class="govuk-table__cell">' + formatMoney(item.cost) + '</td>' +
            '<td class="govuk-table__cell asu-actions-cell">' +
            '<button type="button" class="asu-action-button" onclick="openAsuUsageEditModal(' + item.id + ')" aria-label="Edit row for project ' + item.project + '">' +
            '<img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for project ' + item.project + '" width="20">' +
            '</button>' +
            '<button type="button" class="asu-action-button" onclick="handleAsuUsageDelete(' + item.id + ')" aria-label="Delete row for project ' + item.project + '">' +
            '<img src="../images/trash-can-regular-full.svg" alt="Delete icon for project ' + item.project + '" width="20">' +
            '</button>' +
            '</td>';

        tbody.appendChild(row);
    });
}

function updateAsuSummary() {
    var totalDays = filteredRecords.reduce(function (sum, item) {
        return sum + Number(item.animalDays);
    }, 0);

    var totalCost = filteredRecords.reduce(function (sum, item) {
        return sum + Number(item.cost);
    }, 0);

    document.getElementById('asuTotalDays').value = totalDays;
    document.getElementById('asuTotalCost').value = formatMoney(totalCost);
}

function openAsuUsageAddModal() {
    editingAsuUsageId = null;
    document.getElementById('asuUsageModalLabel').textContent = 'Add Animal Type Usage';
    document.getElementById('formAsuUsage').reset();
    document.getElementById('asuUsageSaveBtn').style.display = '';
    document.getElementById('asuUsageUpdateBtn').style.display = 'none';
    openModal('asuUsageModal');
}

function openAsuUsageEditModal(id) {
    var item = allRecords.find(function (record) {
        return record.id === id;
    });

    if (!item) {
        return;
    }

    editingAsuUsageId = id;
    document.getElementById('asuUsageModalLabel').textContent = 'Edit Animal Type Usage';
    document.getElementById('modal-project').value = item.project;
    document.getElementById('modal-animal-days').value = item.animalDays;
    document.getElementById('modal-cost').value = item.cost;
    document.getElementById('asuUsageSaveBtn').style.display = 'none';
    document.getElementById('asuUsageUpdateBtn').style.display = '';
    openModal('asuUsageModal');
}

function closeAsuUsageModal() {
    closeModal('asuUsageModal');
}

function saveAsuUsage() {
    var project = document.getElementById('modal-project').value.trim();
    var animalDays = Number(document.getElementById('modal-animal-days').value);
    var cost = Number(document.getElementById('modal-cost').value);

    if (!project || Number.isNaN(animalDays) || Number.isNaN(cost)) {
        return;
    }

    var selectedType = getCurrentAnimalType();

    if (editingAsuUsageId !== null) {
        var index = allRecords.findIndex(function (record) {
            return record.id === editingAsuUsageId;
        });

        if (index !== -1) {
            allRecords[index].project = project;
            allRecords[index].animalDays = animalDays;
            allRecords[index].cost = cost;
        }
    } else {
        var nextId = allRecords.length ? Math.max.apply(null, allRecords.map(function (record) { return record.id; })) + 1 : 1;
        allRecords.push({
            id: nextId,
            animalType: selectedType,
            project: project,
            animalDays: animalDays,
            cost: cost
        });
    }

    applyAnimalTypeFilter();
    closeAsuUsageModal();
}

function handleAsuUsageDelete(id) {
    showGovukConfirm('Are you sure you want to delete this animal row?').then((result) => {
        if (!result) {
            return;
        }

        allRecords = allRecords.filter(function (record) {
            return record.id !== id;
        });

        applyAnimalTypeFilter();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnAsuUsageAdd').addEventListener('click', openAsuUsageAddModal);

    document.getElementById('animalTypeFilter').addEventListener('change', function () {
        applyAnimalTypeFilter();
    });

    document.getElementById('asuRecordsPerPage').addEventListener('change', function () {
        currentPage = 1;
        renderAsuUsageTable();
        renderPagination(filteredRecords, currentPage, getPerPage(), 'asuPagination', onPageClick);
    });

    applyAnimalTypeFilter();
});
