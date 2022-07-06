<?php
Class Route{
    /* Creating an array that will hold all the routes. */
    public static $routes = [
        'GET'=> [],
        'POST'=> []
    ];
    /* Will record prefixes that will be used */
    public static $prefixes = [];
    /**
     * A function that takes in a url and an action. It then checks if the url is the same as the urlServer. If it is, it
     * will execute the action.
     *
     * @param url The url that you want to match.
     * @param action The function that will be called when the route is matched.
     */
    public static function get($url, $action){
        $urlServer = $_SERVER['REQUEST_URI'];
        $urlServer = explode('?', $urlServer)[0];
        $urlServer = str_replace(Config::$app['root'], '', $urlServer);

        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            if($urlServer == $url){
                $action();
                self::$routes['GET'][$url] = $action;
            }
            /* This is checking if the url that the user typed in the browser matches the prefix url. If it does, then it
            will execute the action. */
            foreach(self::$prefixes as $prefix){
                // add the prefix to the url
                $prefixUrl = $prefix . $url;
                // make a backup url so if the uri contains a / or it does not it will still match the url
                if (substr($prefixUrl, -1) == '/') {
                    $prefixUrlBackUp = substr($prefixUrl, 0, -1);
                } else {
                    $prefixUrlBackUp = $prefixUrl . '/';
                }
                // if the url matches the prefix url or the backup url, execute the action
                if($urlServer == $prefixUrl || $urlServer == $prefixUrlBackUp){
                    $action();
                    self::$routes['GET'][$url] = $action;
                }
            }
        }
    }
    /**
     * If the request method is POST and the url matches the url passed in, then run the action passed in
     *
     * @param url The url that the user will type in the browser
     * @param action The function that will be called when the route is matched.
     */
    public static function post($url, $action){
        $urlServer = $_SERVER['REQUEST_URI'];
        $urlServer = explode('?', $urlServer)[0];
        $urlServer = str_replace(Config::$app['root'], '', $urlServer);

        if($_SERVER['REQUEST_METHOD'] == 'POST' ){
            if($urlServer == $url){
                $action();
                self::$routes['GET'][$url] = $action;
            }
            /* This is checking if the url that the user typed in the browser matches the prefix url. If it does, then it
            will execute the action. */
            foreach(self::$prefixes as $prefix){
                // add the prefix to the url
                $prefixUrl = $prefix . $url;
                // make a backup url so if the uri contains a / or it does not it will still match the url
                if (substr($prefixUrl, -1) == '/') {
                    $prefixUrlBackUp = substr($prefixUrl, 0, -1);
                } else {
                    $prefixUrlBackUp = $prefixUrl . '/';
                }
                // if the url matches the prefix url or the backup url, execute the action
                if($urlServer == $prefixUrl || $urlServer == $prefixUrlBackUp){
                    $action();
                    self::$routes['GET'][$url] = $action;
                }
            }
        }
    }

    /**
     * If the requested URL is not found in the routes array, then load the 404 page
     */
    public static function error()
    {
        $url = str_replace('/php', '', $_SERVER['REQUEST_URI']);
        $url = explode('?', $url)[0];
        if(!isset(self::$routes[$_SERVER['REQUEST_METHOD']][$url])){
            $_POST["requesturi"] = $url;
            view('error.404');
        }
    }

    /**
     * It checks if the url starts with the prefix, if it does, it adds the prefix to the prefixes array and calls the
     * action
     *
     * @param prefix the prefix that you want to use
     * @param action the function that will be executed if the prefix is found in the url
     */
    public static function prefix($prefix, $action){
        // get the url that the user will type in the browser
        $urlServer = $_SERVER['REQUEST_URI'];
        // remove everything after the ?
        $urlServer = explode('?', $urlServer)[0];
        // remove the root from the url
        $urlServer = str_replace(Config::$app['root'], '', $urlServer);

        $subServer = substr($urlServer, 0, strlen($prefix));

        if($subServer == $prefix){
            self::$prefixes[$prefix] = $prefix;
            $action();
        }
    }

}