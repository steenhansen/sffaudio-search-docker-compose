'use strict'




//var media_constants = rootAppRequire('common-node/graph-constants')
var google_sheets = rootAppRequire('common-node/google-sheets');

var base_schema = require('./base/baseSchema')


var podcast_schema = {
    media_index_field: 'episode number',
    item_schema: {
        "post id": Number,
        kind: String,
        "hh:mm:ss": String,
        participants: String,
        narrator: String,
        about: String,
        "post_link": String
    },

    google_media_tab: google_sheets.PODCAST_GOOGLE_DATA,
    google_variables_tab: google_sheets.PODCAST_GOOGLE_VARIABLES,


    rss_dir_name: 'podcast/',


    heading_vars: ['episode number', "post id", "publish date", 'kind', "file name", "hh:mm:ss", "byte size",
        "participants", "narrator", "about", "book title", "book author"],

    must_contain: {
        "episode number": "\\d+",
        "post id": "\\d+",
        "publish date": "\\d\\d\\d\\d-\\d+-\\d+ \\d+:\\d\\d",        // 2016-12-31 23:59
        "kind": "(audiobook|audiobook/readalong|new releases/recent arrivals|readalong|talk to|topic)",
        "file name": "sffaudiopodcast\\d\\d\\d\\.mp3$",
        "hh:mm:ss": "(\\d+:)?\\d\\d:\\d\\d",
        "byte size": "(\\d|,)+$",
        "participants": "",
        "narrator": "",
        "about": "",
        "book title": "",
        "book author": ""
    },
    contain_errors: {
        "episode number": "need a digit bigger than 1",
        "post id": "need a digit bigger than 1",
        "publish date": "need a date like 2016-12-31 23:59",
        "kind": "Audiobook OR Audiobook-Readalong OR New Releases-Recent Arrivals OR Readalong OR Talk To OR Topic",
        "file name": "need a valid filename like SFFaudioPodcast390.mp3",
        "hh:mm:ss": " need a valid time length like 0:59:59",
        "byte size": "need a valid byte size like 123,456,789",
        "participants": "",
        "narrator": "",
        "about": "",
        "book title": "",
        "book author": ""
    },
    media_type: 'audio/mpeg',


    tsv_variables: ['media_title', 'media_web_page', 'media_directory_url', 'media_description', 'media_copyright',
        'itunes_category', 'itunes_sub_category', 'itunes_explicit', 'itunes_image', 'itunes_name', 'itunes_email', 'itunes_description',
        'hours_offset', 'post_early_min_rss', 'post_link_prefix']

}

Object.assign(podcast_schema.item_schema, base_schema)

module.exports = podcast_schema



