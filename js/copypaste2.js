const table = document.getElementById("dataTable");
const tbody = table.querySelector("tbody");
const sourceBody = table.querySelector("tbody");
const thours = document.getElementById("txtTotalhours");
thours.value = 0;
const totalHours = Number(thours.value) || 0;

const mkliveHours = document.getElementById("txtMakeliveTotalhours");
mkliveHours.value = 0;
const mktotalHours = Number(mkliveHours.value) || 0;

let pactStaffName = "";
let pactStaffID = "";
let pactID = "";

let editingRow = null;
const targetBody = document.getElementById("selectedTable").querySelector("tbody");
let temprow = targetBody.insertRow();
temprow.innerHTML = `<td colspan="7" class="norecords">No record found</td>`
let tmprow;
let currentPage = 1;
let pageSize = 10;

let previousHours = null;
let updatedHours = null;

let currentPagetwo = 1;
let pageSizeliverecords = 10;
let isPassedBtnClicked = false;
let isFailedBtnClicked = false;
// const th = document.querySelector('th[data-col="Hours"]');
// const input = document.getElementById("divTotalhours");

// const rect = th.getBoundingClientRect();
// const tableRect = th.closest("table").getBoundingClientRect();

// input.style.width = rect.width + "px";
// input.style.marginRight = rect.left - tableRect.left + "px";

document.getElementById("wgupdateBtn").addEventListener("click", () => {
   //WorkGroup, ID, PACTStaff, TimeCode, ParentProject, Period, Hours, Pass, PactID, Comments
        addOrUpdateRow({
        WorkGroup:document.getElementById("WorkGroup").value,
        ID:pactStaffID,
        Name:pactStaffName,
        TimeCode:document.getElementById("TimeCode").value,
        ParentProject:document.getElementById("ParentProject").value,
        Period:document.getElementById("Period").value,
        Hours:document.getElementById("Hours").value
        
        },editingRow);
          editingRow = null;
          closeModal();
});

document.getElementById("moveBtn").addEventListener("click", () => {

  //const checked = sourceBody.querySelectorAll(".row-check:checked");
  // selected checked will be moved
  // const checked = sourceBody.querySelectorAll("#dataTable input[type='checkbox'][data-id]:checked");
  // if (!checked.length) return alert("No rows selected");

  const checked = sourceBody.querySelectorAll("#dataTable input[type='checkbox'][data-id]");
  if (!checked.length) return alert("No rows selected");

  checked.forEach(cb => {
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

    // extract values (skip checkbox column)
    const rowData = {
      //  id: cells[1].innerText,
      WorkGroup: cells[1].innerText,
      PACTStaff: cells[3].innerText,
      TimeCode: cells[4].innerText,
      ParentProject: cells[5].innerText,
      Period: cells[6].innerText,
      Hours: cells[7].innerText,
    };

    addRowToTarget(rowData);

    // remove from source
    tr.remove();
  });

  applyPagination();
  applyPaginationLiveRecords();
});

function addRowToTarget(data) {
  temprow.remove();
  const tr = targetBody.insertRow();

  tr.innerHTML = ` 
 
    <td>${data.WorkGroup}</td> 
    <td>${data.PACTStaff}</td>
    <td>${data.TimeCode}</td>
    <td>${data.ParentProject}</td>
    <td>${data.Period}</td>
    <td>${data.Hours}</td>
  `;

  thours.value = Number(thours.value) - Number(data.Hours);
  mkliveHours.value = Number(mkliveHours.value) + Number(data.Hours);
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
  { key: "Comments", type: "text" }
];

/* utility */
function getMaxId() {
  let max = 0;
  [...tbody.rows].forEach(r => {
    const idCell = r.cells[1];
    if (!idCell) {
      max = Math.max(max, 0);
      return max;
    }
    max = Math.max(max, parseInt(idCell.innerText) || 0);
  });
  return max;
}

/* add row (read mode) */
function ExaddRow({ id, WorkGroup, PACTStaff, TimeCode, ParentProject, Period, Hours }) {
  const tr = tbody.insertRow();
  tr.innerHTML = `
    <td><input type="checkbox" data-id="${id}"/></td>
    <td>${id}</td>
    <td>${WorkGroup}</td>
    <td>${PACTStaff}</td>
    <td>${TimeCode}</td>
     <td>${ParentProject}</td>
    <td>${Period}</td>
    <td>${Hours}</td>
    <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
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
function addRow({ WorkGroup, ID, PACTStaff, TimeCode, ParentProject, Period, Hours, Pass, PactID, Comments }) {
  console.log( ID, PACTStaff,  PactID);
  clearEmptyRows();
  const tr = tbody.insertRow();
  let nextId = getMaxId() + 1;
  tr.innerHTML = `
    <td><input type="checkbox" data-id="${WorkGroup}"/></td> 
    <td>${WorkGroup}</td>
    <td>${ID ? ID : nextId}</td>
    <td>${PACTStaff}</td>
     <td>${TimeCode}</td>
    <td>${ParentProject}</td>
    <td>${Period}</td>
    <td style="text-align:right;">${Hours}</td>
    <td><input class="form-check-input" type="checkbox" ${Pass ? 'checked' : ''} checkbox.checked ? "true" : "false"/></td>  
    <td>${PactID?PactID:''}</td>
    <td>${Comments ? Comments : ''}</td>
    <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
  thours.value = Number(thours.value) + Number(Hours);
}

function addOrUpdateRow(data,existingRow) {
    let tr;
   let Pass = true;
    if (existingRow) {
        // EDIT MODE
        tr = existingRow;
    } 
    tr.innerHTML = `
        <td><input type="checkbox" data-id="${data.WorkGroup}"/></td> 
    <td>${data.WorkGroup}</td>
    <td>${data.ID}</td>
    <td>${data.Name}</td>
     <td>${data.TimeCode}</td>
    <td>${data.ParentProject}</td>
    <td>${data.Period}</td>
    <td style="text-align:right;">${data.Hours}</td>
    <td><input class="form-check-input" type="checkbox" ${tr.cells[10].innerText ? 'checked' : ''} checkbox.checked ? "true" : "false"/></td>  
    <td>${tr.cells[9].innerText}</td>
    <td>${tr.cells[10].innerText}</td>
    <td>
      <button class="edit-btn"><img src="../images/pen-to-square-regular-full.svg" alt="edit" class="editjobcode" width="20"></button>
      <button class="delete-btn"><img src="../images/trash-can-regular-full.svg" width="20"></button>
      <button class="save-btn" style="display:none;background:none;"><img src="../images/square-check-regular-full.svg" width="20"></button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
    
  let diff =  Number(data.Hours) - Number(previousHours);
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


table.addEventListener("click", e => {
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
  document.getElementById('saveDataBtn').style.display = 'none';
  document.getElementById('wgupdateBtn').style.display = 'block';


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
  return Array.from(tr.cells).map(td => td.textContent.trim());
 }


 function openEditModal(row) {
      const data = getRowData(row);
      editingRow = row;
      //document.getElementById("rowId").value = data[2];
      document.getElementById("WorkGroup").value = data[1];
      document.getElementById("dpName").value =  data[2]+"|"+data[3]; 
      document.getElementById("TimeCode").value = data[4];
      document.getElementById("ParentProject").value = data[5];
      document.getElementById("Period").value = data[6];
      document.getElementById("Hours").value = data[7];
      document.getElementById('modalTitle').textContent = 'Edit Data';
      previousHours = data[7];
      openModal(); 
}


function handleDelete(tr) {
  if (!tr) return;

  if (confirm("Are you sure you want to delete this row?")) {
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
    if(col.key === "Hours" && i == 7){
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
table.addEventListener("paste", e => {
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

  rows.forEach(line => {
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

  return rows.filter(row => {
    const checkbox = row.cells[8]?.querySelector("input[type='checkbox']");
    return checkbox && checkbox.checked;
  });
}


function applyPagination() {
  //const targetBody = table.querySelector("tbody");
  let filtered;
  const rows = [...tbody.rows];
  const searchText = document.getElementById("wgsearchBoxtwo").value.toLowerCase();

  // filter rows
   
  filtered = rows.filter(row =>
    row.innerText.toLowerCase().includes(searchText)
  );

  if (isPassedBtnClicked) {
    filtered = rows.filter(row =>
      row.innerText.toLowerCase().includes(searchText) &&
      row.cells[8]?.querySelector("input")?.checked
    );
  }

  if (isFailedBtnClicked) {
    filtered = rows.filter(row =>
      row.innerText.toLowerCase().includes(searchText) &&
      !row.cells[8]?.querySelector("input")?.checked
    );
  }



  const totalRows = filtered.length;
  const size = pageSize === "all" ? totalRows : pageSize;
  const totalPages = Math.ceil(totalRows / size);

  // bounds check
  if (currentPage > totalPages) currentPage = totalPages || 1;

  rows.forEach(r => (r.style.display = "none"));

  filtered.forEach((row, index) => {
    if (
      pageSize === "all" ||
      (index >= (currentPage - 1) * size &&
        index < currentPage * size)
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

  // « First
  container.appendChild(
    createPageItem("First", currentPage === 1, () => {
      currentPage = 1;
      applyPagination();
    })
  );

  // ‹ Previous
  container.appendChild(
    createPageItem("Previous", currentPage === 1, () => {
      currentPage--;
      applyPagination();
    })
  );

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(
      createPageItem(
        i,
        false,
        () => {
          currentPage = i;
          applyPagination();
        },
        i === currentPage
      )
    );
  }

  // Next ›
  container.appendChild(
    createPageItem("Next", currentPage === totalPages, () => {
      currentPage++;
      applyPagination();
    })
  );

  // Last »
  container.appendChild(
    createPageItem("Last", currentPage === totalPages, () => {
      currentPage = totalPages;
      applyPagination();
    })
  );
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


document.getElementById("wgsearchBox").addEventListener("change", () => {
  currentPage = 1;
  applyPagination();
});

// document.getElementById("wgsearchBoxtwo").addEventListener("change", (e) => {
//    const selectedValue = e.target.value;
//   currentPage = 1;
//   applyPagination();

//   // if (e.target.id === "txtsearchBox") {
//   //   currentPage = 1;
//   //   applyPagination();
//   // }

// });

document.addEventListener("change", e => {
  if (e.target.id === "wgsearchBoxtwo") {
    currentPage = 1;
    applyPagination();
  }
});


document.addEventListener("input", e => {
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


document.getElementById("pageSize").addEventListener("change", e => {
  pageSize = e.target.value === "all"
    ? "all"
    : parseInt(e.target.value, 10);

  currentPage = 1;
  applyPagination();
});


document.getElementById("pageSizeliverecords").addEventListener("change", e => {
  pageSizeliverecords = e.target.value === "all"
    ? "all"
    : parseInt(e.target.value, 10);

  currentPagetwo = 1;
  applyPaginationLiveRecords();
});





//Pagination for Live record


function applyPaginationLiveRecords() {
  //const targetBody = table.querySelector("tbody");
  let tmprow;
  const rows = [...targetBody.rows];
  //const searchText = document.getElementById("txtsearchBoxliverecords").value.toLowerCase();

  // filter rows
  // const filtered = rows.filter(row =>
  //   row.innerText.toLowerCase().includes(searchText)
  // );

  const filtered = rows;

  const totalRows = filtered.length;
  const size = pageSizeliverecords === "all" ? totalRows : pageSizeliverecords;
  const totalPages = Math.ceil(totalRows / size);

  // bounds check
  if (currentPagetwo > totalPages) currentPagetwo = totalPages || 1;

  rows.forEach(r => (r.style.display = "none"));

  filtered.forEach((row, index) => {
    if (
      pageSizeliverecords === "all" ||
      (index >= (currentPagetwo - 1) * size &&
        index < currentPagetwo * size)
    ) {
      row.style.display = "";
    }
  });


  // let tmp = table.querySelector('tbody')
  if (rows.length == 0 && currentPagetwo == 1) {
    tmprow = sourceBody.insertRow();
    tmprow.innerHTML = `<td colspan="9" class="norecords">No record found</td>`
  }



  renderPaginationLiveRecords(totalPages);
}


function renderPaginationLiveRecords(totalPages) {
  const container = document.getElementById("paginationliverecords");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  // « First
  container.appendChild(
    createPageItem("First", currentPagetwo === 1, () => {
      currentPagetwo = 1;
      applyPaginationLiveRecords();
    })
  );

  // ‹ Previous
  container.appendChild(
    createPageItem("Previous", currentPagetwo === 1, () => {
      currentPagetwo--;
      applyPaginationLiveRecords();
    })
  );

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(
      createPageItem(
        i,
        false,
        () => {
          currentPagetwo = i;
          applyPaginationLiveRecords();
        },
        i === currentPagetwo
      )
    );
  }

  // Next ›
  container.appendChild(
    createPageItem("Next", currentPagetwo === totalPages, () => {
      currentPagetwo++;
      applyPaginationLiveRecords();
    })
  );

  // Last »
  container.appendChild(
    createPageItem("Last", currentPagetwo === totalPages, () => {
      currentPagetwo = totalPages;
      applyPaginationLiveRecords();
    })
  );
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


document.getElementById("csvInput").addEventListener("change", e => {
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
});


function readExcelWithXLSX(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: ""
    });

    importRows(rows); // YOUR EXISTING FUNCTION
  };

  reader.readAsArrayBuffer(file);
}


function clearTableBody() {
  tbody.querySelectorAll("tr").forEach(tr => tr.remove());
  thours.value = 0;
}


function clearEmptyRows(){
  tbody.querySelectorAll("tr").forEach(tr => {
    const cells = Array.from(tr.cells);

    const isEmpty = cells.every(td => td.textContent.trim() === "");

    if (isEmpty) {
        tr.remove();
    }
  });

}


function importRows(rows) {
  if (!rows || rows.length <= 1) return;

  // remove "No record" row if exists
  const noRecord = targetBody.querySelector("td.norecord");
  if (noRecord) noRecord.closest("tr").remove();

  const hasExcelId = !isNaN(rows[1][0]);
  let startId = getMaxId() + 1;
  // tmprow.remove();
  // tmprow.remove();
  [...sourceBody.rows].forEach(row => {
    const hasContent = [...row.cells].some(
      cell => cell.textContent.trim() !== ''
    );

    if (!hasContent) {
      row.remove();
    }
  });

  clearTableBody();
  // skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    if (!cols || cols.every(v => v === "")) continue;
    //WorkGroup	ID	Name	TimeCode	ParentProject	Period	Hours	Pass	PactID
    const excelId = hasExcelId ? Number(cols[0]) : null;
    const existingRow = excelId ? findRowById(excelId) : null;

    if (existingRow) {
      updateCell(existingRow, "WorkGroup", cols[hasExcelId ? 1 : 0]);
      updateCell(existingRow, "ID", cols[hasExcelId ? 2 : 1]);
      updateCell(existingRow, "Name", cols[hasExcelId ? 3 : 2]);
      updateCell(existingRow, "TimeCode", cols[hasExcelId ? 4 : 3]);
      updateCell(existingRow, "ParentProject", cols[hasExcelId ? 5 : 4]);
      updateCell(existingRow, "Period", cols[hasExcelId ? 6 : 5]);
      updateCell(existingRow, "Hours", cols[hasExcelId ? 7 : 6]);
      updateCell(existingRow, "Pass", cols[hasExcelId ? 8 : 7]);
      updateCell(existingRow, "PactID", cols[hasExcelId ? 9 : 8]);
      updateCell(existingRow, "Comments", cols[hasExcelId ? 10 : 9]);

    } else {
      const isAllFilled = cols.slice(0, 7).every(v => v !== undefined && v !== null && v.toString().trim() !== "");
      const checkedAttr = isAllFilled ? "checked" : "";
      const tr = tbody.insertRow();
      tr.innerHTML = `
        <td><input type="checkbox" data-id="${cols[0]}"/></td>   
      <td>${cols[0] || ""}</td>
      <td>${cols[1] || ""}</td>
      <td>${cols[2] || ""}</td>
      <td>${cols[3] || ""}</td>
      <td>${cols[4] || ""}</td>
      <td>${cols[5] || ""}</td>
      <td>${cols[6] || ""}</td>
      <td><input class="form-check-input" type="checkbox" ${(cols[7] == 'false' || cols[7] == '') ? '' : 'checked'} checkbox.checked ? "true" : "false"/></td>
    <!--  <td><input class="form-check-input" type="checkbox" ${checkedAttr} data-value="${isAllFilled ? 'true' : 'false'}"/></td>-->
     
      <td>${cols[8] || ""}</td>
      <td>${cols[9] || ""}</td> 
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
    thours.value = Number(thours.value) + Number(cols[6]);
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
}


function onClickFailed() {
  isPassedBtnClicked = false;
  isFailedBtnClicked = true;
  currentPage = 1;
  applyPagination();
}


function onClickAllBtn() {
  isPassedBtnClicked = false;
  isFailedBtnClicked = false;
  currentPage = 1;
  applyPagination();
}


document.getElementById('allBtn').addEventListener('click',onClickAllBtn);
document.getElementById('failedBtn').addEventListener('click',onClickFailed);
document.getElementById('passedBtn').addEventListener('click',onClickPassed);

function onClickValidate() {
  //   [...sourceBody.rows].forEach(row => {
  //     [...row.cells].forEach(cell => {
  //         if (cell.textContent.trim() === '') {
  //             cell.textContent = 'Required';
  //             cell.classList.add('error-cell');
  //         }
  //     });
  // });

  [...sourceBody.rows].forEach(row => {
    const cells = row.cells;
    let errors = [];

    // 4th TD: checkbox unchecked
    // const checkbox = cells[8].querySelector('input[type="checkbox"]');
    // if (checkbox && !checkbox.checked) {
    //   errors.push('Pass is not checked');
    // }

    //1st TD
    if (cells[1].textContent.trim() === '') {
      errors.push('The work group name is blank');
    }

    //2nd TD
    if (cells[2].textContent.trim() == "9999") {
      errors.push(`This staff ID not in this WG: ${cells[2].textContent.trim()}`);
    }

    if (cells[2].textContent.trim() == "") {
      errors.push('This staff ID is blank');
    }

    if (cells[5].textContent.trim() === 'TG999') {
      errors.push(`Not valid timecode/Project/WG combination:${cells[5].textContent.trim()},${cells[4].textContent.trim()},${cells[1].textContent.trim()}`);
    }
    //Not valid timecode/Project/WG combination:  
    if (cells[7].textContent.trim() === '') {
      errors.push('The hours field is not a number');
    }

    // 5th TD: empty
    // if (cells[9].textContent.trim() === '') {
    //   errors.push('Pact ID is empty');
    // }

    // 6th TD: show combined message
    if (errors.length > 0) {
      cells[10].textContent = errors.join(' and ');
      cells[10].classList.add('error-cell');
    } else {
      cells[8].querySelector("input").checked = true;
      cells[10].textContent = '';
      cells[10].classList.remove('error-cell');
    }
  });

}


document.getElementById('validateBtn').addEventListener('click', onClickValidate);


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
    "ID",
    "Name",
    "TimeCode",
    "ParentProject",
    "Period",
    "Hours",
    "Pass",
    "PactID",
    "Comments",
  ]);

  // Table body
  table.querySelectorAll("tbody tr").forEach(el => {
    // skip "No record" row
    if (el.querySelector(".norecord")) return;

    const tds = el.querySelectorAll("td");

    rows.push([
      tds[1].innerText.trim(), // ID (0 is checkbox)
      tds[2].innerText.trim(),
      tds[3].innerText.trim(),
      tds[4].innerText.trim(),
      tds[5].innerText.trim(),
      tds[6].innerText.trim(),
      tds[7].innerText.trim(),
      tds[8].querySelector("input[type='checkbox']").checked.toString(),
      tds[9].innerText?.trim(),
      tds[10].innerText.trim()
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
  return [...tbody.querySelectorAll("tr")].find(tr => {
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

document.getElementById("btnClearsearch").addEventListener("click", () => {
      document.getElementById("wgsearchBox").value = "";
      document.getElementById("wgsearchBoxtwo").value = "";
      document.getElementById("staffsearchBox").value = "";
      document.getElementById("tcsearchBox").value = "";
      document.getElementById("ppsearchBox").value = "";
      document.getElementById("txtstaffsearchBox").value = "--select--";
      document.getElementById("prsearchBoxtwo").value = "";
});


function handleAdd() {
  // isAddMode = true;
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

document.getElementById("dpName").addEventListener("change", function (e) {
  const selectedValue = e.target.value;
  // document.getElementById("PACTStaff").value = selectedValue?.split("|")[0];
  pactStaffID = selectedValue?.split("|")[0];
  pactStaffName = selectedValue?.split("|")[1];

  pactID = generateRandomNumber();
});

function addData() {
  //WorkGroup, ID, PACTStaff, TimeCode, ParentProject, Period, Hours, Pass, PactID, Comments

  addRow({
    WorkGroup: document.getElementById("WorkGroup").value,
    ID: pactStaffID,
    PACTStaff: pactStaffName,
    TimeCode: document.getElementById("TimeCode").value,
    ParentProject: document.getElementById("ParentProject").value,
    Period: document.getElementById("Period").value,
    Hours: document.getElementById("Hours").value,
    PactID: pactID,
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

document.addEventListener('DOMContentLoaded', function () {
  applyPagination();
  applyPaginationLiveRecords();
});
