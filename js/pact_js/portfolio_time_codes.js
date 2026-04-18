// Portfolio Time Codes - JavaScript Handler
// This script manages portfolio time codes CRUD operations

// Global data arrays
let jobCodesData = [];
let timecodesData = [];
let filteredJobCodesData = [];
let filteredTimecodesData = [];
let currentProjectCode = '';

// Pagination state for jobcodes table
let currentJobcodePage = 1;
let recordsPerPageJobcode = 10;

// Pagination state for timecodes table
let currentTimecodePage = 1;
let recordsPerPageTimecode = 10;

// Editing state
let editingJobcodeIndex = null;
let editingTimecodeIndex = null;

/**
 * Load portfolio time codes data from JSON
 */
async function loadPortfolioTimeCodesData() {
    try {
        const response = await fetch('../js/pact_js/data/portfolio-time-codes-data.json');
        if (!response.ok) throw new Error('Failed to load portfolio time codes data');
        const data = await response.json();
        jobCodesData = data.projectJobCodes || [];
        timecodesData = data.timecodeValidities || [];
        return true;
    } catch (error) {
        console.error('Error loading portfolio time codes data:', error);
        jobCodesData = [];
        timecodesData = [];
        return false;
    }
}

/**
 * Initialize the page
 */
async function initializePage() {
    await loadPortfolioTimeCodesData();
    
    // Get project code from URL parameter
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");
    
    if (encoded) {
        try {
            const data = JSON.parse(atob(encoded));
            currentProjectCode = data.jobcode || 'APHAEM000000';
        } catch (error) {
            currentProjectCode = 'APHAEM000000';
        }
    } else {
        currentProjectCode = 'APHAEM000000';
    }
    
    // Set project code in UI
    document.getElementById('sp-projectcode').value = currentProjectCode;
    document.getElementById('projectCodeLabel').textContent = currentProjectCode;
    
    // Initialize filtered data
    filteredJobCodesData = [...jobCodesData];
    filteredTimecodesData = [...timecodesData];
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial tables
    renderJobcodesTable();
    renderTimecodesTable();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Search input for jobcodes
    const jobcodeSearch = document.getElementById('jobcodeSearch');
    if (jobcodeSearch) {
        jobcodeSearch.addEventListener('input', handleJobcodeSearch);
    }
    
    // Add JobCode button
    const addJobcodeBtn = document.getElementById('addJobcodeBtn');
    if (addJobcodeBtn) {
        addJobcodeBtn.addEventListener('click', openAddJobcodeModal);
    }
    
    // Records per page dropdown for jobcodes
    const recordsPerPageJobcodeSelect = document.getElementById('recordsPerPageJobcode');
    if (recordsPerPageJobcodeSelect) {
        recordsPerPageJobcodeSelect.addEventListener('change', (e) => {
            recordsPerPageJobcode = parseInt(e.target.value);
            currentJobcodePage = 1;
            renderJobcodesTable();
        });
    }
    
    // Search input for timecodes
    const timecodeSearch = document.getElementById('timecodeSearch');
    if (timecodeSearch) {
        timecodeSearch.addEventListener('input', handleTimecodeSearch);
    }
    
    // Add TimeCode button
    const addTimecodeBtn = document.getElementById('addTimecodeBtn');
    if (addTimecodeBtn) {
        addTimecodeBtn.addEventListener('click', openAddTimecodeModal);
    }
    
    // Records per page dropdown for timecodes
    const recordsPerPageTimecodeSelect = document.getElementById('recordsPerPageTimecode');
    if (recordsPerPageTimecodeSelect) {
        recordsPerPageTimecodeSelect.addEventListener('change', (e) => {
            recordsPerPageTimecode = parseInt(e.target.value);
            currentTimecodePage = 1;
            renderTimecodesTable();
        });
    }
    
    // Modal event listeners
    setupModalEventListeners();
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    // JobCode Modal
    const jobcodeModal = document.getElementById('jobcodeModal');
    const closeJobcodeBtn = document.getElementById('closeJobcodeModalBtn');
    const cancelJobcodeBtn = document.getElementById('cancelJobcodeModalBtn');
    const saveJobcodeBtn = document.getElementById('saveJobcodeBtn');
    
    if (closeJobcodeBtn) {
        closeJobcodeBtn.addEventListener('click', closeJobcodeModal);
    }
    
    if (cancelJobcodeBtn) {
        cancelJobcodeBtn.addEventListener('click', closeJobcodeModal);
    }
    
    if (saveJobcodeBtn) {
        saveJobcodeBtn.addEventListener('click', saveJobcode);
    }
    
    if (jobcodeModal) {
        jobcodeModal.addEventListener('click', (e) => {
            if (e.target === jobcodeModal) {
                closeJobcodeModal();
            }
        });
    }
    
    // TimeCode Modal
    const timecodeModal = document.getElementById('timecodeModal');
    const closeTimecodeBtn = document.getElementById('closeTimecodeModalBtn');
    const cancelTimecodeBtn = document.getElementById('cancelTimecodeModalBtn');
    const saveTimecodeBtn = document.getElementById('saveTimecodeBtn');
    
    if (closeTimecodeBtn) {
        closeTimecodeBtn.addEventListener('click', closeTimecodeModal);
    }
    
    if (cancelTimecodeBtn) {
        cancelTimecodeBtn.addEventListener('click', closeTimecodeModal);
    }
    
    if (saveTimecodeBtn) {
        saveTimecodeBtn.addEventListener('click', saveTimecode);
    }
    
    if (timecodeModal) {
        timecodeModal.addEventListener('click', (e) => {
            if (e.target === timecodeModal) {
                closeTimecodeModal();
            }
        });
    }
}

/**
 * Handle search for jobcodes
 */
function handleJobcodeSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredJobCodesData = [...jobCodesData];
    } else {
        filteredJobCodesData = jobCodesData.filter(job => 
            job.jobCode.toLowerCase().includes(searchTerm) ||
            job.name.toLowerCase().includes(searchTerm) ||
            job.type.toLowerCase().includes(searchTerm) ||
            (job.workGrp && job.workGrp.toLowerCase().includes(searchTerm))
        );
    }
    
    currentJobcodePage = 1;
    renderJobcodesTable();
}

/**
 * Handle search for timecodes
 */
function handleTimecodeSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredTimecodesData = [...timecodesData];
    } else {
        filteredTimecodesData = timecodesData.filter(tc => 
            tc.workGrp.toLowerCase().includes(searchTerm) ||
            tc.timeCode.toLowerCase().includes(searchTerm) ||
            tc.project.toLowerCase().includes(searchTerm) ||
            tc.jobCode.toLowerCase().includes(searchTerm) ||
            (tc.testCode && tc.testCode.toLowerCase().includes(searchTerm)) ||
            (tc.portfolio && tc.portfolio.toLowerCase().includes(searchTerm))
        );
    }
    
    currentTimecodePage = 1;
    renderTimecodesTable();
}

/**
 * Render jobcodes table with pagination
 */
function renderJobcodesTable() {
    const tableBody = document.getElementById('jobcodeTableBody');
    if (!tableBody) return;
    
    const totalRecords = filteredJobCodesData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPageJobcode);
    const startIndex = (currentJobcodePage - 1) * recordsPerPageJobcode;
    const endIndex = startIndex + recordsPerPageJobcode;
    const pageData = filteredJobCodesData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="sup_text_center">No jobcodes found</td></tr>';
    } else {
        pageData.forEach((job, index) => {
            const row = document.createElement('tr');
            row.className = 'govuk-table__row';
            
            const actualIndex = startIndex + index;
            
            row.innerHTML = `
                <td class="govuk-table__cell">${job.jobCode}</td>
                <td class="govuk-table__cell">${job.name}</td>
                <td class="govuk-table__cell">${job.type}</td>
                <td class="govuk-table__cell">${job.workGrp || ''}</td>
                <td class="govuk-table__cell sup_text_center" onclick="event.stopPropagation()">
                    <button class="edit-btn" onclick="editJobcode(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Edit jobcode">
                        <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                    </button>
                    <button class="delete-btn" onclick="deleteJobcode(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Delete jobcode">
                        <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    renderJobcodePagination(totalPages);
}

/**
 * Render pagination for jobcodes table
 */
function renderJobcodePagination(totalPages) {
    const pagination = document.getElementById('jobcodePagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    if (currentJobcodePage === 1) {
        prevItem.innerHTML = `<span class="govuk-pagination__link" style="cursor: not-allowed; opacity: 0.5;">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            Previous
        </span>`;
    } else {
        prevItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="prev">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            Previous
        </a>`;
        prevItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            changeJobcodePage(currentJobcodePage - 1);
        });
    }
    pagination.appendChild(prevItem);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `govuk-pagination__item${i === currentJobcodePage ? ' govuk-pagination__item--current' : ''}`;
        
        if (i === currentJobcodePage) {
            pageItem.innerHTML = `<span class="govuk-pagination__link" aria-label="Page ${i}" aria-current="page">${i}</span>`;
        } else {
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                changeJobcodePage(i);
            });
        }
        
        pagination.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    if (currentJobcodePage === totalPages) {
        nextItem.innerHTML = `<span class="govuk-pagination__link" style="cursor: not-allowed; opacity: 0.5;">
            Next
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </span>`;
    } else {
        nextItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="next">
            Next
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </a>`;
        nextItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            changeJobcodePage(currentJobcodePage + 1);
        });
    }
    pagination.appendChild(nextItem);
}

/**
 * Change jobcode page
 */
function changeJobcodePage(page) {
    const totalPages = Math.ceil(filteredJobCodesData.length / recordsPerPageJobcode);
    if (page < 1 || page > totalPages) return;
    currentJobcodePage = page;
    renderJobcodesTable();
}

/**
 * Render timecodes table with pagination
 */
function renderTimecodesTable() {
    const tableBody = document.getElementById('timecodeTableBody');
    if (!tableBody) return;
    
    const totalRecords = filteredTimecodesData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPageTimecode);
    const startIndex = (currentTimecodePage - 1) * recordsPerPageTimecode;
    const endIndex = startIndex + recordsPerPageTimecode;
    const pageData = filteredTimecodesData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="sup_text_center">No timecodes found</td></tr>';
    } else {
        pageData.forEach((tc, index) => {
            const row = document.createElement('tr');
            row.className = 'govuk-table__row';
            
            const actualIndex = startIndex + index;
            
            // Create checkbox for active status matching workGroupsTable pattern
            const activeCheckbox = `
                <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
                    <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input" 
                               type="checkbox" 
                               id="activeRowTC${tc.id}" 
                               ${tc.active ? 'checked' : ''} 
                               disabled />
                        <label class="govuk-label govuk-checkboxes__label" 
                               for="activeRowTC${tc.id}" 
                               style="padding: 0;"></label>
                    </div>
                </div>
            `;
            
            row.innerHTML = `
                <td class="govuk-table__cell">${tc.workGrp}</td>
                <td class="govuk-table__cell">${activeCheckbox}</td>
                <td class="govuk-table__cell">${tc.timeCode}</td>
                <td class="govuk-table__cell">${tc.project}</td>
                <td class="govuk-table__cell">${tc.jobCode}</td>
                <td class="govuk-table__cell">${tc.testCode || ''}</td>
                <td class="govuk-table__cell"></td>
                <td class="govuk-table__cell sup_text_center" onclick="event.stopPropagation()">
                    <button class="edit-btn" onclick="editTimecode(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Edit timecode">
                        <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                    </button>
                    <button class="delete-btn" onclick="deleteTimecode(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Delete timecode">
                        <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    renderTimecodePagination(totalPages);
}

/**
 * Render pagination for timecodes table
 */
function renderTimecodePagination(totalPages) {
    const pagination = document.getElementById('timecodePagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    if (currentTimecodePage === 1) {
        prevItem.innerHTML = `<span class="govuk-pagination__link" style="cursor: not-allowed; opacity: 0.5;">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            Previous
        </span>`;
    } else {
        prevItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="prev">
            <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            Previous
        </a>`;
        prevItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            changeTimecodePage(currentTimecodePage - 1);
        });
    }
    pagination.appendChild(prevItem);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `govuk-pagination__item${i === currentTimecodePage ? ' govuk-pagination__item--current' : ''}`;
        
        if (i === currentTimecodePage) {
            pageItem.innerHTML = `<span class="govuk-pagination__link" aria-label="Page ${i}" aria-current="page">${i}</span>`;
        } else {
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                changeTimecodePage(i);
            });
        }
        
        pagination.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    if (currentTimecodePage === totalPages) {
        nextItem.innerHTML = `<span class="govuk-pagination__link" style="cursor: not-allowed; opacity: 0.5;">
            Next
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </span>`;
    } else {
        nextItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="next">
            Next
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        </a>`;
        nextItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            changeTimecodePage(currentTimecodePage + 1);
        });
    }
    pagination.appendChild(nextItem);
}

/**
 * Change timecode page
 */
function changeTimecodePage(page) {
    const totalPages = Math.ceil(filteredTimecodesData.length / recordsPerPageTimecode);
    if (page < 1 || page > totalPages) return;
    currentTimecodePage = page;
    renderTimecodesTable();
}

// ===== JOBCODE CRUD OPERATIONS =====

/**
 * Open Add JobCode Modal
 */
function openAddJobcodeModal() {
    const modal = document.getElementById('jobcodeModal');
    const modalLabel = document.getElementById('jobcodeModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Add New JobCode';
    }
    
    document.getElementById('formAddJobcode').reset();
    editingJobcodeIndex = null;
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Edit JobCode
 */
function editJobcode(index) {
    const jobcode = filteredJobCodesData[index];
    if (!jobcode) return;
    
    const actualIndex = jobCodesData.findIndex(j => j.id === jobcode.id);
    editingJobcodeIndex = actualIndex;
    
    const modal = document.getElementById('jobcodeModal');
    const modalLabel = document.getElementById('jobcodeModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Edit JobCode';
    }
    
    document.getElementById('txtmodal-jobcode').value = jobcode.jobCode;
    document.getElementById('txtmodal-jobname').value = jobcode.name;
    document.getElementById('txtmodal-jobtype').value = jobcode.type;
    document.getElementById('txtmodal-jobworkgrp').value = jobcode.workGrp || '';
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Delete JobCode
 */
function deleteJobcode(index) {
    if (!confirm('Are you sure you want to delete this jobcode?')) {
        return;
    }
    
    const itemToDelete = filteredJobCodesData[index];
    const actualIndex = jobCodesData.findIndex(j => j.id === itemToDelete.id);
    
    if (actualIndex !== -1) {
        jobCodesData.splice(actualIndex, 1);
        
        const searchTerm = document.getElementById('jobcodeSearch')?.value?.toLowerCase().trim() || '';
        if (!searchTerm) {
            filteredJobCodesData = [...jobCodesData];
        } else {
            filteredJobCodesData = jobCodesData.filter(job =>
                job.jobCode.toLowerCase().includes(searchTerm) ||
                job.name.toLowerCase().includes(searchTerm) ||
                job.type.toLowerCase().includes(searchTerm) ||
                (job.workGrp && job.workGrp.toLowerCase().includes(searchTerm))
            );
        }
        
        renderJobcodesTable();
        populateJobcodeDropdown();
        alert('JobCode deleted successfully!');
    }
}

/**
 * Save JobCode (Add or Update)
 */
function saveJobcode() {
    const jobCode = document.getElementById('txtmodal-jobcode').value.trim();
    const name = document.getElementById('txtmodal-jobname').value.trim();
    const type = document.getElementById('txtmodal-jobtype').value;
    const workGrp = document.getElementById('txtmodal-jobworkgrp').value.trim();
    
    if (!jobCode || !name || !type) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newEntry = {
        id: editingJobcodeIndex !== null ? jobCodesData[editingJobcodeIndex].id :
            (jobCodesData.length > 0 ? Math.max(...jobCodesData.map(j => j.id)) + 1 : 1),
        jobCode: jobCode,
        name: name,
        type: type,
        workGrp: workGrp
    };
    
    if (editingJobcodeIndex !== null) {
        jobCodesData[editingJobcodeIndex] = newEntry;
        alert('JobCode updated successfully!');
    } else {
        jobCodesData.push(newEntry);
        alert('JobCode added successfully!');
    }
    
    const searchTerm = document.getElementById('jobcodeSearch')?.value?.toLowerCase().trim() || '';
    if (!searchTerm) {
        filteredJobCodesData = [...jobCodesData];
    } else {
        filteredJobCodesData = jobCodesData.filter(job =>
            job.jobCode.toLowerCase().includes(searchTerm) ||
            job.name.toLowerCase().includes(searchTerm) ||
            job.type.toLowerCase().includes(searchTerm) ||
            (job.workGrp && job.workGrp.toLowerCase().includes(searchTerm))
        );
    }
    
    closeJobcodeModal();
    renderJobcodesTable();
    populateJobcodeDropdown();
}

/**
 * Close JobCode Modal
 */
function closeJobcodeModal() {
    const modal = document.getElementById('jobcodeModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddJobcode').reset();
            editingJobcodeIndex = null;
        }, 300);
    }
}

// ===== TIMECODE CRUD OPERATIONS =====

/**
 * Populate jobcode dropdown in timecode modal
 */
function populateJobcodeDropdown() {
    const select = document.getElementById('txtmodal-tc-jobcode');
    if (!select) return;
    
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    jobCodesData.forEach(job => {
        const option = document.createElement('option');
        option.value = job.jobCode;
        option.textContent = `${job.jobCode} - ${job.name}`;
        select.appendChild(option);
    });
}

/**
 * Open Add TimeCode Modal
 */
function openAddTimecodeModal() {
    const modal = document.getElementById('timecodeModal');
    const modalLabel = document.getElementById('timecodeModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Add New TimeCode';
    }
    
    document.getElementById('formAddTimecode').reset();
    document.getElementById('txtmodal-tc-project').value = currentProjectCode;
    document.getElementById('txtmodal-tc-portfolio').value = currentProjectCode;
    document.getElementById('txtmodal-tc-active').checked = true;
    editingTimecodeIndex = null;
    
    populateJobcodeDropdown();
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Edit TimeCode
 */
function editTimecode(index) {
    const timecode = filteredTimecodesData[index];
    if (!timecode) return;
    
    const actualIndex = timecodesData.findIndex(t => t.id === timecode.id);
    editingTimecodeIndex = actualIndex;
    
    const modal = document.getElementById('timecodeModal');
    const modalLabel = document.getElementById('timecodeModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Edit TimeCode';
    }
    
    populateJobcodeDropdown();
    
    document.getElementById('txtmodal-tc-workgrp').value = timecode.workGrp;
    document.getElementById('txtmodal-tc-active').checked = timecode.active;
    document.getElementById('txtmodal-tc-timecode').value = timecode.timeCode;
    document.getElementById('txtmodal-tc-project').value = timecode.project;
    document.getElementById('txtmodal-tc-jobcode').value = timecode.jobCode;
    document.getElementById('txtmodal-tc-testcode').value = timecode.testCode || '';
    document.getElementById('txtmodal-tc-portfolio').value = timecode.portfolio || '';
    
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Delete TimeCode
 */
function deleteTimecode(index) {
    if (!confirm('Are you sure you want to delete this timecode?')) {
        return;
    }
    
    const itemToDelete = filteredTimecodesData[index];
    const actualIndex = timecodesData.findIndex(t => t.id === itemToDelete.id);
    
    if (actualIndex !== -1) {
        timecodesData.splice(actualIndex, 1);
        
        const searchTerm = document.getElementById('timecodeSearch')?.value?.toLowerCase().trim() || '';
        if (!searchTerm) {
            filteredTimecodesData = [...timecodesData];
        } else {
            filteredTimecodesData = timecodesData.filter(tc =>
                tc.workGrp.toLowerCase().includes(searchTerm) ||
                tc.timeCode.toLowerCase().includes(searchTerm) ||
                tc.project.toLowerCase().includes(searchTerm) ||
                tc.jobCode.toLowerCase().includes(searchTerm) ||
                (tc.testCode && tc.testCode.toLowerCase().includes(searchTerm))
            );
        }
        
        renderTimecodesTable();
        alert('TimeCode deleted successfully!');
    }
}

/**
 * Save TimeCode (Add or Update)
 */
function saveTimecode() {
    const workGrp = document.getElementById('txtmodal-tc-workgrp').value;
    const active = document.getElementById('txtmodal-tc-active').checked;
    const timeCode = document.getElementById('txtmodal-tc-timecode').value.trim();
    const project = document.getElementById('txtmodal-tc-project').value.trim();
    const jobCode = document.getElementById('txtmodal-tc-jobcode').value;
    const testCode = document.getElementById('txtmodal-tc-testcode').value.trim();
    const portfolio = document.getElementById('txtmodal-tc-portfolio').value.trim();
    
    if (!workGrp || !timeCode || !project || !jobCode) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newEntry = {
        id: editingTimecodeIndex !== null ? timecodesData[editingTimecodeIndex].id :
            (timecodesData.length > 0 ? Math.max(...timecodesData.map(t => t.id)) + 1 : 1),
        workGrp: workGrp,
        active: active,
        timeCode: timeCode,
        project: project,
        jobCode: jobCode,
        testCode: testCode,
        portfolio: portfolio
    };
    
    if (editingTimecodeIndex !== null) {
        timecodesData[editingTimecodeIndex] = newEntry;
        alert('TimeCode updated successfully!');
    } else {
        timecodesData.push(newEntry);
        alert('TimeCode added successfully!');
    }
    
    const searchTerm = document.getElementById('timecodeSearch')?.value?.toLowerCase().trim() || '';
    if (!searchTerm) {
        filteredTimecodesData = [...timecodesData];
    } else {
        filteredTimecodesData = timecodesData.filter(tc =>
            tc.workGrp.toLowerCase().includes(searchTerm) ||
            tc.timeCode.toLowerCase().includes(searchTerm) ||
            tc.project.toLowerCase().includes(searchTerm) ||
            tc.jobCode.toLowerCase().includes(searchTerm) ||
            (tc.testCode && tc.testCode.toLowerCase().includes(searchTerm)) ||
            (tc.portfolio && tc.portfolio.toLowerCase().includes(searchTerm))
        );
    }
    
    closeTimecodeModal();
    renderTimecodesTable();
}

/**
 * Close TimeCode Modal
 */
function closeTimecodeModal() {
    const modal = document.getElementById('timecodeModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddTimecode').reset();
            editingTimecodeIndex = null;
        }, 300);
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidenav');
    sidebar.classList.toggle('collapsed');
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Make functions globally accessible for inline onclick handlers
window.openAddJobcodeModal = openAddJobcodeModal;
window.editJobcode = editJobcode;
window.deleteJobcode = deleteJobcode;
window.changeJobcodePage = changeJobcodePage;
window.openAddTimecodeModal = openAddTimecodeModal;
window.editTimecode = editTimecode;
window.deleteTimecode = deleteTimecode;
window.changeTimecodePage = changeTimecodePage;
