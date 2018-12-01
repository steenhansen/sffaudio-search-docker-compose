var media_constants = rootAppRequire('sff-network/media-constants')

MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')
var misc_helper = rootAppRequire('sff-network/misc-helper')
MultipleMonikers = rootAppRequire('sff-network/multiple-monikers');

var multiple_monikers = new MultipleMonikers();


module.exports = function (build_repository) {


    class PodcastBuild extends MediaBuild {


        static addPodcastsOfBook() {
            var neo4j_promise = build_repository.insertPodcastsOfBook()
            return neo4j_promise;
        }


        static addPodcasts(podcast_books) {
            var my_promises = [];
            for (let under_title in podcast_books) {
                let {podcast_number, podcast_description, podcast_link, podcast_id, last_first_underscores}  = podcast_books[under_title];
                var podcast_title = `Podcast #${podcast_number}`;
                var podcast_promise = build_repository.insertAPodcast(podcast_title, under_title, podcast_link, podcast_id, last_first_underscores)
                my_promises.push(podcast_promise);
            }
            return Promise.all(my_promises)
        }

        static podcastRead(podcast_csv) {
            let podcast_descriptions = [];
            let podcast_books = {};
            let podcast_authors = {};
            for (let podcast_object of podcast_csv) {
                var podcast_number = podcast_object['episode number'];
                var podcast_id = podcast_object['post id'];
                var podcast_description = misc_helper.stripToLower(podcast_object['kind']);

                multiple_monikers.parseNames(podcast_object['book author'])
                var last_first_underscores = multiple_monikers.lastUnderscore();
                var {esc_book_title, under_title} =MediaBuild.quoteUnderscoreTitle(podcast_object['book title'])
                var title_with_authors = multiple_monikers.titleWithAuthors(under_title);
                var podcast_link = media_constants.MEDIA_LINK_DIR + podcast_object['file name']
                podcast_books[title_with_authors] = {esc_book_title, under_title, last_first_underscores};
                  var underScoreToNormal = multiple_monikers.underScoreToNormal();
               for (var strip_author in underScoreToNormal) {
                    var normal_author = underScoreToNormal[strip_author];
                    podcast_authors[strip_author] = normal_author;
                }
                var small_podcast = {
                    title_with_authors,
                    podcast_number,
                    podcast_description,
                    under_title,
                    podcast_link,
                    last_first_underscores,
                    podcast_id
                };
                podcast_descriptions.push(small_podcast);
            }
            return {podcast_books, podcast_descriptions, podcast_authors};
        }

        static findPodcastInfo(podcast_csv) {
            let podcast_infos = {};
            for (let podcast_object of podcast_csv) {

                let {podcast_number, podcast_description, under_title, podcast_link, podcast_id, last_first_underscores}=podcast_object;
                podcast_infos[under_title] = {
                    podcast_number,
                    podcast_description,
                    podcast_link,
                    podcast_id,
                    last_first_underscores
                };
            }
            return podcast_infos;
        }


        static addPodcastsPage() {
            return build_repository.insertPodcastPage();
        }

    }

    return PodcastBuild;

}

