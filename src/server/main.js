import { createServer } from "http";

const host = 'localhost';
const port = 1905;

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
                res.writeHead(200);
                res.end(body);
                console.log('end ' + body)
            });
            break
        case "/weights/load":
            res.writeHead(200);
            res.end('{loaded: true}');
            break
    };
}


const server = createServer(requestListener);
const http = server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

