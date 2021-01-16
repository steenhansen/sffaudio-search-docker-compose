//var VersionShow = rootAppRequire('common-node/show-nodes/media-types/version-show')


require('../../common-node/global-require')

function sortByValues(node_hash) {
    let the_nodes = Object.values(node_hash);
    the_nodes.sort(function (a, b) {
        var nameA = a.sorted_label
        var nameB = b.sorted_label
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return the_nodes;
}


module.exports = function (graph_repository) {
    var nodeFactory = rootAppRequire('./common-node/show-nodes/node-factory')(graph_repository)
    var AuthorNode = rootAppRequire('common-node/show-nodes/media-types/author-show')(graph_repository)
    var BookData = rootAppRequire('common-node/show-nodes/media-types/book-show')(graph_repository)

    class ParseNeo {

        constructor(graph_collection, author_or_book) {
        
        nodeFactory.resetChoiceCounts();
        
            this.author_or_book = author_or_book;
            this.node_relationships = {};
            this.nodes_2string = {};
            var self = this;
            graph_collection.forEach(function (node_collection) {
                node_collection.records.forEach(function (ans_collection) {
                    self.newRec(ans_collection);
                    self.getRelationships();
                    self.getNodes();
                })
            })
        }

        getAuthorGraph(strip_author) {
            let nodes_2string = this.nodes_2string
            if (Object.keys(nodes_2string).length > 1) {
                delete this.nodes_2string['EMPTY_ICON']
            }
            const ordered = {};
            Object.keys(nodes_2string).sort().forEach(function (key) {           // sort the authors!!
                ordered[key] = nodes_2string[key];
            });

            this.books_posts = ordered;         /// this.book_posts ==> this.books_posts_wikiAuthors
            var author_data = AuthorNode.setUpAuthor2(strip_author, ordered, 800, 800)
            return author_data;
        }


        getBookGraph(strip_author) {
            if (Object.keys(this.nodes_2string).length > 1) {
                delete this.nodes_2string['EMPTY_ICON']
            }
            let nodes_string = Object.values(this.nodes_2string)   /// strip_author == ok??????????
            var book_data = BookData.showBook(strip_author, nodes_string)
            return book_data;
        }


        getEdges() {          // getStringEdges  --- since for html
            let node_relationships = Object.values(this.node_relationships)
            return node_relationships;
        }


        newRec(neo_record) {
            this.neo_keys = neo_record.keys;
            this.data_length = neo_record.length
            this.data_fields = neo_record._fields;
        }


        getNodes() {
            for (let i = 0; i < this.data_length; i++) {
                var key_name = this.neo_keys[i];
                if (this.isNode(key_name)) {
                    var field_data = this.data_fields[i];
                    if ((field_data !== null) && (typeof field_data.identity !== 'undefined')) {
                        var identity_int = field_data.identity.low;
                        var node_2object = nodeFactory.makeNode(field_data);
                        if (node_2object !== null) {
                            this.nodes_2string[node_2object.sorted_label + identity_int] = node_2object;
                        }

                    }
                }
            }
        }

        isRelationship(key_name) {
            if (key_name.startsWith('r_')) {
                return true;
            } else {
                return false;
            }
        }

        isNode(key_name) {
            if (key_name.startsWith('n_')) {
                return true;
            } else {
                return false;
            }
        }

        isVariable(key_name) {
            if (key_name.startsWith('v_')) {
                return true;
            } else {
                return false;
            }
        }


/// maybe call them Edges
        getRelationships() {
            for (let i = this.data_length - 1; i >= 0; i--) {
                var key_name = this.neo_keys[i]
                if (this.isRelationship(key_name)) {
                    var field_data = this.data_fields[i]
                    if ((field_data !== null) && (typeof field_data.identity !== 'undefined')) {
                        var id = field_data.identity.low
                        var from = field_data.start.low
                        var to = field_data.end.low
                        if (typeof this.node_relationships[id] == 'undefined') {
                            this.node_relationships[id] = {from, to}
                        }
                    }
                }
            }
        }


        edgesAuthorBook(number_columns, node_type) {
            var ascending_books = Object.keys(this.books_posts).sort();
            var book_edges = this.getEdgesAuthor(number_columns, ascending_books, node_type);
            return book_edges;
        }


        edgesAuthorPost(number_columns, node_type) {
            var reversed_posts = Object.keys(this.books_posts).sort().reverse();
            var post_edges = this.getEdgesAuthor(number_columns, reversed_posts, node_type);
            return post_edges;
        }

        getEdgesAuthor(number_columns, sorted_books_posts, node_type) {          // getStringEdges  --- since for html
            var author_id;
            for (const under_title in this.books_posts) {
                var book_post = this.books_posts[under_title]             /// figure out elsewhere
                if (book_post.node_type == 'L_AUTHOR') {
                    author_id = book_post.id;
                }
            }
            var first_row_books = [];
            for (let book_post_key of sorted_books_posts) {
                var book_post = this.books_posts[book_post_key]
                if (book_post.node_type == node_type) {
                    const book_post_id = book_post.id;
                    first_row_books.push(book_post_id);
                }
            }
            var edges = [];
            for (const book_id of first_row_books) {
                edges.push({"from": author_id, "to": book_id});
            }
            return edges;
        }


        edgesAuthorWiki() {          // getStringEdges  --- since for html
            var author_id;
            for (const under_title in this.books_posts) {
                var book_post = this.books_posts[under_title]             /// figure out elsewhere
                if (book_post.node_type == 'L_AUTHOR') {
                    author_id = book_post.id;
                    break;
                }
            }
            for (const book_post_key in this.books_posts) {
                var book_post = this.books_posts[book_post_key]

                if (book_post.node_type == 'L_AUTHOR_WIKI') {
                    return [{"from": author_id, "to": book_post.id}]

                }
            }
            return [];
        }


    }
    return ParseNeo;

}
