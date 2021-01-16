const readFilePromise = require('fs-readfile-promise');
const minify = require('minify');

var widget_vars_html = rootAppRequire('common-node/html-pages/widget-vars-html');
const CachedAuthors = rootAppRequire('common-node/build-nodes/cached-lists/cached-authors');
const cached_authors = new CachedAuthors();
const CachedBooks = rootAppRequire('common-node/build-nodes/cached-lists/cached-books');
const cached_books = new CachedBooks();
var graph_constants = rootAppRequire('common-node/graph-constants');
const graph_container_id = graph_constants.GRAPH_CONTAINER_ID;

var popup_css_html = rootAppRequire('common-node/html-pages/popup-blur.html.js');
var load_css_external = rootAppRequire('common-node/html-pages/load-css-external')(graph_container_id);

const vars_events = fromAppRoot('common-node/html-pages/vars-events.js');
const browser_code = fromAppRoot('common-node/html-pages/browser-graph.js');
const sff_helpers_js = fromAppRoot('common-node/html-pages/helper-functions.js');
const history_state = fromAppRoot('common-node/html-pages/history-state.js');
const history_generate = fromAppRoot('common-node/html-pages/history-generate.js');
var help_vars = fromAppRoot('common-node/html-pages/help-graph.js');
var load_scripts = fromAppRoot('common-node/html-pages/load-scripts.js');  // mainJsStart // ie_load_second_chance

const filter_names = fromAppRoot('common-node/show-nodes/media-nodes/filter-names.js');

const popup_post = fromAppRoot('common-node/show-nodes/media-nodes/popup-author-post.js');
const popup_book_post = fromAppRoot('common-node/show-nodes/media-nodes/popup-book-post.js');
const popup_pdf = fromAppRoot('common-node/show-nodes/media-nodes/popup-pdf.js');
const popup_podcast = fromAppRoot('common-node/show-nodes/media-nodes/popup-podcast.js');
const popup_rsd = fromAppRoot('common-node/show-nodes/media-nodes/popup-rsd.js');
var popup_blur = fromAppRoot('common-node/html-pages/popup-blur.js');
const program_variables = fromAppRoot('common-node/program-variables.js');
var random_quality = fromAppRoot('common-node/html-pages/random-quality.js');

let {
    URL_SEPARATOR, DARK_BACKGROUND, LIGHT_BACKGROUND, BOOK_PAGE_TYPE, AUTHOR_PAGE_TYPE, AUTHOR_BOOK_SEPARATOR, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP,
    HELP_FONT, ERROR_FONT, END_BOOK_LIST, END_AUTHOR_LIST, MINIFYING_JS, MINIFY_CSS_TABLE, FETCH_WAIT_M_SEC, FETCH_RETRYS, UNRESPONSIVE_DB_NAME
} = rootAppRequire('common-node/graph-constants');


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

var js_popup_book_post_PS = readFilePromise(popup_book_post, 'utf8');  // After this promise has been fufilled, the variable will turn into a string

var js_popup_pdf_PS = readFilePromise(popup_pdf, 'utf8');
var js_popup_podcast_PS = readFilePromise(popup_podcast, 'utf8');


var js_popup_rsd_PS = readFilePromise(popup_rsd, 'utf8');
var js_random_quality_PS = readFilePromise(random_quality, 'utf8');


var js_prog_vars_PS = readFilePromise(program_variables, 'utf8')

         var author__choice___a__c = MINIFY_CSS_TABLE.author__choice___a__c[MINIFYING_JS];
           var book__choice___b__c = MINIFY_CSS_TABLE.book__choice___b__c[MINIFYING_JS];



           
           
    function getMini(js_browser_code_PS, minifying_js, js_browser_code_S) {
        if (typeof js_browser_code_PS == 'object') {
            if (minifying_js) {
                js_browser_code_PS = minify.js(js_browser_code_S);
            } else {
                js_browser_code_PS = js_browser_code_S;
            }
        }
        return js_browser_code_PS;
    }
    
    
module.exports = function the_widget(nodes_object, edges_object, graph_object, req_query_view, req_query_choice, nodes_and_edges_str, php_search) {

    if (php_search){
     var search_from_wordpress = ' window.sff_php_vars={ "php_search" : " ' + php_search + '"}';
    }else{
        var search_from_wordpress = '';
    }

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

                js_browser_code_PS = getMini(js_browser_code_PS, MINIFYING_JS, js_browser_code_S);
                js_vars_events_PS = getMini(js_vars_events_PS, MINIFYING_JS, js_vars_events_S);
                js_sff_helpers_PS = getMini(js_sff_helpers_PS, MINIFYING_JS, js_sff_helpers_S);
                js_history_state_PS = getMini(js_history_state_PS, MINIFYING_JS, js_history_state_S);
                js_history_generate_PS = getMini(js_history_generate_PS, MINIFYING_JS, js_history_generate_S);
                js_help_vars_PS = getMini(js_help_vars_PS, MINIFYING_JS, js_help_vars_S);
                js_load_scripts_PS = getMini(js_load_scripts_PS, MINIFYING_JS, js_load_scripts_S);
                js_popup_blur_PS = getMini(js_popup_blur_PS, MINIFYING_JS, js_popup_blur_S);
                js_filter_names_PS = getMini(js_filter_names_PS, MINIFYING_JS, js_filter_names_S);
                js_popup_post_PS = getMini(js_popup_post_PS, MINIFYING_JS, js_popup_post_S);
                js_popup_book_post_PS = getMini(js_popup_book_post_PS, MINIFYING_JS, js_popup_book_post_S);
                js_popup_pdf_PS = getMini(js_popup_pdf_PS, MINIFYING_JS, js_popup_pdf_S);
                js_popup_podcast_PS = getMini(js_popup_podcast_PS, MINIFYING_JS, js_popup_podcast_S);
                js_popup_rsd_PS = getMini(js_popup_rsd_PS, MINIFYING_JS, js_popup_rsd_S);
                js_random_quality_PS = getMini(js_random_quality_PS, MINIFYING_JS, js_random_quality_S);
                js_prog_vars_PS = getMini(js_prog_vars_PS, MINIFYING_JS, js_prog_vars_S);

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
	            "UNRESPONSIVE_DB_NAME"   : "${UNRESPONSIVE_DB_NAME}",
			    "MAX_ZOOM"   : ${MAX_ZOOM},
			    "MIN_ZOOM"   : ${MIN_ZOOM},
			    "ZOOM_STEP"   : ${ZOOM_STEP},
			    
			    "FETCH_WAIT_M_SEC"   : ${FETCH_WAIT_M_SEC},
			    "FETCH_RETRYS"   : ${FETCH_RETRYS},
			    
			    "HELP_FONT" :      ${HELP_FONT},
			    "ERROR_FONT" :  ${ERROR_FONT},
			    "START_FUNC" : mainStart,
			    "END_BOOK_LIST" : "${END_BOOK_LIST}",
			    "END_AUTHOR_LIST" : "${END_AUTHOR_LIST}",
			    "STRIP_AUTHOR" : "${strip_author}",
			     "NODES_AND_EDGES_STR" : ${nodes_and_edges_str},
			     "AUTHOR__CHOICE___A__C" : "${author__choice___a__c}",
			     "BOOK__CHOICE___B__C" : "${book__choice___b__c}"
			       };
    ${js_vars_events_PS}
    sff_js_vars.vars_events.initVars();
    ${js_prog_vars_PS}
    ${js_sff_helpers_PS}
    ${js_history_state_PS}
    ${js_history_generate_PS}
    
    

     
</script>   


    
    ${load_css_external}
    ${widget_vars} 
     
    
<script>
    ${js_help_vars_PS} 
    ${js_random_quality_PS}
    ${js_popup_pdf_PS}
    ${js_popup_podcast_PS}
    ${js_popup_rsd_PS}
    ${js_popup_post_PS}
    ${js_popup_book_post_PS}
    ${js_filter_names_PS}
    ${js_browser_code_PS}
</script>

    ${widget_html}
 
   ${popup_css_html.popup_html}

<script>
    ${js_popup_blur_PS}
   ${js_load_scripts_PS}
    
    ${search_from_wordpress}
    
      if (sff_js_vars.graph_vars.graph_info.graph_type === '${AUTHOR_PAGE_TYPE}') {
            sff_js_vars.filter_names.colorAuthors();
     } else {
             sff_js_vars.filter_names.colorBooks();
     }
     
     sff_js_vars.graph_procs.doGraph(sff_php_vars.php_search);
    
     sff_js_vars.vars_events.wordPressSearch(sff_php_vars.php_search);
   
// jsloader-css end    

</script>
`;
                return build_page;

            }
        )

}

