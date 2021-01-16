'use strict'

var media_constants = require('./base/MediaConstants')

var BaseMedia = require('./base/BaseMedia')
var pdf_items_db = require('../models/pdfItemsDb')
var miscMethods = require('./base/miscMethods')

if (pdf_items_db.modelName !== 'PdfItems') {
    throw('PdfItems <> ' + pdf_items_db.modelName)
}

var PdfMedia = function (index_field, test_id_prefix, media_type) {
    BaseMedia.call(this, index_field, test_id_prefix, media_type)
    this._class_name = 'PdfMedia'
}

PdfMedia.prototype = Object.create(BaseMedia.prototype)
PdfMedia.prototype.constructor = PdfMedia

PdfMedia.prototype.rssFeed = function (data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, host_url) {
    const rss_episodes_range = media_constants.PDF_RSS_EPISODE_RANGE
    return BaseMedia.prototype.rssFeed.call(this, data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, rss_episodes_range, host_url)
}

PdfMedia.prototype.saveXmlRss = function (rss_xml, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, pdf_items_db, 'rss_document', 'all_rss_xml', rss_xml, real_or_test)
}

PdfMedia.prototype.getDocument = function (document_id, field_id, real_or_test) {
    return BaseMedia.prototype.getDocument.call(this, pdf_items_db, document_id, field_id, real_or_test)

}

PdfMedia.prototype.dropCollection = function () {
    BaseMedia.prototype.dropCollection.call(this, pdf_items_db)
}

PdfMedia.prototype.collectionAsString_test = function () {
    return BaseMedia.prototype.collectionAsString_test.call(this, pdf_items_db)
}

PdfMedia.prototype.deleteItems = function (real_or_test) {
    return BaseMedia.prototype.deleteItems.call(this, pdf_items_db, real_or_test)
}

PdfMedia.prototype.deleteDocument = function (document_name, real_or_test/*:string*/) {
    return BaseMedia.prototype.deleteDocument.call(this, pdf_items_db, document_name, real_or_test)
}

PdfMedia.prototype.saveDescription = function (description_text, real_or_test) {
    return BaseMedia.prototype.saveDescription.call(this, pdf_items_db, description_text, real_or_test)
}

PdfMedia.prototype.upsertDocument = function (document_name, variable_name, the_value, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, pdf_items_db, document_name, variable_name, the_value, real_or_test)
}


PdfMedia.prototype.getTsvVariables = function (tsv_variable_information) {
    this._media_directory_url = tsv_variable_information.media_directory_url
}


PdfMedia.prototype.databaseItem = function (data_columns) {
    var pdf_item = pdf_items_db.mediaFactory(data_columns)
    return pdf_item
}


PdfMedia.prototype._validVersion = function (data_columns, i) {
    if (data_columns["pdf link " + i] === '') {
        return false
    }
    if (data_columns["pdf page count " + i] === '') {
        return false
    }
    return true
}


PdfMedia.prototype.cleanPartials = function (base_columns) {
    base_columns["number_versions"] = 0
    for (var i = 1; i <= media_constants.PDF_MAX_LINKS; i++) {
        if (this._validVersion(base_columns, i)) {
            base_columns["number_versions"]++
        } else {
            // this should throw an error !!!      best we can do is have valid url, no page count --- NOp
            delete base_columns["pdf link " + i]
            delete base_columns["pdf page count " + i]
            delete base_columns["pdf info " + i]
            delete base_columns["pdf country " + i]
        }
    }
    return base_columns
}


PdfMedia.prototype.deleteAllVersions = function (base_columns) {
    delete base_columns["story link on wikipedia"]
    delete base_columns["author wikipedia entry"]
    for (var i = 1; i <= media_constants.PDF_MAX_LINKS; i++) {
        delete base_columns["pdf link " + i]
        delete base_columns["pdf page count " + i]
        delete base_columns["pdf info " + i]
        delete base_columns["pdf country " + i]
    }
    return base_columns
}


PdfMedia.prototype.splitVersions = function (data_rows_compact, offset_minutes, tsv_variables) {
    let rss_record_start_y = media_constants.PDF_RSS_EPISODE_RANGE
    var data_rows_versions = []
    for (const row_index in data_rows_compact) {
        var start_row = data_rows_compact[row_index]
        let cleaned_row = this.cleanPartials(start_row)

        for (var i = 1; i <= media_constants.PDF_MAX_LINKS; i++) {
            if (cleaned_row["pdf link " + i]) {
                var prototype_data_row = Object.assign({}, cleaned_row)
                prototype_data_row["file name"] = cleaned_row["pdf link " + i]
                prototype_data_row["page_count"] = prototype_data_row["pdf page count " + i]
                prototype_data_row["country_location"] = prototype_data_row["pdf country " + i]
                prototype_data_row["publisher_info"] = prototype_data_row["pdf info " + i]
                let alphabet_offset = String.fromCharCode(64 + i)
                prototype_data_row["episode number"] = rss_record_start_y + prototype_data_row["episode number"] * 10 + i
                prototype_data_row["version_offset"] = alphabet_offset
                let single_pdf = this.deleteAllVersions(prototype_data_row)
                let modified_row = this.deriveData(single_pdf, offset_minutes, tsv_variables)
                data_rows_versions.push(modified_row)
                cleaned_row["pdf link " + i] = modified_row["mp3_url"]
            }
        }
        data_rows_versions.push(cleaned_row)
    }
    return data_rows_versions
}

PdfMedia.prototype.deriveData = function (data_columns, offset_minutes, tsv_variables) {
    let file_name = data_columns["file name"]
    if (miscMethods.isUrlFileName(file_name)) {
        data_columns['mp3_url'] = file_name
    } else {
        if (data_columns.country_location.toLowerCase() === 'canada') {
            data_columns['mp3_url'] = tsv_variables.canadian_dir_url + file_name
        } else {
            data_columns['mp3_url'] = this._media_directory_url + file_name
        }
    }
    var base_columns = BaseMedia.prototype.deriveDate.call(this, data_columns)
    base_columns['byte size'] = 0
    base_columns['byte_size'] = 0
    return base_columns
}

PdfMedia.prototype._itemTemplateVars = function (data_row) {
    var large_episode_number = data_row['episode number']
    var pdf_author = data_row['book author']
    var pdf_title = data_row['book title']
    var pdf_pages = data_row['page_count']
    var publisher_info = data_row['publisher_info']
    var country_location = data_row['country_location']
    var pdf_url = data_row['mp3_url']
    if (publisher_info === '') {
        var pdf_description = pdf_pages + ' pages'
    } else {
        var pdf_description = pdf_pages + ' pages, ' + publisher_info
    }
    if (country_location !== '') {
        pdf_description += ', public domain in ' + country_location
    }
    let item_title = pdf_title + ' by ' + pdf_author
    if (data_row["number_versions"] > 1) {
        item_title += ', version ' + data_row["version_offset"]
    }
    var item_template_vars = {
        media_item_title: item_title,
        media_item_link: pdf_url,
        media_item_description: pdf_description,
        large_episode_number: large_episode_number,
        //  media_byte_size: 0,  /// http://www.rssboard.org/rss-profile#element-channel-item-enclosure  When an enclosure's size cannot be determined, a publisher SHOULD use a length of 0.
        media_post_link: pdf_url,
        media_byte_size: data_row['byte_size'],
        itunes_pubDate: data_row['itunes_pubDate'],
        publish_date: data_row['publish date'],

        media_type: this._media_type
    }
    return item_template_vars
}

PdfMedia.prototype._pageTemplateVars = function (rss_items_html, tsv_variable_information, itunes_summary) {
    var page_template_vars = {
        rssItem_html: rss_items_html,

        feed_media_link: tsv_variable_information.media_web_page,
        feed_media_title: tsv_variable_information.media_title,
        feed_media_description: tsv_variable_information.media_description,
        feed_media_copyright: tsv_variable_information.media_copyright,

        itunes_category: tsv_variable_information.itunes_category,
        itunes_sub_category: tsv_variable_information.itunes_sub_category,
        itunes_explicit: tsv_variable_information.itunes_explicit,
        itunes_image: tsv_variable_information.itunes_image,
        itunes_name: tsv_variable_information.itunes_name,
        itunes_email: tsv_variable_information.itunes_email,
        itunes_summary: itunes_summary
    }
    return page_template_vars
}

PdfMedia.prototype.playerTemplateVars = function () {
    throw new Error(' no such thing PdfMedia.prototype.playerTemplateVars ')
}


PdfMedia.prototype.currentList = function (max_records) {
    return BaseMedia.prototype.currentList.call(this, max_records, pdf_items_db)
}


BaseMedia.prototype.countPdfs = function () {
    let rss_record_start_y = media_constants.PDF_RSS_EPISODE_RANGE
    var valid_pdfs = {
        "episode number": {$exists: true, $gt: rss_record_start_y}
    }
    var count_pdfs = pdf_items_db.collection.find(valid_pdfs).count()         
    return count_pdfs

}


module.exports = PdfMedia
