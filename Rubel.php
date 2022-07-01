<?php
/* Parsing the arguments passed to the script. */
parse_str(implode('&', array_slice($argv, 1)), $_GET);

/* switching through the commands */
if (isset($_GET["fn"])){
    switch ($_GET["fn"]){
        case "create-route":
            createRoute();
            break;
            case "help":
                listHelp();
                break;
        default:
            echo "Command does not exist";
    }
} else {
    echo "What do you want to do? (help or h for help)\n";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    $line = trim($line);
    switch ($line){
        case "create-route":
            echo "What is the name of the route?\n";
            $handle = fopen("php://stdin", "r");
            $line = fgets($handle);
            $line = trim($line);
            $_GET["name"] = $line;
            createRoute();
            break;
        case "h":
        case "help":
            listHelp();
            break;
        default:
            echo "Command does not exist";
    }
}


function listHelp(){
    $commands = [
        "create-route" => "Create a route",
        "help / h" => "List all commands & descriptions"
    ];
    echo "List of commands:";
    foreach ($commands as $command => $description){
       // make the command red added to the end of the command
        // echo a red box around the command

        echo "\n\t\033[31m" . $command . "\033[0m" . " - " . $description;
    }
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
import {Compiler, Reactible, VirtualDom, Props} from '../framework/framework.js'
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


window.history.pushState({}, '', `/\${Props('config.name')}/$name`);
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
