require('../../../sff-network/global-require')

var CachedBooksAuthors = rootAppRequire('sff-network/build-nodes/cached-lists/cached-books-authors');
var misc_helper = rootAppRequire('sff-network/misc-helper');


var media_constants = rootAppRequire('sff-network/media-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(media_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);


class CachedAuthors extends CachedBooksAuthors {

    constructor(cache_name) {
        super(cache_name);
    }

    mediaCss() {
        var author_css = `<style>

            #all--filter--authors {
            width: 200px;
            float: left;
            height: 600px;
            overflow-y:scroll
        }
        
        
        
        .author__choice  {
            color:black;
 height:32px;

        }  
         .auth__first {
         
             font-size:100%;
             width:45%;
            text-align:right;
            display:inline-block;
         }
  

         .auth__mid{

            font-size:70%;
             width:45%;
            text-align:right;
            display:inline-block;
            visibility: hidden;
            vertical-align: 7px;
        }

         .auth__last{
            text-decoration: underline;
            font-size:100%;
             width:45%;
            text-align:left;
            display:inline-block;
             
             white-space: nowrap;  
             hyphens: none; 
        }
        
            
        .author__choice:hover{
            cursor:pointer;
            color:blue;
        }


</style>
<script>
window.sff__a = sff_vars.graph_procs.loadAuthorNew;
window.sff__v = sff_vars.helpers.setVisible;
window.sff__h = sff_vars.helpers.setHidden; 
</script>

`;
        return author_css;
    }

    repositoryCall(new_db_version, all_links) {
        return VersionRepository.saveAuthors(new_db_version, all_links);
    }

    mediaLink(author_names) {
        var [strip_author, last_name_first, display_name]= author_names;
        var names_arr = last_name_first.split(' ');
        var last_name = names_arr.shift()
        var first_name = names_arr.shift()
        var middle_names = names_arr.join(' ');
        var author_html = `
             <div   class='author__choice' 
                    id="${strip_author}_"       
                    onclick="sff__a('${strip_author}') "
                    onmouseenter="sff__v('${strip_author}_mid');"
                    onmouseleave="sff__h('${strip_author}_mid');" >
                            <div class="auth__first">${first_name}</div> 
                            <div class="auth__last">${last_name}</div>
                            <div class="auth__mid" id="${strip_author}_mid"  >${middle_names}</div>
             </div> `;
        return author_html;
    }

    getCache() {
        return VersionRepository.getAuthors()
            .then((author_list)=> {
                var author_list_string = author_list.records[0]._fields[0];
                return author_list_string;
            })
    }
}
module.exports = CachedAuthors;
