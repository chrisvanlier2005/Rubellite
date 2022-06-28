<?php
$timer = microtime(true);
include_once 'Config/Configuration.php';
include_once 'Server/Router.php';
include_once 'Server/WebRender.php';


/* Creating a route for the root of the website. */
Route::get('/', function(){
    WebRender::render('main');
});

Route::get('/contact', function(){
    WebRender::render('contact');
});

Route::get('/about', function(){
    WebRender::render('about');
});

$timer = microtime(true) - $timer;
// echo '<br>Time taken to load the website: ' . $timer . ' seconds.';
