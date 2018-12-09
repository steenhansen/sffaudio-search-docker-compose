var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
//var misc_helper = rootAppRequire('sff-network/misc-helper');
graph_db.checkDbAlive()

// var delete_all_sql = 'MATCH (n) DETACH DELETE n'

var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');
var build_repository = new BuildRepository(graph_db, 0);
//misc_helper.deleteCachedData();
build_repository.deleteAll();




            
            
            
    

