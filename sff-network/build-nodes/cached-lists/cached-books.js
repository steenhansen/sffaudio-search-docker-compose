// cached-books


require('../../../sff-network/global-require')

var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');

var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);
var fs = require('fs');

class CachedBooks extends CachedBase {

    constructor() {
        super('book-cache');
    }

//http://localhost:5000/?author=philip_k_dick&book=adjustment_team


    mediaCss() {

        var book_css = `
        
       
<script>
window.sff__b = sff_vars.graph_procs.loadBookNew;
//window.sff__38 = sff_vars.helpers.setHeight38;
//window.sff__16 = sff_vars.helpers.setHeight16;
function sff_enter(id){
	document.getElementById(id + '_article').style.visibility='visible';
	document.getElementById(id + '_rest' ).style.height='5.5em';
	document.getElementById(id + '_rest' ).style.position='relative';
	document.getElementById(id + '_rest' ).style.backgroundColor='yellow';
}

function sff_leave(id){
	document.getElementById(id + '_article').style.visibility='hidden';
	document.getElementById(id + '_rest' ).style.height='1em';  
	document.getElementById(id + '_rest' ).style.position='static';
	document.getElementById(id + '_rest' ).style.backgroundColor='transparent';
}

</script>


`;
        return book_css;
    }


    repositoryCall(new_db_version, all_links) {
        return VersionRepository.saveBooks(new_db_version, all_links);
    }

    shrinkAAnThe(book_title, sorted_label) {
        var start_articles_reg_ex = /^(a |an |the )/i;
        var book_articles = book_title.split(start_articles_reg_ex);

        if (book_articles.length > 1) {
            var article_a_an_the = book_articles[1];
            var rest_title = book_articles[2];
            //var sorted_label = `<div class="book__article">${article_a_an_the}</div>${sortable_title}`;
        } else {
            /// also need to have a class with color/size/width
            //  #all--filter--books div span      for bob/an
            //  #all--filter--books div div       for dick/ubick
            var article_a_an_the = '&nbsp;';
            var rest_title = book_articles[0];
        }
        // var sorted_label = `
        //   <span class="book__article">${article_a_an_the}</span>
        //         
        //             <div id="${sorted_label}_rest">${rest_title}</div>
        //         `;
        var article_rest = `
            <div id='${sorted_label}_article' class='book__article'>${article_a_an_the}</div>
            <div id='${sorted_label}_rest' class='book__rest'>${rest_title}</div>    `;
        return article_rest
    }

    mediaLink(book_name) {
        var [under_title, book_title, sorted_label, strip_author]= book_name;
        var shrunkArticles = this.shrinkAAnThe(book_title, sorted_label);
        var author_colons_title = strip_author + '::' + under_title + '_';
        var book_html = `
             <div   class="book__choice"  
                    id="${author_colons_title}" 
                    onclick="sff__b('${strip_author}','${under_title}') "
                    onmouseenter="sff_enter('${sorted_label}');"
                    onmouseleave="sff_leave('${sorted_label}');">
                            ${shrunkArticles}
             </div> `;
        return book_html;
    }

    getCache() {
        return CachedBase.mcGet(this.cache_file)
            .catch(function (e) {
                return VersionRepository.getBooks()
                    .then((books_html_db)=> {
                     clog('???????????????????')
                        var books_cache = books_html_db.records[0]._fields[0];
                        return books_cache;
                    })
            })
    }




}
module.exports = CachedBooks;
