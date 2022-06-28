<?php
$timer = microtime(true);
include_once 'Config/Configuration.php';
include_once 'Server/Router.php';
include_once 'Server/WebRender.php';


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
