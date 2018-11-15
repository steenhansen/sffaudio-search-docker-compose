var media_constants = rootAppRequire('sff-network/media-constants');
const {DELETE_UNUSED_RECORDS}=media_constants;
module.exports = function (graph_db) {

    class VersionRepository {


//   we need a update tracker,,,,
//   L_UPDATE_STATE
//    STEP 1,2,3,4....   THIS WILL GIVE US AN ARRAY INDEX OF THENABLES


//

// if we store the update_steps inside the L_VERSION, then we can
// to an atomic update of 'update_step=0' and 'db_version=+1' in one shot


        /*
         VersionRepository.updateDbVersion()
         .then( (new_db_version)=>console.log('new_version==', new_db_version));
         */

        static saveAuthors(db_version, all_links) {
            var sql = ` CREATE ( n_authors_list:L_AUTHOR_LIST  
                                 { all_links:{all_links}, db_version:{db_version}  }  ) `;
            var params = {all_links, db_version};
            return graph_db.sqlParams(sql, params);
        }
        
         static getAuthors() {
            var sql = ` MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version as v_db_version
                          MATCH ( n_authors_list:L_AUTHOR_LIST)
                         WHERE n_authors_list.db_version=v_db_version
                         RETURN n_authors_list.all_links `;
            var params = {};
            return graph_db.sqlParams(sql, params);
        }
        
        
        
                static saveBooks(db_version, all_links) {
            var sql = ` CREATE ( n_books_list:L_BOOK_LIST  
                                 { all_links:{all_links}, db_version:{db_version}  }  ) `;
            var params = {all_links, db_version};
            return graph_db.sqlParams(sql, params);
        }
         static getBooks() {
            var sql = ` MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version as v_db_version
                          MATCH ( n_books_list:L_BOOK_LIST)
                         WHERE n_books_list.db_version=v_db_version
                         RETURN n_books_list.all_links `;
            var params = {};
            return graph_db.sqlParams(sql, params);
        }



        static saveQuality(db_version, quality_code) {
            var sql = ` CREATE ( n_quality:L_QUALITY  
                                 { quality_code:{quality_code}, db_version:{db_version}  }  ) `;
            var params = {quality_code, db_version};
            return graph_db.sqlParams(sql, params);
        }

    static getQuality() {
            var sql = ` MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version as v_db_version
                          MATCH (n_quality:L_QUALITY)
                         WHERE n_quality.db_version=v_db_version
                         RETURN n_quality.quality_code `;
            var params = {};
            return graph_db.sqlParams(sql, params);
        }

        static updateDbVersion() {
            var update_sql = ` // VersionRepository.updateDbVersion.update           
                        MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version+1 as v_new_db_version
                        MERGE (n_version:L_VERSION)
                 ON MATCH SET n_version.current_version = v_new_db_version ,
                              n_version.update_step = 0 `;
            return graph_db.sqlParams(update_sql, {});
        }


        static updateDbVersion_d_2(next_db_version) {
            var update_sql = ` // VersionRepository.updateDbVersion.update           
                    
                        MATCH  (n_version:L_VERSION)
                        SET n_version.current_version = {next_db_version} `;
            return graph_db.sqlParams(update_sql, {next_db_version});
        }


        static currentDbVersion() {
            var current_sql = ` // VersionRepository.currentDbVersion        
                                MATCH (n_version:L_VERSION )
                               RETURN * `;
            return graph_db.sqlParams(current_sql, {})
                .then((current_version_record)=> {
                        if (typeof current_version_record.records[0] === 'undefined') {
                            return 0;
                        } else {
                            return current_version_record.records[0]._fields[0].properties.current_version;
                        }
                    }
                )
        }

        static createDbVersion1() {
            var create_sql = ` // VersionRepository.createDbVersion        
                        MERGE (n_version:L_VERSION)
                ON CREATE SET n_version.current_version = 1                `;
            return graph_db.sqlParams(create_sql, {});
        }


        /*
         VersionRepository.deleteUnused(123)
         .then( (db_version_counts)=>console.log('db_version_counts==', db_version_counts));
         */
        static deleteUnused_d_4(next_db_version, limit_records = DELETE_UNUSED_RECORDS) {

            var unused_sql = ` // VersionRepository.deleteUnused.unused_sql        
                         MATCH (n_nodes) 
                         WHERE (NOT n_nodes:L_VERSION)
                           AND n_nodes.db_version<{next_db_version}
                          WITH n_nodes LIMIT ${limit_records}
                 DETACH DELETE n_nodes  `;

            var params = {next_db_version};
            return graph_db.sqlParams(unused_sql, params);

        }


    }
    return VersionRepository;
}
