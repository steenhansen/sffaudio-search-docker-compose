// browser-graph start
sff_js_vars.graph_procs = (function (graph_id, nodes_string, edges_string, graph_info, edge_options) {
    var my = {
        network_graph: {},
        last_selected_media: '',
        my_nodes: [],
        my_edges: []
    };

    my.addOnZoomEvents = function () {
        var self = this;
        my.network_graph.on("zoom", function (params) {
            if (params.direction === '+') {
                if (params.scale > sff_constants.MAX_ZOOM) {
                    my.network_graph.moveTo({scale: sff_constants.MAX_ZOOM});
                }

            } else {
                if (params.scale < sff_constants.MIN_ZOOM) {
                    my.network_graph.moveTo({scale: sff_constants.MIN_ZOOM});
                }
            }
        });
    }

    my.graphSize = function (movement_dir) {
        var current_scale = my.network_graph.getScale();
        if (movement_dir === '+') {
            if (current_scale <= sff_constants.MAX_ZOOM) {
                current_scale += sff_constants.ZOOM_STEP;
            }
        } else {
            if (current_scale >= sff_constants.MIN_ZOOM) {
                current_scale -= sff_constants.ZOOM_STEP;
            }
        }
        my.network_graph.moveTo({scale: current_scale});
    }

    my.fitCanvas = function () {
        my.network_graph.fit();
    }

    my.loadGraph = function (graph_id, nodes_array, edges_array, graph_physics, php_search_term) {
        if (php_search_term !== '') {
            nodes_array = [];
            edges_array = [];
        }
        var container_elem = document.getElementById(graph_id);
        this.my_nodes = new vis.DataSet(nodes_array);
        this.my_edges = new vis.DataSet(edges_array);
        var graph_data = {
            nodes: this.my_nodes,
            edges: this.my_edges
        };
        var graph_options = {
            groups: sff_js_vars.graph_vars.node_icons,
            physics: graph_physics,
        };
        my.network_graph = new vis.Network(container_elem, graph_data, graph_options);
        my.network_graph.setOptions(edge_options);
        injectLoadNew(graph_id);
        if (php_search_term !== '') {
            document.getElementById('filter--author--text').value = php_search_term;
            sff_js_vars.vars_events.executeSearch(php_search_term);
            sff_js_vars.vars_events.filterResetButton();
            sff_js_vars.vars_events.inputSearch();
            sff_js_vars.vars_events.wordPressSearch(php_search_term);
        }
    };

    function injectLoadNew(graph_id) {
        my.addClickOnEvent();
        my.addHoverOnEvents();
        my.addOnZoomEvents();
        addLoadNewGraph(graph_id);
    };

    my.startGraph = function (graph_id, nodes_string, edges_string, graph_physics, php_search_term) {
        my.loadGraph(graph_id, nodes_string, edges_string, graph_info.graph_physics, php_search_term);
        if (php_search_term === '') {
            if (graph_info.graph_type == sff_constants.BOOK_PAGE_TYPE) {
                var author_colons_title = graph_info.strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + graph_info.under_title;
                sff_js_vars.filter_names.selectMedia(author_colons_title, 'BOOK-CHOICE')
            } else {
                sff_js_vars.filter_names.selectMedia(graph_info.strip_author, 'AUTHOR-CHOICE')
            }
        }
    }

    my.changeGroupIcon = function (node_id, group_icon) {
        this.my_nodes.update({id: node_id, group: group_icon});
    }

    my.addHoverOnEvents = function () {
        var self = this;
        my.network_graph.on("hoverNode", function (params) {
            var the_node = self.my_nodes.get(params.node);
            if (the_node.node_type) {
                var node_type = the_node.node_type;
                if (node_type.indexOf('HELP_') === 0) {
                    var hover_name = node_type.substring(5);
                } else {
                    var hover_name = node_type.substring(2);
                    if (node_type == 'L_BOOK') {
                        if (sff_js_vars.graph_vars.graph_info.graph_type === sff_constants.BOOK_PAGE_TYPE) {
                            return
                        }
                    } else if (node_type == 'L_AUTHOR') {
                        if (sff_js_vars.graph_vars.graph_info.graph_type === sff_constants.AUTHOR_PAGE_TYPE) {
                            return
                        }
                    }
                }
                var hover_group = 'H_' + hover_name;
                self.my_nodes.update({id: the_node.id, group: hover_group});
                my.network_graph.canvas.body.container.style.cursor = 'pointer';
            }
        });

        my.network_graph.on("blurNode", function (params) {
            var the_node = self.my_nodes.get(params.node);
            if (the_node.node_type) {
                var node_type = the_node.node_type;
                if (node_type.indexOf('HELP_') === 0) {
                    var hover_name = node_type.substring(5);
                } else {
                    var hover_name = node_type.substring(2);
                }
                var node_group = 'N_' + hover_name;
                self.my_nodes.update({id: the_node.id, group: node_group});
                my.network_graph.canvas.body.container.style.cursor = 'default';
            }
        });
    }

    my.addClickOnEvent = function () {
        var self = this;
        my.network_graph.on("click", function (params) {
            if (params.nodes.length > 0) {
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
                var pdf_country = the_node.pdf_country;
                var sorted_choice = the_node.sorted_choice
                if (node_type.indexOf('HELP_') === 0) {
                    sff_js_vars.graph_procs.loadAuthorNew(the_node.node_type)
                } else if (node_type == 'L_BOOK') {
                    if (sff_js_vars.graph_vars.graph_info.graph_type !== sff_constants.BOOK_PAGE_TYPE) {
                        my.loadBookNew(last_first_underscores, under_title)
                    }
                } else if (node_type == 'L_AUTHOR') {
                    if (sff_js_vars.graph_vars.graph_info.graph_type !== sff_constants.AUTHOR_PAGE_TYPE) {
                        my.loadAuthorNew(strip_author)
                    }
                } else if (node_type == 'L_PDF') {
                    sff_js_vars.pdf_procs.historyPdf(goto_url, book_title, label, last_first_underscores, under_title, 'pdf', sorted_choice, pdf_country);
                } else if (node_type == 'L_PODCAST') {
                    sff_js_vars.podcast_procs.historyPodcast(goto_url, podcast_url, under_title, last_first_underscores, 'podcast', sorted_choice);
                } else if (node_type == 'L_RSD') {
                    sff_js_vars.rsd_procs.historyRsd(goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores, 'rsd', sorted_choice);
                } else if (node_type == 'L_RSD_VIDEO') {
                    sff_js_vars.rsd_procs.historyRsd(goto_url, rsd_description, label, rsd_pdf_link, video_link, under_title, last_first_underscores, 'rsd', sorted_choice);
                } else if (node_type == 'L_AUTHOR_POST') {

                    sff_js_vars.author_post_procs.historyAuthorPost(goto_url, strip_author, 'post_author', sorted_choice);
                } else if (node_type == 'L_BOOK_POST') {
                    sff_js_vars.book_post_procs.historyBookPost(goto_url, last_first_underscores, under_title, 'post_book', sorted_choice);
                } else if (typeof goto_url !== 'undefined') {
                    window.location = goto_url;
                }
            }
        });
    }

    function addLoadNewGraph(graph_id) {
        my.network_graph.loadAuthorOrBook = function (absolute_json_url) {
            sff_js_vars.helpers.fetchTimeout(absolute_json_url, sff_constants.FETCH_WAIT_M_SEC, sff_constants._RETRYS)
                .then(function (response) {
                    return response.json();
                })
                .then(function (my_json) {
                    if (my.network_graph !== null) {
                        my.network_graph.destroy();
                        my.network_graph = null;
                    }
                    var ajax_nodes = JSON.parse(my_json.nodes_string)
                    sff_js_vars.graph_vars.nodes_string = ajax_nodes;
                    if (ajax_nodes[0]) {
                        if (ajax_nodes[0].label == sff_constants.UNRESPONSIVE_DB_NAME) {
                            ajax_nodes[0].group = 'N_DB_DOWN';
                            ajax_nodes[0].node_type = 'L_DB_DOWN';
                            ajax_nodes[0].label = 'Wait a minute, updating database.';
                            ajax_nodes[0].title = 'Refresh in a minute.';
                        }
                    }

                    var ajax_edges = JSON.parse(my_json.edges_string);
                    var ajax_options = JSON.parse(my_json.graph_string);
                    if (ajax_options.strip_author.indexOf('HELP_') >= 0) {
                        ajax_nodes = sff_js_vars.help_nodes[ajax_options.strip_author];
                        ajax_edges = sff_js_vars.HELP_ALL_EDGES;
                    }
                    var no_php_search = '';
                    sff_js_vars.graph_procs.loadGraph(graph_id, ajax_nodes, ajax_edges, ajax_options.graph_physics, no_php_search);
                    sff_js_vars.graph_vars.graph_info.graph_type = ajax_options.graph_type;
                });
        };
    }

    my.loadAuthorNew = function (strip_author) {
        if (sff_js_vars.filter_names.selectMedia(strip_author, 'AUTHOR-CHOICE')) {
            var author_json = sff_js_vars.history_state.pushAuthor(strip_author);
            sff_js_vars.filter_names.colorAuthors();
            my.network_graph.loadAuthorOrBook(author_json);
        }
    }

    my.loadBookNew = function (strip_author, under_title) {
        var author_colons_title = strip_author + sff_constants.AUTHOR_BOOK_SEPARATOR + under_title;
        if (sff_js_vars.filter_names.selectMedia(author_colons_title, 'BOOK-CHOICE')) {
            var book_json = sff_js_vars.history_state.pushBook(strip_author, under_title);
            sff_js_vars.filter_names.colorBooks();
            my.network_graph.loadAuthorOrBook(book_json);
        }
    }

    my.doGraph = function (php_search_term) {
        my.startGraph(graph_id, nodes_string, edges_string, graph_info.graph_physics, php_search_term);
    }

    return my;

}(sff_js_vars.graph_vars.graph_id,
    sff_js_vars.graph_vars.nodes_string,
    sff_js_vars.graph_vars.edges_string,
    sff_js_vars.graph_vars.graph_info,
    sff_js_vars.graph_vars.edge_options
))


window.l__a = sff_js_vars.graph_procs.loadAuthorNew;     // load-author
window.v__a = sff_js_vars.helpers.setVisible;            // visible-author
window.h__a = sff_js_vars.helpers.setHidden;             // hide-author

window.l__b = sff_js_vars.graph_procs.loadBookNew;        // load-book
window.f__b = sff_js_vars.helpers.focusBook;        // focus-book
window.b__b = sff_js_vars.helpers.blurBook;        // blur-book

// browser-graph end
