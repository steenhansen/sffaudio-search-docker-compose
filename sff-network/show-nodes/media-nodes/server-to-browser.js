
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show');
 var media_constants = rootAppRequire('sff-network/media-constants');

// build_widget
function widgetVars(graph_id, nodes_object, edges_object, graph_object) {

var icons_string = MediaShow.authorIconColors();

    if (nodes_object.length > 10) {
        graph_object.physics = false;
    } else {
        graph_object.physics = {"barnesHut": {"avoidOverlap": 1 }};
    }

    var nodes_string = JSON.stringify(nodes_object, null, ' ');
    var edges_string = JSON.stringify(edges_object, null, ' ');
    var graph_string = JSON.stringify(graph_object, null, ' ');

   var local_json_proxy= 'http://localhost:5000/json-proxies/thru-proxy';
    var edge_options_json= media_constants.EDGE_OPTIONS;
    
var edge_options = JSON.stringify(edge_options_json);

    var media_html = `
<script>
// server-to-browser
    sff_vars.graph_vars={  
        graph_id:"${graph_id}",
        nodes_string:${nodes_string},
        edges_string:${edges_string},
        graph_info:${graph_string},
        local_json_proxy:"${local_json_proxy}",
        edge_options:${edge_options},
        node_icons:${icons_string}  
}    

sff_vars.pdf_vars={  
        pdf_proxy_url:"http://localhost:5000/pdf-proxies/pdf-proxy?absolute_url=",
        canvas_id:'pdf--canvas',
        pdf_scale: 1.5 
}    

// delete me q*bert
sff_vars.post_vars={  
        post_proxy:"http://localhost:5000/post-proxy?absolute_url="
}    


</script> `;
    return media_html;
}









function widgetHtml(graph_div_id, author_links, book_links) {

    var media_html = `
    <div id="my--network">
    <div>
    
         <div id="all--filter--authors" style="height:600px; ">
         <div id='filter--authors' style='display:none'>
              </div>
              
            <div id='all--authors'>
                ${author_links}
            </div>
             
        </div>
  
        <div id="${graph_div_id}">
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
 `;
    return media_html;
}

module.exports = {widgetVars, widgetHtml} 
