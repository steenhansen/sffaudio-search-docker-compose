
var test_procedures = rootAppRequire('common-node/the--tests/test--environment');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);


AuthorMoniker = rootAppRequire('common-node/the--tests/author--moniker/author--moniker');

//rootAppRequire('common-node/the--tests/reload--db/reload--db');

// rootAppRequire('common-node/the--tests/serve--pages/serve--pages');

clog('Warning, database will be changed by tests. Control-C to quit')
