
var {PKD_AUTHOR_RESULTS, PKD_ADJUSTMENT_TEAM_RESULTS, PHILIP_K_DICK_AUTHOR, ADJUSTMENT_TEAM_BOOK} = rootAppRequire('the-tests/test-locations')




var graph_db = rootAppRequire('sff-network/graph-dbs/test-graph-db');
var misc_functions = rootAppRequire('the-tests/misc-functions')
var author_node = rootAppRequire('sff-network/node-types/author-node')(graph_db)
var book_node = rootAppRequire('sff-network/node-types/book-node')(graph_db)


var test_1 = book_node.sendBook(PHILIP_K_DICK_AUTHOR, ADJUSTMENT_TEAM_BOOK)
    .then(function (nodes_and_edges) {
        let {nodes_string, edges_string} =nodes_and_edges;      
        var nodes_and_edges_str = misc_functions.concatStrArrays(nodes_string, edges_string);
        var text_json = rootAppRequire(PKD_ADJUSTMENT_TEAM_RESULTS);
        return misc_functions.showIfDifferent(nodes_and_edges_str, text_json, PKD_ADJUSTMENT_TEAM_RESULTS);
    })

var test_2 = author_node.sendAuthor(PHILIP_K_DICK_AUTHOR)
    .then(function (nodes_and_edges) {
        let {nodes_string, edges_string} =nodes_and_edges;      
        var nodes_and_edges_str = misc_functions.concatStrArrays(nodes_string, edges_string);
        var text_json = rootAppRequire(PKD_AUTHOR_RESULTS);
        return misc_functions.showIfDifferent(nodes_and_edges_str, text_json, PKD_AUTHOR_RESULTS);
    })


 Promise.all([test_1, test_2])
     .then(function () {
         console.log('unit tests done ')
         process.exit();
     })
