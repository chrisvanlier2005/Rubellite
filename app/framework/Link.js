/**
 * It returns a string of HTML that contains a link with a random id and a data attribute
 * @param props - An object containing the properties of the component.
 * @returns A string of HTML
 */
export let Link = (props) => {
    let randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `<a href="${props.href}" data-location="${randomId}" data-rubelite>${props.text}</a>`;
}

