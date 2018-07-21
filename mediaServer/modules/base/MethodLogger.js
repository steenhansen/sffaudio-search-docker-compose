'use strict'

var winston = require('winston')
var fs = require('fs')
var path = require('path')
var miscMethods = require('./miscMethods')




function objToString (object_var) {
    var var_dump = ''
    for (var obj_property in object_var) {
        if (object_var.hasOwnProperty(obj_property)) {
            var_dump += obj_property + ':' + object_var[obj_property] + ', '
        }
    }
    var short_var_str = var_dump.substring(0, 100)
    return short_var_str
}

function variableData(variable_name, variable_value, caller_location) {
    var log_message = ':: var ' + variable_name + " = "
    if (typeof variable_value === 'function') {
        var func_value = variable_value.toString()
        var short_func = 'FUNC ' + func_value.substring(0, 10)
        log_message += short_func
    }  else if (typeof variable_value === 'object') {



//        if (variable_value.name==='Error'){
            if ( variable_value.name.indexOf('Error')>-1){
            log_message +=   variable_value.message
        }else{
            log_message +=  objToString(variable_value)
        }
    } else {
        if (variable_value === null) {
            var throw_message = variable_name + ' is null in ' + caller_location
            console.log(throw_message)
            throw(throw_message)
        } else if (variable_value === undefined) {
            var throw_message = variable_name + ' is undefined in ' + caller_location
            console.log(throw_message)
            throw(throw_message)

        } else {
            log_message += JSON.stringify(variable_value)
        }
    }
    return log_message
}


function methodAndFile(method_name, method_file) {
    var file_name = method_file.replace(/^.*[\\\/]/, '')
    var caller_location = method_name + '() ' + file_name
    return caller_location
}

module.exports = function (log_dir, environment_type) {
    var log_path = log_dir + '/' + environment_type + '/'
    var debug_log = log_path + 'debug_' + environment_type + '.log'
    var info_log = log_path + 'info_' + environment_type + '.log'
    var error_log = log_path + 'error_' + environment_type + '.log'


    var Method_Logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                name: 'error-file',
                filename: error_log,
                level: 'error'
            }),
            new (winston.transports.File)({
                name: 'info-file',
                filename: info_log,
                level: 'info'
            }),
            new (winston.transports.File)({
                name: 'debug-file',
                filename: debug_log,
                level: 'debug'
            })
        ]
    })

    var functionLogger = {

        clearAll: function () {
            var empty_file = ''
            fs.writeFile(error_log, empty_file, function (e) {
                if (e) {
                    console.log('global.Method_logger.clearAll(), ', error_log, e)
                }
            })
            fs.writeFile(info_log, empty_file, function (e) {
                if (e) {
                    console.log('global.Method_logger.clearAll(), ', info_log, e)
                }
            })
            fs.writeFile(debug_log, empty_file, function (e) {
                if (e) {
                    console.log('global.Method_logger.clearAll(), ', debug_log, e)
                }
            })
        },

        exception: function (method_name, method_file, e) {
            const file_name =  path.basename(method_file)
            const short_error = miscMethods.shortError(e)
            const called_from = ` called from ${file_name} ${method_name}()`
            console.log(short_error.console_message, called_from)
            Method_Logger.log('error', short_error.log_message, called_from)
            return short_error.html_message
        },

        chronicle: function (log_type, method_name, method_file) {  //, var1_name, var1_value, var2_name, var2_value, var3_name, var3_value
            var callbackFunction = false
            var caller_location = methodAndFile(method_name, method_file)
            var log_message = caller_location
            for (var i = 3; i < arguments.length; i = i + 2) {
                var variable_name = arguments[i]
                if (typeof variable_name === 'function') {
                    callbackFunction = variable_name
                    break   // since last
                }
                var variable_value = arguments[i + 1]
                log_message += variableData(variable_name, variable_value, caller_location)
            }
            if (log_type === 'error') {
                console.log(log_type, log_message)
            }
            Method_Logger.log(log_type, log_message, callbackFunction)
            return new Error(log_type + ' ' + log_message)
        }
    }
    return functionLogger
}
