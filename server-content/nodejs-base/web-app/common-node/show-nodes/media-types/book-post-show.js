HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon')

module.exports = function (graph_repository) {
    
    class BookPostNode extends HoverIcon {
        constructor(node_id, db_version, post_title, sorted_label, post_slug, last_first_underscores, under_title, book_post_count) {
        super(node_id, db_version, post_title, sorted_label);
            this.post_slug = post_slug;
            this.last_first_underscores = last_first_underscores;
            this.goto_url =  post_slug;
            this.sorted_label = post_slug;
            this.under_title = under_title;
            this.node_type = 'L_BOOK_POST';
            this.title = "Click for story's SFFaudio post";
            this.sorted_choice = book_post_count;
        }

    }
    return BookPostNode;

}



