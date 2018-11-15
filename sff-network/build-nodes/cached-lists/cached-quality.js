require('../../../sff-network/global-require')





var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);

class CachedQuality {

    constructor(cache_name) {
       // this.cache_name = `${cache_name}_`;
    }

    makeCache(db_version, sorted_media) {
        var js_code = JSON.stringify(sorted_media, null, ' ');
       return  VersionRepository.saveQuality(db_version, js_code );
    }

    getCache() {
        return  VersionRepository.getQuality();
    }
}

module.exports = CachedQuality;
