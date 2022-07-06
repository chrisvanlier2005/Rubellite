<?php
$timer = microtime(true);
include_once 'Config/Configuration.php';
include_once 'Server/Router.php';
include_once 'Server/Query.php';
include_once 'Server/WebRender.php';
include_once 'Server/Controller.php';

// start the router
include_once 'Http/Routes/Web.php';


$timer = microtime(true) - $timer;
// echo '<br>Time taken to load the website: ' . $timer . ' seconds.';



