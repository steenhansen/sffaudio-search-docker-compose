var graph_constants = rootAppRequire('common-node/graph-constants');
const {NO_RECORD_LIMIT}=graph_constants;

//      var delete_all_sql = 'MATCH (n) DETACH DELETE n'

module.exports = function (graph_db) {


    class ShowRepository {


/*

                PROFILE  MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_db_version, 'philip-k-dick' AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to_media]-(n_book_or_post_or_wiki)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_author.db_version=v_db_version
                        RETURN *
                      ORDER BY n_book_or_post_or_wiki.post_title

 */


        static getAuthorNodes(strip_author, update_index) {
            var sql4 = ` // ShowRepository.getAuthorsNodes
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to_media]-(n_book_or_post_or_wiki)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_author.db_version=v_db_version
                        RETURN *
                      ORDER BY n_book_or_post_or_wiki.post_title
                           `;
            var params4 = {strip_author, update_index};
            var neo4j_promise4 = graph_db.sqlParams(sql4, params4)
            return Promise.all([neo4j_promise4]);
        }
        
        
        
        /*
                PROFILE  MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_db_version, 'beyond-lies-the-wub' AS v_under_title
                         MATCH (n_book:L_BOOK)-[r_book_to_media]-(n_pdf_or_rsd_or_podcast_or_post_or_wiki_or_author)
                         WHERE n_book.under_title = v_under_title  
                           AND n_book.db_version=v_db_version
                        RETURN *  
                        ORDER BY n_pdf_or_rsd_or_podcast_or_post_or_wiki_or_author.post_title
        
         */

        static getBookNodes(under_title) {
            var sql = ` // ShowRepository.getBookNodes
			             MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_db_version, {under_title} AS v_under_title
                         MATCH (n_book:L_BOOK)-[r_book_to_media]-(n_pdf_or_rsd_or_podcast_or_post_or_wiki_or_author)
                         WHERE n_book.under_title = v_under_title  
                           AND n_book.db_version=v_db_version
                        RETURN *  
                      ORDER BY n_pdf_or_rsd_or_podcast_or_post_or_wiki_or_author.post_title 
                        `;
            var params = {under_title};
            var neo4j_promise = graph_db.sqlParams(sql, params)
            return Promise.all([neo4j_promise]);
        }

        static  booksNextVersion() {
            var sql = ` // ShowRepository.booksNextVersion()
                          MATCH (n_version:L_VERSION) 
                           WITH n_version.current_version+1 as v_new_db_version
                          MATCH (n_book:L_BOOK)
                          WHERE n_book.db_version=v_new_db_version
                RETURN DISTINCT n_book.under_title, n_book.book_title, n_book.sorted_label, n_book.last_first_underscores
                       ORDER BY n_book.sorted_label `;
            var params = {};
            var neo4j_promise = graph_db.sqlParams(sql, params)
            return neo4j_promise;
        }

        static limitSql(sql_statement, params) {
            if (typeof params.record_limit != 'undefined') {
                if (params.record_limit != NO_RECORD_LIMIT) {
                    sql_statement += ` LIMIT ` + this.record_limit;
                }
                delete params.record_limit;
            }
            var neo4j_promise = graph_db.sqlParams(sql_statement, params)
            return neo4j_promise;
        }

        static authorsNextVersion() {
            var sql = ` // ShowRepository.authorsNextVersion()
                          MATCH (n_version:L_VERSION) 
                           WITH n_version.current_version+1 as v_new_db_version
                          MATCH (n_author:L_AUTHOR)
                          WHERE n_author.db_version=v_new_db_version
                RETURN DISTINCT n_author.strip_author, n_author.sorted_label, n_author.author_name
                       ORDER BY LOWER(n_author.sorted_label) ASC `;


            // stop(' we are here')
            var params = {};
            return ShowRepository.limitSql(sql, params);
        }

        static getDbVersion() {
            var sql = ` // ShowRepository.getDbVersion()
                          MATCH (n_version:L_VERSION) 
                           RETURN  n_version`;
            var params = {};
            return ShowRepository.limitSql(sql, params);
        }


    }
    return ShowRepository;
}
