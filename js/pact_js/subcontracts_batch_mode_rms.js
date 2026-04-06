// Month list data
let monthListData = [];
let projectCostData = [];
let filteredProjectCostData = [];
let projectList = [];
let currentPage = 1;
let recordsPerPage = 20;
let editingIndex = null;
let sortColumn = null;
let sortDirection = 'asc';

// Load month list data
async function loadMonthData() {
    try {
        const response = await fetch('../js/pact_js/data/month-list.json');
        if (!response.ok) throw new Error('Failed to load month data');
        monthListData = await response.json();
         populateSelect(document.getElementById('dpSelectmonth'), monthListData, 'period', 'monthName');
        // Initialize dropdown after data is loaded
        //initializeDropdowns();
    } catch (error) {
        console.error('Error loading month data:', error);
    }
}

async function loadProjectList() {
    try {
        const response = await fetch('../js/pact_js/data/project-codes.json');
        if (!response.ok) throw new Error('Failed to load project list');
         projectList = await response.json();
         populateSelect(document.getElementById('dpSelectproject'), projectList, 'code', 'code');
        // Initialize dropdown after data is loaded
        //initializeDropdowns();
    } catch (error) {
        console.error('Error loading project list:', error);
    }
}

// Load project cost data
async function loadProjectCostData() {
    try {
        const response = await fetch('../js/pact_js/data/project_cost_rms_per_month.json');
        if (!response.ok) throw new Error('Failed to load project cost data');
        projectCostData = await response.json();
        console.log('Project cost data loaded:', projectCostData.length, 'records');
    } catch (error) {
        console.error('Error loading project cost data:', error);
    }
}

// Initialize dropdowns
function initializeDropdowns() {
    document.querySelectorAll('[data-monthdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'monthlist') {
            initDropdown(dd, monthListData, 'period', 'monthName', 'monthNumber');
        }
    });
}

// Generic dropdown initialization function
function initDropdown(dropdown, dataset, codeField, descField, numberField) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        // Add "Clear Filter" option at the top if no filter is applied
        if (!filter) {
            const clearTr = document.createElement('tr');
            clearTr.innerHTML = `<td colspan="3" style="text-align: center; font-weight: bold; color: #1d70b8; cursor: pointer;">--Clear Selection--</td>`;
            clearTr.onclick = () => {
                input.value = '';
                input.setAttribute('data-period', '');
                input.setAttribute('data-month-number', '');
                panel.style.display = 'none';
                // Clear the selected month textbox
                const selectedMonthTextbox = document.getElementById('txtSelectedMonth');
                if (selectedMonthTextbox) {
                    selectedMonthTextbox.value = '';
                }
                // Clear the table
                clearProjectCostTable();
            };
            tbody.appendChild(clearTr);
        }
        
        // Filter and render data rows
        dataset
            .filter(d =>
                String(d[codeField]).toLowerCase().includes(filter) ||
                String(d[descField]).toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d[codeField]}</td><td>${d[descField]}</td><td>${d[numberField]}</td>`;
                tr.style.cursor = 'pointer';
                tr.onclick = () => {
                    input.value = `Period ${d[codeField]} - ${d[descField]}`;
                    input.setAttribute('data-period', d[codeField]);
                    input.setAttribute('data-month-number', d[numberField]);
                    panel.style.display = 'none';
                    
                    // Trigger any custom event handlers here
                    onMonthSelected(d[codeField], d[descField], d[numberField]);
                };
                
                // Add hover effect
                tr.addEventListener('mouseenter', () => {
                    tr.style.backgroundColor = '#f3f2f1';
                });
                tr.addEventListener('mouseleave', () => {
                    tr.style.backgroundColor = '';
                });
                
                tbody.appendChild(tr);
            });
    }

    // Show dropdown when input is clicked
    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        search.value = '';
        search.focus();
        renderRows();
    });

    // Filter rows as user types in search box
    search.addEventListener('input', e => {
        renderRows(e.target.value.toLowerCase());
    });
    
    // Prevent panel from closing when clicking inside it
    panel.addEventListener('click', e => {
        e.stopPropagation();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

// Handler for when a month is selected
function onMonthSelected(period, monthName, monthNumber) {
    console.log(`Selected: Period ${period}, Month: ${monthName}, Month Number: ${monthNumber}`);
    
    // Update the selected month textbox
    const selectedMonthTextbox = document.getElementById('txtSelectedMonth');
    if (selectedMonthTextbox) {
        selectedMonthTextbox.value = `${monthName} (Period ${period})`;
    }
    
    // Filter and display project cost data for selected month
    filterProjectCostByMonth(period);
}

// Filter project cost data by month/period
function filterProjectCostByMonth(period) {
    filteredProjectCostData = projectCostData.filter(item => item.Month == period);
    console.log(`Filtered ${filteredProjectCostData.length} records for period ${period}`);
    
    currentPage = 1;
    renderProjectCostTable();
    renderPagination();
}

// Clear the project cost table
function clearProjectCostTable() {
    filteredProjectCostData = [];
    currentPage = 1;
    const tbody = document.getElementById('projectCostTableBody');
    tbody.innerHTML = `
        <tr>
            <td colspan="11" style="text-align: center; padding: 20px; color: #505a5f;">
                Select a period to view data
            </td>
        </tr>
    `;
    //document.getElementById('recordCount').textContent = '0 records';
    document.getElementById('projectCostPagination').innerHTML = '';
}

// Render project cost table
function renderProjectCostTable() {
    const tbody = document.getElementById('projectCostTableBody');
    
    // Apply sorting if a column is selected
    let dataToRender = [...filteredProjectCostData];
    if (sortColumn !== null) {
        dataToRender = sortData(dataToRender, sortColumn);
    }
    
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = dataToRender.slice(startIndex, endIndex);
    
    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" style="text-align: center; padding: 20px; color: #505a5f;">
                    No records found for the selected period
                </td>
            </tr>
        `;
     //   document.getElementById('recordCount').textContent = '0 records';
        return;
    }
    
    tbody.innerHTML = '';
    pageData.forEach((row, index) => {
        const actualIndex = startIndex + index;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="govuk-table__cell">${row.Project || ''}</td>
            <td class="govuk-table__cell">${row.AcctCode || ''}</td>
            <td class="govuk-table__cell">${row.Amount || ''}</td>
            <td class="govuk-table__cell">${row.Month || ''}</td>
            <td class="govuk-table__cell">${row.TestJob || ''}</td>
            <td class="govuk-table__cell">${row.Description || ''}</td>
            <td class="govuk-table__cell">${row.Supplier || ''}</td>
            <td class="govuk-table__cell">${row.SupplierNumber || ''}</td>
            <td class="govuk-table__cell">${row.DailyRate || ''}</td>
            <td class="govuk-table__cell">${row.AnimalDays || ''}</td>
            <td class="govuk-table__cell">
                <button class="edit-btn" data-item='${JSON.stringify(row)}'  data-index="${actualIndex}" onclick="editProjectCost(event)" style="background: none; border: none; cursor: pointer; margin-right: 8px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="deleteProjectCost(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Update record count
    const totalRecords = filteredProjectCostData.length;
    const showingFrom = startIndex + 1;
    const showingTo = Math.min(endIndex, totalRecords);
    // document.getElementById('recordCount').textContent = 
    //     `Showing ${showingFrom}-${showingTo} of ${totalRecords} records`;
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredProjectCostData.length / recordsPerPage);
    const paginationContainer = document.getElementById('projectCostPagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button with SVG arrow
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
            changePage(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevItem);
    
    // Page numbers with improved logic
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
                changePage(i);
            });
        }
        paginationContainer.appendChild(pageItem);
    }
    
    // Next button with SVG arrow
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
            changePage(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextItem);
}

// Change page function
function changePage(page) {
    currentPage = page;
    renderProjectCostTable();
    renderPagination();
}

// Make changePage available globally for onclick handlers
window.changePage = changePage;

// Change records per page
function changeRecordsPerPage(value) {
    recordsPerPage = parseInt(value);
    currentPage = 1;
    renderProjectCostTable();
    renderPagination();
}


function populateSelect(selectElement, data, valueKey, textKey) {

  selectElement.innerHTML = '<option value="">-- Select --</option>';

  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent = item[textKey];
    selectElement.appendChild(option);
  });
}

document.getElementById('dpSelectmonth').addEventListener('change', function() {
    const selectedValue = this.value;
    // const selectedOption = this.options[this.selectedIndex];
    // const monthName = selectedOption.textContent;
    // const monthNumber = selectedOption.getAttribute('data-month-number');
    document.getElementById('txtSelectedMonth').value = selectedValue;
    //'period', 'monthName', 'monthNumber'
    filterProjectCostByMonth(selectedValue);
  //  onMonthSelected(d[codeField], d[descField], d[numberField]);
});

// Setup sorting functionality
function setupSorting() {
    const headers = document.querySelectorAll('#projectCostTable th[data-column]');
    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            sortColumn = index;
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            
            // Update sort indicators
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) existingIcon.remove();
            });
            
            header.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            const icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.innerHTML = sortDirection === 'asc' ? '▲' : '▼';
            header.appendChild(icon);
            
            renderProjectCostTable();
            renderPagination();
        });
    });
}

// Sort data by column
function sortData(data, columnIndex) {
    const columns = ['Project', 'AcctCode', 'Amount', 'Month', 'TestJob', 'Description', 'Supplier', 'SupplierNumber', 'DailyRate', 'AnimalDays'];
    const key = columns[columnIndex];
    
    return data.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        
        // Handle price fields (remove currency symbols for comparison)
        if (key === 'Amount' || key === 'DailyRate') {
            valA = parseFloat(String(valA).replace(/[£$,]/g, '')) || 0;
            valB = parseFloat(String(valB).replace(/[£$,]/g, '')) || 0;
        }
        
        // Handle numeric fields
        if (key === 'Month' || key === 'AnimalDays') {
            valA = parseFloat(valA) || 0;
            valB = parseFloat(valB) || 0;
        }
        
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

// Setup column resizing
function setupColumnResizing() {
    const resizers = document.querySelectorAll('.resizer');
    
    resizers.forEach((resizer) => {
        resizer.addEventListener('mousedown', function (e) {
            e.stopPropagation(); // prevent sort click
            
            const th = this.parentElement;
            const startX = e.pageX;
            const startWidth = th.offsetWidth;
            
            function onMouseMove(e) {
                const newWidth = startWidth + (e.pageX - startX);
                th.style.width = newWidth + 'px';
            }
            
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMonthData();
    loadProjectList();
    loadProjectCostData();
    populateSelect(document.getElementById('dpSelectmonth'), monthListData, 'period', 'monthName');
    
    // Setup sorting and resizing
    setupSorting();
    setupColumnResizing();
    
    // Add event listener for records per page selector
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', (e) => {
            changeRecordsPerPage(e.target.value);
        });
    }
    
    // Add Project Cost button listener
    const addProjectCostBtn = document.getElementById('addProjectCostBtn');
    if (addProjectCostBtn) {
        addProjectCostBtn.addEventListener('click', function() {
            openProjectCostModal();
        });
    }
    
    // Modal event listeners
    const closeModalBtn = document.getElementById('closeProjectCostModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectCostModal);
    }
    
    const cancelModalBtn = document.getElementById('cancelProjectCostModalBtn');
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeProjectCostModal);
    }
    
    const saveProjectCostBtn = document.getElementById('saveProjectCostBtn');
    if (saveProjectCostBtn) {
        saveProjectCostBtn.addEventListener('click', saveProjectCost);
    }
    
    // Restrict numeric inputs
    const numericInputs = ['txtmodal-amount', 'txtmodal-dailyrate'];
    numericInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function(event) {
                let value = this.value;
                value = value.replace(/[^0-9.]/g, '');
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }
                this.value = value;
            });
        }
    });
});

// Edit project cost function
function editProjectCost(event) {
    const button = event.currentTarget;
    const item = JSON.parse(button.dataset.item);
    const index = parseInt(button.dataset.index);
    console.log('Item:', item);
    //openModal(item, index);
    openProjectCostModal(item, index);
}

// Delete project cost function
function deleteProjectCost(index) {
    const item = filteredProjectCostData[index];
    if (confirm(`Are you sure you want to delete project cost for ${item.Project}?`)) {
        filteredProjectCostData.splice(index, 1);
        
        // Also remove from the main data array
        const mainIndex = projectCostData.findIndex(data => 
            data.Project === item.Project && 
            data.Month === item.Month && 
            data.AcctCode === item.AcctCode
        );
        if (mainIndex !== -1) {
            projectCostData.splice(mainIndex, 1);
        }
        
        // Adjust current page if needed
        const totalPages = Math.ceil(filteredProjectCostData.length / recordsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderProjectCostTable();
        renderPagination();
        console.log('Project cost deleted:', item);
    }
}

// Modal functions
function openProjectCostModal(item = null, index = null) {
    const modal = document.getElementById('addProjectCostModal');
    const modalLabel = document.getElementById('projectCostModalLabel');
    const form = document.getElementById('formAddProjectCost');
    
    editingIndex = index;
    
    if (item !== null) {
        // Edit mode
       // const item = filteredProjectCostData[index];
        modalLabel.textContent = 'Edit Project Cost';
        document.getElementById('dpSelectproject').value = item.Project || '';
        //document.getElementById('txtmodal-project').value = item.Project || '';
        document.getElementById('txtmodal-accountcode').value = item.AcctCode || '';
        document.getElementById('txtmodal-amount').value = String(item.Amount || '').replace(/[$,]/g, '');
        document.getElementById('txtmodal-month').value = item.Month || '';
        document.getElementById('txtmodal-testjob').value = item.TestJob || '';
        document.getElementById('txtmodal-description').value = item.Description || '';
        document.getElementById('txtmodal-supplier').value = item.Supplier || '';
        document.getElementById('txtmodal-suppliernumber').value = item.SupplierNumber || '';
        document.getElementById('txtmodal-dailyrate').value = String(item.DailyRate || '').replace(/[$,]/g, '');
        document.getElementById('txtmodal-animaldays').value = item.AnimalDays || '';
    } else {
        // Add mode
        modalLabel.textContent = 'Add Project Cost';
        form.reset();
        // Pre-populate month if one is selected
        const selectedMonth = document.getElementById('txtSelectedMonth').value;
        if (selectedMonth) {
            const periodMatch = selectedMonth.match(/Period (\d+)/);
            if (periodMatch) {
                document.getElementById('txtmodal-month').value = periodMatch[1];
            }
        }
    }
    
    // Show modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeProjectCostModal() {
    const modal = document.getElementById('addProjectCostModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        editingIndex = null;
    }, 300);
}

function saveProjectCost() {
    const form = document.getElementById('formAddProjectCost');
    
    // Check form validity
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const project = document.getElementById('dpSelectproject').value.trim();
    //const project = document.getElementById('txtmodal-project').value.trim();
    const accountCode = document.getElementById('txtmodal-accountcode').value.trim();
    const amount = document.getElementById('txtmodal-amount').value.trim();
    const month = document.getElementById('txtmodal-month').value.trim();
    const testJob = document.getElementById('txtmodal-testjob').value.trim();
    const description = document.getElementById('txtmodal-description').value.trim();
    const supplier = document.getElementById('txtmodal-supplier').value.trim();
    const supplierNumber = document.getElementById('txtmodal-suppliernumber').value.trim();
    const dailyRate = document.getElementById('txtmodal-dailyrate').value.trim();
    const animalDays = document.getElementById('txtmodal-animaldays').value.trim();

    // Validation
    if (!project || !accountCode || !amount || !month) {
        alert('Please fill in all required fields (Project, Account Code, Amount, Month)');
        return;
    }

    if(month > 12 || month < 1){
        alert('Please enter a valid month number (1-12)');
        return;
    }

    // Format prices if provided
    const formattedAmount = amount ? `$${parseFloat(amount).toFixed(2)}` : '';
    const formattedDailyRate = dailyRate ? `$${parseFloat(dailyRate).toFixed(2)}` : '';

    const newEntry = {
        Project: project,
        AcctCode: accountCode,
        Amount: formattedAmount,
        Month: month,
        TestJob: testJob,
        Description: description,
        Supplier: supplier,
        SupplierNumber: supplierNumber,
        DailyRate: formattedDailyRate,
        AnimalDays: animalDays
    };

    if (editingIndex !== null) {
        // Update existing entry
        const oldItem = filteredProjectCostData[editingIndex];
        filteredProjectCostData[editingIndex] = newEntry;
        
        // Update main data array
        const mainIndex = projectCostData.findIndex(data => 
            data.Project === oldItem.Project && 
            data.Month === oldItem.Month && 
            data.AcctCode === oldItem.AcctCode
        );
        if (mainIndex !== -1) {
            projectCostData[mainIndex] = newEntry;
        }
        
        alert('Project cost updated successfully!');
    } else {
        // Add new entry
        filteredProjectCostData.push(newEntry);
        projectCostData.push(newEntry);
        currentPage = 1; // Go to first page to show new entry
        alert('Project cost added successfully!');
    }

    closeProjectCostModal();
    renderProjectCostTable();
    renderPagination();
}

// Make functions available globally for onclick handlers
window.editProjectCost = editProjectCost;
window.deleteProjectCost = deleteProjectCost;

