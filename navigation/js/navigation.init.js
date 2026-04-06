(function (global) {
  "use strict";

  function initNavigation() {
    var cfg = global.NavConfig || {};
    var containerId = cfg.containerId || "header";
    var appKey = cfg.appKey || "";

    try {
      var menu = global.getNavigationData ? global.getNavigationData(appKey) : [];
      global.NavigationRenderer.render(containerId, menu, {
        userName: cfg.userName || "Ken Rod",
        homeUrl: cfg.homeUrl || "../index.html",
      });
    } catch (err) {
      console.error("Navigation initialization failed", err);
    }
  }

  global.initAppNavigation = initNavigation;
})(window);
