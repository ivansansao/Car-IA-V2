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

    saveWeights(name, weights) {

        const body = {
            name,
            weights
        }

        this.fetch("/weights/save", body).then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    loadWeights(name) {
        this.fetch("/weights/load", name).then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.log(error);
        });
    }

}