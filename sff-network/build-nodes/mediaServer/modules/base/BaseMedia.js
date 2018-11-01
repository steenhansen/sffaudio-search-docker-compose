'use strict'
/* @flow */



//var Promise = require('bluebird')          
var swig = require('swig')
var moment = require('moment-timezone')

var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')
var shared_methods = require('../../react/sharedMethods')


var BaseMedia = function (index_field/*:string*/, test_id_prefix/*:string*/, media_type) {
    this._index_field = index_field
    this._test_id_prefix = test_id_prefix
    this._media_type = media_type

    this._class_name = 'BaseMedia'
}

BaseMedia.prototype.dropCollection = function (itemsDb) {
    var the_collection = itemsDb.collection
    if (the_collection.collection) {       // stops UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): MongoError: ns not found
        the_collection.drop()              // NB blocks
    }
}

// this is called in Rsd/Podcast.splitVersions to get the byte size
BaseMedia.prototype.deriveSize = function (data_columns) {
    var byte_size_commas = data_columns['byte size']
    var byte_size_integer = byte_size_commas.replace(/,/g, "")
    data_columns['byte_size'] = byte_size_integer
    return data_columns
}


// IS CALLED IN VariablesTsvText   so that the found pdf file links can be used
//  ALL AT ONCE, NOT PIECEMEAL
BaseMedia.prototype.deriveFileNames = function (data_columns) {
    let file_name = data_columns["file name"]
    if (miscMethods.isUrlFileName(file_name)) {
        data_columns['mp3_url'] = file_name
    } else {
        data_columns['mp3_url'] = this._media_directory_url + file_name
    }
    return data_columns

}

// deriveDates
BaseMedia.prototype.deriveDate = function (data_columns, offset_minutes) {
    if ('publish date' in data_columns) {
        var media_publish_date = data_columns['publish date']
    } else {
        var media_publish_date = miscMethods.nowPublishDate(new Date())   // is this ever hit???
    }
    var media_publish_long = miscMethods.convertMediaPublishDate(media_publish_date)
    var itunes_pub_date = miscMethods.itunesPubDate(media_publish_long)
    data_columns['itunes_pubDate'] = itunes_pub_date
    var show_date = moment(data_columns['publish date'], "YYYY-MM-DD HH:mm")
    show_date.subtract(offset_minutes, 'minutes')
    data_columns['publish date'] = show_date.format("YYYY-MM-DD HH:mm")
    return data_columns
}


BaseMedia.prototype.splitVersions = function (media_rows/*:Array<MediaRows>*/) {
    return media_rows
}

BaseMedia.prototype.databaseItem = function () {
    return new Error("BaseMedia.prototype.databaseItem is abstract")
}

BaseMedia.prototype.rssItems = function (data_rows, item_template_file) {
    var swig_item_template = swig.compileFile(item_template_file)
    var rsd_items_html = ''
    var rsd_episode_digits = 0
    for (var the_row of data_rows) {
        if (rsd_episode_digits === 0) {
            var first_id = the_row['episode number']
            rsd_episode_digits = shared_methods.sizeOfLargestId(first_id)
        }
        var template_vars = this._itemTemplateVars(the_row, rsd_episode_digits)
        var item_html = swig_item_template(template_vars)
        rsd_items_html += item_html
    }
    return rsd_items_html
}

BaseMedia.prototype.rssFeed = function (data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary, rss_episodes_range, host_url) {
    for (const index in data_rows) {
        const episode_number = data_rows[index]["episode number"]
        if (episode_number < rss_episodes_range) {
            data_rows.splice(index, 1)
        }
    }
    var rss_items_html = this.rssItems(data_rows, item_template)
    var swig_page_template = swig.compileFile(page_template_file)
    var template_vars = this._pageTemplateVars(rss_items_html, tsv_variable_information, itunes_summary, host_url)
    var page_html = swig_page_template(template_vars)
    return page_html
}

BaseMedia.prototype.collectionAsString_test = function (itemsDb) {
    var collection_promise = itemsDb.collection.find({}).sort({'episode number': -1}).toArray()
    return collection_promise
        .then(function (collection_arr) {
            var number_rows = collection_arr.length
            var my_str = ''
            for (var i = 0; i < number_rows; i++) {
                my_str += JSON.stringify(collection_arr[i], null, "\t")
            }
            return Promise.resolve(my_str)
        })
}

BaseMedia.prototype.getDocument = function (itemsDb, document_id/*:string*/, field_id/*:string*/, real_or_test/*:string*/) {
    if (media_constants.TEST_DATA === real_or_test) {
        var the_document_id = this._test_id_prefix + document_id
    } else {
        var the_document_id = document_id
    }
    return itemsDb.findOneAsync({_id: the_document_id})
        .then(function (data) {
            if (data === null) {
                let mongo_error = document_id + '.' + field_id + '.' + real_or_test + ' does not exist in Mongo db'
                throw new Error(mongo_error)
            }
            if (media_constants.ENTIRE_DOCUMENT === field_id) {
                var data_value = data
            } else {
                var data_value = data[field_id]
            }
            return Promise.resolve(data_value)
        })
}

BaseMedia.prototype.deleteItems = function (itemsDb, real_or_test/*:string*/) {
    var realOrTest_indexKeyExists = {real_or_test: real_or_test}
    realOrTest_indexKeyExists[this._index_field] = {$exists: true}
    return itemsDb.removeAsync(realOrTest_indexKeyExists)
}

BaseMedia.prototype.deleteDocument = function (general_db, document_name/*:string*/, real_or_test/*:string*/) {
    if (real_or_test === media_constants.TEST_DATA) {
        var document_name_remove = this._test_id_prefix + document_name
    } else {
        var document_name_remove = document_name
    }
    return general_db.removeAsync({_id: document_name_remove, real_or_test: real_or_test})     // general_db
}

BaseMedia.prototype.saveDocument = function (document_name, variable_name, the_value, real_or_test) {
    if (media_constants.TEST_DATA === real_or_test) {
        var description_columns = {_id: this._test_id_prefix + document_name, real_or_test: real_or_test}
    } else {
        var description_columns = {_id: document_name, real_or_test: real_or_test}
    }
    description_columns[variable_name] = the_value
    var media_db = this.databaseItem(description_columns)
    if (media_db instanceof Error) {
        return Promise.reject(media_db)
    }
    return media_db.save()
}

BaseMedia.prototype.saveItem = function (data_columns, real_or_test/*:string*/, derived_columns) {
    //throw new Error ('exception test - BaseMedia.prototype.saveItem -1') 
    if (typeof derived_columns === 'undefined') {
        derived_columns = this.deriveData(data_columns)
    }
    //data_columns ='exception test - BaseMedia.prototype.saveItem -2'       
    if ((data_columns instanceof Array) || (!(data_columns instanceof Object))) {
        throw new Error("data_columns not object")
    }
    if (media_constants.TEST_DATA === real_or_test) {
        data_columns._id = this._test_id_prefix + data_columns[this._index_field]
    } else {
        data_columns._id = data_columns[this._index_field]
    }
    data_columns.real_or_test = real_or_test
    //derived_columns = new Error("exception test - BaseMedia.prototype.saveItem -3")     
    if (derived_columns instanceof Error) {
        throw derived_columns
    }
    var restful_db = this.databaseItem(derived_columns)
     //   var restful_db = this.databaseItem('exception test - BaseMedia.prototype.saveItem - 4')  
    if (restful_db instanceof Error) {
        throw restful_db
    }
    return restful_db.save()
}

BaseMedia.prototype.upsertDocument = function (itemsDb, document_name, variable_name, the_value, real_or_test/*:string*/) {
    var self = this
    return this.deleteDocument(document_name, real_or_test)
        .then(function () {
            //  throw new Error ('exception test - BaseMedia.prototype.upsertDocument')
            return self.saveDocument(document_name, variable_name, the_value, real_or_test)
        })
        .catch(function (e) {
            throw e
        })
}


BaseMedia.prototype._pageTemplateVars = function (media_items_html, tsv_variable_information, itunes_summary, host_url) {
    var page_template_vars = {
        rssItem_html: media_items_html,

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
        itunes_summary: itunes_summary,
        
        host_url: host_url
    }
    return page_template_vars
}

BaseMedia.prototype.playerTemplateVars = function (data_row) {
    var number_bytes = data_row['byte_size']
    var number_mbs = Math.floor(number_bytes / 1000000)
    var id_3_digits = shared_methods.leadingZerosDigits(3, data_row['_id'])
    var player_template_vars = {
        rsd_id: data_row['_id'],
        id_3_digits: id_3_digits,
        mp3_url: data_row.mp3_url,
        podcast_description: data_row['podcast description'],
        book_title: data_row['book title'],
        book_author: data_row['book author'],
        hh_mm_ss_length: data_row['hh:mm:ss'],
        mb_size: number_mbs
    }
    return player_template_vars
}


BaseMedia.prototype.currentList = function (max_records, media_items_db) {
    var now_yyyy_mm_dd_hh_mm = miscMethods.serverYYYYMMDDHHmm()
    let rss_record_start_y = media_constants.PDF_RSS_EPISODE_RANGE
    var valid_episodes = {
        "episode number": {$exists: true, $lt: rss_record_start_y},
        "real_or_test": "real",
        "publish date": {$lt: now_yyyy_mm_dd_hh_mm}
    }
    if (max_records > 0) {
        var collection_promise = media_items_db.collection.find(valid_episodes).sort({'episode number': -1}).limit(max_records).toArray()
    } else {
        var collection_promise = media_items_db.collection.find(valid_episodes).sort({'episode number': -1}).toArray()
    }
    return collection_promise
}


module.exports = BaseMedia
