var request = require('request')
var csv_parse = require('csv-parse')


var ParserTsvUrl = rootAppRequire('common-node/build-nodes/mediaServer/modules/base/ParserTsvUrl');
var graph_constants = rootAppRequire('common-node/build-nodes/mediaServer/modules/base/MediaConstants');


function read_g(tsv_url) {

    var parser_tsv_url = new ParserTsvUrl(csv_parse, tsv_url, graph_constants.CSV_PARSER_OPTIONS)

    return parser_tsv_url._getTsvText()
        .then( ()=> parser_tsv_url._getData() )






}


module.exports = read_g
