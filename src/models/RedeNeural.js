/*
    await cars[i].ia.model.save('localstorage://carro-ivan')
    await cars[i].ia.model.save('indexeddb://caria-melhor')

    cars[10].ia.model = await tf.loadLayersModel('indexeddb://caria-melhor')

 */

class RedeNeural {

    constructor({ f1, f2 } = {}) {

        this.input_nodes = 13 + 9; // 22
        this.hidden_nodes = 8;
        this.output_nodes = 8;
        this.f1 = f1 || "linear"; // this.getAnyActivation();
        this.f2 = f2 || "selu"; // this.getAnyActivation();
        this.mutated = 0; // Number of genes mutateds, zero is not mutated
        this.mutatedNeurons = '';

        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ units: this.hidden_nodes, inputShape: [this.input_nodes], activation: this.f1 }));
        // this.model.add(tf.layers.dense({units: 5, inputShape: [5], activation: 'relu'}));        
        this.model.add(tf.layers.dense({ units: this.output_nodes, activation: this.f2 }));

        // const input = tf.input({ shape: [input_nodes] });
        // const denseLayer1 = tf.layers.dense({ units: hidden_nodes, activation: this.f1 }); // def. sigmoid
        // const denseLayer2 = tf.layers.dense({ units: output_nodes, activation: this.f2 }); // def. softmax
        // const output1 = denseLayer1.apply(input);
        // const output2 = denseLayer2.apply(output1);
        // this.model = tf.model({ inputs: input, outputs: [output1, output2] });

        // this.firstLayer = [];
        // this.secondLayer = [];
        // this.savedInputs = [];
        // this.savedOutputs = [];
        // this.selectedOutput = -1;
        // this.maiorValueHidden = -1;

    }

    getAnyActivation(choice) {

        const functions = ['elu', 'linear', 'relu', 'selu', 'sigmoid', 'softmax', 'softplus', 'softsign', 'tanh'];
        choice = choice || Number(random(0, functions.length - 1).toFixed(0));
        return functions[choice];
    }
    pensar(inputs = []) {


        return tf.tidy(() => {

            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();

            return outputs
        });
    }

    saveMaiorHidput(layer) {
        this.maiorValueHidden = -1;

        for (let i = 0; i < layer.length; i++) {
            if (layer[i] > this.maiorValueHidden) {
                this.maiorValueHidden = layer[i];
            }
        }

    }

    mutate_sequence(rate, maxMutations = 10) {

        tf.tidy(() => {

            const weights = this.model.getWeights();
            const mutatedWeights = [];
            let mutations = Number(random(0, maxMutations).toFixed(0));

            for (let i = 0; i < weights.length; i++) {

                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();

                for (let m = 0; m < mutations; m++) {

                    if (this.mutated < mutations) {

                        const j = pista.mutationCounter % 16;
                        const w = values[j];

                        values[j] = w + randomGaussian();
                        this.mutated++;
                        this.mutatedNeurons += j + ',';
                        pista.mutationCounter++;

                    }

                }

                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;

            }
            this.model.setWeights(mutatedWeights);

        });

    }
    mutate2(rate, maxMutations = 10) {

        tf.tidy(() => {

            const weights = this.model.getWeights();
            const mutatedWeights = [];
            let mutations = Number(random(0, maxMutations).toFixed(0));

            for (let i = 0; i < weights.length; i++) {

                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();

                for (let m = 0; m < mutations; m++) {

                    if (this.mutated < mutations) {

                        const j = Number(random(0, values.length).toFixed(0));
                        const w = values[j];

                        values[j] = w + randomGaussian();
                        this.mutated++;
                        this.mutatedNeurons += j + ',';

                    }


                }

                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;

            }
            this.model.setWeights(mutatedWeights);

        });

    }
    mutate_normal(rate, maxMutations = Infinity) {

        maxMutations = Infinity;

        tf.tidy(() => {

            // maxMutations = Number(random(1,4).toFixed(0));

            const weights = this.model.getWeights();
            const mutatedWeights = [];

            if (random(1) > 0.5) {

                for (let i = 0; i < weights.length; i++) {

                    let tensor = weights[i];
                    let shape = weights[i].shape;
                    let values = tensor.dataSync().slice();

                    for (let j = 0; j < values.length; j++) {
                        if (random(1) < rate) {
                            if (this.mutated < maxMutations) {
                                const w = values[j];
                                values[j] = w + randomGaussian();
                                // values[j] = w + random(-1,1);
                                this.mutated++;
                                if (this.mutatedNeurons != '') this.mutatedNeurons += ','
                                this.mutatedNeurons += `${i}.${j}`
                            }
                        }

                    }

                    let newTensor = tf.tensor(values, shape);
                    mutatedWeights[i] = newTensor;

                }

            } else {

                for (let i = weights.length - 1; i > -1; i--) {

                    let tensor = weights[i];
                    let shape = weights[i].shape;
                    let values = tensor.dataSync().slice();

                    for (let j = values.length - 1; j > -1; j--) {
                        if (random(1) < rate) {
                            if (this.mutated < maxMutations) {
                                const w = values[j];
                                values[j] = w + randomGaussian();
                                // values[j] = w + random(-1,1);
                                this.mutated++;
                                if (this.mutatedNeurons != '') this.mutatedNeurons += ','
                                this.mutatedNeurons += `${i}.${j}`
                            }
                        }

                    }

                    let newTensor = tf.tensor(values, shape);
                    mutatedWeights[i] = newTensor;

                }

            }
            this.model.setWeights(mutatedWeights);

        });

    }

    mutateNoRepeat(rate, maxMutations = Infinity) {

        for (let i = 0; i < 1; i++) {
            this.mutate(rate, maxMutations);
            if (this.mutated > 0) {
                const mn = this.mutatedNeurons;
                if (!globalMutations.includes(mn)) {
                    globalMutations.push(mn);
                    break;
                }
            }
        }

    }


    mutate(rate, maxMutations = Infinity) {

        tf.tidy(() => {

            // maxMutations = max(maxMutations, 1)

            // maxMutations = Number(random(1,4).toFixed(0));

            const weights = this.model.getWeights();
            const mutatedWeights = [];

            for (let i = 0; i < weights.length; i++) {

                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();

                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        if (this.mutated < maxMutations) {

                            const n = Number(random(0, values.length - 1).toFixed(0));
                            const w = values[n] + randomGaussian();
                            const uniqueChange = `(${i}.${n}.${w.toFixed(2)})`

                            if (!this.mutatedNeurons.includes(uniqueChange)) {
                                values[n] = w;
                                this.mutated++;
                                this.mutatedNeurons += uniqueChange
                            }

                        }
                    }

                }

                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;

            }

            this.model.setWeights(mutatedWeights);

        });

    }
    showWeights(toReturn) {

        return tf.tidy(() => {

            const weights = this.model.getWeights();
            let pesos = '';
            let shapes = '';

            for (let i = 0; i < weights.length; i++) {

                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();

                if (pesos) pesos += ';';
                if (shapes) shapes += ';';

                pesos += values;
                shapes += shape;

            }

            if (toReturn) {
                return pesos;
            } else {
                console.log(pesos);  // sValues for setWeightsFromString
                // console.log(shapes); // sShapes for setWeightsFromString
            }

        });

    }
    shape(toReturn) {

        return tf.tidy(() => {

            const weights = this.model.getWeights();
            let shapes = '';

            for (let i = 0; i < weights.length; i++) {

                let shape = weights[i].shape;

                if (shapes) shapes += ';';

                shapes += shape;

            }

            return shapes

        });

    }

    getCopiedWeights() {

        const weights = this.model.getWeights();
        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }
        return weightCopies;
    }

    setWeightsFromString(sValues, sShapes) {

        tf.tidy(() => {

            try {

                const aValues = sValues.split(';');
                const aShapes = sShapes.split(';');
                const loadedWeights = [];

                for (let i = 0; i < aValues.length; i++) {

                    const anValues = aValues[i].split(',').map((e) => { return Number(e) });
                    const newValues = new Float32Array(anValues);
                    const newShapes = aShapes[i].split(',').map((e) => { return Number(e) });

                    try {
                        loadedWeights[i] = tf.tensor(newValues, newShapes);
                    } catch (error) {
                        console.log('Erro ao carregar pesos!')
                    }

                }


                this.model.setWeights(loadedWeights);
            } catch (error) {
                // console.log(error)
            }

        });
    }
}
