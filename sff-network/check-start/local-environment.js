'use strict'

var HerokuEnvironment = rootAppRequire('./sff-network/check-start/heroku-environment');

class LocalEnvironment extends HerokuEnvironment {

    static setEnvVars(env_filename) {
        var local_db_config = fromAppRoot('/') + env_filename;
        console.log('Local Environment Filename : ', local_db_config);
        try {
            var config_vars = require(local_db_config);
        } catch (e) {
            throw new Error('Missing local-db.config.js file : ' + local_db_config)
        }
        for (const config_key in config_vars) {
            process.env[config_key] = config_vars[config_key];
        }
    }

    static processEnvVars(env_filename) {
        if (!env_filename) {
            throw new Error('Missing local database config file parameter');
        }
        LocalEnvironment.setEnvVars(env_filename);
        super.processEnvVars();
    }
}
module.exports = LocalEnvironment;
