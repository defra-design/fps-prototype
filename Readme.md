# 📁 Docs Folder Guide

This directory contains all **static UI pages, assets, and scripts** used in the prototype.

---

## Unused Files Audit

### Important Notes
- Files listed below are **not referenced internally** within the `docs/` folder.
- Some may still be:
  - Used via direct URL access
  - Reserved for future features
- **Do not delete without business confirmation**

---

### CSS (Unused)
- docs/css/pact_styles/tablestyle.css
- docs/css/pact_styles/tb.css

---

### JavaScript (Unused)
- docs/js/common.js  
- docs/js/costbookAddStaff.js  
- docs/js/customchart.js  
- docs/js/fps_navbar.js  
- docs/js/inlinetable.js  
- docs/js/paste.js  
- docs/js/pm.js  
- docs/js/tablescript.js  
- docs/js/tablescripttwo.js  
- docs/js/pact_js/govuk-frontend-6.0.0.min.js  
- docs/js/pact_js/setupresource.js  
- docs/pact/nav_menu/script_bkp.js  

---

### HTML (Unlinked Pages)
- docs/fps/project_selection.html  
- docs/fps/staff_maintenance.html  
- docs/pact/create_email_time_output_summary copy.html  

---

### Images (Unused)
- docs/images/fieldbg1.jpg  
- docs/images/header_bannersmall.JPG  
- docs/images/user_icon.png  
- docs/images/username_icon.png  
- docs/images/circle-chevron-right-solid-full.svg  
- docs/images/circle-plus-solid-full.svg  
- docs/images/clock-regular-full-black.svg  
- docs/images/clock-regular-full.svg  
- docs/images/edit_time_code.svg  
- docs/images/edit_time_code_two.svg  
- docs/images/edit_time_code_white.svg  
- docs/images/euro-sign-solid-full.svg  
- docs/images/euro-sign-solid-full_white.svg  
- docs/images/list-check-solid-full.svg  
- docs/images/list-solid-full.svg  
- docs/images/list-solid-full_white.svg  
- docs/images/logout.svg  
- docs/images/plus-circle.svg  
- docs/images/profile.svg  
- docs/images/setting.svg  
- docs/images/square-minus-regular-full.svg  
- docs/images/square-plus-regular-full.svg  
- docs/images/user-tie-solid-full.svg  
- docs/images/xmark-solid-full.svg  

---

## Proposed Folder Structure

A modular and scalable structure for better maintainability:

```text
docs/
│
├── index.html
├── README.md
│
├── apps/
│   ├── fps/
│   │   ├── pages/
│   │   ├── components/
│   │   └── assets/
│   │       ├── css/
│   │       ├── js/
│   │       └── images/
│   │
│   ├── pact/
│   ├── pims/
│   └── costbook/
│
├── shared/
│   ├── css/
│   │   ├── bootstrap/
│   │   ├── govuk/
│   │   ├── base/
│   │   └── utilities/
│   │
│   ├── js/
│   │   ├── bootstrap/
│   │   ├── common/
│   │   └── navigation/
│   │
│   └── images/
│       ├── icons/
│       ├── logos/
│       └── backgrounds/
│
└── legacy/
    ├── backups/
    └── deprecated/