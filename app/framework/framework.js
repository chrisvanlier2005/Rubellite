/* It renders a virtual DOM tree to the real DOM */
export class VirtualDom {
    /**
     * It takes a root element and a data object and renders the data object as a virtual dom element
     * @param rootId - The id of the root element in the html file.
     * @param data - the data to be rendered
     */
    static root = undefined;
    static render(rootId, data) {
        this.root = rootId;
        let rootElement = document.getElementById(rootId);

        // render root element
        rootElement.innerHTML = '';
        rootElement.appendChild(VirtualDom.elementRender(data));
        VirtualDom.LinkInit();
    }
    /**
     * It takes a JSON object and returns a DOM element
     * @param data - The data that is passed to the function.
     * @returns A virtual DOM element.
     */
    static elementRender(data) {
        let element = document.createElement(data.tag);
        if (data.tag === undefined){
            return document.createTextNode(data);
        }
        for(let key in data.attributes){
            element.setAttribute(key, data.attributes[key]);
        }
        if(data.children){
            let childElements = [];
            for(let child of data.children){
                childElements.push(VirtualDom.elementRender(child));
            }
            for(let childElement of childElements){
                element.appendChild(childElement);
            }
        }
        return element;
    }

    /**
     * This function sets the page title to the value of the title parameter.
     * @param title - The title of the page.
     */
    static setPageTitle(title) {
        document.title = title;
    }
    /**
     * It finds all links with the data-location and data-rubelite attributes, and adds a click event listener to each one
     */
    static LinkInit(){
        let links = document.querySelectorAll('a[data-location][data-rubelite]');
        for(let link of links){
            let linkData = {
                href: link.getAttribute('href'),
                text: link.innerText,
                attributes: {
                    'data-location': link.getAttribute('data-location'),
                    'data-rubelite': link.getAttribute('data-rubelite')
                }
            }
            link.addEventListener('click', new LinkHandler(linkData).handle);
        }
    }
}

/* It takes a string of HTML and converts it into a JavaScript object */
export class Compiler {
    static toObject(html) {
        html = html.replace(/\n/g, "");
        html = html.replace(/\s{2,}/g, "");
        let dom = new DOMParser().parseFromString(html, "text/html");
        let root = dom.body.firstChild;
        let result = {};
        result.tag = root.tagName;
        result.children = [];
        result.attributes = {};
        for (let i = 0; i < root.attributes.length; i++) {
            result.attributes[root.attributes[i].name] = root.attributes[i].value;
        }
        for (let i = 0; i < root.childNodes.length; i++) {
            let child = root.childNodes[i];
            child = Compiler.childNodeToObject(child);
            result.children.push(child);
        }
        return result;
    }
    static childNodeToObject(childNode) {
        // check if childNode is a node
        if (childNode.nodeType === 1) {
            let element = {};
            element.tag = childNode.tagName;
            element.children = [];
            element.attributes = {};
            for (let i = 0; i < childNode.attributes.length; i++) {
                element.attributes[childNode.attributes[i].name] = childNode.attributes[i].value;
            }
            for (let i = 0; i < childNode.childNodes.length; i++) {
                let child = childNode.childNodes[i];
                child = Compiler.childNodeToObject(child);
                element.children.push(child);

            }
            return element;
        }
        else {
            return childNode.nodeValue;
        }

    }

}


/* It handles the click event on a link, fetches the page, and adds the script to the page */
export class LinkHandler {
    constructor(props) {
        this.props = props;
    }
    /**
     * It takes the url of the link that was clicked, replaces the url with the rubelite url, fetches the page, gets the
     * script, removes the script from the html, and adds the script to the html
     * @param event - the event that triggered the function
     */
    async handle(event) {
        event.preventDefault();
        let location = event.target.href;

        // replacing standard url with rubelite url
        location = location.replace('localhost', '');
        location = location.replace('http://', '');
        location = location.replace('https://', '');
        location = "Rubellite" + location;

        // get the page
        let rubelite = event.target.dataset.rubelite;
        let response = await fetch(location);
        let html = await response.text();

        // getting the page script
        let script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
        let src = script[0].match(/src="([^"]*)"/i);
        src = src[1]
        src = src + "?_=" + new Date().getTime();
        // removing it from the html
        let scriptElement = document.querySelector('script');
        scriptElement.remove();
        // adding the script to the html
        let scriptEl = document.createElement('script');
        scriptEl.src = src;
        scriptEl.type = 'module';
        document.body.appendChild(scriptEl);
    }
}
export class Reactible{
    constructor(value) {
        this.value = value;
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    get(){
        switch (typeof this.value) {
            case 'string':
                return `<span class="rube-${this.id}">${this.value}</span>`;
            case 'number':
                return `<span class="rube-${this.id}">${this.value}</span>`;
        }
    }
    getValue(){
        return this.value;
    }
    set(newValue){
        this.value = newValue;
        let element = document.querySelector(`.rube-${this.id}`);
        element.innerText = this.value; // this.value is the new value
    }
}

export default {VirtualDom, Compiler, LinkHandler};
