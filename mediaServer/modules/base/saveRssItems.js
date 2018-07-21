'use strict'

var Promise = require('bluebird')
var miscMethods = require('./miscMethods')

module.exports = function (_di_factory) {

    var di_factory = _di_factory
    var save_rss_items = {


        saveRssToDb: function (variables_tsv, parser_tsv, the_media, real_or_test, media_file_loc, host_url) {
            var item_template = media_file_loc.rssHtmlItem()
            var feed_template = media_file_loc.rssHtmlFeed()
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                //throw new Error ('exception test - saveRssToDb - 1') 
                return parser_tsv.allRows(verify_tsv)
            })

            return Promise.all([promise_tsv_variables, promise_the_rows]).spread(function (tsv_variables, the_rows) {
                //throw new Error ('exception test - saveRssToDb - 2') 
                var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                var derived_rows = variables_tsv.deriveAll(the_rows, the_media, tsv_variables, offset_minutes)
                return the_media.getDocument('description', 'itunes_summary', real_or_test)
                    .then(
                        function (itunes_summary) {
                            //throw new Error('exception test - saveRssToDb - 3')
                            var rss_xml = the_media.rssFeed(derived_rows, tsv_variables, item_template, feed_template, itunes_summary, host_url)
                            return the_media.saveXmlRss(rss_xml, real_or_test)
                        }
                    )
                    .catch(function (e) {
                        throw e
                    })
            })

        },

        saveItemsToDb: function (variables_tsv, parser_tsv, the_media, real_or_test) {
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                //  throw new Error ('exception test - saveItemsToDb - 1') 
                let the_rows = parser_tsv.allRows(verify_tsv)
                return the_rows
            })

            return Promise.all([promise_tsv_variables, promise_the_rows]).spread(function (tsv_variables, the_rows) {


console.log('derived_rows', the_rows);
process.exit(2);



                if (the_rows instanceof Error) {
                    throw the_rows
                }
                var test_values_regex = verify_tsv.mustContain(the_rows)
                //  var test_values_regex = 'exception test - saveItemsToDb - 2'
                if (test_values_regex !== '') {
                    throw new Error(test_values_regex)
                } else {
                    var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                    var derived_rows = variables_tsv.deriveAll(the_rows, the_media, tsv_variables, offset_minutes)


                console.log('derived_rows', derived_rows)




                    var itunes_description_em_dash = miscMethods.replace2withMdash(variables_tsv._captured_variables.itunes_description)
                    var version_storage = di_factory.VersionStorageCreate(the_media, itunes_description_em_dash)
                    // var version_storage = new Error ('exception test - saveItemsToDb - 3') 
                    if (version_storage instanceof Error) {
                        throw version_storage
                    }
                    return version_storage.saveNewVersion(derived_rows, real_or_test)
                        .then(function (number_rows) {
                            //throw new Error ('exception test - saveItemsToDb - 4') 
                            return number_rows
                        })
                        .catch(function (e) {
                            throw e
                        })
                }
            })
        },

        bookTitleAuthor: function(the_rows, book_index) {
            var the_row = the_rows[book_index]
            var title_author = the_row['episode number'] + ' - ' +the_row['book title'] + ' - ' + the_row['book author']
            return title_author
        },

        checkItemsForCron: function (variables_tsv, parser_tsv, the_media) {             // q*bert
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                //  throw new Error ('exception test - checkItemsForCron - 1') 
                let the_rows = parser_tsv.allRows(verify_tsv)
                return the_rows
            })

            return Promise.all([promise_tsv_variables, promise_the_rows]).spread(function (tsv_variables, the_rows) {
                if (the_rows instanceof Error) {
                    throw the_rows
                }
                var test_values_regex = verify_tsv.mustContain(the_rows)
                //  var test_values_regex = 'exception test - checkItemsForCron - 2'
                if (test_values_regex !== '') {
                    throw new Error(test_values_regex)
                } else {
                    var itunes_description_em_dash = miscMethods.replace2withMdash(variables_tsv._captured_variables.itunes_description)
                    var version_storage = di_factory.VersionStorageCreate(the_media, itunes_description_em_dash)
                    // var version_storage = new Error ('exception test - checkItemsForCron - 3') 
                    if (version_storage instanceof Error) {
                        throw version_storage
                    }
                    save_rss_items.checkEpisodeNumbers(the_rows)

                    var first_pdf = save_rss_items.bookTitleAuthor(the_rows, the_rows.length - 1)
                    var second_pdf = save_rss_items.bookTitleAuthor(the_rows, the_rows.length - 2)
                    var penultimate_pdf = save_rss_items.bookTitleAuthor(the_rows, 1)
                    var last_pdf = save_rss_items.bookTitleAuthor(the_rows, 0)
                    var number_pdfs = the_rows.length

                    return {first_pdf, second_pdf, penultimate_pdf, last_pdf, number_pdfs}
                }
            })
        },

        checkEpisodeNumbers: function(the_rows) {
            var last_row = the_rows[0]
            var last_episode_number = last_row['episode number'] 
            var biggest_episode = parseInt(last_episode_number, 10)
            if (biggest_episode !== the_rows.length) {
                var error_mess= "Episode numbers do not match. Last episode #" + biggest_episode + ' <> rows' +  the_rows.length
                throw new Error(error_mess)
            }
        }

    }
    return save_rss_items
}

