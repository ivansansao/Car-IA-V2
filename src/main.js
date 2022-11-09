/* 
  https://github.com/davenewt/p5-asteroids/blob/master/ship.js

  https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open

  Colisão Line Line: https://editor.p5js.org/simontiger/sketches/S1kfupErZ

  Collide2D Methods: https://github.com/bmoren/p5.collide2D

  // To show some demo.
    car.update();
    cars.demo();
    car.show();   

    https://www.base64-image.de/

    [.WebGL-0x337c0274e300] GL_CONTEXT_LOST_KHR: Context has been lost.
    index.html:1 WebGL: CONTEXT_LOST_WEBGL: loseContext: context lost

    Rode um servidor facilmente com: python3 -m http.server
*/
let api = null;
let showDeadCars = false;
let showFunctionalities = false;
let roads = [];
// const startRoad = { i: 500, j: 65, value: 0 }; // linha, coluna, valor
let world = new World();
let crc32 = function (r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++)a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; o[c] = a } for (var n = -1, t = 0; t < r.length; t++)n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return (-1 ^ n) >>> 0 };
let pesosForcados = undefined;
let quantidade = 8;
let maxCar = 999;
let genetic = null;
let vivos = 0;
let runDemo = false;
let cars = [];
let walls = [];
let ray;
let pista;
let colocacao = [];
let evolucao = [];
let nGeracao = 0;
let foo;
let showBackground = true;
let showWalls = false;
let showCarsDetais = true;
let showRanhuras = false;
let record = 0;
let carregarCarroSalvo = true;
let salvarMelhorCarro = true;
let timer = 0;
let timerOn = true;
let showBatidos = false;
let collideCars = false;
let showMousePoint = false;
let elitism = true;
let running = true;
let showInfoCar = false;
let showFlag = false;
let luzes = true;
let carId = 0;
let scoreboard = null;
let soundBrake;
let audio;
let engine;
let pg;
let globalMutations = [];

function preload() {
    // soundFormats('mp3', 'ogg');
    // soundBrake = loadSound('sound/crow.wav');
    // audio = new Audio('sound/sounds_engine.wav');
    engine = new EngineSound();

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    pg = createGraphics(windowWidth, windowHeight);

    tf.setBackend('cpu');

    const pesoMeu = '0.28168871998786926,0.23892581462860107,0.562343180179596,1.6150444746017456,-0.03924964368343353,-0.219864159822464,0.0037029068917036057,1.122941255569458,-0.06735743582248688,0.13007910549640656,-0.014751092530786991,-0.3410579264163971,0.5638676881790161,-1.1437984704971313,-0.2908894419670105,-0.054860919713974,-0.0833563357591629,-0.17164289951324463,0.006004925351589918,0.12781642377376556,-0.13482210040092468,-0.44112494587898254,-1.2262914180755615,-0.36423924565315247,-0.14082768559455872,0.34943243861198425,0.18344391882419586,0.0937976986169815,-1.1260095834732056,-0.33957162499427795,0.024092309176921844,0.44452083110809326,0.1200653538107872,1.443794846534729,-0.24898023903369904,0.25303515791893005,-0.10755940526723862,-0.18958871066570282,-1.0121989250183105,-0.2783055901527405,-0.1897849440574646,-0.14550378918647766,-0.05197770893573761,0.33671897649765015,0.03110440820455551,0.2590145468711853,0.9347954392433167,0.9618196487426758,3.8702938556671143,-0.11332057416439056,1.2035402059555054,0.3075177073478699,-0.07839234918355942,-0.13134561479091644,0.08968619257211685,-1.0065346956253052,-0.8260407447814941,0.6288686394691467,1.2001445293426514,0.3347976803779602,0.08466702699661255,0.1153571829199791,0.38667672872543335,-0.4737982451915741,-0.5261644721031189;0.4237116575241089,0,1.1164929866790771,-1.0481747388839722,0;-0.0008429790032096207,-0.2615249752998352,2.4101855754852295,-0.8155093193054199,-0.21496015787124634,-1.05201256275177,0.5083143711090088,-1.2883431911468506,0.11369071155786514,-0.5352923274040222,-0.3593972623348236,1.3498395681381226,0.45838025212287903,0.050464630126953125,-0.024814028292894363,-0.2678264379501343,0.22060711681842804,-0.09158723056316376,0.06682334095239639,-0.5414955019950867,0.28580164909362793,0.2779991626739502,-0.2778953015804291,0.5519344210624695,-0.7015202045440674,1.4118103981018066,0.13332469761371613,0.6228964328765869,0.47507572174072266,0.49466586112976074,-0.40393421053886414,-0.1414807289838791,0.24798709154129028,0.1655038595199585,-1.100712537765503,0.3157758414745331,-0.38387227058410645,1.2458561658859253,1.566320538520813,-0.11078532785177231,-0.41379278898239136,-0.32940611243247986,0.12507115304470062,2.196666717529297,0.03559562936425209;0,1.588331699371338,0,0,0,1.514581561088562,-0.662720799446106,0.19348163902759552,0.1941835582256317'
    api = new Api();
    api.saveWeights('pista1', pesoMeu);
    // api.loadWeights('pista1');
    
    noLoop()

    foo = new p5.Speech();
    foo.setVoice('Google português do Brasil');

    genetic = new Genetic();

    pista = new Pista();
    scoreboard = new Scoreboard();

    for (let i = 0; i < 8; i++) {
        walls.push(new Wall());
    }

    genetic.nextGeneration();

    clear()

}

function draw() {

    if (pista.spriteLoaded == false) {
        return;
    }

    if (timerOn) {
        timer++;
    }

    if (!world.trainigMode) {

        background(pista.backcolor);
        handleKeyIsDown();

        imageMode(CORNER);
        if (pista.spritesheet) {
            image(pista.spritesheet, 0, 0);
        }

        pista.show();
        image(pg, 0, 0);
        showCredits();

        if (world.showScoreboard) {
            scoreboard.update();
            scoreboard.show();
        }

    }

    const wallsAndCars = [...pista.walls];

    if (collideCars) {

        for (const car of cars) {

            if (!car.batido && abs(car.aliveTime) > 400) {

                const ptd = p5.Vector.fromAngle(car.heading + 90).mult(10).add(car.pos);
                const pte = p5.Vector.fromAngle(car.heading - 90).mult(10).add(car.pos);
                wallsAndCars.push({ a: ptd, b: pte, id: car.id });


                const pdd = p5.Vector.fromAngle(car.heading + 0.25).mult(34).add(car.pos);
                const pde = p5.Vector.fromAngle(car.heading - 0.25).mult(34).add(car.pos);
                wallsAndCars.push({ a: pdd, b: pde, id: car.id });

                wallsAndCars.push({ a: ptd, b: pdd, id: car.id });
                wallsAndCars.push({ a: pte, b: pde, id: car.id });

            }
        }
    }

    for (const car of cars) {

        if (!car.batido) {

            const carInputs = [];

            car.update();
            car.look(wallsAndCars);

            carInputs.push(car.gear);
            carInputs.push(car.speed);

            // for (let i = 0; i < 20; i++) {
            //     if (car.marca == 'c' || car.marca == 'X') {
            //         carInputs.push(car.getExternDistanceWall(i));
            //     } else {                    
            //         // carInputs.push(car.rays[i].savedDistance);
            //         carInputs.push(car.getExternDistanceWall(i));
            //     }
            // }

            carInputs.push(car.getExternDistanceWall(0));
            carInputs.push(car.getExternDistanceWall(1));
            carInputs.push(car.getExternDistanceWall(2));
            carInputs.push(car.getExternDistanceWall(3));
            carInputs.push(car.getExternDistanceWall(4));
            carInputs.push(car.getExternDistanceWall(5));

            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);

            carInputs.push(car.getExternDistanceWall(15));
            carInputs.push(car.getExternDistanceWall(16));
            carInputs.push(car.getExternDistanceWall(17));
            carInputs.push(car.getExternDistanceWall(18));
            carInputs.push(car.getExternDistanceWall(19));

            car.think(carInputs);
            car.verificaColisaoRanhura(pista.ranhuras);

            // pista.lapSensors[0].hit(car, car.pos.x, car.pos.y, car.ray);

            if (!world.trainigMode) {
                car.show();
            }


        } else if (showBatidos) {
            car.show();
        }

    }

    if (vivos < maxCar) {

        if (getFrameRate() > 59 || vivos < 1) {

            const perToEnd = 100 - (timer / pista.trackSize * 100)

            if (perToEnd > 50) {
                addMoreCar();
            }

        }
    }

    if (timer > pista.pistaTimeOut) {
        timer = 0;
        eliminarTodosCars();
    }

    if (vivos == 0) {
        timer = 0;
        genetic.nextGeneration();
    }

    if (genetic.melhor) {

        if (!world.trainigMode || (world.trainigMode && frameCount % 40 == 0)) {

            if (timer % 100 == 0) {
                if (showFlag) genetic.setFlag();
            }

            if (world.trainigMode) background(pista.backcolor);
            noStroke();
            fill(pista.textBackColor);
            textSize(16);
            const mapToKm = (genetic.melhor.km * 0.001).toFixed(3).replace(/\./g, ',');
            const percentComplete = 100 - (genetic.melhor.km / pista.trackSize * 100).toFixed(0);
            const txtBetter = `${genetic.melhor.lap} - ${mapToKm} km   ${genetic.melhor.lap ? '' : percentComplete + '%'}  ID: ${genetic.melhor.id}`;

            text(`Carros: ${vivos}. FC: ${frameCount} Tempo: ${timer} / ${pista.pistaTimeOut} Pista: ${pista.selectedPista} G${nGeracao + 1} [ MELHOR: ${txtBetter} ]`, 10, 20);

        }

    }

    if (genetic.melhorCorrente && nGeracao > 0) {

        if (world.killOnFindBetter && genetic.melhor) {

            fill(0);
            text(`Corrente: ${genetic.melhorCorrente.km}-${genetic.melhor.ranhurasColetadas.length} Iguais ${genetic.melhorCorrente == genetic.melhor}`, 10, 35);

            if (genetic.melhorCorrente.marca != 'c') {
                text('!c', 2, 45)

                if (genetic.melhorCorrente != genetic.melhor) {
                    text('dif', 2, 55)
                    text('> 50', 2, 65)
                    if (genetic.melhorCorrente.km < genetic.melhor.km) {
                        text('C < M', 2, 75)
                        eliminarTodosCars();
                        timer = pista.pistaTimeOut;
                    }

                }
            }
        }

    }

    if (!world.trainigMode) ShowMousePoint()

}

function ShowMousePoint() {
    if (showMousePoint) {

        const mx = Number(mouseX.toFixed(0));
        const my = Number(mouseY.toFixed(0));
        let est = undefined;
        if (roads[mx]) {
            est = roads[mx][my];
        }


        let px = mx;
        let py = my;

        px = (mx > (windowWidth / 2)) ? mx - 200 : mx + 30
        py = (my > (windowHeight / 2)) ? my - 20 : my + 30

        stroke(200)
        strokeWeight(0);
        fill(255);
        rect(px - 4, py - 20, 180, 28);
        fill(50, 50, 255);
        strokeWeight(0);
        textStyle('bold')
        text(`(${mouseX},${mouseY}) km: ${est}`, px, py);
        textStyle('normal')
        // text(`${mx}, ${my} (km: ${est})`, mx - 80, my);
    }
}

function addMoreCar() {

    if (genetic.melhor) {

        const melhor = genetic.getNextOfBetters();

        let child = new Car('m', true, true, false);
        child.ia.model.setWeights(melhor.ia.getCopiedWeights());
        if (frameCount % 5 == 0)
            child.mutate(Number(random(0.01, 0.6).toFixed(15)));
        else
            child.mutate(Number(random(0.01, 0.015).toFixed(15)), 6);
        cars.unshift(child);
        vivos++
    }
}


function showCredits() {

    if (pista.selectedPista == 4) {

        noStroke();
        fill(80, 80, 80);
        strokeWeight(4);
        textSize(28);
        text(`github.com/ivansansao`, 750, 62);

        fill(255);

        strokeWeight(4);
        textSize(20);
        text(`@TensorFlow`, 250, 510);

        text(`@Inteligência`, 400, 830);
        text(`@Artificial`, 750, 760);

    }

}

function zerarFrota() {
    cars = [];
}

function newCarId() {
    carId++;
    return carId;
}