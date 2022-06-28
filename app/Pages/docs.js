import {Compiler, Reactible, VirtualDom} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler, Error } from "./Error.js";
AddErrorHandler()

// Reactible variables
let x = new Reactible(1)

function App(){
   return `
    ${Layout(` 
        <h1>Docs page</h1>
    `)}
`;
}


window.history.pushState({}, "", "/Rubellite/docs");
VirtualDom.render("app", Compiler.toObject(App()));

document.querySelectorAll(".addOne").forEach(element => {
    element.addEventListener("click", () => {
            x.set(x.getValue() + 1);
        }
    );
});


VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");