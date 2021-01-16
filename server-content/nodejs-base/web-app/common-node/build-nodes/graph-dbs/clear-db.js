var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
//graph_db.checkDbAlive()

var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);
VersionRepository.deleteAll();




            
            
            
    

