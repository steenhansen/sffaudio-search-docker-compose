require('../../../sff-network/global-require')

var CachedBase = rootAppRequire('sff-network/build-nodes/cached-lists/cached-base');
AuthorMoniker = rootAppRequire('sff-network/author-moniker');

var graph_constants = rootAppRequire('sff-network/graph-constants');
var graph_db = rootAppRequire('sff-network/neo4j-graph-db')(graph_constants.NEO4J_VERSION);
var VersionRepository = rootAppRequire('sff-network/build-nodes/graph-dbs/version-repository')(graph_db);



class CachedAuthors extends CachedBase {

    constructor() {
        super('author-cache');
        this.odd_even_class = 'odd__author';
    }

    mediaCss() {
        var author_css = `
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

    oddEvenClass() {
        var odd_even_class = this.odd_even_class;
        if (odd_even_class === 'odd__author') {
            this.odd_even_class = 'even__author';
        } else {
            this.odd_even_class = 'odd__author';

        }
        return odd_even_class;
    }


    mediaLink(author_names) {
        var author_moniker = new AuthorMoniker();
        var [strip_author, last_name_first, display_name]= author_names;
        author_moniker.reloadName(display_name);
        let [first_name, middle_names, last_name] = author_moniker.firstMiddleLastArray();
        if (middle_names === '') {
            middle_names = '&nbsp;';
        }
        var odd_even_class = this.oddEvenClass();

        var author_html = `
             <div   class='author__choice ${odd_even_class}' 
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
                    .then((authors_html_db)=> {
                        var authors_cache = authors_html_db.records[0]._fields[0];
                        return authors_cache;
                    })
    }


}

module.exports = CachedAuthors;
