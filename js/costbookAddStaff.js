const modal = document.getElementById("testModal");
document.getElementById("timejobdiv").style.display = 'none';

let testData = [
    { id: 1, jobcode: 'AH003300', name: 'Avian influenza serology', type:"Work", workGroup: 'Wilelife' },
    { id: 2, jobcode: 'AH003301', name: 'Big liver syndrome disease', type:"Work", workGroup: 'Wilelife' },
    { id: 3, jobcode: 'AH003302', name: 'BVD milk ELISA', type:"Work", workGroup: 'Wilelife' },
    { id: 4, jobcode: 'AH003303', name: 'Brucella abortus ELISA',type:"Work", workGroup: 'Wilelife' },
    { id: 5, jobcode: 'AH003304', name: 'B abortus milk ELISA - Defra', type:"Work",workGroup: 'CIT' },
    { id: 6, jobcode: 'AH003305', name: 'Brucella abortus milk ELISA', type:"Work",workGroup: 'Bees' },
    { id: 7, jobcode: 'AH003306', name: 'Brucella abortus MRT', type:"Work",workGroup: 'MRSA' },
    { id: 8, jobcode: 'AH003307', name: 'Brucella abortus RBT', type:"Work",workGroup: 'BSE' },
    { id: 9, jobcode: 'AH003308', name: 'Brucella abortus (Eire)', type:"Work",workGroup: 'CSCS' },
    { id: 10, jobcode: 'AH003309', name: 'Brucella canis RSA/SAT',type:"Work", workGroup: 'CIT' },
    { id: 11, jobcode: 'AH003310', name: 'Brucella culture ID', type:"Work",workGroup: 'Bees' },
    { id: 12, jobcode: 'AH003311', name: 'Brucella ovis CFT', type:"Work",workGroup: 'MRSA' },
    { id: 13, jobcode: 'AH003315', name: 'Brucella abortus slides', type:"Work",workGroup: 'BSE' },
    { id: 14, jobcode: 'AH003317', name: 'Staphylococci incl MRSA', type:"Work",workGroup: 'CSCS' },
    { id: 15, jobcode: 'AH003318', name: 'BSE (HRL) Immunoblot test', type:"Work",workGroup: 'CIT' }
];
 

let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...testData];
let editingRow = null;
let isAddMode = false;
let selectedIndex = null;
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
            <td class="editable-cell" data-field="jobcode" data-id="${item.id}">${item.jobcode}</td>
            <td class="editable-cell" data-field="name" data-id="${item.id}">${item.name}</td>
            <td class="editable-cell" data-field="type" data-id="${item.id}">${item.type}</td>
                        <td class="editable-cell" data-field="workGroup" data-id="${item.id}">${item.workGroup}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="handleEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editjobcode"
                                                                                 width="20"></button>
                <button class="btn btn-sm btn-outline-danger" onclick="handleDelete(${item.id})"> <img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20"></button>
            </td>
        `;
        tbody.appendChild(row);

        row.addEventListener('click',function(){  
            onclickRowNew(this);
        })

    
    });
    
    // Add inline editing functionality
   // addInlineEditingListeners(); 
}


   
    

document.getElementById('recordsPerPage').addEventListener('change', handleRecordsPerPageChange);
document.getElementById('txtSearchProjectCode').addEventListener('input', handleSearch);

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
    filteredData = testData.filter(item => 
        item.jobcode.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.workGroup.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
    renderPagination();
}


function onclickRowNew(obj) {
         
            selectedRow = obj;
            //  if (event.target.parentElement.closest('.edit-btn') || event.target.closest('.rowbtns')) {
            //   //  alert("EDIT CLICKED")
            //     console.log("Edit button clicked inside this row");
            //     document.getElementById("modalsaveBtn").style.display = "none";
            //     document.getElementById("updateBtn").style.display = "inline-block"; 
            //     document.getElementById("exampleModalLabel").innerText = "Edit Job code"
            // } else {
            //      console.log("Some other cell clicked");
            //     // document.getElementById("modalsaveBtn").style.display = "block";
            //    //  document.getElementById("exampleModalLabel").innerText = "Add Job code"
            // } 
            //   document.getElementById("modalsaveBtn").style.display = "none";
            // document.getElementById("updateBtn").style.display = "inline-block"; 
            // document.getElementById("exampleModalLabel").innerText = "Edit Job code"


            document.getElementById("modal-jobcode").value = obj.cells[0].innerText;
            document.getElementById("modal-name").value = obj.cells[1].innerText;
            document.getElementById("modal-type").value = obj.cells[2].innerText;
            document.getElementById("modal-workgroup").value = obj.cells[3].innerText;

            document.getElementById("notimejobfound").style.display = 'none';

             const row = obj.tagName === "TD" ? obj.parentElement : obj;

            // remove previous highlights
            document.querySelectorAll("tr").forEach(r => r.classList.remove("selected-table-rowbg"));
            row.classList.add("selected-table-rowbg"); 

            // document.getElementsByClassName('tdjobcode').innerText = obj.innerText;
            document.getElementById("timejobdiv").style.display = 'block';
            //obj.style.backgroundColor = '#cccf90';

            const cells = document.getElementsByClassName('tdjobcode');

            let firstCell = obj.querySelector('td');
            let input = firstCell.querySelector('input');

            let value = input ? input.value : firstCell.innerText;

            for (let i = 0; i < cells.length; i++) {
                cells[i].innerText = value;
            }


             
            const index = timecodedata.findIndex(item => item.jobcode === value);

            //selectedIndex = obj.rowIndex;
            if (index !== -1) {
                timecodedata[index].jobcode = value;

            } else {
                timecodedata.forEach(item => {
                    item.jobcode = value;   // ✅ DATA updated
                });
                  renderTimeCodeTable();
            }
            

            renderTimeCodeTable();

            // const cells = document.getElementsByClassName('tdjobcode');
            // for (let i = 0; i < cells.length; i++) {
            //     //cells[i].innerText = obj.innerText;
            //     cells[i].innerText = obj.querySelector('td').innerText;


            // }

        }

function handleAddJobCode() {
    isAddMode = true;
    
    document.getElementById('exampleModalLabel').textContent = 'Add Job Code';
    // document.getElementById('testForm').reset();
    // document.getElementById('descriptionInput').value = '';
    openModal();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}


document.getElementById('addJobcodeBtn').addEventListener('click', handleAddJobCode);
 document.getElementById('modalsaveBtn').addEventListener('click', handleSave);

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
    
    document.getElementById('exampleModalLabel').textContent = 'Edit Project';
    document.getElementById('modal-jobcode').value = item.jobcode;
    document.getElementById('modal-name').value = item.name;
    document.getElementById('modal-type').value = item.type;
    document.getElementById('modal-workgroup').value = item.workGroup; 


     openModal();
  //  document.getElementById('testModal').style.display = 'block';
     // document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();

    //   document.getElementById('testCodeSelect').addEventListener('change', function() {
    //     // Handle program selection change
    //     console.log('Program selected:', this.value);
    //     const selectedValue = this.value;
    //     document.getElementById('txtportfoliotest').value = selectedValue?.split("-")[0]; 
    // }); 

}


function handleDelete(id) {
    if (confirm('Are you sure you want to delete this test?')) {
        testData = testData.filter(item => item.id !== id);
        
        // Update filtered data
        const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
        filteredData = testData.filter(item => 
            item.jobcode.toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm) ||
            item.workGroup.toLowerCase().includes(searchTerm)
        );
        
        renderTable();
        renderPagination();
    }
}


function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}


// Handle save
function handleSave() {
    const jobcode = document.getElementById('modal-jobcode').value;
    const name = document.getElementById('modal-name').value;
    const type = document.getElementById('modal-type').value;
    const workGroup = document.getElementById('modal-workgroup').value;


 

    
    if (!jobcode || !workGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isAddMode) {
        const newId = Math.max(...testData.map(item => item.id)) + 1;
        testData.push({
            id: newId,
            jobcode: jobcode,
            name: name,
            type:type,
            workGroup: workGroup
        });
    } else {
        const index = testData.findIndex(item => item.id === editingRow);
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                jobcode: jobcode,
                 name: name,
                type:type,
                workGroup: workGroup
            };
        }
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.jobcode.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.workGroup.toLowerCase().includes(searchTerm)
    );
    
    renderTable();
   // renderPagination();
    //document.getElementById('testModal').style.display = 'none';
    //  document.getElementById("testModal").classList.toggle("show");
    closeModal();
    // const modal = bootstrap.Modal.getInstance(document.getElementById('testModal'));
    // modal.hide();
    
    isAddMode = false;
    editingRow = null;
}


// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    // First button
    const firstLi = document.createElement('li');
    firstLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    firstLi.innerHTML = '<a class="page-link"  onclick="goToPage(1)">First</a>';
    pagination.appendChild(firstLi);
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    prevLi.innerHTML = `<a class="page-link"   onclick="goToPage(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
        li.innerHTML = `<a class="page-link"   onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    nextLi.innerHTML = `<a class="page-link" onclick="goToPage(${currentPage + 1})">Next</a>`;
    pagination.appendChild(nextLi);
    
    // Last button
    const lastLi = document.createElement('li');
    lastLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    lastLi.innerHTML = `<a class="page-link"  onclick="goToPage(${totalPages})">Last</a>`;
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
 


// document.addEventListener("click", function (e) {

//   const row = e.target.closest("tr");
//   if (!row) return;

//   const table = row.closest("table");
//   if (!table) return;

//   // remove class from all rows of THIS table
//   table.querySelectorAll("tr").forEach(r => {
//     if (r !== row) {
//       r.classList.remove("selected-table-rowbg");
//     }
//   });

//   // add class to clicked row
//   row.classList.add("selected-table-rowbg");
// });



 


// // Initialize the application
// document.addEventListener('DOMContentLoaded', function() {
//     //populateTestCodeSelect();
//    // setupEventListeners();
//     renderTable();
//     renderPagination();
//    // renderPaginationWg();
// });