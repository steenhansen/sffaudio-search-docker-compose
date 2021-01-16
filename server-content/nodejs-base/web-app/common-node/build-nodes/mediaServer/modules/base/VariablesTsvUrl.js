'use strict'

var VariablesTsvText = require('./VariablesTsvText')
var miscMethods = require('./miscMethods')

var media_constants = require('./MediaConstants')

var VariablesTsvUrl = function (csv_parse, tsv_url, csv_parser_options) {
    this._tsv_url = tsv_url
    VariablesTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'VariablesTsvUrl'
}

VariablesTsvUrl.prototype = Object.create(VariablesTsvText.prototype)
VariablesTsvUrl.prototype.constructor = VariablesTsvUrl

VariablesTsvUrl.prototype._getTsvText = function () {
    var self = this
    return miscMethods.readUrlFile(this._tsv_url)
        .then( function (local_file_data) {
            if (local_file_data.indexOf('text/javascript') > -1) {
                var e = new Error("Cannot read Google spreedsheet " + self._tsv_url)
                return e
            }
            self._tsv_text = local_file_data
            return local_file_data
        })
        .catch(function (e) {
            miscMethods.serverError(e)
        })

}

module.exports = VariablesTsvUrl
