document.addEventListener('DOMContentLoaded', function() {
    // Get all parent menu items
    const parentMenuItems = document.querySelectorAll('.parent-menu');
    const submenuItems = document.querySelectorAll('.submenu-item');

    // Handle parent menu item clicks
    parentMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all parent menu items
            parentMenuItems.forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Handle submenu item clicks
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all submenu items
            submenuItems.forEach(submenu => {
                submenu.classList.remove('active');
            });
            
            // Add active class to clicked submenu item
            this.classList.add('active');
            
            // Find the parent dropdown and mark it as active
            const parentDropdown = this.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.parent-menu');
                parentMenuItems.forEach(menu => {
                    menu.classList.remove('active');
                });
                parentLink.classList.add('active');
            }
            
            // Close the dropdown after selection
            const dropdown = bootstrap.Dropdown.getInstance(this.closest('.dropdown-menu').previousElementSibling);
            if (dropdown) {
                dropdown.hide();
            }
            
            // Show selected item in console (for demo purposes)
            console.log('Selected menu item:', this.textContent.trim());
            
            // Update page content based on selection (demo)
           // updatePageContent(this.textContent.trim());
        });
    });

    // Function to update page content based on menu selection
    function updatePageContent(selectedItem) {
        const alertDiv = document.querySelector('.alert');
        if (alertDiv) {
            alertDiv.innerHTML = `
                <h4 class="alert-heading">${selectedItem}</h4>
                <p>You have selected: <strong>${selectedItem}</strong></p>
                <hr>
                <p class="mb-0">This is a demo implementation. In a real application, this would load the corresponding module or page content.</p>
            `;
        }
    }

    // Handle navbar toggler for mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Initialize with first menu item active
    if (parentMenuItems.length > 0) {
        parentMenuItems[0].classList.add('active');
    }
});