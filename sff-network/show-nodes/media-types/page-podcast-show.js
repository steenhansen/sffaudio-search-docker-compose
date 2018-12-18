
HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon')

module.exports = function (graph_db) {

    class PagePodcastData extends HoverIcon {
        constructor(node_id, db_version, page_title, pages_url) {
           super(node_id, db_version, page_title, page_title);
            this.goto_url = pages_url;
             this.node_type = 'L_PAGE_PODCASTS';
                  this.title = "Click for SFFaudio's Podcast Page";
    }



    }
    return PagePodcastData;

}



