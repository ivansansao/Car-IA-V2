/* 
  https://github.com/davenewt/p5-asteroids/blob/master/ship.js

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
let showFunctionalities = false;
let roads = [];
// const startRoad = { i: 500, j: 65, value: 0 }; // linha, coluna, valor
let world = new World();
let crc32 = function (r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++)a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; o[c] = a } for (var n = -1, t = 0; t < r.length; t++)n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return (-1 ^ n) >>> 0 };
let pesosForcados = undefined;
let maxCar = 999;
let genetic = null;
let quantidade = 0;
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
let melhor = null;
let collideCars = false;
let showMousePoint = false;
let elitism = true;
let running = true;
let showInfoCar = false;
let showFlag = false;
let luzes = true;

let soundBrake;
let audio;
let engine;
let pg;

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

    foo = new p5.Speech();
    foo.setVoice('Google português do Brasil');

    genetic = new Genetic();

    pista = new Pista();

    for (let i = 0; i < 8; i++) {
        walls.push(new Wall());
    }

    genetic.nextGeneration();
    // background(255);

    clear()

}

function draw() {


    background(pista.backcolor);
    handleKeyIsDown();



    if (timerOn) {
        timer++;
    }

    if (showBackground) {
        imageMode(CORNER);
        if (pista.spritesheet) {
            image(pista.spritesheet, 0, 0);
        }
    }

    // pg.background(255, 255, 255, 0);

    image(pg, 0, 0);

    pista.show();
    showCredits();


    if (!pista.waveFronted) {

        if (pista.spritesheet?.width > 1) {
            pista.waveFronted = true;

            pista.spritesheet.loadPixels();
            // console.log(pista.spritesheet.width)
            // console.log(pista.spritesheet.height)
            makeMatrixRoads();
            waveFront();
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

            // if (car.marca == 'c' || car.marca == 'X') {
            //     if (car.braking) console.log(`braking`);
            //     if (car.acceleration != '') console.log(car.acceleration);
            //     console.log(car.gear);
            // }

            if (showFunctionalities) {
                if (frameCount > 900 && frameCount < 1200) {
                    car.showRays = true;
                } else if (frameCount > 1200 && frameCount < 1210) {
                    car.showRays = false;
                }
            }

            carInputs.push(car.gear);
            carInputs.push(car.speed);
            carInputs.push(car.rays[0].savedDistance);
            carInputs.push(car.rays[1].savedDistance);
            carInputs.push(car.rays[2].savedDistance);
            carInputs.push(car.rays[3].savedDistance);
            carInputs.push(car.rays[4].savedDistance);
            carInputs.push(car.rays[5].savedDistance);
            carInputs.push(car.rays[6].savedDistance);
            carInputs.push(car.rays[7].savedDistance);
            carInputs.push(car.rays[8].savedDistance);
            carInputs.push(car.rays[9].savedDistance);
            carInputs.push(car.rays[10].savedDistance);
            carInputs.push(car.rays[11].savedDistance);
            carInputs.push(car.rays[12].savedDistance);
            carInputs.push(car.rays[13].savedDistance);
            carInputs.push(car.rays[14].savedDistance);
            carInputs.push(car.rays[15].savedDistance);
            carInputs.push(car.rays[16].savedDistance);
            carInputs.push(car.rays[17].savedDistance);
            carInputs.push(car.rays[18].savedDistance);
            carInputs.push(car.rays[19].savedDistance);

            car.raciocinar(carInputs);
            car.runDemo(runDemo);
            car.verificaColisaoRanhura(pista.ranhuras);

            car.hitLapSensor(pista.lapSensor);

            if (world.showCars) car.show();

            // if (vivos == 1) {
            //     if (!car.batido) {
            //         if (car.marca == 'c') {
            //             if (car.km < 300) {
            //                 car.aposentar();
            //             }
            //         }
            //     }
            // }

            pista.monstersCollide(car);

        } else if (showBatidos) {
            car.show();
        }

    }

    pista.monstersUpdate();
    pista.monstersShow();

    if (vivos < maxCar) {

        if (getFrameRate() > 61 || vivos < 10) {

            const perToEnd = 100 - (timer / pista.pistaTimeOut * 100)

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

    if (timer % 100 == 0) {
        genetic.setFlag();
    }

    noStroke();

    fill(pista.textBackColor);
    textSize(16);
    if (genetic.melhor) {
        const percentComplete = 100 - (genetic.melhor.km / pista.trackSize * 100).toFixed(0);
        text(`Ativos: ${vivos}. FC: ${frameCount} Timer: ${timer} / ${pista.pistaTimeOut} Volta: ${genetic.melhor.lap} Record: ${genetic.melhor.km.toFixed(0)} km Completo: ${percentComplete}% Pista: ${pista.selectedPista} G${nGeracao + 1}`, 10, 20);
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

    ShowMousePoint()

}

function ShowMousePoint() {
    if (showMousePoint) {

        const mx = Number(mouseX.toFixed(0));
        const my = Number(mouseY.toFixed(0));
        let est = undefined;
        if (roads[mx]) {
            est = roads[mx][my];
        }

        stroke(0)
        strokeWeight(1);
        fill(255);
        text(`(${mouseX},${mouseY}) km: ${est}`, mx - 80, my);
        // text(`${mx}, ${my} (km: ${est})`, mx - 80, my);
    }
}

function addMoreCar() {

    if (genetic.melhor) {

        const weights = genetic.melhor.ia.model.getWeights();
        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }

        let child = new Car('m', true, true, false);
        // pista.anguloNascimento = radians(random(0, 360));
        child.ia.model.setWeights(weightCopies);
        if (frameCount % 4 == 0)
            child.mutate(Number(random(0.01, 0.6).toFixed(15)), random(1, 1));
        else
            child.mutate(Number(random(0.01, 0.015).toFixed(15)), random(1, 1));
        cars.unshift(child);
        vivos++
    }
}

function makeMatrixRoads() {

    let pixelIndex, r, g, b;
    roads = [];

    for (let i = 0; i < pista.spritesheet.width; i++) {

        roads[i] = [];
        for (let j = 0; j < pista.spritesheet.height; j++) {

            pixelIndex = (i + j * pista.spritesheet.width) * 4;
            r = pista.spritesheet.pixels[pixelIndex + 0];
            g = pista.spritesheet.pixels[pixelIndex + 1];
            b = pista.spritesheet.pixels[pixelIndex + 2];

            if (r == pista.corDaPista.r && g == pista.corDaPista.g && b == pista.corDaPista.b) {
                roads[i][j] = 0;
            } else {
                roads[i][j] = -1;
            }

        }
    }

}

function waveFront() {

    let a = [pista.startRoad];
    let b = [];

    let value;
    let i;
    let j;

    while (a.length > 0) {

        for (let x = 0; x < a.length; x++) {

            value = a[x].value + 1;

            i = a[x].i;
            j = a[x].j + 1;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i + 1;
            j = a[x].j;

            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i;
            j = a[x].j - 1;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i - 1;
            j = a[x].j;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

        }

        a = [...b];
        b = [];

    }

    pista.trackSize = value;
    pista.setPistaTimeOut();

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
