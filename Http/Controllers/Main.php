<?php
class Main {
    public static function index(){
        $get = json_encode($_GET);
        WebRender::render('main', [
            'title' => 'Home',
            'content' => "$get"
        ]);
    }
}