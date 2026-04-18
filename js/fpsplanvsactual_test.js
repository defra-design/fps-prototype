let Actualtest = [
    { id: 1, test: 'TC0347', wg: 'CSU', month: 1, number: 1,  rate: '£78.00',  charge: '£78.30' },
    { id: 2, test: 'TC0347', wg: 'CSU', month: 4, number: 3,  rate: '£78.00',  charge: '£234.90' },
    { id: 3, test: 'TC0612', wg: 'LT5', month: 1, number: 1,  rate: '£108.00', charge: '£108.40' },
    { id: 4, test: 'TC0612', wg: 'LT5', month: 4, number: 11, rate: '£108.00', charge: '£1,192.40' }
];


let plannedtime = [
    { id: 1, test: 'TC0078', number: 0, rate: '£76.10', charge: '£0.00' },
    { id: 2, test: 'TC0079', number: 0, rate: '£34.10', charge: '£0.00' },
    { id: 3, test: 'TC0347', number: 0, rate: '£78.30', charge: '£0.00' },
    { id: 4, test: 'TC0612', number: 0, rate: '£108.40', charge: '£0.00' },
    { id: 5, test: 'TC0673', number: 0, rate: '£0.00', charge: '£0.00' },
    { id: 6, test: 'TC0966', number: 0, rate: '£24.50', charge: '£0.00' }
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

    document.getElementById("modal-planned-test").value = "";
    document.getElementById("modal-planned-number").value = "";
    document.getElementById("modal-planned-rate").value = "£0.00";
    document.getElementById("modal-planned-charge").value = "£0.00";

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

    Actualtest.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.test || ""}</td>
            <td>${item.wg || ""}</td>
            <td>${item.month ?? ""}</td>
            <td>${item.number ?? ""}</td>
            <td>${item.rate || ""}</td>
            <td>${item.charge || ""}</td>
           
           
           
        `;

        tbody.appendChild(row);
    });

    updateProjectSummary();
}




function renderstaffplanTable() {

    const tbody = document.getElementById("staffplandata");
    tbody.innerHTML = "";

    plannedtime.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.test || ""}</td>
            <td>${item.number ?? ""}</td>
            <td>${item.rate || "£0.00"}</td>
            <td>${item.charge || "£0.00"}</td>
            <td class="text-AlignCenter">
                <button class="btn btn-sm btn-outline-primary"
                    onclick="handleplannedtimeEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="handleplannedtimeDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateStaffPlanTotal();
}

function updateStaffPlanTotal() {
    const total = plannedtime.reduce((sum, item) => {
        return sum + parseMoney(item.charge);
    }, 0);

    const totalField = document.getElementById("planned-total-cost") || document.getElementById("External Income");
    if (!totalField) return;

    totalField.value = formatPound(total);
    updateProjectSummary();
}

function updateProjectSummary() {
    const totalActualCost = Actualtest.reduce((sum, item) => {
        return sum + parseMoney(item.charge);
    }, 0);

    const totalPlannedCost = plannedtime.reduce((sum, item) => {
        return sum + parseMoney(item.charge);
    }, 0);

    const percentOfPlan = totalPlannedCost > 0
        ? (totalActualCost / totalPlannedCost) * 100
        : 0;

    const totalField = document.getElementById("project-total-cost") || document.getElementById("External Income");
    if (totalField) {
        totalField.value = formatPound(totalActualCost);
    }

    const percentField = document.getElementById("project-percent-plan") || document.getElementById("BudgetCVL");
    if (percentField) {
        percentField.value = `${percentOfPlan.toFixed(2)}%`;
    }
}


function handleProjectDelete(id) {

    if (confirm("Are you sure you want to delete this project?")) {
        Actualtest = Actualtest.filter(item => item.id !== id);
        renderProjectTable();
    }
}

function handleplannedtimeDelete(id) {

    if (confirm("Are you sure you want to delete this planned additional cost row?")) {
        plannedtime = plannedtime.filter(item => item.id !== id);
        renderstaffplanTable();
    }
}



function handleProjectEdit(id) {

    const item = Actualtest.find(x => x.id === id);
    if (!item) return;

    editingProjectId = id;

    document.getElementById("projectModalTitle").innerText = "Edit Actual Test";

    document.getElementById("modal-actual-test").value = item.test || "";
    document.getElementById("modal-actual-wg").value = item.wg || "";
    document.getElementById("modal-actual-month").value = item.month ?? "";
    document.getElementById("modal-actual-number").value = item.number ?? "";
    document.getElementById("modal-actual-rate").value = item.rate || "";
    document.getElementById("modal-actual-charge").value = item.charge || "";

    // update selected project field
   // document.querySelector(".projectplan-code").value = item.project;

    projectModal.show();
}



function handleplannedtimeEdit(id) {

    const item = plannedtime.find(x => x.id === id);
    if (!item) return;

    staffplanId = id;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Edit Planned Additional Cost";
    }

    document.getElementById("modal-planned-test").value = item.test || "";
    document.getElementById("modal-planned-number").value = item.number ?? "";
    document.getElementById("modal-planned-rate").value = item.rate || "£0.00";
    document.getElementById("modal-planned-charge").value = item.charge || "£0.00";

    // update selected project field
    //document.querySelector(".projectplan-code").value = item.project;

    staffplanModal.show();
}


function saveProject() {

    const test   = document.getElementById("modal-actual-test").value.trim();
    const wg     = document.getElementById("modal-actual-wg").value.trim();
    const month  = document.getElementById("modal-actual-month").value.trim();
    const number = document.getElementById("modal-actual-number").value.trim();
    const rate   = document.getElementById("modal-actual-rate").value.trim();
    const charge = document.getElementById("modal-actual-charge").value.trim();

    const normalizeCurrency = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!test || !wg || !month) {
        alert("Please complete Test, WG, and Month.");
        return;
    }

    if (editingProjectId) {

        const index = Actualtest.findIndex(x => x.id === editingProjectId);

        Actualtest[index] = {
            ...Actualtest[index],
            test,
            wg,
            month: parseFloat(month) || 0,
            number: parseFloat(number) || 0,
            rate: normalizeCurrency(rate),
            charge: normalizeCurrency(charge)
        };

        editingProjectId = null;

    } else {

        const newId = Actualtest.length > 0
            ? Math.max(...Actualtest.map(x => x.id)) + 1
            : 1;

        Actualtest.push({
            id: newId,
            test,
            wg,
            month: parseFloat(month) || 0,
            number: parseFloat(number) || 0,
            rate: normalizeCurrency(rate),
            charge: normalizeCurrency(charge)
        });
    }

    renderProjectTable();
    projectModal.hide();
}




function savestaffplan() {

    const test = document.getElementById("modal-planned-test").value.trim();
    const number = document.getElementById("modal-planned-number").value.trim();
    const rate = document.getElementById("modal-planned-rate").value.trim();
    const charge = document.getElementById("modal-planned-charge").value.trim();

    const addPoundSymbol = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!test) {
        alert("Please complete the Test field.");
        return;
    }
   

    if (staffplanId) {

        const index = plannedtime.findIndex(x => x.id === staffplanId);

        plannedtime[index] = {
            ...plannedtime[index],
            test,
            number: parseFloat(number) || 0,
            rate: addPoundSymbol(rate),
            charge: addPoundSymbol(charge)
        };

        staffplanId = null;

    } else {

        const newId = plannedtime.length > 0
            ? Math.max(...plannedtime.map(x => x.id)) + 1
            : 1;

        plannedtime.push({
            id: newId,
            test,
            number: parseFloat(number) || 0,
            rate: addPoundSymbol(rate),
            charge: addPoundSymbol(charge)
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

    // Actualtest.forEach(item => {
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