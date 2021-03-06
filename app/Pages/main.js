
import {Compiler, Props, Reactible, VirtualDom, Http} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler} from "./Error.js";

AddErrorHandler()

let x = new Reactible(1)

function App() {
    return `
    ${Layout(` 
        <div class="center">
            <img class="addOne" src="public/img/logo.webp" alt="" loading="lazy">
            <h1>My new project</h1>
            ${x.get()}
            <p>App version is ${Props('config.version')}</p>
            <h2>${name}</h2>
            <button class="addOne">
             Add one
            </button>
            <div style="font-size: 12px;">
                <p>For the best experience, use a string HTML syntax highlighter</p>
            </div>
        </div>
    `)}
`;
}
Http.setUrl('');

VirtualDom.render("app", Compiler.toObject(App()));

// after the render, you can do any vanilla javascript you want like this:
document.querySelectorAll(".addOne").forEach(element => {
    element.addEventListener("click", () => {
            x.set(x.getValue() + 1);
        }
    );
});

VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");