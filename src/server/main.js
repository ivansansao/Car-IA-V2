import { createServer } from "http";
import { Model } from "./model.js"

const host = 'localhost';
const port = 1905;
const model = new Model();

const requestListener = function (req, res) {

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    let body = '';
    req.on('data', chunk => body += chunk);

    switch (req.url) {
        case "/weights/save":
            req.on('end', function () {
                const ret = model.weightsSave(body);
                res.writeHead(200);
                res.end(ret);
            });
            break
        case "/weights/load":
            req.on('end', function () {
                const ret = model.weightsLoad(body);
                res.writeHead(200);
                res.end(ret);
            });
            break
    };
}

const server = createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

