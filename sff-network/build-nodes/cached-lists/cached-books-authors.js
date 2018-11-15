require('../../../sff-network/global-require')

var write = require('fs-writefile-promise');
const readFilePromise = require('fs-readfile-promise');
var fs = require('fs');
var glob = require('glob-fs')({gitignore: true});



class CachedBooksAuthors {

    constructor(cache_name) {
              this.cache_name = `${cache_name}_`;
    }
    
    static urlGetAuthorBook(request_query, get_type){
        if (typeof request_query[get_type] !== 'undefined'){
            return true;
        }else {
            return false;
        }
    }
    

    makeCache(sorted_media, new_db_version) {
        var media_data_2 = {}
        for (let i = 0; i < sorted_media.records.length; i++) {
            var media_names = sorted_media.records[i]._fields;
            var distinct_title_name = media_names[0];
            var media_html = this.mediaLink(media_names);
            var  media_small =media_html.replace(/\s\s+/g, ' ');
             media_data_2[distinct_title_name]=media_small
        }
       var all_links_2 = Object.values(media_data_2).join("\n");
       var the_css = this.mediaCss();
      //  var  my_div= this.clickDiv(all_links_2)
        var all_links = the_css + '<div style="clear: both;"></div>' + all_links_2 + '<div style="clear: both;"></div>';
        var file_name = fromAppRoot(`sff-network/media-cache/`+this.cache_name + `${new_db_version}.html`);
        var write_promise = write(file_name, all_links);
        return write_promise;
    }

    deleteCache(last_db_version) {
        var file_name = fromAppRoot(`sff-network/media-cache/`+this.cache_name + `${last_db_version}.html`);
        fs.unlink(file_name, function (err) {
            if (err) {
                if (err.code != 'ENOENT') {
                    console.error("Error in call to fs.unlink", err);
                }
            }

        });
    }

    getCache(db_version) {
       var self=this;
        var cache_dir = fromAppRoot(`sff-network/media-cache/`);
        var file_name = cache_dir + self.cache_name + db_version + '.html';
       console.log('getCache', db_version, file_name)
         return readFilePromise(file_name, 'utf8')
             .catch(function (e) {
                         console.log('CachedBooksAuthors.getCache() :',  e)
                })
    }
}

module.exports = CachedBooksAuthors;
