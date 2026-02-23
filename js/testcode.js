// Test data with pipe-separated values
const testOptions = [
    'PT0005|Avian influenza serology',
    'PT0009|Big liver syndrome disease',
    'PT0011|BVD milk ELISA',
    'PT0016|Brucella abortus ELISA',
    'PT0017|B abortus milk ELISA - Defra',
    'PT0018|Brucella abortus milk ELISA',
    'PT0019|Brucella abortus MRT',
    'PT0020|Brucella abortus RBT',
    'PT0021|Brucella abortus (Eire)',
    'PT0022|Brucella canis RSA/SAT',
    'PT0023|Brucella culture ID',
    'PT0024|Brucella ovis CFT',
    'PT0025|Brucella abortus slides',
    'PT0026|Staphylococci incl MRSA',
    'PT0027|BSE (HRL) Immunoblot test',
    'PT0028|BSE (CRL) Immunoblot test',
    'PT0029|BSE (HRL) rapid test tissue',
    'PT0030|BSE (HRL) rapid test tissue',
    'PT0031|IBR/RSV/PI3 FAT'
];

//const workGroups = ['CSCS', 'CIT', 'Bees', 'MRSA', 'BSE'];

let testData = [
    { id: 1, testCode: 'PT0005', description: 'Avian influenza serology', workGroup: 'CSCS' },
    { id: 2, testCode: 'PT0009', description: 'Big liver syndrome disease', workGroup: 'CIT' },
    { id: 3, testCode: 'PT0011', description: 'BVD milk ELISA', workGroup: 'Bees' },
    { id: 4, testCode: 'PT0016', description: 'Brucella abortus ELISA', workGroup: 'CSCS' },
    { id: 5, testCode: 'PT0017', description: 'B abortus milk ELISA - Defra', workGroup: 'CIT' },
    { id: 6, testCode: 'PT0018', description: 'Brucella abortus milk ELISA', workGroup: 'Bees' },
    { id: 7, testCode: 'PT0019', description: 'Brucella abortus MRT', workGroup: 'MRSA' },
    { id: 8, testCode: 'PT0020', description: 'Brucella abortus RBT', workGroup: 'BSE' },
    { id: 9, testCode: 'PT0021', description: 'Brucella abortus (Eire)', workGroup: 'CSCS' },
    { id: 10, testCode: 'PT0022', description: 'Brucella canis RSA/SAT', workGroup: 'CIT' },
    { id: 11, testCode: 'PT0023', description: 'Brucella culture ID', workGroup: 'Bees' },
    { id: 12, testCode: 'PT0024', description: 'Brucella ovis CFT', workGroup: 'MRSA' },
    { id: 13, testCode: 'PT0025', description: 'Brucella abortus slides', workGroup: 'BSE' },
    { id: 14, testCode: 'PT0026', description: 'Staphylococci incl MRSA', workGroup: 'CSCS' },
    { id: 15, testCode: 'PT0027', description: 'BSE (HRL) Immunoblot test', workGroup: 'CIT' }
];


let testworkgroup = [[
    {
         testCode: 'PT0019',workgroup:'CSCS',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0019',workgroup:'CIT',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0019',workgroup:'Bees',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0019',workgroup:'SIU',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0019',workgroup:'TSE',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
    }
],[
    {
         testCode: 'PT0005',workgroup:'SUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'CBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'VSUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'Bees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'KSUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'DBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'QSUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'5Bees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'5SUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'GBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'HSUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'Bees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'99SUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'ABees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'105SUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'TBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'RSUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'QBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'ESUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'XBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
     {
         testCode: 'PT0005',workgroup:'ESUS',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0005',workgroup:'YBees',active:true,project:"APHAEM000000",timecode:'PT0005',portfolio:"APHAEM000000"
    }
     
],[
    {
         testCode: 'PT0024',workgroup:'MRSA',active:true,project:"APHAEM000000",timecode:'PT0024',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0024',workgroup:'CIT',active:true,project:"APHAEM000000",timecode:'PT0024',portfolio:"APHAEM000000"
    }
    
],
[
    {
         testCode: 'PT0016',workgroup:'CSCS',active:true,project:"APHAEM000000",timecode:'PT0016',portfolio:"APHAEM000000"
    },
    {
         testCode: 'PT0016',workgroup:'CIT',active:true,project:"APHAEM000000",timecode:'PT0016',portfolio:"APHAEM000000"
    }
    
]]

let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...testData];
let editingRow = null;
let isAddMode = false;

const modal = document.getElementById("testModal");

// Populate test code select options
// function populateTestCodeSelect() {
//     const select = document.getElementById('dpselectportfolio');
//     testOptions.forEach(option => {
//         const [code, description] = option.split('|');
//         const optionElement = document.createElement('option');
//         optionElement.value = code;
//         optionElement.textContent = `${code} | ${description}`;
//         optionElement.dataset.description = description;
//         select.appendChild(optionElement);
//     });
// }


function populateTestCodeSelect() {
    const select = document.getElementById('testCodeSelect');
    testOptions.forEach(option => {
        const [code, description] = option.split('|');
        const optionElement = document.createElement('option');
        optionElement.value = code;
        optionElement.textContent = `${code} | ${description}`;
        optionElement.dataset.description = description;
        select.appendChild(optionElement);
    });
}



// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Records per page
    document.getElementById('recordsPerPage').addEventListener('change', handleRecordsPerPageChange);
    
    // Add button
    document.getElementById('addBtn').addEventListener('click', handleAdd);
    
    // Save button in modal
    document.getElementById('saveBtn').addEventListener('click', handleSave);
    
    // Test code select change
    document.getElementById('testCodeSelect').addEventListener('change', handleTestCodeChange);
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredData = testData.filter(item => 
        item.testCode.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.workGroup.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
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

// Handle add button
function handleAdd() {
    isAddMode = true;
    document.getElementById('modalTitle').textContent = 'Add Test';
    document.getElementById('testForm').reset();
    document.getElementById('descriptionInput').value = '';
    openModal();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}

// Handle test code change in modal
function handleTestCodeChange(e) {
    const selectedOption = e.target.selectedOptions[0];
    if (selectedOption && selectedOption.dataset.description) {
        document.getElementById('descriptionInput').value = selectedOption.dataset.description;
    } else {
        document.getElementById('descriptionInput').value = '';
    }
}

// Handle save
function handleSave() {
    const testCode = document.getElementById('testCodeSelect').value;
    const description = document.getElementById('descriptionInput').value;
    const workGroup = document.getElementById('workGroupSelect').value;
    
    if (!testCode || !workGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isAddMode) {
        const newId = Math.max(...testData.map(item => item.id)) + 1;
        testData.push({
            id: newId,
            testCode: testCode,
            description: description,
            workGroup: workGroup
        });
    } else {
        const index = testData.findIndex(item => item.id === editingRow);
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                testCode: testCode,
                description: description,
                workGroup: workGroup
            };
        }
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.testCode.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.workGroup.toLowerCase().includes(searchTerm)
    );
    
    renderTable();
    renderPagination();
    //document.getElementById('testModal').style.display = 'none';
    //  document.getElementById("testModal").classList.toggle("show");
    closeModal();
    // const modal = bootstrap.Modal.getInstance(document.getElementById('testModal'));
    // modal.hide();
    
    isAddMode = false;
    editingRow = null;
}


function closeModal(){
   //  document.getElementById('testModal').style.display = 'none';
       document.getElementById("testModal").classList.toggle("show");
}

// Handle edit
function handleEdit(id) {
    const item = testData.find(item => item.id === id);
    if (!item) return;
    
    isAddMode = false;
    editingRow = id;
    
    document.getElementById('modalTitle').textContent = 'Edit Test';
    document.getElementById('testCodeSelect').value = item.testCode;
    document.getElementById('descriptionInput').value = item.description;
    document.getElementById('workGroupSelect').value = item.workGroup;
     document.getElementById('txtportfoliotest').value = item.testCode;
     openModal();
  //  document.getElementById('testModal').style.display = 'block';
     // document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();

      document.getElementById('testCodeSelect').addEventListener('change', function() {
        // Handle program selection change
        console.log('Program selected:', this.value);
        const selectedValue = this.value;
        document.getElementById('txtportfoliotest').value = selectedValue?.split("-")[0]; 
    }); 

}



function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

// Handle delete
function handleDelete(id) {
    if (confirm('Are you sure you want to delete this test?')) {
        testData = testData.filter(item => item.id !== id);
        
        // Update filtered data
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        filteredData = testData.filter(item => 
            item.testCode.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.workGroup.toLowerCase().includes(searchTerm)
        );
        
        renderTable();
        renderPagination();
    }
}

// Render table
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="editable-cell" data-field="testCode" data-id="${item.id}">${item.testCode}</td>
            <td class="editable-cell" data-field="description" data-id="${item.id}">${item.description}</td>
            <td class="editable-cell" data-field="workGroup" data-id="${item.id}">${item.workGroup}</td>
            <td>
                <button onclick="handleEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg" width="20"></button>
                <button onclick="handleDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" width="20"></button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add inline editing functionality
    addInlineEditingListeners();
}

// Add inline editing listeners
function addInlineEditingListeners() {
    const editableCells = document.querySelectorAll('.editable-cell');
    editableCells.forEach(cell => {
        cell.addEventListener('dblclick', handleInlineEdit);
    });
}

// Handle inline edit
function handleInlineEdit(e) {
    const cell = e.target;
    const field = cell.dataset.field;
    const id = parseInt(cell.dataset.id);
    const currentValue = cell.textContent;
    
    if (field === 'testCode') {
        // Create select for test code
        const select = document.createElement('select');
        select.className = 'form-select form-select-sm inline-edit';
        testOptions.forEach(option => {
            const [code, description] = option.split('|');
            const optionElement = document.createElement('option');
            optionElement.value = code;
            optionElement.textContent = `${code} | ${description}`;
            if (code === currentValue) optionElement.selected = true;
            select.appendChild(optionElement);
        });
        
        cell.innerHTML = '';
        cell.appendChild(select);
        select.focus();
        
        select.addEventListener('blur', () => saveInlineEdit(cell, id, field, select.value));
        select.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveInlineEdit(cell, id, field, select.value);
            }
        });
    } else if (field === 'workGroup') {
        // Create select for work group
        const select = document.createElement('select');
        select.className = 'form-select form-select-sm inline-edit';
        workGroups.forEach(group => {
            const optionElement = document.createElement('option');
            optionElement.value = group;
            optionElement.textContent = group;
            if (group === currentValue) optionElement.selected = true;
            select.appendChild(optionElement);
        });
        
        cell.innerHTML = '';
        cell.appendChild(select);
        select.focus();
        
        select.addEventListener('blur', () => saveInlineEdit(cell, id, field, select.value));
        select.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveInlineEdit(cell, id, field, select.value);
            }
        });
    } else {
        // Create input for description (readonly in this case)
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control form-control-sm inline-edit';
        input.value = currentValue;
        input.readOnly = true;
        
        cell.innerHTML = '';
        cell.appendChild(input);
        input.focus();
        
        input.addEventListener('blur', () => {
            cell.textContent = currentValue;
        });
    }
}

// Save inline edit
function saveInlineEdit(cell, id, field, newValue) {
    const item = testData.find(item => item.id === id);
    if (item) {
        if (field === 'testCode') {
            item.testCode = newValue;
            // Update description based on test code
            const testOption = testOptions.find(option => option.startsWith(newValue + '|'));
            if (testOption) {
                const [, description] = testOption.split('|');
                item.description = description;
            }
        } else if (field === 'workGroup') {
            item.workGroup = newValue;
        }
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.testCode.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.workGroup.toLowerCase().includes(searchTerm)
    );
    
    renderTable();
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    // First button
    const firstLi = document.createElement('li');
    firstLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    firstLi.innerHTML = '<a class="page-link" href="#" onclick="goToPage(1)">First</a>';
    pagination.appendChild(firstLi);
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Next</a>`;
    pagination.appendChild(nextLi);
    
    // Last button
    const lastLi = document.createElement('li');
    lastLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    lastLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${totalPages})">Last</a>`;
    pagination.appendChild(lastLi);
}

// Go to page
function goToPage(page) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        renderPagination();
    }
}


// Go to page
function goToPageWg(page) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        renderPagination();
    }
}

//click and show data on second grid


let currentEditingCell = null;

// document.addEventListener('DOMContentLoaded', function() {
//     initializeTable();
// });

// function initializeTable() {
//     const cells = document.querySelectorAll('.editable-cell');
    
//     cells.forEach(cell => {
//         cell.addEventListener('click', function() {
//             if (currentEditingCell && currentEditingCell !== this) {
//                 saveCell(currentEditingCell);
//             }
//             editCell(this);
//         });
//     });
    
//     // Click outside to save
//     document.addEventListener('click', function(e) {
//         if (!e.target.closest('.editable-cell') && currentEditingCell) {
//             saveCell(currentEditingCell);
//         }
//     });
// }

// function editCell(cell) {
//     console.log(cell,"LN440");
   
//      for(let i = 0; i<testworkgroup.length; i++){
//         for(let j = 0; j< testworkgroup[i].length; j++){
//              if(testworkgroup[i][j].testCode == cell.innerText){
//             renderTableWg(testworkgroup[i]);
//         }
//         }
       
//     }
//     //testworkgroup.filter((el)=>el)
//     // if (currentEditingCell === cell) return;
    
//     // currentEditingCell = cell;
//     // const displayValue = cell.querySelector('.display-value');
//     // const editControl = cell.querySelector('.edit-control');
    
//     // displayValue.style.display = 'none';
//     // editControl.style.display = 'block';
    
//     // if (editControl.tagName === 'SELECT') {
//     //     editControl.value = displayValue.textContent.trim();
//     //     editControl.focus();
        
//     //     // Handle test code selection change
//     //     if (cell.dataset.column === 'testcode') {
//     //         editControl.addEventListener('change', function() {
//     //             updateDescription(cell, this.value);
//     //         });
//     //     }
//     // } else if (editControl.tagName === 'INPUT') {
//     //     editControl.value = displayValue.textContent.trim();
//     //     editControl.focus();
//     //     editControl.select();
//     // }
    
//     // // Handle Enter key
//     // editControl.addEventListener('keydown', function(e) {
//     //     if (e.key === 'Enter') {
//     //         saveCell(cell);
//     //     } else if (e.key === 'Escape') {
//     //         cancelEdit(cell);
//     //     }
//     // });
// }

// function renderTableWg(data) {
//         this.tableId = "workGroupsTable";
//         const tbody = document.getElementById(this.tableId.replace('Table', 'TableBody'));
//        // const startIndex = (this.currentPage - 1) * this.recordsPerPage;
//        // const endIndex = startIndex + this.recordsPerPage;
//        // const pageData = this.filteredData.slice(startIndex, endIndex);
//         // testCode: 'PT0019',workgroup:'CSCS',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
//         tbody.innerHTML = '';
        
//         if (this.tableId === 'workGroupsTable') {
//             data.forEach(item => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td><input type="checkbox" class="form-check-input"></td>
//                     <td>${item.workgroup}</td>
//                     <td><input type="checkbox" class="form-check-input" ${item.active ? 'checked' : ''}></td>
//                     <td>${item.timecode}</td>
//                     <td>${item.project}</td>
//                     <td>${item.timecode}</td>
//                     <td>${item.portfolio}</td>
//                 `;
//                 tbody.appendChild(row);
//             });
//         }
//     }

function updateDescription(testCodeCell, newTestCode) {
    const row = testCodeCell.closest('tr');
    const descriptionCell = row.querySelector('[data-column="description"]');
    const descriptionDisplay = descriptionCell.querySelector('.display-value');
    const descriptionInput = descriptionCell.querySelector('.edit-control');
    
    const newDescription = testDescriptions[newTestCode] || '';
    descriptionDisplay.textContent = newDescription;
    descriptionInput.value = newDescription;
}

function saveCell(cell) {
    console.log(cell,"CELL");
   
    // const displayValue = cell.querySelector('.display-value');
    // const editControl = cell.querySelector('.edit-control');
    
    // displayValue.textContent = editControl.value;
    // displayValue.style.display = 'block';
    // editControl.style.display = 'none';
    
    // currentEditingCell = null;
}

function cancelEdit(cell) {
    const displayValue = cell.querySelector('.display-value');
    const editControl = cell.querySelector('.edit-control');
    
    displayValue.style.display = 'block';
    editControl.style.display = 'none';
    
    currentEditingCell = null;
}






// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populateTestCodeSelect();
    setupEventListeners();
    renderTable();
    renderPagination();
   // renderPaginationWg();
});