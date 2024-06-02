
function loadDefinitions(url, callback) {
    $.getJSON(url, function(data) {
        callback(data);
    });
}

function bindTooltip (me) {
    me.on('click',function(ev) {
        $(this).find('.tooltip-window').toggleClass('hide');
        ev.preventDefault();
    });
}

export function setTooltips(dir) {
    let timestamp = (environment === 'development') ? new Date().getTime() : '';
    let url = dir + '/js/db/definitions.json?_=' + timestamp;

    loadDefinitions(url, function (definitions) {
        $('t').each(function () {
            let id = $(this).attr('data-id');
            $(this).append('<span class="tooltip-window hide">'+ definitions[id]['title'] +'</span>');
            bindTooltip($(this));
        });
    });
}
