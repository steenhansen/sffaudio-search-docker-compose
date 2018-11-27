MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

var misc_helper = rootAppRequire('sff-network/misc-helper')

module.exports = function (build_repository) {

    var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)


    class PostBuild extends MediaBuild {
    
    static addPosts(author_book_obj) {
  //   console.time("addPosts");
            var post_promises = [];
              //   console.log('bbb', author_book_obj)
            for (let book_author of author_book_obj) {
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        // console.log(' +++++++++++++++++++++++++++++++++++++ ')
                        //
          //  clog('clowns', book_author);
                var book = book_author['book'];
                var under_title = misc_helper.alphaUnderscore(book);
                if (under_title === '') {
                     var graph_title = book_author['graph title'];
                     var author = book_author['author'];
                     var sff_post_url = book_author['sff post url'];
                    var strip_author = misc_helper.alphaUnderscore(author);
                     var post_promise = build_repository.savePosts(strip_author, sff_post_url, graph_title, graph_title);
                     post_promises.push(post_promise);
                }
            }
         //   console.timeEnd("addPosts")
            return Promise.all(post_promises)
             //   .then( (result)=> clog(result))
           // return post_promises;
        }

        static addBookPosts(author_book_obj) {
            var post_promises = [];
            for (let book_author of author_book_obj) {
                var graph_title = book_author['graph title'];
                var author = book_author['author'];
                var book = book_author['book'];
                var sff_post_url = book_author['sff post url'];
                var strip_author = misc_helper.alphaUnderscore(author);
                var under_title = misc_helper.alphaUnderscore(book);
                if (under_title) {
                    var post_promise = build_repository.saveBookPost(strip_author, under_title, sff_post_url, graph_title, graph_title);
                }
                post_promises.push(post_promise);
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

        ///////////////////////


    }
    return PostBuild;

}



