


var express = require('express');


var graph_constants = rootAppRequire('common-node/graph-constants');
const program_variables = rootAppRequire('common-node/program-variables.js');
const serverResponse = rootAppRequire('common-node/check-start/server-responses');
var compression = require('compression');

var app = express();

app.use(express.static('public', {maxAge: '1y'}))
app.use(serverResponse.corsAll);
app.use(compression());

global.gbl_restart_web_server = false;

//  'http://node__webserver:8080/boot-with-new-db-version';
app.get(graph_constants.RESTART_NEW_DB_VERSION, function (req, res, next) {
    // this code should be in init-db.js
    // this code should check that it is INSIDE 8080
   console.log('\n  \033[92m  ***** RESTART_NEW_DB_VERSION START !!!!  \033[0m  \n');
    gbl_restart_web_server = true;
    const gonna_restart = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!gonna_restart!!!!!!!!!!!!!!!!!!"; 
    res.send(gonna_restart)
    console.log('\n  \033[92m  ***** RESTART_NEW_DB_VERSION END !!!!  \033[0m  \n');
})

//  WAITING_FOR_RESTART: "/waiting-for-restart",
app.get(graph_constants.WAITING_FOR_RESTART, function (req, res, next) {
    // this code should be in init-db.js
    // this code should check that it is INSIDE 8080
   // console.log('\n  \033[92m  ***** waiting for a new db START !!!!  \033[0m  \n', gbl_restart_web_server);
    if (!gbl_restart_web_server){
        const no_new_db_message = "We are not amused, nor waiting for a re-start for a new database version"; 
        res.send(no_new_db_message)
    }else{
        // do not respond so the Docker HealthCheck will restart the web server with a new database version, after a db cron change
      //  res.sendStatus(404);
        process.exit(1);
    }

    //console.log('\n  \033[92m  ***** waiting for a new db END !!!!  \033[0m  \n');
})



// N.B. this route is called by nightly cron job to reset the author/book/default caches
app.get(graph_constants.ROUTE_ERASE_CACHES, function (req, res, next) {
    console.log('hi there ROUTE_ERASE_CACHES');
    serverResponse.clearFromReload()
        .then((erase_response_arr)=> {
            var cache_clear_resp = erase_response_arr[0]
            res.send(cache_clear_resp);
        })
        .catch(next);
})


app.get(graph_constants.ROUTE_WAKE_UP, function (req, res, next) {
    serverResponse.wakeUpSleepingDb()
        .then((db_version)=> {
            var wake_up_message = "<h6>current db version = " + db_version +"</h6>"      // so Clojure's Enlive can count 
            res.send(wake_up_message)
        })
        .catch(next);
})


app.get(graph_constants.ROUTE_POST_PROXY, function (req, res, next) {
    const sff_url_post = req.query.absolute_url;
    serverResponse.sffAudioPostPiece(sff_url_post)
        .then((sff_post_html)=> {
            res.send(sff_post_html)
        })
        .catch(next);
})


app.get(program_variables.ROUTE_BOOK_JSON, function (req, res, next) {
    let {strip_author, under_title}=req.params
    serverResponse.bookJson(strip_author, under_title)
        .then((book_json)=> {
            res.json(book_json)
        })
        .catch(next);
})

app.get(program_variables.ROUTE_AUTHOR_JSON, function (req, res, next) {
    let {strip_author}=req.params;
    serverResponse.authorJson(strip_author)
        .then((author_json)=> {
            res.json(author_json)
        })
        .catch(next);
})


app.get('/', function (req, res, next) {


console.log(' in app get / 0000000000000000000000000000000000000000000' );

    var req_query = req.query;

///    localhost:5000/?wordpress-start=philip-k-dick
    if (typeof req_query['wordpress-start'] !== 'undefined') {
        let php_search = req_query['wordpress-start'];
        serverResponse.fromWordpress(php_search)
            .then((author_book_html)=> res.send(author_book_html))
            .catch(next);
    } else if (typeof req_query['author'] === 'undefined') {
        serverResponse.initialDefaultPage(req_query)
            .then((default_html)=> res.send(default_html))
            .catch(next);
    } else {
        serverResponse.bookOrAuthorPage(req_query)
            .then((author_book_html)=> res.send(author_book_html))
            .catch(next);
    }
})

app.get('*', function (req, res) {
    res.redirect('/');
})

app.set('port', process.env.INSIDE_HTML_PORT)
var node_port = app.get('port')
app.listen(node_port).on('error', function (e) {
    console.log(e)
    process.exit()
})
