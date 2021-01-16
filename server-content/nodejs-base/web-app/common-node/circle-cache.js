var graph_constants = rootAppRequire('common-node/graph-constants');
class CircleCache {

    static showVars(message = false) {
        console.log('*********************');
        if (message) {
            console.log(message);
        }
        console.log(CircleCache.buffer_index, CircleCache.name_circ_buffer);
        console.log('*********************');
    }

    static emptyCache() {
        CircleCache.object_list = {};
        CircleCache.name_circ_buffer = [];
        CircleCache.buffer_index = 0;
    }


    static checkName(author_book_name) {
        var object_list = CircleCache.object_list;
        if (object_list[author_book_name]) {
            return object_list[author_book_name];
        } else {
            return false;
        }
    }

    static addNamedObject(author_book_name, author_book_data) {
        if (!CircleCache.checkName(author_book_name)) {
            var buffer_index = CircleCache.buffer_index;
            var name_circ_buffer = CircleCache.name_circ_buffer;
            var object_list = CircleCache.object_list;
            var oldest_buffer_name = name_circ_buffer[buffer_index];
            if (oldest_buffer_name) {
                delete object_list[oldest_buffer_name];
            }
            name_circ_buffer[buffer_index] = author_book_name;
            object_list[author_book_name] = author_book_data;
            buffer_index++;
            if (buffer_index >= graph_constants.CIRCLE_BUFFER_SIZE) {
                buffer_index = 0;
            }
            CircleCache.buffer_index = buffer_index;
        }
    }

}

if (typeof CircleCache.object_list === 'undefined') {
    CircleCache.emptyCache();
}

module.exports = CircleCache;


/*


 var cached_author_book = CircleCache.checkName(strip_author);
 if (!cached_author_book){
 cached_author_book = get_db(strip_author);
 CircleCache.addNamedObject(strip_author, cached_author_book);
 }
 return cached_author_book;



 */
