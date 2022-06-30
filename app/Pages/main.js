// start timer
let start = new Date().getTime();

import {Compiler, Reactible, VirtualDom, Props} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler } from "./Error.js";
AddErrorHandler()

// Reactible variables
let x = new Reactible(1)

function App(){
   return `
    ${Layout(` 
        <div class="center">
            <img class="addOne" src="public/img/logo.webp" alt="">
            <h1>My new project</h1>
            ${x.get()}
            <h2>${name}</h2>
            <button class="addOne">
             Add one
            </button>
            <div style="font-size: 12px;">
                <p><i>For the best experience use PHPStorm or Webstorm</i></p>
                <p><i>Or anything that has syntax highlighting in strings.</i></p>
            </div>
        </div>
    `)}
`;
}


window.history.pushState({}, "", `/${Props('config.name')}/`);
VirtualDom.render("app", Compiler.toObject(App()));

document.querySelectorAll(".addOne").forEach(element => {
    element.addEventListener("click", () => {
            x.set(x.getValue() + 1);
        }
    );
});


let end = new Date().getTime();
// console log in seconds
console.log("Started in " +(end - start) / 1000 + "s");


VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");