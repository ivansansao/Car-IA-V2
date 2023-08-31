class Api {
    constructor() {
        const isCloud = window.location.origin.includes('https')
        this.url = isCloud ? 'http://187.23.108.203:1905' : 'http://localhost:1905'
        console.log("Server on: ", this.url)
    }

    fetch(page, content) {
        return fetch(this.url + page, {
            method: 'POST',
            body: JSON.stringify(content),
        });
    }
    syncFetch(page, content) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.url + page, false); // false means sync.
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // xhr.responseText;
                } else {
                    console.error(xhr.statusText);

                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };

        try {
            xhr.send(JSON.stringify(content));
        } catch (error) {
            errosOnScreen = error.message
            return '';
        }
        return xhr.responseText;

    }
    saveWeights(name, weights) {

        const body = {
            name,
            weights
        }

        this.fetch("/weights/save", body).then(function (response) {
            return response.text();
        }).then(function (data) {
        }).catch(function (error) {
            console.log(error);
        });
    }
    loadWeights(name) {

        const body = { name }
        const lastWeight = this.syncFetch("/weights/load", body);

        return lastWeight

    }
    loadAllWeigths(name) {

        const body = { name }
        const allWights = this.syncFetch("/weights/loadall", body);

        return allWights
    }

}
