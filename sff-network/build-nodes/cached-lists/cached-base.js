require('../../../sff-network/global-require')
var fs = require('fs');
var uniqid = require('uniqid');

class CachedBase {

    constructor(cache_file) {
        this.cache_file = cache_file;
         clog('qqqqqqqqqqqqqq', cache_file)
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

    writeToFile(book_cache_file, book_list) {
        var book_list_string = book_list.records[0]._fields[0];
        var book_to_file = "var cached_var = `" +
            book_list_string +
            "`; " +
            "module.exports = cached_var;";
        
        var file_unique = book_cache_file + '.' + uniqid();
        var path_unique = fromAppRoot(file_unique)
        
 var path_unique =  '~/sff-network/show-nodes/cached-data/default-cache.4iv4jp9fcsro';      
        
        var file_js = book_cache_file + '.js';
        
        //var path_js = fromAppRoot(file_js)
        console.log('writeToFile path_unique', path_unique)
        
        
         var path_js =  '~/sff-network/show-nodes/cached-data/default-cache.js';      
        console.log('writeToFile path_js', path_js)
        
        /////////////////////////////////       /tmp
        
        var temp_dir= '/tmp';
        if (!fs.existsSync(temp_dir)) {
            fs.mkdirSync(temp_dir);
        }
        
        
         var path_unique =  '/tmp/' + book_cache_file + '.' + uniqid();  
        clog('ddddddddddd', path_unique)
        
        //////////////////////////////////
        
        fs.writeFile(path_unique, book_to_file, function (err, data) {
            if (err) console.log('ERROR - writeFile cached-base : ', err);
            fs.rename(path_unique, path_js, function (err) {
                if (err) console.log('ERROR - rename cached-base : ' + err);
            });

        });
        return book_list_string;
    }

    deleteCache() {
        try {
            var js_file_name = this.cache_file + '.js';
            console.log('deleteCache js_file_name', js_file_name); 
            fs.unlinkSync(js_file_name);
        } catch (e) {
               console.log('deleteCache e', e); 
        }
    }

}

module.exports = CachedBase;
