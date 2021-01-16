const local_environment = rootAppRequire('common-node/check-start/local-environment');
const env_filename = '../config.local-neo4j.js';
local_environment.processEnvVars(env_filename, 'hide--information');

function removeIdFromTo_in_node(a_node) {
    delete a_node.identity
    var node_string = JSON.stringify(a_node);
    var no_id_from_to = node_string.replace(/\\"(id|from|to)\\"\s*:\s*\d+/gi, '');
    return no_id_from_to + "\n";
}


function removeIdFromTo_in_string(node_string) {
    var no_id_from_to = node_string.replace(/\\"(id|from|to)\\"\s*:\s*\d+/gi, '');
    return no_id_from_to + "\n";
}



module.exports ={removeIdFromTo_in_node, removeIdFromTo_in_string}
