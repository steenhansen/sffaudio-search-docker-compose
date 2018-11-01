/*




 node ./the-tests/create-unit-tests ../local-config-env 




 */



//        create-test-data ....


require('../sff-network/global-require')


var write = require('fs-writefile-promise');


var {
    DATA_GET_AUTHOR_NODES_1, DATA_GET_AUTHOR_NODES_2, DATA_GET_AUTHOR_NODES_3,
    DATA_GET_BOOK_NODES, RESULTS_GET_BOOK_NODES, RESULTS_GET_AUTHOR_NODES,
    PODCAST_GOOGLE_CSV, RSD_GOOGLE_CSV, PDF_GOOGLE_CSV
} = rootAppRequire('the-tests/test-locations')

const setCheckHerokuEnvVars = rootAppRequire('sff-network/heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let env_filename = process.argv[2]
setCheckHerokuEnvVars(CONFIG_ENV_KEYS, env_filename);


var media_constants = rootAppRequire('sff-network/media-constants');

var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);


var misc_functions = rootAppRequire('the-tests/misc-functions')

var podcast_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/podcastSchema')
var rsd_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/rsdSchema')
var pdf_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/pdfSchema')


// saveStringData
function saveTestData(str_items, dir_name, params_arr = []) {
    var executable_string = 'var mock_data_return = ` ' + str_items + " `; \n\nmodule.exports = mock_data_return; ";
    const reducer = (accum_fname, var_name) => accum_fname + '-' + var_name;

    if (params_arr.length == 0) {
        var name_parts = ``;
    } else {
        var name_parts = '-' + params_arr.reduce(reducer)
    }
    var file_name = fromAppRoot(dir_name) + `${name_parts}.js`;
    var write_promise = write(file_name, executable_string);
    return write_promise;
}


function saveBookTestData(graph_db, strip_author, under_title) {
    var book_node = rootAppRequire('sff-network/node-types/book-node')(graph_db)
    return book_node.sendBook(strip_author, under_title)
        .then(function (nodes_and_edges) {
            let {graph_collection, nodes_string, edges_string} = nodes_and_edges
            var str_collection = JSON.stringify(graph_collection[0], null, ' ')
            var file_1 = saveTestData(str_collection, DATA_GET_BOOK_NODES, [strip_author, under_title])
            var nodes_and_edges_str = misc_functions.concatStrArrays(nodes_string, edges_string);
            var file_2 = saveTestData(nodes_and_edges_str, RESULTS_GET_BOOK_NODES, [strip_author, under_title])
            return Promise.all([file_1, file_2])
        })
}

function saveAuthorTestData(graph_db, strip_author) {
    var author_node = rootAppRequire('sff-network/node-types/author-node')(graph_db)
    return author_node.sendAuthor(strip_author)
        .then(function (nodes_and_edges) {
            let {graph_collection, nodes_string, edges_string} = nodes_and_edges

            var str_collection_0 = JSON.stringify(graph_collection[0], null, ' ')
            var file_1 = saveTestData(str_collection_0, DATA_GET_AUTHOR_NODES_1, [strip_author])
            var str_collection_1 = JSON.stringify(graph_collection[1], null, ' ')
            var file_2 = saveTestData(str_collection_1, DATA_GET_AUTHOR_NODES_2, [strip_author])
            var str_collection_2 = JSON.stringify(graph_collection[2], null, ' ')
            var file_3 = saveTestData(str_collection_2, DATA_GET_AUTHOR_NODES_3, [strip_author])

            var nodes_and_edges_str = misc_functions.concatStrArrays(nodes_string, edges_string);
            var file_4 = saveTestData(nodes_and_edges_str, RESULTS_GET_AUTHOR_NODES, [strip_author])
            return Promise.all([file_1, file_2, file_3, file_4])
        })
}


function saveObjectData(str_items, dir_name) {
    var executable_string = 'var mock_data_return =  ' + str_items + " ; \n\nmodule.exports = mock_data_return; ";
       var file_name = fromAppRoot(dir_name) + `.js`;
    var write_promise = write(file_name, executable_string);
    return write_promise;
}

function saveGoogleCsv(graph_db) {
    const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(graph_db);
    return read_csv_google.saveGoogle(podcast_information, rsd_information, pdf_information)
        .then(function (all_csv) {
            var str_podcast = JSON.stringify(all_csv.podcast_csv, null, ' ')
            var file_podcast = saveObjectData(str_podcast, PODCAST_GOOGLE_CSV)
            var str_rsd = JSON.stringify(all_csv.rsd_csv, null, ' ')
            var file_rsd = saveObjectData(str_rsd, RSD_GOOGLE_CSV)
            var str_pdf = JSON.stringify(all_csv.pdf_csv, null, ' ')
            var file_pdf = saveObjectData(str_pdf, PDF_GOOGLE_CSV)
            return Promise.all([file_podcast, file_rsd, file_pdf])
        })
}


var save_1 = saveBookTestData(graph_db, 'philip_k_dick', 'adjustment_team')
var save_2 = saveAuthorTestData(graph_db, 'philip_k_dick')
var save_3 = saveAuthorTestData(graph_db, 'ray_bradbury')
var save_4 = saveGoogleCsv(graph_db)

Promise.all([save_1, save_2, save_3, save_4])
    .then(function () {
        console.log('files done ...')
        process.exit();
    })

