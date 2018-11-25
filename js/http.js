/**
 * Requests the Couch-DB
 */
class Http {

    request(method, url, contentType, data) {
        let promise = new Promise((resolve, reject) => {

            let getData = new XMLHttpRequest();
            getData.onreadystatechange = function () {
                if (this.readyState != 4) {
                    return;
                }

                // Typical action to be performed when the document is ready:
                let data = JSON.parse(getData.responseText);
                resolve(data);
            };

            getData.onerror = function (e) {
                reject(e);
            };

            getData.open(method, url, true);

            if (contentType) {
                getData.setRequestHeader("content-type", contentType);
            }

            getData.send(data);
        });

        return promise;
    }

    get(url) {
        return this.request("GET", url);
    }

    post(url, data) {
        return this.request("POST", url, "application/json", JSON.stringify(data));
    }
}