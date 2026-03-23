const actualdata = [
  {
    project: "ABQG0508",
    program: "DoES",
    customer: "Welsh Government",
    onFPS: "No",
  },
  {
    project: "ABSE4406",
    program: "DoES",
    customer: "FFG - Research",
    onFPS: "Yes",
  },
  {
    project: "AH0002",
    program: "ADMIN",
    customer: "Not Specified",
    onFPS: "Yes",
  },
  { project: "AH0009", program: "ASU", customer: "VLA", onFPS: "Yes" },
  {
    project: "AH0011",
    program: "DoES",
    customer: "Animal Health",
    onFPS: "Yes",
  },
  { project: "AH0032", program: "Wildlife", customer: "Defra", onFPS: "Yes" },
  { project: "AH0033", program: "Wildlife", customer: "Defra", onFPS: "Yes" },
  { project: "APHAASHO", program: "Bee Insp", customer: "Defra", onFPS: "Yes" },
  { project: "APHAASHO", program: "Bee Insp", customer: "Defra", onFPS: "Yes" },
  {
    project: "APHAB0000",
    program: "ADMIN",
    customer: "DEFRA Contingency",
    onFPS: "Yes",
  },
  { project: "APHABC000", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAEM000", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAEUTAI", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAG008", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAH0047", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0048", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0049", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0050", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0051", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0052", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0053", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0058", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0061", program: "DoES", customer: "APHA", onFPS: "Yes" },
  { project: "APHAH0074", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAHRFN", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  {
    project: "APHAI0000",
    program: "ADMIN",
    customer: "DEFRA Contingency",
    onFPS: "Yes",
  },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAINAHO", program: "PHSIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAINAHO", program: "PHSIN", customer: "Defra", onFPS: "Yes" },
  {
    project: "APHAOBOM0419",
    program: "Comm",
    customer: "Not Specified",
    onFPS: "Yes",
  },
  {
    project: "APHAOBOM0420",
    program: "Wildlife",
    customer: "Not Specified",
    onFPS: "Yes",
  },
  { project: "APHAINAHO", program: "EU Exit", customer: "APHA", onFPS: "Yes" },
  {
    project: "APHAINAHO",
    program: "ADMIN",
    customer: "Scottish Government",
    onFPS: "Yes",
  },
  { project: "APHAINAHO", program: "PHSIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINAHO", program: "ADMIN", customer: "APHA", onFPS: "Yes" },
  { project: "APHAINHT", program: "PHSIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAINESE", program: "ADMIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAINEU", program: "EU Exit", customer: "APHA", onFPS: "Yes" },
  {
    project: "APHAINFSA",
    program: "ADMIN",
    customer: "DEFRA Contingency",
    onFPS: "Yes",
  },
  {
    project: "APHAOBOM",
    program: "Wildlife",
    customer: "Not Specified",
    onFPS: "Yes",
  },
  {
    project: "APHAOBOM",
    program: "Bact",
    customer: "Zoological Society",
    onFPS: "Yes",
  },
  { project: "APHAOBOM", program: "ASU", customer: "Defra", onFPS: "Yes" },
  {
    project: "APHAOBOM",
    program: "Viro",
    customer: "Public Health England",
    onFPS: "Yes",
  },
  {
    project: "APHAOBOM",
    program: "Viro",
    customer: "Public Health England",
    onFPS: "Yes",
  },
  { project: "APHAOBOM", program: "Viro", customer: "FSA", onFPS: "Yes" },
  { project: "APHAOBOM", program: "Viro", customer: "FSA", onFPS: "Yes" },
  { project: "APHAOBOM", program: "Viro", customer: "FSA", onFPS: "Yes" },
  { project: "APHAPBW3", program: "PHSIN", customer: "Defra", onFPS: "Yes" },
  { project: "APHAPHNF", program: "PHSIN", customer: "Defra", onFPS: "Yes" },
  {
    project: "APHAPM000",
    program: "ADMIN",
    customer: "DEFRA Contingency",
    onFPS: "Yes",
  },
  { project: "APHARDEU", program: "DoES", customer: "EU", onFPS: "Yes" },
  { project: "APHARDEU", program: "DoES", customer: "EU", onFPS: "Yes" },
  { project: "APHARDEU", program: "DoES", customer: "EU", onFPS: "Yes" },
  { project: "APHARDEU", program: "DoES", customer: "EU", onFPS: "Yes" },
];

let filteredprojectlist = [...actualdata]; // for search
let currentPage = 1;
let recordsPerPage = 20;

function displayTable() {
  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const pageRecords = filteredprojectlist.slice(start, end);

  if (pageRecords.length == 0) {
    document.getElementById("tableBody").innerHTML = `
                    
        <tr>
          <td class="govuk-table__cell" colspan="5" style="text-align:left">No record found</td>  
        </tr>`;

    // renderPaginationtwo();
  } else {
    document.getElementById("tableBody").innerHTML = pageRecords
      .map(
        (x) => `

        <tr>
          <td  class="govuk-table__cell"><a class="viewLink" href="#" data-obj='${JSON.stringify(x)}'>${x.project}</a></td>
          <td  class="govuk-table__cell">${x.program}</td>
          <td  class="govuk-table__cell">${x.customer}</td>
          <td  class="govuk-table__cell" style="text-align:left">${x.onFPS}</td> 
        <td  class="govuk-table__cell" style="text-align:center;"><div style="background:none; cursor:pointer;" >
		 <img src="../images/view_icon.png" width="22px" height="22px" alt="View Project" data-obj='${JSON.stringify(x)}' class="viewLink" title="View"></div></td> 
        </tr>
      `,
      )
      .join("");

    renderPagination();
  }
}
function renderPagination() {
  const totalPages = Math.ceil(filteredprojectlist.length / recordsPerPage);
  const pagination = document.getElementById("pagination");

  if (!pagination) return;

  pagination.innerHTML = "";

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `govuk-pagination__item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage - 1})">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg> 
        <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
    </a>`;
  pagination.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `govuk-pagination__item ${i === currentPage ? "govuk-pagination__item--current" : ""}`;
    li.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${i})">${i}</a>`;
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `govuk-pagination__item ${currentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="govuk-link govuk-pagination__link" onclick="goToPage(${currentPage + 1})">
        <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
  pagination.appendChild(nextLi);
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
  filteredprojectlist = actualdata.filter(
    (x) =>
      x.project.toString().toLowerCase().includes(text) ||
      x.program.toString().toLowerCase().includes(text) ||
      x.customer.toString().toLowerCase().includes(text) ||
      x.onFPS.toString().toLowerCase().includes(text),
  );

  currentPage = 1; // reset page on new search
  displayTable();
});

document
  .getElementById("recordsPerPage")
  .addEventListener("change", function () {
    recordsPerPage = parseInt(this.value);
    currentPage = 1;
    displayTable();
  });

displayTable();

document.addEventListener("click", (e) => {
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

document
  .querySelectorAll('input[name="inlineRadioOptions"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedValue = this.value;

      if (selectedValue === "not_specified") {
        filterAllExceptNotMember();
      } else {
        filteredprojectlist = [...actualdata];
        currentPage = 1; // reset page on new search
        displayTable();
      }
    });
  });

function filterAllExceptNotMember() {
  console.log("Show everything EXCEPT Not member");
  let text = "Not Specified";
  filteredprojectlist = actualdata.filter((x) => !x.customer.includes(text));

  currentPage = 1; // reset page on new search
  displayTable();
}
