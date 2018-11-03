'use strict'


//    rootAppRequire('sff-network/media-constants');


function setHerokuProcessEnvVars(windows_env_filename) {
    if (!windows_env_filename.includes('../')) {
        console.log('Warning a config file inside program folder ' + windows_env_filename);
    }
    
    clog('aa', fromAppRoot(windows_env_filename))
    clog('ddd', fromAppRoot("../" +windows_env_filename))

    var cv2 = fromAppRoot("../" +windows_env_filename);

//	let config_vars = require(windows_env_filename);
//    let config_vars = require("../" + windows_env_filename);
    let config_vars = require(cv2);

    for (const config_key in config_vars) {
        const config_value = config_vars[config_key];
        if (process.env[config_key]) {
            console.log('Changing process.env.' + config_key + ' from "' + process.env[config_key] + '" to "' + config_value + '"');
        }
        process.env[config_key] = config_value;
    }
}

function checkHerokuProcessEnvVars(config_env_keys) {
    for (const config_key of config_env_keys) {
  //      clog('xxxxxxxx',config_key,process.env[config_key])
        if (!process.env[config_key]) {
            console.log('Missing process.env.' + config_key);
            return false;
        }
    }
    return true
}

function setCheckHerokuEnvVars(config_env_keys, env_filename) {
    if (env_filename !== 'no_config_file') {
        setHerokuProcessEnvVars(env_filename);
    } else {
        if (checkHerokuProcessEnvVars(config_env_keys)) {
    //    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            env_filename = "Heroku-Online";
        } else {
      //  console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
            env_filename = 'local-default-config-env.js';
            setHerokuProcessEnvVars(env_filename);
        }
    }
    checkHerokuProcessEnvVars(config_env_keys);

    console.log();
    console.log('Environment Filename : ', env_filename);
    console.log('Neo4j Bolt Url : ', process.env.GRAPHENEDB_BOLT_URL);
    console.log('Web Url : ', 'http://localhost:' + process.env.PORT);
    console.log();

}

module.exports = setCheckHerokuEnvVars;
