// cached-books


require('../../../sff-network/global-require')

var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);
var fs = require('fs');
const {END_BOOK_LIST, MINIFY_CSS_TABLE, MINIFYING_JS}=graph_constants;

class CachedBooks extends CachedBase {

    static checkCache(current_db_version) {
        if (current_db_version !== CachedBooks.db_version) {
            CachedBooks.book_cache = false;
        }
    }

    constructor() {
        super('book-cache');
    }

    repositoryCall(new_db_version, all_links) {
        return VersionRepository.saveBooks(new_db_version, all_links);
    }

    shrinkAAnThe(book_title, sorted_label) {
        var start_articles_reg_ex = /^(a |an |the )/i;
        var book_articles = book_title.split(start_articles_reg_ex);

        if (book_articles.length > 1) {
            var article_a_an_the = book_articles[1];
            var rest_title = book_articles[2];
        } else {
            var article_a_an_the = '&nbsp;';
            var rest_title = book_articles[0];
        }
        
        
        
             var book_article = MINIFY_CSS_TABLE.css_book__article[MINIFYING_JS];
             var book_rest = MINIFY_CSS_TABLE.css_book__rest[MINIFYING_JS];
            
    //    var book_article = MINIFY_CSS_TABLE.css_book__article[1];       // 3059885
      //      var book_rest = MINIFY_CSS_TABLE.css_book__rest[1];
        
          //  var book_article = MINIFY_CSS_TABLE.css_book__article[0];    // 3148940
          //  var book_rest = MINIFY_CSS_TABLE.css_book__rest[0];
        
        
        var article_rest = `
            <div id='${sorted_label}_article' class='${book_article}'>${article_a_an_the}</div>
            <div id='${sorted_label}_rest' class='${book_rest}'>${rest_title}</div>    `;
        return article_rest
    }

    mediaLink(book_name) {
        var [under_title, book_title, sorted_label, strip_author]= book_name;
        var shrunkArticles = this.shrinkAAnThe(book_title, sorted_label);
        var title_separator = under_title + END_BOOK_LIST;
        var book_html = `
             <div   class="book__choice"  
                    id="${title_separator}" 
                    onclick="sff__b('${strip_author}','${under_title}') "
                    onmouseenter="sff_enter('${sorted_label}');"
                    onmouseleave="sff_leave('${sorted_label}');">
                            ${shrunkArticles}
             </div> `;
        return book_html;
    }

    getCache() {
        if (CachedBooks.book_cache) {
            return CachedBooks.book_cache;
        } else {
            return VersionRepository.getBooks()
                .then((books_html_db)=> {
                    var db_version = books_html_db.records[0]._fields[0];
                    CachedBooks.db_version = db_version;
                    var books_cache = books_html_db.records[0]._fields[1];
                    CachedBooks.book_cache = books_cache;
                    return books_cache;
                })
        }
    }

}

if (typeof CachedBooks.book_cache === 'undefined') {
    CachedBooks.db_version = 0;
    CachedBooks.book_cache = false;
}

module.exports = CachedBooks;
