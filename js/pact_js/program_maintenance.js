// Program Maintenance - JavaScript Handler
// This script manages the program selection and project data table

let programsData = [];
let projectsData = [];
let filteredData = [];
let selectedProgram = null;

// Global state
let currentSortColumn = null;
let currentSortDirection = 'asc';
let currentPage = 1;
let recordsPerPage = 10;
let editingIndex = null;

/**
 * Load programs data from JSON file
 */
async function loadProgramsData() {
    try {
        const response = await fetch('../js/pact_js/data/program-list.json');
        if (!response.ok) throw new Error('Failed to load programs data');
        programsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading programs data:', error);
        programsData = [];
        return false;
    }
}

/**
 * Load projects data from JSON file
 */
async function loadProjectsData() {
    try {
        const response = await fetch('../js/pact_js/data/program-maintenance-data.json');
        if (!response.ok) throw new Error('Failed to load projects data');
        projectsData = await response.json();
        return true;
    } catch (error) {
        console.error('Error loading projects data:', error);
        projectsData = [];
        return false;
    }
}

/**
 * Initialize program dropdown with search functionality
 */
function initProgramDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.select-search-box');
    const clearBtn = dropdown.querySelector('.clear-search-btn');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        dataset
            .filter(d =>
                d.programCode.toLowerCase().includes(filter) || 
                d.programName.toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="sup_text_center">${d.programCode}</td><td>${d.programName}</td>`;
                tr.onclick = () => {
                    input.value = d.programCode;
                    selectedProgram = d.programCode;
                    panel.style.display = 'none';
                    updateProgramDetails(d);
                    filterAndRenderProjects(true);
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        if (search) {
            search.value = '';
            search.focus();
        }
        renderRows();
    });

    if (search) {
        search.addEventListener('input', e => {
            renderRows(e.target.value.toLowerCase());
        });
    }
    
    // Clear search button functionality
    if (clearBtn && search) {
        clearBtn.addEventListener('click', e => {
            e.stopPropagation();
            search.value = '';
            renderRows();
            search.focus();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

/**
 * Update program details in the form
 */
function updateProgramDetails(program) {
    document.getElementById('programNo').value = program.programCode || '';
    document.getElementById('selectedProject').value = program.jobcode || '';
    document.getElementById('programName').value = program.programName || '';
    document.getElementById('sectorName').value = program.sectorName || '';
    document.getElementById('customer').value = program.customer || '';
    document.getElementById('leader').value = program.leader || '';
    document.getElementById('minim').value = program.minim || '';
    document.getElementById('directorate').value = program.directorate || '';
}

/**
 * Initialize all dropdowns
 */
function initializeDropdowns() {
    document.querySelectorAll('[data-empdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'programs') {
            initProgramDropdown(dd, programsData);
        }
    });
}

/**
 * Setup table sorting functionality
 */
function setupTableSorting() {
    const table = document.getElementById('projectsTable');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-column]');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.column; // Use string column name instead of index
            
            // Toggle sort order
            if (currentSortColumn === column) {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortColumn = column;
                currentSortDirection = 'asc';
            }
            
            // Remove sorting icons from all headers
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) {
                    existingIcon.remove();
                }
            });
            
            // Add sorting icon to clicked header
            this.dataset.order = currentSortDirection;
            const sortIcon = document.createElement('span');
            sortIcon.className = 'sort-icon';
            if (currentSortDirection === 'asc') {
                sortIcon.innerHTML = ' ▲';
                this.classList.add('sorted-asc');
            } else {
                sortIcon.innerHTML = ' ▼';
                this.classList.add('sorted-desc');
            }
            this.appendChild(sortIcon);
            
            // Perform sort
            sortTable(column);
        });
    });
}

/**
 * Sort table by column
 */
function sortTable(column) {
    // Sort direction already set in setupTableSorting
    filterAndRenderProjects(true);
}

/**
 * Filter and render projects based on current filters
 * @param {boolean} resetPage - Whether to reset to page 1
 */
function filterAndRenderProjects(resetPage = false) {
    // Filter by selected program
    if (selectedProgram) {
        filteredData = projectsData.filter(project => project.programCode === selectedProgram);
    } else {
        filteredData = [...projectsData];
    }
    
    // Sort data
    if (currentSortColumn !== null) {
        filteredData.sort((a, b) => {
            const key = currentSortColumn; // Use column name directly
            
            let aVal = a[key];
            let bVal = b[key];
            
            // Handle null values
            if (aVal === null && bVal === null) return 0;
            if (aVal === null) return currentSortDirection === 'asc' ? 1 : -1;
            if (bVal === null) return currentSortDirection === 'asc' ? -1 : 1;
            
            // Handle numeric columns
            if (typeof aVal === 'number') {
                return currentSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }
            
            // Handle string columns
            aVal = String(aVal).toLowerCase();
            bVal = String(bVal).toLowerCase();
            
            if (currentSortDirection === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }
    
    // Reset to page 1 only when filter changes
    if (resetPage) {
        currentPage = 1;
    }
    
    renderProjectsTable();
    renderPagination();
}

/**
 * Render projects table
 */
function renderProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    paginatedData.forEach((project, index) => {
        const actualIndex = startIndex + index;
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        
        row.innerHTML = `
            <td class="govuk-table__cell">${project.code || ''}</td>
            <td class="govuk-table__cell">${project.title || ''}</td>
            <td class="govuk-table__cell">${project.manager || ''}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(project.budgCVL)}</td>
            <td class="govuk-table__cell" style="text-align: right;">£${formatNumber(project.budgExt)}</td>
            <td class="govuk-table__cell">${project.projectStatus || ''}</td>
           <!-- <td class="govuk-table__cell" style="text-align: center;">
                <button class="edit-btn" onclick="editProject(${actualIndex})" 
                    style="background: none; border: none; cursor: pointer; margin-right: 5px;">
                    <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                </button>
                <button class="delete-btn" onclick="deleteProject(${actualIndex})" 
                    style="background: none; border: none; cursor: pointer;">
                    <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                </button>
            </td>-->
        `;
        
        // Add row click to select project
        row.addEventListener('click', function(e) {
            if (!e.target.closest('.edit-btn') && !e.target.closest('.delete-btn')) {
                document.getElementById('selectedProject').value = project.code;
            }
        });
        
        tbody.appendChild(row);
    });
    
    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        row.className = 'govuk-table__row';
        row.innerHTML = '<td colspan="7" class="govuk-table__cell" style="text-align: center;">No projects found</td>';
        tbody.appendChild(row);
    } else {
        // Set the first row's code value to selectedProject textbox
        const selectedProjectInput = document.getElementById('selectedProject');
        if (selectedProjectInput && filteredData.length > 0) {
            selectedProjectInput.value = filteredData[0].code || '';
        }
    }
}

/**
 * Format number with commas and 2 decimal places
 */
function formatNumber(num) {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Render pagination
 */
function renderPagination() {
    const paginationContainer = document.getElementById('projectsPagination');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    
    // Ensure currentPage doesn't exceed totalPages
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    
    if (totalPages <= 1) return;
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    prevItem.innerHTML = `
        <a class="govuk-link govuk-pagination__link" href="#" rel="prev">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            <span class="govuk-pagination__link-title">Previous</span>
        </a>
    `;
    prevItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            filterAndRenderProjects();
        }
    });
    paginationContainer.appendChild(prevItem);
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'govuk-pagination__item';
        if (i === currentPage) {
            pageItem.className += ' govuk-pagination__item--current';
        }
        pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
        
        pageItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            currentPage = i;
            filterAndRenderProjects();
        });
        
        paginationContainer.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    nextItem.innerHTML = `
        <a class="govuk-link govuk-pagination__link" href="#" rel="next">
            <span class="govuk-pagination__link-title">Next</span>
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </a>
    `;
    nextItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            filterAndRenderProjects();
        }
    });
    paginationContainer.appendChild(nextItem);
}

/**
 * Open modal for add or edit
 */
function openProjectModal(item = null, index = null) {
    const modal = document.getElementById('addProjectModal');
    editingIndex = index;
    
    if (item !== null) {
        // Edit mode
        document.getElementById('txtmodal-code').value = item.code || '';
        document.getElementById('txtmodal-code').disabled = true;
        document.getElementById('txtmodal-title').value = item.title || '';
        document.getElementById('txtmodal-manager').value = item.manager || '';
        document.getElementById('txtmodal-budgcvl').value = item.budgCVL || '';
        document.getElementById('txtmodal-budgext').value = item.budgExt || '';
        document.getElementById('txtmodal-status').value = item.projectStatus || '';
        document.getElementById('projectModalLabel').textContent = 'Edit Project';
    } else {
        // Add mode
        document.getElementById('formAddProject').reset();
        document.getElementById('txtmodal-code').disabled = false;
        document.getElementById('projectModalLabel').textContent = 'Add Project';
    }
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Close modal
 */
function closeProjectModal() {
    const modal = document.getElementById('addProjectModal');
    
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddProject').reset();
            editingIndex = null;
        }, 300);
    }
}

/**
 * Save project (add or edit)
 */
function saveProject() {
    const code = document.getElementById('txtmodal-code').value.trim();
    const title = document.getElementById('txtmodal-title').value.trim();
    const manager = document.getElementById('txtmodal-manager').value.trim();
    const budgCVL = parseFloat(document.getElementById('txtmodal-budgcvl').value) || 0;
    const budgExt = parseFloat(document.getElementById('txtmodal-budgext').value) || 0;
    const projectStatus = document.getElementById('txtmodal-status').value;
    
    // Validation
    if (!code || !title || !manager || !projectStatus) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!selectedProgram) {
        alert('Please select a program first');
        return;
    }
    
    if (editingIndex !== null) {
        // Edit mode
        projectsData[editingIndex] = {
            ...projectsData[editingIndex],
            code,
            title,
            manager,
            budgCVL,
            budgExt,
            projectStatus
        };
    } else {
        // Add mode
        const maxId = projectsData.reduce((max, p) => Math.max(max, p.id || 0), 0);
        const newProject = {
            id: maxId + 1,
            programCode: selectedProgram,
            code,
            title,
            manager,
            budgCVL,
            budgExt,
            projectStatus
        };
        projectsData.push(newProject);
    }
    
    closeProjectModal();
    filterAndRenderProjects();
    alert(editingIndex !== null ? 'Project updated successfully!' : 'Project added successfully!');
}

/**
 * Edit project
 */
function editProject(index) {
    event.stopPropagation();
    // Find the actual index in projectsData
    const actualIndex = projectsData.findIndex(p => p.id === filteredData[index].id);
    openProjectModal(projectsData[actualIndex], actualIndex);
}

/**
 * Delete project
 */
function deleteProject(index) {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    // Find the actual index in projectsData
    const actualIndex = projectsData.findIndex(p => p.id === filteredData[index].id);
    
    if (actualIndex === -1) {
        alert('Project not found.');
        return;
    }
    
    projectsData.splice(actualIndex, 1);
    filterAndRenderProjects();
    alert('Project deleted successfully!');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add project button
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (!selectedProgram) {
                alert('Please select a program first');
                return;
            }
            openProjectModal();
        });
    }
    
    // Modal close buttons
    const closeBtn = document.getElementById('closeProjectModalBtn');
    const cancelBtn = document.getElementById('cancelProjectModalBtn');
    const saveBtn = document.getElementById('saveProjectBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeProjectModal);
    }
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProject);
    }
    
    // Records per page
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', function() {
            recordsPerPage = parseInt(this.value);
            filterAndRenderProjects(true);
        });
    }
    
    // Project Maintenance button
    const projectMaintenanceBtn = document.getElementById('projectMaintenanceBtn');
    if (projectMaintenanceBtn) {
        projectMaintenanceBtn.addEventListener('click', function() {
            const selectedProject = document.getElementById('selectedProject').value;
            if (selectedProject) {
                // Create data object to pass to the next page
                const dataObj = {
                    jobcode: selectedProject,
                    programCode: selectedProgram
                };
                const json = JSON.stringify(dataObj);
                const encoded = btoa(json); // convert to Base64
                
                window.location.href = 'project_management_five.opttwo.html?data=' + encoded;
            } else {
                alert('Please select a project first');
            }
        });
    }
    
    // Column resizers
    setupResizers();
}

/**
 * Column resizer functionality
 */
function setupResizers() {
    const resizers = document.querySelectorAll(".resizer");
    
    resizers.forEach((resizer) => {
        resizer.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            
            const th = this.parentElement;
            const startX = e.pageX;
            const startWidth = th.offsetWidth;
            
            function onMouseMove(e) {
                const newWidth = startWidth + (e.pageX - startX);
                th.style.width = newWidth + "px";
            }
            
            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
            
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });
}

document.getElementById('btnProgramMaintenance').addEventListener('click', function() {
    alert('data saved successfully!');
});

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', async function() {
    await loadProgramsData();
    await loadProjectsData();
    initializeDropdowns();
    setupTableSorting();
    setupEventListeners();
    
    // Auto-select the first program on page load
    if (programsData && programsData.length > 0) {
        const firstProgram = programsData[0];
        const input = document.getElementById('programSelect');
        if (input) {
            input.value = firstProgram.programCode;
            selectedProgram = firstProgram.programCode;
            updateProgramDetails(firstProgram);
            filterAndRenderProjects(true);
        }
    } else {
        // Don't render projects initially - wait for program selection
        renderProjectsTable();
    }
});
