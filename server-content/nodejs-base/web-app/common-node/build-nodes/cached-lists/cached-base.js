require('../../../common-node/global-require')
var fs = require('fs');
var uniqid = require('uniqid');


class CachedBase {
    
    constructor(cache_file) {
        this.cache_file = cache_file;
    }

    // static urlGetAuthorBook(request_query, get_type) {
    //     if (typeof request_query[get_type] !== 'undefined') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    
    
    //   book__article  -->   b__a
    
    makeDbCache(sorted_media, new_db_version) {
        var media_data_2 = {}
        for (let i = 0; i < sorted_media.records.length; i++) {
            var media_names = sorted_media.records[i]._fields;
            var distinct_title_name = media_names[0];
            var media_html = this.mediaLink(media_names);
            var media_small = media_html.replace(/\s\s+/g, ' ');
            media_data_2[distinct_title_name] = media_small
        }
        var all_links_2 = Object.values(media_data_2).join("\n");

        var all_links = '<div style="clear: both;"></div>' + all_links_2 + '<div style="clear: both;"></div>';
        return this.repositoryCall(new_db_version, all_links);
    }


}

module.exports = CachedBase;
