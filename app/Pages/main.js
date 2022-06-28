import {Compiler, VirtualDom} from "../framework/framework.js";
import Header from "../Components/Header.js";
// import css
let Main = `

<div class="test">
    <link rel="stylesheet" href="app/css/global.css">
    ${Header()}
    <h1>Homepage</h1>
</div>
`;

window.history.pushState({}, "", "/Rubellite/");

VirtualDom.render("app", Compiler.toObject(Main));
VirtualDom.setPageTitle("Hello World");