# Navigation Implementation

## Completed Change

Navigation no longer uses JSON files or fetch-based API loading.

It now uses a centralized HTML/JS structure only, shared across:

- PACT
- FPS
- PIMS
- Costbook

## Current Architecture

1. `navigation.endpoints.js`
Stores the centralized menu structure in `window.NavigationData`.

2. `navigation.init.js`
Reads `NavConfig.appKey`, gets menu from `getNavigationData(appKey)`, and renders it.

3. `navigation.renderer.js`
Builds the menu DOM, handles dropdown behavior, and supports `file://` and localhost link resolution.

4. `navigation.css`
Shared visual style for all modules.

## Integration Pattern

```html
<link rel="stylesheet" href="../navigation/css/navigation.css" />
<div id="header"></div>

<script src="../navigation/js/navigation.endpoints.js"></script>
<script src="../navigation/js/navigation.renderer.js"></script>
<script src="../navigation/js/navigation.init.js"></script>
<script>
  window.NavConfig = {
    appKey: "pact",
    containerId: "header",
    userName: "Meg Ved",
    homeUrl: "/index.html"
  };
  initAppNavigation();
</script>
```

## Notes

- Centralized structure is editable in one place: `navigation.endpoints.js`.
- JSON API files and the related navigation API script were removed.
- Legacy app-specific nav templates can be migrated gradually to this shared structure.
