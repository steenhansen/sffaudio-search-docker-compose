var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
graph_db.checkDbAlive()

var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');
const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(BuildRepository);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);


var massageData = rootAppRequire(`sff-network/build-nodes/graph-dbs/csv-reload-db`);

var podcast_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/podcastSchema')
var rsd_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/rsdSchema')
var pdf_information = rootAppRequire('sff-network/build-nodes/mediaServer/modules/pdfSchema')


const read_tsv_url = rootAppRequire('sff-network/build-nodes/url-tsv-read');
var {
    makeEdgesNodes, saveTheBooks_b_1, saveTheAuthors_b_2,
        saveThePages_b_3__aa, saveThePages_b_3__bb,
    saveThePodcasts_c_1, saveThePdfs_c_2, saveTheRsds_c_3,
     saveWrittenBy_d_1a, saveWrittenBy_d_1b, 
    saveInserts_d_2a, saveInserts_d_2b, 
    saveWikis_d_3, savePosts_d_4
} = rootAppRequire('sff-network/build-nodes/graphs-edges')

var url_update = function () {
    VersionRepository.updateDbVersion()     // url-csv version
        .then((new_db_version)=> {
                var build_repository = new BuildRepository(graph_db, new_db_version);
                read_tsv_url(media_constants.POST_GOOGLE_DATA)
                    .then((author_book_obj)=> read_csv_google.csvFromUrl(read_csv_google, podcast_information, rsd_information,
                        pdf_information, build_repository, author_book_obj))
                    .then((author_book_posts)=>massageData(new_db_version))
            }
        )
}

var rsd_file = 'sff-network/build-nodes/test-obj-data/real-google-data/rsd-obj.js';
var podcast_file = 'sff-network/build-nodes/test-obj-data/real-google-data/podcast-obj.js';
var pdf_file = 'sff-network/build-nodes/test-obj-data/real-google-data/pdf-obj.js';
var post_file = 'sff-network/build-nodes/test-obj-data/real-google-data/posts-obj.js';


function getPdfsRsdsPodcasts(build_repository) {
    var rsd_csv = rootAppRequire(rsd_file);
    var podcast_csv = rootAppRequire(podcast_file);
    var pdf_csv = rootAppRequire(pdf_file);
    return read_csv_google.getFromCsvFile(podcast_csv, rsd_csv, pdf_csv)
        .then((media_items) => {
            return makeEdgesNodes(media_items, build_repository);
        })
}
/*

 if (update_step===7){

 start_promise.then(()=> {
 return saveD1WrittenBy_6(build_repository)
 return saveWrittenBy_d_1____6(build_repository)
 .then( ()=> VersionRepository.nextUpdateStep(6)
 })


 }



 */

var url_read = function () {
    return VersionRepository.currentDbVersion()
        .then((current_db_version)=> {
                // MATCH (n) DETACH DELETE n
                if (current_db_version === 0) {
                    var start_promise = VersionRepository.createDbVersion1()
                } else {
                    var start_promise = new Promise(function (resolve, reject) {
                        setTimeout(resolve, 0, 42);
                    });
                }

                var next_db_version = current_db_version + 1;
                clog('nex', next_db_version)
                var build_repository = new BuildRepository(graph_db, next_db_version);

                            console.time("s1");
                            console.time("s2");
                            console.time("s3");
                            console.time("s4");
                            console.time("s5");
                            console.time("s6");
                            console.time("s7");
                            console.time("s8");
                            console.time("s9");
                            console.time("s10");
                            console.time("s11");
                            console.time("s12");
                            console.time("s13");
                            console.time("s14");
                            console.time("s15");
                            console.time("s16");
                            console.time("s17");
                            console.time("s18");
                            console.time("s19");
                            console.time("s20");

                start_promise
                    .then(()=> {
                            console.timeEnd("s1");
                            var reload_promise = build_repository.makeIndexes();   //ignore if made?
                            return reload_promise;
                        }
                    )
                    
                    
                    .then(()=> {
                            console.timeEnd("s2");
                            var reload_promise = read_csv_google.reloadDb_PostRead_a_0(post_file);
                            return reload_promise;
                        }
                    )
                    
                    
                    .then(()=> {
                            console.timeEnd("s3");
                            var reload_promise = read_csv_google.reloadDb_RsdRead_a_1(rsd_file, rsd_information);
                            return reload_promise;
                        }
                    )
                    
                    .then(()=> {
                            console.timeEnd("s4");
                            var reload_promise = read_csv_google.reloadDb_PodcastRead_a_2(podcast_file, podcast_information);
                            return reload_promise;
                        }
                    )
                    
                    .then(()=> {
                            console.timeEnd("s5");
                            var reload_promise = read_csv_google.reloadDb_PdfRead_a_3(pdf_file, pdf_information);
                            return reload_promise;
                        }
                    )
                    
                    
                    .then(()=> {
                                console.timeEnd("s6");
                        return getPdfsRsdsPodcasts(build_repository)
                            .then((media_data) => {
                                var reload_promise = saveTheBooks_b_1(media_data, build_repository);
                                return reload_promise;
                            })
                    })
                    
                    
                    .then(()=> {
                                console.timeEnd("s7");
                        return getPdfsRsdsPodcasts(build_repository)
                            .then((media_data) => {
                                var reload_promise = saveTheAuthors_b_2(media_data, build_repository);
                                return reload_promise;
                            })
                    })
                    
                    
                    .then(()=> {
                        console.timeEnd("s8");
                        var author_book_obj = rootAppRequire(post_file);
                        var reload_promise = saveThePages_b_3__aa(build_repository, author_book_obj);
                        return reload_promise;
                    })
                    
                    .then(()=> {
                        console.timeEnd("s9");
                        var author_book_obj = rootAppRequire(post_file);
                        var reload_promise = saveThePages_b_3__bb(build_repository, author_book_obj);
                        return reload_promise;
                    })

                    
                    .then(()=> {
                                console.timeEnd("s10");
                        return getPdfsRsdsPodcasts(build_repository)
                            .then((media_data) => {
                                var reload_promise = saveThePodcasts_c_1(media_data, build_repository);
                                return reload_promise;
                            })
                    })
                    
                    
                    .then(()=> {
                                console.timeEnd("s11");
                        return getPdfsRsdsPodcasts(build_repository)
                            .then((media_data) => {
                                var reload_promise = saveThePdfs_c_2(media_data, build_repository);
                                return reload_promise;
                            })
                    })
                    
                    
                    .then(()=> {          /// inserting
                        console.timeEnd("s12");
                        return getPdfsRsdsPodcasts(build_repository)
                            .then((media_data) => {
                                var reload_promise = saveTheRsds_c_3(media_data, build_repository);
                                return reload_promise;
                            })
                    })
                    
                    
                    
                    
      
      
      
      
      
      /////////// now making edges              
                    
                    .then(()=> {
                          console.timeEnd("s13");    //25sec
                        var reload_promise = saveWrittenBy_d_1a(build_repository);
                        return reload_promise;
                    })
                    
                    .then(()=> {
                          console.timeEnd("s14");    //40sec  
                        var reload_promise = saveWrittenBy_d_1b(build_repository);   //addWrittenBy
                        return reload_promise;
                    })

                    .then(()=> {
                         console.timeEnd("s15");   //80 sec            ******
                        var reload_promise = saveInserts_d_2a(build_repository);
                        return reload_promise;
                    })

                    .then(()=> {
                         console.timeEnd("s16");  
                        var reload_promise = saveInserts_d_2b(build_repository);
                        return reload_promise;
                    })
                    
                    
                    
                    .then(()=> {
                         console.timeEnd("s17");
                        var reload_promise = saveWikis_d_3(build_repository);
                        return reload_promise;
                    })
                    
                    .then(()=> {
                         console.timeEnd("s18");
                        var reload_promise = savePosts_d_4(build_repository);
                        return reload_promise;
                    })
                    
                    .then(()=> {
                         console.timeEnd("s19");
                        var reload_promise = massageData(next_db_version);
                        return reload_promise;
                    })
                    
                    
                    .then(()=> {
                         console.timeEnd("s20");
                        var reload_promise = VersionRepository.updateDbVersion();
                        return reload_promise;
                    })


                    .then(()=> {

                        console.log('done');
                        stop('donesky')
                    })


            }
        )
}

module.exports = url_read;



            
            
            
    

