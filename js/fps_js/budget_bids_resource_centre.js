// Budget Bids for Resource Centre - JavaScript Handler

let workgroupsData = [];
let budgetBidsData = [];
let purchasesData = [];
let accountDescriptionsData = [];
let selectedWorkgroup = null;

// Pagination variables
let currentBudgetPage = 1;
let budgetRecordsPerPage = 10;
let currentPurchasesPage = 1;
let purchasesRecordsPerPage = 10;

// Current filter state
let currentBudgetFilters = { workgroupCode: null, wgItem: null };
let currentPurchasesFilters = { workgroupCode: null, wgItem: null, account: null };

// Modal editing state
let editingBudgetBidIndex = null;
let editingPurchaseIndex = null;

// Modal references (will be initialized after DOM loads)
let budgetBidModal = null;
let purchaseModal = null;

/**
 * Load workgroups data from JSON
 */
async function loadWorkgroupsData() {
    try {
        const response = await fetch('../js/fps_js/data/budget-bids-workgroups.json');
        if (!response.ok) throw new Error('Failed to load workgroups data');
        workgroupsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading workgroups data:', error);
        workgroupsData = [];
        return false;
    }
}

/**
 * Load budget bids data from JSON
 */
async function loadBudgetBidsData() {
    try {
        const response = await fetch('../js/fps_js/data/budget-bids-data.json');
        if (!response.ok) throw new Error('Failed to load budget bids data');
        budgetBidsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading budget bids data:', error);
        budgetBidsData = [];
        return false;
    }
}

/**
 * Load purchases data from JSON
 */
async function loadPurchasesData() {
    try {
        const response = await fetch('../js/fps_js/data/budget-purchases-data.json');
        if (!response.ok) throw new Error('Failed to load purchases data');
        purchasesData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading purchases data:', error);
        purchasesData = [];
        return false;
    }
}

/**
 * Load account descriptions data from JSON
 */
async function loadAccountDescriptionsData() {
    try {
        const response = await fetch('../js/fps_js/data/account-descriptions-data.json');
        if (!response.ok) throw new Error('Failed to load account descriptions data');
        accountDescriptionsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading account descriptions data:', error);
        accountDescriptionsData = [];
        return false;
    }
}

/**
 * Populate workgroup dropdown
 */
function populateWorkgroupDropdown() {
    const select = document.getElementById('workgroupSelect');
    if (!select) return;
    
    // Clear existing options except first one
    select.innerHTML = '<option value="">-- Select Workgroup --</option>';
    
    // Add workgroups
    workgroupsData.forEach(wg => {
        const option = document.createElement('option');
        option.value = wg.code;
        option.textContent = wg.name;
        select.appendChild(option);
    });
    
    // Add event listener
    select.addEventListener('change', function() {
        selectedWorkgroup = this.value;
        if (selectedWorkgroup) {
            displayWorkgroupWG(selectedWorkgroup);
            // Budget bids will be populated automatically by first row selection
        } else {
            clearWorkgroupList();
            clearBudgetBids();
            clearPurchases();
        }
    });
}

/**
 * Render workgroups list table
 */
function renderWorkgroupsList() {
    const tbody = document.getElementById('workgroupListBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    workgroupsData.forEach((wg, index) => {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.style.cursor = 'pointer';
        
        row.innerHTML = `
            <td class="govuk-table__cell">${wg.name}</td>
        `;
        
        row.addEventListener('click', function() {
            selectedWorkgroup = wg.code;
            document.getElementById('workgroupSelect').value = wg.code;
            filterBudgetBids(wg.code);
            filterPurchases(wg.code);
        });
        
        tbody.appendChild(row);
    });
}

/**
 * Display WG array values for selected workgroup
 */
function displayWorkgroupWG(workgroupCode) {
    const tbody = document.getElementById('workgroupListBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!workgroupCode) {
        // If no workgroup selected, show all workgroups
        renderWorkgroupsList();
        return;
    }
    
    // Find the selected workgroup
    const selectedWG = workgroupsData.find(wg => wg.code === workgroupCode);
    
    if (!selectedWG || !selectedWG.wg || selectedWG.wg.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td class="govuk-table__cell" style="text-align: center;">No WG items found</td>';
        tbody.appendChild(row);
        return;
    }
    
    // Display each WG item from the array
    selectedWG.wg.forEach((wgItem, index) => {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.style.cursor = 'pointer';
        
        row.innerHTML = `
            <td class="govuk-table__cell">${wgItem}</td>
        `;
        
        // Add click handler to filter budget bids by specific wg item
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            tbody.querySelectorAll('tr').forEach(tr => tr.classList.remove('sup-selected-row'));
            // Highlight this row
            this.classList.add('sup-selected-row');
            
            // Update the WG textboxes
            const txtSelectedWg = document.getElementById('txtSelectedWg');
            const txtSelectedWgOfOne = document.getElementById('txtSelectedWgOfOne');
            if (txtSelectedWg) txtSelectedWg.value = wgItem;
            if (txtSelectedWgOfOne) txtSelectedWgOfOne.value = wgItem;
            
            filterBudgetBidsByWG(workgroupCode, wgItem);
        });
        
        tbody.appendChild(row);
    });
    
    // Automatically select the first row
    if (selectedWG.wg.length > 0) {
        const firstRow = tbody.querySelector('tr');
        if (firstRow) {
            firstRow.classList.add('sup-selected-row');
            
            // Update the WG textboxes with first row value
            const txtSelectedWg = document.getElementById('txtSelectedWg');
            const txtSelectedWgOfOne = document.getElementById('txtSelectedWgOfOne');
            if (txtSelectedWg) txtSelectedWg.value = selectedWG.wg[0];
            if (txtSelectedWgOfOne) txtSelectedWgOfOne.value = selectedWG.wg[0];
            
            filterBudgetBidsByWG(workgroupCode, selectedWG.wg[0]);
        }
    }
}

/**
 * Filter and display budget bids for selected workgroup and specific WG item
 */
function filterBudgetBidsByWG(workgroupCode, wgItem, page = 1) {
    const tbody = document.getElementById('budgetBidsBody');
    if (!tbody) return;
    
    // Store current filter state
    currentBudgetFilters = { workgroupCode, wgItem };
    currentBudgetPage = page;
    
    tbody.innerHTML = '';
    
    const filtered = budgetBidsData.filter(bid => 
        bid.workgroup === workgroupCode && bid.wg === wgItem
    );
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / budgetRecordsPerPage);
    const startIndex = (currentBudgetPage - 1) * budgetRecordsPerPage;
    const endIndex = startIndex + budgetRecordsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    let totalBid = 0;
    
    // Calculate total from all filtered records (not just paginated)
    filtered.forEach(bid => {
        const genBidValue = bid.genBid || 0;
        totalBid += parseFloat(genBidValue);
    });
    
    paginatedData.forEach((bid, index) => {
        const actualIndex = startIndex + index; // Actual index in filtered array
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.style.cursor = 'pointer';
        
        const genBidValue = bid.genBid || 0;
        
        row.innerHTML = `
            <td class="govuk-table__cell">${bid.account || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(genBidValue)}</td>
            <td class="govuk-table__cell" style="text-align: center;">
                <button class="edit-btn" data-item='${JSON.stringify(bid)}' data-index="${actualIndex}" onclick="editBudgetBid(event)" style="background: none; border: none; cursor: pointer; margin-right: 5px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="deleteBudgetBid(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>
        `;
        
        // Add click handler to filter purchases by account (on non-action cells)
        const cells = row.querySelectorAll('td');
        cells[0].addEventListener('click', function() {
            selectBudgetRow(row, workgroupCode, wgItem, bid.account);
        });
        cells[1].addEventListener('click', function() {
            selectBudgetRow(row, workgroupCode, wgItem, bid.account);
        });
        
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="3" class="govuk-table__cell" style="text-align: center;">No budget bids found</td>';
        tbody.appendChild(row);
    }
    
    const recordStart = filtered.length > 0 ? startIndex + 1 : 0;
    const recordEnd = Math.min(endIndex, filtered.length);
    // document.getElementById('budgetRecord').textContent = `${recordStart}-${recordEnd} of ${filtered.length}`;
    document.getElementById('totalBid').value = `${formatNumber(totalBid)}`;
    
    // Render pagination
    renderPagination('budgetBidsPagination', currentBudgetPage, totalPages, function(newPage) {
        filterBudgetBidsByWG(workgroupCode, wgItem, newPage);
    });
    
    // Automatically select the first row
    if (paginatedData.length > 0) {
        const firstRow = tbody.querySelector('tr');
        if (firstRow && firstRow.style.cursor === 'pointer') {
            firstRow.classList.add('sup-selected-row');
            
            // Update the account textbox with first row value
            const txtSelectedAccount = document.getElementById('txtSelectedAccount');
            if (txtSelectedAccount) txtSelectedAccount.value = paginatedData[0].account;
            
            filterPurchasesByAccount(workgroupCode, wgItem, paginatedData[0].account);
        }
    }
}

/**
 * Helper function to select a budget bid row
 */
function selectBudgetRow(row, workgroupCode, wgItem, account) {
    const tbody = document.getElementById('budgetBidsBody');
    // Remove highlight from all rows
    tbody.querySelectorAll('tr').forEach(tr => tr.classList.remove('sup-selected-row'));
    // Highlight this row
    row.classList.add('sup-selected-row');
    
    // Update the account textbox
    const txtSelectedAccount = document.getElementById('txtSelectedAccount');
    if (txtSelectedAccount) txtSelectedAccount.value = account;
    
    filterPurchasesByAccount(workgroupCode, wgItem, account);
}

/**
 * Filter and display budget bids for selected workgroup
 */
function filterBudgetBids(workgroupCode) {
    const tbody = document.getElementById('budgetBidsBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = budgetBidsData.filter(bid => bid.workgroup === workgroupCode);
    
    let totalBid = 0;
    
    filtered.forEach(bid => {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        const genBidValue = bid.genBid || 0;
        totalBid += parseFloat(genBidValue);
        
        row.innerHTML = `
            <td class="govuk-table__cell">${bid.account || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(genBidValue)}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="2" class="govuk-table__cell" style="text-align: center;">No budget bids found</td>';
        tbody.appendChild(row);
    }
    
    document.getElementById('budgetRecord').textContent = `1 of ${filtered.length}`;
    document.getElementById('totalBid').value = `£${formatNumber(totalBid)}`;
}

/**
 * Filter and display purchases for selected workgroup
 */
function filterPurchases(workgroupCode) {
    const tbody = document.getElementById('purchasesBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = purchasesData.filter(purchase => purchase.workgroup === workgroupCode);
    
    let totalAmount = 0;
    
    filtered.forEach(purchase => {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        const amount = purchase.amount || 0;
        totalAmount += parseFloat(amount);
        
        row.innerHTML = `
            <td class="govuk-table__cell">${purchase.itemDescription || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(amount)}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="2" class="govuk-table__cell" style="text-align: center;">No purchases found</td>';
        tbody.appendChild(row);
    }
    
    // document.getElementById('purchasesRecord').textContent = `1 of ${filtered.length}`;
    // document.getElementById('totalPurchases').value = `£${formatNumber(totalAmount)}`;
}

/**
 * Filter and display purchases for selected workgroup, wg item, and account
 */
function filterPurchasesByAccount(workgroupCode, wgItem, account, page = 1) {
    const tbody = document.getElementById('purchasesBody');
    if (!tbody) return;
    
    // Store current filter state
    currentPurchasesFilters = { workgroupCode, wgItem, account };
    currentPurchasesPage = page;
    
    tbody.innerHTML = '';
    
    const filtered = purchasesData.filter(purchase => 
        purchase.workgroup === workgroupCode && 
        purchase.wg === wgItem && 
        purchase.account === account
    );
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / purchasesRecordsPerPage);
    const startIndex = (currentPurchasesPage - 1) * purchasesRecordsPerPage;
    const endIndex = startIndex + purchasesRecordsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    let totalAmount = 0;
    
    // Calculate total from all filtered records (not just paginated)
    filtered.forEach(purchase => {
        const amount = purchase.amount || 0;
        totalAmount += parseFloat(amount);
    });
    
    paginatedData.forEach((purchase, index) => {
        const actualIndex = startIndex + index; // Actual index in filtered array
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        const amount = purchase.amount || 0;
        
        row.innerHTML = `
            <td class="govuk-table__cell">${purchase.itemDescription || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(amount)}</td>
            <td class="govuk-table__cell" style="text-align: center;">
                <button class="edit-btn" data-item='${JSON.stringify(purchase)}' data-index="${actualIndex}" onclick="editPurchase(event)" style="background: none; border: none; cursor: pointer; margin-right: 5px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="deletePurchase(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="3" class="govuk-table__cell" style="text-align: center;">No purchases found</td>';
        tbody.appendChild(row);
    }
    
    const recordStart = filtered.length > 0 ? startIndex + 1 : 0;
    const recordEnd = Math.min(endIndex, filtered.length);
    //document.getElementById('purchasesRecord').textContent = `${recordStart}-${recordEnd} of ${filtered.length}`;
    document.getElementById('totalPurchases').value = `${formatNumber(totalAmount)}`;
    
    // Render pagination
    renderPagination('purchasesPagination', currentPurchasesPage, totalPages, function(newPage) {
        filterPurchasesByAccount(workgroupCode, wgItem, account, newPage);
    });
}

/**
 * Clear budget bids table
 */
function clearBudgetBids() {
    const tbody = document.getElementById('budgetBidsBody');
    if (tbody) tbody.innerHTML = '';
    document.getElementById('budgetRecord').textContent = '0 of 0';
    document.getElementById('totalBid').value = '';
    
    // Clear the account textbox
    const txtSelectedAccount = document.getElementById('txtSelectedAccount');
    if (txtSelectedAccount) txtSelectedAccount.value = '';
}

/**
 * Clear purchases table
 */
function clearPurchases() {
    const tbody = document.getElementById('purchasesBody');
    if (tbody) tbody.innerHTML = '';
    document.getElementById('purchasesRecord').textContent = '0 of 0';
    document.getElementById('totalPurchases').value = '';
}

/**
 * Clear workgroup list table
 */
function clearWorkgroupList() {
    const tbody = document.getElementById('workgroupListBody');
    if (tbody) tbody.innerHTML = '';
    
    // Clear the WG textboxes
    const txtSelectedWg = document.getElementById('txtSelectedWg');
    const txtSelectedWgOfOne = document.getElementById('txtSelectedWgOfOne');
    if (txtSelectedWg) txtSelectedWg.value = '';
    if (txtSelectedWgOfOne) txtSelectedWgOfOne.value = '';
}

/**
 * Format number with commas and 2 decimal places
 */
function formatNumber(num) {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add Budget Bid button
    const addBudgetBidBtn = document.getElementById('addBudgetBidBtn');
    if (addBudgetBidBtn) {
        addBudgetBidBtn.addEventListener('click', addBudgetBid);
    }
    
    // Add Purchase button
    const addPurchaseBtn = document.getElementById('addPurchaseBtn');
    if (addPurchaseBtn) {
        addPurchaseBtn.addEventListener('click', addPurchase);
    }
    
    // Budget Bid Modal controls
    const closeBudgetBidBtn = document.getElementById('closeBudgetBidModalBtn');
    const cancelBudgetBidBtn = document.getElementById('cancelBudgetBidModalBtn');
    const saveBudgetBidBtn = document.getElementById('saveBudgetBidBtn');
    
    if (closeBudgetBidBtn) {
        closeBudgetBidBtn.addEventListener('click', closeBudgetBidModal);
    }
    if (cancelBudgetBidBtn) {
        cancelBudgetBidBtn.addEventListener('click', closeBudgetBidModal);
    }
    if (saveBudgetBidBtn) {
        saveBudgetBidBtn.addEventListener('click', saveBudgetBid);
    }
    
    // Purchase Modal controls
    const closePurchaseBtn = document.getElementById('closePurchaseModalBtn');
    const cancelPurchaseBtn = document.getElementById('cancelPurchaseModalBtn');
    const savePurchaseBtn = document.getElementById('savePurchaseBtn');
    
    if (closePurchaseBtn) {
        closePurchaseBtn.addEventListener('click', closePurchaseModal);
    }
    if (cancelPurchaseBtn) {
        cancelPurchaseBtn.addEventListener('click', closePurchaseModal);
    }
    if (savePurchaseBtn) {
        savePurchaseBtn.addEventListener('click', savePurchase);
    }
    
    // Records per page - Budget Bids
    const recordsPerPageBudget = document.getElementById('recordsPerPageBudget');
    if (recordsPerPageBudget) {
        recordsPerPageBudget.addEventListener('change', function() {
            budgetRecordsPerPage = parseInt(this.value);
            if (currentBudgetFilters.workgroupCode && currentBudgetFilters.wgItem) {
                filterBudgetBidsByWG(currentBudgetFilters.workgroupCode, currentBudgetFilters.wgItem, 1);
            }
        });
    }
    
    // Records per page - Purchases
    const recordsPerPagePurchases = document.getElementById('recordsPerPagePurchases');
    if (recordsPerPagePurchases) {
        recordsPerPagePurchases.addEventListener('change', function() {
            purchasesRecordsPerPage = parseInt(this.value);
            if (currentPurchasesFilters.workgroupCode && currentPurchasesFilters.wgItem && currentPurchasesFilters.account) {
                filterPurchasesByAccount(
                    currentPurchasesFilters.workgroupCode, 
                    currentPurchasesFilters.wgItem, 
                    currentPurchasesFilters.account, 
                    1
                );
            }
        });
    }
    
    const selectByAccountBtn = document.getElementById('selectByAccountBtn');
    if (selectByAccountBtn) {
        selectByAccountBtn.addEventListener('click', function() {
            if (!selectedWorkgroup) {
                alert('Please select a workgroup first.');
                return;
            }
            
            // Store selected workgroup in sessionStorage
            const selectedWgData = workgroupsData.find(wg => wg.code === selectedWorkgroup);
            if (selectedWgData) {
                sessionStorage.setItem('selectedWorkgroup', JSON.stringify({
                    code: selectedWgData.code,
                    name: selectedWgData.name
                }));
            }
            
            // Redirect to account centre page
            window.location.href = 'budget_bids_account_centre.html';
        });
    }
    
    const viewReportBtn = document.getElementById('viewReportBtn');
    if (viewReportBtn) {
        viewReportBtn.addEventListener('click', function() {
            alert('View Report functionality to be implemented');
        });
    }
    
    const sendToExcelBtn = document.getElementById('sendToExcelBtn');
    if (sendToExcelBtn) {
        sendToExcelBtn.addEventListener('click', function() {
            alert('Send To Excel functionality to be implemented');
        });
    }
}

/**
 * Column resizer functionality
 */
function setupResizers() {
    const resizers = document.querySelectorAll(".resizer");
    
    resizers.forEach((resizer) => {
        resizer.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            
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
}

/**
 * Add new budget bid
 */
function addBudgetBid() {
    if (!currentBudgetFilters.workgroupCode || !currentBudgetFilters.wgItem) {
        alert('Please select a workgroup and WG item first.');
        return;
    }
    
    openBudgetBidModal();
}

/**
 * Edit budget bid
 */
function editBudgetBid(event) {
    event.stopPropagation();
    
    const button = event.currentTarget;
    const itemData = JSON.parse(button.getAttribute('data-item'));
    const index = parseInt(button.getAttribute('data-index'));
    
    // Find the actual record in budgetBidsData
    const recordIndex = budgetBidsData.findIndex(bid => bid.id === itemData.id);
    if (recordIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    openBudgetBidModal(budgetBidsData[recordIndex], recordIndex);
}

/**
 * Open Budget Bid Modal
 */
function openBudgetBidModal(item = null, index = null) {
    editingBudgetBidIndex = index;
    
    if (item !== null) {
        // Edit mode
        document.getElementById('txtmodal-account').value = item.account;
        document.getElementById('txtmodal-genbid').value = item.genBid;
        document.getElementById('budgetBidModalLabel').textContent = 'Edit Budget Bid';
    } else {
        // Add mode
        document.getElementById('formAddBudgetBid').reset();
        document.getElementById('budgetBidModalLabel').textContent = 'Add Budget Bid';
    }
    
    budgetBidModal.style.display = 'block';
    setTimeout(() => {
        budgetBidModal.classList.add('show');
    }, 10);
}

/**
 * Close Budget Bid Modal
 */
function closeBudgetBidModal() {
    budgetBidModal.classList.remove('show');
    setTimeout(() => {
        budgetBidModal.style.display = 'none';
        document.getElementById('formAddBudgetBid').reset();
        editingBudgetBidIndex = null;
    }, 300);
}

/**
 * Save Budget Bid
 */
function saveBudgetBid() {
    const account = document.getElementById('txtmodal-account').value.trim();
    const genBid = document.getElementById('txtmodal-genbid').value.trim();
    
    // Validation
    if (!account || !genBid) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isNaN(genBid)) {
        alert('Invalid amount. Please enter a numeric value.');
        return;
    }
    
    if (editingBudgetBidIndex !== null) {
        // Edit mode
        budgetBidsData[editingBudgetBidIndex].account = account;
        budgetBidsData[editingBudgetBidIndex].genBid = parseFloat(genBid);
    } else {
        // Add mode
        const maxId = budgetBidsData.reduce((max, bid) => Math.max(max, bid.id || 0), 0);
        const newBudgetBid = {
            id: maxId + 1,
            workgroup: currentBudgetFilters.workgroupCode,
            wg: currentBudgetFilters.wgItem,
            account: account,
            genBid: parseFloat(genBid)
        };
        budgetBidsData.push(newBudgetBid);
    }
    
    // Refresh the table
    filterBudgetBidsByWG(currentBudgetFilters.workgroupCode, currentBudgetFilters.wgItem, currentBudgetPage);
    
    closeBudgetBidModal();
    alert(editingBudgetBidIndex !== null ? 'Budget bid updated successfully!' : 'Budget bid added successfully!');
}

/**
 * Delete budget bid
 */
function deleteBudgetBid(index) {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this budget bid?')) {
        return;
    }
    
    // Get the current filtered dataset to find the actual record
    const filtered = budgetBidsData.filter(bid => 
        bid.workgroup === currentBudgetFilters.workgroupCode && 
        bid.wg === currentBudgetFilters.wgItem
    );
    
    if (index >= filtered.length) {
        alert('Invalid record.');
        return;
    }
    
    const recordToDelete = filtered[index];
    const actualIndex = budgetBidsData.findIndex(bid => bid.id === recordToDelete.id);
    
    if (actualIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    // Remove from array
    budgetBidsData.splice(actualIndex, 1);
    
    // Refresh the table
    filterBudgetBidsByWG(currentBudgetFilters.workgroupCode, currentBudgetFilters.wgItem, currentBudgetPage);
    
    alert('Budget bid deleted successfully!');
}

/**
 * Add new purchase
 */
function addPurchase() {
    if (!currentPurchasesFilters.workgroupCode || !currentPurchasesFilters.wgItem || !currentPurchasesFilters.account) {
        alert('Please select a workgroup, WG item, and account first.');
        return;
    }
    
    openPurchaseModal();
}

/**
 * Edit purchase
 */
function editPurchase(event) {
    event.stopPropagation();
    
    const button = event.currentTarget;
    const itemData = JSON.parse(button.getAttribute('data-item'));
    const index = parseInt(button.getAttribute('data-index'));
    
    // Find the actual record in purchasesData
    const recordIndex = purchasesData.findIndex(purchase => purchase.id === itemData.id);
    if (recordIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    openPurchaseModal(purchasesData[recordIndex], recordIndex);
}

/**
 * Open Purchase Modal
 */
function openPurchaseModal(item = null, index = null) {
    editingPurchaseIndex = index;
    
    if (item !== null) {
        // Edit mode
        document.getElementById('txtmodal-itemdescription').value = item.itemDescription;
        document.getElementById('txtmodal-amount').value = item.amount;
        document.getElementById('purchaseModalLabel').textContent = 'Edit Purchase';
    } else {
        // Add mode
        document.getElementById('formAddPurchase').reset();
        document.getElementById('purchaseModalLabel').textContent = 'Add Purchase';
    }
    
    purchaseModal.style.display = 'block';
    setTimeout(() => {
        purchaseModal.classList.add('show');
    }, 10);
}

/**
 * Close Purchase Modal
 */
function closePurchaseModal() {
    purchaseModal.classList.remove('show');
    setTimeout(() => {
        purchaseModal.style.display = 'none';
        document.getElementById('formAddPurchase').reset();
        editingPurchaseIndex = null;
    }, 300);
}

/**
 * Save Purchase
 */
function savePurchase() {
    const itemDescription = document.getElementById('txtmodal-itemdescription').value.trim();
    const amount = document.getElementById('txtmodal-amount').value.trim();
    
    // Validation
    if (!itemDescription || !amount) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isNaN(amount)) {
        alert('Invalid amount. Please enter a numeric value.');
        return;
    }
    
    if (editingPurchaseIndex !== null) {
        // Edit mode
        purchasesData[editingPurchaseIndex].itemDescription = itemDescription;
        purchasesData[editingPurchaseIndex].amount = parseFloat(amount);
    } else {
        // Add mode
        const maxId = purchasesData.reduce((max, purchase) => Math.max(max, purchase.id || 0), 0);
        const newPurchase = {
            id: maxId + 1,
            workgroup: currentPurchasesFilters.workgroupCode,
            wg: currentPurchasesFilters.wgItem,
            account: currentPurchasesFilters.account,
            itemDescription: itemDescription,
            amount: parseFloat(amount)
        };
        purchasesData.push(newPurchase);
    }
    
    // Refresh the table
    filterPurchasesByAccount(
        currentPurchasesFilters.workgroupCode, 
        currentPurchasesFilters.wgItem, 
        currentPurchasesFilters.account, 
        currentPurchasesPage
    );
    
    closePurchaseModal();
    alert(editingPurchaseIndex !== null ? 'Purchase updated successfully!' : 'Purchase added successfully!');
}

/**
 * Delete purchase
 */
function deletePurchase(index) {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this purchase?')) {
        return;
    }
    
    // Get the current filtered dataset to find the actual record
    const filtered = purchasesData.filter(purchase => 
        purchase.workgroup === currentPurchasesFilters.workgroupCode && 
        purchase.wg === currentPurchasesFilters.wgItem && 
        purchase.account === currentPurchasesFilters.account
    );
    
    if (index >= filtered.length) {
        alert('Invalid record.');
        return;
    }
    
    const recordToDelete = filtered[index];
    const actualIndex = purchasesData.findIndex(purchase => purchase.id === recordToDelete.id);
    
    if (actualIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    // Remove from array
    purchasesData.splice(actualIndex, 1);
    
    // Refresh the table
    filterPurchasesByAccount(
        currentPurchasesFilters.workgroupCode, 
        currentPurchasesFilters.wgItem, 
        currentPurchasesFilters.account, 
        currentPurchasesPage
    );
    
    alert('Purchase deleted successfully!');
}

/**
 * Generic pagination renderer
 */
function renderPagination(paginationId, currentPage, totalPages, onPageClick) {
    const paginationContainer = document.getElementById(paginationId);
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        return;
    }
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Previous button - always visible
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    prevItem.innerHTML = `
        <a class="govuk-link govuk-pagination__link" href="#" rel="prev">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            <span class="govuk-pagination__link-title">Previous</span>
        </a>
    `;
    prevItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            onPageClick(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevItem);
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'govuk-pagination__item';
        if (i === currentPage) {
            pageItem.className += ' govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
        }
        
        pageItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            if (i !== currentPage) {
                onPageClick(i);
            }
        });
        
        paginationContainer.appendChild(pageItem);
    }
    
    // Next button - always visible
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    nextItem.innerHTML = `
        <a class="govuk-link govuk-pagination__link" href="#" rel="next">
            <span class="govuk-pagination__link-title">Next</span>
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </a>
    `;
    nextItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            onPageClick(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextItem);
}
/**
 * Initialize account dropdown with search functionality
 * @param {HTMLElement} dropdown - The dropdown container element
 * @param {Array} dataset - Array of account objects
 */
function initAccountDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.select-search-box');
    const clearBtn = dropdown.querySelector('.clear-search-btn');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        dataset
            .filter(d =>
                d.acctShortNam.toLowerCase().includes(filter) || 
                d.accountDescription.toLowerCase().includes(filter) ||
                d.constituentAccountCodes.toLowerCase().includes(filter)
            )
            .forEach((d, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.acctShortNam}</td><td>${d.accountDescription}</td><td>${d.constituentAccountCodes}</td>`;
                tr.onclick = () => {
                    input.value = d.acctShortNam;
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
 * Initialize all data-empdropdown elements
 */
function initializeDropdowns() {
    document.querySelectorAll('[data-empdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'accounts') {
            initAccountDropdown(dd, accountDescriptionsData);
        }
    });
}

/**
 * Initialize the application
 */
async function initialize() {
    // Initialize modal references
    budgetBidModal = document.getElementById('addBudgetBidModal');
    purchaseModal = document.getElementById('addPurchaseModal');
    
    await loadWorkgroupsData();
    await loadBudgetBidsData();
    await loadPurchasesData();
    await loadAccountDescriptionsData();
    
    populateWorkgroupDropdown();
    initializeDropdowns();
    setupEventListeners();
    setupResizers();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initialize);
