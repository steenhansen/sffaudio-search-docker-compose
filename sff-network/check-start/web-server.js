var express = require('express');

var graph_constants = rootAppRequire('sff-network/graph-constants');
const program_variables = rootAppRequire('sff-network/program-variables.js');
const serverResponse = rootAppRequire('sff-network/check-start/server-responses');
var app = express();

app.use(express.static('public', {maxAge: '1y'}))
app.use(serverResponse.corsAll);

app.get(graph_constants.ROUTE_ERASE_CACHES, function (req, res) {
     serverResponse.clearFromReload(-1)
            .then((erase_response_arr)=> {
            var cache_clear_resp= erase_response_arr[0]
             res.send(cache_clear_resp);
         })
})

app.get(graph_constants.ROUTE_POST_PROXY, function (req, res) {
    const sff_url_post = req.query.absolute_url;
    serverResponse.sffAudioPostPiece(sff_url_post)
        .then((sff_post_html)=> {
            res.send(sff_post_html)
        })
        .catch(function (post_error) {
            var error_message = post_error.statusCode;
            res.send(`A ${error_message} error message is being returned from <br>${sff_url_post}`)
        });
})


app.get(program_variables.ROUTE_BOOK_JSON, function (req, res) {
    let {strip_author, under_title}=req.params
    serverResponse.bookJson(strip_author, under_title)
        .then((book_json)=> {
            res.json(book_json)
        })
})

app.get(program_variables.ROUTE_AUTHOR_JSON, function (req, res) {
    let {strip_author}=req.params;
    serverResponse.authorJson(strip_author)
        .then((author_json)=> {
            res.json(author_json)
        })
})

app.get('/', function (req, res) {
    var req_query = req.query;
    if (typeof req_query['author'] === 'undefined') {
        serverResponse.initialDefaultPage(req_query)
            .then((default_html)=> res.send(default_html));
    } else {
        serverResponse.bookOrAuthorPage(req_query)
            .then((author_book_html)=> res.send(author_book_html));
    }
})

app.get('*', function (req, res) {
    res.redirect('/');
})

app.set('port', process.env.PORT)
var node_port = app.get('port')
app.listen(node_port).on('error', function (e) {
    console.log(e)
    process.exit()
})
