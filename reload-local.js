/*
 node reload-local ../config.local-neo4j.js                       ////// read google sheets for data
 node reload-local ../config.local-neo4j.js  sff-network/build-nodes/test-obj-data/every-type/
 node reload-local ../config.local-neo4j.js  sff-network/build-nodes/test-obj-data/full-data/

 node reload-local ../config.graphene.js
 node reload-local ../config.graphene.js      sff-network/build-nodes/test-obj-data/every-type/
 node reload-local ../config.graphene.js      sff-network/build-nodes/test-obj-data/full-data/
 
*/



require('./sff-network/global-require');
const local_environment = rootAppRequire('sff-network/check-start/local-environment');
const env_filename = process.argv[2];
local_environment.processEnvVars(env_filename);


const data_dir = process.argv[3];
if (data_dir) {
    console.log('Loading Local data from', data_dir);
    var reload_db = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-file-db.js')(data_dir);
} else {
    console.log('Loading Local data from Google spreadsheets');
    var reload_db = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-url-db');
}
reload_db.buildData()
   .then( ()=> process.exit() )



