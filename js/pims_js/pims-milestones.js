const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const rowsPerPage = document.getElementById("rowsPerPage");
const noData = document.getElementById("noData");

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

const dummyData = [
  {
    project: "01/05",
    type: "Customer Report",
    description: "Quarterly Species Disease Surveillance report – Small",
    pLeader: "Pending Approval",
    cap: "Submitted",
    due: "2005-07-16",
    completed: "2005-07-16",
    review: "Yes",
    target: "Yes",
  },
  {
    project: "01/06",
    type: "Customer Report",
    description: "Quarterly Species Disease Surveillance report – Small",
    pLeader: "Pending Approval",
    cap: "Submitted",
    due: "2006-08-16",
    completed: "2006-08-15",
    review: "No",
    target: "Yes",
  },
  {
    project: "01/07",
    type: "Customer Report",
    description: "Quarterly Species Disease Surveillance report – Small",
    pLeader: "Pending",
    cap: "In progress",
    due: "2007-08-16",
    completed: "2007-08-16",
    review: "No",
    target: "No",
  },
  {
    project: "01/08",
    type: "Customer Report",
    description: "Quarterly Species Disease",
    pLeader: "Approved",
    cap: "Approved",
    due: "2008-08-16",
    completed: "2008-08-15",
    review: "No",
    target: "Yes",
  },
  {
    project: "5",
    type: "Milestone",
    description: "User acceptance",
    pLeader: "In progress",
    cap: "In progress",
    due: "2025-09-20",
    completed: "2025-12-01",
    review: "No",
    target: "No",
  },
  {
    project: "6",
    type: "Deliverable",
    description: "Final sign-off",
    pLeader: "Pending",
    cap: "Open",
    due: "2025-10-01",
    completed: "",
    review: "No",
    target: "No",
  },
  {
    project: "7",
    type: "Milestone",
    description: "Post-review actions",
    pLeader: "In progress",
    cap: "In progress",
    due: "2025-10-25",
    completed: "2025-10-25",
    review: "No",
    target: "No",
  },
  {
    project: "8",
    type: "Deliverable",
    description: "Handover documentation",
    pLeader: "Pending",
    cap: "Open",
    due: "2025-11-05",
    completed: "2025-11-05",
    review: "No",
    target: "No",
  },
  {
    project: "9",
    type: "Milestone",
    description: "Training complete",
    pLeader: "Approved",
    cap: "Approved",
    due: "2025-11-20",
    completed: "2025-11-20",
    review: "No",
    target: "Yes",
  },
  {
    project: "10",
    type: "Deliverable",
    description: "Closure report",
    pLeader: "Review",
    cap: "Open",
    due: "2025-12-01",
    completed: "2025-12-05",
    review: "No",
    target: "Yes",
  },
  {
    project: "11",
    type: "Milestone",
    description: "Regulatory submission",
    pLeader: "Pending",
    cap: "Open",
    due: "2025-12-15",
    completed: "2025-12-15",
    review: "No",
    target: "No",
  },
  {
    project: "12",
    type: "Deliverable",
    description: "Archive project",
    pLeader: "Scheduled",
    cap: "Scheduled",
    due: "2026-01-05",
    completed: "2026-01-05",
    review: "No",
    target: "No",
  },
];

let filteredprojectlist = [...dummyData]; // for search

let currentPage = 1;
let recordsPerPageValue = 5;
let milestonesSortState = {};

// Initialize pagination on page load
document.addEventListener("DOMContentLoaded", function () {
  const recordsPerPageSelect = document.getElementById("recordsPerPage");
  recordsPerPageSelect.addEventListener("change", function () {
    recordsPerPageValue = parseInt(this.value);
    currentPage = 1;
    renderTable();
    updatePagination();
  });

  renderTable();
  updatePagination();

  // Header sorting for milestones grid
  const milestoneHeaders = document.querySelectorAll(
    "#milestonesTable th[data-column]",
  );
  milestoneHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      sortMilestonesTable(parseInt(header.dataset.column));
    });
  });
});

// Render table with current page data
function renderTable() {
  const tableBody = document.getElementById("tableBody");
  const noData = document.getElementById("noData");

  tableBody.innerHTML = "";

  if (filteredprojectlist.length === 0) {
    noData.removeAttribute("hidden");
    return;
  }

  noData.setAttribute("hidden", "");

  const startIdx = (currentPage - 1) * recordsPerPageValue;
  const endIdx = startIdx + recordsPerPageValue;
  const pageData = filteredprojectlist.slice(startIdx, endIdx);

  pageData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = "govuk-table__row";

    // Determine checkbox states based on review and target values
    const reviewChecked = item.review === "Yes" ? "checked" : "";
    const targetChecked = item.target === "Yes" ? "checked" : "";

    row.innerHTML = `
      <td class="govuk-table__cell tab-font-size">${startIdx + index + 1}</td>
      <td class="govuk-table__cell tab-font-size">${item.type || ""}</td>
      <td class="govuk-table__cell tab-font-size" style="word-wrap: break-word; white-space: normal; max-width: 200px; overflow-wrap: break-word;">${item.description || ""}</td>
      <td class="govuk-table__cell tab-font-size" style="word-wrap: break-word; white-space: normal; max-width: 200px; overflow-wrap: break-word;">${item.pLeader || ""}</td>
      <td class="govuk-table__cell tab-font-size" style="word-wrap: break-word; white-space: normal; max-width: 200px; overflow-wrap: break-word;">${item.cap || ""}</td>
      <td class="govuk-table__cell tab-font-size">${formatDate(item.due)}</td>
      <td class="govuk-table__cell tab-font-size">${formatDate(item.completed)}</td>
      <td class="govuk-table__cell tab-font-size" style="text-align: center;">
        <div class="govuk-checkboxes govuk-checkboxes--small">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="review-${item.project}" name="review-${item.project}" type="checkbox" ${reviewChecked} disabled>
            <label class="govuk-label govuk-checkboxes__label" for="review-${item.project}" style="margin: 0;"><span class="govuk-visually-hidden">Under Review</span></label>
          </div>
        </div>
      </td>
      <td class="govuk-table__cell tab-font-size" style="text-align: center;">
        <div class="govuk-checkboxes govuk-checkboxes--small">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="target-${item.project}" name="target-${item.project}" type="checkbox" ${targetChecked} disabled>
            <label class="govuk-label govuk-checkboxes__label" for="target-${item.project}" style="margin: 0;"><span class="govuk-visually-hidden">On Target</span></label>
          </div>
        </div>
      </td>
    <td style="text-align:center;">
        <button onclick='handleTimeCodeEdit(${JSON.stringify(item)})' style="border: none; background: #fff; margin-right: 10px;">
        <img src="../images/pen-to-square-regular-full.svg"
                alt="Edit icon for selected record" class="editjobcode"
                 width="20"></button>
        <button  onclick="handleDeleteTimecode('${item.project}')" style="border: none; background: #fff;"  aria-label="Delete">
         <img src="../images/trash-can-regular-full.svg" 
         alt="Delete icon for selected record"
                width="20"></button>
    </td>
    `;
    tableBody.appendChild(row);
  });
}

// Sort milestones table by column index
function sortMilestonesTable(columnIndex) {
  const columnNames = [
    "project",
    "type",
    "description",
    "pLeader",
    "cap",
    "due",
    "completed",
    "review",
    "target",
  ];
  const columnName = columnNames[columnIndex];

  const headers = document.querySelectorAll("#milestonesTable th[data-column]");

  // Clear all sort indicators
  headers.forEach(function (h) {
    h.classList.remove("sorted-asc", "sorted-desc");
    const icon = h.querySelector(".sort-icon");
    if (icon) icon.innerHTML = "";
  });

  // Toggle sort order
  if (!milestonesSortState[columnName]) {
    milestonesSortState[columnName] = "asc";
  } else if (milestonesSortState[columnName] === "asc") {
    milestonesSortState[columnName] = "desc";
  } else {
    milestonesSortState[columnName] = "asc";
  }
  const order = milestonesSortState[columnName];

  filteredprojectlist.sort(function (a, b) {
    let valA = String(a[columnName] || "").toLowerCase();
    let valB = String(b[columnName] || "").toLowerCase();
    return order === "asc"
      ? valA.localeCompare(valB, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      : valB.localeCompare(valA, undefined, {
          numeric: true,
          sensitivity: "base",
        });
  });

  // Update sort icon on clicked header
  const activeHeader = document.querySelector(
    `#milestonesTable th[data-column="${columnIndex}"]`,
  );
  if (activeHeader) {
    activeHeader.classList.add(order === "asc" ? "sorted-asc" : "sorted-desc");
    const icon = activeHeader.querySelector(".sort-icon");
    if (icon) icon.innerHTML = order === "asc" ? " ▲" : " ▼";
  }

  currentPage = 1;
  renderTable();
  updatePagination();
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(
    filteredprojectlist.length / recordsPerPageValue,
  );
  const paginationNav = document.getElementById("pagination");

  if (totalPages <= 1) {
    paginationNav.style.display = "none";
    return;
  }

  paginationNav.style.display = "";

  // Build pagination HTML
  let paginationHTML = "";

  // Previous button
  if (currentPage > 1) {
    paginationHTML += `
      <li class="govuk-pagination__item">
        <a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage - 1})" style="cursor: pointer;">
          <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>
          <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
        </a>
      </li>
    `;
  } else {
    paginationHTML += `
      <li class="govuk-pagination__item disabled" aria-disabled="true">
        <a class="govuk-link govuk-pagination__link">
          <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>
          <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
        </a>
      </li>
    `;
  }

  // Page numbers - show first 5 pages or adjust based on current page
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationHTML += `
        <li class="govuk-pagination__item govuk-pagination__item--current" aria-current="page">
          <a class="govuk-link govuk-pagination__link">${i}</a>
        </li>
      `;
    } else {
      paginationHTML += `
        <li class="govuk-pagination__item">
          <a class="govuk-link govuk-pagination__link" onclick="goToPage(${i})" style="cursor: pointer;">${i}</a>
        </li>
      `;
    }
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `
      <li class="govuk-pagination__item">
        <a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage + 1})" style="cursor: pointer;">
          <span class="govuk-pagination__link-title">Next</span>
          <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>
        </a>
      </li>
    `;
  } else {
    paginationHTML += `
      <li class="govuk-pagination__item" aria-disabled="true">
        <a class="govuk-link govuk-pagination__link">
          <span class="govuk-pagination__link-title">Next</span>
          <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"></svg>
        </a>
      </li>
    `;
  }

  paginationNav.innerHTML = paginationHTML;
}

// Go to specific page
function goToPage(page) {
  const totalPages = Math.ceil(
    filteredprojectlist.length / recordsPerPageValue,
  );
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
    updatePagination();
    window.scrollTo(0, 0);
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidenav");
  sidebar.classList.toggle("collapsed");
}

function toggleSubmenu(e, submenuId) {
  e.preventDefault();
  const submenu = document.getElementById(submenuId);
  const menuItem = submenu.previousElementSibling;
  const allSubmenus = document.querySelectorAll(".submenu");
  const allMenuItems = document.querySelectorAll(".menu-item");
  allSubmenus.forEach((menu) => {
    if (menu.id !== submenuId) menu.classList.remove("open");
  });
  allMenuItems.forEach((item) => {
    if (item !== menuItem) item.classList.remove("active");
  });
  submenu.classList.toggle("open");
  menuItem.classList.toggle("active");
  localStorage.setItem("openMenu", "open");
}

// Clear all field-level validation errors
function clearValidation() {
  [
    "numberGroup",
    "typeGroup",
    "descriptionGroup",
    "pLeaderGroup",
    "capGroup",
    "dueGroup",
    "completedGroup",
  ].forEach(function (id) {
    const g = document.getElementById(id);
    if (g) g.classList.remove("govuk-form-group--error");
  });
  document
    .querySelectorAll("#editForm .govuk-error-message")
    .forEach(function (el) {
      el.hidden = true;
    });
  document
    .querySelectorAll(
      "#editForm .govuk-input--error, #editForm .govuk-select--error, #editForm .govuk-textarea--error",
    )
    .forEach(function (el) {
      el.classList.remove(
        "govuk-input--error",
        "govuk-select--error",
        "govuk-textarea--error",
      );
    });
}

// Mark a field as invalid with a GOV.UK error message
function showFieldError(
  groupId,
  errorId,
  errorMsgId,
  inputId,
  message,
  inputType,
) {
  document.getElementById(groupId).classList.add("govuk-form-group--error");
  const errorEl = document.getElementById(errorId);
  errorEl.hidden = false;
  document.getElementById(errorMsgId).textContent = message;
  const errorClass =
    inputType === "select"
      ? "govuk-select--error"
      : inputType === "textarea"
        ? "govuk-textarea--error"
        : "govuk-input--error";
  document.getElementById(inputId).classList.add(errorClass);
}

// Close edit modal
function closeEditModal() {
  clearValidation();
  document.getElementById("editModal").classList.remove("open");
}

// Open edit modal with milestone data
function openEditModal(item) {
  clearValidation();
  // Set heading for edit mode
  document.querySelector("#editModal .govuk-edit-modal__title").innerHTML =
    'Edit Milestone/Deliverable - Type: <span id="modalTypeDisplay">' +
    (item.type || "") +
    "</span>";

  document.getElementById("modalNumber").value = item.project || "";

  const typeSelect = document.getElementById("modalType");
  typeSelect.value = item.type || "";
  for (let option of typeSelect.options) {
    if (option.value === item.type) {
      option.selected = true;
      break;
    }
  }

  document.getElementById("modalTypeDisplay").textContent = item.type || "";
  document.getElementById("modalDescription").value = item.description || "";
  document.getElementById("modalPLeader").value = item.pLeader || "";
  document.getElementById("modalCap").value = item.cap || "";
  document.getElementById("modalDue").value = item.due || "";
  document.getElementById("modalCompleted").value = item.completed || "";
  document.getElementById("modalReview").checked = item.review === "Yes";
  document.getElementById("modalTarget").checked = item.target === "Yes";
  document
    .getElementById("editModal")
    .setAttribute("data-edit-index", item.project);
  document.getElementById("editModal").classList.add("open");
}

// Handle edit button click
function handleTimeCodeEdit(item) {
  openEditModal(item);
}

// Open modal in add mode
function openAddModal() {
  clearValidation();
  // Set heading for add mode
  document.querySelector("#editModal .govuk-edit-modal__title").textContent =
    "Add Milestone/Deliverable";
  document.getElementById("modalNumber").value = "";
  document.getElementById("modalType").value = "";
  document.getElementById("modalDescription").value = "";
  document.getElementById("modalPLeader").value = "";
  document.getElementById("modalCap").value = "";
  document.getElementById("modalDue").value = "";
  document.getElementById("modalCompleted").value = "";
  document.getElementById("modalReview").checked = false;
  document.getElementById("modalTarget").checked = false;
  document
    .getElementById("editModal")
    .setAttribute("data-edit-index", "__new__");
  document.getElementById("editModal").classList.add("open");
}

// Handle delete button click
function handleDeleteTimecode(id) {
  if (confirm("Are you sure you want to delete this record?")) {
    // Find and remove the item from dummyData
    const index = dummyData.findIndex((item) => item.project === id);
    if (index > -1) {
      dummyData.splice(index, 1);
      filteredprojectlist = [...dummyData];
      renderTable();
      updatePagination();
    }
  }
}

// Save milestone with GOV.UK validation
function saveMilestone() {
  clearValidation();
  let hasErrors = false;

  const number = document.getElementById("modalNumber").value.trim();
  const type = document.getElementById("modalType").value;
  const description = document.getElementById("modalDescription").value.trim();
  const due = document.getElementById("modalDue").value;
  const capComment = document.getElementById("modalCap").value.trim();
  const plComment = document.getElementById("modalPLeader").value.trim();

  if (!number) {
    showFieldError(
      "numberGroup",
      "numberError",
      "numberErrorMsg",
      "modalNumber",
      "Enter a number",
      "input",
    );
    hasErrors = true;
  }
  if (!type) {
    showFieldError(
      "typeGroup",
      "typeError",
      "typeErrorMsg",
      "modalType",
      "Select a type",
      "select",
    );
    hasErrors = true;
  }
  if (!description) {
    showFieldError(
      "descriptionGroup",
      "descriptionError",
      "descriptionErrorMsg",
      "modalDescription",
      "Enter a description",
      "textarea",
    );
    hasErrors = true;
  }
  // if (!capComment) {
  //   showFieldError(
  //     "capGroup",
  //     "capError",
  //     "capErrorMsg",
  //     "modalCap",
  //     "Enter a comment",
  //     "textarea",
  //   );
  //   hasErrors = true;
  // }
  // if (!plComment) {
  //   showFieldError(
  //     "pLeaderGroup",
  //     "pLeaderError",
  //     "pLeaderErrorMsg",
  //     "modalPLeader",
  //     "Enter a comment",
  //     "textarea",
  //   );
  //   hasErrors = true;
  // }
  if (!due) {
    showFieldError(
      "dueGroup",
      "dueError",
      "dueErrorMsg",
      "modalDue",
      "Enter a due date",
      "input",
    );
    hasErrors = true;
  }

  if (hasErrors) {
    const firstInvalid = document.querySelector(
      "#editForm .govuk-form-group--error input, " +
        "#editForm .govuk-form-group--error select, " +
        "#editForm .govuk-form-group--error textarea",
    );
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const editIndex = document
    .getElementById("editModal")
    .getAttribute("data-edit-index");

  if (editIndex === "__new__") {
    const maxId = dummyData.reduce(
      (max, item) => Math.max(max, parseInt(item.project) || 0),
      0,
    );
    dummyData.push({
      project: String(maxId + 1),
      type: type,
      description: description,
      pLeader: document.getElementById("modalPLeader").value,
      cap: document.getElementById("modalCap").value,
      due: due,
      completed: document.getElementById("modalCompleted").value,
      review: document.getElementById("modalReview").checked ? "Yes" : "No",
      target: document.getElementById("modalTarget").checked ? "Yes" : "No",
    });
    filteredprojectlist = [...dummyData];
    currentPage = Math.ceil(filteredprojectlist.length / recordsPerPageValue);
    renderTable();
    updatePagination();
    closeEditModal();
    return;
  }

  const index = dummyData.findIndex((item) => item.project === editIndex);

  if (index > -1) {
    dummyData[index] = {
      project: number,
      type: type,
      description: description,
      pLeader: document.getElementById("modalPLeader").value,
      cap: document.getElementById("modalCap").value,
      due: due,
      completed: document.getElementById("modalCompleted").value,
      review: document.getElementById("modalReview").checked ? "Yes" : "No",
      target: document.getElementById("modalTarget").checked ? "Yes" : "No",
    };

    filteredprojectlist = [...dummyData];
    renderTable();
    updatePagination();
    closeEditModal();
  }
}

// Initialize modal event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Number input validation
  document
    .getElementById("modalNumber")
    .addEventListener("input", function (e) {
      const value = e.target.value;
      // Allow only numbers and / character
      const cleaned = value.replace(/[^0-9/]/g, "");
      // Ensure format is 00/00 (max 5 characters)
      if (cleaned.length > 5) {
        e.target.value = cleaned.substring(0, 5);
      } else {
        e.target.value = cleaned;
      }
    });
});

// Close modal when clicking outside of it (GOV.UK pattern)
window.addEventListener("click", function (event) {
  const modal = document.getElementById("editModal");
  if (event.target === modal && modal.classList.contains("open")) {
    closeEditModal();
  }
});

// Close modal with Escape key (GOV.UK pattern - accessibility)
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("editModal");
    if (modal && modal.classList.contains("open")) {
      closeEditModal();
    }
  }
});
