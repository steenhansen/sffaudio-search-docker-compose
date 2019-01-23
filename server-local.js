'use strict'

/*
  node server-local ../config.local-neo4j.js
  
  node server-local ../config.graphene.js
 */
 
 
 
require('./sff-network/global-require');
const local_environment = rootAppRequire('sff-network/check-start/local-environment');
const env_filename = process.argv[2];
local_environment.processEnvVars(env_filename);

require('newrelic');

require('./sff-network/check-start/web-server');


//   154 361 if min
//   154 451 if normal
