'use strict'

/*
  node server-heroku
 */



require('./sff-network/global-require');
const heroku_environment = rootAppRequire('sff-network/check-start/heroku-environment');
heroku_environment.processEnvVars();

require('newrelic');

require('./sff-network/check-start/web-server');





