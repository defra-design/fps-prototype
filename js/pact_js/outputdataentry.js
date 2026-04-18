const table = document.getElementById("outputRecordataTable");
const tbody = table.querySelector("tbody");
const sourceBody = table.querySelector("tbody");
const thours = document.getElementById("txtTotalVolume");
thours.value = 0;
const totalHours = Number(thours.value) || 0;
let searchText;
const mkliveHours = document.getElementById("txtMakeliveTotalhours");
mkliveHours.value = 0;
const mktotalHours = Number(mkliveHours.value) || 0;

let selectedWG = [];

let pactStaffName = "";
let testCode = "";
let pactID = "";

let editingRow = null;
const targetBody = document
  .getElementById("selectedTable")
  .querySelector("tbody");
let temprow = targetBody.insertRow();
temprow.innerHTML = `<td colspan="5" class="norecords">No record found</td>`;
let tmprow;
let currentPage = 1;
let pageSize = 10;

let previousHours = null;
let updatedHours = null;
let filtered;
let failedRecords = [];
let currentPagetwo = 1;
let pageSizeliverecords = 10;
let isPassedBtnClicked = false;
let isFailedBtnClicked = false;
let isValidateBtnClicked = false;
let isAddBtnClicked = false;
// const th = document.querySelector('th[data-col="Hours"]');
// const input = document.getElementById("divTotalhours");

// const rect = th.getBoundingClientRect();
// const tableRect = th.closest("table").getBoundingClientRect();

// input.style.width = rect.width + "px";
// input.style.marginRight = rect.left - tableRect.left + "px";

document.getElementById("wgupdateBtn").addEventListener("click", () => {
  //WorkGroup, ID, PACTStaff, TimeCode, ParentProject, Period, Hours, Pass, PactID, Comments

//     document.getElementById("txtWorkgroup").value = data[1];
//   //document.getElementById("dpName").value = data[2] + "|" + data[3];
//   document.getElementById("txtTestcode").value = data[2];
//   document.getElementById("txtBuyer").value = data[3];
//   document.getElementById("txtPeriod").value = data[4];
//   document.getElementById("txtVolume").value = data[5];

  addOrUpdateRow(
    {
      WorkGroup: document.getElementById("txtWorkgroup").value,
      TestCode: document.getElementById("txtTestcode").value,
      Buyer: document.getElementById("txtBuyer").value,
      Period: document.getElementById("txtPeriod").value,
      Volume: document.getElementById("txtVolume").value === '' ? 0 : document.getElementById("txtVolume").value
    },
    editingRow,
  );
  editingRow = null;
  closeModal();
});

document.getElementById("moveBtn").addEventListener("click", () => {
  const rows = [...tbody.rows];

  // onClickValidate();
  //onClickFailed();
  failedRecords = rows.filter((row) => {
    const checkbox = row.cells[6]?.querySelector("input[type='checkbox']:disabled");
    return (
      row.innerText.toLowerCase().includes(searchText) &&
      (checkbox === null || checkbox.checked !== true)
    );
  });

    if(failedRecords.length > 0){
     alert("All records have to have passed before you can run the import. Either delete or correct those that have failed first. Please note");
     return;

  }


      mkliveHours.value = 0;
      filtered = rows.filter((row) => {
      const checkbox = row.cells[6]?.querySelector("input[type='checkbox']:disabled");
      return (
        row.innerText.toLowerCase().includes(searchText) && 
        checkbox.checked === true
      );
    });


  // if (filtered.length > 0) {
  //   alert("Please correct all failed records before moving passed records.");
  //   return;
  // }
  //const checked = sourceBody.querySelectorAll(".row-check:checked");
  // selected checked will be moved
  // const checked = sourceBody.querySelectorAll("#dataTable input[type='checkbox'][data-id]:checked");
  // if (!checked.length) return alert("No rows selected");

  // const checked = sourceBody.querySelectorAll(
  //   "#dataTable input[type='checkbox'][data-id]",
  // );
  // if (!checked.length) return alert("No rows selected");

  filtered.forEach((cb) => {
    const tr = cb.closest("tr");

    const cells = tr.cells;

    //  WorkGroup:      cols[start]     || "",
    //   ID:             cols[start + 1] || "",
    //   Name:           cols[start + 2] || "",
    //   TimeCode:       cols[start + 3] || "",
    //   ParentProject:  cols[start + 4] || "",
    //   Period:         cols[start + 5] || "",
    //   Hours:          cols[start + 6] || "",
    //   Pass:           cols[start + 7] || false,
    //   PactID:         cols[start + 8] || "",
    //   Comments: "",
//   WorkGroup,
//   TestCode,
//   Buyer,
//   Period,
//   Volume,
//   Pass 
    // extract values (skip checkbox column)
    const rowData = {
      //  id: cells[1].innerText,
      WorkGroup: cells[1].innerText,
      TestCode: cells[2].innerText,
      Buyer: cells[3].innerText,
      Period: cells[4].innerText,
      Volume: cells[5].innerText
    };

    addRowToTarget(rowData);

    // remove from source
    tr.remove();
  });

  applyPagination();
  applyPaginationLiveRecords();
  // to align hours textbox with hours column after moving rows
  alignHoursBox();
  window.addEventListener("resize", alignHoursBox);
  document.getElementById("outputRecordataTable").addEventListener("scroll", alignHoursBox); 
  // end here
  document.getElementById("selectAllWG").checked = false;
});

 

function addRowToTarget(data) {
  temprow.remove();
  const tr = targetBody.insertRow();

  tr.innerHTML = ` 
 
    <td>${data.WorkGroup}</td> 
    <td>${data.TestCode}</td>
    <td>${data.Buyer}</td> 
    <td>${data.Period}</td>
    <td>${data.Volume}</td>
  `;

 // thours.value = Number(thours.value) - Number(data.Hours);
  mkliveHours.value = Number(mkliveHours.value) + Number(data.Volume);
}

////WorkGroup	ID	Name	TimeCode	ParentProject	Period	Hours	Pass	PactID

/* column configuration */
const columns = [
  { key: "select", type: "checkbox" },
  { key: "WorkGroup", type: "text" },
  { key: "ID", type: "text" },
  { key: "Name", type: "text" },
  { key: "TimeCode", type: "text" },
  { key: "ParentProject", type: "text" },
  { key: "Period", type: "number" },
  { key: "Hours", type: "number" },
  { key: "Pass", type: "boolean" },
  { key: "PactID", type: "number" },
  { key: "Comments", type: "text" },
];

/* utility */
function getMaxId() {
  let max = 0;
  [...tbody.rows].forEach((r) => {
    const idCell = r.cells[1];
    if (!idCell) {
      max = Math.max(max, 0);
      return max;
    }
    max = Math.max(max, parseInt(idCell.innerText) || 0);
  });
  return max;
}

 

//  WorkGroup: document.getElementById("WorkGroup").value,
//                 ID: pactStaffID,
//                 PACTStaff: pactStaffName,
//                 TimeCode: document.getElementById("TimeCode").value,
//                 ParentProject: document.getElementById("ParentProject").value,
//                 Period: document.getElementById("Period").value,
//                 Hours: document.getElementById("Hours").value,
//                 PactID:pactID

////WorkGroup	ID	Name	TimeCode	ParentProject	Period	Hours	Pass	PactID

// WorkGroup: document.getElementById("WorkGroup").value,
//       TestCode: testCode,
//       Buyer: "sample buyer",
//       Period: document.getElementById("Period").value,
//       Volume: document.getElementById("ParentProject").value
function addRow({
  WorkGroup,
  TestCode,
  Buyer,
  Period,
  Volume,
  Pass 
}) {
  //console.log(ID, PACTStaff, PactID);
  clearEmptyRows();
  const tr = tbody.insertRow();
  let nextId = getMaxId() + 1;
  tr.innerHTML = `
    <td> 
    
    <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes"  style="margin-left: 5px;">
              <div class="govuk-checkboxes__item">
                                                
                <input class="govuk-checkboxes__input timerecordCheckbox" type="checkbox" onclick="event.stopPropagation()" data-id="${nextId}" id="selectRow${nextId}" name="selectRow${nextId}"/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${nextId}" style="padding: 0;">  </label>   
              </div>
              
          </div>
    </td> 
    <td>${WorkGroup}</td> 
    <td>${TestCode}</td>
     <td>${Buyer}</td> 
    <td>${Period}</td>
    <td>${Volume}</td>
    
    <td> <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
              <div class="govuk-checkboxes__item">
                                                
                <input class="govuk-checkboxes__input" id="selectRow${nextId}" type="checkbox"  disabled/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${nextId}" style="padding: 0;">  </label>   
              </div>
              
          </div>
    </td>  
   <td></td>
    <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
  thours.value = Number(thours.value) + Number(Volume);
}

function addOrUpdateRow(data, existingRow) {
  let tr;
  let existingId = 0;
  let Pass = true;
 
  if (existingRow) {
    // EDIT MODE
    tr = existingRow;
    existingId = editingRow.cells[0].querySelector('input[type="checkbox"].timerecordCheckbox').dataset.id;

  }
  tr.innerHTML = `
        <td> 
            <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes"  style="margin-left: 5px;">
              <div class="govuk-checkboxes__item">
                                                
                <input class="govuk-checkboxes__input timerecordCheckbox" type="checkbox" onclick="event.stopPropagation()" data-id="${existingId}" id="selectRow${existingId}" name="selectRow${existingId}"/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${existingId}" style="padding: 0;">  </label>   
              </div>
              
          </div>
        </td> 
    <td>${data.WorkGroup}</td>
    <td>${data.TestCode}</td>
    <td>${data.Buyer}</td>
     <td>${data.Period}</td>
    <td>${data.Volume ? data.Volume : 0}</td> 


 
    <td> 
    <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes"  style="margin-left: 5px;">
              <div class="govuk-checkboxes__item"> 
                <input class="govuk-checkboxes__input" type="checkbox" onclick="event.stopPropagation()" ${tr.cells[6].innerText ? "checked" : ""} checkbox.checked ? "true" : "false" disabled/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${tr.cells[6].innerText}" style="padding: 0;">  </label>    
              </div> 
          </div>
    </td>  
    <td>${tr.cells[7].innerText}</td>
   
    <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;

  let diff = Number(data.Volume) - Number(previousHours);
  thours.value = Number(thours.value) + Number(diff);
}

/* edit / save / cancel */
// table.addEventListener("click", e => {
//   const tr = e.target.closest("tr");
//   if (!tr) return;

//   if (e.target.classList.contains("edit-btn")) enterEdit(tr);
//   if (e.target.classList.contains("delete-btn")) handleDelete(tr);
//   if (e.target.classList.contains("save-btn")) saveEdit(tr);
//   if (e.target.classList.contains("cancel-btn")) cancelEdit(tr);
// });

table.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const tr = btn.closest("tr");
  if (!tr) return;

  if (btn.classList.contains("edit-btn")) enterEdit(tr);
  else if (btn.classList.contains("delete-btn")) handleDelete(tr);
  else if (btn.classList.contains("save-btn")) saveEdit(tr);
  else if (btn.classList.contains("cancel-btn")) cancelEdit(tr);
});

function EXenterEdit(tr) {
  columns.forEach((col, i) => {
    if (col.type === "id") return;
    const td = tr.cells[i];
    td.dataset.old = td.innerText;
    td.innerHTML =
      col.type === "number"
        ? `<input type="number" value="${td.innerText}">`
        : `<input type="text" value="${td.innerText}">`;
  });
  toggleButtons(tr, true);
}

function enterEdit(tr) {
  window.editingRow = tr;
  document.getElementById("saveDataBtn").style.display = "none";
  document.getElementById("wgupdateBtn").style.display = "block";

  // columns.forEach((col, i) => {
  //   if (col.type === "checkbox" || col.type === "id") return;

  //   const td = tr.cells[i];
  //   td.dataset.old = td.innerText;

  //   td.innerHTML =
  //     col.type === "number"
  //       ? `<input type="number" class="form-control" value="${td.innerText}">`
  //       : `<input type="text" class="form-control" value="${td.innerText}">`;

  //   if(col.key == "Hours" && i == 7){
  //     previousHours = td.querySelector("input").value;
  //   }
  // }); // for inline editing

  openEditModal(tr);
  // toggleButtons(tr, true);
}

function getRowData(tr) {
  return Array.from(tr.cells).map((td) => td.textContent.trim());
}

    //   WorkGroup: document.getElementById("txtWorkgroup").value,
    //   TestCode: document.getElementById("txtTestcode").value,
    //   Buyer: document.getElementById("txtBuyer").value,
    //   Period: document.getElementById("txtPeriod").value,
    //   Volume: document.getElementById("txtVolume").value


function openEditModal(row) {
  const data = getRowData(row);
  editingRow = row;
  //document.getElementById("rowId").value = data[2];
  document.getElementById("txtWorkgroup").value = data[1];
  //document.getElementById("dpName").value = data[2] + "|" + data[3];
  document.getElementById("txtTestcode").value = data[2];
  document.getElementById("txtBuyer").value = data[3];
  document.getElementById("txtPeriod").value = data[4];
  document.getElementById("txtVolume").value = data[5];
  document.getElementById("modalTitle").textContent = "Edit Data";
  previousHours = data[5];
  openModal();
}

function handleDelete(tr) {
  if (!tr) return;

  if (confirm("Are you sure you want to delete this row?")) {
    const tdhours = !tr.cells[7].innerText ? 0 : Number(tr.cells[7].innerText);
    thours.value = Number(thours.value) - tdhours;
    tr.remove();
   
    applyPagination(); // refresh pagination
  }
}

function saveEdit(tr) {
  columns.forEach((col, i) => {
    //if (col.type === "id") return;
    if (col.type === "checkbox" || col.type === "id") return;
    const td = tr.cells[i];
    td.innerText = td.querySelector("input").value;
    if (col.key === "Hours" && i == 7) {
      // console.log(td.querySelector("input").value,"LN239")
      updatedHours = tr.cells[i].innerText;
      let diff = Number(updatedHours) - Number(previousHours);
      thours.value = Number(thours.value) + Number(diff);
    }
  });
  toggleButtons(tr, false);
}

function cancelEdit(tr) {
  columns.forEach((col, i) => {
    //if (col.type === "id") return;
    if (col.type === "checkbox" || col.type === "id") return;
    const td = tr.cells[i];
    td.innerText = td.dataset.old;
  });
  toggleButtons(tr, false);
}

function toggleButtons(tr, editing) {
  tr.querySelector(".edit-btn").style.display = editing ? "none" : "inline";
  tr.querySelector(".save-btn").style.display = editing ? "inline" : "none";
  tr.querySelector(".cancel-btn").style.display = editing ? "inline" : "none";
}

/* Excel paste handling */
table.addEventListener("paste", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const td = sourceBody.querySelector(".norecords");
  if (td) {
    const tr = td.closest("tr");
    if (tr) tr.remove();
  }

  const text = e.clipboardData.getData("text/plain").trim();
  if (!text) return;

  let nextId = getMaxId() + 1;
  const rows = text.split("\n");

  rows.forEach((line) => {
    const cols = line.replace(/\r/g, "").split("\t");
    const hasExcelId = !isNaN(parseInt(cols[0]));
    const start = hasExcelId ? 1 : 0;

    // addRow({
    //   id: nextId++,
    //   WorkGroup: cols[hasExcelId ? 1 : 0] || "",
    //   PACTStaff: cols[hasExcelId ? 2 : 1] || "",
    //   TimeCode: cols[hasExcelId ? 3 : 2] || "",
    //    ParentProject: cols[hasExcelId ? 1 : 0] || "",
    //   Period: cols[hasExcelId ? 2 : 1] || "",
    //   Hours: cols[hasExcelId ? 3 : 2] || ""
    // });
    ////WorkGroup	ID	Name	TimeCode	ParentProject	Period	Hours	Pass	PactID
    addRow({
      //  id: nextId++,
      WorkGroup: cols[start] || "",
      ID: cols[start + 1] || "",
      Name: cols[start + 2] || "",
      TimeCode: cols[start + 3] || "",
      ParentProject: cols[start + 4] || "",
      Period: cols[start + 5] || "",
      Hours: cols[start + 6] || "",
      Pass: cols[start + 7] || false,
      PactID: cols[start + 8] || "",
      Comments: "",
    });
  });

  applyPagination();
});

/* initial data */
//addRow({  WorkGroup: "DDDLTBU", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"11", Hours:"10",Pass:"true",PactID:"2323",Comments:"test" });

function getCheckedRows() {
  const rows = Array.from(tbody.rows);

  return rows.filter((row) => {
    const checkbox = row.cells[8]?.querySelector("input[type='checkbox']");
    return checkbox && checkbox.checked;
  });
}

function applyPagination() {
  //const targetBody = table.querySelector("tbody");
 let totalFailedHours = 0;
  const rows = [...tbody.rows];
  searchText = document.getElementById("wgsearchBoxtwo").value.toLowerCase() || document.getElementById("staffsearchBox").value.toLowerCase();
   if (!isPassedBtnClicked && !isFailedBtnClicked) {
    thours.value = 0;
     rows.forEach((r) => {
      thours.value = Number(thours.value) + Number(r.cells[5].innerText);
    }); 
   }
  // filter rows

  filtered = rows.filter((row) =>
    row.innerText.toLowerCase().includes(searchText),
  );

 

  if (isPassedBtnClicked) {
    filtered = rows.filter((row) => {
      const checkbox = row.cells[6]?.querySelector("input[type='checkbox']:disabled");
      return (
        row.innerText.toLowerCase().includes(searchText) &&
        checkbox !== null &&
        checkbox.checked === true
      );
    });
     filtered.forEach((r) => {
      totalFailedHours = totalFailedHours + Number(r.cells[5].innerText);
    });
   thours.value = totalFailedHours; // total passed hours
   
   // Hide all rows first
   rows.forEach((r) => (r.style.display = "none"));
  }

  if (isFailedBtnClicked && !isValidateBtnClicked) {
    filtered.length = 0;
    rows.forEach((r) => (r.style.display = "none"));
  }

  if (isFailedBtnClicked && isValidateBtnClicked) {
   
    filtered = rows.filter((row) => {
      const checkbox = row.cells[6]?.querySelector("input[type='checkbox']:disabled");
      return (
        row.innerText.toLowerCase().includes(searchText) &&
        (checkbox === null || checkbox.checked !== true)
      );
    });

    filtered.forEach((r) => {
      totalFailedHours = totalFailedHours + Number(r.cells[5].innerText);
    });
     
    rows.forEach((r) =>  (r.style.display = "none") ); 

     thours.value = totalFailedHours; // total failed hours //Number(thours.value) - totalFailedHours;
  
  }

  
  
  // If neither passed nor failed button is clicked, hide all rows first
  if (!isPassedBtnClicked && !isFailedBtnClicked) {
    rows.forEach((r) => (r.style.display = "none"));
     
  }

//   filtered.forEach((r) => {
//       thours.value = totalFailedHours + Number(r.cells[5].innerText);
//     });

  
  const totalRows = filtered.length;
  const size = pageSize === "all" ? totalRows : pageSize;
  const totalPages = Math.ceil(totalRows / size);


  // bounds check
  if (currentPage > totalPages) currentPage = totalPages || 1;

  filtered.forEach((row, index) => {
    if (
      pageSize === "all" ||
      (index >= (currentPage - 1) * size && index < currentPage * size)
    ) {
      row.style.display = "";
    }
  });

  // let tmp = table.querySelector('tbody')
  if (rows.length == 0 && currentPage == 1) {
    // tmprow = sourceBody.insertRow();

    for (let i = 0; i < 3; i++) {
      tmprow = sourceBody.insertRow();
      tmprow.innerHTML = `
        <td></td>
        <td>&nbsp;</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
       
    `;
    }
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  let currentPg = 1;

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `govuk-pagination__item ${currentPage === 1 ? "disabled" : ""} ${currentPg === 1 ? 'aria-disabled="true"' : ""}`;
  prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageStaging(${currentPage - 1})"> <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg> <span class="govuk-pagination__link-title">
      Previous<span class="govuk-visually-hidden"> page</span>
    </span></a>`;
  container.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `govuk-pagination__item ${i === currentPage ? "govuk-pagination__item--current" : ""}`;
    li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageStaging(${i})">${i}</a>`;
    container.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `govuk-pagination__next ${currentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageStaging(${currentPage + 1})" rel="next"><span class="govuk-pagination__link-title">Next</span><svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg></a>`;
  container.appendChild(nextLi);
}

function goToPageStaging(page) {
  const rows = [...tbody.rows];
  const totalRows = rows.length;
  const size = pageSize === "all" ? totalRows : pageSize;
  const totalPages = Math.ceil(totalRows / size);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentPage = page;
  applyPagination();
}

function createPageItem(label, disabled, onClick, active = false) {
  const li = document.createElement("li");
  li.className = "page-item";
  if (disabled) li.classList.add("disabled");
  if (active) li.classList.add("active");

  const span = document.createElement("span");
  span.className = "page-link";
  span.textContent = label;

  if (!disabled) {
    span.addEventListener("click", onClick);
  }

  li.appendChild(span);
  return li;
}

function EXrenderPagination(totalPages) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  // Prev
  const prev = document.createElement("button");
  prev.textContent = "Prev";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    applyPagination();
  };
  container.appendChild(prev);

  // Numbers
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.fontWeight = i === currentPage ? "bold" : "normal";
    btn.onclick = () => {
      currentPage = i;
      applyPagination();
    };
    container.appendChild(btn);
  }

  // Next
  const next = document.createElement("button");
  next.textContent = "Next";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    applyPagination();
  };
  container.appendChild(next);
}

// document.getElementById("wgsearchBox").addEventListener("change", () => {
//   currentPage = 1;
//   applyPagination();
// });

// document.getElementById("wgsearchBoxtwo").addEventListener("change", (e) => {
//    const selectedValue = e.target.value;
//   currentPage = 1;
//   applyPagination();

//   // if (e.target.id === "txtsearchBox") {
//   //   currentPage = 1;
//   //   applyPagination();
//   // }

// });

document.addEventListener("change", (e) => {
  if (e.target.id === "staffsearchBox") {
    currentPage = 1;
    applyPagination();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "wgsearchBoxtwo") {
    currentPage = 1;
    applyPagination();
  }
});

document.addEventListener("input", (e) => {
  if (e.target.id === "txtsearchBox") {
    currentPage = 1;
    applyPagination();
  }
});

// document.addEventListener("input", e => {
//   if (e.target.id === "txtsearchBoxliverecords") {
//     currentPagetwo = 1;
//     applyPaginationLiveRecords();
//   }
// });

document.getElementById("pageSize").addEventListener("change", (e) => {
  pageSize = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);

  currentPage = 1;
  applyPagination();
});

document
  .getElementById("pageSizeliverecords")
  .addEventListener("change", (e) => {
    pageSizeliverecords =
      e.target.value === "all" ? "all" : parseInt(e.target.value, 10);

    currentPagetwo = 1;
    applyPaginationLiveRecords();
  });

//Pagination for Live record

function applyPaginationLiveRecords() {
  //const targetBody = table.querySelector("tbody");
  
  const rows = [...targetBody.rows];
  targetBody.querySelectorAll('.norecords').forEach(row => row.remove());
 //  const td = targetBody.querySelector(".norecord");
 // removeNoRecordRow();
   //const dataRows = rows.filter(row => !row.querySelector(".norecords"));
  // Get search criteria
  const wgSearch = document.getElementById("wgsearchBox")?.value || "";
  const staffSearch = document.getElementById("txtstaffsearchBox")?.value || "";
  const tcSearch = document.getElementById("tcsearchBoxone")?.value || "";
  const prSearch = document.getElementById("dpPeriod")?.value || "";

  // Filter rows based on search criteria
  const filtered = rows.filter(row => {
    const workGroup = row.cells[0]?.innerText || "";
    const staffId = row.cells[1]?.innerText || "";
    const timeCode = row.cells[2]?.innerText || "";
    const parentProject = row.cells[3]?.innerText || "";
    const period = row.cells[4]?.innerText || "";
    
    // Apply filters (only if search value is not empty or default)
    const matchesWG = !wgSearch || wgSearch === "" || wgSearch === "--select--" || workGroup.toLowerCase().includes(wgSearch.toLowerCase());
    // const matchesStaff = !staffSearch || staffSearch === "" || staffSearch === "--select--" || staffId.toLowerCase().includes(staffSearch.toLowerCase());
    // const matchesTC = !tcSearch || tcSearch === "" || tcSearch === "--select--" || timeCode.toLowerCase().includes(tcSearch.toLowerCase());
    // const matchesPP = !ppSearch || ppSearch === "" || ppSearch === "--select--" || parentProject.toLowerCase().includes(ppSearch.toLowerCase());
    // const matchesPR = !prSearch || prSearch === "" || prSearch === "--select--" || period.toLowerCase().includes(prSearch.toLowerCase());
    
    return matchesWG;// || matchesStaff || matchesTC || matchesPP || matchesPR;
  });

  const totalRows = filtered.length;
  const size = pageSizeliverecords === "all" ? totalRows : pageSizeliverecords;
  const totalPages = Math.ceil(totalRows / size);

  // bounds check
  if (currentPagetwo > totalPages) currentPagetwo = totalPages || 1;

  rows.forEach((r) => (r.style.display = "none"));

  filtered.forEach((row, index) => {
    if (
      pageSizeliverecords === "all" ||
      (index >= (currentPagetwo - 1) * size && index < currentPagetwo * size)
    ) {
      row.style.display = "";
    }
  });

  // let tmp = table.querySelector('tbody')
  if (filtered.length == 0 && currentPagetwo == 1) { 
    temprow = targetBody.insertRow();
    temprow.innerHTML = `<td colspan="5" class="norecords">No record found</td>`; 
  }

  renderPaginationLiveRecords(totalPages);
}

function renderPaginationLiveRecords(totalPages) {
  const container = document.getElementById("paginationliverecords");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  let currentPg = 1;

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `govuk-pagination__item ${currentPagetwo === 1 ? "disabled" : ""} ${currentPg === 1 ? 'aria-disabled="true"' : ""}`;
  prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageLive(${currentPagetwo - 1})"> <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg> <span class="govuk-pagination__link-title">
      Previous<span class="govuk-visually-hidden"> page</span>
    </span></a>`;
  container.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPagetwo - 2);
  const endPage = Math.min(totalPages, currentPagetwo + 2);

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `govuk-pagination__item ${i === currentPagetwo ? "govuk-pagination__item--current" : ""}`;
    li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageLive(${i})">${i}</a>`;
    container.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `govuk-pagination__next ${currentPagetwo === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPageLive(${currentPagetwo + 1})" rel="next"><span class="govuk-pagination__link-title">Next</span><svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg></a>`;
  container.appendChild(nextLi);
}

function goToPageLive(page) {
  const rows2 = [...targetBody.rows];
  const totalRows2 = rows2.length;
  const size2 =
    pageSizeliverecords === "all" ? totalRows2 : pageSizeliverecords;
  const totalPages2 = Math.ceil(totalRows2 / size2);

  if (page < 1) page = 1;
  if (page > totalPages2) page = totalPages2;

  currentPagetwo = page;
  applyPaginationLiveRecords();
}

// document.getElementById("csvInput").addEventListener("change", e => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = evt => {
//     const lines = evt.target.result.split("\n");

//     removeNoRecordRow();

//     lines.forEach(line => {
//       const cols = line.split(",");
//       if (cols.length < 2) return;

//       addRow({
//         id: getMaxId(),
//         WorkGroup: cols[0]?.trim(),
//         PACTStaff: cols[1]?.trim(),
//         TimeCode: cols[2]?.trim(),
//         ParentProject: cols[2]?.trim(),
//         Period: cols[2]?.trim(),
//         Hours: cols[2]?.trim()
//       });

//     });

//     applyPagination();
//   };

//   reader.readAsText(file);
// });

document.getElementById("csvInput").addEventListener("change", (e) => {
  isFailedBtnClicked = false;
  isPassedBtnClicked = false;
  const file = e.target.files[0];
  if (!file) return;

  const ext = file.name.split(".").pop().toLowerCase();

  if (ext === "csv") {
    readCSV(file);
  } else if (ext === "xlsx" || ext === "xls") {
    readExcelWithXLSX(file);
  } else {
    alert("Unsupported file format");
  }
  //document.getElementById("csvInput").value = "";
  e.target.value = "";
});

function readExcelWithXLSX(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    importRows(rows); // YOUR EXISTING FUNCTION
  };

  reader.readAsArrayBuffer(file);
}

function hasDuplicateDigits(text) {
    // Checks for any character (letter or digit) repeated 3 or more times consecutively
    return /(.)\1{2,}/.test(text);
}

 
 
 

function clearTableBody() {
  tbody.querySelectorAll("tr").forEach((tr) => tr.remove());
  thours.value = 0;
}

function clearEmptyRows() {
  tbody.querySelectorAll("tr").forEach((tr) => {
    const cells = Array.from(tr.cells);

    const isEmpty = cells.every((td) => td.textContent.trim() === "");

    if (isEmpty) {
      tr.remove();
    }
  });
}

function importRows(rows) {
  clearEmptyRows();
  if (!rows || rows.length <= 1) return;
 // sourceBody.innerHTML = "";
  // remove "No record" row if exists
  const noRecord = targetBody.querySelector("td.norecord");
  if (noRecord) noRecord.closest("tr").remove();

  const hasExcelId = !isNaN(rows[1][0]);
  let startId = getMaxId() + 1; 

  if(!isAddBtnClicked){
      [...sourceBody.rows].forEach((row) => {
    const hasContent = [...row.cells].some(
      (cell) => cell.textContent.trim() !== "",
    );

    if (hasContent) {
      row.remove();
    }
  });
  } 

  // clearTableBody();
  // skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    let start = 0;
    let obj = {
      //  id: nextId++,
      WorkGroup: cols[start] || "",
      TestCode: cols[start + 1] || "",
      Buyer: cols[start + 2] || "",
      Period: cols[start + 3] || "",
      Volume: cols[start + 4] || ""      
    };
    let nextId = getMaxId() + i;
    if (!cols || cols.every((v) => v === "")) continue;
    //WorkGroup	ID	Name	TimeCode	ParentProject	Period	Hours	Pass	PactID
    const excelId = hasExcelId ? Number(cols[0]) : null;
    const existingRow = excelId ? findRowById(excelId) : null;

    if (existingRow) {
      updateCell(existingRow, "WorkGroup", cols[hasExcelId ? 1 : 0]);
      updateCell(existingRow, "TestCode", cols[hasExcelId ? 2 : 1]);
      updateCell(existingRow, "Buyer", cols[hasExcelId ? 3 : 2]);
      updateCell(existingRow, "Period", cols[hasExcelId ? 4 : 3]);
      updateCell(existingRow, "Volume", cols[hasExcelId ? 5 : 4]);
     
    } else {
      const isAllFilled = cols
        .slice(0, 7)
        .every(
          (v) => v !== undefined && v !== null && v.toString().trim() !== "",
        );
      const checkedAttr = isAllFilled ? "checked" : "";
      const tr = tbody.insertRow();
      tr.innerHTML = `
        <td> 
            <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes"  style="margin-left: 5px;">
              <div class="govuk-checkboxes__item">
                                                
                <input class="govuk-checkboxes__input timerecordCheckbox" type="checkbox" onclick="event.stopPropagation()" data-id="${nextId}" id="selectRow${nextId}" name="selectRow${nextId}"/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${nextId}" style="padding: 0;">  </label>   
              </div>
              
          </div>
        
        </td>   
      <td>${cols[0] || ""}</td>
      <td>${cols[1] || ""}</td>
      <td>${cols[2] || ""}</td>
      <td>${cols[3] || ""}</td>
      <td>${cols[4] || "0"}</td> 
   
      <td>
      <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
              <div class="govuk-checkboxes__item"> 
                <input class="govuk-checkboxes__input" id="selectRow${nextId}" type="checkbox"  disabled/>
                 <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${nextId}" style="padding: 0;">  </label>   
              </div>
              
      </div>

      </td>
 
     <td></td>
      
       <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td> 
      `;
    }
    //   addRow({
    // //    id: startId++,
    //     WorkGroup: cols[0] || "",
    //     ID: cols[1] || "",
    //     Name: cols[2] || "",
    //     TimeCode: cols[3] || "",
    //     ParentProject: cols[4] || "",
    //     Period: cols[5] || "",
    //     Hours: cols[6] || "",
    //     Pass: cols[7] || false,
    //     PactID: cols[8] || "",
    //     Comments: "",
    //   });
    // thours.value += cols[5];
    thours.value = Number(thours.value) + Number(cols[4]);
  }

  applyPagination();
}

// function importRows(rows) {
//   if (!rows || rows.length <= 1) return;

//   let nextId = getMaxId() + 1;

//   for (let i = 1; i < rows.length; i++) {
//     const cols = rows[i];
//     if (!cols || cols.every(v => v === "")) continue;

//     tableData.push({
//       pass: false,
//       id: nextId++,
//       WorkGroup: cols[0] || "",
//       PACTStaff: cols[1] || "",
//       TimeCode: cols[2] || "",
//       ParentProject: cols[3] || "",
//       Period: cols[4] || "",
//       Hours: cols[5] || ""
//     });
//   }

//   applyPagination(); // now works
// }

function onClickPassed() {
  isFailedBtnClicked = false;
  isPassedBtnClicked = true;
  currentPage = 1;
  applyPagination();
    // to align hours textbox with hours column after moving rows
  alignHoursBox();
  window.addEventListener("resize", alignHoursBox);
  document.getElementById("outputRecordataTable").addEventListener("scroll", alignHoursBox);
   
  // end here
}

function onClickFailed() {
  isPassedBtnClicked = false;
  isFailedBtnClicked = true;
  currentPage = 1;
  applyPagination();
    // to align hours textbox with hours column after moving rows
  alignHoursBox();
  window.addEventListener("resize", alignHoursBox);
  document.getElementById("outputRecordataTable").addEventListener("scroll", alignHoursBox);
 
  // end here
}

function onClickAllBtn() {
  isPassedBtnClicked = false;
  isFailedBtnClicked = false;
  currentPage = 1;
  applyPagination();
    // to align hours textbox with hours column after moving rows
  alignHoursBox();
  window.addEventListener("resize", alignHoursBox);
  document.getElementById("outputRecordataTable").addEventListener("scroll", alignHoursBox);
 
  // end here
}

document.getElementById("allBtn").addEventListener("click", onClickAllBtn);
document.getElementById("failedBtn").addEventListener("click", onClickFailed);
document.getElementById("passedBtn").addEventListener("click", onClickPassed);

function onClickValidate() {
  //   [...sourceBody.rows].forEach(row => {
  //     [...row.cells].forEach(cell => {
  //         if (cell.textContent.trim() === '') {
  //             cell.textContent = 'Required';
  //             cell.classList.add('error-cell');
  //         }
  //     });
  // });
 isValidateBtnClicked = true;
  [...sourceBody.rows].forEach((row) => {
    const cells = row.cells;
    let errors = [];

    // 4th TD: checkbox unchecked
    // const checkbox = cells[8].querySelector('input[type="checkbox"]');
    // if (checkbox && !checkbox.checked) {
    //   errors.push('Pass is not checked');
    // }

    //1st TD
    if (cells[1].textContent.trim() === "") {
      errors.push("The work group name is blank");
    }

    if (hasDuplicateDigits(cells[1].textContent.trim())) {
      errors.push(`The work group name not an actual WG:  ${cells[1].textContent.trim()}`); 
    }

    //2nd TD
    if (hasDuplicateDigits(cells[2].textContent.trim())) {
      errors.push(
        `This Test code not in this WG: ${cells[2].textContent.trim()}`,
      );
    }

    if (cells[2].textContent.trim() == "") {
      errors.push("This test code is blank");
    }

    if (hasDuplicateDigits(cells[1].textContent.trim()) && hasDuplicateDigits(cells[2].textContent.trim())) {
      let idx = errors.findIndex((e) => e.includes("WG:")); // remove individual WG and test code errors
      if (idx !== -1) errors.splice(idx, 1);
      idx = errors.findIndex((e) => e.includes("Test code")); // remove individual WG and test code errors
      if (idx !== -1) errors.splice(idx, 1);
      errors.push(
        `The WG not set up to do this test, or invalid test: "${cells[1].textContent.trim()} & ${cells[2].textContent.trim()}"`
      );
    }

    if (cells[3].textContent.trim() == "") {
      errors.push("No Project (or buying test)");
    }

     if (cells[4].textContent.trim() == "") {
      errors.push("The month No. is blank.");
    }

      if (typeof(cells[4].textContent.trim()) == "number" || isNaN(cells[4].textContent.trim())) {
      errors.push("The month No. is invalid: " + cells[4].textContent.trim());
    }

    //Not valid timecode/Project/WG combination:
    if (cells[5].textContent.trim() === "") {
      errors.push("The volume field is not a number");
    }

    if (typeof(cells[5].textContent.trim()) == "number" || isNaN(cells[5].textContent.trim())) {
      errors.push(` The volume is not a number ${cells[5].textContent.trim()}`);
    }
 
    // 5th TD: empty
    // if (cells[9].textContent.trim() === '') {
    //   errors.push('Pact ID is empty');
    // }

    // 6th TD: show combined message
    if (errors.length > 0) {
      cells[7].textContent = errors.join(" and ");
      cells[7].classList.add("error-cell");
      cells[6].querySelector("input").checked = false;
    } else {
      cells[6].querySelector("input").checked = true;
      cells[7].textContent = "";
      cells[7].classList.remove("error-cell");
    }
  });

   requestAnimationFrame(alignHoursBox); 
}

document
  .getElementById("validateBtn")
  .addEventListener("click", onClickValidate);

function removeNoRecordRow() {
  const td = targetBody.querySelector(".norecord");
  if (!td) return;

  const tr = td.closest("tr");
  if (tr) tr.remove();
}

//EXPORT TO EXCEL
document.getElementById("exportExcel").addEventListener("click", exportToExcel);

function exportToExcel() {
  const rows = [];

  // Table header
  rows.push([
    "WorkGroup",
    "TestCode",
    "Buyer",
    "Period",
    "Volume",
    "Pass",
    "Comments"
  ]);

  // Table body
  table.querySelectorAll("tbody tr").forEach((el) => {
    // skip "No record" row
    if (el.querySelector(".norecord")) return;

    if (el.style.display === "none") return;

    const tds = el.querySelectorAll("td");

    rows.push([
      tds[1].innerText.trim(), // ID (0 is checkbox)
      tds[2].innerText.trim(),
      tds[3].innerText.trim(),
      tds[4].innerText.trim(),
      tds[5].innerText.trim(), 
      tds[6].querySelector("input[type='checkbox']").checked.toString(),
      tds[7].innerText.trim()
    ]);
  });

  if (rows.length === 1) {
    alert("No data to export");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(wb, ws, "Data");

  XLSX.writeFile(wb, "table-data.xlsx");
}

function findRowById(id) {
  return [...tbody.querySelectorAll("tr")].find((tr) => {
    const idCell = tr.children[1]; // checkbox = 0, id = 1
    return idCell && idCell.textContent.trim() == id;
  });
}

function updateCell(tr, colName, value) {
  const cell = tr.querySelector(`td[data-col="${colName}"]`);
  if (cell) cell.textContent = value ?? "";
}

// function updatePassCell(tr, colName, value) {
//   const cell = tr.querySelector(`td[data-col="${colName}"]`);
//   if (cell) cell.textContent = value ?? "";

//   const isAllFilled = cols.slice(0, 7).every(  v => v !== undefined && v !== null && v.toString().trim() !== "");
//       const checkedAttr = isAllFilled ? "checked" : "";
// }

//updatePassCell(existingRow, "Pass", cols[hasExcelId ? 8 : 7]);

 

document.getElementById("btnClearsearch")?.addEventListener("click", () => {
    document.getElementById("wgsearchBox").value = "";
    document.getElementById("dpTestcode").value = "";
    document.getElementById("txtstaffsearchBox").value = "--select--";
    document.getElementById("dpPeriod").value = "";
    currentPagetwo = 1;
    applyPaginationLiveRecords();
  });

document
  .getElementById("deleteAllWGBtn")
  .addEventListener("click", handleDeleteAllWG);

function handleDeleteAllWG() {
  
  // const checkboxes = document.querySelectorAll(
  //   "#dataTable tbody input[type='checkbox']:checked",
  // );

  //   const checkboxes = document.querySelectorAll(
  //   "#dataTable tbody > tr > td:nth-child(1) > input[type='checkbox']:checked"
  // );

  const checkboxes = document.querySelectorAll(
    "#outputRecordataTable tbody tr td:first-child input[type='checkbox']:checked",
  );

  if (checkboxes.length === 0) {
    alert("Please select at least one record to delete.");
    return;
  }

  if(checkboxes.length > 0){
    confirmDelete = confirm(`Are you sure you want to delete ${checkboxes.length} record(s)?`);
    if(!confirmDelete){
      return;
    } 

  checkboxes.forEach((cb) => {
    const row = cb.closest("tr");
    // filtered.forEach((tr) => {
    //   tr.remove();
    //   thours.value = Number(thours.value) - Number(tr.cells[7].innerText);
    // });
    [...row.cells].forEach((td) => {
      if (td.cellIndex === 5) {
        thours.value = Number(thours.value) - Number(td.innerText);
      }
    });
    row.remove();
    // filtered = rows.filter(
    //   (row) =>
    //     row.innerText.toLowerCase().includes(searchText) &&
    //     !row.cells[8]?.querySelector("input")?.checked,
    // );
    //filtered.remove();
    // if (row.innerText.toLowerCase().includes(searchText)) {
    //   row.remove();
    // }
  });

}

  document.getElementById("selectAllWG").checked = false;
}

function handleAdd() {
  // isAddMode = true;
  isAddBtnClicked = true;
  document.getElementById("wgupdateBtn").style.display = "none";
  document.getElementById("saveDataBtn").style.display = "block";

  const formdiv = document.getElementById("formWorkGroup");

  formdiv.querySelectorAll("input, textarea, select").forEach((el) => {
    el.value = "";
  });
  document.getElementById("modalTitle").textContent = "Add Data";

  //  addRow()

  // document.getElementById('descriptionInput').value = '';
  openModal();
  // document.getElementById('testModal').style.display = 'block';
  //   document.getElementById("testModal").classList.toggle("show");
  // const modal = new bootstrap.Modal(document.getElementById('testModal'));
  // modal.show();
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10000); // Generates a random number between 0 and 999999
}

// document.getElementById("dpName").addEventListener("change", function (e) {
//   const selectedValue = e.target.value;
//   // document.getElementById("PACTStaff").value = selectedValue?.split("|")[0];
//   testCode = selectedValue?.split("|")[0];
//   pactStaffName = selectedValue?.split("|")[1];

//   pactID = generateRandomNumber();
// });

function addData() {
  //WorkGroup, ID, PACTStaff, TimeCode, ParentProject, Period, Hours, Pass, PactID, Comments
 

  addRow({
    // WorkGroup: document.getElementById("WorkGroup").value,
    // ID: pactStaffID,
    // PACTStaff: pactStaffName,
    // TimeCode: document.getElementById("TimeCode").value,
    // ParentProject: document.getElementById("ParentProject").value,
    // Period: document.getElementById("Period").value,
    // Hours: document.getElementById("Hours").value,
    // PactID: pactID,

      WorkGroup: document.getElementById("txtWorkgroup").value,
      TestCode: document.getElementById("txtTestcode").value,
      Buyer: document.getElementById("txtBuyer").value,
      Period: document.getElementById("txtPeriod").value,
      Volume: document.getElementById("txtVolume").value


  });
  closeModal();
}

//{  WorkGroup: "DDDLTBU", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"11", Hours:"10" }

function openModal() {
  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
}

const selectAllWG = document.getElementById("selectAllWG");

selectAllWG.addEventListener("change", function () {
  //const checkboxes = document.querySelectorAll(".timerecordCheckbox");
  const checkboxes = [
    ...document.querySelectorAll(".timerecordCheckbox"),
  ].filter((cb) => cb.closest("tr").offsetParent !== null);

  selectedWG = [];
  checkboxes.forEach((cb) => {
    cb.checked = this.checked;
    const item = JSON.parse(cb.dataset.id);

    if (this.checked) {
      if (!selectedWG.includes(item.jobcode)) {
        selectedWG.push(JSON.parse(cb.dataset.id));
      }
    } else {
      selectedWG = selectedWG.filter((p) => p.id !== item.jobcode);
    }

    // let tcId = JSON.parse(cb.dataset.id).id;
    // let idx = selectedWG.findIndex(item => item.id === tcId);
    // if(idx == -1){
    //     selectedWG.push(JSON.parse(cb.dataset.id));
    // }

    // if()

    // else {
    //     selectedWG.splice(idx, 1);
    // }
  });
  console.log(selectedWG);
});

const wgtbody = document.getElementById("wgTable");

wgtbody.addEventListener("change", function (e) {
  if (e.target.classList.contains("timerecordCheckbox")) {
    let tr = e.target.closest("tr");
    //handleDeleteAllWG(tr);
    // const id = Number(e.target.dataset.id);
    const item = JSON.parse(e.target.dataset.id);
    if (e.target.checked) {
      if (!selectedWG.includes(item.jobcode)) {
        selectedWG.push(item);
      }
    } else {
      selectedWG = selectedWG.filter((el) => el.id !== item.id);

      // uncheck selectAll if any one unchecked
      selectAllWG.checked = false;
    }

    // Optional: auto check selectAll if all selected
    const allCheckboxes = document.querySelectorAll(".timerecordCheckbox");
    const checkedCount = document.querySelectorAll(
      ".timerecordCheckbox:checked",
    );

    if (allCheckboxes.length === checkedCount.length) {
      selectAllWG.checked = true;
    }
  }
});

//sorting and resize for time recording screen

// Sorting for dataTable
const headers = document.querySelectorAll("#outputRecordataTable th[data-column]");

headers.forEach((header, index) => {
  header.addEventListener("click", function () {

    const columnIndex = parseInt(this.dataset.column);
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

    // Add sorting icon to the clicked header
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

    sortTable(columnIndex, newOrder);
  });
});


function sortTable(columnIndex, order) {
  // Get all rows from tbody (sourceBody)
  const rows = Array.from(sourceBody.querySelectorAll("tr"));
  
  // Filter out any "no record" rows
  const dataRows = rows.filter(row => !row.querySelector(".norecord"));
  
  if (dataRows.length === 0) return;

  // Sort the rows based on the column
  dataRows.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex];
    let cellB = rowB.cells[columnIndex];
    
    if (!cellA || !cellB) return 0;
    
    let valA = cellA.textContent.trim();
    let valB = cellB.textContent.trim();

    // Try to parse as numbers
    const numA = parseFloat(valA);
    const numB = parseFloat(valB);
    
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
  dataRows.forEach(row => sourceBody.appendChild(row));
  
  // Re-apply pagination to show correct page
  applyPagination();
}


// Sorting for selectedTable
const headersSelected = document.querySelectorAll("#selectedTable th[data-column]");

headersSelected.forEach((header, index) => {
  header.addEventListener("click", function () {

    const columnIndex = parseInt(this.dataset.column);
    const currentOrder = this.dataset.order || "asc";
    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    // Remove sorting icons from all headers
    headersSelected.forEach(h => {
      h.classList.remove("sorted-asc", "sorted-desc");
      // Remove any existing sort icon
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
      sortIcon.innerHTML = " ▲"; // or use "↑"
      this.classList.add("sorted-asc");
    } else {
      sortIcon.innerHTML = " ▼"; // or use "↓"
      this.classList.add("sorted-desc");
    }
    
    this.appendChild(sortIcon);

    sortSelectedTable(columnIndex, newOrder);
  });
});


function sortSelectedTable(columnIndex, order) {
  // Get all rows from tbody (targetBody)
  const rows = Array.from(targetBody.querySelectorAll("tr"));
  
  // Filter out any "no record" rows
  const dataRows = rows.filter(row => !row.querySelector(".norecords"));
  
  if (dataRows.length === 0) return;

  // Sort the rows based on the column
  dataRows.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex];
    let cellB = rowB.cells[columnIndex];
    
    if (!cellA || !cellB) return 0;
    
    let valA = cellA.textContent.trim();
    let valB = cellB.textContent.trim();

    // Try to parse as numbers
    const numA = parseFloat(valA);
    const numB = parseFloat(valB);
    
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
  dataRows.forEach(row => targetBody.appendChild(row));
  
  // Re-apply pagination to show correct page
  applyPaginationLiveRecords();
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


document.addEventListener("DOMContentLoaded", function () {
  applyPagination();
  applyPaginationLiveRecords();
});
