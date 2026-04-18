// Portfolio Management - JavaScript Handler
// This script manages portfolio tests CRUD operations and workgroups display

// Global data arrays
let portfolioTestsData = [];
let workgroupsData = [];
let filteredTestsData = [];
let filteredWorkgroupsData = [];
let selectedTest = null; // Track currently selected test
let selectedPortfolio = null; // Track currently selected portfolio

// Sorting state for tables
let testsTableSortConfig = { column: null, order: 'asc' };
let workgroupsTableSortConfig = { column: null, order: 'asc' };

// Portfolio dropdown data
let portfoliosData = [
    { code: 'APHAEM00000', title: 'Egg Marketing',comments:'PROJECT IS TO RECORD TIME SPENT ON TRANSFER OF SERVER SPACCE / STORAGE FROM SAMPSON HSE TO CROWN EST' },
    {code:'APHAINAH0099',title:'Approved Importer Scheme Technical',comments:'sample content'},
    {code:'APHAASHORN24', title:'Asian Hornet Spring Monitoring / Surveillance', comments:'Conducting monitoring for the invasive, non-native species Asian Hornet in high risk areas during Spring. 2024'},
    { code: 'APHAH0037', title: 'BRILLIANT INVESTMENT ASSISTANCE SCHEME',comments:'This project is to record time spent on the Brilliant Investment Assistance Scheme (BIAS) which is a new scheme launched by Defra in 2024 to support businesses in investing in low-carbon technologies and energy efficiency measures.' },
    { code: 'APHAH0038', title: 'Brucellosis Survey Review 2016', comments:'Comprehensive review of brucellosis surveillance and testing protocols in cattle and other livestock. Includes assessment of testing methods and recommendations for improved disease control measures.' },
    {code:'APHAASHORN25', title:'Asian Hornet Spring Monitoring', comments:'Conducting monitoring for the invasive, non-native species Asian Hornet in high risk areas during Spring. 2025-6'},
    { code: 'APHAH0040', title: 'NCP Control Database Dev\'t & Implementation',comments:'Development and implementation of National Control Programme database system for managing disease control activities, recording test results, and tracking livestock movement controls.' },
    { code: 'APHAH0047', title: 'Programme Management and Strategic',comments:'Strategic planning and programme management activities including resource allocation, stakeholder engagement, and coordination of cross-functional veterinary and laboratory services.' },
    { code: 'APHAH0048', title: 'Policy Demand',comments:'Response to emerging policy requirements from Defra and other government departments. Includes providing scientific advice, impact assessments, and technical support for policy development.' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches',comments:'Conducting risk assessments for animal and plant health threats. Development of alternative diagnostic and surveillance approaches to improve efficiency and effectiveness of disease control.' },
    { code: 'APHAH0050', title: 'Innovation & Operational Tasks',comments:'Research and implementation of innovative solutions for operational challenges in veterinary and laboratory services. Includes process improvements, new methodologies, and digital transformation initiatives.' },
    { code: 'APHAH0051', title: 'Field Inspection Service',comments:'Delivery of field inspection services for animal health compliance, disease surveillance, and import/export certification. Includes training and quality assurance for field inspectors.' },
    { code: 'APHAH0052', title: 'Lab Service Management(LIMS) Capability',comments:'Management and enhancement of Laboratory Information Management System capabilities. Includes system upgrades, user training, data integration, and reporting functionality improvements.' },
    { code: 'APHAH0053', title: 'Integrated Services Pilot',comments:'Pilot programme for integrating veterinary, laboratory, and field services to improve efficiency and customer service delivery. Testing new service delivery models and cross-functional collaboration.' },
    { code: 'APHAH0058', title: 'SHEP (Sampson House Exit Project)',comments:'Project to relocate operations and services from Sampson House facility. Includes planning, logistics, equipment transfer, and ensuring continuity of critical veterinary and laboratory services.' },
    { code: 'APHAH0061', title: 'Science Competency Enhancement',comments:'Programme to enhance scientific capabilities and competencies across APHA staff. Includes training, professional development, research collaboration, and maintenance of scientific excellence standards.' },
    { code: 'APHAH0074', title: 'Change implementation as a result of',comments:'Implementation of organizational changes following strategic reviews and restructuring decisions. Managing transition processes, communication, and ensuring minimal disruption to service delivery.' },
    { code: 'APHAH0100', title: 'Reimbursement of certification costs',comments:'Administration and processing of reimbursement claims for export health certification costs. Includes validation of claims, payment processing, and liaison with trading standards authorities.' },
    { code: 'APHAID0000', title: 'DDR Animal ID',comments:'Management of Defra Data Repository for animal identification and traceability. Maintains databases of livestock movements, holdings information, and animal passport systems.' },
    { code: 'APHAINA0000', title: 'Customer Contact',comments:'Customer service operations including helpdesk support, enquiry handling, complaints management, and stakeholder communications for veterinary and agricultural services.' },
    { code: 'APHAINA0001', title: 'Livestock Info Prog',comments:'Livestock information programme for collecting, managing, and analyzing data on livestock populations, movements, and disease surveillance to support animal health policy decisions.' },
    { code: 'APHAINA0002', title: 'Scanning Surveillance',comments:'Active and passive surveillance system for early detection of emerging animal and plant health threats. Includes horizon scanning, outbreak investigation, and rapid response capabilities.' },
    { code: 'APHAINA0003', title: 'HMI Transfer',comments:'Transfer of Horticultural Marketing Inspectorate functions and responsibilities. Includes staff transition, knowledge transfer, and integration of operational procedures.' },
    { code: 'APHAINA0004', title: 'Swine and Bee Health Review',comments:'Comprehensive review of swine health programmes and bee health monitoring systems. Assessment of current surveillance methods and recommendations for enhanced disease control strategies.' },
    { code: 'APHAINA0014', title: 'Disease Preparedness 2025-26',comments:'Strategic planning and resource allocation for disease preparedness activities in FY 2025-26. Includes contingency planning, simulation exercises, and maintenance of emergency response capabilities.' }
];

// Workgroup items data (from workgroup_management.html)
let workgroupItemsData = [
    { item: 'APH SCAH', itemdescription: 'APH SCAH' },
    { item: 'AS2', itemdescription: 'AS2' },
    { item: 'AS3', itemdescription: 'AS3' },
    { item: 'ASU', itemdescription: 'ASU' },
    { item: 'BAC1', itemdescription: 'BAC1' },
    { item: 'BAC2', itemdescription: 'BAC2' },
    { item: 'BAC3', itemdescription: 'BAC3' },
    { item: 'BAC4', itemdescription: 'BAC4' },
    { item: 'BAC5', itemdescription: 'BAC5' },
    { item: 'Bact', itemdescription: 'Bact' },
    { item: 'BDU', itemdescription: 'BDU' },
    { item: 'Bees', itemdescription: 'Bees England' },
    { item: 'Bees Advice', itemdescription: 'Bees England' },
    { item: 'Bees England', itemdescription: 'Bees England' },
    { item: 'Bees Wales', itemdescription: 'Bees Wales' },
    { item: 'BM1', itemdescription: 'BM1' },
    { item: 'BM4', itemdescription: 'BM4' },
    { item: 'BM5', itemdescription: 'BM5' },
    { item: 'BTB', itemdescription: 'BTB' },
    { item: 'Bus Supp', itemdescription: 'Bus Supp' },
    { item: 'CIT', itemdescription: 'CIT' },
    { item: 'CITB', itemdescription: 'CITB' },
    { item: 'CITD', itemdescription: 'CITD' },
    { item: 'Comm', itemdescription: 'Comm' },
    { item: 'CPD', itemdescription: 'CPD' },
    { item: 'CSC5', itemdescription: 'CSC5' },
    { item: 'CSCC', itemdescription: 'CSCC' },
    { item: 'CSCE', itemdescription: 'CSCE' },
    { item: 'CSCS', itemdescription: 'CSCS' },
    { item: 'CSCW', itemdescription: 'CSCW' },
    { item: 'CSG', itemdescription: 'CSG' },
    { item: 'CSG1', itemdescription: 'CSG1' },
    { item: 'CSU', itemdescription: 'CSU' },
    { item: 'CTB5', itemdescription: 'CTB5' },
    { item: 'DIGP', itemdescription: 'DIGP' },
    { item: 'DIU', itemdescription: 'DIU' },
    { item: 'DoES', itemdescription: 'DoES' },
    { item: 'DoES1', itemdescription: 'DoES1' },
    { item: 'DoES3', itemdescription: 'DoES3' },
    { item: 'DSG', itemdescription: 'DSG' },
    { item: 'EO Exit', itemdescription: 'EO Exit' },
    { item: 'Field', itemdescription: 'Operations' },
    { item: 'Field Activity', itemdescription: 'Field Activity' },
    { item: 'GM', itemdescription: 'GM' },
    { item: 'HMI', itemdescription: 'HMI' },
    { item: 'HNC', itemdescription: 'HNC' },
    { item: 'IMT', itemdescription: 'IMT' },
    { item: 'LabT', itemdescription: 'LabT' },
    { item: 'LT5', itemdescription: 'LT5' },
    { item: 'LTBU', itemdescription: 'LTBU' },
    { item: 'LTCA', itemdescription: 'LTCA' },
    { item: 'LTCM', itemdescription: 'LTCM' },
    { item: 'LTIM', itemdescription: 'LTIM' },
    { item: 'LTNC', itemdescription: 'LTNC' },
    { item: 'LTPE', itemdescription: 'LTPE' },
    { item: 'LTSB', itemdescription: 'LTSB' },
    { item: 'LTSH', itemdescription: 'LTSH' },
    { item: 'LTSK', itemdescription: 'LTSK' },
    { item: 'LTST', itemdescription: 'LTST' },
    { item: 'MRSA', itemdescription: 'MRSA' },
    { item: 'NATBORD', itemdescription: 'NATBORD' },
    { item: 'Operations', itemdescription: 'Operations' },
    { item: 'Path', itemdescription: 'Path' },
    { item: 'PATHL', itemdescription: 'PATHL' },
    { item: 'PATHW', itemdescription: 'PATHW' },
    { item: 'PDPM', itemdescription: 'PDPM' },
    { item: 'PHI Del', itemdescription: 'PHI Del' },
    { item: 'PHICAD', itemdescription: 'PHICAD' },
    { item: 'PHICE', itemdescription: 'PHICE' },
    { item: 'PHICEN', itemdescription: 'PHICEN' },
    { item: 'PHICERC', itemdescription: 'PHICERC' },
    { item: 'PHICERS', itemdescription: 'PHICERS' },
    { item: 'PHICHB', itemdescription: 'PHICHB' },
    { item: 'PHINSLT', itemdescription: 'PHINSLT' },
    { item: 'PHISHE', itemdescription: 'PHISHE' },
    { item: 'PHITB', itemdescription: 'PHITB' },
    { item: 'QASB', itemdescription: 'QASB' },
    { item: 'SLSD', itemdescription: 'SLSD' },
    { item: 'VIR1', itemdescription: 'Virology Unit 1' },
    { item: 'VIR2', itemdescription: 'Virology Unit 2' },
    { item: 'PAR1', itemdescription: 'Parasitology Unit 1' },
    { item: 'PAR2', itemdescription: 'Parasitology Unit 2' },
    { item: 'TOX1', itemdescription: 'Toxicology Unit 1' },
    { item: 'GEN1', itemdescription: 'Genetics Unit 1' },
    { item: 'IMM1', itemdescription: 'Immunology Unit 1' },
    { item: 'BIO1', itemdescription: 'Biosecurity Unit 1' },
    { item: 'BSE', itemdescription: 'BSE' }
];

// Pagination state for tests table
let currentTestsPage = 1;
let recordsPerPageTests = 10;

// Pagination state for workgroups table
let currentWorkgroupsPage = 1;
let recordsPerPageWorkgroups = 10;

// Editing state
let editingIndex = null;

/**
 * Load portfolio tests data from JSON
 */
async function loadPortfolioTestsData() {
    try {
        const response = await fetch('../js/pact_js/data/portfolio-tests-data.json');
        if (!response.ok) throw new Error('Failed to load portfolio tests data');
        const data = await response.json();
        portfolioTestsData = data.portfolioTests || [];
        workgroupsData = data.workgroupsData || [];
        return true;
    } catch (error) {
        console.error('Error loading portfolio tests data:', error);
        // Fallback to empty arrays
        portfolioTestsData = [];
        workgroupsData = [];
        return false;
    }
}

/**
 * Initialize the page
 */
async function initializePage() {
    await loadPortfolioTestsData();
    
    // Set default portfolio (first one - Egg Marketing)
    selectedPortfolio = 'APHAEM00000';
    
    // Initialize filtered data for default portfolio
    filteredTestsData = portfolioTestsData.filter(test => test.portfolio === selectedPortfolio);
    filteredWorkgroupsData = [...workgroupsData];
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup table sorting
    setupTableSorting();
    
    // Setup portfolio dropdown listener
    setupPortfolioDropdown();
    
    // Populate test code dropdown
    populateTestCodeDropdown();
    
    // Render initial tables
    renderTestsTable();
    renderWorkgroupsTable();
    
    // Auto-select first row if data exists for the default portfolio
    if (filteredTestsData.length > 0) {
        selectTestRow(filteredTestsData[0]);
    }
    
    // Update navigation links with initial values
    updateNavigationLinks();
}

/**
 * Setup portfolio dropdown change event
 */
function setupPortfolioDropdown() {
    // Initialize all dropdowns with data-empdropdown attribute
    document.querySelectorAll('[data-empdropdown]').forEach(dd => {
        const source = dd.dataset.source;
        if (source === 'portfolios') {
            initPortfolioDropdown(dd, portfoliosData);
        }
    });
}

/**
 * Initialize portfolio dropdown with search functionality
 */
function initPortfolioDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.tbl-dropdown-panel');
    const search = dropdown.querySelector('.select-search-box');
    const clearBtn = dropdown.querySelector('.clear-search-btn');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        dataset
            .filter(d =>
                d.code.toLowerCase().includes(filter) || 
                d.title.toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.code}</td><td>${d.title}</td>`;
                tr.onclick = () => {
                    input.value = `${d.code} | ${d.title}`;
                    panel.style.display = 'none';
                    
                    // Set selected portfolio
                    selectedPortfolio = d.code;
                    
                    // Populate the parent project and title fields
                    document.getElementById('txt-parentproject').value = d.code;
                    document.getElementById('txt-projecttitle').value = d.title;
                    document.getElementById('txt-comments').value = d.comments || '';
                    
                    // Clear other form fields BEFORE filtering
                    clearFormFields();
                    
                    // Filter tests by selected portfolio (this will auto-select first test)
                    filterTestsByPortfolio(d.code);
                    
                    // Update navigation links with project data
                    updateNavigationLinks();
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
 * Update navigation links with encoded project data
 */
function updateNavigationLinks() {
    const parentProject = document.getElementById('txt-parentproject').value;
    const projectTitle = document.getElementById('txt-projecttitle').value;
    
    if (parentProject && projectTitle) {
        // Create data object matching the expected format
        const projectData = {
            jobcode: parentProject,
            name: projectTitle
        };
        
        // Encode the data as base64
        const jsonString = JSON.stringify(projectData);
        const encoded = btoa(jsonString);
        const urlParam = encodeURIComponent(encoded);
        
        // Update navigation links
        const invoiceLink = document.getElementById('invoiecsubcontract');
        const milestoneLink = document.getElementById('milestones');
        const testPurchaseLink = document.getElementById('testpurchasereq');
        
        if (invoiceLink) {
            invoiceLink.href = `project_invoices_subcontracts.html?data=${urlParam}`;
        }
        if (milestoneLink) {
            milestoneLink.href = `project_mgmt_milestone.html?data=${urlParam}`;
        }
        if (testPurchaseLink) {
            testPurchaseLink.href = `project_mgmt_test_purchase_req.html?data=${urlParam}`;
        }
    }
}

/**
 * Clear form fields except parent project, title, and comments
 */
function clearFormFields() {
    document.getElementById('chkfinished').checked = false;
    document.getElementById('dpprogramme').value = '';
    document.getElementById('dpmanager').value = '';
    document.getElementById('txt-budgetcvt').value = '';
    document.getElementById('txt-transferincome').value = '';
    document.getElementById('txtportfoliotest').value = '';
    // Don't clear comments - they come from portfolio selection
    selectedTest = null;
    
    // Reset workgroups filter to show all
    filteredWorkgroupsData = [...workgroupsData];
    currentWorkgroupsPage = 1;
    renderWorkgroupsTable();
}

/**
 * Populate form with selected test data
 */
function populateFormWithTest(test) {
    if (!test) return;
    
    selectedTest = test;
    document.getElementById('txtportfoliotest').value = test.testCode;
    
    // You can add more field mappings here as needed
    // For example, if the test has additional properties
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Search input for tests
    // const searchInput = document.getElementById('searchInput');
    // if (searchInput) {
    //     searchInput.addEventListener('input', handleTestsSearch);
    // }
    
    // Add New Test button
    const addBtn = document.getElementById('addBtn');
    if (addBtn) {
        addBtn.addEventListener('click', openAddTestModal);
    }
    
    // Records per page dropdown for tests
    const recordsPerPageSelect = document.getElementById('recordsPerPage');
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', (e) => {
            recordsPerPageTests = parseInt(e.target.value);
            currentTestsPage = 1;
            renderTestsTable();
        });
    }
    
    // Search input for workgroups
    // const searchWorkGroups = document.getElementById('searchWorkGroups');
    // if (searchWorkGroups) {
    //     searchWorkGroups.addEventListener('input', handleWorkgroupsSearch);
    // }
    
    // Records per page dropdown for workgroups
    const recordsPerPageWorkgroupsSelect = document.getElementById('recordsPerPageWorkGroups');
    if (recordsPerPageWorkgroupsSelect) {
        recordsPerPageWorkgroupsSelect.addEventListener('change', (e) => {
            recordsPerPageWorkgroups = parseInt(e.target.value);
            currentWorkgroupsPage = 1;
            renderWorkgroupsTable();
        });
    }
    
    // Update navigation links when parent project or title changes
    const parentProjectInput = document.getElementById('txt-parentproject');
    const projectTitleInput = document.getElementById('txt-projecttitle');
    
    if (parentProjectInput) {
        parentProjectInput.addEventListener('input', updateNavigationLinks);
    }
    
    if (projectTitleInput) {
        projectTitleInput.addEventListener('input', updateNavigationLinks);
    }
    
    // Modal event listeners
    setupModalEventListeners();
}

/**
 * Populate test code dropdown with available test codes
 */
function populateTestCodeDropdown() {
    const testCodeSelect = document.getElementById('txtmodal-testcode');
    if (!testCodeSelect) return;
    
    // Clear existing options except the first one
    while (testCodeSelect.options.length > 1) {
        testCodeSelect.remove(1);
    }
    
    // Get test codes from currently filtered tests (filtered by portfolio)
    const testData = selectedPortfolio 
        ? portfolioTestsData.filter(t => t.portfolio === selectedPortfolio)
        : portfolioTestsData;
    
    const uniqueTestCodes = [...new Set(testData.map(t => t.testCode))].sort();
    
    uniqueTestCodes.forEach(testCode => {
        const option = document.createElement('option');
        option.value = testCode;
        option.textContent = testCode;
        testCodeSelect.appendChild(option);
    });
    
    // Add change listener to auto-fill description (only once)
    if (!testCodeSelect.hasAttribute('data-listener-added')) {
        testCodeSelect.addEventListener('change', handleTestCodeChange);
        testCodeSelect.setAttribute('data-listener-added', 'true');
    }
}

/**
 * Handle test code selection to auto-fill description
 */
function handleTestCodeChange(e) {
    const testCode = e.target.value;
    const descriptionInput = document.getElementById('txtmodal-description');
    
    if (testCode && descriptionInput) {
        const test = portfolioTestsData.find(t => t.testCode === testCode);
        if (test) {
            descriptionInput.value = test.itemDescription;
        } else {
            descriptionInput.value = '';
        }
    } else if (descriptionInput) {
        descriptionInput.value = '';
    }
}

/**
 * Populate workgroup dropdown with data from workgroupItemsData
 */
function populateWorkgroupDropdown(selectId = 'txtmodal-workgroup') {
    const workgroupSelect = document.getElementById(selectId);
    if (!workgroupSelect) return;
    
    // Clear existing options except the first one
    while (workgroupSelect.options.length > 1) {
        workgroupSelect.remove(1);
    }
    
    // Sort workgroup items alphabetically by item code
    const sortedWorkgroups = [...workgroupItemsData].sort((a, b) => 
        a.item.localeCompare(b.item)
    );
    
    // Add options to the dropdown
    sortedWorkgroups.forEach(workgroup => {
        const option = document.createElement('option');
        option.value = workgroup.item;
        option.textContent = workgroup.item;
        workgroupSelect.appendChild(option);
    });
}

/**
 * Setup modal event listeners
 */
function setupModalEventListeners() {
    // Test Modal
    const modal = document.getElementById('testModal');
    const closeBtn = document.getElementById('closeTestModalBtn');
    const cancelBtn = document.getElementById('cancelTestModalBtn');
    const saveBtn = document.getElementById('saveTestBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTestModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeTestModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveTest);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeTestModal();
            }
        });
    }
    
    // Workgroup Modal
    const workgroupModal = document.getElementById('workgroupModal');
    const closeWorkgroupBtn = document.getElementById('closeWorkgroupModalBtn');
    const cancelWorkgroupBtn = document.getElementById('cancelWorkgroupModalBtn');
    const saveWorkgroupBtn = document.getElementById('saveWorkgroupBtn');
    const addWorkgroupBtn = document.getElementById('addWorkgroupBtn');
    
    if (addWorkgroupBtn) {
        addWorkgroupBtn.addEventListener('click', openAddWorkgroupModal);
    }
    
    if (closeWorkgroupBtn) {
        closeWorkgroupBtn.addEventListener('click', closeWorkgroupModal);
    }
    
    if (cancelWorkgroupBtn) {
        cancelWorkgroupBtn.addEventListener('click', closeWorkgroupModal);
    }
    
    if (saveWorkgroupBtn) {
        saveWorkgroupBtn.addEventListener('click', saveWorkgroup);
    }
    
    // Close workgroup modal when clicking outside
    if (workgroupModal) {
        workgroupModal.addEventListener('click', (e) => {
            if (e.target === workgroupModal) {
                closeWorkgroupModal();
            }
        });
    }
}

/**
 * Handle search for tests
 */
function handleTestsSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Start with tests filtered by selected portfolio
    let baseData = selectedPortfolio 
        ? portfolioTestsData.filter(test => test.portfolio === selectedPortfolio)
        : portfolioTestsData;
    
    if (searchTerm === '') {
        filteredTestsData = baseData;
    } else {
        filteredTestsData = baseData.filter(test => 
            test.testCode.toLowerCase().includes(searchTerm) ||
            test.itemDescription.toLowerCase().includes(searchTerm) ||
            test.workGroup.toLowerCase().includes(searchTerm)
        );
    }
    
    currentTestsPage = 1;
    renderTestsTable();
}

/**
 * Handle search for workgroups
 */
function handleWorkgroupsSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Start with workgroups filtered by selected test (if any)
    let baseData = selectedTest 
        ? workgroupsData.filter(wg => wg.testCode === selectedTest.testCode)
        : workgroupsData;
    
    if (searchTerm === '') {
        filteredWorkgroupsData = baseData;
    } else {
        filteredWorkgroupsData = baseData.filter(wg => 
            wg.workGrp.toLowerCase().includes(searchTerm) ||
            wg.timeCode.toLowerCase().includes(searchTerm) ||
            wg.project.toLowerCase().includes(searchTerm) ||
            wg.testCode.toLowerCase().includes(searchTerm) ||
            wg.portfolio.toLowerCase().includes(searchTerm)
        );
    }
    
    currentWorkgroupsPage = 1;
    renderWorkgroupsTable();
}

/**
 * Render tests table with pagination
 */
function renderTestsTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    
    // Calculate pagination
    const totalRecords = filteredTestsData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPageTests);
    const startIndex = (currentTestsPage - 1) * recordsPerPageTests;
    const endIndex = startIndex + recordsPerPageTests;
    const pageData = filteredTestsData.slice(startIndex, endIndex);
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Populate table
    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="sup_text_center">No tests found</td></tr>';
    } else {
        pageData.forEach((test, index) => {
            const row = document.createElement('tr');
            row.className = 'govuk-table__row';
            
            // Add selected class if this is the selected test
            if (selectedTest && selectedTest.id === test.id) {
                row.classList.add('is-selected');
                row.style.backgroundColor = '#d8e5f4';
            }
            
            // Make row clickable
            row.style.cursor = 'pointer';
            
            // Calculate the actual index in filteredTestsData for pagination
            const actualIndex = startIndex + index;
            
            row.innerHTML = `
                <td class="govuk-table__cell">${test.testCode}</td>
                <td class="govuk-table__cell">${test.itemDescription}</td>
                <td class="govuk-table__cell">${test.workGroup}</td>
                <td class="govuk-table__cell sup_text_center" onclick="event.stopPropagation()">
                    <!--<button class="edit-btn" data-item='${JSON.stringify(test)}' onclick="editTest(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Edit test">
                        <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                    </button>-->
                    <button class="delete-btn" onclick="deleteTest(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Delete test">
                        <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                    </button>
                </td>
            `;
            
            // Add click event to select the test
            row.addEventListener('click', function() {
                selectTestRow(test);
            });
            
            tableBody.appendChild(row);
        });
    }
    
    // Render pagination
    renderTestsPagination(totalPages);
}

/**
 * Render pagination for tests table
 */
function renderTestsPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    if (currentTestsPage === 1) {
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
            changeTestsPage(currentTestsPage - 1);
        });
    }
    pagination.appendChild(prevItem);
    
    // Page numbers with smart range display
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentTestsPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentTestsPage) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                changeTestsPage(i);
            });
        }
        pagination.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    if (currentTestsPage === totalPages) {
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
            changeTestsPage(currentTestsPage + 1);
        });
    }
    pagination.appendChild(nextItem);
}

/**
 * Select a test row and populate form
 */
function selectTestRow(test) {
    selectedTest = test;
    populateFormWithTest(test);
    
    // Filter workgroups by the selected test code
    filterWorkgroupsByTestCode(test.testCode);
    
    renderTestsTable(); // Re-render to update selected state
}

/**
 * Filter workgroups based on selected test code
 */
function filterWorkgroupsByTestCode(testCode) {
    if (!testCode) {
        filteredWorkgroupsData = [...workgroupsData];
    } else {
        filteredWorkgroupsData = workgroupsData.filter(wg => wg.testCode === testCode);
    }
    
    // Reset to first page when filtering changes
    currentWorkgroupsPage = 1;
    renderWorkgroupsTable();
}

/**
 * Filter tests based on selected portfolio
 */
function filterTestsByPortfolio(portfolioCode) {
    if (!portfolioCode) {
        filteredTestsData = [...portfolioTestsData];
    } else {
        filteredTestsData = portfolioTestsData.filter(test => test.portfolio === portfolioCode);
    }
    
    // Reset to first page
    currentTestsPage = 1;
    
    // Clear selected test
    selectedTest = null;
    
    // Update test code dropdown for modal (show only tests from this portfolio)
    populateTestCodeDropdown();
    
    // Re-render tests table
    renderTestsTable();
    
    // Auto-select first test if available
    if (filteredTestsData.length > 0) {
        selectTestRow(filteredTestsData[0]);
    } else {
        // No tests for this portfolio, clear form and workgroups
        document.getElementById('txtportfoliotest').value = '';
        filteredWorkgroupsData = [];
        renderWorkgroupsTable();
    }
}

/**
 * Change tests page
 */
function changeTestsPage(page) {
    const totalPages = Math.ceil(filteredTestsData.length / recordsPerPageTests);
    if (page < 1 || page > totalPages) return;
    currentTestsPage = page;
    renderTestsTable();
}

/**
 * Render workgroups table with pagination
 */
function renderWorkgroupsTable() {
    const tableBody = document.getElementById('workGroupsTableBody');
    if (!tableBody) return;
    
    // Calculate pagination
    const totalRecords = filteredWorkgroupsData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPageWorkgroups);
    const startIndex = (currentWorkgroupsPage - 1) * recordsPerPageWorkgroups;
    const endIndex = startIndex + recordsPerPageWorkgroups;
    const pageData = filteredWorkgroupsData.slice(startIndex, endIndex);
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Populate table
    if (pageData.length === 0) {
        const message = selectedTest 
            ? `No workgroups found for test code: ${selectedTest.testCode}`
            : 'No workgroups found';
        tableBody.innerHTML = `<tr><td colspan="7" class="sup_text_center" style="padding: 20px; font-style: italic; color: #666;">${message}</td></tr>`;
    } else {
        pageData.forEach((wg, index) => {
            const row = document.createElement('tr');
            row.className = 'govuk-table__row';
            
            // Calculate the actual index in filteredWorkgroupsData for pagination
            const actualIndex = startIndex + index;
            
            // Create checkbox for active status matching timerecording.html pattern
            const activeCheckbox = `
                <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
                    <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input" 
                               type="checkbox" 
                               id="activeRow${wg.id}" 
                               ${wg.active ? 'checked' : ''} 
                               disabled />
                        <label class="govuk-label govuk-checkboxes__label" 
                               for="activeRow${wg.id}" 
                               style="padding: 0;"></label>
                    </div>
                </div>
            `;
            
            row.innerHTML = `
                <td class="govuk-table__cell">${wg.workGrp}</td>
                <td class="govuk-table__cell">${activeCheckbox}</td>
                <td class="govuk-table__cell">${wg.timeCode}</td>
                <td class="govuk-table__cell">${wg.project}</td>
                <td class="govuk-table__cell">${wg.testCode}</td>
                <td class="govuk-table__cell">${wg.portfolio}</td>
                <td class="govuk-table__cell sup_text_center" onclick="event.stopPropagation()">
                    <button class="edit-btn" onclick="editWorkgroup(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Edit workgroup">
                        <img src="../images/pen-to-square-regular-full.svg" width="20" alt="Edit" />
                    </button>
                    <button class="delete-btn" onclick="deleteWorkgroup(${actualIndex})" 
                        style="background: none; border: none; cursor: pointer;" aria-label="Delete workgroup">
                        <img src="../images/trash-can-regular-full.svg" width="20" alt="Delete" />
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Render pagination
    renderWorkgroupsPagination(totalPages);
}

/**
 * Render pagination for workgroups table
 */
function renderWorkgroupsPagination(totalPages) {
    const pagination = document.getElementById('workGroupsPagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    if (currentWorkgroupsPage === 1) {
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
            changeWorkgroupsPage(currentWorkgroupsPage - 1);
        });
    }
    pagination.appendChild(prevItem);
    
    // Page numbers with smart range display
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentWorkgroupsPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentWorkgroupsPage) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                changeWorkgroupsPage(i);
            });
        }
        pagination.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    if (currentWorkgroupsPage === totalPages) {
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
            changeWorkgroupsPage(currentWorkgroupsPage + 1);
        });
    }
    pagination.appendChild(nextItem);
}

/**
 * Change workgroups page
 */
function changeWorkgroupsPage(page) {
    const totalPages = Math.ceil(filteredWorkgroupsData.length / recordsPerPageWorkgroups);
    if (page < 1 || page > totalPages) return;
    currentWorkgroupsPage = page;
    renderWorkgroupsTable();
}

/**
 * Open Add Test Modal
 */
function openAddTestModal() {
    editingIndex = null;
    const modal = document.getElementById('testModal');
    const modalLabel = document.getElementById('testModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Add New Test';
    }
    
    // Populate workgroup dropdown
    populateWorkgroupDropdown('txtmodal-workgroup');
    
    // Clear form - reset to default selection
    document.getElementById('txtmodal-testcode').selectedIndex = 0;
    document.getElementById('txtmodal-description').value = '';
    document.getElementById('txtmodal-workgroup').selectedIndex = 0;
    
    // Show modal
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Edit Test
 */
function editTest(index) {
    const test = filteredTestsData[index];
    if (!test) return;
    
    // Find the actual index in the main data array
    editingIndex = portfolioTestsData.findIndex(t => t.id === test.id);
    
    const modal = document.getElementById('testModal');
    const modalLabel = document.getElementById('testModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Edit Test';
    }
    
    // Populate workgroup dropdown
    populateWorkgroupDropdown('txtmodal-workgroup');
    
    // Populate form
    document.getElementById('txtmodal-testcode').value = test.testCode;
    document.getElementById('txtmodal-description').value = test.itemDescription;
    document.getElementById('txtmodal-workgroup').value = test.workGroup;
    
    // Show modal
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Delete Test
 */
function deleteTest(index) {
    if (!confirm('Are you sure you want to delete this test?')) {
        return;
    }
    
    // Find the item from filtered data
    const itemToDelete = filteredTestsData[index];
    
    // Find actual index in main data array
    const actualIndex = portfolioTestsData.findIndex(t => 
        t.id === itemToDelete.id
    );
    
    if (actualIndex !== -1) {
        portfolioTestsData.splice(actualIndex, 1);
        
        // If the deleted test was selected, clear selection
        if (selectedTest && selectedTest.id === itemToDelete.id) {
            selectedTest = null;
            document.getElementById('txtportfoliotest').value = '';
            // Reset workgroups to show all
            filteredWorkgroupsData = [...workgroupsData];
            currentWorkgroupsPage = 1;
        }
        
        // Update filtered data (filter by portfolio and search term)
         const searchTerm = '';//document.getElementById('searchInput')?.value?.toLowerCase().trim() || '';
        let baseData = selectedPortfolio 
            ? portfolioTestsData.filter(test => test.portfolio === selectedPortfolio)
            : portfolioTestsData;
            
        if (!searchTerm) {
            filteredTestsData = baseData;
        } else {
            filteredTestsData = baseData.filter(test =>
                test.testCode.toLowerCase().includes(searchTerm) ||
                test.itemDescription.toLowerCase().includes(searchTerm) ||
                test.workGroup.toLowerCase().includes(searchTerm)
            );
        }
        
        // Re-render tables
        renderTestsTable();
        renderWorkgroupsTable();
        
        alert('Test deleted successfully!');
    }
}

/**
 * Save Test (Add or Update)
 */
function saveTest() {
    const testCode = document.getElementById('txtmodal-testcode').value;
    const description = document.getElementById('txtmodal-description').value.trim();
    const workGroup = document.getElementById('txtmodal-workgroup').value;
    
    // Validation
    if (!testCode || !description || !workGroup) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newEntry = {
        id: editingIndex !== null ? portfolioTestsData[editingIndex].id : 
            (portfolioTestsData.length > 0 ? Math.max(...portfolioTestsData.map(t => t.id)) + 1 : 1),
        testCode: testCode,
        itemDescription: description,
        workGroup: workGroup,
        portfolio: selectedPortfolio || 'APHAEM00000' // Assign to current portfolio
    };
    
    if (editingIndex !== null) {
        // Update existing test
        portfolioTestsData[editingIndex] = newEntry;
        
        // Update selected test if it was being edited
        if (selectedTest && selectedTest.id === newEntry.id) {
            selectedTest = newEntry;
            populateFormWithTest(newEntry);
            filterWorkgroupsByTestCode(newEntry.testCode);
        }
        
        alert('Test updated successfully!');
    } else {
        // Add new test
        portfolioTestsData.push(newEntry);
        
        // Auto-select the newly added test
        selectedTest = newEntry;
        populateFormWithTest(newEntry);
        filterWorkgroupsByTestCode(newEntry.testCode);
        
        alert('Test added successfully!');
    }
    
    // Update filtered data (filter by portfolio and search term)
    const searchTerm = '';// document.getElementById('searchInput')?.value?.toLowerCase().trim() || '';
    let baseData = selectedPortfolio 
        ? portfolioTestsData.filter(test => test.portfolio === selectedPortfolio)
        : portfolioTestsData;
        
    if (!searchTerm) {
        filteredTestsData = baseData;
    } else {
        filteredTestsData = baseData.filter(test =>
            test.testCode.toLowerCase().includes(searchTerm) ||
            test.itemDescription.toLowerCase().includes(searchTerm) ||
            test.workGroup.toLowerCase().includes(searchTerm)
        );
    }
    
    // Close modal and refresh table
    closeTestModal();
    renderTestsTable();
}

/**
 * Close Test Modal
 */
function closeTestModal() {
    const modal = document.getElementById('testModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddTest').reset();
            editingIndex = null;
        }, 300);
    }
}

/**
 * Workgroup CRUD Operations
 */

let editingWorkgroupIndex = null;

/**
 * Open Add Workgroup Modal
 */
function openAddWorkgroupModal() {
    if (!selectedTest) {
        alert('Please select a test first to add a workgroup.');
        return;
    }
    
    const modal = document.getElementById('workgroupModal');
    const modalLabel = document.getElementById('workgroupModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Add New Workgroup';
    }
    
    // Populate workgroup dropdown
    populateWorkgroupDropdown('txtmodal-workgrp');
    
    // Reset form
    document.getElementById('formAddWorkgroup').reset();
    editingWorkgroupIndex = null;
    
    // Pre-fill test code and portfolio from selected test
    if (selectedTest) {
        document.getElementById('txtmodal-wg-testcode').value = selectedTest.testCode;
        document.getElementById('txtmodal-wg-portfolio').value = selectedPortfolio || 'APHAEM00000';
        document.getElementById('txtmodal-wg-project').value = selectedPortfolio || 'APHAEM00000';
    }
    
    // Set active checkbox to checked by default
    document.getElementById('txtmodal-wg-active').checked = true;
    
    // Enable fields when adding new workgroup (except testcode and portfolio which are pre-filled)
    document.getElementById('txtmodal-workgrp').disabled = false;
    document.getElementById('txtmodal-wg-timecode').disabled = false;
    document.getElementById('txtmodal-wg-project').disabled = false;
    // Keep testcode and portfolio disabled as they are pre-filled from selected test
    document.getElementById('txtmodal-wg-testcode').disabled = true;
    document.getElementById('txtmodal-wg-portfolio').disabled = true;
    
    // Show modal
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Edit Workgroup
 */
function editWorkgroup(index) {
    const workgroup = filteredWorkgroupsData[index];
    if (!workgroup) return;
    
    // Find actual index in main data array
    const actualIndex = workgroupsData.findIndex(wg => 
        wg.id === workgroup.id
    );
    
    editingWorkgroupIndex = actualIndex;
    
    const modal = document.getElementById('workgroupModal');
    const modalLabel = document.getElementById('workgroupModalLabel');
    
    if (modalLabel) {
        modalLabel.textContent = 'Edit Workgroup';
    }
    
    // Populate workgroup dropdown
    populateWorkgroupDropdown('txtmodal-workgrp');
    
    // Populate form with workgroup data
    document.getElementById('txtmodal-workgrp').value = workgroup.workGrp;
    document.getElementById('txtmodal-wg-active').checked = workgroup.active;
    document.getElementById('txtmodal-wg-timecode').value = workgroup.timeCode;
    document.getElementById('txtmodal-wg-project').value = workgroup.project;
    document.getElementById('txtmodal-wg-testcode').value = workgroup.testCode;
    document.getElementById('txtmodal-wg-portfolio').value = workgroup.portfolio;
    
    // Disable fields when editing
    document.getElementById('txtmodal-workgrp').disabled = true;
    document.getElementById('txtmodal-wg-timecode').disabled = true;
    document.getElementById('txtmodal-wg-project').disabled = true;
    document.getElementById('txtmodal-wg-testcode').disabled = true;
    document.getElementById('txtmodal-wg-portfolio').disabled = true;
    
    // Show modal
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Delete Workgroup
 */
function deleteWorkgroup(index) {
    if (!confirm('Are you sure you want to delete this workgroup?')) {
        return;
    }
    
    // Find the item from filtered data
    const itemToDelete = filteredWorkgroupsData[index];
    
    // Find actual index in main data array
    const actualIndex = workgroupsData.findIndex(wg => 
        wg.id === itemToDelete.id
    );
    
    if (actualIndex !== -1) {
        workgroupsData.splice(actualIndex, 1);
        
        // Update filtered data
        const searchTerm = '';//document.getElementById('searchWorkGroups')?.value?.toLowerCase().trim() || '';
        let baseData = selectedTest 
            ? workgroupsData.filter(wg => wg.testCode === selectedTest.testCode)
            : workgroupsData;
        
        if (!searchTerm) {
            filteredWorkgroupsData = baseData;
        } else {
            filteredWorkgroupsData = baseData.filter(wg =>
                wg.workGrp.toLowerCase().includes(searchTerm) ||
                wg.timeCode.toLowerCase().includes(searchTerm) ||
                wg.project.toLowerCase().includes(searchTerm) ||
                wg.testCode.toLowerCase().includes(searchTerm) ||
                wg.portfolio.toLowerCase().includes(searchTerm)
            );
        }
        
        // Re-render workgroups table
        renderWorkgroupsTable();
        
        alert('Workgroup deleted successfully!');
    }
}

/**
 * Save Workgroup (Add or Update)
 */
function saveWorkgroup() {
    const workGrp = document.getElementById('txtmodal-workgrp').value;
    const active = document.getElementById('txtmodal-wg-active').checked;
    const timeCode = document.getElementById('txtmodal-wg-timecode').value.trim();
    const project = document.getElementById('txtmodal-wg-project').value.trim();
    const testCode = document.getElementById('txtmodal-wg-testcode').value.trim();
    const portfolio = document.getElementById('txtmodal-wg-portfolio').value.trim();
    
    // Validation
    if (!workGrp || !timeCode || !project || !testCode || !portfolio) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newEntry = {
        id: editingWorkgroupIndex !== null ? workgroupsData[editingWorkgroupIndex].id : 
            (workgroupsData.length > 0 ? Math.max(...workgroupsData.map(wg => wg.id)) + 1 : 1),
        workGrp: workGrp,
        active: active,
        timeCode: timeCode,
        project: project,
        testCode: testCode,
        portfolio: portfolio
    };
    
    if (editingWorkgroupIndex !== null) {
        // Update existing workgroup
        workgroupsData[editingWorkgroupIndex] = newEntry;
        alert('Workgroup updated successfully!');
    } else {
        // Add new workgroup
        workgroupsData.push(newEntry);
        alert('Workgroup added successfully!');
    }
    
    // Update filtered data
    const searchTerm = '';// document.getElementById('searchWorkGroups')?.value?.toLowerCase().trim() || '';
    let baseData = selectedTest 
        ? workgroupsData.filter(wg => wg.testCode === selectedTest.testCode)
        : workgroupsData;
    
    if (!searchTerm) {
        filteredWorkgroupsData = baseData;
    } else {
        filteredWorkgroupsData = baseData.filter(wg =>
            wg.workGrp.toLowerCase().includes(searchTerm) ||
            wg.timeCode.toLowerCase().includes(searchTerm) ||
            wg.project.toLowerCase().includes(searchTerm) ||
            wg.testCode.toLowerCase().includes(searchTerm) ||
            wg.portfolio.toLowerCase().includes(searchTerm)
        );
    }
    
    // Close modal and refresh table
    closeWorkgroupModal();
    renderWorkgroupsTable();
}

/**
 * Close Workgroup Modal
 */
function closeWorkgroupModal() {
    const modal = document.getElementById('workgroupModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('formAddWorkgroup').reset();
            editingWorkgroupIndex = null;
        }, 300);
    }
}


function toggleSidebar() {
    const sidebar = document.querySelector('.sidenav');
    sidebar.classList.toggle('collapsed');
}

document.getElementById('btnPortfoliomaintenance').addEventListener('click', function() {
    alert('data saved');
});

// Portfolio Time Codes button navigation
document.getElementById('btnPortfolioTimeCodes').addEventListener('click', function() {
    const parentProject = document.getElementById('txt-parentproject').value;
    const projectTitle = document.getElementById('txt-projecttitle').value;
    
    if (parentProject && projectTitle) {
        // Create data object
        const projectData = {
            jobcode: parentProject,
            name: projectTitle
        };
        
        // Encode the data as base64
        const jsonString = JSON.stringify(projectData);
        const encoded = btoa(jsonString);
        const urlParam = encodeURIComponent(encoded);
        
        // Navigate to portfolio time codes page
        window.location.href = `portfolio_time_codes.html?data=${urlParam}`;
    } else {
        alert('Please select a portfolio first');
    }
});

// Overhead Codes link navigation
// const overheadCodesLink = document.getElementById('overheadcodes');
// if (overheadCodesLink) {
//     overheadCodesLink.addEventListener('click', function(e) {
//         e.preventDefault();
//         const parentProject = document.getElementById('txt-parentproject').value;
//         const projectTitle = document.getElementById('txt-projecttitle').value;
        
//         if (parentProject && projectTitle) {
//             // Create data object
//             const projectData = {
//                 jobcode: parentProject,
//                 name: projectTitle
//             };
            
//             // Encode the data as base64
//             const jsonString = JSON.stringify(projectData);
//             const encoded = btoa(jsonString);
//             const urlParam = encodeURIComponent(encoded);
            
//             // Navigate to portfolio time codes page
//             window.location.href = `portfolio_time_codes.html?data=${urlParam}`;
//         } else {
//             alert('Please select a portfolio first');
//         }
//     });
// }

/**
 * Sort tests table by column
 */
function sortTestsTable(column, order) {
    filteredTestsData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (typeof valA === 'string' && typeof valB === 'string') {
            return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // Fallback for numbers
        return order === 'asc' ? valA - valB : valB - valA;
    });

    renderTestsTable();
}

/**
 * Sort workgroups table by column
 */
function sortWorkgroupsTable(column, order) {
    filteredWorkgroupsData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Handle boolean (active) values
        if (column === 'active') {
            return order === 'asc' ? (valA === valB ? 0 : valA ? -1 : 1) : (valA === valB ? 0 : valA ? 1 : -1);
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
            return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // Fallback for numbers
        return order === 'asc' ? valA - valB : valB - valA;
    });

    renderWorkgroupsTable();
}

/**
 * Setup sorting for both tables
 */
function setupTableSorting() {
    // Setup sorting for tests table
    const testsHeaders = document.querySelectorAll('#testsTable th[data-column]');
    testsHeaders.forEach((header) => {
        header.addEventListener('click', function() {
            const column = this.dataset.column;
            if (!column) return;

            // Toggle sort order
            const currentOrder = testsTableSortConfig.column === column ? testsTableSortConfig.order : 'asc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            // Remove sorting icons from all test headers
            testsHeaders.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) {
                    existingIcon.remove();
                }
            });

            // Update config
            testsTableSortConfig = { column, order: newOrder };
            this.dataset.order = newOrder;

            // Add sorting icon
            const sortIcon = document.createElement('span');
            sortIcon.className = 'sort-icon';
            if (newOrder === 'asc') {
                sortIcon.innerHTML = ' ▲';
                this.classList.add('sorted-asc');
            } else {
                sortIcon.innerHTML = ' ▼';
                this.classList.add('sorted-desc');
            }
            this.appendChild(sortIcon);

            sortTestsTable(column, newOrder);
        });
    });

    // Setup sorting for workgroups table
    const workgroupsHeaders = document.querySelectorAll('#workGroupsTable th[data-column]');
    workgroupsHeaders.forEach((header) => {
        header.addEventListener('click', function() {
            const column = this.dataset.column;
            if (!column) return;

            // Toggle sort order
            const currentOrder = workgroupsTableSortConfig.column === column ? workgroupsTableSortConfig.order : 'asc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            // Remove sorting icons from all workgroup headers
            workgroupsHeaders.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) {
                    existingIcon.remove();
                }
            });

            // Update config
            workgroupsTableSortConfig = { column, order: newOrder };
            this.dataset.order = newOrder;

            // Add sorting icon
            const sortIcon = document.createElement('span');
            sortIcon.className = 'sort-icon';
            if (newOrder === 'asc') {
                sortIcon.innerHTML = ' ▲';
                this.classList.add('sorted-asc');
            } else {
                sortIcon.innerHTML = ' ▼';
                this.classList.add('sorted-desc');
            }
            this.appendChild(sortIcon);

            sortWorkgroupsTable(column, newOrder);
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Make functions globally accessible for inline onclick handlers
window.openAddTestModal = openAddTestModal;
window.editTest = editTest;
window.deleteTest = deleteTest;
window.selectTestRow = selectTestRow;
window.changeTestsPage = changeTestsPage;
window.changeWorkgroupsPage = changeWorkgroupsPage;
window.openAddWorkgroupModal = openAddWorkgroupModal;
window.editWorkgroup = editWorkgroup;
window.deleteWorkgroup = deleteWorkgroup;

/**
 * Setup column resizing functionality
 */
const resizers = document.querySelectorAll(".resizer");

resizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation();  // prevent sort click

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
