
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


    const js_browser_code = readFilePromise(browser_code, 'utf8');
    const js_vars_events = readFilePromise(vars_events, 'utf8');
    const js_sff_helpers = readFilePromise(sff_helpers_js, 'utf8');
    const js_history_state = readFilePromise(history_state, 'utf8');

    const js_history_generate = readFilePromise(history_generate, 'utf8');
    const js_help_vars = readFilePromise(help_vars, 'utf8');
    const js_load_scripts = readFilePromise(load_scripts, 'utf8');


    const js_popup_blur = readFilePromise(popup_blur, 'utf8');
    const js_filter_names = readFilePromise(filter_names, 'utf8');
    const js_popup_post = readFilePromise(popup_post, 'utf8');

    const js_popup_book_post = readFilePromise(popup_book_post, 'utf8');

    const js_popup_pdf = readFilePromise(popup_pdf, 'utf8');
    const js_popup_podcast = readFilePromise(popup_podcast, 'utf8');


    const js_popup_rsd = readFilePromise(popup_rsd, 'utf8');
    const js_random_quality = readFilePromise(random_quality, 'utf8');


    const js_prog_vars = readFilePromise(program_variables, 'utf8')
    var widget_vars = widget_vars_html.widgetVars(graph_container_id, nodes_object, edges_object, graph_object);

    const author_links = cached_authors.getCache();
    const book_links = cached_books.getCache();
    return Promise.all([js_sff_helpers, js_browser_code, js_vars_events, js_prog_vars, js_history_state,
        js_history_generate, js_help_vars, js_load_scripts, js_popup_blur, js_filter_names,
        js_popup_post, js_popup_book_post, js_popup_pdf, js_popup_podcast, js_popup_rsd, js_random_quality,
        author_links, book_links])
        .then(([js_sff_helpers, js_browser_code, js_vars_events, js_prog_vars, js_history_state,
                js_history_generate,js_help_vars,js_load_scripts, js_popup_blur,js_filter_names,
                js_popup_post,js_popup_book_post,js_popup_pdf,js_popup_podcast,js_popup_rsd, js_random_quality,
                author_links, book_links])=> {
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




    ${js_vars_events}
    sff_js_vars.vars_events.initVars();
    ${js_prog_vars}
    ${js_sff_helpers}
    ${js_history_state}
    ${js_history_generate}
</script>   
    
    ${load_css_external}
    ${widget_vars} 
     
    
<script>
    ${js_help_vars} 
    ${js_random_quality}
    ${js_popup_pdf}
    ${js_popup_podcast}
    ${js_popup_rsd}
    ${js_popup_post}
    ${js_popup_book_post}
    ${js_filter_names}
    ${js_browser_code}
</script>

    ${widget_html}

<style>
   ${popup_css_html.popup_css}
</style>
   
   ${popup_css_html.popup_html}

<script>
    ${js_popup_blur}
    ${js_load_scripts}
    
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

