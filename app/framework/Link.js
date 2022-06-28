import { Compiler, VirtualDom } from "./framework.js";

export let Link = (props) => {
    let randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `<a href="${props.href}" data-location="${randomId}" data-rubelite>${props.text}</a>`;
}

