MediaBuild = rootAppRequire('common-node/build-nodes/media-types/media-build');

var misc_helper = rootAppRequire('common-node/misc-helper');
var multiple_monikers = new MultipleMonikers();
module.exports = function (build_repository) {

    var AuthorBuild = rootAppRequire('./common-node/build-nodes/media-types/author-build')(build_repository)


    class PostBuild extends MediaBuild {

        static addPosts(author_book_obj) {
            var post_promises = [];
            for (let book_author of author_book_obj) {
                var book = book_author['book'];
                var under_title = misc_helper.alphaUnderscore(book);
                if (under_title === '') {
                    var graph_title = book_author['title'];
                    var author = book_author['author'];
                    var sff_post_url = book_author['id'];
                    var strip_author = misc_helper.alphaUnderscore(author);
                    var post_promise = build_repository.savePosts(strip_author, sff_post_url, graph_title, graph_title);
                    post_promises.push(post_promise);
                }
            }
            return Promise.all(post_promises)
        }

        static addBookPosts(author_book_obj) {
            var author_build = new AuthorBuild();
            var book_build = rootAppRequire('./common-node/build-nodes/media-types/book-build')(build_repository);
            var post_promises = [];
            for (let book_author of author_book_obj) {
                var graph_title = book_author['title'];
                var author = book_author['author'];
                var book = book_author['book'];
                var sff_post_url = book_author['id'];
                var under_title = misc_helper.alphaUnderscore(book);
                if (under_title) {
                    var author_obj = {};
                    multiple_monikers.parseNames(author);
                    var last_first_underscores = multiple_monikers.lastUnderscore();
                    var firstMiddleLast = multiple_monikers.firstMiddleLast();
                    for (var an_author of firstMiddleLast) {           
                        var strip_author = misc_helper.alphaUnderscore(an_author);
                        author_obj[strip_author] = an_author;
                        var author_nodes = author_build.addAuthors(author_obj);
                        post_promises.push(author_nodes);
                    }
                    var title_with_authors = multiple_monikers.titleWithAuthors(under_title);
                    var book_obj = {
                        sorted_label: under_title,
                        esc_book_title: book,
                        under_title: under_title,
                        last_first_underscores: last_first_underscores
                    };
                    var ojbect_of_book = {};
                    ojbect_of_book[title_with_authors] = book_obj;
                    var book_nodes = book_build.addBooksNew(ojbect_of_book);
                    post_promises.push(book_nodes);
                    var post_promise = build_repository.saveBookPost(last_first_underscores, under_title, sff_post_url, graph_title, graph_title);
                    post_promises.push(post_promise);
                }
            }
            return post_promises;
        }

        static authors_to_posts() {
            var post_promise = build_repository.authors_to_posts();
            return post_promise;
        }


        static books_to_posts() {
            var post_promise = build_repository.books_to_posts();
            return post_promise;
        }

    }
    return PostBuild;

}



