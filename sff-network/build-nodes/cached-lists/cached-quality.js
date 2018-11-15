require('../../../sff-network/global-require')

var write = require('fs-writefile-promise');


class CachedQuality {

    constructor(cache_name) {
        this.cache_name = `${cache_name}_`;
    }

    makeCache(sorted_media) {
        var my_save = JSON.stringify(sorted_media, null, ' ');
        var js_code = ` const my_media_array = ${my_save}; module.exports = my_media_array;`
        var file_name = fromAppRoot(`sff-network/media-cache/` + this.cache_name + `.js`);
        return write(file_name, js_code)
    }

    getCache() {
        var file_name = fromAppRoot(`sff-network/media-cache/` + this.cache_name + `.js`);
        var quality_authors = require(file_name);
        return quality_authors;
    }
}

module.exports = CachedQuality;
