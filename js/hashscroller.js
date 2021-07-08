function pageHasHash() {

    if (!window.location.hash) {
        return false;
    } else {
        // let urlHash = window.location.hash;
        let elem = $('#_' + window.location.hash.replace('#', ''));
        if (elem) {
            // $.scrollTo(elem.left, elem.top);
            $('html').animate({scrollLeft: $(elem).offset().left}, 400);
        }
        return true;
    }
}