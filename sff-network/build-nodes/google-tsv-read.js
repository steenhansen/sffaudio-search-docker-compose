var request = require('request')
var csv_parse = require('csv-parse')


var ParserTsvUrl = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/ParserTsvUrl');
var media_constants = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/MediaConstants');


function read_g(tsv_url) {

    var parser_tsv_url = new ParserTsvUrl(csv_parse, tsv_url, media_constants.CSV_PARSER_OPTIONS)

    return parser_tsv_url._getTsvText()
        .then( ()=> parser_tsv_url._getData() )




   // clog('ful', parser_tsv_url._getTsvText())


}


module.exports = read_g
