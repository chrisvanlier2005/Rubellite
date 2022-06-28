import {Compiler, VirtualDom} from "../framework/framework.js";
import Header from "../Components/Header.js";
let Main = `
<div class="rootElement">
    ${Header()}
        <div class="container">
        <h1>Contact</h1>    
    </div>
</div>
`;

window.history.pushState({}, "", "/Rubellite/contact");

VirtualDom.render("app", Compiler.toObject(Main));
VirtualDom.setPageTitle("Over mij");