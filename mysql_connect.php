<?php

DEFINE('DB_USER', 'root');
DEFINE('DB_PASSWORD', '123RedWine456!');
DEFINE('DB_HOST', 'localhost');
DEFINE('DB_NAME', 'empire');

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die('could not connect');

?>
