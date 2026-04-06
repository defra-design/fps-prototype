/* FPS Setup Resource - Navbar Initialization */
(function () {
    'use strict';

    function initNavbar() {
        // Initialize Bootstrap navbar dropdowns
        var navbarTogglers = document.querySelectorAll('.navbar-toggler');
        var dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');

        // Ensure navbar is accessible
        navbarTogglers.forEach(function (toggler) {
            toggler.addEventListener('click', function () {
                var target = toggler.getAttribute('data-bs-target');
                var menu = document.querySelector(target);
                if (menu) {
                    menu.classList.toggle('show');
                }
            });
        });

        // Close dropdowns when a link is clicked
        var dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                if (!item.hasAttribute('aria-expanded')) {
                    var parent = item.closest('.dropdown');
                    if (parent) {
                        var toggle = parent.querySelector('[data-bs-toggle="dropdown"]');
                        if (toggle) {
                            toggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        });

        // Handle keyboard navigation (accessibility)
        dropdownToggles.forEach(function (toggle) {
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                    toggle.focus();
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

    // Expose to global scope if needed
    window.initNavbar = initNavbar;
}());
