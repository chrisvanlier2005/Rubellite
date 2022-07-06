<?php
function Controller($controllerName, $actionName){
    // check if the controller exists
    if(file_exists('Http/Controllers/' . $controllerName . '.php')){
        // include the controller
        include_once 'Http/Controllers/' . $controllerName . '.php';
        // create an instance of the controller
        $controller = new $controllerName();
        // check if the action exists
        if(method_exists($controller, $actionName)){
            // call the action
            $controller->$actionName();
        }
    } else {
        // if the controller doesn't exist, then throw an error
        echo 'The controller ' . $controllerName . ' does not exist.';
    }
}