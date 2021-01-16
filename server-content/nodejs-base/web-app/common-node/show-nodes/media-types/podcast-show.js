
//var Media2Node = rootAppRequire('common-node/node-types/media-2node')
HoverIcon = rootAppRequire('common-node/show-nodes/media-nodes/hover-icon')
module.exports = function (graph_db) {

    class PodcastBuild extends HoverIcon {

        constructor(node_id, db_version, podcast_title, podcast_url, podcast_id, under_title, last_first_underscores, podcast_count, podcast_description) {
          if ('audiobookreadalong'===podcast_description){
            podcast_description = "audiobook/readalong"
          }
          const podcast_number_type = podcast_title + "\n" + podcast_description;
          super(node_id, db_version, podcast_number_type, podcast_url);
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



