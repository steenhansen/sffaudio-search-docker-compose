HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon');
var graph_constants = rootAppRequire('common-node/graph-constants');
var svg_icons = rootAppRequire('./common-node/html-pages/svg-icons');
var gif_loading = graph_constants.GIF_LOADING;
var icons_string = HoverIcon.authorIconColors();
var edge_options_json = graph_constants.EDGE_OPTIONS;
var edge_options = JSON.stringify(edge_options_json);
var post_proxy_absolute = graph_constants.ROUTE_POST_PROXY + "?absolute_url=";
let zoom_in = svg_icons.zoom_in_icon('blue');
let zoom_out = svg_icons.zoom_out_icon('blue');
let get_help = svg_icons.get_help_icon('blue');
let fit_canvas = svg_icons.get_fit_icon('blue');

function widgetVars(graph_id, nodes_object, edges_object, graph_object) {
    if (nodes_object.length > 10) {
        graph_object.graph_physics = false;
    } else {
        graph_object.graph_physics = {"barnesHut": {"avoidOverlap": 1}};
    }
    var nodes_string = JSON.stringify(nodes_object, null, ' ');
    var edges_string = JSON.stringify(edges_object, null, ' ');
    var graph_string = JSON.stringify(graph_object, null, ' ');
    
    
    var media_html = `
<script>
// server-to-browser

sff_js_vars.graph_vars={  
        graph_id:"${graph_id}",
        edge_options:${edge_options},
        node_icons:${icons_string},  
        nodes_string:${nodes_string},
        edges_string:${edges_string},
        graph_info:${graph_string}
}    

sff_js_vars.pdf_vars={  
        canvas_id:'pdf--canvas'
}    

sff_js_vars.post_vars={  
        post_proxy:"${post_proxy_absolute}"
}    
</script> `;
    return media_html;
}

function widgetHtml(graph_div_id, author_links, book_links) {
    var media_html = `
<div id="my--network">
    <div id="sff--header">
    
     <div class="back-to-sff" id="back-link"><a href="http://www.sffaudio.com/">Back to SFFaudio</a></div>
    
     <div class="at-sff" id="no-link">   Search SFFaudio's Online Content </div>
        
        
        
    </div>
    <div id='search--row'>
        <button id='do--author--filter'
                onClick=" var search_term = document.getElementById('filter--author--text').value;
                          sff_js_vars.vars_events.wordPressSearch(search_term);
                          var found_author = sff_js_vars.vars_events.chooseIfSingleAuthor(search_term);
                          sff_js_vars.filter_names.showHideFilteredAuthors('filtered_media');
                          sff_js_vars.vars_events.filterResetButton();
                          if (!found_author){
                             sff_js_vars.filter_names.nothingFound(sff_js_vars.NO_SUCH_AUTHOR);
                          } ">Search authors for ...
        </button>
        <div id="search--column">
            <div id='search--for'>
                Search for:
            </div>
            <div id='reset--center'>
                <button id='do--reset' style="display:none"
                        onclick=" sff_js_vars.filter_names.stopFiltering();
                                  document.getElementById('filter--author--text').value='';
                                  sff_js_vars.vars_events.filterSearchForText(); ">Reset Search
                </button>
            </div>
            <input id='filter--author--text' placeholder="search for..." type='text'
                   oninput=" sff_js_vars.vars_events.inputSearch();
                             sff_js_vars.vars_events.filterSearchForText(); "/>
<script>
  var filter_author_text = document.getElementById('filter--author--text');
  filter_author_text.addEventListener('keydown', sff_js_vars.vars_events.inputEnterPress);
</script>                             
        </div>
        <button id='do--story--filter'
                onClick=" var search_term = document.getElementById('filter--author--text').value;
                          sff_js_vars.vars_events.wordPressSearch(search_term);
                          sff_js_vars.vars_events.filterResetButton();
                          sff_js_vars.vars_events.bookSearch(search_term); ">Search stories for ...
        </button>
    </div>
    <div id='authors--stories--container'>
        <div id="authors--stories--titles">
            <div id='authors--title'> Authors</div>
            <div id='books--title'> Stories</div>
        </div>
        <div id="authors--stories--lists">
            <div id="all--filter--authors">
                <div id='filter--authors' style='display:none;'></div>
                <div id='all--authors'>${author_links}</div>
            </div>
            <div id="all--filter--books">
                <div id='filter--books' style='display:none'></div>
                <div id='all--books'>${book_links}</div>
            </div>
        </div>
    </div>
    <div id="loading--graph">
        <div id='stable-redraw-height'></div>
        <div id="${graph_div_id}"></div>
        <img id='pdf--loading' src='${gif_loading}'>
    </div>
    <div id="bottom--icons-row">
        <div id="bottom--move--up">
            <span class='bottom--icon' onclick=" sff_js_vars.graph_procs.loadAuthorNew('HELP_ALL'); " title="Show Help">
                <img src="${get_help}" class="control--symbols">
            </span>        
            <span class='bottom--icon' onclick="sff_js_vars.graph_procs.fitCanvas();" title="Resize Graph">
                <img src="${fit_canvas}" class="control--symbols">
            </span>
            <span class='bottom--icon' style='float:right' onclick="sff_js_vars.graph_procs.graphSize('+');"
                  title="Zoom In">
                <img src="${zoom_in}" class="control--symbols">
            </span>
            <span class='bottom--icon' style='float:right' onclick="sff_js_vars.graph_procs.graphSize('-');"
                  title="Zoom Out">
               <img src="${zoom_out}" class="control--symbols">
            </span>
        </div>
    </div>
</div>
 `;
    return media_html;
}


module.exports = {widgetVars, widgetHtml} 
