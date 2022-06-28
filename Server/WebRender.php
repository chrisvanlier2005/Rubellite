<?php
class WebRender{
    public static function render($view, $data = []){
        // check if the request method is POST
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if($requestMethod == 'POST') {
            // return the page as plain texts
            self::renderFromLink();
        } else{
            // include the php file
            $_POST['js'] = $view;
            include_once 'public/Main.php';
        }

    }

    public static function renderFromLink(){
        // get the page as javascript

    }
}