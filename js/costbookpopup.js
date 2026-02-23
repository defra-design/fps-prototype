const modal = document.getElementById("testModal");
const modal_year = document.getElementById("AddYearModal");
// document.getElementById("timejobdiv").style.display = 'none';

let testData = [
    { id: 1, WGgrade: 'A_AS2', staffname:'App_admin', rate: '£126.45', hrs:'2', days: '0.28', staffcost:'£252.90' },
    { id: 2, WGgrade: 'F_AS2', staffname:'App_admin', rate: '£64.62', hrs:'14', days: '1.94' ,staffcost:'£904.68' },
    { id: 3, WGgrade: 'E_SSP1', staffname:'CAPS', rate: '£71.12', hrs:'20', days: '2.78', staffcost:'£1442.40' }
   

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
       
        row.innerHTML = `<td class="editable-cell " data-field="WGgrade" data-id="${item.id}">${item.WGgrade}</td>
            <td class="editable-cell " data-field="staffname" data-id="${item.id}">${item.staffname}</td>
            <td class="editable-cell text-AlignRight" data-field="rate" data-id="${item.id}">${item.rate}</td>
            <td class="editable-cell text-AlignRight" data-field="hrs" data-id="${item.id}">${item.hrs}</td>
                        <td class="editable-cell text-AlignRight" data-field="days" data-id="${item.id}">${item.days}</td>
						<td class="editable-cell text-AlignRight" data-field="staffcost" data-id="${item.id}">${item.staffcost}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="handleEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
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


   
    

// document.getElementById('recordsPerPage').addEventListener('change', handleRecordsPerPageChange);
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
        item.staffname.toLowerCase().includes(searchTerm) ||
        // item.rate.toLowerCase().includes(searchTerm) ||
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

			document.getElementById("modal-WGgrade").value = obj.cells[0].innerText;
            document.getElementById("modal-staffname").value = obj.cells[1].innerText;
            document.getElementById("modal-rate").value = obj.cells[2].innerText;
            document.getElementById("modal-hrs").value = obj.cells[3].innerText;
            document.getElementById("modal-days").value = obj.cells[4].innerText;
			  document.getElementById("modal-staffcost").value = obj.cells[5].innerText;

            // document.getElementById("notimejobfound").style.display = 'none';

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


             
            const index = timecodedata.findIndex(item => item.staffname === value);

            //selectedIndex = obj.rowIndex;
            if (index !== -1) {
                timecodedata[index].staffname = value;

            } else {
                timecodedata.forEach(item => {
                    item.staffname = value;   // ✅ DATA updated
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
    
    document.getElementById('exampleModalLabel').textContent = 'Add Staff Booked';
     document.getElementById('formAddJobcode').reset();
    // document.getElementById('descriptionInput').value = '';
    openModal();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}

function handleAddYear() {
      
   // document.getElementById('exampleModalLabel').textContent = 'Add Staff Booked';
    // document.getElementById('testForm').reset();
    // document.getElementById('descriptionInput').value = '';
    openModalyear();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}



document.getElementById('addstaffbookedBtn').addEventListener('click', handleAddJobCode);
document.getElementById('add_year').addEventListener('click', handleAddYear);
 document.getElementById('modalsaveBtn').addEventListener('click', handleSave);

function closeModal(){
   //  document.getElementById('testModal').style.display = 'none';
       document.getElementById("testModal").classList.toggle("show");
	    // document.getElementById("AddYearModal").classList.toggle("show");
}


// Handle edit
function handleEdit(id) { 
    const item = testData.find(item => item.id === id);
    if (!item) return;
    
    isAddMode = false;
    editingRow = id;
    
    document.getElementById('exampleModalLabel').textContent = 'Edit Staff Booked';
	 document.getElementById('modal-WGgrade').value = item.WGgrade;
    document.getElementById('modal-staffname').value = item.staffname;
    document.getElementById('modal-rate').value = item.rate;
    document.getElementById('modal-hrs').value = item.hrs;
    document.getElementById('modal-days').value = item.days; 
	document.getElementById('modal-staffcost').value = item.staffcost; 


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
            item.staffname.toLowerCase().includes(searchTerm) ||
            // item.name.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm) ||
            item.workGroup.toLowerCase().includes(searchTerm)
        );
        
        renderTable();
        renderPagination();
    }
}


function openModal() {
  modal.classList.add("show");
  //modal_year.classList.add("show");
}

function openModalyear() {
 // modal.classList.add("show");
  modal_year.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
  // modal_year.classList.remove("show");
}

function closeModalYear() {
  //modal.classList.remove("show");
   modal_year.classList.remove("show");
}

// Handle save
function handleSave() {
	 const WGgrade = document.getElementById('modal-WGgrade').value;
    const staffname = document.getElementById('modal-staffname').value;
    const rate = document.getElementById('modal-rate').value;
    const hrs = document.getElementById('modal-hrs').value;
    const days = document.getElementById('modal-days').value;
	const staffcost = document.getElementById('modal-staffcost').value;


 

    
    if (!staffname || !days) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (isAddMode) {
        const newId = Math.max(...testData.map(item => item.id)) + 1;
        testData.push({
            id: newId,
			 WGgrade: WGgrade,
            staffname: staffname,
            rate: rate,
            hrs:hrs,
            days: days,
			staffcost: staffcost
			});
    } else {
        const index = testData.findIndex(item => item.id === editingRow);
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                 WGgrade: WGgrade,
            staffname: staffname,
                 rate: rate,
                hrs:hrs,
                days: days,
				staffcost: staffcost
            };
        }
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.staffname.toLowerCase().includes(searchTerm) ||
        // item.name.toLowerCase().includes(searchTerm) ||
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