var BuildRepository = rootAppRequire('common-node/build-nodes/graph-dbs/build-repository');
const read_csv_google = rootAppRequire('common-node/build-nodes/read-csv-google')(BuildRepository);
var podcast_information = rootAppRequire('common-node/build-nodes/mediaServer/modules/podcastSchema')
var rsd_information = rootAppRequire('common-node/build-nodes/mediaServer/modules/rsdSchema')
var pdf_information = rootAppRequire('common-node/build-nodes/mediaServer/modules/pdfSchema')


const google_data_dir = 'common-node/build-nodes/test-obj-data/real-google-data/';



var rsd_file = google_data_dir + 'rsd-obj.js';
var podcast_file = google_data_dir + 'podcast-obj.js';
var pdf_file = google_data_dir + 'pdf-obj.js';

var post_obj_file = google_data_dir + 'posts-obj.js';
var quality_obj_file = google_data_dir + 'quality-obj.js';


var ReloadBase = rootAppRequire('common-node/build-nodes/graph-dbs/reload-base');
class ReloadUrl extends ReloadBase {

    static readSheets() {
        return read_csv_google.googlePostTsvToLocal_a_1(post_obj_file)
            .then(()=> read_csv_google.googleQualityTsvToLocal_a_2(quality_obj_file))

            .then(()=> read_csv_google.googlePdfRsdPodcastToLocal_a_3(rsd_file, rsd_information, 'google_rsd'))
            .then(()=> read_csv_google.googlePdfRsdPodcastToLocal_a_3(podcast_file, podcast_information, 'google_podcast'))
            .then(()=> read_csv_google.googlePdfRsdPodcastToLocal_a_3(pdf_file, pdf_information, 'google_pdf'))
            .then( ()=> google_data_dir )
    }

}


module.exports = ReloadUrl;



            
            
            
    

