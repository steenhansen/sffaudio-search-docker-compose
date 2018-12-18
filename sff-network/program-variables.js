

// start program-variables.js
if (typeof sff_vars === 'undefined') {
    sff_vars = {};
}

sff_vars.SFF_RESOLVE_URL = 'resolve-url';
sff_vars.SFF_START_PDF_URL = 'start_pdf_url';
sff_vars.SFF_RESOLVE_PDF = sff_vars.SFF_RESOLVE_URL + '?' + sff_vars.SFF_START_PDF_URL + '=';
sff_vars.ROUTE_RESOLVE_PDF = '/' + sff_vars.SFF_RESOLVE_URL;
sff_vars.ROUTE_AUTHOR_JSON = '/author/:strip_author';






sff_vars.PROTOCAL_RELATIVE_URL = '//';

sff_vars.ROUTE_START_BOOK = '/author/book/';
sff_vars.ROUTE_BOOK_JSON =  sff_vars.ROUTE_START_BOOK + ':strip_author/:under_title';






if (typeof module === 'undefined') {
    module = {};
}
module.exports = sff_vars;
// end program-variables.js
