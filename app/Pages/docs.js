
import {Compiler, Reactible, VirtualDom, Props} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler, Error } from "./Error.js";
import RubePopup from "../framework/RubePopup.js";

AddErrorHandler()

// Reactible variables
let btn = new Reactible("Popup demo", () => {}, "button")

function App(){
   return `
    ${Layout(` 
        ${btn.get()}
    `)}
`;
}


window.history.pushState({}, "", `/${Props('config.name')}/docs`);
VirtualDom.render("app", Compiler.toObject(App()));


document.querySelector(`.rube-${btn.id}`).addEventListener("click", () => {
    btn.set("You clicked me!");
    let popup = new RubePopup();
    popup.show(`
        <div class="popup">
            <h1>Hello world</h1>
            <p>This is a popup</p>
        </div>
    `);

});



VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");