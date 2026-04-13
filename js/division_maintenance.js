let divisionData = [
    { id: 1, divisionId: 7, agencyId: 2, divName: "BSD", centOverhead: "£0.00" },
    { id: 2, divisionId: 11, agencyId: 2, divName: "CPD", centOverhead: "£0.00" },
    { id: 3, divisionId: 9, agencyId: 2, divName: "EU Exit", centOverhead: "£0.00" },
    { id: 4, divisionId: 12, agencyId: 2, divName: "HNC", centOverhead: "£0.00" },
    { id: 5, divisionId: 8, agencyId: 2, divName: "INSP", centOverhead: "£0.00" },
    { id: 6, divisionId: 14, agencyId: 2, divName: "NATBORI", centOverhead: "£0.00" },
    { id: 7, divisionId: 4, agencyId: 2, divName: "Ops", centOverhead: "£0.00" },
    { id: 8, divisionId: 3, agencyId: 2, divName: "PH-B-Adv", centOverhead: "£0.00" },
    { id: 9, divisionId: 2, agencyId: 2, divName: "R&D", centOverhead: "£0.00" },
    { id: 10, divisionId: 10, agencyId: 2, divName: "SPI", centOverhead: "£0.00" },
    { id: 11, divisionId: 5, agencyId: 2, divName: "Surv", centOverhead: "£0.00" },
    { id: 12, divisionId: 6, agencyId: 2, divName: "Vet", centOverhead: "£0.00" }
];

let activeDivisionId = null;
let staffplanModal = null;

function formatOverhead(value) {
    const raw = (value || "").toString().replace(/[£,]/g, "").trim();
    const parsed = parseFloat(raw);

    if (Number.isNaN(parsed)) {
        return "£0.00";
    }

    return `£${parsed.toFixed(2)}`;
}

function getModalFieldValues() {
    const divisionId = parseInt(document.getElementById("modal-division-id").value, 10);
    const agencyId = parseInt(document.getElementById("modal-agency-id").value, 10);
    const divName = document.getElementById("modal-div-name").value.trim();
    const centOverhead = formatOverhead(document.getElementById("modal-cent-overhead").value);

    return {
        divisionId,
        agencyId,
        divName,
        centOverhead
    };
}

function setModalValues(item) {
    document.getElementById("modal-division-id").value = item ? item.divisionId : "";
    document.getElementById("modal-agency-id").value = item ? item.agencyId : 2;
    document.getElementById("modal-div-name").value = item ? item.divName : "";
    document.getElementById("modal-cent-overhead").value = item ? item.centOverhead : "£0.00";
}

function openAddDivisionModal() {
    activeDivisionId = null;

    const titleElement = document.getElementById("divisionModalTitle");
    if (titleElement) {
        titleElement.innerText = "Add Division";
    }

    setModalValues(null);
    staffplanModal.show();
}

function handlestaffplandataEdit(id) {
    const item = divisionData.find(x => x.id === id);
    if (!item) {
        return;
    }

    activeDivisionId = id;

    const titleElement = document.getElementById("divisionModalTitle");
    if (titleElement) {
        titleElement.innerText = "Edit Division";
    }

    setModalValues(item);
    staffplanModal.show();
}

function handlestaffplandataDelete(id) {
    if (!confirm("Are you sure you want to delete this division?")) {
        return;
    }

    divisionData = divisionData.filter(item => item.id !== id);
    renderstaffplanTable();
}

function saveDivision() {
    const values = getModalFieldValues();

    if (!values.divisionId || !values.agencyId || !values.divName) {
        alert("Please complete DivisionID, AgencyID and DivName.");
        return;
    }

    if (activeDivisionId) {
        const index = divisionData.findIndex(x => x.id === activeDivisionId);
        if (index === -1) {
            return;
        }

        divisionData[index] = {
            ...divisionData[index],
            divisionId: values.divisionId,
            agencyId: values.agencyId,
            divName: values.divName,
            centOverhead: values.centOverhead
        };

        activeDivisionId = null;
    } else {
        const newId = divisionData.length > 0
            ? Math.max(...divisionData.map(x => x.id)) + 1
            : 1;

        divisionData.push({
            id: newId,
            divisionId: values.divisionId,
            agencyId: values.agencyId,
            divName: values.divName,
            centOverhead: values.centOverhead
        });
    }

    renderstaffplanTable();
    staffplanModal.hide();
}

function renderstaffplanTable() {
    const tbody = document.getElementById("staffplandata");
    if (!tbody) {
        return;
    }

    tbody.innerHTML = "";

    divisionData.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.divisionId}</td>
            <td>${item.agencyId}</td>
            <td>${item.divName}</td>
            <td>${item.centOverhead}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" aria-label="Edit division ${item.divName}"
                    onclick="handlestaffplandataEdit(${item.id})">
                    <img src="../images/pen-to-square-regular-full.svg" alt="" aria-hidden="true" class="editstaffname" width="20">
                </button>
                <button class="btn btn-sm btn-outline-danger" aria-label="Delete division ${item.divName}"
                    onclick="handlestaffplandataDelete(${item.id})">
                    <img src="../images/trash-can-regular-full.svg" alt="" aria-hidden="true" width="20">
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const modalElement = document.getElementById("staffplanModal");
    if (!modalElement) {
        return;
    }

    staffplanModal = new bootstrap.Modal(modalElement);
    renderstaffplanTable();

    const addDivisionBtn = document.getElementById("addStaffPlanBtn");
    if (addDivisionBtn) {
        addDivisionBtn.addEventListener("click", openAddDivisionModal);
    }
});
