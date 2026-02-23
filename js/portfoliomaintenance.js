// Sample data for Constituent Tests
const constituentTestsData = [
    { id: 1, testCode: 'CT001', itemDescription: 'Protein Analysis', workGrp: 'LAB1' },
    { id: 2, testCode: 'CT002', itemDescription: 'Fat Content Test', workGrp: 'LAB2' },
    { id: 3, testCode: 'CT003', itemDescription: 'Moisture Analysis', workGrp: 'LAB1' },
    { id: 4, testCode: 'CT004', itemDescription: 'Ash Content', workGrp: 'LAB3' },
    { id: 5, testCode: 'CT005', itemDescription: 'Fiber Analysis', workGrp: 'LAB2' },
    { id: 6, testCode: 'CT006', itemDescription: 'Carbohydrate Test', workGrp: 'LAB1' },
    { id: 7, testCode: 'CT007', itemDescription: 'Vitamin A Test', workGrp: 'LAB4' },
    { id: 8, testCode: 'CT008', itemDescription: 'Vitamin D Test', workGrp: 'LAB4' },
    { id: 9, testCode: 'CT009', itemDescription: 'Calcium Analysis', workGrp: 'LAB3' },
    { id: 10, testCode: 'CT010', itemDescription: 'Iron Content', workGrp: 'LAB3' },
    { id: 11, testCode: 'CT011', itemDescription: 'Sodium Test', workGrp: 'LAB2' },
    { id: 12, testCode: 'CT012', itemDescription: 'Potassium Test', workGrp: 'LAB2' },
    { id: 13, testCode: 'CT013', itemDescription: 'Phosphorus Analysis', workGrp: 'LAB3' },
    { id: 14, testCode: 'CT014', itemDescription: 'Magnesium Test', workGrp: 'LAB1' },
    { id: 15, testCode: 'CT015', itemDescription: 'Zinc Analysis', workGrp: 'LAB4' },
    { id: 16, testCode: 'CT016', itemDescription: 'Copper Test', workGrp: 'LAB4' },
    { id: 17, testCode: 'CT017', itemDescription: 'Manganese Analysis', workGrp: 'LAB3' },
    { id: 18, testCode: 'CT018', itemDescription: 'Selenium Test', workGrp: 'LAB2' },
    { id: 19, testCode: 'CT019', itemDescription: 'Iodine Analysis', workGrp: 'LAB1' },
    { id: 20, testCode: 'CT020', itemDescription: 'Cholesterol Test', workGrp: 'LAB4' },
    { id: 21, testCode: 'CT021', itemDescription: 'Lecithin Analysis', workGrp: 'LAB2' },
    { id: 22, testCode: 'CT022', itemDescription: 'Omega-3 Test', workGrp: 'LAB1' },
    { id: 23, testCode: 'CT023', itemDescription: 'Omega-6 Analysis', workGrp: 'LAB3' },
    { id: 24, testCode: 'CT024', itemDescription: 'Antioxidant Test', workGrp: 'LAB4' },
    { id: 25, testCode: 'CT025', itemDescription: 'pH Analysis', workGrp: 'LAB1' }
];

// Sample data for WorkGroups
const workGroupsData = [
    { id: 1, workGrp: 'LAB1', active: true, timeCode: 'TC001', project: 'APHAEM000000', testCode: 'CT001', portfolio: 'APHAEM000000' },
    { id: 2, workGrp: 'LAB2', active: true, timeCode: 'TC002', project: 'APHAEM000000', testCode: 'CT002', portfolio: 'APHAEM000000' },
    { id: 3, workGrp: 'LAB3', active: false, timeCode: 'TC003', project: 'APHAEM000000', testCode: 'CT003', portfolio: 'APHAEM000000' },
    { id: 4, workGrp: 'LAB4', active: true, timeCode: 'TC004', project: 'APHAEM000000', testCode: 'CT004', portfolio: 'APHAEM000000' },
    { id: 5, workGrp: 'ADMIN1', active: true, timeCode: 'TC005', project: 'APHAEM000000', testCode: 'CT005', portfolio: 'APHAEM000000' },
    { id: 6, workGrp: 'ADMIN2', active: true, timeCode: 'TC006', project: 'APHAEM000000', testCode: 'CT006', portfolio: 'APHAEM000000' },
    { id: 7, workGrp: 'QC1', active: false, timeCode: 'TC007', project: 'APHAEM000000', testCode: 'CT007', portfolio: 'APHAEM000000' },
    { id: 8, workGrp: 'QC2', active: true, timeCode: 'TC008', project: 'APHAEM000000', testCode: 'CT008', portfolio: 'APHAEM000000' },
    { id: 9, workGrp: 'RND1', active: true, timeCode: 'TC009', project: 'APHAEM000000', testCode: 'CT009', portfolio: 'APHAEM000000' },
    { id: 10, workGrp: 'RND2', active: false, timeCode: 'TC010', project: 'APHAEM000000', testCode: 'CT010', portfolio: 'APHAEM000000' },
    { id: 11, workGrp: 'MAINT1', active: true, timeCode: 'TC011', project: 'APHAEM000000', testCode: 'CT011', portfolio: 'APHAEM000000' },
    { id: 12, workGrp: 'MAINT2', active: true, timeCode: 'TC012', project: 'APHAEM000000', testCode: 'CT012', portfolio: 'APHAEM000000' },
    { id: 13, workGrp: 'PACK1', active: false, timeCode: 'TC013', project: 'APHAEM000000', testCode: 'CT013', portfolio: 'APHAEM000000' },
    { id: 14, workGrp: 'PACK2', active: true, timeCode: 'TC014', project: 'APHAEM000000', testCode: 'CT014', portfolio: 'APHAEM000000' },
    { id: 15, workGrp: 'SHIP1', active: true, timeCode: 'TC015', project: 'APHAEM000000', testCode: 'CT015', portfolio: 'APHAEM000000' },
    { id: 16, workGrp: 'SHIP2', active: false, timeCode: 'TC016', project: 'APHAEM000000', testCode: 'CT016', portfolio: 'APHAEM000000' },
    { id: 17, workGrp: 'STORE1', active: true, timeCode: 'TC017', project: 'APHAEM000000', testCode: 'CT017', portfolio: 'APHAEM000000' },
    { id: 18, workGrp: 'STORE2', active: true, timeCode: 'TC018', project: 'APHAEM000000', testCode: 'CT018', portfolio: 'APHAEM000000' },
    { id: 19, workGrp: 'CLEAN1', active: false, timeCode: 'TC019', project: 'APHAEM000000', testCode: 'CT019', portfolio: 'APHAEM000000' },
    { id: 20, workGrp: 'CLEAN2', active: true, timeCode: 'TC020', project: 'APHAEM000000', testCode: 'CT020', portfolio: 'APHAEM000000' },
    { id: 21, workGrp: 'SAFETY1', active: true, timeCode: 'TC021', project: 'APHAEM000000', testCode: 'CT021', portfolio: 'APHAEM000000' },
    { id: 22, workGrp: 'SAFETY2', active: false, timeCode: 'TC022', project: 'APHAEM000000', testCode: 'CT022', portfolio: 'APHAEM000000' },
    { id: 23, workGrp: 'INSP1', active: true, timeCode: 'TC023', project: 'APHAEM000000', testCode: 'CT023', portfolio: 'APHAEM000000' },
    { id: 24, workGrp: 'INSP2', active: true, timeCode: 'TC024', project: 'APHAEM000000', testCode: 'CT024', portfolio: 'APHAEM000000' },
    { id: 25, workGrp: 'AUDIT1', active: false, timeCode: 'TC025', project: 'APHAEM000000', testCode: 'CT025', portfolio: 'APHAEM000000' }
];

let clickedData = [];

// Table management class
class TableManager {
    constructor(tableId, data, searchId, recordsPerPageId, paginationId) {
        this.tableId = tableId;
        this.data = data;
        this.filteredData = [...data];
        this.searchId = searchId;
        this.recordsPerPageId = recordsPerPageId;
        this.paginationId = paginationId;
        this.currentPage = 1;
        this.recordsPerPage = 10;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.render();
    }
    
    setupEventListeners() {
        // Search functionality
        document.getElementById(this.searchId).addEventListener('input', (e) => {
            this.search(e.target.value);
        });
        
        // Records per page change
        // document.getElementById(this.recordsPerPageId).addEventListener('change', (e) => {
        //     this.recordsPerPage = parseInt(e.target.value);
        //     this.currentPage = 1;
        //     this.render();
        // });
    }
    
    search(query) {
        if (!query.trim()) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item => 
                Object.values(item).some(value => 
                    value.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        this.currentPage = 1;
        //this.render();
    }
    
    render() {
     //  this.renderTable();
        this.renderPagination();
    }

    
    
    renderTable() {
        const tbody = document.getElementById(this.tableId.replace('Table', 'TableBody'));
        const startIndex = (this.currentPage - 1) * this.recordsPerPage;
        const endIndex = startIndex + this.recordsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        tbody.innerHTML = '';
        
        if (this.tableId === 'constituentTable') {
            pageData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" class="form-check-input"></td>
                    <td>${item.testCode}</td>
                    <td>${item.itemDescription}</td>
                    <td>${item.workGrp}</td>
                `;
                tbody.appendChild(row);
            });
        } else if (this.tableId === 'workGroupsTable') {
            pageData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    
                    <td>${item.workGrp}</td>
                    <td><input type="checkbox" class="form-check-input" ${item.active ? 'checked' : ''}></td>
                    <td>${item.timeCode}</td>
                    <td>${item.project}</td>
                    <td>${item.testCode}</td>
                    <td>${item.portfolio}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }
    
    renderPagination() {
        const pagination = document.getElementById(this.paginationId);
        const totalPages = Math.ceil(this.filteredData.length / this.recordsPerPage);
        
        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // First button
        const firstLi = document.createElement('li');
        firstLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
        firstLi.innerHTML = '<a class="page-link" href="#">First</a>';
        firstLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage !== 1) {
                this.currentPage = 1;
                this.render();
            }
        });
        pagination.appendChild(firstLi);
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = '<a class="page-link" href="#">Previous</a>';
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });
        pagination.appendChild(prevLi);
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        
        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.render();
            });
            pagination.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = '<a class="page-link" href="#">Next</a>';
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
            }
        });
        pagination.appendChild(nextLi);
        
        // Last button
        const lastLi = document.createElement('li');
        lastLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
        lastLi.innerHTML = '<a class="page-link" href="#">Last</a>';
        lastLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage !== totalPages) {
                this.currentPage = totalPages;
                this.render();
            }
        });
        pagination.appendChild(lastLi);
    }
}

function handleRecordsPerPageChangeWg(e) {
   // let records = e.target.value ? e.target.value : selecteddata;
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1;
  //  renderTable();
   // renderPagination();
    renderTableWg();
    renderPaginationWg();
}

function setRecordsPerPageChangeWg() {
   // let records =  selecteddata;
    recordsPerPage = recordsPerPage ? recordsPerPage : 10;//recordsPerPage > parseInt(records) ? recordsPerPage : parseInt(records);
    currentPage = 1;
  //  renderTable();
   // renderPagination();
    renderTableWg();
    renderPaginationWg();
}


// Setup event listeners
function setupEventListenersWg() {
    // Search functionality
   // document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Records per page
    document.getElementById('recordsPerPageWorkGroups').addEventListener('change', handleRecordsPerPageChangeWg);
    
    // // Add button
    // document.getElementById('addBtn').addEventListener('click', handleAdd);
    
    // // Save button in modal
    // document.getElementById('saveBtn').addEventListener('click', handleSave);
    
    // // Test code select change
    // document.getElementById('testCodeSelect').addEventListener('change', handleTestCodeChange);
}

function initializeTable() {
    const cells = document.querySelectorAll('.editable-cell');
    
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (currentEditingCell && currentEditingCell !== this) {
                saveCell(currentEditingCell);
            }
            editCell(this);
        });
    });
    
    // Click outside to save
    // document.addEventListener('click', function(e) {
    //     if (!e.target.closest('.editable-cell') && currentEditingCell) {
    //         editCell(this);
    //     }
    // });
}

document.addEventListener('click', function(e) {
    const cells = document.querySelectorAll('.editable-cell');
     cells.forEach(cell => {
      //  console.log(cell,"CELL")
         if (e.target.closest('.editable-cell') !== null && e.target.closest('.editable-cell').innerText == cell.innerText) {
            let tr = e.target.closest("tr");
            // e.target.closest("tr").style.setProperty("--bs-table-bg", "#fc0");
           //  e.target.closest("tr").style.backgroundColor = "#fc0";
          //  e.target.closest('.editable-cell').parentElement.style.backgroundColor = "#fc0";
          //  tr.classList.toggle("row-highlight");

            document.querySelectorAll("tr.row-highlight").forEach(row => row.classList.remove("row-highlight"));

    // APPLY highlight to the clicked row
            tr.classList.add("row-highlight");
            
                editCell(cell);
        }
      //  cell.addEventListener('click', function() {
            // if (currentEditingCell && currentEditingCell !== this) {
            //     saveCell(currentEditingCell);
            // }
           // editCell(cell);
       // });
    });
   
});

function editCell(cell) {
    console.log(cell,"LN440");
   
     for(let i = 0; i<testworkgroup.length; i++){
        for(let j = 0; j< testworkgroup[i].length; j++){
             if(testworkgroup[i][j].testCode == cell.innerText){
                clickedData = [...testworkgroup[i]];
            renderTableWg(testworkgroup[i]);
            setRecordsPerPageChangeWg();
        }
        }
       
    }
    //testworkgroup.filter((el)=>el)
    // if (currentEditingCell === cell) return;
    
    // currentEditingCell = cell;
    // const displayValue = cell.querySelector('.display-value');
    // const editControl = cell.querySelector('.edit-control');
    
    // displayValue.style.display = 'none';
    // editControl.style.display = 'block';
    
    // if (editControl.tagName === 'SELECT') {
    //     editControl.value = displayValue.textContent.trim();
    //     editControl.focus();
        
    //     // Handle test code selection change
    //     if (cell.dataset.column === 'testcode') {
    //         editControl.addEventListener('change', function() {
    //             updateDescription(cell, this.value);
    //         });
    //     }
    // } else if (editControl.tagName === 'INPUT') {
    //     editControl.value = displayValue.textContent.trim();
    //     editControl.focus();
    //     editControl.select();
    // }
    
    // // Handle Enter key
    // editControl.addEventListener('keydown', function(e) {
    //     if (e.key === 'Enter') {
    //         saveCell(cell);
    //     } else if (e.key === 'Escape') {
    //         cancelEdit(cell);
    //     }
    // });
}

function renderTableWg(data) {
    if(data !== undefined){
        let pageData = null;
         this.tableId = "workGroupsTable";
        const tbody = document.getElementById(this.tableId.replace('Table', 'TableBody'));
       // this.currentPage = this.currentPage == undefined ? 2 : this.currentPage;
    //    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    //    const endIndex = startIndex + this.recordsPerPage;
       const startIndex = (currentPage - 1) * recordsPerPage;
       const endIndex = startIndex + recordsPerPage;
       if(data.length > 10){
         pageData = data.slice(startIndex, endIndex);
       }else{
         pageData = data;
       }
       
        // testCode: 'PT0019',workgroup:'CSCS',active:true,project:"APHAEM000000",timecode:'PT0019',portfolio:"APHAEM000000"
        tbody.innerHTML = '';
        
        if (this.tableId === 'workGroupsTable') {
            pageData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    
                    <td>${item.workgroup}</td>
                    <td><input type="checkbox" class="form-check-input" ${item.active ? 'checked' : ''}></td>
                    <td>${item.timecode}</td>
                    <td>${item.project}</td>
                    <td>${item.timecode}</td>
                    <td>${item.portfolio}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }
       renderPaginationWg();
}

    
// Render pagination workGroupsData
function renderPaginationWg() {
    const totalPages = Math.ceil(clickedData.length / recordsPerPage);
    const pagination = document.getElementById('workGroupsPagination');
    
    pagination.innerHTML = '';
    
    // First button
    const firstLi = document.createElement('li');
    firstLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    firstLi.innerHTML = '<a class="page-link" href="#" onclick="goToPageWg(1)">First</a>';
    pagination.appendChild(firstLi);
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="goToPageWg(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="goToPageWg(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="goToPageWg(${currentPage + 1})">Next</a>`;
    pagination.appendChild(nextLi);
    
    // Last button
    const lastLi = document.createElement('li');
    lastLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    lastLi.innerHTML = `<a class="page-link" href="#" onclick="goToPageWg(${totalPages})">Last</a>`;
    pagination.appendChild(lastLi);
}


// Go to page
function goToPageWg(page) {
    const totalPages = Math.ceil(clickedData.length / recordsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        //renderTable();
        renderTableWg(clickedData);
        renderPaginationWg();
    }
}

// document.addEventListener('click', function(e) {
//         if (e.target.closest('.editable-cell')) {
//             initializeTable();
//         }
//     });

// Initialize tables when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Constituent Tests table
    // new TableManager(
    //     'constituentTable',
    //     constituentTestsData,
    //     'searchConstituent',
    //     'recordsPerPageConstituent',
    //     'constituentPagination'
    // );
      console.log("DOMContentLoaded");
    // Initialize WorkGroups table
    new TableManager(
        'workGroupsTable',
        workGroupsData,
        'searchWorkGroups',
        'recordsPerPageWorkGroups',
        'workGroupsPagination'
    );
   // renderPaginationWg();
    setupEventListenersWg();
    initializeTable();
    
});