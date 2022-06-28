import {Compiler, VirtualDom} from "../framework/framework.js";
import Header from "../Components/Header.js";
import {Link} from "../framework/Link.js";

let Main = `
<div class="test">
    ${Header()}
    <p>over mij</p>
</div>
`;


// set the browser url to /home
window.history.pushState({}, "", "/Rubellite/about");


VirtualDom.render("app", Compiler.toObject(Main));
VirtualDom.LinkInit();
VirtualDom.setPageTitle("over mij");