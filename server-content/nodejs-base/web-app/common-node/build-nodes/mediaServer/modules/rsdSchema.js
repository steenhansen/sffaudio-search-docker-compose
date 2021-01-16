'use strict'

// move up to models !!!

//var media_constants = rootAppRequire('common-node/graph-constants')
var google_sheets = rootAppRequire('common-node/google-sheets');
var base_schema = require('./base/baseSchema')


var rsd_schema = {
    media_index_field: 'episode number',
    item_schema: {
     
        "post link": String,
   
        "hh:mm:ss": String,
        "podcast participants": String,
        "genre type": String,
        "pdf link": String,
        "video link": String,
        "podcast description": String
    },

    google_media_tab: google_sheets.RSD_GOOGLE_DATA,
    google_variables_tab: google_sheets.RSD_GOOGLE_VARIABLES,


    rss_dir_name: 'rsd/',

    heading_vars: ['episode number', "publish date", 'post link', "file name", "hh:mm:ss", "byte size",
        "podcast participants", "book title", "book author", "genre type", "pdf link", "video link", "podcast description"],

    must_contain: {
        "episode number": "\\d+",
        "publish date": "\\d\\d\\d\\d-\\d+-\\d+ \\d+:\\d\\d",        // 2016-12-31 23:59
        "post link": "https?:\\/\\/(www\\.)?sffaudio\\.com\\/.+",
        "file name": "rsd\\d\\d\\d[^\\.]+\\.mp3$",
        "hh:mm:ss": "(\\d+:)?\\d\\d:\\d\\d",
        "byte size": "(\\d|,)+$",
        "podcast participants": ".{3,}",                  // at least 3 characters
        "book title": ".{3,}",
        "book author": ".{3,}",
        "genre type": "(poem|story|other)",
        "pdf link": "(^$|https?:\\/\\/(www\\.)?sffaudio\\.com\\/.+\\.pdf$)",
        "video link": "(^$|https?:\\/\\/.+)",
        "podcast description": ".{3,}"
    },
    contain_errors: {
        "episode number": "need a digit bigger than 1",
        "publish date": "need a date like 2016-12-31 23:59",
        "post link": "need a valid link like http://www.sffaudio.com/reading-short-and-deep...",
        "file name": "need a valid filename like rsd123myStory.mp3",
        "hh:mm:ss": " need a valid time length like 0:59:59",
        "byte size": "need a valid byte size like 123,456,789",
        "podcast participants": "need participants",
        "book title": "need title",
        "book author": "need author",
        "genre type": "need genre type like Poem, Story, or Other",
        "pdf link": "need a valid pdf link like http://www.sffaudio.com/podcasts/TheWolfByGuyDeMaupassant.pdf",
        "video link": "need a valid video link like https://www.youtube.com/watch?v=tc6Xzxt_vig",
        "podcast description": "need description"
    },
    media_type: 'audio/mpeg',


    tsv_variables: ['media_title', 'media_web_page', 'media_directory_url', 'media_description', 'media_copyright',
        'itunes_category', 'itunes_sub_category', 'itunes_explicit', 'itunes_image', 'itunes_name', 'itunes_email', 'itunes_description',
        'hours_offset', 'post_early_min_rss']

}

Object.assign(rsd_schema.item_schema, base_schema)
module.exports = rsd_schema



