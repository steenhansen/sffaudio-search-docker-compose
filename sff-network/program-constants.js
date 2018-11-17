

// start program-constants.js
if (typeof sff_vars === 'undefined') {
    sff_vars = {};
}

sff_vars.SFF_RESOLVE_URL = 'resolve-url';
sff_vars.SFF_START_PDF_URL = 'start_pdf_url';
sff_vars.SFF_RESOLVE_PDF = sff_vars.SFF_RESOLVE_URL + '?' + sff_vars.SFF_START_PDF_URL + '=';
sff_vars.ROUTE_RESOLVE_PDF = '/' + sff_vars.SFF_RESOLVE_URL;
sff_vars.ROUTE_AUTHOR_JSON = '/author/:strip_author';


sff_vars.GRAPH_CONTAINER_ID = 'my--graph';


sff_vars.WP_HOLDING_PAGE = "/about"; 


if (typeof module === 'undefined') {
    module = {};
}
module.exports = sff_vars;
// end program-constants.js
