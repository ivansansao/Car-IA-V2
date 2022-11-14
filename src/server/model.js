import fs from 'fs'
import { botSay } from './bot/telegram/Telegram.js';

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

        botSay(`Recorde na pista ${w.track}, lap: ${w.lap} km: ${w.km}`);

        return '';

    }

    weightsLoad(content) {

        const data = JSON.parse(content);
        const file = this.file(data);
        let weights = '';

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

        return weights;
    }
}

export { Model };