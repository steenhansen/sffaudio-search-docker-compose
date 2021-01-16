var graph_constants = rootAppRequire('common-node/graph-constants');
var graph_db = rootAppRequire('common-node/neo4j-graph-db')(graph_constants.NEO4J_VERSION);

var data_repository = rootAppRequire('common-node/show-nodes/graph-dbs/show-repository')(graph_db);


var CachedAuthors = rootAppRequire('common-node/build-nodes/cached-lists/cached-authors');
var cached_authors = new CachedAuthors()

var CachedBooks = rootAppRequire('common-node/build-nodes/cached-lists/cached-books');
var cached_books = new CachedBooks()

var CachedDefaults = rootAppRequire('common-node/build-nodes/cached-lists/cached-default');
var cached_defaults = new CachedDefaults();


var misc_helper = rootAppRequire('common-node/misc-helper');

function makeNewCaches_d_0(next_db_version, obj_dir, show_or_hide_seconds) {
    var start_date = Date.now();
    var quality_obj_file = obj_dir + 'quality-obj.js';
    var quality_books_authors = require(quality_obj_file);
    return cached_defaults.makeDbCache(next_db_version, quality_books_authors)
        .then(()=> {
            misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_0", show_or_hide_seconds);
        })
}

function makeNewCaches_d_1(new_db_version, show_or_hide_seconds) {
    var start_date = Date.now();
    return data_repository.authorsNextVersion()
        .then((authors_next_version)=>cached_authors.makeDbCache(authors_next_version, new_db_version))
        .then(()=>data_repository.booksNextVersion())
        .then((books_next_version)=>cached_books.makeDbCache(books_next_version, new_db_version))
        .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_1", show_or_hide_seconds))
}


function makeNewCaches_d_3(VersionRepository, show_or_hide_seconds) {
    var start_date = Date.now();
    var the_cache = {};
    return VersionRepository.getAuthors()
        .then((authors_html_db)=> {
            var authors_cache = authors_html_db.records[0]._fields[0];
            the_cache['author-cache'] = authors_cache
            return VersionRepository.getBooks();
        })
        .then((books_html_db)=> {
            var books_cache = books_html_db.records[0]._fields[0];
            the_cache['book-cache'] = books_cache
            return VersionRepository.getDefaultAuthors();
        })
        .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_3", show_or_hide_seconds))
}


module.exports =
{
    makeNewCaches_d_0,
    makeNewCaches_d_1,
  //  makeNewCaches_d_1_1_1,
    makeNewCaches_d_3
};
 

            
            
            
    

