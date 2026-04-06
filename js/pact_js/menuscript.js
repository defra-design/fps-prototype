function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    const menuItem = submenu.previousElementSibling;
    
    // Close all other submenus
    const allSubmenus = document.querySelectorAll('.submenu');
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    allSubmenus.forEach(menu => {
        if (menu.id !== submenuId) {
            menu.classList.remove('open');
        }
    });
    
    allMenuItems.forEach(item => {
        if (item !== menuItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current submenu
    submenu.classList.toggle('open');
    menuItem.classList.toggle('active');
}

// Add click handlers for submenu items
document.addEventListener('DOMContentLoaded', function() {
    const submenuItems = document.querySelectorAll('.submenu-item');
    
    submenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all submenu items
            submenuItems.forEach(i => i.classList.remove('active-submenu'));
            
            // Add active class to clicked item
            this.classList.add('active-submenu');
            
            // Update content area
            updateContent(this.textContent);
        });
    });
    
    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to close the application?')) {
                window.close();
            }
        });
    }
});

function updateContent(itemName) {
    const content = document.querySelector('.content');
    content.innerHTML = `
        <div class="content-header">
            <h2>${itemName}</h2>
            <p>Content for ${itemName} will be displayed here.</p>
        </div>
        <div class="content-body">
            <p>This is a placeholder for the ${itemName} functionality.</p>
        </div>
    `;
}

// Add CSS for active submenu item
const style = document.createElement('style');
style.textContent = `
    .submenu-item.active-submenu {
        background-color: #0075ee !important;
        color: white !important;
        font-weight: bold;
    }
    
    .content-header {
        border-bottom: 2px solid #4CAF50;
        padding-bottom: 15px;
        margin-bottom: 20px;
    }
    
    .content-header h2 {
        color: #4CAF50;
        margin-bottom: 10px;
    }
    
    .content-body {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 5px;
        border-left: 4px solid #4CAF50;
    }
`;
document.head.appendChild(style);