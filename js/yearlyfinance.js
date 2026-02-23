const actualdata = [
    { jobCode: 'WMWL130', name: 'Parrott, David', wg: 'Wildlife', gr: 'C', mont: '6', time: '41', rate: '&pound;82.44', cost: '&pound;3,380.04' },
    { jobCode: 'WMWL130', name: 'Jones, Job', wg: 'Wildlife', gr: 'C', mont: '7', time: '85', rate: '&pound;82.44', cost: '&pound;7,007.40' },
    { jobCode: 'WMWL130', name: 'Lane, Julie', wg: 'Wildlife', gr: 'A', mont: '7', time: '115', rate: '&pound;135.12', cost: '&pound;15,538.80' },
    { jobCode: 'WMWL130', name: 'Jones, Rebecca', wg: 'Wildlife', gr: 'E', mont: '8', time: '111', rate: '&pound;54.84', cost: '&pound;6,087.24' },
    { jobCode: 'WMWL130', name: 'Parrott, David', wg: 'Wildlife', gr: 'C', mont: '8', time: '162.5', rate: '&pound;82.44', cost: '&pound;13,396.50' },
    { jobCode: 'WMWL130', name: 'Coats, Julia', wg: 'Wildlife', gr: 'E', mont: '9', time: '10', rate: '&pound;54.84', cost: '&pound;548.40' },
    { jobCode: 'WMWL130', name: 'Parrott, David', wg: 'Wildlife', gr: 'C', mont: '9', time: '100', rate: '&pound;82.44', cost: '&pound;8,244.00' },
    { jobCode: 'WMWL130', name: 'Hudson, Edward', wg: 'Wildlife', gr: 'E', mont: '10', time: '1.5', rate: '&pound;54.84', cost: '&pound;82.26' },
    { jobCode: 'WMWL130', name: 'Lane, Julie', wg: 'Wildlife', gr: 'A', mont: '10', time: '37.5', rate: '&pound;135.12', cost: '&pound;5,067.00' },
    { jobCode: 'WMWL130', name: 'Fouracre, David', wg: 'Wildlife', gr: 'C', mont: '10', time: '7.4', rate: '&pound;82.44', cost: '&pound;610.06' },
    { jobCode: 'WMWL130', name: 'Jones, Rebecca', wg: 'Wildlife', gr: 'E', mont: '11', time: '26.75', rate: '&pound;54.84', cost: '&pound;2,015.37' },
    { jobCode: 'WMWL130', name: 'Jones, Rebecca', wg: 'Wildlife', gr: 'E', mont: '11', time: '51.8', rate: '&pound;54.84', cost: '&pound;2,840.71' },
    { jobCode: 'WMWL130', name: 'Woodall, Hannah', wg: 'Wildlife', gr: 'E', mont: '11', time: '37', rate: '&pound;54.84', cost: '&pound;2,029.08' },
    { jobCode: 'WMWL130', name: 'Bellamy, Fiona', wg: 'Wildlife', gr: 'E', mont: '11', time: '7', rate: '&pound;54.84', cost: '&pound;448.00' },
    { jobCode: 'WMWL130', name: 'Macias-Rodriguez, Alejandro', wg: 'Wildlife', gr: 'F', mont: '11', time: '49.4', rate: '&pound;46.79', cost: '&pound;2,311.43' },
    { jobCode: 'WMWL130', name: 'Hammett, David', wg: 'Wildlife', gr: 'D', mont: '12', time: '39.77', rate: '&pound;64.00', cost: '&pound;2,545.28' },
    { jobCode: 'WMWL130', name: 'Parrott, David', wg: 'Wildlife', gr: 'C', mont: '12', time: '274.5', rate: '&pound;82.44', cost: '&pound;22,629.78' },
    { jobCode: 'WMWL130', name: 'Hudson, Edward', wg: 'Wildlife', gr: 'E', mont: '12', time: '63.75', rate: '&pound;54.84', cost: '$3,496.05' },
    { jobCode: 'WMWL130', name: 'Jones, Rebecca', wg: 'Wildlife', gr: 'E', mont: '12', time: '222', rate: '&pound;54.84', cost: '&pound;12,174.48' },
    { jobCode: 'WMWL130', name: 'Woodall, Hannah', wg: 'Wildlife', gr: 'E', mont: '12', time: '41.25', rate: '&pound;54.84', cost: '&pound;2,262.15' },
    { jobCode: 'WMWL130', name: 'Coats, Julia', wg: 'Wildlife', gr: 'E', mont: '12', time: '47', rate: '&pound;54.84', cost: '&pound; 2,577.48' }
];



let filteredData = [...actualdata]; // for search
let currentPage = 1;
let recordsPerPage = 10;

function displayTable() {
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const pageRecords = filteredData.slice(start, end);

    document.getElementById("tableBody").innerHTML =
        pageRecords.map(x => `

        <tr>
          <td>${x.jobCode}</td>
          <td>${x.name}</td>
          <td>${x.wg}</td>
          <td>${x.gr}</td>
          <td>${x.mont}</td>
          <td>${x.time}</td>
          <td>${x.rate}</td>
          <td>${x.cost}</td>
        </tr>
      `).join("");

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    // First
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPage(1)">First</button>`;

    // Previous
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>Previous</button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `<button class="btn btn-outline-primary ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
    }

    // Next
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Next</button>`;

    // Last
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPage(${totalPages})">Last</button>`;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    displayTable();
}

// Search function
document.getElementById("searchBox").addEventListener("keyup", function () {
    const text = this.value.toLowerCase();
    filteredData = actualdata.filter(x =>
        x.jobCode.toString().includes(text) ||
        x.name.toLowerCase().includes(text) ||
        x.wg.toLowerCase().includes(text) ||
        x.gr.toLowerCase().includes(text) ||
        x.mont.toLowerCase().includes(text) ||
        x.time.toLowerCase().includes(text) ||
        x.rate.toLowerCase().includes(text) ||
        x.cost.toLowerCase().includes(text)
    );

    currentPage = 1;  // reset page on new search
    displayTable();
});

document.getElementById("recordsPerPage").addEventListener("change", function () {
    recordsPerPage = parseInt(this.value);
    currentPage = 1;
    displayTable();
});

displayTable();

//Second table

const staffplans = [
   // { wggrade: 'WMWL130', name: 'Parrott, David', hour: 'Wildlife', rate: '&pound;82.44', cost: '&pound;3,380.04' }
];



let staffdata = [...staffplans]; // for search
let currenPage = 1;
let recordPerPage = 10;

function displayTabletwo() {
    const start = (currenPage - 1) * recordPerPage;
    const end = start + recordPerPage;
    const pageRecords = staffdata.slice(start, end);
    const tbody = document.getElementById("tableBodytwo");
    if (pageRecords.length == 0) {
        tbody.innerHTML =  `
                    
        <tr>
          <td colspan="5">No record found</td>  
        </tr>`;
      

  // renderPaginationtwo();
    } else {
        document.getElementById("tableBodytwo").innerHTML =
            pageRecords.map(x => `
                    
        <tr>
          <td>${x.wggrade}</td> 
          <td>${x.name}</td>
          <td>${x.hour}</td>
          <td>${x.rate}</td>
          <td>${x.cost}</td> 
        </tr>
      `).join("");

        renderPaginationtwo();
    }


}

function renderPaginationtwo() {
    const totalPages = Math.ceil(staffdata.length / recordPerPage);
    const container = document.getElementById("pg");
    container.innerHTML = "";

    // First
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPagetwo(1)">First</button>`;

    // Previous
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPagetwo(${currenPage - 1})" ${currenPage === 1 ? "disabled" : ""}>Previous</button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `<button class="btn btn-outline-primary ${i === currenPage ? "active" : ""}" onclick="goToPagetwo(${i})">${i}</button>`;
    }

    // Next
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPagetwo(${currenPage + 1})" ${currenPage === totalPages ? "disabled" : ""}>Next</button>`;

    // Last
    container.innerHTML += `<button class="btn btn-outline-primary" onclick="goToPagetwo(${totalPages})">Last</button>`;
}

function goToPagetwo(page) {
    const totalPages = Math.ceil(staffdata.length / recordPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currenPage = page;
    displayTabletwo();
}

// Search function
document.getElementById("txtsearchBox").addEventListener("keyup", function () {
    const text = this.value.toLowerCase();
    filteredData = actualdata.filter(x =>
        x.wggrade.toString().includes(text) ||
        x.name.toLowerCase().includes(text) ||
        x.hour.toLowerCase().includes(text) || 
        x.rate.toLowerCase().includes(text) ||
        x.cost.toLowerCase().includes(text)
    );

    currenPage = 1;  // reset page on new search
    displayTabletwo();
});

document.getElementById("recordPerPage").addEventListener("change", function () {
    recordPerPage = parseInt(this.value);
    currenPage = 1;
    displayTabletwo();
});

displayTabletwo();

 //wggrade: 'WMWL130', name: 'Parrott, David', hour: 'Wildlife', rate: '&pound;82.44', cost: '&pound;3,380.04' 