// Sample data for the table
const sampleData = [
    { code: 'AH0002', title: 'Ear Tagging Project To be journalled to cc 36216)', manager: 'Sedgmond, Sophie', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
     { code: 'APHABZ00000', title: 'Animal Health', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0048', title: 'Policy Demand', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0049', title: 'Risk Assessment & Alternative Approaches', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0050', title: 'Innovation & Operational Trials', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0051', title: 'Field Inspection Service', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
        { code: 'APHABC000000', title: 'Border Controls Service Level Agreement', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEM000000', title: 'Egg Marketing', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAEUT AH090', title: 'GB NI MOVEMENT ASSISTANCE SCHEME - DEFRA GB Movement', manager: 'Woolacott, Belinda', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0036', title: 'Brucellosis Survey Review 2016', manager: 'Hedau, Clement', budgcv: '£0', budget: '£0', project: 'Approved' },
    { code: 'APHAH0047', title: 'Programme Management and Strategy - Field Activity', manager: '', budgcv: '£0', budget: '£0', project: 'Approved' }
];

let currentData = [...sampleData];
let currentPage = 1;
let recordsPerPage = 10;
let totalRecords = sampleData.length;
//let filteredData = [...tableData];
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTable();
    setupEventListeners();
});

function initializeTable() {
    renderTable();
    updatePagination();
    updateRecordInfo();
}

function FIsetupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
  //  document.getElementById('searchBtn').addEventListener('click', handleSearch);
    
    // Records per page change
    document.getElementById('recordsPerPage').addEventListener('change', function() {
        recordsPerPage = parseInt(this.value);
        currentPage = 1;
        renderTable();
        updatePagination();
        updateRecordInfo();
    });
    
    // Program select change
    document.getElementById('programSelect').addEventListener('change', function() {
        // Handle program selection change
        console.log('Program selected:', this.value);
        document.getElementById('txtprogramno').value = selectedValue?.split("-")[0];
        document.getElementById('txtprogramname').value = selectedValue?.split("-")[1];
    });
}


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
        const totalPages = Math.ceil(currentData.length / recordsPerPage);
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });

    document.getElementById('lastPage').addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(currentData.length / recordsPerPage);
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

     document.getElementById('programSelect').addEventListener('change', function() {
        // Handle program selection change
        const selectedValue = this.value;
        console.log('Program selected:', this.value);
        document.getElementById('txtprogramno').value = selectedValue?.split("-")[0];
        document.getElementById('txtprogramname').value = selectedValue?.split("-")[1];
    });
}


 

// Handle records per page change
function handleRecordsPerPageChange(e) {
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
    updatePagination();
    updateRecordInfo();
}

// Navigate to specific page
function goToPage(pageNum) {
    const totalPages = Math.ceil(currentData.length / recordsPerPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        renderTable();
        updatePagination();
        updateRecordInfo();
    }
}


function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        currentData = [...sampleData];
    } else {
        currentData = sampleData.filter(item => 
            item.code.toLowerCase().includes(searchTerm) ||
            item.title.toLowerCase().includes(searchTerm) ||
            item.manager.toLowerCase().includes(searchTerm)
        );
    }
    
    totalRecords = currentData.length;
    currentPage = 1;
    renderTable();
    updatePagination();
    updateRecordInfo();
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = currentData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.title}</td>
            <td>${item.manager}</td>
            <td>${item.budgcv}</td>
            <td>${item.budget}</td>
            <td>${item.project}</td>
        `;
        tbody.appendChild(row);
    });
}

// function EXupdatePagination() {
//     const totalPages = Math.ceil(totalRecords / recordsPerPage);
//     const pagination = document.getElementById('pagination');
    
//     pagination.innerHTML = '';
    
//     // Previous button
//     const prevLi = document.createElement('li');
//     prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
//     prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a>`;
//     pagination.appendChild(prevLi);
    
//     // Page numbers
//     const startPage = Math.max(1, currentPage - 2);
//     const endPage = Math.min(totalPages, currentPage + 2);
    
//     for (let i = startPage; i <= endPage; i++) {
//         const li = document.createElement('li');
//         li.className = `page-item ${i === currentPage ? 'active' : ''}`;
//         li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
//         pagination.appendChild(li);
//     }
    
//     // Next button
//     const nextLi = document.createElement('li');
//     nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
//     nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a>`;
//     pagination.appendChild(nextLi);
// }

// Update pagination display
function updatePagination() {
    const totalPages = Math.ceil(currentData.length / recordsPerPage);
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

function changePage(page) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        updatePagination();
        updateRecordInfo();
    }
}

function EXupdateRecordInfo() {
    const startRecord = (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);
    
    document.getElementById('recordInfo').textContent = 
        `Record: ${startRecord} - ${endRecord} of ${totalRecords}`;
}

function updateRecordInfo() {
    const startRecord = currentData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0;
    const endRecord = Math.min(currentPage * recordsPerPage, currentData.length);
    
    document.getElementById('currentRecord').textContent = startRecord;
    document.getElementById('totalRecords').textContent = currentData.length;
  //  document.getElementById('bottomCurrentRecord').textContent = startRecord;
  //  document.getElementById('bottomTotalRecords').textContent = currentData.length;
}

// Prevent default link behavior for pagination
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('page-link')) {
        e.preventDefault();
    }
});