
//var Media2Node = rootAppRequire('sff-network/node-types/media-2node')
MediaShow = rootAppRequire('sff-network/show-nodes/media-nodes/media-show')
module.exports = function (graph_db) {

    class PodcastBuild extends MediaShow {


        constructor(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, last_first_underscores) {
            super(node_id, db_version, podcast_title, podcast_url);
                this.node_type = 'L_PODCAST';
                this.goto_url = podcast_url;
                  this.sorted_label = podcast_url;
                  this.podcast_url = 'https://www.sffaudio.com/?p='+podcast_id;
                  this.under_title = under_title;
                  this.last_first_underscores = last_first_underscores;
                    this.title = 'Click to listen and read this podcast';
        }


    }
    return PodcastBuild;

}



