<?php
// in this file, we will define the routes for the web application

Route::get('/', function(){
    Controller('Main', 'index');
});

Route::get('/docs', function(){
    Controller('Docs', 'index');
});

Route::prefix('/api', function (){
    Route::get('/', function(){
        $query = new Query();
        echo $query->select('*', 'users')->get();
    });
});