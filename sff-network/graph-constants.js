'use strict'

const the_colors = ["red", "#666600", "olive", "green", "blue", "indigo", "violet"]

if (process.env.PORT == 5000) {
    var node_url = "http://localhost:" + process.env.PORT + "/"
} else {
    var node_url = "https://sffaudio-search.herokuapp.com/"
}


var erase_cache = 'erase-cache';

const rotate_colors = the_colors.concat(the_colors);

var graph_constants = {
  DARK_BACKGROUND: '#AED6F1',              //'grey',        
                                LIGHT_BACKGROUND: '#D6EAF8',         //  '#cccccc',
    FETCH_WAIT_M_SEC: 10000,       
    FETCH_RETRYS: 3,          
    GIF_LOADING: "data:image/gif;base64,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",
    
    
    MOBILE_START_END : '<!-- start and end widget,  NB, this text is used by PHP -->',
    
    MINIFYING_JS : 0,                   /// FireFox gives TypeError: t is undefined, but others are fine so quit using 

    JOIN_BOOK_AUTHOR: '**',
        CIRCLE_BUFFER_SIZE: 100,     // 0==10%memory

    UNRESPONSIVE_DB_NAME : "_unresponsive_db_",
    
    MAX_ZOOM: 2,
    MIN_ZOOM: 0.25,
    ZOOM_STEP: 0.1,
    NODES_IN_ROWS: 10,
    END_AUTHOR_LIST: '__',
    END_BOOK_LIST: '..',
    AUTHOR_BOOK_SEPARATOR: '::',
    URL_SEPARATOR: '-',         // __ is for last char of author id, .. is for last char of book id, :: is for author::book
    AUTHOR_PAGE_TYPE: 'AUTHOR_PAGE',
    BOOK_PAGE_TYPE: 'BOOK_PAGE',
    PDF_COLOR: '#FF0101',
    RSD_COLOR: '#0101FF',
    PODCAST_COLOR: '#01FF01',
    POST_COLOR: "#019CCD",
    WIKI_COLOR: '#FF7F01',
    
        HELP_FONT :   " {size: 16, color: '#5F4C0B' }" ,
			    ERROR_FONT :  "{size: 16, color: '#DF0101' }",
    
    EDGE_OPTIONS: {
        edges: {
            chosen: {edge: false},
            color: { color: 'darkgray',
                     hover: 'darkgray',
                     opacity: 1.0 },
            hoverWidth: 1,
            selectionWidth: 1,
            width: 1,
        },
        interaction: {
            hover: true,
            hoverConnectedEdges: false,
            //tooltipDelay:1234
        }
    },
    GRAPH_CONTAINER_ID: 'my--graph',
    WITH_REGEX: new RegExp(' with | and ', 'i'),
    NEO4J_VERSION: 'v1',
    DELETE_UNUSED_RECORDS: 20000,
    NO_RECORD_LIMIT: 'NO_RECORD_LIMIT',

   
    MINIFY_CSS_TABLE: {
        book__article___b__a: ['book__article','b__a'],
        book__rest___b__r: ['book__rest', 'b__r'],
        book__choice___b__c: ['book__choice', 'b__c'],


        author__choice___a__c: ['author__choice', 'a__c'],
        auth__first___a__f: ['auth__first', 'a__f'],
        auth__last___a__l: ['auth__last', 'a__l'],
        auth__mid___a__m: ['auth__mid', 'a__m']


    },

    
                              
   
    THE_COLORS: rotate_colors,
    ROOT_CAPTION: 'All',
    BOOK_AUTHOR_DELIMITER: '^',
    MEDIA_LINK_DIR: "https://www.sffaudio.com/podcasts/",
    WP_SHORT_POST: "https://www.sffaudio.com/?p=",
    ROUTE_POST_PROXY: '/post-proxy',
    
    ROUTE_WAKE_UP: '/wake-up',

    HEROKU_URL: node_url,                      //"https://sffaudio-search.herokuapp.com/",
    ERASE_CACHES_URL: node_url + erase_cache,
    
    ROUTE_ERASE_CACHES: '/' + erase_cache,         //'/erase-cache',



CACHES_ARE_CLEAR: '-Caches-are-clear-',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd
    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409",    // test pdf
    POST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1C18lpo5-Dj4G0tGfq1AlodPcM4AX_6ITUL3mjsTQ3b0/export?format=tsv",
    QUALITY_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1N2_v3MXhlOz-jxkWVcIVsMPNKqKkTS7POS26SBzxqP0/export?format=tsv"
}

module.exports = graph_constants





