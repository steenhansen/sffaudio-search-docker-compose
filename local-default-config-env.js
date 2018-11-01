'use strict'

// local-graph
// password
//3.4.1

var HEROKU_CONFIG_VARS = {
    PORT: 5000,
    GRAPHENEDB_BOLT_PASSWORD: 'password',
  //  GRAPHENEDB_BOLT_URL: 'bolt://localhost:7687',
    GRAPHENEDB_BOLT_URL: 'bolt://localhost:11002',
    GRAPHENEDB_BOLT_USER: 'neo4j',
        DEVELOP_USE_PROXIES: false,
  //      DEVELOP_READ_CVS_FILES: true
//  MATCH (n) RETURN distinct labels(n)

//  https://neo4j.com/docs/developer-manual/current/cypher/clauses/create/#create-return-created-node

  //  GRAPHENEDB_URL: 'https://app101254661-ZZFoUK:b.4dCHYAoE9iIp.z9VWRgkCMVAmilgq@hobby-cgheblcjindjgbkegdfinjbl.dbs.graphenedb.com:24780',
}
module.exports = HEROKU_CONFIG_VARS

/*

    > /podcast-neo4j/
    node web-server ../local-config-env

*/
