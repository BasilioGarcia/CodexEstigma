/* iframe == nope */
window.top.location !== window.location && (window.top.location = window.location);

import { bindHeader } from "./modules/header.js";
import { bindSidebar } from "./modules/sidebar.js";
import { loadTemplate } from "./modules/template.js";
import { setInternalAnchors } from "./modules/internal-anchors.js";
import { setLinks } from "./modules/pages-links.js";
import { setTooltips } from "./modules/tooltips.js";

$(document).ready(function() {
    loadTemplate().then((data) => {
        bindHeader();
        bindSidebar();
        setInternalAnchors();
        setLinks(data["dir"], data["chapters"]);
        setTooltips(data["dir"]);
    }).catch((error) => {
        console.error(error);
    });
});
