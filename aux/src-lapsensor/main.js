let sensors = [];
let bird;

function setup() {

    createCanvas(windowWidth, windowHeight);
    sensors.push(new LapSensor('start', 200, 40, onHitSensor));
    // sensors.push(new LapSensor('timeline', 100, 80, onHitSensor));
    bird = new Bird(200, 70);


}

function draw() {

    background(200, 200, 200);

    bird.pos.x = mouseX;
    bird.pos.y = mouseY;
    for (const sensor of sensors) {
        const hit = sensor.hit(bird, bird.pos.x, bird.pos.y, bird.dia);

        if (hit) {
            sensor.show([100, 0, 0])
        } else {
            sensor.show([160])

        }
    }

    bird.show(120);


}

function onHitSensor(what, where, entry) {
    console.log(`On sensor '${what.name}' ${entry ? 'entry' : 'exit'} on ${where}`);
}

class Bird {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.dia = 20;
    }
    show() {
        noStroke();
        fill(0, 255, 0)
        circle(this.pos.x, this.pos.y, this.dia)
    }
}

class LapSensor {
    constructor(name, x, y, onHit) {
        this.name = name;
        this.pos = createVector(x, y);
        this.width = 20;
        this.height = 80;
        this.onHit = onHit;
        this.whos = [];
    }
    hit(who, cx, cy, cdia) {

        const hit = circRect(cx, cy, cdia / 2, this.pos.x, this.pos.y, this.width, this.height);

        if (hit) {

            if (!this.whos.includes(who)) {
                
                this.whos.push(who);
                                
                const where = this.nearestLine(cx, cy);
                
                if (typeof this.onHit == 'function') {
                    this.onHit(this, where, true);
                }

            }

            return true;
        } else {
            if (this.whos.includes(who)) {
                this.whos.pop(who)
                const where = this.nearestLine(cx, cy);
                if (typeof this.onHit == 'function') {
                    this.onHit(this, where, false);
                }
            }
        }

        return false
    }
    nearestLine(x, y) {

        const disR = abs(this.pos.x - x)
        const disL = abs(this.pos.x + this.width - x)
        const disT = abs(this.pos.y - y)
        const disB = abs(this.pos.y + this.height - y)

        let locals = '';

        locals += (disR < disL) ? 'R' : 'L';
        locals += (disT < disB) ? 'T' : 'B';

        return locals

    }

    show(colr) {
        noStroke();
        fill(colr)
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }

}

function hitRight(cx, rx, rw) {

    return abs(rx - cx) > abs(rx + rw - cx);

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

// let sensor = new LapSensor(600,70);