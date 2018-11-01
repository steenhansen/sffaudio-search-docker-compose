module.exports =  function (node_server) {

var load_css_external = `


window.sff_graph_procs = (function (graph_id, nodes_string, edges_string, graph_info,
                                    local_json_proxy, edge_options) {
    var my = {
        network_graph: {},
        last_selected_media: '',
        my_nodes: [],
         node_server: '${node_server}'           // not used
    };

    my.loadGraph = function (graph_id, nodes_string, edges_string, graph_physics) {
       var container = document.getElementById(graph_id);
        this.my_nodes = new vis.DataSet(nodes_string); 
        var edges = new vis.DataSet(edges_string);
        var data = {
            nodes: this.my_nodes ,
            edges: edges
        };
        var options = {
            groups: sff_graph_vars.node_icons,
            physics: graph_physics,
        };
        my.network_graph = new vis.Network(container, data, options);
         my.network_graph.setOptions(edge_options);
       
        injectLoadNew(graph_id);
    };

    function injectLoadNew(graph_id) {
        my.addClickOnEvent();
        addLoadNewGraph(graph_id);
    };

    my.startGraph = function (graph_id, nodes_string, edges_string, graph_physics) {
        my.loadGraph(graph_id, nodes_string, edges_string, graph_info.physics);

        if (graph_info.graph_type == 'book_page') {
            sff_filter_names.selectMedia(graph_info.under_title, 'yes_scroll')
        } else {
            sff_filter_names.selectMedia(graph_info.strip_author, 'yes_scroll')
        }
    }


     my.addClickOnEvent = function() {
        var self =this;
        my.network_graph.on("click", function (params) {
            var node_id = params.nodes[0]
            var the_node = self.my_nodes.get(node_id)
            if (the_node.node_type == 'L_BOOK') {
                my.loadBookNew(the_node.strip_1_author, the_node.under_title)
            } else if (the_node.node_type == 'L_AUTHOR') {
                my.loadAuthorNew(the_node.strip_author)
            } else if (the_node.node_type == 'L_PDF') {
                sff_pdf_procs.loadPdf(the_node.goto_url, the_node.book_title, the_node.label, the_node.strip_1_author, the_node.under_title);
            } else if (the_node.node_type == 'L_PODCAST') {
            //console.log('asd231232 L_PODCAST', the_node);
                sff_podcast_procs.loadPodcast(the_node.goto_url, the_node.podcast_url, the_node.under_title, the_node.strip_1_author);
            } else if (the_node.node_type == 'L_RSD') {
                sff_rsd_procs.loadRsd(the_node.goto_url, the_node.rsd_description, the_node.label, the_node.rsd_pdf_link); 
            } else if (the_node.node_type == 'L_POST') {
                //console.log('dfasdflhjklhsdf post node', the_node);
                sff_post_procs.loadPost(the_node.goto_url, the_node.strip_author);
                
             } else if (the_node.node_type == 'L_BOOK_POST') {
                //console.log('L_BOOK_POST', the_node);
                sff_book_post_procs.loadBookPost(the_node.goto_url, the_node.strip_author, the_node.under_title);    
                
            } else if (typeof the_node.goto_url !== 'undefined') {
                window.open(the_node.goto_url);
            }
        });
    }

    function addLoadNewGraph(graph_id) {
        my.network_graph.loadNew = function (absolute_json_url) {
            fetch(absolute_json_url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    if (my.network_graph !== null) {
                        my.network_graph.destroy();
                        my.network_graph = null;
                    }
                    
                    var fetch_nodes = JSON.parse(myJson.nodes_string)
                    var fetch_edges = JSON.parse(myJson.edges_string);
                    var fetch_options = JSON.parse(myJson.graph_string)
                    sff_graph_procs.loadGraph(graph_id, fetch_nodes, fetch_edges, fetch_options.graph_physics);
                });
        };
    }
  

//http://localhost:5000/?author=philip_k_dick
    my.loadAuthorNew = function (strip_author) {
   // console.log('xxxxxxxxxxxxxx', strip_author)
        if (sff_filter_names.selectMedia(strip_author, 'no_scroll')) {
            var author_json = sff_history_state.pushAuthor(strip_author);
            my.network_graph.loadNew(author_json);
        }
    }

//http://localhost:5000/?book=beyond_lies_the_wub
    my.loadBookNew = function (strip_author, under_title) {
        var author_colons_title = strip_author + '::' + under_title;
        if (sff_filter_names.selectMedia(author_colons_title, 'no_scroll')) {
              var  book_json=    sff_history_state.pushBook(strip_author, under_title);
              my.network_graph.loadNew(book_json);
        }
    }
 

    my.doGraph = function(){
      my.startGraph(graph_id, nodes_string, edges_string, graph_info.physics);
    }
    
    return my;
}(sff_graph_vars.graph_id,
    sff_graph_vars.nodes_string,
    sff_graph_vars.edges_string,
    sff_graph_vars.graph_info,
    sff_graph_vars.local_json_proxy,
    sff_graph_vars.edge_options
)) 






`;
return load_css_external;

}






