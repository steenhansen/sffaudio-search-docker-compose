'use strict'
/* @flow */


var VersionStorage = function (current_media/*:BaseMedia*/, media_description_text/*:string*/) {
    this._current_media = current_media
    this._media_description_text = media_description_text
    this._class_name = 'VersionStorage'
}

VersionStorage.prototype.saveNewVersion = function (media_rows/*:Array<MediaRows>*/, real_or_test/*:string*/) {
    var self = this
    return this._current_media.deleteItems(real_or_test)
        .then(function () {
            return self._current_media.deleteDocument('description', real_or_test)
        })
        .then(function () {
            return self._current_media.saveDocument('description', 'itunes_summary', self._media_description_text, real_or_test)
        })
        .then(function () {
            var promise_inserted_rows = self._insertRows(media_rows, real_or_test)
            return promise_inserted_rows
        })
        .then(
            function (promise_inserted_rows) {
                return promise_inserted_rows.length
            }
        )
        .catch(function (e) {
            throw e
        })
}

VersionStorage.prototype.rowsPromised = function (media_row, real_or_test/*:string*/) {
    return this._current_media.saveItem(media_row, real_or_test, media_row)
}

VersionStorage.prototype._insertRows = function (media_rows/*:Array<MediaRows>*/, real_or_test/*:string*/) {
    var promises_arr = []
    for (var i = media_rows.length - 1; i >= 0; i--) {
        var row_promise = this.rowsPromised(media_rows[i], real_or_test)
        promises_arr.push(row_promise)
    }
    return Promise.all(promises_arr)
}


module.exports = VersionStorage
