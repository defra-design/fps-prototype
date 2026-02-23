document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // User table row selection
    const tableRows = document.querySelectorAll('.user-table tbody tr');
    const userSelect = document.getElementById('userSelect');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove selected class from all rows
            tableRows.forEach(r => r.classList.remove('selected'));
            
            // Add selected class to clicked row
            this.classList.add('selected');
            
            // Update user select input
            const userName = this.cells[2].textContent;
            userSelect.value = userName;
            
            // Update permissions based on selected user
            updatePermissionsForUser(userName);
        });
    });
    
    // Permission item selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('permission-item')) {
            const parentList = e.target.parentElement;
            const items = parentList.querySelectorAll('.permission-item');
            
            // Toggle selection (allow multiple selections)
            e.target.classList.toggle('selected');
        }
    });
    
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate navigation functionality
            console.log('Navigation clicked:', this.textContent);
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        // Simulate search functionality
        const searchTerm = prompt('Enter search term:');
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Here you would implement actual search logic
        }
    });
    
    // Window controls
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');
    const closeBtn = document.querySelector('.close');
    
    minimizeBtn.addEventListener('click', function() {
        console.log('Minimize window');
        // Implement minimize functionality
    });
    
    maximizeBtn.addEventListener('click', function() {
        console.log('Maximize window');
        document.querySelector('.window-container').classList.toggle('maximized');
    });
    
    closeBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to close this window?')) {
            window.close();
        }
    });
    
    // Function to update permissions based on selected user
    function updatePermissionsForUser(userName) {
        // This would typically fetch permissions from a server
        // For demo purposes, we'll just log the action
        console.log('Loading permissions for user:', userName);
        
        // Simulate different permission sets for different users
        const permissionSets = {
            'Chris Moore': {
                resource: ['ADMIN', 'Comm', 'CSU'],
                programme: ['ADMIN', 'Comm', 'Path'],
                directorate: ['Comm', 'Test_Owner'],
                project: ['AHVLA_PROG', 'Commercial']
            },
            'Bateman, Rebecca': {
                resource: ['B&M', 'Bees', 'BDU'],
                programme: ['B&M', 'Bact', 'BTB'],
                directorate: ['Prod', 'Serv'],
                project: ['END_RES', 'FES_RES']
            }
        };
        
        const userPermissions = permissionSets[userName] || permissionSets['Chris Moore'];
        
        // Update each tab's permissions
        Object.keys(userPermissions).forEach(tabType => {
            const tabPane = document.getElementById(tabType + '-tab');
            if (tabPane) {
                const items = tabPane.querySelectorAll('.permission-item');
                items.forEach(item => {
                    item.classList.remove('selected');
                    if (userPermissions[tabType].includes(item.textContent)) {
                        item.classList.add('selected');
                    }
                });
            }
        });
    }
    
    // Initialize with default user permissions
    updatePermissionsForUser('Chris Moore');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+F for search
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchBtn.click();
        }
        
        // Escape to close
        if (e.key === 'Escape') {
            closeBtn.click();
        }
        
        // Tab navigation with Ctrl+Tab
        if (e.ctrlKey && e.key === 'Tab') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active');
            const nextTab = activeTab.nextElementSibling || tabButtons[0];
            nextTab.click();
        }
    });
    
    // Add resize functionality for maximized state
    const style = document.createElement('style');
    style.textContent = `
        .window-container.maximized {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            border-radius: 0;
            z-index: 1000;
        }
        
        .window-container.maximized .content-area {
            height: calc(100vh - 200px);
        }
    `;
    document.head.appendChild(style);
});