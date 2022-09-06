// As funções keyPressed e keyIsDown abaixo pertencem ao P5.js!

function keyPressed() {

    if (key == '0') {
        engine.start();
    }
    if (key == '9') {
        engine.stop();
    }

    if (key == '8') {
        engine.setFrequency(90);
    }
    if (key == '2') {
        engine.setFrequency(60);
    }

    if (key == 'a') { // Mostrar sensores
        for (const monster of pista.monsters) {
            if (!monster.useMouse) {
                monster.ativo = !monster.ativo;
            }
        }
    } else if (key == 'b') {
        world.showCars = !world.showCars;
    } else if (key == 'c') { // Change pista.        
        pista.togglePista();
    } else if (key == 'd') {
        showFunctionalities = !showFunctionalities;
    } else if (key == 'e') { // Toggle elitism
        elitism = !elitism;
        console.log('Elitism: ', elitism);
    } else if (key == 'f') { // Mouse matador. 
        for (const monster of pista.monsters) {
            if (monster.useMouse) {
                monster.ativo = !monster.ativo;
            }
        }
    } else if (key == 'g') { // Show Background 
        showBackground = !showBackground;
    } else if (key == 'h') { // Mostrar detalhes dos carros
        showCarsDetais = !showCarsDetais;
    } else if (key == 'i') {
        for (const car of cars) {
            car.showInfo = !car.showInfo;
        }
    } else if (key == 'j') {
        showRoads(funShowRoads);
    } else if (key == 'k') { // Matar ao encontrar um melhor.
        world.killOnFindBetter = !world.killOnFindBetter;
        console.log(`Kill on find better ${world.killOnFindBetter}`);
    } else if (key == 'l') { // Mostrar sensores
        showWalls = !showWalls;
    } else if (key == 'm') {
        timer = pista.pistaTimeOut;
        eliminarTodosCars();
    } else if (key == 'n') {
        showFlag = !showFlag;
    } else if (key == 'o') { // Colidir carros?
        collideCars = !collideCars;
        console.log('Colidir carros: ', collideCars)
    } else if (key == 'p') {
        console.log('Parado!');
        if (running) {
            noLoop();
        } else {
            loop();
        }
        running = !running;
    } else if (key == 'q') {
        world.startWeightSaved = !world.startWeightSaved;
    } else if (key == 'r') {
        showRanhurasNormalized();
    } else if (key == 's') { // Mostrar sensores
        for (const car of cars) {
            car.showRays = !car.showRays;
        }
    } else if (key == 't') {
        timerOn = !timerOn;
    } else if (key == 'u') {
    } else if (key == 'v') {
        showMousePoint = !showMousePoint;
    } else if (key == 'y') {
        world.engineSound = !world.engineSound;
        console.log(`Engine sound: ${world.engineSound}`);
    } else if (key == 'w') { // Mostrar ranhuras
        showRanhuras = !showRanhuras;
    } else if (key == 'x') {
        showBatidos = !showBatidos;
    } else if (key == 'z') {
        luzes = !luzes;
    }
}

function handleKeyIsDown() {

    for (let i = 0; i < cars.length; i++) {

        if (keyIsDown(UP_ARROW)) {
            cars[i].speedUp();
        } else if (keyIsDown(DOWN_ARROW)) {
            cars[i].freeSpeedUp();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            cars[i].vaiPraDireita();
        } else if (keyIsDown(LEFT_ARROW)) {
            cars[i].vaiPraEsquerda();
        }

    }
}

// audio = new Audio('sound/sounds_engine.wav');
// audio.play();

function mouseClicked() {

    // let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // let freq = {step: 0, min: 69, max: 121};

    // let gain = audioCtx.createGain();
    // let osc = audioCtx.createOscillator()
    // osc.connect(gain);

    // gain.connect(audioCtx.destination);
    // osc.type = "sawtooth";
    // osc.frequency.value = freq.min + random(-1,1);
    // gain.gain.value = 0.2;
    // osc.start();

    
}

function mousePressed() {
}

function mouseReleased() {
}
