import {Compiler, VirtualDom} from "../framework/framework.js";
import Header from "../Components/Header.js";
let Main = `
<div class="test">
    ${Header()}
    <h1>About</h1>
</div>
`;

window.history.pushState({}, "", "/Rubellite/");

VirtualDom.render("app", Compiler.toObject(Main));
VirtualDom.setPageTitle("Over mij");