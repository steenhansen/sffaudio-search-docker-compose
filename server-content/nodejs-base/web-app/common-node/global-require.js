'use strict'

//console.log('in common-node/global-require.js 99999999999999999999');

var path = require("path");

global.my_var='asdf'

global.rootAppRequire = function (name) {
    var app_root_dir = path.join(__dirname, '../', name);
    return require(app_root_dir)
}

global.fromAppRoot = function (abs_filepath) {
    var from_app_root = path.join(__dirname, '../', abs_filepath);
    return from_app_root
}

global.clog = console.log.bind(console)

global.clog2= function(...console_args){
    var cloned_args = JSON.parse(JSON.stringify(console_args))     // in case of promise 
    console.log.apply(console, cloned_args)
}

global.stop= function(...console_args){
    console.log(console_args)
    console.log('stopping ...')
    setTimeout((function() {  
        return process.exit(42);
    }), 1000);
}

global.fault=function(...console_args){
    console.log('FAULT ...')
    console.log(console_args)
    console.log(' ...')
}

global.trace=function(trace_message){
      console.trace("Stack ", trace_message);
}


global.varType = function (a_var) {
    var bracket_name = Object.prototype.toString.call(a_var);
    var plain_name = bracket_name.slice(8, -1)
    if (plain_name === 'Object') {
        if (a_var.constructor.name === '') {
            return 'Object';
        } else {
            return a_var.constructor.name
        }
    }
    return plain_name
}
   
global.noCacheRequire =function (require_file){
    delete require.cache[require_file];    
    var required_var = require(require_file);
    return required_var;
}
