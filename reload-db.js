
/*

node reload-db

node reload-db            // local-default-config-env.js and URL csv data


node reload-db /sff-network/build-nodes/csv-data/pkd-plus-2-authors/   

node reload-db local-default-config-env.js /sff-network/build-nodes/csv-data/pkd-plus-2-authors/


node reload-db /sff-network/build-nodes/csv-data/full-csv-data/  



// use graphenedb with test data
    
    
    node reload-db test-config-env.js /sff-network/build-nodes/csv-data/pkd-plus-2-authors/
    
    
    
    node web-server test-config-env.js

 */

function environmentCvsArgv(process_argv){
    var param_count = 2;
    var environment_argv='no_config_file';
    var csv_argv='no_csv_dir';
    while (process_argv[param_count]){
        var argv_param = process_argv[param_count];
        if (argv_param.endsWith('.js')){
            environment_argv = argv_param;
        }else if (argv_param.endsWith('/')){
            csv_argv = argv_param;
        }else {
            console.log('Reload-db parameters must end in either ".js" or "/" ');
        }
        param_count++
    }
    return [environment_argv, csv_argv];
}



require('./sff-network/global-require');
const setCheckHerokuEnvVars = rootAppRequire('sff-network/heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let [environment_file, csv_directory] = environmentCvsArgv(process.argv);

clog('ffffffff', environment_file, csv_directory)

setCheckHerokuEnvVars(CONFIG_ENV_KEYS, environment_file);

if (csv_directory!=='no_csv_dir'){
     var csv_update = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-file-db.js')(csv_directory);
     csv_update();
}else{
    var url_update = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-url-db.js')(csv_directory);
    url_update();
}

