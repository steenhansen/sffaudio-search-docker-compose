HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon')
MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

const {AUTHOR_PAGE_TYPE} = rootAppRequire('sff-network/graph-constants');
var misc_helper = rootAppRequire('sff-network/misc-helper');
module.exports = function (data_repository) {

    var BookData = rootAppRequire('sff-network/show-nodes/media-types/book-show')(data_repository)  // show_repository
    var PostData = rootAppRequire('sff-network/show-nodes/media-types/author-post-show')(data_repository)  // show_repository

    class AuthorData extends HoverIcon {



        constructor(node_id, db_version, author_name, strip_author) {
            const sorted_label = misc_helper.theLastNameFirst(author_name, ' ');
            super(node_id, db_version, author_name, sorted_label);
            this.strip_author = strip_author;
            this.node_type = 'L_AUTHOR';
              this.title = "Click for author's stories & posts";
            //  this.size=25;
        }

        static sendAuthor(strip_author, ParseNeo, update_index) {
            return data_repository.getAuthorNodes(strip_author, update_index)
                .then(function (graph_collection) {
                    var db_version_index = graph_collection[0].records[0]._fieldLookup['v_db_version']
                    var db_version = graph_collection[0].records[0]._fields[db_version_index];
                    var parse_neo = new ParseNeo(graph_collection, 'author');
                    var nodes_object = parse_neo.getAuthorGraph(strip_author);
                    var number_columns = HoverIcon.numberColumns(nodes_object);
                    var post_edges = parse_neo.edgesAuthorPost(number_columns, 'L_AUTHOR_POST');
                    var book_edges = parse_neo.edgesAuthorBook(number_columns, 'L_BOOK');
                    var wiki_author_edges = parse_neo.edgesAuthorWiki(number_columns, 'L_AUTHOR_WIKI');
                    var edges_object = book_edges.concat(post_edges, wiki_author_edges)
                    var graph_info = {graph_type: AUTHOR_PAGE_TYPE, strip_author: strip_author, db_version: db_version};
                    var nodes_and_edges = {graph_collection, nodes_object, edges_object, graph_info};   /// graph_collection for tests
                    return nodes_and_edges;
                })
        }

        static authorJson(strip_author, nodes_and_edges) {
            let {nodes_object, edges_object} =nodes_and_edges
            if (nodes_object.length > 10) {
                var graph_physics = false;
            } else {
                var graph_physics = {"barnesHut": {"avoidOverlap": 1}};
            }
            var graph_info = {strip_author: strip_author, graph_type: AUTHOR_PAGE_TYPE, graph_physics: graph_physics};
            var author_json = {nodes_object, edges_object, graph_info}
            return author_json;
        }

      





        setSizesColor(page_type) {
            super.setSizesColor(page_type, 'L_AUTHOR')
        }


        setGroupColor() {
            super.setGroupColor()
        }

        setPosition2(x_y_pos) {     //L_AUTHOR
            super.setPosition2(x_y_pos)
        }

        setAuthorPos(x_y_pos) {
            super.setPosition2(x_y_pos)
        }


// showAuthor
        static  setUpAuthor2(strip_author, sorted_nodes, div_height, div_width) {      // author_data
            var middle_height = div_height / 2;
            var middle_width = div_width / 2;

            var number_columns = HoverIcon.numberColumns(sorted_nodes);
            sorted_nodes = BookData.bookPositions2(sorted_nodes, middle_height, number_columns);
            sorted_nodes = PostData.postPositions2(sorted_nodes, middle_height, number_columns);
            var positioned_nodes = []
            var hor_space = 300
            var author_pos = {x: middle_width, y: middle_height};
            var author_wiki_pos = {x: middle_width - hor_space, y: middle_height};
            var sorted_labels = Object.keys(sorted_nodes)
            for (let sorted_label of sorted_labels) {
                var a_node = sorted_nodes[sorted_label];
                a_node.setGroupColor();
                a_node.bookUrl(strip_author);
                a_node.setAuthorPos(author_pos);
                a_node.setAuthorWikiPos(author_wiki_pos);
                var node_type = varType(a_node);
                a_node.setSizesColor('L_AUTHOR');
                var positioned_node = Object.assign({}, a_node);
                positioned_nodes.push(positioned_node);
            }
            return positioned_nodes;
        }


    }
    return AuthorData;

}



