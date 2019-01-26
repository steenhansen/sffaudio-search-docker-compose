'use strict'

var HEROKU_CONFIG_VARS = {
    PORT: 5000,
    GRAPHENEDB_BOLT_PASSWORD: 'abcdefghijklmnopqrstuvwxyz12345',
    GRAPHENEDB_BOLT_URL: 'bolt://type--abcdefghijklmnopqrstuvwx.dbs.graphenedb.com:12345',
    GRAPHENEDB_BOLT_USER: 'app1234567890234567',
    GRAPHENE_WAIT_SECONDS: 30,
    NODE_ENV: 'production',
    NEW_RELIC_LICENSE_KEY: 'abcdfeghijklmnopqrstuvwxyz1234567890abcd',
    APP_NAME: 'sffaudio-search'
}
module.exports = HEROKU_CONFIG_VARS

