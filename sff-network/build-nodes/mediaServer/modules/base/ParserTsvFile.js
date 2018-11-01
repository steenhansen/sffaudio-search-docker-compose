'use strict'


var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')

var ParserTsvFile = function (csv_parse, tsv_pathname, csv_parser_options) {
    this._tsv_pathname = tsv_pathname
    ParserTsvText.call(this, csv_parse, ParserTsvText.call, csv_parser_options)
    this._class_name = 'ParserTsvFile'
}

ParserTsvFile.prototype = Object.create(ParserTsvText.prototype)
ParserTsvFile.prototype.constructor = ParserTsvFile

ParserTsvFile.prototype._getTsvText = function () {
    var self = this
    return miscMethods.readLocalFile(this._tsv_pathname)
        .then(function (local_file_data) {
            self._tsv_text = local_file_data
            return local_file_data
        })
        .catch(function (e) {
            miscMethods.serverError(e)
        })
}


module.exports = ParserTsvFile
