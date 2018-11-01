//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
module.exports = function (graph_db) {

    class WikiAuthorData extends MediaShow {


        constructor(node_id, db_version, wiki_author, strip_author, wiki_url) {
            super(node_id, db_version, '', strip_author);
            this.goto_url = wiki_url;
            this.node_type = 'L_AUTHOR_WIKI';
        }



        setAuthorWikiPos(x_y_pos) {
            super.setPosition2(x_y_pos)
        }
    }
    return WikiAuthorData;

}



