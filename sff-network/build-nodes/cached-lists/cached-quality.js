require('../../../sff-network/global-require')


var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

class CachedQuality extends CachedBase {

    constructor() {
        super('sff-network/show-nodes/cached-data/quality-cache');
        this.cache_file = 'sff-network/show-nodes/cached-data/quality-cache';
    }

    makeDbCache(db_version, sorted_media) {
        var js_code = JSON.stringify(sorted_media, null, ' ');
        return VersionRepository.saveQuality(db_version, js_code);
    }

    getCache() {
        try {
            var quality_list_file = rootAppRequire(this.cache_file)
            return quality_list_file;
        } catch (e) {
            return VersionRepository.getQuality()
                .then((quality_list_db)=> {
                    return this.writeToFile(this.cache_file, quality_list_db)
                })
        }

        
    }
}

module.exports = CachedQuality;
