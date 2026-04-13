// WIP Data - JavaScript Handler
// This script manages the WIP (Work In Progress) data table

let wipData = [];
let projectCodesData = [];

// Global state
let currentSortColumn = null;
let currentSortDirection = 'asc';
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [];
let editingIndex = -1;

/**
 * Load WIP data from JSON file
 */
async function loadWIPData() {
    try {
        const response = await fetch('../js/pact_js/data/wip_override_facility_data.json');
        if (!response.ok) throw new Error('Failed to load WIP data');
        wipData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading WIP data:', error);
        wipData = [];
        return false;
    }
}

/**
 * Load project codes from JSON
 */
async function loadProjectCodesData() {
    try {
        const response = await fetch('../js/pact_js/data/project-codes.json');
        if (!response.ok) throw new Error('Failed to load project codes');
        projectCodesData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading project codes:', error);
        projectCodesData = [];
        return false;
    }
}

/**
 * Populate select dropdown
 */
function populateProjectSelect(selectElement, data, valueKey, textKey) {
    if (!selectElement) return;
    
    // Build options HTML with selected attribute on default option
    let optionsHTML = '<option value="" selected>-- Select Parent Project --</option>';
    
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
 * Initialize WIP table with sorting and pagination
 */
function initializeWIPTable() {
    setupTableSorting();
    setupPaginationControls();
    setupModalEventListeners();
    populateProjectSelect(document.getElementById('txtmodal-parentproject'), projectCodesData, 'code', 'code');
    filterAndRenderWIP();
}

/**
 * Update sort icons in table headers
 */
function updateSortIcons() {
    const table = document.getElementById('wipTable');
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
            icon.innerHTML = currentSortDirection === 'asc' ? '▲' : '▼';
            header.appendChild(icon);
        }
    });
}

/**
 * Setup table sorting functionality
 */
function setupTableSorting() {
    const table = document.getElementById('wipTable');
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
    
    filterAndRenderWIP();
}

/**
 * Filter and render WIP data based on current filters
 */
function filterAndRenderWIP() {
    // Filter data (no filters for now, just use all data)
    filteredData = [...wipData];
    
    // Sort data
    if (currentSortColumn !== null) {
        filteredData.sort((a, b) => {
            const keys = ['parentProject', 'wipEOY', 'wipLimit', 'wipCurrent'];
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
    
    renderWIPTable();
    renderWIPPagination();
    updateSortIcons();
}

/**
 * Render WIP table with current page data
 */
function renderWIPTable() {
    const tbody = document.getElementById('wipTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, filteredData.length);
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Render rows
    pageData.forEach((item, index) => {
        const actualIndex = startIndex + index;
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        // Format currency values
        const formatCurrency = (value) => {
            if (value === null || value === undefined || value === '') return '';
            return new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 2
            }).format(value);
        };
        
        row.innerHTML = `
            <td class="govuk-table__cell">${item.parentProject || ''}</td>
            <td class="govuk-table__cell">${formatCurrency(item.wipEOY)}</td>
            <td class="govuk-table__cell">${formatCurrency(item.wipLimit)}</td>
            <td class="govuk-table__cell">${formatCurrency(item.wipCurrent)}</td>
            <td class="govuk-table__cell sup_text_center">
                <button class="edit-btn" onclick="editWIP(${actualIndex})" 
                    style="background: none; border: none; cursor: pointer;" 
                    aria-label="Edit ${item.parentProject}">
                    <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                </button>
               <!-- <button class="delete-btn" onclick="deleteWIP(${actualIndex})" 
                    style="background: none; border: none; cursor: pointer;" 
                    aria-label="Delete ${item.parentProject}">
                    <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                </button>-->
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // If no data
    if (pageData.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="5" class="govuk-table__cell" style="text-align: center;">No records found</td>';
        tbody.appendChild(row);
    }
}

/**
 * Render pagination controls
 */
function renderWIPPagination() {
    const pagination = document.getElementById('wipPagination');
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
            filterAndRenderWIP();
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
                filterAndRenderWIP();
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
            filterAndRenderWIP();
        }
    });
    pagination.appendChild(nextItem);
}

/**
 * Setup pagination controls
 */
function setupPaginationControls() {
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function() {
            recordsPerPage = parseInt(this.value);
            currentPage = 1;
            filterAndRenderWIP();
        });
    }
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    const addBtn = document.getElementById('addWIPBtn');
    const modal = document.getElementById('addWIPModal');
    const closeBtn = document.getElementById('closeWIPModalBtn');
    const cancelBtn = document.getElementById('cancelWIPModalBtn');
    const saveBtn = document.getElementById('saveWIPBtn');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => openWIPModal());
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeWIPModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeWIPModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveWIP);
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeWIPModal();
            }
        });
    }
}

/**
 * Open WIP modal for add or edit
 */
function openWIPModal(item = null, index = -1) {
    const modal = document.getElementById('addWIPModal');
    const modalTitle = document.getElementById('wipModalLabel');
    const form = document.getElementById('formAddWIP');
    
    editingIndex = index;
    
    if (item) {
        modalTitle.textContent = 'Edit WIP Data';
        document.getElementById('txtmodal-parentproject').value = item.parentProject || '';
        document.getElementById('txtmodal-parentproject').disabled = true; // Don't allow changing parent project
        document.getElementById('txtmodal-wipeoy').value = item.wipEOY !== null ? item.wipEOY : '';
        document.getElementById('txtmodal-wiplimit').value = item.wipLimit !== null ? item.wipLimit : '';
        document.getElementById('txtmodal-wipcurrent').value = item.wipCurrent !== null ? item.wipCurrent : '';
    } else {
        modalTitle.textContent = 'Add WIP Data';
        form.reset();
        document.getElementById('txtmodal-parentproject').disabled = false;
    }
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

/**
 * Close WIP modal
 */
function closeWIPModal() {
    const modal = document.getElementById('addWIPModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
    editingIndex = -1;
}

/**
 * Save WIP data (add or update)
 */
function saveWIP() {
    const parentProject = document.getElementById('txtmodal-parentproject').value.trim();
    const wipEOY = document.getElementById('txtmodal-wipeoy').value.trim();
    const wipLimit = document.getElementById('txtmodal-wiplimit').value.trim();
    const wipCurrent = document.getElementById('txtmodal-wipcurrent').value.trim();
    
    // Validation
    if (!parentProject) {
        alert('Parent Project is required');
        return;
    }
    
    if (!wipEOY) {
        alert('WIP EOY is required');
        return;
    }
    
    if (isNaN(parseFloat(wipEOY))) {
        alert('WIP EOY must be a valid number');
        return;
    }
    
    if (wipLimit && isNaN(parseFloat(wipLimit))) {
        alert('WIP Limit must be a valid number');
        return;
    }
    
    if (wipCurrent && isNaN(parseFloat(wipCurrent))) {
        alert('WIP Current must be a valid number');
        return;
    }
    
    const wipItem = {
        parentProject: parentProject,
        wipEOY: parseFloat(wipEOY),
        wipLimit: wipLimit ? parseFloat(wipLimit) : 0,
        wipCurrent: wipCurrent ? parseFloat(wipCurrent) : 0
    };
    
    if (editingIndex >= 0) {
        // Update existing
        wipItem.id = filteredData[editingIndex].id;
        const originalIndex = wipData.findIndex(item => item.id === wipItem.id);
        if (originalIndex >= 0) {
            wipData[originalIndex] = wipItem;
        }
        alert('WIP data updated successfully');
    } else {
        // Add new
        wipItem.id = wipData.length > 0 ? Math.max(...wipData.map(i => i.id)) + 1 : 1;
        wipData.push(wipItem);
        alert('WIP data added successfully');
    }
    
    closeWIPModal();
    filterAndRenderWIP();
}

/**
 * Edit WIP data
 */
function editWIP(index) {
    const item = filteredData[index];
    openWIPModal(item, index);
}

/**
 * Delete WIP data
 */
function deleteWIP(index) {
    const item = filteredData[index];
    if (confirm(`Are you sure you want to delete ${item.parentProject}?`)) {
        const originalIndex = wipData.findIndex(w => w.id === item.id);
        if (originalIndex >= 0) {
            wipData.splice(originalIndex, 1);
            alert('WIP data deleted successfully');
            filterAndRenderWIP();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await loadWIPData();
    await loadProjectCodesData();
    initializeWIPTable();
});
