var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var BuildRepository = rootAppRequire('common-node/build-nodes/graph-dbs/build-repository');
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);
var author_book_caches = rootAppRequire(`common-node/build-nodes/graph-dbs/author-book-caches`);
const read_csv_google = rootAppRequire('common-node/build-nodes/read-csv-google')(BuildRepository);
var misc_helper = rootAppRequire('common-node/misc-helper');
//var request_promise = require('request-promise');



// function doCacheClear() {
//    // var cache_clear_signal =  graph_constants.ERASE_CACHES_URL;  
//     console.log('aaaaAAAAAAAAAAAAaaaaaaaaaaaaaa cache_clear_signal=', cache_clear_signal)
//     const optionsStart = {
//         uri: cache_clear_signal,
//         method: "GET",
//         headers: {"Content-type": "application/text"}
//     };

//     return request_promise(optionsStart)
//         .then((body)=> {
//             if (body === graph_constants.CACHES_ARE_CLEAR) {
//                 return body;
//             } else {
//                 throw new Error('failed update: problem with cache clear : ' + body);
//             }
//         })
// }


function ensureDbAlive(current_db_version) {
    if (current_db_version === 0) {
        var dbIsCreated = VersionRepository.createDbVersion1()
    } else {
        var dbIsCreated = Promise.resolve();
    }
//console.log('ensureDbAlive current_db_version ==', current_db_version, )
//console.log('ensureDbAlive dbIsCreated ==', dbIsCreated, )

//die('stop here 234087')

    return dbIsCreated;
}

function garbageWait() {
    if (typeof process.env.GRAPHENE_WAIT_SECONDS !== 'undefined') {
        var graphene_wait_seconds = process.env.GRAPHENE_WAIT_SECONDS;
    } else {
        var graphene_wait_seconds = 30;
    }
    return graphene_wait_seconds;
}

function makeLinks(graphs_edges, build_repository, show_or_hide_seconds) {
    return graphs_edges.linkPdfToBook_c_1(build_repository, show_or_hide_seconds)
        .then(()=>graphs_edges.linkPodcastsToBook_c_3(build_repository, show_or_hide_seconds))
        .then(()=>graphs_edges.linkRsdsToBook_c_4(build_repository, show_or_hide_seconds))
        .then(()=>graphs_edges.linkBooksAuthorsToWikis_c_5(build_repository, show_or_hide_seconds))
        .then(()=>graphs_edges.linkBooksToPosts_c_6(build_repository, show_or_hide_seconds))
}

function makeCaches(graphs_edges, next_db_version, absolute_data_dir, show_or_hide_seconds) {
    return author_book_caches.makeNewCaches_d_0(next_db_version, absolute_data_dir, show_or_hide_seconds)
        .then(()=> author_book_caches.makeNewCaches_d_1(next_db_version, show_or_hide_seconds))
        .then(()=> graphs_edges.nextDbVersion_d_2(VersionRepository, next_db_version, show_or_hide_seconds))    // UPDATE DONE
        .then(()=> author_book_caches.makeNewCaches_d_3(VersionRepository, show_or_hide_seconds))
        .then(()=> VersionRepository.deleteUnused_d_4(next_db_version))
}

function makeMedia(graphs_edges, build_repository, show_or_hide_seconds, graphene_wait_seconds, number_authors) {
    return graphs_edges.buildAllPosts_b_3(build_repository, show_or_hide_seconds)
        .then(()=>graphs_edges.buildBookPosts_b_7(build_repository, show_or_hide_seconds))
        .then(()=>graphs_edges.buildPodcasts_b_8(build_repository, show_or_hide_seconds))
        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))
        .then(()=>graphs_edges.buildPdfs_b_9(build_repository, show_or_hide_seconds))   //5=>17 10=17 20=15
        .then(()=>graphs_edges.buildRsds_b_10(build_repository, show_or_hide_seconds))
}

function makeBooksAuthors(graphs_edges, build_repository, show_or_hide_seconds, graphene_wait_seconds) {
    return graphs_edges.buildAllAuthors_b_2(build_repository, show_or_hide_seconds)
        .then((number_of_authors)=> {
            number_authors = number_of_authors;
        })
        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))
        .then(()=>graphs_edges.buildAllBooks_b_1(build_repository, show_or_hide_seconds))
        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))       // 20=4.3
        .then(()=>number_authors)
}


class reloadBase {
    static  buildData(show_or_hide_seconds = '') {
        var absolute_data_dir;
        var graphs_edges;
        return VersionRepository.currentDbVersion()
            .then((current_db_version)=> {
                var current_db_version = parseInt(current_db_version, 10);
                if (isNaN(current_db_version)) {
                    current_db_version = 0;
                }

            //   <a name="fast-start"></a>
                    var dbIsCreated = ensureDbAlive(current_db_version);
                    var next_db_version = current_db_version + 1;
                    console.log('current_db_version', current_db_version)
                    console.log('process.env.START_LOAD_DB', process.env.START_LOAD_DB)
                    console.log('next_db_version', next_db_version)


                    
                    var build_repository = new BuildRepository(graph_db, next_db_version);
                    var graphene_wait_seconds = garbageWait();
                    return dbIsCreated
                        .then(()=> { 
                            read_csv_google.startMakeIndexes_a_0(build_repository, show_or_hide_seconds)})
                        .then(()=>this.readSheets())
                        .then(relative_obj_dir=> {
                            absolute_data_dir = fromAppRoot('/') + relative_obj_dir;        //  /app//app/common-node/build-nodes/test-obj-data/real-google-data/
                            graphs_edges = rootAppRequire('common-node/build-nodes/graphs-edges')(absolute_data_dir);
                           
                           // I think this is being cached
                    //        console.log('***********************************************', relative_obj_dir, absolute_data_dir)
                        
                        
                        })
                        .then(()=>makeBooksAuthors(graphs_edges, build_repository, show_or_hide_seconds, graphene_wait_seconds))
                        .then((number_authors)=>makeMedia(graphs_edges, build_repository, show_or_hide_seconds, graphene_wait_seconds, number_authors))
                        .then(()=> makeLinks(graphs_edges, build_repository, show_or_hide_seconds))
                        .then(()=> makeCaches(graphs_edges, next_db_version, absolute_data_dir, show_or_hide_seconds))
                 //       .then(()=> doCacheClear())  // this calls php in sffaudio
                        .catch(function (e) {
                            console.log('after doCacheClear, maybe site down', e);
                        })
                        .finally(()=> {
                            console.log('reload-db done !!!!!!!!!!!!!!!!!!!!!!!');             // error is here
                        })
                        return;
                }
            )
    }


}

module.exports = reloadBase;



            
            
            
    

