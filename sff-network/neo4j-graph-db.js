'use strict'

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var graph_constants = rootAppRequire('sff-network/graph-constants')

var UNRESPONSIVE_DB_MESS = {
    "records": [{
        "keys": [
            "n_author",
            "v_db_version"
        ],
        "length": 2,
        "_fields": [
            {
                "identity": {},
                "labels": [
                    "L_AUTHOR"         // expected for all json calls
                ],
                "properties": {
                    "author_name": graph_constants.UNRESPONSIVE_DB_NAME,
                }
            },
            42
        ],
        "_fieldLookup": {
            "n_author": 0,
            "v_db_version": 1
        }
    }
    ]
};

var DELAY_AFTER_SQL_1 = 1000;
var DELAY_AFTER_SQL_2 = 2000;

module.exports = function (version_num) {

    var neo4j = require('neo4j-driver')[version_num];
    var neo4j_driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
    var neo4j_session = neo4j_driver.session();

    function sqlParams(sql, params) {
        var sql_1 = sql; // + ' make an error happen 1 ';
        var sql_2 = sql; // + ' make an error happen 2 ';
        var sql_3 = sql; // + ' make an error happen 3';

        return neo4j_session.run(sql_1, params)
            .then((result)=> {
                return result
            })
            .catch(async function (error) {
                console.log('NEO4J - 1 :', error.code, params, sql_1);
                await new Promise(done => setTimeout(done, DELAY_AFTER_SQL_1));
                return neo4j_session.run(sql_2, params)
                    .then((result)=> {
                        return result
                    })
                    .catch(async function (error) {
                        console.log('NEO4J - 2 :', error.code, params, sql_2);
                        await new Promise(done => setTimeout(done, DELAY_AFTER_SQL_2));
                        return neo4j_session.run(sql_3, params)
                            .then((result)=> {
                                return result
                            })
                            .catch(function (error) {
                                console.log('NEO4J - 3 :', error.code, params, sql_3);
                                var new_result = UNRESPONSIVE_DB_MESS;
                                return new_result
                            });
                    });
            });
    }

    function checkDbAlive() {
        var test_sql = ` WITH "neo4j is alive" AS alive_test
                       RETURN alive_test `;
        neo4j_session.run(test_sql)
            .catch(function (xxx) {
                console.log('');
                console.log('Check that the Neo4j database is running.');
                console.log('');
                console.log('Stopping on error:', xxx);
                process.exit();
            })
        // .then((value) => {
        //     var number_db_nodes = value.records[0]._fields[0].low
        //     console.log('Neo4j database has', number_db_nodes, 'nodes')
        // }, (reason) => {
        //     console.log('rejection', value)
        // })


    }

    return {sqlParams, checkDbAlive};

}
