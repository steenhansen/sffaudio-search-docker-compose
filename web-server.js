
'use strict'


/// GraphRepository

var express = require('express')

/*

	> /podcast-neo4j/
	node web-server ../test-config-env       // start webserver

    npm test


    C:\Users\admin\Documents\GitHub\_real_sffaudio_\sffaudio\test\call-tests.js

*/
const setCheckHerokuEnvVars = require('./heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let env_filename = process.argv[2]
setCheckHerokuEnvVars(CONFIG_ENV_KEYS, env_filename);


//
/// maybe we should have 'v1'  for the neo4j version as a constant

const neo4jSession = require('./neo4j-session');
var session = neo4jSession('v1');                      // this should be a local constant, NOT process.env, as never changes



session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });





var app = express();

app.get('*', function (req, res) {
    res.send('hello world')
})


    app.set('port', process.env.PORT)
    var node_port = app.get('port')
    app.listen(node_port).on('error', function (e) {
        console.log(e)
        process.exit()
    })