let projectData = [
    {
        id: 1,
        project: "AH0011",
        description: "Support for ESRG London",
        manager: "Prendergast, Jeff",
        program: "DoES",
        projectGroup: "AHVLA_PROG",
        customer: "Animal Health",
        contract: "DM Other D",
        disease: "Not Specified",
        status: "Approved",
        budget: "£100000",
        costInc: "£20000",
        transInc: "£0",
        cwDebit: "£0"
    },
    {
        id: 2,
        project: "APHA4H1061",
        description: "Science Computation Enhancement",
        manager: "Garvill, Moreen",
        program: "DoES",
        projectGroup: "ZT_Prog",
        customer: "APHA",
        contract: "ZTGen",
        disease: "Not Specified",
        status: "Approved",
        budget: "£50000",
        costInc: "£10000",
        transInc: "£0",
        cwDebit: "£0"
    }
];

let editingProjectId = null;
let projectModal;


document.addEventListener("DOMContentLoaded", function () {

    projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    renderProjectTable();
});


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
            <td>${item.manager}</td>
            <td>${item.program}</td>
            <td>${item.projectGroup}</td>
            <td>${item.customer}</td>
            <td>${item.contract}</td>
            <td>${item.disease}</td>
            <td>${item.status}</td>
            <td class="text-end">${item.budget}</td>
            <td class="text-end">${item.costInc}</td>
            <td class="text-end">${item.transInc}</td>
            <td class="text-end">${item.cwDebit}</td>
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

    updateProjectTotals();
}



function handleProjectDelete(id) {

    if (confirm("Are you sure you want to delete this project?")) {
        projectData = projectData.filter(item => item.id !== id);
        renderProjectTable();
    }
}



function handleProjectEdit(id) {

    const item = projectData.find(x => x.id === id);
    if (!item) return;

    editingProjectId = id;

    document.getElementById("projectModalTitle").innerText = "Edit Project";

    document.getElementById("modal-project").value = item.project;
    document.getElementById("modal-description").value = item.description;
    document.getElementById("modal-manager").value = item.manager;
    document.getElementById("modal-program").value = item.program;
	  document.getElementById("modal-customer").value = item.customer;
	   document.getElementById("modal-projectGroup").value = item.projectGroup;
	    document.getElementById("modal-contract").value = item.contract;
	   document.getElementById("modal-disease").value = item.disease;
	    document.getElementById("modal-status").value = item.status;
    document.getElementById("modal-budget").value = item.budget;
    document.getElementById("modal-costInc").value = item.costInc;
    document.getElementById("modal-transInc").value = item.transInc;
    document.getElementById("modal-cwDebit").value = item.cwDebit;

    // update selected project field
    document.querySelector(".projectplan-code").value = item.project;

    projectModal.show();
}



function saveProject() {

    const project = document.getElementById("modal-project").value;
    const description = document.getElementById("modal-description").value;
    const manager = document.getElementById("modal-manager").value;
    const program = document.getElementById("modal-program").value;
	
	 const customer = document.getElementById("modal-customer").value;
	 const projectGroup  =  document.getElementById("modal-projectGroup").value;
	  const contract =   document.getElementById("modal-contract").value;
	  const disease  = document.getElementById("modal-disease").value;
	  const status  =  document.getElementById("modal-status").value;

    const budget = formatCurrency(document.getElementById("modal-budget").value);
    const costInc = formatCurrency(document.getElementById("modal-costInc").value);
    const transInc = formatCurrency(document.getElementById("modal-transInc").value);
    const cwDebit = formatCurrency(document.getElementById("modal-cwDebit").value);

    if (editingProjectId) {

        const index = projectData.findIndex(x => x.id === editingProjectId);

        projectData[index] = {
            ...projectData[index],
            project,
            description,
            manager,
            program,
			customer,
			projectGroup,
			contract,
			disease,
			status,
            budget,
            costInc,
            transInc,
            cwDebit
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
            manager,
            program,
            projectGroup: "",
            customer: "",
            contract: "",
            disease: "",
            status: "Approved",
            budget,
            costInc,
            transInc,
            cwDebit
        });
    }

    renderProjectTable();
    projectModal.hide();
}


function updateProjectTotals() {

    let totalBudget = 0;
    let totalCost = 0;
    let totalTrans = 0;
    let totalDebit = 0;

    projectData.forEach(item => {
        totalBudget += parseFloat(item.budget.replace(/[£,]/g, "")) || 0;
        totalCost += parseFloat(item.costInc.replace(/[£,]/g, "")) || 0;
        totalTrans += parseFloat(item.transInc.replace(/[£,]/g, "")) || 0;
        totalDebit += parseFloat(item.cwDebit.replace(/[£,]/g, "")) || 0;
    });

    const inputs = document.querySelectorAll(".financial-summary input");

    inputs[0].value = formatCurrency(totalBudget);
    inputs[1].value = formatCurrency(totalCost);
    inputs[2].value = formatCurrency(totalTrans);
    inputs[3].value = formatCurrency(totalDebit);
}