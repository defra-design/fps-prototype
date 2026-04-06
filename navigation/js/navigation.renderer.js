(function (global) {
  "use strict";

  function getDocsRootPathname() {
    var pathname = (global.location && global.location.pathname) || "";
    var marker = "/docs/";
    var idx = pathname.toLowerCase().indexOf(marker);
    if (idx === -1) return "";
    return pathname.slice(0, idx + "/docs".length);
  }

  function getImagePath(fileName) {
    if (global.location && global.location.protocol === "file:") {
      var docsRoot = getDocsRootPathname();
      return (docsRoot || "") + "/images/" + fileName;
    }
    return "/images/" + fileName;
  }

  function getNavLink(url) {
    if (typeof url !== "string" || !url) {
      return "#";
    }

    if (global.location && global.location.protocol === "file:" && url.charAt(0) === "/") {
      var docsRoot = getDocsRootPathname();
      return (docsRoot || "") + url;
    }

    return url;
  }

  function createItem(item, level) {
    var li = document.createElement("li");
    li.className = "app-nav-item";

    var title = item.title || "Untitled";
    var children = Array.isArray(item.children) ? item.children : [];
    var hasChildren = children.length > 0;

    if (hasChildren) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "app-nav-button";
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = "<span class=\"app-nav-text\">" + title + "</span><span class=\"app-nav-arrow\" aria-hidden=\"true\"></span>";
      li.appendChild(button);

      var submenu = document.createElement("ul");
      submenu.className = "app-submenu";
      submenu.setAttribute("aria-label", title + " submenu");

      children.forEach(function (child) {
        submenu.appendChild(createItem(child, level + 1));
      });

      li.appendChild(submenu);

      button.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = submenu.classList.contains("show");
        closeSiblingMenus(li);
        submenu.classList.toggle("show", !isOpen);
        li.classList.toggle("active", !isOpen);
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    } else {
      var link = document.createElement("a");
      link.className = "app-nav-link";
      link.href = getNavLink(item.url || "#");
      link.textContent = title;
      if (item.description) {
        link.title = item.description;
      }
      li.appendChild(link);
    }

    return li;
  }

  function closeSiblingMenus(listItem) {
    var parent = listItem.parentElement;
    if (!parent) return;

    parent.querySelectorAll(":scope > .app-nav-item > .app-submenu.show").forEach(function (menu) {
      if (menu !== listItem.querySelector(":scope > .app-submenu")) {
        menu.classList.remove("show");
      }
    });

    parent.querySelectorAll(":scope > .app-nav-item.active").forEach(function (item) {
      if (item !== listItem) {
        item.classList.remove("active");
      }
    });

    parent.querySelectorAll(":scope > .app-nav-item > .app-nav-button[aria-expanded='true']").forEach(function (btn) {
      if (btn !== listItem.querySelector(":scope > .app-nav-button")) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeAllMenus(root) {
    root.querySelectorAll(".app-submenu.show").forEach(function (menu) {
      menu.classList.remove("show");
    });
    root.querySelectorAll(".app-nav-item.active").forEach(function (item) {
      item.classList.remove("active");
    });
    root.querySelectorAll(".app-nav-button[aria-expanded='true']").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function render(containerId, menuData, options) {
    var host = document.getElementById(containerId);
    if (!host) return;

    host.innerHTML = "";

    var wrap = document.createElement("div");
    wrap.className = "app-nav-wrap";

    var nav = document.createElement("ul");
    nav.className = "app-main-nav";
    nav.setAttribute("aria-label", "Application navigation");

    var userSlot = document.createElement("div");
    userSlot.className = "app-user-slot";

    var userButton = document.createElement("button");
    userButton.type = "button";
    userButton.className = "app-user-button";
    userButton.innerHTML = "<span class=\"app-user-name\">" + (options && options.userName ? options.userName : "Ken Rod") + "</span><img class=\"app-user-icon\" alt=\"user icon\" src=\"" + getImagePath("circle-user-regular-full.svg") + "\" width=\"24\"/><img class=\"app-user-arrow\" alt=\"dropdown arrow\" src=\"" + getImagePath("down-arrow.png") + "\" width=\"30\" height=\"30\"/>";

    var userMenu = document.createElement("div");
    userMenu.className = "app-user-menu";
    userMenu.innerHTML = "<ul><li><a href=\"" + getNavLink(options && options.homeUrl ? options.homeUrl : "/index.html") + "\"><img alt=\"home icon\" src=\"" + getImagePath("house-user-solid-full.svg") + "\" width=\"20\"/>Home</a></li></ul>";

    userButton.addEventListener("click", function (e) {
      e.stopPropagation();
      userMenu.classList.toggle("show");
    });

    userSlot.appendChild(userButton);
    userSlot.appendChild(userMenu);
    wrap.appendChild(userSlot);

    menuData.forEach(function (item) {
      nav.appendChild(createItem(item, 0));
    });

    wrap.appendChild(nav);
    host.appendChild(wrap);

    document.addEventListener("click", function () {
      closeAllMenus(wrap);
      userMenu.classList.remove("show");
    });
  }

  global.NavigationRenderer = {
    render: render,
  };
})(window);
