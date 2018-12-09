
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

          

sff_vars.help_nodes= {
"_HELP_" : [
            {"id": 900,
                "group":"I_HELP", 
                "font": {"size": 32,
                    "color": "red" },
                "label":"Click for Help" },
            
             {"id": 901,
                "group":"L_AUTHOR", 
                  "node_type":"HELP_AUTHOR",
                "font": {"size": 16,
                    "color": "red" }},
            
            
                   {"id": 902,
                "group":"L_BOOK", 
                   "node_type":"HELP_BOOK",
                "font": {"size": 16,
                    "color": "red" }},
            
                          {"id": 903,
                "group":"L_PDF", 
                    "node_type":"HELP_PDF",
                "font": {"size": 16,
                    "color": "red" }},
                
                  {"id": 904,
                "group":"L_AUTHOR_POST", 
                    "node_type":"HELP_AUTHOR_POST",
                "font": {"size": 16,
                    "color": "red" }},
                
                  {"id": 905,
                "group":"L_RSD", 
                "node_type":"HELP_RSD",
                "font": {"size": 16,
                    "color": "red" }},
                
                  {"id": 906,
                "group":"L_PODCAST", 
                  "node_type":"HELP_PODCAST",
                "font": {"size": 16,
                    "color": "red" }},
                
                                
                  {"id": 907,
                "group":"L_BOOK_WIKI", 
                   "node_type":"HELP_BOOK_WIKI",
                "font": {"size": 16,
                    "color": "red" }},
                
                     {"id": 908,
                "group":"I_GROW", 
                 "node_type":"HELP_GROW",
                "font": {"size": 16,
                    "color": "red" }},         

                
                  {"id": 909,
                "group":"I_FILTER", 
                "node_type":"HELP_FILTER",
                "font": {"size": 16,
                    "color": "red" }},

    

                  {"id": 910,
                "group":"I_SHRINK",
                   "node_type":"HELP_SHRINK" ,
                "font": {"size": 16,
                    "color": "red" }},
                
            ],
            
            
"HELP_SHRINK":[ {"id": 910,
                "group":"I_SHRINK",
                   "node_type":"HELP_SHRINK" ,
                "font": {"size": 16, "color": "red" },
                     "label":"Shrink graph, same as\\nusing the mouse scroll wheel",
                    
                    
                    },]    ,
                    
    "HELP_FILTER":[ {"id": 909,
                "group":"I_FILTER",
                   "node_type":"HELP_FILTER" ,
                "font": {"size": 16, "color": "red" },
                     "label":"Filter authors & books."     + "\\n" +
                            "Entering 'moore' will result"  + "\\n" +
                            "authors named 'moore' and"    + "\\n" +
                            "stories written by someone"  + "\\n" +
                            "named 'moore' being shown."
                    
                    
                    },]                    
                            
            
            };



sff_vars.help_edges= [
              {"from": 900,"to": 901 },
              {"from": 900,"to": 902 },
              {"from": 900,"to": 903 },
              {"from": 900,"to": 904 },
              {"from": 900,"to": 905 },
              {"from": 900,"to": 906 },
              {"from": 900,"to": 907 },
              {"from": 900,"to": 908 },
              {"from": 900,"to": 909 },
              {"from": 900,"to": 910 },
              ];



</script> `;
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
        <button id='clear--filter' onClick="
            document.getElementById('filter--text').value = '';
        sff_vars.filter_names.stopFiltering();" disabled="true">Clear Filter</button>
        <input id='filter--text'
            placeholder="Filter authors & stories"
         type='text'
          oninput=" if (this.value.length>0){
                        document.getElementById('clear--filter').disabled = false;
                    }else{
                        document.getElementById('clear--filter').disabled = true;
                    }
                    sff_vars.filter_names.filterMedia(this); "/>
                    
                    
                     <button id='shrink--filter' onClick=" sff_vars.graph_procs.graphSize('-'); ">-</button>   
                     <button id='grow--filter' onClick=" sff_vars.graph_procs.graphSize('+'); ">+</button>   
                    
            <button id='help--filter' onClick=" sff_vars.graph_procs.loadAuthorNew('_HELP_'); ">Help</button>        
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
