/*
 node clear-local config.local-neo4j.js

 node clear-local ../config.graphene.js
*/

require('./sff-network/global-require');
const local_environment = rootAppRequire('sff-network/check-start/local-environment');
const env_filename = process.argv[2];
local_environment.processEnvVars(env_filename);

require('./sff-network/build-nodes/graph-dbs/clear-db');

