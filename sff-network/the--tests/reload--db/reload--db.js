var Promise = require('bluebird')
var fsAsync = Promise.promisifyAll(require("fs"))

const local_environment = rootAppRequire('sff-network/check-start/local-environment');
const env_filename = '../config.local-neo4j.js';
local_environment.processEnvVars(env_filename);
var data_dir = 'sff-network/build-nodes/test-obj-data/every-type/'
var reload_db = rootAppRequire('sff-network/build-nodes/graph-dbs/reload-file-db.js')(data_dir);
var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

var answer_file = '/all_db_data.txt';

var full_data_set = []
var all_db_string = '';
var complete_file_name = '';
var correct_data = '';
var wait_for_re_write_answers = '';

function removeIdFromTo(a_node) {
    delete a_node.identity
    var node_string = JSON.stringify(a_node);
    var no_id_from_to = node_string.replace(/\\"(id|from|to)\\"\s*:\s*\d+/gi, '');
    return no_id_from_to + "\n";
}

VersionRepository.deleteAll()
    .then(()=> {
        return reload_db.buildData()
    })
    .then(()=> {
        return VersionRepository.entireDb()
    })
    .then((every_record_data)=> {
        var all_records = every_record_data.records;
        all_records.forEach(function (node_collection) {
            var fixed_node = removeIdFromTo(node_collection._fields[0]);
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
            console.log('pass');

        } else {
            console.log('fail');
        }
    })
    .then(()=>VersionRepository.deleteAll())
    .then(()=> process.exit())

