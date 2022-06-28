import {Compiler, VirtualDom} from "../framework/framework.js";
import Header from "../Components/Header.js";
import {Link} from "../framework/Link.js";

let Main = `
<div class="rootElement">   
    ${Header()}
    <div class="container">
        <h1>Over mij</h1>    
    </div>
    <img src="public/img/image.jpg" alt="">
</div>
`;


// set the browser url to /home
window.history.pushState({}, "", "/Rubellite/about");


VirtualDom.render("app", Compiler.toObject(Main));
VirtualDom.LinkInit();
VirtualDom.setPageTitle("over mij");