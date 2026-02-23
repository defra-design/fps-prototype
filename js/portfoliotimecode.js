// Sample data for Project JobCodes
const projectJobCodes = [
    { jobCode: 'EMI001', name: 'EMI Inspections', type: 'Work', workGrp: '' },
    { jobCode: 'EMI002', name: 'CSC and Admin - Egg Marketing', type: 'Work', workGrp: '' },
    { jobCode: 'EMI003', name: 'QA Egg Marketing', type: 'Work', workGrp: '' },
    { jobCode: 'EMI004', name: 'Pre Post Actions - EM', type: 'Work', workGrp: '' },
    { jobCode: 'EMI005', name: 'Business Support and Advice - EM', type: 'Work', workGrp: '' },
    { jobCode: 'EMI006', name: 'Training and Development', type: 'Work', workGrp: '' },
    { jobCode: 'EMI007', name: 'Research and Analysis', type: 'Work', workGrp: '' },
    { jobCode: 'EMI008', name: 'Customer Relations', type: 'Work', workGrp: '' },
    { jobCode: 'EMI009', name: 'Marketing Campaigns', type: 'Work', workGrp: '' },
    { jobCode: 'EMI010', name: 'Product Development', type: 'Work', workGrp: '' },
    { jobCode: 'EMI011', name: 'Quality Control', type: 'Work', workGrp: '' },
    { jobCode: 'EMI012', name: 'Supply Chain Management', type: 'Work', workGrp: '' },
    { jobCode: 'EMI013', name: 'Financial Planning', type: 'Work', workGrp: '' },
    { jobCode: 'EMI014', name: 'Risk Assessment', type: 'Work', workGrp: '' },
    { jobCode: 'EMI015', name: 'Compliance Monitoring', type: 'Work', workGrp: '' }
];

// Sample data for TimeCode Validity
const timeCodeData = [];
const workGroups = ['AS2', 'AS3', 'BAC1', 'BAC2', 'BAC3', 'BAC4', 'BDU', 'CER1', 'CER2', 'CER3','CSCS', 'CIT', 'Bees', 'MRSA', 'BSE'];
for (let i = 0; i < 50; i++) {
    timeCodeData.push({
        workGrp: workGroups[i % workGroups.length],
        active: true,
        timeCode: 'EMI002',
        project: 'APHAEM0000000',
        jobCode: 'EMI002',
        testCode: '',
        portfolio: ''
    });
}

class TimeCodeTableManager {
    constructor(tableId, paginationId, recordInfoId, searchInputId, recordsPerPageId, data) {
        this.tableId = tableId;
        this.paginationId = paginationId;
        this.recordInfoId = recordInfoId;
        this.searchInputId = searchInputId;
        this.recordsPerPageId = recordsPerPageId;
        this.data = data;
        this.filteredData = [...data];
        this.currentPage = 1;
        this.recordsPerPage = parseInt(document.getElementById(recordsPerPageId).value);
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById(this.searchInputId).addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // Records per page change
        document.getElementById(this.recordsPerPageId).addEventListener('change', (e) => {
            this.recordsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.render();
        });
    }

    search(query) {
        if (!query.trim()) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item => {
                return Object.values(item).some(value => 
                    value.toString().toLowerCase().includes(query.toLowerCase())
                );
            });
        }
        this.currentPage = 1;
        this.render();
    }

    render() {
        this.renderTable();
        this.renderPagination();
        this.updateRecordInfo();
    }

    renderTable() {
        const tbody = document.getElementById(this.tableId);
        const startIndex = (this.currentPage - 1) * this.recordsPerPage;
        const endIndex = startIndex + this.recordsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        tbody.innerHTML = '';

        pageData.forEach((item, index) => {
            const row = document.createElement('tr');
            if (this.tableId === 'tableBody1') {
                row.innerHTML = `
                    <td>${item.jobCode}</td>
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.workGrp}</td>
                `;
                if (index === 2) row.classList.add('selected'); // Highlight third row
            } else {
                row.innerHTML = `
                    <td>${item.workGrp}</td>
                    <td class="checkbox-cell"><input type="checkbox" checked></td>
                    <td>${item.timeCode}</td>
                    <td>${item.project}</td>
                    <td>${item.jobCode}</td>
                    <td>${item.testCode}</td>
                    <td>${item.portfolio}</td>
                `;
            }
            tbody.appendChild(row);
        });
    }

    renderPagination() {
        const pagination = document.getElementById(this.paginationId);
        const totalPages = Math.ceil(this.filteredData.length / this.recordsPerPage);
        
        pagination.innerHTML = '';

        // First button
        const firstLi = document.createElement('li');
        firstLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
        firstLi.innerHTML = '<a class="page-link" href="#">First</a>';
        firstLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage !== 1) {
                this.currentPage = 1;
                this.render();
            }
        });
        pagination.appendChild(firstLi);

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = '<a class="page-link" href="#">Previous</a>';
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });
        pagination.appendChild(prevLi);

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.render();
            });
            pagination.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = '<a class="page-link" href="#">Next</a>';
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
            }
        });
        pagination.appendChild(nextLi);

        // Last button
        const lastLi = document.createElement('li');
        lastLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
        lastLi.innerHTML = '<a class="page-link" href="#">Last</a>';
        lastLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage !== totalPages) {
                this.currentPage = totalPages;
                this.render();
            }
        });
        pagination.appendChild(lastLi);
    }

    updateRecordInfo() {
        const recordInfo = document.getElementById(this.recordInfoId);
        const startRecord = (this.currentPage - 1) * this.recordsPerPage + 1;
        const endRecord = Math.min(this.currentPage * this.recordsPerPage, this.filteredData.length);
        const totalRecords = this.filteredData.length;
        
        recordInfo.textContent = `Record: ${startRecord} - ${endRecord} of ${totalRecords}`;
    }
}

// Initialize tables when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Project JobCodes table
    // new TimeCodeTableManager(
    //     'workGroupsTableBody',
    //     'pagination1', 
    //     'recordInfo1',
    //     'searchInput1',
    //     'recordsPerPage1',
    //     projectJobCodes
    // );

    // Initialize TimeCode Validity table
    // new TimeCodeTableManager(
    //     'tableBody2',
    //     'pagination2',
    //     'recordInfo2', 
    //     'searchInput2',
    //     'recordsPerPage2',
    //     timeCodeData
    // );
});