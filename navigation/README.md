# Centralized Navigation System

Reusable, modular navigation shared across PACT, FPS, PIMS, and Costbook.

This structure is now HTML/JS centralized only. JSON endpoint files and fetch-based navigation were removed.

## Structure

```
docs/navigation/
├── css/
│   └── navigation.css             # Shared styles
├── js/
│   ├── navigation.endpoints.js    # Centralized menu data by app key
│   ├── navigation.renderer.js     # DOM builder and interactions
│   └── navigation.init.js         # Initialization entry point
└── README.md
```

## How to Use

1. Add shared CSS and placeholder:

```html
<link rel="stylesheet" href="../navigation/css/navigation.css" />
<div id="header"></div>
```

2. Include scripts in order:

```html
<script src="../navigation/js/navigation.endpoints.js"></script>
<script src="../navigation/js/navigation.renderer.js"></script>
<script src="../navigation/js/navigation.init.js"></script>
```

3. Initialize with app key:

```html
<script>
  window.NavConfig = {
    appKey: "pact", // pact | fps | pims | costbook
    containerId: "header",
    userName: "Meg Ved",
    homeUrl: "/index.html"
  };
  initAppNavigation();
</script>
```

## App Keys

- `pact`
- `fps`
- `pims`
- `costbook`

## Customize Menu

Update menu entries directly in [js/navigation.endpoints.js](js/navigation.endpoints.js) under `window.NavigationData`.

Each menu item shape:

```js
{
  title: "Menu Label",
  url: "/module/page.html",
  description: "Optional tooltip",
  children: []
}
```

## Notes

- Shared nav supports both `http://localhost` and `file://` mode.
- For `file://`, links are normalized automatically by the renderer.
