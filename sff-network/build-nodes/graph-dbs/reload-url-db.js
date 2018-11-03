
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
module.exports = url_update;



            
            
            
    

