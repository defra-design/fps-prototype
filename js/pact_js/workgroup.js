
      let employeesData = [
            { itemcode: 'PT0000', itemdescription: "Dermo Caprine Defined Antib" },
            { itemcode: 'PT0001', itemdescription: "African horse sickness" },
            { itemcode: 'PT0002', itemdescription: "B. anthracis microscopy" },
            { itemcode: 'PT0003', itemdescription: "Aujeszky's disease" },
            { itemcode: 'PT0004', itemdescription: "Aujeszky's - blood disc" },
            { itemcode: 'PT0005', itemdescription: "Avian Influenza-serology" },
            { itemcode: 'PT0006', itemdescription: "Avian influ. and ND Ag dete" },
            { itemcode: 'PT0007', itemdescription: "Babesia caballi" },
            { itemcode: 'PT0008', itemdescription: "Bacteria in cold water fish" },
            { itemcode: 'PT0009', itemdescription: "Big liver and spleen disease" },
            { itemcode: 'PT0010', itemdescription: "BVD AgELISA/PCR" },
            { itemcode: 'PT0011', itemdescription: "BVD milk ELISA" },
            { itemcode: 'PT0012', itemdescription: "BVD serum Ab ELISA" },
            { itemcode: 'PT0013', itemdescription: "B. hyodysenteriae FAT" },
            { itemcode: 'PT0014', itemdescription: "Brucella cELISA" },
            { itemcode: 'PT0015', itemdescription: "Brucella abortus CFT/SAT" },
            { itemcode: 'PT0016', itemdescription: "Brucella abortus ELISA" },
            { itemcode: 'PT0017', itemdescription: "B. abortus milk ELISA - Deh" },
            { itemcode: 'PT0018', itemdescription: "Brucella abortus milk ELISA" },
            { itemcode: 'PT0019', itemdescription: "Brucella abortus MRT" },
            { itemcode: 'PT0020', itemdescription: "Brucella abortus RBT" },
            { itemcode: 'PT0021', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0001', itemdescription: "Brucella canis RSAT" } ,
            { itemcode: 'TC0002', itemdescription: "Brucella canis RSAT" } ,
            { itemcode: 'TC0003', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0004', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0005', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0006', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0007', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0008', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0009', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0010', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0011', itemdescription: "Brucella canis RSAT" },
            { itemcode: 'TC0012', itemdescription: "Sheep/Goat/PigFetus+" },
        ];

        let projectCodesData = [
            { code: 'AB060508', description: 'Welsh Government for' },
    { code: 'ABSE7406', description: 'Assessment of Marine' },
    { code: 'AH0002', description: 'Ear Tagging Project 1' },
    { code: 'AH0006', description: 'Radiotelemetry' },
    { code: 'AH0009', description: 'Costs of animal collecti' },
    { code: 'AH0011', description: 'Support for Nutrition' },
    { code: 'AH0032', description: 'BCP Wildlife' },
    { code: 'AH0033', description: 'BCP Organics' },
    { code: 'APHA3HORN24', description: 'Asian Hornet Spring M' },
    { code: 'APHA800000', description: 'Asian Hornet' },
    { code: 'APHA800000', description: 'Animal by products' },
    { code: 'APHAM00000', description: 'Border Control Post' },
    { code: 'APHAM00000', description: 'Eng Marketing' },
    { code: 'APHAH00000', description: 'EURL MYCOPLASMA NT AS' },
    { code: 'APHAH0038', description: 'Brucellosis Survey Rev' },
    { code: 'APHAH0001', description: 'NVZ Control Database' },
    { code: 'APHAH0047', description: 'Programme Managemt & Alt' },
    { code: 'APHAH0048', description: 'Policy Demand' },
    { code: 'APHAH0049', description: 'Risk Assessment & Alte' },
    { code: 'APHAH0050', description: 'Innovation in Operation' },
    { code: 'APHAH0051', description: 'Field Inspection Contr' },
    { code: 'APHAH0052', description: 'Field Service Managem' },
    { code: 'APHAH0053', description: 'Surveillance' },
    { code: 'APHAH0058', description: 'SHEP (Sansom House' },
    { code: 'APHAH0061', description: 'Surveillance Coordinatio' },
    { code: 'APHAH0074', description: 'Change Implementation' },
    { code: 'APHAIRNAD52', description: 'Reimbursement' },
    { code: 'APHAINAD000', description: 'Defra Domain ID' },
    { code: 'APHANAT0055', description: 'Customer Project' },
    { code: 'APHANAT0056', description: 'Livestock Info Prog' },
    { code: 'APHANAT0057', description: 'Scanning Surveillance' },
    { code: 'APHANAT0075', description: 'HMI Transfer' },
    { code: 'PHW9H100', description: 'CBRE Rent - Plant' },
    { code: 'PHW9H105', description: 'APHA Cardiff Flower St' },
    { code: 'PMBP0R11', description: 'Rent' },
    { code: 'QA1000', description: 'Quality Assurance Unit' },
    { code: 'QA2000', description: 'Administration' },
    { code: 'QA3000', description: 'Advisory & Consultancy' },
    { code: 'QA4000', description: 'Auditing Trai' },
    { code: 'QAPTFDR11', description: 'P1 Ab/Ag Detection' },
    { code: 'QAPTFDR110', description: 'Packing and Postage' },
    { code: 'QAPTFDR12', description: 'P1 Microbiology' },
    { code: 'QAPTFDR13', description: 'Reagent Purchase' },
    { code: 'QAPTFDR14', description: 'Title is QA Schemes - 1' },
    { code: 'QAPTFDR15', description: 'P1' },
    { code: 'RD0005', description: 'Fellowship [4/18/2018' },
    { code: 'RDCR2032', description: 'Wellcome' },
    { code: 'RDCR2003', description: 'Exotic mycoplasma- en' }
        ]

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
    { item: 'SLSD', itemdescription: 'SLSD' }
];

let filteredData;
let summaryFilteredData; 
let generatedRandomPrice = null;

   document.querySelectorAll('[data-empdropdown]').forEach(dd => {
            const source = dd.dataset.source;
            if (source === 'employees') {
                initDropdown(dd, employeesData, 'itemcode', 'itemdescription');
            } else if (source === 'projects') {
                initProjectDropdown(dd, projectCodesData);
            } else if (source === 'workgroups') {
                initWorkgroupDropdown(dd, workgroupItemsData);
            }
        });

function initDropdown(dropdown, dataset, codeField, descField) {
            const input = dropdown.querySelector('.dropdown-input');
            const panel = dropdown.querySelector('.dropdown-panel');
            const search = dropdown.querySelector('.search-box');
            const tbody = dropdown.querySelector('tbody');

            function renderRows(filter = '') {
                tbody.innerHTML = '';
                
                // Add "Clear Filter" option at the top
                if (!filter) {
                    const clearTr = document.createElement('tr');
                    clearTr.onclick = () => {
                        input.value = '--select--';
                        panel.style.display = 'none';
                        
                        // Clear the filter
                        selectedItemCode = null;
                        currentWorkgroupPage = 1;
                        renderWorkgroupTable();
                    };
                    tbody.appendChild(clearTr);
                }
                
                dataset
                    .filter(d =>
                        d[codeField].toLowerCase().includes(filter) ||
                        d[descField].toLowerCase().includes(filter)
                    )
                    .forEach(d => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${d[codeField]}</td><td>${d[descField]}</td>`;
                        tr.onclick = () => {
                            input.value = `${d[codeField]}`;
                            panel.style.display = 'none';
                            document.getElementById('divTestcode').value = `${d[codeField]}`;
                            selectTestCode(d[codeField]);
                            
                            document.getElementById('dpprogramme').value = '';
                              filteredData = workgroupData.filter(item => {
                                // If no test code is selected, show all items

                                // Filter by the selected test code
                                return item.TestCode.toLowerCase().includes(d[codeField].toLowerCase());
                            });
                            selectedWG = "";
                        //if(document.getElementById('dpprogramme').value !== ''){
                            filteredSearch(filteredData);
                        //} 
                        
        // if (filteredData?.length > 0) {
        //     selectTestCode(filteredData[0].TestCode);
        //     currentWorkgroupPage = 1;
        //     renderWorkgroupTable();
        //     //  selectValue(this.value);
        // }
                            // Filter workgroup table by selected TestCode
                            selectedItemCode = d[codeField];
                            // currentWorkgroupPage = 1;
                            // renderWorkgroupTable();
                            
                        };
                        tbody.appendChild(tr);
                    });
            }

            input.addEventListener('click', e => {
                e.stopPropagation();
                panel.style.display = 'block';
                panel.style.width = '100%';
                search.value = '';
                search.focus();
                renderRows();
            });

            search.addEventListener('input', e => {
                renderRows(e.target.value.toLowerCase());
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    panel.style.display = 'none';
                }
            });
        }

function initProjectDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        dataset
            .filter(d =>
                d.code.toLowerCase().includes(filter) ||
                d.description.toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.code}</td><td>${d.description}</td>`;
                tr.onclick = () => {
                    input.value = `${d.code}`;
                    document.getElementById('txtmodal-summary-buyer').value = `${d.code}`;
                    // Generate random 3-digit number (100-999)
                    const randomPrice = (Math.floor(Math.random() * 900) + 100).toFixed(2);
                   
                    if(generatedRandomPrice !== null && generatedRandomPrice !== undefined && generatedRandomPrice !== ''){
                        document.getElementById('txtmodal-summary-recunitprice').value = generatedRandomPrice;
                        document.getElementById('txtmodal-summary-unitprice').value = generatedRandomPrice;
                    }else{
                        generatedRandomPrice = randomPrice;
                        document.getElementById('txtmodal-summary-recunitprice').value = generatedRandomPrice;
                        document.getElementById('txtmodal-summary-unitprice').value = generatedRandomPrice;
                    }
                    // Randomly select 'Yes' or 'No'
                    document.getElementById('txtmodal-summary-defraproject').value = Math.random() < 0.5 ? 'Yes' : 'No';
                    panel.style.display = 'none';
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        search.value = '';
        search.focus();
        renderRows();
    });

    search.addEventListener('input', e => {
        renderRows(e.target.value.toLowerCase());
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

function initWorkgroupDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        // Add "Clear Filter" option at the top
        if (!filter) {
            const clearTr = document.createElement('tr');
            clearTr.onclick = () => {
                input.value = '';
                panel.style.display = 'none';
                
                // Clear the workgroup filter
                selectedWG = "";
                selectedTestCode = null;
                document.getElementById('txtstaffsearchBox').value = '';
                currentWorkgroupPage = 1;
                renderWorkgroupTable();
                renderSummaryTable();
            };
            tbody.appendChild(clearTr);
        }
        
        dataset
            .filter(d =>
                d.item.toLowerCase().includes(filter) ||
                d.itemdescription.toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.item}</td><td>${d.itemdescription}</td>`;
                tr.onclick = () => {
                    input.value = `${d.item}`;
                    panel.style.display = 'none';
                    
                    // Update selected workgroup and filter the table
                    selectedWG = d.item;
                    document.getElementById('txtstaffsearchBox').value = '';
                    
                    filteredData = workgroupData.filter(item => {
                        return item.WorkGroup.toLowerCase().includes(selectedWG.toLowerCase());
                    });
                    
                    if (filteredData?.length > 0) {
                        selectTestCode(filteredData[0].TestCode);
                        document.getElementById('divTestcode').value = filteredData[0].TestCode;
                        currentWorkgroupPage = 1;
                        renderWorkgroupTable();
                    } else {
                        selectedTestCode = null;
                        currentWorkgroupPage = 1;
                        renderWorkgroupTable();
                        renderSummaryTable();
                    }
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        search.value = '';
        search.focus();
        renderRows();
    });

    search.addEventListener('input', e => {
        renderRows(e.target.value.toLowerCase());
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

function initModalWorkgroupDropdown(dropdown, dataset) {
    const input = dropdown.querySelector('.dropdown-input');
    const panel = dropdown.querySelector('.dropdown-panel');
    const search = dropdown.querySelector('.search-box');
    const tbody = dropdown.querySelector('tbody');

    function renderRows(filter = '') {
        tbody.innerHTML = '';
        
        dataset
            .filter(d =>
                d.item.toLowerCase().includes(filter) ||
                d.itemdescription.toLowerCase().includes(filter)
            )
            .forEach(d => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${d.item}</td><td>${d.itemdescription}</td>`;
                tr.onclick = () => {
                    input.value = `${d.item}`;
                    panel.style.display = 'none';
                };
                tbody.appendChild(tr);
            });
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        panel.style.display = 'block';
        panel.style.width = '100%';
        search.value = '';
        search.focus();
        renderRows();
    });

    search.addEventListener('input', e => {
        renderRows(e.target.value.toLowerCase());
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            panel.style.display = 'none';
        }
    });
}

const modal = document.getElementById('addWorkgroupModal');
 
// Test Code Work Group Plan Data Array
const workgroupData = [
    {
    "TestCode": "PT0001",
    "WorkGroup": "QASB",
    "PlanPortfolio": "QAPTPORT1"
    },
  {
    "TestCode": "TC0001",
    "WorkGroup": "BAC2",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0002",
    "WorkGroup": "BAC3",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0003",
    "WorkGroup": "BAC4",
    "PlanPortfolio": "PATHVET"
  },
  {
    "TestCode": "TC0004",
    "WorkGroup": "LTBU",
    "PlanPortfolio": "PATHVET"
  },
  {
    "TestCode": "TC0005",
    "WorkGroup": "BDU",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0006",
    "WorkGroup": "CPD",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0007",
    "WorkGroup": "CSCC",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0008",
    "WorkGroup": "BM1",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0009",
    "WorkGroup": "BAC5",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0009",
    "WorkGroup": "BAC5",
    "PlanPortfolio": "PATHVET"
  },
  {
    "TestCode": "TC0010",
    "WorkGroup": "BAC2",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0011",
    "WorkGroup": "BAC3",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "LTBU",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVBU",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVCA",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVPE",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVSB",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVSH",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVST",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0012",
    "WorkGroup": "SVTH",
    "PlanPortfolio": "TG0100"
  },
  {
    "TestCode": "TC0013",
    "WorkGroup": "BDU",
    "PlanPortfolio": "VSPORT2"
  },
  {
    "TestCode": "TC0014",
    "WorkGroup": "CPD",
    "PlanPortfolio": "VSPORT2"
  },
  {
    "TestCode": "TC0015",
    "WorkGroup": "CSCC",
    "PlanPortfolio": "VSPORT2"
  }
];

// Test Code Project Details Data Array
const summaryData = [ 
  // Multiple entries for TC001
   {
    "TestCode": "PT0001",
    "Project": "CSUT1306",
    "Buyer": "CSUT1306",
    "UnitPrice": "£488.00",
    "No": "0",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£488.00"
  },
  {
    "TestCode": "PT0001",
    "Project": "EXOR1039",
    "Buyer": "EXOR1039",
    "UnitPrice": "£488.00",
    "No": "0",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£488.00"
  },
  {
    "TestCode": "PT0001",
    "Project": "QAPTPORT1",
    "Buyer": "QAPTPORT1",
    "UnitPrice": "£488.00",
    "No": "0",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£488.00"
  },
  {
    "TestCode": "TC0001",
    "Project": "CSKM0010",
    "Buyer": "John Smith",
    "UnitPrice": "£125.50",
    "No": "10",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£120.00"
  },
  {
    "TestCode": "TC0001",
    "Project": "CSUT6218",
    "Buyer": "Emma Davis",
    "UnitPrice": "£130.00",
    "No": "8",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£125.00"
  },
  {
    "TestCode": "TC001",
    "Project": "CSKM0010",
    "Buyer": "Robert Wilson",
    "UnitPrice": "£118.75",
    "No": "15",
    "Active": "No",
    "DefraProject": "Yes",
    "RecUnitPrice": "£115.00"
  },
  // Multiple entries for TC002
  {
    "TestCode": "TC0002",
    "Project": "CSUT1313",
    "Buyer": "Sarah Johnson",
    "UnitPrice": "£98.75",
    "No": "15",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£95.00"
  },
  {
    "TestCode": "TC0002",
    "Project": "CSUT1313",
    "Buyer": "Michael Brown",
    "UnitPrice": "£105.00",
    "No": "12",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£100.00"
  },
  {
    "TestCode": "TC0002",
    "Project": "CSKM0010",
    "Buyer": "Jennifer White",
    "UnitPrice": "£92.50",
    "No": "20",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£90.00"
  },
  // Multiple entries for TC003
  {
    "TestCode": "TC0003",
    "Project": "SV3032",
    "Buyer": "Michael Brown",
    "UnitPrice": "£150.00",
    "No": "8",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£145.00"
  },
  {
    "TestCode": "TC0003",
    "Project": "TBAH0091",
    "Buyer": "Lisa Anderson",
    "UnitPrice": "£155.00",
    "No": "6",
    "Active": "No",
    "DefraProject": "Yes",
    "RecUnitPrice": "£150.00"
  },
  {
    "TestCode": "TC0003",
    "Project": "OM0047",
    "Buyer": "David Taylor",
    "UnitPrice": "£148.25",
    "No": "10",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£143.00"
  },
  // Multiple entries for TC004
  {
    "TestCode": "TC0004",
    "Project": "OG0502",
    "Buyer": "Emma Wilson",
    "UnitPrice": "£85.25",
    "No": "20",
    "Active": "No",
    "DefraProject": "No",
    "RecUnitPrice": "£82.00"
  },
  {
    "TestCode": "TC0004",
    "Project": "SV3032",
    "Buyer": "Thomas Harris",
    "UnitPrice": "£88.00",
    "No": "18",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£85.00"
  },
  {
    "TestCode": "TC0004",
    "Project": "SV3032",
    "Buyer": "Patricia Martin",
    "UnitPrice": "£90.50",
    "No": "22",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£87.00"
  },
  // Multiple entries for TC005
  {
    "TestCode": "TC005",
    "Project": "SV3400",
    "Buyer": "David Taylor",
    "UnitPrice": "£200.00",
    "No": "5",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£195.00"
  },
  {
    "TestCode": "TC0005",
    "Project": "CSUT6218",
    "Buyer": "James Clark",
    "UnitPrice": "£210.00",
    "No": "4",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£205.00"
  },
  {
    "TestCode": "TC0005",
    "Project": "ED1300",
    "Buyer": "Mary Robinson",
    "UnitPrice": "£195.50",
    "No": "7",
    "Active": "No",
    "DefraProject": "No",
    "RecUnitPrice": "£190.00"
  },
  // Multiple entries for TC006
  {
    "TestCode": "TC0006",
    "Project": "FZ2100",
    "Buyer": "Lisa Anderson",
    "UnitPrice": "£75.50",
    "No": "12",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£72.00"
  },
  {
    "TestCode": "TC0006",
    "Project": "ED1600",
    "Buyer": "Richard Moore",
    "UnitPrice": "£78.00",
    "No": "14",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£75.00"
  },
  {
    "TestCode": "TC0006",
    "Project": "ED1020",
    "Buyer": "Susan Lee",
    "UnitPrice": "£72.25",
    "No": "16",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£70.00"
  },
  // Multiple entries for TC007
  {
    "TestCode": "TC0007",
    "Project": "FZ2100",
    "Buyer": "Robert Davies",
    "UnitPrice": "£110.00",
    "No": "18",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£108.00"
  },
  {
    "TestCode": "TC0007",
    "Project": "CSKV0070",
    "Buyer": "Nancy Walker",
    "UnitPrice": "£115.00",
    "No": "16",
    "Active": "No",
    "DefraProject": "Yes",
    "RecUnitPrice": "£112.00"
  },
  {
    "TestCode": "TC0007",
    "Project": "CSUT1313",
    "Buyer": "Kevin Young",
    "UnitPrice": "£108.50",
    "No": "20",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£105.00"
  },
  // Multiple entries for TC008
  {
    "TestCode": "TC0008",
    "Project": "CSKM0010",
    "Buyer": "Jennifer White",
    "UnitPrice": "£135.75",
    "No": "7",
    "Active": "No",
    "DefraProject": "No",
    "RecUnitPrice": "£130.00"
  },
  {
    "TestCode": "TC0008",
    "Project": "CSKM0018",
    "Buyer": "Charles King",
    "UnitPrice": "£140.00",
    "No": "6",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£135.00"
  },
  {
    "TestCode": "TC0008",
    "Project": "CSKM0028",
    "Buyer": "Barbara Scott",
    "UnitPrice": "£132.50",
    "No": "9",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£128.00"
  },
  // Multiple entries for TC009
  {
    "TestCode": "TC0009",
    "Project": "CSKM0030",
    "Buyer": "Thomas Harris",
    "UnitPrice": "£92.50",
    "No": "25",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£90.00"
  },
  {
    "TestCode": "TC0009",
    "Project": "CSKM0019",
    "Buyer": "Daniel Green",
    "UnitPrice": "£95.00",
    "No": "22",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£92.00"
  },
  {
    "TestCode": "TC0009",
    "Project": "CSKM0029",
    "Buyer": "Michelle Adams",
    "UnitPrice": "£89.75",
    "No": "28",
    "Active": "No",
    "DefraProject": "Yes",
    "RecUnitPrice": "£87.00"
  },
  // Multiple entries for TC010
  {
    "TestCode": "TC0010",
    "Project": "ED1100",
    "Buyer": "Patricia Martin",
    "UnitPrice": "£165.00",
    "No": "6",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£160.00"
  },
  {
    "TestCode": "TC0010",
    "Project": "ED1200",
    "Buyer": "Christopher Hill",
    "UnitPrice": "£170.00",
    "No": "5",
    "Active": "Yes",
    "DefraProject": "Yes",
    "RecUnitPrice": "£165.00"
  },
  {
    "TestCode": "TC0010",
    "Project": "ED1300",
    "Buyer": "Angela Baker",
    "UnitPrice": "£162.50",
    "No": "8",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£158.00"
  },
  {
    "TestCode": "TC0012",
    "Project": "ED1100",
    "Buyer": "ED1100",
    "UnitPrice": "£207.30",
    "No": "120",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£207.30"
  },
  {
    "TestCode": "TC0012",
    "Project": "ED1200",
    "Buyer": "ED1200",
    "UnitPrice": "£207.30",
    "No": "20",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£207.30"
  },
  {
    "TestCode": "TC0012",
    "Project": "FZ2100",
    "Buyer": "FZ2100",
    "UnitPrice": "£207.30",
    "No": "1",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£207.30"
  },
  {
    "TestCode": "TC0012",
    "Project": "VS0001",
    "Buyer": "VS0001",
    "UnitPrice": "£207.30",
    "No": "0",
    "Active": "Yes",
    "DefraProject": "No",
    "RecUnitPrice": "£207.30"
  }
];

let currentWorkgroupPage = 1;
let workgroupRecordsPerPage = 10;
let currentSummaryPage = 1;
let summaryRecordsPerPage = 10;
let sortColumn = null;
let sortDirection = 'asc';
let sortSummaryColumn = null;
let sortSummaryDirection = 'asc';
let editingIndex = null;
let editingSummaryIndex = null;
let selectedTestCode = null;
let selectedItemCode = null;
let selectedWG = "";

 
// Function to populate Test Code select field with employeesData
function populateTestCodeSelect() {
    const selectElement = document.getElementById('txtmodal-summary-testcode');
    if (selectElement) {
        // Clear existing options except the first one (--select option--)
        selectElement.innerHTML = '<option value="">--select option--</option>';
        
        // Add options from employeesData
        employeesData.forEach(employee => {
            const option = document.createElement('option');
            option.value = employee.itemcode;
            option.textContent = `${employee.itemcode}`;
            selectElement.appendChild(option);
        });
    }
}

// Initialize tables on page load
document.addEventListener('DOMContentLoaded', function() {
    renderWorkgroupTable(); 
    renderSummaryTable();
    selectTestCode( summaryData[0].TestCode); 
    setupEventListeners();
    setupSorting();
    setupSummarySorting();
    populateTestCodeSelect(); // Populate the Test Code select field
});

   
function setupEventListeners() {
    // Search functionality for staff search box


    // Search functionality for workgroup table


    // Search functionality for summary table
    // document.getElementById('summarySearch').addEventListener('input', function() {
    //     currentSummaryPage = 1;
    //     renderSummaryTable();
    // });

    // Records per page for workgroup
    document.getElementById('recordsPerPage').addEventListener('change', function() {
        workgroupRecordsPerPage = parseInt(this.value);
        currentWorkgroupPage = 1;
        renderWorkgroupTable();
    });

    // Workgroup dropdown functionality is now handled by initWorkgroupDropdown
    // document.getElementById('dpprogramme').addEventListener('change', function () {
    //     selectedWG = this.value;
    //     document.getElementById('txtstaffsearchBox').value = '';
        
    //     // renderWorkgroupTable();

    //       filteredData = workgroupData.filter(item => {
    //         // If no test code is selected, show all items

    //         // Filter by the selected test code
    //         return item.WorkGroup.toLowerCase().includes(selectedWG.toLowerCase());
    //     });
    //     if (filteredData?.length > 0) {
    //         selectTestCode(filteredData[0].TestCode);
    //        document.getElementById('divTestcode').value = filteredData[0].TestCode;
    //         currentWorkgroupPage = 1;
    //         renderWorkgroupTable();
    //         //  selectValue(this.value);
    //     }else{
    //         selectedTestCode = null;
    //         currentWorkgroupPage = 1;
    //         renderWorkgroupTable();
    //          renderSummaryTable();
    //     }

    // });




    // Records per page for summary
    document.getElementById('summaryRecordsPerPage').addEventListener('change', function() {
        summaryRecordsPerPage = parseInt(this.value);
        currentSummaryPage = 1;
        renderSummaryTable();
    });

    // Modal controls
    const addBtn = document.getElementById('addWorkgroupBtn');
    const addTestBtn = document.getElementById('addTestBtn');
    const closeBtn = document.getElementById('closeWorkgroupModalBtn');
    const cancelBtn = document.getElementById('cancelWorkgroupModalBtn');
    const saveBtn = document.getElementById('saveWorkgroupBtn');

    // Summary Modal controls
    const summaryModal = document.getElementById('addSummaryModal');
    const addSummaryBtn = document.getElementById('addSummaryBtn');
    const closeSummaryBtn = document.getElementById('closeSummaryModalBtn');
    const cancelSummaryBtn = document.getElementById('cancelSummaryModalBtn');
    const saveSummaryBtn = document.getElementById('saveSummaryBtn');

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            openModal();
        });
    }

    if (addSummaryBtn) {
        addSummaryBtn.addEventListener('click', function() {
            generatedRandomPrice = null;
            openSummaryModal();
        });
    }

    if (addTestBtn) {
        addTestBtn.addEventListener('click', function() {
            alert('Test project details add functionality would be implemented here.');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveWorkgroup();
        });
    }

    if (closeSummaryBtn) {
        closeSummaryBtn.addEventListener('click', function() {
            closeSummaryModal();
        });
    }

    if (cancelSummaryBtn) {
        cancelSummaryBtn.addEventListener('click', function() {
            closeSummaryModal();
        });
    }

    if (saveSummaryBtn) {
        saveSummaryBtn.addEventListener('click', function() {
            saveSummary();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        // if (event.target === modal) {
        //     closeModal();
        // }
        // Prevent closing summary modal on window click
        // if (event.target === summaryModal) {
        //     closeSummaryModal();
        // }
    });

    // Clear filter button
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function() {
            clearFilter();
        });
    }
}

   const searchBox = document.getElementById('txtstaffsearchBox');
// const filterIndicator = document.getElementById('divTestcode');
// searchBox.addEventListener('input', function() { 
//     console.log('Input changed:', this.value);
//     filterIndicator.value = this.value;
//     selectTestCode(this.value);
// });

function selectValue(value){
     searchBox.value = value;
    searchBox.dispatchEvent(new Event('input'));
}


// document.getElementById('dpprogramme').addEventListener('change', function() {
//     selectValue(this.value);
// });

function filteredSearch(filteredData){
    if(selectedWG !== null && selectedWG !== ''){
     filteredData = workgroupData.filter(item => {
        // const hasWGFilter = selectedWG && selectedWG !== '';
        // const hasTestCodeFilter = selectedItemCode && selectedItemCode !== '';
        
        // // If no filters are set, show all items
        // if (!hasWGFilter && !hasTestCodeFilter) {
        //     return true;
        // }
        
        // // If only WorkGroup filter is set
        // if (hasWGFilter && !hasTestCodeFilter) {
        //     return item.WorkGroup.includes(selectedWG);
        // }
        
        // // If only TestCode filter is set
        // if (!hasWGFilter && hasTestCodeFilter) {
        //     return item.TestCode.includes(selectedItemCode);
        // }
        
        // If both filters are set, match either one (OR logic)
        return item.WorkGroup.includes(selectedWG);// || item.TestCode.includes(selectedItemCode);
    });

       if(filteredData?.length > 0 && selectedWG !== null && selectedWG !== ''){
        selectTestCode(filteredData[0].TestCode);
      //  document.getElementById('divTestcode').value = filteredData[0].TestCode;
        }
    // Sort data if column is selected
    if (sortColumn !== null) {
        filteredData = sortData(filteredData, sortColumn);
    }
}else{
    filteredData = workgroupData.filter(item => item.TestCode.toLowerCase().includes(document.getElementById('divTestcode').value.toLowerCase()));
    renderWorkgroupTable();
}
}

function renderWorkgroupTable() {
    const tbody = document.getElementById('workgroupTableBody');
    const searchTerm = document.getElementById('dpprogramme').value.toLowerCase();



// Somewhere else in your code, when a value is selected:
    searchBox.value = document.getElementById('txtstaffsearchBox').value;

// Trigger the event manually so the listener runs
//
//       searchText =
//     document.getElementById("wgsearchBoxtwo").value.toLowerCase() ||
//     document.getElementById("staffsearchBox").value.toLowerCase();

//   // filter rows

//   filtered = rows.filter((row) =>
//     row.innerText.toLowerCase().includes(searchText),
//   );

    // Filter data
    if(selectedWG !== null && selectedWG !== ''){
         filteredData = workgroupData.filter(item => item.WorkGroup.toLowerCase().includes(searchTerm));
    }else{
            filteredData = workgroupData.filter(item => item.TestCode.toLowerCase().includes(searchBox.value.toLowerCase()));
    }
  // filteredData = workgroupData.filter(item => item.TestCode.toLowerCase().includes(searchTerm) || item.WorkGroup.toLowerCase().includes(searchTerm));

    // Apply sorting if a column is selected
    if (sortColumn !== null) {
        filteredData = sortData(filteredData, sortColumn);
    }

    // Pagination
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / workgroupRecordsPerPage);
    const startIndex = (currentWorkgroupPage - 1) * workgroupRecordsPerPage;
    const endIndex = startIndex + workgroupRecordsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Clear tbody
    tbody.innerHTML = '';

    // Render rows
    if (paginatedData.length === 0) {
        document.getElementById('divTestcode').value = '';
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No records found for WorkGroup: ${selectedWG}</td></tr>`;
    } else {
        paginatedData.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const isSelected = selectedTestCode === item.TestCode ? 'style="background-color: #d8e5f4; cursor: pointer;"' : 'style="cursor: pointer;"';
            const row = `
                <tr ${isSelected} onclick="selectTestCode('${item.TestCode}')" data-testcode="${item.TestCode}">
                    <td class="govuk-table__cell">${item.TestCode}</td>
                    <td class="govuk-table__cell">${item.WorkGroup}</td>
                    <td class="govuk-table__cell">${item.PlanPortfolio}</td>
                    <td class="govuk-table__cell" onclick="event.stopPropagation()">
                        <button class="edit-btn" data-item='${JSON.stringify(item)}'  data-index="${actualIndex}" onclick="editWorkgroupWithData(event)"  style="background: none; border: none; cursor: pointer;">
                            <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                        </button>
                        <button class="delete-btn" onclick="deleteWorkgroup(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    // Render pagination
    renderPagination('workgroupPagination', currentWorkgroupPage, totalPages, function(page) {
        currentWorkgroupPage = page;
        renderWorkgroupTable();
    });
}

function renderSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');
   const searchTerm = (selectedTestCode || '').toLowerCase();;
//    
//     const clearFilterBtn = document.getElementById('clearFilterBtn');
//     filterIndicator.innerText =  document.getElementById('txtstaffsearchBox').value;
//     alert(filterIndicator,"filterIndicator")
    // Update filter indicator
    if (selectedTestCode) {
       // filterIndicator.textContent = `(Filtered by: ${selectedTestCode})`;
      //  filterIndicator.style.display = 'block';
      //  clearFilterBtn.style.display = 'inline-block';
    } else {
       // filterIndicator.textContent = '';
      //  filterIndicator.style.display = 'block';
      //  clearFilterBtn.style.display = 'none';
    }
    // Filter data
      summaryFilteredData = summaryData.filter(item => {
        // If no test code is selected, show all items
        if(document.getElementById('dpprogramme').value == ''){
            if (!searchTerm) {
                return true;
            }
            return item.TestCode.toLowerCase().includes(searchTerm);
        }else{
            if(searchTerm == ""){
                return false; // Return false to filter out all items
            }
            return item.TestCode.toLowerCase().includes(searchTerm);
        }
    });

    // Apply sorting if a column is selected
    if (sortSummaryColumn !== null) {
        summaryFilteredData = sortSummaryData(summaryFilteredData, sortSummaryColumn);
    }

    // Pagination
    const totalRecords = summaryFilteredData.length;
    const totalPages = Math.ceil(totalRecords / summaryRecordsPerPage);
    const startIndex = (currentSummaryPage - 1) * summaryRecordsPerPage;
    const endIndex = startIndex + summaryRecordsPerPage;
    const paginatedData = summaryFilteredData.slice(startIndex, endIndex);

    // Clear tbody
    tbody.innerHTML = '';

    // Render rows
    if (paginatedData.length === 0) {
     //   document.getElementById('divTestcode').value = '';
        const message = selectedTestCode 
            ? `No records found for TestCode: ${selectedTestCode}` 
            : `No records found`;
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center;">${message}</td></tr>`;
    } else {
       
        paginatedData.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const activeClass = item.Active === 'Yes' ? 'style="color: green;"' : 'style="color: red;"';
            const defraClass = item.DefraProject === 'Yes' ? 'style="color: green;"' : 'style="color: orange;"';
            const row = `
                <tr>
                    <td class="govuk-table__cell">${item.TestCode}</td>
                    <td class="govuk-table__cell">${item.Project}</td>
                    <td class="govuk-table__cell">${item.Buyer}</td>
                    <td class="govuk-table__cell">${item.UnitPrice}</td>
                    <td class="govuk-table__cell">${item.No}</td>
                    <td class="govuk-table__cell" ${activeClass}><strong>${item.Active === "Yes" ? "1" : "0"}</strong></td>
                    <td class="govuk-table__cell" ${defraClass}> 
                     <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
                        <div class="govuk-checkboxes__item">
                            <input class="govuk-checkboxes__input" id="selectRow${index}" type="checkbox" ${item.DefraProject == "No" ? "" : "checked"} checkbox.checked ? "true" : "false" disabled/>
                            <label class="govuk-label govuk-checkboxes__label sup_label_auto_width" for="selectRow${index}" style="padding: 0;">  </label>   
                        </div> 
                    </div>
                    </td>
                    <td class="govuk-table__cell">${item.RecUnitPrice}</td>
                    <td class="govuk-table__cell">
                        <button class="edit-btn" onclick="editTest(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                        </button>
                        <button class="delete-btn" onclick="deleteTest(${actualIndex})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    // Render pagination
    renderPagination('summaryPagination', currentSummaryPage, totalPages, function(page) {
        currentSummaryPage = page;
        renderSummaryTable();
    });
      
}

function renderPagination(elementId, currentPage, totalPages, onPageClick) {
    const paginationContainer = document.getElementById(elementId);
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button - always enabled
    const prevItem = document.createElement('li');
    prevItem.className = 'govuk-pagination__item govuk-pagination__item--prev';
    prevItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="prev">
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        Previous
    </a>`;
    prevItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            onPageClick(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevItem);

    // Page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        if (i === currentPage) {
            pageItem.className = 'govuk-pagination__item govuk-pagination__item--current';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>`;
        } else {
            pageItem.className = 'govuk-pagination__item';
            pageItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}">${i}</a>`;
            pageItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                onPageClick(i);
            });
        }
        paginationContainer.appendChild(pageItem);
    }

    // Next button - always enabled
    const nextItem = document.createElement('li');
    nextItem.className = 'govuk-pagination__item govuk-pagination__item--next';
    nextItem.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" rel="next">
        Next
        <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
    </a>`;
    nextItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            onPageClick(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextItem);
}

function setupSorting() {
    const headers = document.querySelectorAll('#workgroupTable th[data-column]');
    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            sortColumn = index;
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            
            // Update sort indicators
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) existingIcon.remove();
            });
            
            header.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            const icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.innerHTML = sortDirection === 'asc' ? '▲' : '▼';
            header.appendChild(icon);
            
            renderWorkgroupTable();
        });
    });
}

function setupSummarySorting() {
    const headers = document.querySelectorAll('#summaryTable th[data-column]');
    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            sortSummaryColumn = index;
            sortSummaryDirection = sortSummaryDirection === 'asc' ? 'desc' : 'asc';
            
            // Update sort indicators
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
                const existingIcon = h.querySelector('.sort-icon');
                if (existingIcon) existingIcon.remove();
            });
            
            header.classList.add(sortSummaryDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            const icon = document.createElement('span');
            icon.className = 'sort-icon';
            icon.innerHTML = sortSummaryDirection === 'asc' ? '▲' : '▼';
            header.appendChild(icon);
            
            renderSummaryTable();
        });
    });
}

function sortData(data, columnIndex) {
    const columns = ['TestCode', 'WorkGroup', 'PlanPortfolio'];
    const key = columns[columnIndex];
    
    return data.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function sortSummaryData(data, columnIndex) {
    const columns = ['TestCode', 'Project', 'Buyer', 'UnitPrice', 'No', 'Active', 'DefraProject', 'RecUnitPrice'];
    const key = columns[columnIndex];
    
    return data.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        
        // Handle numeric fields
        if (key === 'No') {
            valA = parseInt(valA) || 0;
            valB = parseInt(valB) || 0;
        }
        
        // Handle price fields (remove currency symbols for comparison)
        if (key === 'UnitPrice' || key === 'RecUnitPrice') {
            valA = parseFloat(valA.replace(/[£$]/g, '')) || 0;
            valB = parseFloat(valB.replace(/[£$]/g, '')) || 0;
        }
        
        if (valA < valB) return sortSummaryDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortSummaryDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function openModal(item = null,index = null) {
    editingIndex = index;
    
    // Initialize workgroup dropdown in modal
    const workgroupDropdown = modal.querySelector('[data-source="workgroups-modal"]');
    if (workgroupDropdown && !workgroupDropdown.dataset.initialized) {
        initModalWorkgroupDropdown(workgroupDropdown, workgroupItemsData);
        workgroupDropdown.dataset.initialized = 'true';
    }
    
    if (item !== null) {
        // Edit mode
       // const item = workgroupData[index];
        document.getElementById('txtmodal-testcode').value = item.TestCode;
        document.getElementById('txtmodal-testcode').readOnly = true;
        document.getElementById('txtmodal-workgroup').value = item.WorkGroup;
       // document.getElementById('txtmodal-workgroup').value = document.getElementById('dpprogramme').value;
        //document.getElementById('dpprogramme').value
        document.getElementById('txtmodal-planportfolio').value = item.PlanPortfolio;
        document.getElementById('workgroupModalLabel').textContent = 'Edit Test Code';
    } else {
        // Add mode
        document.getElementById('formAddWorkgroup').reset();
        document.getElementById('txtmodal-workgroup').value = document.getElementById('dpprogramme').value;
        // Prefill test code from divTestcode if it has a value
        const divTestcodeValue = document.getElementById('divTestcode').value;
        if (divTestcodeValue && divTestcodeValue.trim() !== '') {
            document.getElementById('txtmodal-testcode').value = divTestcodeValue.trim();
          //  document.getElementById('txtmodal-testcode').readOnly = true;
        } else {
            document.getElementById('txtmodal-testcode').readOnly = false;
        }
        
        document.getElementById('workgroupModalLabel').textContent = 'Add Test Code';
    }
    
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('formAddWorkgroup').reset();
        editingIndex = null;
    }, 300);
}

function saveWorkgroup() {
    const testcode = document.getElementById('txtmodal-testcode').value.trim();
    const workgroup = document.getElementById('txtmodal-workgroup').value.trim();
    const planportfolio = document.getElementById('txtmodal-planportfolio').value.trim();

    // Validation
    if (!testcode || !workgroup || !planportfolio) {
        alert('Please fill in all required fields');
        return;
    }

    const newEntry = {
        TestCode: testcode,
        WorkGroup: workgroup,
        PlanPortfolio: planportfolio
    };

    if (editingIndex !== null) {
        // Update existing entry
        workgroupData[editingIndex] = newEntry;
        alert('Test Code updated successfully!');
    } else {
        // Add new entry
        workgroupData.push(newEntry);
        alert('Test Code added successfully!');
    }

    closeModal();
    renderWorkgroupTable();
}

function editWorkgroupWithData(event) {
    const button = event.currentTarget;
    const item = JSON.parse(button.dataset.item);
    const index = parseInt(button.dataset.index);
    console.log('Item:', item);
    openModal(item, index);
}

function deleteWorkgroup(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        workgroupData.splice(index, 1);
        renderWorkgroupTable();
    }
}

function editTest(index) {
    openSummaryModal(index);
}

function deleteTest(index) {
    if (confirm('Are you sure you want to delete this test requirement?')) {
        // Find the actual item in summaryData based on the filtered index
        const itemToDelete = summaryFilteredData[index];
        const actualIndex = summaryData.findIndex(item => 
            item.TestCode === itemToDelete.TestCode && 
            item.Project === itemToDelete.Project &&
            item.Buyer === itemToDelete.Buyer
        );
        
        if (actualIndex !== -1) {
            summaryData.splice(actualIndex, 1);
            renderSummaryTable();
            alert('Test requirement deleted successfully!');
        }
    }
}

function openSummaryModal(index = null) {
    const summaryModal = document.getElementById('addSummaryModal');
    editingSummaryIndex = index;
    
    // Initialize project dropdown
    const projectDropdown = summaryModal.querySelector('[data-source="projects"]');
    if (projectDropdown && !projectDropdown.dataset.initialized) {
        initProjectDropdown(projectDropdown, projectCodesData);
        projectDropdown.dataset.initialized = 'true';
    }
    
    if (index !== null) {
        // Edit mode - get the item from filtered data
        const item = summaryFilteredData[index];
        document.getElementById('txtmodal-summary-testcode').value = item.TestCode;
      //  document.getElementById('txtmodal-summary-testcode').readOnly = true;
        document.getElementById('txtmodal-summary-project').value = item.Project;
        document.getElementById('txtmodal-summary-buyer').value = item.Buyer;
        // Remove currency symbols (£, $) before setting values
        document.getElementById('txtmodal-summary-unitprice').value = item.UnitPrice.replace(/[£$]/g, '');
        document.getElementById('txtmodal-summary-no').value = item.No;
        document.getElementById('txtmodal-summary-active').value = item.Active;
        document.getElementById('txtmodal-summary-defraproject').value = item.DefraProject;
        document.getElementById('txtmodal-summary-recunitprice').value = item.RecUnitPrice.replace(/[£$]/g, '');
        document.getElementById('summaryModalLabel').textContent = 'Edit Test Requirement';
    } else {
        // Add mode
        document.getElementById('formAddSummary').reset();
        
        // Prefill test code from selection if available
        if (selectedTestCode) {
            document.getElementById('txtmodal-summary-testcode').value = selectedTestCode;
            //document.getElementById('txtmodal-summary-testcode').readOnly = true;
        } else {
            document.getElementById('txtmodal-summary-testcode').readOnly = false;
        }
        
        document.getElementById('summaryModalLabel').textContent = 'Add Test Requirement';
    }
    
    summaryModal.style.display = 'block';
    setTimeout(() => {
        summaryModal.classList.add('show');
    }, 10);
}

function closeSummaryModal() {
    const summaryModal = document.getElementById('addSummaryModal');
    summaryModal.classList.remove('show');
    setTimeout(() => {
        summaryModal.style.display = 'none';
        document.getElementById('formAddSummary').reset();
        editingSummaryIndex = null;
    }, 300);
}

function saveSummary() {
    const testcode = document.getElementById('txtmodal-summary-testcode').value.trim();
    const project = document.getElementById('txtmodal-summary-project').value.trim();
    const buyer = document.getElementById('txtmodal-summary-buyer').value.trim();
    const unitpriceValue = document.getElementById('txtmodal-summary-unitprice').value.trim();
    const unitprice = `£${parseFloat(unitpriceValue).toFixed(2)}`;
    const no = document.getElementById('txtmodal-summary-no').value.trim();
    const active = document.getElementById('txtmodal-summary-active').value;
    const defraproject = document.getElementById('txtmodal-summary-defraproject').value;
    const recunitpriceValue = document.getElementById('txtmodal-summary-recunitprice').value.trim();
    const recunitprice = `£${parseFloat(recunitpriceValue).toFixed(2)}`;

    // Validation
    if (!testcode || !project || !buyer || !unitprice || !no || !active || !defraproject || !recunitprice) {
        alert('Please fill in all required fields');
        return;
    }

    const newEntry = {
        TestCode: testcode,
        Project: project,
        Buyer: buyer,
        UnitPrice: unitprice,
        No: no,
        Active: active,
        DefraProject: defraproject,
        RecUnitPrice: recunitprice
    };

  

    if (editingSummaryIndex !== null) {
        // Update existing entry - find in original data
        const itemToEdit = summaryFilteredData[editingSummaryIndex];
        const actualIndex = summaryData.findIndex(item => 
            item.TestCode === itemToEdit.TestCode && 
            item.Project === itemToEdit.Project &&
            item.Buyer === itemToEdit.Buyer
        );
        
        if (actualIndex !== -1) {
            summaryData[actualIndex] = newEntry;
            alert('Test requirement updated successfully!');
        }
    } else {
          let isprojectcodeexist = summaryData.filter(item => item.Project === project && item.TestCode === testcode).length > 0;
            if(isprojectcodeexist){
                alert(`Project code ${project} already exists with ${testcode}. Please use a unique project code.`);
                return;
            }
        // Add new entry
        summaryData.push(newEntry);
        alert('Test requirement added successfully!');
    }

    closeSummaryModal();
    renderSummaryTable();
}

function selectTestCode(testCode) {
    // Set the selected test code
    selectedTestCode = testCode;
   document.getElementById('divTestcode').value = `${testCode}`;
    if(document.getElementById('dpprogramme').value === "" || document.getElementById('dpprogramme').value === null){
        document.getElementById('txtmodal-testcode').value = `${testCode}`;
       // document.getElementById('txtmodal-testcode').readOnly = true;
    }

    // Reset summary table to first page
    currentSummaryPage = 1;
    
    // Re-render both tables to update selection highlight and filter
    renderWorkgroupTable();
    renderSummaryTable();
}

function clearFilter() {
    // Clear the selected test code
    selectedTestCode = null;
    
    // Reset summary table to first page
    currentSummaryPage = 1;
    
    // Re-render both tables
    renderWorkgroupTable();
    renderSummaryTable();
}

// EXPORT TO EXCEL - Summary Table
document.getElementById("exportSummaryExcel").addEventListener("click", exportSummaryToExcel);

function exportSummaryToExcel() {
    const rows = [];
    const table = document.getElementById('summaryTable');

    // Table header
    rows.push([
        "TestCode",
        "Project",
        "Buyer",
        "UnitPrice",
        "No",
        "Active",
        "Defra Project",
        "RecUnitPrice"
    ]);

    // Table body - get visible rows only
    table.querySelectorAll("tbody tr").forEach((el) => {
        // skip "No record" row
        if (el.querySelector(".norecords") || el.textContent.includes("No records found")) return;

        // skip hidden rows
        if (el.style.display === "none") return;

        const tds = el.querySelectorAll("td");
        
        // Make sure we have enough cells (exclude Actions column)
        if (tds.length >= 8) {
            rows.push([
                tds[0].innerText.trim(), // TestCode
                tds[1].innerText.trim(), // Project
                tds[2].innerText.trim(), // Buyer
                tds[3].innerText.trim(), // UnitPrice
                tds[4].innerText.trim(), // No
                tds[5].innerText.trim(), // Active
                tds[6].querySelector('input[type="checkbox"]').checked ? "true" : "false", // Defra Project
                tds[7].innerText.trim()  // RecUnitPrice
                // Skip tds[8] which is Actions column
            ]);
        }
    });

    if (rows.length === 1) {
        alert("No data to export");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);

    XLSX.utils.book_append_sheet(wb, ws, "Test Requirements");

    XLSX.writeFile(wb, "test-requirements.xlsx");
}

document.getElementById('divTestcode').addEventListener('input', function() {
    selectedTestCode = this.value.trim();
    currentSummaryPage = 1;
  //  renderWorkgroupTable();
    renderSummaryTable();
});

 document.getElementById('txtmodal-summary-testcode').addEventListener('change', function() { 
     if (this.value.trim() !== '') {
         if (generatedRandomPrice == null || generatedRandomPrice === undefined || generatedRandomPrice === '') {
             generatedRandomPrice = (Math.floor(Math.random() * 900) + 100).toFixed(2);
         }
         document.getElementById('txtmodal-summary-recunitprice').value = generatedRandomPrice;
     }
 });

const resizers = document.querySelectorAll(".resizer");

resizers.forEach((resizer) => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation(); // prevent sort click

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