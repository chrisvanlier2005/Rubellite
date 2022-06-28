import {Compiler, Reactible, VirtualDom} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler, Error } from "./Error.js";
AddErrorHandler()

// Reactible variables
let x = new Reactible(1)

function App(){
   return `
    ${Layout(` 
        <div class="center">
            <img class="addOne" src="public/img/logo.png" alt="">
            <h1>Say hello world!</h1>
            ${x.get()}
            <button class="addOne">
             Add one
            </button>
            <div style="font-size: .6rem;">
                <p><i>For the best experience use PHPStorm or Webstorm</i></p>
                <p><i>Or anything that has syntax highlighting in strings.</i></p>
            </div>
        </div>
    `)}
`;
}


window.history.pushState({}, "", "/Rubellite/");
VirtualDom.render("app", Compiler.toObject(App()));

document.querySelectorAll(".addOne").forEach(element => {
    element.addEventListener("click", () => {
            x.set(x.getValue() + 1);
        }
    );
});


VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");