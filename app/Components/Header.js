import {Link} from "../framework/Link.js";
let Header = () => {
    let navLinks = [
        { text: "Home", href: "/" },
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" }
    ]
    return `
    <style>
        .header{
            color: black;
            background: white;
            display: flex;
            padding: 0 20px;
            align-items: center;
        }
        .header a{
            color: black;
            text-decoration: none;
            display: block;
            padding: 10px;
        }
        .header a:hover{
            color: #4f4fff;
            
        }
    </style>
    <div class="header">
        ${navLinks.map(link => Link(link)).join("")}
    </div>
    `;
}

export default Header;