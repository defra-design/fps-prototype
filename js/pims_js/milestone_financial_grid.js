const milestoneData = [
  {
    financialYear: "2026",
    jun: "15/06/2026",
    sep: "20/09/2026",
    dec: "10/12/2026",
    jan: "18/01/2027",
    feb: "14/02/2027",
    mar: "31/03/2027",
  },
  {
    financialYear: "2025",
    jun: "10/06/2025",
    sep: "25/09/2025",
    dec: "15/12/2025",
    jan: "22/01/2026",
    feb: "28/02/2026",
    mar: "30/03/2026",
  },
  {
    financialYear: "2024",
    jun: "12/06/2024",
    sep: "18/09/2024",
    dec: "20/12/2024",
    jan: "15/01/2025",
    feb: "25/02/2025",
    mar: "28/03/2025",
  },
  {
    financialYear: "2023",
    jun: "08/06/2023",
    sep: "22/09/2023",
    dec: "12/12/2023",
    jan: "20/01/2024",
    feb: "20/02/2024",
    mar: "25/03/2024",
  },
  {
    financialYear: "2022",
    jun: "14/06/2022",
    sep: "16/09/2022",
    dec: "18/12/2022",
    jan: "25/01/2023",
    feb: "18/02/2023",
    mar: "22/03/2023",
  },
  {
    financialYear: "2021",
    jun: "09/06/2021",
    sep: "21/09/2021",
    dec: "14/12/2021",
    jan: "19/01/2022",
    feb: "22/02/2022",
    mar: "29/03/2022",
  },
  {
    financialYear: "2020",
    jun: "16/06/2020",
    sep: "17/09/2020",
    dec: "16/12/2020",
    jan: "21/01/2021",
    feb: "24/02/2021",
    mar: "31/03/2021",
  },
  {
    financialYear: "2019",
    jun: "11/06/2019",
    sep: "19/09/2019",
    dec: "13/12/2019",
    jan: "23/01/2020",
    feb: "25/02/2020",
    mar: "26/03/2020",
  },
  {
    financialYear: "2018",
    jun: "13/06/2018",
    sep: "20/09/2018",
    dec: "17/12/2018",
    jan: "24/01/2019",
    feb: "21/02/2019",
    mar: "27/03/2019",
  },
  {
    financialYear: "2017",
    jun: "15/06/2017",
    sep: "18/09/2017",
    dec: "19/12/2017",
    jan: "22/01/2018",
    feb: "20/02/2018",
    mar: "28/03/2018",
  },
  {
    financialYear: "2016",
    jun: "10/06/2016",
    sep: "23/09/2016",
    dec: "12/12/2016",
    jan: "26/01/2017",
    feb: "19/02/2017",
    mar: "30/03/2017",
  },
  {
    financialYear: "2015",
    jun: "12/06/2015",
    sep: "21/09/2015",
    dec: "14/12/2015",
    jan: "20/01/2016",
    feb: "23/02/2016",
    mar: "29/03/2016",
  },
  {
    financialYear: "2014",
    jun: "17/06/2014",
    sep: "16/09/2014",
    dec: "15/12/2014",
    jan: "27/01/2015",
    feb: "17/02/2015",
    mar: "24/03/2015",
  },
  {
    financialYear: "2013",
    jun: "14/06/2013",
    sep: "19/09/2013",
    dec: "16/12/2013",
    jan: "21/01/2014",
    feb: "22/02/2014",
    mar: "25/03/2014",
  },
];

// ============================================
// State Management
// ============================================

let filteredMilestoneData = [...milestoneData];
let milestoneCurrentPage = 1;
let milestoneRecordsPerPage = 5;
let milestoneSortState = {};
let milestoneFormRequired = false;

// ============================================
// Initialization
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  initializeMilestoneGrid();
});

function initializeMilestoneGrid() {
  // Render initial table
  renderMilestoneTable();

  // Setup event listeners
  setupEventListeners();

  // Update pagination
  updateMilestonePagination();
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
  // Records per page dropdown
  const recordsDropdown = document.getElementById("recordsPerPageMilestone");
  if (recordsDropdown) {
    recordsDropdown.addEventListener("change", handleRecordsPerPageChange);
  }

  // Header sorting
  const headers = document.querySelectorAll(
    "#tblMilestoneGrid th[data-column]",
  );
  headers.forEach((header) => {
    header.addEventListener("click", handleHeaderClick);
  });

  // Checkbox
  const checkbox = document.getElementById("chkMilestoneDeliverable");
  if (checkbox) {
    checkbox.addEventListener("change", handleCheckboxChange);
  }
}

function handleRecordsPerPageChange(e) {
  milestoneRecordsPerPage = parseInt(e.target.value);
  milestoneCurrentPage = 1;
  renderMilestoneTable();
  updateMilestonePagination();
}

function handleHeaderClick(e) {
  const header = e.currentTarget;
  const columnIndex = parseInt(header.dataset.column);
  sortTable(columnIndex);
}

function handleCheckboxChange(e) {
  milestoneFormRequired = e.target.checked;
  // Add any additional logic for form requirement here
}

// ============================================
// Table Rendering
// ============================================

function renderMilestoneTable() {
  const tbody = document.getElementById("tableMilestoneBody");
  tbody.innerHTML = "";

  const startIndex = (milestoneCurrentPage - 1) * milestoneRecordsPerPage;
  const endIndex = startIndex + milestoneRecordsPerPage;
  const pageData = filteredMilestoneData.slice(startIndex, endIndex);

  // Show "No records" message if empty
  if (pageData.length === 0) {
    const tr = document.createElement("tr");
    tr.className = "govuk-table__row";
    tr.innerHTML =
      '<td colspan="7" style="text-align: center; padding: 40px 20px; color: #626a6e;">No records found</td>';
    tbody.appendChild(tr);
    return;
  }

  // Render each row
  pageData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.className = "govuk-table__row";
    // find index in milestoneData for stable edit/delete reference
    const dataIndex = milestoneData.indexOf(row);
    tr.innerHTML = `
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.financialYear)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.jun)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.sep)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.dec)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.jan)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.feb)}</td>
            <td class="govuk-table__cell tab-font-size">${escapeHtml(row.mar)}</td>
            <td class="govuk-table__cell tab-font-size" style="text-align:center; white-space:nowrap;">
                <button type="button" style="border: none; background: #fff; margin-right: 10px;"
                    aria-label="Edit financial year ${escapeHtml(row.financialYear)}"
                    onclick="openFinancialModal('edit', ${dataIndex})">
                    <img src="../images/pen-to-square-regular-full.svg"
                        alt="Edit icon for selected record" class="editjobcode" width="20">
                </button>
                <button type="button" style="border: none; background: #fff;"
                    aria-label="Delete financial year ${escapeHtml(row.financialYear)}"
                    onclick="openFinancialDeleteModal(${dataIndex})">
                    <img src="../images/trash-can-regular-full.svg"
                        alt="Delete icon for selected record" width="20">
                </button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

// ============================================
// Sorting
// ============================================

function sortTable(columnIndex) {
  const headers = document.querySelectorAll(
    "#tblMilestoneGrid th[data-column]",
  );
  const columnNames = [
    "financialYear",
    "jun",
    "sep",
    "dec",
    "jan",
    "feb",
    "mar",
  ];
  const columnName = columnNames[columnIndex];

  // Clear all sort indicators
  headers.forEach((h) => {
    h.classList.remove("sorted-asc", "sorted-desc");
    const iconSpan = h.querySelector(".sort-icon");
    if (iconSpan) {
      iconSpan.innerHTML = "";
    }
  });

  // Toggle sort order
  if (!milestoneSortState[columnName]) {
    milestoneSortState[columnName] = "asc";
  } else if (milestoneSortState[columnName] === "asc") {
    milestoneSortState[columnName] = "desc";
  } else {
    milestoneSortState[columnName] = "asc";
  }

  const order = milestoneSortState[columnName];

  // Sort the data
  filteredMilestoneData.sort((a, b) => {
    let valA = String(a[columnName]).toLowerCase();
    let valB = String(b[columnName]).toLowerCase();

    // Try numeric comparison first
    const numA = parseFloat(valA);
    const numB = parseFloat(valB);

    if (!isNaN(numA) && !isNaN(numB)) {
      return order === "asc" ? numA - numB : numB - numA;
    }

    // String comparison with locale support
    if (order === "asc") {
      return valA.localeCompare(valB, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    } else {
      return valB.localeCompare(valA, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }
  });

  // Add sort indicator to current header
  const currentHeader = document.querySelector(
    `#tblMilestoneGrid th[data-column="${columnIndex}"]`,
  );
  if (currentHeader) {
    currentHeader.classList.add(order === "asc" ? "sorted-asc" : "sorted-desc");
    const iconSpan = currentHeader.querySelector(".sort-icon");
    if (iconSpan) {
      iconSpan.innerHTML = order === "asc" ? " ▲" : " ▼";
    }
  }

  // Reset to first page and re-render
  milestoneCurrentPage = 1;
  renderMilestoneTable();
  updateMilestonePagination();
}

// ============================================
// Pagination
// ============================================

function updateMilestonePagination() {
  const totalRows = filteredMilestoneData.length;
  const totalPages = Math.ceil(totalRows / milestoneRecordsPerPage);
  renderMilestonePagination(totalPages);
}

function renderMilestonePagination(totalPages) {
  const container = document.getElementById("paginationMilestone");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `govuk-pagination__item ${milestoneCurrentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `
        <a class="govuk-pagination__link" href="#" 
           onclick="event.preventDefault(); goToMilestonePage(${milestoneCurrentPage - 1})">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" 
                 xmlns="http://www.w3.org/2000/svg" height="13" width="15" 
                 aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"/>
            </svg>
            <span class="govuk-pagination__link-title">Previous</span>
        </a>
    `;
  container.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `govuk-pagination__item ${i === milestoneCurrentPage ? "govuk-pagination__item--current" : ""}`;
    li.innerHTML = `
            <a class="govuk-pagination__link" href="#" 
               onclick="event.preventDefault(); goToMilestonePage(${i})">${i}</a>
        `;
    container.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `govuk-pagination__next ${milestoneCurrentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `
        <a class="govuk-pagination__link" href="#" 
           onclick="event.preventDefault(); goToMilestonePage(${milestoneCurrentPage + 1})" rel="next">
            <span class="govuk-pagination__link-title">Next</span>
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" 
                 xmlns="http://www.w3.org/2000/svg" height="13" width="15" 
                 aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"/>
            </svg>
        </a>
    `;
  container.appendChild(nextLi);
}

function goToMilestonePage(page) {
  const totalRows = filteredMilestoneData.length;
  const totalPages = Math.ceil(totalRows / milestoneRecordsPerPage);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  milestoneCurrentPage = page;
  renderMilestoneTable();
  updateMilestonePagination();
}

// ============================================
// Utility Functions
// ============================================

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// Search/Filter Functions (Optional)
// ============================================

function filterByYear(year) {
  if (!year) {
    filteredMilestoneData = [...milestoneData];
  } else {
    filteredMilestoneData = milestoneData.filter((row) =>
      row.financialYear.toLowerCase().includes(year.toLowerCase()),
    );
  }
  milestoneCurrentPage = 1;
  renderMilestoneTable();
  updateMilestonePagination();
}

function resetFilters() {
  filteredMilestoneData = [...milestoneData];
  milestoneSortState = {};
  milestoneCurrentPage = 1;

  // Clear sort indicators
  const headers = document.querySelectorAll(
    "#tblMilestoneGrid th[data-column]",
  );
  headers.forEach((h) => {
    h.classList.remove("sorted-asc", "sorted-desc");
    const iconSpan = h.querySelector(".sort-icon");
    if (iconSpan) {
      iconSpan.innerHTML = "";
    }
  });

  renderMilestoneTable();
  updateMilestonePagination();
}

// ============================================
// Export Functions (Optional)
// ============================================

function exportToCSV() {
  let csv = "Financial Year,Jun,Sep,Dec,Jan,Feb,Mar\n";

  filteredMilestoneData.forEach((row) => {
    csv += `${row.financialYear},${row.jun},${row.sep},${row.dec},${row.jan},${row.feb},${row.mar}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "milestone_deliverable.csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// ============================================
// Expose Functions to Global Scope
// ============================================

// Expose renamed functions to global scope for onclick handlers
window.goToMilestonePage = goToMilestonePage;
window.renderMilestoneTable = renderMilestoneTable;
window.updateMilestonePagination = updateMilestonePagination;

// ============================================
// Financial Grid CRUD
// ============================================

let financialEditIndex = null; // null = add, number = edit index in milestoneData

function openFinancialModal(mode, dataIndex) {
  financialEditIndex = mode === "edit" ? dataIndex : null;

  const modal = document.getElementById("financialModal");
  const title = document.getElementById("financialModalTitle");

  // Clear form + errors
  document.getElementById("financialForm").reset();
  hideFinancialError();

  if (mode === "edit" && dataIndex !== undefined) {
    const row = milestoneData[dataIndex];
    title.textContent = "Edit Financial Year Record";
    document.getElementById("finYear").value = row.financialYear;
    document.getElementById("finJun").value = row.jun;
    document.getElementById("finSep").value = row.sep;
    document.getElementById("finDec").value = row.dec;
    document.getElementById("finJan").value = row.jan;
    document.getElementById("finFeb").value = row.feb;
    document.getElementById("finMar").value = row.mar;
  } else {
    title.textContent = "Add Financial Year Record";
  }

  modal.style.display = "flex";
}

function closeFinancialModal() {
  document.getElementById("financialModal").style.display = "none";
  financialEditIndex = null;
}

function saveFinancialRow() {
  const finYear = document.getElementById("finYear").value.trim();

  // Validate required field
  if (!finYear) {
    showFinancialError([{ id: "finYear", msg: "Enter a financial year" }]);
    return;
  }

  // Duplicate check on add
  if (financialEditIndex === null) {
    const exists = milestoneData.some(
      (r) => r.financialYear.toLowerCase() === finYear.toLowerCase(),
    );
    if (exists) {
      showFinancialError([
        {
          id: "finYear",
          msg: "A record for this financial year already exists",
        },
      ]);
      return;
    }
  }

  const newRow = {
    financialYear: finYear,
    jun: document.getElementById("finJun").value.trim(),
    sep: document.getElementById("finSep").value.trim(),
    dec: document.getElementById("finDec").value.trim(),
    jan: document.getElementById("finJan").value.trim(),
    feb: document.getElementById("finFeb").value.trim(),
    mar: document.getElementById("finMar").value.trim(),
  };

  if (financialEditIndex !== null) {
    // Edit in-place
    milestoneData[financialEditIndex] = newRow;
  } else {
    // Add at beginning
    milestoneData.unshift(newRow);
  }

  // Refresh derived state and UI
  filteredMilestoneData = [...milestoneData];
  milestoneCurrentPage = 1;
  renderMilestoneTable();
  updateMilestonePagination();
  closeFinancialModal();
}

function showFinancialError(errors) {
  errors.forEach((e) => {
    const group = document.getElementById(
      "fgFin" + e.id.replace("fin", "").replace(/^./, (c) => c.toUpperCase()),
    );
    if (group) group.classList.add("govuk-form-group--error");
    const errEl = document.getElementById(e.id + "Error");
    const errMsg = document.getElementById(e.id + "ErrorMsg");
    if (errEl && errMsg) {
      errMsg.textContent = e.msg;
      errEl.hidden = false;
    }
    const input = document.getElementById(e.id);
    if (input) input.classList.add("govuk-input--error");
  });
  // Focus first invalid field
  if (errors.length > 0) {
    const first = document.getElementById(errors[0].id);
    if (first) first.focus();
  }
}

function hideFinancialError() {
  ["fgFinYear"].forEach((gid) => {
    const g = document.getElementById(gid);
    if (g) g.classList.remove("govuk-form-group--error");
  });
  ["finYear"].forEach((fid) => {
    const el = document.getElementById(fid);
    if (el) el.classList.remove("govuk-input--error");
    const errEl = document.getElementById(fid + "Error");
    if (errEl) errEl.hidden = true;
  });
}

// ── Delete ────────────────────────────────────────────────────────────────────

let financialDeleteIndex = null;

function openFinancialDeleteModal(dataIndex) {
  showGovukConfirm("Are you sure you want to delete this record?").then((result) => {
      if (result) {
    milestoneData.splice(dataIndex, 1);
    filteredMilestoneData = [...milestoneData];
    const totalPages = Math.ceil(
      filteredMilestoneData.length / milestoneRecordsPerPage,
    );
    if (milestoneCurrentPage > totalPages && totalPages > 0) {
      milestoneCurrentPage = totalPages;
    }
    renderMilestoneTable();
    updateMilestonePagination();
  }
  });
}

function closeFinancialDeleteModal() {
  document.getElementById("financialDeleteModal").style.display = "none";
  financialDeleteIndex = null;
}

function confirmDeleteFinancialRow() {
  if (financialDeleteIndex === null) return;
  milestoneData.splice(financialDeleteIndex, 1);
  filteredMilestoneData = [...milestoneData];
  // Adjust page if last item on current page was removed
  const totalPages = Math.ceil(
    filteredMilestoneData.length / milestoneRecordsPerPage,
  );
  if (milestoneCurrentPage > totalPages && totalPages > 0) {
    milestoneCurrentPage = totalPages;
  }
  renderMilestoneTable();
  updateMilestonePagination();
  closeFinancialDeleteModal();
}

window.openFinancialModal = openFinancialModal;
window.closeFinancialModal = closeFinancialModal;
window.saveFinancialRow = saveFinancialRow;
window.openFinancialDeleteModal = openFinancialDeleteModal;
window.closeFinancialDeleteModal = closeFinancialDeleteModal;
window.confirmDeleteFinancialRow = confirmDeleteFinancialRow;
