class Genetic {

    constructor() {

        this.quantidade = 4;
        this.pesos = '';
        this.shapes = '';
        this.melhor = null;
        this.melhorCorrente = null;
        this.pesos = [];
        this.shapes = '22,8;8;8,9;9';

        // Sem pista.
        this.pesos.push('');

        // Pista 1
        this.pesos.push('-0.16185849905014038,-0.04437238723039627,-1.3237130641937256,0.2876213788986206,-0.385092556476593,0.19724732637405396,0.1237185001373291,-0.06338256597518921,0.2453538477420807,-0.6997166872024536,1.410857081413269,0.32246139645576477,1.199432611465454,-0.4128447473049164,0.32923924922943115,-1.3065760135650635,0.15168942511081696,-0.07108508795499802,-0.17661991715431213,0.07175277173519135,0.23320171236991882,-0.272798627614975,0.7646384835243225,0.09415274113416672,0.06807831674814224,-0.3031100928783417,-0.11551899462938309,-0.020972825586795807,0.30205807089805603,-0.07269393652677536,-0.3349117040634155,0.2952057123184204,-0.47856825590133667,-0.13946513831615448,-0.6110274195671082,1.520184874534607,0.1623045802116394,0.19997701048851013,-0.8235505223274231,0.033160462975502014,0.33578619360923767,1.188737154006958,0.06884343177080154,1.3037086725234985,-0.09796760231256485,-0.12444498389959335,0.28243428468704224,0.5909421443939209,-0.1317303478717804,0.16166268289089203,0.35642683506011963,0.6080654263496399,-0.2894786298274994,-0.09969548135995865,-0.18787556886672974,-0.37247076630592346,0.12478846311569214,-0.9267023205757141,-0.08800050616264343,-0.2457096129655838,-0.12772005796432495,1.0642482042312622,-0.1620897650718689,0.4621514081954956,0.31308260560035706,-0.5343852639198303,-0.3469054400920868,-1.3564386367797852,0.004182605538517237,1.1538372039794922,0.18082450330257416,0.15190252661705017,0.11375369131565094,-0.506252646446228,-0.22739747166633606,-0.07488903403282166,-0.2785661518573761,0.8099858164787292,-0.035846829414367676,0.3080045282840729,0.1827273815870285,-0.6243537664413452,-0.018771793693304062,0.09771919250488281,-0.19458718597888947,-0.07943561673164368,0.24004529416561127,0.8611940145492554,-0.30244868993759155,1.3452447652816772,-0.12320582568645477,0.10487211495637894,0.21837569773197174,0.3406694531440735,-0.1392998844385147,0.2525820732116699,0.23607337474822998,0.3305451571941376,-0.37945234775543213,-0.25492599606513977,0.0682314857840538,-0.46676093339920044,-0.06115955859422684,-0.4739043712615967,0.3452170193195343,-0.31325408816337585,-0.2805209457874298,0.10767737030982971,0.13166068494319916,-0.5030214786529541,-0.0898054987192154,-0.327277272939682,0.41069135069847107,0.0333954393863678,-0.4944550693035126,-0.8328852653503418,0.3848859369754791,0.2575017511844635,0.23008418083190918,0.07410398870706558,0.49757274985313416,0.15810371935367584,0.23505420982837677,-0.572344183921814,0.15884074568748474,-0.10238425433635712,0.042895808815956116,0.33252835273742676,0.1521066427230835,-0.22623111307621002,0.26244229078292847,-0.08588148653507233,-2.720733642578125,-0.2699497938156128,-0.27051666378974915,0.1024727150797844,-0.08318343013525009,0.395197331905365,0.263071745634079,0.39213696122169495,0.29767268896102905,0.10573217272758484,0.7926983833312988,-0.3940197825431824,-0.024865301325917244,-0.32865607738494873,-0.9364618062973022,0.9848143458366394,-1.1595020294189453,0.18676576018333435,-0.019511492922902107,-1.5564467906951904,0.5025249123573303,-1.9183756113052368,0.08134669065475464,-0.5244364738464355,-0.22849886119365692,1.9314978122711182,0.19902153313159943,0.34307563304901123,-0.0020182060543447733,0.057369414716959,0.20125624537467957,-0.3094848394393921,0.27771198749542236,2.1878111362457275,-0.30896443128585815,-0.2018854320049286,0.2460600882768631,-0.1404835730791092,0.15096627175807953,-0.21715256571769714,2.1105048656463623,-0.0990428626537323,-0.02979367785155773,-0.06040643900632858;0,1.2993333339691162,0,-1.5122278928756714,-3.310288667678833,0,1.565291404724121,-0.26443052291870117;-0.9202674627304077,-0.2863459885120392,-0.20264552533626556,0.37124788761138916,0.9039772152900696,-0.9439395666122437,0.46519309282302856,-0.1224612444639206,0.6786810755729675,-1.3760827779769897,0.6986674070358276,0.30998435616493225,-1.4794461727142334,1.0476666688919067,-0.05415308475494385,0.3334486484527588,-0.5312850475311279,0.14023225009441376,-0.00895486120134592,1.935012936592102,0.563092827796936,-1.198738932609558,-1.1154136657714844,-0.3081356883049011,-0.310271292924881,1.5010926723480225,0.026366086676716805,-0.7110133767127991,-0.21397684514522552,1.2848334312438965,-0.6263017654418945,-0.43540990352630615,-2.2851455211639404,0.030620375648140907,0.7560316920280457,-0.1556524783372879,0.6402912139892578,1.818588137626648,0.33993232250213623,0.020111655816435814,-0.37478020787239075,0.8221223950386047,-0.1130407378077507,0.004149127285927534,-0.28086555004119873,1.3128257989883423,-0.744111955165863,0.16395674645900726,0.24335120618343353,1.2483513355255127,-0.552593469619751,-0.24164238572120667,-0.5527985692024231,0.09523453563451767,0.04384663328528404,0.03494676947593689,0.2000545859336853,-0.11365890502929688,-0.5390766263008118,-2.1367790699005127,-0.22851604223251343,1.5211632251739502,0.5813907384872437,-0.19258499145507812,-0.7726640105247498,-0.0587097704410553,-0.3092118501663208,0.9197566509246826,-1.4028240442276,0.4037737548351288,-0.3005206286907196,-0.6232607960700989;-0.1824028640985489,0,-1.6631824970245361,0,1.1417511701583862,0.7440764904022217,-1.6099988222122192,0.5921221971511841,1.3984278440475464');

        // Pista 2
        this.pesos.push('');

        // Pista 3
        this.pesos.push('');

        // Pista 4
        this.pesos.push('-1.0032981634140015,-0.3929879069328308,-0.1830761581659317,1.4341747760772705,-0.09880396723747253,3.957397937774658,1.3139561414718628,-4.037288188934326,-3.1739792823791504,-2.5212020874023438,0.5974377393722534,1.7196770906448364,1.5156607627868652,1.6258763074874878,2.9778201580047607,-2.296416997909546,0.5793452858924866,-0.32670846581459045,-1.1325623989105225,-0.24803540110588074,-0.37598565220832825,0.30313190817832947,-0.7341101169586182,0.1361081600189209,-0.13815592229366302,0.237809956073761,-0.37913909554481506,0.03862752765417099,-0.030250007286667824,-0.18424111604690552,-0.22802597284317017,0.34189948439598083,1.6361722946166992,-1.5839898586273193,-0.9632461071014404,-1.3143812417984009,1.94431471824646,-0.5284411311149597,-0.34164026379585266,-0.6628913283348083,-1.206005573272705,-0.4424598217010498,0.42754247784614563,0.23359015583992004,2.134655475616455,0.3630189895629883,-0.0717339962720871,-1.123345971107483,-0.1177632138133049,-0.9501064419746399,-0.23137670755386353,1.7937840223312378,-4.2970733642578125,1.8075261116027832,-1.5722423791885376,1.8267685174942017,-0.021466176956892014,0.2606160044670105,0.4586108922958374,1.2695112228393555,0.5817805528640747,-1.341577172279358,0.08400896936655045,1.7368509769439697,0.3237755596637726,-1.2101391553878784,-1.264378547668457,-0.8580053448677063,1.3045755624771118,1.1683954000473022,0.6811964511871338,1.6989963054656982,0.22161449491977692,-0.865704357624054,0.33123987913131714,0.3184960186481476,-1.5788803100585938,0.05514509603381157,0.06580799072980881,-0.614538848400116,0.8042998313903809,0.0713750496506691,-0.2932884693145752,0.9804497361183167,-0.546088457107544,0.6919342279434204,0.0547611266374588,0.27965888381004333,-0.16184473037719727,0.7866691946983337,-0.1897699385881424,1.0531435012817383,-0.5471465587615967,-0.729404628276825,0.24624505639076233,-0.7204643487930298,-0.3326311409473419,-0.06648928672075272,-0.025533156469464302,0.2800792455673218,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.052337396889925,0.21479889750480652,1.7206624746322632,-0.025030631572008133,-0.12609590590000153,1.2143584489822388,0.35039955377578735,1.0268430709838867,-1.3607758283615112,-0.3450913429260254,0.5487605333328247,0.6805242896080017,-0.3382737636566162,-0.020253971219062805,-0.16905030608177185,-0.01743384823203087,0.2726258933544159,-3.4965193271636963,-1.0018420219421387,-0.34901073575019836,-0.15167170763015747,-1.0950915813446045,-0.01865844801068306,-0.08590131253004074,-1.7304435968399048,0.12340762466192245,-0.07265465706586838,0.32249942421913147,-0.8061326742172241,-0.32168102264404297,0.25092431902885437,1.500362753868103,0.27157989144325256,-0.041628096252679825,-3.850001811981201,0.3337973654270172,0.3517218828201294,-1.1404623985290527,0.4592992067337036,0.013913768343627453,-0.32086992263793945,0.005277829244732857,0.22711296379566193,0.25882935523986816,-0.1308974325656891,-0.13640737533569336,0.06480046361684799,1.2108570337295532,-0.7486998438835144,-0.5923480987548828,2.3123176097869873,0.7982367277145386,-0.37519434094429016,0.22973959147930145,1.3710111379623413,-0.38694506883621216,-2.4812204837799072,0.14352558553218842,-0.019178232178092003,0.6982812285423279,0.3712426722049713,-0.5915892124176025,-0.33282729983329773,0.5837779641151428,1.0959173440933228,0.9552401304244995,-0.35432150959968567,-0.32227814197540283,0.8003854751586914,-2.7162320613861084,-0.046041496098041534,0.8719251751899719,1.9607982635498047;0.4459264874458313,1.9712657928466797,2.411957263946533,1.9848037958145142,-2.108240842819214,1.4436131715774536,0.544187605381012,-2.7199902534484863;-0.27720290422439575,-1.122667670249939,1.0564227104187012,-0.5028740167617798,0.6137092113494873,4.418212413787842,-0.23084481060504913,0.2106866091489792,0.33229419589042664,-1.3857277631759644,-0.33779576420783997,-0.038698360323905945,0.25446972250938416,2.706820011138916,-0.04059413820505142,-4.0592803955078125,0.28660351037979126,-0.1043260395526886,-1.0086238384246826,0.707210123538971,0.24528540670871735,0.2491248995065689,1.853566288948059,1.1940182447433472,-2.3176395893096924,-1.897931694984436,1.3779352903366089,-0.6437256336212158,0.7204532623291016,-1.204796552658081,0.6413863897323608,-1.2092225551605225,-2.4854445457458496,-5.719761371612549,0.20004279911518097,-0.1252327263355255,-0.2206614464521408,-0.39900416135787964,-0.36234456300735474,-0.13598328828811646,5.384060859680176,-1.5523689985275269,6.638354778289795,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-3.0792319774627686,-0.3045960068702698,0.04767432436347008,-1.6894776821136475,4.896989345550537,-1.918535828590393,-0.01029503345489502,0.46701890230178833,-0.3843139410018921,-0.7107486724853516,-1.1649980545043945,0.5579390525817871,-2.145719289779663,-2.514225721359253,-0.3955398201942444,-2.423649549484253,-0.053003910928964615,-0.04519610106945038,0.6466938257217407,-0.5210121870040894,-0.4730883836746216,-6.151925563812256,-0.1641947627067566,1.0327436923980713,-0.06902086734771729,-0.04976518452167511;1.1262332201004028,-1.1063950061798096,1.7223834991455078,-2.0600554943084717,-0.9606027007102966,-4.876217365264893,-0.46278896927833557,5.4741411209106445,-1.0451953411102295');

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
            if (world.startWeightSaved) {
                child.ia.setWeightsFromString(pesos, this.shapes);
            }
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

        let date = new Date();

        console.log(`**** G: ${nGeracao + 1}. ${date.getHours()}:${date.getMinutes()} MELHOR FOI (${this.melhor.id}): ${this.melhor.ranhurasColetadas.length} ran. Marca: ${this.melhor.marca}. KM: ${this.melhor.km} f1: ${this.melhor.ia.f1} f2: ${this.melhor.ia.f2} `);

        if (this.melhor.ranhurasColetadas.length > record) {
            foo.speak(`Atingiu ${this.melhor.ranhurasColetadas.length}!`);
            record = this.melhor.ranhurasColetadas.length;
        }

        if (this.melhor.km > pista.recordKm || this.melhor.ranhurasColetadas.length > pista.recordRanhuras) {

            pista.recordKm = this.melhor.km;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;
            foo.speak(`quilômetro ${pista.recordKm.toFixed(0)}!`);
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

        if (true) {

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