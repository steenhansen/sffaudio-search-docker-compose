require('../../../sff-network/global-require')
var fs = require('fs');
var uniqid = require('uniqid');

var memjs = require('memjs');

// var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
//     failover: true,  // default: false
//     timeout: 1,      // default: 0.5 (seconds)
//     keepAlive: true  // default: false
// })

// var mc = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
//     failover: true,  // default: false
//     timeout: 1,      // default: 0.5 (seconds)
//     keepAlive: true  // default: false
// })

var mcccs = rootAppRequire('sff-network/build-nodes/cached-lists/mem-cache')('sff_mem_cache');

class CachedBase {

    constructor(cache_file) {
        this.cache_file = cache_file;
    }


    static mcSet(the_cache) {
      return  mcccs.mcSet(the_cache);
    }

    static mcGet(cache_file) {
        return mcccs.mcGet(cache_file);
    }



    static urlGetAuthorBook(request_query, get_type) {
        if (typeof request_query[get_type] !== 'undefined') {
            return true;
        } else {
            return false;
        }
    }


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
        var the_css = this.mediaCss();
        var all_links = the_css + '<div style="clear: both;"></div>' + all_links_2 + '<div style="clear: both;"></div>';
        return this.repositoryCall(new_db_version, all_links);
    }

  

    // deleteCache() {
    //     // try {
    //     //     var js_file_name = this.cache_file + '.js';
    //     //     console.log('deleteCache js_file_name', js_file_name);
    //     //     fs.unlinkSync(js_file_name);
    //     // } catch (e) {
    //     //     console.log('deleteCache e', e);
    //     // }
    // }

}

module.exports = CachedBase;
