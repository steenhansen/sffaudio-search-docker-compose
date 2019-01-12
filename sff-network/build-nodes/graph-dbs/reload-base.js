var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);
var author_book_caches = rootAppRequire(`sff-network/build-nodes/graph-dbs/author-book-caches`);

const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(BuildRepository);
var misc_helper = rootAppRequire('sff-network/misc-helper');

class reloadBase {

    static  buildData(show_or_hide_seconds='') {     // 'hide--seconds' 

        // if (typeof show_or_hide_seconds==='undefined'){
        //     show_or_hide_seconds='';
        // }
        return VersionRepository.currentDbVersion()
            .then((current_db_version)=> {
                    // MATCH (n) DETACH DELETE n


                    var current_db_version = parseInt(current_db_version, 10);
                    if (current_db_version === 0) {
                        var dbIsCreated = VersionRepository.createDbVersion1()
                    } else {
                       var dbIsCreated = Promise.resolve();
                    }

                    var next_db_version = current_db_version + 1;
                    var build_repository = new BuildRepository(graph_db, next_db_version);
                    var graphs_edges = 'empty graphs_edges';
                    var absolute_data_dir = 'empty absolute_data_dir'
                    var number_authors = 0;
                    if (typeof process.env.GRAPHENE_WAIT_SECONDS !== 'undefined') {
                        var graphene_wait_seconds = process.env.GRAPHENE_WAIT_SECONDS;
                    } else {
                        var graphene_wait_seconds = 30;

                    }

                   return dbIsCreated
                        .then(()=> read_csv_google.startMakeIndexes_a_0(build_repository,show_or_hide_seconds))
                        .then(()=>this.readSheets())
                        .then(relative_obj_dir=> {
                            absolute_data_dir = fromAppRoot('/') + relative_obj_dir;        //  /app//app/sff-network/build-nodes/test-obj-data/real-google-data/
                            graphs_edges = rootAppRequire('sff-network/build-nodes/graphs-edges')(absolute_data_dir);
                        })
                        .then(()=>graphs_edges.buildAllAuthors_b_2(build_repository,show_or_hide_seconds))
                        .then((number_of_authors)=> {
                            number_authors = number_of_authors;
                            misc_helper.waitSeconds(0, number_authors)
                        })
                        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))
                        .then(()=>graphs_edges.buildAllBooks_b_1(build_repository, show_or_hide_seconds))


                        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))       // 20=4.3
                      
                      //  .then(()=>graphs_edges.buildPodcastsPage_b_4(build_repository, show_or_hide_seconds))
   //                     .then(()=>misc_helper.waitSeconds(0, number_authors))
                        
                        
                        
                        .then(()=>graphs_edges.buildAllPosts_b_3(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))


                        //.then(()=>graphs_edges.buildPdfsPage_b_5(build_repository, show_or_hide_seconds))
     //                   .then(()=>misc_helper.waitSeconds(0, number_authors))
     
                        //.then(()=>graphs_edges.buildRsdsPage_b_6(build_repository, show_or_hide_seconds))
       //                 .then(()=>misc_helper.waitSeconds(0, number_authors))
     
     
     
                        .then(()=>graphs_edges.buildBookPosts_b_7(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.buildPodcasts_b_8(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(graphene_wait_seconds, number_authors))
                        .then(()=>graphs_edges.buildPdfs_b_9(build_repository, show_or_hide_seconds))   //5=>17 10=17 20=15
                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.buildRsds_b_10(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))

                        .then(()=>graphs_edges.linkPdfToBook_c_1(build_repository, show_or_hide_seconds))

                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.linkPodcastsToBook_c_3(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.linkRsdsToBook_c_4(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.linkBooksAuthorsToWikis_c_5(build_repository, show_or_hide_seconds))
                        .then(()=>misc_helper.waitSeconds(0, number_authors))
                        .then(()=>graphs_edges.linkBooksToPosts_c_6(build_repository, show_or_hide_seconds))


                        .then(()=> author_book_caches.makeNewCaches_d_0(next_db_version, absolute_data_dir, show_or_hide_seconds))
                        .then(()=> author_book_caches.makeNewCaches_d_1(next_db_version, show_or_hide_seconds))
                       // .then(()=> author_book_caches.makeNewCaches_d_1_1_1())
                        .then(()=> graphs_edges.nextDbVersion_d_2(VersionRepository, next_db_version, show_or_hide_seconds))    // UPDATE DONE
                        .catch(function (e) {
                            console.log('reload-url-db', e);

                            // VersionRepository.deleteFail_d_5(next_db_version)
                            //     .then(()=> {
                            //             console.log('failed update');
                            //             throw 'failed update';
                            //             process.exit();
                            //         }
                            //     )

                        })
                         .then(()=> author_book_caches.makeNewCaches_d_3(VersionRepository, show_or_hide_seconds))
                        .catch(function (e) {
                            console.log('makeNewCaches_d_3', e);
                        })
                        
                        
                        
                        .then(()=> VersionRepository.deleteUnused_d_4(next_db_version))
                        
                        .catch(function (e) {
                            console.log('reload-url-db', e);
                        })
                        .finally(()=> {
                            console.log('    reload-db done');
                            return;
                            //process.exit();
                        })


                }
            )
    }


}

module.exports = reloadBase;



            
            
            
    

