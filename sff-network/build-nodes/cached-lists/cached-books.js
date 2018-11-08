// cached-books


require('../../../sff-network/global-require')

var CachedBooksAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books-authors');


class CachedBooks extends CachedBooksAuthors {

    constructor(cache_name, article_font_percent = 77) {
        super(cache_name);
        this.article_font_size = "font-size:" + article_font_percent + '%';
    }

//http://localhost:5000/?author=philip_k_dick&book=adjustment_team








 mediaCss() {

     var book_css = `
        
        <style>
                 #all--filter--books {
             width: 200px;
             height: 600px;
    overflow-y:scroll;
        }

        
    .book__article {
        height:16px; 
        display:inline-block;  
        width:25px; 
        vertical-align:top; 
        text-align:right
    }
    
    .book__choice > div  {
        height: 16px    ;
        display: inline-block    ;
        width: 150px    ;
   overflow: hidden    ;
        text-decoration: underline    ;
    }
       
       
       .book__choice{
            color:black;
            height:38px;
        }
  

        .book__choice:hover{
            cursor:pointer;
            color:blue;
                 
        }
    
</style>
<script>
window.sff__b = sff_vars.graph_procs.loadBookNew;
window.sff__38 = sff_vars.helpers.setHeight38;
window.sff__16 = sff_vars.helpers.setHeight16;
</script>


`;
     return book_css;
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
            var article_a_an_the = '';
            var rest_title = book_articles[0];
        }
        var sorted_label = `
          <span class="book__article">${article_a_an_the}</span>
                 
                    <div id="${sorted_label}_rest">${rest_title}</div>
                `;

        return sorted_label


    }

    mediaLink(book_name) {
        var [under_title, book_title, sorted_label, strip_author]= book_name;
        var shrunkArticles = this.shrinkAAnThe(book_title, sorted_label);
        var author_colons_title = strip_author + '::' + under_title + '_';
        var book_html = `
             <div   class="book__choice"  
                    id="${author_colons_title}" 
                    onclick="sff__b('${strip_author}','${under_title}') "
                    onmouseenter="sff__38('${sorted_label}_rest');"
                    onmouseleave="sff__16('${sorted_label}_rest');">
                            ${shrunkArticles}
             </div> `;
        return book_html;
    }


}
module.exports = CachedBooks;
