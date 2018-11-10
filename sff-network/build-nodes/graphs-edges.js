function saveTheAuthors_b_2(author_items, build_repository) {
    var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
    var author_build = new AuthorBuild();
    let {author_list, author_wikis} = author_items;
    var author_nodes = author_build.addAuthors(author_list);
    var author_wiki_nodes = author_build.addAuthorWiki(author_wikis);
    return Promise.all([author_nodes, author_wiki_nodes]).then(
        ()=> {
            //console.log('done saveTheAuthors')
        }
    )
}

///////////////////////////////////

function saveThePages_b_3__aa(build_repository, author_book_obj) {
    var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
    var add_podcasts_page = podcast_build.addPodcastsPage();

    var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
    var add_pdf_page = book_build.addPdfsPage();

    var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
    var post_nodes = post_build.addPosts(author_book_obj);
    var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
    var add_rsd_page = rsd_build.addRsdsPage();
    return Promise.all([post_nodes, add_podcasts_page, add_pdf_page, add_rsd_page]).then(
        ()=> {
            //console.log('done saveTheAuthors')
        }
    )
}


function saveThePages_b_3__bb(build_repository, author_book_obj) {
    var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)
    var book_post_nodes = post_build.addBookPosts(author_book_obj);
    return Promise.all([book_post_nodes]).then(
        ()=> {
            //console.log('done saveTheAuthors')
        }
    )
}


//////////////////////////////////


function saveTheBooks_b_1(book_items, build_repository) {
    var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
    let {book_list, story_wikis} = book_items;
    var book_nodes = book_build.addBooksNew(book_list);
    var story_wiki_nodes = book_build.addStoryWiki(story_wikis);
    return Promise.all([book_nodes, story_wiki_nodes]).then(
        ()=> {
            //console.log('done saveTheBooks')
        }
    )
}


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

function savePosts_d_4(build_repository) {
    var post_build = rootAppRequire('./sff-network/build-nodes/media-types/post-build')(build_repository)

    let authors_to_posts = post_build.authors_to_posts();
    let books_to_posts = post_build.books_to_posts();
    return Promise.all([authors_to_posts, books_to_posts]).then(
        ()=> {
            //console.log('done savePosts_d_4')
        }
    )
}

function saveWikis_d_3(build_repository) {
    var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
    var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
    var author_build = new AuthorBuild();

    var wiki_story_book_edges = book_build.addWikiStories();
    var wiki_author_book_edges = author_build.addWikiAuthors();
    return Promise.all([wiki_story_book_edges, wiki_author_book_edges]).then(
        ()=> {
            //console.log('done saveWikis_d_3')
        }
    )
}

function saveInserts_d_2a(build_repository) {
    var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
    var podcast_book_edges = podcast_build.addPodcastsOfBook();
    return Promise.all([podcast_book_edges]).then(
        ()=> {
            //console.log('done saveInserts_d_2')
        }
    )
}

function saveInserts_d_2b(build_repository) {
    var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
    var rsd_book_edges = rsd_build.insertRsdsOfBook();
    return Promise.all([rsd_book_edges]).then(
        ()=> {
            //console.log('done saveInserts_d_2')
        }
    )
}


function saveWrittenBy_d_1a(build_repository) {
    var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
    //var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
    //var author_build = new AuthorBuild();
    //  var written_by_edges = author_build.addWrittenBy();
    var pdfs_book_edges = book_build.addPdfsOfBook();
    return Promise.all([pdfs_book_edges]).then(
        ()=> {
            //console.log('done saveWrittenBy_d_1')
        }
    )
}

function saveWrittenBy_d_1b(build_repository) {
    //  var book_build = rootAppRequire('./sff-network/build-nodes/media-types/book-build')(build_repository)
    var AuthorBuild = rootAppRequire('./sff-network/build-nodes/media-types/author-build')(build_repository)
    var author_build = new AuthorBuild();
    var written_by_edges = author_build.addWrittenBy();
    //  var pdfs_book_edges = book_build.addPdfsOfBook();
    return Promise.all([written_by_edges]).then(
        ()=> {
            //console.log('done saveWrittenBy_d_1')
        }
    )
}


function saveTheRsds_c_3(media_items, build_repository) {
    var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(build_repository)
    let {rsd_info} = media_items;
    return rsd_build.addRsds(rsd_info);
}

function saveThePdfs_c_2(media_items, build_repository) {
    var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(build_repository)
    let {pdf_info} = media_items;
    return pdf_build.addPdfs(pdf_info);
}


function saveThePodcasts_c_1(media_items, build_repository) {
    var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(build_repository)
    let {podcast_info} = media_items;
    return podcast_build.addPodcasts(podcast_info);
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

module.exports = {
    makeEdgesNodes, saveToGraph, saveTheBooks_b_1, saveTheAuthors_b_2,
    saveThePages_b_3__aa, saveThePages_b_3__bb,
    saveThePodcasts_c_1, saveThePdfs_c_2, saveTheRsds_c_3,
    saveWrittenBy_d_1a, saveWrittenBy_d_1b,
    saveInserts_d_2a, saveInserts_d_2b,
    saveWikis_d_3, savePosts_d_4
};

