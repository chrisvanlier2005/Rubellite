<?php
class WebRender{

    /**
     * It includes the main php file and sets the js post to the view to be included
     *
     * @param view the name of the view to be rendered
     * @param data an array of data to be passed to the view
     */
    public static function render($view, $data = []){
        // include the php file and set the js post to the view to be included
        $_POST['js'] = $view;
        $configVariables = Config::$app;
        $data['config'] = $configVariables;
        $_POST['props'] = $data;
        include_once 'public/Main.php';
    }

}