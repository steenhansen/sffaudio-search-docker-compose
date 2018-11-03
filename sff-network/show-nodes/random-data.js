MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
var media_constants = rootAppRequire('sff-network/media-constants');
var build_page = rootAppRequire('./sff-network/html-pages/web-page')
module.exports = function (data_repository) {

    var ParseNeo = rootAppRequire('sff-network/show-nodes/parse-neo')(data_repository);

    class RandomData {

        static sendBookOrAuthor(author_or_title) {  //  strip_author, or under_title
            var rand_0_1 = Math.floor((Math.random() * 2));
            if (rand_0_1 === 0) {
                var num_quality_authors = media_constants.QUALITY_AUTHORS.length;
                return data_repository.qualityAuthor(num_quality_authors)
                    .then(function (graph_collection) {
                        var author_key = graph_collection[0].records[0]._fieldLookup.n_author;
                        var strip_author = graph_collection[0].records[0]._fields[author_key].properties.strip_author;
                        var parse_neo = new ParseNeo(graph_collection);
                        var nodes_string = parse_neo.getAuthorGraph(strip_author)
                        var edges_string = parse_neo.getEdges()
                        var author_html = build_page(nodes_string, edges_string);
                        return author_html;
                    })
            } else {
                var num_quality_books = media_constants.QUALITY_BOOKS.length;
                return data_repository.qualityBook(num_quality_books)
                    .then(function (graph_collection) {
                        var author_key = graph_collection[0].records[0]._fieldLookup.n_author;
                        var strip_author = graph_collection[0].records[0]._fields[author_key].properties.strip_author;
                        var parse_neo = new ParseNeo(graph_collection);

                        return parse_neo.getBookGraph(strip_author)
                            .then((nodes_string)=> {
                         clog('sendBookOrAuthor')   
                                var edges_string = parse_neo.getEdges()
                                var book_html = build_page(nodes_string, edges_string);
                                return book_html;
                            })


                        // var nodes_string = parse_neo.getBookGraph(strip_author)
                        // var edges_string = parse_neo.getEdges()
                        // var book_html = build_page(nodes_string, edges_string);
                        // return book_html;


                    })
            }
        }


    }

    return RandomData;
}




