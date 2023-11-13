let neuronId = 1

class NeuralNetwork {
    constructor({ inputs, outputs }) {
        this.inputs = inputs
        this.outputs = outputs
        this.layers = []
        this.weights = []
    }
    addLayer({ size, activationFunction }) {

        const layer = new Layer({ size, activationFunction })
        this.layers.push(layer)

    }
    compile() {
        let weight = 1
        // console.log('Entradas: ', this.inputs)
        // console.log('Camadas: ', this.layers)
        // console.log('Saídas: ', this.outputs)

        // Inputs x 1s layer
        let weights = []
        for (let i = 0; i < this.inputs; i++) {
            const sub = []
            for (let j = 0; j < this.layers[0].value.length; j++) {
                // sub.push(`${weight++}`)
                sub.push(this.getRand())
            }
            weights.push(sub)
        }
        this.weights.push(weights)

        // Hidden layers
        for (let lay = 1; lay < this.layers.length; lay++) {

            weight = 1
            weights = []
            for (let i = 0; i < this.layers[lay - 1].value.length; i++) {

                const sub = []
                for (let j = 0; j < this.layers[lay].value.length; j++) {
                    // sub.push(`${weight++}`)
                    sub.push(this.getRand())
                }
                weights.push(sub)
            }
            this.weights.push(weights)

        }

        // // Last layer
        // weight = 1
        // weights = []
        // for (let i = 0; i < this.layers[this.layers.length - 1].value.length; i++) {
        //     const sub = []
        //     for (let j = 0; j < this.outputs; j++) {
        //         // sub.push(`${weight++}`)
        //         sub.push(this.getRand())
        //     }
        //     weights.push(sub)
        // }
        // this.weights.push(weights)
    }
    think({ inputs }) {
        // console.log('Thinking...')

        const lastLayer = this.layers.length - 1

        // console.log('Primeira camada')
        for (let i = 0; i < this.weights[0].length; i++) {
            // console.log('pesos: ', inputs[i], this.weights[0][i])
            // Scan pesos x input
            let sums = 0
            for (let j = 0; j < this.weights[0][i].length; j++) {
                const mult = inputs[i] * this.weights[0][i][j]
                sums += mult
                // console.log(inputs[i], ' x ', this.weights[0][i][j], ' = ', mult)

                this.layers[0].value[j].weightsSums.push(mult)
                // // console.log('neu: ', this.layers[0].value[j])

            }
        }

        // Run Neuron
        for (let i = 0; i < this.layers[0].value.length; i++) {
            this.layers[0].value[i].active()
        }


        // console.log('--- Hidden camada --- ')

        // Layers
        for (let l = 1; l < this.layers.length; l++) {

            // console.log("ANTES: ", this.layers[l].value)

            // // console.log('pesos: ', this.layers[l])
            // console.log('Camada ', l)
            for (let i = 0; i < this.weights[l].length; i++) {
                // console.log('pesos: ', this.layers[l - 1].value[i].output, this.weights[l][i])
                // Scan pesos x input
                for (let j = 0; j < this.weights[l][i].length; j++) {
                    const mult = this.layers[l - 1].value[i].output * this.weights[l][i][j]
                    // console.log(this.layers[l - 1].value[i].output, ' x ', this.weights[l][i][j], ' = ', mult, ' to neuron id: ', this.layers[l].value[j].neuronId)

                    this.layers[l].value[j].weightsSums.push(mult)
                    // // console.log('neu: ', this.layers[0].value[j])

                }
            }

            // console.log("DEPOIS: ", this.layers[l].value)

            // Run Neuron
            for (let i = 0; i < this.layers[l].value.length; i++) {
                this.layers[l].value[i].active()
            }
        }

        // console.log('End Hidden camada')

    }
    mutate({ many }) {

        for (let i = 0; i < many; i++) {

            const w = Number((Math.random() * (this.weights.length - 1)).toFixed(0))
            const row = Number((Math.random() * (this.weights[w].length - 1)).toFixed(0))
            const column = Number((Math.random() * (this.weights[w][row].length - 1)).toFixed(0))
            this.weights[w][row][column] = this.weights[w][row][column] + this.getRand()
        }

    }
    getRand() {
        return Number((Math.random() - Math.random()).toFixed(2))
    }
}

class Layer {
    constructor({ size, activationFunction }) {

        this.value = []

        for (let i = 0; i < size; i++) {
            this.value.push(new Neuron({ activationFunction }))
        }

    }
}

class Neuron {
    constructor({ activationFunction }) {

        this.neuronId = neuronId++
        this.weightsSums = []
        this.activationFunction = activationFunction
        this.output = 0
    }
    active() {
        const rsSum = this.weightsSums.reduce((e, t) => e + t)
        this.output = this.activationFunction(rsSum)
        // this.output = rsSum
        // console.log(' sum id: ', this.neuronId, rsSum, 'out ', this.output, ' ', this.weightsSums)

    }

}