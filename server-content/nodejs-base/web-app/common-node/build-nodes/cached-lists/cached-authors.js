require('../../../common-node/global-require')

let {END_AUTHOR_LIST} = rootAppRequire('common-node/graph-constants');


var CachedBase = rootAppRequire('common-node/build-nodes/cached-lists/cached-base');
AuthorMoniker = rootAppRequire('common-node/author-moniker');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);

const {MINIFY_CSS_TABLE, MINIFYING_JS}=graph_constants;

class CachedAuthors extends CachedBase {

    static checkCache() {
        return VersionRepository.getAuthors()
            .then((authors_html_db)=> {



                if (authors_html_db.records.length>0){
                    var db_version = authors_html_db.records[0]._fields[0];
                    CachedAuthors.db_version = db_version;
                    var authors_cache = authors_html_db.records[0]._fields[1];
                    CachedAuthors.author_cache = authors_cache;
                    return CachedAuthors.author_cache;
                }else{
                    CachedAuthors.db_version = 0;
                    CachedAuthors.author_cache = {};
                    return CachedAuthors.author_cache;
                }


            })
    }

    getCache() {
        if (CachedAuthors.author_cache) {
            return CachedAuthors.author_cache;
        } else {
            return CachedAuthors.checkCache();
        }
    }

    constructor() {
        super('author-cache');
    }

    repositoryCall(new_db_version, all_links) {
        return VersionRepository.saveAuthors(new_db_version, all_links);
    }

    mediaLink(author_names) {
        var author_moniker = new AuthorMoniker();
        var [strip_author, last_name_first, display_name]= author_names;
        author_moniker.reloadName(display_name);
        let [first_name, middle_names, last_name] = author_moniker.firstMiddleLastArray();
        if (middle_names === '') {
            middle_names = '&nbsp;';
        }
        var title_separator = strip_author + END_AUTHOR_LIST;
        var author__choice___a__c = MINIFY_CSS_TABLE.author__choice___a__c[MINIFYING_JS];
        var auth__first___a__f = MINIFY_CSS_TABLE.auth__first___a__f[MINIFYING_JS];
        var auth__last___a__l = MINIFY_CSS_TABLE.auth__last___a__l[MINIFYING_JS];
        var auth__mid___a__m = MINIFY_CSS_TABLE.auth__mid___a__m[MINIFYING_JS];

        var author_html = `
             <div   class=${author__choice___a__c}
                    id=${title_separator}       
                    onclick="l__a('${strip_author}') "
                    onmouseenter="v__a('${strip_author}_mid');"
                    onmouseleave="h__a('${strip_author}_mid');" >
                            <div class=${auth__first___a__f}>${first_name}</div> 
                            <div class=${auth__last___a__l}>${last_name}</div>
                            <div class=${auth__mid___a__m} id=${strip_author}_mid  >${middle_names}</div>
             </div> `;
        return author_html;
    }


}

if (typeof CachedAuthors.author_cache === 'undefined') {
    CachedAuthors.db_version = 0;
    CachedAuthors.author_cache = false;
}
module.exports = CachedAuthors;
