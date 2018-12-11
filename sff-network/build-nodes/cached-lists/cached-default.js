require('../../../sff-network/global-require')


var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/show-repository')(graph_db);
var ParseNeo = rootAppRequire('sff-network/show-nodes/parse-neo')(data_repository);
var author_data = rootAppRequire('sff-network/show-nodes/media-types/author-show')(data_repository)

var misc_helper = rootAppRequire('sff-network/misc-helper')

class CachedDefault extends CachedBase {

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
                    var author_json = author_data.authorJson22(current_author, nodes_and_edges);
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


    getCache() {
                return VersionRepository.getDefaultAuthors()
                    .then((authors_html_db)=> {
                        var default_string = authors_html_db.records[0]._fields[0];
                        return default_string;
                    })
    }


}

module.exports = CachedDefault;
