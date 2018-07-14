'use strict'

function setHerokuProcessEnvVars(windows_env_filename){
	if (!windows_env_filename.includes('../')){
		console.log('Warning a config file inside program folder ' + windows_env_filename);
	}
	let config_vars = require(windows_env_filename);
	for (const config_key in config_vars) {
		const config_value = config_vars[config_key];
		if (process.env[config_key]){
			console.log('Changing process.env.' + config_key + ' from "' + process.env[config_key] +  '" to "' + config_value + '"');
		}
		process.env[config_key]=config_value;
	}
}

function checkHerokuProcessEnvVars(config_env_keys){
	for (const config_key of config_env_keys) {
		if (!process.env[config_key]){
			console.log('Missing process.env.' + config_key);
		}
	}
}

function setCheckHerokuEnvVars(config_env_keys, env_filename){
	if (typeof env_filename !== 'undefined'){
		setHerokuProcessEnvVars(env_filename);
	}
	checkHerokuProcessEnvVars(config_env_keys);
}

module.exports = setCheckHerokuEnvVars;
