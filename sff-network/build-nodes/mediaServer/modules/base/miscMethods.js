'use strict'

var validUrl = require('valid-url')
var zlib = require('zlib')
var moment = require('moment-timezone')
var swig = require('swig')
var basicAuth = require('basic-auth')
var mongoose = require('mongoose')
var request = require('request')
var fsAccess = require('fs-access')
var PrettyError = require('pretty-error')

var Promise = require('bluebird')
mongoose.Promise = require('bluebird')
var fsAsync = Promise.promisifyAll(require("fs"))

var media_constants = require('./MediaConstants')
var media_constants = rootAppRequire('sff-network/media-constants')

var miscMethods = {

    memoryPrint(where_in_code){
        let {heapTotal} = process.memoryUsage()
        let total_heap = heapTotal.toLocaleString()
        console.log(where_in_code, total_heap)
    },

    shortError: function (e) {
        const html_message = 'Error:' + e.message
        var pretty_error = new PrettyError()
        pretty_error.skipPackage('bluebird', 'mongoose', 'mquery', 'swig', 'react')
        pretty_error.skipPath('internal/process/next_tick.js', 'timers.js', '_stream_writable.js', '_stream_transform.js', 'fs.js'
            , 'module.js', 'internal/module.js')
        const console_message = pretty_error.render(e)
        pretty_error.withoutColors()
        const log_message_breaks = pretty_error.render(e)
        const log_message = log_message_breaks.replace(/(\r\n|\n|\r)/gm, "")
        return {
            console_message: console_message
            , log_message: log_message
            , html_message: html_message
        }
    },

    serverError: function (e, res) {
        var short_error = miscMethods.shortError(e)
        console.log(short_error.console_message)
        global.Method_logger.chronicle('error', 'serverError', '', 'e', short_error.log_message)
        if (res) {
            res.send(media_constants.SERVER_ERROR)
        }
    },

    errorOnMissingFile: function (file_pathname) {
        return new Promise(function (fulfill, reject) {
            fsAccess(file_pathname, function (e) {
                if (e) {
                    reject(e)
                }
                fulfill()
            })
        })
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


    serveGzipContent: function (req, res, content_type, html_xml_content) {

        res.setHeader('Expires', 'now')
        if (miscMethods.acceptGzip(req)) {
            res.writeHead(200, {'Content-Type': content_type, 'Content-Encoding': 'gzip'})
            miscMethods.serveGzipString(res, html_xml_content)
        } else {
            res.header("Content-Type", content_type)
            res.send(html_xml_content)
        }

    },


    setTimeZone: function (time_zone) {
        moment.tz.setDefault(time_zone)
    },

    serverYYYYMMDDHHmm: function () {
        var date_now = Date.now()
        var now_date = moment(date_now)
        var now_yyyy_mm_dd_hh_mm = now_date.format("YYYY-MM-DD HH:mm")
        return now_yyyy_mm_dd_hh_mm
    },

    ignoreFutureItems: function (rsd_rss_xml, now_yyyy_mm_dd_hh_mm) {
        var rsd_entries = rsd_rss_xml.split('<item>')
        var number_entries = rsd_entries.length
        for (var i = 1; i < number_entries; i++) {
            var entry_values = rsd_entries[i].split('<the_date>')
            var rsd_date_extra = entry_values[1]
            var date_values = rsd_date_extra.split('</the_date>')
            var rsd_date = date_values[0]
            if (rsd_date > now_yyyy_mm_dd_hh_mm) {
                delete rsd_entries[i]
            } else if (i === 0) {             /// if first item viewable, then all are
                return false
            }
        }
        var current_rss = rsd_entries.shift()
        for (var i in rsd_entries) {
            current_rss += '<item>' + rsd_entries[i]
        }
        return current_rss
    },

    // A utility function to safely escape JSON for embedding in a <script> tag
    safeStringify: function (obj) {
        return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
    },

    getFillSwig: function (template_file, template_vars) {
        miscMethods.errorOnMissingFile(template_file)
        var swig_page_template = swig.compileFile(template_file)
        var page_html = swig_page_template(template_vars)
        return page_html
    },


    die: function (text) {
        console.log('DIE ')
        console.log(text)
        process.exit()
    },

    connectToMongoose: function (mongoose_connect_name, port_number) {
        if (!mongoose.connection.db) {
            console.log('Connecting to ' + mongoose_connect_name + ' ...')
            mongoose.connect(mongoose_connect_name, {useNewUrlParser: true}, function (e) {
                if (e) {
                    throw e
                }
                console.log('Connected on port ' + port_number + ' ...')
            })
        }

    },

    disconnectFromMongoose: function () {
        mongoose.connection.close()
    },

    acceptGzip: function (request) {
        try {
            var accept_encoding = request.headers['accept-encoding']
            if (accept_encoding.indexOf('gzip') > -1) {
                return true
            }
            return false
        } catch (err) {
            return false
        }
    },

    serveGzipString: function (res, compress_string) {
        var buf = new Buffer(compress_string, 'utf-8')
        zlib.gzip(buf, function (e, gzipped_data) {
            //var e = new Error ('exception test - serveGzipString') 
            if (e) {
                throw e
            }
            res.end(gzipped_data)

        })
    },

    testingUncaughtException: function () {
        process.on('uncaughtException', function (err) {
            var log_message = err.message + ' - ' + err.stack
            global.Method_logger.chronicle('error', 'server-onerror', module.filename, 'log_message', log_message)
        })
    },

    saveLocalFile: function (file_pathname, file_data) {
        return fsAsync.writeFileAsync(file_pathname, file_data)
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


    basicHttpAuth: function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
            return res.sendStatus(401)
        }

        var user = basicAuth(req)
        if (!user || !user.name || !user.pass) {
            return unauthorized(res)
        }
        if (user.name === media_constants.HTACCESS_USERNAME && user.pass === media_constants.HTACCESS_PASSWORD) {
            return next()
        } else {
            return unauthorized(res)
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

    // true = miscMethods.firstInSecond([1,'cat'], [3,'cat',1])
    firstInSecond: function (small_array, large_array) {

        var small_length = small_array.length
        var large_length = large_array.length
        if ((small_length > large_length) || (large_length === 0)) {
            return false
        }
        for (var i = 0; i < small_length; i++) {
            var small_column = small_array[i]
            var small_found = false
            for (var j = 0; j < large_length; j++) {
                var large_column = large_array[j]
                if (small_column === large_column) {
                    small_found = true
                }
            }
            if (!small_found) {
                return false
            }
        }
        return true
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

    convertMediaPublishDate: function (date_hour) {
        var publish_date_hour = moment(date_hour, ["YYYY-MM-DD H:mm", "YYYY-M-DD H:mm", "YYYY-MM-D H:mm", "YYYY-M-D H:mm",
            "YYYY-MM-DD HH:mm", "YYYY-M-DD HH:mm", "YYYY-MM-D HH:mm", "YYYY-M-D HH:mm"])
        var yyyy_mm_dd_hh_mm = publish_date_hour.format("YYYY-MM-DD HH:mm")
        return yyyy_mm_dd_hh_mm
    },

    nowPublishDate: function (date_hour) {
        var now_date_hour = moment(date_hour)
        var yyyy_mm_dd_hh_mm = now_date_hour.format("YYYY-MM-DD HH:mm")
        return yyyy_mm_dd_hh_mm
    },

    itunesPubDate: function (media_publish_exact) {
        var publish_date_hour = moment(media_publish_exact, ["YYYY-MM-DD HH:mm"])
        var itunes_date_time = publish_date_hour.format("ddd, D MMM YYYY HH:mm:ss")
        var time_zone = media_constants.TIME_ZONE_PUBLISH
        var itunes_time_zone = itunes_date_time + ' ' + time_zone
        return itunes_time_zone
    },

    isInteger: function (value) {
        if (isNaN(value)) {
            return false
        }
        if (parseInt(Number(value) !== value)) {
            return false
        }
        if (isNaN(parseInt(value, 10))) {
            return false
        }
        return true

    },

    consoleObj: function (oject_to_show, object_name) {
        if (typeof object_name === 'undefined') {
            object_name = '****'
        }
        var console_mess = object_name + " == " + JSON.stringify(oject_to_show)
        console.log(console_mess)
    },

    replace2withMdash: function (without_m_dash) {
        var with_m_dash = without_m_dash.replace(/--/g, "&mdash;")
        return with_m_dash
    },


    returnOnlyRealData: function (req, res, next) {
        var dirty_data = res.locals.bundle
        if (dirty_data instanceof Array) {
            var cleaned_data = []
            for (var data_index in dirty_data) {
                if (dirty_data.hasOwnProperty(data_index)) {
                    var data_row = dirty_data[data_index]

                    var episode_number = data_row['episode number']
                    console.log('returnOnlyRealData', episode_number)

                    if (typeof data_row.real_or_test !== "undefined") {
                        if (media_constants.REAL_DATA === data_row.real_or_test) {
                            cleaned_data.push(data_row)
                        }
                    }
                }
            }
            res.locals.bundle = cleaned_data
        }
        next()
    }

}

module.exports = miscMethods
