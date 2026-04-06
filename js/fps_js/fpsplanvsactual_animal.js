let projectData = [
     {id: 1, description: 'SPF Egg Incubation charges - 38 @ 1.10 per egg Apr-Jun', acctCode: 'SmallAnimals', fMont: 3, amount: '$41.80' },
    {id: 2, description: 'Poultry, Medium - Small Rm 330 x 25 @ £34.08', acctCode: 'SmallAnimals', fMont: 3, amount: '$852.00' }  
	 	 
	
	
];


let staffplandata = [


    { id: 1, animalType: 'Poultry, Medium - Per Small Room', day: 14, noReq: 1, dailyR: '£34.08', cost: '£477.12' },
    {  id: 2, animalType: 'Eggs (Chicken) - Hatching', day: 1, noReq: 125, dailyR: '£1.10', cost: '£137.50' },
    {  id: 3, animalType: 'Poultry, Medium - Per Small Room', day: 21, noReq: 4, dailyR: '£34.08', cost: '£2,862.72' }
    
	
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
        titleElement.innerText = "Add Animal Plan";
    }

    document.getElementById("modal-animal-type").value = "";
    document.getElementById("modal-day").value = "";
    document.getElementById("modal-no-re").value = "";
    document.getElementById("modal-daily-rate").value = "£0.00";
    document.getElementById("modal-cost").value = "£0.00";

    staffplanModal.show();
}

function formatCurrency(value) {
    let number = parseFloat(value.toString().replace(/[£,]/g, ""));
    if (isNaN(number)) return "£0";
    return "£" + number.toLocaleString();
}

function parseMoney(value) {
    return parseFloat(String(value || "").replace(/[^\d.-]/g, "")) || 0;
}

function formatPound(value) {
    return `£${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}


function renderProjectTable() {

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    projectData.forEach(item => {

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

    staffplandata.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.animalType}</td>
            <td>${item.day}</td>
            <td>${item.noReq}</td>
            <td>${item.dailyR}</td>
            <td>${item.cost}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary"
                    onclick="handlestaffplandataEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="handlestaffplandataDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateStaffPlanTotal();
}

function updateStaffPlanTotal() {
    const total = staffplandata.reduce((sum, item) => {
        return sum + parseMoney(item.cost);
    }, 0);

    const totalField = document.getElementById("planned-total-cost") || document.getElementById("External Income");
    if (!totalField) return;

    totalField.value = formatPound(total);
    updateProjectSummary();
}

function updateProjectSummary() {
    const totalActualCost = projectData.reduce((sum, item) => {
        return sum + parseMoney(item.amount);
    }, 0);

    const totalPlannedCost = staffplandata.reduce((sum, item) => {
        return sum + parseMoney(item.cost);
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
        projectData = projectData.filter(item => item.id !== id);
        renderProjectTable();
    }
}

function handlestaffplandataDelete(id) {

    if (confirm("Are you sure you want to delete this animal row?")) {
        staffplandata = staffplandata.filter(item => item.id !== id);
        renderstaffplanTable();
    }
}



function handleProjectEdit(id) {

    const item = projectData.find(x => x.id === id);
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



function handlestaffplandataEdit(id) {

    const item = staffplandata.find(x => x.id === id);
    if (!item) return;

    staffplanId = id;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Edit Animal Plan";
    }

    document.getElementById("modal-animal-type").value = item.animalType;
    document.getElementById("modal-day").value = item.day;
    document.getElementById("modal-no-re").value = item.noReq;
    document.getElementById("modal-daily-rate").value = item.dailyR;
    document.getElementById("modal-cost").value = item.cost;

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
        const cleanedValue = (value || "").trim();
        if (!cleanedValue) return "£0";
        return /^[£$]/.test(cleanedValue) ? cleanedValue : `£${cleanedValue}`;
    };

    if (!description || !acctCode || !fMont) {
        alert("Please complete Description, Acct Code, and F.Mont.");
        return;
    }

    if (editingProjectId) {

        const index = projectData.findIndex(x => x.id === editingProjectId);

        projectData[index] = {
            ...projectData[index],
            description,
            acctCode,
            fMont,
            amount: normalizeCurrency(amount)
          
        };

        editingProjectId = null;

    } else {

        const newId = projectData.length > 0
            ? Math.max(...projectData.map(x => x.id)) + 1
            : 1;

        projectData.push({
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

    const animalType = document.getElementById("modal-animal-type").value.trim();
    const day = document.getElementById("modal-day").value.trim();
    const noReq = document.getElementById("modal-no-re").value.trim();
    const dailyR = document.getElementById("modal-daily-rate").value.trim();
    const cost = document.getElementById("modal-cost").value.trim();

    const addPoundSymbol = (value) => {
        const cleanedValue = (value || "").trim();
        if (!cleanedValue) return "£0";
        return cleanedValue.startsWith("£") ? cleanedValue : `£${cleanedValue}`;
    };

    if (!animalType || !day || !noReq) {
        alert("Please complete Animal Type, Days, and No.Req.");
        return;
    }
   

    if (staffplanId) {

        const index = staffplandata.findIndex(x => x.id === staffplanId);

        staffplandata[index] = {
            ...staffplandata[index],
            animalType,
            day,
            noReq,
            dailyR: addPoundSymbol(dailyR),
            cost: addPoundSymbol(cost)
          
        };

        staffplanId = null;

    } else {

        const newId = staffplandata.length > 0
            ? Math.max(...staffplandata.map(x => x.id)) + 1
            : 1;

        staffplandata.push({
            id: newId,
            animalType,
            day,
            noReq,
            dailyR: addPoundSymbol(dailyR),
            cost: addPoundSymbol(cost)
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

    // projectData.forEach(item => {
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