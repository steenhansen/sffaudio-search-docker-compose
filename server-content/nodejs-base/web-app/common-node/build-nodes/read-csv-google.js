var write = require('fs-writefile-promise');
const read_tsv_url = rootAppRequire('common-node/build-nodes/url-tsv-read');

//var graph_constants = rootAppRequire('common-node/graph-constants');
var google_sheets = rootAppRequire('common-node/google-sheets');

var misc_helper = rootAppRequire('common-node/misc-helper');
var {makeEdgesNodes} = rootAppRequire('common-node/build-nodes/graphs-edges')


module.exports = function (graph_db) {
    var podcast_build = rootAppRequire('./common-node/build-nodes/media-types/podcast-build')(graph_db)
    var rsd_build = rootAppRequire('./common-node/build-nodes/media-types/rsd-build')(graph_db)
    var pdf_build = rootAppRequire('./common-node/build-nodes/media-types/pdf-build')(graph_db)




    function objDataToCode(media_values, file_name) {
        var media_json = JSON.stringify(media_values, null, 1);
        var js_code = ` const my_media_array = ${media_json}; module.exports = my_media_array;`
        return write(file_name, js_code);
    }

    function startMakeIndexes_a_0(build_repository, show_or_hide_seconds) {
        var start_date = Date.now();
        return build_repository.makeIndexes()
            .then(()=> misc_helper.consoleTimeEnd(start_date, "startMakeIndexes_a_0", show_or_hide_seconds))
    }


    function googlePostTsvToLocal_a_1(post_obj_file) {
        var start_date = Date.now();
        return read_tsv_url(google_sheets.POST_GOOGLE_DATA)
            .then(author_book_obj=> {
                var file_name = fromAppRoot(post_obj_file);
                return objDataToCode(author_book_obj, file_name);
            })
            .then(()=> misc_helper.consoleTimeEnd(start_date, "googlePostTsvToLocal_a_1"))
    }


    function googleQualityTsvToLocal_a_2(quality_obj_file) {
        var start_date = Date.now();
        return read_tsv_url(google_sheets.QUALITY_GOOGLE_DATA)
            .then(quality_obj=> {
                var file_name = fromAppRoot(quality_obj_file);
                return objDataToCode(quality_obj, file_name);
            })
            .then(()=> misc_helper.consoleTimeEnd(start_date, "googleQualityTsvToLocal_a_2"))
    }


    function googlePdfRsdPodcastToLocal_a_3(rsd_file, rsd_information, media_type) {
        var start_date = Date.now();
        return getCsv(rsd_information)
            .then(rsd_obj=> {
                var file_name = fromAppRoot(rsd_file);
            //    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', file_name, rsd_obj)
                return objDataToCode(rsd_obj, file_name);
            })
            .then(()=> misc_helper.consoleTimeEnd(start_date, "googlePdfRsdPodcastToLocal_a_3" + media_type))
    }


/////////////////////////////////////////////////////////////////////

    function saveGoogle(podcast_information, rsd_information, pdf_information) {      // mediaToTestData/File
        var podcast_promise = getCsv(podcast_information);
        var rsd_promise = getCsv(rsd_information);
        var pdf_promise = getCsv(pdf_information);
        return Promise.all([podcast_promise, rsd_promise, pdf_promise]).spread(function (podcast_csv, rsd_csv, pdf_csv) {
            var all_csv = {podcast_csv, rsd_csv, pdf_csv};
            let test_promise = Promise.resolve(all_csv);
            return test_promise;
        })
    }


    function getFromCsvFile(podcast_csv, rsd_csv, pdf_csv) {  /// fileCsv
        let {rsd_books, rsd_descriptions, rsd_authors} = rsd_build.rsdRead(rsd_csv);
        let {podcast_books, podcast_descriptions, podcast_authors} = podcast_build.podcastRead(podcast_csv);
        let {pdf_books, pdf_descriptions, pdf_authors} = pdf_build.pdfRead(pdf_csv);

      let book_list = Object.assign({}, podcast_books, pdf_books, rsd_books);
  
        
        let author_list = Object.assign({}, podcast_authors, pdf_authors, rsd_authors);

        if ('' in author_list) {
            delete author_list[''];
        }
        var all_csv = {book_list, author_list, podcast_descriptions, pdf_descriptions, rsd_descriptions};
        let test_promise = Promise.resolve(all_csv);
        return test_promise;
    }


//   hey q*bert should be urlTsv or getTsv

    function getCsv(the_information) {   //   urlCsv
        var di_factory = rootAppRequire('common-node/build-nodes/mediaServer/modules/base/diFactory')(the_information);
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
    
        startMakeIndexes_a_0,
        googlePostTsvToLocal_a_1,
        googleQualityTsvToLocal_a_2,


        googlePdfRsdPodcastToLocal_a_3,
        saveGoogle, getFromCsvFile
    };

}
