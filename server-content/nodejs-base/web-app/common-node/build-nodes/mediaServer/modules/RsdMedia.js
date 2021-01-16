'use strict'

var shared_methods = require('../react/sharedMethods')
//var media_constants = require('./base/mediaConstants')
var media_constants = require('./base/MediaConstants')

var BaseMedia = require('./base/BaseMedia')
var rsd_items_db = require('../models/rsdItemsDb')

if (rsd_items_db.modelName !== 'RsdItems') {
    throw('RsdItems <> ' + rsd_items_db.modelName)
}

var RsdMedia = function (index_field, test_id_prefix, media_type) {
    BaseMedia.call(this, index_field, test_id_prefix, media_type)
    this._class_name = 'RsdMedia'
}

RsdMedia.prototype = Object.create(BaseMedia.prototype)
RsdMedia.prototype.constructor = RsdMedia

RsdMedia.prototype.rssFeed = function (data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, host_url) {
const rss_episodes_range = media_constants.RSD_RSS_EPISODE_RANGE
    return BaseMedia.prototype.rssFeed.call(this, data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, rss_episodes_range, host_url)
}

RsdMedia.prototype.saveXmlRss = function (rss_xml, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, rsd_items_db, 'rss_document', 'all_rss_xml', rss_xml, real_or_test)
}

RsdMedia.prototype.getDocument = function (document_id, field_id, real_or_test) {
    return BaseMedia.prototype.getDocument.call(this, rsd_items_db, document_id, field_id, real_or_test)
}

RsdMedia.prototype.dropCollection = function () {
    BaseMedia.prototype.dropCollection.call(this, rsd_items_db)
}

RsdMedia.prototype.collectionAsString_test = function () {
    return BaseMedia.prototype.collectionAsString_test.call(this, rsd_items_db)
}

RsdMedia.prototype.deleteItems = function (real_or_test) {
    return BaseMedia.prototype.deleteItems.call(this, rsd_items_db, real_or_test)
}

RsdMedia.prototype.deleteDocument = function (document_name, real_or_test/*:string*/) {
    return BaseMedia.prototype.deleteDocument.call(this, rsd_items_db, document_name, real_or_test)
}


RsdMedia.prototype.upsertDocument = function (document_name, variable_name, the_value, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, rsd_items_db, document_name, variable_name, the_value, real_or_test)
}






RsdMedia.prototype.saveDescription = function (description_text, real_or_test) {
    return BaseMedia.prototype.saveDescription.call(this, rsd_items_db, description_text, real_or_test)
}

RsdMedia.prototype.getTsvVariables = function (tsv_variable_information) {
    this._media_directory_url = tsv_variable_information.media_directory_url
}


RsdMedia.prototype.databaseItem = function (data_columns) {
    return rsd_items_db.mediaFactory(data_columns)
}

RsdMedia.prototype.deriveData = function (data_columns, offset_minutes) {
       var data_sized = BaseMedia.prototype.deriveSize.call(this, data_columns)
       var data_filed = BaseMedia.prototype.deriveFileNames.call(this, data_sized)
       var data_dated = BaseMedia.prototype.deriveDate.call(this, data_filed, offset_minutes)
        return data_dated
}
RsdMedia.prototype.splitVersions = function (data_rows_compact, offset_minutes, tsv_variables) {
    for (const row_index in data_rows_compact) {
        var start_row = data_rows_compact[row_index]
        var data_derived = this.deriveData(start_row, offset_minutes, tsv_variables)
        data_rows_compact[row_index] = data_derived
    }
    return data_rows_compact
}



RsdMedia.prototype._itemTemplateVars = function (data_row, rsd_episode_digits) {
    var episode_number = data_row['episode number']
    var episode_digit = shared_methods.leadingZerosDigits(rsd_episode_digits, episode_number)
    var item_template_vars = {
        media_item_title: episode_digit + ' ' + data_row['book title'] + ' by ' + data_row['book author'],
        media_item_link: data_row['mp3_url'],
        media_item_description: data_row['podcast description'],
            episode_number: episode_number,
        media_byte_size: data_row['byte_size'],
        media_post_link: data_row['post link'],
        itunes_pubDate: data_row['itunes_pubDate'],
        publish_date: data_row['publish date'],
        item_duration: data_row['hh:mm:ss'],
        media_type: this._media_type
    }
    return item_template_vars
}

RsdMedia.prototype._pageTemplateVars = function (rsd_items_html, tsv_variable_information, itunes_summary, host_url) {
    return BaseMedia.prototype._pageTemplateVars.call(this, rsd_items_html, tsv_variable_information, itunes_summary, host_url)
}

RsdMedia.prototype.playerTemplateVars = function (data_row) {
    return BaseMedia.prototype.playerTemplateVars.call(this, data_row)
}

RsdMedia.prototype.currentList = function (max_records) {
    return BaseMedia.prototype.currentList.call(this, max_records, rsd_items_db)
}

module.exports = RsdMedia
