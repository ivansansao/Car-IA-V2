class Genetic {

    constructor() {
        this.gotCloserBest = 0;
        this.recordCloser = 0;
        this.quantidade = 4;
        this.shapes = '';
        this.melhor = null;
        this.melhorCorrente = null;
        this.melhores = [];
        this.pesos = [];
        this.currentSons = [];
        this.shapes = new RedeNeural({}).shape();
        this.id = this.makeId()

        this.loadData()

    }

    loadData() {
        this.pesos = [];
        this.pesos.push({});
        for (let i = 1; i <= 6; i++) {
            this.pesos.push(this.loadWeights(i));
        }
    }

    makeId() {
        const id = `${createName()}-${rankingMode}`
        this.id = id
        return id
    }
    setRankingMode(newValue) {
        rankingMode = newValue
        this.makeId()
    }

    getData() {
        const pesos = this.pesos[pista.selectedPista];

        if (this.melhor) {
            if (nGeracao > 0) {
                if (!pesos.f1) pesos.f1 = this.melhor.ia.f1
                if (!pesos.f2) pesos.f2 = this.melhor.ia.f2
            }
        }

        return pesos
    }

    getFirstWeights() {
        console.log('First generation!')

        zerarFrota()

        this.melhores = []
        this.loadData()

        const data = this.getData()

        if ('localNascimentoX' in data) {
            pista.localNascimento = createVector(data.localNascimentoX, data.localNascimentoY)
        }

        if ('anguloNascimento' in data) {
            pista.anguloNascimento = radians(data.anguloNascimento)
        }

        distNormalized = data.distNormalized ?? false

        let child = new Car({ ...data, elitism: true, marca: 'X' });
        let pesos = this.pesos[pista.selectedPista].weights;

        if (pesos.length > 0) {
            if (world.startWeightSaved) {
                child.ia.setWeightsFromString(pesos, this.shapes);
            }
        }
        pista.addCar(child, 'Primeira carga');
        this.melhores.push(child);
        this.melhor = child;


    }

    nextGeneration() {

        const lastRoundBetter = this.getBetterCar()
        const fileCar = this.getFileCar()

        if (!this.melhor || fileCar.isBetterThan(lastRoundBetter)) {

            this.getFirstWeights();
            if (addCarFromTracks) {
                this.addCarFromTracks(this.getBetterCar().ia.showWeights(true))
            }
            return

        }

        const ancestral = this.melhor.ia.showWeights(true);

        this.melhores = [];
        this.classifyCars();
        this.melhor = this.getBetterCar();
        this.gotCloserBest = this.getGotCloserBest();
        const weightCopies = this.melhor.ia.getCopiedWeights();

        /**
         * Add wifes to betters list
         */

        const wifes = this.getWifesFromFile(pista.selectedPista)
        wifes.map((wife) => {
            const car = this.newCarFromStringWeight(wife.weights, { ...this.getData(), marca: 'w' })
            this.addCarToBetters(car)
        })

        /**
         * Add first car to betters list
         */

        this.addCarToBetters(this.melhor);

        /**
         * Add firsts to betters list
         */

        // for (const car of this.getFirsts(this.melhor)) {
        //     this.addCarToBetters(car);
        // }

        /**
         * Create sons doing reprodutive process.
         */

        const sons = [];
        for (let i = 0; i < this.melhores.length - 1; i++) {
            const son = this.makeSon(ancestral, this.melhores, i + 2)
            if (son) sons.push(son);
        }
        for (let i = 0; i < 7; i++) {
            const son = this.makeSon(ancestral, cars, i + 2)
            if (son) sons.push(son);
        }

        if (this.gotCloserBest > this.recordCloser) {
            this.recordCloser = this.gotCloserBest;
        }

        this.addCarToBetters(this.makeSon(ancestral, this.melhores));

        // Add created sons

        console.log(`G${addZero(nGeracao)} (${getHourMin()}) km: ${this.melhor.lap} - ${this.melhor.km} M: ${this.melhor.marca} R: ${this.melhor.ranhurasColetadas.length} ID: ${this.melhor.id} CARS: ${cars.length} Perto: ${addZero(this.gotCloserBest)} ${(this.gotCloserBest / cars.length * 100).toFixed(0)}% Muts: ${this.melhor.ia.mutated} NM: ${this.melhor.ia.mutatedNeurons}`);

        if (this.brokeRecord({ melhor: this.melhor })) {

            pista.recordKm = this.melhor.km;
            pista.recordLap = this.melhor.lap;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;

            if (nGeracao > 0) {
                if (this.isBetterThanSaved(this.melhor)) {
                    this.saveWeights(this.melhor);
                    foo.speak(`${pista.recordKm.toFixed(0)}`);
                    this.melhor.ia.showWeights();
                }
            }

        }

        evolucao.push(this.melhor);

        /* 
        * Clear
        */

        zerarFrota();
        pista.make();

        /* 
        * Add elitism
        */

        if (elitism) {
            let child = new Car({ ...this.getData(), elitism: true, marca: 'c', parent: this.melhor.marca });
            child.ia.model.setWeights(weightCopies);
            pista.addCar(child, 'Elitismo');
        }

        /**
         * 
         */

        nGeracao++;
        hue = 0;

        for (const son of sons) {

            let mutated = new Car({ ...this.getData(), marca: 'sm', parent: son.marca });
            mutated.ia.model.setWeights(son.ia.getCopiedWeights());
            mutated.mutate(Number(random(0.01, 0.015).toFixed(15)), 6);

            pista.addCar(son, 'Filho sem mutação');
            pista.addCar(mutated, 'Filho com mutação');
        }

        /**
         * Add cars reproducing ancestral with better from each track.  
         */
        if (addCarFromTracks) this.addCarFromTracks(ancestral)

        /**+
         * 
         * Add many cars
         * 
         */

        // for (let i = 0; i < 100; i++) {
        //     addMoreCar()
        // }

        /**
        * End
        */

    }

    addCarFromTracks(ancestral) {
        this.addCarFromTrackMixed(ancestral)
        this.addCarFromTrackExact()
        this.addCarFromTrackMutted()
    }

    addCarFromTrackMixed(ancestral) {
        let ti = 1
        for (const weightTrack of this.pesos) {
            if (weightTrack.weights) {
                let childTrack = new Car({ ...this.getData() });
                const sonWeight = this.reproduceMixing(ancestral, weightTrack.weights)
                childTrack.ia.setWeightsFromString(sonWeight, this.shapes);
                childTrack.marca = 'Tx'
                pista.addCar(childTrack, 'Mixed another track with this better ' + childTrack.marca);
            }
            ti++
        }
    }
    addCarFromTrackExact() {
        let ti = 1
        for (const weightTrack of this.pesos) {
            if (weightTrack.weights) {
                let childTrack = new Car({ ...this.getData() });
                childTrack.ia.setWeightsFromString(weightTrack.weights, this.shapes);
                childTrack.marca = 'To'
                pista.addCar(childTrack, 'Car from another track ' + childTrack.marca);
            }
            ti++
        }
    }
    addCarFromTrackMutted() {
        let ti = 1
        for (const weightTrack of this.pesos) {
            if (weightTrack.weights) {
                let childTrack = new Car({ ...this.getData() });
                childTrack.ia.setWeightsFromString(weightTrack.weights, this.shapes);
                childTrack.mutate(Number(random(0.01, 0.015).toFixed(15)), 6);
                childTrack.marca = 'Tm'
                pista.addCar(childTrack, 'Mutted car from another track ' + childTrack.marca);
            }
            ti++
        }
    }

    brokeRecord({ melhor }) {

        let broke = false;

        if (melhor.lap > pista.recordLap) {
            broke = true;
        } else if (melhor.lap == pista.recordLap) {
            if (melhor.km < pista.recordKm) {
                broke = true;
            }
        }

        return broke;

    }

    setFlag() {

        if (showFlag) {
            if (pista) {
                const tmpMelhor = this.getBetterCar();
                if (tmpMelhor) {
                    pista.setFlag(tmpMelhor.pos.x, tmpMelhor.pos.y, tmpMelhor.km, tmpMelhor.cor);
                    this.melhorCorrente = tmpMelhor;
                }
            }
        }

    }

    getQuemMaisDeuReh(qtd) {

        console.log(`Primeiro: ${colocacao[0].km}`);

        let maiorReh = 0;
        let maiorI = 0;

        for (let i = 0; i < min(qtd, colocacao.length); i++) {

            car = colocacao[i];

            console.log(`${i}:  ${colocacao[i].km} -> ${colocacao[i].qtdReh}`);

            if (car.km > 0) {
                if (myRelu(colocacao[i].qtdReh) > maiorReh) {

                    maiorReh = myRelu(colocacao[i].qtdReh);
                    maiorI = i;
                }
            }
        }

        console.log('******* Maior ré é ->', colocacao[maiorI].qtdReh, ' km ', colocacao[maiorI].km, ' i: ', maiorI);
        return colocacao[maiorI];

    }

    getGotCloserBest() {

        let qtd = 0;

        if (this.melhor) {
            for (const car of cars) {
                if (this.melhor.id != car.id) {
                    if (abs(this.melhor.km - car.km) < 100) {
                        qtd++;
                    }
                }
            }
        }

        return qtd;

    }

    classifyCars(worstFirst) {
        if (worstFirst)
            cars.sort((a, b) => (a.ranking() < b.ranking() ? -1 : 1));
        else
            cars.sort((a, b) => (a.ranking() > b.ranking() ? -1 : 1));
    }

    makeSon(ancestral = '', carList = [], crosses = 0) {

        if (carList.length < 1) {
            return false
        }

        const quantity = min(crosses, carList.length - 1);
        const indexParents = numsNoRepeat(0, quantity, quantity)
        const reproductives = [];

        // console.log(indexParents);

        // Add better first cause first one has priority in reproduce method.
        reproductives.push(carList[0].ia.showWeights(true))

        for (const i of indexParents) {
            reproductives.push(carList[i].ia.showWeights(true));
        }

        const weightSon = this.reproduce(ancestral, reproductives);

        let child = new Car({ ...this.getData(), marca: 's', parent: '' });
        child.ia.setWeightsFromString(weightSon, this.shapes);
        child.ia.mutated = 1;
        return child;

    }

    reproduce(anc = '', rep = []) {

        if (false && rep.length < 2) {
            console.log(`
            Reprodução < 2 foi passado e não vai ocorrer cruzamento!
            Correto é exemplo:
            ----------------------
            anc    = a,b,c (Base para comparação)
            ----------------------
            rep[0] = a,b,3 (Pai)
            rep[1] = 1,b,c (Mãe)
            ----------------------
            son    = 1,b,3 (Filho)
            `)
        }

        let son = '@';
        const arrRep = [];
        const arrAnc = anc.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });

        for (const r of rep) {
            arrRep.push(r.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() }));
        }

        for (let i = 0; i < arrAnc.length; i++) {

            let gen = arrAnc[i];

            for (let r = 0; r < arrRep.length; r++) {
                const genRep = arrRep[r][i];
                if (gen != genRep) {
                    gen = genRep;
                    break;
                }
            }

            son += ',' + gen;

        }

        son = son.replace(/@,/g, '');
        son = son.replace(/;,/g, ';');

        return son;

    }

    reproduceMixing(anc = '', rep = '') {

        const arrAnc = anc.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });
        const arrRep = rep.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });

        let son = anc;
        let part1 = 0
        let part2 = 0

        while ((part1 == 0 || part2 == 0) && arrAnc.length > 1 && arrRep.length > 1) {

            son = '@';

            for (let i = 0; i < arrAnc.length; i++) {

                if (Math.random() > 0.49 && arrRep[i] != undefined) {
                    son += ',' + arrRep[i];
                    part1++
                } else {
                    son += ',' + arrAnc[i];
                    part2++
                }
            }

            son = son.replace(/@,/g, '');
            son = son.replace(/;,/g, ';');

        }
        return son;
    }

    /*
    Retorna os primeiros colocados.
     */
    getFirsts() {

        let primeiros = [];
        let lastKm = 0;

        this.classifyCars()

        for (let i = 0; i < cars.length; i++) {

            const dif = abs(lastKm - cars[i].km);

            if (i == 0 || (dif > 0 && dif < 100 && dif != Infinity)) {

                primeiros.push(cars[i]);
                lastKm = cars[i].km;

                if (primeiros.length > 3) {
                    break;
                }

            }
        }

        return primeiros;
    }

    addCarToBetters(car, force) {

        if (car) {

            if (force) {
                this.melhores.push(car)
            } else {

                // Se ainda não tem esse rankink em Melhores.
                if (!this.melhores.find(e => e.ranking() == car.ranking())) {

                    // Se ainda não tem essa rede neural em Melhores.
                    if (!this.melhores.find(e => e.ia.showWeights(true) == car.ia.showWeights(true))) {
                        this.melhores.push(car)
                        return true
                    }
                }
            }
        }
        return false
    }

    getNextOfBetters() {

        const index = cars.length % this.melhores.length;
        const one = this.melhores[index];
        return one;

    }
    saveWeights(car) {

        const data = {
            time: getDateTime(),
            track: pista.selectedPista,
            comment: this.id,
            lap: car.lap,
            km: car.km,
            localNascimentoX: pista.localNascimento.x,
            localNascimentoY: pista.localNascimento.y,
            anguloNascimento: degrees(pista.anguloNascimento),
            marca: car.marca,
            parent: car.parent,
            generation: nGeracao,
            acc: (this.gotCloserBest / cars.length * 100).toFixed(0) + "%",
            closest: this.gotCloserBest,
            carsLength: cars.length,
            f1: car.ia.f1,
            f2: car.ia.f2,
            distNormalized: distNormalized,
            weights: car.ia.showWeights(true),
        }
        api.saveWeights('track' + pista.selectedPista, JSON.stringify(data));

    }
    defaultSettings() {
        return { weights: "", km: Infinity, lap: 0 }
    }

    loadWeights(track) {


        try {

            const weights = api.loadWeights('track' + track).toString().trim() || undefined;
            return JSON.parse(weights);

        } catch (error) {
            console.log("Pista: " + track);
            console.log(error);
            return this.defaultSettings();
        }
    }
    loadAllWeights(track) {

        try {

            const weights = api.loadAllWeigths('track' + track).toString().trim() || undefined
            return JSON.parse(weights);

        } catch (error) {
            console.log("Pista: " + track);
            console.log(error);
            return [this.defaultSettings()];
        }
    }
    getWifesFromFile(track) {
        try {

            const trackName = 'track' + track
            const stringWeights = api.loadAllWeigths(trackName).toString().trim() || undefined
            const weights = JSON.parse(stringWeights)
            const parsedWeigths = weights.map((e) => JSON.parse(e))
            const wifes = parsedWeigths.filter((e) => e.comment?.includes("@wife"))
            return wifes

        } catch (error) {
            console.log("Erro Pista: " + track, error);
            return [this.defaultSettings()];
        }

    }
    loadLastWeights(track, last = 0) {

        try {

            const trackName = 'track' + track
            const stringWeights = api.loadAllWeigths(trackName).toString().trim() || undefined
            const weights = JSON.parse(stringWeights)
            const id = weights.length - 1 - last
            const selected = weights[id]
            return JSON.parse(selected);

        } catch (error) {
            console.log("Pista: " + track);
            console.log(error);
            return this.defaultSettings();
        }
    }

    newCarFromStringWeight(stringWeight, carConfig) {
        const car = new Car(carConfig)
        car.ia.setWeightsFromString(stringWeight, this.shapes)
        car.km = carConfig.km ? carConfig.km : car.km
        car.lap = carConfig.lap ? carConfig.lap : car.lap
        return car
    }

    addLastCar(whatLast = 0) {
        const w = this.loadLastWeights(pista.selectedPista, whatLast).weights
        const lastCar = this.newCarFromStringWeight(w, { ...this.getData(), marca: 'l' })
        lastCar.setColor(whatLast * 2)
        pista.addCar(lastCar, `Último ${whatLast} carro salvo!`)
    }

    getBetterCar() {
        if (cars.length > 0) {

            this.classifyCars()
            const better = cars[0]
            this.classifyCars(true)
            return better
        }
        return false

    }

    isBetterThanSaved(car) {
        const isBetter = car.isBetterThan(this.getData())
        return isBetter
    }
    addManualCar() {
        manualLearning = true
        eliminarTodosCars();
        console.clear()
        let manualCar = new Car({ ...this.getData(), elitism: true, marca: '*', inteligente: false });
        pista.addCar(manualCar, 'Carro manual');
        this.melhores.push(manualCar);
        this.melhor = manualCar;
    }
    saveBetter() {
        this.saveWeights(this.melhor)
    }

    getFileCar() {
        const fileData = this.loadWeights(pista.selectedPista)
        const fileCar = this.newCarFromStringWeight(fileData.weights, { ...fileData })
        return fileCar
    }

}