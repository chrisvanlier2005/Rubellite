class RubePopup{
    constructor() {
        this.containerElement = document.createElement('div');
        this.containerElement.id = 'rubepopup-' + Math.random().toString(36).substring(2, 15);
        this.containerElement.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999;';
    }
    show(html) {
        let oldContainer = document.querySelector(this.containerElement.id);
        if (oldContainer) {
            oldContainer.remove();
        }
        let popupContent = document.createElement('div');
        popupContent.innerHTML = html;
        popupContent.style = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 80%; background: white; border-radius: 5px;';
        this.containerElement.appendChild(popupContent);


        let closeBtn = document.createElement('button');
        closeBtn.innerText = 'Close';
        closeBtn.style = 'position: absolute; top: 10px; right: 10px;';
        closeBtn.addEventListener('click', () => {
            this.hide();
        });

        popupContent.appendChild(closeBtn);
        document.body.appendChild(this.containerElement);


    }
    hide(){
        this.containerElement.remove();
    }
}
export default RubePopup;