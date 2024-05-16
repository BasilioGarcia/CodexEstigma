const environment = 'production'; // 'production | development'
document.addEventListener("DOMContentLoaded", function() {
    let timestamp = (environment === 'production') ? new Date().getTime() : '';
    let page = document.getElementsByTagName('page')[0];
    let dir = page.getAttribute('data-dir');
    let jquery = dir + '/js/jquery-3.7.1.min.js?_=' + timestamp;
    let core = dir + '/js/core.js?_=' + timestamp;
    let scriptJquery = document.createElement('script');

    document.getElementsByTagName('body')[0].style.backgroundColor = '#000';
    page.style.display = 'none';

    scriptJquery.onload = function() {
        console.log('cargado jquery');
        loadCore(core);
    };
    scriptJquery.src = jquery;
    document.getElementsByTagName('body')[0].appendChild(scriptJquery);
});

function loadCore(core) {
    let scriptCore = document.createElement('script');
    scriptCore.onload = function() {
        console.log('cargado core');
    };
    scriptCore.src = core;
    scriptCore.type = 'module';
    document.getElementsByTagName('body')[0].appendChild(scriptCore);
}