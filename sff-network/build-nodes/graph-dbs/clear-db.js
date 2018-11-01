
/*

 node ./sff-network/graph-dbs/clear-db 


 node ./sff-network/graph-dbs/clear-db ../test-config-env 




 */



require('../sff-network/global-require')
var {PODCAST_GOOGLE_CSV, RSD_GOOGLE_CSV, PDF_GOOGLE_CSV} = rootAppRequire('the-tests/test-locations')

const setCheckHerokuEnvVars = rootAppRequire('sff-network/heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let env_filename = process.argv[2]
setCheckHerokuEnvVars(CONFIG_ENV_KEYS, env_filename);


var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
graph_db.checkDbAlive()


///////////////////////////

//var graph_repository = rootAppRequire('sff-network/graph-dbs/graph-repository')(graph_db);
var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');



        var build_repository = new BuildRepository(graph_db, 0);
        
build_repository.deleteAll()
  .then( function(zxc){ console.log('database is empty',zxc) })




            
            
            
    

