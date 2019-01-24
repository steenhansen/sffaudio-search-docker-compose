HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon');
var graph_constants = rootAppRequire('sff-network/graph-constants');
var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');
var light_background = graph_constants.LIGHT_BACKGROUND;
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
<style>

/*
 ::-webkit-scrollbar {
    width: 12px !important;
}
*/



/* Track */
/*
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
    -webkit-border-radius: 10px !important;
    border-radius: 10px !important;
}
*/



/* Handle */
/*
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px !important;
    background: #41617D !important;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
}
*/



/*
::-webkit-scrollbar-thumb:window-inactive {
    background: #41617D !important;
}
*/



#all--filter--authors {
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
}

#all--filter--books {
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    float: right;
    width: 50%;
}





.book__choice, .b__c {
    height: 44px;
    width: 132px;
    float: left;
    color: black;
}

.book__choice:hover, .b__c:hover {
    cursor: pointer;
    color: blue;
}

.book__article, .b__a {
    visibility: hidden;
    text-align: center;
    background-color: yellow;
}
 
.book__rest, .b__r {
    height: 1em;
    overflow: hidden;
    text-decoration: underline;
}










.author__choice, .a__c {
    color: black;
    height: 32px;
    display: inline-block;
    width: 132px;
}

.author__choice:hover, .a__c:hover {
    cursor: pointer;
    color: blue;
}

.auth__first, .a__f {
    font-size: 75%;
    width: 45%;
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    overflow-x: hidden;
}

.auth__last, .a__l {
    text-decoration: underline;
    font-size: 100%;
    width: 45%;
    text-align: left;
    display: inline-block;
    white-space: nowrap;
    hyphens: none;
}


.auth__mid, .a__m {
    font-size: 70%;
    width: 45%;
    text-align: right;
    display: inline-block;
    visibility: hidden;
}



#reset--center {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#sff--header {
    text-align: center;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
}

#authors--title {
    width: 50%;
    text-align: center;
    font-size: larger;
}

#books--title {
    width: 50%;
    text-align: center;
    font-size: larger;
}

#do--story--filter {
    flex-grow: 1;
    margin: 4px;
}

#do--author--filter {
    flex-grow: 1;
    margin: 4px;
}

#search--row {
    display: flex;
    background-color: ${light_background};
}

#search--column {
    text-align: center;
    display: inline-block;
    flex-grow: 0;
    width: 155px;
}

#authors--stories--container {
    background-color: ${light_background};
    border-bottom: 1px solid black;
}

#authors--stories--titles {
    display: flex;
    height: 27px
}

#authors--stories--lists {
    float: clear;
}

#all--filter--authors {
    float: left;
    width: 50%;
}

#bottom--icons-row {
    display: flex;
    height: 27px;
    margin-bottom:-27px;
}

#bottom--move--up {
    position: relative;
    width: 100%
}

.bottom--icon {
    position: relative;
    top: -26px;
    width: 13px;
    display: inline-block;
    vertical-align: middle;
    float: left;
    margin-right: 14px;
    padding-top: 1px;
}
</style>

<div id="my--network">
    <div id="sff--header">
        Search SFFaudio's Online Content
    </div>
    <div id='search--row'>
        <button id='do--author--filter'
                onClick=" var search_term = document.getElementById('filter--author--text').value;
                          var found_author = sff_js_vars.vars_events.chooseIfSingleAuthor(search_term);
                          sff_js_vars.filter_names.showHideFilteredAuthors('filtered_media');
                          if (found_author){
                             sff_js_vars.vars_events.filterResetButton();
                          }else{
                             sff_js_vars.filter_names.nothingFound(sff_js_vars.NO_SUCH_AUTHOR);
                          } ">Search authors for<br>...
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
                   onkeypress=" sff_js_vars.vars_events.inputEnterPress(); "
                   oninput=" sff_js_vars.vars_events.inputSearch();
                             sff_js_vars.vars_events.filterSearchForText(); "/>
        </div>
        <button id='do--story--filter'
                onClick=" var search_term = document.getElementById('filter--author--text').value;
                         sff_js_vars.vars_events.bookSearch(search_term); ">Search stories for<br>...
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
    <div>
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
