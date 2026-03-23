// In-memory data store: per profit centre we keep up to 10 workgroups.
// It is initialised from the actual Profit Center dropdown options so it
// always matches the UI.
const tableDataByProfitCentre = {};

let currentProfitCentre = "";
let currentPeriod = ""; // numeric accounting period from For Period dropdown
let currentPage = 1;
let rowsPerPage = 10;
let filteredData = [];

function ensureProfitCentreDataInitialised() {
    const pcSelect = document.getElementById("profit-centre");
    if (!pcSelect) return [];

    const centres = Array.from(pcSelect.options)
        .map(o => (o.value || "").trim())
        .filter(v => v); // skip the "-- select profit centre --" placeholder

    centres.forEach((pc, index) => {
        if (!tableDataByProfitCentre[pc]) {
            const rows = [];
            const codeBaseRaw = pc.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
            const codeBase = (codeBaseRaw || "WG").slice(0, 3);
            for (let i = 1; i <= 10; i++) {
                rows.push({
                    profitCentre: pc,
                    workgroup: `${codeBase}${String(i).padStart(2, "0")}`,
                    send: i % 2 === 0 ? "Yes" : "No",
                    email: `user${i}_${index + 1}@mail.com`
                });
            }
            tableDataByProfitCentre[pc] = rows;
        }
    });

    return centres;
}

/* Render Table */
function renderTable() {

    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const pageData = filteredData.slice(start, end);

    pageData.forEach(row => {

        const tr = document.createElement("tr");
        tr.className = "govuk-table__row";

        tr.innerHTML = `
            <td class="govuk-table__cell">${row.workgroup}</td>

            <td class="govuk-table__cell send-email-cell">
                <div class="govuk-checkboxes govuk-checkboxes--small govuk-checkboxes--inline">
                    <div class="govuk-checkboxes__item send-email-yes">
                        <input class="govuk-checkboxes__input" id="send-yes-${row.workgroup}" name="send_${row.workgroup}_yes" type="checkbox" ${row.send === "Yes" ? "checked" : ""}>
                        <label class="govuk-label govuk-checkboxes__label" for="send-yes-${row.workgroup}">Yes</label>
                    </div>
                    <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input" id="send-no-${row.workgroup}" name="send_${row.workgroup}_no" type="checkbox" ${row.send === "No" ? "checked" : ""}>
                        <label class="govuk-label govuk-checkboxes__label" for="send-no-${row.workgroup}">No</label>
                    </div>
                </div>
            </td>

            <td class="govuk-table__cell">
                <input class="govuk-input govuk-!-width-one-third" value="${row.email}">
            </td>

            <td class="govuk-table__cell">
                <button type="button" class="email-edit-btn" aria-label="Edit email settings for ${row.workgroup}">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for selected record" class="editjobcode" width="20" />
                </button>
            </td>
        `;

        // Make checkboxes and email field read-only in the grid; edits go via the modal.
        const sendCheckboxes = tr.querySelectorAll("td.send-email-cell input[type='checkbox']");
        sendCheckboxes.forEach(cb => {
            cb.disabled = true;
        });

        const emailInput = tr.querySelector("input.govuk-input");
        emailInput.readOnly = true;

        const editBtn = tr.querySelector(".email-edit-btn");
        if (editBtn) {
            editBtn.addEventListener("click", () => {
                if (!validatePeriodAndTimesheets({ requireTimesheets: true })) {
                    return;
                }
                openEditModal(row);
            });
        }

        tbody.appendChild(tr);
    });

    renderPagination(); // ✅ changed
}

/* ✅ Number Pagination INSIDE EXISTING HTML */
function renderPagination() {

    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

    const numbersContainer = document.getElementById("pageNumbers");
    if (numbersContainer) {
        numbersContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement("span");
            span.textContent = i;
            span.className = "pact-page-number" + (i === currentPage ? " pact-page-number--current" : "");
            span.addEventListener("click", (e) => {
                e.preventDefault();
                if (currentPage !== i) {
                    currentPage = i;
                    renderTable();
                }
            });
            numbersContainer.appendChild(span);
        }
    }

    updatePaginationVisibility();
}

/* Keep your existing Prev/Next logic */
function updatePaginationVisibility() {

    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

    const prevArrow = document.getElementById("btn-page-prev");
    const nextArrow = document.getElementById("btn-page-next");
    const prevLink = document.getElementById("lnk-page-prev");
    const nextLink = document.getElementById("lnk-page-next");

    const atFirst = currentPage <= 1;
    const atLast = currentPage >= totalPages;

    if (prevArrow) prevArrow.disabled = atFirst;
    if (nextArrow) nextArrow.disabled = atLast;

    if (prevLink) prevLink.classList.toggle("govuk-link--disabled", atFirst);
    if (nextLink) nextLink.classList.toggle("govuk-link--disabled", atLast);
}

/* Pagination Functions (UNCHANGED) */

function firstPage() {
    currentPage = 1;
    renderTable();
}

function lastPage() {
    currentPage = Math.ceil(filteredData.length / rowsPerPage);
    renderTable();
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

/* Search within current profit centre */
const searchBox = document.getElementById("searchBox");
if (searchBox) {
    searchBox.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();
        const baseData = currentProfitCentre && tableDataByProfitCentre[currentProfitCentre]
            ? tableDataByProfitCentre[currentProfitCentre]
            : [];

        filteredData = baseData.filter(row =>
            row.workgroup.toLowerCase().includes(keyword) ||
            row.email.toLowerCase().includes(keyword)
        );

        currentPage = 1;
        renderTable();
    });
}

/* Business rules and helpers */

function getTimeSheetFlagsValid() {
    const ts = document.getElementById("chk-timesheets");
    const os = document.getElementById("chk-outputsheets");
    const tsChecked = !!(ts && ts.checked);
    const osChecked = !!(os && os.checked);
    return { tsChecked, osChecked };
}

function onSendFlagChange(row, newValue, radios) {
    const { tsChecked, osChecked } = getTimeSheetFlagsValid();
    if (!tsChecked && !osChecked) {
        // Revert selection and warn the user
        alert("You must check Time Sheet and/or Output Sheet for the Profit Centre first.");
        radios.forEach(r => {
            r.checked = r.value === row.send;
        });
        return;
    }

    row.send = newValue === "Yes" ? "Yes" : "No";
    updateSendEmailInDb(row.profitCentre, row.workgroup, row.send === "Yes" ? 1 : 0);
}

function updateSendEmailInDb(profitCentre, workgroup, sendFlag) {
    // TODO: replace with real API/DB call
    console.log("[DB] Update send flag", { profitCentre, workgroup, sendFlag });
}

function updateEmailInDb(profitCentre, workgroup, email) {
    // TODO: replace with real API/DB call
    console.log("[DB] Update email", { profitCentre, workgroup, email });
}

function loadProfitCentreData(pc) {
    currentProfitCentre = pc;
    const baseData = pc && tableDataByProfitCentre[pc] ? tableDataByProfitCentre[pc] : [];
    filteredData = [...baseData];
    currentPage = 1;
    renderTable();
}

function bulkSetSendForCurrentPc(sendYes) {
    if (!currentProfitCentre) return;
    const rows = tableDataByProfitCentre[currentProfitCentre] || [];
    rows.forEach(row => {
        row.send = sendYes ? "Yes" : "No";
        updateSendEmailInDb(row.profitCentre, row.workgroup, sendYes ? 1 : 0);
    });
    const keyword = searchBox ? searchBox.value.toLowerCase() : "";
    if (keyword) {
        filteredData = rows.filter(row =>
            row.workgroup.toLowerCase().includes(keyword) ||
            row.email.toLowerCase().includes(keyword)
        );
    } else {
        filteredData = [...rows];
    }
    renderTable();
}

function clearAllWorkGroupsAllProfitCentres() {
    const ok = window.confirm("Are you sure you want to clear all work groups email flagging, irrespective of profit centre?");
    if (!ok) return;

    Object.keys(tableDataByProfitCentre).forEach(pc => {
        const rows = tableDataByProfitCentre[pc] || [];
        rows.forEach(row => {
            row.send = "No";
            updateSendEmailInDb(row.profitCentre, row.workgroup, 0);
        });
    });

    // Refresh current view
    if (currentProfitCentre) {
        loadProfitCentreData(currentProfitCentre);
    } else {
        filteredData = [];
        renderTable();
    }
}

function onSendEmailsClick() {
    if (!validatePeriodAndTimesheets({ requirePeriod: true, requireTimesheets: true })) {
        return;
    }

    const periodValueInput = document.getElementById("for-period-value");
    const periodValue = periodValueInput ? periodValueInput.value : "";

    // High-level placeholder: here you would loop workgroups,
    // prepare Excel and send the emails.
    const rows = currentProfitCentre ? (tableDataByProfitCentre[currentProfitCentre] || []) : [];
    const rowsToSend = rows.filter(r => r.send === "Yes");
    console.log("[SEND EMAILS] Would process rows", {
        profitCentre: currentProfitCentre,
        period: periodValue,
        count: rowsToSend.length,
        rows: rowsToSend
    });
    alert("Email generation and sending would be performed here.");
}

// Period change hook used by the For Period dropdown script
function onPeriodChanged(periodNumber) {
    currentPeriod = String(periodNumber || "");
    clearValidationErrors();
    if (currentProfitCentre) {
        loadProfitCentreData(currentProfitCentre);
    }
}

// Edit modal support
let editModal;
let editWorkgroupInput;
let editEmailInput;
let editSendYesRadio;
let editSendNoRadio;
let editingRow = null;
let lastFocusedElement = null;

function clearValidationErrors() {
    const errorSummary = document.getElementById("error-summary");
    const errorSummaryList = document.getElementById("error-summary-list");
    const forPeriodDropdown = document.getElementById("for-period-dropdown");
    const forPeriodInput = document.getElementById("for-period-input");
    const forPeriodError = document.getElementById("for-period-error");
    const timesheetsGroup = document.getElementById("timesheets-group");
    const timesheetsError = document.getElementById("timesheets-error");

    if (errorSummary) errorSummary.hidden = true;
    if (errorSummaryList) errorSummaryList.innerHTML = "";
    if (forPeriodDropdown) forPeriodDropdown.classList.remove("govuk-form-group--error");
    if (forPeriodInput) forPeriodInput.removeAttribute("aria-invalid");
    if (forPeriodError) forPeriodError.hidden = true;
    if (timesheetsGroup) timesheetsGroup.classList.remove("govuk-form-group--error");
    if (timesheetsError) timesheetsError.hidden = true;
}

function showValidationErrors(errors) {
    clearValidationErrors();

    const errorSummary = document.getElementById("error-summary");
    const errorSummaryList = document.getElementById("error-summary-list");

    if (!errorSummary || !errorSummaryList || !errors.length) {
        return;
    }

    errors.forEach((error) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${error.targetId}`;
        link.textContent = error.message;
        li.appendChild(link);
        errorSummaryList.appendChild(li);

        if (error.type === "period") {
            const group = document.getElementById("for-period-dropdown");
            const input = document.getElementById("for-period-input");
            const message = document.getElementById("for-period-error");
            if (group) group.classList.add("govuk-form-group--error");
            if (input) input.setAttribute("aria-invalid", "true");
            if (message) message.hidden = false;
        }

        if (error.type === "timesheets") {
            const group = document.getElementById("timesheets-group");
            const message = document.getElementById("timesheets-error");
            if (group) group.classList.add("govuk-form-group--error");
            if (message) message.hidden = false;
        }
    });

    errorSummary.hidden = false;
    errorSummary.focus();
}

function validatePeriodAndTimesheets({ requirePeriod = false, requireTimesheets = false } = {}) {
    const errors = [];
    const periodValueInput = document.getElementById("for-period-value");
    const periodValue = periodValueInput ? periodValueInput.value : "";
    const { tsChecked, osChecked } = getTimeSheetFlagsValid();

    if (requirePeriod && !periodValue) {
        errors.push({
            type: "period",
            targetId: "for-period-input",
            message: "You must state the period"
        });
    }

    if (requireTimesheets && !tsChecked && !osChecked) {
        errors.push({
            type: "timesheets",
            targetId: "chk-timesheets",
            message: "You must choose either an output sheet and/or time sheet"
        });
    }

    if (errors.length) {
        showValidationErrors(errors);
        return false;
    }

    clearValidationErrors();
    return true;
}

function handleModalKeydown(event) {
    if (!editModal || !editModal.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeEditModal();
        return;
    }

    if (event.key !== "Tab") {
        return;
    }

    const focusableSelectors = [
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "a[href]"
    ].join(",");

    const focusable = Array.from(editModal.querySelectorAll(focusableSelectors))
        .filter((element) => element.offsetParent !== null);

    if (!focusable.length) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function initEditModal() {
    editModal = document.getElementById("editEmailModal");
    if (!editModal) return;

    editWorkgroupInput = document.getElementById("edit-workgroup");
    editEmailInput = document.getElementById("edit-email");
    editSendYesRadio = document.getElementById("edit-send-yes");
    editSendNoRadio = document.getElementById("edit-send-no");

    const closeBtn = document.getElementById("editModalCloseBtn");
    const cancelBtn = document.getElementById("editModalCancel");
    const saveBtn = document.getElementById("editModalSave");

    if (closeBtn) closeBtn.addEventListener("click", closeEditModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeEditModal);
    if (saveBtn) saveBtn.addEventListener("click", saveEditModal);
    editModal.addEventListener("keydown", handleModalKeydown);
}

function openEditModal(row) {
    if (!editModal) return;
    lastFocusedElement = document.activeElement;
    editingRow = row;
    if (editWorkgroupInput) editWorkgroupInput.value = row.workgroup;
    if (editEmailInput) editEmailInput.value = row.email || "";
    if (editSendYesRadio && editSendNoRadio) {
        if (row.send === "Yes") {
            editSendYesRadio.checked = true;
        } else {
            editSendNoRadio.checked = true;
        }
    }
    editModal.classList.add("show");
    if (editSendYesRadio) {
        editSendYesRadio.focus();
    }
}

function closeEditModal() {
    if (editModal) {
        editModal.classList.remove("show");
    }
    editingRow = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function saveEditModal() {
    if (!editingRow) {
        closeEditModal();
        return;
    }
    if (editEmailInput) {
        editingRow.email = editEmailInput.value;
        updateEmailInDb(editingRow.profitCentre, editingRow.workgroup, editingRow.email);
    }

    if (editSendYesRadio && editSendNoRadio) {
        editingRow.send = editSendYesRadio.checked ? "Yes" : "No";
        updateSendEmailInDb(editingRow.profitCentre, editingRow.workgroup, editingRow.send === "Yes" ? 1 : 0);
    }

    closeEditModal();
    renderTable();
}

// Wire up page-level events
document.addEventListener("DOMContentLoaded", () => {
    const pcSelect = document.getElementById("profit-centre");
    const chkTimesheets = document.getElementById("chk-timesheets");
    const chkOutputsheets = document.getElementById("chk-outputsheets");
    const centres = ensureProfitCentreDataInitialised();
    if (pcSelect) {
        pcSelect.addEventListener("change", (e) => {
            clearValidationErrors();
            const value = e.target.value;
            loadProfitCentreData(value || "");
        });
    }

    if (chkTimesheets) chkTimesheets.addEventListener("change", clearValidationErrors);
    if (chkOutputsheets) chkOutputsheets.addEventListener("change", clearValidationErrors);

    const btnSelectPc = document.getElementById("btn-select-pc");
    if (btnSelectPc) {
        btnSelectPc.addEventListener("click", () => {
            if (!validatePeriodAndTimesheets({ requireTimesheets: true })) {
                return;
            }
            bulkSetSendForCurrentPc(true);
        });
    }

    const btnClearPc = document.getElementById("btn-clear-pc");
    if (btnClearPc) {
        btnClearPc.addEventListener("click", () => {
            bulkSetSendForCurrentPc(false);
        });
    }

    const btnClearAll = document.getElementById("btn-clear-all-workgroups");
    if (btnClearAll) {
        btnClearAll.addEventListener("click", () => {
            clearAllWorkGroupsAllProfitCentres();
        });
    }

    const btnSendEmails = document.getElementById("btn-send-emails");
    if (btnSendEmails) {
        btnSendEmails.addEventListener("click", () => {
            onSendEmailsClick();
        });
    }

    // Records per page dropdown
    const pageSizeSelect = document.getElementById("pageSize");
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener("change", (e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value > 0) {
                rowsPerPage = value;
                currentPage = 1;
                renderTable();
            }
        });
    }

    // Initialise edit modal helpers
    initEditModal();

    // Initial load: if a profit centre is pre-selected, load it.
    // Otherwise, default to the first real option so the grid shows
    // data straight away.
    if (pcSelect) {
        let initial = (pcSelect.value || "").trim();
        if (!initial) {
            const first = centres && centres.length ? centres[0] : "";
            if (first) {
                initial = first;
                pcSelect.value = first;
            }
        }

        if (initial) {
            loadProfitCentreData(initial);
            return;
        }
    }

    // Fallback: no profit centres configured
    filteredData = [];
    renderTable();
});