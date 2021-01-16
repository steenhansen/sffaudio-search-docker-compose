
require('../common-node/global-require');

const fetch = require('node-fetch');
console.log('\n  \033[92m  ***BOOT** db-init started  \033[0m  \n');


// if (process.env.START_LOAD_DB!=='NO_INIT_BUILD'){
//     console.log('apples =======================================')
//     var reload_db = rootAppRequire('common-node/build-nodes/graph-dbs/reload-url-db');
//     const access_other_container = process.env.RESTART_WEBSERVER_WITH_NEW_DB;
//     rootAppRequire('update__db/cron-server');
//     console.log('apples -----------------------------------------------')
//        reload_db.buildData() 
//          .then( _ => fetch(access_other_container, function(x){ console.log('feftch not found', x)}) )
//             .then( _=>console.log('Start end 44 data'))

// }else{
//     rootAppRequire('update__db/cron-server')
// }
    

if (process.env.START_LOAD_DB==='NO_INIT_BUILD'){
    rootAppRequire('update__db/cron-server')
   
}else{
    console.log('apples =======================================')
    var reload_db = rootAppRequire('common-node/build-nodes/graph-dbs/reload-url-db');
    const access_other_container = process.env.RESTART_WEBSERVER_WITH_NEW_DB;
    rootAppRequire('update__db/cron-server');
    console.log('apples -----------------------------------------------')
       reload_db.buildData() 
         .then( _ => fetch(access_other_container, function(x){ console.log('feftch not found', x)}) )
            .then( _=>console.log('Start end 44 data'))

}



console.log('\n  \033[92m  ***BOOT** db-init AFTER WEB-SERVER \033[0m  \n');