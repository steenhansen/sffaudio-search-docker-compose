'use strict'

var validUrl = require('valid-url')
var request = require('request')

const promisifyAll = require('util-promisifyall');

var fsAsync = promisifyAll(require("fs"))

var media_constants = require('./MediaConstants')

var miscMethods = {


    shortError: function (e) {
        const html_message = 'Error:' + e.message
       
        return {
            console_message: html_message
            , log_message: html_message
            , html_message: html_message
        }
    },

    serverError: function (e, res) {
        var short_error = miscMethods.shortError(e)
        console.log(short_error.console_message)
     //   global.Method_logger.chronicle('error', 'serverError', '', 'e', short_error.log_message)
        if (res) {
            res.send(media_constants.SERVER_ERROR)
        }
    },

    readLocalFile: function (file_pathname) {
        // file_pathname = 'exception test'
        return miscMethods.errorOnMissingFile(file_pathname)
            .then(function () {
                return fsAsync.readFileAsync(file_pathname, 'utf8')
            })
            .then(function (file_data) {
                return file_data
            })
            .catch(function (e) {
                throw e
            })
    },

    isUrlFileName: function (file_name) {
        if ((file_name.startsWith('http://')) || (file_name.startsWith('https://'))) {
            return true
        } else {
            return false
        }
    },


    //  var str_trimmed = miscMethods.trimString('  word  ')
    trimString: function (untrimmed_string) {
        if (typeof untrimmed_string === 'string') {
            var trimmed_string = untrimmed_string.trim()
            return trimmed_string
        } else {
            return untrimmed_string
        }
    },

// kill double spaces in the middle of header vars
    singleSpacesString: function (double_string) {
        var trimmed_string = double_string.replace(/\s\s+/g, ' ')
        return trimmed_string
    },

    // kill everything after first (
    deleteBracketComments: function (commented_string) {
        var short_string = commented_string.replace(/\(.*/g, '')
        return short_string
    },

    //  function An_object() {
    //   this.method1 = function () {}
    //  }
    //  'method2' = miscMethods.objectHasMethods(An_object, ['method1', 'method2'])
    objectHasMethods: function (object_checked, method_names) {
        var number_methods = method_names.length
        var missing_methods = []
        for (var i = 0; i < number_methods; i++) {
            var method_name = method_names[i]
            var typeof_method = typeof(object_checked[method_name])
            if (typeof_method !== 'function') {
                missing_methods.push(method_name)
            }
        }
        var missing_string = missing_methods.join(', ')
        return missing_string
    },

    readUrlFile: function (file_url) {
        return new Promise(function (fulfill, reject) {
            if (validUrl.isUri(file_url)) {
                request.get(file_url, function (e, response, body) {
                    if (e) {
                        reject(e)
                    } else if (response.statusCode !== 200) {
                        reject(response.statusCode)
                    } else {
                        fulfill(body)
                    }
                })
            } else {
                reject(file_url)
            }
        })
    },

}

module.exports = miscMethods
