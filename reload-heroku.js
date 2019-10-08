/*
 node reload-heroku
 node reload-heroku sff-network/build-nodes/test-obj-data/every-type/
 node reload-heroku /sff-network/build-nodes/test-obj-data/full-data/
 */

// To reload on Heroku servers 
//   heroku run bash -a=sffaudio-search   // to get into server
//   node reload-heroku                   // program to run on Heroku server

require('./sff-network/global-require');
const heroku_environment = rootAppRequire('sff-network/check-start/heroku-environment');
heroku_environment.processEnvVars();


const data_dir = process.argv[2];

if (data_dir) {
    console.log('Loading Heroku data from', data_dir);
    var reload_db = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-file-db.js')(data_dir);
} else {
    console.log('Loading Heroku data from Google spreadsheets');
    var reload_db = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-url-db');
}
reload_db.buildData();
