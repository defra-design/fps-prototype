# Global Table Grid Inventory

## Summary

List of all pages across FPS, PACT, PIMS, and Costbook where table grids are implemented.

- Total applications scanned: 4
- Total pages with confirmed data table/grid implementations: 45
- Source scanned: HTML pages under docs/fps, docs/pact, docs/pims, docs/costbook

---

## Table Grid Pages

| Sr. No | Application | Page Name | File Path | Table Type | Description | Key Columns |
| ------ | ----------- | --------- | --------- | ---------- | ----------- | ----------- |
| 1 | FPS | ASU Data View | /docs/fps/fps_asuview.html | GOV.UK Table + Dynamic (JS) | Animal usage rows with pagination and totals | Project, Animal Days, Cost, Actions |
| 2 | FPS | Division Maintenance | /docs/fps/maintain_division.html | GOV.UK Table + Dynamic (JS) | Division maintenance listing | DivisionID, AgencyID, DivName, CentOverhead, Actions |
| 3 | FPS | Program Maintenance | /docs/fps/maintain_programs.html | GOV.UK Table + Dynamic (JS) | Programme maintenance listing | Program, Program Name, Directorate, Target, Manager, Actions |
| 4 | FPS | Staff Maintenance | /docs/fps/maintain_staff.html | GOV.UK Table + Dynamic (JS) | Staff maintenance listing | SP Number, Last Name, First Name, Title, Actions |
| 5 | FPS | Plan Project Individually | /docs/fps/planproject_individually.html | GOV.UK Table + Dynamic (JS) | Project selection grid for individual planning | Project, Description, Manager, Program, Status, Budget, Actions |
| 6 | FPS | Plan Staff Entire Programme | /docs/fps/planstaff_entireprogram.html | GOV.UK Table + Dynamic (JS) | Multiple staff planning grids (project and staff detail) | Project, Description, Budget, Name, Rate, Hrs, Days, StaffCost, Actions |
| 7 | FPS | Plan vs Actual Additional | /docs/fps/planvsactaul_additional.html | GOV.UK Table + Dynamic (JS) | FPS plan vs PACT actual additional costs | Description, Account, Total Cost, Freq/Mnth, Supplier, Amount |
| 8 | FPS | Plan vs Actual Staff | /docs/fps/planvsactaul_staff.html | GOV.UK Table + Dynamic (JS) | FPS plan vs PACT actual staff costs | Name, Rate, Hrs, Days, StaffCost, WrkGrp, Grade, JobCode, Cost |
| 9 | FPS | Plan vs Actual Test | /docs/fps/planvsactaul_test.html | GOV.UK Table + Dynamic (JS) | FPS plan vs PACT actual test purchase costs | Test, Number, Rate, Charge, WG, Month, Actions |
| 10 | FPS | Plan vs Actual Animals | /docs/fps/planvsactual_animals.html | GOV.UK Table + Dynamic (JS) | FPS plan vs PACT actual animal costs | Animal Type, Days, No.Req, Daily Rt, Cost, Acct Code, Amount |
| 11 | FPS | Programme Management | /docs/fps/program_management.html | Static HTML Table + Dynamic rows | Programme-level project list with client-side search | Programme, Project Code, Action |
| 12 | FPS | Project Planning | /docs/fps/projectplanning.html | Static HTML Tables + Dynamic edits | Multi-tab planning tables (staff, animals, tests, additional) | Name, Rate, Hrs, Days, StaffCost, Animal Type, Test, Account, Actions |
| 13 | FPS | Setup Resource | /docs/fps/setupresource.html | GOV.UK Table + Dynamic (JS) | Resource setup reference tables | RCGrade, ChargeRate, WGGrade, SP No, Name, HrsPaid, Leave, SickSp, AtWork |
| 14 | FPS | Workgroup Resources | /docs/fps/workgroupresources.html | GOV.UK Table + Dynamic (JS-rendered headers/body) | Workgroup data modal grid generated at runtime | Dynamic by selected view, plus Actions |
| 15 | PACT | Create Email Time Output Summary | /docs/pact/create_email_time_output_summary.html | GOV.UK Table + Dynamic (JS) | Workgroup email/time output management | Workgroup, SendEmail?, Email Recipient, Action |
| 16 | PACT | Create & Print COS90 | /docs/pact/createprint_cos90.html | GOV.UK Tables + Dynamic (JS) | Workgroup/period/working-hours grids for COS90 output | Work Group, Print COS90?, Year, Month, Days, CVL Hours, VID Hours |
| 17 | PACT | Invoice By Month | /docs/pact/invoicebymonth.html | GOV.UK Table + Dynamic (JS) | Programme financial summary by month | Program, Parent Project, monthly period columns |
| 18 | PACT | Monthly Commercial Invoice Cleanout | /docs/pact/monthly_commercial_invoice_cleanout.html | GOV.UK Table + Dynamic (JS) | Project parent invoice records | Project Parent, Month, Amount, Cost Of Work, WIP, Actions |
| 19 | PACT | Output Record Data Entry | /docs/pact/output_record_dataentry.html | GOV.UK Tables + Dynamic (JS) | Output record entry and selected records grids | Work Group, Test Code, Buyer, Period, Volume, Action |
| 20 | PACT | Portfolio Management | /docs/pact/portfolio_management.html | Static HTML Tables + Dynamic updates | Portfolio and workgroup maintenance grids | Portfolio/Project fields, Work Groups |
| 21 | PACT | Program Management | /docs/pact/program_management.html | Static HTML Table + Dynamic rows | Program/project listing grid | Project, Code, Status, Actions |
| 22 | PACT | Project Invoices Manual | /docs/pact/project_invoices_manual.html | GOV.UK Table + Dynamic (JS) | Manual invoice maintenance | Project, Month, Amount, Cost of Work, WIP, Profit/Loss, Actions |
| 23 | PACT | Project Invoices Subcontracts | /docs/pact/project_invoices_subcontracts.html | GOV.UK Table + Dynamic (JS) | Subcontract invoice grid | Subcontract/Invoice fields, amounts, actions |
| 24 | PACT | Project Management (Option Two) | /docs/pact/project_management_five.opttwo.html | GOV.UK Tables + Dynamic (JS) | Project maintenance page with job code and time-code validity grids | Job Code, Name/Description, Type, Work Group, Active, Actions |
| 25 | PACT | Project Management (Option Three) | /docs/pact/project_management_five.three.html | GOV.UK Tables + Dynamic (JS) | Project management variant with maintenance and jobcode grids | Project, Job Code, Work Group, Actions |
| 26 | PACT | Project Management Milestones | /docs/pact/project_mgmt_milestone.html | GOV.UK Table + Dynamic (JS) | Milestone listing and edits | Milestone, Date, Status, Actions |
| 27 | PACT | Test Purchase Requirements | /docs/pact/project_mgmt_test_purchase_req.html | GOV.UK Table + Dynamic (JS) | Test purchase requirement grid | Test, Requirement fields, Actions |
| 28 | PACT | Subcontracts Batch Mode RMS | /docs/pact/subcontracts_batch_mode_rms.html | GOV.UK Table + Dynamic (JS) | Batch subcontract processing grid | Subcontract/Batch fields, status, actions |
| 29 | PACT | Test Maintenance List | /docs/pact/test_maintenance_list.html | GOV.UK Table + Dynamic (JS) | Test code maintenance table | Test Code, Description, Status, Actions |
| 30 | PACT | Time Recording | /docs/pact/timerecording.html | GOV.UK Table + Dynamic (JS) | Time capture and review grid | Staff/Workgroup, Period, Hours, Activity, Actions |
| 31 | PACT | WIP Override Facility | /docs/pact/wip_override_facility.html | GOV.UK Table + Dynamic (JS) | WIP override records | Project, WIP values, reason, actions |
| 32 | PACT | Workgroup Management | /docs/pact/workgroup_management.html | GOV.UK Table + Dynamic (JS) | Workgroup setup and maintenance | Workgroup, Manager/Owner fields, Actions |
| 33 | PIMS | Report Admin Maintenance | /docs/pims/maintenance.html | GOV.UK Tables + Dynamic (JS) | Multi-grid admin page: reports, groups, programs, managers, users, access, lists | Name, Description, Report Help, Order, Program, User, Access, Actions |
| 34 | PIMS | PIMS Home | /docs/pims/pimshome.html | GOV.UK Table + Dynamic (JS) | Home/dashboard data list | Project/report listing fields, actions |
| 35 | PIMS | PIMS Milestones | /docs/pims/pimsMilestones.html | GOV.UK Table + Dynamic (JS) | Milestone/deliverable tracking | Milestone, Due Date, Status, Actions |
| 36 | PIMS | PMD User | /docs/pims/pmduser.html | Static HTML Table | PMD user details grid | User-related fields |
| 37 | PIMS | Selected Project Details | /docs/pims/selectedprojectdetails.html | GOV.UK Tables + Dynamic (JS) | Selected project detail and related records grids | Project detail columns, related activity/action columns |
| 38 | PIMS | Yearly Finance | /docs/pims/yearlyfinance.html | GOV.UK Table + Dynamic (JS) | Yearly monthly financial data grid | Period/Month, financial values |
| 39 | Costbook | CSG7 Staff Years Query | /docs/costbook/costbook_csg7_staff_years_query.html | GOV.UK Table + Dynamic (JS/JSON) | Query result grid for CSG7 staff years | CSG7 Code, Staff Year, Hours, Rate/Cost |
| 40 | Costbook | Project Costs Query | /docs/costbook/costbook_project_costs_query.html | GOV.UK Table + Dynamic (JS/JSON) | Query result grid for project costs | Project, Cost Code/Category, Amount, Period |
| 41 | Costbook | Project Summary | /docs/costbook/costbook_project_summary.html | GOV.UK/Custom Table + Dynamic (JS) | Financial summary by year/cost type | Year, CVL, VID, totals |
| 42 | Costbook | Summary Staff Effort Query | /docs/costbook/costbook_summary_staff_effort.html | GOV.UK Table + Dynamic (JS/JSON) | Staff effort summary query grid | Staff Code, Effort, Cost |
| 43 | Costbook | Costbook Home | /docs/costbook/costbookhome.html | GOV.UK Table + Dynamic (JS) | Project selection and navigation grid | Project, Project Title, Contract, Start Date, Action |
| 44 | Costbook | Costbook Maintenance | /docs/costbook/costbookmaintainance.html | GOV.UK Tables + Dynamic (JS) | Maintenance page with 3 major tables (account categories, CSG7, CAPS staff) | Account Category, CSG7 Code, Staff Type, Actions |
| 45 | Costbook | Project Requirement | /docs/costbook/Project-Requirement.html | Dynamic (JS/JSON) | Project requirement data table | Project ID, Requirement, Status/Action fields |

---

## Application-wise Breakdown

### FPS

- 14 pages
- Files:
  - /docs/fps/fps_asuview.html
  - /docs/fps/maintain_division.html
  - /docs/fps/maintain_programs.html
  - /docs/fps/maintain_staff.html
  - /docs/fps/planproject_individually.html
  - /docs/fps/planstaff_entireprogram.html
  - /docs/fps/planvsactaul_additional.html
  - /docs/fps/planvsactaul_staff.html
  - /docs/fps/planvsactaul_test.html
  - /docs/fps/planvsactual_animals.html
  - /docs/fps/program_management.html
  - /docs/fps/projectplanning.html
  - /docs/fps/setupresource.html
  - /docs/fps/workgroupresources.html

### PACT

- 18 pages
- Files:
  - /docs/pact/create_email_time_output_summary.html
  - /docs/pact/createprint_cos90.html
  - /docs/pact/invoicebymonth.html
  - /docs/pact/monthly_commercial_invoice_cleanout.html
  - /docs/pact/output_record_dataentry.html
  - /docs/pact/portfolio_management.html
  - /docs/pact/program_management.html
  - /docs/pact/project_invoices_manual.html
  - /docs/pact/project_invoices_subcontracts.html
  - /docs/pact/project_management_five.opttwo.html
  - /docs/pact/project_management_five.three.html
  - /docs/pact/project_mgmt_milestone.html
  - /docs/pact/project_mgmt_test_purchase_req.html
  - /docs/pact/subcontracts_batch_mode_rms.html
  - /docs/pact/test_maintenance_list.html
  - /docs/pact/timerecording.html
  - /docs/pact/wip_override_facility.html
  - /docs/pact/workgroup_management.html

### PIMS

- 6 pages
- Files:
  - /docs/pims/maintenance.html
  - /docs/pims/pimshome.html
  - /docs/pims/pimsMilestones.html
  - /docs/pims/pmduser.html
  - /docs/pims/selectedprojectdetails.html
  - /docs/pims/yearlyfinance.html

### Costbook

- 7 pages
- Files:
  - /docs/costbook/costbook_csg7_staff_years_query.html
  - /docs/costbook/costbook_project_costs_query.html
  - /docs/costbook/costbook_project_summary.html
  - /docs/costbook/costbook_summary_staff_effort.html
  - /docs/costbook/costbookhome.html
  - /docs/costbook/costbookmaintainance.html
  - /docs/costbook/Project-Requirement.html

---

## Notes

- Listing is deduplicated at page/file level (one row per page even if multiple grids exist within the page).
- Non-data/layout-only tables were excluded where clearly used only for spacing.
- Dynamic JS/JSON tables are marked where headers/body are generated or filled at runtime.
- This inventory is based on current checked-in HTML and observable table/grid patterns.