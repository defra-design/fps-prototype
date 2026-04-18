(function () {
    var DATA_JSON_PATH = '../js/pact_js/data/portfolio-maintenance-data.json';
    var PORTFOLIO_PICKER_JSON_PATH = '../js/pact_js/data/portfolio-selector-grid.json';
    var portfolios = [
        {
            code: 'ABOG0508',
            title: 'Welsh Government for assistance with bovine TB programme',
            finished: true,
            programme: 'DoES',
            manager: 'Prendergast, Jeff',
            budget: '£0.00',
            transferIncome: '£0.00',
            comments: 'carried over for extention to end April 2015 - invoice rec\'d. Project closed.',
            constituentTests: [
                { testCode: 'PT0000', itemDescription: 'Camelid TB Combined Antibody Test', workGrp: 'A_BOG1' },
                { testCode: 'PT0001', itemDescription: 'African horse sickness', workGrp: 'A_BOG1' },
                { testCode: 'PT0002', itemDescription: 'B. anthracis microscopy', workGrp: 'B_BOG1' },
                { testCode: 'PT0003', itemDescription: 'Aujeszky\'s disease', workGrp: 'B_BOG1' },
                { testCode: 'PT0004', itemDescription: 'Aujeszky\'s blood disc', workGrp: 'C_BOG1' },
                { testCode: 'PT0005', itemDescription: 'Avian influenza serology', workGrp: 'C_BOG1' },
                { testCode: 'PT0006', itemDescription: 'Avian influ. and ND Ag detect.', workGrp: 'D_BOG1' },
                { testCode: 'PT0007', itemDescription: 'Babesia caballi', workGrp: 'D_BOG1' },
                { testCode: 'PT0008', itemDescription: 'Bacteria in cold water fish', workGrp: 'E_BOG1' },
                { testCode: 'PT0009', itemDescription: 'Big liver and spleen disease', workGrp: 'E_BOG1' },
                { testCode: 'PT0010', itemDescription: 'BVD AgELISA/PCR', workGrp: 'F_BOG1' },
                { testCode: 'PT0011', itemDescription: 'BVD milk ELISA', workGrp: 'F_BOG1' }
            ],
            workgroupsByTest: {
                PT0000: [
                    { workGrp: 'A_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'B_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'C_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'D_BOG1', active: false, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'E_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'F_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'G_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'H_BOG1', active: false, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'I_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'J_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' },
                    { workGrp: 'K_BOG1', active: true, timeCode: 'PT0000', project: 'ABOG0508', testCode: 'PT0000', portfolio: 'ABOG0508' }
                ]
            }
        },
        {
            code: 'APHAAH0040',
            title: 'NCP Control Database Development and Implementation',
            finished: false,
            programme: 'IDBAC',
            manager: 'Thompson, Clare',
            budget: '£12,000.00',
            transferIncome: '£1,500.00',
            comments: 'In progress, expected completion Q3.',
            constituentTests: [
                { testCode: 'PT0101', itemDescription: 'BVD serum AB ELISA', workGrp: 'A_AH04' },
                { testCode: 'PT0102', itemDescription: 'Brucella abortus CFT/SAT', workGrp: 'B_AH04' },
                { testCode: 'PT0103', itemDescription: 'Botulism', workGrp: 'C_AH04' }
            ],
            workgroupsByTest: {
                PT0101: [
                    { workGrp: 'A_AH04', active: true, timeCode: 'PT0101', project: 'APHAAH0040', testCode: 'PT0101', portfolio: 'APHAAH0040' },
                    { workGrp: 'B_AH04', active: true, timeCode: 'PT0101', project: 'APHAAH0040', testCode: 'PT0101', portfolio: 'APHAAH0040' }
                ],
                PT0102: [
                    { workGrp: 'C_AH04', active: true, timeCode: 'PT0102', project: 'APHAAH0040', testCode: 'PT0102', portfolio: 'APHAAH0040' }
                ],
                PT0103: []
            }
        },
        {
            code: 'APHAEM00000',
            title: 'Egg Marketing',
            finished: false,
            programme: 'Bact',
            manager: 'Martin, Helen',
            budget: '£8,450.00',
            transferIncome: '£500.00',
            comments: 'Egg Marketing SLA - Inspections UK.',
            constituentTests: [
                { testCode: 'PT0201', itemDescription: 'Egg quality baseline', workGrp: 'A_EM00' },
                { testCode: 'PT0202', itemDescription: 'Shell integrity score', workGrp: 'B_EM00' }
            ],
            workgroupsByTest: {
                PT0201: [
                    { workGrp: 'A_EM00', active: true, timeCode: 'PT0201', project: 'APHAEM00000', testCode: 'PT0201', portfolio: 'APHAEM00000' }
                ],
                PT0202: [
                    { workGrp: 'B_EM00', active: false, timeCode: 'PT0202', project: 'APHAEM00000', testCode: 'PT0202', portfolio: 'APHAEM00000' }
                ]
            }
        }
    ];

    var portfolioDropdownSeed = [
        { code: 'ABOG0508', title: 'Welsh Government for assistance with bovine TB programme' },
        { code: 'APHAEM00000', title: 'Egg Marketing' },
        { code: 'APHAH0037', title: 'BRILLIANT INVESTMENT ASSISTANCE SCHEME' },
        { code: 'APHAH0038', title: 'Brucellosis Survey Review 2016' },
        { code: 'APHAH0040', title: 'NCP Control Database Development and Implementation' },
        { code: 'APHAH0047', title: 'Programme Management and Strategic' },
        { code: 'APHAH0048', title: 'Policy Demand' },
        { code: 'APHAH0049', title: 'Risk Assessment and Alternative Approaches' },
        { code: 'APHAH0050', title: 'Innovation and Operational Tasks' },
        { code: 'APHAH0051', title: 'Field Inspection Service' },
        { code: 'APHAH0052', title: 'Lab Service Management (LIMS) Capability' },
        { code: 'APHAH0053', title: 'Integrated Services Pilot' },
        { code: 'APHAH0058', title: 'SHEP (Sampson House Exit Project)' },
        { code: 'APHAH0061', title: 'Science Competency Enhancement' },
        { code: 'APHAH0074', title: 'Change implementation as a result of' },
        { code: 'APHAH0100', title: 'Reimbursement of certification costs' },
        { code: 'APHAID0000', title: 'DDR Animal ID' },
        { code: 'APHAINA0000', title: 'Customer Contact' },
        { code: 'APHAINA0001', title: 'Livestock Info Prog' },
        { code: 'APHAINA0002', title: 'Scanning Surveillance' },
        { code: 'APHAINA0003', title: 'HMI Transfer' },
        { code: 'APHAINA0004', title: 'Swine and Bee Health Review' },
        { code: 'APHAINA0005', title: 'Xylella Outbreak Preparedness' },
        { code: 'APHAINA0006', title: 'Defra Capital Projects' },
        { code: 'APHAINA0007', title: 'Service Delivery Investigation' },
        { code: 'APHAINA0008', title: 'APHA Estate Development Project' },
        { code: 'APHAINA0009', title: 'Approved Importer Scheme Technical' },
        { code: 'APHAINA0010', title: 'NIRMAS PH Labelling Scheme' },
        { code: 'APHAINA0011', title: 'NI Retail Movement Sch ReMoS' },
        { code: 'APHAINA0012', title: 'Windsor Framework Project Management' },
        { code: 'APHAINA0013', title: 'Scotland Field Office Relocation for' },
        { code: 'APHAINA0014', title: 'Disease Preparedness 2025-26' },
        { code: 'APHAINA0015', title: 'EU RESET' },
        { code: 'APHAINA0016', title: 'Exercise Aspen' },
        { code: 'APHAINA0017', title: 'Plant and Bee Health Transformation' },
        { code: 'APHAIBSEN', title: 'BSE INCIDENT IN ENGLAND' },
        { code: 'APHAINEUEX', title: 'APHA EU EXIT PROGRAMME - inc' },
        { code: 'APHAINSA00', title: 'work - 51 A1 Core Data' },
        { code: 'APHAINMF00', title: 'Magnet Funding - Up' },
        { code: 'APHAINSHM0', title: 'HMI - Olive Oil Sampling' },
        { code: 'APHAINSD00', title: 'National Ferret Registration Wales' },
        { code: 'APHAINSG00', title: 'National Ferret Registration Scotland' },
        { code: 'APHAINSDM0', title: 'Response and resilience - Operation' },
        { code: 'APHAINSD01', title: 'Covid-19 - Response and Surveillance' },
        { code: 'APHAINSDM1', title: 'National Ferret Registration England' },
        { code: 'APHADBAMF', title: 'AIV HIGH PATH ENGLAND OUTBREAK' },
        { code: 'APHADBAVE', title: 'AIV HIGH PATH ENGLAND OUTBREAK' },
        { code: 'APHADBAVS', title: 'AIV HIGH PATHOGEN SCOTLAND' },
        { code: 'APHADBAVW', title: 'AIV HIGH PATH WALES OUTBREAK' }
    ];

    var fallbackPortfolios = JSON.parse(JSON.stringify(portfolios));
    var fallbackPortfolioDropdownSeed = JSON.parse(JSON.stringify(portfolioDropdownSeed));

    function buildDefaultPortfolio(code, title) {
        var seed = (code || '').split('').reduce(function (acc, ch) { return acc + ch.charCodeAt(0); }, 0);
        var programmes = ['Bact', 'DoES', 'IDBAC', 'IMT', 'LabT', 'Path', 'BTB', 'SSP'];
        var managers = ['Prendergast, Jeff', 'Thompson, Clare', 'Martin, Helen', 'Rod, Ken', 'East, Samantha', 'Grindley, Carli'];
        var testDescriptions = [
            'Camelid TB Combined Antibody Test',
            'African horse sickness',
            'B. anthracis microscopy',
            'Aujeszky\'s disease',
            'Aujeszky\'s blood disc',
            'Avian influenza serology',
            'Avian influ. and ND Ag detect.',
            'Babesia caballi',
            'Bacteria in cold water fish',
            'Big liver and spleen disease'
        ];
        var programme = programmes[seed % programmes.length];
        var manager = managers[seed % managers.length];
        var baseTest = String(1000 + (seed % 8000)).padStart(4, '0');
        var prefix = (code || 'XX').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'WG';
        var constituentTests = [];
        var workgroupsByTest = {};

        for (var i = 0; i < 15; i += 1) {
            var testCode = 'PT' + String(Number(baseTest) + i).padStart(4, '0');
            var workGrp = String.fromCharCode(65 + (i % 26)) + '_' + prefix + '1';
            constituentTests.push({
                testCode: testCode,
                itemDescription: testDescriptions[i % testDescriptions.length],
                workGrp: workGrp
            });

            workgroupsByTest[testCode] = [];
            for (var j = 0; j < 15; j += 1) {
                var rowGrp = String.fromCharCode(65 + (j % 26)) + '_' + prefix + '1';
                workgroupsByTest[testCode].push({
                    workGrp: rowGrp,
                    active: ((seed + i + j) % 4) !== 0,
                    timeCode: testCode,
                    project: code,
                    testCode: testCode,
                    portfolio: code
                });
            }
        }

        return {
            code: code,
            title: title,
            finished: false,
            programme: programme,
            manager: manager,
            budget: '£0.00',
            transferIncome: '£0.00',
            comments: 'Prototype seeded data for ' + code + '.',
            constituentTests: constituentTests,
            workgroupsByTest: workgroupsByTest
        };
    }

    function hydratePortfoliosFromSeed() {
        var combinedSeed = portfolioDropdownSeed.slice();
        var seen = Object.create(null);

        combinedSeed.forEach(function (item) {
            if (!item || !item.code || seen[item.code]) {
                return;
            }
            seen[item.code] = true;

            if (!portfolios.some(function (p) { return p.code === item.code; })) {
                portfolios.push(buildDefaultPortfolio(item.code, item.title));
            }
        });
    }

    function loadDataFromJson() {
        return fetch(DATA_JSON_PATH, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load portfolio maintenance data JSON.');
                }
                return response.json();
            })
            .then(function (data) {
                if (Array.isArray(data.portfolios) && data.portfolios.length) {
                    portfolios = data.portfolios;
                }
            })
            .catch(function () {
                // Fallback keeps the prototype usable when JSON loading is blocked/missing.
                portfolios = JSON.parse(JSON.stringify(fallbackPortfolios));
            });
    }

    function loadPortfolioPickerJson() {
        return fetch(PORTFOLIO_PICKER_JSON_PATH, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load portfolio selector JSON.');
                }
                return response.json();
            })
            .then(function (data) {
                var rows = Array.isArray(data.portfolios) ? data.portfolios : [];
                if (rows.length) {
                    portfolioDropdownSeed = rows.map(function (item) {
                        return {
                            code: item.code,
                            title: item.title
                        };
                    }).filter(function (item) {
                        return item.code && item.title;
                    });
                }
            })
            .catch(function () {
                portfolioDropdownSeed = JSON.parse(JSON.stringify(fallbackPortfolioDropdownSeed));
            });
    }

    var elPortfolioPicker = document.getElementById('pmPortfolioPicker');
    var elPortfolioInput = document.getElementById('pmPortfolioInput');
    var elPortfolioSelect = document.getElementById('pmPortfolioSelect');
    var elPortfolioPanel = document.getElementById('pmPortfolioPanel');
    var elPortfolioTableBody = document.getElementById('pmPortfolioTableBody');
    var elReloadBtn = document.getElementById('pmReloadBtn');
    var elParentProject = document.getElementById('pmParentProject');
    var elProjectTitle = document.getElementById('pmProjectTitle');
    var elFinished = document.getElementById('pmFinished');
    var elProgramme = document.getElementById('pmProgramme');
    var elManager = document.getElementById('pmManager');
    var elBudget = document.getElementById('pmBudget');
    var elTransferIncome = document.getElementById('pmTransferIncome');
    var elConstituentBody = document.getElementById('pmConstituentBody');
    var elWorkgroupsBody = document.getElementById('pmWorkgroupsBody');
    var elConstituentPagination = document.getElementById('pmConstituentPagination');
    var elWorkgroupsPagination = document.getElementById('pmWorkgroupsPagination');
    var elConstituentPageSize = document.getElementById('pmConstituentPageSize');
    var elWorkgroupsPageSize = document.getElementById('pmWorkgroupsPageSize');
    var elTestSearch = document.getElementById('pmTestSearch');
    var elAddTestBtn = document.getElementById('pmAddTestBtn');
    var elSelectedPortfolioTest = document.getElementById('pmSelectedPortfolioTest');
    var elComments = document.getElementById('pmComments');
    var elTimeCodesBtn = document.getElementById('pmTimeCodesBtn');
    var elOverheadBtn = document.getElementById('pmOverheadBtn');
    var elEditModal = document.getElementById('testModal');
    var elModalTitle = document.getElementById('modalTitle');
    var elTestCodeSelect = document.getElementById('testCodeSelect');
    var elDescriptionInput = document.getElementById('descriptionInput');
    var elWorkGroupSelect = document.getElementById('workGroupSelect');
    var elTestCodeError = document.getElementById('pmTestCodeError');
    var elWorkGroupError = document.getElementById('pmWorkGroupError');
    var elDescriptionError = document.getElementById('pmDescriptionError');
    var elFormError = document.getElementById('pmFormError');
    var elSaveBtn = document.getElementById('saveBtn');
    var elModalCancelBtn = elEditModal ? elEditModal.querySelector('.btnCancel') : null;
    var elDeleteModal = document.getElementById('pmDeleteModal');
    var elDeleteBackdrop = document.getElementById('pmDeleteBackdrop');
    var elDeleteMessage = document.getElementById('pmDeleteMessage');
    var elDeleteConfirmBtn = document.getElementById('pmDeleteConfirmBtn');
    var elDeleteCancelBtn = document.getElementById('pmDeleteCancelBtn');
    var elWorkgroupModal = document.getElementById('workgroupModal');
    var elWorkgroupModalTitle = document.getElementById('workgroupModalTitle');
    var elWorkgroupTimeCode = document.getElementById('workgroupTimeCode');
    var elWorkgroupWorkGrp = document.getElementById('workgroupWorkGrp');
    var elWorkgroupParentProject = document.getElementById('workgroupParentProject');
    var elWorkgroupActive = document.getElementById('workgroupActive');
    var elAddWorkgroupBtn = document.getElementById('pmAddWorkgroupBtn');
    var elDeleteAllWorkgroupsBtn = document.getElementById('pmDeleteAllWorkgroupsBtn');
    var elSelectAllWorkgroups = document.getElementById('pmSelectAllWorkgroups');
    var elWorkgroupSaveBtn = document.getElementById('workgroupSaveBtn');
    var elWorkgroupTimeCodeError = document.getElementById('pmWorkgroupTimeCodeError');
    var elWorkgroupWorkGrpError = document.getElementById('pmWorkgroupWorkGrpError');
    var elWorkgroupParentProjectError = document.getElementById('pmWorkgroupParentProjectError');

    var currentPortfolio = null;
    var selectedTestCode = '';
    var editingTestCode = '';
    var isAddMode = false;
    var isWorkgroupAddMode = false;
    var editingWorkgroupOriginal = null;
    var pendingDeleteTestCode = null;
    var pendingDeleteWorkgroupKey = null;
    var pendingDeleteWorkgroupKeys = [];
    var selectedWorkgroupKeys = Object.create(null);
    var constituentCurrentPage = 1;
    var workgroupsCurrentPage = 1;
    var constituentPageSize = 10;
    var workgroupsPageSize = 10;
    var testSearchTerm = '';
    var successToastTimer = null;
    var constituentSortColumn = null;
    var constituentSortDir = 'asc';
    var workgroupsSortColumn = null;
    var workgroupsSortDir = 'asc';

    function setPortfolioInputExpanded(expanded) {
        if (elPortfolioInput) {
            elPortfolioInput.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
    }

    function closePortfolioPanel() {
        if (!elPortfolioPanel) {
            return;
        }

        elPortfolioPanel.style.display = 'none';
        setPortfolioInputExpanded(false);
    }

    function openPortfolioPanel() {
        if (!elPortfolioPanel || !elPortfolioInput) {
            return;
        }

        elPortfolioPanel.style.display = 'block';
        elPortfolioPanel.style.width = elPortfolioInput.offsetWidth + 'px';
        setPortfolioInputExpanded(true);
        renderPortfolioPickerRows(getPortfolioFilterTerm());
    }

    function getPortfolioSelectedDisplay() {
        if (!elPortfolioInput) {
            return '';
        }

        return elPortfolioInput.getAttribute('data-selected-display') || '';
    }

    function getPortfolioFilterTerm() {
        if (!elPortfolioInput) {
            return '';
        }

        var value = (elPortfolioInput.value || '').trim();
        var selectedDisplay = getPortfolioSelectedDisplay();
        if (!value || value === '--select--' || value === selectedDisplay) {
            return '';
        }

        return value;
    }

    function resetPortfolioInputToSelection() {
        if (!elPortfolioInput) {
            return;
        }

        var selectedDisplay = getPortfolioSelectedDisplay();
        elPortfolioInput.value = selectedDisplay || '--select--';
    }

    function setSelectedPortfolioDisplay(portfolio) {
        if (elPortfolioSelect) {
            elPortfolioSelect.value = portfolio ? portfolio.code : '';
        }

        if (elPortfolioInput) {
            var displayValue = portfolio ? portfolio.code + ' | ' + portfolio.title : '';
            elPortfolioInput.setAttribute('data-selected-display', displayValue);
            elPortfolioInput.value = displayValue || '--select--';
        }
    }

    function ensureWorkGroupOption(value) {
        if (!elWorkGroupSelect || !value) {
            return;
        }

        var exists = Array.from(elWorkGroupSelect.options).some(function (opt) {
            return opt.value === value;
        });

        if (!exists) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.textContent = value;
            elWorkGroupSelect.appendChild(opt);
        }
    }

    function ensureSelectOption(selectEl, value) {
        if (!selectEl || !value) {
            return;
        }

        var exists = Array.from(selectEl.options).some(function (opt) {
            return opt.value === value;
        });

        if (!exists) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.textContent = value;
            selectEl.appendChild(opt);
        }
    }

    function hideErrorMessage(el) {
        if (!el) {
            return;
        }
        el.hidden = true;
    }

    function showErrorMessage(el, message) {
        if (!el) {
            return;
        }

        if (message) {
            el.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + message;
        }
        el.hidden = false;
    }

    function showSuccessToast(message) {
        var existingToast = document.getElementById('pmSuccessToast');
        if (existingToast) {
            existingToast.remove();
        }

        if (successToastTimer) {
            clearTimeout(successToastTimer);
            successToastTimer = null;
        }

        var toast = document.createElement('div');
        toast.id = 'pmSuccessToast';
        toast.className = 'govuk-notification-banner govuk-notification-banner--success';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-labelledby', 'govuk-notification-banner-title');
        toast.setAttribute('data-module', 'govuk-notification-banner');
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '2000';
        toast.style.maxWidth = '480px';
        toast.style.width = 'calc(100% - 40px)';
        toast.innerHTML = ''
            + '<div class="govuk-notification-banner__header">'
            + '<h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">Success</h2>'
            + '</div>'
            + '<div class="govuk-notification-banner__content">'
            + '<h2 class="govuk-notification-banner__heading">' + (message || 'Test Code Data Added Successfully') + '</h2>'
            + '</div>';

        document.body.appendChild(toast);

        successToastTimer = window.setTimeout(function () {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            successToastTimer = null;
        }, 5000);
    }

    function showSuccessToastAfterGridSave(savedTestCode, messageText) {
        window.requestAnimationFrame(function () {
            var savedInData = Boolean(currentPortfolio && (currentPortfolio.constituentTests || []).some(function (item) {
                return item.testCode === savedTestCode;
            }));

            if (savedInData) {
                showSuccessToast(messageText || 'Test Code Data Added Successfully');
            }
        });
    }

    function setFieldErrorState(el, hasError) {
        if (!el) {
            return;
        }

        el.classList.toggle('pm-field-error', Boolean(hasError));
        if (hasError) {
            el.setAttribute('aria-invalid', 'true');
        } else {
            el.removeAttribute('aria-invalid');
        }
    }

    function setAllModalFieldsErrorState(hasError) {
        setFieldErrorState(elTestCodeSelect, hasError);
        setFieldErrorState(elWorkGroupSelect, hasError);
        setFieldErrorState(elDescriptionInput, hasError);
    }

    function clearModalValidation() {
        hideErrorMessage(elTestCodeError);
        hideErrorMessage(elWorkGroupError);
        hideErrorMessage(elDescriptionError);
        hideErrorMessage(elFormError);
        setAllModalFieldsErrorState(false);
    }

    function clearFieldValidation(fieldEl, errorEl) {
        hideErrorMessage(errorEl);
        setFieldErrorState(fieldEl, false);
    }

    function validateModalFields(values) {
        var hasError = false;
        clearModalValidation();

        if (!values.workGroup) {
            hasError = true;
            showErrorMessage(elWorkGroupError, 'Please select a work group.');
        }

        if (!isAddMode && !values.description) {
            hasError = true;
            showErrorMessage(elDescriptionError, 'Please enter description.');
        }

        if (isAddMode && !values.code) {
            hasError = true;
            showErrorMessage(elTestCodeError, 'Please select test code.');
        }

        if (hasError) {
            setAllModalFieldsErrorState(true);
        }

        return !hasError;
    }

    function openModal() {
        if (!elEditModal) {
            return;
        }

        elEditModal.style.display = 'flex';
        elEditModal.classList.add('show');
        elEditModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        var backdrop = document.getElementById('pmModalBackdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'pmModalBackdrop';
            backdrop.className = 'modal-backdrop fade show';
            backdrop.addEventListener('click', closeModal);
            document.body.appendChild(backdrop);
        }
    }

    function closeModal() {
        if (!elEditModal) {
            return;
        }

        elEditModal.classList.remove('show');
        elEditModal.style.display = 'none';
        elEditModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        var backdrop = document.getElementById('pmModalBackdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    window.closeModal = closeModal;

    function openEditModal(test) {
        if (!test || !elEditModal || !elTestCodeSelect || !elDescriptionInput || !elWorkGroupSelect) {
            return;
        }

        clearModalValidation();
        isAddMode = false;
        editingTestCode = test.testCode;

        if (elModalTitle) {
            elModalTitle.textContent = 'Edit Test';
        }

        elTestCodeSelect.innerHTML = '';
        var testCodeOpt = document.createElement('option');
        testCodeOpt.value = test.testCode;
        testCodeOpt.textContent = test.testCode;
        elTestCodeSelect.appendChild(testCodeOpt);
        elTestCodeSelect.value = test.testCode;
        elTestCodeSelect.disabled = true;

        elDescriptionInput.readOnly = false;
        elDescriptionInput.value = test.itemDescription || '';

        ensureWorkGroupOption(test.workGrp);
        elWorkGroupSelect.value = test.workGrp || '';

        openModal();
    }

    function getAllKnownTestCodes() {
        var codeSet = Object.create(null);
        var allCodes = [];

        portfolios.forEach(function (portfolio) {
            (portfolio.constituentTests || []).forEach(function (test) {
                if (test.testCode && !codeSet[test.testCode]) {
                    codeSet[test.testCode] = true;
                    allCodes.push(test.testCode);
                }
            });
        });

        return allCodes.sort();
    }

    function getDescriptionByTestCode(testCode) {
        var description = '';
        portfolios.some(function (portfolio) {
            return (portfolio.constituentTests || []).some(function (test) {
                if (test.testCode === testCode) {
                    description = test.itemDescription || '';
                    return true;
                }
                return false;
            });
        });
        return description;
    }

    function populateTestCodeOptionsForAdd() {
        if (!elTestCodeSelect || !currentPortfolio) {
            return;
        }

        var existingCodes = (currentPortfolio.constituentTests || []).map(function (item) {
            return item.testCode;
        });

        var knownCodes = getAllKnownTestCodes().filter(function (code) {
            return !existingCodes.includes(code);
        });

        elTestCodeSelect.innerHTML = '';

        var defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Select Test Code';
        elTestCodeSelect.appendChild(defaultOpt);

        knownCodes.forEach(function (code) {
            var opt = document.createElement('option');
            opt.value = code;
            opt.textContent = code;
            elTestCodeSelect.appendChild(opt);
        });

        var generatedCode = generateNextTestCode(existingCodes.concat(knownCodes));
        if (generatedCode) {
            var generatedOpt = document.createElement('option');
            generatedOpt.value = generatedCode;
            generatedOpt.textContent = generatedCode + ' (new)';
            elTestCodeSelect.appendChild(generatedOpt);
        }
    }

    function generateNextTestCode(existingCodes) {
        var maxNumber = 0;
        (existingCodes || []).forEach(function (code) {
            var match = /^PT(\d{4,})$/i.exec(code || '');
            if (match) {
                var parsed = Number(match[1]);
                if (!Number.isNaN(parsed) && parsed > maxNumber) {
                    maxNumber = parsed;
                }
            }
        });

        return 'PT' + String(maxNumber + 1).padStart(4, '0');
    }

    function openAddModal() {
        if (!currentPortfolio || !elEditModal || !elTestCodeSelect || !elDescriptionInput || !elWorkGroupSelect) {
            return;
        }

        clearModalValidation();
        isAddMode = true;
        editingTestCode = '';

        if (elModalTitle) {
            elModalTitle.textContent = 'Add Test Code';
        }

        populateTestCodeOptionsForAdd();
        elTestCodeSelect.value = '';
        elTestCodeSelect.disabled = false;

        elDescriptionInput.readOnly = true;
        elDescriptionInput.value = '';
        elWorkGroupSelect.value = '';

        openModal();
    }

    function deleteTest(testCode) {
        if (!currentPortfolio || !testCode) {
            return;
        }

        var nextTests = (currentPortfolio.constituentTests || []).filter(function (item) {
            return item.testCode !== testCode;
        });

        if (nextTests.length === (currentPortfolio.constituentTests || []).length) {
            return;
        }

        currentPortfolio.constituentTests = nextTests;

        if (currentPortfolio.workgroupsByTest && currentPortfolio.workgroupsByTest[testCode]) {
            delete currentPortfolio.workgroupsByTest[testCode];
        }

        if (selectedTestCode === testCode) {
            selectedTestCode = '';
        }

        renderConstituentTests(currentPortfolio);
        renderWorkgroups(currentPortfolio, selectedTestCode);
    }

    function getPortfolioByCode(code) {
        return portfolios.find(function (p) { return p.code === code; }) || null;
    }

    function initFieldDropdowns() {
        if (!elProgramme || !elManager) {
            return;
        }

        var programmeSet = [''];
        var managerSet = [''];

        portfolios.forEach(function (p) {
            if (p.programme && !programmeSet.includes(p.programme)) {
                programmeSet.push(p.programme);
            }
            if (p.manager && !managerSet.includes(p.manager)) {
                managerSet.push(p.manager);
            }
        });

        elProgramme.innerHTML = '';
        programmeSet.forEach(function (value, idx) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.textContent = idx === 0 ? '-- select programme --' : value;
            elProgramme.appendChild(opt);
        });

        elManager.innerHTML = '';
        managerSet.forEach(function (value, idx) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.textContent = idx === 0 ? '-- select manager --' : value;
            elManager.appendChild(opt);
        });
    }

    function renderPortfolioPickerRows(filterText) {
        if (!elPortfolioTableBody) {
            return;
        }

        var term = (filterText || '').trim().toLowerCase();
        var rows = portfolioDropdownSeed.filter(function (portfolio) {
            if (!term) {
                return true;
            }

            return (portfolio.code || '').toLowerCase().includes(term)
                || (portfolio.title || '').toLowerCase().includes(term);
        });

        elPortfolioTableBody.innerHTML = '';

        if (!rows.length) {
            var emptyRow = document.createElement('tr');
            emptyRow.className = 'pm-portfolio-grid-empty';

            var emptyCell = document.createElement('td');
            emptyCell.colSpan = 2;
            emptyCell.textContent = 'No matching portfolios found.';
            emptyRow.appendChild(emptyCell);
            elPortfolioTableBody.appendChild(emptyRow);
            return;
        }

        rows.forEach(function (portfolio) {
            var tr = document.createElement('tr');
            if (currentPortfolio && currentPortfolio.code === portfolio.code) {
                tr.classList.add('is-selected');
            }

            var codeCell = document.createElement('td');
            codeCell.textContent = portfolio.code;
            tr.appendChild(codeCell);

            var titleCell = document.createElement('td');
            titleCell.textContent = portfolio.title;
            tr.appendChild(titleCell);

            tr.addEventListener('click', function () {
                loadPortfolio(portfolio.code);
                closePortfolioPanel();
            });

            elPortfolioTableBody.appendChild(tr);
        });
    }

    function renderPortfolioDetails(portfolio) {
        elParentProject.value = portfolio.code;
        elProjectTitle.value = portfolio.title;
        elFinished.checked = Boolean(portfolio.finished);
        elProgramme.value = portfolio.programme;
        elManager.value = portfolio.manager;
        elBudget.value = portfolio.budget;
        elTransferIncome.value = portfolio.transferIncome;
        elComments.value = portfolio.comments;
    }

    function renderGridPagination(container, currentPage, totalPages, onPageChange) {
        if (!container) {
            return;
        }

        container.innerHTML = '';
        container.className = 'govuk-pagination';

        if (totalPages <= 1) {
            return;
        }

        function createPaginationLink(label, targetPage, className, ariaLabel) {
            var wrapper = document.createElement('div');
            wrapper.className = className;

            var link = document.createElement('a');
            link.className = 'govuk-link govuk-pagination__link';
            link.href = '#';
            if (ariaLabel) {
                link.setAttribute('aria-label', ariaLabel);
            }
            if (className === 'govuk-pagination__prev') {
                link.setAttribute('rel', 'prev');
            }
            if (className === 'govuk-pagination__next') {
                link.setAttribute('rel', 'next');
            }
            link.addEventListener('click', function (event) {
                event.preventDefault();
                onPageChange(targetPage);
            });
            link.innerHTML = label;
            wrapper.appendChild(link);

            return wrapper;
        }

        function addPageItem(list, pageNumber, isCurrent) {
            var li = document.createElement('li');
            li.className = 'govuk-pagination__item' + (isCurrent ? ' govuk-pagination__item--current' : '');

            if (isCurrent) {
                var currentPageEl = document.createElement('span');
                currentPageEl.className = 'govuk-pagination__link';
                currentPageEl.setAttribute('aria-current', 'page');
                currentPageEl.textContent = String(pageNumber);
                li.appendChild(currentPageEl);
            } else {
                var pageLink = document.createElement('a');
                pageLink.className = 'govuk-link govuk-pagination__link';
                pageLink.href = '#';
                pageLink.setAttribute('aria-label', 'Page ' + pageNumber);
                pageLink.textContent = String(pageNumber);
                pageLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    onPageChange(pageNumber);
                });
                li.appendChild(pageLink);
            }

            list.appendChild(li);
        }

        function addEllipsis(list) {
            var li = document.createElement('li');
            li.className = 'govuk-pagination__item govuk-pagination__item--ellipsis';
            li.textContent = '…';
            list.appendChild(li);
        }

        function getVisiblePages() {
            var pages = [1, totalPages, currentPage - 1, currentPage, currentPage + 1];
            return pages.filter(function (page, index, allPages) {
                return page >= 1 && page <= totalPages && allPages.indexOf(page) === index;
            }).sort(function (a, b) {
                return a - b;
            });
        }

        var list = document.createElement('ul');
        list.className = 'govuk-pagination__list';

        if (currentPage > 1) {
            container.appendChild(createPaginationLink(
                '<span class="govuk-pagination__link-title"><svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m6.5938 0.0078125-6.5 6.5 6.5 6.5 1.414-1.4141-4.0938-4.0859h11.086v-2h-11.086l4.0938-4.0859-1.414-1.4141z"></path></svg> <span class="govuk-pagination__link-text">Previous</span></span>',
                currentPage - 1,
                'govuk-pagination__prev',
                'Previous page'
            ));
        }

        var visiblePages = getVisiblePages();
        visiblePages.forEach(function (pageNumber, index) {
            if (index > 0 && pageNumber - visiblePages[index - 1] > 1) {
                addEllipsis(list);
            }
            addPageItem(list, pageNumber, pageNumber === currentPage);
        });

        container.appendChild(list);

        if (currentPage < totalPages) {
            container.appendChild(createPaginationLink(
                '<span class="govuk-pagination__link-title"><span class="govuk-pagination__link-text">Next</span> <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m8.4062 0.0078125-1.414 1.4141 4.0938 4.0859h-11.086v2h11.086l-4.0938 4.0859 1.414 1.4141 6.5-6.5-6.5-6.5z"></path></svg></span>',
                currentPage + 1,
                'govuk-pagination__next',
                'Next page'
            ));
        }
    }

    function getFilteredTests(portfolio) {
        var tests = portfolio.constituentTests || [];
        if (!testSearchTerm) {
            return tests;
        }

        var query = testSearchTerm.toLowerCase();
        return tests.filter(function (test) {
            return (test.testCode || '').toLowerCase().includes(query)
                || (test.itemDescription || '').toLowerCase().includes(query)
                || (test.workGrp || '').toLowerCase().includes(query);
        });
    }

    function showDeleteConfirmation(testCode) {
        if (!elDeleteModal || !elDeleteMessage) {
            return;
        }

        pendingDeleteTestCode = testCode;
        elDeleteMessage.textContent = 'Delete test code ' + testCode + '?';
        elDeleteModal.classList.add('pm-delete-modal-show');
        elDeleteModal.setAttribute('aria-hidden', 'false');
    }

    function closeDeleteModal() {
        if (!elDeleteModal) {
            return;
        }

        elDeleteModal.classList.remove('pm-delete-modal-show');
        elDeleteModal.setAttribute('aria-hidden', 'true');
        pendingDeleteTestCode = null;
        pendingDeleteWorkgroupKey = null;
        pendingDeleteWorkgroupKeys = [];
    }

    function buildWorkgroupSelectionKey(item) {
        if (!item) {
            return '';
        }

        return String(item.timeCode || '') + '::' + String(item.workGrp || '');
    }

    function getSelectedWorkgroupKeys() {
        return Object.keys(selectedWorkgroupKeys).filter(function (key) {
            return selectedWorkgroupKeys[key];
        });
    }

    function clearWorkgroupSelections() {
        selectedWorkgroupKeys = Object.create(null);
        updateWorkgroupBulkControls();
    }

    function updateWorkgroupBulkControls() {
        var rowCheckboxes = elWorkgroupsBody ? elWorkgroupsBody.querySelectorAll('.pm-workgroup-bulk-checkbox') : [];
        var checkedCheckboxes = elWorkgroupsBody ? elWorkgroupsBody.querySelectorAll('.pm-workgroup-bulk-checkbox:checked') : [];
        var selectedCount = getSelectedWorkgroupKeys().length;

        if (elSelectAllWorkgroups) {
            if (!rowCheckboxes.length) {
                elSelectAllWorkgroups.checked = false;
                elSelectAllWorkgroups.indeterminate = false;
            } else {
                elSelectAllWorkgroups.checked = checkedCheckboxes.length === rowCheckboxes.length;
                elSelectAllWorkgroups.indeterminate = checkedCheckboxes.length > 0
                    && checkedCheckboxes.length < rowCheckboxes.length;
            }
        }

        if (elDeleteAllWorkgroupsBtn) {
            elDeleteAllWorkgroupsBtn.disabled = selectedCount === 0;
        }
    }

    function showDeleteSelectedWorkgroupsConfirmation(keys) {
        if (!elDeleteModal || !elDeleteMessage || !keys || !keys.length) {
            return;
        }

        pendingDeleteWorkgroupKeys = keys.slice();
        pendingDeleteWorkgroupKey = null;
        pendingDeleteTestCode = null;
        elDeleteMessage.textContent = 'Delete selected workgroups?';
        elDeleteModal.classList.add('pm-delete-modal-show');
        elDeleteModal.setAttribute('aria-hidden', 'false');
    }

    function deleteSelectedWorkgroups() {
        if (!currentPortfolio || !pendingDeleteWorkgroupKeys.length) {
            return;
        }

        var deletedCount = 0;
        pendingDeleteWorkgroupKeys.forEach(function (selectionKey) {
            var parts = (selectionKey || '').split('::');
            var timeCode = parts[0] || '';
            var workGrp = parts[1] || '';

            if (!timeCode || !workGrp || !currentPortfolio.workgroupsByTest || !currentPortfolio.workgroupsByTest[timeCode]) {
                return;
            }

            var beforeCount = currentPortfolio.workgroupsByTest[timeCode].length;
            currentPortfolio.workgroupsByTest[timeCode] = currentPortfolio.workgroupsByTest[timeCode].filter(function (item) {
                return item.workGrp !== workGrp;
            });

            if (currentPortfolio.workgroupsByTest[timeCode].length < beforeCount) {
                deletedCount += 1;
            }
        });

        clearWorkgroupSelections();
        workgroupsCurrentPage = 1;
        renderWorkgroups(currentPortfolio, selectedTestCode);

        if (deletedCount > 0) {
            showSuccessToast('Selected Workgroups Deleted Successfully');
        }
    }

    function openWorkgroupModal() {
        if (!elWorkgroupModal) {
            return;
        }

        elWorkgroupModal.style.display = 'flex';
        elWorkgroupModal.classList.add('show');
        elWorkgroupModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        var backdrop = document.getElementById('pmWorkgroupModalBackdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'pmWorkgroupModalBackdrop';
            backdrop.className = 'modal-backdrop fade show';
            backdrop.addEventListener('click', closeWorkgroupModal);
            document.body.appendChild(backdrop);
        }
    }

    function closeWorkgroupModal() {
        if (!elWorkgroupModal) {
            return;
        }

        elWorkgroupModal.classList.remove('show');
        elWorkgroupModal.style.display = 'none';
        elWorkgroupModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        var backdrop = document.getElementById('pmWorkgroupModalBackdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    window.closeWorkgroupModal = closeWorkgroupModal;

    function populateTimeCodeOptions() {
        if (!elWorkgroupTimeCode || !currentPortfolio) {
            return;
        }

        var timeCodes = {};
        (currentPortfolio.constituentTests || []).forEach(function(test) {
            timeCodes[test.testCode] = true;
        });

        elWorkgroupTimeCode.innerHTML = '';
        var defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Select Timecode';
        elWorkgroupTimeCode.appendChild(defaultOpt);

        Object.keys(timeCodes).forEach(function(code) {
            var opt = document.createElement('option');
            opt.value = code;
            opt.textContent = code;
            elWorkgroupTimeCode.appendChild(opt);
        });
    }

    function populateParentProjectOptions() {
        if (!elWorkgroupParentProject || !currentPortfolio) {
            return;
        }

        elWorkgroupParentProject.innerHTML = '';
        var defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Select Parent Project';
        elWorkgroupParentProject.appendChild(defaultOpt);

        var projectOpt = document.createElement('option');
        projectOpt.value = currentPortfolio.code;
        projectOpt.textContent = currentPortfolio.code;
        elWorkgroupParentProject.appendChild(projectOpt);
    }

    function openWorkgroupAddModal() {
        if (!currentPortfolio || !elWorkgroupModal) {
            return;
        }

        isWorkgroupAddMode = true;
        editingWorkgroupOriginal = null;
        pendingDeleteWorkgroupKey = null;

        if (elWorkgroupModalTitle) {
            elWorkgroupModalTitle.textContent = 'Add Workgroup';
        }

        populateTimeCodeOptions();
        populateParentProjectOptions();

        elWorkgroupTimeCode.value = '';
        elWorkgroupTimeCode.disabled = false;
        elWorkgroupWorkGrp.value = '';
        elWorkgroupWorkGrp.disabled = false;
        elWorkgroupParentProject.value = '';
        elWorkgroupParentProject.disabled = false;
        elWorkgroupActive.checked = true;
        elWorkgroupActive.disabled = false;

        clearWorkgroupModalValidation();
        openWorkgroupModal();
    }

    function openWorkgroupEditModal(workgroup) {
        if (!currentPortfolio || !elWorkgroupModal) {
            return;
        }

        isWorkgroupAddMode = false;
        editingWorkgroupOriginal = {
            timeCode: workgroup.timeCode,
            workGrp: workgroup.workGrp
        };
        pendingDeleteWorkgroupKey = null;

        if (elWorkgroupModalTitle) {
            elWorkgroupModalTitle.textContent = 'Edit Workgroup';
        }

        populateTimeCodeOptions();
        populateParentProjectOptions();
        ensureSelectOption(elWorkgroupWorkGrp, workgroup.workGrp);
        ensureSelectOption(elWorkgroupParentProject, workgroup.project);

        elWorkgroupTimeCode.value = workgroup.timeCode;
        elWorkgroupTimeCode.disabled = false;
        elWorkgroupWorkGrp.value = workgroup.workGrp;
        elWorkgroupWorkGrp.disabled = false;
        elWorkgroupParentProject.value = workgroup.project;
        elWorkgroupParentProject.disabled = false;
        elWorkgroupActive.checked = workgroup.active === true || workgroup.active === 'Yes';
        elWorkgroupActive.disabled = true;

        clearWorkgroupModalValidation();
        openWorkgroupModal();
    }

    function clearWorkgroupModalValidation() {
        if (elWorkgroupTimeCodeError) {
            elWorkgroupTimeCodeError.hidden = true;
        }
        if (elWorkgroupWorkGrpError) {
            elWorkgroupWorkGrpError.hidden = true;
        }
        if (elWorkgroupParentProjectError) {
            elWorkgroupParentProjectError.hidden = true;
        }
    }

    function validateWorkgroupModal() {
        var hasError = false;
        clearWorkgroupModalValidation();

        if (!elWorkgroupTimeCode.value) {
            hasError = true;
            if (elWorkgroupTimeCodeError) {
                elWorkgroupTimeCodeError.innerHTML = '<span class="govuk-visually-hidden">Error:</span> Please select timecode.';
                elWorkgroupTimeCodeError.hidden = false;
            }
        }

        if (!elWorkgroupWorkGrp.value) {
            hasError = true;
            if (elWorkgroupWorkGrpError) {
                elWorkgroupWorkGrpError.innerHTML = '<span class="govuk-visually-hidden">Error:</span> Please select workgroup.';
                elWorkgroupWorkGrpError.hidden = false;
            }
        }

        if (!elWorkgroupParentProject.value) {
            hasError = true;
            if (elWorkgroupParentProjectError) {
                elWorkgroupParentProjectError.innerHTML = '<span class="govuk-visually-hidden">Error:</span> Please select parent project.';
                elWorkgroupParentProjectError.hidden = false;
            }
        }

        return !hasError;
    }

    function saveWorkgroup() {
        if (!validateWorkgroupModal() || !currentPortfolio) {
            return;
        }

        var timeCode = (elWorkgroupTimeCode.value || '').trim();
        var workGrp = (elWorkgroupWorkGrp.value || '').trim();
        var project = (elWorkgroupParentProject.value || '').trim();
        var active = elWorkgroupActive.checked;

        if (isWorkgroupAddMode) {
            // Adding new workgroup
            currentPortfolio.workgroupsByTest = currentPortfolio.workgroupsByTest || {};
            currentPortfolio.workgroupsByTest[timeCode] = currentPortfolio.workgroupsByTest[timeCode] || [];

            var newWorkgroup = {
                workGrp: workGrp,
                active: active,
                timeCode: timeCode,
                project: project,
                testCode: timeCode,
                portfolio: currentPortfolio.code
            };

            currentPortfolio.workgroupsByTest[timeCode].push(newWorkgroup);
            showSuccessToast('Workgroup Added Successfully');
        } else {
            // Editing existing workgroup
            if (!currentPortfolio.workgroupsByTest || !editingWorkgroupOriginal) {
                closeWorkgroupModal();
                return;
            }

            var sourceTimeCode = editingWorkgroupOriginal.timeCode;
            var sourceWorkgroups = currentPortfolio.workgroupsByTest[sourceTimeCode] || [];
            var targetIndex = sourceWorkgroups.findIndex(function (item) {
                return item.workGrp === editingWorkgroupOriginal.workGrp
                    && item.timeCode === sourceTimeCode;
            });

            if (targetIndex === -1) {
                closeWorkgroupModal();
                return;
            }

            var targetWorkgroup = sourceWorkgroups[targetIndex];
            targetWorkgroup.workGrp = workGrp;
            targetWorkgroup.active = active;
            targetWorkgroup.timeCode = timeCode;
            targetWorkgroup.project = project;
            targetWorkgroup.testCode = timeCode;
            targetWorkgroup.portfolio = currentPortfolio.code;

            if (sourceTimeCode !== timeCode) {
                sourceWorkgroups.splice(targetIndex, 1);
                currentPortfolio.workgroupsByTest[timeCode] = currentPortfolio.workgroupsByTest[timeCode] || [];
                currentPortfolio.workgroupsByTest[timeCode].push(targetWorkgroup);
            }

            selectedTestCode = timeCode;
            showSuccessToast('Workgroup Updated Successfully');
        }

        workgroupsCurrentPage = 1;
        renderWorkgroups(currentPortfolio, selectedTestCode);
        closeWorkgroupModal();
    }

    function showWorkgroupDeleteConfirmation(workgroupKey) {
        if (!elDeleteModal || !elDeleteMessage) {
            return;
        }

        pendingDeleteWorkgroupKeys = [];
        pendingDeleteWorkgroupKey = workgroupKey;
        elDeleteMessage.textContent = 'Delete this workgroup?';
        elDeleteModal.classList.add('pm-delete-modal-show');
        elDeleteModal.setAttribute('aria-hidden', 'false');
    }

    function deleteWorkgroup() {
        if (!pendingDeleteWorkgroupKey || !currentPortfolio || !selectedTestCode) {
            return;
        }

        var parts = pendingDeleteWorkgroupKey.split('::');
        var timeCodeForDelete = parts[0];
        var workGrpToDelete = parts[1];

        if (!currentPortfolio.workgroupsByTest || !currentPortfolio.workgroupsByTest[timeCodeForDelete]) {
            return;
        }

        currentPortfolio.workgroupsByTest[timeCodeForDelete] = currentPortfolio.workgroupsByTest[timeCodeForDelete].filter(function(item) {
            return item.workGrp !== workGrpToDelete;
        });

        delete selectedWorkgroupKeys[timeCodeForDelete + '::' + workGrpToDelete];

        workgroupsCurrentPage = 1;
        renderWorkgroups(currentPortfolio, selectedTestCode);
        showSuccessToast('Workgroup Deleted Successfully');
    }

    function sortArray(data, column, direction) {
        if (!column) return data;
        
        var sorted = (data || []).slice();
        sorted.sort(function(a, b) {
            var aVal = a[column];
            var bVal = b[column];
            
            if (aVal === null || aVal === undefined) aVal = '';
            if (bVal === null || bVal === undefined) bVal = '';
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        return sorted;
    }

    function getSortedTestData() {
        var filtered = getFilteredTests(currentPortfolio);
        return sortArray(filtered, constituentSortColumn, constituentSortDir);
    }

    function getSortedWorkgroupData(testCode) {
        var data = (currentPortfolio && currentPortfolio.workgroupsByTest && currentPortfolio.workgroupsByTest[testCode]) || [];
        return sortArray(data, workgroupsSortColumn, workgroupsSortDir);
    }

    function updateSortIndicators() {
        var constituentHeaders = document.querySelectorAll('#pmConstituentScroll th.pm-sortable');
        constituentHeaders.forEach(function(header) {
            header.classList.remove('pm-sort-asc', 'pm-sort-desc');
            if (header.getAttribute('data-column') === constituentSortColumn) {
                if (constituentSortDir === 'asc') {
                    header.classList.add('pm-sort-asc');
                } else {
                    header.classList.add('pm-sort-desc');
                }
            }
        });

        var workgroupsHeaders = document.querySelectorAll('#pmWorkgroupsScroll th.pm-sortable');
        workgroupsHeaders.forEach(function(header) {
            header.classList.remove('pm-sort-asc', 'pm-sort-desc');
            if (header.getAttribute('data-column') === workgroupsSortColumn) {
                if (workgroupsSortDir === 'asc') {
                    header.classList.add('pm-sort-asc');
                } else {
                    header.classList.add('pm-sort-desc');
                }
            }
        });
    }

    function enableResizableColumns(tableSelector, options) {
        options = options || {};

        var table = document.querySelector(tableSelector);
        if (!table || table.dataset.pmResizableInit === 'true') {
            return;
        }

        var head = table.tHead;
        var headerRow = head && head.rows && head.rows[0];
        if (!headerRow) {
            return;
        }

        var headers = Array.prototype.slice.call(headerRow.cells || []);
        if (!headers.length) {
            return;
        }

        function syncTableWidth() {
            if (options.preserveContainerWidth) {
                table.style.width = '100%';
                table.style.minWidth = '0';
                return;
            }

            var totalWidth = headers.reduce(function (sum, cell) {
                var width = parseFloat(cell.style.width);
                if (!Number.isFinite(width) || width <= 0) {
                    width = cell.getBoundingClientRect().width;
                }
                return sum + width;
            }, 0);

            if (totalWidth > 0) {
                table.style.width = totalWidth + 'px';
                table.style.minWidth = totalWidth + 'px';
            }
        }

        table.style.tableLayout = 'fixed';

        headers.forEach(function (headerCell) {
            var initialWidth = headerCell.getBoundingClientRect().width;
            if (initialWidth > 0) {
                headerCell.style.width = initialWidth + 'px';
            }

            headerCell.classList.add('pm-resizable-th');

            var handle = document.createElement('span');
            handle.className = 'pm-col-resizer';
            handle.setAttribute('aria-hidden', 'true');
            headerCell.appendChild(handle);

            handle.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });

            handle.addEventListener('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var startX = event.clientX;
                var startWidth = headerCell.getBoundingClientRect().width;
                var minWidth = 56;

                document.body.classList.add('pm-col-resize-active');
                handle.classList.add('is-active');

                function onMouseMove(moveEvent) {
                    var deltaX = moveEvent.clientX - startX;
                    var nextWidth = Math.max(minWidth, startWidth + deltaX);
                    headerCell.style.width = nextWidth + 'px';
                    syncTableWidth();
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    document.body.classList.remove('pm-col-resize-active');
                    handle.classList.remove('is-active');
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });

        syncTableWidth();
        table.dataset.pmResizableInit = 'true';
    }

    function createActionCell() {


        return ''
            + '<td class="pm-action-cell">'
            + '<a href="#" class="pm-action-link pm-delete" aria-label="Delete row"><img src="../images/trash-can-regular-full.svg" alt="Delete row" width="16" height="16"></a>'
            + '</td>';
    }

    function renderConstituentTests(portfolio) {
        elConstituentBody.innerHTML = '';
        var sortedTests = getSortedTestData();
        var totalPages = Math.max(1, Math.ceil(sortedTests.length / constituentPageSize));
        if (constituentCurrentPage > totalPages) {
            constituentCurrentPage = totalPages;
        }

        var startIndex = (constituentCurrentPage - 1) * constituentPageSize;
        var pageTests = sortedTests.slice(startIndex, startIndex + constituentPageSize);

        pageTests.forEach(function (test) {
            var tr = document.createElement('tr');
            tr.innerHTML = ''
                + '<td>' + test.testCode + '</td>'
                + '<td>' + test.itemDescription + '</td>'
                + '<td>' + test.workGrp + '</td>'
                + createActionCell();

            elConstituentBody.appendChild(tr);

            var links = tr.querySelectorAll('a.pm-action-link');
            links.forEach(function (link) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (link.classList.contains('pm-edit')) {
                        openEditModal(test);
                    }

                    if (link.classList.contains('pm-delete')) {
                        showDeleteConfirmation(test.testCode);
                    }
                });
            });

            tr.addEventListener('click', function () {
                selectedTestCode = test.testCode;
                clearWorkgroupSelections();
                updateConstituentSelection();
                renderWorkgroups(portfolio, selectedTestCode);
            });
        });

        if (!selectedTestCode || !sortedTests.some(function (item) { return item.testCode === selectedTestCode; })) {
            selectedTestCode = sortedTests.length ? sortedTests[0].testCode : '';
        }
        updateConstituentSelection();
        renderGridPagination(elConstituentPagination, constituentCurrentPage, totalPages, function (page) {
            constituentCurrentPage = page;
            renderConstituentTests(currentPortfolio);
        });
    }

    function updateConstituentSelection() {
        var rows = elConstituentBody.querySelectorAll('tr');
        rows.forEach(function (row) {
            var testCell = row.querySelector('td');
            if (testCell && testCell.textContent === selectedTestCode) {
                row.classList.add('is-selected');
            } else {
                row.classList.remove('is-selected');
            }
        });

        elSelectedPortfolioTest.value = selectedTestCode;
    }

    function renderWorkgroups(portfolio, testCode) {
        var sortedRows = getSortedWorkgroupData(testCode);
        elWorkgroupsBody.innerHTML = '';

        var totalPages = Math.max(1, Math.ceil(sortedRows.length / workgroupsPageSize));
        if (workgroupsCurrentPage > totalPages) {
            workgroupsCurrentPage = totalPages;
        }

        var startIndex = (workgroupsCurrentPage - 1) * workgroupsPageSize;
        var pageRows = sortedRows.slice(startIndex, startIndex + workgroupsPageSize);

        pageRows.forEach(function (item, rowIndex) {
            var selectionKey = buildWorkgroupSelectionKey(item);
            var checkboxId = 'pmWorkgroupSelect_' + String(startIndex + rowIndex);
            var tr = document.createElement('tr');
            tr.innerHTML = ''
                + '<td class="pm-workgroup-select-cell">'
                + '<div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes" style="display:flex;justify-content:center;">'
                + '<div class="govuk-checkboxes__item" style="margin-bottom:0;min-height:auto;">'
                + '<input type="checkbox" class="govuk-checkboxes__input pm-workgroup-bulk-checkbox" id="' + checkboxId + '" data-key="' + selectionKey + '" ' + (selectedWorkgroupKeys[selectionKey] ? 'checked' : '') + '>'
                + '<label class="govuk-label govuk-checkboxes__label govuk-!-static-margin-0 govuk-!-static-padding-0" for="' + checkboxId + '">&nbsp;</label>'
                + '</div>'
                + '</div>'
                + '</td>'
                + '<td>' + item.workGrp + '</td>'
                + '<td>' + (item.active ? 'Yes' : 'No') + '</td>'
                + '<td>' + item.timeCode + '</td>'
                + '<td>' + item.project + '</td>'
                + '<td>' + item.testCode + '</td>'
                + '<td>' + item.portfolio + '</td>'
                + '<td class="pm-action-cell">'
                + '<a href="#" class="pm-action-link pm-edit" aria-label="Edit row"><img src="../images/pen-to-square-regular-full.svg" alt="Edit" width="16" height="16"></a>'
                + '<a href="#" class="pm-action-link pm-delete" aria-label="Delete row"><img src="../images/trash-can-regular-full.svg" alt="Delete row" width="16" height="16"></a>'
                + '</td>';
            elWorkgroupsBody.appendChild(tr);

            var links = tr.querySelectorAll('a.pm-action-link');
            links.forEach(function (link) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (link.classList.contains('pm-edit')) {
                        openWorkgroupEditModal(item);
                    }

                    if (link.classList.contains('pm-delete')) {
                        showWorkgroupDeleteConfirmation(item.timeCode + '::' + item.workGrp);
                    }
                });
            });

            var rowCheckbox = tr.querySelector('.pm-workgroup-bulk-checkbox');
            if (rowCheckbox) {
                rowCheckbox.addEventListener('change', function (event) {
                    event.stopPropagation();
                    var key = rowCheckbox.getAttribute('data-key');
                    if (rowCheckbox.checked) {
                        selectedWorkgroupKeys[key] = true;
                    } else {
                        delete selectedWorkgroupKeys[key];
                    }
                    updateWorkgroupBulkControls();
                });

                rowCheckbox.addEventListener('click', function (event) {
                    event.stopPropagation();
                });
            }
        });

        updateWorkgroupBulkControls();

        renderGridPagination(elWorkgroupsPagination, workgroupsCurrentPage, totalPages, function (page) {
            workgroupsCurrentPage = page;
            renderWorkgroups(currentPortfolio, selectedTestCode);
        });
    }

    function loadPortfolio(code) {
        var portfolio = getPortfolioByCode(code);
        if (!portfolio) {
            return;
        }

        currentPortfolio = portfolio;
        setSelectedPortfolioDisplay(portfolio);
        constituentCurrentPage = 1;
        workgroupsCurrentPage = 1;
        selectedTestCode = '';
        clearWorkgroupSelections();
        testSearchTerm = '';
        if (elTestSearch) {
            elTestSearch.value = '';
        }
        renderPortfolioDetails(portfolio);
        renderConstituentTests(portfolio);
        renderWorkgroups(portfolio, selectedTestCode);
        renderPortfolioPickerRows(getPortfolioFilterTerm());
    }

    function initActions() {
        if (elPortfolioInput) {
            elPortfolioInput.addEventListener('click', function (event) {
                event.stopPropagation();
                openPortfolioPanel();
            });

            elPortfolioInput.addEventListener('focus', function (event) {
                event.stopPropagation();
                openPortfolioPanel();
            });

            elPortfolioInput.addEventListener('input', function () {
                openPortfolioPanel();
                renderPortfolioPickerRows(getPortfolioFilterTerm());
            });

            elPortfolioInput.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    resetPortfolioInputToSelection();
                    closePortfolioPanel();
                }
            });
        }

        document.addEventListener('click', function (event) {
            if (!elPortfolioPicker || elPortfolioPicker.contains(event.target)) {
                return;
            }

            resetPortfolioInputToSelection();
            closePortfolioPanel();
        });

        if (elReloadBtn) {
            elReloadBtn.addEventListener('click', function () {
                loadPortfolio(elPortfolioSelect.value);
            });
        }

        if (elAddTestBtn) {
            elAddTestBtn.addEventListener('click', function () {
                openAddModal();
            });
        }

        if (elTestCodeSelect) {
            elTestCodeSelect.addEventListener('change', function () {
                clearFieldValidation(elTestCodeSelect, elTestCodeError);
                hideErrorMessage(elFormError);

                if (!isAddMode || !elDescriptionInput) {
                    return;
                }

                if (elDescriptionInput.value.trim()) {
                    return;
                }

                var selectedCode = (elTestCodeSelect.value || '').trim();
                if (!selectedCode) {
                    return;
                }

                var knownDescription = getDescriptionByTestCode(selectedCode);
                if (knownDescription) {
                    elDescriptionInput.value = knownDescription;
                }
            });
        }

        if (elWorkGroupSelect) {
            elWorkGroupSelect.addEventListener('change', function () {
                clearFieldValidation(elWorkGroupSelect, elWorkGroupError);
            });
        }

        if (elDescriptionInput) {
            elDescriptionInput.addEventListener('input', function () {
                clearFieldValidation(elDescriptionInput, elDescriptionError);
            });
        }

        if (elSaveBtn) {
            elSaveBtn.addEventListener('click', function () {
                if (!currentPortfolio) {
                    closeModal();
                    return;
                }

                var selectedCode = (elTestCodeSelect && elTestCodeSelect.value || '').trim();
                var selectedWorkGroup = (elWorkGroupSelect && elWorkGroupSelect.value || '').trim();
                var selectedDescription = (elDescriptionInput && elDescriptionInput.value || '').trim();

                if (!validateModalFields({
                    code: selectedCode,
                    workGroup: selectedWorkGroup,
                    description: selectedDescription
                })) {
                    return;
                }

                if (isAddMode) {
                    var alreadyExists = (currentPortfolio.constituentTests || []).some(function (item) {
                        return item.testCode === selectedCode;
                    });

                    if (alreadyExists) {
                        showErrorMessage(elFormError, 'This test code already exists in the current portfolio.');
                        setAllModalFieldsErrorState(true);
                        return;
                    }

                    currentPortfolio.constituentTests = currentPortfolio.constituentTests || [];
                    currentPortfolio.constituentTests.push({
                        testCode: selectedCode,
                        itemDescription: selectedDescription,
                        workGrp: selectedWorkGroup
                    });

                    currentPortfolio.workgroupsByTest = currentPortfolio.workgroupsByTest || {};
                    currentPortfolio.workgroupsByTest[selectedCode] = [
                        {
                            workGrp: selectedWorkGroup,
                            active: true,
                            timeCode: selectedCode,
                            project: currentPortfolio.code,
                            testCode: selectedCode,
                            portfolio: currentPortfolio.code
                        }
                    ];

                    selectedTestCode = selectedCode;
                    constituentCurrentPage = 1;
                    renderConstituentTests(currentPortfolio);
                    renderWorkgroups(currentPortfolio, selectedTestCode);
                    closeModal();
                    showSuccessToastAfterGridSave(selectedCode, 'Test Code Data Added Successfully');
                    return;
                }

                if (!editingTestCode) {
                    closeModal();
                    return;
                }

                var testToUpdate = (currentPortfolio.constituentTests || []).find(function (item) {
                    return item.testCode === editingTestCode;
                });

                if (!testToUpdate) {
                    closeModal();
                    return;
                }

                var updatedDescription = selectedDescription;
                var updatedWorkGroup = selectedWorkGroup;

                testToUpdate.itemDescription = updatedDescription || testToUpdate.itemDescription;
                testToUpdate.workGrp = updatedWorkGroup || testToUpdate.workGrp;

                var relatedWorkgroups = (currentPortfolio.workgroupsByTest && currentPortfolio.workgroupsByTest[editingTestCode]) || [];
                if (relatedWorkgroups.length && updatedWorkGroup) {
                    relatedWorkgroups[0].workGrp = updatedWorkGroup;
                }

                renderConstituentTests(currentPortfolio);
                renderWorkgroups(currentPortfolio, selectedTestCode);
                closeModal();
                showSuccessToastAfterGridSave(editingTestCode, 'Test Code Data Edited & Saved Successfully');
            });
        }

        if (elModalCancelBtn) {
            elModalCancelBtn.addEventListener('click', function () {
                closeModal();
            });
        }

        if (elTestSearch) {
            elTestSearch.addEventListener('input', function () {
                testSearchTerm = (elTestSearch.value || '').trim();
                constituentCurrentPage = 1;
                renderConstituentTests(currentPortfolio);
            });
        }

        elTimeCodesBtn.addEventListener('click', function () {
            window.location.href = 'timerecording.html';
        });

        elOverheadBtn.addEventListener('click', function () {
            window.alert('Overhead (TP/TG Style) Codes screen is not yet linked in this prototype.');
        });

        if (elConstituentPageSize) {
            elConstituentPageSize.addEventListener('change', function () {
                constituentPageSize = Number(elConstituentPageSize.value) || 10;
                constituentCurrentPage = 1;
                renderConstituentTests(currentPortfolio);
            });
        }

        if (elWorkgroupsPageSize) {
            elWorkgroupsPageSize.addEventListener('change', function () {
                workgroupsPageSize = Number(elWorkgroupsPageSize.value) || 10;
                workgroupsCurrentPage = 1;
                renderWorkgroups(currentPortfolio, selectedTestCode);
            });
        }

        if (elSelectAllWorkgroups) {
            elSelectAllWorkgroups.addEventListener('change', function () {
                var checkboxes = elWorkgroupsBody ? elWorkgroupsBody.querySelectorAll('.pm-workgroup-bulk-checkbox') : [];
                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = elSelectAllWorkgroups.checked;
                    var key = checkbox.getAttribute('data-key');
                    if (checkbox.checked) {
                        selectedWorkgroupKeys[key] = true;
                    } else {
                        delete selectedWorkgroupKeys[key];
                    }
                });

                updateWorkgroupBulkControls();
            });
        }

        if (elDeleteAllWorkgroupsBtn) {
            elDeleteAllWorkgroupsBtn.addEventListener('click', function () {
                showDeleteSelectedWorkgroupsConfirmation(getSelectedWorkgroupKeys());
            });
        }

        var constituentTableHeaders = document.querySelectorAll('#pmConstituentScroll th.pm-sortable');
        constituentTableHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                var column = header.getAttribute('data-column');
                if (constituentSortColumn === column) {
                    constituentSortDir = constituentSortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    constituentSortColumn = column;
                    constituentSortDir = 'asc';
                }
                constituentCurrentPage = 1;
                renderConstituentTests(currentPortfolio);
                updateSortIndicators();
            });
        });

        var workgroupsTableHeaders = document.querySelectorAll('#pmWorkgroupsScroll th.pm-sortable');
        workgroupsTableHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                var column = header.getAttribute('data-column');
                if (workgroupsSortColumn === column) {
                    workgroupsSortDir = workgroupsSortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    workgroupsSortColumn = column;
                    workgroupsSortDir = 'asc';
                }
                workgroupsCurrentPage = 1;
                renderWorkgroups(currentPortfolio, selectedTestCode);
                updateSortIndicators();
            });
        });

        updateSortIndicators();

        if (elDeleteConfirmBtn) {
            elDeleteConfirmBtn.addEventListener('click', function () {
                if (pendingDeleteTestCode) {
                    deleteTest(pendingDeleteTestCode);
                    closeDeleteModal();
                } else if (pendingDeleteWorkgroupKeys.length) {
                    deleteSelectedWorkgroups();
                    closeDeleteModal();
                } else if (pendingDeleteWorkgroupKey) {
                    deleteWorkgroup();
                    closeDeleteModal();
                }
            });
        }

        if (elDeleteCancelBtn) {
            elDeleteCancelBtn.addEventListener('click', function () {
                closeDeleteModal();
            });
        }

        if (elDeleteBackdrop) {
            elDeleteBackdrop.addEventListener('click', function () {
                closeDeleteModal();
            });
        }

        if (elAddWorkgroupBtn) {
            elAddWorkgroupBtn.addEventListener('click', function () {
                openWorkgroupAddModal();
            });
        }

        if (elWorkgroupSaveBtn) {
            elWorkgroupSaveBtn.addEventListener('click', function () {
                saveWorkgroup();
            });
        }
    }

    Promise.all([loadDataFromJson(), loadPortfolioPickerJson()]).finally(function () {
        hydratePortfoliosFromSeed();
        renderPortfolioPickerRows('');
        initFieldDropdowns();
        initActions();
        enableResizableColumns('#pmConstituentScroll table.pm-grid-table', { preserveContainerWidth: true });
        enableResizableColumns('#pmWorkgroupsScroll table.pm-grid-table');
        if (portfolios.length) {
            loadPortfolio(portfolios[0].code);
        }
    });
}());
