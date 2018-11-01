// media-show




// maybe move to media-types????

var media_sizes = rootAppRequire('./sff-network/show-nodes/media-nodes/media-sizes')
var media_constants = rootAppRequire('sff-network/media-constants');

var svg_icons = rootAppRequire('./sff-network/html-pages/svg-icons');
var media_sizes = rootAppRequire('./sff-network/show-nodes/media-nodes/media-sizes')
let {ICON_COLORS}= media_sizes['L_AUTHOR'];

class MediaShow {


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

    setSizesColor(page_type) {     //L_AUTHOR L_BOOK
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
        this.group = this.node_type;
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

        let empty_set = svg_icons.no_such_author('pink');

        let no_such_book = svg_icons.no_such_book('#FFF933');


        let close_pdf = svg_icons.close_icon(media_constants.PDF_COLOR);
        let close_rsd = svg_icons.close_icon(media_constants.RSD_COLOR);
        let close_podcast = svg_icons.close_icon(media_constants.PODCAST_COLOR);
        let close_post = svg_icons.close_icon(media_constants.POST_COLOR);


        let icon_all_podcasts = svg_icons.allPodcasts(ICON_COLORS.L_AUTHOR_WIKI);
        let icon_all_pdfs = svg_icons.allPdfs(ICON_COLORS.L_AUTHOR_WIKI);

        let icon_all_rsds = svg_icons.allRsds(ICON_COLORS.L_AUTHOR_WIKI);


        let icon_wikipedia = svg_icons.wikipedia_icon(ICON_COLORS.L_AUTHOR_WIKI);
        let icon_author = svg_icons.author_icon(ICON_COLORS.L_AUTHOR);
        let icon_post = svg_icons.post_icon(ICON_COLORS.L_POST);

        let icon_book_post = svg_icons.post_icon(ICON_COLORS.L_POST);


        let icon_book = svg_icons.book_icon(ICON_COLORS.L_BOOK);
        let icon_pdf = svg_icons.pdf_icon(ICON_COLORS.L_PDF);
        let icon_podcast = svg_icons.podcast_icon(ICON_COLORS.L_PODCAST);

        let icon_rsd_solid = svg_icons.rsd_icon('#fffeff');  
  


        const icons_string = `{ 
    L_VERSION: ${empty_set},
    
    I_NO_BOOK: ${no_such_book},
    
       I_CLOSE_PDF: ${ close_pdf},
       I_CLOSE_RSD: ${ close_rsd},
       I_CLOSE_PODCAST: ${ close_podcast},
       I_CLOSE_POST: ${ close_post},
       

    
    
   L_PAGE_PODCASTS: ${ icon_all_podcasts},
   L_PAGE_PDFS: ${ icon_all_pdfs},
   L_PAGE_RSDS: ${ icon_all_rsds},
    
          L_PDF: ${icon_pdf},
            L_AUTHOR: ${icon_author},
            L_PODCAST: ${icon_podcast},
              
              L_RSD: ${icon_rsd_solid},
              
              
              
            L_POST: ${icon_post},
            L_BOOK_POST: ${icon_book_post},
            

    
            L_BOOK: ${icon_book},        
    
            L_BOOK_WIKI: ${icon_wikipedia},
            L_AUTHOR_WIKI: ${icon_wikipedia},
     
            
            
            }`;



        return icons_string;
    }


}

module.exports = MediaShow;
