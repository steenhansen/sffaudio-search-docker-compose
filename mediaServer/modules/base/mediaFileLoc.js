'use strict'

var media_constants = require('./MediaConstants')

module.exports = function (media_information) {
    var media_file_loc = {
        htmlFiles: function (html_name) {
            var rss_pathname = media_constants.TEMPLATE_DIRECTORY + media_information.rss_dir_name + html_name + '.html'
            return rss_pathname
        },

        mobileFiles: function (html_name) {
            var rss_pathname = media_constants.TEMPLATE_DIRECTORY + media_information.rss_dir_name + html_name + '.html'
            return rss_pathname
        },

        rssHtmlFeed: function () {
            var rss_pathname = media_constants.TEMPLATE_DIRECTORY + media_information.rss_dir_name + 'rssFeed.html'
            return rss_pathname
        },

        rssHtmlItem: function () {
            var rss_pathname = media_constants.TEMPLATE_DIRECTORY + media_information.rss_dir_name + 'rssItem.html'
            return rss_pathname
        }
    }
    return media_file_loc
}

