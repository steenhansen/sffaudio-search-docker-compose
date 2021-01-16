
 
  
 require('../common-node/global-require');


 const fetch = require('node-fetch');

 console.log('\n  \033[92m  ***CRON** db-init started  \033[0m  \n');


         var reload_db = rootAppRequire('common-node/build-nodes/graph-dbs/reload-url-db');
         const access_other_container = process.env.RESTART_WEBSERVER_WITH_NEW_DB;

function doDirtyDeed(){
  console.log('pears -----------------------------------------------')
            reload_db.buildData() 
            .then( _=>fetch(access_other_container))
            .then( _ => fetch(access_other_container, function(x){ console.log('feftch not found', x)}) )
            .then( my_fetch=>console.log('CRON FETCH ======='))
            .catch(function (error) {
                   console.log('##################################### - 1 :', error.code);
              
                  })

                }
console.log('\n  \033[92m  ***CRON** db-init end  \033[0m   \n');

module.exports = {
  doDirtyDeed
};
