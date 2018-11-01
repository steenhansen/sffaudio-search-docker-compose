'use strict'

var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

var ParserTsvUrl = function (csv_parse, tsv_url, csv_parser_options) {
    if (tsv_url.indexOf('format=tsv') === -1) {
        var e = new Error("The Google link does not contain 'format=tsv' ")
        throw (e)
    }
    this._tsv_url = tsv_url
    ParserTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'ParserTsvUrl'
}

ParserTsvUrl.prototype = Object.create(ParserTsvText.prototype)
ParserTsvUrl.prototype.constructor = ParserTsvUrl

ParserTsvUrl.prototype._getTsvText = function () {
    var self = this
    return miscMethods.readUrlFile(this._tsv_url)
        .then(function (url_file_data) {
            self._tsv_text = url_file_data
            return url_file_data
        })
        .catch(function (e) {
            miscMethods.serverError(e)
        })
}


module.exports = ParserTsvUrl










