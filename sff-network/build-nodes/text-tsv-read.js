var request = require('request')
var csv_parse = require('csv-parse')


var ParserTsvText = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/ParserTsvText');
var media_constants = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/MediaConstants');


function read_text(tsv_text) {
    var parser_tsv_text = new ParserTsvText(csv_parse, tsv_text, media_constants.CSV_PARSER_OPTIONS)
    return parser_tsv_text._getTsvText()
        .then(()=> parser_tsv_text._getData())
}


module.exports = read_text
