var the_widget = rootAppRequire('sff-network/html-pages/jsloader-css')

//about:blank
//  http://www.sffaudio.com/podcasts/rsd141TheSmell.mp3
module.exports = function build_page(nodes_object, edges_object, graph_object, req_query_view, nodes_and_edges_str) {
    return the_widget(nodes_object, edges_object, graph_object, req_query_view,nodes_and_edges_str)
        .then(widget_html=> {
                return `

<!-- start widget -->


 ${widget_html}

<!-- end widget -->


<!-- start req_query_view -->
${req_query_view}
<!-- end req_query_view -->
  
`;
            }
        )


}

