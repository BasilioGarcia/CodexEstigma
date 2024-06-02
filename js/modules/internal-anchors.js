
export function setInternalAnchors() {
    $('h2, h3, h4').each(function () {
        let id = $(this).attr('id');
        if (typeof id !== 'undefined' && id !== null && id !== '') {
            $(this).html('<a href="#' + id + '">' + $(this).text() + '</a>');
        }
    });
}