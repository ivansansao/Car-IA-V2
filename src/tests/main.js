let world;

function setup() {
    createCanvas(windowWidth, windowHeight);
    world = {
        lapSensor: new LapSensor(),
        car: new Car()
    }
}

function draw() {

    background(255);

    world.car.pos.x = mouseX;
    world.car.pos.y = mouseY;

    
    const hit = world.car.hitLapSensor(world.lapSensor);
    
    world.lapSensor.show(hit);
    world.car.show();

    textSize(30)
    text(`Hit: ${hit}`, 100, 40);

}

class LapSensor {
    constructor() {
        this.pos = createVector(600, 70);
        this.width = 20;
        this.height = 80;
    }
    show() {
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

class Car {
    constructor() {
        this.pos = createVector(700, 70)
        this.overLapSensor = false;
        this.ray = 10;
    }
    lapSensorEntry(hr) {
        console.log('Entrou pela ', hr ? 'direita' : 'esquerda');

    }
    lapSensorExit(hr) {
        console.log('Saiu pela ', hr ? 'direita' : 'esquerda');

    }
    hitLapSensor(sensor) {
        const hit = circRect(this.pos.x, this.pos.y, this.ray, sensor.pos.x, sensor.pos.y, sensor.width, sensor.height);

        if (hit) {
            if (!this.overLapSensor) {
                const hr = hitRight(this.pos.x, sensor.pos.x, sensor.width);
                this.lapSensorEntry(hr);
            }

        } else {
            if (this.overLapSensor) {
                const hr = hitRight(this.pos.x, sensor.pos.x, sensor.width);
                this.lapSensorExit(hr);
            }
        }
        this.overLapSensor = hit;

        return hit;

    }
    show() {
        circle(this.pos.x, this.pos.y, this.ray * 2);
    }
}

function circRect(cx, cy, rad, rx, ry, rw, rh) {

    let testX = cx;
    let testY = cy;

    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;
    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;

    let d = dist(cx, cy, testX, testY);

    return d <= rad;

}

function hitRight(cx, rx, rw) {

    return abs(rx - cx) > abs(rx + rw - cx);

}