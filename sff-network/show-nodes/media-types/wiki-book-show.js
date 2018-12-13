//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
module.exports = function (graph_db) {

    class WikiBookNode extends MediaShow {
        constructor(node_id, db_version, wiki_book, under_title, book_url) {

            super(node_id, db_version, '', under_title);
            this.sorted_label = book_url;
            this.goto_url = book_url;
                 this.node_type = 'L_BOOK_WIKI';
                 this.title = "Click for story's Wikipedia entry";
        }



    }
    return WikiBookNode;

}



