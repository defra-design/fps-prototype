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
let staffSortState = {
    key: null,
    direction: "asc"
};

let staffPageState = {
    current: 1,
    perPage: 10
};

function parseStaffSortValue(value) {
    return String(value || "").toLowerCase();
}

function getSortedStaffRows(rows) {
    if (!staffSortState.key) {
        return rows.slice();
    }

    const key = staffSortState.key;
    const multiplier = staffSortState.direction === "asc" ? 1 : -1;
    return rows.slice().sort((a, b) => {
        const valueA = parseStaffSortValue(a[key]);
        const valueB = parseStaffSortValue(b[key]);
        return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: "base" }) * multiplier;
    });
}

function updateStaffSortIcons() {
    const headers = document.querySelectorAll("#empTable th[data-column]");
    headers.forEach((header) => {
        const column = header.dataset.column;
        header.classList.remove("sorted-asc", "sorted-desc");

        const existingIcon = header.querySelector(".sort-icon");
        if (existingIcon) {
            existingIcon.remove();
        }

        if (staffSortState.key === column) {
            header.classList.add(staffSortState.direction === "asc" ? "sorted-asc" : "sorted-desc");
            const icon = document.createElement("span");
            icon.className = "sort-icon";
            icon.textContent = staffSortState.direction === "asc" ? "\u25B2" : "\u25BC";
            header.appendChild(icon);
        }
    });
}

function handleStaffSort(header) {
    const key = header.dataset.column;
    if (!key) {
        return;
    }

    staffSortState.direction = staffSortState.key === key && staffSortState.direction === "asc" ? "desc" : "asc";
    staffSortState.key = key;
    renderstaffplanTable();
}

function setupStaffTableSorting() {
    const headers = document.querySelectorAll("#empTable th[data-column]");
    headers.forEach((header) => {
        if (header.dataset.sortBound === "true") {
            return;
        }

        header.style.cursor = "pointer";
        header.tabIndex = 0;

        header.addEventListener("click", () => handleStaffSort(header));
        header.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleStaffSort(header);
            }
        });

        header.dataset.sortBound = "true";
    });

    updateStaffSortIcons();
}

function measureStaffTextWidth(text, className) {
    let measurer = document.getElementById("staff-width-measurer");
    if (!measurer) {
        measurer = document.createElement("span");
        measurer.id = "staff-width-measurer";
        measurer.style.position = "absolute";
        measurer.style.visibility = "hidden";
        measurer.style.whiteSpace = "nowrap";
        measurer.style.left = "-9999px";
        measurer.style.top = "-9999px";
        document.body.appendChild(measurer);
    }

    measurer.className = className || "";
    measurer.textContent = text || "";
    return measurer.offsetWidth;
}

function getStaffColumnValues(columnKey) {
    return staffplandata.map((record) => record[columnKey] || "");
}

function getStaffColumnMinimumWidth(table, header, columnKey) {
    const headerWidth = measureStaffTextWidth(header.textContent.replace(/\s+/g, " ").trim(), "govuk-table__header govuk-!-font-size-16");
    let contentWidth = 0;

    getStaffColumnValues(columnKey).forEach((value) => {
        contentWidth = Math.max(contentWidth, measureStaffTextWidth(String(value), "govuk-table__cell govuk-!-font-size-16"));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncStaffColumnMinimumWidths(table, preserveExpandedWidths) {
    const wrapper = table ? table.parentElement : null;
    const headers = table ? Array.from(table.querySelectorAll("th")) : [];
    let totalWidth = 0;
    const actionColumnWidth = 96;

    if (!table || !wrapper || !headers.length) {
        return;
    }

    headers.forEach((header, index) => {
        const columnKey = header.dataset.column;
        const isActionColumn = !columnKey && index === headers.length - 1;
        const minWidth = isActionColumn
            ? actionColumnWidth
            : (columnKey ? getStaffColumnMinimumWidth(table, header, columnKey) : Math.max(80, header.offsetWidth));
        const currentWidth = parseFloat(header.style.width) || (isActionColumn ? minWidth : (header.offsetWidth || minWidth));
        const appliedWidth = isActionColumn
            ? minWidth
            : (preserveExpandedWidths ? Math.max(currentWidth, minWidth) : minWidth);

        header.dataset.minWidth = String(minWidth);
        header.style.minWidth = minWidth + "px";
        header.style.width = appliedWidth + "px";
        header.style.boxSizing = "border-box";
        totalWidth += appliedWidth;
    });

    table.style.tableLayout = "fixed";
    table.style.minWidth = "100%";
    table.style.width = totalWidth + "px";
}

function setupStaffColumnResizing() {
    const table = document.getElementById("empTable");
    const wrapper = table ? table.parentElement : null;
    const headers = table ? table.querySelectorAll("th[data-column]") : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== "true") {
        syncStaffColumnMinimumWidths(table, false);
        table.dataset.resizeSized = "true";
    } else {
        syncStaffColumnMinimumWidths(table, true);
    }

    headers.forEach((header) => {
        if (!header.querySelector(".pp-resizer")) {
            const resizer = document.createElement("div");
            resizer.className = "pp-resizer";
            resizer.innerHTML = "&nbsp;";
            header.appendChild(resizer);
        }
    });

    const resizers = table.querySelectorAll(".pp-resizer");
    resizers.forEach((resizer) => {
        if (resizer.dataset.bound === "true") {
            return;
        }

        resizer.addEventListener("mousedown", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const th = resizer.parentElement;
            const startX = event.pageX;
            const startWidth = th.offsetWidth;
            const startTableWidth = table.offsetWidth;
            const minWidth = parseFloat(th.dataset.minWidth) || 60;

            function onMouseMove(moveEvent) {
                const newWidth = Math.max(minWidth, startWidth + (moveEvent.pageX - startX));
                th.style.width = newWidth + "px";
                table.style.width = Math.max(wrapper.clientWidth, startTableWidth + (newWidth - startWidth)) + "px";
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        resizer.dataset.bound = "true";
    });
}


document.addEventListener("DOMContentLoaded", function () {

    projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    document.getElementById("projectModal").addEventListener("hidden.bs.modal", clearProjectModalValidation);
    renderProjectTable();
	
});


document.addEventListener("DOMContentLoaded", function () {

   
	staffplanModal = new bootstrap.Modal(document.getElementById('staffplanModal'));    
    document.getElementById("staffplanModal").addEventListener("hidden.bs.modal", clearStaffPlanModalValidation);

    // Read initial perPage from dropdown (matches reference page pattern)
    const recordsPerPageEl = document.getElementById("recordsPerPage");
    if (recordsPerPageEl) {
        staffPageState.perPage = parseInt(recordsPerPageEl.value, 10) || 10;
    }

	renderstaffplanTable();
    setupStaffTableSorting();
    setupStaffColumnResizing();

    const staffFilterRadios = document.querySelectorAll('input[name="staffFilter"]');
    staffFilterRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            staffPageState.current = 1;
            renderstaffplanTable();
        });
    });
    
    setupStaffPaginationListener();

    const addStaffPlanBtn = document.getElementById("addStaffPlanBtn");
    if (addStaffPlanBtn) {
        addStaffPlanBtn.addEventListener("click", openAddStaffPlanModal);
    }
});

function openAddStaffPlanModal() {
    staffplanId = null;
    clearStaffPlanModalValidation();

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

    const rows = getSortedStaffRows(filteredStaffPlanData);
    const totalRecords = rows.length;
    const perPage = staffPageState.perPage;
    const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    
    if (staffPageState.current > totalPages) {
        staffPageState.current = totalPages;
    }

    const startIdx = (staffPageState.current - 1) * perPage;
    const endIdx = startIdx + perPage;
    const pageRows = rows.slice(startIdx, endIdx);

    pageRows.forEach(item => {

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

    updateStaffSortIcons();
    const table = document.getElementById("empTable");
    if (table && table.dataset.resizeSized === "true") {
        syncStaffColumnMinimumWidths(table, true);
    }

    renderPagination(rows, staffPageState.current, perPage, "pagination", onStaffPageClick);
}

function onStaffPageClick(page) {
    staffPageState.current = page;
    renderstaffplanTable();
}

function setupStaffPaginationListener() {
    const recordsPerPageSelect = document.getElementById("recordsPerPage");
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener("change", function () {
            staffPageState.perPage = parseInt(this.value, 10);
            staffPageState.current = 1;
            renderstaffplanTable();
        });
    }
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
    clearProjectModalValidation();

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
    clearStaffPlanModalValidation();

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

function clearModalValidation(formSelector) {
    document.querySelectorAll(formSelector + " .govuk-form-group--error").forEach((group) => {
        group.classList.remove("govuk-form-group--error");
    });

    document.querySelectorAll(formSelector + " .govuk-error-message").forEach((message) => {
        message.remove();
    });

    document.querySelectorAll(formSelector + " .govuk-input--error, " + formSelector + " .govuk-select--error").forEach((field) => {
        field.classList.remove("govuk-input--error", "govuk-select--error");
        field.removeAttribute("aria-invalid");
        if (field.dataset.baseDescribedby) {
            field.setAttribute("aria-describedby", field.dataset.baseDescribedby);
        } else {
            field.removeAttribute("aria-describedby");
        }
    });
}

function showModalFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let formGroup;
    let fieldContainer;
    let errorId;
    let errorMessage;
    let describedBy;

    if (!field) {
        return;
    }

    if (typeof field.dataset.baseDescribedby === "undefined") {
        field.dataset.baseDescribedby = field.getAttribute("aria-describedby") || "";
    }

    formGroup = field.closest(".govuk-form-group");
    fieldContainer = field.closest(".govuk-input__wrapper") || field;
    errorId = fieldId + "-error";
    errorMessage = document.createElement("p");

    if (formGroup) {
        formGroup.classList.add("govuk-form-group--error");
    }

    if (field.tagName === "SELECT") {
        field.classList.add("govuk-select--error");
    } else {
        field.classList.add("govuk-input--error");
    }
    field.setAttribute("aria-invalid", "true");

    errorMessage.className = "govuk-error-message";
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;

    if (fieldContainer) {
        fieldContainer.insertAdjacentElement("afterend", errorMessage);
    } else if (formGroup) {
        formGroup.appendChild(errorMessage);
    }

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + " " + errorId : errorId;
    field.setAttribute("aria-describedby", describedBy.trim());
}

function clearProjectModalValidation() {
    clearModalValidation("#projectModal");
}

function clearStaffPlanModalValidation() {
    clearModalValidation("#staffplanModal");
}

function validateProjectModal() {
    const errors = [];
    const workGroup = document.getElementById("modal-WrkGrp").value.trim();
    const grade = document.getElementById("modal-Grade").value.trim();
    const jobCode = document.getElementById("modal-Jobcode").value.trim();
    const name = document.getElementById("modal-ATStaffName").value.trim();
    const month = document.getElementById("modal-Mnth").value.trim();
    const hours = document.getElementById("modal-Hrs").value.trim();
    const cost = document.getElementById("modal-Cost").value.trim();
    const isValidNumber = (value) => !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, "")));

    clearProjectModalValidation();

    if (!workGroup) { errors.push({ fieldId: "modal-WrkGrp", message: "Workgroup is required" }); }
    if (!grade) { errors.push({ fieldId: "modal-Grade", message: "Grade is required" }); }
    if (!jobCode) { errors.push({ fieldId: "modal-Jobcode", message: "Job code is required" }); }
    if (!name) { errors.push({ fieldId: "modal-ATStaffName", message: "Name is required" }); }
    if (!month) {
        errors.push({ fieldId: "modal-Mnth", message: "Month is required" });
    } else if (!isValidNumber(month)) {
        errors.push({ fieldId: "modal-Mnth", message: "Month must be a valid number" });
    }
    if (!hours) {
        errors.push({ fieldId: "modal-Hrs", message: "Hours are required" });
    } else if (!isValidNumber(hours)) {
        errors.push({ fieldId: "modal-Hrs", message: "Hours must be a valid number" });
    }
    if (!cost) {
        errors.push({ fieldId: "modal-Cost", message: "Cost is required" });
    } else if (!isValidNumber(cost)) {
        errors.push({ fieldId: "modal-Cost", message: "Cost must be a valid number" });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach((error) => {
        showModalFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function validateStaffPlanModal() {
    const errors = [];
    const spnumber = document.getElementById("modal-spnumber").value.trim();
    const lastname = document.getElementById("modal-lastname").value.trim();
    const firstname = document.getElementById("modal-firstname").value.trim();
    const title = document.getElementById("modal-title").value.trim();

    clearStaffPlanModalValidation();

    if (!spnumber) { errors.push({ fieldId: "modal-spnumber", message: "SP number is required" }); }
    if (!lastname) { errors.push({ fieldId: "modal-lastname", message: "Last name is required" }); }
    if (!firstname) { errors.push({ fieldId: "modal-firstname", message: "First name is required" }); }
    if (!title) { errors.push({ fieldId: "modal-title", message: "Title is required" }); }

    if (!errors.length) {
        return true;
    }

    errors.forEach((error) => {
        showModalFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}


function saveProject() {

    if (!validateProjectModal()) {
        return;
    }

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

    if (!validateStaffPlanModal()) {
        return;
    }

    const spnumber = document.getElementById("modal-spnumber").value.trim();
    const lastname = document.getElementById("modal-lastname").value.trim();
    const firstname = document.getElementById("modal-firstname").value.trim();
    const title = document.getElementById("modal-title").value.trim();

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
            lastname,
            firstname,
            title
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