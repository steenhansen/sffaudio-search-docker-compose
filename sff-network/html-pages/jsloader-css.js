var server_to_browser = rootAppRequire('sff-network/show-nodes/media-nodes/server-to-browser')
const CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
const cached_authors = new CachedAuthors('author_linksss');
const CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
const cached_books = new CachedBooks('books_linksss');
var media_constants = rootAppRequire('sff-network/media-constants');
var popup_blur_css = rootAppRequire('sff-network/html-pages/popup-blur.css.js');
var load_css_external = rootAppRequire('sff-network/html-pages/load-css-external')(media_constants.GRAPH_BACKGROUND);
var load_scripts = rootAppRequire('sff-network/html-pages/load-scripts')('mainStart');  // mainJsStart // ie_load_second_chance


const readFilePromise = require('fs-readfile-promise');

module.exports = function the_widget(nodes_object, edges_object, graph_object, req_query_view) {

    if (graph_object.under_title){
        var under_title =  graph_object.under_title;
    }else{
        var under_title =  '';
    }
    
    var strip_author = graph_object.strip_author;
    const filter_names = rootAppRequire('sff-network/show-nodes/media-nodes/filter-names')('5535345');

const browser_code = rootAppRequire('sff-network/show-nodes/media-nodes/browser-graph');
const history_state = rootAppRequire('sff-network/html-pages/history-state');

//  here read program-constnts
 const program_constants = fromAppRoot('sff-network/program-constants.js');
const js_constants = readFilePromise(program_constants, 'utf8')
// then encase in <script>

    const popup_pdf = rootAppRequire('sff-network/show-nodes/media-nodes/popup-pdf')();
    const popup_podcast = rootAppRequire('sff-network/show-nodes/media-nodes/popup-podcast')('3466666');
    const popup_rsd = rootAppRequire('sff-network/show-nodes/media-nodes/popup-rsd')('23423423')
    const popup_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-post')('9998988');

    const popup_book_post = rootAppRequire('sff-network/show-nodes/media-nodes/popup-book-post')('9998988');


    const sff_helpers_js = rootAppRequire('sff-network/html-pages/helper-functions');
    var widget_html = server_to_browser('my-graph_', nodes_object, edges_object, graph_object);
    const author_links = cached_authors.getCache(graph_object.db_version);
    const book_links = cached_books.getCache(graph_object.db_version);

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

var build_page = `

 <script>
    window.sff_vars={};
    try {
        var ajax_url =  window.sff_php_vars.php_url;
    } catch(err) {
        window.sff_php_vars={ 'php_url':'not a php host'};
        var ajax_url =  window.location.origin+'/';
    }
     sff_vars.ajax_url=ajax_url;
       ${js_constants}
</script>

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
        <button id='clear--filter' onClick='sff_vars.filter_names.stopFiltering()'>Clear Filter</button>
        <input id='filter--text' type='text' onChange='sff_vars.filter_names.filterMedia(this)' />
     </div>
     
</div>

${popup_blur_css}

<script>
    ${load_scripts}
    sff_vars.graph_procs.doGraph();
    function mainStart(polyfill_error){
        ${popup_pdf}
        ${popup_podcast}
        ${popup_rsd}
        ${popup_post}
        ${popup_book_post}
        
        window.onpopstate =sff_vars.history_state.onPopState;
        window.onkeydown = function( event ) {
            sff_vars.blur_procs.keyDowns(event)
        };
        
        
        
        
        
        if (sff_php_vars.php_url==='not a php host'){
                if ('${under_title}'){
                    sff_vars.history_state.pushBook('${strip_author}', '${under_title}');
                    
                    if ('${req_query_view}'==='post'){
                            for (let graph_node of sff_vars.graph_vars.nodes_string) {
                                if (graph_node.group==='L_BOOK_POST'){
                                    sff_vars.post_procs.loadBookPost(graph_node.goto_url, graph_node.strip_author,'${req_query_view}');
                                    break;
                                }
                             }
                      }
                    
                }else{
                   
                // http://localhost:5000/?author=philip_k_dick&view=post
                sff_vars.history_state.pushAuthor('${strip_author}');
                      if ('${req_query_view}'==='post'){
                            for (let graph_node of sff_vars.graph_vars.nodes_string) {
                                if (graph_node.group==='L_POST'){
                                    sff_vars.post_procs.loadPost(graph_node.goto_url, graph_node.strip_author,'${req_query_view}');
                                    break;
                                }
                             }
                      }
                    
                }
        
        }else  if (sff_php_vars.php_book!==''){
             sff_vars.history_state.pushBook(sff_php_vars.php_author, sff_php_vars.php_book);
        }else if (sff_php_vars.php_author!==''){
            console.log('werwerwerew view post ', '${req_query_view}', sff_php_vars.php_author)
             sff_vars.history_state.pushAuthor(sff_php_vars.php_author);
             
             
             if ('${req_query_view}'==='post'){
                            for (let graph_node of sff_vars.graph_vars.nodes_string) {
                                if (graph_node.group==='L_POST'){
                                    sff_vars.post_procs.loadPost(graph_node.goto_url, graph_node.strip_author,'${req_query_view}');
                                    break;
                                }
                             }
                      }
             
             
        }else {
        }
        
        
      
      
       
        
    }

</script> `;
    return build_page;

            }
        )

}

