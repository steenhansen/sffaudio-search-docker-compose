var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
graph_db.checkDbAlive()

var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);
VersionRepository.deleteAll();




            
            
            
    

