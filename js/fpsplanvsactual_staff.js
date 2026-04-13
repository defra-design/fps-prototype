let Actualtime_staff = [
    { id: 1,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003300', name: 'Swett, Hymie',     mnth: 3, hrs: 75.5,  cost: '£5,082' },
    { id: 2,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003307', name: 'Swett, Hymie',     mnth: 3, hrs: 55.5,  cost: '£3,736' },
    { id: 3,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003306', name: 'Blakely, Darb',    mnth: 3, hrs: 3,     cost: '£202' },
    { id: 4,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003306', name: 'Swett, Hymie',     mnth: 3, hrs: 2,     cost: '£135' },
    { id: 5,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003306', name: 'Swett, Hymie',     mnth: 4, hrs: 0.5,   cost: '£34' },
    { id: 6,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003306', name: 'Blakely, Darb',    mnth: 4, hrs: 1,     cost: '£67' },
    { id: 7,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003307', name: 'Swett, Hymie',     mnth: 4, hrs: 31.5,  cost: '£2,120' },
    { id: 8,  wrkGrp: 'ROSW',    grade: 'E', jobCode: 'AH003300', name: 'Swett, Hymie',     mnth: 4, hrs: 195,   cost: '£13,125' },
    { id: 9,  wrkGrp: 'SSP1',    grade: 'E', jobCode: 'TBAH0033', name: 'MacLeod, Maxw',    mnth: 2, hrs: 2,     cost: '£107' },
    { id: 10, wrkGrp: 'Vet Dir', grade: 'B', jobCode: 'AH003300', name: 'Moizer, Maitilde', mnth: 2, hrs: 257.5, cost: '£28,969' }
];


let plannedtime_staff = [
    { id: 1,  name: 'B_BAC4, General',    rate: '£85', hrs: 1220, days: 169.44, staffCost: '£103,371' },
    { id: 2,  name: 'D_BAC4, General',    rate: '£59', hrs: 100,  days: 13.89,  staffCost: '£5,893' },
    { id: 3,  name: 'E_BAC4, General',    rate: '£53', hrs: 100,  days: 13.89,  staffCost: '£5,334' },
    { id: 4,  name: 'F_BAC4, General',    rate: '£47', hrs: 100,  days: 13.89,  staffCost: '£4,698' },
    { id: 5,  name: 'E_SSP1, General',    rate: '£53', hrs: 12,   days: 1.67,   staffCost: '£640' },
    { id: 6,  name: 'B_WILDLIFE, General',rate: '£85', hrs: 100,  days: 13.89,  staffCost: '£8,473' },
    { id: 7,  name: 'C_WILDLIFE, General',rate: '£70', hrs: 100,  days: 13.89,  staffCost: '£6,992' },
    { id: 8,  name: 'D_WILDLIFE, General',rate: '£59', hrs: 100,  days: 13.89,  staffCost: '£5,893' },
    { id: 9,  name: 'E_WILDLIFE, General',rate: '£53', hrs: 100,  days: 13.89,  staffCost: '£5,334' },
    { id: 10, name: 'F_WILDLIFE, General',rate: '£47', hrs: 100,  days: 13.89,  staffCost: '£4,698' },
    { id: 11, name: 'A_WILDLIFE, General',rate: '£95', hrs: 12,   days: 1.67,   staffCost: '£1,143' }
];


let editingProjectId = null;

let projectModal;

let staffplanId = null;
let staffplanModal;


document.addEventListener("DOMContentLoaded", function () {

    projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    renderProjectTable();
	
});


document.addEventListener("DOMContentLoaded", function () {

   
	staffplanModal = new bootstrap.Modal(document.getElementById('staffplanModal'));    
	renderstaffplanTable();

    const addStaffPlanBtn = document.getElementById("addStaffPlanBtn");
    if (addStaffPlanBtn) {
        addStaffPlanBtn.addEventListener("click", openAddStaffPlanModal);
    }
});

function openAddStaffPlanModal() {
    staffplanId = null;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Add Planned Additional Cost";
    }

    document.getElementById("modal-planned-name").value = "";
    document.getElementById("modal-planned-rate").value = "";
    document.getElementById("modal-planned-hrs").value = "";
    document.getElementById("modal-planned-days").value = "";
    document.getElementById("modal-planned-staffcost").value = "£0.00";

    staffplanModal.show();
}

function formatCurrency(value) {
    let number = parseFloat(value.toString().replace(/[£,]/g, ""));
    if (isNaN(number)) return "£0";
    return "£" + number.toLocaleString();
}

function parseMoney(value) {
    const rawValue = String(value || "").trim();
    if (!rawValue) return 0;

    const isAccountingNegative = /^\(.*\)$/.test(rawValue);
    const cleaned = rawValue
        .replace(/[£$,\s]/g, "")
        .replace(/[()]/g, "");

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) return 0;

    return isAccountingNegative ? -Math.abs(parsed) : parsed;
}

function formatPound(value) {
    return `£${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function formatSignedPound(value) {
    const number = Number(value) || 0;
    const absoluteValue = Math.abs(number).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return number < 0 ? `-£${absoluteValue}` : `£${absoluteValue}`;
}


function renderProjectTable() {

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    Actualtime_staff.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.wrkGrp || ""}</td>
            <td>${item.grade || ""}</td>
            <td>${item.jobCode || ""}</td>
            <td>${item.name || ""}</td>
            <td>${item.mnth ?? ""}</td>
            <td>${item.hrs ?? ""}</td>
            <td>${item.cost || ""}</td>
           
           
           
        `;

        tbody.appendChild(row);
    });

    updateProjectSummary();
}




function renderstaffplanTable() {

    const tbody = document.getElementById("staffplandata");
    tbody.innerHTML = "";

    plannedtime_staff.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name || ""}</td>
            <td>${item.rate || ""}</td>
            <td>${item.hrs ?? ""}</td>
            <td>${item.days ?? ""}</td>
            <td>${item.staffCost || "£0.00"}</td>
            <td class="text-AlignCenter">
                <button class="btn btn-sm btn-outline-primary"
                    onclick="handleplannedtime_staffEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="handleplannedtime_staffDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateStaffPlanTotal();
}

function updateStaffPlanTotal() {
    const total = plannedtime_staff.reduce((sum, item) => {
        return sum + parseMoney(item.staffCost);
    }, 0);

    const totalField = document.getElementById("planned-total-cost") || document.getElementById("External Income");
    if (!totalField) return;

    totalField.value = formatPound(total);
    updateProjectSummary();
}

function updateProjectSummary() {
    const totalActualCost = Actualtime_staff.reduce((sum, item) => {
        return sum + parseMoney(item.cost);
    }, 0);

    const totalActualHrs = Actualtime_staff.reduce((sum, item) => {
        return sum + (parseFloat(item.hrs) || 0);
    }, 0);

    const totalPlannedCost = plannedtime_staff.reduce((sum, item) => {
        return sum + parseMoney(item.staffCost);
    }, 0);

    const percentOfPlan = totalPlannedCost > 0
        ? (totalActualCost / totalPlannedCost) * 100
        : 0;

    const totalField = document.getElementById("project-total-cost") || document.getElementById("External Income");
    if (totalField) {
        totalField.value = formatPound(totalActualCost);
    }

    const totalHrsField = document.getElementById("project-total-hrs");
    if (totalHrsField) {
        totalHrsField.value = totalActualHrs.toFixed(2);
    }

    const percentField = document.getElementById("project-percent-plan") || document.getElementById("BudgetCVL");
    if (percentField) {
        percentField.value = `${percentOfPlan.toFixed(2)}%`;
    }
}


function handleProjectDelete(id) {

    if (confirm("Are you sure you want to delete this project?")) {
        Actualtime_staff = Actualtime_staff.filter(item => item.id !== id);
        renderProjectTable();
    }
}

function handleplannedtime_staffDelete(id) {

    if (confirm("Are you sure you want to delete this planned additional cost row?")) {
        plannedtime_staff = plannedtime_staff.filter(item => item.id !== id);
        renderstaffplanTable();
    }
}



function handleProjectEdit(id) {

    const item = Actualtime_staff.find(x => x.id === id);
    if (!item) return;

    editingProjectId = id;

    document.getElementById("projectModalTitle").innerText = "Edit Actual Staff";

    document.getElementById("modal-actual-wrkgrp").value = item.wrkGrp || "";
    document.getElementById("modal-actual-grade").value = item.grade || "";
    document.getElementById("modal-actual-jobcode").value = item.jobCode || "";
    document.getElementById("modal-actual-name").value = item.name || "";
    document.getElementById("modal-actual-mnth").value = item.mnth ?? "";
    document.getElementById("modal-actual-hrs").value = item.hrs ?? "";
    document.getElementById("modal-actual-cost").value = item.cost || "";

    // update selected project field
   // document.querySelector(".projectplan-code").value = item.project;

    projectModal.show();
}



function handleplannedtime_staffEdit(id) {

    const item = plannedtime_staff.find(x => x.id === id);
    if (!item) return;

    staffplanId = id;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Edit Planned Additional Cost";
    }

    document.getElementById("modal-planned-name").value = item.name || "";
    document.getElementById("modal-planned-rate").value = item.rate || "";
    document.getElementById("modal-planned-hrs").value = item.hrs ?? "";
    document.getElementById("modal-planned-days").value = item.days ?? "";
    document.getElementById("modal-planned-staffcost").value = item.staffCost || "£0.00";

    // update selected project field
    //document.querySelector(".projectplan-code").value = item.project;

    staffplanModal.show();
}


function saveProject() {

    const wrkGrp  = document.getElementById("modal-actual-wrkgrp").value.trim();
    const grade   = document.getElementById("modal-actual-grade").value.trim();
    const jobCode = document.getElementById("modal-actual-jobcode").value.trim();
    const name    = document.getElementById("modal-actual-name").value.trim();
    const mnth    = document.getElementById("modal-actual-mnth").value.trim();
    const hrs     = document.getElementById("modal-actual-hrs").value.trim();
    const cost    = document.getElementById("modal-actual-cost").value.trim();

    const normalizeCurrency = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!wrkGrp || !name || !mnth) {
        alert("Please complete WrkGrp, Name, and Month.");
        return;
    }

    if (editingProjectId) {

        const index = Actualtime_staff.findIndex(x => x.id === editingProjectId);

        Actualtime_staff[index] = {
            ...Actualtime_staff[index],
            wrkGrp,
            grade,
            jobCode,
            name,
            mnth: parseFloat(mnth) || 0,
            hrs: parseFloat(hrs) || 0,
            cost: normalizeCurrency(cost)
        };

        editingProjectId = null;

    } else {

        const newId = Actualtime_staff.length > 0
            ? Math.max(...Actualtime_staff.map(x => x.id)) + 1
            : 1;

        Actualtime_staff.push({
            id: newId,
            wrkGrp,
            grade,
            jobCode,
            name,
            mnth: parseFloat(mnth) || 0,
            hrs: parseFloat(hrs) || 0,
            cost: normalizeCurrency(cost)
        });
    }

    renderProjectTable();
    projectModal.hide();
}




function savestaffplan() {

    const name      = document.getElementById("modal-planned-name").value.trim();
    const rate      = document.getElementById("modal-planned-rate").value.trim();
    const hrs       = document.getElementById("modal-planned-hrs").value.trim();
    const days      = document.getElementById("modal-planned-days").value.trim();
    const staffCost = document.getElementById("modal-planned-staffcost").value.trim();

    const addPoundSymbol = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!name) {
        alert("Please select a Name.");
        return;
    }
   

    if (staffplanId) {

        const index = plannedtime_staff.findIndex(x => x.id === staffplanId);

        plannedtime_staff[index] = {
            ...plannedtime_staff[index],
            name,
            rate: addPoundSymbol(rate),
            hrs: parseFloat(hrs) || 0,
            days: parseFloat(days) || 0,
            staffCost: addPoundSymbol(staffCost)
        };

        staffplanId = null;

    } else {

        const newId = plannedtime_staff.length > 0
            ? Math.max(...plannedtime_staff.map(x => x.id)) + 1
            : 1;

        plannedtime_staff.push({
            id: newId,
            name,
            rate: addPoundSymbol(rate),
            hrs: parseFloat(hrs) || 0,
            days: parseFloat(days) || 0,
            staffCost: addPoundSymbol(staffCost)
        });
    }

    renderstaffplanTable();
     staffplanModal.hide();
}


// function updateProjectTotals() {

    // let totalBudget = 0;
    // let totalCost = 0;
    // let totalTrans = 0;
    // let totalDebit = 0;

    // Actualtime_staff.forEach(item => {
        // totalBudget += parseFloat(item.budget.replace(/[£,]/g, "")) || 0;
        // totalCost += parseFloat(item.costInc.replace(/[£,]/g, "")) || 0;
        // totalTrans += parseFloat(item.transInc.replace(/[£,]/g, "")) || 0;
        // totalDebit += parseFloat(item.cwDebit.replace(/[£,]/g, "")) || 0;
    // });

    // const inputs = document.querySelectorAll(".financial-summary input");

    // inputs[0].value = formatCurrency(totalBudget);
    // inputs[1].value = formatCurrency(totalCost);
    // inputs[2].value = formatCurrency(totalTrans);
    // inputs[3].value = formatCurrency(totalDebit);
// }