
var test_procedures = rootAppRequire('sff-network/the--tests/test--environment');

var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);


//AuthorMoniker = rootAppRequire('sff-network/the--tests/author--moniker/author--moniker');

rootAppRequire('sff-network/the--tests/reload--db/reload--db');

 rootAppRequire('sff-network/the--tests/serve--pages/serve--pages');

clog('Warning, database will be changed by tests. Control-C to quit')
