const modal = document.getElementById("testModal");
document.getElementById("timejobdiv").style.display = 'block';
document.getElementById('divCopywithworkgroup').style.display = "none";
document.getElementById('displayProjectcode').style.visibility = "visible";
let storeJobcode = [];
let testData = [
    { id: 1, jobcode: 'AH003300', name: 'Avian influenza serology', type:"Work", wg: 'Wilelife',timecode:[
    {
        "id": 1,
        "jobcode": "AH003300",
        "isactive": true,
        "workGroup": "PHINSLT"
    },
    {
        "id": 2,
        "jobcode": "AH003300",
        "isactive": true,
        "workGroup": "CSCW"
    },
    {
        "id": 3,
        "jobcode": "AH003300",
        "isactive": true,
        "workGroup": "ROSC"
    },
    {
        "id": 4,
        "jobcode": "AH003300",
        "isactive": true,
        "workGroup": "QAU"
    }
] },
    { id: 2, jobcode: 'AH003301', name: 'Big liver syndrome disease', type:"Work", wg: 'Wilelife',timecode:[
    {
        "id": 1,
        "jobcode": "AH003301",
        "isactive": true,
        "workGroup": "ROSW"
    },
    {
        "id": 2,
        "jobcode": "AH003301",
        "isactive": true,
        "workGroup": "Operations"
    },
    {
        "id": 3,
        "jobcode": "AH003301",
        "isactive": true,
        "workGroup": "ROSC"
    },
    {
        "id": 4,
        "jobcode": "AH003301",
        "isactive": true,
        "workGroup": "SVBU"
    }
] },
    { id: 3, jobcode: 'AH003302', name: 'BVD milk ELISA', type:"Work", wg: 'Wilelife' },
    { id: 4, jobcode: 'AH003303', name: 'Brucella abortus ELISA',type:"Work", wg: 'Wilelife' },
    { id: 5, jobcode: 'AH003304', name: 'B abortus milk ELISA - Defra', type:"Work",wg: 'CIT' },
    { id: 6, jobcode: 'AH003305', name: 'Brucella abortus milk ELISA', type:"Work",wg: 'Bees' },
    { id: 7, jobcode: 'AH003306', name: 'Brucella abortus MRT', type:"Work",wg: 'MRSA' },
    { id: 8, jobcode: 'AH003307', name: 'Brucella abortus RBT', type:"Work",wg: 'BSE' },
    { id: 9, jobcode: 'AH003308', name: 'Brucella abortus (Eire)', type:"Work",wg: 'CSCS' },
    { id: 10, jobcode: 'AH003309', name: 'Brucella canis RSA/SAT',type:"Work", wg: 'CIT' },
    { id: 11, jobcode: 'AH003310', name: 'Brucella culture ID', type:"Work",wg: 'Bees' },
    { id: 12, jobcode: 'AH003311', name: 'Brucella ovis CFT', type:"Work",wg: 'MRSA' },
    { id: 13, jobcode: 'AH003315', name: 'Brucella abortus slides', type:"Work",wg: 'BSE' },
    { id: 14, jobcode: 'AH003317', name: 'Staphylococci incl MRSA', type:"Work",wg: 'CSCS' },
    { id: 15, jobcode: 'AH003318', name: 'BSE (HRL) Immunoblot test', type:"Work",wg: 'CIT' }
];
 
 
let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...testData];
let editingRow = null;
let isAddMode = false;
let selectedIndex = null;
let copiedTimecode = [];
let selectedRowjobcode = null;
let selectedParentRow = null;
document.getElementById("notimejobfound").style.display = 'none';
// Render table
function renderTable(data=null) {
    if (!data) {
    data = filteredData;
    }
    const tbody = document.getElementById('tableBody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach((item,index) => {
        const row = document.createElement('tr');
       
        row.innerHTML = `
            <td class="editable-cell govuk-table__cell" data-field="jobcode" data-id="${item.id}">${item.jobcode}</td>
            <td class="editable-cell govuk-table__cell" data-field="name" data-id="${item.name}">${item.name}</td>
            <td class="editable-cell govuk-table__cell" data-field="type" data-id="${item.type}">${item.type}</td>
                        <td class="editable-cell govuk-table__cell" data-field="workGroup" data-id="${item.wg}">${item?.wg}</td>
            <td>
                <button onclick="handleEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editjobcode"
                                                                                 width="20"></button>
               
                <button onclick="handleCopy(${item.id})"> <img src="../images/copy-regular-full.svg" alt="Copy icon for selected record"
                                                                                 width="20"></button>
                <button onclick="handleDelete(event,${item.id})"> <img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                width="20"></button>
                                                                                 
            </td>
        `;
        tbody.appendChild(row);

        row.addEventListener('click',function(){ 
            selectedParentRow = this; 
            onclickRowNewModal(this,jobcode = null);
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
        item.wg.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
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


function onclickRowNewModal(obj,currentjobcode = null) {
         
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

            //document.getElementById("notimejobfound").style.display = 'none';
            let showupdatedjobcode = currentjobcode !== null ? currentjobcode : obj.cells[0].innerText;
            document.getElementById("displayJobcode").innerText = showupdatedjobcode + " in Project ... ";
            document.getElementById('displayProjectcode').style.visibility = "visible";

             const row = obj.tagName === "TD" ? obj.parentElement : obj;

            // remove previous highlights
            document.querySelectorAll("tr").forEach(r => r.classList.remove("selected-table-rowbg"));
            row.classList.add("selected-table-rowbg"); 

            // document.getElementsByClassName('tdjobcode').innerText = obj.innerText;
            document.getElementById("timejobdiv").style.display = 'block';
            //obj.style.backgroundColor = '#cccf90';


            const newId = testData.length > 0 ? testData.length + 1 : 1; //Math.max(...newtimecode.map(item => item)) + 1;
         let idx = testData.findIndex((el) => el.jobcode === obj.cells[0].innerText.trim());


         if (idx !== -1) {
           testData[idx]["timecode"] = testData[idx].timecode
             ? [...testData[idx].timecode] // clone!
             : [];
         }

      
            let isJobcodeExistInStore = storeJobcode.find(x => x.jobcode == obj.cells[0].innerText.trim());
            if(!isJobcodeExistInStore){
                storeJobcode.push({jobcode: obj.cells[0].innerText.trim()});   
            }
           
            populateSelect(dpjobcode,storeJobcode,"jobcode","jobcode")
           
         
         selectedRowjobcode = obj.cells[0].innerText.trim();
          renderTimeCodeTable(obj.cells[0].innerText);
             sortTableWorkgroup("workGroup", "asc");
            
            // const cells = document.getElementsByClassName('tdjobcode');
            // for (let i = 0; i < cells.length; i++) {
            //     //cells[i].innerText = obj.innerText;
            //     cells[i].innerText = obj.querySelector('td').innerText;


            // }

        }

function handleAddJobCode() {
    isAddMode = true;
    
    document.getElementById('exampleModalLabel').textContent = 'Add Job Code';
    document.getElementById('formAddJobcode').reset();
    document.getElementById('modalcopySaveBtn').style.display = "none";
    document.getElementById('modalsaveBtn').style.display = "inline-block";
     document.getElementById('divCopywithworkgroup').style.display = "none";
     document.getElementById('modal-jobcode').disabled = false;
    // document.getElementById('descriptionInput').value = '';
    openModal();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}


document.getElementById('addJobcodeBtn').addEventListener('click', handleAddJobCode);
 document.getElementById('modalsaveBtn').addEventListener('click', handleSave);
 document.getElementById('modalcopySaveBtn').addEventListener('click', handleCopyWithWgSave);
 

function closeModal(){
   //  document.getElementById('testModal').style.display = 'none';
       document.getElementById("testModal").classList.toggle("show");
}


// Handle edit
function handleEdit(id) { 
    document.getElementById('divCopywithworkgroup').style.display = "none";
    document.getElementById('modalcopySaveBtn').style.display = "none";
    document.getElementById("modalsaveBtn").style.display = "inline-block";
    const item = testData.find(item => item.id === id);
    if (!item) return;
    
    isAddMode = false;
    editingRow = id;
    
    document.getElementById('exampleModalLabel').textContent = "Edit Project's Job Code";
    document.getElementById('modal-jobcode').value = item.jobcode;
    document.getElementById('modal-jobcode').disabled = true;//While editing job code should not be editable as it is unique identifier for timecode
    document.getElementById('modal-name').value = item.name;
    document.getElementById('modal-type').value = item.type;
    document.getElementById('modal-workgroup').value = item.wg; 


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

function handleCopy(id){
    const item = testData.find(item => item.id === id);
    if (!item) return;
    
    isAddMode = true;
    editingRow = id;
    
    document.getElementById('exampleModalLabel').textContent = "Copy Project's Job Code";
    document.getElementById('modal-jobcode').value = item.jobcode;
    document.getElementById('modal-jobcode').disabled = false;
    document.getElementById('modal-name').value = item.name;
    document.getElementById('modal-type').value = item.type;
    document.getElementById('modal-workgroup').value = item.wg; 
    document.getElementById('divCopywithworkgroup').style.display = "block";
    document.getElementById("modalsaveBtn").style.display = "none"; // Hide regular save button
    document.getElementById("modalcopySaveBtn").style.display = "inline-block"; // Show copy save button

    openModal();
}

function handleDelete(e,id) {
    e.stopPropagation(); // Prevent row click event
    if (confirm('Are you sure you want to delete this Job code?')) {

        let idx = testData.findIndex((el)=>el.id === id);
        if(testData[idx].timecode.length > 0){
            alert("This job code has related work group, please delete work group first before deleting job code");
            return;
        }else{
            
             testData = testData.filter(item => {
            if (item.id === id) {
                // Also remove from storeJobcode if exists
                const indexInStore = storeJobcode.findIndex(jc => jc.jobcode === item.jobcode);
                if (indexInStore !== -1) {
                    storeJobcode.splice(indexInStore, 1);
                    populateSelect(dpjobcode, storeJobcode, "jobcode", "jobcode");
                }

                 const indexIntarget = jobcodelist.findIndex(jc => jc.tcjobcode === item.jobcode);
                if (indexIntarget !== -1) {
                    jobcodelist.splice(indexIntarget, 1);
                    populateSelect(dpTargetJobcode, jobcodelist, "tcjobcode", "tcjobcode");
                }

     

                return false; // Remove this item
            }
            return true; // Keep this item
        } ); 
            testData.splice(idx, 1);
            filteredData = [...testData];
            renderTable();
            renderPagination();
        }
 
        
       
        // Update filtered data
            const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
            filteredData = testData.filter(item => 
                item.jobcode.toLowerCase().includes(searchTerm) ||
                item.name.toLowerCase().includes(searchTerm) ||
                item.type.toLowerCase().includes(searchTerm) ||
                item.wg.toLowerCase().includes(searchTerm)
            );
        
        
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

    let isjobcodeExist =  testData.filter(item => item.jobcode.toString() == jobcode );
    if(isAddMode && isjobcodeExist.length > 0){
        alert("job code " + jobcode + " already exist try different job code");
        return;
    }

 

    
    if (!jobcode || !workGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    let newId = null;
    if (isAddMode) {
        newId = Math.max(...testData.map(item => item.id)) + 1;
        testData.unshift({
            id: newId,
            jobcode: jobcode,
            name: name,
            type:type,
            wg: workGroup
        });

        storeJobcode.push({jobcode: jobcode});
        populateSelect(dpjobcode,storeJobcode,"jobcode","jobcode")
        sortTable("jobcode", "asc");
    } else {
        const index = testData.findIndex(item => item.id === editingRow);
        if(isAddMode && index !== -1){
            if("timecode" in testData[index]){
                alert("Job code has timecode associated, if you want to update job code with same timecode then please use copy with workgroup option");
                return;
              
            }
        }
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                jobcode: jobcode,
                 name: name,
                type:type,
                wg: workGroup
            };
        }
        
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.jobcode.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.wg.toLowerCase().includes(searchTerm)
    );
    
    // Navigate to the page where the new record will appear
    if (isAddMode && newId) {
        const newItemIndex = filteredData.findIndex(item => item.id === newId);
        if (newItemIndex !== -1) {
            currentPage = Math.ceil((newItemIndex + 1) / recordsPerPage);
        }
        sortTable("jobcode", "asc");
    }
    
    renderTable();
    sortTable("jobcode", "asc");
    // Auto-click the newly added row
    if (isAddMode && newId) {
        setTimeout(() => {
            const newRow = document.querySelector(`tr td[data-id="${newId}"]`)?.parentElement;
            if (newRow) {
                newRow.click();
            }
        }, 0);
        sortTable("jobcode", "asc");
    }
  
    closeModal(); 
    isAddMode = false;
    editingRow = null;
}


function updateJobCodeInTimecode(refjobcodebeforecopy, newJobCode) {
  let idx = testData.findIndex((item) => item.jobcode === refjobcodebeforecopy);
  let copiedTimecode = testData[idx].timecode;
  if (copiedTimecode.length > 0) {
    copiedTimecode.forEach((tc) => {
      tc.jobcode = newJobCode;
    });
    return copiedTimecode;
  }
}

function handleCopyWithWgSave(){
    
    const jobcode = document.getElementById('modal-jobcode').value;
    const name = document.getElementById('modal-name').value;
    const type = document.getElementById('modal-type').value;
    const workGroup = document.getElementById('modal-workgroup').value;
    const ischeckedwg = document.getElementById('chkcopywithworkgroup').checked;
    let updateTimecode = updateJobCodeInTimecode(refjobcodebeforecopy,jobcode);
    let isjobcodeExist =  testData.filter(item => item.jobcode.toString() == jobcode );
    if(ischeckedwg){
        if(updateTimecode == undefined){
            alert("time code does not exist for " + jobcode );  
            return
        }
        updateTimecode = updateTimecode.length > 0 ? updateTimecode : [];
    }else{
        updateTimecode = [];
    }
    if(isjobcodeExist.length > 0){
        alert(jobcode + " already exist. Please try with a different job code.");
        return;
    }

    
    if (!jobcode || !workGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    let newId = null;
    if (isAddMode) {
        newId = Math.max(...testData.map(item => item.id)) + 1;

        testData.unshift({
            id: newId,
            jobcode: jobcode,
            name: name,
            type:type,
            wg: workGroup,
            timecode: updateTimecode //.map(item => ({ ...item, id: Math.max(...copiedTimecode.map(tc => tc.id)) + 1 })) : []
        });
      //  addWorkGroupForCopiedJobCode(jobcode,workGroup);
      renderTimeCodeTable();
      sortTable("jobcode", "asc"); 
    } else {
        const index = testData.findIndex(item => item.id === editingRow);
        if (index !== -1) {
            testData[index] = {
                ...testData[index],
                jobcode: jobcode,
                 name: name,
                type:type,
                wg: workGroup
            };
        }
        sortTable("jobcode", "asc");
    }
    
    // Update filtered data
    const searchTerm = document.getElementById('txtSearchProjectCode').value.toLowerCase();
    filteredData = testData.filter(item => 
        item.jobcode.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.wg.toLowerCase().includes(searchTerm)
    );

    // Navigate to the page where the new record will appear
    if (isAddMode && newId) {
        const newItemIndex = filteredData.findIndex(item => item.id === newId);
        if (newItemIndex !== -1) {
            currentPage = Math.ceil((newItemIndex + 1) / recordsPerPage);
        }
        sortTable("jobcode", "asc");
    }
    
    renderTable();
    
    // Auto-click the newly copied row
    if (isAddMode && newId) {
        setTimeout(() => {
            const newRow = document.querySelector(`tr td[data-id="${newId}"]`)?.parentElement;
            if (newRow) {
                newRow.click();
            }
        }, 0);
        sortTable("jobcode", "asc");
    }
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
    // const firstLi = document.createElement('li');
    // firstLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''} ${currentPage === 1 ? 'aria-disabled="true"' : ''}`;
    // firstLi.innerHTML = '<a class="page-link"  onclick="goToPage(1)">First</a>';
    // pagination.appendChild(firstLi);
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `govuk-pagination__item ${currentPage === 1 ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link"    onclick="goToPage(${currentPage - 1})"> <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
      </svg> <span class="govuk-pagination__link-title">
        Previous<span class="govuk-visually-hidden"> page</span>
      </span></a>`;
    pagination.appendChild(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `govuk-pagination__item ${i === currentPage ? 'govuk-pagination__item--current' : ''} ${currentPage === 1 ? 'aria-disabled="true"' : ''}`;
        li.innerHTML = `<a class="govuk-link govuk-pagination__link"   onclick="goToPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `govuk-pagination__next ${currentPage === totalPages ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage + 1})" rel="next"><span class="govuk-pagination__link-title">Next</span><svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg></a>`;
    pagination.appendChild(nextLi);
    
    // Last button
    // const lastLi = document.createElement('li');
    // lastLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''} ${currentPage === 1 ? 'aria-disabled="true"' : ''}`;
    // lastLi.innerHTML = `<a class="page-link"  onclick="goToPage(${totalPages})">Last</a>`;
    // pagination.appendChild(lastLi);
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
 
const headers = document.querySelectorAll("th");

headers.forEach((header, index) => {
  header.addEventListener("click", function () {

    const column = this.dataset.column;
    const currentOrder = this.dataset.order || "asc";
    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    // Remove sorting icons from all headers
    headers.forEach(h => {
      h.classList.remove("sorted-asc", "sorted-desc");
      // Remove any existing sort icon
      const existingIcon = h.querySelector(".sort-icon");
      if (existingIcon) {
        existingIcon.remove();
      }
    });

    // Update the order for the clicked header
    this.dataset.order = newOrder;

    // Add sorting icon only to the first header (index 0)
    if (index === 0 || index === 1) {
      const sortIcon = document.createElement("span");
      sortIcon.className = "sort-icon";
      
      if (newOrder === "asc") {
        sortIcon.innerHTML = " ▲"; // or use "↑"
        this.classList.add("sorted-asc");
      } else {
        sortIcon.innerHTML = " ▼"; // or use "↓"
        this.classList.add("sorted-desc");
      }
      
      this.appendChild(sortIcon);
    }

    sortTable(column, newOrder);
  });
});


 

function sortTable(column, order) {

  testData.sort((a, b) => {

    let valA = a[column];
    let valB = b[column];

    if (typeof valA === "string" && typeof valB === "string") {

      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // fallback for numbers
    return order === "asc"
      ? valA - valB
      : valB - valA;

  });

  renderTable(testData);
}


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