'use strict'

var miscMethods = require('./miscMethods')

var ParserTsvText = function (csv_parse, tsv_text, csv_parser_options) {
    this._csv_parse = csv_parse
    this._tsv_text = tsv_text
    this._parser_options = csv_parser_options
    this._class_name = 'ParserTsvText'
}

ParserTsvText.prototype._firstRow = function (output_array) {
    //  output_array = 'exception test'
    if (output_array instanceof Array) {
        var output_first = output_array.slice(0, 1)
        var title_array = output_first.shift()
        var title_size = title_array.length
        for (var i = 0; i < title_size; i++) {
            var a_title = title_array[i]
            a_title = miscMethods.deleteBracketComments(a_title)
            a_title = a_title.trim()
            a_title = miscMethods.singleSpacesString(a_title)
            a_title = a_title.toLowerCase()
            title_array[i] = a_title
        }
        return title_array
    } else {
        throw new Error('exception test - ParserTsvText.prototype._firstRow')
    }
}


ParserTsvText.prototype.getTitles = function () {
    var self = this
    return new Promise(function (fulfill, reject) {
        self._csv_parse(self._tsv_text, self._parser_options, function (e, output_array) {
            if (e) {
                reject(e)
            }
            try {
                let first_line = output_array.slice(1, 2)
                let second_line = first_line.shift()
                let first_column = second_line.shift()
                if (first_column.startsWith('<!DOCTYPE html>')) {
                    e = new Error('HTML in download as permissions not given')
                    reject(e)
                }
                var title_array = self._firstRow(output_array)          
            } catch (e) {
                reject(e)
            }
            fulfill(title_array)

        })
    })
}


// [a,b]+[c,d] => [a->c, b->d]
ParserTsvText.prototype._arrayToObj = function (title_array, current_row) {
    var number_columns = title_array.length
    var hash_object = {}
    for (var i = 0; i < number_columns; i++) {
        var a_title = title_array[i]
        var a_data = current_row[i]
        var current_title = miscMethods.trimString(a_title)
        var current_data = miscMethods.trimString(a_data)
        hash_object[current_title] = current_data
    }
    return hash_object
}

ParserTsvText.prototype._dataRows = function (title_array, data_rows) {
    var number_rows = data_rows.length
    var new_array = []
    for (var i = 0; i < number_rows; i++) {
        var current_row = data_rows[i]
        new_array [i] = this._arrayToObj(title_array, current_row)
    }
    return new_array
}

ParserTsvText.prototype._getData = function () {
    var self = this
    return new Promise(function (fulfill, reject) {
        self._csv_parse(self._tsv_text, self._parser_options, function (e, output_array) {
            if (e) {
                reject(e)
            }
            var title_array = self._firstRow(output_array)
            if (title_array instanceof Error) {
                reject(title_array)
            }
            var data_rows = output_array.slice(1)
            var keyed_rows = self._dataRows(title_array, data_rows) 
            fulfill(keyed_rows)
        })
    })
}
ParserTsvText.prototype._getTsvText = function () {
    return Promise.resolve(this._tsv_text)
}

ParserTsvText.prototype.allRows = function (verify_tsv) {
    var self = this
    return this._getTsvText()
        .then(
            function () {
                return self.getTitles()
            }
        )
        .then(function (the_titles) {
            if (typeof verify_tsv === 'object') {
                if (!verify_tsv.headersMatch(the_titles)) {
                    var e = new Error("error_1000 Spreadsheet Headers don't match database")
                    e.information = 'the_titles = ' + the_titles
                    throw e
                }
            }
            return Promise.resolve('')
        })
        .then(function () {
            let object_rows = self._getData()
            return object_rows
        })
        .catch(function (e) {
            miscMethods.serverError(e)
            return e
        })
}


module.exports = ParserTsvText
