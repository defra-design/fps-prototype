document.addEventListener('DOMContentLoaded', function () {
    // Time sheet layout: checkboxes with radio-like behaviour
    const layoutFlat = document.getElementById('layout-flat');
    const layoutCrosstab = document.getElementById('layout-crosstab');

    function handleLayoutChange(changed, other) {
        if (!changed || !other) return;

        if (changed.checked) {
            // When one is checked, uncheck the other
            other.checked = false;
        } else {
            // Prevent both from being unchecked – keep at least one selected
            changed.checked = true;
        }
    }

    if (layoutFlat && layoutCrosstab) {
        layoutFlat.addEventListener('change', function () {
            handleLayoutChange(layoutFlat, layoutCrosstab);
        });

        layoutCrosstab.addEventListener('change', function () {
            handleLayoutChange(layoutCrosstab, layoutFlat);
        });
    }

    // For Period custom dropdown
    const dropdown = document.getElementById('for-period-dropdown');
    const input = document.getElementById('for-period-input');
    const hidden = document.getElementById('for-period-value');
    const panel = document.getElementById('for-period-panel');
    const search = document.getElementById('for-period-search');
    const tbody = document.getElementById('for-period-body');

    if (!dropdown || !input || !hidden || !panel || !search || !tbody) return;

    const periods = [
        { period: 1, monthName: 'April', monthNumber: 4 },
        { period: 2, monthName: 'May', monthNumber: 5 },
        { period: 3, monthName: 'June', monthNumber: 6 },
        { period: 4, monthName: 'July', monthNumber: 7 },
        { period: 5, monthName: 'August', monthNumber: 8 },
        { period: 6, monthName: 'September', monthNumber: 9 },
        { period: 7, monthName: 'October', monthNumber: 10 },
        { period: 8, monthName: 'November', monthNumber: 11 },
        { period: 9, monthName: 'December', monthNumber: 12 },
        { period: 10, monthName: 'January', monthNumber: 1 },
        { period: 11, monthName: 'February', monthNumber: 2 },
        { period: 12, monthName: 'March', monthNumber: 3 }
    ];

    function renderPeriodRows(filter) {
        const term = (filter || '').toLowerCase();
        tbody.innerHTML = '';

        periods
            .filter(p =>
                p.period.toString().includes(term) ||
                p.monthName.toLowerCase().includes(term) ||
                p.monthNumber.toString().includes(term)
            )
            .forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${p.period}</td><td>${p.monthName}</td><td>${p.monthNumber}</td>`;
                tr.addEventListener('click', function () {
                    input.value = `${p.period} - ${p.monthName}`;
                    hidden.value = p.period;
                    panel.style.display = 'none';
                    if (typeof onPeriodChanged === 'function') {
                        onPeriodChanged(p.period);
                    }
                });
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', function (e) {
        e.stopPropagation();
        panel.style.display = 'block';
        // Match dropdown panel width to the visible input width
        panel.style.width = input.offsetWidth + 'px';
        search.value = '';
        search.focus();
        renderPeriodRows('');
    });

    search.addEventListener('input', function (e) {
        renderPeriodRows(e.target.value);
    });

    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
});

// In-memory data store: per profit centre we keep up to 10 workgroups.
// It is initialised from the actual Profit Center dropdown options so it
// always matches the UI.
const tableDataByProfitCentre = {};

let currentProfitCentre = "";
let currentPeriod = "";
let currentPage = 1;
let rowsPerPage = 5;
let filteredData = [];
let editModal;
let editWorkgroupInput;
let editEmailInput;
let editSendYesRadio;
let editSendNoRadio;
let editingRow = null;
let lastFocusedElement = null;

function ensureProfitCentreDataInitialised() {
    const pcSelect = document.getElementById("profit-centre");
    if (!pcSelect) return [];

    const centres = Array.from(pcSelect.options)
        .map((o) => (o.value || "").trim())
        .filter((v) => v);

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

function clearValidationErrors() {
    const forPeriodInput = document.getElementById("for-period-input");
    if (forPeriodInput) {
        forPeriodInput.removeAttribute("aria-invalid");
    }
}

function getTimeSheetFlagsValid() {
    const ts = document.getElementById("chk-timesheets");
    const os = document.getElementById("chk-outputsheets");
    return {
        tsChecked: !!(ts && ts.checked),
        osChecked: !!(os && os.checked)
    };
}

function validatePeriodAndTimesheetsAlert({ requirePeriod = false, requireTimesheets = false } = {}) {
    const errors = [];
    const periodValueInput = document.getElementById("for-period-value");
    const periodValue = periodValueInput ? periodValueInput.value : "";
    const { tsChecked, osChecked } = getTimeSheetFlagsValid();

    if (requirePeriod && !periodValue) {
        errors.push("You must state the period");
    }

    if (requireTimesheets && !tsChecked && !osChecked) {
        errors.push("You must choose either an output sheet and/or time sheet");
    }

    if (errors.length) {
        alert(errors.join("\n"));
        return false;
    }

    return true;
}

function renderTable() {
    const tbody = document.querySelector("#dataTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);
    const fragment = document.createDocumentFragment();

    pageData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.className = "govuk-table__row";
        tr.innerHTML = `
            <td class="govuk-table__cell">${row.workgroup}</td>
            <td class="govuk-table__cell send-email-cell">
                <div class="govuk-checkboxes govuk-checkboxes--small govuk-checkboxes--inline">
                    <div class="govuk-checkboxes__item send-email-yes">
                        <input class="govuk-checkboxes__input" id="send-yes-${row.workgroup}" name="send_${row.workgroup}_yes" type="checkbox" ${row.send === "Yes" ? "checked" : ""} disabled>
                        <label class="govuk-label govuk-checkboxes__label" for="send-yes-${row.workgroup}">Yes</label>
                    </div>
                    <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input" id="send-no-${row.workgroup}" name="send_${row.workgroup}_no" type="checkbox" ${row.send === "No" ? "checked" : ""} disabled>
                        <label class="govuk-label govuk-checkboxes__label" for="send-no-${row.workgroup}">No</label>
                    </div>
                </div>
            </td>
            <td class="govuk-table__cell"><input class="govuk-input govuk-!-width-one-third" value="${row.email}" readonly></td>
            <td class="govuk-table__cell">
                <button type="button" class="email-edit-btn" aria-label="Edit email settings for ${row.workgroup}">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for selected record" class="editjobcode" width="20" />
                </button>
            </td>
        `;

        const editBtn = tr.querySelector(".email-edit-btn");
        if (editBtn) {
            editBtn.addEventListener("click", () => {
                const { tsChecked, osChecked } = getTimeSheetFlagsValid();
                if (!tsChecked && !osChecked) {
                    alert("There is a problem\nYou must choose either an output sheet and/or time sheet");
                    return;
                }
                openEditModal(row);
            });
        }

        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
    const list = document.getElementById("pageNumbers");
    if (!list) return;

    list.innerHTML = "";

    // Previous – always visible; dimmed when on first page
    const prevLi = document.createElement("li");
    prevLi.className = "govuk-pagination__prev";
    if (currentPage > 1) {
        prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Previous page" onclick="prevPage(); return false;">
            <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
        </a>`;
    } else {
        prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link govuk-pagination__link--disabled" href="#" aria-label="Previous page" aria-disabled="true" onclick="return false;">
            <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
        </a>`;
    }
    list.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        if (i === currentPage) {
            li.className = "govuk-pagination__item govuk-pagination__item--current";
            li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page" onclick="return false;">${i}</a>`;
        } else {
            li.className = "govuk-pagination__item";
            li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            li.querySelector("a").addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                renderTable();
            });
        }
        list.appendChild(li);
    }

    // Next – always visible; dimmed when on last page
    const nextLi = document.createElement("li");
    nextLi.className = "govuk-pagination__next";
    if (currentPage < totalPages) {
        nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Next page" onclick="nextPage(); return false;">
            <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
        </a>`;
    } else {
        nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link govuk-pagination__link--disabled" href="#" aria-label="Next page" aria-disabled="true" onclick="return false;">
            <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
        </a>`;
    }
    list.appendChild(nextLi);
}

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

const searchBox = document.getElementById("searchBox");
if (searchBox) {
    searchBox.addEventListener("keyup", function () {
        const keyword = this.value.toLowerCase();
        const baseData = currentProfitCentre && tableDataByProfitCentre[currentProfitCentre]
            ? tableDataByProfitCentre[currentProfitCentre]
            : [];

        filteredData = baseData.filter((row) =>
            row.workgroup.toLowerCase().includes(keyword) || row.email.toLowerCase().includes(keyword)
        );

        currentPage = 1;
        renderTable();
    });
}

function updateSendEmailInDb(profitCentre, workgroup, sendFlag) {
    console.log("[DB] Update send flag", { profitCentre, workgroup, sendFlag });
}

function updateEmailInDb(profitCentre, workgroup, email) {
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
    rows.forEach((row) => {
        row.send = sendYes ? "Yes" : "No";
        updateSendEmailInDb(row.profitCentre, row.workgroup, sendYes ? 1 : 0);
    });
    const keyword = searchBox ? searchBox.value.toLowerCase() : "";
    filteredData = keyword
        ? rows.filter((row) => row.workgroup.toLowerCase().includes(keyword) || row.email.toLowerCase().includes(keyword))
        : [...rows];
    renderTable();
}

function clearAllWorkGroupsAllProfitCentres() {
    const ok = window.confirm("Are you sure you want to clear all work groups email flagging, irrespective of profit centre?");
    if (!ok) return;

    Object.keys(tableDataByProfitCentre).forEach((pc) => {
        const rows = tableDataByProfitCentre[pc] || [];
        rows.forEach((row) => {
            row.send = "No";
            updateSendEmailInDb(row.profitCentre, row.workgroup, 0);
        });
    });

    if (currentProfitCentre) {
        loadProfitCentreData(currentProfitCentre);
    } else {
        filteredData = [];
        renderTable();
    }
}

function onSendEmailsClick() {
    if (!validatePeriodAndTimesheetsAlert({ requirePeriod: true, requireTimesheets: true })) return;

    const periodValueInput = document.getElementById("for-period-value");
    const periodValue = periodValueInput ? periodValueInput.value : "";
    const rows = currentProfitCentre ? (tableDataByProfitCentre[currentProfitCentre] || []) : [];
    const rowsToSend = rows.filter((r) => r.send === "Yes");
    console.log("[SEND EMAILS] Would process rows", {
        profitCentre: currentProfitCentre,
        period: periodValue,
        count: rowsToSend.length,
        rows: rowsToSend
    });
}

function onPeriodChanged(periodNumber) {
    currentPeriod = String(periodNumber || "");
    clearValidationErrors();
    if (currentProfitCentre) {
        loadProfitCentreData(currentProfitCentre);
    }
}

function handleModalKeydown(event) {
    if (!editModal || !editModal.classList.contains("show")) return;

    if (event.key === "Escape") {
        event.preventDefault();
        closeEditModal();
        return;
    }

    if (event.key !== "Tab") return;

    const focusableSelectors = [
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "a[href]"
    ].join(",");

    const focusable = Array.from(editModal.querySelectorAll(focusableSelectors)).filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;

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
    if (editSendYesRadio) editSendYesRadio.focus();
}

function closeEditModal() {
    if (editModal) editModal.classList.remove("show");
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
            if (!validatePeriodAndTimesheetsAlert({ requireTimesheets: true })) return;
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

    // Send Emails click intentionally left with no action.

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

    initEditModal();

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

    filteredData = [];
    renderTable();
});