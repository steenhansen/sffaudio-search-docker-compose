var media_constants = rootAppRequire('sff-network/media-constants')

MediaBuild = rootAppRequire('sff-network/build-nodes/media-types/media-build')
var misc_helper = rootAppRequire('sff-network/misc-helper')

module.exports = function (build_repository) {


    class PodcastBuild extends MediaBuild {




        static addPodcastsOfBook() {
            var neo4j_promise = build_repository.insertPodcastsOfBook()
            return neo4j_promise;
        }


        static addPodcasts(podcast_books) {
            var my_promises = [];
            for (let under_title in podcast_books) {
                let {podcast_number, podcast_description, podcast_link, podcast_id, strip_1_author}  = podcast_books[under_title];
                var podcast_title = `Podcast #${podcast_number}`;
                var podcast_promise = build_repository.insertAPodcast(podcast_title, under_title, podcast_link, podcast_id, strip_1_author)
                my_promises.push(podcast_promise);
            }
            return my_promises;
        }

        static podcastRead(podcast_csv) {
            let podcast_descriptions = [];
            let podcast_books = {};
            let podcast_authors = {};
            for (let podcast_object of podcast_csv) {
                var podcast_number = podcast_object['episode number'];
                var podcast_id = podcast_object['post id'];
                var podcast_description = misc_helper.stripToLower(podcast_object['kind']);
                let {full_1_author, full_2_author, strip_1_author, strip_2_author}=MediaBuild.split2Authors(podcast_object['book author']);

                let {esc_book_title, under_title, title_auth1_auth2}=MediaBuild.bookAuthor1Author2(podcast_object['book title'], strip_1_author, strip_2_author)

                var podcast_link = media_constants.MEDIA_LINK_DIR + podcast_object['file name']
                podcast_books[title_auth1_auth2] = {esc_book_title, under_title, strip_1_author, strip_2_author};
                podcast_authors[strip_1_author] = full_1_author;
                podcast_authors[strip_2_author] = full_2_author;

                var small_podcast = {
                    title_auth1_auth2,
                    podcast_number,
                    podcast_description,
                    under_title,
                    podcast_link,
                    strip_1_author,
                    podcast_id
                };
                podcast_descriptions.push(small_podcast);
            }
            return {podcast_books, podcast_descriptions, podcast_authors};
        }

        static findPodcastInfo(podcast_csv) {
            let podcast_infos = {};
            for (let podcast_object of podcast_csv) {

                let {podcast_number, podcast_description, under_title, podcast_link, podcast_id, strip_1_author}=podcast_object;
                podcast_infos[under_title] = {podcast_number, podcast_description, podcast_link, podcast_id, strip_1_author};
            }
            return podcast_infos;
        }


        static addPodcastsPage() {
            return build_repository.insertPodcastPage();
        }

    }

    return PodcastBuild;

}

