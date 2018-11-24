var Promise = require('bluebird')
var write = require('fs-writefile-promise');
const read_tsv_url = rootAppRequire('sff-network/build-nodes/url-tsv-read');
var media_constants = rootAppRequire('sff-network/media-constants');

var {makeEdgesNodes, saveToGraph} = rootAppRequire('sff-network/build-nodes/graphs-edges')


module.exports = function (graph_db) {
    var podcast_build = rootAppRequire('./sff-network/build-nodes/media-types/podcast-build')(graph_db)
    var rsd_build = rootAppRequire('./sff-network/build-nodes/media-types/rsd-build')(graph_db)
    var pdf_build = rootAppRequire('./sff-network/build-nodes/media-types/pdf-build')(graph_db)

    function csvFromFiles(read_csv, podcast_csv, rsd_csv, pdf_csv, build_repository, author_book_obj) {
        return read_csv.getFromCsvFile(podcast_csv, rsd_csv, pdf_csv)
            .then(function (media_items) {
                var media_data = makeEdgesNodes(media_items, build_repository);  // figure NOT MAKE
                return saveToGraph(media_data, build_repository, author_book_obj);            /// qbert ** 2   
            });
    }

    function csvFromUrl(read_csv, podcast_information, rsd_information, pdf_information, build_repository, author_book_obj) {
        return read_csv.getAllCsv(podcast_information, rsd_information, pdf_information)
            .then(function (media_items) {
                var media_data = makeEdgesNodes(media_items, build_repository);  // figure NOT MAKE
                return saveToGraph(media_data, build_repository, author_book_obj);
            });
    }

function objDataToCode(media_values, file_name){
   var media_json = JSON.stringify(media_values, null, 1);
   var js_code = ` const my_media_array = ${media_json}; module.exports = my_media_array;`
 return write(file_name, js_code);
}

    function startMakeIndexes_a_0(build_repository) {
      console.time("startMakeIndexes_a_0");
      return build_repository.makeIndexes()
              .then( ()=> console.timeEnd("startMakeIndexes_a_0") )
    }
    
   
   
   
    function googlePostTsvToLocal_a_1(post_obj_file) {
      console.time("googlePostTsvToLocal_a_1");
      return read_tsv_url(media_constants.POST_GOOGLE_DATA)
            .then(author_book_obj=> {
                var file_name = fromAppRoot(post_obj_file);
                return objDataToCode(author_book_obj, file_name);
            })
              .then( ()=> console.timeEnd("googlePostTsvToLocal_a_1") )
    }



    function googleQualityTsvToLocal_a_2(quality_obj_file) {
      console.time("googleQualityTsvToLocal_a_2");
      return read_tsv_url(media_constants.QUALITY_GOOGLE_DATA)
            .then(quality_obj=> {
                var file_name = fromAppRoot(quality_obj_file);
                return objDataToCode(quality_obj, file_name);
            })
              .then( ()=> console.timeEnd("googleQualityTsvToLocal_a_2") )
    }

   
   function googlePdfRsdPodcastToLocal_a_3(rsd_file, rsd_information, media_type) {
      console.time("googlePdfRsdPodcastToLocal_a_3" + media_type);
      return  getCsv(rsd_information)
            .then(rsd_obj=> {
                var file_name = fromAppRoot(rsd_file);
                return objDataToCode(rsd_obj, file_name);
            })
             .then( ()=> console.timeEnd("googlePdfRsdPodcastToLocal_a_3"+media_type) )
    }
   
  
/////////////////////////////////////////////////////////////////////

    function saveGoogle(podcast_information, rsd_information, pdf_information) {      // mediaToTestData/File
        var podcast_promise = getCsv(podcast_information);
        var rsd_promise = getCsv(rsd_information);
        var pdf_promise = getCsv(pdf_information);
        return Promise.all([podcast_promise, rsd_promise, pdf_promise]).spread(function (podcast_csv, rsd_csv, pdf_csv) {
            var all_csv = {podcast_csv, rsd_csv, pdf_csv};
            var test_promise = new Promise(function (resolve, reject) {
                setTimeout(resolve, 0, all_csv);
            });
            return test_promise;
        })
    }


//////////////////////////////////////////////////////////////////////
    function getAllCsv(podcast_information, rsd_information, pdf_information) {   //  urlAllCsv
        var podcast_promise = getCsv(podcast_information);
        var rsd_promise = getCsv(rsd_information);
        var pdf_promise = getCsv(pdf_information);
        return Promise.all([podcast_promise, rsd_promise, pdf_promise])
            .spread(function (podcast_csv, rsd_csv, pdf_csv) {
                let {podcast_books, podcast_descriptions, podcast_authors} = podcast_build.podcastRead(podcast_csv);
                let {pdf_books, pdf_descriptions, pdf_authors} = pdf_build.pdfRead(pdf_csv);
                let {rsd_books, rsd_descriptions, rsd_authors} = rsd_build.rsdRead(rsd_csv);
                let book_list = Object.assign({}, podcast_books, pdf_books, rsd_books);
                let author_list = Object.assign({}, podcast_authors, pdf_authors, rsd_authors);
                if ('' in author_list) {
                    delete author_list[''];
                }
                var all_csv = {book_list, author_list, podcast_descriptions, pdf_descriptions, rsd_descriptions};
                var test_promise = new Promise(function (resolve, reject) {
                    setTimeout(resolve, 0, all_csv);
                });
                return test_promise;
            })
    }

    function getFromCsvFile(podcast_csv, rsd_csv, pdf_csv) {  /// fileCsv

        let {rsd_books, rsd_descriptions, rsd_authors} = rsd_build.rsdRead(rsd_csv);
        //*bert



        let {podcast_books, podcast_descriptions, podcast_authors} = podcast_build.podcastRead(podcast_csv);
        let {pdf_books, pdf_descriptions, pdf_authors} = pdf_build.pdfRead(pdf_csv);
        
        let book_list = Object.assign({}, podcast_books, pdf_books, rsd_books);
        let author_list = Object.assign({}, podcast_authors, pdf_authors, rsd_authors);
        
        //console.log('uuuuuuuuuuuuuuuuuuuu 1 ', podcast_authors)
       // console.log('uuuuuuuuuuuuuuuuuuuu 2 ', pdf_authors)
       // console.log('uuuuuuuuuuuuuuuuuuuu 3 ', rsd_authors)
        
        if ('' in author_list) {
            delete author_list[''];
        }
        var all_csv = {book_list, author_list, podcast_descriptions, pdf_descriptions, rsd_descriptions};
        var test_promise = new Promise(function (resolve, reject) {
            setTimeout(resolve, 0, all_csv);
        });
        return test_promise;
    }


//   hey q*bert should be urlTsv or getTsv

    function getCsv(the_information) {   //   urlCsv
        var di_factory = rootAppRequire('sff-network/build-nodes/mediaServer/modules/base/diFactory')(the_information);
        var variables_tsv = di_factory.VariablesTsvUrlCreate(the_information.google_variables_tab);
        var parser_tsv = di_factory.ParserTsvUrlCreate(the_information.google_media_tab);
        var verify_tsv = di_factory.VerifyTsvDataRowsCreate();
        var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate();
        var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
        var promise_the_rows = promise_tsv_variables.then(function () {
            let the_rows = parser_tsv.allRows(verify_tsv);
            return the_rows;
        })
        return promise_the_rows;
    }

    return {
        csvFromFiles, csvFromUrl,
        
        startMakeIndexes_a_0,
        googlePostTsvToLocal_a_1, 
        googleQualityTsvToLocal_a_2, 
        
        
         googlePdfRsdPodcastToLocal_a_3, 
        getAllCsv, saveGoogle, getFromCsvFile
    };

}
