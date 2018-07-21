'use strict'

var VerifyTsv = function (heading_vars, must_contain, contain_errors, tsv_variables) {
    this._heading_vars = heading_vars
    this._must_contain = must_contain
    this._contain_errors = contain_errors
    this._info_tsv_variables = tsv_variables
    this._class_name = 'VerifyTsv'
}

//VerifyTsv.prototype.extraTsvVariables = function (data_tsv_variables) {
//    var variables_length = this._info_tsv_variables.length
//    for (var i = 0; i < variables_length; i++) {
//        var key = this._info_tsv_variables[i]
//        if (1) {
//  //      if (!data_tsv_variables[key]) {
//        
//            throw new Error ( "VerifyTsv.prototype.extraTsvVariables Missing " + key ) 
//        
//        
//            return "Missing " + key + " in spreadsheet variables"
//        }
//    }
//    return ''
//}


VerifyTsv.prototype.headersMatch = function (the_titles) {
    var used_titles = []
    var titles_length = 0
    for (var i in the_titles) {
        var a_title = the_titles[i]
        if (a_title !== '') {
            used_titles[a_title] = a_title
            titles_length++
        }
    }
   var heading_length = this._heading_vars.length
   //titles_length = 'exception test'
    if (titles_length !== heading_length) {
        let error_mess =  "VerifyTsv.prototype.headersMatch.length - " + titles_length + ' <> '+heading_length
        throw new Error ( error_mess) 
    }

    for (var key in this._heading_vars) {
        var heading_value = this._heading_vars[key]
        //if (1){
        if (!used_titles[heading_value]) {
            throw new Error ( "VerifyTsv.prototype.headersMatch - 2") 
        }
    }
    return true
}

VerifyTsv.prototype._mustContainColumn = function (data_row, line_number) {
    for (var field_name in this._must_contain) {
        if (this._must_contain.hasOwnProperty(field_name)) {
            var verify_reg_ex = this._must_contain[field_name]
            var tsv_regex = new RegExp(verify_reg_ex)
            var data_value = data_row[field_name]
            var lower_data = data_value.toLowerCase()
            if (!tsv_regex.test(lower_data)) {
                var error_mess = this._contain_errors[field_name]
                var error_description = "\n<br>      ROW : " + line_number
                    + "\n<br>   COLUMN : " + field_name
                    + "\n<br>BAD VALUE : " + data_value
                    + "\n<br> SOLUTION : " + error_mess
                return error_description
            }
        }
    }
    return ''
}

VerifyTsv.prototype.mustContain = function (data_rows) {
    var number_rows = data_rows.length
    for (var i = 0; i < number_rows; i++) {
        var current_row = data_rows[i]
        var contain_error = this._mustContainColumn(current_row, i + 2)
        if (contain_error !== '') {
            return contain_error
        }
    }
    return ''
}

module.exports = VerifyTsv
