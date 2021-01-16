// random-quality start
sff_js_vars.strip_author = sff_constants.STRIP_AUTHOR;
sff_js_vars.default_authors = sff_constants.NODES_AND_EDGES_STR;
if (sff_js_vars.helpers.objectIsEmpty(sff_js_vars.graph_vars.nodes_string)) {
    if (sff_js_vars.strip_author === '') {
        var rand_index = Math.floor((Math.random() * sff_js_vars.default_authors.length));
        sff_js_vars.graph_vars.nodes_string = sff_js_vars.default_authors[rand_index].nodes_object;
        sff_js_vars.graph_vars.edges_string = sff_js_vars.default_authors[rand_index].edges_object;
        sff_js_vars.graph_vars.graph_info = sff_js_vars.default_authors[rand_index].graph_info;
        var strip_author = sff_js_vars.default_authors[rand_index].graph_info.strip_author;
        sff_js_vars.strip_author = strip_author;
    } else {
        var graph_type = sff_js_vars.graph_vars.graph_info.graph_type;
        if (graph_type === sff_constants.AUTHOR_PAGE_TYPE) {
            if (sff_js_vars.strip_author.indexOf('HELP_') >= 0) {
                sff_js_vars.graph_vars.edges_string = sff_js_vars.HELP_ALL_EDGES;
                sff_js_vars.graph_vars.nodes_string = sff_js_vars.help_nodes[sff_js_vars.strip_author];
            } else {
                sff_js_vars.graph_vars.nodes_string = sff_js_vars.NO_SUCH_AUTHOR;
            }
        } else {
            sff_js_vars.graph_vars.nodes_string = sff_js_vars.NO_SUCH_BOOK
        }
    }
}

// random-quality end
    
    
