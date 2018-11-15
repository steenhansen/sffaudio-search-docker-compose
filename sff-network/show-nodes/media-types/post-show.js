//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
var LabelPositions = rootAppRequire('sff-network/show-nodes/label-positions')
var media_constants = rootAppRequire('sff-network/media-constants')


const {TOP_COLUMNS_Y_OFFSET, HORIZONTAL_COLUMNS, X_NODE_SEPARATION, Y_NODE_SEPARATION, VERTICAL_STAGGER}=LabelPositions

module.exports = function (graph_repository) {


    //  var author_2node = rootAppRequire('./sff-network/node-types/author-2node')(graph_repository)

    class PostData extends MediaShow {


        static postPositions2(sorted_nodes, vertical_center, number_columns) {
            var post_count = PostData.arrayObjectCount(sorted_nodes)

            if (post_count) {
                var post_space = {
                    start_x: 0,
                    start_y: vertical_center - TOP_COLUMNS_Y_OFFSET,
                    x_step: X_NODE_SEPARATION,
                    y_step: Y_NODE_SEPARATION,
                    num_columns: number_columns,
                    node_count: post_count
                };
                var post_positions = LabelPositions.upLeftRowColumnPositions(post_space, VERTICAL_STAGGER)


                var sorted_labels = Object.keys(sorted_nodes)
                for (let sorted_label of sorted_labels) {
                    var a_node = sorted_nodes[sorted_label];
                    if (a_node.node_type == 'L_AUTHOR_POST') {            //  if not static then ==this.node_type
                        var x_y = post_positions.pop();
                        a_node.setPosition2(x_y);
                    }
                }


            }
            return sorted_nodes;

        }




        constructor(node_id, db_version, post_title, sorted_label, post_slug, strip_author) {


            super(node_id, db_version, post_title, sorted_label);
            this.post_slug = post_slug;
            this.strip_author = strip_author;
            this.node_type = 'L_AUTHOR_POST';

            this.goto_url = media_constants.POST_LINK + post_slug;
 this.sorted_label = post_slug;
        }




        static arrayObjectCount(object_array) {
            return super.arrayObjectCount(object_array, 'PostData')

        }



    }
    return PostData;

}



