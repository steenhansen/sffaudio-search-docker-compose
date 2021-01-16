var graph_constants = rootAppRequire('common-node/graph-constants');
const {NO_RECORD_LIMIT}=graph_constants;

//   var delete_all_sql = 'MATCH (n) DETACH DELETE n'

module.exports = class BuildRepository {

    constructor(graph_db, db_version) {
        this.graph_db = graph_db;
        this.db_version = db_version;

    }
    
    insertAPdf(new_info, new_link, book_title, under_title, last_first_underscores, pdf_country) {
        var sql = `WITH {db_version} AS v_db_version
                    MERGE ( n_pdf:L_PDF   
                                    {pdf_title:{new_info},
                                     pdf_url:{new_link}, 
                                     book_title:{book_title},
                                     under_title:{under_title}, 
                                     last_first_underscores:{last_first_underscores},
                                     pdf_country:{pdf_country} ,
                                      db_version:v_db_version    })`;
        var params = {new_info, new_link, book_title, under_title, last_first_underscores, pdf_country};
        return this.addVersionSql(sql, params);
    }
        books_to_posts() {
        var sql = ` WITH {db_version} AS v_db_version
         MATCH (n_book:L_BOOK), (n_post_book:L_BOOK_POST)
            WHERE  n_post_book.last_first_underscores = n_book.last_first_underscores
            AND n_book.under_title = n_post_book.under_title
            	 AND n_book.db_version = v_db_version
			  AND n_post_book.db_version = v_db_version
            MERGE (n_book)-[r_book_to_post:L_BOOK_TO_POST]->(n_post_book)`;
        return this.addVersionSql(sql, {});
    }

    saveBookPost(last_first_underscores, under_title, post_slug, post_title, sorted_label) {
        var sql = ` // PostNode.saveBookPost
                                        WITH {last_first_underscores} AS v_last_first_underscores,
                                              {under_title} AS v_under_title, 
                                              {post_slug} AS v_post_slug, 
                                              {post_title} AS v_post_title,
                                               {sorted_label} AS v_sorted_label,
                                                {db_version} AS v_db_version
                                MERGE (n_post_book:L_BOOK_POST { last_first_underscores: v_last_first_underscores,
                                                        under_title: v_under_title,
                                                        post_slug: v_post_slug, 
                                                        post_title: v_post_title,
                                                        sorted_label: v_sorted_label, db_version:v_db_version})        `;
        var params = {last_first_underscores, under_title, post_slug, post_title, sorted_label};
        return this.addVersionSql(sql, params);
    }    

    savePosts(strip_author, post_slug, post_title, sorted_label) {
        var sql = ` // PostNode.savePosts
                                        WITH {strip_author} AS v_strip_author,
                                              {post_slug} AS v_post_slug, 
                                              {post_title} AS v_post_title,
                                               {sorted_label} AS v_sorted_label,
                                                {db_version} AS v_db_version
                                MERGE (n_post:L_AUTHOR_POST { strip_author: v_strip_author,
                                                        post_slug: v_post_slug, 
                                                        post_title: v_post_title,
                                                        sorted_label: v_sorted_label, db_version:v_db_version}) `;
        var params = {strip_author, post_slug, post_title, sorted_label};
        return this.addVersionSql(sql, params);
    }








        // rsd_url??
    insertAnRsd(rsd_title, under_title, rsd_description, rsd_link, rsd_pdf_link, video_link, last_first_underscores) {
        var sql = ` WITH {db_version} AS v_db_version
               MERGE (n_rsd:L_RSD { rsd_title: {rsd_title}, 	under_title : {under_title}, 	rsd_description : {rsd_description}, rsd_url : {rsd_link}, 
              rsd_pdf_link : {rsd_pdf_link},  video_link : {video_link},  last_first_underscores : {last_first_underscores}, db_version: v_db_version})
               `;
        var params = {
            rsd_title,
            under_title,
            rsd_description,
            rsd_link,
            rsd_pdf_link,
            video_link,
            last_first_underscores
        };
        return this.addVersionSql(sql, params);
    }

    insertAPodcast(podcast_title, under_title, podcast_link, podcast_id, last_first_underscores, podcast_description) {
        var sql = `WITH {db_version} AS v_db_version
           MERGE (n_podcast:L_PODCAST { podcast_title: {podcast_title}, 	under_title : {under_title}, podcast_url : {podcast_link}, podcast_id : {podcast_id},
            last_first_underscores : {last_first_underscores}, podcast_description : {podcast_description},  db_version:v_db_version})`;
        var params = {podcast_title, under_title, podcast_link, podcast_id, last_first_underscores, podcast_description };
        return this.addVersionSql(sql, params);
    }

  linkAuthorToBook(strip_author, under_title) {
        var sql = ` WITH {db_version} AS v_db_version
                   MATCH (n_author:L_AUTHOR),(n_book:L_BOOK)
                   WHERE n_author.strip_author = {strip_author}
                     AND n_book.under_title = {under_title}
                     AND n_author.db_version = v_db_version
                     AND n_book.db_version = v_db_version
                     AND n_author.strip_author IN n_book.last_first_underscores
                  MERGE (n_author)-[r_author_to_book:L_AUTHOR_TO_BOOK]->(n_book)`;
        var params = {strip_author, under_title};
        return this.addVersionSql(sql, params);
    }
    
        insertPodcastsOfBook() {
        var sql = `WITH {db_version} AS v_db_version
        MATCH (n_book:L_BOOK),(n_podcast:L_PODCAST)
			WHERE n_book.under_title =  n_podcast.under_title
			  AND n_book.db_version = v_db_version
			  AND n_podcast.db_version = v_db_version
              AND n_podcast.last_first_underscores = n_book.last_first_underscores
			MERGE (n_book)-[r_book_to_podcast:L_BOOK_TO_PODCAST]->(n_podcast)	`;
        return this.addVersionSql(sql, {});
    }
    
    insertPdfsOfBook() {
        var sql = ` // BuildRepository.linkPdfsToBooks()
            WITH {db_version} AS v_db_version
           MATCH (n_book:L_BOOK),(n_pdf:L_PDF)
		   WHERE n_book.under_title =  n_pdf.under_title
			 AND n_book.db_version = v_db_version
			 AND n_pdf.db_version = v_db_version
			 AND  n_pdf.last_first_underscores = n_book.last_first_underscores 
 		   MERGE (n_book)-[r_book_to_pdf:L_BOOK_TO_PDF]->(n_pdf)`;
        return this.addVersionSql(sql, {})
    }

    insertRsdsOfBook() {          
        var sql = `  WITH {db_version} AS v_db_version
             MATCH (n_book:L_BOOK),(n_rsd:L_RSD)
			WHERE n_book.under_title = n_rsd.under_title 
			         AND n_book.db_version = v_db_version
			  AND n_rsd.db_version = v_db_version
 AND n_rsd.last_first_underscores = n_book.last_first_underscores
			MERGE (n_book)-[r_book_to_rsd:L_BOOK_TO_RSD]->(n_rsd)			`;
        return this.addVersionSql(sql, {});
    }

    insertABook(sorted_label, esc_book_title, under_title, last_first_underscores) {
        var sql = `   // BuildRepository.insertABook()
            WITH {db_version} AS v_db_version,
              {sorted_label} AS v_sorted_label,
              {esc_book_title} AS v_esc_book_title,
              {under_title} AS v_under_title,
              {last_first_underscores} AS v_last_first_underscores
        MERGE (n_book:L_BOOK  { sorted_label: v_sorted_label, book_title: v_esc_book_title, 
        	under_title : v_under_title, last_first_underscores:v_last_first_underscores, db_version:v_db_version})`;
        var params = {sorted_label, esc_book_title, under_title, last_first_underscores};
        return this.addVersionSql(sql, params);
    }

    insertAuthor(full_author, strip_author, sorted_label) {
        var sql = `   // BuildRepository.insertAuthor()
            WITH {strip_author} AS v_strip_author,
                 {full_author} AS v_full_author,
                             {sorted_label} AS v_sorted_label, 
                             {db_version} AS v_db_version
               MERGE (n_author:L_AUTHOR { author_name: v_full_author, strip_author: v_strip_author,
                                       sorted_label:v_sorted_label, db_version:v_db_version})`;
        var params = {full_author, strip_author, sorted_label};
        return this.addVersionSql(sql, params);
    }

    addVersionSql(sql, params) {
        params.db_version = this.db_version;
        var neo4j_promise = this.graph_db.sqlParams(sql, params)
        return neo4j_promise;
    }


    authors_to_posts() {
        var sql = ` WITH {db_version} AS v_db_version
        MATCH (n_author:L_AUTHOR), (n_post:L_AUTHOR_POST)
            WHERE n_author.strip_author = n_post.strip_author
            			  AND n_author.db_version = v_db_version
			  AND n_post.db_version = v_db_version
            MERGE (n_author)-[r_author_to_post:L_AUTHOR_TO_POST]->(n_post)`;
        return this.addVersionSql(sql, {});
    }
    
    insertAWikiAuthor(author_wiki, strip_author) {
        var sql = ` WITH {strip_author} AS v_strip_author, {author_wiki} AS v_author_wiki, {db_version} AS v_db_version
                      	MERGE (n_author_wiki:L_AUTHOR_WIKI { wiki_author:"Wikipedia", author_url: v_author_wiki, strip_author: v_strip_author, db_version:v_db_version})`;
        var params = {author_wiki, strip_author};
        return this.addVersionSql(sql, params);
    }


    insertWikiAuthors() {
        var sql = `	WITH  {db_version} AS v_db_version
              MATCH (n_author:L_AUTHOR),(n_author_wiki:L_AUTHOR_WIKI)
			WHERE n_author.strip_author =  n_author_wiki.strip_author 
			  AND n_author.db_version = v_db_version
			  AND n_author_wiki.db_version = v_db_version
			MERGE (n_author)-[r_author_to_wiki:L_AUTHOR_TO_WIKI]->(n_author_wiki)	`;

        return this.addVersionSql(sql, {});
    }





    insertAWikiBook(story_wiki, under_title) {
        var sql = `	WITH {db_version} AS v_db_version
                   MERGE (n_book_wiki:L_BOOK_WIKI { wiki_book:"Wikipedia", book_url: {story_wiki}, under_title: {under_title}, db_version: v_db_version})`;
        var params = {story_wiki, under_title};
        return this.addVersionSql(sql, params);
    }


    insertWikiStories() {
        var sql = `WITH {db_version} AS v_db_version
                MATCH (n_book:L_BOOK),(n_book_wiki:L_BOOK_WIKI)
			WHERE n_book.under_title = n_book_wiki.under_title 
			  AND n_book.db_version = v_db_version
			  AND n_book_wiki.db_version = v_db_version
			MERGE (n_book)-[r_book_wiki_to_book:L_BOOK_WIKI_TO_BOOK]->(n_book_wiki)`;
        return this.addVersionSql(sql, {});
    }



    makeIndexes_a() {   /// 80751
        var db_version = this.db_version;
        var params = {db_version};
        var author_index = `CREATE INDEX ON :L_AUTHOR(strip_author)`;
        var author_promise = this.graph_db.sqlParams(author_index, params)


        var wiki_index = `CREATE INDEX ON :L_AUTHOR_WIKI(strip_author)`;
        var wiki_promise = this.graph_db.sqlParams(wiki_index, params)


        var book_1_index = `CREATE INDEX ON :L_BOOK(under_title)`;
        var book_1_promise = this.graph_db.sqlParams(book_1_index, params)

        //  var book_2_index = `CREATE INDEX ON :L_BOOK(strip_author_1)`;
        // var book_2_promise = this.graph_db.sqlParams(book_2_index, params)


        //  var book_3_index = `CREATE INDEX ON :L_BOOK(strip_author_2)`;
        //  var book_3_promise = this.graph_db.sqlParams(book_3_index, params)


        var podcast_index = `CREATE INDEX ON :L_PODCAST( under_title)`;
        var podcast_promise = this.graph_db.sqlParams(podcast_index, params)

        // var podcast_index2 = `CREATE INDEX ON :L_PODCAST(db_version)`;
        //var podcast_promise2 = this.graph_db.sqlParams(podcast_index2, params)

        var pdf_index = `CREATE INDEX ON :L_PDF(db_version,under_title)`;
        var pdf_promise = this.graph_db.sqlParams(pdf_index, params)

        var rsd_index = `CREATE INDEX ON :L_RSD(db_version,under_title)`;
        var rsd_promise = this.graph_db.sqlParams(rsd_index, params)

        var post_index = `CREATE INDEX ON :L_AUTHOR_POST(db_version,under_title)`;
        var post_promise = this.graph_db.sqlParams(post_index, params)


        var all_indexes = [author_promise, wiki_promise,
            book_1_promise, //book_2_promise, book_3_promise, 
            podcast_promise,  //podcast_promise2 
            pdf_promise, rsd_promise, post_promise];
        return Promise.all(all_indexes);
    }


    makeIndexes() {   /// 80751
    
    /*
    
    
    PROFILE MATCH (n_version:L_VERSION) 
                         WITH n_version.current_version as v_db_version
                            RETURN v_db_version
    
     */
    
    
    // CREATE INDEX ON :L_VERSION(current_version)
    // DROP INDEX ON :L_VERSION(current_version)
    
    // CREATE CONSTRAINT ON (n_version:L_VERSION) ASSERT n_version.current_version IS UNIQUE
    //  DROP CONSTRAINT ON  (n_version:L_VERSION) ASSERT n_version.current_version IS UNIQUE
        var db_version = this.db_version;
        var params = {db_version};
        var author_index = `CREATE INDEX ON :L_AUTHOR(strip_author)`;
        var author_promise = this.graph_db.sqlParams(author_index, params)


        var wiki_index = `CREATE INDEX ON :L_AUTHOR_WIKI(strip_author)`;
        var wiki_promise = this.graph_db.sqlParams(wiki_index, params)


        var book_1_index = `CREATE INDEX ON :L_BOOK(under_title)`;
        var book_1_promise = this.graph_db.sqlParams(book_1_index, params)

        var book_2_index = `CREATE INDEX ON :L_BOOK(last_first_underscores)`;
        var book_2_promise = this.graph_db.sqlParams(book_2_index, params)


        // var book_3_index = `CREATE INDEX ON :L_BOOK(strip_author_2)`;
        // var book_3_promise = this.graph_db.sqlParams(book_3_index, params)


        var podcast_index = `CREATE INDEX ON :L_PODCAST( under_title)`;
        var podcast_promise = this.graph_db.sqlParams(podcast_index, params)


        var pdf_index = `CREATE INDEX ON :L_PDF(under_title)`;
        var pdf_promise = this.graph_db.sqlParams(pdf_index, params)

        //    var pdf_index = `CREATE INDEX ON :L_PDF(db_version, under_title)`;
        //  var pdf_promise11 = this.graph_db.sqlParams(pdf_index, params)   //36sec
        // var pdf_index = `CREATE INDEX ON :L_PDF(strip_2_author)`;
        //   var pdf_promise22 = this.graph_db.sqlParams(pdf_index, params)

        var rsd_index = `CREATE INDEX ON :L_RSD(under_title)`;
        var rsd_promise = this.graph_db.sqlParams(rsd_index, params)

        var post_index = `CREATE INDEX ON :L_AUTHOR_POST(under_title)`;
        var post_promise = this.graph_db.sqlParams(post_index, params)


        var all_indexes = [author_promise, wiki_promise,
            book_1_promise, book_2_promise,
            // book_3_promise,
            podcast_promise,
            pdf_promise,
            rsd_promise, post_promise];
        return Promise.all(all_indexes);
    }


}

