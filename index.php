<?php
$timer = microtime(true);
include_once 'Config/Configuration.php';
include_once 'Server/Router.php';
include_once 'Server/Query.php';
include_once 'Server/WebRender.php';


/* Creating a route for the root of the website. */
Route::get('/', function(){
    WebRender::render('main', [
        'title' => 'Home',
        'content' => '<h1>Welcome to the home page!</h1>'
    ]);
});

Route::get('/docs', function(){
    WebRender::render('docs');
});

Route::prefix('/api', function (){
    Route::get('/', function(){
        $query = new Query();
        echo $query->select('*', 'users')->get();
    });
});
$timer = microtime(true) - $timer;
// echo '<br>Time taken to load the website: ' . $timer . ' seconds.';
