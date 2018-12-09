'use strict'

var HEROKU_CONFIG_VARS = {
    PORT: 5000,
    GRAPHENEDB_BOLT_PASSWORD: 'abcdefghijklmnopqrstuvwxyz12345',
    GRAPHENEDB_BOLT_URL: 'bolt://type--abcdefghijklmnopqrstuvwx.dbs.graphenedb.com:12345',
    GRAPHENEDB_BOLT_USER: 'app1234567890234567',
    GRAPHENE_WAIT_SECONDS: 30,
        
    MEMCACHIER_PASSWORD:'ABCDEFGHIJKLMNOPQRSTUVXYZ1234567',
    MEMCACHIER_SERVERS:'abc.def.ghi.memcachier.com:12345',
    MEMCACHIER_USERNAME:'ABCDEF'
}
module.exports = HEROKU_CONFIG_VARS

