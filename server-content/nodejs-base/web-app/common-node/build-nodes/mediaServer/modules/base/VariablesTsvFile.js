'use strict'

var VariablesTsvText = require('./VariablesTsvText')
var miscMethods = require('./miscMethods')

var media_constants = require('./MediaConstants')

var VariablesTsvFile = function (csv_parse, tsv_pathname, csv_parser_options) {
    this._tsv_pathname = tsv_pathname
    VariablesTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'VariablesTsvFile'
}

VariablesTsvFile.prototype = Object.create(VariablesTsvText.prototype)
VariablesTsvFile.prototype.constructor = VariablesTsvFile

VariablesTsvFile.prototype._getTsvText = function () {
    var self = this
    return miscMethods.readLocalFile(this._tsv_pathname)
        .then( function (local_file_data) {
            self._tsv_text = local_file_data
            return local_file_data
        })
        .catch(function (e) {
            miscMethods.serverError(e)
        })

}


module.exports = VariablesTsvFile
