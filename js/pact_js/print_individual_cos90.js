let periodMonthData = [
    { accntsperiod: 1, monthname: "April", monthnumber: 4 },
    { accntsperiod: 2, monthname: "May", monthnumber: 5 },
    { accntsperiod: 3, monthname: "June", monthnumber: 6 },
    { accntsperiod: 4, monthname: "July", monthnumber: 7 },
    { accntsperiod: 5, monthname: "August", monthnumber: 8 },
    { accntsperiod: 6, monthname: "September", monthnumber: 9 },
    { accntsperiod: 7, monthname: "October", monthnumber: 10 },
    { accntsperiod: 8, monthname: "November", monthnumber: 11 },
    { accntsperiod: 9, monthname: "December", monthnumber: 12 },
    { accntsperiod: 10, monthname: "January", monthnumber: 1 },
    { accntsperiod: 11, monthname: "February", monthnumber: 2 },
    { accntsperiod: 12, monthname: "March", monthnumber: 3 }


];
document.getElementById("inputSavetofile").value = "C:\\ExcelExport\\";
// Working Hours Data
let workingHoursData = [
    { Year: 2025, Month: 1, Days: 21, CVLHours: 151.2, VIDHours: 151.2 },
    { Year: 2025, Month: 2, Days: 20, CVLHours: 144.0, VIDHours: 144.0 },
    { Year: 2025, Month: 3, Days: 22, CVLHours: 158.4, VIDHours: 158.4 },
    { Year: 2025, Month: 4, Days: 21, CVLHours: 151.2, VIDHours: 151.2 },
    { Year: 2025, Month: 5, Days: 22, CVLHours: 158.4, VIDHours: 158.4 },
    { Year: 2025, Month: 6, Days: 21, CVLHours: 151.2, VIDHours: 151.2 },
    { Year: 2025, Month: 7, Days: 23, CVLHours: 165.6, VIDHours: 165.6 },
    { Year: 2025, Month: 8, Days: 21, CVLHours: 151.2, VIDHours: 151.2 },
    { Year: 2025, Month: 9, Days: 22, CVLHours: 158.4, VIDHours: 158.4 },
    { Year: 2025, Month: 10, Days: 23, CVLHours: 165.6, VIDHours: 165.6 },
    { Year: 2025, Month: 11, Days: 20, CVLHours: 144.0, VIDHours: 144.0 },
    { Year: 2025, Month: 12, Days: 22, CVLHours: 158.4, VIDHours: 158.4 },
    { Year: 2026, Month: 1, Days: 21, CVLHours: 151.2, VIDHours: 151.2 },
    { Year: 2026, Month: 2, Days: 20, CVLHours: 144.0, VIDHours: 144.0 },
    { Year: 2026, Month: 3, Days: 23, CVLHours: 165.6, VIDHours: 165.6 }
];

const wgMemberList = [
    { value: "A_Admin, General [A_ADMIN]", text: "A_Admin, General [A_ADMIN]" },
    { value: "A_ASC, General [A_ASC]", text: "A_ASC, General [A_ASC]" },
    { value: "A_BAC1, General [A_BAC1]", text: "A_BAC1, General [A_BAC1]" },
    { value: "A_BAC4, General [A_BAC4]", text: "A_BAC4, General [A_BAC4]" },
    { value: "A_BAC5, General [A_BAC5]", text: "A_BAC5, General [A_BAC5]" },
    { value: "A_BOU, General [A_BOU]", text: "A_BOU, General [A_BOU]" },
    { value: "A_BOU, General [A_BOU_H]", text: "A_BOU, General [A_BOU_H]" },
    { value: "A_BEES, General [A_BEES]", text: "A_BEES, General [A_BEES]" },
    { value: "A_BEES H, General [A_BEES1]", text: "A_BEES H, General [A_BEES1]" },
    { value: "A_DGAS, General [A_DGAS]", text: "A_DGAS, General [A_DGAS]" },
    { value: "A_DVM, General [A_DVM]", text: "A_DVM, General [A_DVM]" },
    { value: "A_PATH, General [A_PATH]", text: "A_PATH, General [A_PATH]" },
    { value: "A_PATH HW, General [A_PATH HW]", text: "A_PATH HW, General [A_PATH HW]" },
    { value: "A_PGX, General [A_PGX]", text: "A_PGX, General [A_PGX]" },
    { value: "A_PRONT, General [A_PRONT]", text: "A_PRONT, General [A_PRONT]" },
    { value: "A_SIU, General [A_SIU]", text: "A_SIU, General [A_SIU]" },
    { value: "A_SSP1, General [A_SSP1]", text: "A_SSP1, General [A_SSP1]" },
    { value: "A_SVXA, General [A_SVXA]", text: "A_SVXA, General [A_SVXA]" },
    { value: "A_SVXE, General [A_SVX]", text: "A_SVXE, General [A_SVX]" },
    { value: "A_SVXH, General [A_SVXH]", text: "A_SVXH, General [A_SVXH]" },
    { value: "A_SVXX, General [A_SVXX]", text: "A_SVXX, General [A_SVXX]" },
    { value: "A_Vadim, General [A_Vadim]", text: "A_Vadim, General [A_Vadim]" },
    { value: "A_VII, General [A_VII]", text: "A_VII, General [A_VII]" },
    { value: "A_VII, General [A_VII]", text: "A_VII, General [A_VII]" },
    { value: "A_VIH, General [A_VIH]", text: "A_VIH, General [A_VIH]" },
    { value: "A_Wales, General [A_Wales F]", text: "A_Wales, General [A_Wales F]" },
    { value: "A_WILDLIFE, General [A_Wildlife]", text: "A_WILDLIFE, General [A_Wildlife]" },
    { value: "Aaron, Basia [E_Wales]", text: "Aaron, Basia [E_Wales]" },
    { value: "Aaron, Basia [F_LIT]", text: "Aaron, Basia [F_LIT]" },
    { value: "Abatelli, General [E_Wales]", text: "Abatelli, General [E_Wales]" },
    { value: "Abatelli, Jacinda [F_PHS14D]", text: "Abatelli, Jacinda [F_PHS14D]" }
];

let editingHoursIndex = null;
let currentHoursPage = 1;
let hoursRecordsPerPage = 10;
let isAddHours = false;
let workgroupItemsData = [
    { item: 'APH SCAH', itemdescription: 'APH SCAH', profitCenter: 'HNC' },
    { item: 'AS2', itemdescription: 'AS2', profitCenter: 'HNC' },
    { item: 'AS3', itemdescription: 'AS3', profitCenter: 'HNC' },
    { item: 'ASU', itemdescription: 'ASU', profitCenter: 'HNC' },
    { item: 'BAC1', itemdescription: 'BAC1', profitCenter: 'BTB' },
    { item: 'BAC2', itemdescription: 'BAC2', profitCenter: 'BTB' },
    { item: 'BAC3', itemdescription: 'BAC3', profitCenter: 'BTB' },
    { item: 'BAC4', itemdescription: 'BAC4', profitCenter: 'BTB' },
    { item: 'BAC5', itemdescription: 'BAC5', profitCenter: 'BTB' },
    { item: 'Bact', itemdescription: 'Bact', profitCenter: 'BTB' },
    { item: 'BDU', itemdescription: 'BDU', profitCenter: 'BTB' },
    { item: 'Bees', itemdescription: 'Bees England', profitCenter: 'Bee Insp' },
    { item: 'Bees Advice', itemdescription: 'Bees England', profitCenter: 'Bee Insp' },
    { item: 'Bees England', itemdescription: 'Bees England', profitCenter: 'Bee Insp' },
    { item: 'Bees Wales', itemdescription: 'Bees Wales', profitCenter: 'Bee Insp' },
    { item: 'BM1', itemdescription: 'BM1', profitCenter: 'BTB' },
    { item: 'BM4', itemdescription: 'BM4', profitCenter: 'BTB' },
    { item: 'BM5', itemdescription: 'BM5', profitCenter: 'BTB' },
    { item: 'BTB', itemdescription: 'BTB', profitCenter: 'BTB' },
    { item: 'Bus Supp', itemdescription: 'Bus Supp', profitCenter: 'CSU' },
    { item: 'CIT', itemdescription: 'CIT', profitCenter: 'IMT' },
    { item: 'CITB', itemdescription: 'CITB', profitCenter: 'IMT' },
    { item: 'CITD', itemdescription: 'CITD', profitCenter: 'IMT' },
    { item: 'Comm', itemdescription: 'Comm', profitCenter: 'Comm' },
    { item: 'CPD', itemdescription: 'CPD', profitCenter: 'CSU' },
    { item: 'CSC5', itemdescription: 'CSC5', profitCenter: 'CSU' },
    { item: 'CSCC', itemdescription: 'CSCC', profitCenter: 'CSU' },
    { item: 'CSCE', itemdescription: 'CSCE', profitCenter: 'CSU' },
    { item: 'CSCS', itemdescription: 'CSCS', profitCenter: 'CSU' },
    { item: 'CSCW', itemdescription: 'CSCW', profitCenter: 'CSU' },
    { item: 'CSG', itemdescription: 'CSG', profitCenter: 'CSU' },
    { item: 'CSG1', itemdescription: 'CSG1', profitCenter: 'CSU' },
    { item: 'CSU', itemdescription: 'CSU', profitCenter: 'CSU' },
    { item: 'CTB5', itemdescription: 'CTB5', profitCenter: 'BTB' },
    { item: 'DIGP', itemdescription: 'DIGP', profitCenter: 'IMT' },
    { item: 'DIU', itemdescription: 'DIU', profitCenter: 'DoES' },
    { item: 'DoES', itemdescription: 'DoES', profitCenter: 'DoES' },
    { item: 'DoES1', itemdescription: 'DoES1', profitCenter: 'DoES' },
    { item: 'DoES3', itemdescription: 'DoES3', profitCenter: 'DoES' },
    { item: 'DSG', itemdescription: 'DSG', profitCenter: 'DSG' },
    { item: 'EO Exit', itemdescription: 'EO Exit', profitCenter: 'EU Exit' },
    { item: 'Field', itemdescription: 'Operations', profitCenter: 'HNC' },
    { item: 'Field Activity', itemdescription: 'Field Activity', profitCenter: 'HNC' },
    { item: 'GM', itemdescription: 'GM', profitCenter: 'GM' },
    { item: 'HMI', itemdescription: 'HMI', profitCenter: 'HNC' },
    { item: 'HNC', itemdescription: 'HNC', profitCenter: 'HNC' },
    { item: 'IMT', itemdescription: 'IMT', profitCenter: 'IMT' },
    { item: 'LabT', itemdescription: 'LabT', profitCenter: 'LabT' },
    { item: 'LT5', itemdescription: 'LT5', profitCenter: 'LabT' },
    { item: 'LTBU', itemdescription: 'LTBU', profitCenter: 'LabT' },
    { item: 'LTCA', itemdescription: 'LTCA', profitCenter: 'LabT' },
    { item: 'LTCM', itemdescription: 'LTCM', profitCenter: 'LabT' },
    { item: 'LTIM', itemdescription: 'LTIM', profitCenter: 'LabT' },
    { item: 'LTNC', itemdescription: 'LTNC', profitCenter: 'LabT' },
    { item: 'LTPE', itemdescription: 'LTPE', profitCenter: 'LabT' },
    { item: 'LTSB', itemdescription: 'LTSB', profitCenter: 'LabT' },
    { item: 'LTSH', itemdescription: 'LTSH', profitCenter: 'LabT' },
    { item: 'LTSK', itemdescription: 'LTSK', profitCenter: 'LabT' },
    { item: 'LTST', itemdescription: 'LTST', profitCenter: 'LabT' },
    { item: 'NATBORD', itemdescription: 'NATBORD', profitCenter: 'HNC' },
    { item: 'Operations', itemdescription: 'Operations', profitCenter: 'HNC' },
    { item: 'Path', itemdescription: 'Path', profitCenter: 'HNC' },
    { item: 'PATHL', itemdescription: 'PATHL', profitCenter: 'HNC' },
    { item: 'PATHW', itemdescription: 'PATHW', profitCenter: 'HNC' },
    { item: 'PDPM', itemdescription: 'PDPM', profitCenter: 'DoES' },
    { item: 'PHI Del', itemdescription: 'PHI Del', profitCenter: 'HNC' },
    { item: 'PHICAD', itemdescription: 'PHICAD', profitCenter: 'HNC' },
    { item: 'PHICE', itemdescription: 'PHICE', profitCenter: 'HNC' },
    { item: 'PHICEN', itemdescription: 'PHICEN', profitCenter: 'HNC' },
    { item: 'PHICERC', itemdescription: 'PHICERC', profitCenter: 'HNC' },
    { item: 'PHICERS', itemdescription: 'PHICERS', profitCenter: 'HNC' },
    { item: 'PHICHB', itemdescription: 'PHICHB', profitCenter: 'HNC' },
    { item: 'PHINSLT', itemdescription: 'PHINSLT', profitCenter: 'HNC' },
    { item: 'PHISHE', itemdescription: 'PHISHE', profitCenter: 'HNC' },
    { item: 'PHITB', itemdescription: 'PHITB', profitCenter: 'HNC' },
    { item: 'SLSD', itemdescription: 'SLSD', profitCenter: 'DoES' }
];

document.querySelectorAll('[data-perioddropdown]').forEach(dd => {
    const source = dd.dataset.source;
    if (source === 'monthlist') {
        initDropdown(dd, periodMonthData, 'accntsperiod', 'monthname', 'monthnumber');
    }
});

document.getElementById("printCOS90sBtn").addEventListener("click", function () {
    if (document.getElementById('txtstaffsearchBox').value == "") {
        alert("You must state the period");
        return;
    }
});

function initDropdown(dropdown, dataset, codeField, descField, numberField) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.select-search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';

        // Add "Clear Filter" option at the top
        if (!filter) {
            const clearTr = document.createElement('tr');
            clearTr.onclick = () => {
                input.value = '--select--';
                panel.style.display = 'none';

                // Clear the filter
                //  selectedItemCode = null;
                currentWorkgroupPage = 1;
            };
            tbody.appendChild(clearTr);
        }

        dataset
            .filter(d =>
                String(d[codeField]).toLowerCase().includes(filter) ||
                String(d[descField]).toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="sup_text_center">${d[codeField]}</td><td class="sup_text_center">${d[descField]}</td><td class="sup_text_align_right">${d[numberField]}</td>`;
                tr.onclick = () => {
                    input.value = `${d[codeField]}`;
                    panel.style.display = 'none';


                    // document.getElementById('txtstaffsearchBox').value = '';
                    //   filteredData = workgroupData.filter(item => {
                    //     // If no test code is selected, show all items

                    //     // Filter by the selected test code
                    //     return item.TestCode.toLowerCase().includes(d[codeField].toLowerCase());
                    // });
                    // selectedWG = "";
                    //if(document.getElementById('dpprogramme').value !== ''){
                    // filteredSearch(filteredData);
                    //} 

                    // if (filteredData?.length > 0) {
                    //     selectTestCode(filteredData[0].TestCode);
                    //     currentWorkgroupPage = 1;
                    //     renderWorkgroupTable();
                    //     //  selectValue(this.value);
                    // }
                    // Filter workgroup table by selected TestCode
                    //  selectedItemCode = d[codeField];
                    // currentWorkgroupPage = 1;
                    // renderWorkgroupTable();

                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        search.value = '';
        search.focus();
        renderRows();
    });

    search.addEventListener('input', e => {
        renderRows(e.target.value.toLowerCase());
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

// Workgroup Print Data - initialize with default values
let allWorkgroupPrintData = workgroupItemsData.map(item => ({
    workGroup: item.item,
    printCOS90: 'No', // Default value
    profitCenter: item.profitCenter
}));

let workgroupPrintData = [...allWorkgroupPrintData]; // Current filtered data
let currentPrintPage = 1;
let printRecordsPerPage = 10;
let selectedProfitCenter = '';

// Function to filter data by profit center
function filterByProfitCenter(profitCenter) {
    selectedProfitCenter = profitCenter;
    if (!profitCenter || profitCenter === '') {
        workgroupPrintData = [...allWorkgroupPrintData];
    } else {
        workgroupPrintData = allWorkgroupPrintData.filter(item => item.profitCenter === profitCenter);
    }
    currentPrintPage = 1; // Reset to first page
    renderWorkgroupPrintTable();
}

// Bulk set Print COS90 for current profit center
function bulkSetPrintForCurrentPc(printYes) {
    if (!selectedProfitCenter) {
        alert('Please select a profit center first.');
        return;
    }

    const value = printYes ? 'Yes' : 'No';

    // Update all items in the current filtered view
    workgroupPrintData.forEach(item => {
        item.printCOS90 = value;
        // Also update in the main data array
        const mainItem = allWorkgroupPrintData.find(d => d.workGroup === item.workGroup);
        if (mainItem) {
            mainItem.printCOS90 = value;
        }
    });

    renderWorkgroupPrintTable();
    console.log(`Bulk set all work groups for ${selectedProfitCenter} to ${value}`);
}

// Clear all work groups across all profit centers
function clearAllWorkgroupsAllProfitCentres() {
    const ok = window.confirm("Are you sure you want to clear all work groups print flagging, irrespective of profit centre?");
    if (!ok) return;

    // Reset all items to 'No'
    allWorkgroupPrintData.forEach(item => {
        item.printCOS90 = 'No';
    });

    // Update current filtered view
    workgroupPrintData.forEach(item => {
        item.printCOS90 = 'No';
    });

    renderWorkgroupPrintTable();
    console.log('Cleared all work groups across all profit centres');
}

// Populate WG Member List dropdown
function populateWgMemberList() {
    const dropdown = document.getElementById('dpWgMemberList');
    if (!dropdown) return;

    // Clear existing options except the first one (placeholder)
    dropdown.innerHTML = '<option value="">--select--</option>';

    // Add options from wgMemberList array
    wgMemberList.forEach(member => {
        const option = document.createElement('option');
        option.value = member.value;
        option.textContent = member.text;

        // Set selected if specified
        if (member.selected) {
            option.selected = true;
        }


        dropdown.appendChild(option);
    });

    console.log('Populated WG Member List with', wgMemberList.length, 'members');
}

// Initialize table on page load
document.addEventListener('DOMContentLoaded', function () {
    // Setup profit center dropdown listener
    const profitCenterDropdown = document.getElementById('dpProfitcenter');
    if (profitCenterDropdown) {
        // Set initial filter based on selected value
        const initialValue = profitCenterDropdown.value;
        if (initialValue) {
            filterByProfitCenter(initialValue);
        } else {
            renderWorkgroupPrintTable();
        }

        // Add change event listener
        profitCenterDropdown.addEventListener('change', function () {
            filterByProfitCenter(this.value);
        });
    } else {
        renderWorkgroupPrintTable();
    }

    setupPrintPagination();
    setupModalEventListeners();
    setupBulkActionButtons();
    setupWorkingHoursModal();
    populateWgMemberList();
});

// ==================== Working Hours & Days Modal Functions ====================

function setupWorkingHoursModal() {
    const maintainBtn = document.getElementById('maintainWorkHoursDaysBtn');
    const closeMainModalBtn = document.getElementById('closeWorkingHoursModalBtn');
    const closeMainModalBtn2 = document.getElementById('closeWorkingHoursBtn');
    //const addHoursBtn = document.getElementById('addWorkingHoursBtn');
    const closeEntryModalBtn = document.getElementById('closeHoursEntryModalBtn');
    const cancelEntryBtn = document.getElementById('cancelHoursEntryBtn');
    const saveEntryBtn = document.getElementById('saveHoursEntryBtn');

    if (maintainBtn) {
        maintainBtn.addEventListener('click', openWorkingHoursModal);
    }

    if (closeMainModalBtn) {
        closeMainModalBtn.addEventListener('click', closeWorkingHoursModal);
    }

    if (closeMainModalBtn2) {
        closeMainModalBtn2.addEventListener('click', closeWorkingHoursModal);
    }

    // if (addHoursBtn) {
    //     addHoursBtn.addEventListener('click', () => {
    //         isAddHours = true; 
    //         document.getElementById('txtYear').classList.remove('sup_readonly');
    //         document.getElementById('txtMonth').classList.remove('sup_readonly');
    //         document.getElementById('txtYear').disabled = false;
    //         document.getElementById('txtMonth').disabled = false;

    //         openAddEditHoursModal()
    //     });
    // }

    if (closeEntryModalBtn) {
        closeEntryModalBtn.addEventListener('click', closeAddEditHoursModal);
    }

    if (cancelEntryBtn) {
        cancelEntryBtn.addEventListener('click', closeAddEditHoursModal);
    }

    if (saveEntryBtn) {
        saveEntryBtn.addEventListener('click', saveWorkingHoursEntry);
    }

    // Setup pagination for working hours table
    setupWorkingHoursPagination();

    // Close modals when clicking outside
    const mainModal = document.getElementById('workingHoursModal');
    const entryModal = document.getElementById('addEditHoursModal');

    // if (mainModal) {
    //     window.addEventListener('click', function(event) {
    //         if (event.target === mainModal) {
    //             closeWorkingHoursModal();
    //         }
    //     });
    // }

    // addEditHoursModal will not close on outside click
    // if (entryModal) {
    //     window.addEventListener('click', function(event) {
    //         if (event.target === entryModal) {
    //             closeAddEditHoursModal();
    //         }
    //     });
    // }
}

function openWorkingHoursModal() {
    const modal = document.getElementById('workingHoursModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        renderWorkingHoursTable();
    }
}

function closeWorkingHoursModal() {
    const modal = document.getElementById('workingHoursModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function setupWorkingHoursPagination() {
    const recordsPerPageSelect = document.getElementById('workingHoursRecordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function () {
            hoursRecordsPerPage = parseInt(this.value);
            currentHoursPage = 1;
            renderWorkingHoursTable();
        });
    }
}

function renderWorkingHoursTable() {
    const tbody = document.getElementById('workingHoursTableBody');
    if (!tbody) return;

    // Pagination
    const totalRecords = workingHoursData.length;
    const totalPages = Math.ceil(totalRecords / hoursRecordsPerPage);
    const startIndex = (currentHoursPage - 1) * hoursRecordsPerPage;
    const endIndex = startIndex + hoursRecordsPerPage;
    const paginatedData = workingHoursData.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    if (paginatedData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No records found</td></tr>';
    } else {
        paginatedData.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const row = document.createElement('tr');
            row.className = 'govuk-table__row';

            // Check if editing should be disabled (Year 2025 and Month 1, 2, or 3)
            const isDisabled = item.Year === 2025 && (item.Month === 1 || item.Month === 2 || item.Month === 3);
            const editIcon = isDisabled ? '../images/pen-to-square-regular-full-disabled.svg' : '../images/pen-to-square-regular-full.svg';
            const editOnClick = isDisabled ? '' : `onclick="editWorkingHours(event)"`;
            const cursorStyle = isDisabled ? 'not-allowed' : 'pointer';

            const deleteIcon = isDisabled ? '../images/trash-can-regular-full-disabled.svg' : '../images/trash-can-regular-full.svg';
            const deleteOnClick = isDisabled ? '' : `onclick="deleteWorkingHours(${actualIndex})"`;
            const deleteCursorStyle = isDisabled ? 'not-allowed' : 'pointer';

            row.innerHTML = `
                <td class="govuk-table__cell">${item.Year}</td>
                <td class="govuk-table__cell">${item.Month}</td>
                <td class="govuk-table__cell">${item.Days}</td>
                <td class="govuk-table__cell">${item.CVLHours}</td>
                <td class="govuk-table__cell">${item.VIDHours}</td>
                <td class="govuk-table__cell" style="text-align: center;">
                    <button class="edit-btn" data-item='${JSON.stringify(item)}'  data-index="${actualIndex}" ${editOnClick} style="background: none; border: none; cursor: ${cursorStyle}; margin-right: 8px;" ${isDisabled ? 'disabled' : ''}>
                        <img src="${editIcon}" alt="Edit" width="20" />
                    </button>
                    <button class="delete-btn" ${deleteOnClick} style="background: none; visibility:hidden; border: none; cursor: ${deleteCursorStyle};">
                        <img src="${deleteIcon}" alt="Delete" width="20" />
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Render pagination
    renderWorkingHoursPagination(currentHoursPage, totalPages);
}

function renderWorkingHoursPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('workingHoursPagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    prevItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="prev">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        Previous
    </a>`;
    prevItem.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentHoursPage = currentPage - 1;
            renderWorkingHoursTable();
        }
    });
    paginationContainer.appendChild(prevItem);

    // Page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentPage) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function (e) {
                e.preventDefault();
                currentHoursPage = i;
                renderWorkingHoursTable();
            });
        }
        paginationContainer.appendChild(pageItem);
    }

    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    nextItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="next">
        Next
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
    nextItem.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentHoursPage = currentPage + 1;
            renderWorkingHoursTable();
        }
    });
    paginationContainer.appendChild(nextItem);
}

function openAddEditHoursModal(item = null, index = null) {
    editingHoursIndex = index;
    const modal = document.getElementById('addEditHoursModal');
    const modalLabel = document.getElementById('hoursEntryModalLabel');
    const form = document.getElementById('formWorkingHours');

    if (!modal || !form) return;

    // Reset form
    form.reset();

    if (item !== null) {
        // Edit mode
        modalLabel.textContent = 'Edit Working Hours Entry';
        document.getElementById('txtYear').value = item.Year;
        document.getElementById('txtMonth').value = item.Month;
        document.getElementById('txtYear').classList.add('sup_readonly');
        document.getElementById('txtMonth').classList.add('sup_readonly');
        document.getElementById('txtYear').disabled = true;
        document.getElementById('txtMonth').disabled = true;
        document.getElementById('txtDays').value = item.Days;
        document.getElementById('txtCVLHours').value = item.CVLHours;
        document.getElementById('txtVIDHours').value = item.VIDHours;
    } else {
        // Add mode
        modalLabel.textContent = 'Add Working Hours Entry';
        document.getElementById('txtYear').classList.remove('sup_readonly');
        document.getElementById('txtMonth').classList.remove('sup_readonly');
        document.getElementById('txtYear').disabled = false;
        document.getElementById('txtMonth').disabled = false;
    }

    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeAddEditHoursModal() {
    const modal = document.getElementById('addEditHoursModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            editingHoursIndex = null;
        }, 300);
    }
}

function saveWorkingHoursEntry() {
    const form = document.getElementById('formWorkingHours');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const year = parseInt(document.getElementById('txtYear').value);
    const month = parseInt(document.getElementById('txtMonth').value);
    const days = parseInt(document.getElementById('txtDays').value);
    const cvlHours = parseFloat(document.getElementById('txtCVLHours').value);
    const vidHours = parseFloat(document.getElementById('txtVIDHours').value);

    const entry = {
        Year: year,
        Month: month,
        Days: days,
        CVLHours: cvlHours,
        VIDHours: vidHours
    };

    if (editingHoursIndex !== null) {
        // Update existing entry
        workingHoursData[editingHoursIndex] = entry;
        console.log('Updated working hours entry:', entry);
    } else {
        // Add new entry
        workingHoursData.push(entry);
        currentHoursPage = 1; // Reset to first page
        console.log('Added new working hours entry:', entry);
    }

    closeAddEditHoursModal();
    renderWorkingHoursTable();
}

function editWorkingHours(event) {
    const button = event.currentTarget;
    const item = JSON.parse(button.dataset.item);
    const index = parseInt(button.dataset.index);
    openAddEditHoursModal(item, index);
}

function deleteWorkingHours(index) {
    if (confirm('Are you sure you want to delete this working hours entry?')) {
        workingHoursData.splice(index, 1);
        // Adjust current page if needed
        const totalPages = Math.ceil(workingHoursData.length / hoursRecordsPerPage);
        if (currentHoursPage > totalPages && totalPages > 0) {
            currentHoursPage = totalPages;
        }
        renderWorkingHoursTable();
        console.log('Deleted working hours entry at index:', index);
    }
}

function setupBulkActionButtons() {
    // Select PC's Work Groups button
    const selectPCBtn = document.getElementById('selectPCWorkgroupsBtn');
    if (selectPCBtn) {
        selectPCBtn.addEventListener('click', function () {
            bulkSetPrintForCurrentPc(true);
        });
    }

    // Clear PC's Work Groups button
    const clearPCBtn = document.getElementById('clearPCWorkgroupsBtn');
    if (clearPCBtn) {
        clearPCBtn.addEventListener('click', function () {
            bulkSetPrintForCurrentPc(false);
        });
    }

    // Clear All Work Groups button
    const clearAllBtn = document.getElementById('clearAllWorkgroupsBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function () {
            clearAllWorkgroupsAllProfitCentres();
        });
    }
}

function setupModalEventListeners() {
    const closePrintModalBtn = document.getElementById('closePrintModalBtn');
    const cancelPrintModalBtn = document.getElementById('cancelPrintModalBtn');
    const savePrintBtn = document.getElementById('savePrintBtn');

    if (closePrintModalBtn) {
        closePrintModalBtn.addEventListener('click', closePrintModal);
    }

    if (cancelPrintModalBtn) {
        cancelPrintModalBtn.addEventListener('click', closePrintModal);
    }

    if (savePrintBtn) {
        savePrintBtn.addEventListener('click', savePrintCOS90);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('editPrintCOS90Modal');
    if (modal) {
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closePrintModal();
            }
        });
    }
}

function setupPrintPagination() {
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function () {
            printRecordsPerPage = parseInt(this.value);
            currentPrintPage = 1;
            renderWorkgroupPrintTable();
        });
    }
}

function renderWorkgroupPrintTable() {
    const tbody = document.querySelector('#workgroupPrintTable tbody');
    if (!tbody) return;

    // Pagination
    const totalRecords = workgroupPrintData.length;
    const totalPages = Math.ceil(totalRecords / printRecordsPerPage);
    const startIndex = (currentPrintPage - 1) * printRecordsPerPage;
    const endIndex = startIndex + printRecordsPerPage;
    const paginatedData = workgroupPrintData.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    if (paginatedData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No records found</td></tr>`;
    } else {
        paginatedData.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const row = `
                <tr>
                    <td class="govuk-table__cell">${item.workGroup}</td>
                    <td class="govuk-table__cell" style="text-align: center;">
                        <div style="display: flex; gap: 50px; justify-content: center; align-items: center;"> 

                         <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
                        <div class="govuk-checkboxes__item">
                            
                            <input type="checkbox" class="govuk-checkboxes__input"
                                   id="printCOS90Yes_${actualIndex}" 
                                   aria-label="Print COS90 Yes for ${item.workGroup}"
                                   ${item.printCOS90 === 'Yes' ? 'checked' : ''}
                                   onchange="updatePrintCOS90Checkbox(${actualIndex}, 'Yes', this.checked)" disabled/>      
                                    <label class="govuk-label govuk-checkboxes__label sup_label_auto_width sup_width_0" for="printCOS90Yes_${actualIndex}" style="padding: 0;"><span class="sup_visually_hidden">Yes</span></label>    
                        </div> 
                        </div>

                          <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
                        <div class="govuk-checkboxes__item">
                  
                                   
                            <input type="checkbox" class="govuk-checkboxes__input"
                                   id="printCOS90No_${actualIndex}" 
                                   aria-label="Print COS90 No for ${item.workGroup}"
                                   ${item.printCOS90 === 'No' ? 'checked' : ''}
                                   onchange="updatePrintCOS90Checkbox(${actualIndex}, 'No', this.checked)"  disabled/>     
                                    <label class="govuk-label govuk-checkboxes__label sup_label_auto_width sup_width_0" for="printCOS90No_${actualIndex}" style="padding: 0;"> <span class="sup_visually_hidden">No</span></label>     
                        </div> 
                        </div>


                           
                        </div>
                    </td>
                    <td class="govuk-table__cell" style="text-align: center;">
                        <button class="edit-btn" onclick="editPrintCOS90(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    // Render pagination
    renderPrintPagination(currentPrintPage, totalPages);
}

function renderPrintPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('workgroupPagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    prevItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="prev">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        Previous
    </a>`;
    prevItem.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPrintPage = currentPage - 1;
            renderWorkgroupPrintTable();
        }
    });
    paginationContainer.appendChild(prevItem);

    // Page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentPage) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function (e) {
                e.preventDefault();
                currentPrintPage = i;
                renderWorkgroupPrintTable();
            });
        }
        paginationContainer.appendChild(pageItem);
    }

    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    nextItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="next">
        Next
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
    nextItem.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPrintPage = currentPage + 1;
            renderWorkgroupPrintTable();
        }
    });
    paginationContainer.appendChild(nextItem);
}

function updatePrintCOS90Checkbox(index, value, isChecked) {
    if (isChecked) {
        workgroupPrintData[index].printCOS90 = value;
        // Update in main data array as well
        const workGroupName = workgroupPrintData[index].workGroup;
        const mainDataItem = allWorkgroupPrintData.find(item => item.workGroup === workGroupName);
        if (mainDataItem) {
            mainDataItem.printCOS90 = value;
        }
        // Uncheck the other checkbox
        const otherValue = value === 'Yes' ? 'No' : 'Yes';
        const otherCheckboxId = `printCOS90${otherValue}_${index}`;
        const otherCheckbox = document.getElementById(otherCheckboxId);
        if (otherCheckbox) {
            otherCheckbox.checked = false;
        }
        console.log(`Updated ${workgroupPrintData[index].workGroup} to ${value}`);
    } else {
        // If unchecking, check the other one
        const otherValue = value === 'Yes' ? 'No' : 'Yes';
        workgroupPrintData[index].printCOS90 = otherValue;
        // Update in main data array as well
        const workGroupName = workgroupPrintData[index].workGroup;
        const mainDataItem = allWorkgroupPrintData.find(item => item.workGroup === workGroupName);
        if (mainDataItem) {
            mainDataItem.printCOS90 = otherValue;
        }
        const otherCheckboxId = `printCOS90${otherValue}_${index}`;
        const otherCheckbox = document.getElementById(otherCheckboxId);
        if (otherCheckbox) {
            otherCheckbox.checked = true;
        }
        console.log(`Updated ${workgroupPrintData[index].workGroup} to ${otherValue}`);
    }
}

let currentEditIndex = null;

function editPrintCOS90(index) {
    currentEditIndex = index;
    const item = workgroupPrintData[index];
    const modal = document.getElementById('editPrintCOS90Modal');

    // Set workgroup name
    document.getElementById('txtmodal-workgroup').value = item.workGroup;

    // Set radio button
    if (item.printCOS90 === 'Yes') {
        document.getElementById('printCOS90-yes').checked = true;
    } else {
        document.getElementById('printCOS90-no').checked = true;
    }

    // Show modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closePrintModal() {
    const modal = document.getElementById('editPrintCOS90Modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        currentEditIndex = null;
    }, 300);
}

function savePrintCOS90() {
    if (currentEditIndex === null) return;

    const yesRadio = document.getElementById('printCOS90-yes');
    const noRadio = document.getElementById('printCOS90-no');

    let newValue = 'No';
    if (yesRadio.checked) {
        newValue = 'Yes';
    }

    workgroupPrintData[currentEditIndex].printCOS90 = newValue;
    // Update in main data array as well
    const workGroupName = workgroupPrintData[currentEditIndex].workGroup;
    const mainDataItem = allWorkgroupPrintData.find(item => item.workGroup === workGroupName);
    if (mainDataItem) {
        mainDataItem.printCOS90 = newValue;
    }
    console.log(`Edited ${workgroupPrintData[currentEditIndex].workGroup} to ${newValue}`);

    closePrintModal();
    renderWorkgroupPrintTable();
}

async function saveFile() {
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: "yourfilename.txt"
        });

        //const dirHandle = await window.showDirectoryPicker(); 
        // document.getElementById("inputSavetofile").value = dirHandle.name;// + '/' + handle.name;
        // Show file name in textbox
        document.getElementById("inputSavetofile").value = "C:\\fakepath\\";
        document.getElementById("inputSavetofile").value += handle.name;

        const writable = await handle.createWritable();
        await writable.write("File content here");
        await writable.close();

    } catch (e) {
        console.log(e);
    }
}

document.getElementById('excelCOS90sBtn').addEventListener('click', function () {
    const period = document.getElementById('txtstaffsearchBox').value;
    const yr = document.getElementById('dpInYear').value;
    const filelocation = document.getElementById('inputSavetofile').value;
    let error = [];

    if (!filelocation) {
        error.push('Please set the location to output the files to');
    }

    if (!period) {
        error.push('Please pick period');
    }

    if (!yr) {
        error.push('Please pick year');
    }

    if (error.length > 0) {
        alert(error.join(', '));
        return;
    }

    // Proceed with Excel generation if all validations pass
});

document.getElementById('txtDays').addEventListener('input', function () {
    let result = this.value * 7.2;
    document.getElementById('txtCVLHours').value = result.toFixed(2);
    document.getElementById('txtVIDHours').value = result.toFixed(2);
});

// ==================== Sorting and Resizing for Tables ====================

// Sorting for workgroupPrintTable
const workgroupPrintHeaders = document.querySelectorAll("#workgroupPrintTable th[data-column]");

workgroupPrintHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnIndex = parseInt(this.dataset.column);
        const currentOrder = this.dataset.order || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";

        // Remove sorting icons from all headers
        workgroupPrintHeaders.forEach(h => {
            h.classList.remove("sorted-asc", "sorted-desc");
            const existingIcon = h.querySelector(".sort-icon");
            if (existingIcon) {
                existingIcon.remove();
            }
        });

        // Update the order for the clicked header
        this.dataset.order = newOrder;

        // Add sorting icon to the clicked header
        const sortIcon = document.createElement("span");
        sortIcon.className = "sort-icon";

        if (newOrder === "asc") {
            sortIcon.innerHTML = " ▲";
            this.classList.add("sorted-asc");
        } else {
            sortIcon.innerHTML = " ▼";
            this.classList.add("sorted-desc");
        }

        // For column 1 (Print COS90?), append to the first div inside sup_flex_column
        if (columnIndex === 1) {
            const targetDiv = this.querySelector('.sup_flex_column > div:first-child');
            if (targetDiv) {
                targetDiv.appendChild(sortIcon);
            } else {
                this.appendChild(sortIcon);
            }
        } else {
            this.appendChild(sortIcon);
        }

        sortWorkgroupPrintTable(columnIndex, newOrder);
    });
});

function sortWorkgroupPrintTable(columnIndex, order) {
    const columns = ['workGroup', 'printCOS90'];
    const column = columns[columnIndex];

    workgroupPrintData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (typeof valA === "string" && typeof valB === "string") {
            return order === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        return order === "asc" ? valA - valB : valB - valA;
    });

    renderWorkgroupPrintTable();
}

// Sorting for workingHoursTable
const workingHoursHeaders = document.querySelectorAll("#workingHoursTable th[data-column]");

workingHoursHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnIndex = parseInt(this.dataset.column);
        const currentOrder = this.dataset.order || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";

        // Remove sorting icons from all headers
        workingHoursHeaders.forEach(h => {
            h.classList.remove("sorted-asc", "sorted-desc");
            const existingIcon = h.querySelector(".sort-icon");
            if (existingIcon) {
                existingIcon.remove();
            }
        });

        // Update the order for the clicked header
        this.dataset.order = newOrder;

        // Add sorting icon to the clicked header
        const sortIcon = document.createElement("span");
        sortIcon.className = "sort-icon";

        if (newOrder === "asc") {
            sortIcon.innerHTML = " ▲";
            this.classList.add("sorted-asc");
        } else {
            sortIcon.innerHTML = " ▼";
            this.classList.add("sorted-desc");
        }

        this.appendChild(sortIcon);

        sortWorkingHoursTable(columnIndex, newOrder);
    });
});

function sortWorkingHoursTable(columnIndex, order) {
    const columns = ['Year', 'Month', 'Days', 'CVLHours', 'VIDHours'];
    const column = columns[columnIndex];

    workingHoursData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (typeof valA === "string" && typeof valB === "string") {
            return order === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        return order === "asc" ? valA - valB : valB - valA;
    });

    renderWorkingHoursTable();
}

// Column resizing for both tables
const resizers = document.querySelectorAll(".resizer");

resizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation();  // prevent sort click

        const th = this.parentElement;
        const startX = e.pageX;
        const startWidth = th.offsetWidth;

        function onMouseMove(e) {
            const newWidth = startWidth + (e.pageX - startX);
            th.style.width = newWidth + "px";
            th.style.minWidth = newWidth + "px";
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});