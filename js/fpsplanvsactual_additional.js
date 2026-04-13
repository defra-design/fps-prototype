let ActualAdditionalCost = [
    { id: 1, description: 'EA - Accr for Fuel Cards Rchg - Jan 25 to', acctCode: '10062313-5223100', fMont: 1, amount: '£110.12' },
    { id: 2, description: 'EA - Accr for Novuna Fleet SIMAR - Rchg -', acctCode: '10062313-5223100', fMont: 1, amount: '£35.56' },
    { id: 3, description: 'EA - Accr for Fuel Cards Rchg - Jan 25 to', acctCode: '10066215-5223100', fMont: 1, amount: '£211.63' },
    { id: 4, description: 'EA - Accr for Novuna Fleet SIMAR - Mgmt F', acctCode: '10066215-5223100', fMont: 1, amount: '£34.47' },
    { id: 5, description: 'EA - Accrual for Fuel Cards Rchgs - Jan 25 to', acctCode: '10062313-5223100', fMont: 2, amount: '£183.53' },
    { id: 6, description: 'EA - Accrual for Novuna Fleet SIMAR - Rchgs -', acctCode: '10062313-5223100', fMont: 2, amount: '£53.34' },
    { id: 7, description: 'EA - Accrual for Fuel Cards Rchgs - Jan 25 to', acctCode: '10066215-5223100', fMont: 2, amount: '£352.72' },
    { id: 8, description: 'EA - Accrual for Novuna Fleet SIMAR - Management F', acctCode: '10066215-5223100', fMont: 2, amount: '£48.25' },
    { id: 9, description: 'EA - Accr for Fuel Cards recharges - Jan 25 to', acctCode: '10062313-5223100', fMont: 3, amount: '£220.24' },
    { id: 10, description: 'EA - Accr for Fuel Cards recharges - Jan 25 to', acctCode: '10062313-5223100', fMont: 3, amount: '£183.53' },
    { id: 11, description: 'EA - Accr for Novuna Fleet SIMAR - Recharges -', acctCode: '10062313-5223100', fMont: 3, amount: '£53.34' },
    { id: 12, description: 'EA - Accr for Novuna Fleet SIMAR - Recharges -', acctCode: '10062313-5223100', fMont: 3, amount: '£62.23' }
];


let plannedAdditionalCost = [


    { id: 1, description: 'Animals', account: 'Animals', totalCost: '£0.00', freqOrMonth: '', supplier: '' },
    { id: 2, description: 'Lab consumables', account: 'Consumables', totalCost: '£0.00', freqOrMonth: '', supplier: '' },
    { id: 3, description: 'Vaccine construction', account: 'Consumables', totalCost: '£0.00', freqOrMonth: '', supplier: '' }
    
	
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

    document.getElementById("modal-planned-description").value = "";
    document.getElementById("modal-planned-account").value = "";
    document.getElementById("modal-planned-total-cost").value = "£0.00";
    document.getElementById("modal-planned-freq-month").value = "";
    document.getElementById("modal-planned-supplier").value = "";

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

    ActualAdditionalCost.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.acctCode}</td>
            <td>${item.fMont}</td>
            <td>${item.amount}</td>
           
           
           
        `;

        tbody.appendChild(row);
    });

    updateProjectSummary();
}




function renderstaffplanTable() {

    const tbody = document.getElementById("staffplandata");
    tbody.innerHTML = "";

    plannedAdditionalCost.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description || ""}</td>
            <td>${item.account || ""}</td>
            <td>${item.totalCost || "£0.00"}</td>
            <td>${item.freqOrMonth || ""}</td>
            <td>${item.supplier || ""}</td>
            <td class="text-AlignCenter">
                <button class="btn btn-sm btn-outline-primary"
                    onclick="handleplannedAdditionalCostEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="handleplannedAdditionalCostDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateStaffPlanTotal();
}

function updateStaffPlanTotal() {
    const total = plannedAdditionalCost.reduce((sum, item) => {
        return sum + parseMoney(item.totalCost);
    }, 0);

    const totalField = document.getElementById("planned-total-cost") || document.getElementById("External Income");
    if (!totalField) return;

    totalField.value = formatPound(total);
    updateProjectSummary();
}

function updateProjectSummary() {
    const totalActualCost = ActualAdditionalCost.reduce((sum, item) => {
        return sum + parseMoney(item.amount);
    }, 0);

    const totalPlannedCost = plannedAdditionalCost.reduce((sum, item) => {
        return sum + parseMoney(item.totalCost);
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
        ActualAdditionalCost = ActualAdditionalCost.filter(item => item.id !== id);
        renderProjectTable();
    }
}

function handleplannedAdditionalCostDelete(id) {

    if (confirm("Are you sure you want to delete this planned additional cost row?")) {
        plannedAdditionalCost = plannedAdditionalCost.filter(item => item.id !== id);
        renderstaffplanTable();
    }
}



function handleProjectEdit(id) {

    const item = ActualAdditionalCost.find(x => x.id === id);
    if (!item) return;

    editingProjectId = id;

    document.getElementById("projectModalTitle").innerText = "Edit Actual Time";

    document.getElementById("modal-description").value = item.description;
    document.getElementById("modal-acct-code").value = item.acctCode;
    document.getElementById("modal-f-mont").value = item.fMont;
    document.getElementById("modal-amount").value = item.amount;

    // update selected project field
   // document.querySelector(".projectplan-code").value = item.project;

    projectModal.show();
}



function handleplannedAdditionalCostEdit(id) {

    const item = plannedAdditionalCost.find(x => x.id === id);
    if (!item) return;

    staffplanId = id;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Edit Planned Additional Cost";
    }

    document.getElementById("modal-planned-description").value = item.description || "";
    document.getElementById("modal-planned-account").value = item.account || "";
    document.getElementById("modal-planned-total-cost").value = item.totalCost || "£0.00";
    document.getElementById("modal-planned-freq-month").value = item.freqOrMonth || "";
    document.getElementById("modal-planned-supplier").value = item.supplier || "";

    // update selected project field
    //document.querySelector(".projectplan-code").value = item.project;

    staffplanModal.show();
}


function saveProject() {

    const description = document.getElementById("modal-description").value.trim();
    const acctCode = document.getElementById("modal-acct-code").value.trim();
    const fMont = document.getElementById("modal-f-mont").value.trim();
    const amount = document.getElementById("modal-amount").value.trim();

    const normalizeCurrency = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!description || !acctCode || !fMont) {
        alert("Please complete Description, Acct Code, and F.Mont.");
        return;
    }

    if (editingProjectId) {

        const index = ActualAdditionalCost.findIndex(x => x.id === editingProjectId);

        ActualAdditionalCost[index] = {
            ...ActualAdditionalCost[index],
            description,
            acctCode,
            fMont,
            amount: normalizeCurrency(amount)
          
        };

        editingProjectId = null;

    } else {

        const newId = ActualAdditionalCost.length > 0
            ? Math.max(...ActualAdditionalCost.map(x => x.id)) + 1
            : 1;

        ActualAdditionalCost.push({
            id: newId,
            description,
            acctCode,
            fMont,
            amount: normalizeCurrency(amount)
        });
    }

    renderProjectTable();
    projectModal.hide();
}




function savestaffplan() {

    const description = document.getElementById("modal-planned-description").value.trim();
    const account = document.getElementById("modal-planned-account").value.trim();
    const totalCost = document.getElementById("modal-planned-total-cost").value.trim();
    const freqOrMonth = document.getElementById("modal-planned-freq-month").value.trim();
    const supplier = document.getElementById("modal-planned-supplier").value.trim();

    const addPoundSymbol = (value) => {
        return formatSignedPound(parseMoney(value));
    };

    if (!description || !account) {
        alert("Please complete Description and Account.");
        return;
    }
   

    if (staffplanId) {

        const index = plannedAdditionalCost.findIndex(x => x.id === staffplanId);

        plannedAdditionalCost[index] = {
            ...plannedAdditionalCost[index],
            description,
            account,
            totalCost: addPoundSymbol(totalCost),
            freqOrMonth,
            supplier
          
        };

        staffplanId = null;

    } else {

        const newId = plannedAdditionalCost.length > 0
            ? Math.max(...plannedAdditionalCost.map(x => x.id)) + 1
            : 1;

        plannedAdditionalCost.push({
            id: newId,
            description,
            account,
            totalCost: addPoundSymbol(totalCost),
            freqOrMonth,
            supplier
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

    // ActualAdditionalCost.forEach(item => {
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