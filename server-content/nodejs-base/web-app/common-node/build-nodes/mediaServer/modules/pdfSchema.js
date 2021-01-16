'use strict'

//var media_constants = rootAppRequire('common-node/graph-constants')

var google_sheets = rootAppRequire('common-node/google-sheets');

var base_schema = require('./base/baseSchema')

var pdf_schema = {
    media_index_field: 'episode number',            // PUT INTO BASE SCHEMA
    item_schema: { 

        
         "page_count": Number,       // rss only 
         "publisher_info": String,   // rss only 
         "version_offset": String,  // rss only 
         "country_location": String,  // rss only 


        "story link on wikipedia": String,              // web
        "author wikipedia entry": String,       // web
        
        
        'pdf link 1':String,
         'pdf page count 1': Number,
          'pdf country 1': String,
           'pdf info 1': String,
        
        'pdf link 2':String,
         'pdf page count 2': Number,
          'pdf country 2': String,
           'pdf info 2': String,

        'pdf link 3':String,
         'pdf page count 3': Number,
          'pdf country 3': String,
           'pdf info 3': String,
           
                 'pdf link 4':String,
         'pdf page count 4': Number,
          'pdf country 4': String,
           'pdf info 4': String
    },

    google_media_tab: google_sheets.PDF_GOOGLE_DATA,
    google_variables_tab: google_sheets.PDF_GOOGLE_VARIABLES,


    rss_dir_name: 'pdf/',

    //rss_record_start : media_constants.RSS_RECORD_START_X,  // why not direct????
    heading_vars: ["episode number", "publish date", 'book title', 'book author', 
       'story link on wikipedia', 'author wikipedia entry',
        'pdf link 1', 'pdf page count 1', 'pdf country 1', 'pdf info 1',
        'pdf link 2', 'pdf page count 2', 'pdf country 2', 'pdf info 2',
        'pdf link 3', 'pdf page count 3', 'pdf country 3', 'pdf info 3',
        'pdf link 4', 'pdf page count 4', 'pdf country 4', 'pdf info 4',
      ],

    must_contain: {
        "episode number": "\\d+",
        "publish date": "\\d\\d\\d\\d-\\d+-\\d+ \\d+",        // 2016-12-31 23
        "book title": ".{2,}",
        "book author": ".{2,}",
        "pdf link 1": ".*",
        "pdf page count 1": "\\d+",
        "pdf info 1": ".*"
    },
    contain_errors: {
        "episode number": "a digit not bigger than 1",
        "publish date": " date like 2016-12-31 23 ",        // 2016-12-31 23
        "book title": "title",
        "book author": "author",
        "pdf link 1": "pdf link",
        "pdf page count 1": "page count",
        "pdf info 1": "info text"
    },
    media_type: 'application/pdf',
    
    // change if canadian pdfs, then link via long url !!!
    story_count: 0,
    pdfs_count: 0,
    
       tsv_variables: ['media_title', 'media_web_page', 'media_directory_url', 'media_description', 'media_copyright',
        'itunes_category', 'itunes_sub_category', 'itunes_explicit', 'itunes_image', 'itunes_name', 'itunes_email', 'itunes_description',
        'hours_offset', 'post_early_min_rss'],

}

//   http://www.sffaudio.com/podcasts/the-sffaudio-podcast/#/readalong/347
//   http://www.sffaudio.com/podcasts/SFFaudioPodcast350.mp3
//   https://www.jerkersearcher.com/sffaudio_podcasts/SFFaudioPodcast144.mp3

Object.assign(pdf_schema.item_schema, base_schema)
module.exports = pdf_schema




