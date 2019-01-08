'use strict'

const the_colors =["red", "#666600", "olive", "green", "blue", "indigo", "violet" ]



if (process.env.PORT==5000){
    var node_url = "http://localhost:" + process.env.PORT + "/"
}else {
   var node_url = "https://sffaudio-test-neo4j.herokuapp.com/"
}

const rotate_colors = the_colors.concat(the_colors);

// local 26 records config


var graph_constants = {

    MAX_ZOOM: 2,
    MIN_ZOOM: 0.25,
    ZOOM_STEP: 0.1, 

 END_AUTHOR_LIST : '__',
 END_BOOK_LIST : '..',
 AUTHOR_BOOK_SEPARATOR : '::',

    URL_SEPARATOR : '-',         // __ is for last char of author id, .. is for last char of book id, :: is for author::book

	AUTHOR_PAGE_TYPE : 'AUTHOR_PAGE',
	BOOK_PAGE_TYPE: 'BOOK_PAGE',


    PDF_COLOR : '#FF0101',
    RSD_COLOR : '#0101FF',
    PODCAST_COLOR: '#01FF01',
    
    
    POST_COLOR:"#019CCD",
    WIKI_COLOR: '#FF7F01',
    
    // sff_js_vars.graph_vars.edge_options         // network_options more better name
    EDGE_OPTIONS: {
    edges: {
        chosen:{edge: false},
        color: {
            color: 'darkgray',
            hover:'darkgray',
            opacity: 1.0
        },
        hoverWidth: 1,
       selectionWidth: 1,
        width: 1,
    },
     interaction:{
    hover:true,
    hoverConnectedEdges:false,
    //tooltipDelay:1234
    
    }
},
    
    GRAPH_CONTAINER_ID : 'my--graph',
    WITH_REGEX : new RegExp(' with | and ', 'i'),




	NEO4J_VERSION : 'v1',
	
	
    // QUALITY_BOOKS: [ [  'The Eyes Have It', 'Philip K. Dick'],
    // [  'Altered Carbon', 'Richard K. Morgan']],              // '  of_withered_apples   altered_carbon', 'progeny'],
    // QUALITY_AUTHORS: [ 'Philip K. Dick', 'Ray Bradbury'],        //'ray_bradbury', 'george_rr_martin'],
    //
	
	DELETE_UNUSED_RECORDS: 20000,
	
	NO_RECORD_LIMIT : 'NO_RECORD_LIMIT',


    GRAPH_BACKGROUND: 'grey',
 THE_COLORS:rotate_colors,
    ROOT_CAPTION: 'All',

    BOOK_AUTHOR_DELIMITER : '^',

//	POST_LINK: "http://www.sffaudio.com/", 
    HEROKU_URL: node_url,                      //"https://sffaudio-test-neo4j.herokuapp.com/",

	MEDIA_LINK_DIR: "https://www.sffaudio.com/podcasts/", 
	PODCAST_LINK: "https://www.sffaudio.com/?p=", 

    ROUTE_POST_PROXY : '/post-proxy',

//ROUTE_START_BOOK : '/author/book/',
// CONFIG_ENV_KEYS : ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'],

  RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",   
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
                            
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",          
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409",    // test pdf
    
    POST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1C18lpo5-Dj4G0tGfq1AlodPcM4AX_6ITUL3mjsTQ3b0/export?format=tsv",
    
    QUALITY_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1N2_v3MXhlOz-jxkWVcIVsMPNKqKkTS7POS26SBzxqP0/export?format=tsv"
}

//graph_constants.ROUTE_BOOK_JSON = graph_constants.ROUTE_START_BOOK + ':strip_author/:under_title';



module.exports = graph_constants





