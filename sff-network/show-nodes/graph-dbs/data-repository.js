var media_constants = rootAppRequire('sff-network/media-constants');
const {NO_RECORD_LIMIT}=media_constants;
module.exports = function (graph_db) {   



// show-repository       ShowRepository


    class DataRepository {



/*
MATCH (n_author)
WHERE n_author.strip_author contains "poe" 
RETURN n_author


MATCH (n_book)
WHERE n_book.book_title contains "Odyssey (" 
RETURN n_book


MATCH (n_version:L_VERSION) 
			            RETURN 1 AS r_author_to__, 2 AS r_author_to_wiki, 3 AS n_author, 4 AS n_author_wiki, n_version AS n_book_or_post
				UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, 'homer' AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to__:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_author.strip_author=v_strip_author
                           AND (n_book.strip_1_author=v_strip_author OR n_book.strip_2_author=v_strip_author)
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]- (n_author_wiki:L_AUTHOR_WIKI)
                        RETURN r_author_to__, r_author_to_wiki, n_author,  n_author_wiki, n_book AS n_book_or_post
               UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, 'homer' AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to__:L_AUTHOR_TO_POST]-  (n_post:L_POST)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_post.strip_author=v_strip_author
                           AND n_post.db_version=v_new_db_version
                OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]- (n_author_wiki:L_AUTHOR_WIKI)
                        RETURN r_author_to__, r_author_to_wiki, n_author, n_author_wiki, n_post AS n_book_or_post 


*/
        static getAuthorNodes(strip_author) {
            var sql4 = ` // DataRepository.getAuthorsNodes
                         MATCH (n_version:L_VERSION) 
			            RETURN 1 AS r_author_to__, 2 AS r_author_to_wiki, 3 AS n_author, 4 AS n_author_wiki, n_version AS n_book_or_post
				UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to__:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_author.strip_author=v_strip_author
                           AND (n_book.strip_1_author=v_strip_author OR n_book.strip_2_author=v_strip_author)
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]- (n_author_wiki:L_AUTHOR_WIKI)
                        RETURN r_author_to__, r_author_to_wiki, n_author,  n_author_wiki, n_book AS n_book_or_post
               UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to__:L_AUTHOR_TO_POST]-  (n_post:L_POST)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_post.strip_author=v_strip_author
                           AND n_post.db_version=v_new_db_version
                OPTIONAL MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]- (n_author_wiki:L_AUTHOR_WIKI)
                        RETURN r_author_to__, r_author_to_wiki, n_author, n_author_wiki, n_post AS n_book_or_post    `;
            var params4 = {strip_author};
            var neo4j_promise4 = graph_db.sqlParams(sql4, params4)
            return Promise.all([neo4j_promise4]);
        }

        static getBookNodes(under_title) {
            var sql = ` // DataRepository.getBookNodes
            
              MATCH (n_version:L_VERSION) 
			            RETURN 1 AS r_author_to_book, 2 AS r_book_to__, 3 AS r_book_wiki_to_book, 4 AS r_alls, 5 AS n_alls, 6 AS n_author,
			                   7 AS n_book, 8 AS n_book_wiki, n_version AS n_pdf_or_rsd_or_podcast
				UNION
            
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_book.under_title = v_under_title  
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
                          WITH r_author_to_book,r_book_wiki_to_book, n_book, n_author, n_book_wiki, v_new_db_version
                         MATCH  (n_book:L_BOOK)-[r_book_to__:L_BOOK_TO_PDF]-(n_pdf_or_rsd_or_podcast:L_PDF)-[r_alls:L_PDF_TO_PAGES]-(n_alls:L_PAGE_PDFS)
                         WHERE (n_pdf_or_rsd_or_podcast.strip_1_author=n_author.strip_author 
                                OR n_pdf_or_rsd_or_podcast.strip_2_author=n_author.strip_author)
                           AND n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to__, r_book_wiki_to_book, r_alls, n_alls, n_author, n_book, n_book_wiki, n_pdf_or_rsd_or_podcast
                UNION                    
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
                          WITH r_author_to_book, r_book_wiki_to_book, n_book, n_author, n_book_wiki, v_new_db_version
                         MATCH  (n_book:L_BOOK)-[r_book_to__:L_BOOK_TO_PODCAST]-(n_pdf_or_rsd_or_podcast:L_PODCAST)-[r_alls:L_PODCASTS_TO_PAGES]-(n_alls:L_PAGE_PODCASTS)
                         WHERE n_book.db_version=v_new_db_version 
                        RETURN r_author_to_book, r_book_to__, r_book_wiki_to_book, r_alls, n_alls, n_author, n_book, n_book_wiki, n_pdf_or_rsd_or_podcast            
                UNION 
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
                          WITH r_author_to_book, r_book_wiki_to_book, n_book, n_author, n_book_wiki, v_new_db_version
                         MATCH (n_book:L_BOOK)-[r_book_to__:L_BOOK_TO_RSD]-(n_pdf_or_rsd_or_podcast:L_RSD) -[r_alls:L_RSDS_TO_PAGES]-(n_alls:L_PAGE_RSDS)
                         WHERE n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to__, r_book_wiki_to_book, r_alls, n_alls,  n_author, n_book, n_book_wiki,  n_pdf_or_rsd_or_podcast  
                        
                        
                UNION 
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                OPTIONAL MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
                          WITH r_author_to_book, r_book_wiki_to_book, n_book, n_author, n_book_wiki, v_new_db_version
                         MATCH (n_book:L_BOOK)-[r_book_to__:L_BOOK_TO_POST]-(n_pdf_or_rsd_or_podcast:L_BOOK_POST)   
                         WHERE n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to__, r_book_wiki_to_book, 'a' as r_alls, 'b' as n_alls,  n_author, n_book, n_book_wiki,  n_pdf_or_rsd_or_podcast     
                        
                        
                                     
                     `;
                     
                     //      n_pdf_or_rsd_or_podcast_or_post
                     
            var params = {under_title};
            var neo4j_promise = graph_db.sqlParams(sql, params)
            return Promise.all([neo4j_promise]);
        }

        static  getSortedBooks() {
            var sql = ` // DataRepository.getSortedBooks()
                          MATCH (n_version:L_VERSION) 
                           WITH n_version.current_version as v_new_db_version
                          MATCH (n_book:L_BOOK)
                          WHERE n_book.db_version=v_new_db_version
                RETURN DISTINCT n_book.under_title, n_book.book_title, n_book.sorted_label, n_book.strip_1_author
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

        static getSortedAuthors() {
            var sql = ` // DataRepository.getSortedAuthors()
                          MATCH (n_version:L_VERSION) 
                           WITH n_version.current_version as v_new_db_version
                          MATCH (n_author:L_AUTHOR)
                          WHERE n_author.db_version=v_new_db_version
                RETURN DISTINCT n_author.strip_author, n_author.sorted_label, n_author.author_name
                       ORDER BY LOWER(n_author.sorted_label) ASC `;
            var params = {};
            return DataRepository.limitSql(sql, params);
        }

        static getDbVersion() {
            var sql = ` // DataRepository.getDbVersion()
                          MATCH (n_version:L_VERSION) 
                           RETURN  n_version`;
            var params = {};
            return DataRepository.limitSql(sql, params);
        }


    }
    return DataRepository;
}
