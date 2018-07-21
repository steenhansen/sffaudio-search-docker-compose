'use strict'

var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

module.exports = function (save_rss_items, media_url_dirs) {

    var screenOutput = {











       html_checkItemsForCron_P0: function (variables_tsv, parser_tsv, the_media, the_information, media_file_loc) {       // q*bert
            return save_rss_items.checkItemsForCron(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA)
                .then(function (num_records_saved) {
                   var {first_pdf, second_pdf, penultimate_pdf, last_pdf, number_pdfs} = num_records_saved
                    var save_test_to_db_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_checkItemsForCron_P0)
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        first_pdf,
                        second_pdf,
                        penultimate_pdf,
                        last_pdf,
                        number_pdfs,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
                    })
                    return page_html
                })
                .catch(function (e) {
                    var html_error = global.Method_logger.exception('html_checkItemsForCron_P0', module.filename, e) 
                    var save_test_to_db_html = media_file_loc.htmlFiles('checkItemsForCron_fail')
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        error_message: html_error
                    })
                    throw page_html
                })
        },




        html_saveTestToDb_P1: function (variables_tsv, parser_tsv, the_media, the_information, media_file_loc) {
            return save_rss_items.saveItemsToDb(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA)
                .then(function (num_records_saved) {
                 //                   throw new Error ('exception test - html_saveTestToDb_P1')
                    var save_test_to_db_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveTestToDb_P1)
                    
                    
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        records_saved: num_records_saved,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE,
                        link_to_next_save_test_rss: media_url_dirs.ADMIN_saveTestToRss_P2
                    })
                    return page_html
                })
                .catch(function (e) {
                    var html_error = global.Method_logger.exception('html_saveTestToDb_P1', module.filename, e)  // goodexception
                    var save_test_to_db_html = media_file_loc.htmlFiles('saveTestToDb_fail')
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        error_message: html_error
                    })
                    throw page_html
                })
        },


        html_saveTestToRss_P2: function (variables_tsv, parser_tsv, the_media, media_file_loc, host_url) {
            return save_rss_items.saveRssToDb(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA, media_file_loc, host_url)
                .then(function () {
                //                   throw new Error ('exception test - html_saveTestToRss_P2')
                    var save_test_rss_data = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveTestToRss_P2)
                    var page_html = miscMethods.getFillSwig(save_test_rss_data, {
                        link_to_next_view_test_rss: media_url_dirs.ADMIN_viewTestRss_P3,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
                    })
                    return page_html
                })
                .catch(function (e) {
                    var html_error = global.Method_logger.exception('html_saveTestToDb_P1', module.filename, e)  // goodexception
                    var save_test_to_db_html = media_file_loc.htmlFiles('saveTestToDb_fail')
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        error_message: html_error
                    })
                    throw page_html
                })
        },


        html_viewTestRss_P3: function (the_information, media_file_loc) {
            var view_test_rss_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_viewTestRss_P3)
            var page_html = miscMethods.getFillSwig(view_test_rss_html, {
                link_to_rss_data: media_url_dirs.ADMIN_IFRAME_showTestRss_P3,
                link_next_save_rss_data: media_url_dirs.ADMIN_saveRealToDb_P4,
                link_back_to_change: media_url_dirs.CHANGE_PAGE
            })
            return page_html
        },

        html_saveRealToDb_P4: function (variables_tsv, parser_tsv, the_media, the_information, media_file_loc) {
            return save_rss_items.saveItemsToDb(variables_tsv, parser_tsv, the_media, media_constants.REAL_DATA)
                .then(function (num_records_saved) {
                  //                   throw new Error ('exception test - html_saveRealToDb_P4')
                    var save_real_rss_data_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveRealToDb_P4)
                    var page_html = miscMethods.getFillSwig(save_real_rss_data_html, {
                        records_saved: num_records_saved,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE,
                        link_next_to_save_real_rss: media_url_dirs.ADMIN_saveRealToRss_P5
                    })
                    return page_html
                })
                .catch(function (e) {
                    var html_error = global.Method_logger.exception('html_saveRealToDb_P4', module.filename, e)
                    return html_error
                })
        },

        html_saveRealToRss_P5: function (variables_tsv, parser_tsv, the_media, media_file_loc, host_url) {
            return save_rss_items.saveRssToDb(variables_tsv, parser_tsv, the_media, media_constants.REAL_DATA, media_file_loc, host_url)
                .then(function () {
                    //                   throw new Error ('exception test - html_saveRealToRss_P5')
                    var save_real_rss_data_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveRealToRss_P5)
                    var page_html = miscMethods.getFillSwig(save_real_rss_data_html, {
                        link_to_view_current_rss: media_url_dirs.ADMIN_IFRAME_rss_P5,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
                    })
                    return page_html
                })
                .catch(function (e) {
                    var html_error = global.Method_logger.exception('html_saveRealToDb_P4', module.filename, e)
                    return html_error
                })
        },

        htmlPublicShowPlayer: function (id, the_media, the_information, media_file_loc) {
            return the_media.getDocument(id, media_constants.ENTIRE_DOCUMENT, media_constants.REAL_DATA)
                .then(function (media_data) {
          //                   throw new Error ('exception test - htmlPublicShowPlayer')
                        if (media_data === null) {
                            return 'no such media id'
                        }
                        var podpress_html = media_file_loc.htmlFiles(media_url_dirs.PUBLIC_SHOW_PLAYER)
                        var player_template_vars = the_media.playerTemplateVars(media_data)
                        var page_html = miscMethods.getFillSwig(podpress_html, player_template_vars)
                        return page_html
                    }
                ).catch(function (e) {
                    global.Method_logger.exception('htmlPublicShowPlayer', module.filename, e)
                    return 'Invalid document'
                })
        },

        htmlAdminShowAll: function (the_information, media_file_loc, host_url) {
            var view_all_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_SHOW_ALL_OUTPUT)
            var link_to_player_1 = media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER + '?id=1'
            var page_html = miscMethods.getFillSwig(view_all_html, {
                player_link_1: link_to_player_1,
                host_url: host_url,
                table_link: media_url_dirs.URL_HTML_PUBLIC_TABLE,
                mobile_link: media_url_dirs.URL_HTML_MOBILE_TABLE,
                rss_link: media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5
            })
            return page_html
        },

    }
    return screenOutput
}


