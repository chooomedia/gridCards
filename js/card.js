/**
 * A card which can be flipped.
 */
class Card extends Widget {
    /**
     * Creates a new Card instance.
     * The card contains a 'domElement' which innerHTML can be changed either
     * to the 'front'- or 'back'-innerHTML value.
     * @param {DOMElement} domElement The card container DOMElement
     * @param {string} front The innerHTML for the front side of the card
     * @param {string} back The innerHTML for the back side of the card
     */
    constructor(cardOptions) {
        super(null);
        this.cardOptions = cardOptions;
        this.cardWidth = this.cardOptions.cardWidth;
        if (this.cardOptions) {
            this.front = this.cardOptions.front;
            this.back = this.cardOptions.back;

            this.icon = this.cardOptions.icon;        
        }

        if (typeof this.icon === "string") {
            let cardIconType = this.setCardTypeIcon(this.icon);
            this.domElement.appendChild(cardIconType);
        }

        this.domElement.className = "gridCardElement";
        this.domElement.style.width = "100%";
        this.domElement.style.minHeight = "164px";
        this.domElement.style.gridTemplateColumns = "1fr 1fr";
        this.domElement.style.transition = "all .3s ease-in-out";
        this.domElement.style.backgroundPosition = "center center";
        this.domElement.style.backgroundSize = "cover";

        if (typeof this.front === "string") {
            let frontElement = document.createElement("p");
            frontElement.innerHTML = this.front;
            this.front = frontElement;
            this.domElement.appendChild(this.front);
        } else if (this.front) {
            this.domElement.appendChild(this.front);
        }

        if (typeof this.back === "string") {
            let backElement = document.createElement("p");
            backElement.innerHTML = this.back;
            this.back = backElement;
            this.domElement.appendChild(this.back);
        } else if (this.back) {
            this.domElement.appendChild(this.back);
        } else if (typeof this.back === "undefined") {
            this.back = this.front;
        }

        if (typeof this.cardHeight === "string") {
            this.domElement.style.height = this.cardHeight;
        } else if (this.cardHeight) {
            this.domElement.style.height = this.domElement.style.offsetHeight;
        }

        this.isFlipped = false; // When 'true', the 'back' is shown.
        this.flippingTimeout = null;
    }

    setCardTypeIcon(iconType) {
        let cardIconType = document.createElement("i");
        cardIconType.style.position = "absolute";
        cardIconType.style.color = "#FFF";
        cardIconType.style.bottom = "4px";
        cardIconType.style.right = "4px";
        cardIconType.style.zIndex = "999";
        cardIconType.style.width = "32px";
        cardIconType.style.height = "32px";
        cardIconType.style.transition = "transform .4s;";
        cardIconType.style.lineHeight = "32px";
        cardIconType.style.display = "inline-grid";
        cardIconType.style.textAlign = "center";
        cardIconType.style.textShadow = "0px 0px 8px rgba(76, 76, 76, 0.7)";

        cardIconType.className = "fas fa-" + iconType;
        return cardIconType;
    }

    onMouseEnter() {
        if (this.isFlipped) {
            return;
        }
        this.isFlipped = true;
        if (this.flippingTimeout) {
            clearTimeout(this.flippingTimeout);
            this.flippingTimeout = null;
        }
        this.show();
    }

    onMouseLeave() {
        if (!this.isFlipped || this.flippingTimeout || this.playing) {
            return;
        }
        this.flippingTimeout = setTimeout(() => {
            this.isFlipped = false;
            this.flippingTimeout = null;
            this.domElement.style.transition = "all 1s";
            this.domElement.style.filter = "blur(0px)";
            this.domElement.style.transform = "skewX(-0.055turn)";
            this.show();
        }, 300);
    }

    /**
     * Sets the 'innerHTML' property of the 'domElement' to the innerHTML for the user-facing side.
     */
    show() {
        if (this.isFlipped) {
            this.domElement.style.transform = "rotateY(180deg) skewX(0.02turn)";
            this.front.style.display = "none";
            this.back.style.display = "inline-grid";
            this.back.style.gridRowGap = "4px";
            this.back.style.gridTemplateColumns = "1fr 1fr";
            this.back.style.transform = "rotateY(-180deg)";
            // Took all vimeo-Iframes and manipulate it for optimal inline-view in card
            Array.from(document.getElementsByTagName("iframe")).forEach(function(element) {
                element.style.transform = "rotateY(180deg) scaleX(1.16)";            
            });
        } else {
            this.domElement.style.transform = "rotateY(0) skewX(-0.02turn)";
            this.front.style.display = "grid";
            this.back.style.display = "none";
        }

        if (this.cardOptions && this.cardOptions.itemBackgr) {
            if (typeof this.cardOptions.itemBackgr === "function") {
                this.domElement.style.background = this.cardOptions.itemBackgr(this);
                this.domElement.style.backgroundSize = "cover";
            } else if (typeof this.cardOptions.itemBackgr === "string") {
                this.domElement.style.background = this.cardOptions.itemBackgr;
            }
        }
    }
}