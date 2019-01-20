const readFilePromise = require('fs-readfile-promise');

var widget_vars_html = rootAppRequire('sff-network/html-pages/widget-vars-html');
const CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
const cached_authors = new CachedAuthors();
const CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
const cached_books = new CachedBooks();
var graph_constants = rootAppRequire('sff-network/graph-constants');
const graph_container_id = graph_constants.GRAPH_CONTAINER_ID;

var popup_css_html = rootAppRequire('sff-network/html-pages/popup-blur.css-html.js');
var load_css_external = rootAppRequire('sff-network/html-pages/load-css-external')(graph_constants.DARK_BACKGROUND, graph_container_id);

const vars_events = fromAppRoot('sff-network/html-pages/vars-events.js');
const browser_code = fromAppRoot('sff-network/html-pages/browser-graph.js');
const sff_helpers_js = fromAppRoot('sff-network/html-pages/helper-functions.js');
const history_state = fromAppRoot('sff-network/html-pages/history-state.js');
const history_generate = fromAppRoot('sff-network/html-pages/history-generate.js');
var help_vars = fromAppRoot('sff-network/html-pages/help-graph.js');
var load_scripts = fromAppRoot('sff-network/html-pages/load-scripts.js');  // mainJsStart // ie_load_second_chance
const filter_names = fromAppRoot('sff-network/show-nodes/media-nodes/filter-names.js');
const popup_post = fromAppRoot('sff-network/show-nodes/media-nodes/popup-author-post.js');
const popup_book_post = fromAppRoot('sff-network/show-nodes/media-nodes/popup-book-post.js');
const popup_pdf = fromAppRoot('sff-network/show-nodes/media-nodes/popup-pdf.js');
const popup_podcast = fromAppRoot('sff-network/show-nodes/media-nodes/popup-podcast.js');
const popup_rsd = fromAppRoot('sff-network/show-nodes/media-nodes/popup-rsd.js');
var popup_blur = fromAppRoot('sff-network/html-pages/popup-blur.js');
const program_variables = fromAppRoot('sff-network/program-variables.js');
var random_quality = fromAppRoot('sff-network/html-pages/random-quality.js');

let {
    URL_SEPARATOR, DARK_BACKGROUND, LIGHT_BACKGROUND, BOOK_PAGE_TYPE, AUTHOR_PAGE_TYPE, AUTHOR_BOOK_SEPARATOR, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP,
    HELP_FONT, ERROR_FONT, END_BOOK_LIST, END_AUTHOR_LIST
} = rootAppRequire('sff-network/graph-constants');


var js_browser_code_PS = readFilePromise(browser_code, 'utf8');

var js_vars_events_PS = readFilePromise(vars_events, 'utf8');
var js_sff_helpers_PS = readFilePromise(sff_helpers_js, 'utf8');
var js_history_state_PS = readFilePromise(history_state, 'utf8');

var js_history_generate_PS = readFilePromise(history_generate, 'utf8');
var js_help_vars_PS = readFilePromise(help_vars, 'utf8');
var js_load_scripts_PS = readFilePromise(load_scripts, 'utf8');


var js_popup_blur_PS = readFilePromise(popup_blur, 'utf8');
var js_filter_names_PS = readFilePromise(filter_names, 'utf8');
var js_popup_post_PS = readFilePromise(popup_post, 'utf8');

var js_popup_book_post_PS = readFilePromise(popup_book_post, 'utf8');

var js_popup_pdf_PS = readFilePromise(popup_pdf, 'utf8');
var js_popup_podcast_PS = readFilePromise(popup_podcast, 'utf8');


var js_popup_rsd_PS = readFilePromise(popup_rsd, 'utf8');
var js_random_quality_PS = readFilePromise(random_quality, 'utf8');


var js_prog_vars_PS = readFilePromise(program_variables, 'utf8')


module.exports = function the_widget(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str) {
    if (graph_object.under_title) {
        var under_title = graph_object.under_title;
    } else {
        var under_title = '';
    }

    if (typeof graph_object.strip_author === 'undefined') {
        var strip_author = '';

    } else {
        var strip_author = graph_object.strip_author;
    }


    var widget_vars = widget_vars_html.widgetVars(graph_container_id, nodes_object, edges_object, graph_object);

    const author_links = cached_authors.getCache();
    const book_links = cached_books.getCache();
    return Promise.all([js_sff_helpers_PS, js_browser_code_PS, js_vars_events_PS, js_prog_vars_PS, js_history_state_PS,
        js_history_generate_PS, js_help_vars_PS, js_load_scripts_PS, js_popup_blur_PS, js_filter_names_PS,
        js_popup_post_PS, js_popup_book_post_PS, js_popup_pdf_PS, js_popup_podcast_PS, js_popup_rsd_PS, js_random_quality_PS,
        author_links, book_links])
        .then(([js_sff_helpers_S, js_browser_code_S, js_vars_events_S, js_prog_vars_S, js_history_state_S,
                js_history_generate_S, js_help_vars_S, js_load_scripts_S, js_popup_blur_S, js_filter_names_S,
                js_popup_post_S, js_popup_book_post_S, js_popup_pdf_S, js_popup_podcast_S, js_popup_rsd_S, js_random_quality_S,
                author_links, book_links])=> {

                js_browser_code_PS = js_browser_code_S;

                js_vars_events_PS = js_vars_events_S;
                js_sff_helpers_PS = js_sff_helpers_S;
                js_history_state_PS = js_history_state_S;

                js_history_generate_PS = js_history_generate_S;   //  _PS indicates a Promise first time, then a String forever
                js_help_vars_PS = js_help_vars_S;                 // so these are varible cached values, files read only once
                js_load_scripts_PS = js_load_scripts_S;


                js_popup_blur_PS = js_popup_blur_S;
                js_filter_names_PS = js_filter_names_S;
                js_popup_post_PS = js_popup_post_S;

                js_popup_book_post_PS = js_popup_book_post_S;

                js_popup_pdf_PS = js_popup_pdf_S;
                js_popup_podcast_PS = js_popup_podcast_S;


                js_popup_rsd_PS = js_popup_rsd_S;
                js_random_quality_PS = js_random_quality_S;


                js_prog_vars_PS = js_prog_vars_S;

                var widget_html = widget_vars_html.widgetHtml(graph_container_id, author_links, book_links);
                var build_page = `

<script>
// jsloader-css start    
     function mainStart(polyfill_error){
       sff_js_vars.vars_events.initEvents();
       sff_js_vars.history_generate.startHistoryView('${req_query_view}', sff_js_vars.strip_author, '${under_title}', '${req_query_choice}');
    }
    
    
 window.sff_constants={ 
			    "URL_SEPARATOR"   : "${URL_SEPARATOR}",
			    "DARK_BACKGROUND"   : "${DARK_BACKGROUND}",
			    "LIGHT_BACKGROUND"   : "${LIGHT_BACKGROUND}",
			    "BOOK_PAGE_TYPE"   : "${BOOK_PAGE_TYPE}",
			    "AUTHOR_PAGE_TYPE"   : "${AUTHOR_PAGE_TYPE}",
			    "AUTHOR_BOOK_SEPARATOR"   : "${AUTHOR_BOOK_SEPARATOR}",
			    "MAX_ZOOM"   : "${MAX_ZOOM}",
			    "MIN_ZOOM"   : "${MIN_ZOOM}",
			    "ZOOM_STEP"   : "${ZOOM_STEP}",
			    
			    "HELP_FONT" :      ${HELP_FONT},
			    "ERROR_FONT" :  ${ERROR_FONT},
			    "START_FUNC" : mainStart,
			    "END_BOOK_LIST" : "${END_BOOK_LIST}",
			    "END_AUTHOR_LIST" : "${END_AUTHOR_LIST}",
			    "STRIP_AUTHOR" : "${strip_author}",
			     "NODES_AND_EDGES_STR" : ${nodes_and_edges_str}
			       };




    ${js_vars_events_S}
    sff_js_vars.vars_events.initVars();
    ${js_prog_vars_S}
    ${js_sff_helpers_S}
    ${js_history_state_S}
    ${js_history_generate_S}
</script>   
    
    ${load_css_external}
    ${widget_vars} 
     
    
<script>
    ${js_help_vars_S} 
    ${js_random_quality_S}
    ${js_popup_pdf_S}
    ${js_popup_podcast_S}
    ${js_popup_rsd_S}
    ${js_popup_post_S}
    ${js_popup_book_post_S}
    ${js_filter_names_S}
    ${js_browser_code_S}
</script>

    ${widget_html}

<style>
   ${popup_css_html.popup_css}
</style>
   
   ${popup_css_html.popup_html}

<script>
    ${js_popup_blur_S}
    ${js_load_scripts_S}
    
      if (sff_js_vars.graph_vars.graph_info.graph_type === '${AUTHOR_PAGE_TYPE}') {
            sff_js_vars.filter_names.colorAuthors();
     } else {
             sff_js_vars.filter_names.colorBooks();
     }
     sff_js_vars.graph_procs.doGraph(sff_php_vars.php_search);
    
   
// jsloader-css end    

</script>
`;
                return build_page;

            }
        )

}

