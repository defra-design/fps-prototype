// Sample data
const allData = [
    { WorkGroup: 'LTBU', id: '1', PACTStaff: '', TimeCode: 'ZT0015', ParentProject: 'ZTwork', Period: '11', Hours: '45'},
    { WorkGroup: 'LTBU', id: '2', PACTStaff: '', TimeCode: 'ZT0065', ParentProject: 'ZTwork', Period: '11', Hours: '76'},
    { WorkGroup: 'LTBU', id: '3', PACTStaff: '', TimeCode: 'ZT0045', ParentProject: 'ZTwork', Period: '11', Hours: '23'},
    { WorkGroup: 'LTBU', id: '4', PACTStaff: '', TimeCode: 'ZT0035', ParentProject: 'ZTwork', Period: '11', Hours: '17'},
    { WorkGroup: 'LTBU', id: '5', PACTStaff: '', TimeCode: 'ZT0025', ParentProject: 'ZTwork', Period: '11', Hours: '7'},

    // { wg: 'LTBU', id: '10626', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '10', pag: '' },
    // { wg: 'LTBU', id: '26540', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '3.5', pag: '' },
    // { wg: 'LTBU', id: '98195', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '10.5', pag: '' },
    // { wg: 'LTBU', id: '10626', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '15', pag: '' },
    // { wg: 'LTBU', id: '26540', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '8.5', pag: '' },
    // { wg: 'LTBU', id: '98195', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '12', pag: '' },
    // { wg: 'LTBU', id: '10626', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '7.5', pag: '' },
    // { wg: 'LTBU', id: '26540', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '9', pag: '' },
    // { wg: 'LTBU', id: '98195', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '11.5', pag: '' },
    // { wg: 'LTBU', id: '10626', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '6', pag: '' },
    // { wg: 'LTBU', id: '26540', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '13', pag: '' },
    // { wg: 'LTBU', id: '98195', name: '', timeCode: 'ZT0015', parent: 'ZTwork', per: '11', hou: '8', pag: '' },
    // { wg: 'abc', id: 'XY7', name: '', timeCode: 'rt', parent: '', per: '', hou: '', pag: '' }
];


 

let filteredData = [...allData];
let currentPage = 1;
let recordsPerPage = 10;
let copiedRows = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
  //  setupEventListeners();
   // updatePagination();
});

function setupEventListeners() {
    // Pagination
    document.getElementById('pagination').addEventListener('click', handlePagination);
    
    // Records per page
    document.getElementById('recordsPerPage').addEventListener('change', function() {
        recordsPerPage = parseInt(this.value);
        currentPage = 1;
        renderTable();
        updatePagination();
    });
    
    // Filters
    document.getElementById('workGroupFilter').addEventListener('change', applyFilters);
    document.getElementById('staffFilter').addEventListener('change', applyFilters);
    document.getElementById('timeCodeFilter').addEventListener('change', applyFilters);
    document.getElementById('parentProjectFilter').addEventListener('change', applyFilters);
    document.getElementById('periodFilter').addEventListener('change', applyFilters);
    
    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#dataTable input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = this.checked);
        updateSelectedRows();
    });
    
    // Action buttons
    document.getElementById('importBtn').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('copySelectedBtn').addEventListener('click', copySelectedRows);
    document.getElementById('pasteBtn').addEventListener('click', pasteRows);
    document.getElementById('makeLiveBtn').addEventListener('click', makeLive);
    
    // File input
    document.getElementById('fileInput').addEventListener('change', handleFileImport);
}

function renderTable() {
    const tbody = document.getElementById('dataTable');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" data-index="${startIndex + index}"></td>
            <td>${row.id}</td>
            <td>${row.WorkGroup}</td>
            <td>${row.PACTStaff}</td>
            <td>${row.TimeCode}</td>
            <td>${row.ParentProject}</td>
            <td>${row.Period}</td>
            <td>${row.Hours}</td> 
        `;
        tbody.appendChild(tr);
    });
    
    // Add event listeners to checkboxes
    tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', updateSelectedRows);
    });
    
  //  updateRecordInfo();
   // updateTotalHours();
}

  //{ WorkGroup: 'LTBU', id: '34626', PACTStaff: '', TimeCode: 'ZT0015', ParentProject: 'ZTwork', Period: '11', Hours: '45'},

function updateSelectedRows() {
    const checkboxes = document.querySelectorAll('#dataTable input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const row = cb.closest('tr');
        if (cb.checked) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    });
}

function handlePagination(e) {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    
    switch(page) {
        case 'first':
            currentPage = 1;
            break;
        case 'prev':
            if (currentPage > 1) currentPage--;
            break;
        case 'next':
            if (currentPage < totalPages) currentPage++;
            break;
        case 'last':
            currentPage = totalPages;
            break;
        default:
            currentPage = parseInt(page);
    }
    
    renderTable();
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    // First and Previous
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="first">First</a>
        </li>
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="prev">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    // Next and Last
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="next">Next</a>
        </li>
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="last">Last</a>
        </li>
    `;
}

function applyFilters() {
    const workGroup = document.getElementById('workGroupFilter').value;
    const staff = document.getElementById('staffFilter').value;
    const timeCode = document.getElementById('timeCodeFilter').value;
    const parentProject = document.getElementById('parentProjectFilter').value;
    const period = document.getElementById('periodFilter').value;
    
    filteredData = allData.filter(row => {
        return (workGroup === 'All' || row.wg === workGroup) &&
               (staff === 'All' || row.id === staff) &&
               (timeCode === 'All' || row.timeCode === timeCode) &&
               (parentProject === 'All' || row.parent === parentProject) &&
               (period === 'All' || row.per === period);
    });
    
    currentPage = 1;
    renderTable();
    updatePagination();
}

function updateRecordInfo() {
    const startIndex = (currentPage - 1) * recordsPerPage + 1;
    const endIndex = Math.min(currentPage * recordsPerPage, filteredData.length);
    document.getElementById('recordInfo').textContent = `Record: ${startIndex} - ${endIndex} of ${filteredData.length}`;
}

function updateTotalHours() {
    const total = filteredData.reduce((sum, row) => {
        const hours = parseFloat(row.hou) || 0;
        return sum + hours;
    }, 0);
    document.getElementById('totalHours').textContent = `Total Hours: ${total.toFixed(1)}`;
}

function copySelectedRows() {
    const checkboxes = document.querySelectorAll('#dataTable input[type="checkbox"]:checked');
    copiedRows = [];
    
    checkboxes.forEach(cb => {
        const index = parseInt(cb.getAttribute('data-index'));
        copiedRows.push({...filteredData[index]});
    });
    
    if (copiedRows.length > 0) {
        alert(`${copiedRows.length} rows copied to clipboard`);
    }
}

function pasteRows() {
    if (copiedRows.length === 0) {
        alert('No rows to paste');
        return;
    }
    
    copiedRows.forEach(row => {
        allData.push({...row});
    });
    
    applyFilters();
    alert(`${copiedRows.length} rows pasted`);
}

function makeLive() {
    const checkboxes = document.querySelectorAll('#dataTable input[type="checkbox"]:checked');
    const liveTableBody = document.getElementById('liveTableBody');
    
    checkboxes.forEach(cb => {
        const index = parseInt(cb.getAttribute('data-index'));
        const row = filteredData[index];
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.wg}</td>
            <td>${row.id}</td>
            <td>${row.timeCode}</td>
            <td>${row.parent}</td>
            <td>${row.per}</td>
            <td>${row.hou}</td>
        `;
        liveTableBody.appendChild(tr);
        
        // Remove from main data
        const originalIndex = allData.findIndex(item => 
            item.wg === row.wg && item.id === row.id && item.timeCode === row.timeCode && item.hou === row.hou
        );
        if (originalIndex > -1) {
            allData.splice(originalIndex, 1);
        }
    });
    
    applyFilters();
}

function handleFileImport(e) {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        if (fileExtension === 'xls' || fileExtension === 'xlsx' || fileExtension === 'csv') {
            alert(`File ${fileName} selected for import`);
            // Here you would typically process the file
        } else {
            alert('Please select a valid .xls, .xlsx, or .csv file');
        }
    }
    
    // Reset file input
    e.target.value = '';
}