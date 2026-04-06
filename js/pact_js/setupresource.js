(function () {
    'use strict';

    const data = {
        rcGrades: [
            { grade: 'A_BAC5', rate: 129.72, wg: ['A_BAC1', 'A_BAC2', 'A_BAC3', 'A_BAC4', 'A_BAC5'] },
            { grade: 'A-Bact', rate: 129.72, wg: ['A_BAC1', 'A_BAC2', 'A_BAC3', 'A_BAC4', 'A_BAC5'] },
            { grade: 'B_BAC5', rate: 115.43, wg: ['B_BAC1', 'B_BAC2', 'B_BAC3'] },
            { grade: 'B-Bact', rate: 115.43, wg: ['B_BAC1', 'B_BAC2', 'B_BAC3'] },
            { grade: 'C_BAC5', rate: 95.26, wg: ['C_BAC1', 'C_BAC2', 'C_BAC3'] },
            { grade: 'C-Bact', rate: 95.26, wg: ['C_BAC1', 'C_BAC2', 'C_BAC3'] },
            { grade: 'D_BAC5', rate: 80.27, wg: ['D_BAC1', 'D_BAC2', 'D_BAC3'] },
            { grade: 'D-Bact', rate: 80.27, wg: ['D_BAC1', 'D_BAC2', 'D_BAC3'] },
            { grade: 'E_BAC5', rate: 72.96, wg: ['E_BAC1', 'E_BAC2', 'E_BAC3'] },
            { grade: 'E-Bact', rate: 72.96, wg: ['E_BAC1', 'E_BAC2', 'E_BAC3'] },
            { grade: 'F_BAC5', rate: 66.29, wg: ['F_BAC1', 'F_BAC2', 'F_BAC3'] },
            { grade: 'F-Bact', rate: 66.29, wg: ['F_BAC1', 'F_BAC2', 'F_BAC3'] }
        ],
        staffByWg: {
            A_BAC1: [
                { spNo: 140748, name: 'East Samantha', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: false },
                { spNo: 304219, name: 'Title Mordecai', hrsPaid: 0, leave: 0, sickSp: 0, atWork: 0, planable: true },
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
            ]
        }
    };

    let selectedRc = 'A-Bact';
    let selectedWg = 'A_BAC1';
    let selectedPerson = '';

    const elRcBody = document.getElementById('srRcBody');
    const elWgBody = document.getElementById('srWgBody');
    const elStaffBody = document.getElementById('srStaffBody');

    if (!elRcBody || !elWgBody || !elStaffBody) {
        return;
    }

    function money(value) {
        return '$' + Number(value).toFixed(2);
    }

    function wgForRc(rcGrade) {
        const item = data.rcGrades.find((x) => x.grade === rcGrade);
        return item ? item.wg : [];
    }

    function renderRcTable() {
        elRcBody.innerHTML = '';
        data.rcGrades.forEach((item) => {
            const tr = document.createElement('tr');
            tr.tabIndex = 0;
            if (item.grade === selectedRc) {
                tr.classList.add('is-selected');
            }
            tr.innerHTML = '<td>' + item.grade + '</td><td class="text-right">' + money(item.rate) + '</td>';
            tr.addEventListener('click', () => selectRc(item.grade));
            tr.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectRc(item.grade);
                }
            });
            elRcBody.appendChild(tr);
        });
    }

    function renderWgTable() {
        const wgList = wgForRc(selectedRc);
        document.getElementById('srRcFilter').value = selectedRc;
        elWgBody.innerHTML = '';
        wgList.forEach((wg) => {
            const tr = document.createElement('tr');
            tr.tabIndex = 0;
            if (wg === selectedWg) {
                tr.classList.add('is-selected');
            }
            tr.innerHTML = '<td>' + wg + '</td>';
            tr.addEventListener('click', () => selectWg(wg));
            tr.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectWg(wg);
                }
            });
            elWgBody.appendChild(tr);
        });
    }

    function renderStaffTable() {
        const staff = data.staffByWg[selectedWg] || [];
        elStaffBody.innerHTML = '';
        document.getElementById('srSelectedWg').value = selectedWg;

        let totalHrsPaid = 0;
        let totalLeave = 0;
        let totalSick = 0;
        let totalAtWork = 0;

        staff.forEach((person, index) => {
            const tr = document.createElement('tr');
            tr.tabIndex = 0;
            const isSelected = person.name === selectedPerson || (!selectedPerson && index === 0);
            if (isSelected) {
                selectedPerson = person.name;
                tr.classList.add('is-selected');
            }

            tr.innerHTML = ''
                + '<td>' + person.spNo + '</td>'
                + '<td>' + person.name + '</td>'
                + '<td class="text-right">' + person.hrsPaid + '</td>'
                + '<td class="text-right">' + person.leave + '</td>'
                + '<td class="text-right">' + person.sickSp + '</td>'
                + '<td class="text-right">' + person.atWork + '</td>'
                + '<td><input type="checkbox" aria-label="Planable for ' + person.name + '" ' + (person.planable ? 'checked' : '') + ' disabled></td>';

            tr.addEventListener('click', () => {
                selectedPerson = person.name;
                renderStaffTable();
            });
            tr.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectedPerson = person.name;
                    renderStaffTable();
                }
            });

            totalHrsPaid += Number(person.hrsPaid) || 0;
            totalLeave += Number(person.leave) || 0;
            totalSick += Number(person.sickSp) || 0;
            totalAtWork += Number(person.atWork) || 0;
            elStaffBody.appendChild(tr);
        });

        document.getElementById('srPersonSelected').textContent = selectedPerson || '';
        document.getElementById('srTotalHrsPaid').textContent = totalHrsPaid;
        document.getElementById('srTotalLeave').textContent = totalLeave;
        document.getElementById('srTotalSick').textContent = totalSick;
        document.getElementById('srTotalAtWork').textContent = totalAtWork;
    }

    function selectRc(rcGrade) {
        selectedRc = rcGrade;
        const wg = wgForRc(selectedRc);
        selectedWg = wg[0] || '';
        selectedPerson = '';
        renderRcTable();
        renderWgTable();
        renderStaffTable();
    }

    function selectWg(wgGrade) {
        selectedWg = wgGrade;
        selectedPerson = '';
        renderWgTable();
        renderStaffTable();
    }

    document.getElementById('srPlanBtn').addEventListener('click', function () {
        if (!selectedPerson) {
            window.alert('Please select a person first.');
            return;
        }
        window.alert('Planned ' + selectedPerson + ' onto ZT Codes for ' + selectedWg + '.');
    });

    selectRc(selectedRc);
}());
