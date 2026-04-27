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
let divisionSortState = {
    key: null,
    direction: "asc"
};

let divisionPageState = {
    current: 1,
    perPage: 10
};

function parseDivisionSortValue(value, key) {
    if (key === "divisionId" || key === "agencyId") {
        return Number(value || 0);
    }

    if (key === "centOverhead") {
        return Number(String(value || "").replace(/[^0-9.-]/g, "")) || 0;
    }

    return String(value || "").toLowerCase();
}

function getSortedDivisionRows(rows) {
    if (!divisionSortState.key) {
        return rows.slice();
    }

    const key = divisionSortState.key;
    const multiplier = divisionSortState.direction === "asc" ? 1 : -1;

    return rows.slice().sort((a, b) => {
        const valueA = parseDivisionSortValue(a[key], key);
        const valueB = parseDivisionSortValue(b[key], key);

        if (typeof valueA === "number" && typeof valueB === "number") {
            return (valueA - valueB) * multiplier;
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: "base" }) * multiplier;
    });
}

function updateDivisionSortIcons() {
    const headers = document.querySelectorAll("#empTable th[data-column]");

    headers.forEach((header) => {
        const column = header.dataset.column;
        header.classList.remove("sorted-asc", "sorted-desc");

        const existingIcon = header.querySelector(".sort-icon");
        if (existingIcon) {
            existingIcon.remove();
        }

        if (divisionSortState.key === column) {
            header.classList.add(divisionSortState.direction === "asc" ? "sorted-asc" : "sorted-desc");
            const icon = document.createElement("span");
            icon.className = "sort-icon";
            icon.textContent = divisionSortState.direction === "asc" ? "\u25B2" : "\u25BC";
            header.appendChild(icon);
        }
    });
}

function handleDivisionSort(header) {
    const key = header.dataset.column;
    if (!key) {
        return;
    }

    divisionSortState.direction = divisionSortState.key === key && divisionSortState.direction === "asc" ? "desc" : "asc";
    divisionSortState.key = key;
    renderstaffplanTable();
}

function setupDivisionTableSorting() {
    const headers = document.querySelectorAll("#empTable th[data-column]");

    headers.forEach((header) => {
        if (header.dataset.sortBound === "true") {
            return;
        }

        header.style.cursor = "pointer";
        header.tabIndex = 0;

        header.addEventListener("click", () => handleDivisionSort(header));
        header.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleDivisionSort(header);
            }
        });

        header.dataset.sortBound = "true";
    });

    updateDivisionSortIcons();
}

function measureDivisionTextWidth(text, className) {
    let measurer = document.getElementById("division-width-measurer");

    if (!measurer) {
        measurer = document.createElement("span");
        measurer.id = "division-width-measurer";
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

function getDivisionColumnValues(columnKey) {
    return divisionData.map((record) => record[columnKey] || "");
}

function getDivisionColumnMinimumWidth(table, header, columnKey) {
    const headerWidth = measureDivisionTextWidth(header.textContent.replace(/\s+/g, " ").trim(), "govuk-table__header govuk-!-font-size-16");
    let contentWidth = 0;

    getDivisionColumnValues(columnKey).forEach((value) => {
        contentWidth = Math.max(contentWidth, measureDivisionTextWidth(String(value), "govuk-table__cell govuk-!-font-size-16"));
    });

    return Math.max(60, headerWidth, contentWidth) + 24;
}

function syncDivisionColumnMinimumWidths(table, preserveExpandedWidths) {
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
            : (columnKey ? getDivisionColumnMinimumWidth(table, header, columnKey) : Math.max(80, header.offsetWidth));
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

function setupDivisionColumnResizing() {
    const table = document.getElementById("empTable");
    const wrapper = table ? table.parentElement : null;
    const headers = table ? table.querySelectorAll("th[data-column]") : [];

    if (!table || !wrapper) {
        return;
    }

    if (table.dataset.resizeSized !== "true") {
        syncDivisionColumnMinimumWidths(table, false);
        table.dataset.resizeSized = "true";
    } else {
        syncDivisionColumnMinimumWidths(table, true);
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
    document.getElementById("modal-agency-id").value = item ? item.agencyId : "";
    document.getElementById("modal-div-name").value = item ? item.divName : "";
    document.getElementById("modal-cent-overhead").value = item ? item.centOverhead : "";
}

function clearDivisionModalValidation() {
    document.querySelectorAll("#staffplanModal .govuk-form-group--error").forEach((group) => {
        group.classList.remove("govuk-form-group--error");
    });

    document.querySelectorAll("#staffplanModal .govuk-error-message").forEach((message) => {
        message.remove();
    });

    document.querySelectorAll("#staffplanModal .govuk-input--error").forEach((field) => {
        field.classList.remove("govuk-input--error");
        field.removeAttribute("aria-invalid");
        if (field.dataset.baseDescribedby) {
            field.setAttribute("aria-describedby", field.dataset.baseDescribedby);
        } else {
            field.removeAttribute("aria-describedby");
        }
    });
}

function showDivisionFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let formGroup;
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
    errorId = fieldId + "-error";
    errorMessage = document.createElement("p");

    if (formGroup) {
        formGroup.classList.add("govuk-form-group--error");
    }

    field.classList.add("govuk-input--error");
    field.setAttribute("aria-invalid", "true");

    errorMessage.className = "govuk-error-message";
    errorMessage.id = errorId;
    errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;
    field.insertAdjacentElement("afterend", errorMessage);

    describedBy = field.dataset.baseDescribedby ? field.dataset.baseDescribedby + " " + errorId : errorId;
    field.setAttribute("aria-describedby", describedBy.trim());
}

function validateDivisionModal() {
    const errors = [];
    const divisionIdRaw = document.getElementById("modal-division-id").value.trim();
    const agencyIdRaw = document.getElementById("modal-agency-id").value.trim();
    const divName = document.getElementById("modal-div-name").value.trim();
    const centOverhead = document.getElementById("modal-cent-overhead").value.trim();
    const numberPattern = /^\d+$/;
    const amount = parseFloat(String(centOverhead).replace(/[^0-9.]/g, ""));

    clearDivisionModalValidation();

    if (!divisionIdRaw) {
        errors.push({ fieldId: "modal-division-id", message: "Division ID is required" });
    } else if (!numberPattern.test(divisionIdRaw) || parseInt(divisionIdRaw, 10) <= 0) {
        errors.push({ fieldId: "modal-division-id", message: "Division ID must be a positive whole number" });
    }

    if (!agencyIdRaw) {
        errors.push({ fieldId: "modal-agency-id", message: "Agency ID is required" });
    } else if (!numberPattern.test(agencyIdRaw) || parseInt(agencyIdRaw, 10) <= 0) {
        errors.push({ fieldId: "modal-agency-id", message: "Agency ID must be a positive whole number" });
    }

    if (!divName) {
        errors.push({ fieldId: "modal-div-name", message: "Division name is required" });
    }

    if (!centOverhead) {
        errors.push({ fieldId: "modal-cent-overhead", message: "Central overhead is required" });
    } else if (Number.isNaN(amount)) {
        errors.push({ fieldId: "modal-cent-overhead", message: "Central overhead must be a valid number" });
    }

    if (!errors.length) {
        return true;
    }

    errors.forEach((error) => {
        showDivisionFieldError(error.fieldId, error.message);
    });
    document.getElementById(errors[0].fieldId).focus();
    return false;
}

function openAddDivisionModal() {
    activeDivisionId = null;
    clearDivisionModalValidation();

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
    clearDivisionModalValidation();

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
    if (!validateDivisionModal()) {
        return;
    }

    const values = getModalFieldValues();

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

    const rows = getSortedDivisionRows(divisionData);
    const totalRecords = rows.length;
    const perPage = divisionPageState.perPage;
    const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    
    if (divisionPageState.current > totalPages) {
        divisionPageState.current = totalPages;
    }

    const startIdx = (divisionPageState.current - 1) * perPage;
    const endIdx = startIdx + perPage;
    const pageRows = rows.slice(startIdx, endIdx);

    pageRows.forEach(item => {
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

    updateDivisionSortIcons();
    const table = document.getElementById("empTable");
    if (table && table.dataset.resizeSized === "true") {
        syncDivisionColumnMinimumWidths(table, true);
    }
    
    renderPagination(rows, divisionPageState.current, perPage, "pagination", onDivisionPageClick);
}

function onDivisionPageClick(page) {
    divisionPageState.current = page;
    renderstaffplanTable();
}

function setupDivisionPaginationListener() {
    const recordsPerPageSelect = document.getElementById("recordsPerPage");
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener("change", function () {
            divisionPageState.perPage = parseInt(this.value, 10);
            divisionPageState.current = 1;
            renderstaffplanTable();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const modalElement = document.getElementById("staffplanModal");
    if (!modalElement) {
        return;
    }

    staffplanModal = new bootstrap.Modal(modalElement);
    modalElement.addEventListener("hidden.bs.modal", clearDivisionModalValidation);

    // Read initial perPage from dropdown (matches reference page pattern)
    const recordsPerPageEl = document.getElementById("recordsPerPage");
    if (recordsPerPageEl) {
        divisionPageState.perPage = parseInt(recordsPerPageEl.value, 10) || 10;
    }

    renderstaffplanTable();
    setupDivisionTableSorting();
    setupDivisionColumnResizing();
    setupDivisionPaginationListener();

    const addDivisionBtn = document.getElementById("addStaffPlanBtn");
    if (addDivisionBtn) {
        addDivisionBtn.addEventListener("click", openAddDivisionModal);
    }
});
