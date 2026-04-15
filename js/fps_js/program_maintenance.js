let projectData = [
    {
        id: 1,
        WrkGrp: "AS2",
        Grade: "F",
        Jobcode: "CSKN0047",
        ATStaffName: "Gibbings, Ulrike",
		Mnth :"4",
		Hrs: "9",
		Cost:"£597",
      
    },
	
    {
        id: 2,
        WrkGrp: "AS3",
        Grade: "E",
        Jobcode: "CSKN0047",
        ATStaffName: "Gudeman, Conan",
		Mnth :"4",
		Hrs: "2",
		Cost:"£133",
    },
	
	{
        id: 3,
        WrkGrp: "AS3",
        Grade: "F",
        Jobcode: "CSKN0047",
        ATStaffName: "Mainson, Hermy",
		Mnth :"4",
		Hrs: "12",
		Cost:"£876",
    },
	
	
	{
        id: 4,
          WrkGrp: "AS3",
        Grade: "F",
        Jobcode: "CSKN0047",
        ATStaffName: "Leaney, Dick",
		Mnth :"4",
		Hrs: "4",
		Cost:"£265",
    },
	
	
	{
        id: 5,
        WrkGrp: "AS3",
        Grade: "F",
        Jobcode: "CSKN0047",
        ATStaffName: "Puddle, Paige",
		Mnth :"4",
		Hrs: "2",
		Cost:"£133",
    },
	
	{
        id: 6,
        WrkGrp: "AS3",
        Grade: "E",
        Jobcode: "CSKN0047",
        ATStaffName: "Roj, Trace",
		Mnth :"4",
		Hrs: "5",
		Cost:"£365",
    },
	
	{
        id: 7,
         WrkGrp: "SSP1",
        Grade: "E",
        Jobcode: "CSKN0047",
        ATStaffName: "Larkin, Shannon",
		Mnth :"4",
		Hrs: "7",
		Cost:"£511",
    },   
	 	 
	
	
];

let staffplandata = [
    { id: 1, program: 'ADMIN', name: 'Admin', directorate: 'BSD', target: '£0.00', manager: 'Simmons, Ray' },
    { id: 2, program: 'ASLI', name: 'Animal Sciences Unit', directorate: 'Science', target: '£0.00', manager: 'Beavon, Corabelle' },
    { id: 3, program: 'B&M', name: 'Biotechnology & Microbiology', directorate: 'Science', target: '£0.00', manager: 'Lacaze, Cal' },
    { id: 4, program: 'Bact', name: 'Bacteriology', directorate: 'Science', target: '£0.00', manager: 'East, Samantha' },
    { id: 5, program: 'Bee Advice', name: 'NBU Advisory', directorate: 'Science', target: '£0.00', manager: 'Limprecht, Lita' },
    { id: 6, program: 'Bee Insp', name: 'Bee Inspectorate', directorate: 'Operations', target: '£0.00', manager: 'Limprecht, Lita' },
    { id: 7, program: 'BTB', name: 'Bovine TB', directorate: 'Science', target: '£0.00', manager: 'Balloch, Matthaeus' },
    { id: 8, program: 'Comm', name: 'Commercial Programme DIDIB', directorate: 'Finance', target: '£0.00', manager: 'Killik, Jania' },
    { id: 9, program: 'CSU', name: 'Central Sequencing Unit', directorate: 'Science', target: '£0.00', manager: 'Lacaze, Cal' },
    { id: 10, program: 'DoES', name: 'Department of Epidemiological Sciences', directorate: 'Science', target: '£0.00', manager: 'Snow, Eric' },
    { id: 11, program: 'DSG', name: 'Data Systems Group', directorate: 'Science', target: '£0.00', manager: 'Paradyce, Lauree' },
    { id: 12, program: 'EFProgram', name: 'EF Program', directorate: 'Surveillance', target: '£0.00', manager: 'Abad, Jasen' },
    { id: 13, program: 'EU Exit', name: 'EU Exit Programme', directorate: 'EU Exit', target: '£0.00', manager: 'Base, Danella' },
    { id: 14, program: 'GM', name: 'GM Inspectorate', directorate: 'Science', target: '£0.00', manager: 'Bradnam, Arlie' }
	
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
        titleElement.innerText = "Add Program";
    }

    document.getElementById("modal-program").value = "";
    document.getElementById("modal-program-name").value = "";
    document.getElementById("modal-directorate").value = "";
    document.getElementById("modal-target").value = "£0.00";
    document.getElementById("modal-manager").value = "";

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
            <td>${item.WrkGrp}</td>
            <td>${item.Grade}</td>
            <td>${item.Jobcode}</td>
            <td>${item.ATStaffName}</td>
			  <td>${item.Mnth}</td>			 
			 <td>${item.Hrs}</td>
			  <td>${item.Cost}</td>
           
           
           
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
            <td>${item.program}</td>
            <td>${item.name}</td>
            <td>${item.directorate}</td>
            <td>${item.target}</td>
            <td>${item.manager}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" aria-label="Edit program ${item.program}"
                    onclick="handlestaffplandataEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="" aria-hidden="true" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger" aria-label="Delete program ${item.program}"
                    onclick="handlestaffplandataDelete(${item.id})"><img src="../images/trash-can-regular-full.svg" alt="" aria-hidden="true"
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

    showGovukConfirm("Are you sure you want to delete this program?").then((result) => {
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

    document.getElementById("modal-WrkGrp").value = item.WrkGrp;
    document.getElementById("modal-Grade").value = item.Grade;
    document.getElementById("modal-Jobcode").value = item.Jobcode;
    document.getElementById("modal-ATStaffName").value = item.ATStaffName;
	 document.getElementById("modal-Mnth").value = item.Mnth;
  
   document.getElementById("modal-Hrs").value = item.Hrs;
    document.getElementById("modal-Cost").value = item.Cost;

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
        titleElement.innerText = "Edit Program";
    }

    document.getElementById("modal-program").value = item.program;
    document.getElementById("modal-program-name").value = item.name;
    document.getElementById("modal-directorate").value = item.directorate;
    document.getElementById("modal-target").value = item.target;
    document.getElementById("modal-manager").value = item.manager;

    // update selected project field
    //document.querySelector(".projectplan-code").value = item.project;

    staffplanModal.show();
}


function saveProject() {

    const WrkGrp = document.getElementById("modal-WrkGrp").value;
    const Grade = document.getElementById("modal-Grade").value;
    const Jobcode = document.getElementById("modal-Jobcode").value;
    const ATStaffName = document.getElementById("modal-ATStaffName").value;

    const Mnth = document.getElementById("modal-Mnth").value;
	 const Hrs = document.getElementById("modal-Hrs").value;
	  const Cost = document.getElementById("modal-Cost").value;

    if (editingProjectId) {

        const index = projectData.findIndex(x => x.id === editingProjectId);

        projectData[index] = {
            ...projectData[index],
            WrkGrp,
            Grade,           
            Jobcode,
            ATStaffName,
			Mnth,
			Hrs,
			Cost
          
        };

        editingProjectId = null;

    } else {

        const newId = projectData.length > 0
            ? Math.max(...projectData.map(x => x.id)) + 1
            : 1;

        projectData.push({
            id: newId,
            WrkGrp,
            Grade,           
            Jobcode,
            ATStaffName,
			Mnth,
			Hrs,
			Cost
        });
    }

    renderProjectTable();
    projectModal.hide();
}




function savestaffplan() {

    const program = document.getElementById("modal-program").value.trim();
    const name = document.getElementById("modal-program-name").value.trim();
    const directorate = document.getElementById("modal-directorate").value.trim();
    const target = document.getElementById("modal-target").value.trim();
    const manager = document.getElementById("modal-manager").value.trim();

    const addPoundSymbol = (value) => {
        const cleanedValue = (value || "").trim();
        if (!cleanedValue) return "£0";
        return cleanedValue.startsWith("£") ? cleanedValue : `£${cleanedValue}`;
    };

    if (!program || !name || !directorate || !manager) {
        showGovukAlert("Please complete Program, Program Name, Directorate, and Manager.");
        return;
    }
   

    if (staffplanId) {

        const index = staffplandata.findIndex(x => x.id === staffplanId);

        staffplandata[index] = {
            ...staffplandata[index],
			program,
            name,
            directorate,
            target: addPoundSymbol(target),
            manager
			
          
        };

        staffplanId = null;

    } else {

        const newId = staffplandata.length > 0
            ? Math.max(...staffplandata.map(x => x.id)) + 1
            : 1;

        staffplandata.push({
            id: newId,
			program,
            name,
            directorate,
            target: addPoundSymbol(target),
            manager
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