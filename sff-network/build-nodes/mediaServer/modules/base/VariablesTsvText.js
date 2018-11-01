'use strict'

var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')


var VariablesTsvText = function (csv_parse, tsv_text, csv_parser_options) {
    ParserTsvText.call(this, csv_parse, tsv_text, csv_parser_options)
    this._class_name = 'VariablesTsvText'
    this._captured_variables = ''
}
VariablesTsvText.prototype = Object.create(ParserTsvText.prototype)
VariablesTsvText.prototype.constructor = VariablesTsvText

VariablesTsvText.prototype.capturedVariables = function () {
    return this._captured_variables
}

VariablesTsvText.prototype.deriveAll = function (the_rows, current_media, tsv_variables, offset_minutes) {
    current_media.getTsvVariables(tsv_variables)
    var multiple_rows = current_media.splitVersions(the_rows, offset_minutes, tsv_variables)
//    global.gc()
    return multiple_rows
}

VariablesTsvText.prototype.allVariables = function (verify_tsv) {
    var self = this
    return this.allRows(verify_tsv)
        .then(function (variable_rows) {
            var tsv_variables = []
            for (var value_key in variable_rows) {
                if (variable_rows.hasOwnProperty(value_key)) {
                    var variable_name = miscMethods.trimString(variable_rows[value_key]['variables'])
                    var variable_value = miscMethods.trimString(variable_rows[value_key]['values'])
                    if (( variable_name !== '') && (variable_value !== '')) {
                        tsv_variables[variable_name] = variable_value
                    }
                }
            }
            self._captured_variables = tsv_variables
            return tsv_variables
        }).catch(function (e) {
            miscMethods.serverError(e)
        })
}
module.exports = VariablesTsvText
