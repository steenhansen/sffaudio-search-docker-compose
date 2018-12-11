
let {BOOK_PAGE_TYPE} = rootAppRequire('sff-network/graph-constants');

var load_css_external = `
// browser-graph
sff_vars.graph_procs = (function (graph_id, nodes_string, edges_string, graph_info, edge_options) {
    var my = {
        network_graph: {},
        last_selected_media: '',
        my_nodes: []
    };

my.graphSize=function(movement_dir){
var current_scale =  my.network_graph.getScale();

if (movement_dir==='+'){
   if (current_scale<99){
    current_scale += 0.1;
    }
}else{
    if (current_scale>0.1){
        current_scale -= 0.1;
    }

}

 my.network_graph.moveTo( {scale:current_scale});

}


    my.loadGraph = function (graph_id, nodes_string, edges_string, graph_physics) {
        var container = document.getElementById(graph_id);
        this.my_nodes = new vis.DataSet(nodes_string);
        var edges = new vis.DataSet(edges_string);
        var data = {
            nodes: this.my_nodes,
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
        my.loadGraph(graph_id, nodes_string, edges_string, graph_info.graph_physics);
        if (graph_info.graph_type == '${BOOK_PAGE_TYPE}') {
            sff_vars.filter_names.selectMedia(graph_info.under_title, 'yes_scroll')
        } else {
            sff_vars.filter_names.selectMedia(graph_info.strip_author, 'yes_scroll')
        }
    }

    my.addClickOnEvent = function () {
        var self = this;
        my.network_graph.on("click", function (params) {
            if (params.nodes.length>0){
                    var node_id = params.nodes[0]
                    var the_node = self.my_nodes.get(node_id)
                    var node_type = the_node.node_type;
                    var goto_url = the_node.goto_url;
                    var rsd_description = the_node.rsd_description;
                    var label = the_node.label;
                    var rsd_pdf_link = the_node.rsd_pdf_link;
                    var video_link = the_node.video_link;
                    var under_title = the_node.under_title;
                    var strip_author = the_node.strip_author;
                    var book_title = the_node.book_title;
                    var last_first_underscores = the_node.last_first_underscores;
                    var podcast_url = the_node.podcast_url;
                    var pdf_country = the_node.pdf_country;   // Canada
                    if (node_type.indexOf('HELP_')>=0) {
                        sff_vars.graph_procs.loadAuthorNew(the_node.node_type)
                    } else if (node_type == 'L_BOOK') {
                        my.loadBookNew(last_first_underscores, under_title)
                    } else if (node_type == 'L_AUTHOR') {
                        my.loadAuthorNew(strip_author)
                    } else if (node_type == 'L_PDF') {
                        sff_vars.pdf_procs.loadPdf(goto_url, book_title, label, last_first_underscores, under_title, 'pdf');
                    } else if (node_type == 'L_PODCAST') {
                        sff_vars.podcast_procs.loadPodcast(goto_url, podcast_url, under_title, last_first_underscores, 'podcast');
                    } else if (node_type == 'L_RSD') {
                        sff_vars.rsd_procs.loadRsd(goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores, 'rsd');
                    } else if (node_type == 'L_AUTHOR_POST') {  
                        sff_vars.post_procs.loadPost(goto_url, strip_author, 'post');
                    } else if (node_type == 'L_BOOK_POST') {
                        sff_vars.book_post_procs.loadBookPost(goto_url, strip_author, under_title, 'post');
                    } else if (typeof goto_url !== 'undefined') {
                        window.location = goto_url;
                    }
            }
        });
    }

    function addLoadNewGraph(graph_id) {
        my.network_graph.loadAuthorOrBook = function (absolute_json_url) {
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
                    var fetch_options = JSON.parse(myJson.graph_string);
                    if (fetch_options.strip_author.indexOf('HELP_')>=0) {     
                        fetch_nodes =  sff_vars.help_nodes[fetch_options.strip_author]; 
                        fetch_edges= sff_vars.HELP_ALL_EDGES ;  
                    }                    
                    sff_vars.graph_procs.loadGraph(graph_id, fetch_nodes, fetch_edges, fetch_options.graph_physics);
                });
        };
    }

//http://localhost:5000/?author=philip_k_dick
    my.loadAuthorNew = function (strip_author) {
        if (sff_vars.filter_names.selectMedia(strip_author, 'no_scroll')) {
            var author_json = sff_vars.history_state.pushAuthor(strip_author);

            my.network_graph.loadAuthorOrBook(author_json);
        }
    }

//http://localhost:5000/?book=beyond_lies_the_wub
    my.loadBookNew = function (strip_author, under_title) {
        var author_colons_title = strip_author + '::' + under_title;
        if (sff_vars.filter_names.selectMedia(author_colons_title, 'no_scroll')) {
            var book_json = sff_vars.history_state.pushBook(strip_author, under_title);
            my.network_graph.loadAuthorOrBook(book_json);
        }
    }

    my.doGraph = function () {
        my.startGraph(graph_id, nodes_string, edges_string, graph_info.graph_physics);
    }

    return my;
    
}(sff_vars.graph_vars.graph_id,
    sff_vars.graph_vars.nodes_string,
    sff_vars.graph_vars.edges_string,
    sff_vars.graph_vars.graph_info,
    sff_vars.graph_vars.edge_options
))

// browser-graph end

`;




module.exports = load_css_external; 




