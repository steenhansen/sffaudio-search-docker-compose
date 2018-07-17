'use strict'

function neo4jSession(version_num){
	var neo4j = require('neo4j-driver')[version_num];
	var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
	var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
	var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
	var neo4j_driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
	var neo4j_session = neo4j_driver.session();
	return neo4j_session
}

module.exports = neo4jSession;



