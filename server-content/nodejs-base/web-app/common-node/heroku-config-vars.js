'use strict'



const CONFIG_ENV_KEYS = ['GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];

function setHerokuProcessEnvVars(windows_env_filename) {
    if (!windows_env_filename.includes('../')) {
        console.log('Warning a config file inside program folder ' + windows_env_filename);
    }
    var cv2 = fromAppRoot("../" + windows_env_filename);


    let config_vars = require(cv2);
    
    for (const config_key in config_vars) {
        const config_value = config_vars[config_key];
        if (process.env[config_key]) {
            console.log('Changing process.env.' + config_key + ' from "' + process.env[config_key] + '" to "' + config_value + '"');
        }
        process.env[config_key] = config_value;
    }
    if (process.env['TEST_DATA']) {
        return process.env['TEST_DATA'];
    } else {
        return false;
    }
}

function checkHerokuProcessEnvVars(config_env_keys) {
    for (const config_key of config_env_keys) {
        if (!process.env[config_key]) {
            throw new Error("'Missing process.env.' + config_key")
        }
    }
}

function setCheckHerokuEnvVars(env_filename) {
    if (env_filename !== 'NO_CONFIG_FILE') {
        var test_data = setHerokuProcessEnvVars(env_filename);
    }else{
        var test_data = false;
    }
    checkHerokuProcessEnvVars(CONFIG_ENV_KEYS);

    console.log();
    console.log('Environment Filename : ', env_filename);
    console.log('Neo4j Bolt Url : ', process.env.GRAPHENEDB_BOLT_URL);
    console.log('Web Url : ', 'http://localhost:' + process.env.PORT);
    console.log();
    return test_data;
}

module.exports = setCheckHerokuEnvVars;
