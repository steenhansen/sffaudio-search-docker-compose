

module.exports = function (csv_directory) {


    var media_constants = rootAppRequire('sff-network/media-constants');
    var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
    graph_db.checkDbAlive()

    var BuildRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/build-repository');
    const read_csv_google = rootAppRequire('sff-network/build-nodes/read-csv-google')(BuildRepository);
    var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

    var podcast_csv = rootAppRequire(csv_directory + 'podcast-csv.js');
    var rsd_csv = rootAppRequire(csv_directory + 'rsd-csv.js');
    var pdf_csv = rootAppRequire(csv_directory + 'pdf-csv.js');

    var author_book_tsv = rootAppRequire(csv_directory + 'book-author-posts.tsv');
    const read_tsv_text = rootAppRequire('sff-network/build-nodes/text-tsv-read');

    var massageData = rootAppRequire(`sff-network/build-nodes/graph-dbs/csv-reload-db`);

    var csv_update = function () {
        VersionRepository.updateDbVersion()     // csv-file version
            .then((new_db_version)=> {
                    var build_repository = new BuildRepository(graph_db, new_db_version);            
                    read_tsv_text(author_book_tsv)
                        .then( (author_book_obj)=>  read_csv_google.csvFromFiles(read_csv_google, podcast_csv, 
                                                         rsd_csv, pdf_csv, build_repository, author_book_obj) )
                        .then((author_book_posts)=> massageData(new_db_version))
                }
            )
    }

    return csv_update;
}
 

            
            
            
    

