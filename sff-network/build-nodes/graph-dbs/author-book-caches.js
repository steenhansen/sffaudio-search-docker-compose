var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
//graph_db.checkDbAlive()

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/show-repository')(graph_db);


var CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
var cached_authors = new CachedAuthors()

var CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
var cached_books = new CachedBooks()

var CachedDefaults = rootAppRequire('sff-network/build-nodes/cached-lists/cached-default');
var cached_defaults = new CachedDefaults();

//var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var misc_helper = rootAppRequire('sff-network/misc-helper');

function makeNewCaches_d_0(next_db_version, obj_dir) {
    var start_date = Date.now();
    var quality_obj_file = obj_dir + 'quality-obj.js';
    var quality_books_authors = require(quality_obj_file);
    cached_defaults.makeDbCache(next_db_version, quality_books_authors)
        .then(()=> {
            misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_0");
        })
}

function makeNewCaches_d_1(new_db_version) {
    var start_date = Date.now();
    return data_repository.authorsNextVersion()
        .then((authors_next_version)=>cached_authors.makeDbCache(authors_next_version, new_db_version))
        .then(()=>data_repository.booksNextVersion())
        .then((books_next_version)=>cached_books.makeDbCache(books_next_version, new_db_version))
        .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_1"))
}
//
// function makeNewCaches_d_1_1_1() {
//     var start_date = Date.now();
//     var mcccs = rootAppRequire('sff-network/build-nodes/cached-lists/mem-cache')('sff_mem_cache');
//     return mcccs.mcSet('')
//         .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_1_1_1"))
//
// }

function makeNewCaches_d_3(VersionRepository) {
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
        // .then((default_html_db)=> {
        //     var default_string = default_html_db.records[0]._fields[0];
        //     the_cache['default-cache'] = default_string
        //
        //     var json_cache = JSON.stringify(the_cache)
        //     return CachedBase.mcSet(json_cache);
        //
        // })
        .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_3"))
}


module.exports =
{
    makeNewCaches_d_0,
    makeNewCaches_d_1,
  //  makeNewCaches_d_1_1_1,
    makeNewCaches_d_3
};
 

            
            
            
    

