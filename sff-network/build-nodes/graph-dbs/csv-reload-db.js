

var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
graph_db.checkDbAlive()

var data_repository = rootAppRequire('sff-network/show-nodes/graph-dbs/data-repository')(graph_db);


var CachedAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-authors');
var cached_authors = new CachedAuthors('author_linksss')

var CachedBooks = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books');
var cached_books = new CachedBooks('books_linksss', 75)

var graph_db2 = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository2 = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db2);



function massage_data(new_db_version) {



    return data_repository.getSortedAuthors()
    .then((sorted_authors)=>cached_authors.makeCache(sorted_authors, new_db_version))
        .then(()=>cached_authors.deleteCache(new_db_version - 1))
        .then(()=>data_repository.getSortedBooks())
        .then((sorted_books)=>cached_books.makeCache(sorted_books, new_db_version))
        .then(()=>cached_books.deleteCache(new_db_version - 1))
        .then(()=>VersionRepository2.deleteUnused())
        .then((db_version_counts)=> {
                return new_db_version;
              //  console.log('Graph DB version : ', new_db_version);
               // console.log('Graph DB records : ', db_version_counts);
                //process.exit();
            }
        )
}

module.exports = massage_data;
 

            
            
            
    

