# FPS Table Grid Inventory

## Summary

Comprehensive list of all pages in the FPS (Field Planning System) application where table/grid structures are implemented. Covers all confirmed data tables — static, dynamic (JS-populated), and GOV.UK-styled — across the Maintenance, Programme Management, Project Planning, and Resource modules.

Scan date: 14 April 2026  
Total pages with tables: **14**  
Total distinct table instances: **22**

---

## Table Grid Pages

| Sr. No | Page Name | File Path | Table Type | Description | Key Columns |
|--------|-----------|-----------|------------|-------------|-------------|
| 1 | Animal Species Usage View | `/docs/fps/fps_asuview.html` | Dynamic · GOV.UK table | Displays ASU (Animal Species Unit) usage totals per project within a selected programme | Project, Animal Days, Cost, Actions |
| 2 | Maintain Division | `/docs/fps/maintain_division.html` | Dynamic · GOV.UK table | Lists all division records; supports inline edit and delete via row actions | DivisionID, AgencyID, DivName, CentOverhead, Actions |
| 3 | Maintain Programs | `/docs/fps/maintain_programs.html` | Dynamic · GOV.UK table | Lists all programme records for maintenance (add / edit / delete) | Program, Program Name, Directorate, Target, Manager, Actions |
| 4 | Maintain Staff | `/docs/fps/maintain_staff.html` | Dynamic · GOV.UK table | Lists all staff records; supports search, add, edit and delete | SP Number, Last Name, First Name, Title, Actions |
| 5 | Plan Project Individually | `/docs/fps/planproject_individually.html` | Dynamic · GOV.UK table | Lists all projects under a selected programme to choose a project for individual cost planning | Project, Description, Manager, Program, Project Group, Customer, Contract, Disease, Status, Budget, Cost Inc, Trans Inc, CW Debit, Actions |
| 6 | Plan Staff – Entire Programme (Project selector) | `/docs/fps/planstaff_entireprogram.html` | Dynamic · GOV.UK table | Upper table — selects the project to plan; rows expand the staff plan below | Project, Description, Budget, IsDefraProject, Actions |
| 7 | Plan Staff – Entire Programme (Staff cost plan) | `/docs/fps/planstaff_entireprogram.html` | Dynamic · GOV.UK table | Lower table — shows planned staff entries for the selected project; inline edit / delete | Name, Rate, Hrs, Days, StaffCost, Actions |
| 8 | Plan vs Actual – Additional Costs (FPS Plan) | `/docs/fps/planvsactaul_additional.html` | Dynamic · GOV.UK table | Upper table — FPS planned additional cost lines for the selected project | Description, Account, Total Cost, Freq or Mnth, Supplier, Actions |
| 9 | Plan vs Actual – Additional Costs (PACT Actuals) | `/docs/fps/planvsactaul_additional.html` | Dynamic · GOV.UK table | Lower table — corresponding PACT actual postings for comparison | Description, Acct Code, F.Mont, Amount |
| 10 | Plan vs Actual – Staff (FPS Plan) | `/docs/fps/planvsactaul_staff.html` | Dynamic · GOV.UK table | Upper table — FPS planned staff cost lines for the selected project | Name, Rate, Hrs, Days, StaffCost, Action |
| 11 | Plan vs Actual – Staff (PACT Actuals) | `/docs/fps/planvsactaul_staff.html` | Dynamic · GOV.UK table | Lower table — PACT actual staff postings for comparison | WrkGrp, Grade, JobCode, Name, Mnth, Hrs, Cost |
| 12 | Plan vs Actual – Test Purchases (FPS Plan) | `/docs/fps/planvsactaul_test.html` | Dynamic · GOV.UK table | Upper table — FPS planned test purchase lines for the selected project | Test, Number, Rate, Charge, Actions |
| 13 | Plan vs Actual – Test Purchases (PACT Actuals) | `/docs/fps/planvsactaul_test.html` | Dynamic · GOV.UK table | Lower table — PACT actual test purchase postings for comparison | Test, WG, Month, Number, Rate, Charge |
| 14 | Plan vs Actual – Animals (FPS Plan) | `/docs/fps/planvsactual_animals.html` | Dynamic · GOV.UK table | Upper table — FPS planned animal cost lines for the selected project | Animal Type, Days, No.Req, Daily Rt, Cost, Actions |
| 15 | Plan vs Actual – Animals (PACT Actuals) | `/docs/fps/planvsactual_animals.html` | Dynamic · GOV.UK table | Lower table — PACT actual animal postings for comparison | Description, Acct Code, F.Mont, Amount |
| 16 | Programme Management — Project List | `/docs/fps/program_management.html` | Dynamic · Bootstrap custom table | Lists all projects registered under the selected programme; includes client-side keyword search; plan / edit action icons per row | Programme, Project Code, Action |
| 17 | Project Planning — Staff tab | `/docs/fps/projectplanning.html` | Static / Semi-dynamic · Bootstrap striped table | Staff cost entries for an individual project; inline add / edit / delete; running total displayed below grid | Name, Rate, Hrs, Days, StaffCost, Actions |
| 18 | Project Planning — Animals tab | `/docs/fps/projectplanning.html` | Static / Semi-dynamic · Bootstrap striped table | Animal cost entries for an individual project; inline add / edit / delete; running total displayed below grid | Animal Type, Day, No.Req, Daily Rt, Cost, Actions |
| 19 | Project Planning — Test Purchases tab | `/docs/fps/projectplanning.html` | Static / Semi-dynamic · Bootstrap striped table | Test purchase cost entries for an individual project; inline add / edit / delete; running total displayed below grid | Test, Description, ReCUP, Num, AgrUP, TestCost, Actions |
| 20 | Project Planning — Additional Costs tab | `/docs/fps/projectplanning.html` | Static / Semi-dynamic · Bootstrap striped table | Additional / non-staff cost entries for an individual project; inline add / edit / delete; running total displayed below grid | Description, Account, Total Cost, Freq or Mnth, Supplier, Actions |
| 21 | Setup Resource | `/docs/fps/setupresource.html` | Dynamic · GOV.UK table (3 tables) | Three side-by-side resource reference tables: RC charge-rate grades, WG grades, and staff availability; all JS-populated | RC Grades: RCGrade, ChargeRate · WG Grades: WGGrade · Staff: SP No, Name, HrsPaid, Leave, SickSp, AtWork |
| 22 | WorkGroup Resources | `/docs/fps/workgroupresources.html` | Dynamic · JS-driven GOV.UK table | Workgroup resource data table with fully JS-rendered headers and body; used for Stage 1 / Stage 2 allocation review and WG reporting | Dynamic (columns rendered by `workgroupresources.js` at runtime) |

---

## Module Coverage

| Module | Pages with Tables |
|--------|-------------------|
| Maintenance | maintain_division.html, maintain_programs.html, maintain_staff.html |
| Programme Management | program_management.html, planproject_individually.html |
| Project Planning | projectplanning.html, planstaff_entireprogram.html, planvsactaul_staff.html, planvsactaul_test.html, planvsactaul_additional.html, planvsactual_animals.html |
| Resource Setup | setupresource.html, workgroupresources.html |
| Reporting / ASU View | fps_asuview.html |

---

## Pages Without Table Grids (confirmed no data tables)

| File | Notes |
|------|-------|
| `fpshome.html` | Dashboard / navigation hub — no data grids |
| `project_edit.html` | Form-based project detail editor — no grid |
| `setup_newproject.html` | Form for registering a new project — no grid |

---

## Notes

- **Dynamic** tables have an empty `<tbody>` in the HTML; rows are injected by JavaScript (typically from a corresponding `fps_js/` script file).
- **Static / Semi-dynamic** tables (projectplanning.html) contain prototype seed rows in HTML and support runtime add / edit / delete via inline JS.
- All GOV.UK tables use the standard class set: `govuk-table`, `govuk-table__head`, `govuk-table__body`, `govuk-table__row`, `govuk-table__header`, `govuk-table__cell`.
- `workgroupresources.html` column headers are built entirely at runtime; refer to `docs/js/workgroupresources.js` for the definitive column schema.
- Pages `project_edit.html` and `setup_newproject.html` contain forms only — no data-grid tables confirmed.
- Duplicate entry IDs (e.g. `id="empTable"` used on multiple pages) are page-scoped and do not conflict at runtime.
