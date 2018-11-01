MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

var media_constants = rootAppRequire('sff-network/media-constants');
var misc_helper = rootAppRequire('sff-network/misc-helper');
module.exports = function (data_repository) {

   var BookData = rootAppRequire('sff-network/show-nodes/media-types/book-show')(data_repository)
   var PostData = rootAppRequire('sff-network/show-nodes/media-types/post-show')(data_repository)

     class AuthorData extends MediaShow {

        static randomGoodAuthor() {
            var rand_index = Math.floor((Math.random() * media_constants.QUALITY_AUTHORS.length));
            var random_author = media_constants.QUALITY_AUTHORS[rand_index];
            return random_author;
        }


        constructor(node_id, db_version, author_name, strip_author) {
            const sorted_label = misc_helper.theLastNameFirst(author_name, ' ');
            super(node_id, db_version, author_name, sorted_label);
            this.strip_author = strip_author;
            this.node_type = 'L_AUTHOR';
        }

        getAuthorNodes(strip_author) {
            return data_repository.getAuthorNodes(strip_author);
        }


        setSizesColor(page_type) {
            super.setSizesColor(page_type, 'L_AUTHOR')
        }


        setGroupColor(color_index) {
            super.setGroupColor(color_index)
        }

        setPosition2(x_y_pos) {     //L_AUTHOR
            super.setPosition2(x_y_pos)
        }

        setAuthorPos(x_y_pos){
          super.setPosition2(x_y_pos)
        }


        static sendAuthor(strip_author, ParseNeo) {
            return data_repository.getAuthorNodes(strip_author)
                .then(function (graph_collection) {
                    var parse_neo = new ParseNeo(graph_collection, 'author');
                    
                       
                       
                    var nodes_object = parse_neo.getAuthorGraph(strip_author);
                
                    var number_columns = MediaShow.numberColumns(nodes_object);
                    var post_edges = parse_neo.edgesAuthorPost(number_columns, 'L_POST');
                    var book_edges = parse_neo.edgesAuthorBook(number_columns, 'L_BOOK');
                    
                    var wiki_author_edges = parse_neo.edgesAuthorWiki(number_columns, 'L_AUTHOR_WIKI');
                    var edges_object = book_edges.concat(post_edges, wiki_author_edges)

   
   var db_version = nodes_object[0].db_version;
  

     
                    var graph_info = {graph_type: 'author_page', strip_author: strip_author, db_version:db_version};
                    
                    
                    var nodes_and_edges = {graph_collection, nodes_object, edges_object, graph_info};   /// graph_collection for tests
                    return nodes_and_edges;
                })
        }





// showAuthor
     static  setUpAuthor2(strip_author, sorted_nodes, div_height, div_width) {      // author_data
     var middle_height= div_height/2;
     var middle_width= div_width/2;
     
            var number_columns = MediaShow.numberColumns(sorted_nodes);
            sorted_nodes = BookData.bookPositions2(sorted_nodes, middle_height, number_columns);
            sorted_nodes = PostData.postPositions2(sorted_nodes, middle_height, number_columns);
            var positioned_nodes = []
            var hor_space = 300
            var author_pos = {x:middle_width, y: middle_height};
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



