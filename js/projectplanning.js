const sectionData = {
        staff: [
            { id: 1, staffname: 'Staff_001,General', rate: '47', hrs: '1480', days: '198.61', staffcost: '67,181' },
            { id: 2, staffname: 'Staff_002,General', rate: '95', hrs: '3500', days: '468.61', staffcost: '333,327' },
            { id: 3, staffname: 'Staff_003,General', rate: '85', hrs: '2500', days: '468.61', staffcost: '333,327' },
            { id: 4, staffname: 'Staff_004,General', rate: '85', hrs: '1210', days: '168.06', staffcost: '86,002' },
            { id: 5, staffname: 'Staff_005,General', rate: '70', hrs: '1230', days: '170.83', staffcost: '102,523' },
            { id: 6, staffname: 'Staff_006,General', rate: '84', hrs: '1130', days: '120.83', staffcost: '82,523' }
        ],
        animals: [
            { id: 1, animalType: 'Animal_001, Type_A', day: '2', noReq: '1', dailyRt: '3.37', cost: '6.74' },
            { id: 2, animalType: 'Animal_002, Type_B', day: '3', noReq: '1', dailyRt: '9.20', cost: '27.60' },
            { id: 3, animalType: 'Animal_003, Type_C', day: '4', noReq: '1', dailyRt: '7.53', cost: '30.12' }
        ],
        tests: [
            { id: 1, test: 'TestCode_001', description: 'Test Description A', recup: '24.00', num: '0', agrup: '24.00', testcost: '0.00' },
            { id: 2, test: 'TestCode_002', description: 'Test Description B', recup: '15.70', num: '0', agrup: '15.70', testcost: '' },
            { id: 3, test: 'TestCode_003', description: 'Test Description C', recup: '27.70', num: '25', agrup: '27.70', testcost: '692.50' },
            { id: 4, test: 'TestCode_004', description: 'Test Description D', recup: '52.40', num: '150', agrup: '52.40', testcost: '7,860.00' },
            { id: 5, test: 'TestCode_005', description: 'Test Description E', recup: '9.30', num: '0', agrup: '9.30', testcost: '0.00' }
        ],
        exceptional: [
            { id: 1, description: 'Expense_001', account: 'Account_001', totalCost: '1,000.00', freqOrMnth: '', supplier: '' },
            { id: 2, description: 'Expense_002', account: 'Account_002', totalCost: '30,338.00', freqOrMnth: '', supplier: 'Supplier_001' },
            { id: 3, description: 'Expense_003', account: 'Account_003', totalCost: '3,000.00', freqOrMnth: '', supplier: '' }
        ]
    };

    const sectionConfigs = {
        staff: {
            title: 'Staff Booked',
            tbodyId: 'staffTableBody',
            addButtonId: 'addstaffbookedBtn',
            totalInputId: 'staffTotalCost',
            totalField: 'staffcost',
            currencyFields: ['rate', 'staffcost'],
            columns: [
                { key: 'staffname', label: 'Name' },
                { key: 'rate', label: 'Rate', align: 'right' },
                { key: 'hrs', label: 'Hrs', align: 'right' },
                { key: 'days', label: 'Days', align: 'right' },
                { key: 'staffcost', label: 'Staff Cost', align: 'right' }
            ]
        },
        animals: {
            title: 'Animals Booked',
            tbodyId: 'animalsTableBody',
            addButtonId: 'addAnimalBtn',
            totalInputId: 'animalTotalCost',
            totalField: 'cost',
            requiredFields: ['animalType'],
            currencyFields: ['dailyRt', 'cost'],
            columns: [
                { key: 'animalType', label: 'Animal Type' },
                { key: 'day', label: 'Day', align: 'right' },
                { key: 'noReq', label: 'No. Req', align: 'right' },
                { key: 'dailyRt', label: 'Daily Rt', align: 'right' },
                { key: 'cost', label: 'Cost', align: 'right' }
            ],
            modalFields: [
                { key: 'animalType', label: 'Animal Type' },
                { key: 'day', label: 'Day' },
                { key: 'noReq', label: 'No. Req' },
                { key: 'dailyRt', label: 'Daily Rt' },
                { key: 'cost', label: 'Cost' }
            ]
        },
        tests: {
            title: 'Tests Booked',
            tbodyId: 'testsTableBody',
            addButtonId: 'addTestBtn',
            totalInputId: 'testTotalCost',
            totalField: 'testcost',
            requiredFields: ['test'],
            currencyFields: ['recup', 'agrup', 'testcost'],
            columns: [
                { key: 'test', label: 'Test' },
                { key: 'description', label: 'Description' },
                { key: 'recup', label: 'ReCUP', align: 'right' },
                { key: 'num', label: 'Num', align: 'right' },
                { key: 'agrup', label: 'AgrUP', align: 'right' },
                { key: 'testcost', label: 'Test Cost', align: 'right' }
            ],
            modalFields: [
                { key: 'test', label: 'Test' },
                { key: 'description', label: 'Description' },
                { key: 'recup', label: 'ReCUP' },
                { key: 'num', label: 'Num' },
                { key: 'agrup', label: 'AgrUP' },
                { key: 'testcost', label: 'Test Cost' }
            ]
        },
        exceptional: {
            title: 'Exceptional Costs',
            tbodyId: 'exceptionalTableBody',
            addButtonId: 'addExceptionalBtn',
            totalInputId: 'exceptionalTotalCost',
            totalField: 'totalCost',
            requiredFields: ['description'],
            currencyFields: ['totalCost'],
            columns: [
                { key: 'description', label: 'Description' },
                { key: 'account', label: 'Account' },
                { key: 'totalCost', label: 'Total Cost', align: 'right' },
                { key: 'freqOrMnth', label: 'Freq or Mnth', align: 'right' },
                { key: 'supplier', label: 'Supplier' }
            ],
            modalFields: [
                { key: 'description', label: 'Description' },
                { key: 'account', label: 'Account' },
                { key: 'totalCost', label: 'Total Cost' },
                { key: 'freqOrMnth', label: 'Freq or Mnth' },
                { key: 'supplier', label: 'Supplier' }
            ]
        }
    };

    const staffModalEl = document.getElementById('staffModal');
    const sectionModalEl = document.getElementById('sectionModal');
    const staffModal = bootstrap.Modal.getOrCreateInstance(staffModalEl);
    const sectionModal = bootstrap.Modal.getOrCreateInstance(sectionModalEl);
    const modalState = {
        sectionKey: null,
        editId: null
    };

    const sortState = {
        staff: { key: null, direction: 'asc' },
        animals: { key: null, direction: 'asc' },
        tests: { key: null, direction: 'asc' },
        exceptional: { key: null, direction: 'asc' }
    };

    function parseNumber(value) {
        const normalized = String(value || '').replace(/[^0-9.-]/g, '');
        const parsed = Number.parseFloat(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    function formatNumber(value) {
        return new Intl.NumberFormat('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    function isCurrencyField(sectionKey, fieldKey) {
        const config = sectionConfigs[sectionKey];
        return (config.currencyFields || []).includes(fieldKey);
    }

    function formatCellValue(sectionKey, fieldKey, value) {
        if (!isCurrencyField(sectionKey, fieldKey)) {
            return value || '';
        }

        const numericValue = parseNumber(value);
        return '\u00A3' + formatNumber(numericValue);
    }

    function sortSectionData(sectionKey, fieldKey, direction) {
        const config = sectionConfigs[sectionKey];
        const column = config.columns.find(entry => entry.key === fieldKey);
        if (!column) {
            return;
        }

        const multiplier = direction === 'asc' ? 1 : -1;
        const isNumericSort = column.align === 'right';

        sectionData[sectionKey].sort((a, b) => {
            const aValue = a[fieldKey] || '';
            const bValue = b[fieldKey] || '';

            if (isNumericSort) {
                return (parseNumber(aValue) - parseNumber(bValue)) * multiplier;
            }

            return String(aValue).localeCompare(String(bValue), undefined, { sensitivity: 'base' }) * multiplier;
        });
    }

    function updateSortIcons(sectionKey) {
        const config = sectionConfigs[sectionKey];
        const tbody = document.getElementById(config.tbodyId);
        const table = tbody.closest('table');
        const headers = table.querySelectorAll('th[data-column]');
        const state = sortState[sectionKey];

        headers.forEach(header => {
            const column = header.dataset.column;

            header.classList.remove('sorted-asc', 'sorted-desc');
            const existingIcon = header.querySelector('.sort-icon');
            if (existingIcon) {
                existingIcon.remove();
            }

            if (state.key === column) {
                header.classList.add(state.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
                const icon = document.createElement('span');
                icon.className = 'sort-icon';
                icon.textContent = state.direction === 'asc' ? '\u25B2' : '\u25BC';
                header.appendChild(icon);
            }
        });
    }

    function onSortHeaderClick(event) {
        const header = event.currentTarget;
        const sectionKey = header.dataset.section;
        const fieldKey = header.dataset.column;

        const state = sortState[sectionKey];
        const nextDirection = state.key === fieldKey && state.direction === 'asc' ? 'desc' : 'asc';
        state.key = fieldKey;
        state.direction = nextDirection;

        sortSectionData(sectionKey, fieldKey, nextDirection);
        renderSection(sectionKey);
    }

    function setupTableSorting() {
        Object.keys(sectionConfigs).forEach(sectionKey => {
            const config = sectionConfigs[sectionKey];
            const tbody = document.getElementById(config.tbodyId);
            const table = tbody.closest('table');
            const headers = table.querySelectorAll('th[data-column]');

            headers.forEach(header => {
                header.dataset.section = sectionKey;
                header.style.cursor = 'pointer';
                header.tabIndex = 0;

                header.addEventListener('click', onSortHeaderClick);
                header.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onSortHeaderClick({ currentTarget: header });
                    }
                });
            });

            updateSortIcons(sectionKey);
        });
    }

    function setupTableColumnResizing() {
        const headers = document.querySelectorAll('.pp-table-no-margin th[data-column]');

        headers.forEach(header => {
            if (!header.querySelector('.pp-resizer')) {
                const resizer = document.createElement('div');
                resizer.className = 'pp-resizer';
                resizer.innerHTML = '&nbsp;';
                header.appendChild(resizer);
            }
        });

        const resizers = document.querySelectorAll('.pp-table-no-margin .pp-resizer');

        resizers.forEach(resizer => {
            if (resizer.dataset.bound === 'true') {
                return;
            }

            resizer.addEventListener('mousedown', function (event) {
                event.stopPropagation();

                const th = this.parentElement;
                const startX = event.pageX;
                const startWidth = th.offsetWidth;

                function onMouseMove(moveEvent) {
                    const newWidth = startWidth + (moveEvent.pageX - startX);
                    if (newWidth > 60) {
                        th.style.width = newWidth + 'px';
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            resizer.dataset.bound = 'true';
        });
    }

    function nextId(sectionKey) {
        const items = sectionData[sectionKey];
        return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
    }

    function actionButtons(sectionKey, item) {
        const labelBase = sectionKey === 'staff' ? item.staffname : sectionKey === 'animals' ? item.animalType : sectionKey === 'tests' ? item.test : item.description;
        return '<button type="button" data-action="edit" data-section="' + sectionKey + '" data-id="' + item.id + '" aria-label="Edit ' + labelBase + '" style="background:none;border:none;cursor:pointer;padding:4px;">' +
            '<img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="20">' +
            '</button>' +
            '<button type="button" data-action="delete" data-section="' + sectionKey + '" data-id="' + item.id + '" aria-label="Delete ' + labelBase + '" style="background:none;border:none;cursor:pointer;padding:4px;">' +
            '<img src="../images/trash-can-regular-full.svg" alt="Delete" width="20">' +
            '</button>';
    }

    function renderSection(sectionKey) {
        const config = sectionConfigs[sectionKey];
        const tbody = document.getElementById(config.tbodyId);
        const state = sortState[sectionKey];

        if (state.key) {
            sortSectionData(sectionKey, state.key, state.direction);
        }

        tbody.innerHTML = '';

        sectionData[sectionKey].forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'govuk-table__row' + (sectionKey === 'staff' && index === 0 ? ' selected-table-rowbg' : '');

            config.columns.forEach(column => {
                const cell = document.createElement('td');
                cell.className = 'govuk-table__cell' + (column.align === 'right' ? ' text-AlignRight' : '');
                cell.textContent = formatCellValue(sectionKey, column.key, item[column.key]);
                row.appendChild(cell);
            });

            const actionCell = document.createElement('td');
            actionCell.className = 'govuk-table__cell';
            actionCell.style.textAlign = 'center';
            actionCell.innerHTML = actionButtons(sectionKey, item);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });

        updateSortIcons(sectionKey);
        updateTotal(sectionKey);
    }

    function updateTotal(sectionKey) {
        const config = sectionConfigs[sectionKey];
        const total = sectionData[sectionKey].reduce((sum, item) => sum + parseNumber(item[config.totalField]), 0);
        document.getElementById(config.totalInputId).value = '\u00A3' + formatNumber(total);
    }

    function renderAllSections() {
        renderSection('staff');
        renderSection('animals');
        renderSection('tests');
        renderSection('exceptional');
    }

    function openStaffModal(id) {
        modalState.sectionKey = 'staff';
        modalState.editId = id || null;
        const title = document.getElementById('addStaffModalLabel');
        const current = sectionData.staff.find(item => item.id === id);

        title.textContent = current ? 'Edit Staff Booked' : 'Add Staff Booked';
        document.getElementById('modal-staffname').value = current ? current.staffname : '';
        document.getElementById('modal-rate').value = current ? current.rate : '';
        document.getElementById('modal-hrs').value = current ? current.hrs : '';
        document.getElementById('modal-days').value = current ? current.days : '';
        document.getElementById('modal-staffcost').value = current ? current.staffcost : '';

        staffModal.show();
    }

    function closeStaffModal() {
        staffModal.hide();
        document.getElementById('formAddStaff').reset();
        modalState.editId = null;
    }

    function saveStaff() {
        const record = {
            staffname: document.getElementById('modal-staffname').value.trim(),
            rate: document.getElementById('modal-rate').value.trim(),
            hrs: document.getElementById('modal-hrs').value.trim(),
            days: document.getElementById('modal-days').value.trim(),
            staffcost: document.getElementById('modal-staffcost').value.trim()
        };

        if (!record.staffname || !record.rate || !record.hrs || !record.days || !record.staffcost) {
            alert('Please complete all staff fields.');
            return;
        }

        if (modalState.editId) {
            const item = sectionData.staff.find(entry => entry.id === modalState.editId);
            Object.assign(item, record);
        } else {
            sectionData.staff.push({ id: nextId('staff'), ...record });
        }

        renderSection('staff');
        closeStaffModal();
    }

    function buildSectionForm(sectionKey, record) {
        const config = sectionConfigs[sectionKey];
        const form = document.getElementById('sectionModalForm');
        form.innerHTML = '';

        config.modalFields.forEach(field => {
            const wrapper = document.createElement('div');
            wrapper.className = 'govuk-form-group sup_margin_bottom_10';

            const label = document.createElement('label');
            label.className = 'govuk-label govuk-!-font-weight-bold govuk-!-font-size-16';
            label.setAttribute('for', 'section-field-' + field.key);
            label.textContent = field.label + ':';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'govuk-input govuk-!-font-size-16';
            input.id = 'section-field-' + field.key;
            input.value = record ? (record[field.key] || '') : '';

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            form.appendChild(wrapper);
        });
    }

    function openSectionModal(sectionKey, id) {
        modalState.sectionKey = sectionKey;
        modalState.editId = id || null;

        const config = sectionConfigs[sectionKey];
        const current = sectionData[sectionKey].find(item => item.id === id) || null;
        document.getElementById('sectionModalLabel').textContent = (current ? 'Edit ' : 'Add ') + config.title;

        buildSectionForm(sectionKey, current);
        sectionModal.show();
    }

    function closeSectionModal() {
        sectionModal.hide();
        document.getElementById('sectionModalForm').reset();
        modalState.sectionKey = null;
        modalState.editId = null;
    }

    function saveSectionRecord() {
        const sectionKey = modalState.sectionKey;
        const config = sectionConfigs[sectionKey];
        const record = {};

        config.modalFields.forEach(field => {
            record[field.key] = document.getElementById('section-field-' + field.key).value.trim();
        });

        const requiredFields = config.requiredFields || [];
        const hasEmptyRequiredField = requiredFields.some(fieldName => !record[fieldName]);
        if (hasEmptyRequiredField) {
            alert('Please complete the required fields before saving.');
            return;
        }

        if (modalState.editId) {
            const item = sectionData[sectionKey].find(entry => entry.id === modalState.editId);
            Object.assign(item, record);
        } else {
            sectionData[sectionKey].push({ id: nextId(sectionKey), ...record });
        }

        renderSection(sectionKey);
        closeSectionModal();
    }

    function deleteRecord(sectionKey, id) {
        if (!confirm('Are you sure you want to delete this row?')) {
            return;
        }

        sectionData[sectionKey] = sectionData[sectionKey].filter(item => item.id !== id);
        renderSection(sectionKey);
    }

    function handleTableAction(event) {
        const button = event.target.closest('button[data-action]');
        if (!button) {
            return;
        }

        const sectionKey = button.dataset.section;
        const id = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === 'edit') {
            if (sectionKey === 'staff') {
                openStaffModal(id);
            } else {
                openSectionModal(sectionKey, id);
            }
            return;
        }

        if (action === 'delete') {
            deleteRecord(sectionKey, id);
        }
    }

    function applyEncodedProjectData() {
        const urlParams = new URLSearchParams(window.location.search);
        const encoded = urlParams.get('data');
        if (!encoded) {
            return;
        }

        try {
            const project = JSON.parse(atob(encoded));
            if (project.jobcode) {
                document.getElementById('projectCodeValue').textContent = project.jobcode;
            }
            if (project.program) {
                document.getElementById('resultprogram').textContent = project.program;
            }
            if (project.name) {
                document.getElementById('projectDescription').value = project.name;
            }
        } catch (error) {
            console.error('Unable to parse project data.', error);
        }
    }

    document.getElementById('addstaffbookedBtn').addEventListener('click', function () {
        openStaffModal();
    });
    document.getElementById('addAnimalBtn').addEventListener('click', function () {
        openSectionModal('animals');
    });
    document.getElementById('addTestBtn').addEventListener('click', function () {
        openSectionModal('tests');
    });
    document.getElementById('addExceptionalBtn').addEventListener('click', function () {
        openSectionModal('exceptional');
    });

    document.getElementById('saveStaffBtn').addEventListener('click', saveStaff);
    document.getElementById('saveSectionBtn').addEventListener('click', saveSectionRecord);
    document.getElementById('closeStaffModalBtn').addEventListener('click', closeStaffModal);
    document.getElementById('cancelStaffModalBtn').addEventListener('click', closeStaffModal);
    document.getElementById('closeSectionModalBtn').addEventListener('click', closeSectionModal);
    document.getElementById('cancelSectionModalBtn').addEventListener('click', closeSectionModal);

    document.getElementById('staffTableBody').addEventListener('click', handleTableAction);
    document.getElementById('animalsTableBody').addEventListener('click', handleTableAction);
    document.getElementById('testsTableBody').addEventListener('click', handleTableAction);
    document.getElementById('exceptionalTableBody').addEventListener('click', handleTableAction);

    applyEncodedProjectData();
    setupTableSorting();
    setupTableColumnResizing();
    renderAllSections();
