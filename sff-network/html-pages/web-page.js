var the_widget = rootAppRequire('sff-network/html-pages/jsloader-css')

//about:blank
//  http://www.sffaudio.com/podcasts/rsd141TheSmell.mp3
module.exports = function build_page(nodes_object, edges_object, graph_object, req_query_view) {
    return the_widget(nodes_object, edges_object, graph_object, req_query_view)
        .then(widget_html=> {
                return `

111


 ${widget_html}




222
${req_query_view}

333
  
`;
            }
        )


}

