function btn() {
    if (document.getElementById('userdropdownbtn') !== null) {
        document.getElementById('userdropdownbtn').addEventListener('click', function () {
            //const dp = document.getElementById('userdropdownbtn');
            const dp = this.closest('.userdropdownbtn');
            dp.parentElement.nextElementSibling.classList.toggle('show');
            //dp.nextElementSibling.classList.toggle('show');
           //  dp.classList.remove('show');
        })
    }

}

function initMenu(){
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
           // e.preventDefault();
            
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdownMenu = document.getElementById(dropdownId);
            const parentDropdown = this.closest('.dropdown');

            const menu = document.querySelector('.dropdown-menu');

          //  menu.style.display = 'block';
            menu.style.top = '';
            menu.style.bottom = '';

            const rect = menu.getBoundingClientRect();
            const btnRect = toggle.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });
            
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove('active');
                }
            });

             if (btnRect.bottom + rect.height > viewportHeight) {
                menu.style.bottom = toggle.offsetHeight + 'px';
            } else {
                menu.style.top = toggle.offsetHeight + 'px';
            }
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('show');
            parentDropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });




        //    document.addEventListener('click', function(e) {
        //     document.querySelectorAll('.dropdown-menu').forEach(m => {
        //         m.style.display = 'none';
        //     });
        // });

    
    // Handle dropdown item clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
          //  e.preventDefault();
            console.log('Selected:', this.textContent);
            
            // Close the dropdown after selection
            const dropdownMenu = this.closest('.dropdown-menu');
            const parentDropdown = this.closest('.dropdown');
            
            dropdownMenu.classList.remove('show');
            parentDropdown.classList.remove('active');
        });
    });

//    btn();

};




