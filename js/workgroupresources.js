(function () {
    var wgDataByRC = {
        'B&M': ['BAC1', 'BAC2', 'BAC3', 'BAC5', 'BAMX1'],
        'Bact': ['BAC1', 'BAC2', 'BAC3', 'BAC5', 'TestWorkGroup'],
        'Build': ['BLD1', 'BLD2', 'BLD3', 'BLD4', 'BLD5'],
        'BTB': ['BTB1', 'BTB2', 'BTB3', 'BTB4', 'BTB5'],
        'DoES': ['DOE1', 'DOE2', 'DOE3', 'DOE4', 'DOE5'],
        'IDBAC': ['IDB1', 'IDB2', 'IDB3', 'IDB4', 'IDB5'],
        'IMT': ['IMT1', 'IMT2', 'IMT3', 'IMT4', 'IMT5'],
        'LabT': ['LAB1', 'LAB2', 'LAB3', 'LAB4', 'LAB5'],
        'Path': ['PAT1', 'PAT2', 'PAT3', 'PAT4', 'PAT5'],
        'SIU': ['SIU1', 'SIU2', 'SIU3', 'SIU4', 'SIU5'],
        'SLSD': ['SLS1', 'SLS2', 'SLS3', 'SLS4', 'SLS5'],
        'SSP': ['SSP1', 'SSP2', 'SSP3', 'SSP4', 'SSP5'],
        'Viro': ['VIR1', 'VIR2', 'VIR3', 'VIR4', 'VIR5'],
        'Wildlife': ['WLD1', 'WLD2', 'WLD3', 'WLD4', 'WLD5']
    };

    var selectedRC = '';
    var selectedWG = '';
    var currentViewKey = '';
    var currentRows = [];
    var editingRowIndex = -1;

    var elSelect = document.getElementById('fpsSrResourceCentreSelect');
    var elGoBtn = document.getElementById('fpsSrResourceCentreGoBtn');
    var elModal = document.getElementById('exampleModal');
    var elTitle = document.getElementById('wgSelResourceCentreTitle');
    var elWgList = document.getElementById('wgSelList');
    var elSelWg = document.getElementById('wgSelSelectedWg');
    var elResultProgram = document.getElementById('resultprogram');

    var elSetupBtn = document.getElementById('wgSelSetupBtn');
    var elStage1Btn = document.getElementById('wgSelStage1Btn');
    var elStage2Btn = document.getElementById('wgSelStage2Btn');
    var elPivotBtn = document.getElementById('wgSelPivotBtn');
    var elUtilReportBtn = document.getElementById('wgSelUtilReportBtn');
    var elSoctReportBtn = document.getElementById('wgSelSoctReportBtn');

    var elDataModalTitle = document.getElementById('wgDataModalTitle');
    var elDataHead = document.getElementById('wgDataHead');
    var elDataBody = document.getElementById('wgDataBody');
    var elEditRowForm = document.getElementById('wgEditRowForm');
    var elEditRowTitle = document.getElementById('wgEditRowTitle');
    var elEditRowSaveBtn = document.getElementById('wgEditRowSaveBtn');

    var resourceCentreModalInstance = null;
    var dataModalInstance = null;
    var editRowModalInstance = null;

    function deepClone(rows) {
        return JSON.parse(JSON.stringify(rows));
    }

    function centreCode(label) {
        return String(label || '')
            .replace(/[^A-Za-z]/g, '')
            .toUpperCase()
            .slice(0, 4) || 'RC';
    }

    function seededNumber(seed, min, max) {
        var span = (max - min) + 1;
        return min + (seed % span);
    }

    function datasetForSelectedWg() {
        var wg = selectedWG || 'BAC1';
        var rc = selectedRC || 'Bact';
        var code = centreCode(rc);
        var baseSeed = wg.charCodeAt(0) + code.charCodeAt(0);
        var hrsAvail = seededNumber(baseSeed * 7, 1800, 4200);
        var planned = seededNumber(baseSeed * 11, 450, 1400);
        var assured = seededNumber(baseSeed * 13, 300, planned);
        var allocPct = ((planned / hrsAvail) * 100).toFixed(2) + '%';
        var utilPct = ((assured / hrsAvail) * 100).toFixed(2) + '%';
        return {
            setup: {
                title: 'Staff in Work Group ' + wg + ' (' + rc + ')',
                columns: ['GradeCode', 'SP No', 'Name', 'HrsPaid', 'Leave', 'SickSp', 'AtWork', 'Planable'],
                rows: [
                    { 'GradeCode': 'A_' + code + '1', 'SP No': 140000 + seededNumber(baseSeed, 100, 999), 'Name': 'East Samantha', 'HrsPaid': 1460, 'Leave': 6, 'SickSp': 2, 'AtWork': 1452, 'Planable': true },
                    { 'GradeCode': 'B_' + code + '1', 'SP No': 240000 + seededNumber(baseSeed * 2, 100, 999), 'Name': 'Tilte Mordecai', 'HrsPaid': 1520, 'Leave': 8, 'SickSp': 0, 'AtWork': 1512, 'Planable': true },
                    { 'GradeCode': 'C_' + code + '1', 'SP No': 340000 + seededNumber(baseSeed * 3, 100, 999), 'Name': 'Marquet Kort', 'HrsPaid': 1480, 'Leave': 5, 'SickSp': 1, 'AtWork': 1474, 'Planable': true },
                    { 'GradeCode': 'G_' + code + '1', 'SP No': 'G' + seededNumber(baseSeed * 5, 300, 999), 'Name': 'General ' + wg, 'HrsPaid': 0, 'Leave': 0, 'SickSp': 0, 'AtWork': hrsAvail, 'Planable': true }
                ]
            },
            stage1: {
                title: 'Stage 1 (Customer Plan) - Grade Utilisation: ' + wg + ' (' + rc + ')',
                columns: ['WGGrade', 'PlanCategory', 'AllocHrs', 'Cost'],
                rows: [
                    { 'WGGrade': 'A_' + wg, 'PlanCategory': 'Tests', 'AllocHrs': seededNumber(baseSeed * 17, 120, 360), 'Cost': seededNumber(baseSeed * 19, 18000, 46000) },
                    { 'WGGrade': 'B_' + wg, 'PlanCategory': 'Animals', 'AllocHrs': seededNumber(baseSeed * 23, 140, 420), 'Cost': seededNumber(baseSeed * 29, 22000, 52000) },
                    { 'WGGrade': 'C_' + wg, 'PlanCategory': 'Additional', 'AllocHrs': seededNumber(baseSeed * 31, 40, 180), 'Cost': seededNumber(baseSeed * 37, 6000, 18000) }
                ]
            },
            stage2: {
                title: 'Resource Allocation / Utilisation for: ' + wg + ' (' + rc + ')',
                columns: ['Name', 'Hrs Ave', 'Plan Hr', 'Alloc %', 'App Ch', 'App Uti', 'Chrg Hrs', 'Util %'],
                rows: [
                    { 'Name': 'A_' + wg + ', General', 'Hrs Ave': hrsAvail, 'Plan Hr': planned, 'Alloc %': allocPct, 'App Ch': assured, 'App Uti': utilPct, 'Chrg Hrs': assured, 'Util %': utilPct },
                    { 'Name': 'B_' + wg + ', General', 'Hrs Ave': hrsAvail - 380, 'Plan Hr': Math.max(0, planned - 140), 'Alloc %': ((Math.max(0, planned - 140) / Math.max(1, hrsAvail - 380)) * 100).toFixed(2) + '%', 'App Ch': Math.max(0, assured - 90), 'App Uti': ((Math.max(0, assured - 90) / Math.max(1, hrsAvail - 380)) * 100).toFixed(2) + '%', 'Chrg Hrs': Math.max(0, assured - 90), 'Util %': ((Math.max(0, assured - 90) / Math.max(1, hrsAvail - 380)) * 100).toFixed(2) + '%' }
                ]
            },
            pivot: {
                title: 'pvtWorkgroupStaffPlan - ' + wg + ' (' + rc + ')',
                columns: ['WorkGroup', 'GradeCode', 'Name', 'Manager', 'Program', 'Jobcode', 'ProjectStatus', 'Hrs', 'Fee'],
                rows: [
                    { 'WorkGroup': wg, 'GradeCode': 'A', 'Name': 'East, Samantha', 'Manager': 'Ken Rod', 'Program': rc, 'Jobcode': code + 'INDIRECT', 'ProjectStatus': 'Approved', 'Hrs': 1, 'Fee': '0.00' },
                    { 'WorkGroup': wg, 'GradeCode': 'F', 'Name': 'F_' + wg + ', General', 'Manager': 'Marquet, Kort', 'Program': rc, 'Jobcode': code + '3218', 'ProjectStatus': 'Approved', 'Hrs': seededNumber(baseSeed * 41, 0, 60), 'Fee': String(seededNumber(baseSeed * 43, 0, 18000)) + '.00' },
                    { 'WorkGroup': wg, 'GradeCode': 'B', 'Name': 'B_' + wg + ', General', 'Manager': 'Marquet, Kort', 'Program': rc, 'Jobcode': code + '6218', 'ProjectStatus': 'Approved', 'Hrs': seededNumber(baseSeed * 47, 0, 80), 'Fee': String(seededNumber(baseSeed * 53, 0, 24000)) + '.00' },
                    { 'WorkGroup': wg, 'GradeCode': 'C', 'Name': 'C_' + wg + ', General', 'Manager': 'Grindley, Carli', 'Program': rc, 'Jobcode': code + '2100', 'ProjectStatus': 'Approved', 'Hrs': seededNumber(baseSeed * 59, 20, 120), 'Fee': String(seededNumber(baseSeed * 61, 3000, 28000)) + '.00' }
                ]
            },
            utilisationReport: {
                title: 'WG Utilisation Report - ' + wg + ' (' + rc + ')',
                columns: ['Name', 'Hours Avail', 'Planned Hrs', 'Assured Charge Hrs', 'Allocation %', 'Total Utilisation %'],
                rows: [
                    { 'Name': 'A_' + wg + ', General', 'Hours Avail': hrsAvail, 'Planned Hrs': planned, 'Assured Charge Hrs': assured, 'Allocation %': allocPct, 'Total Utilisation %': utilPct },
                    { 'Name': 'B_' + wg + ', General', 'Hours Avail': hrsAvail - 520, 'Planned Hrs': Math.max(0, planned - 180), 'Assured Charge Hrs': Math.max(0, assured - 120), 'Allocation %': ((Math.max(0, planned - 180) / Math.max(1, hrsAvail - 520)) * 100).toFixed(2) + '%', 'Total Utilisation %': ((Math.max(0, assured - 120) / Math.max(1, hrsAvail - 520)) * 100).toFixed(2) + '%' }
                ]
            },
            soctReport: {
                title: 'WG SOCT Report - ' + wg + ' (' + rc + ')',
                columns: ['Project', 'Description', 'Hour', 'Status'],
                rows: [
                    { 'Project': code + 'PROD', 'Description': code + 'PROD', 'Hour': seededNumber(baseSeed * 67, 0, 12), 'Status': 'Approved' },
                    { 'Project': code + '0293', 'Description': code + '0293', 'Hour': seededNumber(baseSeed * 71, 4, 24), 'Status': 'Approved' },
                    { 'Project': code + '2224', 'Description': code + '2224', 'Hour': seededNumber(baseSeed * 73, 12, 54), 'Status': 'Approved' },
                    { 'Project': code + '2225', 'Description': code + '2225', 'Hour': seededNumber(baseSeed * 79, 8, 44), 'Status': 'Approved' }
                ]
            }
        };
    }

    function getViewConfig(viewKey) {
        return datasetForSelectedWg()[viewKey] || null;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function populateWgList(rc) {
        elWgList.innerHTML = '';
        var wgs = wgDataByRC[rc] || [];
        wgs.forEach(function (wg) {
            var opt = document.createElement('option');
            opt.value = wg;
            opt.textContent = wg;
            elWgList.appendChild(opt);
        });

        selectedWG = wgs.length ? wgs[0] : '';
        elSelWg.value = selectedWG;
    }

    function renderDataGrid(viewKey) {
        var view = getViewConfig(viewKey);
        if (!view) {
            return;
        }

        currentViewKey = viewKey;
        currentRows = deepClone(view.rows);
        elDataModalTitle.textContent = view.title;

        var headHtml = '<tr class="govuk-table__row">';
        view.columns.forEach(function (col) {
            headHtml += '<th scope="col" class="govuk-table__header">' + escapeHtml(col) + '</th>';
        });
        headHtml += '<th scope="col" class="govuk-table__header">Actions</th></tr>';
        elDataHead.innerHTML = headHtml;

        renderDataRows();

        if (dataModalInstance) {
            dataModalInstance.show();
        }
    }

    function renderDataRows() {
        var view = getViewConfig(currentViewKey);
        if (!view) {
            return;
        }

        elDataBody.innerHTML = '';

        currentRows.forEach(function (row, index) {
            var tr = document.createElement('tr');
            tr.className = 'govuk-table__row';

            view.columns.forEach(function (col) {
                var td = document.createElement('td');
                td.className = 'govuk-table__cell';

                if (typeof row[col] === 'boolean') {
                    td.innerHTML = '<input type="checkbox" ' + (row[col] ? 'checked ' : '') + 'disabled aria-label="Boolean field">';
                } else {
                    td.textContent = row[col];
                }

                tr.appendChild(td);
            });

            var actionsTd = document.createElement('td');
            actionsTd.className = 'govuk-table__cell fps-sr-staff-actions-cell';
            actionsTd.innerHTML = ''
                + '<button type="button" class="email-edit-btn fps-sr-email-edit-btn wg-edit-row-btn" aria-label="Edit row" data-row-index="' + index + '">'
                + '<img src="../images/pen-to-square-regular-full.svg" alt="Edit icon" class="editjobcode" width="20">'
                + '</button>';
            tr.appendChild(actionsTd);

            elDataBody.appendChild(tr);
        });

        var editButtons = elDataBody.querySelectorAll('.wg-edit-row-btn');
        editButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                openRowEditModal(Number(btn.getAttribute('data-row-index')));
            });
        });
    }

    function openRowEditModal(rowIndex) {
        var view = getViewConfig(currentViewKey);
        if (!view || !currentRows[rowIndex]) {
            return;
        }

        editingRowIndex = rowIndex;
        var row = currentRows[rowIndex];
        elEditRowTitle.textContent = 'Edit Row - ' + (view.title || 'Grid');
        elEditRowForm.innerHTML = '';

        view.columns.forEach(function (col, idx) {
            var formGroup = document.createElement('div');
            formGroup.className = 'govuk-form-group';

            var label = document.createElement('label');
            label.className = 'govuk-label';
            label.textContent = col;
            label.setAttribute('for', 'wgEditField_' + idx);

            var input = document.createElement('input');
            input.className = 'govuk-input';
            input.id = 'wgEditField_' + idx;
            input.setAttribute('data-col', col);

            var value = row[col];
            if (typeof value === 'boolean') {
                input.type = 'text';
                input.value = value ? 'true' : 'false';
            } else if (typeof value === 'number') {
                input.type = 'number';
                input.step = 'any';
                input.value = value;
            } else {
                input.type = 'text';
                input.value = value;
            }

            if (idx === 0) {
                input.readOnly = true;
            }

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            elEditRowForm.appendChild(formGroup);
        });

        if (editRowModalInstance) {
            editRowModalInstance.show();
        }
    }

    function saveRowEdit() {
        var view = getViewConfig(currentViewKey);
        if (!view || editingRowIndex < 0 || !currentRows[editingRowIndex]) {
            return;
        }

        var row = currentRows[editingRowIndex];
        var fields = elEditRowForm.querySelectorAll('input[data-col]');
        fields.forEach(function (field, idx) {
            if (idx === 0) {
                return;
            }

            var col = field.getAttribute('data-col');
            var currentValue = row[col];
            var rawValue = field.value;

            if (typeof currentValue === 'boolean') {
                row[col] = String(rawValue).toLowerCase() === 'true';
            } else if (typeof currentValue === 'number') {
                var parsed = Number(rawValue);
                row[col] = Number.isFinite(parsed) ? parsed : 0;
            } else {
                row[col] = rawValue;
            }
        });

        if (editRowModalInstance) {
            editRowModalInstance.hide();
        }
        renderDataRows();
    }

    function formatReportDate() {
        var d = new Date();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dd = String(d.getDate()).padStart(2, '0');
        var mon = months[d.getMonth()];
        var yy = String(d.getFullYear()).slice(-2);
        return dd + '-' + mon + '-' + yy;
    }

    function getSelectedWorkType() {
        var selected = document.querySelector('input[name="wgWorkType"]:checked');
        return selected ? selected.value : 'all';
    }

    function makeProjectRows(seedBase, workType) {
        var projects = [
            'BPUPORT', 'RPUORTEB', 'RDEU1405', 'FZ2200', 'RDCR2005', 'RDCR2006', 'RDCR2008',
            'RDCR2010', 'RDEU1403', 'FT1368', 'RDEU1504', 'RDFZ2210', 'RDFZ2230', 'RDFZ2270',
            'RDEU1440', 'CSKV0090', 'BAC2PORT1', 'CSKD0001', 'CSKL0092', 'CSKP0045', 'FZ2100',
            'CSKV0072', 'CSUT3218', 'CSUT6218', 'EXEU1684', 'FS2PORT3'
        ];

        var rows = [];
        projects.forEach(function (project, index) {
            var a = seededNumber(seedBase * (index + 2), 0, 220);
            var b = seededNumber(seedBase * (index + 3), 0, 220);
            var c = seededNumber(seedBase * (index + 4), 0, 220);
            var d = seededNumber(seedBase * (index + 5), 0, 220);
            var e = seededNumber(seedBase * (index + 6), 0, 220);
            var f = seededNumber(seedBase * (index + 7), 0, 220);
            var g = seededNumber(seedBase * (index + 8), 0, 220);

            if (workType === 'assured') {
                a = Math.floor(a * 0.65);
                b = Math.floor(b * 0.65);
                c = Math.floor(c * 0.65);
                d = Math.floor(d * 0.65);
                e = Math.floor(e * 0.65);
                f = Math.floor(f * 0.65);
                g = Math.floor(g * 0.65);
            }

            if (workType === 'notassured') {
                a = Math.floor(a * 0.18);
                b = Math.floor(b * 0.18);
                c = 0;
                d = 0;
                e = 0;
                f = 0;
                g = 0;
            }

            var total = a + b + c + d + e + f + g;
            rows.push({
                project: project,
                total: total,
                a: a,
                b: b,
                c: c,
                d: d,
                e: e,
                f: f,
                g: g
            });
        });

        return rows;
    }

    function buildUtilisationReportHtml() {
        var wg = selectedWG || 'BAC1';
        var rc = selectedRC || 'Bact';
        var workType = getSelectedWorkType();
        var dateText = formatReportDate();
        var seedBase = wg.charCodeAt(0) + centreCode(rc).charCodeAt(0);
        var rows = makeProjectRows(seedBase, workType);

        var titlePrefix = 'Total Allocation Summary for WorkGroup';
        if (workType === 'assured') {
            titlePrefix = 'Assured Allocation Summary for WorkGroup';
        } else if (workType === 'notassured') {
            titlePrefix = 'Not Assured Allocation Summary for WorkGroup';
        }

        var headers = [
            'Totals',
            'A_' + wg + '_General',
            'B_' + wg + '_General',
            'C_' + wg + '_General',
            'D_' + wg + '_General',
            'E_' + wg + '_General',
            'F_' + wg + '_General',
            'G_' + wg + '_General'
        ];

        var totalAll = 0;
        var totalA = 0;
        var totalB = 0;
        var totalC = 0;
        var totalD = 0;
        var totalE = 0;
        var totalF = 0;
        var totalG = 0;

        var bodyRows = rows.map(function (r) {
            totalAll += r.total;
            totalA += r.a;
            totalB += r.b;
            totalC += r.c;
            totalD += r.d;
            totalE += r.e;
            totalF += r.f;
            totalG += r.g;

            return '<tr>'
                + '<td>' + escapeHtml(r.project) + '</td>'
                + '<td class="num">' + r.total + '</td>'
                + '<td class="num">' + r.a + '</td>'
                + '<td class="num">' + r.b + '</td>'
                + '<td class="num">' + r.c + '</td>'
                + '<td class="num">' + r.d + '</td>'
                + '<td class="num">' + r.e + '</td>'
                + '<td class="num">' + r.f + '</td>'
                + '<td class="num">' + r.g + '</td>'
                + '</tr>';
        }).join('');

        var summarySection = '';
        if (workType === 'notassured') {
            var hrsAvail = seededNumber(seedBase * 9, 3200, 13000);
            var allocPct = ((totalAll / Math.max(1, hrsAvail)) * 100).toFixed(1) + '%';
            summarySection = '<tr class="summary-row"><td>Grand Totals:</td><td class="num">' + totalAll + '</td><td class="num">' + totalA + '</td><td class="num">' + totalB + '</td><td class="num">' + totalC + '</td><td class="num">' + totalD + '</td><td class="num">' + totalE + '</td><td class="num">' + totalF + '</td><td class="num">' + totalG + '</td></tr>'
                + '<tr class="summary-row"><td>Hours Available:</td><td class="num">' + hrsAvail + '</td><td class="num">' + seededNumber(seedBase * 15, 2800, 7800) + '</td><td class="num">' + seededNumber(seedBase * 16, 2600, 7600) + '</td><td class="num">' + seededNumber(seedBase * 17, 2600, 7600) + '</td><td class="num">' + seededNumber(seedBase * 18, 2600, 7600) + '</td><td class="num">' + seededNumber(seedBase * 19, 2600, 7600) + '</td><td class="num">' + seededNumber(seedBase * 20, 2600, 7600) + '</td><td class="num">' + seededNumber(seedBase * 21, 2600, 7600) + '</td></tr>'
                + '<tr class="summary-row"><td>Allocation:</td><td class="num">' + allocPct + '</td><td class="num">n/a</td><td class="num">n/a</td><td class="num">n/a</td><td class="num">n/a</td><td class="num">n/a</td><td class="num">n/a</td><td class="num">n/a</td></tr>';
        }

        return '<!DOCTYPE html>'
            + '<html><head><meta charset="UTF-8"><title>WG Utilisation Report</title>'
            + '<style>'
            + '@page { size: A4 landscape; margin: 10mm; }'
            + 'body { font-family: Arial, sans-serif; font-size: 11px; color: #111; margin: 0; }'
            + '.header { display:flex; justify-content:space-between; align-items:center; border-top:1px solid #666; padding-top:6px; margin-top:8px; }'
            + '.header h1 { font-size: 32px; margin: 8px 0 6px; font-weight:700; }'
            + '.small { font-size: 12px; color:#333; }'
            + 'table { width:100%; border-collapse:collapse; margin-top:8px; }'
            + 'th, td { border:1px solid #444; padding:3px 4px; }'
            + 'th { background:#efefef; font-weight:700; text-align:center; }'
            + 'td:first-child { font-weight:600; }'
            + '.num { text-align:right; }'
            + '.summary-row td { background:#f7f7f7; font-weight:700; }'
            + '.foot { margin-top:8px; font-size:11px; color:#444; }'
            + '</style></head><body>'
            + '<div class="small">' + dateText + '</div>'
            + '<div class="header"><h1>' + escapeHtml(titlePrefix) + '&nbsp;&nbsp;' + escapeHtml(wg) + '</h1><div class="small">FPS 2025 - 2026</div></div>'
            + '<table><thead><tr><th>Programme</th>'
            + headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join('')
            + '</tr></thead><tbody>'
            + bodyRows
            + summarySection
            + '</tbody></table>'
            + '<div class="foot">Generated from WorkGroup Resources - ' + escapeHtml(rc) + '</div>'
            + '<script>window.onload=function(){setTimeout(function(){window.print();},300);};<\/script>'
            + '</body></html>';
    }

    function printUtilisationReport() {
        if (!selectedRC || !selectedWG) {
            return;
        }

        var win = window.open('', '_blank');
        if (!win) {
            return;
        }

        win.document.open();
        win.document.write(buildUtilisationReportHtml());
        win.document.close();
    }

    elWgList.addEventListener('change', function () {
        selectedWG = elWgList.value;
        elSelWg.value = selectedWG;
    });

    elGoBtn.addEventListener('click', function () {
        var rc = (elSelect.value || '').trim();
        if (!rc) {
            return;
        }

        selectedRC = rc;
        elTitle.textContent = rc;
        if (elResultProgram) {
            elResultProgram.textContent = rc;
        }

        populateWgList(rc);

        if (resourceCentreModalInstance) {
            resourceCentreModalInstance.hide();
        }
    });

    elSetupBtn.addEventListener('click', function () { renderDataGrid('setup'); });
    elStage1Btn.addEventListener('click', function () { renderDataGrid('stage1'); });
    elStage2Btn.addEventListener('click', function () { renderDataGrid('stage2'); });
    elPivotBtn.addEventListener('click', function () { renderDataGrid('pivot'); });
    elUtilReportBtn.addEventListener('click', printUtilisationReport);
    elSoctReportBtn.addEventListener('click', function () { renderDataGrid('soctReport'); });
    elEditRowSaveBtn.addEventListener('click', saveRowEdit);

    document.addEventListener('DOMContentLoaded', function () {
        if (typeof bootstrap !== 'undefined') {
            resourceCentreModalInstance = new bootstrap.Modal(elModal, { backdrop: 'static', keyboard: false });
            dataModalInstance = new bootstrap.Modal(document.getElementById('wgDataModal'));
            editRowModalInstance = new bootstrap.Modal(document.getElementById('wgEditRowModal'));
            resourceCentreModalInstance.show();
        }
    });
}());
