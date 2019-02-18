// start program-variables.js
if (typeof sff_js_vars === 'undefined') {
    sff_js_vars = {};
}

sff_js_vars.ROUTE_AUTHOR_JSON = '/author/:strip_author';
sff_js_vars.PROTOCAL_RELATIVE_URL = '//';
sff_js_vars.ROUTE_START_BOOK = '/author/book/';
sff_js_vars.ROUTE_BOOK_JSON = sff_js_vars.ROUTE_START_BOOK + ':strip_author/:under_title';

if (typeof module === 'undefined') {
    module = {};
}
module.exports = sff_js_vars;
// end program-variables.js
