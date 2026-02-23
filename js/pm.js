// Program Maintenance JavaScript

// Sample data for the table
const tableData = [
    { code: 'AH0002', title: 'Ear Tagging Project To be journalled to cc 36216)', manager: 'Sedgmond, Sop', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAB000000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAEUTAH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB M', manager: 'Woolacott, Bell', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0035', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approve' }
];

let currentPage = 1;
let recordsPerPage = 10;
let filteredData = [...tableData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTable();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // Records per page change
    const recordsSelect = document.getElementById('recordsPerPage');
    recordsSelect.addEventListener('change', handleRecordsPerPageChange);

    // Pagination buttons
    document.getElementById('firstPage').addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(1);
    });

    document.getElementById('prevPage').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) goToPage(currentPage - 1);
    });

    document.getElementById('nextPage').addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });

    document.getElementById('lastPage').addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        goToPage(totalPages);
    });

    // Page number clicks
    document.querySelectorAll('.pagination .page-item:not(:first-child):not(:last-child):not(:nth-last-child(2)):not(:nth-child(2))').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNum = parseInt(e.target.textContent);
            if (!isNaN(pageNum)) {
                goToPage(pageNum);
            }
        });
    });
}

// Initialize table display
function initializeTable() {
    renderTable();
    updatePagination();
    updateRecordInfo();
}

// Handle search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredData = [...tableData];
    } else {
        filteredData = tableData.filter(row => 
            Object.values(row).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            )
        );
    }
    
    currentPage = 1;
    renderTable();
    updatePagination();
    updateRecordInfo();
}

// Handle records per page change
function handleRecordsPerPageChange(e) {
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
    updatePagination();
    updateRecordInfo();
}

// Render table with current page data
function renderTable() {
    const tbody = document.querySelector('#projectTable tbody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.code}</td>
            <td>${row.title}</td>
            <td>${row.manager}</td>
            <td>${row.budgcv}</td>
            <td>${row.budget}</td>
            <td>${row.project}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Update pagination display
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.querySelector('.pagination');
    
    // Update page numbers (simplified - showing current page and neighbors)
    const pageItems = pagination.querySelectorAll('.page-item');
    pageItems.forEach((item, index) => {
        if (index > 1 && index < pageItems.length - 2) {
            const pageNum = index - 1;
            if (pageNum === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
    
    // Enable/disable navigation buttons
    const firstBtn = document.getElementById('firstPage').parentElement;
    const prevBtn = document.getElementById('prevPage').parentElement;
    const nextBtn = document.getElementById('nextPage').parentElement;
    const lastBtn = document.getElementById('lastPage').parentElement;
    
    if (currentPage === 1) {
        firstBtn.classList.add('disabled');
        prevBtn.classList.add('disabled');
    } else {
        firstBtn.classList.remove('disabled');
        prevBtn.classList.remove('disabled');
    }
    
    if (currentPage === totalPages || totalPages === 0) {
        nextBtn.classList.add('disabled');
        lastBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
        lastBtn.classList.remove('disabled');
    }
}

// Update record information display
function updateRecordInfo() {
    const startRecord = filteredData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0;
    const endRecord = Math.min(currentPage * recordsPerPage, filteredData.length);
    
    document.getElementById('currentRecord').textContent = startRecord;
    document.getElementById('totalRecords').textContent = filteredData.length;
    document.getElementById('bottomCurrentRecord').textContent = startRecord;
    document.getElementById('bottomTotalRecords').textContent = filteredData.length;
}

// Navigate to specific page
function goToPage(pageNum) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        renderTable();
        updatePagination();
        updateRecordInfo();
    }
}

// Program selection change handler
document.getElementById('programSelect').addEventListener('change', function(e) {
    // Handle program selection change
    console.log('Program selected:', e.target.value);
});

// Project maintenance button handler
document.querySelector('.btn-secondary').addEventListener('click', function() {
    alert('Project Maintenance functionality would be implemented here.');
});