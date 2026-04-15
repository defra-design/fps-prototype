 let testPurchaseData = [];

        // Pagination variables
        let currentPage = 1;
        let recordsPerPage = 10;
        let filteredData = [];
        let isAddMode = false;
        let editingTestCode = null;
        let editingIndex = null;
        let buyerList = [];

        // Populate select dropdown
        function populateSelect(selectElement, data, valueKey, textKey) {
            if (!selectElement) return;
            
            // Build options HTML with selected attribute on default option
            let optionsHTML = '<option value="" selected>-- Select buyer --</option>';
            
            data.forEach(item => {
                optionsHTML += `<option value="${item[valueKey]}">${item[textKey]}</option>`;
            });
            
            selectElement.innerHTML = optionsHTML;
            
            // Force selection after DOM update
            setTimeout(() => {
                selectElement.selectedIndex = 0;
                selectElement.value = '';
            }, 0);
        }

        // Load buyer list
        async function loadBuyerList() {
            try {
                const response = await fetch('../js/pact_js/data/project-codes.json');
                if (!response.ok) throw new Error('Failed to load buyer list');
                buyerList = await response.json();
                
                // Populate buyer dropdown
                populateSelect(document.getElementById('modal-dpbuyer'), buyerList, 'code', 'code');
                
                return true;
            } catch (error) {
                console.error('Error loading buyer list:', error);
                return false;
            }
        }

        // Render table function
        function renderTable() {
            const tbody = document.getElementById('testpurchasereqTableBody');
            tbody.innerHTML = '';

            const startIndex = (currentPage - 1) * recordsPerPage;
            const endIndex = startIndex + recordsPerPage;
            const pageData = filteredData.slice(startIndex, endIndex);

            if (pageData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="norecords" style="text-align: center;">No records found</td></tr>';
                return;
            }

            pageData.forEach(item => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td class="govuk-table__cell">${item.TestCode || ''}</td>
                    <td class="govuk-table__cell">${item.NoRequired || ''}</td>
                    <td class="govuk-table__cell">${item.UnitPrice || '0'}</td>
                   
                    <td class="govuk-table__cell" style="text-align: center;">
                        <button class="edit-btn" onclick="handleEditTest('${item.TestCode}', ${startIndex + pageData.indexOf(item)})" style="background: none; border: none; cursor: pointer; margin-right: 8px;">
                            <img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20" />
                        </button>
                        <button class="delete-btn" onclick="handleDeleteTest('${item.TestCode}', ${startIndex + pageData.indexOf(item)})" style="background: none; border: none; cursor: pointer;">
                            <img src="../images/trash-can-regular-full.svg" alt="Delete" width="20" />
                        </button>
                    </td>
                `;
            });

            renderPagination();
        }

        // Render pagination
        function renderPagination() {
            const pagination = document.getElementById('milestonePagination');
            pagination.innerHTML = '';

            const totalPages = Math.ceil(filteredData.length / recordsPerPage);

            if (totalPages <= 1) return;

            // Previous button
            const prevLi = document.createElement('li');
            prevLi.className = `govuk-pagination__item ${currentPage === 1 ? 'disabled' : ''}`;
            prevLi.innerHTML = `
                <a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); ${currentPage > 1 ? 'goToPage(' + (currentPage - 1) + ')' : ''}">
                    <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
                    </svg>
                    <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
                </a>
            `;
            pagination.appendChild(prevLi);

            // Page numbers
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                const li = document.createElement('li');
                li.className = `govuk-pagination__item ${i === currentPage ? 'govuk-pagination__item--current' : ''}`;
                li.innerHTML = `<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(${i})">${i}</a>`;
                pagination.appendChild(li);
            }

            // Next button
            const nextLi = document.createElement('li');
            nextLi.className = `govuk-pagination__next ${currentPage === totalPages ? 'disabled' : ''}`;
            nextLi.innerHTML = `
                <a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); ${currentPage < totalPages ? 'goToPage(' + (currentPage + 1) + ')' : ''}" rel="next">
                    <span class="govuk-pagination__link-title">Next</span>
                    <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
                    </svg>
                </a>
            `;
            pagination.appendChild(nextLi);
        }

        // Go to page function
        function goToPage(page) {
            const totalPages = Math.ceil(filteredData.length / recordsPerPage);
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderTable();
        }

        // Search functionality
        function handleSearch(e) {
            const searchTerm = e.target.value.toLowerCase();
            const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
            
            // If project code is empty, show no records
            if (projectCodeFilter === '') {
                filteredData = [];
            } else {
                filteredData = testPurchaseData.filter(item => {
                    const matchesSearch = (item.TestCode && item.TestCode.toString().toLowerCase().includes(searchTerm)) ||
                           (item.UnitPrice && item.UnitPrice.toString().toLowerCase().includes(searchTerm)) ||
                           (item.NoRequired && item.NoRequired.toString().toLowerCase().includes(searchTerm));
                    const matchesProjectCode = item.Projectcode && item.Projectcode.toLowerCase().includes(projectCodeFilter.toLowerCase());
                    return matchesSearch && matchesProjectCode;
                });
            }
            currentPage = 1;
            renderTable();
        }
        
        // Handle project code filter
        function handleProjectCodeFilter(e) {
            const projectCode = e.target.value.trim();
            const searchTerm = document.getElementById('testPurchaseSearch')?.value.toLowerCase() || '';
            
            if (projectCode === '') {
                // If project code is empty, show no records
                filteredData = [];
            } else {
                // Apply both project code and search filters
                filteredData = testPurchaseData.filter(item => {
                    const matchesProjectCode = item.Projectcode && item.Projectcode.toLowerCase().includes(projectCode.toLowerCase());
                    const matchesSearch = searchTerm === '' ||
                        (item.TestCode && item.TestCode.toString().toLowerCase().includes(searchTerm)) ||
                        (item.UnitPrice && item.UnitPrice.toString().toLowerCase().includes(searchTerm)) ||
                        (item.NoRequired && item.NoRequired.toString().toLowerCase().includes(searchTerm));
                    return matchesProjectCode && matchesSearch;
                });
            }
            
            currentPage = 1;
            renderTable();
        }
        
        document.getElementById('testPurchaseSearch').addEventListener('input', handleSearch);
        document.getElementById('sp-projectcode').addEventListener('input', handleProjectCodeFilter);

        // Records per page change
        document.getElementById('recordsPerPage').addEventListener('change', function(e) {
            recordsPerPage = parseInt(e.target.value);
            currentPage = 1;
            renderTable();
        });

        // Sorting functionality
        const headers = document.querySelectorAll("#testPurchaseReqTable th[data-column]");
        const columnNames = ['TestCode', 'UnitPrice', 'NoRequired', '', '', '', '', ''];

        headers.forEach((header, index) => {
            header.addEventListener("click", function () {
                const columnIndex = parseInt(this.dataset.column);
                const columnName = columnNames[columnIndex];
                const currentOrder = this.dataset.order || "asc";
                const newOrder = currentOrder === "asc" ? "desc" : "asc";

                // Remove sorting icons from all headers
                headers.forEach(h => {
                    h.classList.remove("sorted-asc", "sorted-desc");
                    const existingIcon = h.querySelector(".sort-icon");
                    if (existingIcon) {
                        existingIcon.remove();
                    }
                });

                // Update the order for the clicked header
                this.dataset.order = newOrder;

                // Add sorting icon to the clicked header
                const sortIcon = document.createElement("span");
                sortIcon.className = "sort-icon";
                
                if (newOrder === "asc") {
                    sortIcon.innerHTML = " ▲";
                    this.classList.add("sorted-asc");
                } else {
                    sortIcon.innerHTML = " ▼";
                    this.classList.add("sorted-desc");
                }
                
                this.appendChild(sortIcon);

                // Sort data
                filteredData.sort((a, b) => {
                    let aVal = a[columnName];
                    let bVal = b[columnName];
                    
                    // Handle UnitPrice (currency string)
                    if (columnName === 'UnitPrice') {
                        aVal = parseFloat((aVal || '0').replace(/[£,]/g, ''));
                        bVal = parseFloat((bVal || '0').replace(/[£,]/g, ''));
                    }
                    // Handle NoRequired (numeric)
                    else if (columnName === 'NoRequired') {
                        aVal = Number(aVal || 0);
                        bVal = Number(bVal || 0);
                    }
                    
                    if (newOrder === "asc") {
                        if (aVal < bVal) return -1;
                        if (aVal > bVal) return 1;
                        return 0;
                    } else {
                        if (aVal < bVal) return 1;
                        if (aVal > bVal) return -1;
                        return 0;
                    }
                });
                
                renderTable();
            });
        });

        // Load data from JSON file
        async function loadTestPurchaseData() {
            try {
                const response = await fetch('../js/pact_js/data/test-purchase.json');
                if (!response.ok) {
                    throw new Error('Failed to load test purchase data');
                }
                const data = await response.json();
                testPurchaseData = data;
                
                // Check if project code is empty on initial load
                const initialProjectCode = document.getElementById('sp-projectcode')?.value.trim() || '';
                if (initialProjectCode === '') {
                    filteredData = [];
                } else {
                    filteredData = [...testPurchaseData];
                }
                
                // Initialize table after data is loaded
                renderTable();
                
                // Handle URL parameters after data is loaded
                const params = new URLSearchParams(window.location.search);
                const encoded = params.get("data");
                if (encoded) {
                    const urlData = JSON.parse(atob(encoded));
                    document.getElementById("sp-projectcode").value = urlData.jobcode;
                    
                    // Apply filter after setting project code from URL
                    const projectCodeInput = document.getElementById('sp-projectcode');
                    if (projectCodeInput && projectCodeInput.value.trim() !== '') {
                        handleProjectCodeFilter({ target: projectCodeInput });
                    }
                }
            } catch (error) {
                console.error('Error loading test purchase data:', error);
                showGovukAlert('Failed to load test purchase requirements. Please refresh the page.');
            }
        }

        // Initialize - Load data first
        loadTestPurchaseData();
        loadBuyerList();

        // ==================== CRUD FUNCTIONS ====================

        // Open modal for adding new test
        function openAddTestModal() {
            isAddMode = true;
            editingTestCode = null;
            editingIndex = null;
            document.getElementById('modal-dpbuyer').value = document.getElementById('sp-projectcode').value.trim();
            document.getElementById('modal-dpbuyer').disabled = false;
            // Clear modal fields
            document.getElementById('modal-testcode').value = '';
            document.getElementById('modal-unitprice').value = '';
            document.getElementById('modal-norequired').value = '';
            
            // Clear error states
            document.getElementById('modal-dpbuyer').classList.remove('govuk-select--error');
            document.getElementById('modal-testcode').classList.remove('govuk-input--error');
            document.getElementById('modal-unitprice').classList.remove('govuk-input--error');
            document.getElementById('modal-norequired').classList.remove('govuk-input--error');
            
            // Hide error messages
            document.getElementById('modal-dpbuyer-error').style.display = 'none';
            document.getElementById('modal-testcode-error').style.display = 'none';
            document.getElementById('modal-unitprice-error').style.display = 'none';
            document.getElementById('modal-norequired-error').style.display = 'none';
            
            document.getElementById('testModalLabel').textContent = 'Add Test';
            openTestModal();
        }

        // Handle edit test
        function handleEditTest(testCode, index) {
            const item = filteredData[index];
            if (item) {
                isAddMode = false;
                editingTestCode = testCode;
                editingIndex = index;
                document.getElementById('modal-dpbuyer').value = document.getElementById('sp-projectcode').value.trim();
                document.getElementById('modal-dpbuyer').disabled = true;
                // Populate modal fields
                document.getElementById('modal-testcode').value = item.TestCode;
                document.getElementById('modal-unitprice').value = item.UnitPrice.replace('£', '').replace(',', '');
                document.getElementById('modal-norequired').value = item.NoRequired;
                
                // Clear error states
                document.getElementById('modal-dpbuyer').classList.remove('govuk-select--error');
                document.getElementById('modal-testcode').classList.remove('govuk-input--error');
                document.getElementById('modal-unitprice').classList.remove('govuk-input--error');
                document.getElementById('modal-norequired').classList.remove('govuk-input--error');
                
                // Hide error messages
                document.getElementById('modal-dpbuyer-error').style.display = 'none';
                document.getElementById('modal-testcode-error').style.display = 'none';
                document.getElementById('modal-unitprice-error').style.display = 'none';
                document.getElementById('modal-norequired-error').style.display = 'none';
                
                document.getElementById('testModalLabel').textContent = 'Edit Test';
                openTestModal();
            }
        }

        // Open test modal
        function openTestModal() {
            const modal = document.getElementById('addTestModal');
            if (modal) {
                modal.classList.add('show');
            }
        }

        // Close test modal
        function closeTestModal() {
            const modal = document.getElementById('addTestModal');
            if (modal) {
                modal.classList.remove('show');
            }
            
            // Clear error states when closing
            document.getElementById('modal-dpbuyer').classList.remove('govuk-select--error');
            document.getElementById('modal-testcode').classList.remove('govuk-input--error');
            document.getElementById('modal-unitprice').classList.remove('govuk-input--error');
            document.getElementById('modal-norequired').classList.remove('govuk-input--error');
            
            // Hide error messages
            document.getElementById('modal-dpbuyer-error').style.display = 'none';
            document.getElementById('modal-testcode-error').style.display = 'none';
            document.getElementById('modal-unitprice-error').style.display = 'none';
            document.getElementById('modal-norequired-error').style.display = 'none';
            
            isAddMode = false;
            editingTestCode = null;
            editingIndex = null;
        }

        // Handle save test
        function handleSaveTest() {
            // Get form values
            const buyer = document.getElementById('modal-dpbuyer').value.trim();
            const testCode = document.getElementById('modal-testcode').value.trim();
            const unitPrice = document.getElementById('modal-unitprice').value.trim();
            const noRequired = document.getElementById('modal-norequired').value.trim();
            
            // Clear previous error states
            document.getElementById('modal-dpbuyer').classList.remove('govuk-select--error');
            document.getElementById('modal-testcode').classList.remove('govuk-input--error');
            document.getElementById('modal-unitprice').classList.remove('govuk-input--error');
            document.getElementById('modal-norequired').classList.remove('govuk-input--error');
            
            // Hide error messages
            document.getElementById('modal-dpbuyer-error').style.display = 'none';
            document.getElementById('modal-testcode-error').style.display = 'none';
            document.getElementById('modal-unitprice-error').style.display = 'none';
            document.getElementById('modal-norequired-error').style.display = 'none';
            
            // Validate required fields
            let hasError = false;
            if (!buyer) {
                document.getElementById('modal-dpbuyer').classList.add('govuk-select--error');
                document.getElementById('modal-dpbuyer-error').style.display = 'block';
                hasError = true;
            }
            if (!testCode) {
                document.getElementById('modal-testcode').classList.add('govuk-input--error');
                document.getElementById('modal-testcode-error').style.display = 'block';
                hasError = true;
            }
            if (!unitPrice) {
                document.getElementById('modal-unitprice').classList.add('govuk-input--error');
                document.getElementById('modal-unitprice-error').style.display = 'block';
                hasError = true;
            }
            if (!noRequired) {
                document.getElementById('modal-norequired').classList.add('govuk-input--error');
                document.getElementById('modal-norequired-error').style.display = 'block';
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // Format unit price with currency symbol
            const formattedUnitPrice = '£' + parseFloat(unitPrice).toFixed(2);
            
            if (isAddMode) {

                // let id = testPurchaseData.findIndex((el)=> el.TestCode === testCode);
                // if(id !== -1){
                //     showGovukAlert('Test Code must be unique. A test with this code already exists.');
                //     return;
                // }

                // Add new test
                const newItem = {
                    TestCode: testCode,
                    UnitPrice: formattedUnitPrice,
                    NoRequired: parseInt(noRequired),
                    Projectcode: document.getElementById('sp-projectcode')?.value.trim() || ''
                };
                testPurchaseData.push(newItem);
                
                // Update filtered data based on current filters
                const searchTerm = document.getElementById('testPurchaseSearch')?.value.toLowerCase() || '';
                const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
                
                if (projectCodeFilter === '') {
                    filteredData = [];
                } else {
                    filteredData = testPurchaseData.filter(item => {
                        const matchesSearch = searchTerm === '' ||
                            (item.TestCode && item.TestCode.toString().toLowerCase().includes(searchTerm)) ||
                            (item.UnitPrice && item.UnitPrice.toString().toLowerCase().includes(searchTerm)) ||
                            (item.NoRequired && item.NoRequired.toString().toLowerCase().includes(searchTerm));
                        const matchesProjectCode = item.Projectcode && item.Projectcode.toLowerCase().includes(projectCodeFilter.toLowerCase());
                        return matchesSearch && matchesProjectCode;
                    });
                }
            } else {
                // Edit existing test - find in original array
                const originalIndex = testPurchaseData.findIndex(item => 
                    item.TestCode === editingTestCode && 
                    testPurchaseData.indexOf(item) === testPurchaseData.indexOf(filteredData[editingIndex])
                );
                
                if (originalIndex !== -1) {
                    testPurchaseData[originalIndex] = {
                        ...testPurchaseData[originalIndex],
                        TestCode: testCode,
                        UnitPrice: formattedUnitPrice,
                        NoRequired: parseInt(noRequired)
                    };
                    
                    // Update filtered data
                    const searchTerm = document.getElementById('testPurchaseSearch')?.value.toLowerCase() || '';
                    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
                    
                    if (projectCodeFilter === '') {
                        filteredData = [];
                    } else {
                        filteredData = testPurchaseData.filter(item => {
                            const matchesSearch = searchTerm === '' ||
                                (item.TestCode && item.TestCode.toString().toLowerCase().includes(searchTerm)) ||
                                (item.UnitPrice && item.UnitPrice.toString().toLowerCase().includes(searchTerm)) ||
                                (item.NoRequired && item.NoRequired.toString().toLowerCase().includes(searchTerm));
                            const matchesProjectCode = item.Projectcode && item.Projectcode.toLowerCase().includes(projectCodeFilter.toLowerCase());
                            return matchesSearch && matchesProjectCode;
                        });
                    }
                }
            }
            
            // Close modal and refresh table
            closeTestModal();
            renderTable();
        }

        // Handle delete test
        function handleDeleteTest(testCode, index) {
            showGovukConfirm('Are you sure you want to delete this test purchase requirement?').then((result) => {
                if (result) {
                // Find in original array
                const originalIndex = testPurchaseData.findIndex(item => 
                    item.TestCode === testCode && 
                    testPurchaseData.indexOf(item) === testPurchaseData.indexOf(filteredData[index])
                );
                
                if (originalIndex !== -1) {
                    testPurchaseData.splice(originalIndex, 1);
                    
                    // Update filtered data
                    const searchTerm = document.getElementById('testPurchaseSearch')?.value.toLowerCase() || '';
                    const projectCodeFilter = document.getElementById('sp-projectcode')?.value.trim() || '';
                    
                    if (projectCodeFilter === '') {
                        filteredData = [];
                    } else {
                        filteredData = testPurchaseData.filter(item => {
                            const matchesSearch = searchTerm === '' ||
                                (item.TestCode && item.TestCode.toString().toLowerCase().includes(searchTerm)) ||
                                (item.UnitPrice && item.UnitPrice.toString().toLowerCase().includes(searchTerm)) ||
                                (item.NoRequired && item.NoRequired.toString().toLowerCase().includes(searchTerm));
                            const matchesProjectCode = item.Projectcode && item.Projectcode.toLowerCase().includes(projectCodeFilter.toLowerCase());
                            return matchesSearch && matchesProjectCode;
                        });
                    }
                    
                    // Adjust page if necessary
                    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
                    if (currentPage > totalPages && totalPages > 0) {
                        currentPage = totalPages;
                    }
                    
                    renderTable();
                }
            }
            });
        }

        // Modal event listeners
        document.getElementById('addMilestoneBtn').addEventListener('click', openAddTestModal);
        document.getElementById('saveTestBtn').addEventListener('click', handleSaveTest);
        document.getElementById('closeTestModalBtn').addEventListener('click', closeTestModal);
        document.getElementById('cancelTestModalBtn').addEventListener('click', closeTestModal);
        
        // Clear error on input - Buyer dropdown
        document.getElementById('modal-dpbuyer').addEventListener('change', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('govuk-select--error');
                document.getElementById('modal-dpbuyer-error').style.display = 'none';
            }
        });
        
        // Clear error on input - Test Code
        document.getElementById('modal-testcode').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('govuk-input--error');
                document.getElementById('modal-testcode-error').style.display = 'none';
            }
        });
        
        // Clear error on input - No Required
        document.getElementById('modal-norequired').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('govuk-input--error');
                document.getElementById('modal-norequired-error').style.display = 'none';
            }
        });
        
        // Clear error on input - Unit Price
        document.getElementById('modal-unitprice').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('govuk-input--error');
                document.getElementById('modal-unitprice-error').style.display = 'none';
            }
        });
        
        // Close modal when clicking outside
        // const testModal = document.getElementById('addTestModal');
        // if (testModal) {
        //     window.addEventListener('click', function(event) {
        //         if (event.target === testModal) {
        //             closeTestModal();
        //         }
        //     });
        // }

             function toggleSidebar() {
            const sidebar = document.querySelector('.sidenav');
            sidebar.classList.toggle('collapsed');
        }

        // Setup navigation links
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("data");

        if (encoded) {
            document.getElementById("invoiecsubcontract").href =
                "project_invoices_subcontracts.html?data=" + encodeURIComponent(encoded);

            document.getElementById("milestones").href =
                "project_mgmt_milestone.html?data=" + encodeURIComponent(encoded);

            document.getElementById("testpurchasereq").href =
                "project_mgmt_test_purchase_req.html?data=" + encodeURIComponent(encoded);

            document.getElementById("backlink").href =
                "project_management_five.opttwo.html?data=" + encodeURIComponent(encoded); 
        }

// Resizing functionality
const resizers = document.querySelectorAll(".resizer");

resizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function (e) {
        e.stopPropagation();  // prevent sort click

        const th = this.parentElement;
        const startX = e.pageX;
        const startWidth = th.offsetWidth;
        
        // Get min-width from computed style or inline style, fallback to 80
        const computedStyle = window.getComputedStyle(th);
        const styleMinWidth = computedStyle.minWidth;
        const minWidth = (styleMinWidth && styleMinWidth !== 'none' && styleMinWidth !== '0px') 
            ? parseFloat(styleMinWidth) 
            : 80; // Default minimum column width
        const maxWidth = 600; // Maximum column width to prevent overlap

        function onMouseMove(e) {
            const newWidth = startWidth + (e.pageX - startX);
            // Constrain width between min and max
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                th.style.width = newWidth + "px";
            }
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});