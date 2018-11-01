'use strict'

var shared_methods = require('../react/sharedMethods')

var media_constants = require('./base/MediaConstants')
var BaseMedia = require('./base/BaseMedia')


if (podcast_items_db.modelName !== 'PodcastItems') {
    throw('PodcastItems <> ' + podcast_items_db.modelName)
}

var PodcastMedia = function (index_field, test_id_prefix, media_type) {
    BaseMedia.call(this, index_field, test_id_prefix, media_type)
    this._class_name = 'PodcastMedia'
}

PodcastMedia.prototype = Object.create(BaseMedia.prototype)
PodcastMedia.prototype.constructor = PodcastMedia

PodcastMedia.prototype.rssFeed = function (data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, host_url) {
const rss_episodes_range = media_constants.PODCAST_RSS_EPISODE_RANGE
    return BaseMedia.prototype.rssFeed.call(this, data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, rss_episodes_range, host_url)
}

PodcastMedia.prototype.saveXmlRss = function (rss_xml, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, podcast_items_db, 'rss_document', 'all_rss_xml', rss_xml, real_or_test)
}

PodcastMedia.prototype.getDocument = function (document_id, field_id, real_or_test) {
    return BaseMedia.prototype.getDocument.call(this, podcast_items_db, document_id, field_id, real_or_test)
}

PodcastMedia.prototype.dropCollection = function () {
    BaseMedia.prototype.dropCollection.call(this, podcast_items_db)
}

PodcastMedia.prototype.collectionAsString_test = function () {
    return BaseMedia.prototype.collectionAsString_test.call(this, podcast_items_db)
}

PodcastMedia.prototype.deleteItems = function (real_or_test) {
    return BaseMedia.prototype.deleteItems.call(this, podcast_items_db, real_or_test)
}

PodcastMedia.prototype.deleteDocument = function (document_name, real_or_test/*:string*/) {
    return BaseMedia.prototype.deleteDocument.call(this, podcast_items_db, document_name, real_or_test)
}


PodcastMedia.prototype.upsertDocument = function (document_name, variable_name, the_value, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, podcast_items_db, document_name, variable_name, the_value, real_or_test)
}


PodcastMedia.prototype.saveDescription = function (description_text, real_or_test) {
    return BaseMedia.prototype.saveDescription.call(this, podcast_items_db, description_text, real_or_test)
}

PodcastMedia.prototype.getTsvVariables = function (tsv_variable_information) {
    this._media_directory_url = tsv_variable_information.media_directory_url
}


PodcastMedia.prototype.databaseItem = function (data_columns) {
    return podcast_items_db.mediaFactory(data_columns)
}


PodcastMedia.prototype.deriveData = function (data_columns, offset_minutes, tsv_variables) {



    var data_sized = BaseMedia.prototype.deriveSize.call(this, data_columns)
     var data_filed = BaseMedia.prototype.deriveFileNames.call(this, data_sized)
    
  var data_dated = BaseMedia.prototype.deriveDate.call(this, data_filed, offset_minutes)
    data_dated['post_link'] = tsv_variables.post_link_prefix + data_dated['post id']
    return data_dated
}
PodcastMedia.prototype.splitVersions = function (data_rows_compact, offset_minutes, tsv_variables) {
    for (const row_index in data_rows_compact) {
        var start_row = data_rows_compact[row_index]
        var data_derived = this.deriveData(start_row, offset_minutes, tsv_variables)
        data_rows_compact[row_index] = data_derived
    }
    return data_rows_compact
}



PodcastMedia.prototype._itemTemplateVars = function (data_row, podcast_episode_digits) {
    var episode_number = data_row['episode number']
    var episode_digit = shared_methods.leadingZerosDigits(podcast_episode_digits, episode_number)
    var kind = data_row['kind']
    let lower_kind = kind.toLowerCase()
    var media_title = episode_digit + ' ' + kind + ' '
    var book_by = data_row['book title'] + ' by ' + data_row['book author']
    switch (lower_kind) {
        case "audiobook":
            media_title = media_title + book_by
            break
        case "audiobook/readalong":
            media_title = media_title + book_by
            break
        case "new releases/recent arrivals":
            break
        case "readalong":
            media_title = media_title + book_by
            break
        case "talk to":
            media_title = media_title + data_row['about']
            break
        case "topic":
            media_title = media_title + data_row['about']
            break
        default:
            console.log("unknown podcast type")
    }
    var item_template_vars = {
        media_item_title: media_title,
        media_item_link: data_row['mp3_url'],
        media_item_description: data_row['podcast description'],
           episode_number: episode_number,
        media_byte_size: data_row['byte_size'],
        media_post_link: data_row['post_link'],
        itunes_pubDate: data_row['itunes_pubDate'],
        publish_date: data_row['publish date'],
        item_duration: data_row['hh:mm:ss'],
        media_type: this._media_type
    }
    return item_template_vars
}

PodcastMedia.prototype._pageTemplateVars = function (rsd_items_html, tsv_variable_information, itunes_summary) {
    return BaseMedia.prototype._pageTemplateVars.call(this, rsd_items_html, tsv_variable_information, itunes_summary)
}

PodcastMedia.prototype.playerTemplateVars = function (data_row) {
    return BaseMedia.prototype.playerTemplateVars.call(this, data_row)
}

PodcastMedia.prototype.currentList = function (max_records) {
    return BaseMedia.prototype.currentList.call(this, max_records, podcast_items_db)
}

module.exports = PodcastMedia
