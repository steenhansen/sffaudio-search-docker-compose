

module.exports = function (obj_dir) {
var rsd_file = obj_dir +'rsd-obj.js';
var podcast_file = obj_dir +'podcast-obj.js';
var pdf_file = obj_dir +'pdf-obj.js';
var post_obj_file = obj_dir +'posts-obj.js';

    function allPdfRsdPodcastData(build_repository) {
          var rsd_csv = require(rsd_file);
        var podcast_csv = require(podcast_file);
        var pdf_csv = require(pdf_file);
        
        const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(build_repository);
        
        return read_csv_google.getFromCsvFile(podcast_csv, rsd_csv, pdf_csv)
            .then((media_items) => {
                return makeEdgesNodes(media_items, build_repository);
            })
    }

    function linkPdfToBook_c_1(build_repository) {
        console.time("linkPdfToBook_c_1");
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        var pdfs_book_edges = book_build.addPdfsOfBook();
        return Promise.all([pdfs_book_edges])
            .then(()=> console.timeEnd("linkPdfToBook_c_1"))
    }


    function linkAuthorToBook_c_2(build_repository) {
        console.time("linkAuthorToBook_c_2");
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();
        var written_by_edges = author_build.addWrittenBy();
        return Promise.all([written_by_edges])
            .then(()=> console.timeEnd("linkAuthorToBook_c_2"))
    }


    function linkPodcastsToBook_c_3(build_repository) {
        console.time("linkPodcastsToBook_c_3");
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        var podcast_book_edges = podcast_build.addPodcastsOfBook();
        return Promise.all([podcast_book_edges])
            .then(()=> console.timeEnd("linkPodcastsToBook_c_3"))
    }


    function linkRsdsToBook_c_4(build_repository) {
        console.time("linkRsdsToBook_c_4");
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        var rsd_book_edges = rsd_build.insertRsdsOfBook();
        return Promise.all([rsd_book_edges])
            .then(()=> console.timeEnd("linkRsdsToBook_c_4"))
    }


    function linkRsdsToBook_c_4(build_repository) {
        console.time("linkRsdsToBook_c_4");
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        var rsd_book_edges = rsd_build.insertRsdsOfBook();
        return Promise.all([rsd_book_edges])
            .then(()=> console.timeEnd("linkRsdsToBook_c_4"))
    }

    function linkBooksAuthorsToWikis_c_5(build_repository) {
        console.time("linkBooksAuthorsToWikis_c_5");
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();


        var wiki_story_book_edges = book_build.addWikiStories();
        var wiki_author_book_edges = author_build.addWikiAuthors();
        return Promise.all([wiki_story_book_edges, wiki_author_book_edges])
            .then(()=> console.timeEnd("linkBooksAuthorsToWikis_c_5"))
    }


    function linkBooksToPosts_c_6(build_repository) {
        console.time("linkBooksToPosts_c_6");
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)


        let authors_to_posts = post_build.authors_to_posts();
        let books_to_posts = post_build.books_to_posts();
        return Promise.all([authors_to_posts, books_to_posts])
            .then(()=> console.timeEnd("linkBooksToPosts_c_6"))
    }


    function buildAllBooks_b_1(build_repository) {
        console.time("buildAllBooks_b_1");
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {book_list, story_wikis} = media_items;
                var book_nodes = book_build.addBooksNew(book_list);
                var story_wiki_nodes = book_build.addStoryWiki(story_wikis);
                return Promise.all([book_nodes, story_wiki_nodes])
                    .then(()=> console.timeEnd("buildAllBooks_b_1"))
            })
    }

    function buildAllAuthors_b_2(build_repository) {
        console.time("buildAllAuthors_b_2");
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {author_list, author_wikis} = media_items;
                var author_nodes = author_build.addAuthors(author_list);
                var author_wiki_nodes = author_build.addAuthorWiki(author_wikis);
                return Promise.all([author_nodes, author_wiki_nodes])
                    .then(()=> console.timeEnd("buildAllAuthors_b_2"))
            })
    }

    function buildAllPosts_b_3(build_repository) {
        console.time("buildAllPosts_b_3");
             var author_book_obj = require(post_obj_file);
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
        return post_build.addPosts(author_book_obj)
            .then(()=> console.timeEnd("buildAllPosts_b_3"))
    }


    function buildPodcastsPage_b_4(build_repository) {
        console.time("buildPodcastsPage_b_4");
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        return podcast_build.addPodcastsPage()
            .then(()=> console.timeEnd("buildPodcastsPage_b_4"))
    }

    function buildPdfsPage_b_5(build_repository) {
        console.time("buildPdfsPage_b_5");
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        return book_build.addPdfsPage()
            .then(()=> console.timeEnd("buildPdfsPage_b_5"))
    }

    function buildRsdsPage_b_6(build_repository) {
        console.time("buildRsdsPage_b_6");
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        return rsd_build.addRsdsPage()
            .then(()=> console.timeEnd("buildRsdsPage_b_6"))
    }

    function buildBookPosts_b_7(build_repository) {
        console.time("buildBookPosts_b_7");
        var author_book_obj = require(post_obj_file);
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
        var book_post_nodes = post_build.addBookPosts(author_book_obj);
        return Promise.all([book_post_nodes])
            .then(()=> console.timeEnd("buildBookPosts_b_7"))
    }

////////////////////

    function buildPodcasts_b_8(build_repository) {
        console.time("buildPodcasts_b_8");
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {podcast_info} = media_items;
                return podcast_build.addPodcasts(podcast_info)
                    .then(()=> console.timeEnd("buildPodcasts_b_8"))
            })
    }


    function buildPdfs_b_9(build_repository) {
        console.time("buildPdfs_b_9");
        var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {pdf_info} = media_items;
                return pdf_build.addPdfs(pdf_info)
                    .then(()=> console.timeEnd("buildPdfs_b_9"))
            })
    }


    function buildRsds_b_10(build_repository) {
        console.time("buildRsds_b_10");
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {rsd_info} = media_items;
                return rsd_build.addRsds(rsd_info)
                    .then(()=> console.timeEnd("buildRsds_b_10"))
            })
    }

////////////////////

    function saveToGraph(media_items, build_repository, author_book_obj) {
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(build_repository)
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)

        let {book_list, author_list, story_wikis, author_wikis, podcast_info, pdf_info, rsd_info} = media_items;
        var book_nodes = book_build.addBooksNew(book_list);         //////
        var author_nodes = author_build.addAuthors(author_list);   /////
        var author_wiki_nodes = author_build.addAuthorWiki(author_wikis);   /////
        var story_wiki_nodes = book_build.addStoryWiki(story_wikis);    //////////////////
        var post_nodes = post_build.addPosts(author_book_obj);  /////
        var add_pdf_page = book_build.addPdfsPage();/////
        var add_rsd_page = rsd_build.addRsdsPage();/////
        var add_podcasts_page = podcast_build.addPodcastsPage();/////

        var first_promises = [add_pdf_page, add_rsd_page, add_podcasts_page, book_nodes, author_nodes, author_wiki_nodes, story_wiki_nodes, post_nodes];
        return Promise.all(first_promises).then(
            ()=> {
                var podcast_nodes = podcast_build.addPodcasts(podcast_info);/////
                var pdf_nodes = pdf_build.addPdfs(pdf_info);////
                var rsd_nodes = rsd_build.addRsds(rsd_info);///
                var my_promises = [podcast_nodes, pdf_nodes, rsd_nodes,];
                return Promise.all(my_promises).then(function () {
                    var written_by_edges = author_build.addWrittenBy();//
                    var pdfs_book_edges = book_build.addPdfsOfBook();//

                    var podcast_book_edges = podcast_build.addPodcastsOfBook();
                    var rsd_book_edges = rsd_build.insertRsdsOfBook();

                    var wiki_story_book_edges = book_build.addWikiStories();
                    var wiki_author_book_edges = author_build.addWikiAuthors();

                    let authors_to_posts = post_build.authors_to_posts();
                    let books_to_posts = post_build.books_to_posts();

                    var all_edges = [written_by_edges, pdfs_book_edges, rsd_book_edges, podcast_book_edges, wiki_story_book_edges,
                        wiki_author_book_edges, authors_to_posts, books_to_posts];
                    return Promise.all(all_edges).then(function () {
                        var make_indexes = build_repository.makeIndexes();  ////
                        return make_indexes;
                    })

                })
            }
        )
    }


    function makeEdgesNodes(media_items, build_repository) {

        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(build_repository)

        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();


        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)

        let {book_list, author_list, podcast_descriptions, pdf_descriptions, rsd_descriptions}= media_items;

        let story_wikis = book_build.findStoryWiki(pdf_descriptions);
        let author_wikis = author_build.findAuthorWiki(pdf_descriptions);
        let podcast_info = podcast_build.findPodcastInfo(podcast_descriptions);
        let pdf_info = pdf_build.findPdfBooks(pdf_descriptions);
        let rsd_info = rsd_build.findRsdBooks(rsd_descriptions);
        for (let title_auth1_auth2 in  book_list) {
            var under_title = book_list[title_auth1_auth2].under_title;
            var start_articles_reg_ex = /^(a_|an_|the_)/i;

            var book_articles = under_title.split(start_articles_reg_ex)


            if (book_articles.length > 1) {
                var sorted_label = book_articles[2]
            } else {
                var sorted_label = book_articles[0]
            }
            book_list[title_auth1_auth2].sorted_label = sorted_label;
        }

        const media_data = {book_list, author_list, story_wikis, author_wikis, podcast_info, pdf_info, rsd_info};
        return media_data;
    }

return  {

        makeEdgesNodes, saveToGraph,

        buildAllBooks_b_1,
        buildAllAuthors_b_2,
        buildAllPosts_b_3,
        buildPodcastsPage_b_4,
        buildPdfsPage_b_5,
        buildRsdsPage_b_6,
        buildBookPosts_b_7,
        buildPodcasts_b_8,
        buildPdfs_b_9,
        buildRsds_b_10,

        linkPdfToBook_c_1,
        linkAuthorToBook_c_2,
        linkPodcastsToBook_c_3,
        linkRsdsToBook_c_4,
        linkBooksAuthorsToWikis_c_5,
        linkBooksToPosts_c_6

    };


}

// module.exports =  {
//
//         makeEdgesNodes, saveToGraph,
//
//         buildAllBooks_b_1,
//         buildAllAuthors_b_2,
//         buildAllPosts_b_3,
//         buildPodcastsPage_b_4,
//         buildPdfsPage_b_5,
//         buildRsdsPage_b_6,
//         buildBookPosts_b_7,
//         buildPodcasts_b_8,
//         buildPdfs_b_9,
//         buildRsds_b_10,
//
//         linkPdfToBook_c_1,
//         linkAuthorToBook_c_2,
//         linkPodcastsToBook_c_3,
//         linkRsdsToBook_c_4,
//         linkBooksAuthorsToWikis_c_5,
//         linkBooksToPosts_c_6
//
//     };



