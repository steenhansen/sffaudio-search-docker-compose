'use strict'

const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];

class HerokuEnvironment {

    static checkEnvVars() {
        for (const config_key of CONFIG_ENV_KEYS) {
            if (!process.env[config_key]) {
                throw new Error('Missing process.env.' + config_key);
            }
        }
    }


    static processEnvVars() {
        HerokuEnvironment.checkEnvVars();
        console.log('Neo4j Bolt Url : ', process.env.GRAPHENEDB_BOLT_URL);
        console.log('Web Url : ', 'http://localhost:' + process.env.PORT);
        console.log();
    }

}
module.exports = HerokuEnvironment;
