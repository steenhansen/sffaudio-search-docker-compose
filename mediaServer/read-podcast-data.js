

var Promise = require('bluebird')


//  MATCH (n) RETURN n;

function getPodcastData(neo4j_session){

    var the_information = rootAppRequire('mediaServer/modules/podcastSchema')
    var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
    var variables_tsv = di_factory.VariablesTsvUrlCreate(the_information.google_variables_tab)
    var parser_tsv = di_factory.ParserTsvUrlCreate(the_information.google_media_tab)
                   
     
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                let the_rows = parser_tsv.allRows(verify_tsv)
                return the_rows
            })

            .then(function (the_rows) {
                var first = the_rows.shift();
                var episode_number = first['episode number'];
                var participants = first['participants'];
 var sql = `CREATE (n:Person { episode_number: '${episode_number}', participants: '${participants}' })`;
 console.log('sql', sql, neo4j_session)
neo4j_session.run(sql) .then(function(result) {
           result.records.forEach(function(record) {
            console.log(record)
            });
           session.close();
    })
    .catch(function(error) {
        console.log(error);
    });


               // console.log('derived_rows', the_rows);
                //console.log('my_data', my_data);
            } )

          //  return Promise.all([promise_the_rows]).spread(function (the_rows) {


//console.log('derived_rows', the_rows);
//process.exit(2);

//})
}

         module.exports = getPodcastData         
