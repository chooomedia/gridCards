class VideoCard extends Card {

    constructor(cardOptions) {
        super(cardOptions);

        if (!cardOptions || !cardOptions.videoUrl) {
            throw "cardOptions not supplied for VideoCard!";
        }
        this.video = cardOptions.videoUrl;
        this.videoHost = cardOptions.videoHost;

        if (typeof this.videoHost === "string") {
            let cardIconType = this.setCardTypeIcon(this.videoHost);
            this.domElement.appendChild(cardIconType);
        }

        if (typeof this.video === "string") {
            if (this.video.includes("youtube")) {
                let videoId = this.getVideoId(this.video);
                this.front = this.createYTVideoImgEl(videoId);
                this.domElement.appendChild(this.front);
                this.back = this.createObjectVideoEl(videoId);
                this.domElement.appendChild(this.back);
            } else if (this.video.includes("vimeo")) {
                this.front = this.createVimeoVideoImgEl(this.video);
                this.domElement.appendChild(this.front);
                this.back = this.createIframeVideoEl(this.video);
                this.domElement.appendChild(this.back);
            }
        }

    }

    setCardTypeIcon(videoHost) {
        let cardIconType = document.createElement("i");
        cardIconType.style.position = "absolute";
        cardIconType.style.color = "#FFF";
        cardIconType.style.bottom = "0";
        cardIconType.style.right = "0";
        cardIconType.style.width = "32px";
        cardIconType.style.height = "32px";
        cardIconType.style.transition = "transform .8s;";
        cardIconType.style.lineHeight = "32px";
        cardIconType.style.display = "inline-grid";
        cardIconType.style.textAlign = "center";
        cardIconType.style.textShadow = "0px 0px 8px rgba(76, 76, 76, 0.7)";

        cardIconType.className = "fab fa-" + videoHost;
        return cardIconType;
    }

    createVimeoVideoImgEl(videoId) {
        let divEl = document.createElement("div");
        divEl.style.height = "178px";
        divEl.style.width = "100%";
        let innerContent = document.createElement("p");
        let id = videoId.substring(18);
        let vimeoUrl = "https://www.vimeo.com/api/v2/video/" + id + ".json";

        let getVimeoJson = new XMLHttpRequest();
        getVimeoJson.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    this.data = JSON.parse(getVimeoJson.responseText);
                    divEl.style.background = "url(" + this.data[0].thumbnail_large + ") no-repeat";
                    divEl.style.backgroundSize = "contain";
                    innerContent.innerHTML = this.data[0].title;
                }
            },
            getVimeoJson.open("GET", vimeoUrl, true);
        getVimeoJson.send();
        divEl.appendChild(innerContent);
        return divEl;
    }

    getVideoId(url) {
        let ID = "";
        url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else {
            ID = url;
        }
        return ID;
    }

    // Creates a Image via Api-Service from insertet youtube-video-link
    createYTVideoImgEl(videoId) {
        let imgEl = document.createElement("img");
        imgEl.setAttribute("src", "http://i.ytimg.com/vi/" + videoId + "/mqdefault.jpg");
        imgEl.className = "thumb";
        imgEl.style.width = "100%";
        imgEl.style.height = "180px";
        imgEl.style.border = "0";
        return imgEl;
    }

    // Creates a object element
    createObjectVideoEl(videoId) {
        let video = document.createElement("object");
        video.style.width = "100%";
        video.style.height = "180px";
        video.style.transform = "rotateY(180deg)";
        video.style.border = "0";
        video.data = "http://www.youtube.com/embed/" + videoId;
        return video;
    }

    createIframeVideoEl(videoId) {
        let id = videoId.substring(18);
        let video = document.createElement("iframe");
        video.src = "https://player.vimeo.com/video/" + id;
        video.frameborder = "0";
        video.allow = "autoplay";
        video.width = "796";
        video.height = "178";
        video.style.transform = "rotateY(180deg)";
        video.style.opacity = "1";
        video.style.border = "unset";
        return video;
    }
}