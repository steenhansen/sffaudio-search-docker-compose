'use strict'


var validUrl = require('valid-url')
var csv_parse = require('csv-parse')

var ParserTsvText = require('./ParserTsvText')
var ParserTsvFile = require('./ParserTsvFile')
var ParserTsvUrl = require('./ParserTsvUrl')
var VariablesTsvText = require('./VariablesTsvText')
var VariablesTsvFile = require('./VariablesTsvFile')
var VariablesTsvUrl = require('./VariablesTsvUrl')

var VerifyTsv = require('./VerifyTsv')
var VersionStorage = require('./VersionStorage')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')




var variables_schema = require('../variablesSchema')

module.exports = function (media_information) {

    var diFactory = {

        ParserTsvTextCreate: function (tsv_text) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
         //   missing_methods = 'exception test'
            if (missing_methods) {
                 throw new Error ('ParserTsvTextCreate.missing_methods() ' + missing_methods)
            } else {
                var parser_tsv_text = new ParserTsvText(csv_parse, tsv_text, media_constants.CSV_PARSER_OPTIONS)
                return parser_tsv_text
            }
        },

        ParserTsvFileCreate: function (tsv_pathname) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            // missing_methods = 'exception test'
            if (missing_methods) {
               throw new Error ('ParserTsvFileCreate.missing_methods() ' + missing_methods)
            } else {
                var parser_tsv_file = new ParserTsvFile(csv_parse, tsv_pathname, media_constants.CSV_PARSER_OPTIONS)
                return parser_tsv_file
            }
        },

        ParserTsvUrlCreate: function (tsv_url) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
          //  var  missing_methods = 'exception test'
            if (missing_methods) {
                throw new Error ('ParserTsvUrlCreate.missing_methods() ' + missing_methods)
            } else {
            //tsv_url = 'exception test'
                if (validUrl.isUri(tsv_url)) {
                    try {
                   // throw new Error ('exception test - ParserTsvUrlCreate') 
                        var parser_tsv_url = new ParserTsvUrl(csv_parse, tsv_url, media_constants.CSV_PARSER_OPTIONS)
                    } catch (e) {
                           throw e
                    }
                    return parser_tsv_url
                } else {
                       throw new Error ('ParserTsvUrlCreate not uri ' + tsv_url)
                }
            }
        },

        VariablesTsvTextCreate: function (tsv_text) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            //  var  missing_methods = 'exception test'
            if (missing_methods) {
                throw new Error ('VariablesTsvTextCreate.missing_methods() ' + missing_methods)
            } else {
                var variables_tsv_text = new VariablesTsvText(csv_parse, tsv_text, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_text
            }
        },

        VariablesTsvFileCreate: function (tsv_pathname) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            //  var  missing_methods = 'exception test'
            if (missing_methods) {
                throw new Error ('VariablesTsvFileCreate.missing_methods() ' + missing_methods)
            } else {
                var variables_tsv_file = new VariablesTsvFile(csv_parse, tsv_pathname, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_file
            }
        },

        VariablesTsvUrlCreate: function (tsv_url) {
     //tsv_url = 'exception test'
            if (validUrl.isUri(tsv_url)) {
                var variables_tsv_url = new VariablesTsvUrl(csv_parse, tsv_url, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_url
            } else {
                 throw new Error ('VariablesTsvUrlCreate not uri ' + tsv_url)
            }
        },

        VerifyTsvVariablesCreate: function () {
            var heading_vars = variables_schema.heading_vars
            var must_contain = variables_schema.must_contain
            var contain_errors = variables_schema.contain_errors
            var tsv_variables = variables_schema.tsv_variables
//            heading_vars = 'exception test'
            if ((heading_vars instanceof Array) && (must_contain instanceof Object) && (contain_errors instanceof Object) && (tsv_variables instanceof Array)) {
                var verify_vars_tsv = new VerifyTsv(heading_vars, must_contain, contain_errors, tsv_variables)
                return verify_vars_tsv
            } else {
             throw new Error ('VerifyTsvVariablesCreate error')
            }
        },

        VerifyTsvDataRowsCreate: function () {
            var heading_vars = media_information.heading_vars
            var must_contain = media_information.must_contain
            var contain_errors = media_information.contain_errors
            var tsv_variables = media_information.tsv_variables
           //         heading_vars = 'exception test'
            if ((heading_vars instanceof Array) && (must_contain instanceof Object) && (contain_errors instanceof Object) && (tsv_variables instanceof Array)) {
                var verify_tsv = new VerifyTsv(heading_vars, must_contain, contain_errors, tsv_variables)
                return verify_tsv
            } else {
               throw new Error ('VerifyTsvDataRowsCreate error')
            }
        },

        PdfMediaCreate: function () {
            var media_index_field = media_information.media_index_field
            var media_type = media_information.media_type

            var pdf_storage = new PdfMedia(media_index_field, media_constants.TEST_ID_PREFIX, media_type)
            return pdf_storage
        },

        PodcastMediaCreate: function () {
            var media_index_field = media_information.media_index_field
            var media_type = media_information.media_type

            var podcast_storage = new PodcastMedia(media_index_field, media_constants.TEST_ID_PREFIX, media_type)
            return podcast_storage
        },

        RsdMediaCreate: function () {
            var media_index_field = media_information.media_index_field
            var media_type = media_information.media_type
            var rsd_storage = new RsdMedia(media_index_field, media_constants.TEST_ID_PREFIX, media_type)
            return rsd_storage
        },

        VersionStorageCreate: function (current_media, media_description_text) {  // PdfMedia or RsdMedia
            var media_methods = ['getTsvVariables', 'deleteItems', 'databaseItem',
                'deriveDate', '_itemTemplateVars', '_pageTemplateVars']
            var missing_methods = miscMethods.objectHasMethods(current_media, media_methods)
              //var  missing_methods = 'exception test'
            if (missing_methods) {
                throw new Error ('VersionStorageCreate.missing_methods() ' + missing_methods)
            } else {
                var version_storage = new VersionStorage(current_media, media_description_text)
                return version_storage
            }
        }
    }
    return diFactory
}

