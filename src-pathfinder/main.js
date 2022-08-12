const start = { i: 400, j: 65, value: 0 }; // linha, coluna, valor

let showBackground = true;
let selectedTrack = 1;
let pg;
let myWidth = 0
let myHeight = 0
let roads = [];

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
    }
    if (key == 's') {
    }
    if (key == 'b') {
        showBackground = !showBackground;
    }
    if (key == 'd') {
    }
}
function mouseReleased() {
}

function preload() {
    spritesheet = getSpriteFundo4();
}

function setup() {

    let myWidth = windowWidth * 0.98
    let myHeight = windowHeight * 0.98

    createCanvas(myWidth, myHeight);
    makeMatrixRoads();

    pg = createGraphics(myWidth, myHeight);
    pg.background(255, 255, 255, 0);

    background(255);
    waveFront();
    showRoads();
    frameRate(10)

}

function draw() {

    background(255);
    image(spritesheet, 0, 0);
    image(pg, 0, 0);

    // showRoads();
    textSize(22);

    const mx = Number(mouseX.toFixed(0));
    const my = Number(mouseY.toFixed(0));

    text('Frame count: ' + frameCount, 10, 20);

    let est = undefined;
    if (roads[mx]) {
        est = roads[mx][my];
    }

    if (est != undefined) {
        text('km: ' + est, 350, 20);
    } else {
        text('km: Fora da pista', 350, 20);
    }

    text(`${mx}, ${my} (km: ${est})`, mx, my);
    pg.stroke(255, 0, 0)
    pg.fill(255)
    pg.circle(start.i, start.j, 8);


}

function makeMatrixRoads() {

    console.log("Making matrix")

    noStroke();

    let pixelIndex, r, g, b, avg;
    let contador = 0;
    spritesheet.loadPixels();
    roads = [];

    for (let i = 0; i < spritesheet.width; i++) {

        roads[i] = [];
        for (let j = 0; j < spritesheet.height; j++) {

            pixelIndex = (i + j * spritesheet.width) * 4;
            r = spritesheet.pixels[pixelIndex + 0];
            g = spritesheet.pixels[pixelIndex + 1];
            b = spritesheet.pixels[pixelIndex + 2];

            avg = (r + g + b) / 3;

            if (r == 224 && g == 225 && b == 243) {
                const letter = String.fromCharCode((contador % 26) + 65);
                roads[i][j] = 0; // x,y = distância em km
                contador++;
            } else {
                roads[i][j] = -1;
            }

            if (contador > 15600 && false) {
                i = Infinity;
                j = Infinity;
            }

        }
    }

    console.log('contador: ' + contador);
    console.log("Done");

}

function waveFront() {



    let a = [start];
    let b = [];

    let value;
    let i;
    let j;

    while (a.length > 0) {

        for (let x = 0; x < a.length; x++) {

            value = a[x].value + 1;

            i = a[x].i;
            j = a[x].j + 1;
            if (roads[i][j] == 0) {
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
            if (roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i - 1;
            j = a[x].j;
            if (roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

        }

        a = [...b];
        b = [];

    }

    stroke(255, 80, 200)

}

function showRoads() {

    console.log("Showing")

    pg.noStroke();
    pg.textSize(5);
    pg.fill(0);
    const offseti = 0;
    const offsetj = 0;

    roads.forEach((subArray, i) => {
        subArray.forEach((e, j) => {
            // pg.square(i, j, 6);

            if (e >= '0') {
                pg.fill(180)
            } else {
                pg.fill(0, 0, 255)
            }

            const oi = offseti + (i * 1)
            const oj = offsetj + (j * 1)

            if (start.i == i && start.j == j) {
                pg.rect(oi, oj * 4, 4, 4);
            } else {
                pg.text(roads[i][j], oi, oj);
            }


            // pg.circle(i, j, 6)
        })
    });

    console.log("done")
}
