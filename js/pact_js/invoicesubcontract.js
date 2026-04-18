const modal = document.getElementById('addInvoiceModal');

// Test Data Array
let testData = [];

let invoicesdata = [];
let projectList = [];

let accountcodeList = [];

// Initialize pagination variables
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [];
let isAddMode = false;
let editingCounter = null;
let selectedInvoices = [];

// Load project list
async function loadProjectList() {
    try {
        const response = await fetch('../js/pact_js/data/project-codes.json');
        if (!response.ok) throw new Error('Failed to load project list');
        projectList = await response.json();
        const accountCodeResponse = await fetch('../js/pact_js/data/account-code.json');
        if (!accountCodeResponse.ok) throw new Error('Failed to load account codes');
        accountcodeList = await accountCodeResponse.json();
        // Populate both modal project dropdowns
        populateSelect(document.getElementById('modal-project'), projectList, 'code', 'code');
        populateSelect(document.getElementById('testmodal-project'), projectList, 'code', 'code'); 
        
        // Initialize account code dropdown
        initAccountCodeDropdown();
        
        return true;
    } catch (error) {
        console.error('Error loading project list:', error);
        return false;
    }
}

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

// Initialize account code dropdown with search
function initAccountCodeDropdown() {
    const dropdown = document.querySelector('[data-acctdropdown]');
    if (!dropdown) return;
    
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        accountcodeList
            .filter(d =>
                d.accountcode.toLowerCase().includes(filter.toLowerCase()) ||
                d.description.toLowerCase().includes(filter.toLowerCase())
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.accountcode}</td><td>${d.description}</td>`;
                tr.onclick = () => {
                    input.value = `${d.accountcode} - ${d.description}`;
                    input.dataset.accountcode = d.accountcode;
                    input.dataset.description = d.description;
                    panel.style.display = 'none';
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        search.value = '';
        search.focus();
        renderRows();
    });

    search.addEventListener('input', e => {
        renderRows(e.target.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

// Load data from JSON files
async function loadInvoiceData() {
    try {
        const response = await fetch('../js/pact_js/data/invoices-data.json');
        if (!response.ok) throw new Error('Failed to load invoices data');
        invoicesdata = await response.json();
        filteredData = [...invoicesdata];
        return true;
    } catch (error) {
        console.error('Error loading invoices data:', error);
        return false;
    }
}

async function loadSubcontractData() {
    try {
        const response = await fetch('../js/pact_js/data/subcontact-data.json');
        if (!response.ok) throw new Error('Failed to load subcontract data');
        testData = await response.json();
        filteredTestData = [...testData];
        return true;
    } catch (error) {
        console.error('Error loading subcontract data:', error);
        return false;
    }
}

// Initialize both tables
async function initializeTables() {
    await Promise.all([loadInvoiceData(), loadSubcontractData(), loadProjectList()]);
    
    // Apply initial project code filter if value exists
    applyInitialProjectCodeFilter();
    
    // Initialize invoice table
    renderTable();
    renderPagination();
    updateTotalAmount();
    
    // Initialize test data table
    renderTestDataTable();
    renderTestDataPagination();
    updateTestDataTotalAmount();
}

// Apply initial project code filter on page load
function applyInitialProjectCodeFilter() {
    const projectCodeInput = document.getElementById('sp-projectcode');
    const projectCode = projectCodeInput?.value.trim() || '';
    
    if (projectCode === '') {
        // If project code is empty, show no records
        filteredData = [];
        filteredTestData = [];
    } else {
        // Filter invoice table
        filteredData = invoicesdata.filter(item => 
            item.Project.toLowerCase().includes(projectCode.toLowerCase())
        );
        
        // Filter test data table (subcontract table)
        filteredTestData = testData.filter(item => 
            item.Project.toLowerCase().includes(projectCode.toLowerCase())
        );
    }
}

// Initialize total amount
const txtTotalAmount = document.getElementById('txtTotalAmount');
if (txtTotalAmount) {
    txtTotalAmount.value = '0';
}

// Helper function to parse amount (remove $ or £ symbols and commas)
function parseAmount(amountStr) {
    if (!amountStr) return 0;
    // Remove currency symbols and commas, then parse
    const cleaned = amountStr.toString().replace(/[$£,]/g, '');
    return parseFloat(cleaned) || 0;
}

// Function to calculate and update total amount
function updateTotalAmount() {
    if (!txtTotalAmount) return;
    
    // Check if project code is empty
    const projectCode = document.getElementById('sp-projectcode')?.value.trim() || '';
    
    let total = 0;
    if (projectCode === '') {
        // If project code is empty, set total to 0
        total = 0;
    } else {
        // Calculate total based on filtered data (what's displayed in the table)
        filteredData.forEach(item => {
            total += parseAmount(item.Amount);
        });
    }
    
    txtTotalAmount.value = '£' + total.toFixed(2);
}

// Render table function
function renderTable(data = null) {
    if (!data) {
        data = filteredData;
    }
    const tbody = document.getElementById('invoiceTableBody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    // Check if there are no records
    if (pageData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="9" class="govuk-table__cell norecords" style="text-align: center;">No records found</td>`;
        tbody.appendChild(row);
        updateTotalAmount();
        return;
    }
    
    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        const isChecked = selectedInvoices.includes(item.Counter);
        
        row.innerHTML = `
          <!--  <td class="govuk-table__cell">
                <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes" style="margin-left: 5px;">
                    <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input invoiceCheckbox" type="checkbox" 
                            onclick="event.stopPropagation()" data-counter="${item.Counter}" 
                            id="selectInvoice${item.Counter}" name="selectInvoice${item.Counter}" ${isChecked ? 'checked' : ''}/>
                        <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" 
                            for="selectInvoice${item.Counter}" style="padding: 0;"></label>   
                    </div>
                </div>
            </td> -->
            <td class="govuk-table__cell">${item.Project}</td>
            <td class="govuk-table__cell">${item.Month}</td>
            <td class="govuk-table__cell">${item.Amount}</td>
            <td class="govuk-table__cell">${item.CostOfWork}</td>
            <td class="govuk-table__cell">${item.WIP}</td>
            <td class="govuk-table__cell">${item.ProfitLoss}</td>
            <td class="govuk-table__cell">${item.Detail}</td>
            <td class="govuk-table__cell">${item.Counter}</td>
            <td class="govuk-table__cell">
                <button onclick="handleEdit(${item.Counter})"><img src="../images/pen-to-square-regular-full.svg"
                    alt="Edit icon" class="editicon" width="20"></button>
                <button onclick="handleDelete(event, ${item.Counter})"><img src="../images/trash-can-regular-full.svg" 
                    alt="Delete icon" width="20"></button>
            </td> 
        `;
        tbody.appendChild(row);
    });
    
    // Update total amount after rendering
    updateTotalAmount();
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.getElementById('invoicePagination');
    
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `govuk-pagination__item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="goToPage(${currentPage - 1})">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg> 
        <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
    </a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `govuk-pagination__item ${i === currentPage ? 'govuk-pagination__item--current' : ''}`;
        li.innerHTML = `<a class="govuk-link govuk-pagination__link"  href="#" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `govuk-pagination__item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="goToPage(${currentPage + 1})">
        <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
    pagination.appendChild(nextLi);
}

// Navigate to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
    renderPagination();
}

// Handle records per page change
function handleRecordsPerPageChange(e) {
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
    renderPagination();
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
    
    // If project code is empty, show no records
    if (projectCodeFilter === '') {
        filteredData = [];
    } else {
        filteredData = invoicesdata.filter(item => {
            const matchesSearch = item.Project.toLowerCase().includes(searchTerm) ||
                item.Month.toString().toLowerCase().includes(searchTerm) ||
                item.Detail.toLowerCase().includes(searchTerm);
            const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
            return matchesSearch && matchesProjectCode;
        });
    }
    
    currentPage = 1;
    renderTable();
    renderPagination();
}

// Handle project code filter for both tables
function handleProjectCodeFilter(e) {
    const projectCode = e.target.value.trim();
    const searchTerm = document.getElementById('invoiceSearch')?.value.toLowerCase() || '';
    const testSearchTerm = document.getElementById('testDataSearch')?.value.toLowerCase() || '';
    
    // Filter invoice table
    if (projectCode === '') {
        // If project code is empty, show no records
        filteredData = [];
    } else {
        // Apply both project code and search filters
        filteredData = invoicesdata.filter(item => {
            const matchesProjectCode = item.Project.toLowerCase().includes(projectCode.toLowerCase());
            const matchesSearch = searchTerm === '' || 
                item.Project.toLowerCase().includes(searchTerm) ||
                item.Month.toString().toLowerCase().includes(searchTerm) ||
                item.Detail.toLowerCase().includes(searchTerm);
            return matchesProjectCode && matchesSearch;
        });
    }
    
    // Filter test data table (subcontract table)
    if (projectCode === '') {
        // If project code is empty, show no records
        filteredTestData = [];
    } else {
        // Apply both project code and search filters
        filteredTestData = testData.filter(item => {
            const matchesProjectCode = item.Project.toLowerCase().includes(projectCode.toLowerCase());
            const matchesSearch = testSearchTerm === '' ||
                item.Project.toLowerCase().includes(testSearchTerm) ||
                item.Month.toString().toLowerCase().includes(testSearchTerm) ||
                item.AcctCode.toLowerCase().includes(testSearchTerm) ||
                item.Test.toLowerCase().includes(testSearchTerm) ||
                item.Counter.toString().includes(testSearchTerm);
            return matchesProjectCode && matchesSearch;
        });
    }
    
    // Reset to first page and re-render both tables
    currentPage = 1;
    testDataCurrentPage = 1;
    
    renderTable();
    renderPagination();
    updateTotalAmount();
    
    renderTestDataTable();
    renderTestDataPagination();
    updateTestDataTotalAmount();
}

// Handle edit
function handleEdit(counter) {
    const item = invoicesdata.find(inv => inv.Counter === counter);
    if (item) {
        isAddMode = false;
        editingCounter = counter;
        
        // Populate modal fields
        document.getElementById('modal-project').disabled = true; // Disable project code editing
        document.getElementById('modal-project').value = item.Project || '';
        document.getElementById('modal-month').value = item.Month || '';
        document.getElementById('txt-invoicecounter').value = item.Counter || '';
        document.getElementById('invoiceModalLabel').innerText = "Edit Invoice";
        document.getElementById('divInvoicecounter').style.display = 'block'; // Show counter field when editing
        // Remove currency symbols (£, $) and commas from amounts - handle undefined/null values
        document.getElementById('modal-amount').value = item.Amount ? item.Amount.toString().replace(/[£$,]/g, '') : '';
        document.getElementById('modal-costofwork').value = item.CostOfWork ? item.CostOfWork.toString().replace(/[£$,]/g, '') : '';
        document.getElementById('modal-wip').value = item.WIP ? item.WIP.toString().replace(/[£$,]/g, '') : '';
        document.getElementById('modal-profitloss').value = item.ProfitLoss ? item.ProfitLoss.toString().replace(/[£$,]/g, '') : '';
        document.getElementById('modal-detail').value = item.Detail || '';
        
        // Clear error states
        document.getElementById('modal-project').classList.remove('govuk-input--error', 'govuk-select--error');
        document.getElementById('modal-month').classList.remove('govuk-input--error');
        document.getElementById('modal-amount').classList.remove('govuk-input--error');
        
        // Open modal
        openInvoiceModal();
    }
}

// Open modal for adding new invoice
function openAddInvoiceModal() {
    isAddMode = true;
    editingCounter = null;
    document.getElementById('invoiceModalLabel').innerText = "Add Invoice";
    document.getElementById('divInvoicecounter').style.display = 'none'; // Hide counter field for new invoice
    // Clear modal fields
    document.getElementById('modal-project').disabled = false;
    const projectCodeValue = document.getElementById('sp-projectcode')?.value.trim() || '';
    const modalProject = document.getElementById('modal-project');
    modalProject.value = projectCodeValue;
    // If no value, ensure first option is selected
    if (!projectCodeValue) {
        modalProject.selectedIndex = 0;
    }
    document.getElementById('modal-month').value = '';
    document.getElementById('modal-amount').value = '';
    document.getElementById('modal-costofwork').value = '';
    document.getElementById('modal-wip').value = '';
    document.getElementById('modal-profitloss').value = '';
    document.getElementById('modal-detail').value = '';
    
    // Clear error states
    document.getElementById('modal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('modal-month').classList.remove('govuk-input--error');
    document.getElementById('modal-amount').classList.remove('govuk-input--error');
    
    openInvoiceModal();
}

// Open invoice modal
function openInvoiceModal() {
    modal.classList.add("show");
    // if (modal) {
    //     modal.style.display = 'block';
    //     modal.setAttribute('aria-hidden', 'false');
    // }
}

// Close invoice modal
function closeInvoiceModal() {
     modal.classList.remove("show");
   // const modal = document.getElementById('addInvoiceModal');
    // if (modal) {
    //     modal.style.display = 'none';
    //     modal.setAttribute('aria-hidden', 'true');
    // }
    
    // Clear error states when closing
    document.getElementById('modal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('modal-month').classList.remove('govuk-input--error');
    document.getElementById('modal-amount').classList.remove('govuk-input--error');
    
    isAddMode = false;
    editingCounter = null;
}

// Handle save invoice
function handleSaveInvoice() {
    const project = document.getElementById('modal-project').value.trim();
    const month = document.getElementById('modal-month').value.trim();
    const amount = document.getElementById('modal-amount').value.trim();
    const costOfWork = document.getElementById('modal-costofwork').value.trim() || '0';
    const wip = document.getElementById('modal-wip').value.trim() || '0';
    const profitLoss = document.getElementById('modal-profitloss').value.trim() || '0';
    const detail = document.getElementById('modal-detail').value.trim();
    
    // Clear previous error states
    document.getElementById('modal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('modal-month').classList.remove('govuk-input--error');
    document.getElementById('modal-amount').classList.remove('govuk-input--error');
    
    // Validate required fields
    let hasError = false;
    if (!project) {
        document.getElementById('modal-project').classList.add('govuk-select--error');
        hasError = true;
    }
    if (!month) {
        document.getElementById('modal-month').classList.add('govuk-input--error');
        hasError = true;
    }
    if (!amount) {
        document.getElementById('modal-amount').classList.add('govuk-input--error');
        hasError = true;
    }
    
    if (hasError) {
        alert('Please fill in all required fields (Project, Month, Amount)');
        return;
    }
    
    let newCounter = null;
    if (isAddMode) {
        // let id = invoicesdata.findIndex((el)=>el.Project === project);
        // if(id !== -1){
        //     alert('Project code already exists. Please use a different project code.');
        //     return;
        // }
        // Generate new Counter ID
        newCounter = Math.max(...invoicesdata.map(item => item.Counter)) + 1;
        
        // Add new invoice to the beginning of array
        invoicesdata.unshift({
            Project: project,
            Month: month,
            Amount: "£" + parseFloat(amount).toFixed(2),
            CostOfWork: "£" + parseFloat(costOfWork).toFixed(2),
            WIP: "£" + parseFloat(wip).toFixed(2),
            ProfitLoss: "£" + parseFloat(profitLoss).toFixed(2),
            Detail: detail,
            Counter: newCounter
        });
    } else {
        // Update existing invoice
        const index = invoicesdata.findIndex(item => item.Counter === editingCounter);
        if (index !== -1) {
            invoicesdata[index] = {
                ...invoicesdata[index],
                Project: project,
                Month: month,
                Amount: "£" + parseFloat(amount).toFixed(2),
                CostOfWork: "£" + parseFloat(costOfWork).toFixed(2),
                WIP: "£" + parseFloat(wip).toFixed(2),
                ProfitLoss: "£" + parseFloat(profitLoss).toFixed(2),
                Detail: detail
            };
        }
    }
    
    // Update filtered data based on project code filter
    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
    const searchInput = document.getElementById('invoiceSearch');
    const searchTerm = searchInput?.value.toLowerCase() || '';
    
    if (isAddMode) {
        // After adding, filter based on project code from sp-projectcode
        if (projectCodeFilter === '') {
            // If project code is empty, show no records
            filteredData = [];
        } else {
            // Apply both project code and search filters
            filteredData = invoicesdata.filter(item => {
                const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
                const matchesSearch = searchTerm === '' || 
                    item.Project.toLowerCase().includes(searchTerm) ||
                    item.Month.toString().toLowerCase().includes(searchTerm) ||
                    item.Detail.toLowerCase().includes(searchTerm);
                return matchesProjectCode && matchesSearch;
            });
        }
    } else {
        // For edit mode, also filter based on project code from sp-projectcode
        if (projectCodeFilter === '') {
            // If project code is empty, show no records
            filteredData = [];
        } else {
            // Apply both project code and search filters
            filteredData = invoicesdata.filter(item => {
                const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
                const matchesSearch = searchTerm === '' || 
                    item.Project.toLowerCase().includes(searchTerm) ||
                    item.Month.toString().toLowerCase().includes(searchTerm) ||
                    item.Detail.toLowerCase().includes(searchTerm);
                return matchesProjectCode && matchesSearch;
            });
        }
    }
    
    // Navigate to the page where the new/edited record will appear
    if (isAddMode && newCounter) {
        const newItemIndex = filteredData.findIndex(item => item.Counter === newCounter);
        if (newItemIndex !== -1) {
            currentPage = Math.ceil((newItemIndex + 1) / recordsPerPage);
        }
    }
    
    renderTable();
    renderPagination();
    updateTotalAmount();
    
    // Highlight the newly added or edited row
    if (newCounter || editingCounter) {
        const counterToHighlight = newCounter || editingCounter;
        setTimeout(() => {
            const rows = document.querySelectorAll('#invoiceTableBody tr');
            rows.forEach(row => {
                const cells = row.getElementsByTagName('td');
                if (cells.length > 7 && cells[7].textContent == counterToHighlight) {
                    row.style.backgroundColor = '#ffe5b4';
                    setTimeout(() => {
                        row.style.backgroundColor = '';
                    }, 2000);
                }
            });
        }, 100);
    }
    
    closeInvoiceModal();
    isAddMode = false;
    editingCounter = null;
}

// Handle delete
function handleDelete(event, counter) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this invoice?')) {
        const index = invoicesdata.findIndex(inv => inv.Counter === counter);
        if (index > -1) {
            invoicesdata.splice(index, 1);
            filteredData = [...invoicesdata];
            
            // Remove from selectedInvoices if it was selected
            selectedInvoices = selectedInvoices.filter(c => c !== counter);
            
            renderTable();
            renderPagination();
            updateTotalAmount();
        }
    }
}

// Handle delete selected invoices
function handleDeleteSelected() {
    if (selectedInvoices.length === 0) {
        alert('Please select at least one invoice to delete.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedInvoices.length} selected invoice(s)?`)) {
        // Remove selected invoices from invoicesdata
        invoicesdata = invoicesdata.filter(inv => !selectedInvoices.includes(inv.Counter));
        filteredData = [...invoicesdata];
        selectedInvoices = [];
        
        // Uncheck select all
        const selectAllCheckbox = document.getElementById('selectAllInvoices');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
        
        renderTable();
        renderPagination();
        updateTotalAmount();
    }
}

// Sorting and resize for invoice table

// Sorting functionality
const headers = document.querySelectorAll("#invoiceTable th[data-column]");

headers.forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnIndex = parseInt(this.dataset.column) + 1; // +1 because checkbox is column 0
        const currentOrder = this.dataset.order || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";

        // Remove sorting icons from all headers
        headers.forEach(h => {
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

        sortInvoiceTable(columnIndex, newOrder);
    });
});

function sortInvoiceTable(columnIndex, order) {
    const tbody = document.getElementById('invoiceTableBody');
    const rows = Array.from(tbody.querySelectorAll("tr"));
    
    if (rows.length === 0) return;

    // Sort the rows based on the column
    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex];
        let cellB = rowB.cells[columnIndex];
        
        if (!cellA || !cellB) return 0;
        
        let valA = cellA.textContent.trim();
        let valB = cellB.textContent.trim();

        // Try to parse as numbers (removing currency symbols)
        const numA = parseFloat(valA.replace(/[$£,]/g, ''));
        const numB = parseFloat(valB.replace(/[$£,]/g, ''));
        
        // If both are valid numbers, compare numerically
        if (!isNaN(numA) && !isNaN(numB)) {
            return order === "asc" ? numA - numB : numB - numA;
        }
        
        // Otherwise compare as strings
        return order === "asc"
            ? valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' })
            : valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Re-append sorted rows to tbody
    rows.forEach(row => tbody.appendChild(row));
}

// Resizing functionality
const resizers = document.querySelectorAll(".resizer");

resizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation();  // prevent sort click

        const th = this.parentElement;
        const startX = e.pageX;
        const startWidth = th.offsetWidth;
        
        // Determine which table this resizer belongs to
        const table = th.closest('table');
        const isInvoiceTable = table && table.id === 'invoiceTable';
        const isSubcontractTable = table && table.id === 'subcontractInvoiceTable';
        
        // Get min-width from computed style or inline style, fallback to 80
        const computedStyle = window.getComputedStyle(th);
        const styleMinWidth = computedStyle.minWidth;
        const minWidth = (styleMinWidth && styleMinWidth !== 'none' && styleMinWidth !== '0px') 
            ? parseFloat(styleMinWidth) 
            : 80; // Default minimum column width
        const maxWidth = 600; // Maximum column width to prevent overlap

        function onMouseMove(e) {
            const newWidth = startWidth + (e.pageX - startX);
            // Constrain width between min and max
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                th.style.width = newWidth + "px";
                // Re-align amount box during resize for the appropriate table
                if (isInvoiceTable) {
                    requestAnimationFrame(alignAmountBox);
                } else if (isSubcontractTable) {
                    requestAnimationFrame(alignTestDataAmountBox);
                }
            }
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            // Re-align amount box after resize completes
            if (isInvoiceTable) {
                requestAnimationFrame(alignAmountBox);
            } else if (isSubcontractTable) {
                requestAnimationFrame(alignTestDataAmountBox);
            }
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});

// Checkbox functionality for Select All
const selectAllInvoices = document.getElementById("selectAllInvoices");

if (selectAllInvoices) {
    selectAllInvoices.addEventListener("change", function () {
        const checkboxes = [...document.querySelectorAll(".invoiceCheckbox")].filter(
            (cb) => cb.closest("tr").offsetParent !== null
        );

        selectedInvoices = [];
        checkboxes.forEach((cb) => {
            cb.checked = this.checked;
            const counter = parseInt(cb.dataset.counter);

            if (this.checked) {
                if (!selectedInvoices.includes(counter)) {
                    selectedInvoices.push(counter);
                }
            }
        });
    });
}

// Individual checkbox handling
const invoiceTableBody = document.getElementById("invoiceTableBody");

if (invoiceTableBody) {
    invoiceTableBody.addEventListener("change", function (e) {
        if (e.target.classList.contains("invoiceCheckbox")) {
            const counter = parseInt(e.target.dataset.counter);
            
            if (e.target.checked) {
                if (!selectedInvoices.includes(counter)) {
                    selectedInvoices.push(counter);
                }
            } else {
                selectedInvoices = selectedInvoices.filter((c) => c !== counter);
                
                // Uncheck selectAll if any one unchecked
                if (selectAllInvoices) {
                    selectAllInvoices.checked = false;
                }
            }

            // Optional: auto check selectAll if all selected
            const allCheckboxes = document.querySelectorAll(".invoiceCheckbox");
            const checkedCount = document.querySelectorAll(".invoiceCheckbox:checked").length;

            if (allCheckboxes.length === checkedCount && selectAllInvoices) {
                selectAllInvoices.checked = true;
            }
        }
    });
}

// Align amount box with Amount column
// Align amount box with Amount column
function alignAmountBox() {
    const invoiceTable = document.getElementById("invoiceTable");
    const thAmount = document.querySelector("th.amount");
    const box = document.getElementById("txtTotalAmount");
    const lbl = document.getElementById("lbltotalamount");
    
    if (!invoiceTable || !thAmount || !box || !lbl) return;
    
    const thRect = thAmount.getBoundingClientRect();
    const tableRect = invoiceTable.getBoundingClientRect();
    
    const left = thRect.left - tableRect.left;
    
    box.style.position = "absolute";
    box.style.left = left + "px";
    box.style.width = thRect.width + "px";
    
    lbl.style.position = "absolute";
    lbl.style.left = (left - lbl.offsetWidth - 10) + "px";
    lbl.style.top = "12px";
}

// Event listeners - call these after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load data and initialize tables
    initializeTables();
    
    // Setup amount box alignment
    const invoiceTable = document.getElementById("invoiceTable");
    const thAmount = document.querySelector("th.amount");
    
    if (invoiceTable && thAmount) {
        window.addEventListener("load", () => requestAnimationFrame(alignAmountBox));
        window.addEventListener("resize", () => requestAnimationFrame(alignAmountBox));
        invoiceTable.addEventListener("scroll", () => requestAnimationFrame(alignAmountBox));
        
        const observer = new ResizeObserver(() => requestAnimationFrame(alignAmountBox));
        observer.observe(thAmount);
    }
    
    // Attach event listeners
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', handleRecordsPerPageChange);
    }
    
    const searchInput = document.getElementById('invoiceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Project code filter event listener
    const projectCodeInput = document.getElementById('sp-projectcode');
    if (projectCodeInput) {
        projectCodeInput.addEventListener('input', handleProjectCodeFilter);
    }
    
    // Modal event listeners
    const addInvoiceBtn = document.getElementById('addInvoiceBtn');
    if (addInvoiceBtn) {
        addInvoiceBtn.addEventListener('click', openAddInvoiceModal);
    }
    
    const saveInvoiceBtn = document.getElementById('saveInvoiceBtn');
    if (saveInvoiceBtn) {
        saveInvoiceBtn.addEventListener('click', handleSaveInvoice);
    }
    
    const closeModalBtn = document.getElementById('closeInvoiceModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeInvoiceModal);
    }
    
    const cancelModalBtn = document.getElementById('cancelInvoiceModalBtn');
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeInvoiceModal);
    }
    
    // Delete selected button
    // const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    // if (deleteSelectedBtn) {
    //     deleteSelectedBtn.addEventListener('click', handleDeleteSelected);
    // }
    
    // Close modal when clicking outside
    // const modal = document.getElementById('addInvoiceModal');
    // if (modal) {
    //     window.addEventListener('click', function(event) {
    //         if (event.target === modal) {
    //             closeInvoiceModal();
    //         }
    //     });
    // }
    
    // Setup test data amount box alignment
    const testDataTable = document.getElementById("subcontractInvoiceTable");
    const thTestDataAmount = document.querySelector("#subcontractInvoiceTable th.amount");
    
    if (testDataTable && thTestDataAmount) {
        window.addEventListener("load", () => requestAnimationFrame(alignTestDataAmountBox));
        window.addEventListener("resize", () => requestAnimationFrame(alignTestDataAmountBox));
        testDataTable.addEventListener("scroll", () => requestAnimationFrame(alignTestDataAmountBox));
        
        const testObserver = new ResizeObserver(() => requestAnimationFrame(alignTestDataAmountBox));
        testObserver.observe(thTestDataAmount);
    }
    
    // Test data event listeners
    const testDataRecordsPerPageSelect = document.getElementById('testDataRecordsPerPage');
    if (testDataRecordsPerPageSelect) {
        testDataRecordsPerPageSelect.addEventListener('change', handleTestDataRecordsPerPageChange);
    }
    
    const testDataSearchInput = document.getElementById('testDataSearch');
    if (testDataSearchInput) {
        testDataSearchInput.addEventListener('input', handleTestDataSearch);
    }
    
    // Test data add button
    const addTestDataBtn = document.getElementById('addTestDataBtn');
    if (addTestDataBtn) {
        addTestDataBtn.addEventListener('click', openAddTestDataModal);
    }
    
    // Test data modal event listeners
    const saveTestDataBtn = document.getElementById('saveTestDataBtn');
    if (saveTestDataBtn) {
        saveTestDataBtn.addEventListener('click', handleSaveTestData);
    }
    
    const closeTestDataModalBtn = document.getElementById('closeTestDataModalBtn');
    if (closeTestDataModalBtn) {
        closeTestDataModalBtn.addEventListener('click', closeTestDataModal);
    }
    
    const cancelTestDataModalBtn = document.getElementById('cancelTestDataModalBtn');
    if (cancelTestDataModalBtn) {
        cancelTestDataModalBtn.addEventListener('click', closeTestDataModal);
    }
    
    // Close test data modal when clicking outside
    const testDataModal = document.getElementById('addTestDataModal');
    if (testDataModal) {
        window.addEventListener('click', function(event) {
            if (event.target === testDataModal) {
                closeTestDataModal();
            }
        });
    }
    
    // Check for initial project code value on page load and apply filter
    if (projectCodeInput && projectCodeInput.value.trim() !== '') {
        // Trigger the filter function with the initial value
        handleProjectCodeFilter({ target: projectCodeInput });
    }
});

// ==================== TEST DATA TABLE FUNCTIONALITY ====================

// Test data pagination variables
let testDataCurrentPage = 1;
let testDataRecordsPerPage = 10;
let filteredTestData = [];
let isTestDataAddMode = false;
let editingTestDataCounter = null;

// Initialize test data total amount
const txtTestDataTotalAmount = document.getElementById('txtTestDataTotalAmount');
if (txtTestDataTotalAmount) {
    txtTestDataTotalAmount.value = '0';
}

// Function to calculate and update test data total amount
function updateTestDataTotalAmount() {
    if (!txtTestDataTotalAmount) return;
    
    // Check if project code is empty
    const projectCode = document.getElementById('sp-projectcode')?.value.trim() || '';
    
    let total = 0;
    if (projectCode === '') {
        // If project code is empty, set total to 0
        total = 0;
    } else {
        // Calculate total based on filtered data (what's displayed in the table)
        filteredTestData.forEach(item => {
            total += parseAmount(item.Amount);
        });
    }
    
    txtTestDataTotalAmount.value = '£' + total.toFixed(2);
}

// Render test data table function
function renderTestDataTable(data = null) {
    if (!data) {
        data = filteredTestData;
    }
    const tbody = document.getElementById('subcontractInvoiceTableBody');
    if (!tbody) return;
    
    const startIndex = (testDataCurrentPage - 1) * testDataRecordsPerPage;
    const endIndex = startIndex + testDataRecordsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="norecords" style="text-align: center;">No records found</td></tr>';
        return;
    }
    
    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="govuk-table__cell">${item.Project}</td>
            <td class="govuk-table__cell">${item.Month}</td>
            <td class="govuk-table__cell">${item.Amount}</td>
            <td class="govuk-table__cell">${item.AcctCode}</td>
            <td class="govuk-table__cell">${item.Test}</td>
            <td class="govuk-table__cell">${item.Counter}</td>
            <td class="govuk-table__cell" style="text-align: center;">
                <button class="edit-btn" onclick="handleTestDataEdit(${item.Counter})" style="background: none; border: none; cursor: pointer; margin-right: 8px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="handleTestDataDelete(event, ${item.Counter})" style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update total amount after rendering
    updateTestDataTotalAmount();
}

// Render test data pagination
function renderTestDataPagination() {
    const totalPages = Math.ceil(filteredTestData.length / testDataRecordsPerPage);
    const pagination = document.getElementById('testDataPagination');
    
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `govuk-pagination__item ${testDataCurrentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); ${testDataCurrentPage > 1 ? 'goToTestDataPage(' + (testDataCurrentPage - 1) + ')' : ''}">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg> 
        <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
    </a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, testDataCurrentPage - 2);
    const endPage = Math.min(totalPages, testDataCurrentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `govuk-pagination__item ${i === testDataCurrentPage ? 'govuk-pagination__item--current' : ''}`;
        li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToTestDataPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `govuk-pagination__next ${testDataCurrentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); ${testDataCurrentPage < totalPages ? 'goToTestDataPage(' + (testDataCurrentPage + 1) + ')' : ''}" rel="next">
        <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
    pagination.appendChild(nextLi);
}

// Navigate to specific test data page
function goToTestDataPage(page) {
    const totalPages = Math.ceil(filteredTestData.length / testDataRecordsPerPage);
    if (page < 1 || page > totalPages) return;
    testDataCurrentPage = page;
    renderTestDataTable();
    renderTestDataPagination();
}

// Handle test data records per page change
function handleTestDataRecordsPerPageChange(e) {
    testDataRecordsPerPage = parseInt(e.target.value);
    testDataCurrentPage = 1;
    renderTestDataTable();
    renderTestDataPagination();
}

// Handle test data search
function handleTestDataSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
    
    // If project code is empty, show no records
    if (projectCodeFilter === '') {
        filteredTestData = [];
    } else {
        filteredTestData = testData.filter(item => {
            const matchesSearch = item.Project.toLowerCase().includes(searchTerm) ||
                item.Month.toString().toLowerCase().includes(searchTerm) ||
                item.AcctCode.toLowerCase().includes(searchTerm) ||
                item.Test.toLowerCase().includes(searchTerm) ||
                item.Counter.toString().includes(searchTerm);
            const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
            return matchesSearch && matchesProjectCode;
        });
    }
    
    testDataCurrentPage = 1;
    renderTestDataTable();
    renderTestDataPagination();
}

// Sorting functionality for test data table
const testDataHeaders = document.querySelectorAll("#subcontractInvoiceTable th[data-column]");

testDataHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnIndex = parseInt(this.dataset.column);
        const columnNames = ['Project', 'Month', 'Amount', 'AcctCode', 'Test', 'Counter'];
        const columnName = columnNames[columnIndex];
        const currentOrder = this.dataset.order || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";

        // Remove sorting icons from all headers
        testDataHeaders.forEach(h => {
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

        // Sort data
        filteredTestData.sort((a, b) => {
            let aVal = a[columnName];
            let bVal = b[columnName];
            
            // Handle numeric columns
            if (columnName === 'Month' || columnName === 'Counter') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            } else if (columnName === 'Amount') {
                aVal = parseFloat(aVal.replace(/[$£,]/g, '')) || 0;
                bVal = parseFloat(bVal.replace(/[$£,]/g, '')) || 0;
            }
            
            if (newOrder === "asc") {
                if (aVal < bVal) return -1;
                if (aVal > bVal) return 1;
                return 0;
            } else {
                if (aVal < bVal) return 1;
                if (aVal > bVal) return -1;
                return 0;
            }
        });
        
        renderTestDataTable();
    });
});

// Align test data amount box with Amount column
// Align test data amount box with Amount column
function alignTestDataAmountBox() {
    const testDataTable = document.getElementById("subcontractInvoiceTable");
    const thAmount = document.querySelector("#subcontractInvoiceTable th.amount");
    const box = document.getElementById("txtTestDataTotalAmount");
    const lbl = document.getElementById("lblTestDataTotalAmount");
    
    if (!testDataTable || !thAmount || !box || !lbl) return;
    
    const thRect = thAmount.getBoundingClientRect();
    const tableRect = testDataTable.getBoundingClientRect();
    
    const left = thRect.left - tableRect.left;
    
    box.style.position = "absolute";
    box.style.left = left + "px";
    box.style.width = thRect.width + "px";
    
    lbl.style.position = "absolute";
    lbl.style.left = (left - lbl.offsetWidth - 10) + "px";
    lbl.style.top = "12px";
}

// ==================== TEST DATA MODAL FUNCTIONS ====================

// Open modal for adding new test data
function openAddTestDataModal() {
    isTestDataAddMode = true;
    editingTestDataCounter = null;
    document.getElementById('divSubcontractcounter').style.display = 'none';
    // Clear modal fields
    const projectCodeValue = document.getElementById('sp-projectcode')?.value.trim() || '';
    const testModalProject = document.getElementById('testmodal-project');
    testModalProject.value = projectCodeValue;
    // If no value, ensure first option is selected
    if (!projectCodeValue) {
        testModalProject.selectedIndex = 0;
    }
    //document.getElementById('testmodal-project').value = '';
    document.getElementById('testmodal-month').value = '';
    document.getElementById('testmodal-amount').value = '';
    document.getElementById('testmodal-acctcode').value = '--select account code--';
    document.getElementById('testmodal-acctcode').dataset.accountcode = '';
    document.getElementById('testmodal-acctcode').dataset.description = '';
    document.getElementById('testmodal-test').value = '';
    
    // Clear error states
    document.getElementById('testmodal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('testmodal-month').classList.remove('govuk-input--error');
    document.getElementById('testmodal-amount').classList.remove('govuk-input--error');
    
    document.getElementById('testDataModalLabel').textContent = 'Add Sub-Contracts';
    openTestDataModal();
}

// Handle edit test data
function handleTestDataEdit(counter) {
    const item = testData.find(td => td.Counter === counter);
    if (item) {
        isTestDataAddMode = false;
        editingTestDataCounter = counter;
        document.getElementById('txt-subcontractcounter').value = counter;
        // Populate modal fields
        document.getElementById('testmodal-project').value = item.Project || '';
        document.getElementById('testmodal-month').value = item.Month || '';
        document.getElementById('divSubcontractcounter').style.display = 'block';
        // Remove currency symbols (£, $) and commas from amount - handle undefined/null values
        document.getElementById('testmodal-amount').value = item.Amount ? item.Amount.toString().replace(/[£$,]/g, '') : '';
        
        // Populate account code dropdown
        const acctCodeInput = document.getElementById('testmodal-acctcode');
        if (item.AcctCode) {
            // Find the full account code data
            const acctData = accountcodeList.find(ac => ac.accountcode === item.AcctCode);
            if (acctData) {
                acctCodeInput.value = `${acctData.accountcode} - ${acctData.description}`;
                acctCodeInput.dataset.accountcode = acctData.accountcode;
                acctCodeInput.dataset.description = acctData.description;
            } else {
                acctCodeInput.value = item.AcctCode;
                acctCodeInput.dataset.accountcode = item.AcctCode;
                acctCodeInput.dataset.description = '';
            }
        } else {
            acctCodeInput.value = '--select account code--';
            acctCodeInput.dataset.accountcode = '';
            acctCodeInput.dataset.description = '';
        }
        
        document.getElementById('testmodal-test').value = item.Test || '';
        
        // Clear error states
        document.getElementById('testmodal-project').classList.remove('govuk-input--error', 'govuk-select--error');
        document.getElementById('testmodal-month').classList.remove('govuk-input--error');
        document.getElementById('testmodal-amount').classList.remove('govuk-input--error');
        
        document.getElementById('testDataModalLabel').textContent = 'Edit Sub-Contracts';
        openTestDataModal();
    }
}

// Open test data modal
function openTestDataModal() {
    const modal = document.getElementById('addTestDataModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close test data modal
function closeTestDataModal() {
    const modal = document.getElementById('addTestDataModal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    // Clear error states when closing
    document.getElementById('testmodal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('testmodal-month').classList.remove('govuk-input--error');
    document.getElementById('testmodal-amount').classList.remove('govuk-input--error');
    
    isTestDataAddMode = false;
    editingTestDataCounter = null;
}

// Handle save test data
function handleSaveTestData() {
    // Get form values
    const project = document.getElementById('testmodal-project').value.trim();
    const month = document.getElementById('testmodal-month').value;
    const amount = document.getElementById('testmodal-amount').value.trim();
    const acctCodeInput = document.getElementById('testmodal-acctcode');
    const acctCode = acctCodeInput.dataset.accountcode || '';
    const test = document.getElementById('testmodal-test').value.trim();
    
    // Clear previous error states
    document.getElementById('testmodal-project').classList.remove('govuk-input--error', 'govuk-select--error');
    document.getElementById('testmodal-month').classList.remove('govuk-input--error');
    document.getElementById('testmodal-amount').classList.remove('govuk-input--error');
    
    // Validate required fields
    let hasError = false;
    if (!project) {
        document.getElementById('testmodal-project').classList.add('govuk-select--error');
        hasError = true;
    }
    if (!month) {
        document.getElementById('testmodal-month').classList.add('govuk-input--error');
        hasError = true;
    }
    if (!amount) {
        document.getElementById('testmodal-amount').classList.add('govuk-input--error');
        hasError = true;
    }
    
    if (hasError) {
        alert('Please fill in all required fields (Project, Month, Amount)');
        return;
    }
    
    // Format amount
    const formattedAmount = '£' + parseFloat(amount).toFixed(2);
    
    if (isTestDataAddMode) {
        // Add new test data
        const newCounter = testData.length > 0 ? Math.max(...testData.map(t => t.Counter)) + 1 : 1001;
        const newItem = {
            Project: project,
            Month: month,
            Amount: formattedAmount,
            AcctCode: acctCode,
            Test: test,
            Counter: newCounter
        };
        testData.push(newItem);
    } else {
        // Edit existing test data
        const index = testData.findIndex(t => t.Counter === editingTestDataCounter);
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                Project: project,
                Month: month,
                Amount: formattedAmount,
                AcctCode: acctCode,
                Test: test
            };
        }
    }
    
    // Update filtered data based on project code filter
    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
    const testSearchInput = document.getElementById('testDataSearch');
    const testSearchTerm = testSearchInput?.value.toLowerCase() || '';
    
    if (isTestDataAddMode) {
        // After adding, filter based on project code from sp-projectcode
        if (projectCodeFilter === '') {
            // If project code is empty, show no records
            filteredTestData = [];
        } else {
            // Apply both project code and search filters
            filteredTestData = testData.filter(item => {
                const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
                const matchesSearch = testSearchTerm === '' ||
                    item.Project.toLowerCase().includes(testSearchTerm) ||
                    item.Month.toString().toLowerCase().includes(testSearchTerm) ||
                    item.AcctCode.toLowerCase().includes(testSearchTerm) ||
                    item.Test.toLowerCase().includes(testSearchTerm) ||
                    item.Counter.toString().includes(testSearchTerm);
                return matchesProjectCode && matchesSearch;
            });
        }
    } else {
        // For edit mode, also filter based on project code from sp-projectcode
        if (projectCodeFilter === '') {
            // If project code is empty, show no records
            filteredTestData = [];
        } else {
            // Apply both project code and search filters
            filteredTestData = testData.filter(item => {
                const matchesProjectCode = item.Project.toLowerCase().includes(projectCodeFilter.toLowerCase());
                const matchesSearch = testSearchTerm === '' ||
                    item.Project.toLowerCase().includes(testSearchTerm) ||
                    item.Month.toString().toLowerCase().includes(testSearchTerm) ||
                    item.AcctCode.toLowerCase().includes(testSearchTerm) ||
                    item.Test.toLowerCase().includes(testSearchTerm) ||
                    item.Counter.toString().includes(testSearchTerm);
                return matchesProjectCode && matchesSearch;
            });
        }
    }
    
    // Close modal and refresh table
    closeTestDataModal();
    renderTestDataTable();
    renderTestDataPagination();
    updateTestDataTotalAmount();
}

// Handle delete test data
function handleTestDataDelete(event, counter) {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this test data entry?')) {
        const index = testData.findIndex(t => t.Counter === counter);
        if (index !== -1) {
            testData.splice(index, 1);
            filteredTestData = [...testData];
            
            // Adjust page if necessary
            const totalPages = Math.ceil(filteredTestData.length / testDataRecordsPerPage);
            if (testDataCurrentPage > totalPages && totalPages > 0) {
                testDataCurrentPage = totalPages;
            }
            
            renderTestDataTable();
            renderTestDataPagination();
            updateTestDataTotalAmount();
        }
    }
}