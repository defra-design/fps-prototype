/* =================================================================
   FPS – Setup Resource: RC / WG grade & staff selection logic
   ID prefix: fpsSr  (FPS Setup Resource)
   ================================================================= */

(function () {
    'use strict';

    /* ---------- Seeded data ---------------------------------------- */
    var srData = {
        rcGrades: [
            { rcGrade: 'A_BAC5', chargeRate: 129.72, wgGrades: ['A_BAC1', 'A_BAC2', 'A_BAC3', 'A_BAC4', 'A_BAC5'] },
            { rcGrade: 'A-Bact', chargeRate: 129.72, wgGrades: ['A_BAC1', 'A_BAC2', 'A_BAC3', 'A_BAC4', 'A_BAC5'] },
            { rcGrade: 'B_BAC5', chargeRate: 115.43, wgGrades: ['B_BAC1', 'B_BAC2', 'B_BAC3'] },
            { rcGrade: 'B-Bact', chargeRate: 115.43, wgGrades: ['B_BAC1', 'B_BAC2', 'B_BAC3'] },
            { rcGrade: 'C_BAC5', chargeRate: 95.26, wgGrades: ['C_BAC1', 'C_BAC2', 'C_BAC3'] },
            { rcGrade: 'C-Bact', chargeRate: 95.26, wgGrades: ['C_BAC1', 'C_BAC2', 'C_BAC3'] },
            { rcGrade: 'D_BAC5', chargeRate: 80.27, wgGrades: ['D_BAC1', 'D_BAC2', 'D_BAC3'] },
            { rcGrade: 'D-Bact', chargeRate: 80.27, wgGrades: ['D_BAC1', 'D_BAC2', 'D_BAC3'] },
            { rcGrade: 'E_BAC5', chargeRate: 72.96, wgGrades: ['E_BAC1', 'E_BAC2', 'E_BAC3'] },
            { rcGrade: 'E-Bact', chargeRate: 72.96, wgGrades: ['E_BAC1', 'E_BAC2', 'E_BAC3'] },
            { rcGrade: 'F_BAC5', chargeRate: 66.29, wgGrades: ['F_BAC1', 'F_BAC2', 'F_BAC3'] },
            { rcGrade: 'F-Bact', chargeRate: 66.29, wgGrades: ['F_BAC1', 'F_BAC2', 'F_BAC3'] }
        ],
        staffByWg: {
            A_BAC1: [
                { spNo: 140748, name: 'East Samantha', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: false },
                { spNo: 304219, name: 'Tilte Mordecai', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: false },
                { spNo: 184684, name: 'Marquet Kort', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: true },
                { spNo: 'G388', name: 'A_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 3714, planable: true }
            ],
            A_BAC2: [
                { spNo: 'G208', name: 'A_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1920, planable: true },
                { spNo: 264197, name: 'Daniel Harper', hrsPaid: 0, leave: 8, sickSp: 0, atWork: 1460, planable: true }
            ],
            A_BAC3: [
                { spNo: 'G148', name: 'A_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 2100, planable: true },
                { spNo: 119482, name: 'Mabel Clarke', hrsPaid: 0, leave: 0, sickSp: 12, atWork: 1300, planable: true }
            ],
            A_BAC4: [
                { spNo: 'G809', name: 'A_BAC4 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: true },
                { spNo: 310248, name: 'Balloch Mathaeus', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: true },
                { spNo: 1016974, name: 'Joiner Susanetta', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: false }
            ],
            A_BAC5: [
                { spNo: 'G991', name: 'A_BAC5 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 2440, planable: true },
                { spNo: 882191, name: 'Parker Jules', hrsPaid: 0, leave: 6, sickSp: 0, atWork: 1680, planable: true }
            ],
            B_BAC1: [{ spNo: 'G100', name: 'B_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1820, planable: true }],
            B_BAC2: [{ spNo: 'G101', name: 'B_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1640, planable: true }],
            B_BAC3: [{ spNo: 'G102', name: 'B_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1500, planable: true }],
            C_BAC1: [{ spNo: 'G200', name: 'C_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1400, planable: true }],
            C_BAC2: [{ spNo: 'G201', name: 'C_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1300, planable: true }],
            C_BAC3: [{ spNo: 'G202', name: 'C_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1200, planable: true }],
            D_BAC1: [{ spNo: 'G300', name: 'D_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1100, planable: true }],
            D_BAC2: [{ spNo: 'G301', name: 'D_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 1000, planable: true }],
            D_BAC3: [{ spNo: 'G302', name: 'D_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 900, planable: true }],
            E_BAC1: [{ spNo: 'G400', name: 'E_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 800, planable: true }],
            E_BAC2: [{ spNo: 'G401', name: 'E_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 750, planable: true }],
            E_BAC3: [{ spNo: 'G402', name: 'E_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 700, planable: true }],
            F_BAC1: [{ spNo: 'G500', name: 'F_BAC1 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 600, planable: true }],
            F_BAC2: [{ spNo: 'G501', name: 'F_BAC2 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 550, planable: true }],
            F_BAC3: [{ spNo: 'G502', name: 'F_BAC3 General', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 500, planable: true }]
        }
    };

    // Expand demo data so the page has richer, scrollable records in every grid.
    (function expandDemoData() {
        var additionalRcGrades = [
            { rcGrade: 'G_BAC5', chargeRate: 58.44, wgGrades: ['G_BAC1', 'G_BAC2', 'G_BAC3'] },
            { rcGrade: 'G-Bact', chargeRate: 58.44, wgGrades: ['G_BAC1', 'G_BAC2', 'G_BAC3'] },
            { rcGrade: 'H_BAC5', chargeRate: 52.18, wgGrades: ['H_BAC1', 'H_BAC2', 'H_BAC3'] },
            { rcGrade: 'H-Bact', chargeRate: 52.18, wgGrades: ['H_BAC1', 'H_BAC2', 'H_BAC3'] },
            { rcGrade: 'I_ASU5', chargeRate: 48.9, wgGrades: ['I_ASU1', 'I_ASU2', 'I_ASU3'] },
            { rcGrade: 'J_ASU5', chargeRate: 44.25, wgGrades: ['J_ASU1', 'J_ASU2', 'J_ASU3'] }
        ];

        additionalRcGrades.forEach(function (item) {
            var exists = srData.rcGrades.some(function (existing) {
                return existing.rcGrade === item.rcGrade;
            });
            if (!exists) {
                srData.rcGrades.push(item);
            }
        });

        var firstNames = ['Ava', 'Noah', 'Mia', 'Luca', 'Isla', 'Ethan', 'Aria', 'Hugo', 'Nora', 'Theo', 'Ivy', 'Mason', 'Freya', 'Leo', 'Ruby', 'Oscar'];
        var lastNames = ['Baker', 'Turner', 'Cole', 'Wright', 'Reed', 'Foster', 'Riley', 'Mills', 'Hunter', 'Dixon', 'Perry', 'Grant', 'Shaw', 'Porter', 'Ellis', 'Ward'];
        var minimumRowsPerWg = 10;

        function createDemoPerson(wgCode, index) {
            var fname = firstNames[(index + wgCode.length) % firstNames.length];
            var lname = lastNames[(index * 3 + wgCode.length) % lastNames.length];
            var hrsPaid = 1460 + ((index * 37) % 420);
            var leave = (index * 2) % 20;
            var sickSp = index % 7;
            var atWork = Math.max(0, hrsPaid - leave - sickSp);
            return {
                spNo: 700000 + (index * 13) + wgCode.length,
                name: fname + ' ' + lname,
                hrsPaid: hrsPaid,
                leave: leave,
                sickSp: sickSp,
                atWork: atWork,
                planable: index % 5 !== 0
            };
        }

        var seenWg = {};
        srData.rcGrades.forEach(function (rc, rcIndex) {
            (rc.wgGrades || []).forEach(function (wg, wgIndex) {
                if (seenWg[wg]) {
                    return;
                }
                seenWg[wg] = true;

                if (!Array.isArray(srData.staffByWg[wg])) {
                    srData.staffByWg[wg] = [];
                }

                if (srData.staffByWg[wg].length === 0) {
                    srData.staffByWg[wg].push({
                        spNo: 'G' + (100 + rcIndex * 10 + wgIndex),
                        name: wg + ' General',
                        hrsPaid: 0,
                        leave: 0,
                        sickSp: 0,
                        atWork: 1600,
                        planable: true
                    });
                }

                while (srData.staffByWg[wg].length < minimumRowsPerWg) {
                    var demoIndex = srData.staffByWg[wg].length + rcIndex + wgIndex;
                    srData.staffByWg[wg].push(createDemoPerson(wg, demoIndex));
                }
            });
        });
    }());

    function cloneDataModel(data) {
        return JSON.parse(JSON.stringify(data));
    }

    function centreCode(label) {
        return String(label || '').replace(/[^A-Za-z]/g, '').toUpperCase() || 'RC';
    }

    function buildDatasetForCentre(centreLabel) {
        var rcRates = [129.72, 115.43, 95.26, 80.27, 72.96, 66.29];
        var rcLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
        var code = centreCode(centreLabel);
        var rcGrades = [];
        var staffByWg = {};
        var firstNames = ['Ava', 'Noah', 'Mia', 'Luca', 'Isla', 'Ethan', 'Aria', 'Hugo', 'Nora', 'Theo', 'Ivy', 'Mason', 'Freya', 'Leo', 'Ruby', 'Oscar'];
        var lastNames = ['Baker', 'Turner', 'Cole', 'Wright', 'Reed', 'Foster', 'Riley', 'Mills', 'Hunter', 'Dixon', 'Perry', 'Grant', 'Shaw', 'Porter', 'Ellis', 'Ward'];

        function buildStaffList(wg, idx, wgIndex) {
            var staffList = [];
            var entryCount = 8;
            var baseSpNo = 100000 + (idx * 1000) + (wgIndex * 100);
            var generalAtWork = 1200 + (idx * 50);

            staffList.push({
                spNo: 'G' + (500 + idx * 10 + wgIndex),
                name: wg + ' General',
                hrsPaid: 0,
                leave: 0,
                sickSp: 0,
                atWork: generalAtWork,
                planable: true
            });

            for (var personIndex = 0; personIndex < entryCount - 1; personIndex += 1) {
                var seed = idx * 10 + wgIndex * 3 + personIndex;
                var firstName = firstNames[seed % firstNames.length];
                var lastName = lastNames[(seed * 2) % lastNames.length];
                var hrsPaid = 1460 + ((personIndex * 37 + idx * 19) % 280);
                var leave = (personIndex + wgIndex) % 14;
                var sickSp = (personIndex + idx) % 5;
                staffList.push({
                    spNo: String(baseSpNo + personIndex + 1),
                    name: firstName + ' ' + lastName,
                    hrsPaid: hrsPaid,
                    leave: leave,
                    sickSp: sickSp,
                    atWork: Math.max(0, hrsPaid - leave - sickSp),
                    planable: personIndex % 4 !== 0
                });
            }

            return staffList;
        }

        rcLetters.forEach(function (letter, idx) {
            var wgGrades = idx === 0
                ? [letter + '_' + code + '1', letter + '_' + code + '2', letter + '_' + code + '3', letter + '_' + code + '4', letter + '_' + code + '5']
                : [letter + '_' + code + '1', letter + '_' + code + '2', letter + '_' + code + '3'];

            rcGrades.push({
                rcGrade: letter + '-' + centreLabel,
                chargeRate: rcRates[idx],
                wgGrades: wgGrades
            });

            wgGrades.forEach(function (wg, wgIndex) {
                staffByWg[wg] = buildStaffList(wg, idx, wgIndex);
            });
        });

        return {
            rcGrades: rcGrades,
            staffByWg: staffByWg
        };
    }

    var resourceCentres = ['B&M', 'Bact', 'Build', 'BTB', 'DoES', 'IDBAC', 'IMT', 'LabT', 'Path', 'SIU', 'SLSD', 'SSP', 'Viro', 'Wildlife'];
    var resourceCentreData = {
        Bact: cloneDataModel(srData)
    };

    resourceCentres.forEach(function (centre) {
        if (!resourceCentreData[centre]) {
            resourceCentreData[centre] = buildDatasetForCentre(centre);
        }
    });

    /* ---------- State --------------------------------------------- */
    var selectedResourceCentre = '';
    var activeSrData = {
        rcGrades: [],
        staffByWg: {}
    };
    var selectedRc = '';
    var selectedWg = '';
    var selectedPerson = '';
    var editingStaffKey = '';
    var hasChosenResourceCentre = false;

    /* ---------- DOM refs ------------------------------------------ */
    var elRcBody = document.getElementById('fpsSrRcBody');
    var elWgBody = document.getElementById('fpsSrWgBody');
    var elStaffBody = document.getElementById('fpsSrStaffBody');
    var elRcFilter = document.getElementById('fpsSrRcFilter');
    var elSelectedWg = document.getElementById('fpsSrSelectedWg');
    var elPersonName = document.getElementById('fpsSrPersonName');
    var elPlanBtn = document.getElementById('fpsSrPlanBtn');
    var elResourceCentreModal = document.getElementById('exampleModal');
    var elResourceCentreForm = document.getElementById('fpsSrResourceCentreForm');
    var elResourceCentreSelect = document.getElementById('fpsSrResourceCentreSelect');
    var elResourceCentreGoBtn = document.getElementById('fpsSrResourceCentreGoBtn');
    var elResultProgram = document.getElementById('resultprogram');
    var elStaffEditModal = document.getElementById('fpsSrStaffEditModal');
    var elStaffEditForm = document.getElementById('fpsSrStaffEditForm');
    var elStaffEditSpNo = document.getElementById('fpsSrEditSpNo');
    var elStaffEditName = document.getElementById('fpsSrEditName');
    var elStaffEditHrsPaid = document.getElementById('fpsSrEditHrsPaid');
    var elStaffEditLeave = document.getElementById('fpsSrEditLeave');
    var elStaffEditSickSp = document.getElementById('fpsSrEditSickSp');
    var elStaffEditAtWork = document.getElementById('fpsSrEditAtWork');
    var elStaffEditPlanable = document.getElementById('fpsSrEditPlanable');
    var elStaffEditCloseBtn = document.getElementById('fpsSrStaffEditCloseBtn');
    var elStaffEditCancelBtn = document.getElementById('fpsSrStaffEditCancelBtn');
    var elStaffEditSaveBtn = document.getElementById('fpsSrStaffEditSaveBtn');
    var staffEditModalInstance = null;
    var resourceCentreModalInstance = null;

    if (!elRcBody || !elWgBody || !elStaffBody) { return; }

    /* ---------- Helpers ------------------------------------------- */
    function fmt(v) {
        return '€' + Number(v).toFixed(2);
    }

    function getWgGrades(rcGrade) {
        if (!activeSrData || !activeSrData.rcGrades) {
            return [];
        }
        var found = activeSrData.rcGrades.find(function (i) { return i.rcGrade === rcGrade; });
        return found ? found.wgGrades : [];
    }

    function getStaffKey(person) {
        return String(person.spNo) + '|' + String(person.name);
    }

    function toNumberOrZero(value) {
        var n = Number(value);
        return Number.isFinite(n) ? n : 0;
    }

    function getCurrentStaffList() {
        if (!activeSrData || !activeSrData.staffByWg) {
            return [];
        }
        return activeSrData.staffByWg[selectedWg] || [];
    }

    function resetResourceTables() {
        elRcBody.innerHTML = '';
        elWgBody.innerHTML = '';
        elStaffBody.innerHTML = '';

        if (elRcFilter) {
            elRcFilter.value = '';
        }
        if (elSelectedWg) {
            elSelectedWg.value = '';
        }
        if (elPersonName) {
            elPersonName.textContent = '';
        }

        document.getElementById('fpsSrTotalHrsPaid').textContent = '0';
        document.getElementById('fpsSrTotalLeave').textContent = '0';
        document.getElementById('fpsSrTotalSick').textContent = '0';
        document.getElementById('fpsSrTotalAtWork').textContent = '0';
    }

    function findStaffByKey(staffKey) {
        var staffList = getCurrentStaffList();
        return staffList.find(function (person) {
            return getStaffKey(person) === staffKey;
        }) || null;
    }

    function openStaffEditModal(person) {
        if (!elStaffEditModal || !person) {
            return;
        }

        editingStaffKey = getStaffKey(person);
        elStaffEditSpNo.value = person.spNo;
        elStaffEditName.value = person.name;
        elStaffEditHrsPaid.value = person.hrsPaid;
        elStaffEditLeave.value = person.leave;
        elStaffEditSickSp.value = person.sickSp;
        elStaffEditAtWork.value = person.atWork;
        elStaffEditPlanable.checked = Boolean(person.planable);

        if (staffEditModalInstance) {
            staffEditModalInstance.show();
            return;
        }

        elStaffEditModal.classList.add('show');
        elStaffEditModal.style.display = 'block';
    }

    function closeStaffEditModal() {
        if (!elStaffEditModal) {
            return;
        }

        editingStaffKey = '';

        if (staffEditModalInstance) {
            staffEditModalInstance.hide();
            return;
        }

        elStaffEditModal.classList.remove('show');
        elStaffEditModal.style.display = 'none';
    }

    function saveStaffEditModal() {
        var person = findStaffByKey(editingStaffKey);
        if (!person) {
            closeStaffEditModal();
            return;
        }

        person.hrsPaid = toNumberOrZero(elStaffEditHrsPaid.value);
        person.leave = toNumberOrZero(elStaffEditLeave.value);
        person.sickSp = toNumberOrZero(elStaffEditSickSp.value);
        person.atWork = toNumberOrZero(elStaffEditAtWork.value);
        person.planable = Boolean(elStaffEditPlanable.checked);

        closeStaffEditModal();
        renderStaffTable();
    }

    /* ---------- Render functions ---------------------------------- */
    function renderRcTable() {
        elRcBody.innerHTML = '';
        activeSrData.rcGrades.forEach(function (item) {
            var row = document.createElement('tr');
            row.classList.add('govuk-table__row');
            row.tabIndex = 0;
            if (item.rcGrade === selectedRc) { row.classList.add('is-selected'); }
            row.innerHTML = '<td class="govuk-table__cell">' + item.rcGrade + '</td>'
                + '<td class="govuk-table__cell govuk-table__cell--numeric">' + fmt(item.chargeRate) + '</td>';
            row.addEventListener('click', function () { selectRc(item.rcGrade); });
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectRc(item.rcGrade); }
            });
            elRcBody.appendChild(row);
        });
    }

    function renderWgTable() {
        var wgGrades = getWgGrades(selectedRc);
        elWgBody.innerHTML = '';
        elRcFilter.value = selectedRc;
        wgGrades.forEach(function (wg) {
            var row = document.createElement('tr');
            row.classList.add('govuk-table__row');
            row.tabIndex = 0;
            if (wg === selectedWg) { row.classList.add('is-selected'); }
            row.innerHTML = '<td class="govuk-table__cell">' + wg + '</td>';
            row.addEventListener('click', function () { selectWg(wg); });
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectWg(wg); }
            });
            elWgBody.appendChild(row);
        });
    }

    function renderStaffTable() {
        var staffList = activeSrData.staffByWg[selectedWg] || [];
        elStaffBody.innerHTML = '';
        elSelectedWg.value = selectedWg;
        var totHrsPaid = 0, totLeave = 0, totSick = 0, totAtWork = 0;

        staffList.forEach(function (person, idx) {
            var row = document.createElement('tr');
            row.classList.add('govuk-table__row');
            row.tabIndex = 0;
            var isSelected = (person.name === selectedPerson) || (!selectedPerson && idx === 0);
            if (isSelected) { selectedPerson = person.name; row.classList.add('is-selected'); }

            row.innerHTML = '<td class="govuk-table__cell">' + person.spNo + '</td>'
                + '<td class="govuk-table__cell">' + person.name + '</td>'
                + '<td class="govuk-table__cell govuk-table__cell--numeric">' + person.hrsPaid + '</td>'
                + '<td class="govuk-table__cell govuk-table__cell--numeric">' + person.leave + '</td>'
                + '<td class="govuk-table__cell govuk-table__cell--numeric">' + person.sickSp + '</td>'
                + '<td class="govuk-table__cell govuk-table__cell--numeric">' + person.atWork + '</td>'
                + '<td class="govuk-table__cell"><input type="checkbox" aria-label="Planable for ' + person.name + '" ' + (person.planable ? 'checked' : '') + ' disabled></td>'
                + '<td class="govuk-table__cell fps-sr-staff-actions-cell">'
                + '<button type="button" class="email-edit-btn fps-sr-email-edit-btn" aria-label="Edit row for ' + person.name + '">'
                + '<img src="../images/pen-to-square-regular-full.svg" alt="Edit icon for selected record" class="editjobcode" width="20">'
                + '</button>'
                + '</td>';

            row.addEventListener('click', function (event) {
                if (event.target && event.target.closest('button, input, label')) {
                    return;
                }
                selectedPerson = person.name;
                renderStaffTable();
            });
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectedPerson = person.name;
                    renderStaffTable();
                }
            });

            var editBtn = row.querySelector('.fps-sr-edit-btn');
            if (!editBtn) {
                editBtn = row.querySelector('.fps-sr-email-edit-btn');
            }
            if (editBtn) {
                editBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    selectedPerson = person.name;
                    openStaffEditModal(person);
                });
            }

            totHrsPaid += Number(person.hrsPaid) || 0;
            totLeave += Number(person.leave) || 0;
            totSick += Number(person.sickSp) || 0;
            totAtWork += Number(person.atWork) || 0;
            elStaffBody.appendChild(row);
        });

        elPersonName.textContent = selectedPerson || '';
        document.getElementById('fpsSrTotalHrsPaid').textContent = totHrsPaid;
        document.getElementById('fpsSrTotalLeave').textContent = totLeave;
        document.getElementById('fpsSrTotalSick').textContent = totSick;
        document.getElementById('fpsSrTotalAtWork').textContent = totAtWork;
    }

    /* ---------- Selection handlers -------------------------------- */
    function selectRc(rcGrade) {
        selectedRc = rcGrade;
        var grades = getWgGrades(selectedRc);
        selectedWg = grades[0] || '';
        selectedPerson = '';
        editingStaffKey = '';
        renderRcTable();
        renderWgTable();
        renderStaffTable();
    }

    function selectWg(wgGrade) {
        selectedWg = wgGrade;
        selectedPerson = '';
        editingStaffKey = '';
        renderWgTable();
        renderStaffTable();
    }

    function cleanupResourceCentreModalState() {
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');

        document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
            backdrop.remove();
        });
    }

    function selectProgram() {
        if (!elResourceCentreSelect) {
            return;
        }

        var selectedCentre = (elResourceCentreSelect.value || '').trim();
        if (!selectedCentre) {
            elResourceCentreSelect.focus();
            return;
        }

        selectedResourceCentre = selectedCentre;
        hasChosenResourceCentre = true;
        activeSrData = resourceCentreData[selectedResourceCentre] || srData;

        if (elResultProgram) {
            elResultProgram.textContent = selectedResourceCentre;
        }

        var elRcTitle = document.getElementById('srPageRcTitle');
        if (elRcTitle) {
            elRcTitle.innerHTML = ' for <span style="color:#1d70b8; cursor:pointer; text-decoration:underline;" data-bs-toggle="modal" data-bs-target="#exampleModal">' + selectedResourceCentre + '</span>';
        }

        selectedRc = activeSrData.rcGrades.length ? activeSrData.rcGrades[0].rcGrade : '';
        selectedWg = getWgGrades(selectedRc)[0] || '';
        selectedPerson = '';
        editingStaffKey = '';

        renderRcTable();
        renderWgTable();
        renderStaffTable();

        if (resourceCentreModalInstance) {
            resourceCentreModalInstance.hide();
            cleanupResourceCentreModalState();
        } else if (elResourceCentreModal) {
            elResourceCentreModal.classList.remove('show');
            elResourceCentreModal.style.display = 'none';
            cleanupResourceCentreModalState();
        }
    }

    if (window.bootstrap && window.bootstrap.Modal && elStaffEditModal) {
        staffEditModalInstance = new window.bootstrap.Modal(elStaffEditModal, {
            backdrop: 'static'
        });
    }

    if (window.bootstrap && window.bootstrap.Modal && elResourceCentreModal) {
        resourceCentreModalInstance = new window.bootstrap.Modal(elResourceCentreModal, {
            backdrop: 'static',
            keyboard: false
        });
    }

    if (elResourceCentreGoBtn) {
        elResourceCentreGoBtn.addEventListener('click', selectProgram);
    }

    if (elResourceCentreForm) {
        elResourceCentreForm.addEventListener('submit', function (e) {
            e.preventDefault();
            selectProgram();
        });
    }

    if (elResourceCentreSelect) {
        elResourceCentreSelect.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                selectProgram();
            }
        });
    }

    if (elResourceCentreModal) {
        elResourceCentreModal.addEventListener('show.bs.modal', function () {
            if (elResourceCentreSelect) {
                elResourceCentreSelect.value = hasChosenResourceCentre ? selectedResourceCentre : '';
            }
        });

        elResourceCentreModal.addEventListener('hidden.bs.modal', function () {
            cleanupResourceCentreModalState();
        });
    }

    // Keep compatibility for old inline handlers.
    window.SelectProgram = selectProgram;

    if (elStaffEditCloseBtn) {
        elStaffEditCloseBtn.addEventListener('click', closeStaffEditModal);
    }
    if (elStaffEditCancelBtn) {
        elStaffEditCancelBtn.addEventListener('click', closeStaffEditModal);
    }
    if (elStaffEditSaveBtn) {
        elStaffEditSaveBtn.addEventListener('click', saveStaffEditModal);
    }
    if (elStaffEditForm) {
        elStaffEditForm.addEventListener('submit', function (e) {
            e.preventDefault();
            saveStaffEditModal();
        });
    }
    if (elStaffEditModal && !staffEditModalInstance) {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && elStaffEditModal.classList.contains('show')) {
                closeStaffEditModal();
            }
        });
    }

    /* ---------- Bootstrap ----------------------------------------- */
    resetResourceTables();

    if (resourceCentreModalInstance) {
        resourceCentreModalInstance.show();
    } else if (elResourceCentreModal) {
        elResourceCentreModal.classList.add('show');
        elResourceCentreModal.style.display = 'block';
    }

}());
