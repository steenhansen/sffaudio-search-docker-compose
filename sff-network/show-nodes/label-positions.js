


///// mediaPositions instead !!!!!!!!!

//   nodeDisplay nodeCanvas
class LabelPositions {

    constructor(graph_width, graph_height) {
        this.graph_width = graph_width
        this.graph_height = graph_height
        this.middle_width = graph_width / 2
        this.middle_height = graph_height / 2
       
       
    
    }




  static   downRightRowColumnPositions(node_space, vert_stagger = 0) {
        let {start_x, start_y, x_step, y_step, num_columns, node_count} = node_space
        
        var x_ys = [];
        var current_x = start_x;
        var current_y = start_y;
        var current_column = 0;
        var rotate_start_row = 0
        while (true) {

            var row_stagger = 0
            do {
                var cur_staggard_y = current_y + row_stagger
                var next_position = {x: current_x, y: cur_staggard_y};
                x_ys.push(next_position);
                node_count--
                if (node_count === 0) {
                    return x_ys;
                }
                current_column++;
                current_x += x_step;
                row_stagger += vert_stagger;
            } while (current_column < num_columns)
            rotate_start_row += (num_columns - 2)
            if (rotate_start_row > num_columns) {
                rotate_start_row -= num_columns
            }

            current_x = start_x;
            current_y += y_step;
            current_column = 0;
        }

    }

    static upLeftRowColumnPositions(node_space, vert_stagger = 0) {
        let {start_x, start_y, x_step, y_step, num_columns, node_count} = node_space
        var x_ys = [];
        var right_most = start_x + (num_columns - 1) * x_step;
        var current_x = right_most;
        var current_y = start_y;
        var current_column = num_columns;
          var rotate_start_row = 0;
        while (true) {
            var row_stagger = 0
            do {
                var cur_staggard_y = current_y + row_stagger
                var next_position = {x: current_x, y: cur_staggard_y};
                x_ys.push(next_position);
                node_count--
                if (node_count === 0) {
                    return x_ys;
                }
                current_column--;
                current_x -= x_step;
                  row_stagger -= vert_stagger;
            } while (current_column > 0)
            
             rotate_start_row += (num_columns - 2)
            if (rotate_start_row > num_columns) {
                rotate_start_row -= num_columns
            }
            
            current_x = right_most;
            current_y -= y_step;
            current_column = num_columns;
        }
    }

    static labelCounts(nodes_string, label_type) {
        var type_count = 0
        for (let a_node of nodes_string) {
            var group_label = a_node.group;
            if (label_type == group_label) {
                type_count++;
            }
        }
        return type_count
    }


}

LabelPositions.TOP_COLUMNS_Y_OFFSET = 150
LabelPositions.BOTTOM_COLUMNS_Y_OFFSET = 150

LabelPositions.HORIZONTAL_COLUMNS = 5
LabelPositions.X_NODE_SEPARATION = 200
LabelPositions.Y_NODE_SEPARATION = 120
LabelPositions.VERTICAL_STAGGER = 30

module.exports = LabelPositions;
