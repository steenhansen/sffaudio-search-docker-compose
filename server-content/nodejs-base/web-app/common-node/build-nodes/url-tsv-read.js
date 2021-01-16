var request = require('request')
var csv_parse = require('csv-parse')


var ParserTsvUrl = rootAppRequire('common-node/build-nodes/mediaServer/modules/base/ParserTsvUrl');
var graph_constants = rootAppRequire('common-node/build-nodes/mediaServer/modules/base/MediaConstants');


function read_text(tsv_text) {
    var parser_tsv_text = new ParserTsvUrl(csv_parse, tsv_text, graph_constants.CSV_PARSER_OPTIONS)
    return parser_tsv_text._getTsvText()
        .then(()=> parser_tsv_text._getData())
}


module.exports = read_text
