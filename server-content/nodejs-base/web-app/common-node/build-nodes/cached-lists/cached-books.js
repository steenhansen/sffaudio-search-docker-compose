// cached-books


require('../../../common-node/global-require')

var CachedBase = rootAppRequire('common-node/build-nodes/cached-lists/cached-base');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);
var fs = require('fs');
const {END_BOOK_LIST, MINIFY_CSS_TABLE, MINIFYING_JS}=graph_constants;

class CachedBooks extends CachedBase {

    static checkCache() {
        return VersionRepository.getBooks()
            .then((books_html_db)=> {
              
              
                if (books_html_db.records.length>0){
                var db_version = books_html_db.records[0]._fields[0];
                CachedBooks.db_version = db_version;
                var books_cache = books_html_db.records[0]._fields[1];
                CachedBooks.book_cache = books_cache;
                return CachedBooks.book_cache;
            }else{
                CachedBooks.db_version = 0;
                CachedBooks.author_cache = {};
                return CachedBooks.author_cache;
            }



            })


    }

    getCache() {
        if (CachedBooks.book_cache) {
            return CachedBooks.book_cache;
        } else {
            return CachedBooks.checkCache();
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
        var book__article___b__a = MINIFY_CSS_TABLE.book__article___b__a[MINIFYING_JS];
        var book__rest___b__r = MINIFY_CSS_TABLE.book__rest___b__r[MINIFYING_JS];
        var article_rest = `
            <div id=${sorted_label}_article class=${book__article___b__a}>${article_a_an_the}</div>
            <div id=${sorted_label}_rest class=${book__rest___b__r}>${rest_title}</div>    `;

        return article_rest
    }

    mediaLink(book_name) {
        var [under_title, book_title, sorted_label, strip_author]= book_name;
        var shrunkArticles = this.shrinkAAnThe(book_title, sorted_label);
        var title_separator = under_title + END_BOOK_LIST;
        var book__choice___b__c = MINIFY_CSS_TABLE.book__choice___b__c[MINIFYING_JS];
        var book_html = `
             <div   class=${book__choice___b__c}  
                    id=${title_separator} 
                    onclick="l__b('${strip_author}','${under_title}') "
                    onmouseenter="f__b('${sorted_label}');"
                    onmouseleave="b__b('${sorted_label}');">
                            ${shrunkArticles}
             </div> `;
        return book_html;
    }


}

if (typeof CachedBooks.book_cache === 'undefined') {
    CachedBooks.db_version = 0;
    CachedBooks.book_cache = false;
}

module.exports = CachedBooks;
