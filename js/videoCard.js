class VideoCard extends Card {

    constructor(cardOptions) {
        super(cardOptions);

        if (!cardOptions || !cardOptions.videoUrl) {
            throw "cardOptions not supplied for VideoCard!";
        }

        this.videoId = this.getVideoId(cardOptions.videoUrl);

        this.front = this.createVideoImgEl();
        this.domElement.appendChild(this.front);

        this.back = this.createObjectVideoEl(this.videoId);
        this.domElement.appendChild(this.back);
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

    createVideoImgEl() {
        let imgEl = document.createElement("img");
        imgEl.setAttribute("src", "http://i.ytimg.com/vi/" + this.videoId + "/mqdefault.jpg");
        imgEl.className = "thumb";
        imgEl.style.width = "100%";
        imgEl.style.height = "180px";
        imgEl.style.border = "0";
        return imgEl;
    }

    // http://www.youtube.com/v/GlIzuTQGgzs?version=3&amp;hl=en_US&amp;rel=0&amp;autohide=1&amp;autoplay=1" wmode="transparent" type="application/x-shockwave-flash

    createObjectVideoEl(videoId) {
        let video = document.createElement("object");
        video.style.width = "100%";
        video.style.height = "180px";
        video.style.transform = "rotateY(180deg)";
        video.style.border = "0";
        video.data = "http://www.youtube.com/embed/" + videoId; 
        return video;
    }
}