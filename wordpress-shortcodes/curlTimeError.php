<?php

// /home/sffayiao/public_html/wp-content/themes/revolution-code-blue2/curlTimeError.php

if (!class_exists('SffCurlTimeError')) {

    class SffCurlTimeError
    {
        const ERROR_FOLDER = '/shortcode-errors/';
        const ERROR_FILE = 'my-errors.txt';
        const MAX_CONNECT_TO_TIME = 1;
        const MAX_WAIT_FOR_FINISH = 3;

        function __construct($always_record=false)
        {
            $this->always_record = $always_record;
            $this->curl_span = 'empty';
        }
        
        function lastCurlSpan()
        {
            return $this->curl_span;
        }
        
        function curlGetContents($get_url)
        {
            $start_time = microtime(true);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $get_url);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::MAX_CONNECT_TO_TIME);
            curl_setopt($ch, CURLOPT_TIMEOUT, self::MAX_WAIT_FOR_FINISH);
            $page_data = curl_exec($ch);
            if ($this->always_record || curl_errno($ch)) {
                $err_mess = curl_error($ch);
                $error_filename = __DIR__ . self::ERROR_FOLDER . self::ERROR_FILE;
                file_put_contents($error_filename, $err_mess, FILE_APPEND);
                $page_data = 'Error';
            }
            curl_close($ch);
            $end_time = microtime(true);
            $this->curl_span = $end_time - $start_time;
            return $page_data;
        }


    }
}

