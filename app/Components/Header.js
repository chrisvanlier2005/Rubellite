import {Link} from "../framework/Link.js";
let Header = () => {
    let navLinks = [
        { text: "Home", href: "/" },
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" }
    ]
    return `
    <div class="header">
        <h1>Header</h1>
        ${navLinks.map(link => Link(link)).join("")}
    
    </div>
    `;
}

export default Header;