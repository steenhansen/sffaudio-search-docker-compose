//const CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
//const CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
//var CachedQuality = rootAppRequire('sff-network/build-nodes/cached-lists/cached-quality');
//var CachedDefaults = rootAppRequire('sff-network/build-nodes/cached-lists/cached-default');
var misc_helper = rootAppRequire('sff-network/misc-helper');
module.exports = function (obj_dir) {
    var rsd_file = obj_dir + 'rsd-obj.js';
    
    var podcast_file = obj_dir + 'podcast-obj.js';
    var pdf_file = obj_dir + 'pdf-obj.js';
    var post_obj_file = obj_dir + 'posts-obj.js';


    function buildAllAuthors_b_2(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {author_list, author_wikis} = media_items;
                var author_nodes = author_build.addAuthors(author_list);
                var author_wiki_nodes = author_build.addAuthorWiki(author_wikis);
                return Promise.all([author_nodes, author_wiki_nodes])
                    .then(()=> {
                        misc_helper.consoleTimeEnd(start_date, "buildAllAuthors_b_2", show_or_hide_seconds);
                        return author_nodes.length;
                    })
            })
    }


    function buildAllBooks_b_1(build_repository,show_or_hide_seconds) {
        var start_date = Date.now();
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {book_list, story_wikis} = media_items;
                var book_nodes = book_build.addBooksNew(book_list);
                var story_wiki_nodes = book_build.addStoryWiki(story_wikis);
                return Promise.all([book_nodes, story_wiki_nodes])
                    .then(()=> misc_helper.consoleTimeEnd(start_date, "buildAllBooks_b_1", show_or_hide_seconds))
            })
    }


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

    function linkPdfToBook_c_1(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        var pdfs_book_edges = book_build.addPdfsOfBook();
        return Promise.all([pdfs_book_edges])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "linkPdfToBook_c_1", show_or_hide_seconds))
    }





    function linkPodcastsToBook_c_3(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        var podcast_book_edges = podcast_build.addPodcastsOfBook();
        return Promise.all([podcast_book_edges])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "linkPodcastsToBook_c_3", show_or_hide_seconds))
    }


    function linkRsdsToBook_c_4(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        var rsd_book_edges = rsd_build.insertRsdsOfBook();
        return Promise.all([rsd_book_edges])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "linkRsdsToBook_c_4", show_or_hide_seconds))
    }



    function linkBooksAuthorsToWikis_c_5(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
        var author_build = new AuthorBuild();


        var wiki_story_book_edges = book_build.addWikiStories();
        var wiki_author_book_edges = author_build.addWikiAuthors();
        return Promise.all([wiki_story_book_edges, wiki_author_book_edges])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "linkBooksAuthorsToWikis_c_5", show_or_hide_seconds))
    }


    function linkBooksToPosts_c_6(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)


        let authors_to_posts = post_build.authors_to_posts();
        let books_to_posts = post_build.books_to_posts();
        return Promise.all([authors_to_posts, books_to_posts])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "linkBooksToPosts_c_6", show_or_hide_seconds))
    }


    function buildAllPosts_b_3(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var author_book_obj = require(post_obj_file);
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
        return post_build.addPosts(author_book_obj)
            .then(()=> {
                    misc_helper.consoleTimeEnd(start_date, "buildAllPosts_b_3", show_or_hide_seconds);
                }
            )
    }


    function buildPodcastsPage_b_4(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        return podcast_build.addPodcastsPage()
            .then(()=> misc_helper.consoleTimeEnd(start_date, "buildPodcastsPage_b_4", show_or_hide_seconds))
    }

    function buildPdfsPage_b_5(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
        return book_build.addPdfsPage()
            .then(()=> misc_helper.consoleTimeEnd(start_date, "buildPdfsPage_b_5", show_or_hide_seconds))
    }

    function buildRsdsPage_b_6(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        return rsd_build.addRsdsPage()
            .then(()=> misc_helper.consoleTimeEnd(start_date, "buildRsdsPage_b_6", show_or_hide_seconds))
    }

    function buildBookPosts_b_7(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var author_book_obj = require(post_obj_file);
        var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
        var book_post_nodes = post_build.addBookPosts(author_book_obj);
        return Promise.all([book_post_nodes])
            .then(()=> misc_helper.consoleTimeEnd(start_date, "buildBookPosts_b_7", show_or_hide_seconds))
    }

////////////////////

    function buildPodcasts_b_8(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {podcast_info} = media_items;
                return podcast_build.addPodcasts(podcast_info)
                    .then(()=> misc_helper.consoleTimeEnd(start_date, "buildPodcasts_b_8", show_or_hide_seconds))
            })
    }


    function buildPdfs_b_9(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {pdf_info} = media_items;
                return pdf_build.addPdfs(pdf_info)
                    .then(()=> misc_helper.consoleTimeEnd(start_date, "buildPdfs_b_9", show_or_hide_seconds))
            })
    }


    function buildRsds_b_10(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
        return allPdfRsdPodcastData(build_repository)
            .then((media_items) => {
                let {rsd_info} = media_items;
                return rsd_build.addRsds(rsd_info)
                    .then(()=> misc_helper.consoleTimeEnd(start_date, "buildRsds_b_10", show_or_hide_seconds))
            })
    }

////////////////////



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
        for (let title_with_authors in  book_list) {
            var under_title = book_list[title_with_authors].under_title;
            var start_articles_reg_ex = /^(a_|an_|the_)/i;

            var book_articles = under_title.split(start_articles_reg_ex)


            if (book_articles.length > 1) {
                var sorted_label = book_articles[2]
            } else {
                var sorted_label = book_articles[0]
            }
            book_list[title_with_authors].sorted_label = sorted_label;
        }

        const media_data = {book_list, author_list, story_wikis, author_wikis, podcast_info, pdf_info, rsd_info};
        return media_data;
    }


    function nextDbVersion_d_2(VersionRepository, next_db_version, show_or_hide_seconds) {
        var start_date = Date.now();
                ///misc_helper.deleteCachedData();
              
        return VersionRepository.updateDbVersion_d_3(next_db_version)
            .then(()=> misc_helper.consoleTimeEnd(start_date, "nextDbVersion_d_2", show_or_hide_seconds))
    }


    return {

        makeEdgesNodes,

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
        linkPodcastsToBook_c_3,
        linkRsdsToBook_c_4,
        linkBooksAuthorsToWikis_c_5,
        linkBooksToPosts_c_6,

        nextDbVersion_d_2
    };


}



