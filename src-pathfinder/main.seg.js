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

let pg;
let myWidth = 0
let myHeight = 0

function setup() {

    let myWidth = windowWidth * 0.98
    let myHeight = windowHeight * 0.98

    createCanvas(myWidth, myHeight);


    showAtalhos();
    makeMatrixRoads();

    pg = createGraphics(myWidth, myHeight);
    pg.background(255, 255, 255, 0);
    showRoads();

}
let roads = [];
function draw() {

    background(255);
    image(spritesheet, 0, 0);
    image(pg, 0, 0);

    // showRoads();
    textSize(22);

    const mx = Number(mouseX.toFixed(0));
    const my = Number(mouseY.toFixed(0));
    text('Frame rate: ' + mx, 10, 20);
    const est = roads[mx][my];

    if (est != undefined) {
        text('km: ' + est, 350, 20);
    } else {
        text('km: Fora da pista', 350, 20);
    }

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

function makeMatrixRoads() {

    console.log("Making matrix")

    let w = spritesheet.width / width;
    let h = spritesheet.height / height;

    console.log(w, h);

    noStroke();

    let pixelIndex, r, g, b, avg;
    let contador = 0;
    spritesheet.loadPixels();
    roads = [];

    for (let i = 0; i < spritesheet.width; i += 1) {

        roads[i] = [];
        for (let j = 0; j < spritesheet.height; j += 1) {

            pixelIndex = (i + j * spritesheet.width) * 4;
            r = spritesheet.pixels[pixelIndex + 0];
            g = spritesheet.pixels[pixelIndex + 1];
            b = spritesheet.pixels[pixelIndex + 2];

            avg = (r + g + b) / 3;

            if (r == 224 && g == 225 && b == 243) {

                const letter = String.fromCharCode((contador % 26) + 65);

                // fill(letter.charCodeAt(0) * 2);
                // textSize(8);
                // if (contador > 12500) {
                //     square(i, j, 4);
                // } else {
                //     text(letter, i, j);
                // }
                roads[i][j] = letter; // x,y = distância em km
                // if (j % 800 == 0) {
                //     console.log(i,j, letter)
                // }
                contador++;
            }

        }

    }
    console.log('contador: ' + contador);
    console.log("Done")
}

function showRoads() {

    console.log("Showing")

    pg.noStroke();
    pg.textSize(8);
    pg.fill(140);

    roads.forEach((subArray, i) => {
        subArray.forEach((e, j) => {
            // pg.text(e, i, j);
            pg.square(i, j, 1);
        })
    });

    console.log("done")
}
