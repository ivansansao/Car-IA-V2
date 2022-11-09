class Api {
    constructor() {
        this.url = 'http://localhost:1905';
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

        xhr.send(JSON.stringify(content));
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

        return this.syncFetch("/weights/load", body);

    }

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
