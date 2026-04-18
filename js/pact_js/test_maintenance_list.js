// Test Maintenance List JavaScript
let testData = [];
let currentPage = 1;
let recordsPerPage = 10;
let editingIndex = null;

// Load JSON data
async function loadTestData() {
    try {
        const response = await fetch('../js/pact_js/data/simple-test-list.json');
        if (!response.ok) {
            throw new Error('Failed to load test data');
        }
        testData = await response.json();
        renderTable();
    } catch (error) {
        console.error('Error loading test data:', error);
        document.getElementById('testTableBody').innerHTML = 
            '<tr><td colspan="8" style="text-align: center; color: red;">Error loading test data</td></tr>';
    }
}

// Render table with pagination
function renderTable() {
    const tbody = document.getElementById('testTableBody');
    
    // Calculate pagination
    const totalRecords = testData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = testData.slice(startIndex, endIndex);
    
    // Clear tbody
    tbody.innerHTML = '';
    
    // Render rows
    if (paginatedData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No records found</td></tr>';
    } else {
        paginatedData.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const row = `
                <tr>
                    <td class="govuk-table__cell">${item.ItemCode}</td>
                    <td class="govuk-table__cell">${item.ItemDescription}</td>
                     <td class="govuk-table__cell">${item.ShortDescription}</td>
                       <td class="govuk-table__cell">${item.Owner}</td>
                    <td class="govuk-table__cell">${item.TestManager}</td>
                    <td class="govuk-table__cell">${item.UnitPriceVLAgen}</td>
                  
                   
                    <td class="govuk-table__cell">${item.DefraUnitPrice}</td>
                    <td class="govuk-table__cell">
                        <button class="edit-btn" onclick="editTest(${actualIndex})" style="background: none; border: none; cursor: pointer; margin-right: 8px;">
                            <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                        </button>
                        <button class="delete-btn" onclick="deleteTest(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }
    
    // Render pagination
    renderPagination(currentPage, totalPages);
}

// Render pagination controls
function renderPagination(currentPageNum, totalPages) {
    const paginationContainer = document.getElementById('testPagination');
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
    prevItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPageNum > 1) {
            currentPage = currentPageNum - 1;
            renderTable();
        }
    });
    paginationContainer.appendChild(prevItem);
    
    // Page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPageNum - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentPageNum) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderTable();
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
    nextItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPageNum < totalPages) {
            currentPage = currentPageNum + 1;
            renderTable();
        }
    });
    paginationContainer.appendChild(nextItem);
}

// Edit test function
function editTest(index) {
    openModal(index);
}

// Delete test function
function deleteTest(index) {
    const item = testData[index];
    if (confirm(`Are you sure you want to delete test ${item.ItemCode}?`)) {
        testData.splice(index, 1);
        
        // Adjust current page if needed
        const totalPages = Math.ceil(testData.length / recordsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderTable();
        console.log('Test deleted:', item);
    }
}

// Modal functions
function openModal(index = null) {
    const modal = document.getElementById('addTestModal');
    const modalLabel = document.getElementById('testModalLabel');
    const form = document.getElementById('formAddTest');
    
    editingIndex = index;
    
    if (index !== null) {
        // Edit mode
        const item = testData[index];
        modalLabel.textContent = 'Edit Test';
        document.getElementById('txtmodal-itemcode').value = item.ItemCode;
        document.getElementById('txtmodal-itemcode').disabled = true; // ItemCode should not be editable
        document.getElementById('txtmodal-itemdescription').value = item.ItemDescription;
        document.getElementById('txtmodal-testmanager').value = item.TestManager;
        // Remove $ symbols before setting values
        document.getElementById('txtmodal-unitpricevlagen').value = item.UnitPriceVLAgen.replace(/[£,]/g, '');
        document.getElementById('txtmodal-owner').value = item.Owner;
        document.getElementById('txtmodal-shortdescription').value = item.ShortDescription;
        document.getElementById('txtmodal-defraunitprice').value = item.DefraUnitPrice.replace(/[£,]/g, '');
    } else {
        // Add mode
        document.getElementById('txtmodal-itemcode').disabled = false;
        modalLabel.textContent = 'Add Test';
        form.reset();
    }
    
    // Show modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('addTestModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        editingIndex = null;
    }, 300);
}

function saveTest() {
    const form = document.getElementById('formAddTest');
    
    // Check form validity
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const itemCode = document.getElementById('txtmodal-itemcode').value.trim();
    const itemDescription = document.getElementById('txtmodal-itemdescription').value.trim();
    const testManager = document.getElementById('txtmodal-testmanager').value.trim();
    const unitPriceVLAgen = document.getElementById('txtmodal-unitpricevlagen').value.trim();
    const owner = document.getElementById('txtmodal-owner').value.trim();
    const shortDescription = document.getElementById('txtmodal-shortdescription').value.trim();
    const defraUnitPrice = document.getElementById('txtmodal-defraunitprice').value.trim();

    // Validation
    if (!itemCode || !itemDescription || !unitPriceVLAgen || !owner || !shortDescription || !defraUnitPrice) {
        alert('Please fill in all required fields');
        return;
    }

    // Format prices with $ symbol
    const formattedVLAPrice = `£${parseFloat(unitPriceVLAgen).toFixed(2)}`;
    const formattedDefraPrice = `£${parseFloat(defraUnitPrice).toFixed(2)}`;

    const newEntry = {
        ItemCode: itemCode,
        ItemDescription: itemDescription,
        TestManager: testManager,
        UnitPriceVLAgen: formattedVLAPrice,
        Owner: owner,
        ShortDescription: shortDescription,
        DefraUnitPrice: formattedDefraPrice
    };

    if (editingIndex !== null) {
        // Update existing entry
        testData[editingIndex] = newEntry;
        alert('Test updated successfully!');
    } else {
        // Add new entry
        if (testData.filter(test => test.ItemCode === itemCode).length > 0) {
            alert(`Item Code ${itemCode} already exists. Please use a unique Item Code.`);
            return;
        }
        testData.push(newEntry);
        currentPage = 1; // Go to first page to show new entry
        alert('Test added successfully!');
    }

    closeModal();
    renderTable();
}

// Setup event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load data on page load
    loadTestData();
    
    // Records per page change listener
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function() {
            recordsPerPage = parseInt(this.value);
            currentPage = 1;
            renderTable();
        });
    }
    
    // Add test button listener
    const addTestBtn = document.getElementById('addTestBtn');
    if (addTestBtn) {
        addTestBtn.addEventListener('click', function() {
            openModal();
        });
    }
    
    // Modal event listeners
    const closeModalBtn = document.getElementById('closeTestModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    const cancelModalBtn = document.getElementById('cancelTestModalBtn');
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }
    
    const saveTestBtn = document.getElementById('saveTestBtn');
    if (saveTestBtn) {
        saveTestBtn.addEventListener('click', saveTest);
    }
    
    // Restrict price inputs to numbers only
    const unitPriceVLAgenInput = document.getElementById('txtmodal-unitpricevlagen');
    if (unitPriceVLAgenInput) {
        unitPriceVLAgenInput.addEventListener('input', function(event) {
            // Remove any non-numeric characters except decimal point
            let value = this.value;
            // Allow only numbers and one decimal point
            value = value.replace(/[^0-9.]/g, '');
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            this.value = value;
        });
    }
    
    const defraUnitPriceInput = document.getElementById('txtmodal-defraunitprice');
    if (defraUnitPriceInput) {
        defraUnitPriceInput.addEventListener('input', function(event) {
            // Remove any non-numeric characters except decimal point
            let value = this.value;
            // Allow only numbers and one decimal point
            value = value.replace(/[^0-9.]/g, '');
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            this.value = value;
        });
    }
});

// ==================== Sorting and Resizing for testTable ====================

// Sorting for testTable
const testTableHeaders = document.querySelectorAll("#testTable th[data-column]");

testTableHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnIndex = parseInt(this.dataset.column);
        const currentOrder = this.dataset.order || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";

        // Remove sorting icons from all headers
        testTableHeaders.forEach(h => {
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

        sortTestTable(columnIndex, newOrder);
    });
});

function sortTestTable(columnIndex, order) {
    const columns = ['ItemCode', 'ItemDescription', 'ShortDescription', 'Owner', 'TestManager', 'UnitPriceVLAgen', 'DefraUnitPrice'];
    const column = columns[columnIndex];

    testData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Handle null/undefined values
        if (valA == null) valA = '';
        if (valB == null) valB = '';

        if (typeof valA === "string" && typeof valB === "string") {
            return order === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        // For numeric values (prices)
        const numA = parseFloat(valA) || 0;
        const numB = parseFloat(valB) || 0;
        return order === "asc" ? numA - numB : numB - numA;
    });

    renderTable();
}

// Column resizing for testTable
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
