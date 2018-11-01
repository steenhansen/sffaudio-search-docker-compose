var server_to_browser = rootAppRequire('sff-network/show-nodes/media-nodes/server-to-browser')
const CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
const cached_authors = new CachedAuthors('author_linksss');
const CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
const cached_books = new CachedBooks('books_linksss');
var media_constants = rootAppRequire('sff-network/media-constants');
var popup_blur_css = rootAppRequire('sff-network/html-pages/popup-blur.css.js');
var load_css_external = rootAppRequire('sff-network/html-pages/load-css-external')(media_constants.GRAPH_BACKGROUND);
var load_scripts = rootAppRequire('sff-network/html-pages/load-scripts')('mainStart');  // mainJsStart // ie_load_second_chance

module.exports = function the_widget(nodes_object, edges_object, graph_object, node_server) {

    var strip_author = graph_object.strip_author;
    const filter_names = rootAppRequire('sff-network/show-nodes/media-nodes/filter-names')('5535345');

const browser_code = rootAppRequire('sff-network/show-nodes/media-nodes/browser-graph')(node_server);
const history_state = rootAppRequire('sff-network/html-pages/history-state')(node_server);



    const popup_pdf = rootAppRequire('sff-network/show-nodes/media-nodes/popup-pdf')(process.env.DEVELOP_USE_PROXIES);
    const popup_podcast = rootAppRequire('sff-network/show-nodes/media-nodes/popup-podcast')('3466666');
    const popup_rsd = rootAppRequire('sff-network/show-nodes/media-nodes/popup-rsd')('23423423')
    const popup_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-post')('9998988');

    const popup_book_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-book-post')('9998988');


    const sff_helpers_js = rootAppRequire('sff-network/html-pages/helper-functions');
    var widget_html = server_to_browser('my-graph_', nodes_object, edges_object, graph_object);
    const author_links = cached_authors.getCache(graph_object.db_version);
    const book_links = cached_books.getCache(graph_object.db_version);

    return Promise.all([author_links, book_links])
        .then(([ author_links, book_links])=> {

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

var build_page = `
    ${sff_helpers_js}
    ${history_state}
    ${load_css_external}
    ${widget_html} 
    
    <script>
        ${filter_names}
        ${browser_code}
    </script>

    <div id="mynetwork">
    <div>
    
         <div id="all--filter--authors" style="height:600px; ">
         <div id='filter--authors' style='display:none'>
              </div>
              
            <div id='all--authors'>
                ${author_links}
            </div>
             
        </div>
  
        <div id="my-graph_">
         </div>
         
         <div id="all--filter--books" style="height:600px; ">
         <div id='filter--books' style='display:none'>
              </div>
            <div id='all--books'>
                 ${book_links}
             </div>
              
         </div>

    </div> 
    
    <div style='clear:both'> 
        <button id='clear--filter' onClick='sff_filter_names.stopFiltering()'>Clear Filter</button>
        <input id='filter--text' type='text' onChange='sff_filter_names.filterMedia(this)' />
     </div>
     
</div>

${popup_blur_css}

<script>
    ${load_scripts}
    sff_graph_procs.doGraph();
    function mainStart(polyfill_error){
        ${popup_pdf}
        ${popup_podcast}
        ${popup_rsd}
        ${popup_post}
        ${popup_book_post}
        sff_history_state.pushAuthor('${strip_author}');
        window.onpopstate =sff_history_state.onPopState;
        window.onkeydown = function( event ) {
            sff_blur_procs.keyDowns(event)
        };
    }

</script> `;
    return build_page;

            }
        )

}

