var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
//graph_db.checkDbAlive()

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/show-repository')(graph_db);


var CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
var cached_authors = new CachedAuthors()

var CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
var cached_books = new CachedBooks()

var CachedQuality = rootAppRequire('sff-network/build-nodes/cached-lists/cached-quality');
var cached_quality = new CachedQuality()

var misc_helper = rootAppRequire('sff-network/misc-helper');

function makeNewCaches_d_0(next_db_version, obj_dir) {
   var start_date =Date.now();
    var quality_obj_file = obj_dir + 'quality-obj.js';
    var quality_books_authors = require(quality_obj_file);
    return cached_quality.makeDbCache(next_db_version, quality_books_authors)
       .then( ()=> { misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_0");})
}

function makeNewCaches_d_1(new_db_version) {
    var start_date =Date.now();
    return data_repository.authorsNextVersion()
        .then((authors_next_version)=>cached_authors.makeDbCache(authors_next_version, new_db_version))
        .then(()=>data_repository.booksNextVersion())
        .then((books_next_version)=>cached_books.makeDbCache(books_next_version, new_db_version))
        .then(()=> misc_helper.consoleTimeEnd(start_date, "makeNewCaches_d_1"))
}


module.exports =
{
    makeNewCaches_d_0,
    makeNewCaches_d_1
};
 

            
            
            
    

