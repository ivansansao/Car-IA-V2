let sensors = [];
let birds = [];

function setup() {

    createCanvas(windowWidth, windowHeight);
    sensors.push(new LapSensor('Ana', 200, 40, onHitSensor));
    // sensors.push(new LapSensor('Beto', 100, 80, onHitSensor));

    birds.push(new Bird('Azul', random(50, 300), 70, [0, 0, 200]));
    birds.push(new Bird('Verde', random(50, 300), 70, [0, 200, 0]));
    birds.push(new Bird('Amarelo', random(50, 300), 70, [200, 200, 0]));
    birds.push(new Bird('Ciano', random(50, 300), 70, [0, 200, 200]));
    birds.push(new Bird('Vermelho', random(50, 300), 70, [200, 0, 0]));


}

function draw() {

    background(200, 200, 200);

    for (const bird of birds) {

        if (bird.name == 'Amarelo') {
            bird.pos.x = mouseX;
            bird.pos.y = mouseY;
        } else {
            bird.pos.x += random(-1, 1);
            bird.pos.y += random(-1, 1);
        }

        bird.show(120);

        let y = 150;
        for (const sensor of sensors) {
            const hit = sensor.hit(bird, bird.pos.x, bird.pos.y, bird.dia);

            if (hit) {
                sensor.show([100, 0, 0])
            } else {
                sensor.show([160])

            }
            for (let i = 0; i < sensor.whos.length; i++) {
                text(sensor.whos[i].name, sensor.pos.x, y + (i * 15))
            }

            y += 20;
        }


    }

}

function onHitSensor(who, sensor, where, entry) {
    who.highlight = entry;
    if (entry) {
        who.lap++;

    } else {
        who.lap--;
    }
    console.log(`${who.name} hits sensor '${sensor.name}' ${entry ? 'entry' : 'exit'} on ${where}`);
}

class Bird {
    constructor(name, x, y, color) {
        this.name = name;
        this.pos = createVector(x, y);
        this.dia = 20;
        this.color = color;
        this.highlight = false;
        this.lap = 0;
    }
    show() {

        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.dia)
        
        if (this.highlight) {
            fill(255);
            circle(this.pos.x, this.pos.y, this.dia / 2)            
        } else {
        }
        textSize(8)
        fill(0)
        text(this.lap, this.pos.x-2, this.pos.y+2);
    }
}

class LapSensor {
    constructor(name, x, y, onHit) {
        this.name = name;
        this.pos = createVector(x, y);
        this.width = 10;
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
                    this.onHit(who, this, where, true);
                }

            }

        } else {

            if (this.whos.includes(who)) {

                this.whos = this.whos.filter((e) => e != who)
                
                const where = this.nearestLine(cx, cy);

                if (typeof this.onHit == 'function') {
                    this.onHit(who, this, where, false);
                }

            }
        }

        return hit
    }
    nearestLine(x, y) {

        const disL = abs(this.pos.x - x)
        const disR = abs(this.pos.x + this.width - x)
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
        rect(this.pos.x, this.pos.y, this.width, this.height, 4)
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