
// https://scheduler.heroku.com/dashboard
// $ node run-cron rsd
// $ node run-cron pdf
// $ node run-cron podcast


require('./rootAppRequire')
var getPodcastData=rootAppRequire('mediaServer/read-podcast-data')
getPodcastData('my-data');