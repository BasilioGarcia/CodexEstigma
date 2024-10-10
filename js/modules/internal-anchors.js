
export function setInternalAnchors() {
    const headings = document.querySelectorAll('h2, h3, h4');

    headings.forEach(function(heading) {
        let id = heading.getAttribute('id');
        if (id !== null && id !== '') {
            heading.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
        }
    });
}

/*
export function setInternalAnchors() {
    $('h2, h3, h4').each(function () {
        let id = $(this).attr('id');
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            $(this).html('<a href="#' + id + '">' + $(this).text() + '</a>');
        }
    });
}
*/