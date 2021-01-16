require('../../../common-node/global-require')
//require('../../common-node/global-require')


var CachedBase = rootAppRequire('common-node/build-nodes/cached-lists/cached-base');

var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('common-node/build-nodes/graph-dbs/version-repository')(graph_db);

var data_repository = rootAppRequire('common-node/show-nodes/graph-dbs/show-repository')(graph_db);
var ParseNeo = rootAppRequire('common-node/show-nodes/parse-neo')(data_repository);
var author_data = rootAppRequire('common-node/show-nodes/media-types/author-show')(data_repository)

var misc_helper = rootAppRequire('common-node/misc-helper')

class CachedDefault extends CachedBase {


    static checkCache() {
        return VersionRepository.getDefaultAuthors()
            .then((default_html_db)=> {



                    if (default_html_db.records.length>0){
                        var db_version = default_html_db.records[0]._fields[0];
                        CachedDefault.db_version = db_version;
                        var default_cache = default_html_db.records[0]._fields[1];
                        CachedDefault.good_authors_cache = default_cache;
                        return CachedDefault.good_authors_cache;
                    }else{
                        CachedDefault.db_version = 0;
                        CachedDefault.good_authors_cache = {};
                        return CachedDefault.good_authors_cache;
                    }


            })
    }

    getCache() {
        if (CachedDefault.good_authors_cache) {
            return CachedDefault.good_authors_cache;
        } else {
            return CachedDefault.checkCache();
        }
    }

    constructor() {
        super('default-cache');
    }

    makeDbCache(db_version, sorted_media) {
        let author_promises = [];
        let cached_authors = [];
        for (let an_author of sorted_media) {
            var space_author = an_author.authors;
            var strip_author = misc_helper.alphaUnderscore(space_author);
            var author_json_promise = author_data.sendAuthor(strip_author, ParseNeo, 1)
                .then((nodes_and_edges)=> {
                    var current_author = nodes_and_edges.graph_info.strip_author;
                    var author_json = author_data.authorJson(current_author, nodes_and_edges);
                    cached_authors.push(author_json)
                    return;
                })
            author_promises.push(author_json_promise)
        }
        return Promise.all(author_promises)
            .then(()=> {
                var js_code = JSON.stringify(cached_authors, null, ' ');
                return VersionRepository.saveDefaultAuthors(db_version, js_code);
            })
    }


}
if (typeof CachedDefault.good_authors_cache === 'undefined') {
    CachedDefault.db_version = 0;
    CachedDefault.good_authors_cache = false;
}
module.exports = CachedDefault;
