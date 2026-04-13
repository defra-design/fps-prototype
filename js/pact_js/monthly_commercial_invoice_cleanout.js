// Project Parent Invoice Data - JavaScript Handler
// This script manages the project parent invoice table

let projectParentInvoiceData = [];
let monthsData = [];
let projectParentCodesData = [];

// Global state
let currentSortColumn = null;
let currentSortDirection = 'asc';
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [];

/**
 * Load project parent invoice data from JSON file
 */
async function loadProjectParentInvoiceData() {
    try {
        const response = await fetch('../js/pact_js/data/monthly_commercial_invoice_cleanout_data.json');
        if (!response.ok) throw new Error('Failed to load project parent invoice data');
        projectParentInvoiceData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading project parent invoice data:', error);
        projectParentInvoiceData = [];
        return false;
    }
}

/**
 * Load months data from JSON file
 */
async function loadMonthsData() {
    try {
        const response = await fetch('../js/pact_js/data/month-list.json');
        if (!response.ok) throw new Error('Failed to load months data');
        monthsData = await response.json();
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
 * Load project parent codes from JSON
 */
async function loadProjectParentCodesData() {
    try {
        const response = await fetch('../js/pact_js/data/project-codes.json');
        if (!response.ok) throw new Error('Failed to load project parent codes');
        projectParentCodesData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading project parent codes:', error);
        projectParentCodesData = [];
        return false;
    }
}

/**
 * Populate select dropdown
 */
function populateSelect(selectElement, data, valueKey, textKey) {
    if (!selectElement) return;
    
    // Build options HTML with selected attribute on default option
    let optionsHTML = '<option value="" selected>-- Select Project Parent --</option>';
    
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
 * Initialize month dropdown with search functionality
 * @param {HTMLElement} dropdown - The dropdown container element
 * @param {Array} dataset - Array of month objects
 */
function initMonthDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const clearBtn = dropdown.querySelector('.clear-search-btn');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
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
 * Initialize all dropdowns
 */
function initializeDropdowns() {
    // Initialize modal month dropdown
    document.querySelectorAll('[data-editmonthdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'editmodal-month') {
            initMonthDropdown(dd, monthsData);
        }
    });
    
    // Populate project parent select dropdown
    populateSelect(document.getElementById('txtmodal-projectparent'), projectParentCodesData, 'code', 'code');
}


/**
 * Initialize project parent invoice table with sorting and pagination
 */
function initializeProjectParentInvoiceTable() {
    setupTableSorting();
    filterAndRenderProjectParentInvoice();
}

/**
 * Setup table sorting functionality
 */
function setupTableSorting() {
    const table = document.getElementById('projectParentInvoiceTable');
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
    
    filterAndRenderProjectParentInvoice();
}

/**
 * Filter and render project parent invoice data based on current filters
 */
function filterAndRenderProjectParentInvoice() {
    // Filter data (no filters for now, just use all data)
    filteredData = [...projectParentInvoiceData];
    
    // Sort data
    if (currentSortColumn !== null) {
        filteredData.sort((a, b) => {
            const keys = ['projectParent', 'month', 'amount', 'costOfWork', 'wip'];
            const key = keys[currentSortColumn];
            
            let aVal = a[key];
            let bVal = b[key];
            
            // Handle null values
            if (aVal === null && bVal === null) return 0;
            if (aVal === null) return currentSortDirection === 'asc' ? 1 : -1;
            if (bVal === null) return currentSortDirection === 'asc' ? -1 : 1;
            
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
    
    renderProjectParentInvoiceTable();
    updateSortIcons();
}

/**
 * Format currency value
 */
function formatCurrency(value) {
    if (value === null || value === undefined) return '';
    return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Render project parent invoice table with pagination
 */
function renderProjectParentInvoiceTable() {
    const tbody = document.getElementById('projectParentInvoiceTableBody');
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
            <td colspan="5" style="text-align: center; padding: 20px; font-style: italic; color: #666;">
                No record found
            </td>
        `;
        tbody.appendChild(row);
        renderPagination();
        return;
    }
    
    // Render rows
    pageData.forEach((item, index) => {
        const actualIndex = startIndex + index;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.projectParent || ''}</td>
            <td>${item.month || ''}</td>
            <td style="text-align: right;">${formatCurrency(item.amount)}</td>
            <td style="text-align: right;">${formatCurrency(item.costOfWork)}</td>
            <td style="text-align: right;">${formatCurrency(item.wip)}</td>
            <td class="sup_text_center">
                <button class="edit-btn" data-item='${JSON.stringify(item)}' data-index="${actualIndex}" 
                    onclick="editProjectParentInvoice(event)" 
                    style="background: none; border: none; cursor: pointer;" 
                    aria-label="Edit invoice">
                    <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                </button>
                <button class="delete-btn" onclick="deleteProjectParentInvoice(${actualIndex})" 
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
    const table = document.getElementById('projectParentInvoiceTable');
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
    const pagination = document.getElementById('projectParentInvoicePagination');
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
            renderProjectParentInvoiceTable();
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
                renderProjectParentInvoiceTable();
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
            renderProjectParentInvoiceTable();
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
            renderProjectParentInvoiceTable();
        });
    }
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    const modal = document.getElementById('addProjectParentInvoiceModal');
    const closeBtn = document.getElementById('closeProjectParentInvoiceModalBtn');
    const cancelBtn = document.getElementById('cancelProjectParentInvoiceModalBtn');
    const saveBtn = document.getElementById('saveProjectParentInvoiceBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectParentInvoiceModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeProjectParentInvoiceModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveProjectParentInvoice();
        });
    }
    
    // Close modal when clicking outside
    // if (modal) {
    //     modal.addEventListener('click', function(e) {
    //         if (e.target === modal) {
    //             closeProjectParentInvoiceModal();
    //         }
    //     });
    // }
    
    // Add Invoice button
    const addBtn = document.getElementById('addProjectParentInvoiceBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            openProjectParentInvoiceModal();
        });
    }
}

/**
 * Open modal for add or edit
 */
let editingIndex = null;

function openProjectParentInvoiceModal(item = null, index = null) {
    const modal = document.getElementById('addProjectParentInvoiceModal');
    editingIndex = index;
    
    if (item !== null) {
        // Edit mode
        document.getElementById('txtmodal-projectparent').value = item.projectParent || '';
        document.getElementById('txtmodal-projectparent').disabled = true; // Project Parent should not be editable
        document.getElementById('txtmodal-month').value = item.month || '';
        document.getElementById('txtmodal-amount').value = item.amount || '';
        document.getElementById('txtmodal-costofwork').value = item.costOfWork || '';
        document.getElementById('txtmodal-wip').value = item.wip || '';
        document.getElementById('projectParentInvoiceModalLabel').textContent = 'Edit Invoice';
    } else {
        // Add mode
        document.getElementById('formAddProjectParentInvoice').reset();
        document.getElementById('txtmodal-projectparent').disabled = false;
        document.getElementById('projectParentInvoiceModalLabel').textContent = 'Add Invoice';
    }
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Close modal
 */
function closeProjectParentInvoiceModal() {
    const modal = document.getElementById('addProjectParentInvoiceModal');
    
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddProjectParentInvoice').reset();
            editingIndex = null;
        }, 300);
    }
}

/**
 * Save invoice (add or update)
 */
function saveProjectParentInvoice() {
    const projectParent = document.getElementById('txtmodal-projectparent').value.trim();
    const month = document.getElementById('txtmodal-month').value.trim();
    const amount = parseFloat(document.getElementById('txtmodal-amount').value) || 0;
    const costOfWork = parseFloat(document.getElementById('txtmodal-costofwork').value) || 0;
    const wip = parseFloat(document.getElementById('txtmodal-wip').value) || 0;
    
    // Validation
    //if (!projectParent || !month || isNaN(amount)) {
    if (!projectParent) {
        alert('Project field should not be empty');
        return;
    }
    
    const newEntry = {
        id: editingIndex !== null ? projectParentInvoiceData[editingIndex].id : (projectParentInvoiceData.length > 0 ? Math.max(...projectParentInvoiceData.map(inv => inv.id || 0)) + 1 : 1),
        projectParent: projectParent,
        month: month,
        amount: amount,
        costOfWork: costOfWork,
        wip: wip
    };
    
    if (editingIndex !== null) {
        // Update existing entry
        projectParentInvoiceData[editingIndex] = newEntry;
        alert('Invoice updated successfully!');
    } else {
        // Add new entry
        projectParentInvoiceData.push(newEntry);
        alert('Invoice added successfully!');
    }
    
    closeProjectParentInvoiceModal();
    filterAndRenderProjectParentInvoice();
}

/**
 * Edit invoice with data
 */
function editProjectParentInvoice(event) {
    const button = event.currentTarget;
    const item = JSON.parse(button.dataset.item);
    const index = parseInt(button.dataset.index);
    openProjectParentInvoiceModal(item, index);
}

/**
 * Delete invoice
 */
function deleteProjectParentInvoice(index) {
    const item = projectParentInvoiceData[index];
    if (confirm(`Are you sure you want to delete invoice for ${item.projectParent}?`)) {
        projectParentInvoiceData.splice(index, 1);
        filterAndRenderProjectParentInvoice();
        alert('Invoice deleted successfully!');
    }
}

document.getElementById('btnPasteErrors').addEventListener('click', function() {
    alert('Print paste errors');
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    await loadProjectParentInvoiceData();
    await loadMonthsData();
    await loadProjectParentCodesData();
    initializeDropdowns();
    setupEventListeners();
    setupModalEventListeners();
    initializeProjectParentInvoiceTable();
});
