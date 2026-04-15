// Program Financial Data - JavaScript Handler
// This script manages the program financial summary table

let programFinancialData = [];

// Global state
let currentSortColumn = null;
let currentSortDirection = 'asc';
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [];

/**
 * Load program financial data from JSON file
 */
async function loadProgramFinancialData() {
    try {
        const response = await fetch('../js/pact_js/data/invoicebymonth-data.json');
        if (!response.ok) throw new Error('Failed to load program financial data');
        programFinancialData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading program financial data:', error);
        programFinancialData = [];
        return false;
    }
}

/**
 * Initialize program financial table with sorting and pagination
 */
function initializeProgramFinancialTable() {
    setupTableSorting();
    filterAndRenderProgramFinancial();
}

/**
 * Setup table sorting functionality
 */
function setupTableSorting() {
    const table = document.getElementById('programFinancialTable');
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
    
    filterAndRenderProgramFinancial();
}

/**
 * Filter and render program financial data based on current filters
 */
function filterAndRenderProgramFinancial() {
    // Filter data (no filters for now, just use all data)
    filteredData = [...programFinancialData];
    
    // Sort data
    if (currentSortColumn !== null) {
        filteredData.sort((a, b) => {
            const keys = ['program', 'parentProject', 'period1', 'period2', 'period3', 'period4', 'period5', 'period7', 'period8', 'period10', 'period11', 'period12'];
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
    
    renderProgramFinancialTable();
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
 * Render program financial table with pagination
 */
function renderProgramFinancialTable() {
    const tbody = document.getElementById('programFinancialTableBody');
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
            <td colspan="12" style="text-align: center; padding: 20px; font-style: italic; color: #666;">
                No record found
            </td>
        `;
        tbody.appendChild(row);
        renderPagination();
        return;
    }
    
    // Render rows
    pageData.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.program || ''}</td>
            <td>${item.parentProject || ''}</td>
            <td style="text-align: right;">${formatCurrency(item.period1)}</td>
            <td style="text-align: right;">${formatCurrency(item.period2)}</td>
            <td style="text-align: right;">${formatCurrency(item.period3)}</td>
            <td style="text-align: right;">${formatCurrency(item.period4)}</td>
            <td style="text-align: right;">${formatCurrency(item.period5)}</td>
            <td style="text-align: right;">${formatCurrency(item.period6)}</td>
            <td style="text-align: right;">${formatCurrency(item.period7)}</td>
            <td style="text-align: right;">${formatCurrency(item.period8)}</td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination();
}

/**
 * Update sort icons in table headers
 */
function updateSortIcons() {
    const table = document.getElementById('programFinancialTable');
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
    const pagination = document.getElementById('programFinancialPagination');
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
            renderProgramFinancialTable();
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
                renderProgramFinancialTable();
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
            renderProgramFinancialTable();
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
            renderProgramFinancialTable();
        });
    }
}

/**
 * Export to Excel
 */
function exportToExcel() {
    if (typeof XLSX === 'undefined') {
        showGovukAlert('Excel export library not loaded');
        return;
    }
    
    // Prepare data for export
    const exportData = filteredData.map(item => ({
        'Program': item.program || '',
        'Parent Project': item.parentProject || '',
        'Period 1': item.period1 || '',
        'Period 2': item.period2 || '',
        'Period 3': item.period3 || '',
        'Period 4': item.period4 || '',
        'Period 5': item.period5 || '',
        'Period 7': item.period7 || '',
        'Period 8': item.period8 || '',
        'Period 10': item.period10 || '',
        'Period 11': item.period11 || '',
        'Period 12': item.period12 || ''
    }));
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Program Financial Data');
    
    // Generate Excel file
    XLSX.writeFile(wb, 'Program_Financial_Data.xlsx');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    await loadProgramFinancialData();
    setupEventListeners();
    initializeProgramFinancialTable();
    
    // Export button
    const exportBtn = document.getElementById('exportExcelBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToExcel);
    }
});

// Column resizer functionality
const resizers = document.querySelectorAll(".resizer");

resizers.forEach((resizer) => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation(); // prevent sort click

        const th = this.parentElement;
        const startX = e.pageX;
        const startWidth = th.offsetWidth;

        function onMouseMove(e) {
            const newWidth = startWidth + (e.pageX - startX);
            th.style.width = newWidth + "px";
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});
