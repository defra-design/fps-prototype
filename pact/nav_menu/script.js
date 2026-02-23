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

function initMenu() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();

             const dropdownId = this.getAttribute('data-dropdown');
            const dropdownMenu = document.getElementById(dropdownId);
            const parentDropdown = this.closest('.dropdown');

            const btnRect = toggle.getBoundingClientRect();
            const menuRect = dropdownMenu.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            //  const btnRect = toggle.getBoundingClientRect();
          //  const menuRect = dropdownMenu.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // reset
            dropdownMenu.style.top = '';
            dropdownMenu.style.bottom = '';
            dropdownMenu.style.left = '';
            dropdownMenu.style.right = '';

            // ---- VERTICAL (up / down) ----
            if (btnRect.bottom + menuRect.height > vh) {
            dropdownMenu.style.bottom = `${toggle.offsetHeight}px`;
            } else {
            dropdownMenu.style.top = `${toggle.offsetHeight}px`;
            }

            // ---- HORIZONTAL (left / right) ----
            if (btnRect.left + menuRect.width > vw) {
            // overflow on right → align right edge
            dropdownMenu.style.right = '0';
            } else if (btnRect.right - menuRect.width < 0) {
            // overflow on left → align left edge
            dropdownMenu.style.left = '0';
            } else {
            // normal
            dropdownMenu.style.left = '0';
            }





           

            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== dropdownMenu) m.classList.remove('show');
            });
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== parentDropdown) d.classList.remove('active');
            });

            // Toggle current
            dropdownMenu.classList.toggle('show');
            parentDropdown.classList.toggle('active');

            if (!dropdownMenu.classList.contains('show')) return;

            // ---- POSITIONING FIX ----
            // dropdownMenu.style.top = '';
            // dropdownMenu.style.bottom = '';
            // dropdownMenu.style.display = 'block'; // ensure measurable

          

            // if (btnRect.bottom + menuRect.height > viewportHeight) {
            //     dropdownMenu.style.bottom = toggle.offsetHeight + 'px';
            // } else {
            //     dropdownMenu.style.top = toggle.offsetHeight + 'px';
            // }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Handle dropdown item click
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function () {
            const dropdownMenu = this.closest('.dropdown-menu');
            const parentDropdown = this.closest('.dropdown');

            dropdownMenu.classList.remove('show');
            parentDropdown.classList.remove('active');
        });
    });


};




