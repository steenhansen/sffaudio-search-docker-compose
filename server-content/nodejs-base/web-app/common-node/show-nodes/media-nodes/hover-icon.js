// hover-icon


var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_icons = rootAppRequire('./common-node/html-pages/graph-icons');
var media_sizes = rootAppRequire('./common-node/show-nodes/media-nodes/media-sizes')

class HoverIcon {


    bookUrl() {
    }

    setAuthorPos() {
    }

    setAuthorWikiPos() {
    }


    constructor(id, db_version, node_label, sorted_label) {
        this.id = id;
        this.db_version = db_version;
        this.label = node_label;
        this.sorted_label = sorted_label;
    }

    static  numberColumns(author_post_nodes) {
        var number_nodes = Object.keys(author_post_nodes).length;
        var number_columns = Math.floor(Math.sqrt(number_nodes) + 1);
        return number_columns;
    }

    setSizesColor(page_type) {
        this.node_size = media_sizes[page_type]['NODE_SIZES'][this.node_type]
        var color = media_sizes[page_type]['FONT_COLORS'][this.node_type]
        var size = media_sizes[page_type]['FONT_SIZES'][this.node_type]
        this.font = {size, color};
    }

    setPosition2(x_y_pos) {
        let {x, y} = x_y_pos;
        this.x = x;
        this.y = y;
    }

    setGroupColor(color_index) {
        this.group = 'N' + this.node_type.substring(1);
    }

    static arrayObjectCount(object_array, my_instance_of) {
        var type_count = 0
        for (let sorted_label of Object.keys(object_array)) {
            var a_node = object_array[sorted_label];
            if (varType(a_node) == my_instance_of) {
                type_count++;
            }
        }
        return type_count
    }

    static authorIconColors() {
        let close_pdf = graph_icons.close_icon(graph_constants.PDF_COLOR);
        let close_rsd = graph_icons.close_icon(graph_constants.RSD_COLOR);
        let close_podcast = graph_icons.close_icon(graph_constants.PODCAST_COLOR);
        let close_post = graph_icons.close_icon(graph_constants.POST_COLOR);
        let google_icon = graph_icons.google_icon('none');
        let nothing_hover = graph_icons.google_icon('#ffffff');
        let fit_icon = graph_icons.fit_graph_shape('none');
        let fit_hover = graph_icons.fit_graph_shape('#ffffff');
        let icon_wikipedia = graph_icons.wikipedia_icon('none');
        let hover_wikipedia = graph_icons.wikipedia_icon('#ffffff');
        let icon_post = graph_icons.post_icon('none');
        let hover_post = graph_icons.post_icon('#ffffff');
        let icon_book_post = graph_icons.post_icon('none');
        let hover_book_post = graph_icons.post_icon('#ffffff');
        let icon_pdf = graph_icons.pdf_icon('none');
        let hover_pdf = graph_icons.pdf_icon('#ffffff');
        let icon_podcast = graph_icons.podcast_icon('none');
        let hover_podcast = graph_icons.podcast_icon('#ffffff');
        let icon_rsd_video = graph_icons.rsd_video('none');
        let hover_rsd_video = graph_icons.rsd_video('#ffffff');
        let icon_rsd_solid = graph_icons.rsd_icon('none');
        let hover_rsd_solid = graph_icons.rsd_icon('#ffffff');
        let icon_help = graph_icons.help_icon('#ffff00');
        let icon_book = graph_icons.book_icon('none');
        let hover_book = graph_icons.book_icon('#ffffff');
        
        let icon_db_down = graph_icons.db_down_icon('none');
        let hover_db_down = graph_icons.db_down_icon('#ffffff');
        
        
        let icon_author = graph_icons.author_icon('none');
        let hover_author = graph_icons.author_icon('#ffffff');
        let shape_zoom_out = graph_icons.zoom_out_shape('none');
        let shape_hover_zoom_out = graph_icons.zoom_out_shape('#ffffff');
        let shape_zoom_in = graph_icons.zoom_in_shape('none');
        let shape_hover_zoom_in = graph_icons.zoom_in_shape('#ffffff');
        let shape_arrow = graph_icons.arrow_icon('none');
        let shape_hover_arrow = graph_icons.arrow_icon('#ffffff');
        let shape_filter = graph_icons.filter_icon('none');
        let shape_hover_filter = graph_icons.filter_icon('#ffffff');
        const icons_string = `{ 
            I_HELP: ${icon_help},
    
    
       N_DB_DOWN: ${icon_db_down}, H_DB_DOWN: ${hover_db_down},
    
           I_CLOSE_PDF: ${ close_pdf},
           I_CLOSE_RSD: ${ close_rsd},
           I_CLOSE_PODCAST: ${ close_podcast},
           I_CLOSE_POST: ${ close_post},
       
            N_FIT: ${fit_icon}, H_FIT: ${fit_hover},
            N_GOOGLE: ${google_icon}, H_GOOGLE: ${nothing_hover},
            
            N_PDF: ${icon_pdf}, H_PDF: ${hover_pdf},
            N_PODCAST: ${icon_podcast},H_PODCAST: ${hover_podcast},
              
              N_RSD: ${icon_rsd_solid},   H_RSD: ${hover_rsd_solid},
              N_RSD_VIDEO: ${icon_rsd_video}, H_RSD_VIDEO: ${hover_rsd_video},
              
            N_AUTHOR_POST: ${icon_post}, H_AUTHOR_POST: ${hover_post},
            N_BOOK_POST: ${icon_book_post}, H_BOOK_POST: ${hover_book_post},
            
             N_AUTHOR: ${icon_author}, H_AUTHOR: ${hover_author},
            N_BOOK: ${icon_book},         H_BOOK: ${hover_book},     
    
            N_BOOK_WIKI: ${icon_wikipedia},H_BOOK_WIKI: ${hover_wikipedia},
            N_AUTHOR_WIKI: ${icon_wikipedia},H_AUTHOR_WIKI: ${hover_wikipedia},
     
              N_ZOOM_OUT: ${shape_zoom_out},H_ZOOM_OUT: ${shape_hover_zoom_out},
              N_ZOOM_IN: ${shape_zoom_in },H_ZOOM_IN: ${shape_hover_zoom_in},
            
              N_ARROW: ${shape_arrow },H_ARROW: ${shape_hover_arrow},
              N_FILTER: ${shape_filter },H_FILTER: ${shape_hover_filter},
            
            }`;
        return icons_string;
    }

}

module.exports = HoverIcon;
