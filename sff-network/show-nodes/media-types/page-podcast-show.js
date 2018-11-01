
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')

module.exports = function (graph_db) {

    class PagePodcastData extends MediaShow {
        constructor(node_id, db_version, page_title, pages_url) {
           super(node_id, db_version, page_title, page_title);
            this.goto_url = pages_url;
             this.node_type = 'L_PAGE_PODCASTS';
    }



    }
    return PagePodcastData;

}



