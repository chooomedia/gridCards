function createButton(text) {
    let addCardsButton = document.createElement("button");
    addCardsButton.innerHTML = text;
    addCardsButton.style.color = "#FFF";
    addCardsButton.style.margin = "5px 0px";
    return addCardsButton;
}

class CollapsibleContainer extends Widget {
    constructor(parentContainerId, options) {
        super(parentContainerId);
        this.options = options;
        if (this.options) {
            this.title = this.options.title;
            this.content = this.options.content;
        }

        let headerContainer = document.createElement("section");
        headerContainer.style.display = "grid";
        headerContainer.style.height = "64px";
        headerContainer.style.gridArea = "header";
        headerContainer.style.lineHeight = "64px";
        headerContainer.style.gridGap = "4px 6px";
        headerContainer.style.gridTemplateColumns = "2fr 1fr";
        
        this.domElement.appendChild(headerContainer);


        document.getElementsByTagName('body')[0].onscroll = function() {
            if (window.scrollY < 222) {
                headerContainer.style.position = "sticky";
                headerContainer.style.top = "0";
                headerContainer.style.zIndex = "999";
            }
        };

        
        headerContainer.style.gridGap = "4px 6px";

        if (typeof this.title === "string") {
            let titleElement = document.createElement("div");
            titleElement.innerHTML = this.title;
            this.title = titleElement;
            headerContainer.appendChild(this.title);
        } else if (this.title) {
            headerContainer.appendChild(this.title);
        }

        if (typeof this.content === "string") {
            let contentElement = document.createElement("div");
            contentElement.innerHTML = this.content;
            this.content = contentElement;
            this.domElement.appendChild(this.content);
        } else if (this.content) {
            this.domElement.appendChild(this.content);
        }

        let orgHeightVal = this.content.style.height;
        this.collapsed = false;

        let collapseButton = createButton("Toggle container");
        collapseButton.addEventListener('click', () => {
            this.collapsed = !this.collapsed;

            if (this.collapsed) {
                this.content.style.height = "0px";
                this.content.style.transform = "scaleY(0)";

            } else {
                this.content.style.height = orgHeightVal;
                this.content.style.transform = "scaleY(1)";
            }
        });

        collapseButton.classList.add("collapseButton");
        headerContainer.appendChild(collapseButton);
    }
}