var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);
var author_book_caches = rootAppRequire(`sff-network/build-nodes/graph-dbs/author-book-caches`);

const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(BuildRepository);

class reloadBase {

    static  buildData() {
        console.time("reload-url-db");
        return VersionRepository.currentDbVersion()
            .then((current_db_version)=> {
                    // MATCH (n) DETACH DELETE n
                    var current_db_version = parseInt(current_db_version, 10);
                    if (current_db_version === 0) {
                        var dbIsCreated = VersionRepository.createDbVersion1()
                    } else {
                        var dbIsCreated = new Promise(function (resolve) {
                            setTimeout(resolve, 0);
                        });
                    }

                    var next_db_version = current_db_version + 1;
                    var build_repository = new BuildRepository(graph_db, next_db_version);
                    var graphs_edges = 'empty graphs_edges';
                    var data_dir = 'empty data_dir'


                  dbIsCreated
                        .then(()=> read_csv_google.startMakeIndexes_a_0(build_repository))
                        .then( ()=>this.readSheets() )
                        .then(obj_dir=> {
                        data_dir=obj_dir;
                            graphs_edges = rootAppRequire('sff-network/build-nodes/graphs-edges')(obj_dir);
                        })
                         .then(()=>graphs_edges.buildAllBooks_b_1(build_repository))
                        .then(()=>graphs_edges.buildAllAuthors_b_2(build_repository))
                        .then(()=>graphs_edges.buildAllPosts_b_3(build_repository))
                        .then(()=>graphs_edges.buildPodcastsPage_b_4(build_repository))
                        .then(()=>graphs_edges.buildPdfsPage_b_5(build_repository))
                        .then(()=>graphs_edges.buildRsdsPage_b_6(build_repository))
                        .then(()=>graphs_edges.buildBookPosts_b_7(build_repository))
                        .then(()=>graphs_edges.buildPodcasts_b_8(build_repository))
                        .then(()=>graphs_edges.buildPdfs_b_9(build_repository))
                        .then(()=>graphs_edges.buildRsds_b_10(build_repository))
                        
                        .then(()=>graphs_edges.linkPdfToBook_c_1(build_repository))
                        .then(()=>graphs_edges.linkAuthorToBook_c_2(build_repository))
                        .then(()=>graphs_edges.linkPodcastsToBook_c_3(build_repository))
                        .then(()=>graphs_edges.linkRsdsToBook_c_4(build_repository))
                        .then(()=>graphs_edges.linkBooksAuthorsToWikis_c_5(build_repository))
                        .then(()=>graphs_edges.linkBooksToPosts_c_6(build_repository))



                        .then(()=> author_book_caches.makeNewCaches_d_0(next_db_version,  data_dir))

                        .then(()=> author_book_caches.makeNewCaches_d_1(next_db_version))
                        .then(()=> VersionRepository.updateDbVersion_d_2(next_db_version))
                        .then(()=> VersionRepository.deleteUnused_d_4(next_db_version))

                        .catch(function (e) {
                            console.log('reload-url-db', e);
                        })
                        .finally(()=> {
                            console.timeEnd("reload-url-db");
                            console.log('reload-url-db done');
                            process.exit();
                        })


                }
            )
    }


}

module.exports = reloadBase;



            
            
            
    

