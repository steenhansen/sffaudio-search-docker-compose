
 
 /*
 node reload-db localDb-testData-every-type.config.js

node reload-db localDb-googleData.config.js
 
 
 node reload-db grapheneDb-testData-every-type.config.js

node reload-db grapheneDb-googleData.config.js

  */

















if (process.argv[2]) {
    var config_file = process.argv[2];
} else {
    var config_file = 'NO_CONFIG_FILE';   // what runs on the Heroku server
}

require('./sff-network/global-require');
const setCheckHerokuEnvVars = rootAppRequire('sff-network/heroku-config-vars');

var test_data = setCheckHerokuEnvVars(config_file);

if (test_data) {
    var csv_update = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-file-db.js')(test_data);
    csv_update();
} else {
   var url_read = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-url-db.js');
  url_read();
}
