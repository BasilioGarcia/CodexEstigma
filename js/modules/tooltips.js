
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
    const timestamp = (environment === 'development') ? new Date().getTime() : '';
    const url = dir + '/js/db/definitions.json?_=' + timestamp;

    const callback = function (definitions) {
        $('t').each(function () {
            let id = $(this).attr('data-id');
            $(this).append('<span class="tooltip-window hide">'+ definitions[id]['title'] +'</span>');
            bindTooltip($(this));
        });
    };

    loadDefinitions(url, callback);
}
