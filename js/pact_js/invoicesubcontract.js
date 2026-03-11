const modal = document.getElementById('addInvoiceModal');

// Test Data Array
const testData = [
  {
    "Project": "AB0G0508B",
    "Month": "1",
    "Amount": "$57.50",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1001
  },
  {
    "Project": "AB0G0508B",
    "Month": "2",
    "Amount": "$24",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1002
  },
  {
    "Project": "AB0G0508B",
    "Month": "3",
    "Amount": "$33.33",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1003
  },
  {
    "Project": "AB0G0508B",
    "Month": "4",
    "Amount": "$45.22",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1004
  },
  {
    "Project": "AB0G0508B",
    "Month": "5",
    "Amount": "$98.32",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1005
  },
  {
    "Project": "AB0G0508B",
    "Month": "6",
    "Amount": "$90.21",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1006
  },
  {
    "Project": "AB0G0508B",
    "Month": "7",
    "Amount": "$35.99",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1007
  },
  {
    "Project": "AB0G0508B",
    "Month": "8",
    "Amount": "$88.32",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1008
  },
  {
    "Project": "AB0G0508B",
    "Month": "9",
    "Amount": "$67.00",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1009
  },
  {
    "Project": "AB0G0508B",
    "Month": "10",
    "Amount": "$67.21",
    "AcctCode": "10066218-5219700000",
    "Test": "",
    "Counter": 1010
  }
];

let invoicesdata = [
  {
    "Project": "APHAASHORN24",
    "Month": "2",
    "Amount": "$12",
    "CostOfWork": "£95,000",
    "WIP": "£30,000",
    "ProfitLoss": "£20",
    "Detail": "Testing",
    "Counter": 10132
  },
  {
    "Project": "APHAASHORN24",
    "Month": "3",
    "Amount": "$15",
    "CostOfWork": "£3.00",
    "WIP": "£40,000",
    "ProfitLoss": "£2.00",
    "Detail": "Implementation",
    "Counter": 10133
  },
  {
    "Project": "APHAASHORN24",
    "Month": "12",
    "Amount": "$18",
    "CostOfWork": "£140,000",
    "WIP": "£0",
    "ProfitLoss": "£4",
    "Detail": "Completion",
    "Counter": 10134
  },
  {
    "Project": "Digital Transformation",
    "Month": "6",
    "Amount": "$85",
    "CostOfWork": "£70,000",
    "WIP": "£15,000",
    "ProfitLoss": "£8",
    "Detail": "Requirements",
    "Counter": 10135

  },
  {
    "Project": "Digital Transformation",
    "Month": "8",
    "Amount": "$95,000",
    "CostOfWork": "£75,000",
    "WIP": "£20,000",
    "ProfitLoss": "£6",
    "Detail": "Development",
    "Counter": 10136

  },
  {
    "Project": "Environmental Compliance",
    "Month": "9",
    "Amount": "$21.00",
    "CostOfWork": "£50,000",
    "WIP": "£10.00",
    "ProfitLoss": "£2.00",
    "Detail": "Ongoing",
    "Counter": 10137

  },
  {
    "Project": "APHAASHORN24",
    "Month": "12",
    "Amount": "$18",
    "CostOfWork": "£140,000",
    "WIP": "£0",
    "ProfitLoss": "£4",
    "Detail": "Completion",
    "Counter": 10138
  },
  {
    "Project": "Digital Transformation",
    "Month": "6",
    "Amount": "$85",
    "CostOfWork": "£70,000",
    "WIP": "£15,000",
    "ProfitLoss": "£8",
    "Detail": "Requirements",
    "Counter": 10139

  },
  {
    "Project": "Digital Transformation",
    "Month": "8",
    "Amount": "$95,000",
    "CostOfWork": "£75,000",
    "WIP": "£20,000",
    "ProfitLoss": "£6",
    "Detail": "Development",
    "Counter": 10140

  },
  {
    "Project": "Environmental Compliance",
    "Month": "9",
    "Amount": "$21.00",
    "CostOfWork": "£50,000",
    "WIP": "£10.00",
    "ProfitLoss": "£2.00",
    "Detail": "Ongoing",
    "Counter": 10141

  },
  {
    "Project": "APHAASHORN24",
    "Month": "12",
    "Amount": "$18",
    "CostOfWork": "£140,000",
    "WIP": "£0",
    "ProfitLoss": "£4",
    "Detail": "Completion",
    "Counter": 10142
  },
  {
    "Project": "Digital Transformation",
    "Month": "6",
    "Amount": "$85",
    "CostOfWork": "£70,000",
    "WIP": "£15,000",
    "ProfitLoss": "£8",
    "Detail": "Requirements",
    "Counter": 10143

  },
  {
    "Project": "Digital Transformation",
    "Month": "8",
    "Amount": "$95,000",
    "CostOfWork": "£75,000",
    "WIP": "£20,000",
    "ProfitLoss": "£6",
    "Detail": "Development",
    "Counter": 10144

  },
  {
    "Project": "Environmental Compliance",
    "Month": "9",
    "Amount": "$21.00",
    "CostOfWork": "£50,000",
    "WIP": "£10.00",
    "ProfitLoss": "£2.00",
    "Detail": "Ongoing",
    "Counter": 10145

  },
  {
    "Project": "APHAASHORN24",
    "Month": "12",
    "Amount": "$18",
    "CostOfWork": "£140,000",
    "WIP": "£0",
    "ProfitLoss": "£4",
    "Detail": "Completion",
    "Counter": 10146
  },
  {
    "Project": "Digital Transformation",
    "Month": "6",
    "Amount": "$85",
    "CostOfWork": "£70,000",
    "WIP": "£15,000",
    "ProfitLoss": "£8",
    "Detail": "Requirements",
    "Counter": 10147

  },
  {
    "Project": "Digital Transformation",
    "Month": "8",
    "Amount": "$95,000",
    "CostOfWork": "£75,000",
    "WIP": "£20,000",
    "ProfitLoss": "£6",
    "Detail": "Development",
    "Counter": 10148

  },
  {
    "Project": "Environmental Compliance",
    "Month": "9",
    "Amount": "$21.00",
    "CostOfWork": "£50,000",
    "WIP": "£10.00",
    "ProfitLoss": "£2.00",
    "Detail": "Ongoing",
    "Counter": 10149

  }
];

// Initialize pagination variables
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...invoicesdata];
let isAddMode = false;
let editingCounter = null;
let selectedInvoices = [];

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
    
    let total = 0;
    invoicesdata.forEach(item => {
        total += parseAmount(item.Amount);
    });
    
    txtTotalAmount.value = '$' + total.toFixed(2);
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
            <!--<td class="govuk-table__cell">
                <button onclick="handleEdit(${item.Counter})"><img src="../images/pen-to-square-regular-full.svg"
                    alt="Edit icon" class="editicon" width="20"></button>
                <button onclick="handleDelete(event, ${item.Counter})"><img src="../images/trash-can-regular-full.svg" 
                    alt="Delete icon" width="20"></button>
            </td>-->
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
    prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage - 1})">
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
        li.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `govuk-pagination__item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage + 1})">
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
    filteredData = invoicesdata.filter(item => 
        item.Project.toLowerCase().includes(searchTerm) ||
        item.Month.toString().toLowerCase().includes(searchTerm) ||
        item.Detail.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
    renderPagination();
}

// Handle edit
function handleEdit(counter) {
    const item = invoicesdata.find(inv => inv.Counter === counter);
    if (item) {
        isAddMode = false;
        editingCounter = counter;
        
        // Populate modal fields
        document.getElementById('modal-project').value = item.Project;
        document.getElementById('modal-month').value = item.Month;
        document.getElementById('modal-amount').value = item.Amount;
        document.getElementById('modal-costofwork').value = item.CostOfWork;
        document.getElementById('modal-wip').value = item.WIP;
        document.getElementById('modal-profitloss').value = item.ProfitLoss;
        document.getElementById('modal-detail').value = item.Detail;
        
        // Open modal
        openInvoiceModal();
    }
}

// Open modal for adding new invoice
function openAddInvoiceModal() {
    isAddMode = true;
    editingCounter = null;
    
    // Clear modal fields
    document.getElementById('modal-project').value = '';
    document.getElementById('modal-month').value = '';
    document.getElementById('modal-amount').value = '';
    document.getElementById('modal-costofwork').value = '';
    document.getElementById('modal-wip').value = '';
    document.getElementById('modal-profitloss').value = '';
    document.getElementById('modal-detail').value = '';
    
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
    isAddMode = false;
    editingCounter = null;
}

// Handle save invoice
function handleSaveInvoice() {
    const project = document.getElementById('modal-project').value;
    const month = document.getElementById('modal-month').value;
    const amount = document.getElementById('modal-amount').value;
    const costOfWork = document.getElementById('modal-costofwork').value;
    const wip = document.getElementById('modal-wip').value;
    const profitLoss = document.getElementById('modal-profitloss').value;
    const detail = document.getElementById('modal-detail').value;
    
    // Validate required fields
    if (!project || !month || !amount) {
        alert('Please fill in all required fields (Project, Month, Amount)');
        return;
    }
    
    let newCounter = null;
    if (isAddMode) {
        // Generate new Counter ID
        newCounter = Math.max(...invoicesdata.map(item => item.Counter)) + 1;
        
        // Add new invoice to the beginning of array
        invoicesdata.unshift({
            Project: project,
            Month: month,
            Amount: "$" + amount,
            CostOfWork: "£" + costOfWork,
            WIP: "£" + wip,
            ProfitLoss: "£" + profitLoss,
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
                Amount: amount,
                CostOfWork: costOfWork,
                WIP: wip,
                ProfitLoss: profitLoss,
                Detail: detail
            };
        }
    }
    
    // Update filtered data
    const searchInput = document.getElementById('invoiceSearch');
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filteredData = invoicesdata.filter(item => 
            item.Project.toLowerCase().includes(searchTerm) ||
            item.Month.toString().toLowerCase().includes(searchTerm) ||
            item.Detail.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredData = [...invoicesdata];
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
    // Initialize table
    renderTable();
    renderPagination();
    updateTotalAmount();
    
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
    
    // Modal event listeners
    // const addInvoiceBtn = document.getElementById('addInvoiceBtn');
    // if (addInvoiceBtn) {
    //     addInvoiceBtn.addEventListener('click', openAddInvoiceModal);
    // }
    
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
    const modal = document.getElementById('addInvoiceModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeInvoiceModal();
            }
        });
    }
    
    // Initialize test data table
    renderTestDataTable();
    renderTestDataPagination();
    updateTestDataTotalAmount();
    
    // Setup test data amount box alignment
    const testDataTable = document.getElementById("testDataTable");
    const thTestDataAmount = document.querySelector("#testDataTable th.amount");
    
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
    
    // Test data add button (placeholder)
    // const addTestDataBtn = document.getElementById('addTestDataBtn');
    // if (addTestDataBtn) {
    //     addTestDataBtn.addEventListener('click', function() {
    //         alert('Add Test Data functionality - to be implemented');
    //     });
    // }
});

// ==================== TEST DATA TABLE FUNCTIONALITY ====================

// Test data pagination variables
let testDataCurrentPage = 1;
let testDataRecordsPerPage = 10;
let filteredTestData = [...testData];

// Initialize test data total amount
const txtTestDataTotalAmount = document.getElementById('txtTestDataTotalAmount');
if (txtTestDataTotalAmount) {
    txtTestDataTotalAmount.value = '0';
}

// Function to calculate and update test data total amount
function updateTestDataTotalAmount() {
    if (!txtTestDataTotalAmount) return;
    
    let total = 0;
    testData.forEach(item => {
        total += parseAmount(item.Amount);
    });
    
    txtTestDataTotalAmount.value = '$' + total.toFixed(2);
}

// Render test data table function
function renderTestDataTable(data = null) {
    if (!data) {
        data = filteredTestData;
    }
    const tbody = document.getElementById('testDataTableBody');
    if (!tbody) return;
    
    const startIndex = (testDataCurrentPage - 1) * testDataRecordsPerPage;
    const endIndex = startIndex + testDataRecordsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="norecords" style="text-align: center;">No records found</td></tr>';
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
    filteredTestData = testData.filter(item => 
        item.Project.toLowerCase().includes(searchTerm) ||
        item.Month.toString().toLowerCase().includes(searchTerm) ||
        item.AcctCode.toLowerCase().includes(searchTerm) ||
        item.Test.toLowerCase().includes(searchTerm) ||
        item.Counter.toString().includes(searchTerm)
    );
    testDataCurrentPage = 1;
    renderTestDataTable();
    renderTestDataPagination();
}

// Sorting functionality for test data table
const testDataHeaders = document.querySelectorAll("#testDataTable th[data-column]");

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
function alignTestDataAmountBox() {
    const testDataTable = document.getElementById("testDataTable");
    const thAmount = document.querySelector("#testDataTable th.amount");
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