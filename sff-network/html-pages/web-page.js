var the_widget = rootAppRequire('sff-network/html-pages/jsloader-css')

//about:blank
//  http://www.sffaudio.com/podcasts/rsd141TheSmell.mp3
module.exports = function build_page(nodes_object, edges_object, graph_object, node_server) {

    return the_widget(nodes_object, edges_object, graph_object, node_server)
        .then(widget_html=> {
                return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  
</head>
<body >



 ${widget_html}





  
  </body>
</html>`;
            }
        )


}

