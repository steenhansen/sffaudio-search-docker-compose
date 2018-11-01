
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show');
 var media_constants = rootAppRequire('sff-network/media-constants');

// build_widget
function media_widget(graph_id, nodes_object, edges_object, graph_object) {

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
    window.sff_graph_vars={  
        graph_id:"${graph_id}",
        nodes_string:${nodes_string},
        edges_string:${edges_string},
        graph_info:${graph_string},
        local_json_proxy:"${local_json_proxy}",
        edge_options:${edge_options},
        node_icons:${icons_string}  
}    

window.sff_pdf_vars={  
        pdf_proxy_url:"http://localhost:5000/pdf-proxies/pdf-proxy?absolute_url=",
        canvas_id:'pdf--canvas',
        pdf_scale: 1.5 
}    

window.sff_post_vars={  
        post_proxy:"http://localhost:5000/post-proxy?absolute_url="
}    


</script> `;
    return media_html;
}

module.exports = media_widget 
