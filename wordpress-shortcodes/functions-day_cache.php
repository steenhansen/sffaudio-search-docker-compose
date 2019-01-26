<?php

// /home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/functions-day_cache.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

/*
    Used by functions-graph-search.php because base SFFaudio search widget since only changes once a day
*/

// public_html/wp-content/themes/revolution-code-blue2/functions-day-cache.php
// used by functions-graph-search.php
if (!class_exists('DayCache')) {


    class DayCache
    {
        const HEROKU_UTC_CRON_RUN = 9;             // NB, must be larger than 0 or tests will fail
        const CONNECT_URL_WAIT_SECONDS = 3;
        const ONE_DAY_SECONDS = 60 * 60 * 24;
        const VALID_FILENAME_CHARS = "/[^A-Za-z0-9.-]/";
        const MAKE_CACHE_TIMESTAMP = " search cache made at - ";
        const DAY_CACHES_FOLDER = '/day-caches/';

        const MIN_WIDGET_SIZE = 2000000;         // 3196031 uncompressed

        // $ymdh_cache = new DayCache('https://sffaudio-search.herokuapp.com', 9);
        function __construct($widget_url, $after_cron_hour_int)
        {
            $this->widget_url = $widget_url;
            $cache_name = preg_replace(self::VALID_FILENAME_CHARS, '', $widget_url);        // httpssffaudio-search.herokuapp.com
            $this->cache_name = $cache_name;
            $this->after_cron_hour_int = (int)$after_cron_hour_int;
            $this->curl_time = 'empty';
            $this->_test_built_cache_ = 'empty';
        }


        function deleteOldCache($new_date_ymdh)
        {
            $old_date_ymdh = $new_date_ymdh - self::ONE_DAY_SECONDS;
            list($old_year, $old_month, $old_day) = $this->ymdTimeArray($old_date_ymdh);
            $old_ymd_name = $this->buildFilenameYmd($old_year, $old_month, $old_day);
            @unlink($old_ymd_name);
        }

        function buildFilenameYmd($the_year, $the_month, $the_day)
        {
            $ymd_filename = __DIR__ . self::DAY_CACHES_FOLDER . $this->cache_name . "-$the_year-$the_month-$the_day";
            return $ymd_filename;
        }

        // $day_cache->_testDeleteFile_([2017, 12, 31]);
        function _testDeleteFile_($ymd_array)
        {
            list($year_int, $month_int, $day_int) = $ymd_array;
            $delete_ymd_name = $this->buildFilenameYmd($year_int, $month_int, $day_int);
            @unlink($delete_ymd_name);
        }

        // if ($day_cache->_testFileExists_([2017, 12, 31])) {
        function _testFileExists_($ymd_array)
        {
            list($year_int, $month_int, $day_int) = $ymd_array;
            $exists_ymd_name = $this->buildFilenameYmd($year_int, $month_int, $day_int);
            return file_exists($exists_ymd_name);
        }

        function _testFileNotExist_($ymd_array)
        {
            return !$this->_testFileExists_($ymd_array);
        }

        function ymdTimeArray($date_time)
        {
            $year_int = (int)gmdate("Y", $date_time);
            $month_int = (int)gmdate("n", $date_time);
            $day_int = (int)gmdate("j", $date_time);
            return [$year_int, $month_int, $day_int];
        }

        // $time_2017_12mon_31d_23pm = this->makeYearMonthDayHour([2017, 12, 31, 23]);
        function makeYearMonthDayHour($ymdh_array)
        {
            list($year_int, $month_int, $day_int, $hour_int) = $ymdh_array;
            $time_ymdh = mktime($hour_int, 0, 0, $month_int, $day_int, $year_int);
            return $time_ymdh;
        }

        function makeNow($after_cron_hour_int = NULL)
        {
            list($now_year, $now_month, $now_day) = $this->ymdTimeArray(time());
            if (is_int($after_cron_hour_int)) {
                $now_hour = $after_cron_hour_int;
            } else {
                $now_hour = (int)gmdate("G", time());
            }
            $time_ymdh = $this->makeYearMonthDayHour([$now_year, $now_month, $now_day, $now_hour]);
            return $time_ymdh;
        }


        function cacheFilename($cache_date_ymdh)
        {
            list($year_of_cache, $month_of_cache, $day_of_cache) = $this->ymdTimeArray($cache_date_ymdh);
            $cache_filename = $this->buildFilenameYmd($year_of_cache, $month_of_cache, $day_of_cache);
            return $cache_filename;
        }

        function lastCurlTime()
        {
            return $this->curl_time;
        }


        function buildCacheFile($cached_widget, $new_date_ymdh)
        {
            $temp_name = __DIR__ . self::DAY_CACHES_FOLDER . uniqid();
            $cache_timestamp = "<!--" . self::MAKE_CACHE_TIMESTAMP . gmdate('M d Y H:i:s') . "-->";
            file_put_contents($temp_name, $cached_widget . $cache_timestamp);
            list($new_year, $new_month, $new_day) = $this->ymdTimeArray($new_date_ymdh);
            $new_ymd_name = $this->buildFilenameYmd($new_year, $new_month, $new_day);
            rename($temp_name, $new_ymd_name);
            $this->deleteOldCache($new_date_ymdh);
        }

        function getCurrentAndHerokuTime($ymdh_array)
        {
            if (is_array($ymdh_array)) {
                $time_ymdh = $this->makeYearMonthDayHour($ymdh_array);
                list($year_int, $month_int, $day_int, $_hour_int_) = $ymdh_array;             // TESTING
                $heroku_ymdh = $this->makeYearMonthDayHour([$year_int, $month_int, $day_int, $this->after_cron_hour_int]);
            } else {
                $time_ymdh = $this->makeNow();
                $heroku_ymdh = $this->makeNow($this->after_cron_hour_int);
            }
            return [$time_ymdh, $heroku_ymdh];
        }

        function getFilePostFixYmdh($time_ymdh, $heroku_ymdh)
        {
            if ($time_ymdh < $heroku_ymdh) {
                $cache_date_ymdh = $time_ymdh - self::ONE_DAY_SECONDS;   // now 1am, but Heroku cron job runs at 3am, then use yesterday's cache
            } else {
                $cache_date_ymdh = $time_ymdh;
            }
            return $cache_date_ymdh;
        }


        /*
          $now_cache = new DayCache('https://sffaudio-search.herokuapp.com', 9);   // 9:00 UTC, as cron job is set for on Heroku
          $cached_string = $now_cache->getString([2017, 12, 31, 23]);              // can set the current time for testing
          $cached_string = $now_cache->getString();  
        */
        function getString($ymdh_array = NULL)
        {
            list($time_ymdh, $heroku_ymdh) = $this->getCurrentAndHerokuTime($ymdh_array);
            $cache_date_ymdh = $this->getFilePostFixYmdh($time_ymdh, $heroku_ymdh);
            $cache_file_name = $this->cacheFilename($cache_date_ymdh);
            if (file_exists($cache_file_name)) {
                $cached_widget = file_get_contents($cache_file_name);
                $this->_test_built_cache_ = false;
            } else {
                $curl_time_error = new SffCurlTimeError();
                $cached_widget = $curl_time_error->curlGetContents($this->widget_url);
                $this->curl_time = $curl_time_error->lastCurlSpan();
                if (strlen($cached_widget) > self::MIN_WIDGET_SIZE) {
                    $this->buildCacheFile($cached_widget, $cache_date_ymdh);  // first search today
                    $this->_test_built_cache_ = true;
                }
            }
            return $cached_widget;
        }

        static function _errors_to_str_($error_array, $error_type)
        {
            if (count($error_array) === 0) {
                $error_message = "<p style='color:green'>$error_type</p>";
            } else {
                $the_errors = implode("<br>", $error_array);
                $error_message = "<p style='color:red'>$error_type <br>$the_errors</p>";
            }
            return $error_message;
        }


        static function _no_cache_before_update_1_($day_cache)
        {
            $test_errors = [];
            if (self::HEROKU_UTC_CRON_RUN < 1) {
                $test_errors [] = 'HEROKU_UTC_CRON_RUN must be larger than 1 for tests to work';
            }
            $day_cache->_testDeleteFile_([2017, 12, 31]);
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            $hour_before_cron = self::HEROKU_UTC_CRON_RUN - 1;
            $cached_string = $day_cache->getString([2018, 1, 1, $hour_before_cron]);
            $curl_time = $day_cache->lastCurlTime();
            if (strlen($cached_string) < self::MIN_WIDGET_SIZE) {
                $test_errors [] = 'Widget string too small';
                $test_errors [] = strlen($cached_string);
                $test_errors [] = substr($cached_string, 0, 512);
            }
            if (!$day_cache->_test_built_cache_) {
                $test_errors [] = 'Cache was not built';
            }
            if ($day_cache->_testFileNotExist_([2017, 12, 31])) {
                $test_errors [] = '[2017, 12, 31] should exist';
            }
            if ($day_cache->_testFileExists_([2018, 1, 1])) {
                $test_errors [] = '[2018, 1, 1] should not exist';
            }
            $test_message = DayCache::_errors_to_str_($test_errors, "1: No file cache before Heroku update (curl time=$curl_time)");
            $day_cache->_testDeleteFile_([2017, 12, 31]);
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            return $test_message;
        }

        static function _no_cache_after_update_2_($day_cache)
        {
            $test_errors = [];
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            $hour_after_cron = self::HEROKU_UTC_CRON_RUN + 1;
            $cached_string = $day_cache->getString([2018, 1, 1, $hour_after_cron]);
            $curl_time = $day_cache->lastCurlTime();
            if (strlen($cached_string) < self::MIN_WIDGET_SIZE) {
                $test_errors [] = 'Widget string too small';
                $test_errors [] = strlen($cached_string);
                $test_errors [] = substr($cached_string, 0, 512);
            }
            if (!$day_cache->_test_built_cache_) {
                $test_errors [] = 'Cache was not built';
            }
            if ($day_cache->_testFileExists_([2017, 12, 31])) {
                $test_errors [] = '[2017, 12, 31] should not exist';
            }
            if ($day_cache->_testFileNotExist_([2018, 1, 1])) {
                $test_errors [] = '[2018, 1, 1] should exist';
            }
            $test_message = DayCache::_errors_to_str_($test_errors, "2: No file cache after Heroku update (curl time=$curl_time)");
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            return $test_message;
        }


        static function _with_cache_before_update_3_($day_cache)
        {
            $test_errors = [];
            $day_cache->_testDeleteFile_([2017, 12, 31]);
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            $hour_before_cron = self::HEROKU_UTC_CRON_RUN - 1;
            $_make_the_cache_exist_ = $day_cache->getString([2018, 1, 1, $hour_before_cron]);
            $curl_time = $day_cache->lastCurlTime();
            $cached_string = $day_cache->getString([2018, 1, 1, $hour_before_cron]);
            if (strlen($cached_string) < self::MIN_WIDGET_SIZE) {
                $test_errors [] = 'Widget string too small';
                $test_errors [] = strlen($cached_string);
                $test_errors [] = substr($cached_string, 0, 512);
            }
            if ($day_cache->_test_built_cache_) {
                $test_errors [] = 'Cache was built';
            }
            if ($day_cache->_testFileNotExist_([2017, 12, 31])) {
                $test_errors [] = '[2017, 12, 31] should exist';
            }
            if ($day_cache->_testFileExists_([2018, 1, 1])) {
                $test_errors [] = '[2018, 1, 1] should not exist';
            }
            $test_message = DayCache::_errors_to_str_($test_errors, "3: With file cache before Heroku update (curl time=$curl_time)");
            $day_cache->_testDeleteFile_([2017, 12, 31]);
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            return $test_message;
        }


        static function _with_cache_after_update_4_($day_cache)
        {
            $test_errors = [];
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            $hour_after_cron = self::HEROKU_UTC_CRON_RUN + 1;
            $_make_the_cache_exist_ = $day_cache->getString([2018, 1, 1, $hour_after_cron]);
            $cached_string = $day_cache->getString([2018, 1, 1, $hour_after_cron]);
            $curl_time = $day_cache->lastCurlTime();
            if (strlen($cached_string) < self::MIN_WIDGET_SIZE) {
                $test_errors [] = 'Widget string too small';
                $test_errors [] = strlen($cached_string);
                $test_errors [] = substr($cached_string, 0, 512);
            }
            if ($day_cache->_test_built_cache_) {
                $test_errors [] = 'Cache was built';
            }
            if ($day_cache->_testFileExists_([2017, 12, 31])) {
                $test_errors [] = '[2018, 1, 1] should not exist';
            }
            if ($day_cache->_testFileNotExist_([2018, 1, 1])) {
                $test_errors [] = '[2018, 1, 1] should exist';
            }
            $test_message = DayCache::_errors_to_str_($test_errors, "4: With file cache after Heroku update (curl time=$curl_time)");
            $day_cache->_testDeleteFile_([2018, 1, 1]);
            return $test_message;
        }

        static function _test_DayCache_()
        {
            $all_errors = [];
            $day_cache = new DayCache('https://sffaudio-search.herokuapp.com', self::HEROKU_UTC_CRON_RUN);
            $all_errors [] = DayCache::_no_cache_before_update_1_($day_cache);
            $all_errors [] = DayCache::_no_cache_after_update_2_($day_cache);
            $all_errors [] = DayCache::_with_cache_before_update_3_($day_cache);
            $all_errors [] = DayCache::_with_cache_after_update_4_($day_cache);
            $test_message = 'DayCache errors found' . DayCache::_errors_to_str_($all_errors, '');
            return $test_message;
        }
    }

}


///////////////////////

if (!function_exists('day_cache')) {
    function day_cache()
    {  //  [day_cache]

        error_reporting(E_ALL);
        ini_set('display_errors', 1);


        $test_output = DayCache::_test_DayCache_();


        $day_cache_html = <<<JAVASCRIPT_HTML
     
     <br><br> test_output start<br><br>
        $test_output  
      <br><br>test_output end<br><br>
       -->
JAVASCRIPT_HTML;


        print $day_cache_html;

        error_reporting(0);
        ini_set('display_errors', 0);

        return $day_cache_html;
    }
}


if (!shortcode_exists('day_cache')) {
    if (function_exists('add_shortcode')) {
        add_shortcode('day_cache', 'day_cache');
    }
}

error_reporting(0);
ini_set('display_errors', 0);
        
        
