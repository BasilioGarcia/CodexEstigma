const environment = 'development'; // 'production | development'

document.addEventListener("DOMContentLoaded", function() {
    const timestamp = (environment === 'development') ? new Date().getTime() : '';
    const page = document.getElementsByTagName('page')[0];
    const dir = page.getAttribute('data-dir');
    const jquery = dir + '/js/jquery-3.7.1.min.js?_=' + timestamp;
    const core = dir + '/js/core.js?_=' + timestamp;
    const scriptJquery = document.createElement('script');

    document.getElementsByTagName('body')[0].style.backgroundColor = '#000';
    page.style.display = 'none';

    scriptJquery.onload = function() {
        if (environment === 'development') {
            console.log('cargado jquery');
        }
        loadCore(core);
    };
    scriptJquery.src = jquery;
    document.getElementsByTagName('body')[0].appendChild(scriptJquery);
});

function loadCore(core) {
    const scriptCore = document.createElement('script');
    scriptCore.onload = function() {
        if (environment === 'development')
            console.log('cargado core');
    };
    scriptCore.src = core;
    scriptCore.type = 'module';
    document.getElementsByTagName('body')[0].appendChild(scriptCore);
}