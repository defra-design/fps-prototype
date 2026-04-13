

document.addEventListener('DOMContentLoaded', function () {
    if (typeof initializeTable === 'function') {
        initializeTable();
    }
});

function renderEmptyRow(tbodyId, colSpan, message) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) {
        return;
    }

    tbody.innerHTML = '';
    var row = document.createElement('tr');
    row.className = 'govuk-table__row';
    row.innerHTML = '<td class="govuk-table__cell" colspan="' + colSpan + '">' + message + '</td>';
    tbody.appendChild(row);
}

function goToPage(page, totalPages, onNavigate) {
    if (page < 1 || page > totalPages) {
        return;
    }

    if (typeof onNavigate === 'function') {
        onNavigate(page);
    }
}

function renderPagination(records, currentPage, perPage, paginationListId, onPageClick) {
    var paginationList = document.getElementById(paginationListId);
    if (!paginationList) {
        return;
    }

    var totalRecords = records.length;
    var totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    var prevDisabled = currentPage <= 1;
    var nextDisabled = currentPage >= totalPages;

    var html = '';

    html += '<li class="govuk-pagination__prev ' + (prevDisabled ? 'govuk-pagination__item--disabled' : '') + '">';
    html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + (currentPage - 1) + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Previous page">';
    html += '<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
    html += '<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>';
    html += '</svg>';
    html += '<span class="govuk-pagination__link-title">Previous</span>';
    html += '</a></li>';

    for (var i = 1; i <= totalPages; i++) {
        html += '<li class="govuk-pagination__item ' + (i === currentPage ? 'govuk-pagination__item--current' : '') + '">';
        html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + i + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Page ' + i + '">' + i + '</a>';
        html += '</li>';
    }

    html += '<li class="govuk-pagination__next ' + (nextDisabled ? 'govuk-pagination__item--disabled' : '') + '">';
    html += '<a class="govuk-link govuk-pagination__link" href="#" onclick="event.preventDefault(); goToPage(' + (currentPage + 1) + ', ' + totalPages + ', window.' + onPageClick.name + ');" aria-label="Next page">';
    html += '<span class="govuk-pagination__link-title">Next</span>';
    html += '<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">';
    html += '<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>';
    html += '</svg>';
    html += '</a></li>';

    paginationList.innerHTML = html;
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }
    modal.classList.add('show');
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }
    modal.classList.remove('show');
}
