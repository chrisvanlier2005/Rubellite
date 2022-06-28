import {Link} from "../framework/Link.js";
import Header from "./Header.js";

let Layout = (slot) => {
    return `
    <div class="rootElement">
        ${Header()}
        <div class="container">
            ${slot}
        </div>
    </div>
    `
}

export default Layout;