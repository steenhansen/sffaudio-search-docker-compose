'use strict'


/// --- neo4j-graph-db
///         test-graph-db


// delete all!!

module.exports = function (version_num) {

    var neo4j = require('neo4j-driver')[version_num];
    var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
    var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
    var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
    var neo4j_driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
    var neo4j_session = neo4j_driver.session();


    function sqlParams(sql, params) {
        if (typeof params.record_limit === 'undefined') {
            var limit_sql = '';
        } else {
            var limit_sql = ' LIMIT ' + params.record_limit;
        }
        var limited_sql = sql + limit_sql;

        var neo4j_promise = neo4j_session.run(limited_sql, params)
        //            .then( (my_data)=>{console.log(my_data);  neo4j_session.close(); return my_data})
            .then((result)=> {
              //  neo4j_session.close();
              
              
                // if (limited_sql.includes('PostNode.savePosts')) {
                // clog('----------------sss', limited_sql)
                //     // var avail = result.summary().result_available_after;
                //     // var cons = result.summary().result_consumed_after
                //     // var total_time = avail + cons
                //     clog('----------------sss', result)
                // }
                return result
            })

            .catch(function (error) {
                console.log(error);
                console.log('rrrrrrrrrrrrrrrrrrrrrrrr', params, 'sssssssssssss', sql, 'jjjjjjjjjjj')
                process.exit()
            });
        //       if (limited_sql.includes('PostNode.savePosts')) {
        //    console.log(' params.db_version  === ', params, limited_sql )
        // }
        return neo4j_promise;
    }


    function checkDbAlive() {           // checkDbAlive
        var test_sql = ` WITH "neo4j is alive" AS alive_test
                       RETURN alive_test `;
        neo4j_session.run(test_sql)
            .catch(function (xxx) {
                console.log('');
                console.log('CHECK CONFIG SETTINGS FOR CHANGES');
                console.log('');
                console.log('Stopping on error:', xxx);
                process.exit();
            })
            .then((value) => {
                var number_db_nodes = value.records[0]._fields[0].low
                console.log('Neo4j database has', number_db_nodes, 'nodes')
            }, (reason) => {
                console.log('rejection', value)
            })


    }

    return {sqlParams, checkDbAlive};

}