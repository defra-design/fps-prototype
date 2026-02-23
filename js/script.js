const modal = document.getElementById("testModal");

const projectData = [
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

function populateDropdown() {
    const select = document.getElementById('projectSelect');

    // 🔹 Fixed / default option
  //  const defaultOption = document.createElement('option');
   // defaultOption.value = "sampletxta|mysampletxtb";
  //  defaultOption.textContent = "sampletxta | mysampletxtb";
  //  defaultOption.selected = true;
   // select.appendChild(defaultOption);

    // 🔹 Create optgroup
    const empGroup = document.createElement('optgroup');
    empGroup.label = "Project | Program | Customer | onFPS";

    // 🔹 Add options inside optgroup
    projectData.forEach(item => {
        const option = document.createElement('option');
       // option.value = `${item.emp}|${item.email}`;
       // option.textContent = `${item.emp} | ${item.email}`;
         option.value = `${item.project}|${item.program}|${item.customer}|${item.onFPS}`; 
        option.textContent =`${item.project} | ${item.program} | ${item.customer} | ${item.onFPS}`;
        empGroup.appendChild(option);
    });

    // 🔹 Append optgroup to select
    select.appendChild(empGroup);
}


// Initialize the page
// document.addEventListener('DOMContentLoaded', function() {
    
 //  populateDropdown(); 
//      new TomSelect("#projectSelect",{
//                 // onItemAdd() {
//                 //         this.setTextboxValue("");  // clear search box
//                 // },
//                 onItemAdd: function () {
//                         this.blur();
//                     }
//         });

// });

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

function handleAdd() {
    //isAddMode = true;
    
  //  document.getElementById('exampleModalLabel').textContent = 'Add Job Code';
    // document.getElementById('testForm').reset();
    // document.getElementById('descriptionInput').value = '';
    openModal();
   // document.getElementById('testModal').style.display = 'block';
   //   document.getElementById("testModal").classList.toggle("show");
    // const modal = new bootstrap.Modal(document.getElementById('testModal'));
    // modal.show();
}


//document.getElementById('addBtn').addEventListener('click', handleAdd);