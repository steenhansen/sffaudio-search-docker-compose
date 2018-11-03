
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
    var PagePdfNode = rootAppRequire('sff-network/show-nodes/media-types/page-pdf-show')(data_repository)
    var PageRsdfNode = rootAppRequire('sff-network/show-nodes/media-types/page-rsd-show')(data_repository)
    var PagePodcastfNode = rootAppRequire('sff-network/show-nodes/media-types/page-podcast-show')(data_repository)
    var VersionShow = rootAppRequire('sff-network/show-nodes/media-types/version-show')

    function nodeFactory(media_node, author_or_book) {
        const node_id = media_node.identity.low
        const node_group = media_node.labels[0];
        const db_version =  media_node.properties.db_version;
        let new_node;
        if (node_group === 'L_AUTHOR') {
            const {author_name, strip_author} = media_node.properties;
            new_node = new AuthorData(node_id, db_version, author_name, strip_author);
        } else if (node_group === 'L_BOOK') {
            const {book_title, sorted_label, under_title, strip_1_author, strip_2_author} = media_node.properties;
            new_node = new BookNode(node_id, db_version, book_title, sorted_label, under_title, strip_1_author, strip_2_author);
        } else if (node_group === 'L_PDF') {
            const {pdf_title, book_title, under_title, pdf_url, strip_1_author, strip_2_author} = media_node.properties;
            new_node = new PdfNode(node_id, db_version, pdf_title, book_title, under_title, pdf_url, strip_1_author, strip_2_author);
            
            console.log('node factory, new_node', new_node)
            
            
        } else if (node_group === 'L_PODCAST') {
            const {under_title, podcast_title, podcast_url,podcast_id, strip_1_author} = media_node.properties;
            new_node = new PodcastNode(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, strip_1_author);
        } else if (node_group === 'L_RSD') {
            const {under_title, rsd_title, rsd_url, rsd_pdf_link, rsd_description} = media_node.properties;
            new_node = new RsdNode(node_id, db_version, rsd_title, rsd_url, rsd_pdf_link, rsd_description);
        } else if (node_group === 'L_POST') {       // L_AUTHOR_POST
            const {post_title, sorted_label, post_slug, strip_author} = media_node.properties;
            new_node = new PostNode(node_id, db_version, post_title, sorted_label, post_slug, strip_author);
        } else if (node_group === 'L_AUTHOR_WIKI') {
            const {wiki_author, strip_author, author_url} = media_node.properties;
            new_node = new WikiAuthorNode(node_id, db_version, wiki_author, strip_author, author_url);
        } else if (node_group === 'L_BOOK_WIKI') {
            const {wiki_book, under_title, book_url} = media_node.properties;
            new_node = new WikiBookNode(node_id, db_version, wiki_book, under_title, book_url);
        } else if (node_group === 'L_PAGE_PDFS') {
            const {page_title, pages_url} = media_node.properties;
            new_node = new PagePdfNode(node_id, db_version,page_title, pages_url);
         } else if (node_group === 'L_PAGE_RSDS') {
            const {page_title, pages_url} = media_node.properties;
            new_node = new PageRsdfNode(node_id, db_version,page_title, pages_url);
         } else if (node_group === 'L_PAGE_PODCASTS') {
            const {page_title, pages_url} = media_node.properties;
            new_node = new PagePodcastfNode(node_id, db_version,page_title, pages_url);
            
        } else if (node_group === 'L_VERSION') {
            const current_versionX = media_node.properties.current_version.low;
            new_node = new VersionShow(node_id, current_versionX, author_or_book);
            
        } else if (node_group === 'L_BOOK_POST') {
           const {post_title, sorted_label, post_slug, strip_author,under_title} = media_node.properties;
            new_node = new BookPostNode(node_id, db_version, post_title, sorted_label, post_slug, strip_author,under_title); 
            
        } else {
            console.log('media_node, in nodefactory    !!!!!!!', node_group)
        
            // q*bert we need to insert the under_title, into the podcast node, so that we can use back key, 
            // which needs a book name to go back to
            new_node = null;
        }

        return new_node;
    }


    return nodeFactory;

}
