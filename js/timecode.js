const timecodemodal = document.getElementById("timecodeModal");
const transferTimecodeModal = document.getElementById("transferTimecodeModal");
let selectedTCRowjobcode = null;
let selectedTCRowdatasetID = null;
let timecodedata = [
  { id: 1, jobcode: "AH003308", isactive: "true", workGroup: "CIT" },
  { id: 2, jobcode: "AH003308", isactive: "true", workGroup: "CSCC" },
  { id: 3, jobcode: "AH003308", isactive: "true", workGroup: "CSCE" },
  { id: 4, jobcode: "AH003308", isactive: "true", workGroup: "CSCW" },
  { id: 5, jobcode: "AH003308", isactive: "true", workGroup: "EUExit" },
  { id: 6, jobcode: "AH003308", isactive: "true", workGroup: "Operations" },
  { id: 7, jobcode: "AH003308", isactive: "true", workGroup: "PHINSLT" },
  { id: 8, jobcode: "AH003308", isactive: "true", workGroup: "PHSISW" },
  { id: 9, jobcode: "AH003308", isactive: "true", workGroup: "PHSI-WCS" },
  { id: 10, jobcode: "AH003308", isactive: "true", workGroup: "ROMD" },
  { id: 11, jobcode: "AH003308", isactive: "true", workGroup: "RONT" },
  { id: 12, jobcode: "AH003308", isactive: "true", workGroup: "ROSC" },
  { id: 13, jobcode: "AH003308", isactive: "true", workGroup: "ROSW" },
  { id: 14, jobcode: "AH003308", isactive: "true", workGroup: "ROWA" },
  { id: 15, jobcode: "AH003308", isactive: "true", workGroup: "SVCA" },
];

let newtimecode = [];
let jobcodelist = [];
let selectedRowTC = null;
let selectedWG = [];

let currentPg = 1;
let recordsPerPg = 10;
//let filteredTcData = [...timecodedata];

let editingTcRow = null;
let isAddTCModal = false;
let timecodeTable = [];
let selectedjobcodeIdx = null;
let refjobcodebeforecopy = null;

function getTimecodeData(isrowclicked = null) {
selectedjobcodeIdx = testData.findIndex((x) => x.jobcode === isrowclicked); //?.timecode || [];
  if (selectedjobcodeIdx != -1) {
    timecodeTable = testData[selectedjobcodeIdx].timecode || [];
  }

  return timecodeTable;
}

let timecodelist = getTimecodeData(refjobcodebeforecopy);
let filteredTcData = [...timecodelist];
// Render table
function renderTimeCodeTable(isrowclicked = null,wgdata = null) {
  refjobcodebeforecopy = isrowclicked;
  const tcbody = document.getElementById("timejobtabletableBody");
  const startIndex = (currentPg - 1) * recordsPerPg;
  const endIndex = startIndex + recordsPerPg;
   timecodeTable = wgdata !== null ? wgdata : getTimecodeData(isrowclicked).slice(startIndex, endIndex);
//   selectedjobcodeIdx = timecodeTable.findIndex((x) => x.jobcode === isrowclicked); //?.timecode || [];
//   if (selectedjobcodeIdx != -1) {
//     timecodeTable = testData[selectedjobcodeIdx].timecode || [];
//   }
  tcbody.innerHTML = "";
  if (timecodeTable.length == 0) {
    const row = document.createElement("tr");
     row.classList.add('govuk-table__row');

    row.innerHTML = `<td colspan="7" class="norecords">No record found</td>`;
    tcbody.appendChild(row);
    return;
  }
  timecodeTable.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add('govuk-table__row');

    row.innerHTML = `
            <td class="editable-cell" data-field="workgroup">
             <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
              <div class="govuk-checkboxes__item" style="text-align:'center'">
            <input type='checkbox' onclick="event.stopPropagation()" class="govuk-checkboxes__input timecodeCheckbox" data-id='${JSON.stringify(item)}' id="checkbox${item.id}" name="checkbox${item.id}" />
             <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="checkbox${item.id}" style="padding: 0;">  </label>   
            </div></div>
            </td>
            <td class="editable-cell" data-field="workgroup" data-id="${item.workGroup}">${item.workGroup}</td>
            <td class="editable-cell" data-field="name" data-id="${item.id}" style="text-align:center"> 
              <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
              <div class="govuk-checkboxes__item">
                                                
                <input class="govuk-checkboxes__input" id="selectRow${item.id}" type="checkbox" ${item.isactive ? "checked" : ""} disabled/>
                  <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${item.id}" style="padding: 0;">  </label>   
                </div>
              
              </div>
            </td>

            <td class="tdjobcode editable-cell" data-field="jobcode" data-id="${item.id}">${item.jobcode}</td>
                    
            <td style="text-align:center">
                <button  onclick='handleTimeCodeEdit(${JSON.stringify(item)})'><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editjobcode"
                                                                                  width="20"></button>
                <button  aria-label="Delete" onclick="handleDeleteTimecode(${item.id})"> <img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                  width="20"></button>
            </td>
        `;
    tcbody.appendChild(row);
    // if (isrowclicked) {
    row.addEventListener("click", function () {
      onclickRowNewTC(this);
    });
    // }
  });
  renderTimecodePagination();
  // Add inline editing functionality
  // addInlineEditingListeners();
}

document
  .getElementById("recordsPerPg")
  .addEventListener("change", handlerecordsPerPgChange);
document
  .getElementById("txtSearchTimeCode")
  .addEventListener("input", handleSearch);

// Handle records per page change
function handlerecordsPerPgChange(e) {
  let currentjobcode = document.getElementById("dpjobcode").value;
  getTimecodeData(currentjobcode);
  recordsPerPg = parseInt(e.target.value);
  currentPg = 1;
  renderTimeCodeTable();

 // renderTimecodePagination();
}

// Handle search
function handleSearch(e) {
  const searchtxt = e.target.value.toLowerCase();
  timecodeTable = timecodeTable.filter(
    (item) =>
      item.jobcode.toLowerCase().includes(searchtxt) ||
      item.isactive.toLowerCase().includes(searchtxt) ||
      item.workGroup.toLowerCase().includes(searchtxt),
  );
  currentPg = 1;
  renderTimeCodeTable();
  renderTimecodePagination();
}

function onclickRowNewTC(obj) {
  selectedRowTC = obj;
  selectedTCRowjobcode = obj.cells[3].innerText.trim();
  selectedTCRowdatasetID = Number(obj.cells[3].dataset.id.trim());
  renderTimeCodeTable(selectedTCRowjobcode);
      currentPg = 1;
  let select = document.getElementById("recordsPerPage");
  handlerecordsPerPgChange({ target: select });
}

function handleAdd() {
  isAddTCModal = true;

  document.getElementById("timecodeModalLabel").textContent = "Add Work Group";
  document.getElementById("dpjobcode").value = selectedRowjobcode;
  document.getElementById("dpworkgroup").value = "";
  // document.getElementById('descriptionInput').value = '';
  openTCModal();
  // document.getElementById('testModal').style.display = 'block';
  //   document.getElementById("testModal").classList.toggle("show");
  // const modal = new bootstrap.Modal(document.getElementById('testModal'));
  // modal.show();
}

function handleCopyModalTCForJobcode() {
  testData.forEach((item) => {
    let idx = jobcodelist.findIndex((el) => el.tcjobcode === item.jobcode);
    if (idx == -1) {
      jobcodelist.push({ tcjobcode: item.jobcode });
    }
  });

  populateSelect(dpTargetJobcode, jobcodelist, "tcjobcode", "tcjobcode");
  openCopyTCModal();
}

let jobidx = null;
let selectedJobcode = null;
document
  .getElementById("dpTargetJobcode")
  .addEventListener("change", function (e) {
    selectedJobcode = e.target.value;

    selectedWG.forEach((el) => {
      el.jobcode = selectedJobcode;
    });
  });

function updateCode(selectedId, productlist) {
  testData = testData.map((item) =>
    item.jobcode === selectedId
      ? { ...item, timecode: [...productlist] }
      : item,
  );
}

function handleSaveCopyTCForJobcode() {
  if (selectedWG.length == 0) {
    alert("Please select at least one Job code to copy Work Group");
    return;
  }

  updateCode(selectedJobcode, selectedWG);
  //const targetjobcode = document.getElementById("dpTargetJobcode").value;

  //let idx = jobidx;
  //   let idx = testData.findIndex((item) => item.jobcode === selectedJobcode);
  //   //selectedWG.forEach(el => {    el.jobcode = selectedJobcode; })

  //   if (idx != -1) {
  //     if (!testData[idx]["timecode"]) {
  //          testData[idx]["timecode"] = [...selectedWG];

  // //       testData = testData.map((item, index) =>
  // //   index === idx
  // //     ? { ...item, timecode: [...selectedWG] }
  // //     : item
  // //     );
  //     console.log( testData.map(x => x.timecode));

  //     }
  //   }

  filteredData = [...testData];
 
  getTimecodeData(selectedJobcode);
  document.getElementById("selectAllTC").checked = false;
  closeCopyTCModal();
  const index = testData.findIndex(el => el.jobcode === selectedJobcode);
  currentPage = Math.floor(index / recordsPerPage) + 1;
  renderTable();
  renderPagination();
  selectParentByCode(selectedJobcode);
  renderTimeCodeTable(selectedJobcode);
  selectedJobcode = null;
  
}

function handleDeleteAllTC() {

    //  testData.findIndex((item) => {
    //   if (item.jobcode === selectedTCRowjobcode) {
    //     let tcIndex = item.timecode.findIndex((tc) => tc.id === id);
    //     if (tcIndex != -1) {
    //       item.timecode.splice(tcIndex, 1);
    //     }
    //   }
    // });

     
    // renderTimeCodeTable();
    // renderTimecodePagination();

  if (confirm("Are you sure you want to delete selected Work Group?")) {
    const selectedIds = selectedWG.map(item => item.id);
    
    selectedWG.forEach((el) => {
      let idx = testData.findIndex((item) => item.jobcode === el.jobcode);
      if (idx != -1 && testData[idx].timecode) {
         let tcIndex = testData[idx].timecode.findIndex((tc) => tc.id === el.id);
          if (tcIndex != -1) {
            testData[idx].timecode.splice(tcIndex, 1);
          }
        // testData[idx].timecode = testData[idx].timecode.filter(
        //   (tc) => !selectedIds.includes(tc.id)
        // );
      }
    });
    
    selectedWG = [];
    document.getElementById("selectAllTC").checked = false;
    renderTable();
    renderTimeCodeTable(selectedJobcode);
    getTimecodeData(selectedJobcode);

    //  let tcIndex = item.timecode.findIndex((tc) => tc.id === id);
    //     if (tcIndex != -1) {
    //       item.timecode.splice(tcIndex, 1);
    //     }

    
  }
}

document.getElementById("addTimecodeBtn").addEventListener("click", handleAdd);
document
  .getElementById("modaltcsaveBtn")
  .addEventListener("click", handleSaveTimecode);
document
  .getElementById("transferTimecodeBtn")
  .addEventListener("click", handleCopyModalTCForJobcode);
document
  .getElementById("modalCopyTCsaveBtn")
  .addEventListener("click", handleSaveCopyTCForJobcode);
document
  .getElementById("deleteAllTCBtn")
  .addEventListener("click", handleDeleteAllTC);

// function closeTCModal(){
//    //  document.getElementById('testModal').style.display = 'none';
//        document.getElementById("testModal").classList.toggle("show");
// }

// Handle edit
function handleTimeCodeEdit(selecteditem) {
  const itemIndex = testData.findIndex(
    (item) => item.jobcode === selecteditem.jobcode,
  );
  if (itemIndex === -1) return;
  let tcIndex = testData[itemIndex].timecode.findIndex(
    (item) => item.jobcode === selecteditem.jobcode,
  );
  if (tcIndex === -1) return;

  isAddTCModal = false;
  editingTcRow = selecteditem.id;
  // let tcstatus = selecteditem.isactive == "true" ? true : false;
  document.getElementById("timecodeModalLabel").textContent = "Edit Work Group";
  document.getElementById("dpjobcode").value = selecteditem.jobcode;
  document.getElementById("chktimecodestatus").checked = selecteditem.isactive;
  //  document.getElementById('modal-type').value = item.type;
  document.getElementById("dpworkgroup").value = selecteditem.workGroup;

  openTCModal();
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

function handleDeleteTimecode(id) {
  if (confirm("Are you sure you want to delete this Work Group?")) {
    testData.findIndex((item) => {
      if (item.jobcode === selectedTCRowjobcode) {
        let tcIndex = item.timecode.findIndex((tc) => tc.id === id);
        if (tcIndex != -1) {
          item.timecode.splice(tcIndex, 1);
        }
      }
    });

    // timecodedata = timecodedata.filter(item => item.id !== id);

    // // Update filtered data
    // const searchTermtc = document.getElementById('txtSearchTimeCode').value.toLowerCase();
    // filteredTcData = timecodedata.filter(item =>
    //     item.jobcode.toLowerCase().includes(searchTermtc) ||
    //     item.isactive.toLowerCase().includes(searchTermtc) ||
    //     item.workGroup.toLowerCase().includes(searchTermtc)
    // );

    renderTimeCodeTable();
    renderTimecodePagination();
    sortTableWorkgroup("workGroup", "asc");
  }
}

function replaceJobcodeWhileEditTimecode(id) {
  testData.findIndex((item) => {
    if (item.jobcode === selectedTCRowjobcode) {
      let tcIndex = item.timecode.findIndex((tc) => tc.id === id);
      if (tcIndex != -1) {
        item.timecode.splice(tcIndex, 1);
      }
    }
  });

  renderTimeCodeTable();
  renderTimecodePagination();
}

function openTCModal() {
  timecodemodal.classList.add("show");
}

function closeTCModal() {
  timecodemodal.classList.remove("show");
}

function openCopyTCModal() {
  transferTimecodeModal.classList.add("show");
}

function closeCopyTCModal() {
  transferTimecodeModal.classList.remove("show");
}

function addWorkGroupForCopiedJobCode(jobcode, wg) {
  // THIS SECTION IS TO GENERATE UNIQUE ID FOR NEWLY ADDED TIME CODE RECORDS IN CASE OF SAME JOB CODE.
  const allIds = testData.flatMap((obj) => obj.timecode.map((item) => item.id));

  let maxId = allIds.length ? Math.max(...allIds) : 0;

  // THIS SECTION ENDS HERE.
  //  const newId = Math.max(...timecodedata.map(item => item.id)) + 1;
  //     timecodedata.push({
  //         id: newId,
  //         jobcode: jobcode,
  //         isactive: true,
  //         workGroup: wg
  //     });

  // renderTimeCodeTable();
  // renderTimecodePagination();
  // renderTable();

  const tcId = testData.length > 0 ? testData.length + 1 : 1; //Math.max(...newtimecode.map(item => item)) + 1;
  let idx = testData.findIndex((el) => el.jobcode == refjobcodebeforecopy);
  // testData[idx]
  //  let copiedArray = testData[idx].timecode.map(item => ({ ...item }))

  const newArray = (testData[idx]?.timecode || []).map((item) => ({
    ...item,
    id: ++maxId,
  }));

  if (idx != -1) {
    if (!testData[idx]["timecode"]) {
      testData[idx]["timecode"] = testData[idx]["timecode"] || [];
    }
    //testData[idx]["timecode"] = [];
    // testData[idx]["timecode"].push({
    //     id: newId,
    //     jobcode: jobcode,
    //     isactive: chktimecode,
    //     workGroup: wg
    // });

    testData[idx]["timecode"].unshift(...newArray);
  }
}

// Handle save
function handleSaveTimecode() {
  const jobcode = document.getElementById("dpjobcode").value;
  const chktimecode = document.getElementById("chktimecodestatus").checked;
  const workGroup = document.getElementById("dpworkgroup").value;

  if (!jobcode || !workGroup) {
    alert("Please fill in all required fields");
    return;
  }
  // { id: 1, jobcode: 'AH003308', isactive: 'true', workGroup: 'CIT' },
  // { id: 1, jobcode: 'AH003300', name: 'Avian influenza serology', type:"Work", workGroup: 'Wilelife' },
  if (isAddTCModal) {
    // const newId = newtimecode.length > 0 ? newtimecode.length + 1 : 1; //Math.max(...newtimecode.map(item => item)) + 1;
    // newtimecode.push({
    //     id: newId,
    //     jobcode: jobcode,
    //     isactive: chktimecode,
    //     workGroup: workGroup
    // });
    // { id: 1, jobcode: 'AH003308', isactive: 'true', workGroup: 'CIT' },
    // const newId = testData.length > 0 ? testData.length + 1 : 1; //Math.max(...newtimecode.map(item => item)) + 1;
    let idx = testData.findIndex((el) => el.jobcode == jobcode);
    if (idx != -1) {
      if (!testData[idx]["timecode"]) {
        testData[idx]["timecode"] = [];
      }

      const newId =
        testData[idx]["timecode"].length > 0
          ? testData[idx]["timecode"].length + 1
          : 1;
      //testData[idx]["timecode"] = [];

      let iswgExist = testData[idx]["timecode"].some(
        (item) => item.workGroup.toLowerCase() === workGroup.toLowerCase(),
      );
      if(iswgExist){
        alert("This Work Group already exists for the selected Job code, please enter different Work Group");
        return;
      }
      testData[idx]["timecode"].unshift({
        id: newId,
        jobcode: jobcode,
        isactive: chktimecode,
        workGroup: workGroup,
      });
    }
    sortTableWorkgroup("workGroup", "asc");
    // testData.push({
    //     id: newId,
    //     jobcode: jobcode,
    //     isactive: chktimecode,
    //     workGroup: workGroup
    // });
  } else {
    let idx = testData.findIndex((el) => el.jobcode == jobcode);
    if (idx != -1) {
      // let tcarray = testData[idx].timecode[0];

      let tcIndex = testData[idx]?.timecode?.findIndex(
        (item) => item.id === editingTcRow,
      );
      if (tcIndex === -1 || tcIndex == undefined) {
        //regular push if new job code is selected for existing job code from edit modal popup
        // const newId = 1;
        testData[idx]["timecode"] == undefined
          ? (testData[idx]["timecode"] = [])
          : testData[idx]["timecode"];
        //testData[idx]["timecode"] = [];
        const newId =
          testData[idx]["timecode"].length > 0
            ? testData[idx]["timecode"].length + 1
            : 1;

        let iswgExist = testData[idx]["timecode"].some(
          (item) =>
            item.workGroup.toLowerCase() === workGroup.toLowerCase(),
        );
        if (iswgExist) {
          alert(
            "This Work Group already exists for the selected Job code, please enter different Work Group",
          );
          return;
        }

        testData[idx]["timecode"].unshift({
          id: newId,
          jobcode: jobcode,
          isactive: chktimecode,
          workGroup: workGroup,
        });
        //renderTable();

        //renderTimeCodeTable(jobcode);

        replaceJobcodeWhileEditTimecode(selectedTCRowdatasetID);
      } else {
          let iswgExist = testData[idx]["timecode"].some(
            (item) =>
              item.workGroup.toLowerCase() === workGroup.toLowerCase(),
          );
          if (iswgExist) {
            alert(
              "This Work Group already exists for the selected Job code, please enter different Work Group",
            );
            return;
          }
        //regular edit of time code for selected row
        testData[idx].timecode[tcIndex] = {
          id: testData[idx].timecode[tcIndex].id,
          isactive: chktimecode,
          workGroup: workGroup,
          jobcode: jobcode,
        };
        // replaceJobcodeWhileEditTimecode(selectedTCRowdatasetID);
      }
    }
    sortTableWorkgroup("workGroup", "asc");
    //const index = newtimecode.findIndex(item => item.id === editingTcRow);
    // if (index !== -1) {
    //     //  { id: 1, jobcode: 'AH003308', isactive: 'true', workGroup: 'CIT' },
    //     newtimecode[index] = {
    //         ...newtimecode[index],
    //         jobcode: jobcode,
    //          isactive: chktimecode,
    //         workGroup: workGroup
    //     };
    // }
  }

  // Update filtered data
  const searchTCTerm = document
    .getElementById("txtSearchTimeCode")
    .value.toLowerCase();
  timecodeTable = timecodeTable.filter(
    (item) =>
      item.jobcode.toLowerCase().includes(searchTCTerm) ||
      item.isactive.toLowerCase().includes(searchTCTerm) ||
      item.workGroup.toLowerCase().includes(searchTCTerm),
  );
  renderTable();

  renderTimeCodeTable(jobcode);
  getTimecodeData(jobcode);
  // renderPagination();
  //document.getElementById('testModal').style.display = 'none';
  //  document.getElementById("testModal").classList.toggle("show");
  closeTCModal();
  // const modal = bootstrap.Modal.getInstance(document.getElementById('testModal'));
  // modal.hide();

  isAddTCModal = false;
  editingTcRow = null;
}

// Render pagination
function renderTimecodePagination() {
   let currentjobcode = document.getElementById("dpjobcode").value || selectedTCRowjobcode;
   timecodelist = getTimecodeData(selectedTCRowjobcode);
  const totalPages = Math.ceil(timecodelist.length / recordsPerPg);
  if(timecodelist.length == 0){
    document.getElementById("timecodepagination").innerHTML = "";
    return;
  }
  const pagination = document.getElementById("timecodepagination");

  pagination.innerHTML = "";

  // First button
  const prevLi = document.createElement('li');
  prevLi.className = `govuk-pagination__item ${currentPg === 1 ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
  prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link"    onclick="goToPagetc(${currentPg - 1})"> <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
      </svg> <span class="govuk-pagination__link-title">
        Previous<span class="govuk-visually-hidden"> page</span>
      </span></a>`;
  pagination.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPg - 2);
  const endPage = Math.min(totalPages, currentPg + 2);

  for (let i = startPage; i <= endPage; i++) {
     const li = document.createElement("li");
     li.className = `govuk-pagination__item ${i === currentPg ? 'govuk-pagination__item--current' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
     li.innerHTML = `<a class="govuk-link govuk-pagination__link"   onclick="goToPagetc(${i})">${i}</a>`;
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement('li');
    nextLi.className = `govuk-pagination__next ${currentPg === totalPages ? 'disabled' : ''} ${currentPg === 1 ? 'aria-disabled="true"' : ''}`;
    nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPagetc(${currentPg + 1})" rel="next"><span class="govuk-pagination__link-title">Next</span><svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg></a>`;
  pagination.appendChild(nextLi);

  // Last button
  //const lastLi = document.createElement("li");
  //lastLi.className = `page-item ${currentPg === totalPages ? "disabled" : ""} ${currentPg === 1 ? 'aria-disabled="true"' : ""}`;
  //lastLi.innerHTML = `<a class="page-link"  onclick="goToPagetc(${totalPages})">Last</a>`;
 // pagination.appendChild(lastLi);
}

// Go to page
function goToPagetc(page) {
    let currentjobcode = document.getElementById("dpjobcode").value
   timecodelist = getTimecodeData(currentjobcode);
  const totalPages = Math.ceil(timecodelist.length / recordsPerPg);
  if (page >= 1 && page <= totalPages) {
    currentPg = page;
    renderTimeCodeTable(currentjobcode);
   // getTimecodeData();
   getTimecodeData(currentjobcode);
    renderTimecodePagination();
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

const selectAll = document.getElementById("selectAllTC");

selectAll.addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(".timecodeCheckbox");
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


const tbody = document.getElementById("timejobtabletableBody");

tbody.addEventListener("change", function (e) {

  if (e.target.classList.contains("timecodeCheckbox")) {

    // const id = Number(e.target.dataset.id);
     const item = JSON.parse(e.target.dataset.id);
    if (e.target.checked) {

      if (!selectedWG.includes(item.jobcode)) {
        selectedWG.push(item);
      }

    } else {

      selectedWG = selectedWG.filter(el => el.id !== item.id);

      // uncheck selectAll if any one unchecked
      selectAll.checked = false;
    }

    // Optional: auto check selectAll if all selected
    const allCheckboxes = document.querySelectorAll(".timecodeCheckbox");
    const checkedCount = document.querySelectorAll(".timecodeCheckbox:checked");

    if (allCheckboxes.length === checkedCount.length) {
      selectAll.checked = true;
    }

  }

});


function selectParentByCode(currentjobcode) {
  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(row => {
    if (row.cells[0].innerText.trim() === currentjobcode) {
      onclickRowNewModal(row, currentjobcode);
    }
  });
}


function sortTableWorkgroup(column, order) {
 // alert(selectedRowjobcode,"selectedRowjobcode")
  timecodelist = getTimecodeData(selectedRowjobcode);
  timecodelist.sort((a, b) => {

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

   renderTimeCodeTable(selectedRowjobcode,timecodelist);
}


let sortState = {
  column: null,
  order: "asc"
};

const headerswg = document.querySelectorAll('th[data-column="workGroup"]');

headerswg.forEach((header, index) => {
  header.addEventListener("click", function () {

    const column = this.dataset.column;

    if (sortState.column === column) {
      sortState.order = sortState.order === "asc" ? "desc" : "asc";
    } else {
      sortState.column = column;
      sortState.order = "asc";
    }

    // Remove icons from all
    headerswg.forEach(h => {
      h.classList.remove("sorted-asc", "sorted-desc");
      const icon = h.querySelector(".sort-icon");
      if (icon) icon.remove();
    });

    // Add icon
    const sortIcon = document.createElement("span");
    sortIcon.className = "sort-icon";
    sortIcon.innerHTML = sortState.order === "asc" ? " ▲" : " ▼";

    this.appendChild(sortIcon);
    this.classList.add(
      sortState.order === "asc" ? "sorted-asc" : "sorted-desc"
    );

    sortTableWorkgroup(column, sortState.order);
  });
});
 
//dpTargetJobcode

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    currentPg = 1;
  let select = document.getElementById("recordsPerPage");
  handlerecordsPerPgChange({ target: select });
  
  //populateTestCodeSelect();
  // setupEventListeners();
  renderTable();
   renderTimecodePagination();

   renderTimeCodeTable(selectedTCRowjobcode);
  //  getTimecodeData();
  renderPagination();
 
});
