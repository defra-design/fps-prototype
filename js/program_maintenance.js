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
let programSortState = {
    key: null,
    direction: "asc"
};

let programPageState = {
    current: 1,
    perPage: 10
};

function parseProgramSortValue(value, key) {
    if (key === "target") {
        return Number(String(value || "").replace(/[^0-9.-]/g, "")) || 0;
    }
    return String(value || "").toLowerCase();
}

function getSortedProgramRows(rows) {
    if (!programSortState.key) {
        return rows.slice();
    }

    const key = programSortState.key;
    const multiplier = programSortState.direction === "asc" ? 1 : -1;
    return rows.slice().sort((a, b) => {
        const valueA = parseProgramSortValue(a[key], key);
        const valueB = parseProgramSortValue(b[key], key);

        if (typeof valueA === "number" && typeof valueB === "number") {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: "base" }) * multiplier;
    });
}

function updateProgramSortIcons() {
    const headers = document.querySelectorAll("#empTable th[data-column]");
    headers.forEach((header) => {
        const column = header.dataset.column;
        header.classList.remove("sorted-asc", "sorted-desc");

        const existingIcon = header.querySelector(".sort-icon");
        if (existingIcon) {
            existingIcon.remove();
        }

        if (programSortState.key === column) {
            header.classList.add(programSortState.direction === "asc" ? "sorted-asc" : "sorted-desc");
            const icon = document.createElement("span");
            icon.className = "sort-icon";
            icon.textContent = programSortState.direction === "asc" ? "\u25B2" : "\u25BC";
            header.appendChild(icon);
        }
    });
}

function handleProgramSort(header) {
    const key = header.dataset.column;
    if (!key) {
        return;
    }

    programSortState.direction = programSortState.key === key && programSortState.direction === "asc" ? "desc" : "asc";
    programSortState.key = key;
    renderstaffplanTable();
}

function setupProgramTableSorting() {
    const headers = document.querySelectorAll("#empTable th[data-column]");
    headers.forEach((header) => {
        if (header.dataset.sortBound === "true") {
            return;
        }

        header.style.cursor = "pointer";
        header.tabIndex = 0;

        header.addEventListener("click", () => handleProgramSort(header));
        header.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleProgramSort(header);
            }
        });

        header.dataset.sortBound = "true";
    });

    updateProgramSortIcons();
}

function measureProgramTextWidth(text, className) {
    let measurer = document.getElementById("program-width-measurer");
    if (!measurer) {
        measurer = document.createElement("span");
        measurer.id = "program-width-measurer";
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

function getProgramColumnValues(columnKey) {
    return staffplandata.map((record) => record[columnKey] || "");
}

function getProgramColumnMinimumWidth(table, header, columnKey) {
    const headerWidth = measureProgramTextWidth(header.textContent.replace(/\s+/g, " ").trim(), "govuk-table__header govuk-!-font-size-16");
    let contentWidth = 0;

    getProgramColumnValues(columnKey).forEach((value) => {
        contentWidth = Math.max(contentWidth, measureProgramTextWidth(String(value), "govuk-table__cell govuk-!-font-size-16"));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncProgramColumnMinimumWidths(table, preserveExpandedWidths) {
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
            : (columnKey ? getProgramColumnMinimumWidth(table, header, columnKey) : Math.max(80, header.offsetWidth));
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

function setupProgramColumnResizing() {
    const table = document.getElementById("empTable");
    const wrapper = table ? table.parentElement : null;
    const headers = table ? table.querySelectorAll("th[data-column]") : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== "true") {
        syncProgramColumnMinimumWidths(table, false);
        table.dataset.resizeSized = "true";
    } else {
        syncProgramColumnMinimumWidths(table, true);
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
        programPageState.perPage = parseInt(recordsPerPageEl.value, 10) || 10;
    }

	renderstaffplanTable();
    setupProgramTableSorting();
    setupProgramColumnResizing();
    setupProgramPaginationListener();
    
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
        titleElement.innerText = "Add Program";
    }

    document.getElementById("modal-program").value = "";
    document.getElementById("modal-program-name").value = "";
    document.getElementById("modal-directorate").value = "";
    document.getElementById("modal-target").value = "";
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

    const rows = getSortedProgramRows(staffplandata);
    const totalRecords = rows.length;
    const perPage = programPageState.perPage;
    const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    
    if (programPageState.current > totalPages) {
        programPageState.current = totalPages;
    }

    const startIdx = (programPageState.current - 1) * perPage;
    const endIdx = startIdx + perPage;
    const pageRows = rows.slice(startIdx, endIdx);

    pageRows.forEach(item => {

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

    updateProgramSortIcons();
    const table = document.getElementById("empTable");
    if (table && table.dataset.resizeSized === "true") {
        syncProgramColumnMinimumWidths(table, true);
    }
    
    renderPagination(rows, programPageState.current, perPage, "pagination", onProgramPageClick);
}

function onProgramPageClick(page) {
    programPageState.current = page;
    renderstaffplanTable();
}

function setupProgramPaginationListener() {
    const recordsPerPageSelect = document.getElementById("recordsPerPage");
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener("change", function () {
            programPageState.perPage = parseInt(this.value, 10);
            programPageState.current = 1;
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

    if (confirm("Are you sure you want to delete this program?")) {
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

function openAddProjectModal() {
    editingProjectId = null;
    clearProjectModalValidation();
    document.getElementById("projectModalTitle").innerText = "Add Project";
    document.getElementById("modal-WrkGrp").value = "";
    document.getElementById("modal-Grade").value = "";
    document.getElementById("modal-Jobcode").value = "";
    document.getElementById("modal-ATStaffName").value = "";
    document.getElementById("modal-Mnth").value = "";
    document.getElementById("modal-Hrs").value = "";
    document.getElementById("modal-Cost").value = "";
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
    const program = document.getElementById("modal-program").value.trim();
    const programName = document.getElementById("modal-program-name").value.trim();
    const directorate = document.getElementById("modal-directorate").value.trim();
    const target = document.getElementById("modal-target").value.trim();
    const manager = document.getElementById("modal-manager").value.trim();

    const isValidNumber = (value) => !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, "")));

    clearStaffPlanModalValidation();

    if (!program) { errors.push({ fieldId: "modal-program", message: "Program is required" }); }
    if (!programName) { errors.push({ fieldId: "modal-program-name", message: "Program name is required" }); }
    if (!directorate) { errors.push({ fieldId: "modal-directorate", message: "Directorate is required" }); }
    if (!target) {
        errors.push({ fieldId: "modal-target", message: "Target is required" });
    } else if (!isValidNumber(target)) {
        errors.push({ fieldId: "modal-target", message: "Target must be a valid number" });
    }
    if (!manager) { errors.push({ fieldId: "modal-manager", message: "Manager is required" }); }

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