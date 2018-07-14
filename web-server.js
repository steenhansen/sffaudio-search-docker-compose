
'use strict'


var express = require('express')

/*

	> /podcast-neo4j/
	node web-server ../test-config-env

*/
const setCheckHerokuEnvVars = require('./heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let env_filename = process.argv[2]
setCheckHerokuEnvVars(CONFIG_ENV_KEYS, env_filename);




var neo4j = require('neo4j-driver').v1;



var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

console.log('after neo4j 33');


var session = driver.session();
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



console.log('after neo4j 22');



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