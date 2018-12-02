require('../../../sff-network/global-require')
var fs = require('fs');
var uniqid = require('uniqid');
var writeFilePromise = require('fs-writefile-promise');

class CachedBase {

    constructor(cache_file) {
        this.cache_file = cache_file;
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
    console.log('111111111111111111',book_cache_file);
        var book_list_string = book_list.records[0]._fields[0];
        var book_to_file = "var cached_var = `" +
            book_list_string +
            "`; " +
            "module.exports = cached_var;";
        var file_unique = book_cache_file + '.' + uniqid();
        var path_unique = fromAppRoot(file_unique)
        var file_js = book_cache_file + '.js';
        var path_js = fromAppRoot(file_js)
        return writeFilePromise(path_unique, book_to_file)
            .then(()=> {
                    clog('222222222222222222',book_cache_file);

                fs.renameSync(path_unique, path_js);
                    clog('33333333333333333',book_cache_file);

                return book_list_string;
            })
    }

    deleteCache() {
        try {
            var js_file_name = this.cache_file + '.js';
            fs.unlinkSync(js_file_name)
        } catch (e) {
        }
    }

}

module.exports = CachedBase;
