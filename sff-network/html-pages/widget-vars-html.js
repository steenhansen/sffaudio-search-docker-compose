
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show');
 var media_constants = rootAppRequire('sff-network/media-constants');

// build_widget
function widgetVars(graph_id, nodes_object, edges_object, graph_object) {

var icons_string = MediaShow.authorIconColors();

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

    var edge_options_json= media_constants.EDGE_OPTIONS;
    
var edge_options = JSON.stringify(edge_options_json);

var post_proxy_absolute = media_constants.ROUTE_POST_PROXY + "?absolute_url=";

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










function widgetHtmlOld(graph_div_id, author_links, book_links) {

    var media_html = `

    <div id="my--network">
      
    
         <div id="all--filter--authors" style="height:600px; ">
         <div id='filter--authors' style='display:none'>
              </div>
            <div id='all--authors'>
                ${author_links}
            </div>
        </div>

  
        <div id="${graph_div_id}">
         </div>


    <div style='clear:both'> 
        <button id='clear--filter' onClick='sff_vars.filter_names.stopFiltering()'>Clear Filter</button>
        <input id='filter--text' type='text' onChange='sff_vars.filter_names.filterMedia(this)' />
     </div>

         
         <div id="all--filter--books" style="height:600px; ">
         <div id='filter--books' style='display:none'>
              </div>
            <div id='all--books'>
                 ${book_links}
             </div>
         </div>

    
     
</div>
 `;
    return media_html;
}



function widgetHtml(graph_div_id, author_links, book_links) {

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
      
    
         <div id="all--filter--authors" style="">
         <div id='filter--authors' style='display:none'>
              </div>
            <div id='all--authors'>
                ${author_links}
            </div>
        </div>

         <div id="${graph_div_id}">
         </div>

    <div style='clear:both'> 
        <button id='clear--filter' onClick='sff_vars.filter_names.stopFiltering()'>Clear Filter</button>
        <input id='filter--text' type='text' onChange='sff_vars.filter_names.filterMedia(this)' />
     </div>

         
         <div id="all--filter--books" style="height:600px; ">
         <div id='filter--books' style='display:none'>
              </div>
            <div id='all--books'>
                 ${book_links}
             </div>
         </div>

    
     
</div>
 `;
    return media_html;
}


module.exports = {widgetVars, widgetHtml} 
