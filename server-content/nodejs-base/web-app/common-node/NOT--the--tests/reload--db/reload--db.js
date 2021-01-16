
var test_procedures = rootAppRequire('common-node/the--tests/test--environment');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);
var data_dir = 'common-node/build-nodes/test-obj-data/every-type/'
var reload_db = rootAppRequire('common-node/build-nodes/graph-dbs/reload-file-db.js')(data_dir);

//var fsAsync = Promise.promisifyAll(require("fs"))


const promisifyAll = require('util-promisifyall');

var fsAsync = promisifyAll(require("fs"))
///////////////////////



var answer_file = '/all_db_data.txt';

var full_data_set = []
var all_db_string = '';
var complete_file_name = '';
var correct_data = '';
var wait_for_re_write_answers = '';

VersionRepository.deleteAll()
    .then(()=> {
        return reload_db.buildData('hide--seconds')
    })
    .then(()=> {
        return VersionRepository.entireDb()
    })
    .then((every_record_data)=> {
        var all_records = every_record_data.records;
        all_records.forEach(function (node_collection) {
            var node_fields = node_collection._fields[0];
            var fixed_node = test_procedures.removeIdFromTo_in_node(node_fields);
            full_data_set.push(fixed_node);
        })
        full_data_set.sort();
        all_db_string = full_data_set.toString();
        return;
    })
    .then(()=> {
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
            console.log('pass reload--db.js test');

        } else {
            console.log('fail reload--db.js test');
        }
    })
  //  .then(()=> process.exit())

