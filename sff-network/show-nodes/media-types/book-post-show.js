//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
var LabelPositions = rootAppRequire('sff-network/show-nodes/label-positions')
var media_constants = rootAppRequire('sff-network/media-constants')


const {TOP_COLUMNS_Y_OFFSET, HORIZONTAL_COLUMNS, X_NODE_SEPARATION, Y_NODE_SEPARATION, VERTICAL_STAGGER}=LabelPositions

module.exports = function (graph_repository) {


    //  var author_2node = rootAppRequire('./sff-network/node-types/author-2node')(graph_repository)

    class BookPostNode extends MediaShow {


      
        constructor(node_id, db_version, post_title, sorted_label, post_slug, strip_author,under_title) {


            super(node_id, db_version, post_title, sorted_label);
            this.post_slug = post_slug;
            this.strip_author = strip_author;
            this.node_type = 'L_BOOK_POST';

            this.goto_url = media_constants.POST_LINK + post_slug;
 this.sorted_label = post_slug;
 this.under_title = under_title;
        }




      


    }
    return BookPostNode;

}



