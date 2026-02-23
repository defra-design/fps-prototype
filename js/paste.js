const table = document.getElementById("dataTable");
const tbody = table.querySelector("tbody");
const sourceBody = table.querySelector("tbody");

const targetBody = document.getElementById("selectedTable").querySelector("tbody");
let temprow = targetBody.insertRow(); 
temprow.innerHTML = `<td colspan="7" class="norecords">No record found</td>` 
  
let currentPage = 1;
let pageSize = 10;

let currentPagetwo = 1;
let pageSizeliverecords = 10;

document.getElementById("moveBtn").addEventListener("click", () => {

  //const checked = sourceBody.querySelectorAll(".row-check:checked");
  const checked = sourceBody.querySelectorAll("#dataTable input[type='checkbox']:checked");
  if (!checked.length) return alert("No rows selected");

  checked.forEach(cb => {
    const tr = cb.closest("tr");

    const cells = tr.cells;

    // extract values (skip checkbox column)
    const rowData = {
      id: cells[1].innerText,
      WorkGroup: cells[2].innerText,
      PACTStaff: cells[3].innerText,
      TimeCode: cells[4].innerText,
      ParentProject: cells[5].innerText,
      Period: cells[6].innerText,
      Hours: cells[7].innerText
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
    <td>${data.id}</td>
    <td>${data.WorkGroup}</td>
    <td>${data.PACTStaff}</td>
    <td>${data.TimeCode}</td>
    <td>${data.ParentProject}</td>
    <td>${data.Period}</td>
    <td>${data.Hours}</td>
  `;
}


/* column configuration */
const columns = [
    { key: "select", type: "checkbox" }, 
  { key: "id", type: "id" },
  { key: "WorkGroup", type: "text" },
  { key: "PACTStaff", type: "text" },
  { key: "TimeCode", type: "text" },
  { key: "ParentProject", type: "text" },
  { key: "Period", type: "number" },
  { key: "Hours", type: "number" }
];

/* utility */
function getMaxId() {
  let max = 0;
  [...tbody.rows].forEach(r => {
     const idCell = r.cells[1];
     if(!idCell){
      max = Math.max(max, 0);
      return max;
     }
    max = Math.max(max, parseInt(idCell.innerText) || 0);
  });
  return max;
}

/* add row (read mode) */
function addRow({ id, WorkGroup, PACTStaff, TimeCode,ParentProject,Period,Hours }) {
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
      <button class="save-btn" style="display:none">Save</button>
      <button class="cancel-btn" style="display:none">Cancel</button>
    </td>
  `;
}

/* edit / save / cancel */
table.addEventListener("click", e => {
  const tr = e.target.closest("tr");
  if (!tr) return;

  if (e.target.classList.contains("edit-btn")) enterEdit(tr);
  if (e.target.classList.contains("delete-btn")) handleDelete(tr);
  if (e.target.classList.contains("save-btn")) saveEdit(tr);
  if (e.target.classList.contains("cancel-btn")) cancelEdit(tr);
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
  columns.forEach((col, i) => {
    if (col.type === "checkbox" || col.type === "id") return;

    const td = tr.cells[i];
    td.dataset.old = td.innerText;

    td.innerHTML =
      col.type === "number"
        ? `<input type="number" value="${td.innerText}">`
        : `<input type="text" value="${td.innerText}">`;
  });

  toggleButtons(tr, true);
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

    addRow({
      id: nextId++,
      WorkGroup:      cols[start]     || "",
      PACTStaff:      cols[start + 1] || "",
      TimeCode:       cols[start + 2] || "",
      ParentProject:  cols[start + 3] || "",
      Period:         cols[start + 4] || "",
      Hours:          cols[start + 5] || ""
    });

  });

  applyPagination();
});

/* initial data */
addRow({ id: 1, WorkGroup: "DDDLTBU", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"11", Hours:"10" });
addRow({ id: 2, WorkGroup: "QWQWBAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 3, WorkGroup: "BAC2", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 4, WorkGroup: "BAC5", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 5, WorkGroup: "BDU", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 6, WorkGroup: "CPD", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 7, WorkGroup: "BAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 8, WorkGroup: "BAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 9, WorkGroup: "CSCC", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 10, WorkGroup: "BM1", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 11, WorkGroup: "BAC64", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 12, WorkGroup: "BAC14", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 13, WorkGroup: "BAC84", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 14, WorkGroup: "BAC94", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 15, WorkGroup: "BAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 16, WorkGroup: "BAC64", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 17, WorkGroup: "BAC24", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 18, WorkGroup: "BAC44", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 19, WorkGroup: "BAC34", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 20, WorkGroup: "BAC34", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 21, WorkGroup: "BAC14", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 22, WorkGroup: "BAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 23, WorkGroup: "LTBU", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 24, WorkGroup: "BAC4", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });
// addRow({ id: 25, WorkGroup: "CSCC", PACTStaff: "10626", TimeCode: "ZT0015", ParentProject:"ZTwork", Period:"21", Hours:"14" });

function applyPagination() {
  //const targetBody = table.querySelector("tbody");
  let tmprow;
  const rows = [...tbody.rows];
  const searchText = document.getElementById("txtsearchBox").value.toLowerCase();

  // filter rows
  const filtered = rows.filter(row =>
    row.innerText.toLowerCase().includes(searchText)
  );
  


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
 if(rows.length == 0 && currentPage == 1){ 
  tmprow = sourceBody.insertRow();
  tmprow.innerHTML = `<td colspan="9" class="norecords">No record found</td>` 
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


// document.getElementById("searchBox").addEventListener("input", () => {
//   currentPage = 1;
//   applyPagination();
// });


document.addEventListener("input", e => {
  if (e.target.id === "txtsearchBox") {
    currentPage = 1;
    applyPagination();
  }
});


document.addEventListener("input", e => {
  if (e.target.id === "txtsearchBoxliverecords") {
    currentPagetwo = 1;
    applyPaginationLiveRecords();
  }
});


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
  const searchText = document.getElementById("txtsearchBoxliverecords").value.toLowerCase();

  // filter rows
  const filtered = rows.filter(row =>
    row.innerText.toLowerCase().includes(searchText)
  );
  


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
 if(rows.length == 0 && currentPagetwo == 1){ 
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






document.addEventListener('DOMContentLoaded',function(){
applyPagination();
applyPaginationLiveRecords();
});
 