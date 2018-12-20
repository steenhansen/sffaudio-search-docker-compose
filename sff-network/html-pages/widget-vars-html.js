
HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon');
 var graph_constants = rootAppRequire('sff-network/graph-constants');
 var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');
 //var graph_icons = rootAppRequire('./sff-network/html-pages/graph-icons');
// build_widget
function widgetVars(graph_id, nodes_object, edges_object, graph_object) {

var icons_string = HoverIcon.authorIconColors();

    if (nodes_object.length > 10) {
        graph_object.graph_physics = false;
    } else {
        graph_object.graph_physics = {"barnesHut": {"avoidOverlap": 1 }};
    }


//var author_json = {nodes_object, edges_object, graph_object};   // q*bert
//var author_stringified = JSON.stringify(author_json);         // q*bert

    var nodes_string = JSON.stringify(nodes_object, null, ' ');
    var edges_string = JSON.stringify(edges_object, null, ' ');
    var graph_string = JSON.stringify(graph_object, null, ' ');

    var edge_options_json= graph_constants.EDGE_OPTIONS;
    
var edge_options = JSON.stringify(edge_options_json);

var post_proxy_absolute = graph_constants.ROUTE_POST_PROXY + "?absolute_url=";


    var media_html = `
<script>
// server-to-browser
    sff_vars.graph_vars={  
        graph_id:"${graph_id}",
        edge_options:${edge_options},
        node_icons:${icons_string},  
        nodes_string:${nodes_string},
        edges_string:${edges_string},
        graph_info:${graph_string}
}    


sff_vars.pdf_vars={  
        canvas_id:'pdf--canvas'
}    


sff_vars.post_vars={  

        post_proxy:"${post_proxy_absolute}"
}    

</script> `;
    return media_html;
}



function widgetHtml(graph_div_id, author_links, book_links) {
let zoom_in = svg_icons.zoom_in_icon('blue');
let zoom_out = svg_icons.zoom_out_icon('blue');
let get_help = svg_icons.get_help_icon('blue');

    var media_html = `
<style>
  
         #all--filter--authors {
           height:400px; 
         overflow-y:scroll;
         overflow-x:hidden;
           align-items: flex-start;
         display: flex;
          flex-wrap: wrap;
        }
  
                 #all--filter--books {
             height:400px; 
         overflow-y:scroll;
         overflow-x:hidden;
           align-items: flex-start;
         display: flex;
          flex-wrap: wrap;
        }

        
        .book__choice{
		height:44px;
		width: 175px;
		float: left;
		color: black;
	}
	
	.book__choice:hover{
        cursor:pointer;
        color:blue;
        }
	
	.book__article{
		visibility:hidden;
		text-align:center;
		background-color:yellow;
	}
	
	.book__rest{
		height: 1em;
		overflow:hidden;

		 text-decoration: underline    ;
	}

       
       
    

 
    
  
.author__choice  {
    color:black;
    height:32px;
    display:inline-block;
    width:175px;
}  

.author__choice:hover{
    cursor:pointer;
    color:blue;
}





         .auth__first {
         
             font-size:75%;
             width:45%;
            text-align:right;
            display:inline-block;
            vertical-align:middle;
            overflow-x:hidden;
         }
         .auth__last{
            text-decoration: underline;
            font-size:100%;
             width:45%;
            text-align:left;
            display:inline-block;
             
             white-space: nowrap;  
             hyphens: none; 
        }
        
                 .auth__mid{

            font-size:70%;
             width:45%;
            text-align:right;
            display:inline-block;
            visibility: hidden;
            /*  vertical-align: 7px; */
        }
        
 
        .even__author{
              /*  vertical-align: 7px; */
        }
         .odd__author{
             /*  vertical-align: -7px; */
        }
        
        
        
</style>
    <div id="my--network">
      
      <div style="text-align: center ;   font-size:  x-large; font-family: Arial, Helvetica, sans-serif;">
  Search SFFaudio's Online Content
</div>

<div style="text-align: center;    font-size: larger;"> Authors with online content</div>


         <div id="all--filter--authors" style="">
         <div id='filter--authors' style='display:none'>
              </div>
            <div id='all--authors'>
                ${author_links}
            </div>
        </div>

<script>
function authorEnterPress(e){  
    var event = e || window.event;
    var charCode = event.which || event.keyCode;
    if ( charCode == '13' ) {
        var search_for = document.getElementById('filter--author--text').value;
        sff_vars.filter_names.filterAuthors(search_for);
    }
}
function storyEnterPress(e){  
    var event = e || window.event;
    var charCode = event.which || event.keyCode;
    if ( charCode == '13' ) {
        var search_for = document.getElementById('filter--story--text').value;
        sff_vars.filter_names.filterStories(search_for);
    }
}
</script>  
 <div style='clear:both'> 
        Filter author list by:
        <input id='filter--author--text' placeholder="Author filter" type='text'
        
            onkeypress =" authorEnterPress()  "
        
              oninput=" if (this.value.length>0){
                            document.getElementById('clear--author--filter').disabled = false;
                            document.getElementById('do--author--filter').disabled = false;
                        }else{
                            document.getElementById('clear--author--filter').disabled = true;
                            document.getElementById('do--author--filter').disabled = true;
                        }" />
                        
                      
                        
                        
                        
        <button id='do--author--filter' disabled="true" 
            onClick=" var search_for = document.getElementById('filter--author--text').value;
                      sff_vars.filter_names.filterAuthors(search_for);
            ">Filter Authors </button>          
                    
        <button id='clear--author--filter' disabled="true" 
            onClick=" document.getElementById('filter--author--text').value = '';
                      sff_vars.filter_names.stopFilteringAuthors();
                    "  >Clear Filter</button>         
                           
        <span  onclick=" sff_vars.graph_procs.loadAuthorNew('HELP_ALL');" class="info--circle" title="Show Help">
            <img src="${get_help}" class="control--symbols">
        </span>        
                           
        <span  onclick="sff_vars.graph_procs.graphSize('+');" class="info--circle"" title="Zoom In">
            <img src="${zoom_in}" class="control--symbols">
        </span>
                    
        <span  onclick="sff_vars.graph_procs.graphSize('-');" class="info--circle"" title="Zoom Out">
            <img src="${zoom_out}" class="control--symbols">
        </span>
    </div>





<div >
        <div id='stable-redraw-height'></div>
         <div id="${graph_div_id}"></div>
</div>





    <div style='clear:both'> 
        Filter story list by:
        <input id='filter--story--text' placeholder="Story filter" type='text'
          onkeypress =" storyEnterPress()  "
              oninput=" if (this.value.length>0){
                            document.getElementById('clear--story--filter').disabled = false;
                            document.getElementById('do--story--filter').disabled = false;
                        }else{
                            document.getElementById('clear--story--filter').disabled = true;
                            document.getElementById('do--story--filter').disabled = true;
                        }" />
        <button id='do--story--filter' disabled="true" 
            onClick=" var search_for = document.getElementById('filter--story--text').value;
                      sff_vars.filter_names.filterStories(search_for);
            ">Filter Stories </button>          
                    
        <button id='clear--story--filter' disabled="true" 
            onClick=" document.getElementById('filter--story--text').value = '';
                      sff_vars.filter_names.stopFilteringStories();
                    "  >Clear Filter</button>         
                           
        <span  onclick=" sff_vars.graph_procs.loadAuthorNew('HELP_ALL');" class="info--circle"" title="Show Help">
            <img  src="${get_help}" class="control--symbols">
        </span>        
                           
        <span  onclick="sff_vars.graph_procs.graphSize('+');" class="info--circle"" title="Zoom In">
            <img  src="${zoom_in}" class="control--symbols">
        </span>
                    
        <span  onclick="sff_vars.graph_procs.graphSize('-');" class="info--circle"" title="Zoom Out">
            <img  src="${zoom_out}" class="control--symbols">
        </span>
    </div>
     
     
     
     
<div style="text-align: center;    font-size: larger;"> Stories with online content</div>
         
         <div id="all--filter--books" style="height:600px; ">
         <div id='filter--books' style='display:none'>
              </div>
            <div id='all--books'>
                 ${book_links}
             </div>
         </div>

    
     
</div>
<script>
    document.getElementById('filter--story--text').value = '';
</script>
 `;
    return media_html;
}


module.exports = {widgetVars, widgetHtml} 
