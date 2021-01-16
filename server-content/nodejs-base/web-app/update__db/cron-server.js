



var express = require('express');
var graph_constants = rootAppRequire('common-node/graph-constants');
const program_variables = rootAppRequire('common-node/program-variables.js');
const serverResponse = rootAppRequire('common-node/check-start/server-responses');
var compression = require('compression');
var app = express();

app.use(express.static('public', {maxAge: '1y'}))
app.use(serverResponse.corsAll);
app.use(compression());

app.get(graph_constants.CRON_NEW_DB_VERSION, function (req, res, next) {
    console.log('\n  \033[92m  ***** CRON_NEW_DB_VERSION START !!!!  \033[0m  \n');
    var {doDirtyDeed} =rootAppRequire('update__db/cron-new-db-version');
    doDirtyDeed();
    res.send('hi there - ');
   console.log('\n  \033[92m  ***** CRON_NEW_DB_VERSION END !!!!  \033[0m  \n');
})









app.get(graph_constants.CRON_HEALTH_CHECK, function (req, res, next) {
    res.send("CRON SERVER is fine")
    //console.log('\n  \033[92m  ***** waiting for a new db END !!!!  \033[0m  \n');
})





app.set('port', process.env.INSIDE_CRON_PORT)  
var node_port = app.get('port')
app.listen(node_port).on('error', function (e) {
    console.log(e)
    process.exit()
})
