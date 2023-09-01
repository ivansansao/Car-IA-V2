import { createServer } from "http";
import https from "https";
import { botSay } from "./bot/telegram/Telegram.js";
import { Model } from "./model.js";
import * as dotenv from 'dotenv';
import fs from 'fs'
dotenv.config();

const host = process.env.SERVER_HOST || "0.0.0.0";
const port = process.env.SERVER_PORT || "1905";
const model = new Model();

botSay('Olá, seu servidor CARIA está no ar!');

const requestListener = function (req, res) {

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    let content = '';
    req.on('data', chunk => content += chunk);

    // console.log(req.headers.host, req.url)

    switch (req.url) {
        case "/weights/save":
            req.on('end', function () {
                const ret = model.weightsSave(content);
                res.writeHead(200);
                res.end(ret);
            });
            break
        case "/weights/load":
            req.on('end', function () {


                const ret = model.weightsLoad(content);
                res.writeHead(200);
                res.end(ret);
            });
            break
        case "/weights/loadall":
            req.on('end', function () {
                const ret = model.weightsLoadAll(content);
                res.writeHead(200);
                res.end(ret);
            });
            break
        case "/getgputemperature":
            req.on('end', function () {
                model.getGpuTemperature(content, (temp) => {

                    res.writeHead(200);
                    res.end(temp);
                });
            });
            break
    };
}

const server = createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// const options = {
//     key: fs.readFileSync('cert1.key'),
//     cert: fs.readFileSync('cert1.crt')
// };

// https.createServer(options, requestListener).listen(port, host, () => {
//     console.log(`Server is running on https://${host}:${port}`);
// });