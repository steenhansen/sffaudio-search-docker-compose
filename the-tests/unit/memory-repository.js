





const misc_functions = require('../misc-functions');
const graph_repository = require('../../GraphRepository');





// let memory_repository = graph_repository.MemoryRepository;

	

// 	let test_mem_rep = memory_repository.dbFactory();

// 	const galatic_pot_id = test_mem_rep.addBook('Galactic Pot Healer');
// 	const pkd_id = test_mem_rep.addAuthor('pkd');


// 	const over_write = test_mem_rep.bookToAuthor(galatic_pot_id, pkd_id);
// 	console.assert(over_write===false);

// 	const pkd_books = test_mem_rep.booksOfAuthor(pkd_id);


// 	const pkd_books_ok = misc_functions.arrayEqual(pkd_books, [ 1 ]);

// 	console.assert(pkd_books_ok);



/*
	> /podcast-neo4j/
	node test/unit/memory-repository

*/
let memory_repository2 = graph_repository.MemoryRepository;


// describe('all tests', function () {

// 	myFirstTest(memory_repository2);

// }

function myFirstTest(memory_repository){
	let test_mem_rep = memory_repository.dbFactory();

	const galatic_pot_id = test_mem_rep.addBook('Galactic Pot Healer');
	const pkd_id = test_mem_rep.addAuthor('pkd');


	const over_write = test_mem_rep.bookToAuthor(galatic_pot_id, pkd_id);
	console.assert(over_write===false);

	const pkd_books = test_mem_rep.booksOfAuthor(pkd_id);


	const pkd_books_ok = misc_functions.arrayEqual(pkd_books, [ 1 ]);

	console.assert(pkd_books_ok);
	return pkd_books_ok;

}