/*
function showSidebar() {
    $('#hamburger-menu').on('click',function(ev) {
        $('aside').toggleClass('show');
        ev.preventDefault();
    });
}
 */

function showSidebar() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const asideElement = document.querySelector('aside');

    hamburgerMenu.addEventListener('click', function(ev) {
        asideElement.classList.toggle('show');
        ev.preventDefault();
    });
}

export function bindHeader() {
    showSidebar();
}