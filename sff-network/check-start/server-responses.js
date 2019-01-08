var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
graph_db.checkDbAlive()
var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/show-repository')(graph_db);

var author_data = rootAppRequire('sff-network/show-nodes/media-types/author-show')(data_repository)
var ParseNeo = rootAppRequire('sff-network/show-nodes/parse-neo')(data_repository);
var book_data = rootAppRequire('sff-network/show-nodes/media-types/book-show')(data_repository)

var misc_helper = rootAppRequire('sff-network/misc-helper')
var rp = require('request-promise');

var media_page = rootAppRequire('./sff-network/html-pages/media-page')


function corsAll(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

}


function resolvePdf(start_pdf_url) {
    return misc_helper.resolveRedirects(start_pdf_url)
        .then((end_pdf_url)=> {
            var end_pdf_url = end_pdf_url.replace('http://', 'https://');
            return end_pdf_url;
        })
}


function sffAudioPostPiece(sff_audio_url) {
    const optionsStart = {
        uri: sff_audio_url,
        method: "GET",
        headers: {"Content-type": "application/text"}
    };
    return rp(optionsStart)
        .then((body)=> {
            var all_html = body.split('<div id="contentleft">');
            var content_footer = all_html[1];
            var good_bad = content_footer.split('<h3>Similar Posts:</h3>');
            var the_post = good_bad[0];
            return the_post;
        });
}


function authorJson(strip_author) {
    return author_data.sendAuthor(strip_author, ParseNeo, 0)
        .then((nodes_and_edges) => {
            let {nodes_object, edges_object, graph_info}  = author_data.authorJson(strip_author, nodes_and_edges);
            var nodes_string = JSON.stringify(nodes_object);
            var edges_string = JSON.stringify(edges_object);
            var graph_string = JSON.stringify(graph_info);
            var author_json22 = {nodes_string, edges_string, graph_string}
            return author_json22;
        })
}

function bookJson(strip_author, under_title) {
    return book_data.sendBooksOfAuthor(strip_author, under_title, ParseNeo)
        .then(function (nodes_and_edges) {
            let {nodes_object, edges_object} =nodes_and_edges
            var nodes_string = JSON.stringify(nodes_object);
            var edges_string = JSON.stringify(edges_object);

            if (nodes_object.length > 10) {
                var graph_physics = false;
            } else {
                var graph_physics = true;
            }
            var graph_info = {
                strip_author: strip_author,
                under_title: under_title,
                graph_type: graph_constants.BOOK_PAGE_TYPE,
                graph_physics: graph_physics
            };
            var graph_string = JSON.stringify(graph_info);
            var book_json = {nodes_string, edges_string, graph_string}
            return book_json;
        })
}

function authorOrBookData(req_query) {
    var strip_author = req_query.author;
    if (typeof req_query['book'] !== 'undefined') {
        var under_title = req_query.book;
        return book_data.sendBooksOfAuthor(strip_author, under_title, ParseNeo);
    } else {
        return author_data.sendAuthor(strip_author, ParseNeo, 0);
    }
}

function defaultAuthors() {
    var CachedDefaults = rootAppRequire('sff-network/build-nodes/cached-lists/cached-default');
    var cached_defaults = new CachedDefaults();
    var random_default_authors = cached_defaults.getCache();     
    return random_default_authors;
}

function queryView(req_query) {
    if (typeof req_query.view === 'undefined') {
        var query_view = '';
    } else {
        var query_view = req_query.view;
    }
    return query_view;
}
function queryChoice(req_query) {
    if (typeof req_query.choice === 'undefined') {
        var query_choice = '';
    } else {
        var query_choice = req_query.choice;
    }
    return query_choice;
}

function initialDefaultPage(req_query) {
  return defaultAuthors()
            .then(function (random_default_authors) {
                var query_view = queryView(req_query);
                var query_choice = queryChoice(req_query);
                var empty_node={};
                var empty_edges={};
                var empty_info={}
                return media_page(empty_node, empty_edges, empty_info, query_view, query_choice, random_default_authors);
            })
}

function bookOrAuthorPage(req_query) {
    return authorOrBookData(req_query)
        .then(function (nodes_and_edges) {
            let {nodes_object, edges_object, graph_info} =nodes_and_edges;
            var query_view = queryView(req_query);
                var query_choice = queryChoice(req_query);
            var empty_default_authors='{}';
            return media_page(nodes_object, edges_object, graph_info, query_view, query_choice, empty_default_authors);
                
        })
}


module.exports = {corsAll, resolvePdf, sffAudioPostPiece, authorJson, bookJson,  
initialDefaultPage,bookOrAuthorPage};
