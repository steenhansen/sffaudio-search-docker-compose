/*

    > /podcast-neo4j/
    node ./test/unit/2-authors ../local-config-env

*/
const util = require('util')

//require('./../../rootAppRequire')
require('../../sff-network/global-require')

const pdf_pkd = rootAppRequire('test/data/2-authors/pdf-2-authors');
const rsd_pkd = [];
const podcasts_pkd = [];





const setCheckHerokuEnvVars = rootAppRequire('sff-network/heroku-config-vars');
const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];
let env_filename = process.argv[2]
setCheckHerokuEnvVars(CONFIG_ENV_KEYS, env_filename);




var media_constants = rootAppRequire('sff-network/media-constants');


var read_podcast_data=rootAppRequire('sff-network/read-podcast-data')


let graph_db = rootAppRequire('sff-network/neo4j-session')(media_constants.NEO4J_VERSION);  


const neo4j_session = rootAppRequire('sff-network/neo4j-session');
//var neo_session = neo4j_session.neo4jSession(media_constants.NEO4J_VERSION);  
    

 var {makeEdgesNodes, saveToGraph} = rootAppRequire('sff-network/build-nodes/graph-edges');
//var save_to_graph=rootAppRequire('sff-network/save-to-graph');
//var build_edges=rootAppRequire('sff-network/build-edges')





var ParseNeo=rootAppRequire('sff-network/show-nodes/parse-neo');



read_podcast_data.getAllCsv_test(podcasts_pkd, rsd_pkd, pdf_pkd)
    .then (function (media_items) {
      
                var media_data = makeEdgesNodes(media_items);
                var q = saveToGraph(media_data) 
             	return q;
            })

	.then(  (res)=>graph_db(` WITH 'martin_caidin' AS v_strip_author
	MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)-[r_book_to_pdf:L_BOOK_TO_PDF]-(n_pdf:L_PDF)
	WHERE n_author.strip_author = v_strip_author
	OPTIONAL MATCH (n_book:L_BOOK)-[r_book_to_rsd:L_BOOK_TO_RSD]-(n_rsd:L_RSD)
	OPTIONAL MATCH (n_book:L_BOOK)-[r_book_to_podcast:L_BOOK_TO_PODCAST]-(n_podcast:L_PODCAST)
	OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]-(n_author_wiki:L_AUTHOR_WIKI)
	OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
	RETURN * `)
				.then( function(result) {
//console.dir('2222222',result)

//obj = JSON.parse(result);


/*var test = {
"keys":	["n_author","n_author_wiki","n_book","n_book_wiki","n_pdf","n_podcast","n_rsd","r_author_to_book","r_author_to_wiki","r_book_to_pdf","r_book_to_podcast","r_book_to_rsd","r_book_wiki_to_book","striped_underscored_author"],
	"length":14,
	"_fields":[
		{"identity":{"low":2603,"high":0},"labels":["L_AUTHOR"],"properties":{"author_name":"Martin Caidin","strip_author":"martin_caidin"}}
		,null,
		{"identity":{"low":2604,"high":0},"labels":["L_BOOK"],"properties":{"under_title":"thunderbolt","book_title":"Thunderbolt!","strip_1_author":"robert_s_johnson","strip_2_author":"martin_caidin"}},
		null,{"identity":{"low":2607,"high":0},"labels":["L_PDF"],"properties":{"pdf_title":"Ballantine Books, 1958","pdf_url":"http://www.sffaudio.com/podcasts/ThunderboltByRobertS.JohnsonWithMartinCaidin.pdf","under_title":"thunderbolt","strip_1_author":"robert_s_johnson","strip_2_author":"martin_caidin"}},
		null,null,
		{"identity":{"low":1266,"high":0},"start":{"low":2603,"high":0},"end":{"low":2604,"high":0},"type":"L_AUTHOR_TO_BOOK","properties":{}}
		,null,{"identity":{"low":1267,"high":0},"start":{"low":2604,"high":0},"end":{"low":2607,"high":0},"type":"L_BOOK_TO_PDF","properties":{}}
		,null,null,null,"martin_caidin"],
	"_fieldLookup":{"n_author":0,"n_author_wiki":1,"n_book":2,"n_book_wiki":3,"n_pdf":4,"n_podcast":5,"n_rsd":6,"r_author_to_book":7,"r_author_to_wiki":8,"r_book_to_pdf":9,"r_book_to_podcast":10,"r_book_to_rsd":11,"r_book_wiki_to_book":12,"striped_underscored_author":13}}    ;     
                   
                   console.log(test.length)    */  
                         
                                                                                         
//console.dir('333333', obj)
//https://neo4j.com/docs/api/javascript-driver/current/class/src/v1/record.js~Record.html#instance-method-get

		 				 result.records.forEach(function(record) {
		 				 	console.dir('0000000000000000')
      
      //console.log(record)   
    //  var links = parse_neo_queries.getRelationships(record);
      var parse_neo = new ParseNeo(record);
       parse_neo.getRelationships()
     
        var nodes = parse_neo.getNodes()

        var nodes = parse_neo.getGraph()

     // console.log(nodes)
							               /// console.log(record.length)      

      // var str_items = JSON.stringify(record);
      // var new_json = JSON.parse(str_items)
		//  console.log(str_items)				
		//   console.log(new_json)
//		 				     console.dir(record.get(0))
                             //console.dir(record)

                         //    console.log(util.inspect(record, false, null))
                  
                            console.dir('1111111111111111111')
                    

		 				 } )
                		})
)


