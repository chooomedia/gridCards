class CardStack extends Widget {
    constructor(parentContainerId, options) {
        super(parentContainerId);
        this.domElement.className = "innerDialog";
        this.domElement.style.transition = "all 0.33s ease";
        this.domElement.style.height = "auto";
        this.domElement.style.display = "grid";
        this.domElement.style.gridTemplateRows = "repeat(9, 1fr)"; 
        this.domElement.style.gridGap = "6px";
        this.domElement.style.transformOrigin = "top";
        this.domElement.style.gridTemplateColumns = "repeat(auto-fill, minmax(240px, 1fr))";
        this.domElement.style.gridTemplateRows = "3fr";
        
        this.domElement.style.fontSize = "18px";

        this.options = options;

        if (this.options && this.options.columnCount) {
            this.columnCount = this.options.columnCount;
        } else {
            this.columnCount = 3;
        }

        this.cards = [];
        // Dieses DOM Element enthält später (nach Aufruf von 'addCard(card)') alle hinzugefügten Karten.        

        document.addEventListener('mousemove', (event) => {
            let elementAtMousePosition = document.elementFromPoint(event.x, event.y);
            if (!elementAtMousePosition) {
                return;
            }
            this.cards.forEach(card => {
                let current = elementAtMousePosition;
                while (current) {
                    if (current == card.domElement) {
                        card.onMouseEnter();
                        break;
                    }
                    if (current == this.domElement) {
                        current = null;
                        break;
                    }
                    current = current.parentElement;
                }
                if (!current) {
                    card.onMouseLeave();
                }
            });
        });
    }

    /**
     * Adds a new card to the stack and creates a 'div' element for it.
     * The created 'div' is then appended under the CardStack's 'containerDomElement'.
     * @param {Card} card The card definition (front- and back-html)
     */
    addCard(card) { 
        this.cards.push(card);
        this.domElement.appendChild(card.domElement);

        setTimeout(() => {
            if (this.options && this.options.itemBackgr) {
                if (typeof this.options.itemBackgr === "function") {
                    card.domElement.style.background = this.options.itemBackgr(card);
                } else if (typeof this.options.itemBackgr === "string") {
                    card.domElement.style.background = this.options.itemBackgr;
                }
            }

            if (this.options && this.options.itemHeight) {
                if (typeof this.options.itemHeight === "function") {
                    card.domElement.style.height = this.options.itemHeight(card);
                } else if (typeof this.options.itemHeight === "string") {
                    card.domElement.style.height = this.options.itemHeight;
                }
            }
            card.show();
        }, 0);
    }

    getCard(index) {
        return this.cards[index];
    }
}