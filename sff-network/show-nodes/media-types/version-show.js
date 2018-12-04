MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')


class VersionShow extends MediaShow {
    constructor(node_id, db_version, author_or_book) {
        super(node_id, db_version, '', '');
         this.sorted_label = 'db version';

        if (author_or_book == 'author') {
            this.node_type = 'L_VERSION';
        }else{
            this.node_type = 'I_NO_BOOK';
        
        }


    }


}
module.exports = VersionShow;





