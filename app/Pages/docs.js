import {Compiler, VirtualDom} from "../framework/framework.js";
import {Reactible} from "../framework/framework.js";

import Header from "../Components/Header.js";
import Layout from "../Components/Layout.js";

let x = new Reactible(1);

let App = `
${Layout(`
    <h1>Documentation</h1>
    <p>Looking for some docs? visit the github :) </p>
`)}
`;
window.history.pushState({}, "", "/Rubellite/docs");
VirtualDom.render("app", Compiler.toObject(App));


document.querySelectorAll(".addOne").forEach(element => {
    element.addEventListener("click", () => {
            x.set(x.getValue() + 1);
        }
    );
});



VirtualDom.setPageTitle("Rubellite  - A simple Library for PHP + JS");