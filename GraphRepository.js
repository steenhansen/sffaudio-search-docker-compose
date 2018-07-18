


// try to run teamcity on change, there should be NO node_modules

//const CONFIG_ENV_KEYS = ['PORT', 'GRAPHENEDB_BOLT_URL', 'GRAPHENEDB_BOLT_USER', 'GRAPHENEDB_BOLT_PASSWORD'];

class GraphRepository {
	constructor(db_object){

	}

	addAuthor(){}
	addBook(){}
	addNarrator(){}
	addParticipant(){}

	affixPodcast(){}
	affixRsd(){}
	affixPdf(){}

	authorToBook(){}
	narratorToBook(){}


}

// https://neo4j.com/developer/guide-data-visualization/#_library_alchemy_js_open_source_graph_visualization

///////////////////////////////////////////////

// idea is to use the below for unit tests
// so have a bunch of books and authors, a list of data
//  function test_add_a_bunch(){ 
//  	addBook()s, addAuthor()s,  bookToAuthor()s
//  }
// so first check the above with memoryRepository
// so it should work in unit test in memory only

// THEN try it with a real Noe4j database!!!

class MemoryRepository extends GraphRepository{
	constructor(){
		super();
		this.author_names = {};
		this.book_names = {};
		this.book_to_author = {};
	}

	static dbFactory(){
		let memory_repository = new MemoryRepository();
		return memory_repository;
	}

	addAuthor(name_of_author){
		const author_index = Object.keys(this.author_names).length+1;
		this.author_names[name_of_author] = author_index;
		return author_index;
	}

	addBook(name_of_book){
		const book_index = Object.keys(this.book_names).length+1;
		this.book_names[name_of_book] = book_index;
		return book_index;
	}

	bookToAuthor(book_index, author_index){
		let over_write;
		if (typeof this.book_to_author[book_index] === 'undefined') {
			over_write = false;
		}else{
			over_write = true;
		}
		this.book_to_author[book_index] = author_index;
		return over_write;
	}

	booksOfAuthor(author_index){
		let books_of_author = [];
		for (var book_index in this.book_to_author) {
			const author_id = this.book_to_author[book_index];
  			if (author_index === author_id){
  				book_index = Number(book_index);
  				books_of_author.push(book_index);
  			}
		}
		return books_of_author;
	}

}


////////////////////////////////////////////

class Neo4jRepository extends GraphRepository{
}


module.exports = {MemoryRepository:MemoryRepository}


