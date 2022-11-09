import fs from 'fs'

class Model {
    constructor() {
    }

    file(data) {
        return `./dat/${data.name}.dat`;
    }

    weightsSave(body) {
        const data = JSON.parse(body);
        const xData = data.weights + "\r\n";

        fs.appendFileSync(this.file(data), xData);

        return this.weightsLoad(body);
    }

    weightsLoad(body) {

        const data = JSON.parse(body);
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