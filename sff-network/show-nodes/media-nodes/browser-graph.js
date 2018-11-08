

var load_css_external = `


sff_vars.graph_procs = (function (graph_id, nodes_string, edges_string, graph_info,
                                    local_json_proxy, edge_options) {
    var my = {
        network_graph: {},
        last_selected_media: '',
        my_nodes: []
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
            groups: sff_vars.graph_vars.node_icons,
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
            sff_vars.filter_names.selectMedia(graph_info.under_title, 'yes_scroll')
        } else {
            sff_vars.filter_names.selectMedia(graph_info.strip_author, 'yes_scroll')
        }
    }


     my.addClickOnEvent = function() {
        var self =this;
        my.network_graph.on("click", function (params) {
            var node_id = params.nodes[0]
            var the_node = self.my_nodes.get(node_id)
                //console.log("the_node.node_type", the_node.node_type);
            if (the_node.node_type == 'L_BOOK') {
                my.loadBookNew(the_node.strip_1_author, the_node.under_title)
            } else if (the_node.node_type == 'L_AUTHOR') {
                my.loadAuthorNew(the_node.strip_author)
            } else if (the_node.node_type == 'L_PDF') {
                sff_vars.pdf_procs.loadPdf(the_node.goto_url, the_node.book_title, the_node.label, the_node.strip_1_author, the_node.under_title);
            } else if (the_node.node_type == 'L_PODCAST') {
                sff_vars.podcast_procs.loadPodcast(the_node.goto_url, the_node.podcast_url, the_node.under_title, the_node.strip_1_author, the_node.video_link);
            } else if (the_node.node_type == 'L_RSD') {
          
                sff_vars.rsd_procs.loadRsd(the_node.goto_url, the_node.rsd_description, the_node.label, the_node.rsd_pdf_link, the_node.video_link, the_node.under_title, the_node.strip_author); 
          
            } else if (the_node.node_type == 'L_POST') {   // L_AUTHOR_POST
                sff_vars.post_procs.loadPost(the_node.goto_url, the_node.strip_author, 'post');
             } else if (the_node.node_type == 'L_BOOK_POST') {
//                sff_vars.book_post_procs.loadBookPost(the_node.goto_url, the_node.strip_author, the_node.under_title);    
                sff_vars.book_post_procs.loadBookPost(the_node.goto_url, the_node.strip_author, the_node.under_title, 'post');    
            } else if (typeof the_node.goto_url !== 'undefined') {
                window.open(the_node.goto_url);
            }
        });
    }

    function addLoadNewGraph(graph_id) {
        my.network_graph.loadAuthorOrBook = function (absolute_json_url) {
          //  console.log(' absolute_json_url ===', absolute_json_url);
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
                    sff_vars.graph_procs.loadGraph(graph_id, fetch_nodes, fetch_edges, fetch_options.graph_physics);
                });
        };
    }
  

//http://localhost:5000/?author=philip_k_dick
    my.loadAuthorNew = function (strip_author) {
         //console.log('my.loadAuthorNew', strip_author)
        if (sff_vars.filter_names.selectMedia(strip_author, 'no_scroll')) {
            var author_json = sff_vars.history_state.pushAuthor(strip_author);
                                      
            my.network_graph.loadAuthorOrBook(author_json);
        }
    }

//http://localhost:5000/?book=beyond_lies_the_wub
    my.loadBookNew = function (strip_author, under_title) {
        var author_colons_title = strip_author + '::' + under_title;
        if (sff_vars.filter_names.selectMedia(author_colons_title, 'no_scroll')) {
              var  book_json=    sff_vars.history_state.pushBook(strip_author, under_title);
              // console.log('strip_author', strip_author)
              // console.log('under_title', under_title)
              // console.log('my.loadBookNew', book_json)
              my.network_graph.loadAuthorOrBook(book_json);
        }
    }
 

    my.doGraph = function(){
      my.startGraph(graph_id, nodes_string, edges_string, graph_info.physics);
    }
    
    return my;
}(sff_vars.graph_vars.graph_id,
    sff_vars.graph_vars.nodes_string,
    sff_vars.graph_vars.edges_string,
    sff_vars.graph_vars.graph_info,
    sff_vars.graph_vars.local_json_proxy,
    sff_vars.graph_vars.edge_options
)) 






`;




module.exports = load_css_external; 




