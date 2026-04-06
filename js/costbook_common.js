// ============================================
// Search Table Function
// ============================================
function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("searchInput");
    if (!input) return; // Exit if search input doesn't exist
    
    filter = input.value.toUpperCase();
    table = document.getElementById("tableBody");
    if (!table) return; // Exit if table doesn't exist
    
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        found = false;
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// ============================================
// Toggle Sidebar Function
// ============================================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidenav');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

// ============================================
// GOV.UK Tabs Navigation
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".govuk-tabs__tab");
    const panels = document.querySelectorAll(".govuk-tabs__panel");

    if (tabs.length === 0 || panels.length === 0) return; // Exit if tabs don't exist

    tabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault(); // stop default anchor jump

            const targetId = this.getAttribute("href").substring(1);

            // Hide all panels
            panels.forEach((panel) => {
                panel.classList.add("govuk-tabs__panel--hidden");
            });

            // Remove selected class from all tabs
            document
                .querySelectorAll(".govuk-tabs__list-item")
                .forEach((li) =>
                    li.classList.remove("govuk-tabs__list-item--selected"),
                );

            // Show selected panel
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.remove("govuk-tabs__panel--hidden");
            }

            // Mark tab selected
            const parentLi = this.parentElement;
            if (parentLi) {
                parentLi.classList.add("govuk-tabs__list-item--selected");
            }
        });
    });
});
