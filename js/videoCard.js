class VideoCard extends Card {

    constructor(cardOptions) {
        super(cardOptions);
        
        if (!cardOptions || !cardOptions.videoUrl)  {
            throw "cardOptions not supplied for VideoCard!";
        }

        this.videoId = this.getVideoId(cardOptions.videoUrl);

        this.front = this.createVideoImgEl();
        this.domElement.appendChild(this.front);

        this.back = this.createVideoIframeEl();
        this.domElement.appendChild(this.back);
    }

    getVideoId(url){
        let ID = "";
        url = url.replace(/(>|<)/gi,"").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if(url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
            }
            else {
                ID = url;
            }
        return ID;
    }

    createVideoImgEl() {
        let imgEl = document.createElement("img");
            imgEl.setAttribute("src", "http://i.ytimg.com/vi/" + this.videoId + "/mqdefault.jpg");
            imgEl.className = "thumb";
            imgEl.style.width = "100%";
            imgEl.style.height = "180px";
            imgEl.style.border = "0";
        return imgEl;
    }

    createVideoIframeEl() {
        let iFrame = document.createElement("iframe");
            iFrame.style.width = "100%";
            iFrame.style.height = "180px";
            iFrame.style.transform = "rotateY(180deg)";
            iFrame.style.border = "0";
            iFrame.setAttribute("src", "https://www.youtube.com/embed/" +
            this.videoId + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");
        return iFrame;
    }
}