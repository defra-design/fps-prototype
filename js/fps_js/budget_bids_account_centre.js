// Budget Bids for Account Centre - JavaScript Handler

let workgroupsData = [];
let accountCodesData = [];
let accountWorkgroupBidsData = [];
let purchasesData = [];
let selectedWorkgroup = null;
let currentWGList = [];

// Pagination variables
let currentBidPage = 1;
let bidRecordsPerPage = 10;
let currentPurchasesPage = 1;
let purchasesRecordsPerPage = 10;

// Current filter state
let currentBidFilters = { workgroupCode: null };

// Modal editing state
let editingBidIndex = null;
let editingPurchaseIndex = null;

// Modal references (will be initialized after DOM loads)
let accountBidModal = null;
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
 * Load account codes data from JSON
 */
async function loadAccountCodesData() {
    try {
        const response = await fetch('../js/fps_js/data/account-codes-data.json');
        if (!response.ok) throw new Error('Failed to load account codes data');
        accountCodesData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading account codes data:', error);
        accountCodesData = [];
        return false;
    }
}

/**
 * Load account workgroup bids data from JSON
 */
async function loadAccountWorkgroupBidsData() {
    try {
        const response = await fetch('../js/fps_js/data/account-workgroup-bids-data.json');
        if (!response.ok) throw new Error('Failed to load account workgroup bids data');
        accountWorkgroupBidsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading account workgroup bids data:', error);
        accountWorkgroupBidsData = [];
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
 * Populate workgroup dropdown
 */
function populateWorkgroupFromSession() {
    const selectedWgSpan = document.getElementById('selectedWg');
    if (!selectedWgSpan) return;
    
    // Get selected workgroup from sessionStorage
    const storedWg = sessionStorage.getItem('selectedWorkgroup');
    if (storedWg) {
        try {
            const wgData = JSON.parse(storedWg);
            selectedWorkgroup = wgData.code;
            selectedWgSpan.textContent = wgData.name;
            
            // Load data for selected workgroup
            filterAccountWorkgroupBids(selectedWorkgroup);
            filterPurchases(selectedWorkgroup);
        } catch (error) {
            console.error('Error parsing stored workgroup:', error);
            selectedWgSpan.textContent = 'No workgroup selected';
        }
    } else {
        selectedWgSpan.textContent = 'No workgroup selected';
    }
}

/**
 * Display account categories in first table
 */
function displayAccountCategories() {
    const tbody = document.getElementById('accountCatListBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Display all account categories from JSON
    accountCodesData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.style.cursor = 'pointer';
        
        row.innerHTML = `
            <td class="govuk-table__cell">${item.acctCat || ''}</td>
            <td class="govuk-table__cell">${item.accountCodes || ''}</td>
        `;
        
        // Add click event to row
        row.addEventListener('click', function() {
            updateSelectedAccountCategory(item.acctCat);
            // Highlight selected row
            tbody.querySelectorAll('tr').forEach(r => r.style.backgroundColor = '');
            row.style.backgroundColor = '#f3f2f1';
        });
        
        tbody.appendChild(row);
    });
    
    // Set first value to txtSelectedAccountCategory
    if (accountCodesData.length > 0) {
        updateSelectedAccountCategory(accountCodesData[0].acctCat);
    }
}

/**
 * Update selected account category textbox
 */
function updateSelectedAccountCategory(acctCat) {
    const txtSelectedAccountCategory = document.getElementById('txtSelectedAccountCategory');
    const txtSelectedAccountCategoryOfOne = document.getElementById('txtSelectedAccountCategoryOfOne');
    if (txtSelectedAccountCategory) {
        txtSelectedAccountCategory.value = acctCat || '';
        txtSelectedAccountCategoryOfOne.value = acctCat || '';
    }
}

/**
 * Update selected workgroup textbox (for section 2)
 */
function updateSelectedWgOfTwo(workgroup) {
    const txtSelectedWgOfTwo = document.getElementById('txtSelectedWgOfTwo');
    if (txtSelectedWgOfTwo) {
        txtSelectedWgOfTwo.value = workgroup || '';
    }
}

/**
 * Populate current WG list based on selected workgroup
 */
function populateCurrentWGList() {
    currentWGList = [];
    
    if (!selectedWorkgroup) return;
    
    // Find the selected workgroup's data
    const selectedWgData = workgroupsData.find(wg => wg.code === selectedWorkgroup);
    
    if (selectedWgData && selectedWgData.wg) {
        currentWGList = [...selectedWgData.wg];
    }
}

/**
 * Filter and display account workgroup bids for selected workgroup
 */
function filterAccountWorkgroupBids(workgroupCode, page = 1) {
    const tbody = document.getElementById('accountBidsBody');
    if (!tbody) return;
    
    // Store current filter state
    currentBidFilters = { workgroupCode };
    currentBidPage = page;
    
    // Populate WG list for modal dropdown
    populateCurrentWGList();
    
    tbody.innerHTML = '';
    
    const filtered = accountWorkgroupBidsData.filter(bid => bid.acctCat === workgroupCode);
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / bidRecordsPerPage);
    const startIndex = (currentBidPage - 1) * bidRecordsPerPage;
    const endIndex = startIndex + bidRecordsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    let totalBid = 0;
    
    // Calculate total from all filtered records (not just paginated)
    filtered.forEach(bid => {
        const genBidValue = bid.genBid || 0;
        totalBid += parseFloat(genBidValue);
    });
    
    paginatedData.forEach((bid, index) => {
        const actualIndex = startIndex + index;
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.style.cursor = 'pointer';
        
        const genBidValue = bid.genBid || 0;
        
        row.innerHTML = `
            <td class="govuk-table__cell">${bid.workgroup || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(genBidValue)}</td>
            <td class="govuk-table__cell" style="text-align: center;">
                <button class="edit-btn" data-item='${JSON.stringify(bid)}' data-index="${actualIndex}" onclick="editAccountBid(event)" style="background: none; border: none; cursor: pointer; margin-right: 5px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="deleteAccountBid(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>
        `;
        
        // Add click event to row (excluding action buttons)
        row.addEventListener('click', function(e) {
            // Don't trigger row click when clicking action buttons
            if (e.target.closest('.edit-btn') || e.target.closest('.delete-btn')) {
                return;
            }
            updateSelectedWgOfTwo(bid.workgroup);
            // Highlight selected row
            tbody.querySelectorAll('tr').forEach(r => r.style.backgroundColor = '');
            row.style.backgroundColor = '#f3f2f1';
        });
        
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="3" class="govuk-table__cell" style="text-align: center;">No account bids found</td>';
        tbody.appendChild(row);
    }
    
    // Set first value to txtSelectedWgOfTwo
    if (filtered.length > 0) {
        updateSelectedWgOfTwo(filtered[0].workgroup);
    }
    
    document.getElementById('totalBid').value = `${formatNumber(totalBid)}`;
    
    // Render pagination
    renderPagination('accountBidsPagination', currentBidPage, totalPages, function(newPage) {
        filterAccountWorkgroupBids(workgroupCode, newPage);
    });
}

/**
 * Clear account workgroup bids table
 */
function clearAccountWorkgroupBids() {
    const tbody = document.getElementById('accountBidsBody');
    if (tbody) tbody.innerHTML = '';
    document.getElementById('totalBid').value = '';
    currentWGList = [];
}

/**
 * Format number with commas and 2 decimal places
 */
function formatNumber(num) {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Add new account bid
 */
function addAccountBid() {
    if (!currentBidFilters.workgroupCode) {
        alert('Please select a workgroup first.');
        return;
    }
    
    openAccountBidModal();
}

/**
 * Edit account bid
 */
function editAccountBid(event) {
    event.stopPropagation();
    
    const button = event.currentTarget;
    const itemData = JSON.parse(button.getAttribute('data-item'));
    const index = parseInt(button.getAttribute('data-index'));
    
    // Find the actual record in accountWorkgroupBidsData
    const recordIndex = accountWorkgroupBidsData.findIndex(bid => bid.id === itemData.id);
    if (recordIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    openAccountBidModal(accountWorkgroupBidsData[recordIndex], recordIndex);
}

/**
 * Open Account Bid Modal
 */
function openAccountBidModal(item = null, index = null) {
    editingBidIndex = index;
    
    // Populate WorkGroup dropdown with WG items from selected workgroup
    const wgSelect = document.getElementById('txtmodal-workgroup');
    if (wgSelect && currentWGList.length > 0) {
        wgSelect.innerHTML = '<option value="">-- Select WorkGroup --</option>';
        currentWGList.forEach(wgItem => {
            const option = document.createElement('option');
            option.value = wgItem;
            option.textContent = wgItem;
            wgSelect.appendChild(option);
        });
    }
    
    if (item !== null) {
        // Edit mode
        document.getElementById('txtmodal-workgroup').value = item.workgroup;
        document.getElementById('txtmodal-genbid').value = item.genBid;
        document.getElementById('accountBidModalLabel').textContent = 'Edit Account Bid';
    } else {
        // Add mode
        document.getElementById('formAddAccountBid').reset();
        document.getElementById('accountBidModalLabel').textContent = 'Add Account Bid';
    }
    
    accountBidModal.style.display = 'block';
    setTimeout(() => {
        accountBidModal.classList.add('show');
    }, 10);
}

/**
 * Close Account Bid Modal
 */
function closeAccountBidModal() {
    accountBidModal.classList.remove('show');
    setTimeout(() => {
        accountBidModal.style.display = 'none';
        document.getElementById('formAddAccountBid').reset();
        editingBidIndex = null;
    }, 300);
}

/**
 * Save Account Bid
 */
function saveAccountBid() {
    const workgroup = document.getElementById('txtmodal-workgroup').value.trim();
    const genBid = document.getElementById('txtmodal-genbid').value.trim();
    
    // Validation
    if (!workgroup || !genBid) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isNaN(genBid)) {
        alert('Invalid amount. Please enter a numeric value.');
        return;
    }
    
    if (editingBidIndex !== null) {
        // Edit mode
        accountWorkgroupBidsData[editingBidIndex].workgroup = workgroup;
        accountWorkgroupBidsData[editingBidIndex].genBid = parseFloat(genBid);
    } else {
        // Add mode
        const maxId = accountWorkgroupBidsData.reduce((max, bid) => Math.max(max, bid.id || 0), 0);
        const newAccountBid = {
            id: maxId + 1,
            workgroup: workgroup,
            acctCat: currentBidFilters.workgroupCode,
            genBid: parseFloat(genBid)
        };
        accountWorkgroupBidsData.push(newAccountBid);
    }
    
    // Refresh the table
    filterAccountWorkgroupBids(currentBidFilters.workgroupCode, currentBidPage);
    
    closeAccountBidModal();
    alert(editingBidIndex !== null ? 'Account bid updated successfully!' : 'Account bid added successfully!');
}

/**
 * Delete account bid
 */
function deleteAccountBid(index) {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this account bid?')) {
        return;
    }
    
    // Get the current filtered dataset to find the actual record
    const filtered = accountWorkgroupBidsData.filter(bid => 
        bid.acctCat === currentBidFilters.workgroupCode
    );
    
    if (index >= filtered.length) {
        alert('Invalid record.');
        return;
    }
    
    const recordToDelete = filtered[index];
    const actualIndex = accountWorkgroupBidsData.findIndex(bid => bid.id === recordToDelete.id);
    
    if (actualIndex === -1) {
        alert('Record not found.');
        return;
    }
    
    // Remove from array
    accountWorkgroupBidsData.splice(actualIndex, 1);
    
    // Refresh the table
    filterAccountWorkgroupBids(currentBidFilters.workgroupCode, currentBidPage);
    
    alert('Account bid deleted successfully!');
}

/**
 * Add new purchase
 */
function addPurchase() {
    if (!selectedWorkgroup) {
        alert('Please select a workgroup first.');
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
            workgroup: selectedWorkgroup,
            itemDescription: itemDescription,
            amount: parseFloat(amount)
        };
        purchasesData.push(newPurchase);
    }
    
    // Refresh the table
    filterPurchases(selectedWorkgroup, currentPurchasesPage);
    
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
        purchase.workgroup === selectedWorkgroup
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
    filterPurchases(selectedWorkgroup, currentPurchasesPage);
    
    alert('Purchase deleted successfully!');
}

/**
 * Filter and display purchases for selected workgroup
 */
function filterPurchases(workgroupCode, page = 1) {
    const tbody = document.getElementById('purchasesBody');
    if (!tbody) return;
    
    currentPurchasesPage = page;
    
    tbody.innerHTML = '';
    
    const filtered = purchasesData.filter(purchase => purchase.workgroup === workgroupCode);
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / purchasesRecordsPerPage);
    const startIndex = (currentPurchasesPage - 1) * purchasesRecordsPerPage;
    const endIndex = startIndex + purchasesRecordsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    let totalPurchases = 0;
    
    // Calculate total from all filtered records (not just paginated)
    filtered.forEach(purchase => {
        const amountValue = purchase.amount || 0;
        totalPurchases += parseFloat(amountValue);
    });
    
    paginatedData.forEach((purchase, index) => {
        const actualIndex = startIndex + index;
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        const amountValue = purchase.amount || 0;
        
        row.innerHTML = `
            <td class="govuk-table__cell">${purchase.itemDescription || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(amountValue)}</td>
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
    
    document.getElementById('totalPurchases').value = `${formatNumber(totalPurchases)}`;
    
    // Render pagination
    renderPagination('purchasesPagination', currentPurchasesPage, totalPages, function(newPage) {
        filterPurchases(workgroupCode, newPage);
    });
}

/**
 * Clear purchases table
 */
function clearPurchases() {
    const tbody = document.getElementById('purchasesBody');
    if (tbody) tbody.innerHTML = '';
    document.getElementById('totalPurchases').value = '';
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
 * Setup event listeners
 */
function setupEventListeners() {
    // Add Account Bid button
    const addAccountBidBtn = document.getElementById('addAccountBidBtn');
    if (addAccountBidBtn) {
        addAccountBidBtn.addEventListener('click', addAccountBid);
    }
    
    // Account Bid Modal controls
    const closeAccountBidBtn = document.getElementById('closeAccountBidModalBtn');
    const cancelAccountBidBtn = document.getElementById('cancelAccountBidModalBtn');
    const saveAccountBidBtn = document.getElementById('saveAccountBidBtn');
    
    if (closeAccountBidBtn) {
        closeAccountBidBtn.addEventListener('click', closeAccountBidModal);
    }
    if (cancelAccountBidBtn) {
        cancelAccountBidBtn.addEventListener('click', closeAccountBidModal);
    }
    if (saveAccountBidBtn) {
        saveAccountBidBtn.addEventListener('click', saveAccountBid);
    }
    
    // Add Purchase button
    const addPurchaseBtn = document.getElementById('addPurchaseBtn');
    if (addPurchaseBtn) {
        addPurchaseBtn.addEventListener('click', addPurchase);
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
    
    // Records per page - Account Bids
    const recordsPerPageBid = document.getElementById('recordsPerPageBid');
    if (recordsPerPageBid) {
        recordsPerPageBid.addEventListener('change', function() {
            bidRecordsPerPage = parseInt(this.value);
            if (currentBidFilters.workgroupCode) {
                filterAccountWorkgroupBids(currentBidFilters.workgroupCode, 1);
            }
        });
    }
    
    // Records per page - Purchases
    const recordsPerPagePurchases = document.getElementById('recordsPerPagePurchases');
    if (recordsPerPagePurchases) {
        recordsPerPagePurchases.addEventListener('change', function() {
            purchasesRecordsPerPage = parseInt(this.value);
            if (selectedWorkgroup) {
                filterPurchases(selectedWorkgroup, 1);
            }
        });
    }
    
    const selectByAccountBtn = document.getElementById('selectByAccountBtn');
    if (selectByAccountBtn) {
        selectByAccountBtn.addEventListener('click', function() {
            // Navigate back to resource centre page
            window.location.href = 'budget_bids_resource_centre.html';
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
 * Initialize the application
 */
async function initialize() {
    // Initialize modal references
    accountBidModal = document.getElementById('addAccountBidModal');
    purchaseModal = document.getElementById('addPurchaseModal');
    
    await loadWorkgroupsData();
    await loadAccountCodesData();
    await loadAccountWorkgroupBidsData();
    await loadPurchasesData();
    
    populateWorkgroupFromSession(); // Load selected workgroup from session
    displayAccountCategories(); // Display all account codes on page load
    setupEventListeners();
    setupResizers();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initialize);
