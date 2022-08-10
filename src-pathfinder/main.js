let showBackground = true;
let selectedTrack = 1;

function keyPressed() {

    if (key == 'c') {
        selectedTrack++;
        try {
            spritesheet = eval(`getSpriteFundo${selectedTrack}()`);
        } catch (e) {
            selectedTrack = 1;
            spritesheet = getSpriteFundo1();
        }
    }

    if (key == 'r') {
        lastPoint = [];
        console.log('ÚLTIMO PONTO ZERADO!!');
    }
    if (key == 's') {

        console.clear();
        console.log(walls);
        imprimePontos(walls);

    }
    if (key == 'b') {

        showBackground = !showBackground;

    }
    if (key == 'd') {

        lastPoint = [];
        lastPoint.push(Number(walls[walls.length - 1].a));
        lastPoint.push(Number(walls[walls.length - 1].b));
        console.log(lastPoint);
        walls.pop();

    }
}
function mouseReleased() {

    if (lastPoint.length > 0) {

        console.log(lastPoint);

        const newPoint = { a: lastPoint[0].toFixed(0), b: lastPoint[1].toFixed(0), c: mouseX.toFixed(0), d: mouseY.toFixed(0), m: 0, t: 0 };

        walls.push(newPoint);

        console.log(newPoint);

        lastPoint = [];
    } else {
        console.log('Ok, agora clica em outro lugar para começar!');
    }

    lastPoint.push(mouseX);
    lastPoint.push(mouseY);
}


let lastPoint = [];

const walls = [];
let img = null

function preload() {

    spritesheet = getSpriteFundo4();

}

function setup() {

    createCanvas(windowWidth * 0.98, windowHeight * 0.98);
    showAtalhos();

}

function draw() {

    background(255);
    image(spritesheet, 0, 0);

    let w = spritesheet.width / width;
    let h = spritesheet.height / height;
    console.log(w, h);

    noStroke();
    let pixelIndex, r, g, b, avg;
    let contador = 0;
    
    spritesheet.loadPixels();

    for (let i = 0; i < spritesheet.width; i++) {

        for (let j = 0; j < spritesheet.height; j++) {

            pixelIndex = (i + j * spritesheet.width) * 4;
            r = spritesheet.pixels[pixelIndex + 0];
            g = spritesheet.pixels[pixelIndex + 1];
            b = spritesheet.pixels[pixelIndex + 2];

            avg = (r + g + b) / 3;

            if (r == 224 && g == 225 && b == 243) {

                fill(120);
                textSize(2);
                // square(i * w, j * h, w);
                text('O', i, j);
                contador++;

            }

        }
    }

    console.log('contador: ' + contador);
    // spritesheet.updatePixels();
    // image(spritesheet, 17, 17);


    text(`width: ${windowWidth} height: ${windowHeight}`, 4, 20);

    console.log("loop")
    noLoop();


}

function start() {
}

function showAtalhos() {
    console.log('c - Troca a pista\nr - Reseta o último ponto\nd- Deleta a última linha\ns- Mostra os pontos no console')
}

function imprimePontos(pontos) {

    let textPontos = '';

    for (const p of pontos) {
        textPontos += `    points.push({ a: ${p.a}, b: ${p.b}, c: ${p.c}, d: ${p.d}, m: ${p.m}, t: ${p.t} });\n`;
    }

    console.log(textPontos);

}

function makeMatrixScreen() {
    let matrix = [];

    console.log('antes');
    for (let x = 0; x < windowWidth; x++) {
        for (let y = 0; y < windowHeight; y++) {
            matrix.push({ x, y, q: 0 });
        }
    }
    console.log('depois')

    return matrix;
}