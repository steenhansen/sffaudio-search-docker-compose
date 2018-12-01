var widget_vars_html = rootAppRequire('sff-network/html-pages/widget-vars-html')
const CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
const cached_authors = new CachedAuthors();
const CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
const cached_books = new CachedBooks();
var media_constants = rootAppRequire('sff-network/media-constants');
const graph_container_id = media_constants.GRAPH_CONTAINER_ID;

var popup_blur = rootAppRequire('sff-network/html-pages/popup-blur.css.js');
var load_css_external = rootAppRequire('sff-network/html-pages/load-css-external')(media_constants.GRAPH_BACKGROUND, graph_container_id);
var load_scripts = rootAppRequire('sff-network/html-pages/load-scripts')('mainStart');  // mainJsStart // ie_load_second_chance


const readFilePromise = require('fs-readfile-promise');

const filter_names = rootAppRequire('sff-network/show-nodes/media-nodes/filter-names');
const browser_code = rootAppRequire('sff-network/show-nodes/media-nodes/browser-graph');
const history_state = rootAppRequire('sff-network/html-pages/history-state');
const history_generate = rootAppRequire('sff-network/html-pages/history-generate');
const vars_events = rootAppRequire('sff-network/html-pages/vars-events');
const program_constants = fromAppRoot('sff-network/program-constants.js');
const popup_pdf = rootAppRequire('sff-network/show-nodes/media-nodes/popup-pdf');
const popup_podcast = rootAppRequire('sff-network/show-nodes/media-nodes/popup-podcast');
const popup_rsd = rootAppRequire('sff-network/show-nodes/media-nodes/popup-rsd');
const popup_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-post');
const popup_book_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-book-post');
const sff_helpers_js = rootAppRequire('sff-network/html-pages/helper-functions');


module.exports = function the_widget(nodes_object, edges_object, graph_object, req_query_view, nodes_and_edges_str) {
    if (graph_object.under_title) {
        var under_title = graph_object.under_title;
    } else {
        var under_title = '';
    }
    var strip_author = graph_object.strip_author;
    const js_constants = readFilePromise(program_constants, 'utf8')
    var widget_vars = widget_vars_html.widgetVars(graph_container_id, nodes_object, edges_object, graph_object);
    const author_links = cached_authors.getCache();
    const book_links = cached_books.getCache(); /// books_string_or_promise
    return Promise.all([js_constants, author_links, book_links])
        .then(([js_constants,  author_links, book_links])=> {

                /*
                 style=" -ms-box-orient: horizontal;
                 display: -webkit-box;
                 display: -moz-box;
                 display: -ms-flexbox;
                 display: -moz-flex;
                 display: -webkit-flex;
                 display: flex;
                 -webkit-flex-wrap: wrap;
                 flex-wrap: wrap;
                 "
                 */
                 
                   // var nodes_and_edges = JSON.parse(nodes_and_edges_str);
// var nodes_and_edges_0 = JSON.parse(nodes_and_edges_str[0]);
// var nodes_and_edges_1 = JSON.parse(nodes_and_edges_str[1]);



                var widget_html = widget_vars_html.widgetHtml(graph_container_id, author_links, book_links);
                var build_page = `




<script>
    ${vars_events}



    sff_vars.vars_events.initVars();
    ${js_constants}
    ${sff_helpers_js}
    ${history_state}
    ${history_generate}
</script>   
    
    ${load_css_external}
    ${widget_vars} 
    
    
    <script>
sff_vars.strip_author = "${strip_author}";
    sff_vars.default_authors = ${nodes_and_edges_str}



if(sff_vars.helpers.objectIsEmpty(sff_vars.graph_vars.nodes_string)){
       
       
         var rand_index = Math.floor((Math.random() * sff_vars.default_authors.length));
       
        sff_vars.graph_vars.nodes_string=sff_vars.default_authors[rand_index].nodes_object;
        sff_vars.graph_vars.edges_string=sff_vars.default_authors[rand_index].edges_object;
        sff_vars.graph_vars.graph_info=sff_vars.default_authors[rand_index].graph_info;
        
       var strip_author = sff_vars.default_authors[rand_index].graph_info.strip_author;
       sff_vars.strip_author = strip_author;
}
</script>
    
<script>
    ${popup_pdf}
    ${popup_podcast}
    ${popup_rsd}
    ${popup_post}
    ${popup_book_post}
    ${filter_names}
    ${browser_code}
</script>

    ${widget_html}




<style>
   ${popup_blur.popup_blur_css}
</style>
   
   ${popup_blur.popup_blur_html}

<script>
    ${popup_blur.popup_blur_js}
    ${load_scripts}
    
    sff_vars.graph_procs.doGraph();
    function mainStart(polyfill_error){
        sff_vars.vars_events.initEvents();
       sff_vars.history_generate.startHistoryView('${req_query_view}', sff_vars.strip_author, '${under_title}')
    }

</script>`;
                return build_page;

            }
        )

}

