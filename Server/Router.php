<?php
Class Route{
    public static $routes = [
        'GET'=> [],
        'POST'=> []
    ];
    public static function get($url, $action){
        $urlServer = $_SERVER['REQUEST_URI'];
        $urlServer = explode('?', $urlServer)[0];
        $urlServer = str_replace(Config::$app['root'], '', $urlServer);

        if($_SERVER['REQUEST_METHOD'] == 'GET' || $_SERVER['REQUEST_METHOD'] == 'POST'){
            if($urlServer == $url){
                $action();
                self::$routes['GET'][$url] = $action;
            }
        }
    }
    public static function post($url, $action){
        $urlServer = $_SERVER['REQUEST_URI'];
        // remove everything after the ?
        $urlServer = explode('?', $urlServer)[0];
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            if($urlServer == $url){
                $action();
                self::$routes['POST'][$url] = $action;
            }
        }
    }
    public static function error()
    {
        $url = str_replace('/php', '', $_SERVER['REQUEST_URI']);
        $url = explode('?', $url)[0];
        if(!isset(self::$routes[$_SERVER['REQUEST_METHOD']][$url])){
            $_POST["requesturi"] = $url;
            view('error.404');
        }
    }
}