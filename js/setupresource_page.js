/* Setup Resource page helper functions moved from inline script */
(function () {
    'use strict';

    function toggleSidebar() {
        var sidebar = document.querySelector('.sidenav');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
        }
    }

    function showValue() {
        var selectBox = document.getElementById('project');
        var selectBoxProgram = document.getElementById('program');

        if (!selectBox || !selectBoxProgram) {
            return;
        }

        var selectedText = selectBox.options[selectBox.selectedIndex].text;
        var selectedTextProgram = selectBoxProgram.options[selectBoxProgram.selectedIndex].text;

        var resultProject = document.getElementById('resultproject');
        var resultProgram = document.getElementById('resultprogram');

        if (resultProject) {
            resultProject.innerHTML = '<b>' + selectedText + '</b>';
        }
        if (resultProgram) {
            resultProgram.innerHTML = '<b>' + selectedTextProgram + '</b>';
        }
    }

    function SelectProgram() {
        var selectProgram = document.getElementById('select_program');
        var resultProgram = document.getElementById('resultprogram');

        if (!selectProgram || !resultProgram) {
            return;
        }

        resultProgram.innerHTML = selectProgram.value;
    }

    function addStaffRow() {
        var mySelectEl = document.getElementById('WGgradevalue');
        var staffNameEl = document.getElementById('staff_name');
        var rateEl = document.getElementById('rate_value');
        var hourEl = document.getElementById('hour_value');
        var daysEl = document.getElementById('days_value');
        var costEl = document.getElementById('hrspaid_value');
        var tableContainer = document.getElementById('staffTableBody_data');

        if (!mySelectEl || !staffNameEl || !rateEl || !hourEl || !daysEl || !costEl || !tableContainer) {
            return;
        }

        var mySelect = mySelectEl.value;
        var staffTableName = staffNameEl.value;
        var staffTableRate = rateEl.value;
        var staffTableHour = hourEl.value;
        var staffTableDays = daysEl.value;
        var staffTableCost = costEl.value;

        var tbody = tableContainer.getElementsByTagName('tbody')[0];
        if (!tbody) {
            return;
        }

        var newRow = tbody.insertRow();

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);

        newRow.classList.add('govuk-table__row');
        cell1.className = 'govuk-table__cell';
        cell2.className = 'govuk-table__cell';
        cell3.className = 'govuk-table__cell govuk-table__cell--numeric';
        cell4.className = 'govuk-table__cell govuk-table__cell--numeric';
        cell5.className = 'govuk-table__cell govuk-table__cell--numeric';
        cell6.className = 'govuk-table__cell govuk-table__cell--numeric';
        cell7.className = 'govuk-table__cell';

        cell1.style.textAlign = 'left';
        cell2.style.textAlign = 'left';
        cell3.style.textAlign = 'right';
        cell4.style.textAlign = 'right';
        cell5.style.textAlign = 'right';
        cell6.style.textAlign = 'right';

        cell1.innerHTML = "<span id='myInput'>" + mySelect + '</span>';
        cell2.innerHTML = "<span id='myInput'>" + staffTableName + '</span>';
        cell3.innerHTML = "<span id='myInput'>\u00a3" + staffTableRate + '</span>';
        cell4.innerHTML = "<span id='myInput'>" + staffTableHour + '</span>';
        cell5.innerHTML = "<span id='myInput'>" + staffTableDays + '</span>';
        cell6.innerHTML = "<span id='myInput'>\u00a3" + staffTableCost + '</span>';

        cell7.innerHTML = '<button type="button" class="govuk-button govuk-button--secondary sup_margin_0 edit-row-btn" data-module="govuk-button"><i class="fa fa-edit"></i></button> <button type="button" class="govuk-button govuk-button--warning sup_margin_0 delete-row-btn" data-module="govuk-button"><i class="fa fa-trash"></i></button>';

        if (typeof window.closeaddstaffModal === 'function') {
            window.closeaddstaffModal();
        }
    }

    window.toggleSidebar = toggleSidebar;
    window.showValue = showValue;
    window.SelectProgram = SelectProgram;
    window.addStaffRow = addStaffRow;
}());
