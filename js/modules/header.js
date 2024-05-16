
function showSidebar() {
    $('#hamburger-menu').on('click',function(ev) {
        $('aside').toggleClass('show');
        ev.preventDefault();
    });
}
export function bindHeader() {
    showSidebar();
}