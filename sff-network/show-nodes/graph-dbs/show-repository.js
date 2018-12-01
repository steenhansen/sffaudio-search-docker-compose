var media_constants = rootAppRequire('sff-network/media-constants');
const {NO_RECORD_LIMIT}=media_constants;
module.exports = function (graph_db) {   





    class ShowRepository {


        static getAuthorNodes(strip_author) {
            var sql4 = ` // ShowRepository.getAuthorsNodes
                        MATCH (n_version:L_VERSION) 
			            RETURN '' AS r_author_to_media, '' AS r_author_to_wiki, '' AS n_author, '' AS n_author_wiki, '' AS n_book_or_post,
			                   n_version.current_version AS v_new_db_version
				UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to_media:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_author.strip_author IN n_book.last_first_underscores
                           AND n_author.db_version=v_new_db_version
                        RETURN r_author_to_media, '' AS r_author_to_wiki, n_author, '' AS n_author_wiki, n_book AS n_book_or_post, v_new_db_version
              UNION             
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]-(n_author_wiki:L_AUTHOR_WIKI)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_author.db_version=v_new_db_version
                        RETURN '' AS r_author_to_media, r_author_to_wiki, n_author,  n_author_wiki, '' AS n_book_or_post, v_new_db_version
               UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {strip_author} AS v_strip_author
                         MATCH (n_author:L_AUTHOR)-[r_author_to_media:L_AUTHOR_TO_POST]-(n_post:L_AUTHOR_POST)
                         WHERE n_author.strip_author=v_strip_author
                           AND n_post.strip_author=v_strip_author
                           AND n_post.db_version=v_new_db_version
                        RETURN r_author_to_media, '' AS r_author_to_wiki, n_author, '' AS n_author_wiki, n_post AS n_book_or_post, v_new_db_version 
                           `;
            var params4 = {strip_author};
            var neo4j_promise4 = graph_db.sqlParams(sql4, params4)
            return Promise.all([neo4j_promise4]);
        }

        static getBookNodes(under_title) {
                      var sql = ` // ShowRepository.getBookNodes
			 MATCH (n_version:L_VERSION) 
			            RETURN '' AS r_author_to_book, '' AS r_book_to_media, '' AS r_book_wiki_to_book, '' AS r_all_pages, '' AS n_all_pages, '' AS n_author,
			                   '' AS n_book, '' AS n_book_wiki, '' AS n_pdf_or_rsd_or_podcast, n_version.current_version AS v_new_db_version
    			UNION
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)-[r_book_to_media:L_BOOK_TO_PDF]-(n_pdf_or_rsd_or_podcast:L_PDF)-[r_all_pages:L_PDF_TO_PAGES]-(n_all_pages:L_PAGE_PDFS)
                         WHERE n_book.under_title = v_under_title  
                           AND n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to_media, '' AS r_book_wiki_to_book, r_all_pages, n_all_pages, n_author, n_book, '' AS n_book_wiki, n_pdf_or_rsd_or_podcast, v_new_db_version
                UNION                    
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)-[r_book_to_media:L_BOOK_TO_PODCAST]-(n_pdf_or_rsd_or_podcast:L_PODCAST)-[r_all_pages:L_PODCASTS_TO_PAGES]-(n_all_pages:L_PAGE_PODCASTS)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to_media, '' AS r_book_wiki_to_book, r_all_pages, n_all_pages, n_author, n_book, '' AS n_book_wiki, n_pdf_or_rsd_or_podcast, v_new_db_version         
                UNION 
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)-[r_book_to_media:L_BOOK_TO_RSD]-(n_pdf_or_rsd_or_podcast:L_RSD) -[r_all_pages:L_RSDS_TO_PAGES]-(n_all_pages:L_PAGE_RSDS)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to_media, '' AS r_book_wiki_to_book, r_all_pages, n_all_pages,  n_author, n_book, '' AS n_book_wiki,  n_pdf_or_rsd_or_podcast, v_new_db_version  
                UNION 
                         MATCH (n_version:L_VERSION) 
                          WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
                         MATCH (n_author:L_AUTHOR)-[r_author_to_book:L_AUTHOR_TO_BOOK]-(n_book:L_BOOK)-[r_book_to_media:L_BOOK_TO_POST]-(n_pdf_or_rsd_or_podcast:L_BOOK_POST)
                         WHERE n_book.under_title = v_under_title 
                           AND n_book.db_version=v_new_db_version
                        RETURN r_author_to_book, r_book_to_media, '' AS r_book_wiki_to_book, '' AS r_all_pages, '' AS n_all_pages,  n_author, n_book, '' AS n_book_wiki,  n_pdf_or_rsd_or_podcast, v_new_db_version 
				UNION	
						MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version as v_new_db_version, {under_title} AS v_under_title
						MATCH (n_book:L_BOOK)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]-(n_book_wiki:L_BOOK_WIKI)
                        WHERE n_book.under_title = v_under_title 
                          AND n_book.db_version=v_new_db_version
						RETURN '' AS r_author_to_book, '' AS r_book_to_media, r_book_wiki_to_book, '' AS r_all_pages, '' AS n_all_pages, '' AS n_author, n_book, n_book_wiki,  '' AS n_pdf_or_rsd_or_podcast, v_new_db_version  
                     `;
                     
                     
                     //      n_pdf_or_rsd_or_podcast_or_post
                     
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
