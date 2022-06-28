<?php
/* Parsing the arguments passed to the script. */
parse_str(implode('&', array_slice($argv, 1)), $_GET);

switch ($_GET["fn"]){
    case "create-route":
        createRoute();
        break;
    default:
        echo "Command does not exist";
}

/**
 * It creates a route in the index.php file and a page in the app/Pages folder
 */
function createRoute(){
    if (!isset($_GET['name'])) {
        echo "Rubel: You forgot to pass the name!\n";
        echo "Rubel: What should be the name?\n";
        $handle = fopen ("php://stdin","r");
        $_GET['name'] = trim(fgets($handle));
        if($_GET['name'] == ""){
            echo "Aborting Operation!\n";
            die();
            exit();
        }
        echo "Rubel: Thanks, continuing operation...\n";
    }
    $path = dirname(__FILE__).'\index.php';

    $filepath = fopen($path, 'a');
    if (!$filepath){
        echo 'Err. index not found';
    }
    $name = $_GET["name"];
   fwrite($filepath, "
Route::get('/$name', function(){
    WebRender::render('$name');
});
");
    fclose($filepath);

    $path = dirname(__FILE__)."\app\Pages\\".$name.'.js';
    $filepath = fopen($path, 'w');

    /* The boilerplate code that is written in every page. */
    $standard = "
import {Compiler, Reactible, VirtualDom} from '../framework/framework.js'
import Layout from '../Components/Layout.js'
import {AddErrorHandler, Error } from './Error.js';
AddErrorHandler()

// Reactible variables

let x = new Reactible(1)
function App(){
    return `
    \${Layout(` 
       <h1>$name</h1>
       \${x.get()}
    `)}
`;
}


window.history.pushState({}, '', '/Rubellite/$name');
VirtualDom.render('app', Compiler.toObject(App()));

document.querySelectorAll('.addOne').forEach(element => {
    element.addEventListener('click', () => {
            x.set(x.getValue() + 1);
        }
    );
});


VirtualDom.setPageTitle('$name');
    
    ";
    fwrite($filepath, $standard);
    fclose($filepath);
    echo "Rubel: I've created the Route $name and file $name.js successfully!";
}