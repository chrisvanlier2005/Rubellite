
export class VirtualDom {
    static render(rootId, data) {
        let rootElement = document.getElementById(rootId);
        console.log(data)
        // render root element
        rootElement.innerHTML = '';
        rootElement.appendChild(VirtualDom.elementRender(data));
        VirtualDom.LinkInit();
    }
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

    static setPageTitle(title) {
        document.title = title;
    }
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


export class LinkHandler {
    constructor(props) {
        this.props = props;
    }
    async handle(event) {
        event.preventDefault();
        let location = event.target.href;
        location = location.replace('localhost', '');
        location = location.replace('http://', '');
        location = location.replace('https://', '');
        location = "Rubellite" + location;
        let rubelite = event.target.dataset.rubelite;
        let response = await fetch(location);
        let html = await response.text();
        let script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
        let src = script[0].match(/src="([^"]*)"/i);
        src = src[1]
        src = src + "?_=" + new Date().getTime();
        let scriptElement = document.querySelector('script');
        scriptElement.remove();
        let scriptEl = document.createElement('script');
        console.log(src);
        scriptEl.src = src;
        scriptEl.type = 'module';
        document.body.appendChild(scriptEl);
    }
}
export default {VirtualDom, Compiler, LinkHandler};
