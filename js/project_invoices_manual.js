// Project Invoices Manual - JavaScript Handler
// This script manages the project code selection and filtering for invoices and sub-contracts

// Month data for dropdown (loaded from JSON)
let monthsData = [];

// Project codes data for dropdown
let projectCodesData = [];
let invoicesData = []; // This will hold the invoices data loaded from JSON
 

// Global state
let currentSortColumn = null;
let currentSortDirection = 'asc';
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [];
let editingIndex = null;



/**
 * Load months data from JSON file
 */
async function loadMonthsData() {
    try {
        const response = await fetch('../js/pact_js/data/month-list.json');
        if (!response.ok) throw new Error('Failed to load months data');
        monthsData = await response.json();

         const invoicesResponse = await fetch('../js/pact_js/data/invoices.json');
        if (!invoicesResponse.ok) throw new Error('Failed to load invoices data');
        invoicesData = await invoicesResponse.json();

        return true;
    } catch (error) {
        console.error('Error loading months data:', error);
        // Fallback data if JSON fails to load
        monthsData = [
            { period: 1, monthName: "April", monthNumber: 4 },
            { period: 2, monthName: "May", monthNumber: 5 },
            { period: 3, monthName: "June", monthNumber: 6 },
            { period: 4, monthName: "July", monthNumber: 7 },
            { period: 5, monthName: "August", monthNumber: 8 },
            { period: 6, monthName: "September", monthNumber: 9 },
            { period: 7, monthName: "October", monthNumber: 10 },
            { period: 8, monthName: "November", monthNumber: 11 },
            { period: 9, monthName: "December", monthNumber: 12 },
            { period: 10, monthName: "January", monthNumber: 1 },
            { period: 11, monthName: "February", monthNumber: 2 },
            { period: 12, monthName: "March", monthNumber: 3 }
        ];
        return false;
    }
}

/**
 * Initialize all data-empdropdown elements
 */
function initializeDropdowns() {
    document.querySelectorAll('[data-empdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'months') {
            initMonthDropdown(dd, monthsData, true); // true = is filter dropdown
        }
    });

     document.querySelectorAll('[data-editmonthdropdown]').forEach(dd => { 
         const source = dd.dataset.source;
         if (source === 'editmodal-month') {
             initMonthDropdown(dd, monthsData, false); // false = is modal dropdown
         }
     });
}

/**
 * Populate select dropdown
 */
function populateSelect(selectElement, data, valueKey, textKey) {
    if (!selectElement) return;
    
    // Build options HTML with selected attribute on default option
    let optionsHTML = '<option value="" selected>-- Select Project --</option>';
    
    data.forEach(item => {
        optionsHTML += `<option value="${item[valueKey]}">${item[textKey]}</option>`;
    });
    
    selectElement.innerHTML = optionsHTML;
    
    // Force selection after DOM update
    setTimeout(() => {
        selectElement.selectedIndex = 0;
        selectElement.value = '';
    }, 0);
}

/**
 * Load project list from JSON
 */
async function loadProjectList() {
    try {
        const response = await fetch('../js/pact_js/data/project-codes.json');
        if (!response.ok) throw new Error('Failed to load project list');
        projectCodesData = await response.json();
       
        // Populate project code select dropdown
        populateSelect(document.getElementById('projectCodeSelect'), projectCodesData, 'code', 'code');
        populateSelect(document.getElementById('dpmodalproject'), projectCodesData, 'code', 'code');
       
        
        return true;
    } catch (error) {
        console.error('Error loading project list:', error);
        return false;
    }
}

/**
 * Initialize month dropdown with search functionality
 * @param {HTMLElement} dropdown - The dropdown container element
 * @param {Array} dataset - Array of month objects
 * @param {Boolean} isFilter - True if this is a filter dropdown, false if modal dropdown
 */
function initMonthDropdown(dropdown, dataset, isFilter = true) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.select-search-box');
    const clearBtn = dropdown.querySelector('.clear-search-btn');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        // Add "Clear Filter" option at the top (only for filter dropdowns)
        if (!filter && isFilter) {
            const clearTr = document.createElement('tr');
            clearTr.innerHTML = '<td colspan="2" style="font-style: italic; color: #666; text-align: center;">-- All Months --</td>';
            clearTr.onclick = () => {
                input.value = '';
                panel.style.display = 'none';
                // Clear project code dropdown when clearing month
                const projectInput = document.getElementById('projectCodeSelect');
                if (projectInput) projectInput.value = '';
                filterAndRenderInvoices();
            };
            tbody.appendChild(clearTr);
        }
        
        dataset
            .filter(d =>
                d.monthName.toLowerCase().includes(filter) || d.period.toString().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="sup_text_center">${d.period}</td><td class="sup_text_center">${d.monthName}</td>`;
                tr.onclick = () => {
                    input.value = d.period;
                    panel.style.display = 'none';
                    
                    // Only apply filtering logic for filter dropdowns, not modal dropdowns
                    if (isFilter) {
                        // Clear project code dropdown when month is selected
                        const projectInput = document.getElementById('projectCodeSelect');
                        if (projectInput) projectInput.value = '';
                        filterAndRenderInvoices();
                    }
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        if (search) {
            search.value = '';
            search.focus();
        }
        renderRows();
    });

    if (search) {
        search.addEventListener('input', e => {
            renderRows(e.target.value.toLowerCase());
        });
    }
    
    // Clear search button functionality
    if (clearBtn && search) {
        clearBtn.addEventListener('click', e => {
            e.stopPropagation();
            search.value = '';
            renderRows();
            search.focus();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

/**
 * Setup event listeners for filter controls
 */
function setupFilterListeners() {
    const projectCodeSelect = document.getElementById('projectCodeSelect');
    
    if (projectCodeSelect) {
        projectCodeSelect.addEventListener('change', function() {
            // Clear month selection when project code changes
            const monthInput = document.getElementById('monthSelect');
            if (monthInput) monthInput.value = '';
            filterAndRenderInvoices();
        });
    }
}

/**
 * Initialize invoice table with sorting and pagination
 */
function initializeInvoiceTable() {
    setupTableSorting();
    filterAndRenderInvoices();
}

/**
 * Setup table sorting functionality
 */
function setupTableSorting() {
    const table = document.getElementById('invoiceTable');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-column]');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const column = parseInt(this.dataset.column);
            sortTable(column);
        });
    });
}

/**
 * Sort table by column
 */
function sortTable(column) {
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    filterAndRenderInvoices();
}

/**
 * Filter and render invoices based on current filters
 */
function filterAndRenderInvoices() {
    const monthSelect = document.getElementById('monthSelect');
    const projectCodeSelect = document.getElementById('projectCodeSelect');
    
    const selectedMonth = monthSelect ? monthSelect.value : '';
    const selectedProject = projectCodeSelect ? projectCodeSelect.value : '';
    
    // Filter data
    filteredData = invoicesData.filter(invoice => {
        const matchesMonth = !selectedMonth || invoice.month === selectedMonth;
        const matchesProject = !selectedProject || invoice.project === selectedProject;
        return matchesMonth && matchesProject;
    });
    
    // Sort data
    if (currentSortColumn !== null) {
        filteredData.sort((a, b) => {
            const keys = ['project', 'month', 'amount', 'costOfWork', 'wip', 'profitLoss', 'details', 'invCntr'];
            const key = keys[currentSortColumn];
            
            let aVal = a[key];
            let bVal = b[key];
            
            // Handle numeric columns
            if (typeof aVal === 'number') {
                return currentSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }
            
            // Handle string columns
            aVal = String(aVal).toLowerCase();
            bVal = String(bVal).toLowerCase();
            
            if (currentSortDirection === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }
    
    // Reset to page 1 when filtering changes
    currentPage = 1;
    
    renderInvoiceTable();
    updateSortIcons();
}

/**
 * Render invoice table with pagination
 */
function renderInvoiceTable() {
    const tbody = document.getElementById('invoiceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Check if there are no records
    if (pageData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="9" style="text-align: center; padding: 20px; font-style: italic; color: #666;">
                No record found
            </td>
        `;
        tbody.appendChild(row);
        renderPagination();
        return;
    }
    
    // Render rows
    pageData.forEach((invoice, index) => {
        const actualIndex = invoicesData.findIndex(inv => 
            inv.id === invoice.id || 
            (inv.project === invoice.project && inv.month === invoice.month && inv.invCntr === invoice.invCntr)
        );
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.project}</td>
            <td>${invoice.month}</td>
            <td style="text-align: right;">£${invoice.amount.toFixed(2)}</td>
            <td style="text-align: right;">£${invoice.costOfWork.toFixed(2)}</td>
            <td style="text-align: right;">£${invoice.wip.toFixed(2)}</td>
            <td style="text-align: right;">£${invoice.profitLoss.toFixed(2)}</td>
            <td>${invoice.details}</td>
            <td>${invoice.invCntr}</td>
            <td class="sup_text_center">
                <button class="edit-btn" data-item='${JSON.stringify(invoice)}' data-index="${actualIndex}" 
                    onclick="editInvoiceWithData(event)" 
                    style="background: none; border: none; cursor: pointer;" 
                    aria-label="Edit invoice">
                    <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                </button>
                <button class="delete-btn" onclick="deleteInvoice(${actualIndex})" 
                    style="background: none; border: none; cursor: pointer;" 
                    aria-label="Delete invoice">
                    <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination();
}

/**
 * Update sort icons in table headers
 */
function updateSortIcons() {
    const table = document.getElementById('invoiceTable');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-column]');
    
    headers.forEach(header => {
        const column = parseInt(header.dataset.column);
        
        // Remove existing classes and icons
        header.classList.remove('sorted-asc', 'sorted-desc');
        const existingIcon = header.querySelector('.sort-icon');
        if (existingIcon) existingIcon.remove();
        
        // Add current sort indicator
        if (column === currentSortColumn) {
            header.classList.add(currentSortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            const icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.textContent = currentSortDirection === 'asc' ? '▲' : '▼';
            header.appendChild(icon);
        }
    });
}

/**
 * Render pagination controls
 */
function renderPagination() {
    const pagination = document.getElementById('invoicePagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    
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
    prevItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderInvoiceTable();
        }
    });
    pagination.appendChild(prevItem);
    
    // Page numbers with smart range display
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
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderInvoiceTable();
            });
        }
        pagination.appendChild(pageItem);
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
    nextItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderInvoiceTable();
        }
    });
    pagination.appendChild(nextItem);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Records per page change
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function() {
            recordsPerPage = parseInt(this.value);
            currentPage = 1;
            renderInvoiceTable();
        });
    }
    
    // Export Excel button
    // const exportBtn = document.getElementById('exportInvoiceExcel');
    // if (exportBtn) {
    //     exportBtn.addEventListener('click', exportToExcel);
    // }
    
    // Add Invoice button
    const addBtn = document.getElementById('addInvoiceBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            openInvoiceModal();
        });
    }
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    const modal = document.getElementById('addInvoiceModal');
    const closeBtn = document.getElementById('closeInvoiceModalBtn');
    const cancelBtn = document.getElementById('cancelInvoiceModalBtn');
    const saveBtn = document.getElementById('saveInvoiceBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeInvoiceModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeInvoiceModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveInvoice();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeInvoiceModal();
            }
        });
    }
}

/**
 * Export filtered data to Excel
 */
function exportToExcel() {
    showGovukAlert('Export to Excel functionality - Requires XLSX library integration');
    // This would use the xlsx library similar to workgroup_management.html
}

/**
 * Open invoice modal for add or edit
 */
function openInvoiceModal(item = null, index = null) {
    const modal = document.getElementById('addInvoiceModal');
    editingIndex = index;
    
    if (item !== null) {
        // Edit mode
        document.getElementById('divInvoicecounter').style.display = 'block';
        document.getElementById('dpmodalproject').value = item.project;
        document.getElementById('txtmodal-month').value = item.month;
        document.getElementById('txtmodal-amount').value = item.amount;
        document.getElementById('txtmodal-costofwork').value = item.costOfWork;
        document.getElementById('txtmodal-wip').value = item.wip;
        document.getElementById('txtmodal-profitloss').value = item.profitLoss;
        document.getElementById('txtmodal-details').value = item.details;
        document.getElementById('txtmodal-invcntr').value = item.invCntr;
        document.getElementById('invoiceModalLabel').textContent = 'Edit Invoice';
    } else {
        // Add mode
        document.getElementById('formAddInvoice').reset();
        document.getElementById('divInvoicecounter').style.display = 'none';
        document.getElementById('invoiceModalLabel').textContent = 'Add Invoice';
    }
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Close invoice modal
 */
function closeInvoiceModal() {
    const modal = document.getElementById('addInvoiceModal');
    
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddInvoice').reset();
            editingIndex = null;
        }, 300);
    }
}

/**
 * Save invoice (add or update)
 */
function saveInvoice() {
    const project = document.getElementById('dpmodalproject').value.trim();
    const month = document.getElementById('txtmodal-month').value.trim();
    const amount = parseFloat(document.getElementById('txtmodal-amount').value);
    const costOfWork = parseFloat(document.getElementById('txtmodal-costofwork').value);
    const wip = parseFloat(document.getElementById('txtmodal-wip').value);
    const profitLoss = parseFloat(document.getElementById('txtmodal-profitloss').value);
    const details = document.getElementById('txtmodal-details').value.trim();
   const invCntr = 1000 + (invoicesData.length + 1); // Simple counter for invoice number, can be improved
    
    // Validation
    if (!project) {
        showGovukAlert('Project field should not be empty');
        return;
    }
    
    const newEntry = {
        id: editingIndex !== null ? invoicesData[editingIndex].id : (invoicesData.length > 0 ? Math.max(...invoicesData.map(inv => inv.id || 0)) + 1 : 1),
        project: project,
        month: month,
        amount: amount || 0,
        costOfWork: costOfWork || 0,
        wip: wip || 0,
        profitLoss: profitLoss || 0,
        details: details,
        invCntr: document.getElementById('txtmodal-invcntr').value.trim() || invCntr 
    };
    
    if (editingIndex !== null) {
        // Update existing entry
        invoicesData[editingIndex] = newEntry;
        showGovukAlert('Invoice updated successfully!');
    } else {
        // Add new entry
        invoicesData.push(newEntry);
        showGovukAlert('Invoice added successfully!');
    }
    
    closeInvoiceModal();
    filterAndRenderInvoices();
}

/**
 * Edit invoice with data
 */
function editInvoiceWithData(event) {
    const button = event.currentTarget;
    const item = JSON.parse(button.dataset.item);
    const index = parseInt(button.dataset.index);
    openInvoiceModal(item, index);
}

/**
 * Delete invoice
 */
function deleteInvoice(index) {
    showGovukConfirm('Are you sure you want to delete this invoice?').then((result) => {
        if (result) {
        invoicesData.splice(index, 1);
        filterAndRenderInvoices();
        showGovukAlert('Invoice deleted successfully!');
    }
    });
}

/**
 * Edit invoice (legacy function - kept for compatibility)
 */
function editInvoice(id) {
    const invoice = invoicesData.find(inv => inv.id === id);
    if (invoice) {
        const index = invoicesData.findIndex(inv => inv.id === id);
        openInvoiceModal(invoice, index);
    }
}

/**
 * Update invoice summary (total amount, etc.)
 */
function updateInvoiceSummary() {
    const tableBody = document.getElementById('invoiceTableBody');
    const totalAmountInput = document.getElementById('txtTotalAmount');
    
    if (!tableBody || !totalAmountInput) return;
    
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.style.display !== 'none') {
            // Assuming Amount is in the 3rd column (index 2)
            const amountCell = row.getElementsByTagName('td')[2];
            if (amountCell) {
                const amountText = amountCell.textContent || amountCell.innerText;
                const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                if (!isNaN(amount)) {
                    total += amount;
                }
            }
        }
    }
    
    totalAmountInput.value = formatCurrency(total);
}

/**
 * Update test data (sub-contracts) summary
 */
function updateTestDataSummary() {
    const tableBody = document.getElementById('testDataTableBody');
    const totalAmountInput = document.getElementById('txtTestDataTotalAmount');
    
    if (!tableBody || !totalAmountInput) return;
    
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.style.display !== 'none') {
            // Assuming Amount is in the 3rd column (index 2)
            const amountCell = row.getElementsByTagName('td')[2];
            if (amountCell) {
                const amountText = amountCell.textContent || amountCell.innerText;
                const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                if (!isNaN(amount)) {
                    total += amount;
                }
            }
        }
    }
    
    totalAmountInput.value = formatCurrency(total);
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(amount);
}

/**
 * Get selected project code from invoice dropdown
 * @returns {string} Selected project code or empty string
 */
function getSelectedInvoiceProjectCode() {
    const select = document.getElementById('projectCodeSelect');
    return select ? select.value : '';
}

/**
 * Get selected project code from test data dropdown
 * @returns {string} Selected project code or empty string
 */
function getSelectedTestDataProjectCode() {
    const select = document.getElementById('testDataProjectCodeSelect');
    return select ? select.value : '';
}

/**
 * Reset invoice filters
 */
function resetInvoiceFilters() {
    const projectCodeSelect = document.getElementById('projectCodeSelect');
    const monthSelect = document.getElementById('monthSelect');
    
    if (projectCodeSelect) projectCodeSelect.value = '';
    if (monthSelect) monthSelect.value = '';
    
    filterInvoiceTable('', '');
}

/**
 * Reset test data filters
 */
function resetTestDataFilters() {
    const testDataProjectCodeSelect = document.getElementById('testDataProjectCodeSelect');
    const testDataSearch = document.getElementById('testDataSearch');
    
    if (testDataProjectCodeSelect) testDataProjectCodeSelect.value = '';
    if (testDataSearch) testDataSearch.value = '';
    
    filterTestDataTable('', '');
}

// Export functions for external use if needed
window.projectInvoicesManual = {
    getSelectedInvoiceProjectCode,
    getSelectedTestDataProjectCode,
    resetInvoiceFilters,
    resetTestDataFilters,
   // filterInvoiceTable,
   // filterTestDataTable
};

// Populate select dropdown
function populateSelect(selectElement, data, valueKey, textKey) {
    if (!selectElement) return;
    
    // Build options HTML with selected attribute on default option
    let optionsHTML = '<option value="" selected>-- Select Project --</option>';
    
    data.forEach(item => {
        optionsHTML += `<option value="${item[valueKey]}">${item[textKey]}</option>`;
    });
    
    selectElement.innerHTML = optionsHTML;
    
    // Force selection after DOM update
    setTimeout(() => {
        selectElement.selectedIndex = 0;
        selectElement.value = '';
    }, 0);
}


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    await loadMonthsData();
    await loadProjectList();
    initializeDropdowns();
    setupEventListeners();
    setupFilterListeners();
    initializeInvoiceTable();
    setupModalEventListeners();
});