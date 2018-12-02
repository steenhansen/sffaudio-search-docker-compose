require('../../../sff-network/global-require')


var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/show-repository')(graph_db);
var ParseNeo = rootAppRequire('sff-network/show-nodes/parse-neo')(data_repository);
var author_data = rootAppRequire('sff-network/show-nodes/media-types/author-show')(data_repository)

var misc_helper = rootAppRequire('sff-network/misc-helper')

class CachedDefault extends CachedBase {

    constructor() {
        super('sff-network/show-nodes/cached-data/quality-cache');
        this.cache_file = 'sff-network/show-nodes/cached-data/default-cache';
    }

    makeDbCache(db_version, sorted_media) {
        let author_promises = [];
        let cached_authors = [];
        for (let an_author of sorted_media) {
            var space_author = an_author.authors;
            var strip_author = misc_helper.alphaUnderscore(space_author);
            var author_json_promise = author_data.sendAuthor(strip_author, ParseNeo)        // q*bert crash
                .then((nodes_and_edges)=> {
                    var current_author = nodes_and_edges.graph_info.strip_author;
                    var author_json = author_data.authorJson22(current_author, nodes_and_edges);
                    cached_authors.push(author_json)
                    return; 
                })
            author_promises.push(author_json_promise)
        }
     //    clog('CachedDefault')
        return Promise.all(author_promises)
            .then(()=> {
                var js_code = JSON.stringify(cached_authors, null, ' ');
                return VersionRepository.saveDefaultAuthors(db_version, js_code);
            })
    }

    getCache() {
        try {
            var quality_list_file = rootAppRequire(this.cache_file)
            return quality_list_file;
        } catch (e) {
            return VersionRepository.getDefaultAuthors()
                .then((quality_list_db)=> {
                    return this.writeToFile(this.cache_file, quality_list_db)
                })
        }


    }
}

module.exports = CachedDefault;
