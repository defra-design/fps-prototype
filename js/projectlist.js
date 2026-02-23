const actualdata = [
   { project: 'ABQG0508', program: 'DoES', customer: 'Welsh Government', onFPS: 'No' },
    { project: 'ABSE4406', program: 'DoES', customer: 'FFG - Research', onFPS: 'Yes' },
    { project: 'AH0002', program: 'ADMIN', customer: 'Not Specified', onFPS: 'Yes' },
    { project: 'AH0009', program: 'ASU', customer: 'VLA', onFPS: 'Yes' },
    { project: 'AH0011', program: 'DoES', customer: 'Animal Health', onFPS: 'Yes' },
    { project: 'AH0032', program: 'Wildlife', customer: 'Defra', onFPS: 'Yes' },
    { project: 'AH0033', program: 'Wildlife', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAASHO', program: 'Bee Insp', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAASHO', program: 'Bee Insp', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAB0000', program: 'ADMIN', customer: 'DEFRA Contingency', onFPS: 'Yes' },
    { project: 'APHABC000', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAEM000', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAEUTAI', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAG008', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAH0047', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0048', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0049', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0050', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0051', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0052', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0053', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0058', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0061', program: 'DoES', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAH0074', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAHRFN', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAI0000', program: 'ADMIN', customer: 'DEFRA Contingency', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'PHSIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'PHSIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAOBOM0419', program: 'Comm', customer: 'Not Specified', onFPS: 'Yes' },    
    { project: 'APHAOBOM0420', program: 'Wildlife', customer: 'Not Specified', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'EU Exit', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'Scottish Government', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'PHSIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINAHO', program: 'ADMIN', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINHT', program: 'PHSIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAINESE', program: 'ADMIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAINEU', program: 'EU Exit', customer: 'APHA', onFPS: 'Yes' },
    { project: 'APHAINFSA', program: 'ADMIN', customer: 'DEFRA Contingency', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Wildlife', customer: 'Not Specified', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Bact', customer: 'Zoological Society', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'ASU', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Viro', customer: 'Public Health England', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Viro', customer: 'Public Health England', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Viro', customer: 'FSA', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Viro', customer: 'FSA', onFPS: 'Yes' },
    { project: 'APHAOBOM', program: 'Viro', customer: 'FSA', onFPS: 'Yes' },
    { project: 'APHAPBW3', program: 'PHSIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAPHNF', program: 'PHSIN', customer: 'Defra', onFPS: 'Yes' },
    { project: 'APHAPM000', program: 'ADMIN', customer: 'DEFRA Contingency', onFPS: 'Yes' },
    { project: 'APHARDEU', program: 'DoES', customer: 'EU', onFPS: 'Yes' },
    { project: 'APHARDEU', program: 'DoES', customer: 'EU', onFPS: 'Yes' },
    { project: 'APHARDEU', program: 'DoES', customer: 'EU', onFPS: 'Yes' },
    { project: 'APHARDEU', program: 'DoES', customer: 'EU', onFPS: 'Yes' }
];



let filteredprojectlist = [...actualdata]; // for search
let currentPage = 1;
let recordsPerPage = 20;

function displayTable() {
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const pageRecords = filteredprojectlist.slice(start, end);

    if (pageRecords.length == 0) {
         document.getElementById("tableBody").innerHTML =  `
                    
        <tr>
          <td colspan="5" style="text-align:left">No record found</td>  
        </tr>`;
      

       // renderPaginationtwo();
    } else {


    document.getElementById("tableBody").innerHTML =
        pageRecords.map(x => `

        <tr>
          <td><a class="viewLink" href="#" data-obj='${JSON.stringify(x)}'>${x.project}</a></td>
          <td>${x.program}</td>
          <td>${x.customer}</td>
          <td style="text-align:left">${x.onFPS}</td> 
           <td style="text-align:center;"><div style="background:none; cursor:pointer;" >
		 <img src="../images/view_icon.png" width="22px" height="22px" alt="View Project" data-obj='${JSON.stringify(x)}' class="viewLink" title="View"></div></td> 
        </tr>
      `).join("");

    renderPagination();

        }
}

function renderPagination() {
    const totalPages = Math.ceil(filteredprojectlist.length / recordsPerPage);
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
    const totalPages = Math.ceil(filteredprojectlist.length / recordsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    displayTable();
}

// Search function
document.getElementById("txtsearchBox").addEventListener("keyup", function () {
   // const text = this.value;
     const text = this.value.trim().toLowerCase();
    filteredprojectlist = actualdata.filter(x =>
        x.project.toString().toLowerCase().includes(text) ||
        x.program.toString().toLowerCase().includes(text) ||
        x.customer.toString().toLowerCase().includes(text) ||
        x.onFPS.toString().toLowerCase().includes(text)
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
 
document.addEventListener("click", e => {
    if (e.target.classList.contains("viewLink")) {
        e.preventDefault();

        const json = e.target.getAttribute("data-obj");
        const encoded = btoa(json); // convert to Base64

        window.location.href = "selectedprojectdetails.html?data=" + encoded;
    }
});


// document.addEventListener("change", function (e) {
//     if (e.target.type === "radio" && e.target.name === "gender") {
//         if (e.target.value === "female") {
//             console.log("Female selected");
//         }
//     }
// });



document.querySelectorAll('input[name="inlineRadioOptions"]').forEach(radio => {
    radio.addEventListener("change", function () {

        const selectedValue = this.value;

        if (selectedValue === "not_specified") {
                filterAllExceptNotMember(); 
           
        } else {
            filteredprojectlist = [...actualdata];  
            currentPage = 1;  // reset page on new search
            displayTable();
        }
    });
});

 

function filterAllExceptNotMember() {
    console.log("Show everything EXCEPT Not member");
    let text = "Not Specified"; 
     filteredprojectlist = actualdata.filter(x => 
        !x.customer.includes(text)
    );

    currentPage = 1;  // reset page on new search
    displayTable();
}
