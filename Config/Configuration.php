<?php
class Config {
    public static $database = [
        'host' => 'localhost',
        'user' => 'root',
        'password' => '',
        'database' => 'test'
    ];
    public static $app = [
        'name' => 'Test',
        'version' => '1.0.0',
        'root' => 'C:/xampp/htdocs/Rubellite',
        'web_adress' => 'http://localhost/Rubellite',
    ];
}

$ROOT_PATH = Config::$app['root'];
$ROOT_PATH = str_replace('C:/xampp/htdocs', '', $ROOT_PATH);

Config::$app['root'] = $ROOT_PATH;
