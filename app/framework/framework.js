
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
        let rootElement;
        if (rootId.substring(0, 1) === ".") {
            console.log("rootId is a class: " + rootId);
            rootElement = document.querySelector(rootId);
        } else{
            rootElement = document.getElementById(rootId);
        }


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
        location = `${Props('config.name')}` + location;

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
        let scriptElement = document.querySelector('script[src]');

        scriptElement.remove();

        // get the div with the id of app out of the html
        let app = html.match(/<div id="app"[^>]*>([\s\S]*?)<\/div>/gi);
        app = app[0];

        let props = Compiler.toObject(app).attributes['data-rubellite-props'];

        let scriptEl = document.createElement('script');
        scriptEl.src = src;
        scriptEl.type = 'module';
        document.querySelector('#app').setAttribute('data-rubellite-props', props);
        document.body.appendChild(scriptEl);

    }
}

/* It creates a new interactive element that can be used to update the DOM */
export class Reactible{
    /**
     * The constructor function takes in a value, an element, and a callback function. It then assigns the value to the
     * value property, assigns a random id to the id property, assigns the callback function to the callback property, and
     * assigns the element to the element property
     * @param value - The value of the element.
     * @param [element=span] - The element that will be created.
     * @param [callback] - A function that will be called when the user clicks on the notification.
     */
    constructor(value, element = 'span', callback = () => { }) {
        this.value = value;
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.callback = callback;
        this.element = element;
    }

    /**
     * It returns a string of HTML code in the Initialized element.
     * @returns The value of the element and the value of the id.
     */
    get(){
        return `<${this.element} class="rube-${this.id}">${this.value}</${this.element}>`;
    }
    /*
    * getValue() returns the current value of the element
    * a better way to do this would be to just call the value property, but this is a way to make it more flexible
    * */
    getValue(){
        return this.value;
    }
    // set the value
    set(newValue){
        this.value = newValue;
        let element = document.querySelector(`.rube-${this.id}`);
        element.innerText = this.value; // this.value is the new value
        this.callback();
    }
}


/**
 * It returns the value of a property from the `data-rubellite-props` attribute of the `#app` element
 * @param name - The name of the prop you want to get.
 * @returns The value of the data-rubellite-props attribute of the element with the id of app.
 */
export function Props(name){
    let props = document.querySelector('#app')
    props = props.getAttribute("data-rubellite-props");
    props = JSON.parse(props);
    if (name.indexOf(".") > -1){
        let values = name.split(".");
        let value = props;
        for (let i = 0; i < values.length; i++) {
            value = value[values[i]];
        }
        if (value === undefined){
            throw new Error(`The property ${name} does not exist in the data-rubellite-props`);
        }
        return value;
    }

    if (props[name] === undefined){
        throw new Error(`The property ${name} does not exist in the data-rubellite-props`);
    }

    return props[name];
}

export class Http{
    static setUrl(pageUri){
        let urlProps = Props('get');
        if (Object.keys(urlProps).length > 0){
            pageUri += "?";
            let length = Object.keys(urlProps).length;
            let index = 0;
            for(const prop in urlProps){
                pageUri += `${prop}=${urlProps[prop]}&`
                if (index === length--){
                    // remove the last &
                    pageUri = pageUri.slice(0, -1);
                }
                index++;
            }
        }
        window.history.pushState({}, "", `/${Props('config.name')}/` + pageUri);
    }
}
