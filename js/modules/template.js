export function loadTemplate() {
    return new Promise(async (resolve, reject) => {
        try {
            const timestamp = (environment === 'development') ? new Date().getTime() : '';
            const page = $('page');
            const dir = page.attr('data-dir');
            const body = $('body');
            const head = $("head");
            const urlChapters = dir + '/js/db/chapters.json?_=' + timestamp;
            const urlHeader = dir + '/template/header.html?_=' + timestamp;
            const urlMain = dir + '/template/main.html?_=' + timestamp;
            const urlMetas = dir + '/template/metas.html?_=' + timestamp;
            const urlSidebar = dir + '/template/sidebar.html?_=' + timestamp;

            head.append('<link rel="stylesheet" href="' + dir + '/css/main.css?_=' + timestamp + '">');
            if (dir !== '.') {
                head.append('<link rel="stylesheet" href="./page.css?_=' + timestamp + '">');
            }

            body.addClass('sidebar-open');

            const [metaData, sidebarData, mainData, chaptersData, headerData] = await Promise.all([
                $.get(urlMetas),
                $.get(urlSidebar),
                $.get(urlMain),
                $.getJSON(urlChapters),
                $.get(urlHeader)
            ]);

            head.append(metaData);
            body.prepend(sidebarData);
            $("aside").after(mainData);
            setChapters(head, dir, page, chaptersData);
            $("#main").prepend(headerData);
            moveSection(dir, head, page);

            resolve( { "dir": dir, "chapters": chaptersData});

        } catch (error) {
            err('Error mientras se cargaba el template');
            reject(error);
        }
    });
}

function err(load) {
    console.log('error en el template cargando: ' + load);
    return false;
}

function setChapters(head, dir, page, chapters) {
    let chapterIndex = parseInt(page.attr('data-chapter'));
    let sectionIndex = parseInt(page.attr('data-section'));

    setTitles(head, dir, chapterIndex, sectionIndex, chapters);
    setMenu(dir, chapterIndex, sectionIndex, chapters);
    setFootMenu(dir, chapterIndex, sectionIndex, chapters);
}

function setFootMenu (dir, chapterIndex, sectionIndex, chapters) {
    if (chapterIndex === 0) {
        $("#footer-menu").hide();
    } else {
        getPreviousPage(dir, chapters, chapterIndex, sectionIndex);
        getNextPage(dir, chapters, chapterIndex, sectionIndex);
    }
}


function getNextPage(dir, chapters, chapterIndex, sectionIndex) {
    let nextPage = {title:"", url:"", exist:false};
    let chaptersLength = Object.keys(chapters).length - 1;
    let fMenuRight = $('#footer-menu .right');
    let fMenuRightA = fMenuRight.find('a');

    if (sectionIndex) {
        let sectionLength = Object.keys(chapters[chapterIndex]["sections"]).length;
        if (sectionIndex === sectionLength) {
            nextPage = getNextChapter(nextPage, chapters, chaptersLength, chapterIndex);
        } else {
            nextPage["title"] = chapters[chapterIndex]["sections"][sectionIndex + 1]["title"];
            nextPage["url"] = chapters[chapterIndex]["sections"][sectionIndex + 1]["url"];
            nextPage["exist"] = true;
        }
    } else {
        getNextChapter(nextPage, chapters, chaptersLength, chapterIndex);
    }

    if (nextPage["exist"]) {
        fMenuRightA.text(nextPage["title"]);
        fMenuRightA.attr("href", dir + nextPage["url"]);
    } else {
        fMenuRight.hide();
    }
}

function getNextChapter(nextPage, chapters, chaptersLength, chapterIndex) {
    if (chapterIndex === chaptersLength) {
        return nextPage;
    }

    const nextChapter = chapters[chapterIndex + 1];
    if (nextChapter["sections"]) {
        nextPage["title"] = nextChapter["sections"][1]["title"];
        nextPage["url"] = nextChapter["sections"][1]["url"];
    } else {
        nextPage["title"] = nextChapter["title"];
        nextPage["url"] = nextChapter["url"];
    }

    nextPage["exist"] = true;

    return nextPage;
}

function getPreviousPage(dir, chapters, chapterIndex, sectionIndex) {
    let previousPage = {title:"", url:"", exist:false};
    let fMenuLeft = $('#footer-menu .left');
    let fMenuLeftA = fMenuLeft.find('a');
    if (sectionIndex) {
        if (sectionIndex === 1) {
            previousPage = getPreviousChapter(previousPage, chapters, chapterIndex, sectionIndex);
        } else {
            previousPage["title"] = chapters[chapterIndex]["sections"][sectionIndex - 1]["title"];
            previousPage["url"] = chapters[chapterIndex]["sections"][sectionIndex - 1]["url"];
            previousPage["exist"] = true;
        }
    } else {
        getPreviousChapter(previousPage, chapters, chapterIndex, sectionIndex);
    }

    if (previousPage["exist"]) {
        fMenuLeftA.text(previousPage["title"]);
        fMenuLeftA.attr("href", dir + previousPage["url"]);
    } else {
        fMenuLeft.hide();
    }
}

function getPreviousChapter(previousPage, chapters, chapterIndex, sectionIndex) {
    if (chapterIndex === 1 && (!sectionIndex || sectionIndex === 1)) {
        return previousPage;
    }
    const previousChapter = chapters[chapterIndex - 1];
    if (previousChapter["sections"]) {
        let previousSectionLength = Object.keys(previousChapter["sections"]).length;
        previousPage["title"] = previousChapter["sections"][previousSectionLength]["title"];
        previousPage["url"] = previousChapter["sections"][previousSectionLength]["url"];
    } else {
        previousPage["title"] = previousChapter["title"];
        previousPage["url"] = previousChapter["url"];
    }

    previousPage["exist"] = true;

    return previousPage;
}

function setMenu (dir, chapterIndex, sectionIndex, chapters) {

    const chaptersArray = Object.entries(chapters);
    const chaptersHTML = chaptersArray.map(([key, value]) => {

        if (key === "0") {
            return "";
        }

        if (value.sections) {
            const sectionsHTML = Object.entries(value.sections).map(([sectionKey, sectionValue]) => {
                return `
                    <li>
                        <a href="${dir + sectionValue.url}">${sectionValue.title}</a>
                    </li>`;
            }).join('');

            return `
            <li>
                <span>${value.title}</span>
                <ul>${sectionsHTML}
                </ul>
            </li>`;
        } else {
            return `
            <li>
                <a href="${dir + value.url}">${value.title}</a>
            </li>`;
        }
    }).join('');

    $('#menu').html(chaptersHTML);

    chapterIndex--;
    sectionIndex--;

    if(chapterIndex !== -1) {
        $('#menu > li:eq(' + chapterIndex + ')').addClass('current');
    }

    if(sectionIndex !== -1) {
        $('#menu li.current ul li:eq('+ sectionIndex +')').addClass('current');
    }
}

function setTitles(head, dir, chapterIndex, sectionIndex, chapters) {
    let title = '';

    if (sectionIndex) {
        title = chapters[chapterIndex]["sections"][sectionIndex].title;
    } else {
        title = chapters[chapterIndex].title;
    }

    head.append('<title>' + title + '</title>');
    if (chapterIndex !== 0) {
        $('#main-title h1').text(title);
    }
}

function moveSection(dir, head, page) {
    let tmpPage = page.detach();

    $('#main-body').prepend(tmpPage);
    $('page').show();

    if (dir !== '.') {
        $('#linkHome').attr('href', dir);
    }
    return true;
}
