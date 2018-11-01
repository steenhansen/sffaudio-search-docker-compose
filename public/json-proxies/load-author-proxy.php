<?php

   $strip_author = $_GET['strip_author'];
   $json_author = curl("http://heroku/author/$strip_author");
   print $json_author;
