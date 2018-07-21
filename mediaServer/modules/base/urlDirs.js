'use strict'

module.exports = function (media_dir_type) {

    var media_url_dirs = {
        CHANGE_PAGE: 'change',


        ADMIN_checkItemsForCron_P0: 'checkItemsForCron_0',          // q*bert



        ADMIN_saveTestToDb_P1: 'saveTestToDb_1',
        ADMIN_saveTestToRss_P2: 'saveTestToRss_2',

        ADMIN_viewTestRss_P3: 'viewTestRss_3',
        ADMIN_IFRAME_showTestRss_P3: 'showTestRss',

        ADMIN_saveRealToDb_P4: 'saveRealToDb_4',
        ADMIN_saveRealToRss_P5: 'saveRealToRss_5',
        ADMIN_IFRAME_rss_P5: 'rss',

        ADMIN_SHOW_ALL_OUTPUT: 'showAllOutput',

        PUBLIC_SHOW_EXPLAIN: 'explainPage',
        PUBLIC_TABLE: 'table',

        MOBILE_EXPLAIN: 'explainMobile',
        MOBILE_TABLE: 'mobile',

        PUBLIC_SHOW_PLAYER: 'podPressPlayer'
    }

    var slashed_media_dir_type = '/' + media_dir_type + '/'


    media_url_dirs.URL_HTML_ADMIN_checkItemsForCron_P0 = slashed_media_dir_type + media_url_dirs.ADMIN_checkItemsForCron_P0


    media_url_dirs.URL_HTML_ADMIN_saveTestToDb_P1 = slashed_media_dir_type + media_url_dirs.ADMIN_saveTestToDb_P1
    media_url_dirs.URL_HTML_ADMIN_saveTestToRss_P2 = slashed_media_dir_type + media_url_dirs.ADMIN_saveTestToRss_P2



    media_url_dirs.URL_HTML_ADMIN_viewTestRss_P3 = slashed_media_dir_type + media_url_dirs.ADMIN_viewTestRss_P3
    media_url_dirs.URL_XML_ADMIN_IFRAME_showTestRss_P3 = slashed_media_dir_type + media_url_dirs.ADMIN_IFRAME_showTestRss_P3
    media_url_dirs.URL_HTML_ADMIN_saveRealToDb_P4 = slashed_media_dir_type + media_url_dirs.ADMIN_saveRealToDb_P4
    media_url_dirs.URL_HTML_ADMIN_saveRealToRss_P5 = slashed_media_dir_type + media_url_dirs.ADMIN_saveRealToRss_P5



    media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5 = slashed_media_dir_type + media_url_dirs.ADMIN_IFRAME_rss_P5   // 5

    media_url_dirs.URL_HTML_ADMIN_SHOW_ALL_OUTPUT = slashed_media_dir_type + media_url_dirs.ADMIN_SHOW_ALL_OUTPUT

    media_url_dirs.URL_HTML_PUBLIC_TABLE = slashed_media_dir_type + media_url_dirs.PUBLIC_TABLE
    media_url_dirs.URL_HTML_MOBILE_TABLE = slashed_media_dir_type + media_url_dirs.MOBILE_TABLE


    media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER = slashed_media_dir_type + media_url_dirs.PUBLIC_SHOW_PLAYER

    media_url_dirs.URL_HTML_HOME = slashed_media_dir_type + '*'
    return media_url_dirs
}







