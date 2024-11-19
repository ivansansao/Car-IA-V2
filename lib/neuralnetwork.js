let neuronId = 1

class NeuralNetwork {
    constructor({ inputs }) {
        this.inputs = inputs
        this.layers = []
        this.weights = []
        this.mutated = 0
        this.mutatedNeurons = ''
    }
    addLayer({ size, activationFunction }) {

        const layer = new Layer({ size, activationFunction })
        this.layers.push(layer)

    }
    compile() {

        // Inputs x 1s layer
        let weights = []
        for (let i = 0; i < this.inputs; i++) {
            const sub = []
            for (let j = 0; j < this.layers[0].neurons.length; j++) {
                sub.push(this.getRand())
            }
            weights.push(sub)
        }
        this.weights.push(weights)

        // Hidden layers
        for (let lay = 1; lay < this.layers.length; lay++) {

            weights = []
            for (let i = 0; i < this.layers[lay - 1].neurons.length; i++) {

                const sub = []
                for (let j = 0; j < this.layers[lay].neurons.length; j++) {
                    sub.push(this.getRand())
                }
                weights.push(sub)

            }
            this.weights.push(weights)

        }

    }
    think({ inputs }) {

        this.clearNeurons()

        // --- First layer --- 

        for (let i = 0; i < this.weights[0].length; i++) {
            // Scan pesos x input
            for (let j = 0; j < this.weights[0][i].length; j++) {
                const mult = inputs[i] * this.weights[0][i][j]
                this.layers[0].neurons[j].weightsSums.push(mult)
            }
        }

        // Active the neuron
        for (let i = 0; i < this.layers[0].neurons.length; i++) {
            this.layers[0].neurons[i].active()
        }


        // --- Hidden layers --- 

        // Layers
        for (let l = 1; l < this.layers.length; l++) {

            for (let i = 0; i < this.weights[l].length; i++) {
                // Scan pesos x input
                for (let j = 0; j < this.weights[l][i].length; j++) {
                    const mult = this.layers[l - 1].neurons[i].output * this.weights[l][i][j]
                    this.layers[l].neurons[j].weightsSums.push(mult)
                }
            }

            // Active the neuron
            for (let i = 0; i < this.layers[l].neurons.length; i++) {
                this.layers[l].neurons[i].active()
            }
        }

        return this.layers[this.layers.length - 1].neurons.map(e => e.output)

    }
    mutate({ many }) {

        for (let i = 0; i < many; i++) {

            const w = Number((Math.random() * (this.weights.length - 1)).toFixed(0))
            const row = Number((Math.random() * (this.weights[w].length - 1)).toFixed(0))
            const column = Number((Math.random() * (this.weights[w][row].length - 1)).toFixed(0))
            this.weights[w][row][column] = Number(this.weights[w][row][column]) + this.getRand()

            // Mutar bias            
            this.layers[w].neurons[column].bias += this.getRand()

            this.mutated++
            this.mutatedNeurons += `N${w}/${row}/${column}`

        }

    }
    clearNeurons() {


        for (let l = 0; l < this.layers.length; l++) {
            for (let n = 0; n < this.layers[l].neurons.length; n++) {
                this.layers[l].neurons[n].clear()
            }
        }

    }
    getRand() {
        return Math.random() - Math.random()
    }

    setWeights({ text }) {

        const imported = text.split(',')

        if (imported.length <= 0) {
            return
        }

        this.weights = []
        let w = 0

        // Inputs x 1s layer
        let weights = []
        for (let i = 0; i < this.inputs; i++) {
            const sub = []
            for (let j = 0; j < this.layers[0].neurons.length; j++) {
                sub.push(imported[w++])
            }
            weights.push(sub)
        }
        this.weights.push(weights)

        // Hidden layers
        for (let lay = 1; lay < this.layers.length; lay++) {

            weights = []
            for (let i = 0; i < this.layers[lay - 1].neurons.length; i++) {

                const sub = []
                for (let j = 0; j < this.layers[lay].neurons.length; j++) {
                    sub.push(imported[w++])
                }
                weights.push(sub)

            }
            this.weights.push(weights)

        }

    }
    version() {
        return '1.0.0.2'
    }
}

class Layer {

    constructor({ size, activationFunction }) {

        this.neurons = []

        for (let i = 0; i < size; i++) {
            this.neurons.push(new Neuron({ activationFunction }))
        }

    }

}

class Neuron {

    constructor({ activationFunction }) {
        this.neuronId = neuronId++
        this.weightsSums = []
        this.activationFunction = activationFunction
        this.output = null
        this.bias = 0 // Math.random() - Math.random()
    }
    active() {
        const rsSum = this.weightsSums.reduce((e, t) => e + t) + this.bias
        this.output = this.activationFunction(rsSum)
    }
    clear() {
        this.weightsSums = []
        this.output = null
    }

}