MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')

var misc_helper = rootAppRequire('sff-network/misc-helper')

//   function stripToLower(csv_string) {
//     var lower_csv = csv_string.toLowerCase();
//     var lower_stripped = lower_csv.replace(/[^0-9a-z ]/gi, '');  // somewhere else
//     return lower_stripped.trim();
// }

// function   spacesToUnderscore(author_title) {
//     var underscore_author_title = author_title.replace(/ /g, '_');      // somewhere else
//     return underscore_author_title;
// }
module.exports = function (build_repository) {

    var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)


    class PostBuild extends MediaBuild {


        static addPosts(related_posts, added_authors, author_book_obj) {

           // var author_build = new AuthorBuild(added_authors);
            clog('-----------------------------------------')
            clog(author_book_obj)
            clog('::::::::::::::::::::::::::::::::::::::::::')
            var post_promises = [];
        //    var post_authors = {};
            for (let book_author of author_book_obj) {
                var graph_title = book_author['graph title'];
                var author = book_author['author'];
                var book = book_author['book'];
                var sff_post_url = book_author['sff post url'];
                var strip_author = misc_helper.alphaUnderscore(author);
                var under_title = misc_helper.alphaUnderscore(book);
                if (under_title === '') {
                    var post_promise = build_repository.savePosts(strip_author, sff_post_url, graph_title, graph_title);
                    //clog('NEW', strip_author, sff_post_url, graph_title, graph_title)
                 //   clog('an author', strip_author)
                } else {
                    var post_promise = build_repository.saveBookPost(strip_author, under_title, sff_post_url, graph_title, graph_title);
                    clog('a book ', strip_author, under_title)
                }
                    post_promises.push(post_promise);


            }
  return post_promises;
            // clog('##########################################')
            // clog(related_posts)
            // clog('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
            //
            //
            // var post_promises = [];
            // var post_authors = {};
            // for (let book_author in related_posts) {
            //     var strip_author = misc_helper.alphaUnderscore(book_author);
            //     post_authors[strip_author] = book_author
            //     var author_posts = related_posts[book_author];
            //     for (let post_slug in author_posts) {
            //         var post_title = misc_helper.stripToLower(author_posts[post_slug][0])                     ////author_posts[post_slug][0];
            //               // clog('OLD  author_posts[post_slug] ',author_posts[post_slug])
            //         if (author_posts[post_slug][1]) {
            //             var sorted_label = misc_helper.stripToLower(author_posts[post_slug][1]);
            //         } else {
            //             var sorted_label = post_title;
            //         }
            //         var post_promise = build_repository.savePosts(strip_author, post_slug, post_title, sorted_label);
            //         clog('OLD', strip_author, post_slug, post_title, sorted_label)
            //         post_promises.push(post_promise);
            //     }
            // }


        //    var author_nodes = author_build.addAuthors(post_authors);
        //    var post_and_author_promises = author_nodes.concat(post_promises)
        //    return post_and_author_promises;
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



