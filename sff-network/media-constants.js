'use strict'


// THIS NAME IS CLASHING WITH 
// var media_constnats = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/media-constants');


// this should be like constants.js

const the_colors =["red", "#666600", "olive", "green", "blue", "indigo", "violet" ]



const rotate_colors = the_colors.concat(the_colors);

// local 26 records config


var media_constants = {

	
//DOWNLOADS
    PDF_COLOR : '#FF0101',
    RSD_COLOR : '#0101FF',
    PODCAST_COLOR: '#01FF01',
    
    
    POST_COLOR:"#019CCD",
    WIKI_COLOR: '#FF7F01',
    
    // sff_vars.graph_vars.edge_options
    EDGE_OPTIONS: {
    edges: {
        color: {
            color: 'darkgray',
            highlight: 'dimgray',
            opacity: 1.0
        },
       selectionWidth: 1,
        width: 1,
    }
},
    
    
    WITH_REGEX : new RegExp(' with | and ', 'i'),

	NEO4J_VERSION : 'v1',
	
	
    QUALITY_BOOKS: [ [  'The Eyes Have It', 'Philip K. Dick'],
    [  'Altered Carbon', 'Richard K. Morgan']],              // '  of_withered_apples   altered_carbon', 'progeny'],
    QUALITY_AUTHORS: [ 'Philip K. Dick', 'Ray Bradbury'],        //'ray_bradbury', 'george_rr_martin'],
	
	
	DELETE_UNUSED_RECORDS: 10000,
	
	NO_RECORD_LIMIT : 'NO_RECORD_LIMIT',


    GRAPH_BACKGROUND: 'grey',
 THE_COLORS:rotate_colors,
    ROOT_CAPTION: 'All',

    BOOK_AUTHOR_DELIMITER : '^',

	POST_LINK: "http://www.sffaudio.com/", 

	MEDIA_LINK_DIR: "https://www.sffaudio.com/podcasts/", 
	PODCAST_LINK: "https://www.sffaudio.com/?p=", 



  RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",   
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
                            
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",          
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409",    // test pdf
    
    POST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1C18lpo5-Dj4G0tGfq1AlodPcM4AX_6ITUL3mjsTQ3b0/export?format=tsv"
    



}
module.exports = media_constants





