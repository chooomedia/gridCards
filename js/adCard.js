class AdCard extends Card {

    constructor(cardOptions) {
        super(cardOptions);

        this.adHost = cardOptions.host; // amazon
        this.partnerId = cardOptions.partner; // mucurm-21
        this.adId = cardOptions.adId; // f.E. B079QHMFWC

        if (typeof this.adHost === "string") {
            let cardIconType = this.setCardTypeIcon(this.adHost);
            this.domElement.appendChild(cardIconType);
        }

        if (typeof this.adHost === "string") {
            if (this.adHost.includes("amazon")) {
                this.front = this.createAmznImgEl(this.adId);
                this.domElement.appendChild(this.front);
                this.back = this.createShareBox(this.adId);
                // this.back.appendChild(this.createAmznIframe(this.adId));
                this.domElement.appendChild(this.back);

            } else if (this.adHost.includes("google")) {
                this.front = this.createGoglObjEl(this.adId);
                this.domElement.appendChild(this.front);
                this.back = "";
            }
        }
    }

    setCardTypeIcon(adHost) {
        let cardIconType = document.createElement("i");
        cardIconType.style.position = "absolute";
        cardIconType.style.color = "#0099CC";
        cardIconType.style.zIndex = "999";
        cardIconType.style.bottom = "4px";
        cardIconType.style.right = "4px";
        cardIconType.style.width = "32px";
        cardIconType.style.height = "32px";
        cardIconType.style.transition = "transform .4s;";
        cardIconType.style.lineHeight = "32px";
        cardIconType.style.display = "inline-grid";
        cardIconType.style.textAlign = "center";

        cardIconType.className = "fab fa-" + adHost;
        return cardIconType;
    }

    // Creates an affiliate linked element
    createAmznImgEl(adId) {
        let product = document.createElement("img");
        product.id = adId;
        product.style.width = "262px";
        product.style.height = "188px";
        product.style.backgroundImage = "url(./assets/images/gridAdCardLoader.gif), linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 100%)";
        product.style.filter = "contrast(1.1)";
        product.style.backgroundRepeat = "no-repeat, repeat";
        product.style.backgroundSize = "50%, cover";
        product.style.backgroundPosition = "center center, center center";
        product.style.padding = "18px 44px";
        product.style.border = "1px solid #0099CC";
        product.style.position = "relative";
        product.style.top = "0";
        product.style.left = "0";
        product.style.transform = "rotateY(0) scale(1)";
        product.src = "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=" + adId +
            "&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_HQ1080_&tag=" + this.partnerId;

        product.link = "https://www.amazon.de/gp/product/" + adId +
            "/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=" + adId +
            "&linkCode=as2&tag=" + this.partnerId;
        product.onclick = () => {
            window.open(product.link, '_blank');
        };
        return product;
    }

    // Creates a object element
    createShareBox(adId) {
        let shareEl = document.createElement("div");
        shareEl.style.display = "inline-grid";
        shareEl.style.height = "0px";
        shareEl.style.lineHeight = "265px";
        shareEl.style.width = "96%";
        shareEl.style.padding = "0 7px";
        shareEl.style.textAlign = "center";
        shareEl.innerHTML =
            "<a class='amaznLink' style='color:#f5f5f5;display:inline;top:1em;' href='http://chooo.de#" + adId + "'>" +
            "<i class='fab fa-3x fa-amazon'></i></a>" +
            "<a class='shareLink' style='color:#f5f5f5;display:inline;top:1em;' href='http://chooo.de#" + adId + "'>" +
            "<i class='fas fa-3x fa-share-alt'></i></a>";
        shareEl.style.transform = "rotateY(0deg) scaleX(.94) !important";
        shareEl.style.border = "0px";
        shareEl.style.background = "rgba(0, 153, 204, .85)";
        shareEl.style.float = "right";
        shareEl.style.top = "0";
        shareEl.style.left = "0";
        shareEl.style.position = "relative";
        let shortProduct = "http://chooo.de#" + adId;
        let product = "https://www.amazon.de/gp/product/" + adId +
            "/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=" + adId +
            "&linkCode=as2&tag=" + this.partnerId;

        shareEl.getElementsByClassName("amaznLink")[0].onclick = () => {
            window.open(product, '_blank');
        };
        shareEl.getElementsByClassName("shareLink")[0].onclick = () => {
            const el = document.createElement('textarea');
            el.value = shortProduct;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            window.alert("Link copied to clipboard");
            document.body.removeChild(el);
            navigator.share({
                    url: shortProduct,
                    title: 'gridCards share',
                    text: 'Do you want to donate me this cool stuff?',
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        };

        setTimeout(function () {
            shareEl.style.height = "226px";
        }, 800);
        return shareEl;
    }

    // Creates a object element
    createAmznIframe(adId) {
        let iframe = document.createElement("iframe");
        let shareBox = this.createShareBox(adId);
        iframe.style.height = "240px";
        iframe.style.width = "100%";
        iframe.style.transform = "rotateY(180deg) scaleX(.94) !important";
        iframe.style.border = "0px";
        iframe.style.right = "-70%";
        iframe.style.top = "-7px";
        iframe.style.position = "absolute";
        iframe.style.display = "inline-grid";
        iframe.src = "//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=DE&source=ac&ref=tf_til&ad_type=product_link&tracking_id=" + this.partnerId + "&marketplace=amazon&region=DE&placement=" + adId + "&asins=" + adId + "&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff";
        iframe.onclick = () => {
            window.open(product.link, '_blank');
        };
        return iframe;
    }
}