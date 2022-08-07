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
        this.pesos.push('-0.5338744521141052,0.5872508883476257,-0.15773633122444153,-0.4159189760684967,1.2707737684249878,-0.052293866872787476,0.11760959774255753,-0.14434123039245605,-0.48363545536994934,0.387530118227005,0.19859129190444946,0.8376818299293518,-0.7626184821128845,-1.4055912494659424,-0.2665373980998993,-1.0488015413284302,0.1787533462047577,-0.7347196936607361,0.09874816238880157,0.02034149505198002,0.030232442542910576,0.4771735668182373,-2.5629894733428955,-2.0016229152679443,-0.13933609426021576,-0.21100209653377533,0.3468437194824219,0.004443494137376547,0.15137767791748047,-0.08907440304756165,-0.15437625348567963,0.9424828290939331,0.032523296773433685,0.4933697581291199,0.13095968961715698,-0.17742401361465454,0.08964869379997253,0.3396680951118469,0.23585106432437897,0.25117212533950806,1.3701963424682617,2.0942893028259277,0.17584268748760223,-0.352120965719223,1.0192234516143799,-0.13960634171962738,1.6126039028167725,-1.196839451789856,0.0684029832482338,-0.30042070150375366,-0.24287252128124237,-0.049977876245975494,0.769873857498169,-0.048634789884090424,-0.6862654685974121,0.10995061695575714,-0.06107979640364647,0.3189506530761719,-0.3761879801750183,-0.2610308527946472,0.338724821805954,0.3133264183998108,-0.31985166668891907,1.0981026887893677,-0.1320091187953949,0.09147113561630249,-0.24276849627494812,0.151076540350914,-0.03674900159239769,-0.24615392088890076,0.1393192559480667,1.2580965757369995,-0.11462648957967758,-0.06592857837677002,0.17659150063991547,0.343492716550827,-0.2141564041376114,0.001687377691268921,0.39092525839805603,-0.3568505644798279,0.03970831632614136,0.004351690411567688,0.017719391733407974,0.20800840854644775,-0.5011245608329773,0.6704030632972717,1.2248764038085938,0.1364162415266037,-0.36636853218078613,0.12107732892036438,0.1600685864686966,-0.6009401082992554,-0.32294514775276184,-0.49065911769866943,0.2761995494365692,1.1053704023361206,0.5594105124473572,0.6854670643806458,0.09191858023405075,-1.4518390893936157,0.1482517421245575,0.1418759822845459,0.18953555822372437,-0.35322192311286926,-0.241331085562706;1.0426210165023804,-1.584666132926941,0,-0.563967227935791,0;-0.24430067837238312,0.10832079499959946,0.4069667458534241,-0.18947775661945343,0.502606213092804,0.561930775642395,0.1315470039844513,-0.5365771055221558,1.031645655632019,-0.08935702592134476,-0.09005999565124512,-0.4062994122505188,0.3239401876926422,0.6732667684555054,0.33686181902885437,0.3438376188278198,-1.5690299272537231,0.049168843775987625,0.5765838027000427,-0.5049259066581726,-1.8672511577606201,0.15214625000953674,-0.4354207217693329,-1.2804807424545288,0.10787136107683182,1.2450801134109497,0.29030749201774597,-1.678914189338684,0.40135112404823303,0.12711015343666077,-1.0439584255218506,1.3133851289749146,-0.17044131457805634,-0.4688108265399933,0.43235448002815247,-0.19738198816776276,-0.7455337643623352,1.0468748807907104,1.122220754623413,0.546203076839447,-1.5788954496383667,0.28264278173446655,0.4890325367450714,0.0767282098531723,-0.1873880922794342;-0.5115454792976379,0.9494803547859192,-0.23578070104122162,-1.3348565101623535,-0.8211409449577332,-0.931938648223877,0,-0.7748518586158752,0');

        // Pista 2
        this.pesos.push('');

        // Pista 3
        this.pesos.push('');

        // Pista 4
        this.pesos.push('2.395419120788574,-1.8040189743041992,-0.8657318353652954,0.8649638295173645,0.10286660492420197,-1.2394628524780273,-0.6276317834854126,-2.078049659729004,-0.35189980268478394,0.0678774043917656,0.010214385576546192,-0.2864019572734833,-0.10700134932994843,-1.1335586309432983,-0.33218759298324585,-0.27320367097854614,-0.045103054493665695,0.40875867009162903,-1.26166832447052,-0.18483960628509521,-0.43987923860549927,0.4750151038169861,0.08211462944746017,0.1495208442211151,-0.4883841276168823,-0.9577062726020813,-1.6897176504135132,-0.31018251180648804,-0.4210468530654907,0.353478342294693,0.2722756564617157,0.44351595640182495,2.0073723793029785,0.5729045271873474,-1.2363334894180298,-0.6445643901824951,-0.099952831864357,-0.1628899723291397,0.09323088079690933,0.9442556500434875,1.8883196115493774,-0.9286598563194275,-0.33333447575569153,2.5832724571228027,-1.3437473773956299,-0.5750814080238342,-0.1051001250743866,-0.5643997192382812,-0.06438741087913513,0.1463756561279297,-0.31080734729766846,-0.23007583618164062,-0.9502880573272705,0.5620447993278503,-0.20740172266960144,0.3897942006587982,0.1440761685371399,-1.40738046169281,-0.3071620762348175,-1.5755138397216797,0.5932875871658325,-0.14029422402381897,1.3707369565963745,0.038587093353271484,-0.6312910318374634,-1.2674566507339478,1.6969982385635376,1.3961155414581299,1.2917205095291138,2.4604618549346924,-0.9305809140205383,-0.1227843388915062,-0.30191853642463684,0.41820698976516724,-0.207561194896698,1.6017119884490967,-1.0770176649093628,0.8808363676071167,-1.5443296432495117,1.4481393098831177,0.20073826611042023,1.719833254814148,-0.20184344053268433,0.4274607002735138,0.3033231198787689,-0.04031063988804817,-0.8773760795593262,0.33265888690948486,0.26587581634521484,-0.6282585263252258,-0.7404593825340271,1.0087512731552124,-1.0325051546096802,-0.48759132623672485,-1.2415865659713745,0.22210170328617096,-0.47870680689811707,0.18877588212490082,0.16912201046943665,-1.7511719465255737,0.43114176392555237,-0.012391879223287106,-0.6229956746101379,-0.4607967138290405,0.05679164081811905;1.688819169998169,1.4077723026275635,-2.424543857574463,-0.29661989212036133,1.2859666347503662;-0.07856299728155136,-0.15188606083393097,-0.9644784331321716,4.097160816192627,0.06748229265213013,1.193148136138916,2.650632381439209,0.16128972172737122,1.7365891933441162,-1.294983983039856,0.5855733752250671,-1.1878567934036255,0.1351999193429947,0.4548489451408386,-1.6823066473007202,-1.0067722797393799,0.017803413793444633,0.6122310757637024,-2.1238296031951904,0.3332687318325043,-0.6718570590019226,-1.7681961059570312,0.3929471969604492,1.4172656536102295,0.5832849144935608,-2.1695263385772705,-0.509814441204071,0.06782802194356918,-1.5686891078948975,1.2141677141189575,-0.2594400644302368,-2.8370425701141357,0.6997430920600891,0.7734088897705078,-0.40261605381965637,1.498998999595642,-0.41430357098579407,0.16641061007976532,-0.40197527408599854,-0.12586164474487305,-0.7330920100212097,0.02538100630044937,3.250948429107666,2.153846025466919,-0.5508983731269836;0,-0.9780163168907166,2.1672706604003906,0.06232157722115517,-0.07401390373706818,-0.034552451223134995,0,0.5625045299530029,0');

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