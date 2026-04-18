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
    {
        id: 1,
        spnumber: "000005",
        lastname: "G_V11",
        firstname: "General",
        title: "",
		
      
    },
    {
        id: 2,
        spnumber: "000006",
        lastname: "D_AS3 SA",
        firstname: "",
        title: "",
    },
	
	{
        id: 3,
        spnumber: "000009",
        lastname: "Cordero-Peters",
        firstname: "Ruth",
        title: "",
    },
	
	
	{
        id: 4,
         spnumber: "000010",
        lastname: "Phillips",
        firstname: "Andrew",
        title: "",
    },
	
		{
        id: 5,
        spnumber: "000033",
        lastname: "C_ROWA",
        firstname: "Genral",
        title: "",
    },
	
	
	{
        id: 6,
        spnumber: "000043",
        lastname: "Harraway",
        firstname: "Donna",
        title: "",
    },
	
	
	{
        id: 7,
        spnumber: "000044",
        lastname: "Rossi",
        firstname: "Pedro",
        title: "",
    },
		
	{
        id: 8,
        spnumber: "000048",
        lastname: "Abascal",
        firstname: "Ruth",
        title: "",
    },
	
	{
        id: 9,
        spnumber: "000069",
        lastname: "ESci_Poultry",
        firstname: "",
        title: "",
    },
		
	
	{
        id: 10,
        spnumber: "000070",
        lastname: "ESCI_265",
        firstname: "",
        title: "",
    },
	
	{
        id: 11,
        spnumber: "000071",
        lastname: "ESCI_266",
        firstname: "",
        title: "",
    },
	{
        id: 12,
        spnumber: "000072",
        lastname: "ESCI_267",
        firstname: "",
        title: "",
    },
	
		{
        id: 13,
        spnumber: "T195",
        lastname: "D_PHSI-E",
        firstname: "general",
        title: "",
    },
	
		{
        id: 15,
        spnumber: "T369",
        lastname: "C_PHSI-SE",
        firstname: "General",
        title: "",
    },
	
	{
        id: 16,
        spnumber: "T452",
        lastname: "F_BM1",
        firstname: "General",
        title: "",
    },
	
	
	{
        id: 17,
        spnumber: "G100",
        lastname: "C_PHSI-NE",
        firstname: "General",
        title: "",
    },
	
	{
        id: 18,
        spnumber: "G1000",
        lastname: "B_SSP1",
        firstname: "General",
        title: "",
    },
	
	{
        id: 19,
        spnumber: "G1001",
        lastname: "ESCI_Halls",
        firstname: "General",
        title: "",
    },
	
	{
        id: 20,
        spnumber: "G1005",
        lastname: "E_SCI_Transport",
        firstname: "General",
        title: "",
    },
	
	{
        id: 21,
        spnumber: "G1006",
        lastname: "A_PVS",
        firstname: "General",
        title: "",
    },
	
		{
        id: 22,
        spnumber: "G1007",
        lastname: "B_PVS",
        firstname: "General",
        title: "",
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

    const staffFilterRadios = document.querySelectorAll('input[name="staffFilter"]');
    staffFilterRadios.forEach(radio => {
        radio.addEventListener("change", renderstaffplanTable);
    });

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

    document.getElementById("modal-spnumber").value = "";
    document.getElementById("modal-lastname").value = "";
    document.getElementById("modal-firstname").value = "";
    document.getElementById("modal-title").value = "";
  //  document.getElementById("modal-staffcost").value = "";

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

    const selectedFilter = document.querySelector('input[name="staffFilter"]:checked')?.value || "all";
    const filteredStaffPlanData = staffplandata.filter(item => {
        const spnumber = (item.spnumber || "").toUpperCase();

        if (selectedFilter === "temp-sp-only") {
            return spnumber.startsWith("T");
        }

        if (selectedFilter === "generic-grades-only") {
            return spnumber.startsWith("G");
        }

        return true;
    });

    filteredStaffPlanData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.spnumber}</td>
            <td>${item.lastname}</td>
            <td>${item.firstname}</td>
            <td>${item.title}</td>          
            <td>
                <button class="btn btn-sm btn-outline-primary" aria-label="Edit staff record ${item.spnumber}"
                    onclick="handlestaffplandataEdit(${item.id})"><img src="../images/pen-to-square-regular-full.svg"
                                                                                 alt="" aria-hidden="true" class="editstaffname"
                                                                                 width="20">
                </button>

                <button class="btn btn-sm btn-outline-danger" aria-label="Delete staff record ${item.spnumber}"
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

    if (confirm("Are you sure you want to delete this project?")) {
        projectData = projectData.filter(item => item.id !== id);
        renderProjectTable();
    }
}

function handlestaffplandataDelete(id) {

    if (confirm("Are you sure you want to delete this project?")) {
        staffplandata = staffplandata.filter(item => item.id !== id);
        renderstaffplanTable();
    }
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
        titleElement.innerText = "Edit Staff Plan";
    }

    document.getElementById("modal-spnumber").value = item.spnumber;
    document.getElementById("modal-lastname").value = item.lastname;
    document.getElementById("modal-firstname").value = item.firstname;
    document.getElementById("modal-title").value = item.title;
  // document.getElementById("modal-staffcost").value = item.staffcost;

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

    const name = document.getElementById("modal-spnumber").value;
    const rate = document.getElementById("modal-firstname").value;
    const hrs = document.getElementById("modal-lastname").value;
    const days = document.getElementById("modal-title").value;
   // const staffcost = document.getElementById("modal-staffcost").value;

    const addPoundSymbol = (value) => {
        const cleanedValue = (value || "").trim();
        if (!cleanedValue) return "£0";
        return cleanedValue.startsWith("£") ? cleanedValue : `£${cleanedValue}`;
    };
   

    if (staffplanId) {

        const index = staffplandata.findIndex(x => x.id === staffplanId);

        staffplandata[index] = {
            ...staffplandata[index],
            spnumber,
            lastname,           
            firstname,
            title
			
          
        };

        staffplanId = null;

    } else {

        const newId = staffplandata.length > 0
            ? Math.max(...staffplandata.map(x => x.id)) + 1
            : 1;

        staffplandata.push({
            id: newId,
            spnumber,
            //rate: addPoundSymbol(rate),   
lastname,			
            firstname,
            title,
			//staffcost: addPoundSymbol(staffcost)
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