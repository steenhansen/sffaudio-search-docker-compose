
//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
HoverIcon = rootAppRequire('sff-network/show-nodes/media-nodes/hover-icon')
module.exports = function (graph_db) {

    class PodcastBuild extends HoverIcon {


        constructor(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, last_first_underscores, podcast_count) {
            super(node_id, db_version, podcast_title, podcast_url);
                this.node_type = 'L_PODCAST';
                this.goto_url = podcast_url;
                  this.sorted_label = podcast_url;
                  this.podcast_url = 'https://www.sffaudio.com/?p='+podcast_id;
                  this.under_title = under_title;
                  this.last_first_underscores = last_first_underscores;
                    this.title = 'Click to listen & read this SFFaudio podcast';
                      this.sorted_choice = podcast_count;
        }


    }
    return PodcastBuild;

}



