let world = new World();
let pg;

function handleKeyIsDown(car) {

    if (keyIsDown(UP_ARROW)) {
        car.speedUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        car.freeSpeedUp();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        car.vaiPraDireita();
    } else if (keyIsDown(LEFT_ARROW)) {
        car.vaiPraEsquerda();
    }

    if (keyIsDown(82)) { // r
        car.engageReverse();
    }
    if (keyIsDown(68)) { // d
        car.engageDinamic();
    }
    if (keyIsDown(66)) { // b
        car.brake();
    }

}

function keyPressed() {

    if (key == 'e') {
        world.demo = !world.demo;
    }
    if (key == 'i') {
        for (const car of world.cars) {
            car.showInfo = !car.showInfo;
        }

    }
    if (key == 't') {
        world.showTrails = !world.showTrails;
    }

}

let roda = 0.0
function setup() {

    createCanvas(windowWidth, windowHeight);

    pg = createGraphics(windowWidth, windowHeight);
    pg.background(255, 255, 255, 0);

    world.cars.push(new Car());
    world.cars[0].pos.x = 50;
    world.cars[0].pos.j = windowHeight / 2;
    world.cars[0].heading = PI * 1.5;

    for (let i = 0; i < 10; i++) {
        world.cars.push(new Car());
        if (i > 0) world.cars[i].randomizePos();
    }
}

function draw() {
    // scale(2)

    background(255, 255, 255);
    image(pg, 0, 0)

    if (frameCount % 1000 == 0) {
        for (const car of world.cars) {
            car.trail = [];
        }
    }

    if (world.showTrails) {
        for (const car of world.cars) {
            car.drawTrail();
        }
    }

    for (const car of world.cars) {

        handleKeyIsDown(car);

        car.runDemo(world.demo);
        car.update();
        car.show();

        if (!world.demo) {
            break;
        }

    }

    // push()
    // translate(windowWidth/2, windowHeight/2);
    // rotate(roda)
    // strokeWeight(2)
    // line(0,0,10,0)
    // strokeWeight(4)
    // point(10,0)
    // pop()

    // text(roda,10,25)
    // text(roda%(PI*2),10,50)
    // text(abs(roda)%(PI*2),10,75)

    roda -= 0.01

}

