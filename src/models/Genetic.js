class Genetic {

    constructor() {

        this.quantidade = 4;
        this.pesos = '';
        this.shapes = '';
        this.melhor = null;
        this.melhorCorrente = null;
        this.pesos = [];
        this.shapes = '21,5;5;5,9;9';

        // Sem pista.
        this.pesos.push('');        

        // Pista 1
        this.pesos.push('');
        
        // Pista 2
        this.pesos.push('');
        
        // Pista 3
        this.pesos.push('');
        
        // Pista 4
        this.pesos.push('0.5788469910621643,-2.7075562477111816,0.4562111794948578,0.3773748576641083,-0.14678320288658142,-1.0748317241668701,0.09643330425024033,-0.162026047706604,-0.35189980268478394,0.0678774043917656,0.010214385576546192,0.6494529843330383,0.1728276163339615,-0.1337432563304901,-0.1402754932641983,-0.27320367097854614,-0.045103054493665695,0.40875867009162903,-0.9533913135528564,-0.18483960628509521,-0.43987923860549927,0.4750151038169861,0.10818644613027573,0.018208617344498634,-0.4883841276168823,-0.9577062726020813,-1.379176139831543,-0.31018251180648804,-0.4210468530654907,0.17498579621315002,0.2722756564617157,0.44351595640182495,0.28457966446876526,-0.34866201877593994,-0.349525511264801,-0.5009039640426636,-0.099952831864357,-0.1628899723291397,0.11441486328840256,-0.12480758130550385,1.8883196115493774,-1.0303705930709839,-0.33333447575569153,2.5832724571228027,-0.18585063517093658,-0.5750814080238342,0.07201968133449554,-0.34732791781425476,-0.06438741087913513,-0.43488621711730957,-0.14153987169265747,-0.23007583618164062,-0.8655515909194946,-0.23693111538887024,-0.20740172266960144,0.3897942006587982,0.1440761685371399,-0.8226906657218933,-0.3071620762348175,-1.5755138397216797,-0.2691919505596161,-0.14029422402381897,1.3707369565963745,0.038587093353271484,-0.6312910318374634,-0.35472723841667175,1.6969982385635376,1.3961155414581299,0.08934967964887619,0.40854930877685547,-0.27215343713760376,0.33379533886909485,-0.30191853642463684,0.41820698976516724,-0.207561194896698,0.031212344765663147,-1.0770176649093628,0.8808363676071167,0.1018996462225914,0.8727893233299255,0.20073826611042023,0.47050514817237854,-0.20184344053268433,0.4274607002735138,0.3033231198787689,-0.04031063988804817,-0.08360765129327774,-0.058927763253450394,-0.30348774790763855,-0.4544096291065216,-0.7404593825340271,-0.2672558128833771,-0.011406660079956055,-0.04184157773852348,-0.9446606636047363,0.7637244462966919,-0.16107961535453796,0.18877588212490082,0.16912201046943665,-1.7511719465255737,0.43114176392555237,-0.3043762445449829,-0.6229956746101379,-0.33716025948524475,0.05679164081811905;1.688819169998169,1.4275003671646118,-2.20613694190979,-1.0749704837799072,0.31918179988861084;0.044140323996543884,-0.5360851883888245,-0.08910030126571655,0.28399890661239624,-0.5795435309410095,0.04013815149664879,2.650632381439209,0.16128972172737122,1.4466379880905151,-1.294983983039856,0.5855733752250671,-0.0988214984536171,0.00018051733786705881,0.16884885728359222,-1.6823066473007202,-1.0067722797393799,0.017803413793444633,0.6122310757637024,-2.1238296031951904,0.3332687318325043,0.3725212514400482,-1.7681961059570312,0.3929471969604492,0.1782231628894806,0.7006511092185974,0.6178557872772217,0.04255755990743637,0.06782802194356918,0.005722950678318739,-0.3091430962085724,-0.2594400644302368,-2.8370425701141357,1.3156405687332153,0.7734088897705078,-0.40261605381965637,1.498998999595642,-0.41430357098579407,0.16641061007976532,-0.40197527408599854,-0.12586164474487305,-0.7330920100212097,0.02538100630044937,3.250948429107666,0.5075637102127075,-0.5508983731269836;0,-0.9780163168907166,0,0.06232157722115517,-0.07401390373706818,0,0,0.5625045299530029,0');

        // Pista 5
        this.pesos.push('');
        
        // Pista 6
        this.pesos.push('');
    }

    firstGeneration() {

        console.log('Primeira geração...');

        cars = [];      

        // Novos
        for (let i = 0; i < quantidade; i++) {
            cars.push(new Car());
        }

        let child = new Car('X');
        let pesos;
        if (pesosForcados != undefined) {
            pesos = this.pesos[pesosForcados];
            console.log(`Pesos da pista ${pesosForcados}`);
        } else {
            pesos = this.pesos[pista.selectedPista];
        }

        if (pesos.length > 0) {
            child.ia.setWeightsFromString(pesos, this.shapes);
        }
        cars.push(child);
        this.melhor = child;

        vivos = cars.length;

    }

    nextGeneration() {

        pista.reset();

        this.calcColocacao();

        if (colocacao.length == 0) {
            this.firstGeneration();
            return

        }
        this.melhor = this.getMelhorCarro();

        if (!this.melhor) {
            return
        }
        this.saveWeights(this.melhor);

        console.log(`**** G: ${nGeracao + 1}. MELHOR FOI (${this.melhor.id}): ${this.melhor.ranhurasColetadas.length} ran. Marca: ${this.melhor.marca}. KM: ${this.melhor.km} f1: ${this.melhor.ia.f1} f2: ${this.melhor.ia.f2} `);

        if (this.melhor.ranhurasColetadas.length > record) {
            foo.speak(`Atingiu ${this.melhor.ranhurasColetadas.length}!`);
            record = this.melhor.ranhurasColetadas.length;
        }
        
        if (this.melhor.km > pista.recordKm || this.melhor.ranhurasColetadas.length > pista.recordRanhuras) {
            
            pista.recordKm = this.melhor.km;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;
            foo.speak(`quilômetro ${pista.recordKm}!`);
            this.melhor.ia.showWeights();
        }

        // pista.pistaTimeOut = ceil(this.melhor.aliveTime *1.1);

        evolucao.push(this.melhor);

        nGeracao++;
        hue = 0;

        cars = [];

        const weights = this.melhor.ia.model.getWeights();

        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 0; i++) {

            let child = new Car('m');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.1); // 0.1
            cars.push(child);

        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 3; i++) {

            let child = new Car('T');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.05); // 0.1
            cars.push(child);

        }

        // Clonado (elitismo)
        if (elitism) {

            let child = new Car('c');
            child.ia.model.setWeights(weightCopies);
            cars.push(child);
        }

        vivos = cars.length;

    }

    setFlag() {

        if (pista) {            
            const tmpMelhor = genetic.getMelhorCarro();
            if (tmpMelhor) {
               pista.setFlag(tmpMelhor.pos.x, tmpMelhor.pos.y, tmpMelhor.km);
               this.melhorCorrente = tmpMelhor;
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

    getMelhorCarro() {

        // Captura quem tem mais ranhuras.

        let maisRanhuras = 0;
        let melhor = null;

        for (const car of cars) {

            if (car.ranhurasColetadas.length > maisRanhuras) {
                maisRanhuras = car.ranhurasColetadas.length;
                melhor = car;
            }
        }

        // console.log('getMelhorCarro() -> ', this.melhor.km, ' maisRanhuras: ', maisRanhuras);
        // fill(0,255,0);
        // circle(this.melhor.pos.x,this.melhor.pos.y,8);
        // noLoop();


        if (maisRanhuras < 7 && pista.selectedPista == 2) {

            // Se empate, verifica desses qual tem melhor ângulo.

            let maiorHea = 0;

            for (const car of cars) {
                if (car.ranhurasColetadas.length == maisRanhuras) {
                    if (car.heading > maiorHea) {
                        maiorHea = car.heading;
                        melhor = car;
                    }
                }
            }

        } else {

            // Se empate, verifica desses qual tem melhor km.

            let maisKm = 0;

            for (const car of cars) {
                if (car.ranhurasColetadas.length == maisRanhuras) {
                    if (car.km > maisKm) {
                        maisKm = car.km;
                        melhor = car;
                    }
                }
            }
        }

        //  // Se empate, soteia um.
        //  for (const car of cars) {
        //      if (car.ranhurasColetadas.length == maisRanhuras) {
        //          if (random(1) > 0.5) {
        //              melhor = car;
        //              break;
        //          }
        //      }
        //  }

        // console.log('Mais KM() -> ', this.melhor.km, ' maisRanhuras: ', maisRanhuras, ' maisKm: ', maisKm);
        // fill(0,0,255);
        // circle(this.melhor.pos.x,this.melhor.pos.y,8);
        // noLoop();


        return melhor;
    }

    funcSalvarMelhorCarro(melhor) {
        if (salvarMelhorCarro) {
            // localStorage.setItem('meuGato', 'Tom');

            // document.cookie = "username=ivan; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

            // try {
            //     console.log('Salvando carro... ', this.melhor.marca);
            //     await this.melhor.ia.model.save('indexeddb://caria-melhor');
            //     console.log('Salvo');
            //     // await this.melhor.ia.model.save('localstorage://caria-melhor');
            // } catch (err) {
            //     console.error(err);
            // }
        }
    }

    funcCarregarCarroSalvo() {
        if (carregarCarroSalvo) {
            // console.log(' leitura: ',localStorage.getItem('meuGato'));
            // console.log('cookie => ',document.cookie);
            // try {

            //     console.log('Carregando carro salvo...');
            //     const melhorSalvo = await tf.loadLayersModel('indexeddb://caria-melhor');

            //     let child = new Car('X');
            //     child.ia.model = null;
            //     child.ia.model = melhorSalvo
            //     cars.push(child);

            // } catch (err) {
            //     console.error(err);
            // }
            // melhorCarregado = true;
            // console.log('Carregado!')
        }

    }
    saveWeights(car) {
        const w = car.ia.showWeights(true);
        localStorage.setItem('melhor', w);
    }

    calcColocacao() {
        colocacao = [];
        for (let car of cars) {
            colocacao.push(car);
        }
        if (colocacao.length > 0) {
            colocacao.sort(function (a, b) { return b.km - a.km });
        }
    
    }
    

}