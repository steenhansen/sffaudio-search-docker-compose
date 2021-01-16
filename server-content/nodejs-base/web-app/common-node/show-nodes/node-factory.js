require('../../common-node/global-require')


module.exports = function (data_repository) {


    var AuthorData = rootAppRequire('common-node/show-nodes/media-types/author-show')(data_repository)
    var BookNode = rootAppRequire('common-node/show-nodes/media-types/book-show')(data_repository)
    var AuthorPostNode = rootAppRequire('common-node/show-nodes/media-types/author-post-show')(data_repository)
    var BookPostNode = rootAppRequire('common-node/show-nodes/media-types/book-post-show')(data_repository)
    var PdfNode = rootAppRequire('common-node/show-nodes/media-types/pdf-show')(data_repository)
    var PodcastNode = rootAppRequire('common-node/show-nodes/media-types/podcast-show')(data_repository)
    var WikiAuthorNode = rootAppRequire('common-node/show-nodes/media-types/wiki-author-show')(data_repository)
    var WikiBookNode = rootAppRequire('common-node/show-nodes/media-types/wiki-book-show')(data_repository)
    var RsdNode = rootAppRequire('common-node/show-nodes/media-types/rsd-show')(data_repository)


    var my = {
        pdf_count: 0,
        podcast_count: 0,
        rsd_count: 0,
        author_post_count: 0,
        book_post_count: 0
    };


    my.resetChoiceCounts = function () {
        my.pdf_count = 0;
        my.podcast_count = 0;
        my.rsd_count = 0;
        my.author_post_count = 0;
        my.book_post_count = 0;
    }


    my.makeNode = function (media_node) {
        const node_id = media_node.identity.low
        const node_group = media_node.labels[0];
        const db_version = media_node.properties.db_version;
        let new_node;
        if (node_group === 'L_AUTHOR') {
            const {author_name, strip_author} = media_node.properties;
            new_node = new AuthorData(node_id, db_version, author_name, strip_author);
        } else if (node_group === 'L_BOOK') {
            const {book_title, sorted_label, under_title, last_first_underscores} = media_node.properties;
            new_node = new BookNode(node_id, db_version, book_title, sorted_label, under_title, last_first_underscores);
        } else if (node_group === 'L_PDF') {
            my.pdf_count++;
            const {pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country} = media_node.properties;
            new_node = new PdfNode(node_id, db_version, pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country,my.pdf_count);
        } else if (node_group === 'L_PODCAST') {
            // Warning, if a book has two authors, and one podcast, then then viewing choice will be '2' NOT '1' as below
            // http://localhost:5000/?book=deus-irae&author=philip-k-dick,roger-zelazny&view=podcast&choice=2
            my.podcast_count++;
            const {under_title, podcast_title, podcast_url, podcast_id, last_first_underscores, podcast_description} = media_node.properties;
            new_node = new PodcastNode(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, last_first_underscores, my.podcast_count, podcast_description);
        } else if (node_group === 'L_RSD') {           
            my.rsd_count++;
            const {under_title, last_first_underscores, rsd_title, rsd_url, rsd_pdf_link, rsd_description, video_link} = media_node.properties;
            new_node = new RsdNode(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description, video_link, under_title, last_first_underscores, my.rsd_count);
        } else if (node_group === 'L_AUTHOR_POST') {
            my.author_post_count++;
            const {post_title, sorted_label, post_slug, strip_author} = media_node.properties;
            new_node = new AuthorPostNode(node_id, db_version, post_title, sorted_label, post_slug, strip_author, my.author_post_count);
        } else if (node_group === 'L_AUTHOR_WIKI') {
            const {author_name, wiki_author, strip_author, author_url} = media_node.properties;
            new_node = new WikiAuthorNode(node_id, db_version, wiki_author, strip_author, author_url, author_name);
        } else if (node_group === 'L_BOOK_WIKI') {
            const {wiki_book, under_title, book_url} = media_node.properties;
            new_node = new WikiBookNode(node_id, db_version, wiki_book, under_title, book_url);
        } else if (node_group === 'L_BOOK_POST') {
            my.book_post_count++;
            const {post_title, sorted_label, post_slug, last_first_underscores, under_title} = media_node.properties;
            new_node = new BookPostNode(node_id, db_version, post_title, sorted_label, post_slug, last_first_underscores, under_title, my.book_post_count);
        } else {
            console.log('media_node, in nodefactory    !!!!!!!', node_group)
            new_node = null;
        }

        return new_node;
    }


    return my;

}
