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
    
    
    floodFillRec(90, 90, 0, 1);
    showRoads();
    frameRate(1)
    

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

    waveFront();

}

function makeMatrixRoads() {

    console.log("Making matrix")

    noStroke();

    let pixelIndex, r, g, b, avg;
    let contador = 0;
    spritesheet.loadPixels();
    roads = [];

    for (let i = 0; i < spritesheet.width; i += 10) {

        roads[i] = [];
        for (let j = 0; j < spritesheet.height; j += 10) {

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

            if (contador > 800) {
                i = Infinity;
                j = Infinity;
            }

        }
    }

    // const pontoInicial = createVector(96,84);    
    // roads[pontoInicial.x][pontoInicial.y] = 2;

    console.log('contador: ' + contador);
    console.log("Done")
}

function waveFront() {

    const pontoInicial = createVector(96,84);
    const un = 12;    

    noStroke();
    textSize(8);
    fill(255,0,0);    
    
    circle(pontoInicial.x,pontoInicial.y,6)
    // text(roads[pontoInicial.x][pontoInicial.y],pontoInicial.x, pontoInicial.y);
    // text(roads[pontoInicial.x][pontoInicial.y+un],pontoInicial.x, pontoInicial.y+un);
    
}

function showRoads() {

    console.log("Showing")

    pg.noStroke();
    pg.textSize(5);
    pg.fill(0);

    roads.forEach((subArray, i) => {
        subArray.forEach((e, j) => {
            // pg.square(i, j, 6);
            
            if (e == '0') {
                pg.fill(0)
            } else {
                pg.fill(0, 0, 255)
            }
            pg.text(roads[i][j], i, j);

            // pg.circle(i, j, 6)
        })
    });

    console.log("done")
}


function floodFillRec(i, j, oldValue, newValue) {
  
    // Check the boundary condition
    if (i < 0 || i >= roads.length || j < 0 || j >= roads[i].length) return;
    if (roads[i][j] !== oldValue) return;
  
    // set the color of node to newValue
    roads[i][j] = newValue;
  
    // Look for neighboring cell
    floodFillRec(i + 10, j, oldValue, roads[i][j]+1);
    floodFillRec(i - 10, j, oldValue, roads[i][j]+1);
    floodFillRec(i, j + 10, oldValue, roads[i][j]+1);
    floodFillRec(i, j - 10, oldValue, roads[i][j]+1);

  }
