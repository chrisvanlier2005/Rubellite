import Layout from "../Components/Layout.js";
import {Compiler, VirtualDom} from "../framework/framework.js";
export function Error(e){
    let stack = []
    // loop over object to get the stack
    for (let i in e) {
        stack.push(i + ": " + e[i]);
    }
    return `
        ${Layout(`
            <div class="error">
                <div class="message">
                    <img class="addOne" src="public/img/logo.png" alt="">
                    <h2>${e.message}</h2>
                    <h3>Context</h3>
                    <div class="context">${stack.map(line => `<p>${line}</p>`).join("")}</div>
                </div>
              
           </div>
        `)}
    `;
}

export function AddErrorHandler(){
    // continue executing if there is a error
    window.addEventListener("error", (event) => {
        let errorPage = Error(event);
        console.log(event);
        VirtualDom.render("app", Compiler.toObject(errorPage));
    });
}
