const htmlmenu = `
    <nav class="navbar navbar-expand-lg main-nav">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" aria-label="navbar-toggler" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdownInjected">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdownInjected">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" aria-hidden="true"
                            aria-expanded="false" aria-current="page" href="#">Programme Management<span
                                class="arrow"><img src="../images/arrow-down.svg"
                                    alt="dropdown arrow for Programme Management Menu" width="12"></span></a>
                        <ul class="dropdown-menu w-100">
                            <li><a class="dropdown-item" aria-hidden="true" href="program_management.html">Select Programme</a></li>
                            <li><a class="dropdown-item" aria-hidden="true" style="display: flex; justify-content: space-between;">Plan Projects <img
                                        src="../images/right-arrow.png" alt="Arrow for Plan Projects Sub menu" width="30" height="30"></a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="setup_newproject.html" aria-hidden="true">Set Up A New Projects</a></li>
                                    <li><a class="dropdown-item" href="planproject_individually.html" aria-hidden="true">Plan Project Individually</a></li>
                                    <li><a class="dropdown-item" href="planstaff_entireprogram.html" aria-hidden="true">Plan STAFF for Entire Programme</a></li>
                                    <li><a class="dropdown-item" href="#" aria-hidden="true">Plan Animals for Entire Programme</a></li>
                                    <li><a class="dropdown-item" href="#" aria-hidden="true">Plan Test Purchases for Entire Programme for Entire Programme</a></li>
                                    <li><a class="dropdown-item" href="#" aria-hidden="true">Plan Additional cost for Entire Programme</a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" aria-hidden="true" style="display: flex; justify-content: space-between;" href="#">Review Plans <img
                                        src="../images/right-arrow.png" alt="Arrow for Review Plans Sub menu" width="30" height="30"></a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" aria-hidden="true" href="#">Project Portability</a></li>
                                    <li><a class="dropdown-item" aria-hidden="true" href="#">Staff Plan Pivot</a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" aria-hidden="true" style="display: flex; justify-content: space-between;" href="#">Summary Printouts
                                    <img src="../images/right-arrow.png" alt="Arrow for Summary Printouts Sub menu" width="30" height="30"></a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Programme Profitability Report" href="#">Programme Profitability Report</a></li>
                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Summarized by disease" href="#">Summarized by disease</a></li>
                                    <li><a class="dropdown-item" aria-hidden="true" href="#">Summarized by Customer</a></li>
                                    <li><a class="dropdown-item" aria-hidden="true" href="#">Project Specifics</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" role="button" aria-hidden="true"
                            aria-expanded="false" aria-current="page" href="#">Resource Management<span class="arrow"><img src="../images/arrow-down.svg"
                                    alt="dropdown arrow for Resource Management Menu" width="12"></span></a>
                        <ul class="dropdown-menu w-100">
                            <li><a class="dropdown-item" href="createresourcecenter.html" aria-hidden="true">Create Resource Center</a></li>                           

                            <li><a class="dropdown-item" aria-hidden="true" style="display: flex; justify-content: space-between;" href="#">Setup Resource
                                    <img src="../images/right-arrow.png" alt="Arrow for Summary Printouts Sub menu" width="30" height="30"></a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" aria-hidden="true" aria-label="Enter Staff Resources (by Resource Center)" href="setupresource.html">
                                        Enter Staff Resources (by Resource Center)</a>
                                    </li>

                                    <li>
                                        <a class="dropdown-item" aria-hidden="true" aria-label="WorkGroup Resources" href="workgroupresources.html">WorkGroup Resources</a></li>

                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Resource Set-Up Report" href="#">Resource Set-Up Report</a></li>

                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="High Level Summary" href="#">High Level Summary</a></li>
                                </ul>
                            </li>

                            <li><a class="dropdown-item" aria-hidden="true" style="display: flex; justify-content: space-between;" href="#">Review Plans
                                    <img src="../images/right-arrow.png" alt="Arrow for Summary Printouts Sub menu" width="30" height="30"></a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" aria-hidden="true" aria-label="Recalculate Rates" href="reviewplans.html">
                                        Recalculate Rates</a>
                                    </li>
                                    
                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Contribution Summary" href="#">Contribution Summary</a></li>

                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Staff Plan Pivot" href="#">Staff Plan Pivot</a></li>

                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="Resource Utilization View" href="#">Resource Utilization View</a></li>

                                    <li><a class="dropdown-item" aria-hidden="true" aria-label="View/Replan Staff Hours" href="#">View/Replan Staff Hours</a></li>
                                </ul>
                            </li>

                            <li><a class="dropdown-item" href="reports.html" aria-hidden="true">Reports</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Contract</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Lab Testing Manager's</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Luvley Pivots</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" aria-hidden="true" aria-expanded="false" aria-current="page" href="#">MAB <span class="arrow"><img
                                    src="../images/arrow-down.svg" alt="dropdown arrow for Programme Management Menu" width="12"></span></a>
                        <div class="dropdown-menu my-flex-dropdown" style="border: 1px solid #000; left: -70px;">
                            <ul>
                                <li><a class="dropdown-item" href="maintain_division.html" aria-hidden="true">Maintenance Menu</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Stage 1 Plans</a></li>
                                <li><a class="dropdown-item" href="fps_asuview.html" aria-hidden="true">ASU Data View</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">VLA Project Totals</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Generic Bids</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Project Audit Trails</a></li>
                            </ul>
                            <ul>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">SMG Summary Report - All Work</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">SMG Summary Report - Assured Work Only</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">All Programs Profitability</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Program Exceptional Bids</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Income Contribution Rpt</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Income Cont - Summary</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Project Specific - Query</a></li>
                            </ul>
                            <ul>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Resource Grades by Programme</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Resource Utilisation</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Open FPS</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Close FPS</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Run Snapshot Queries</a></li>
                                <li><a class="dropdown-item" href="#" aria-hidden="true">Run Comparison Queries</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Project Plan Viewer</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Project Group</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" aria-hidden="true">Management Account</a></li>
                </ul>
            </div>
        </div>
    </nav>
`;

function btn() {
    const userBtn = document.getElementById('userdropdownbtn');
    if (!userBtn) {
        return;
    }

    userBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        const menu = document.querySelector('.userdropdown');
        if (menu) {
            menu.classList.toggle('show');
        }
    });
}

function initMenu() {
    const dropdownToggles = document.querySelectorAll('#header .dropdown-toggle');

    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const parentDropdown = this.closest('.dropdown');
            const dropdownMenu = parentDropdown ? parentDropdown.querySelector(':scope > .dropdown-menu') : null;

            if (!parentDropdown || !dropdownMenu) {
                return;
            }

            document.querySelectorAll('#header .dropdown-menu').forEach(function (menu) {
                if (menu !== dropdownMenu && !menu.contains(dropdownMenu)) {
                    menu.classList.remove('show');
                }
            });

            document.querySelectorAll('#header .dropdown').forEach(function (dropdown) {
                if (dropdown !== parentDropdown && !dropdown.contains(parentDropdown)) {
                    dropdown.classList.remove('active');
                }
            });

            dropdownMenu.classList.toggle('show');
            parentDropdown.classList.toggle('active');
            this.setAttribute('aria-expanded', dropdownMenu.classList.contains('show') ? 'true' : 'false');
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('#header .dropdown-menu').forEach(function (menu) {
            menu.classList.remove('show');
        });
        document.querySelectorAll('#header .dropdown').forEach(function (dropdown) {
            dropdown.classList.remove('active');
        });
    });
}
