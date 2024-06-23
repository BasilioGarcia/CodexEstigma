function loadLinks(path, callback) {
    $.getJSON(path, function(data) {
        callback(data);
    });
}

function createAnchor(chapters, chapter, dir, section, txt){
    let a = document.createElement("a");
    let url = dir;

    if (section) {
        url += chapters[chapter]['sections'][section]['url'];
    } else {
        url += chapters[chapter]['url'];
    }

    a.href = url;
    a.textContent = txt;
    a.className = 'link';

    return a;
}

export function setLinks(dir, chapters) {
    const timestamp = (environment === 'development') ? new Date().getTime() : '';
    const path = dir + '/js/db/links.json?_=' + timestamp;

    const callback = function (links) {
        $('page-link').each(function () {
            const id = $(this).attr('data-id');

            if (!links[id]) {
                console.log('Error, no existe el page-link: ' + id);
                return true;
            }

            const chapter = links[id]['chapter'];
            const section = links[id]['section'];
            const txt = $(this).text();
            const a = createAnchor(chapters, chapter, dir, section, txt);

            $(this).after(a);
            $(this).remove();
        });
    };

    loadLinks(path, callback);
}
