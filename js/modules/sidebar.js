function closeSidebar() {
    $('#sidebar-close').on('click',function(ev) {
        $('aside').toggleClass('show');
        ev.preventDefault();
    });
}

function toggleSidebar() {
    $('#sidebar-toggle').on('click',function(ev) {
        $('body').toggleClass('sidebar-collected');
        ev.preventDefault();
    });
}

function toggleSubmenu(){
    let submenus = $('#menu > li span');

    submenus.on("hover",
        function() {
            $(this).parent().find('.ul').addClass('open');
        }, function() {
            $(this).parent().find('.ul').removeClass('open');
        }
    );

    submenus.on("click", function(ev) {
        ev.preventDefault();
        $(this).parent().find('ul').toggleClass('open');
    });

}

export function bindSidebar() {
    closeSidebar();
    toggleSidebar();
    toggleSubmenu();
}