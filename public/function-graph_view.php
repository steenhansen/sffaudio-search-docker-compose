<?php // function-graph_view.php


if (!class_exists('DayCache')) {
    include 'function-day_cache.php';
}


if (!class_exists('SffGraphSearch')) {

    class SffGraphSearch
    {
        const HEROKU_UTC_CRON_RUN = 9;
        const MOBILE_START_END = '<!-- start and end widget,  NB, this text is used by PHP -->';
        const HEROKU_WIDGET_MESS = '<!-- Heroku widget code -->';
        const PHP_CACHED_WIDGET_MESS = '<!-- PHP Cached widget code -->';
        const HEROKU_WIDGET_URL = 'https://sffaudio-search.herokuapp.com';
        const WORDPRESS_SEARCH_TEXT_GET = '?wordpress-start=';
        const WAKE_UP_GRAPHENE_DB = '/wake-up';
        const ERROR_FOLDER = '/shortcode-errors/';
        const ERROR_FILE = 'my-errors.txt';
        const MAX_CONNECT_TO_TIME = 1;
        const MAX_WAIT_FOR_FINISH = 1;
        const WAKE_UP_ERROR = ' Wake up error';
        const HEROKU_WRONG_TEXT_ERROR = 'Heroku did not have split header/body text error';
        const PAGES_GOTO_MOBILE = array('search', 'about');  // about is for un-obtrusive testing only

        static function redirectAfterHeader($heroku_address)
        {
            echo "<meta http-equiv='Refresh' content='0;url=$heroku_address' />";
            exit();
        }

        static function isMobileOne($http_user_agent)
        {
            if (strpos($http_user_agent, '(iPad;')) {
                return true;
            }
            $regex_user_agent = '/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i';
            if (preg_match($regex_user_agent, $http_user_agent)) {
                return true;
            } else {
                return false;
            }
        }

        static function isMobileTwo($http_user_agent)
        {
            $regex_4_user_agent = '/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i';
            $user_agent_4 = substr($http_user_agent, 0, 4);
            if (preg_match($regex_4_user_agent, $user_agent_4)) {    // http://detectmobilebrowsers.com/
                return true;
            } else {
                return false;
            }
        }

        static function leaveIfMobile($heroku_address)
        {
            if (self::isMobileOne($_SERVER['HTTP_USER_AGENT'])) {
                self::redirectAfterHeader($heroku_address);
            } else if (self::isMobileTwo($_SERVER['HTTP_USER_AGENT'])) {
                self::redirectAfterHeader($heroku_address);
            } else {
                return;
            }
        }

        static function getQueryParameters($get_author, $get_book, $get_view, $get_choice)
        {
            if ($get_book) {
                if ($get_view) {
                    if ($get_choice) {
                        $author_book_view = "?book=$get_book&author=$get_author&view=$get_view&choice=$get_choice";
                    } else {
                        $author_book_view = "?book=$get_book&author=$get_author&view=$get_view";
                    }
                } else {
                    $author_book_view = "?book=$get_book&author=$get_author";
                }
            } else if ($get_author) {
                if ($get_view) {
                    if ($get_choice) {
                        $author_book_view = "?author=$get_author&view=$get_view&choice=$get_choice";
                    } else {
                        $author_book_view = "?author=$get_author&view=$get_view";
                    }
                } else {
                    $author_book_view = "?author=$get_author";
                }
            } else {
                $author_book_view = '';
            }
            return $author_book_view;
        }

//https://www.sffaudio.com/?s=philip+k+dick => search_term=philip-k-dick
        static function whatSearch($search_term)
        {
            $search_dashes = '';
            if (is_string($search_term)) {
                if (strlen($search_term) > 0) {
                    $search_dashes = str_replace('+', '-', $search_term);
                }
            }
            return $search_dashes;
        }

        static function mobileRedirect($mobile_leaving_pages, $heroku_address)
        {
            if (is_page()) {
                if (function_exists('get_queried_object')) {
                    $php_slug = get_queried_object()->post_name;
                    if (in_array($php_slug, $mobile_leaving_pages)) {
                        self::leaveIfMobile($heroku_address);
                    }
                } else {
                    self::leaveIfMobile($heroku_address);        // if testing always try to goto mobile
                }

            }
        }

        static function phpCodeOnly($url_with_parameters, $widget_url, $get_author, $get_book)
        {
            if ($get_author || $get_book) {
                $curl_time_error = new SffCurlTimeError();
                $graph_html = $curl_time_error->curlGetContents($url_with_parameters) . self::HEROKU_WIDGET_MESS;
            } else {
                $day_cache = new DayCache($widget_url, self::HEROKU_UTC_CRON_RUN);   // 9:00 UTC, as cron job is set for on Heroku
                $graph_html = $day_cache->getString() . self::PHP_CACHED_WIDGET_MESS;
            }
            $iosMetaViewPort__webHtmlJavascript = explode(self::MOBILE_START_END, $graph_html);
            if (count($iosMetaViewPort__webHtmlJavascript) > 1) {
                $web_html_javascript = $iosMetaViewPort__webHtmlJavascript[1];
            } else {
                $web_html_javascript = self::HEROKU_WRONG_TEXT_ERROR;
            }
            return $web_html_javascript;
        }

        static function wakeUpSleepingGrapheneDb($db_wake_up_url)
        {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $db_wake_up_url);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::MAX_CONNECT_TO_TIME);
            curl_setopt($ch, CURLOPT_TIMEOUT, self::MAX_WAIT_FOR_FINISH);
            $db_version = curl_exec($ch);
            if (curl_errno($ch)) {
                $db_version = self::WAKE_UP_ERROR;
                $err_mess = curl_error($ch) . self::WAKE_UP_ERROR;
                $error_filename = __DIR__ . self::ERROR_FOLDER . self::ERROR_FILE;
                file_put_contents($error_filename, $err_mess, FILE_APPEND);
            }
            curl_close($ch);
            return $db_version;
        }

        static function figureHerokuAddr($widget_url, $url_with_parameters, $search_term)
        {
            if ($search_term) {
                $search_dashes = self::whatSearch($search_term);
                $new_location = self::WORDPRESS_SEARCH_TEXT_GET . $search_dashes;
            } else {
                $new_location = $url_with_parameters;
            }
            $heroku_address = "$widget_url/$new_location";
            return $heroku_address;
        }


        static function doTestsInWindowsDir($windows_dir)                 // could not get things to run in separate iframes, so one at a time
        {
            $run_on_windows = strpos($_SERVER['DOCUMENT_ROOT'], $windows_dir);
            if ($run_on_windows === 0) {
                if (!function_exists('is_page')) {
                    function is_page()
                    {
                        return true;
                    }
                }
                $heroku_address = self::HEROKU_WIDGET_URL;
                $test_server = "http://" . $_SERVER['SERVER_NAME'] . '/function-graph_view.php';
                echo "START RUNNING TEST CODE ON LOCAL WINDOWS MACHINE.<br>
         &nbsp;&nbsp; Do both, desktop and mobile via Chrome.<br>
         &nbsp;&nbsp; All mobile links goto $heroku_address.<br>
         &nbsp;&nbsp; Mobile requires same tab, and double back to get back here.

    <br> 11.<a href='$test_server?test=11'>'dick' in search box, and PKD in graph </a>
    <br> 12.<a href='$test_server?test=12'>'beyond lies the wub' in search box, and Beyond in graph </a>
    <br> 13.<a href='$test_server?test=13'>'_not_a_exist_' in search box, and Google for story</a>
    <br> 14.<a href='$test_server?test=14'>Random good author</a>
    <br> 15.<a href='$test_server?test=15'>Random good author</a>


    <br>&nbsp;&nbsp; 21.<a href='$test_server?test=21'>William Gibson in graph </a>
    <br>&nbsp;&nbsp; 22.<a href='$test_server?test=22'>Google '_not_b_exist_' author </a>
    <br>&nbsp;&nbsp; 23.<a href='$test_server?test=23'>Neuromancer in graph </a>
    <br>&nbsp;&nbsp; 24.<a href='$test_server?test=24'>Neuromancer in graph </a>
    <br>&nbsp;&nbsp; 25.<a href='$test_server?test=25'>Google '_not_d_exist_' book </a>
    <br>&nbsp;&nbsp; 26.<a href='$test_server?test=26'>Story not exist</a>


    <br> 31.<a href='$test_server?test=31'>#402 podcast </a>
    <br> 32.<a href='$test_server?test=32'>Beyond Lies the Wub PDF </a>
    <br> 33.<a href='$test_server?test=33'>#7 rsd</a>
    <br> 34.<a href='$test_server?test=34'>POST 1 - Beyond Lies The Wub by Philip K. Dick</a>
    <br> 35.<a href='$test_server?test=35'>POST 2 - PRI’s Selected Shorts: Beyond Lies The Wub by Philip K. Dick</a>
    <br> 36.<a href='$test_server?test=36'>POST 3 - Radio Project X: Beyond Lies The Wub [AUDIO DRAMA]</a>
    <br> 37.<a href='$test_server?test=37'>POST 4 - The Time Traveler Show #11 Beyond Lies The Wub by Philip K. Dick</a>

<br>";
                $params_11 = ['search_term' => 'dick'];
                $params_12 = ['search_term' => 'beyond lies the wub'];
                $params_13 = ['search_term' => '_not_a_exist_'];
                $params_14 = ['search_term' => ''];
                $params_15 = ['_not_x_exist_' => '_not_z_exist_'];

                $params_21 = ['author' => 'william-gibson'];
                $params_22 = ['author' => '_not_b_exist_'];
                $params_23 = ['author' => 'william-gibson', 'book' => 'neuromancer'];
                $params_24 = ['author' => '_not_c_exist_-gibson', 'book' => 'neuromancer'];
                $params_25 = ['author' => 'william-gibson', 'book' => '_not_d_exist_'];
                $params_26 = ['author' => '_not_e_exist_', 'book' => '_not_f_exist_'];

                $params_31 = ['book' => 'a-maze-of-death', 'author' => 'philip-k-dick', 'view' => 'podcast', 'choice' => 1];
                $params_32 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'pdf', 'choice' => 1];
                $params_33 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'rsd', 'choice' => 1];
                $params_34 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'post_book', 'choice' => 1];
                $params_35 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'post_book', 'choice' => 2];
                $params_36 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'post_book', 'choice' => 3];
                $params_37 = ['book' => 'beyond-lies-the-wub', 'author' => 'philip-k-dick', 'view' => 'post_book', 'choice' => 4];

                if ($_GET['test'] == 11) SffGraphSearch::windowTesting($params_11);  //  http://www.sff_test.com/function-graph_view.php?test=11
                if ($_GET['test'] == 12) SffGraphSearch::windowTesting($params_12);  //  http://www.sff_test.com/function-graph_view.php?test=12
                if ($_GET['test'] == 13) SffGraphSearch::windowTesting($params_13);  //  http://www.sff_test.com/function-graph_view.php?test=13
                if ($_GET['test'] == 14) SffGraphSearch::windowTesting($params_14);  //  http://www.sff_test.com/function-graph_view.php?test=14
                if ($_GET['test'] == 15) SffGraphSearch::windowTesting($params_15);  //  http://www.sff_test.com/function-graph_view.php?test=15

                if ($_GET['test'] == 21) SffGraphSearch::windowTesting($params_21);  //  http://www.sff_test.com/function-graph_view.php?test=21
                if ($_GET['test'] == 22) SffGraphSearch::windowTesting($params_22);  //  http://www.sff_test.com/function-graph_view.php?test=22
                if ($_GET['test'] == 23) SffGraphSearch::windowTesting($params_23);  //  http://www.sff_test.com/function-graph_view.php?test=23
                if ($_GET['test'] == 24) SffGraphSearch::windowTesting($params_24);  //  http://www.sff_test.com/function-graph_view.php?test=24
                if ($_GET['test'] == 25) SffGraphSearch::windowTesting($params_25);  //  http://www.sff_test.com/function-graph_view.php?test=25
                if ($_GET['test'] == 26) SffGraphSearch::windowTesting($params_26);  //  http://www.sff_test.com/function-graph_view.php?test=26

                if ($_GET['test'] == 31) SffGraphSearch::windowTesting($params_31);  //  http://www.sff_test.com/function-graph_view.php?test=31
                if ($_GET['test'] == 32) SffGraphSearch::windowTesting($params_32);  //  http://www.sff_test.com/function-graph_view.php?test=32
                if ($_GET['test'] == 33) SffGraphSearch::windowTesting($params_33);  //  http://www.sff_test.com/function-graph_view.php?test=33
                if ($_GET['test'] == 34) SffGraphSearch::windowTesting($params_34);  //  http://www.sff_test.com/function-graph_view.php?test=34
                if ($_GET['test'] == 35) SffGraphSearch::windowTesting($params_35);  //  http://www.sff_test.com/function-graph_view.php?test=35
                if ($_GET['test'] == 36) SffGraphSearch::windowTesting($params_36);  //  http://www.sff_test.com/function-graph_view.php?test=36
                if ($_GET['test'] == 37) SffGraphSearch::windowTesting($params_37);  //  http://www.sff_test.com/function-graph_view.php?test=37

                echo "<br><br>END RUNNING TEST CODE ON LOCAL WINDOWS MACHINE";

            }
        }


        static function windowTesting($post_get_arr)
        {
            extract($post_get_arr);
            if (isset($author)) {
                $_GET['author'] = $author;
            }
            if (isset($book)) {
                $_GET['book'] = $book;
            }
            if (isset($view)) {
                $_GET['view'] = $view;
            }
            if (isset($choice)) {
                $_GET['choice'] = $choice;
            }
            if (isset($search_term)) {
                $_POST['search_term'] = $search_term;
            }
            $my_results = graph_view_component();

            echo $my_results;
        }

    }
}

// https://www.sffaudio.com/search/
if (!function_exists('graph_view_component')) {
    function graph_view_component()
    {  //  [graph_view_component]
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        $widget_url = SffGraphSearch::HEROKU_WIDGET_URL;
        $db_version = SffGraphSearch::wakeUpSleepingGrapheneDb($widget_url . SffGraphSearch::WAKE_UP_GRAPHENE_DB);
        $get_author = @$_GET['author'];
        $get_book = @$_GET['book'];
        $get_view = @$_GET['view'];
        $get_choice = @$_GET['choice'];
        $search_term = @$_POST['search_term'];
        $query_parameters = SffGraphSearch::getQueryParameters($get_author, $get_book, $get_view, $get_choice);
        $goto_heroku_address = SffGraphSearch::figureHerokuAddr($widget_url, $query_parameters, $search_term);
        SffGraphSearch::mobileRedirect(SffGraphSearch::PAGES_GOTO_MOBILE, $goto_heroku_address);

        $scrape_heroku_address = "$widget_url/$query_parameters";
        $web_html_javascript = SffGraphSearch::phpCodeOnly($scrape_heroku_address, $widget_url, $get_author, $get_book);
        $search_dashes = SffGraphSearch::whatSearch($search_term);
        $from_php_js_html = <<<JAVASCRIPT_HTML
        <script>
            window.sff_php_vars={ 
			           "php_url" : "$widget_url",
			        "php_author" : "$get_author",
			          "php_book" : "$get_book",
			    "php_db_version" : "$db_version",
			        "php_search" : "$search_dashes"             // if not '' then inject into text box, fix 'reset' and then run ....
			       };
        </script>
        $web_html_javascript
JAVASCRIPT_HTML;

        error_reporting(0);
        ini_set('display_errors', 0);

        return $from_php_js_html;
    }
}

if (function_exists('shortcode_exists')) {
    if (!shortcode_exists('graph_view_component')) {
        add_shortcode('graph_view_component', 'graph_view_component');
    }
}

SffGraphSearch::doTestsInWindowsDir('D:/github/');

