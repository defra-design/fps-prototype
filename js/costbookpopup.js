const modal = document.getElementById("testModal");
const modal_tests  = document.getElementById("testsModal");
const animalModal = document.getElementById("animalModal");
const additionalModal = document.getElementById("additionalModal");
const modal_year = document.getElementById("AddYearModal");
// document.getElementById("timejobdiv").style.display = 'none';

let testData = [
    { id: 1, WGgrade: 'A_AS2', staffname:'App_admin', rate: '£126.45', hrs:'2', days: '0.28', staffcost:'£252.90' },
    { id: 2, WGgrade: 'F_AS2', staffname:'App_admin', rate: '£64.62', hrs:'14', days: '1.94' ,staffcost:'£904.68' },
    { id: 3, WGgrade: 'E_SSP1', staffname:'CAPS', rate: '£71.12', hrs:'20', days: '2.78', staffcost:'£1442.40' }
   

];

let testTabData = [
    { id: 1, testcode: 'PT0000', unitprice: '£19.53', quantity: '1', testcost: '£19.53' },
    { id: 2, testcode: 'TC0025', unitprice: '£23.66', quantity: '1', testcost: '£23.66' },
    { id: 3, testcode: 'TC0036', unitprice: '£115.67', quantity: '1', testcost: '£115.67' }
];

let animalData = [
    { id: 1, animaltype: "B&B Fixed Price Avian", rate: "£1.04", quantity: "5", days: "5", animalcost: "£26.00" }
];

let additionalData = [
    { id: 1, description: "Consumables", costno: "£25000.00", costinf: "£25000.00", accountcat: "Consumables" }
];

let additionalEditingId = null;
let additionalIsAddMode = false;

let animalEditingId = null;
let animalIsAddMode = false;


let testEditingId = null;
let testIsAddMode = false; 

let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...testData];
let editingRow = null;
let isAddMode = false;
let selectedIndex = null;

function formatStaffCurrency(value) {
    let number = parseFloat(value);
    if (isNaN(number)) return "£0.00";
    return "£" + number.toFixed(2);
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
	updateStaffTotal();
    
    // Add inline editing functionality
   // addInlineEditingListeners(); 
}


   
    

// document.getElementById('recordsPerPage').addEventListener('change', handleRecordsPerPageChange);
document.getElementById('txtSearchProjectCode').addEventListener('input', handleSearch);
document.getElementById("modal-rate").addEventListener("input", autoCalculateStaffCost);
document.getElementById("modal-hrs").addEventListener("input", autoCalculateStaffCost);
document.getElementById("modal-days").addEventListener("input", autoCalculateStaffCost);

function autoCalculateStaffCost() {

    let rate = document.getElementById("modal-rate").value.replace("£", "");
    let hrs = document.getElementById("modal-hrs").value;
    let days = document.getElementById("modal-days").value;

    rate = parseFloat(rate);
    hrs = parseFloat(hrs);
    days = parseFloat(days);

    if (!isNaN(rate) && !isNaN(hrs) && !isNaN(days)) {
        //const cost = rate * hrs * days;
        const cost = rate * hrs;
        document.getElementById("modal-staffcost").value =
            formatStaffCurrency(cost);
    }
}

/* ---------- RENDER TABLE ---------- */
function renderTestTable() {
    const tbody = document.getElementById("tabletestBody");
    tbody.innerHTML = "";

    testTabData.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.testcode}</td>
            <td class="text-AlignRight">${item.unitprice}</td>
            <td class="text-AlignRight">${item.quantity}</td>
            <td class="text-AlignRight">${item.testcost}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="handleTestEdit(${item.id})">
                    <img src="../images/pen-to-square-regular-full.svg" width="20">
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="handleTestDelete(${item.id})">
                    <img src="../images/trash-can-regular-full.svg" width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    }); 

    updateTestTotal();
}

/* ---------- FORMAT CURRENCY ---------- */
function formatAnimalCurrency(value) {
    let number = parseFloat(value.toString().replace("£", ""));
    if (isNaN(number)) return "£0.00";
    return "£" + number.toFixed(2);
}

/* ---------- RENDER TABLE ---------- */
function renderAnimalTable() {

    const tbody = document.getElementById("tableAnimalBody");
    tbody.innerHTML = "";

    animalData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.animaltype}</td>
            <td class="text-AlignRight">${item.rate}</td>
            <td class="text-AlignRight">${item.quantity}</td>
            <td class="text-AlignRight">${item.days}</td>
            <td class="text-AlignRight">${item.animalcost}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="handleAnimalEdit(${item.id})">
                    <img src="../images/pen-to-square-regular-full.svg" width="20">
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="handleAnimalDelete(${item.id})">
                    <img src="../images/trash-can-regular-full.svg" width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateAnimalTotal();
}

/* ---------- OPEN ADD MODAL ---------- */
document.getElementById("addanimalbookedBtn").addEventListener("click", function () {

    animalIsAddMode = true;
    animalEditingId = null;

    document.getElementById("animalModalLabel").innerText = "Add Animal Booked";
    document.getElementById("formAddAnimal").reset();

    document.getElementById("animalmodalsaveBtn").style.display = "inline-block";
    document.getElementById("animalupdateBtn").style.display = "none";

    openAnimalModal();
});


/* ---------- EDIT ---------- */
function handleAnimalEdit(id) {

    const item = animalData.find(x => x.id === id);
    if (!item) return;

    animalIsAddMode = false;
    animalEditingId = id;

    document.getElementById("animalModalLabel").innerText = "Edit Animal Booked";

    document.getElementById("modal-animaltype").value = item.animaltype;
    document.getElementById("modal-animalrate").value = item.rate;
    document.getElementById("modal-animalquantity").value = item.quantity;
    document.getElementById("modal-animaldays").value = item.days;
    document.getElementById("modal-animalcost").value = item.animalcost;

    document.getElementById("animalmodalsaveBtn").style.display = "none";
    document.getElementById("animalupdateBtn").style.display = "inline-block";

    openAnimalModal();
}


/* ---------- DELETE ---------- */
function handleAnimalDelete(id) {

    if (confirm("Are you sure you want to delete this animal record?")) {
        animalData = animalData.filter(item => item.id !== id);
        renderAnimalTable();
    }
}


/* ---------- SAVE ---------- */
document.getElementById("animalmodalsaveBtn").addEventListener("click", function () {

    const animaltype = document.getElementById("modal-animaltype").value;
    const rateRaw = document.getElementById("modal-animalrate").value;
    const quantityRaw = document.getElementById("modal-animalquantity").value;
    const daysRaw = document.getElementById("modal-animaldays").value;

    if (!animaltype || !rateRaw || !quantityRaw || !daysRaw) {
        alert("Please fill all required fields");
        return;
    }

    const rate = parseFloat(rateRaw.replace("£", ""));
    const qty = parseFloat(quantityRaw);
    const days = parseFloat(daysRaw);

    if (isNaN(rate) || isNaN(qty) || isNaN(days)) {
        alert("Invalid numeric values");
        return;
    }

    const calculatedCost = rate * qty * days;

    const newId = animalData.length > 0
        ? Math.max(...animalData.map(item => item.id)) + 1
        : 1;

    animalData.push({
        id: newId,
        animaltype,
        rate: formatAnimalCurrency(rate),
        quantity: qty,
        days: days,
        animalcost: formatAnimalCurrency(calculatedCost)
    });

    renderAnimalTable();
    closeAnimalModal();
});


/* ---------- UPDATE ---------- */
document.getElementById("animalupdateBtn").addEventListener("click", function () {

    const index = animalData.findIndex(x => x.id === animalEditingId);
    if (index === -1) return;

    const rate = parseFloat(document.getElementById("modal-animalrate").value.replace("£", ""));
    const qty = parseFloat(document.getElementById("modal-animalquantity").value);
    const days = parseFloat(document.getElementById("modal-animaldays").value);

    const calculatedCost = rate * qty * days;

    animalData[index] = {
        ...animalData[index],
        animaltype: document.getElementById("modal-animaltype").value,
        rate: formatAnimalCurrency(rate),
        quantity: qty,
        days: days,
        animalcost: formatAnimalCurrency(calculatedCost)
    };

    renderAnimalTable();
    closeAnimalModal();
});


/* ---------- AUTO CALCULATE COST ---------- */
document.getElementById("modal-animalrate").addEventListener("input", autoCalculateAnimalCost);
document.getElementById("modal-animalquantity").addEventListener("input", autoCalculateAnimalCost);
document.getElementById("modal-animaldays").addEventListener("input", autoCalculateAnimalCost);

function autoCalculateAnimalCost() {

    let rate = document.getElementById("modal-animalrate").value.replace("£", "");
    let qty = document.getElementById("modal-animalquantity").value;
    let days = document.getElementById("modal-animaldays").value;

    rate = parseFloat(rate);
    qty = parseFloat(qty);
    days = parseFloat(days);

    if (!isNaN(rate) && !isNaN(qty) && !isNaN(days)) {
        const cost = rate * qty * days;
        document.getElementById("modal-animalcost").value = formatAnimalCurrency(cost);
    }
}


/* ---------- TOTAL CALCULATION ---------- */
function updateAnimalTotal() {

    let total = 0;

    animalData.forEach(item => {
        const value = parseFloat(item.animalcost.replace("£", ""));
        total += isNaN(value) ? 0 : value;
    });

    // document.querySelector("tfoot .total-amount input").value =
        // "£" + total.toFixed(2);
		document.getElementById("animalTotalAmount").value =
        "£" + total.toFixed(2);
}


/* ---------- MODAL CONTROL ---------- */
function openAnimalModal() {
    animalModal.classList.add("show");
}

function closeAnimalModal() {
    animalModal.classList.remove("show");
}


/* ---------- INITIAL LOAD ---------- */
document.addEventListener("DOMContentLoaded", function () {
    renderAnimalTable();
});


function formatCurrency(value) {
    let number = parseFloat(value.toString().replace("£", ""));
    if (isNaN(number)) return "£0.00";
    return "£" + number.toFixed(2);
}

/* ---------- OPEN ADD MODAL ---------- */
document.getElementById("addtestbookedBtn").addEventListener("click", function () {

    testIsAddMode = true;
    testEditingId = null;

    document.getElementById("testModalLabel").innerText = "Add Test Booked";
    document.getElementById("formAddTest").reset();

    document.getElementById("testmodalsaveBtn").style.display = "inline-block";
    document.getElementById("testupdateBtn").style.display = "none";

    openTestModal();
});


/* ---------- EDIT ---------- */
function handleTestEdit(id) {

    const item = testTabData.find(x => x.id === id);
    if (!item) return;

    testIsAddMode = false;
    testEditingId = id;

    document.getElementById("testModalLabel").innerText = "Edit Test Booked";

    document.getElementById("modal-testcode").value = item.testcode;
    document.getElementById("modal-unitprice").value = item.unitprice;
    document.getElementById("modal-quantity").value = item.quantity;
    document.getElementById("modal-testcost").value = item.testcost;

    document.getElementById("testmodalsaveBtn").style.display = "none";
    document.getElementById("testupdateBtn").style.display = "inline-block";

    openTestModal();
}


/* ---------- DELETE ---------- */
function handleTestDelete(id) {

    if (confirm("Are you sure you want to delete this test?")) {
        testTabData = testTabData.filter(item => item.id !== id);
        renderTestTable();
    }
}


/* ---------- SAVE ---------- */
document.getElementById("testmodalsaveBtn").addEventListener("click", function () {

    const testcode = document.getElementById("modal-testcode").value;
    const unitRaw = document.getElementById("modal-unitprice").value;
    const quantityRaw = document.getElementById("modal-quantity").value;

    if (!testcode || !unitRaw || !quantityRaw) {
        alert("Please fill all required fields");
        return;
    }

    const unit = parseFloat(unitRaw.replace("£", ""));
    const qty = parseFloat(quantityRaw);

    if (isNaN(unit) || isNaN(qty)) {
        alert("Invalid number values");
        return;
    }

    const calculatedCost = unit * qty;

    const newId = testTabData.length > 0
        ? Math.max(...testTabData.map(item => item.id)) + 1
        : 1;

    testTabData.push({
        id: newId,
        testcode,
        unitprice: formatCurrency(unit),
        quantity: qty,
        testcost: formatCurrency(calculatedCost)
    });

    renderTestTable();
    closeTestModal();
});


/* ---------- UPDATE ---------- */
document.getElementById("testupdateBtn").addEventListener("click", function () {

    const index = testTabData.findIndex(x => x.id === testEditingId);
    if (index === -1) return;

    const unit = parseFloat(document.getElementById("modal-unitprice").value.replace("£", ""));
    const qty = parseFloat(document.getElementById("modal-quantity").value);

    const calculatedCost = unit * qty;

    testTabData[index] = {
        ...testTabData[index],
        testcode: document.getElementById("modal-testcode").value,
        unitprice: formatCurrency(unit),
        quantity: qty,
        testcost: formatCurrency(calculatedCost)
    };

    renderTestTable();
    closeTestModal();
});


/* ---------- TOTAL CALCULATION ---------- */
function updateTestTotal() {

    let total = 0;

    testTabData.forEach(item => {
        const value = parseFloat(item.testcost.replace("£", ""));
        total += isNaN(value) ? 0 : value;
    });

    //document.querySelector(".total-amount input").value = "£" + total.toFixed(2);
	document.getElementById("testTotalAmount").value = "£" + total.toFixed(2);
}


/* ---------- MODAL CONTROL ---------- */
function openTestModal() {
    document.getElementById("testsModal").classList.add("show");
}

function closeTestModal() {
    document.getElementById("testsModal").classList.remove("show");
}


/* ---------- AUTO CALCULATE COST ---------- */
document.getElementById("modal-unitprice").addEventListener("input", autoCalculateCost);
document.getElementById("modal-quantity").addEventListener("input", autoCalculateCost);

function autoCalculateCost() {

    let unit = document.getElementById("modal-unitprice").value.replace("£", "");
    let qty = document.getElementById("modal-quantity").value;

    unit = parseFloat(unit);
    qty = parseFloat(qty);

    if (!isNaN(unit) && !isNaN(qty)) {
        const cost = unit * qty;
        document.getElementById("modal-testcost").value = formatCurrency(cost);
    }
}


/* ---------- INITIAL LOAD ---------- */
document.addEventListener("DOMContentLoaded", function () {
    renderTestTable();
});



function formatAdditionalCurrency(value) {
    let number = parseFloat(value.toString().replace("£", "").replace(/,/g, ""));
    if (isNaN(number)) return "£0.00";
    return "£" + number.toFixed(2);
}


function renderAdditionalTable() {

    const tbody = document.getElementById("tableAdditionalBody");
    tbody.innerHTML = "";

    additionalData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description}</td>
            <td class="text-AlignRight">${item.costno}</td>
            <td class="text-AlignRight">${item.costinf}</td>
            <td>${item.accountcat}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="handleAdditionalEdit(${item.id})">
                    <img src="../images/pen-to-square-regular-full.svg" width="20">
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="handleAdditionalDelete(${item.id})">
                    <img src="../images/trash-can-regular-full.svg" width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateAdditionalTotal();
}

document.getElementById("addadditionalBtn").addEventListener("click", function () {

    additionalIsAddMode = true;
    additionalEditingId = null;

    document.getElementById("additionalModalLabel").innerText = "Add Additional Cost";
    document.getElementById("formAddAdditional").reset();

    document.getElementById("modal-costinf").readOnly = true;

    document.getElementById("additionalsaveBtn").style.display = "inline-block";
    document.getElementById("additionalupdateBtn").style.display = "none";

    openAdditionalModal();
});

function handleAdditionalEdit(id) {

    const item = additionalData.find(x => x.id === id);
    if (!item) return;

    additionalIsAddMode = false;
    additionalEditingId = id;

    document.getElementById("additionalModalLabel").innerText = "Edit Additional Cost";

    document.getElementById("modal-description").value = item.description;
    document.getElementById("modal-costno").value = item.costno;
    document.getElementById("modal-costinf").value = item.costinf;
    document.getElementById("modal-accountcat").value = item.accountcat;

    document.getElementById("modal-costinf").readOnly = true;

    document.getElementById("additionalsaveBtn").style.display = "none";
    document.getElementById("additionalupdateBtn").style.display = "inline-block";

    openAdditionalModal();
}

function handleAdditionalDelete(id) {

    if (confirm("Are you sure you want to delete this additional cost?")) {
        additionalData = additionalData.filter(item => item.id !== id);
        renderAdditionalTable();
    }
}

document.getElementById("additionalsaveBtn").addEventListener("click", function () {

    const description = document.getElementById("modal-description").value;
    const costnoRaw = document.getElementById("modal-costno").value;
    const accountcat = document.getElementById("modal-accountcat").value;

    if (!description || !costnoRaw || !accountcat) {
        alert("Please fill all required fields");
        return;
    }

    const costno = parseFloat(costnoRaw.replace("£", "").replace(/,/g, ""));

    if (isNaN(costno)) {
        alert("Invalid cost value");
        return;
    }

    const formattedCost = formatAdditionalCurrency(costno);

    const newId = additionalData.length > 0
        ? Math.max(...additionalData.map(item => item.id)) + 1
        : 1;

    additionalData.push({
        id: newId,
        description,
        costno: formattedCost,
        costinf: formattedCost, // ✅ SAME VALUE AUTO ASSIGNED
        accountcat
    });

    renderAdditionalTable();
    closeAdditionalModal();
});

document.getElementById("additionalupdateBtn").addEventListener("click", function () {

    const index = additionalData.findIndex(x => x.id === additionalEditingId);
    if (index === -1) return;

    const costno = parseFloat(document.getElementById("modal-costno").value.replace("£", "").replace(/,/g, ""));

    const formattedCost = formatAdditionalCurrency(costno);

    additionalData[index] = {
        ...additionalData[index],
        description: document.getElementById("modal-description").value,
        costno: formattedCost,
        costinf: formattedCost, // ✅ ALWAYS SAME
        accountcat: document.getElementById("modal-accountcat").value
    };

    renderAdditionalTable();
    closeAdditionalModal();
});

document.getElementById("modal-costno").addEventListener("input", function () {

    const value = this.value.replace("£", "").replace(/,/g, "");
    const formatted = formatAdditionalCurrency(value);

    document.getElementById("modal-costinf").value = formatted;
});

function updateAdditionalTotal() {

    let total = 0;

    additionalData.forEach(item => {
        const value = parseFloat(item.costinf.replace("£", ""));
        total += isNaN(value) ? 0 : value;
    });

   document.getElementById("additionalTotalAmount").value =
        "£" + total.toFixed(2);
}

function openAdditionalModal() {
    additionalModal.classList.add("show");
}

function closeAdditionalModal() {
    additionalModal.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
    renderAdditionalTable();
});

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

// function closeModal(){
   // //  document.getElementById('testModal').style.display = 'none';
       // document.getElementById("testModal").classList.toggle("show");
	    // // document.getElementById("AddYearModal").classList.toggle("show");
// }


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
document.getElementById("modalsaveBtn").style.display = "none";
document.getElementById("staffUpdateBtn").style.display = "inline-block";

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
  if (isAddMode) {
      document.getElementById("modalsaveBtn").style.display = "inline-block";
      document.getElementById("staffUpdateBtn").style.display = "none";
  } else {
      document.getElementById("modalsaveBtn").style.display = "none";
      document.getElementById("staffUpdateBtn").style.display = "inline-block";
  }
  //modal_year.classList.add("show");
}

function openModalyear() {
 // modal.classList.add("show");
  modal_year.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
    isAddMode = true;

  document.getElementById("modalsaveBtn").style.display = "inline-block";
  document.getElementById("staffUpdateBtn").style.display = "none";
  // modal_year.classList.remove("show");
}

// function closeTestModal(){
	// modal_tests.classList.remove("show");}

function closeModalYear() {
  //modal.classList.remove("show");
   modal_year.classList.remove("show");
}

// Handle save
function handleSave() {

    const WGgrade = document.getElementById('modal-WGgrade').value;
    const staffname = document.getElementById('modal-staffname').value;

    let rateRaw = document.getElementById('modal-rate').value.replace("£", "");
    let hrsRaw = document.getElementById('modal-hrs').value;
    let daysRaw = document.getElementById('modal-days').value;

    if (!staffname || !rateRaw || !hrsRaw || !daysRaw) {
        alert('Please fill in all required fields');
        return;
    }

    const rate = parseFloat(rateRaw);
    const hrs = parseFloat(hrsRaw);
    const days = parseFloat(daysRaw);

    if (isNaN(rate) || isNaN(hrs) || isNaN(days)) {
        alert("Invalid numeric values");
        return;
    }

    //const calculatedCost = rate * hrs * days;
    const calculatedCost = rate * hrs;

    if (isAddMode) {

        const newId = testData.length > 0
            ? Math.max(...testData.map(item => item.id)) + 1
            : 1;

        testData.push({
            id: newId,
            WGgrade,
            staffname,
            rate: formatStaffCurrency(rate),
            hrs,
            days,
            staffcost: formatStaffCurrency(calculatedCost)
        });

    } else {

        const index = testData.findIndex(item => item.id === editingRow);

        if (index !== -1) {

            testData[index] = {
                ...testData[index],
                WGgrade,
                staffname,
                rate: formatStaffCurrency(rate),
                hrs,
                days,
                staffcost: formatStaffCurrency(calculatedCost)
            };
        }
    }

    filteredData = [...testData];

    renderTable();
	updateStaffTotal();
    closeModal();

    isAddMode = false;
    editingRow = null;
}

document.getElementById("staffUpdateBtn").addEventListener("click", function () {

    if (editingRow === null) return;

    const index = testData.findIndex(item => item.id === editingRow);
    if (index === -1) return;

    // Update values
    testData[index].WGgrade = document.getElementById('modal-WGgrade').value;
    testData[index].staffname = document.getElementById('modal-staffname').value;
    testData[index].rate = document.getElementById('modal-rate').value;
    testData[index].hrs = document.getElementById('modal-hrs').value;
    testData[index].days = document.getElementById('modal-days').value;
    testData[index].staffcost = document.getElementById('modal-staffcost').value;

    // Re-render table
    renderTable();   // ⚠️ use your actual render function name here

    // Reset state
    editingRow = null;
    isAddMode = true;

    closeModal();
});

function updateStaffTotal() {

    let total = 0;

    testData.forEach(item => {
        const value = parseFloat(
            item.staffcost.replace("£", "").replace(/,/g, "")
        );
        total += isNaN(value) ? 0 : value;
    });

    document.getElementById("staffTotalAmount").value =
        "£" + total.toFixed(2);
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