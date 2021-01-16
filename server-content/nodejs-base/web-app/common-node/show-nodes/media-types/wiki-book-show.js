//var Media2Node = rootAppRequire('common-node/node-types/media-2node')
HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon')
module.exports = function (graph_db) {

    class WikiBookNode extends HoverIcon {
        constructor(node_id, db_version, wiki_book, under_title, book_url) {

            super(node_id, db_version, '', under_title);
            this.sorted_label = book_url;
            this.goto_url = book_url;
                 this.node_type = 'L_BOOK_WIKI';
                 this.title = "Click for story's Wikipedia entry";
                  this.label =    "Wikipedia entry" ;
        }



    }
    return WikiBookNode;

}



