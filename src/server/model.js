import fs from 'fs'
import { botSay } from './bot/telegram/Telegram.js';
import { exec } from 'child_process';

class Model {
    constructor() {
    }

    file(data) {
        return `./dat/${data.name}.dat`;
    }

    weightsSave(content) {

        const data = JSON.parse(content);
        const xData = data.weights + "\r\n";
        const w = JSON.parse(data.weights);
        fs.appendFileSync(this.file(data), xData);

        botSay(`Recorde na pista ${w.track}, G${w.generation} lap: ${w.lap} km: ${w.km}`);

        return '';

    }

    weightsLoad(content) {

        let weights = '';

        if (content) {

            const data = JSON.parse(content);
            const file = this.file(data);

            if (fs.existsSync(file)) {

                let content = fs.readFileSync(file, { encoding: 'utf8' });
                const linhas = content.toString().trim().split('\r\n');

                // Retorna a última linha do arquivo.
                for (let i = linhas.length - 1; i >= 0; i--) {
                    if (linhas[i].length > 0) {
                        weights = linhas[i];
                        break;
                    }
                }


            }

        }

        return weights;
    }
    weightsLoadAll(content) {

        const data = JSON.parse(content);
        const file = this.file(data);
        const weights = [];

        if (fs.existsSync(file)) {

            let content = fs.readFileSync(file, { encoding: 'utf8' });
            const linhas = content.toString().trim().split('\r\n');

            for (let i = 0; i < linhas.length; i++) {
                if (linhas[i].length > 0) {
                    weights.push(linhas[i]);
                }
            }


        }

        return JSON.stringify(weights);
    }

    getGpuTemperature(content, cb) {
        const gpuTempeturyCommand = 'nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader'
        exec(gpuTempeturyCommand, (error, stdout, stderr) => {
            if (error) {
                // console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                // console.log(`stderr: ${stderr}`);
                return;
            }
            // console.log(`stdout: ${stdout}`);
            cb(stdout)
            return
        })

    }
}

export { Model };