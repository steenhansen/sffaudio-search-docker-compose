var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
//graph_db.checkDbAlive()

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/data-repository')(graph_db);


var CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
var cached_authors = new CachedAuthors('author_linksss')

var CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
var cached_books = new CachedBooks('books_linksss')

var CachedQuality = rootAppRequire('sff-network/build-nodes/cached-lists/cached-quality');
var cached_quality = new CachedQuality('quality_books_authors_')



function makeNewCaches_d_0(next_db_version, obj_dir) {
    console.time("makeNewCaches_d_0");
    var quality_obj_file = obj_dir + 'quality-obj.js';
    var quality_books_authors = require(quality_obj_file);
    return cached_quality.makeCache(next_db_version, quality_books_authors)
       .then( ()=> { console.timeEnd("makeNewCaches_d_0");})
   
}

function makeNewCaches_d_1(new_db_version) {
    console.time("makeNewCaches_d_1");
    return data_repository.getSortedAuthors()
        .then((sorted_authors)=>cached_authors.makeCache(sorted_authors, new_db_version))
        .then(()=>data_repository.getSortedBooks())
        .then((sorted_books)=>cached_books.makeCache(sorted_books, new_db_version))
        .then(()=> console.timeEnd("makeNewCaches_d_1"))

}


module.exports =
{
    makeNewCaches_d_0,
    makeNewCaches_d_1
};
 

            
            
            
    

