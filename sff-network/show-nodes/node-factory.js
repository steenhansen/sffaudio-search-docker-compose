
module.exports = function (data_repository) {
    var AuthorData = rootAppRequire('sff-network/show-nodes/media-types/author-show')(data_repository)
    var BookNode = rootAppRequire('sff-network/show-nodes/media-types/book-show')(data_repository)
    var PostNode = rootAppRequire('sff-network/show-nodes/media-types/post-show')(data_repository)
    var BookPostNode = rootAppRequire('sff-network/show-nodes/media-types/book-post-show')(data_repository)
    var PdfNode = rootAppRequire('sff-network/show-nodes/media-types/pdf-show')(data_repository)
    var PodcastNode = rootAppRequire('sff-network/show-nodes/media-types/podcast-show')(data_repository)
    var WikiAuthorNode = rootAppRequire('sff-network/show-nodes/media-types/wiki-author-show')(data_repository)
    var WikiBookNode = rootAppRequire('sff-network/show-nodes/media-types/wiki-book-show')(data_repository)
    var RsdNode = rootAppRequire('sff-network/show-nodes/media-types/rsd-show')(data_repository)
    
    function nodeFactory(media_node, author_or_book) {
        const node_id = media_node.identity.low
        const node_group = media_node.labels[0];
        const db_version =  media_node.properties.db_version;
        let new_node;
        if (node_group === 'L_AUTHOR') {
            const {author_name, strip_author} = media_node.properties;
            new_node = new AuthorData(node_id, db_version, author_name, strip_author);
        } else if (node_group === 'L_BOOK') {
            const {book_title, sorted_label, under_title, last_first_underscores} = media_node.properties;
            new_node = new BookNode(node_id, db_version, book_title, sorted_label, under_title, last_first_underscores);
        } else if (node_group === 'L_PDF') {
            const {pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country} = media_node.properties;
            new_node = new PdfNode(node_id, db_version, pdf_title, book_title, under_title, pdf_url, last_first_underscores, pdf_country);
        } else if (node_group === 'L_PODCAST') {
            const {under_title, podcast_title, podcast_url,podcast_id, last_first_underscores} = media_node.properties;
            new_node = new PodcastNode(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, last_first_underscores);
        } else if (node_group === 'L_RSD') {
            const {under_title,  last_first_underscores, rsd_title, rsd_url, rsd_pdf_link, rsd_description, video_link} = media_node.properties;
            new_node = new RsdNode(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description,video_link, under_title, last_first_underscores);
        } else if (node_group === 'L_AUTHOR_POST') {       // L_AUTHOR_POST
            const {post_title, sorted_label, post_slug, strip_author} = media_node.properties;
            new_node = new PostNode(node_id, db_version, post_title, sorted_label, post_slug, strip_author);
        } else if (node_group === 'L_AUTHOR_WIKI') {
                  const {author_name, wiki_author, strip_author, author_url} = media_node.properties;
            new_node = new WikiAuthorNode(node_id, db_version, wiki_author, strip_author, author_url, author_name);
        } else if (node_group === 'L_BOOK_WIKI') {
            const {wiki_book, under_title, book_url} = media_node.properties;
            new_node = new WikiBookNode(node_id, db_version, wiki_book, under_title, book_url);
        } else if (node_group === 'L_BOOK_POST') {
           const {post_title, sorted_label, post_slug, strip_author,under_title} = media_node.properties;
            new_node = new BookPostNode(node_id, db_version, post_title, sorted_label, post_slug, strip_author,under_title); 
        } else {
            console.log('media_node, in nodefactory    !!!!!!!', node_group)
            new_node = null;
        }

        return new_node;
    }


    return nodeFactory;

}
