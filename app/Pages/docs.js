
import {Compiler, Reactible, VirtualDom, Props, Http} from "../framework/framework.js";
import Layout from "../Components/Layout.js";
import {AddErrorHandler } from "./Error.js";

AddErrorHandler();


let amountClicked = new Reactible(0, "span", () => {
    console.log(amountClicked.value);
});

let btn = new Reactible("Popup demo",  "button", () => {
    amountClicked.set(amountClicked.getValue() + 1);
})

function App(){
    return `
    ${Layout(` 
        ${btn.get()}
        <p>You clicked me: ${amountClicked.get()} times</p>
    `)}
`;
}

// this should be in all pages
Http.setUrl('docs')
VirtualDom.render("app", Compiler.toObject(App()));
VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");


document.querySelector(`.rube-${btn.id}`).addEventListener("click", () => {
    btn.set("You clicked me!");
});



