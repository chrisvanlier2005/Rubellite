<?php
class Docs {
    public static function index(){
        return WebRender::render('docs', [
            'title' => 'Docs',
            'content' => '<h1>Welcome to the docs page!</h1>'
        ]);
    }
}