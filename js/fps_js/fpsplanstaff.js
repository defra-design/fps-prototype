let projectData = [
    {
        id: 1,
        project: "APHAOBOM0421",
        description: "Covid-19 - BACTERIOLOGY WORK",
        budget: "£0.00",
        IsDefraProject: "0"
      
    },
    {
        id: 2,
        project: " BAC2PORT1",
        description: "BAC2 Testing (exc Disinfectants)",
        budget: "£0.00",
        IsDefraProject: "-1"
    },
	
	{
        id: 3,
        project: "BAC3PORT1",
        description: "Brucella Special Testing",
        budget: "£0.00",
        IsDefraProject: "-1"
    },
	
	
	{
        id: 4,
        project: "BAC3PORT2",
        description: "Anthrax Diagnosis",
        budget: "£0.00",
        IsDefraProject: "-1"
    },
	
	
	{
        id: 5,
        project: " BAC5PORT1",
        description: "Brucella Testing BAC5",
        budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 6,
        project: "CSKB0020",
        description: "Mycoplasma culture collection 4",
        budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 7,
        project: " CSKD0001",
        description: "Disinfectant testing certificates",
        budget: "£3,698.24",
        IsDefraProject: "0"
    },   
	 
	 
	 {
        id: 8,
        project: " CSKL0091",
        description: "Salmonella in feed mills",
       budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 9,
        project: "  CSKL0092",
        description: "Study to investigate vaccine uptake in flocks of layer chickens",
       budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 10,
        project: "   CSKL0093",
        description: "Salmonella vaccine survival - extended work",
       budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 11,
        project: "CSKP0045",
        description: "Microbial profiling and plate counts for 48 wastewater samples",
		budget: "£0.00",
        IsDefraProject: "0"
    },
	
	{
        id: 12,
        project: "CSKT0027",
        description: "Provide training to project partners in Andhra Pradesh on diagnostic methods for brucellosis",
		budget: "£0.00",
        IsDefraProject: "0"
    },
	
	
];

let staffplandata = [
    {
        id: 1,
        name: "C_BAC2,General",
        rate: "£70",
        hrs: "0",
        days: "0.00",
		staffcost: "£0",
      
    },
    {
        id: 2,
        name: "D_BAC2,General",
        rate: "£59",
        hrs: "0",
        days: "0.00",
		staffcost: "£0",
    },
	
	{
        id: 3,
        name: "E_BAC2,General",
        rate: "£53",
        hrs: "0",
        days: "0.00",
		staffcost: "£0",
    },
	
	
	{
        id: 4,
        name: "F_BAC2,General",
        rate: "£47",
        hrs: "0",
        days: "0.00",
		staffcost: "£0",
    },
	
	
	
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
        titleElement.innerText = "Add Staff Plan";
    }

    document.getElementById("modal-name").value = "";
    document.getElementById("modal-rate").value = "";
    document.getElementById("modal-hrs").value = "";
    document.getElementById("modal-days").value = "";
    document.getElementById("modal-staffcost").value = "";

    staffplanModal.show();
}

function formatCurrency(value) {
    let number = parseFloat(value.toString().replace(/[£,]/g, ""));
    if (isNaN(number)) return "£0";
    return "£" + number.toLocaleString();
}


function renderProjectTable() {

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    projectData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.project}</td>
            <td>${item.description}</td>
            <td>${item.budget}</td>
            <td>${item.IsDefraProject}</td>
           
           
            <td>
                <button class="btn btn-sm btn-outline-primary"
                    onclick="handleProjectEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="Edit icon for selected record" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="handleProjectDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="Delete icon for selected record"
                                                                                 width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

   // updateProjectTotals();
}




function renderstaffplanTable() {

    const tbody = document.getElementById("staffplandata");
    tbody.innerHTML = "";

    staffplandata.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.rate}</td>
            <td>${item.hrs}</td>
            <td>${item.days}</td>           
            <td>${item.staffcost}</td>
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

    //updateProjectTotals();
}


function handleProjectDelete(id) {

    showGovukConfirm("Are you sure you want to delete this project?").then((result) => {
        if (result) {
        projectData = projectData.filter(item => item.id !== id);
        renderProjectTable();
    }
    });
}

function handlestaffplandataDelete(id) {

    showGovukConfirm("Are you sure you want to delete this project?").then((result) => {
        if (result) {
        staffplandata = staffplandata.filter(item => item.id !== id);
        renderstaffplanTable();
    }
    });
}



function handleProjectEdit(id) {

    const item = projectData.find(x => x.id === id);
    if (!item) return;

    editingProjectId = id;

    document.getElementById("projectModalTitle").innerText = "Edit Project";

    document.getElementById("modal-project").value = item.project;
    document.getElementById("modal-description").value = item.description;
    document.getElementById("modal-budget").value = item.budget;
    document.getElementById("modal-IsDefraProject").value = item.IsDefraProject;
  

    // update selected project field
    document.querySelector(".projectplan-code").value = item.project;

    projectModal.show();
}



function handlestaffplandataEdit(id) {

    const item = staffplandata.find(x => x.id === id);
    if (!item) return;

    staffplanId = id;

    const staffPlanModalEl = document.getElementById("staffplanModal");
    const titleElement = staffPlanModalEl ? staffPlanModalEl.querySelector(".modal-title") : null;
    if (titleElement) {
        titleElement.innerText = "Edit Staff Plan";
    }

    document.getElementById("modal-name").value = item.name;
    document.getElementById("modal-rate").value = item.rate;
    document.getElementById("modal-hrs").value = item.hrs;
    document.getElementById("modal-days").value = item.days;
   document.getElementById("modal-staffcost").value = item.staffcost;

    // update selected project field
    //document.querySelector(".projectplan-code").value = item.project;

    staffplanModal.show();
}


function saveProject() {

    const project = document.getElementById("modal-project").value;
    const description = document.getElementById("modal-description").value;
    const budget = document.getElementById("modal-budget").value;
    const IsDefraProject = document.getElementById("modal-IsDefraProject").value;

   

    if (editingProjectId) {

        const index = projectData.findIndex(x => x.id === editingProjectId);

        projectData[index] = {
            ...projectData[index],
            project,
            description,           
            budget,
            IsDefraProject
          
        };

        editingProjectId = null;

    } else {

        const newId = projectData.length > 0
            ? Math.max(...projectData.map(x => x.id)) + 1
            : 1;

        projectData.push({
            id: newId,
            project,
            description,           
            budget,
           IsDefraProject
        });
    }

    renderProjectTable();
    projectModal.hide();
}




function savestaffplan() {

    const name = document.getElementById("modal-name").value;
    const rate = document.getElementById("modal-rate").value;
    const hrs = document.getElementById("modal-hrs").value;
    const days = document.getElementById("modal-days").value;
    const staffcost = document.getElementById("modal-staffcost").value;

    const addPoundSymbol = (value) => {
        const cleanedValue = (value || "").trim();
        if (!cleanedValue) return "£0";
        return cleanedValue.startsWith("£") ? cleanedValue : `£${cleanedValue}`;
    };
   

    if (staffplanId) {

        const index = staffplandata.findIndex(x => x.id === staffplanId);

        staffplandata[index] = {
            ...staffplandata[index],
            name,
            rate,           
            hrs,
            days,
			staffcost
          
        };

        staffplanId = null;

    } else {

        const newId = staffplandata.length > 0
            ? Math.max(...staffplandata.map(x => x.id)) + 1
            : 1;

        staffplandata.push({
            id: newId,
            name,
            rate: addPoundSymbol(rate),           
            hrs,
            days,
			staffcost: addPoundSymbol(staffcost)
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