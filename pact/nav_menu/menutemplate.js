const htmlmenu = `<div style="display: flex; flex-direction: row;"> 
        <button class="userdropdownbtn" style="border: 0; margin-right: 20px;" id="userdropdownbtn">Meg Ved &nbsp; <img src=".././images/circle-user-regular-full.svg" alt="user icon"  width="24"/></button>
       
        </div>
        <div class="userdropdown" id="userdropdowndp">

             <ul>
                   
                    <li><a href=".././index.html" style="display: flex; align-items: center;" type="button">
					<img src="../images/house-user-solid-full.svg" alt="dropdown home icon" width="22px">
                            Home</a></li>
                </ul>
          
        </div>

             <!-- <div class="userdropdown" id="userdropdowndp">
                Meg Ved <button type="button" style="border: 0;"
                    class="btn btn-secondary dropdown-toggle user-menu" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-regular fa-circle-user"></i>
                </button>
                <ul> 
                    <li><a href=".././index.html" class="dropdown-item" type="button">
                       <img src="../images/house-user-solid-full.svg" alt="dropdown home icon" width="22px">
                            Home</a></li>
                </ul>
            </div> -->
        
    <!-- </div> -->
    <nav class="main-nav">
	<!-- Project & Programme Dropdown -->
        <div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="project-management">
            <div class="align-menu-text">
                 <span>Project & Programme</span>
                  <span>Management</span>
            </div>
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="project-management">
                <a class="dropdown-item" href="program_management.html">Program Maintenance</a>
               <!-- <a class="dropdown-item" href="project_maintenance_five.two.html">Project Maintenance</a>-->
                <!-- <a class="dropdown-item" href="project_maintenance_five.opttwo.html">Project Maintenance (grid with modal popup)</a> -->
                <a class="dropdown-item" href="project_management_five.three.html">Project Maintenance</a>
                <a class="dropdown-item" style="display: flex;    justify-content: space-between;"
                    href="portfolio_management.html">Portfolio Maintenance</a> 
            </div>
        </div>

        <!-- Monthly Project Dropdown -->
        <div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="monthly-data">
                <div class="align-menu-text">
                <span>Monthly Project Data </span>
                <span>Management</span>
                </div>
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="monthly-data">
                <a class="dropdown-item" href="#">Project Invoices (Manual)</a>
                <a class="dropdown-item" href="#">OM, OG, FT & UT Invoices (Batch Mode from RMS)</a>

                <a class="dropdown-item" href="invoicebymonth.html">Invoices by Month</a>
                <a class="dropdown-item" href="#">FT & UT Project Work In Progress (WIP Over-ride)</a>

                <a class="dropdown-item" href="#">SubContracts (Exceptional Costs) (Manual)</a>
                <a class="dropdown-item" href="#">SubContracts (Exceptional Costs) (Batch mode from RMS)</a>
                <a class="dropdown-item" href="#">SubContracts By Month</a>
            </div>
        </div>

        <!-- Work Group Dropdown -->
        <div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="work-group">
             <div class="align-menu-text">
               <span> Work Group Static Data </span>
                <span>Management</span>
             </div>
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="work-group">
                <a href="#" class="dropdown-item">Work Group People</a>
                <a href="#" class="dropdown-item">Test Capabilities</a>
                <a href="#" class="dropdown-item">Test Maintenance List</a>
            </div>
        </div>
		
		<!-- Bosworth Interface Dropdown -->
		<div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="bosworth-interface">
             <div class="align-menu-text">
               <span> Bosworth Interface </span>
             </div>
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="bosworth-interface">
                <a href="#" class="dropdown-item">Resource Management</a>
                <a href="#" class="dropdown-item">Time Purchase Pivot Wizard</a>
                <a href="#" class="dropdown-item">Time Sales Pivot Wizard</a>				
                <a href="#" class="dropdown-item">Test Sale Pivot Wizard</a>
            </div>
        </div>

        <!-- Time & Output Dropdown -->
        <div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="time-data">
             <div class="align-menu-text">
               <span> Time & Output Data </span>
                <span> Management </span>
             </div>
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="time-data">
                <a href="timerecording.html" class="dropdown-item">Time record data entry</a>
                <a href="#" class="dropdown-item">Output record data entry</a>
                <a href="#" class="dropdown-item">Create & email time & output summaries</a>				
                <a href="#" class="dropdown-item">Create & print individual COS90s</a>
                <a href="#" class="dropdown-item">Search Audit Log for Monthly Output Change</a>
                <a href="#" class="dropdown-item">Search Audit Log for Monthly Time Change</a>
            </div>
        </div>

        <!--<div class="nav-item dropdown">
            <button class="nav-button dropdown-toggle" data-dropdown="further-menus">
                Further Menus
                <span class="arrow"><img src=".././images/arrow-down.svg" alt="down arrow for dropdown menu" width="12px"></span>
            </button>
            <div class="dropdown-menu" id="further-menus">
                <a class="dropdown-item" href="#">PACT Reports Menu</a>
                <a class="dropdown-item" href="timeoutputdatamgmt_four.html"
                    style="display: flex;    justify-content: space-between;">Time
                    & Output Data Management</a>
        
            </div>
        </div>-->

         <!-- <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown"
                            aria-expanded="false" aria-current="page" href="#">Further Menus</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">PACT Reports Menu</a></li>
                            <li><a class="dropdown-item" href="timeoutputdatamgmt_two.html" style="display: flex;    justify-content: space-between;">Time
                                    & Output Data Management</a></li>
                        </ul>
                    </div> -->


        <div class="nav-item">
            <button class="nav-button">
                Reports
            </button>
        </div>		
    </nav> 
`;


