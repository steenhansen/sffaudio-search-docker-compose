var test_procedures = rootAppRequire('common-node/the--tests/test--environment');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);
var data_dir = 'common-node/build-nodes/test-obj-data/every-type/'
var reload_db = rootAppRequire('common-node/build-nodes/graph-dbs/reload-file-db.js')(data_dir);

//var fsAsync = Promise.promisifyAll(require("fs"))


const promisifyAll = require('util-promisifyall');

var fsAsync = promisifyAll(require("fs"))


const serverResponse = rootAppRequire('common-node/check-start/server-responses');
var answer_file = '/roger-zelazny.txt';

var strip_author = 'roger-zelazny';

//clog("starting ...");
var all_db_string = '';

VersionRepository.deleteAll()
    .then(()=> {
        return reload_db.buildData('hide--seconds')
    })
    .then(()=> {
        return serverResponse.authorJson(strip_author)
    })
    .then((author_json)=> {
        var no_id_from_to_string = test_procedures.removeIdFromTo_in_node(author_json);
        all_db_string=no_id_from_to_string;
        return no_id_from_to_string;
    })
    .then((no_id_from_to_string)=> {
        complete_file_name = __dirname + answer_file;
        return fsAsync.readFileAsync(complete_file_name, 'utf8');
    })
    .then((read_db_text)=> {
        correct_data = read_db_text
        if (correct_data === '') {
            correct_data = all_db_string;
            wait_for_re_write_answers = fsAsync.writeFileAsync(complete_file_name, all_db_string);
        } else {
            wait_for_re_write_answers = 'do not rewrite answer file';
        }
        return Promise.all([wait_for_re_write_answers]);
    })
    .then(()=> {
        if (correct_data == all_db_string) {
            console.log('pass serve-pages.js test');

        } else {
            console.log('fail serve-pages.js test');
        }
    })
   // .then(()=> process.exit())
