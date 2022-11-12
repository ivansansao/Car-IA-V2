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
        this.shapes = '13,5;5;5,9;9';
        // this.shapes = '22,8;8;8,9;9';

        // Sem pista.
        // this.pesos.push('');

        // // Pista 1
        // this.pesos.push('0.28168871998786926,0.23892581462860107,0.562343180179596,1.6150444746017456,-0.03924964368343353,-0.219864159822464,0.0037029068917036057,1.122941255569458,-0.06735743582248688,0.13007910549640656,-0.014751092530786991,-0.3410579264163971,0.5638676881790161,-1.1437984704971313,-0.2908894419670105,-0.054860919713974,-0.0833563357591629,-0.17164289951324463,0.006004925351589918,0.12781642377376556,-0.13482210040092468,-0.44112494587898254,-1.2262914180755615,-0.36423924565315247,-0.14082768559455872,0.34943243861198425,0.18344391882419586,0.0937976986169815,-1.1260095834732056,-0.33957162499427795,0.024092309176921844,0.44452083110809326,0.1200653538107872,1.443794846534729,-0.24898023903369904,0.25303515791893005,-0.10755940526723862,-0.18958871066570282,-1.0121989250183105,-0.2783055901527405,-0.1897849440574646,-0.14550378918647766,-0.05197770893573761,0.33671897649765015,0.03110440820455551,0.2590145468711853,0.9347954392433167,0.9618196487426758,3.8702938556671143,-0.11332057416439056,1.2035402059555054,0.3075177073478699,-0.07839234918355942,-0.13134561479091644,0.08968619257211685,-1.0065346956253052,-0.8260407447814941,0.6288686394691467,1.2001445293426514,0.3347976803779602,0.08466702699661255,0.1153571829199791,0.38667672872543335,-0.4737982451915741,-0.5261644721031189;0.4237116575241089,0,1.1164929866790771,-1.0481747388839722,0;-0.0008429790032096207,-0.2615249752998352,2.4101855754852295,-0.8155093193054199,-0.21496015787124634,-1.05201256275177,0.5083143711090088,-1.2883431911468506,0.11369071155786514,-0.5352923274040222,-0.3593972623348236,1.3498395681381226,0.45838025212287903,0.050464630126953125,-0.024814028292894363,-0.2678264379501343,0.22060711681842804,-0.09158723056316376,0.06682334095239639,-0.5414955019950867,0.28580164909362793,0.2779991626739502,-0.2778953015804291,0.5519344210624695,-0.7015202045440674,1.4118103981018066,0.13332469761371613,0.6228964328765869,0.47507572174072266,0.49466586112976074,-0.40393421053886414,-0.1414807289838791,0.24798709154129028,0.1655038595199585,-1.100712537765503,0.3157758414745331,-0.38387227058410645,1.2458561658859253,1.566320538520813,-0.11078532785177231,-0.41379278898239136,-0.32940611243247986,0.12507115304470062,2.196666717529297,0.03559562936425209;0,1.588331699371338,0,0,0,1.514581561088562,-0.662720799446106,0.19348163902759552,0.1941835582256317');

        // // Pista 2
        // this.pesos.push('0.3133578598499298,-0.29803839325904846,0.8336313962936401,1.598037600517273,-2.2503583431243896,0.8700369000434875,-0.844524085521698,0.8148892521858215,-0.7883689403533936,-1.5135765075683594,0.7600817084312439,-0.17811906337738037,-1.2595077753067017,-0.07034629583358765,0.9488605260848999,0.5273793935775757,-1.538787603378296,0.4636070728302002,-1.744191288948059,-0.25060948729515076,-0.161899596452713,-0.2864622175693512,-0.11428351700305939,0.5409886240959167,-0.8963153958320618,0.7826405763626099,0.22283408045768738,0.22283926606178284,1.797120451927185,-1.1056617498397827,-0.27973100543022156,0.35871848464012146,-2.5231642723083496,-0.029521849006414413,-0.5554903149604797,4.069376468658447,-0.6764273643493652,1.000454068183899,1.2765507698059082,1.8495631217956543,0.7188996076583862,0.7816807627677917,-1.206109642982483,-2.042495012283325,-0.9339541792869568,0.0023340361658483744,0.7106828093528748,1.4996798038482666,-1.837453842163086,-1.016484022140503,0.14460508525371552,0.5623908042907715,0.24113032221794128,1.9220843315124512,0.49665212631225586,0.5688679218292236,1.0267739295959473,0.5810745358467102,-0.5047993659973145,0.40680497884750366,0.16619811952114105,-1.1672717332839966,0.5515640377998352,-1.6989959478378296,-1.2947132587432861;0.18753857910633087,0,-2.1894476413726807,-0.19932527840137482,2.4532601833343506;0.7683926820755005,-0.0771922767162323,0.7230214476585388,-0.46350419521331787,0.340178519487381,2.422783374786377,-2.615246295928955,-0.18178530037403107,0.6126660108566284,2.441352128982544,1.1344269514083862,1.6357792615890503,-0.09297939389944077,1.5322215557098389,1.5903078317642212,0.43624141812324524,-0.11413203179836273,1.1173689365386963,0.057300664484500885,0.8460221886634827,-0.7877522706985474,-1.6909517049789429,0.8317544460296631,0.44156935811042786,-0.9639458060264587,0.2488030642271042,1.8243893384933472,-1.296921730041504,-1.1713510751724243,-0.15233206748962402,-0.22330015897750854,2.2327704429626465,-1.2744656801223755,2.1744518280029297,-0.6126294732093811,-0.2186080515384674,0.43820086121559143,0.7078768014907837,-0.6146758198738098,0.2964988350868225,0.7920249700546265,-0.1267206221818924,-0.056832216680049896,1.2228269577026367,0.24614177644252777;-1.3293826580047607,0.5235375761985779,0.3732857406139374,3.2859957218170166,0.1457999348640442,4.992956638336182,0.9572885632514954,1.9608418941497803,-0.4635073244571686');

        // // Pista 3 1-1090
        // this.pesos.push('-0.8618161082267761,0.47362208366394043,0.3084736466407776,-1.0647008419036865,4.720367431640625,0.7308865785598755,0.8842021226882935,-3.840095281600952,0.460447758436203,-2.0739967823028564,-0.6131318807601929,0.19129738211631775,-1.3941009044647217,0.29023200273513794,-0.5513449311256409,-0.6695254445075989,-0.3550737798213959,1.1741682291030884,0.033014602959156036,-0.08068566769361496,-0.030607406049966812,2.8544881343841553,-0.20617786049842834,0.5367076992988586,0.42089736461639404,-1.0885952711105347,0.707234799861908,0.6294124126434326,-0.29166698455810547,-0.07139557600021362,1.044698715209961,0.18638017773628235,-0.3449893593788147,3.5782814025878906,0.2375170886516571,1.4006502628326416,0.06714631617069244,-0.6721913814544678,-0.3129330575466156,-0.08993879705667496,-0.5543661713600159,-0.28409162163734436,1.2008707523345947,-0.15146732330322266,0.07843679934740067,-0.26704028248786926,0.9330094456672668,-0.1851245015859604,-0.022885777056217194,0.841852605342865,-0.6374093890190125,0.2813245952129364,-0.4351627826690674,-1.7894072532653809,0.8815601468086243,2.1876184940338135,-0.6757249236106873,0.26813018321990967,-0.9584074020385742,-0.2277890145778656,-0.8546909093856812,0.4042204022407532,-1.5059410333633423,0.35873937606811523,-0.3921281099319458;0.6986933946609497,0.236496701836586,1.7075749635696411,2.2592544555664062,1.9003112316131592;1.4420316219329834,-0.858768880367279,0.676583468914032,-0.0733260065317154,-4.906584739685059,-0.8857629895210266,-0.3860839903354645,0.45061948895454407,0.5320711135864258,0.08099927008152008,-1.0750207901000977,-0.05113024637103081,0.009738181717693806,-1.1962428092956543,2.8716299533843994,-0.20661742985248566,-0.6010689735412598,0.3053962290287018,-0.378677636384964,0.7324467897415161,0.6162853837013245,-0.273162841796875,-1.5890337228775024,-5.455269813537598,-0.20881065726280212,-0.930417001247406,-1.0969253778457642,-4.013991832733154,1.4758633375167847,1.104532241821289,0.9759611487388611,-4.983276844024658,1.5396149158477783,0.7328686714172363,-2.496392250061035,-2.988694667816162,-0.32346341013908386,1.534812569618225,-0.019088629633188248,-0.2332252413034439,3.5899341106414795,6.851287364959717,1.8068078756332397,-1.0583648681640625,0.6279550194740295;0.491748571395874,-1.1851309537887573,-0.6724867224693298,2.671776294708252,-5.055491924285889,-0.6985350251197815,-0.8148943185806274,2.050071954727173,0');

        // // Pista 4 1-5926
        // this.pesos.push('-0.5954307317733765,-1.8505767583847046,0.40728089213371277,-0.42055556178092957,1.0329577922821045,0.34820908308029175,0.07536005228757858,0.2596079409122467,0.23803308606147766,-1.2730520963668823,0.5323594808578491,0.5973569750785828,-0.14495739340782166,-1.6273524761199951,0.4126746952533722,-0.005985864903777838,0.3913622200489044,-1.5226359367370605,-0.2464153915643692,-0.3218018114566803,0.5163015127182007,-0.7083244919776917,0.22831909358501434,0.136943057179451,0.2582792341709137,-0.19597941637039185,1.197195053100586,0.6478720903396606,-0.1795995533466339,-0.1867513209581375,-0.29484081268310547,-0.32880428433418274,0.05918663367629051,0.2587944567203522,-0.5126546025276184,-0.6381788849830627,1.7863823175430298,-0.6389002799987793,0.15183471143245697,-0.12113555520772934,-0.20610782504081726,-0.42091959714889526,-0.012079139240086079,0.35366541147232056,-0.3583451211452484,-0.354245126247406,-0.17599770426750183,-0.3854581415653229,-0.5274759531021118,-0.5265058279037476,-1.5508815050125122,-0.1572314351797104,-0.2468300312757492,1.1658951044082642,-0.28053349256515503,0.4748213589191437,0.09320183098316193,0.3200909197330475,0.22201195359230042,0.9769699573516846,-0.060146912932395935,0.42797666788101196,-0.029726814478635788,0.291036993265152,0.0541524812579155;1.1538951396942139,1.777424693107605,-0.07679444551467896,0,0;-1.7548414468765259,0.443291038274765,0.7723156809806824,-0.02505326457321644,-0.14966419339179993,1.4852906465530396,0.20363420248031616,0.25498244166374207,0.10847709327936172,-3.893777847290039,-0.6686477065086365,-0.8515002727508545,0.2805233895778656,1.1406368017196655,1.7317125797271729,-0.5134387612342834,0.17411895096302032,0.15261174738407135,3.819105625152588,-0.6393884420394897,0.15568505227565765,-0.007016443647444248,0.42064398527145386,1.6871495246887207,-0.479574978351593,0.6457563042640686,0.1691737174987793,3.356820821762085,0.2829780578613281,0.85569167137146,0.2635274827480316,2.4481194019317627,-1.910020351409912,-0.41058969497680664,-0.005627121310681105,0.2485654056072235,-1.1330114603042603,0.6220959424972534,0.023515360429883003,-0.3575317859649658,-1.677681565284729,0.07096441835165024,-0.44916364550590515,-0.317399799823761,0.7553411722183228;-2.251701831817627,-0.734089195728302,1.2712470293045044,1.3186897039413452,0.9979794025421143,1.688961148262024,0,-0.49946871399879456,0');

        // // Pista 5
        // this.pesos.push('');

        // // Pista 6
        // this.pesos.push('');

        for (let i = 0; i <= 6; i++) {
            this.pesos.push(this.loadWeights(i));
        }

    }

    getData() {
        return this.pesos[pista.selectedPista];
    }

    getFirstWeights() {

        let child = new Car({ ...genetic.getData(), marca: 'X' });
        let pesos = this.pesos[pista.selectedPista].weights;

        if (pesos.length > 0) {
            if (world.startWeightSaved) {
                child.ia.setWeightsFromString(pesos, this.shapes);
            }
        }
        cars.push(child);
        this.melhores.push(child);
        this.melhor = child;

        vivos = cars.length;

    }

    nextGeneration() {

        if (!this.melhor) {

            zerarFrota();
            this.getFirstWeights();
            return

        }
        const ancestral = this.melhor.ia.showWeights(true);

        this.melhores = [];
        this.calcColocacao();
        this.melhor = cars[0];
        this.gotCloserBest = this.getGotCloserBest();

        for (const firsts of this.getFirsts(this.melhor)) {
            this.melhores.push(firsts);
        }

        // Create sons doing reprodutive process.

        const sons = [];
        for (let i = 0; i < this.melhores.length - 1; i++) {
            sons.push(this.makeSon(ancestral, this.melhores, i + 2));
        }
        for (let i = 0; i < 7; i++) {
            sons.push(this.makeSon(ancestral, cars, i + 2));
        }

        if (this.gotCloserBest > this.recordCloser) {
            this.recordCloser = this.gotCloserBest;
        }

        this.melhores.push(this.makeSon(ancestral, this.melhores));

        console.log(`G${addZero(nGeracao + 1)} (${getHourMin()}) km: ${this.melhor.lap} - ${this.melhor.km} M: ${this.melhor.marca} R: ${this.melhor.ranhurasColetadas.length} ID: ${this.melhor.id} CARS: ${cars.length} Perto: ${addZero(this.gotCloserBest)} ${(this.gotCloserBest / cars.length * 100).toFixed(0)}% Muts: ${this.melhor.ia.mutated} NM: ${this.melhor.ia.mutatedNeurons}`);

        if (this.brokeRecord({ melhor: this.melhor })) {

            pista.recordKm = this.melhor.km;
            pista.recordLap = this.melhor.lap;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;

            if (nGeracao > 0) {
                this.saveWeights(this.melhor);
                foo.speak(`${pista.recordKm.toFixed(0)}`);
                this.melhor.ia.showWeights();
            }

        }

        evolucao.push(this.melhor);
        zerarFrota();

        pista.make();

        nGeracao++;
        hue = 0;

        for (const son of sons) {

            let mutated = new Car({ ...genetic.getData(), marca: 'sm', parent: son.marca });
            mutated.ia.model.setWeights(son.ia.getCopiedWeights());
            mutated.mutate(Number(random(0.01, 0.015).toFixed(15)), 6);

            cars.push(son);
            cars.push(mutated);
        }

        const weightCopies = this.melhor.ia.getCopiedWeights();

        if (elitism) {

            let child = new Car({ ...genetic.getData(), marca: 'c', parent: this.melhor.marca });
            child.ia.model.setWeights(weightCopies);
            cars.push(child);
        }

        vivos = cars.length;

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

                this.calcColocacao();

                const tmpMelhor = cars[0];
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

    calcColocacao() {
        cars.sort((a, b) => (a.ranking() < b.ranking() ? 1 : -1));
    }

    makeSon(ancestral = '', carList = [], crosses = 0) {

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

        let child = new Car({ ...genetic.getData(), marca: 's', parent: '' });
        child.ia.setWeightsFromString(weightSon, this.shapes);
        child.ia.mutated = 1;
        child.setColor();

        return child;

    }

    reproduce(anc = '', rep = []) {

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

    /*
    Retorna os primeiros colocados.
     */
    getFirsts() {

        let primeiros = [];
        let lastKm = 0;
        let q = 0;

        for (let i = 0; i < cars.length; i++) {

            const dif = abs(lastKm - cars[i].km);

            if (dif > 0 && dif != Infinity) {

                primeiros.push(cars[i]);
                lastKm = cars[i].km;
                q++;

                if (q > 3) {
                    break;
                }

            }
        }

        return primeiros;
    }

    getNextOfBetters() {

        const index = cars.length % this.melhores.length;
        const one = this.melhores[index];
        return one;

    }

    saveWeights(car) {

        const data = {
            time: getDateTime(),
            lap: car.lap,
            km: car.km,
            marca: car.marca,
            parent: car.parent,
            generation: nGeracao,
            acc: (this.gotCloserBest / cars.length * 100).toFixed(0) + "%",
            closest: this.gotCloserBest,
            carsLength: cars.length,
            f1: car.ia.f1,
            f2: car.ia.f2,
            weights: car.ia.showWeights(true),
        }
        api.saveWeights('track' + pista.selectedPista, JSON.stringify(data));

    }
    loadWeights(track) {

        try {

            const weights = api.loadWeights('track' + track).toString().trim() || '{}';
            return JSON.parse(weights);

        } catch (error) {
            console.log("Pista: " + track);
            console.error(error);
            return '';
        }
    }


}