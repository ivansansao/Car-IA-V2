

const start = { i: 2, j: 3 }; // linha, coluna
let a = [];
let b = [];

const roads = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
];

let myWidth = 0;
let myHeight = 0;

function setup() {

    frameRate(1);

    myWidth = windowWidth * 0.98
    myHeight = windowHeight * 0.98

    createCanvas(myWidth, myHeight);


}

function draw() {

    background(255);
    showMap();
    doWave();
    showArraysAB();
}

function doWave() {

    let i = start.i;
    let j = start.j;

    a = [{ i, j, value: 0 }];
    b = [];

    let seguranca = 0;

    while (a.length > 0 && seguranca < 20) {

        for (let x = 0; x < a.length; x++) {

            const value2 = a[x].value + 1;
            const i2 = a[x].i;
            const j2 = a[x].j+1;

            if (roads[i2][j2] == 0) {
                roads[i2][j2] = value2;
                b.push({ i: i2, j: j2, value: value2 });
            }            
        }

        a.shift(0);
        
        seguranca++;
        
    }
    if (a.length > 0) console.log(b)

    stroke(255, 80, 200)

}

function showMap() {

    let h = 60;
    let w = 60;
    let rows = roads.length;
    let cols = roads[0].length;


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            const x = col * w;
            const y = row * h;

            blockPaint(x, y, w, h, roads[row][col], row, col)

            noStroke();
            fill(255, 0, 0)
            textSize(22)
            textAlign(CENTER);
            text(roads[row][col], x + (w / 2), y + (h / 2));
        }
    }

}

function blockPaint(x, y, w, h, value, row, col) {

    switch (value) {
        case -1:
            stroke(200);
            fill(220, 220, 220);
            rect(x, y, w, h);

            break;
        case 0:
            stroke(200);
            noFill();
            rect(x, y, w, h);

            break;

        case 1:
            stroke(200);
            fill(220, 180, 55);
            rect(x, y, w, h);

            break;

        default:
            break;
    }

    if (row == start.i && col == start.j) {
        stroke(0);
        fill(0, 220, 220);
        rect(x, y, w, h);

    }

}

function showArraysAB() {
    stroke(0);
    fill(0);

    textAlign(LEFT);
    text('a', myWidth-200, 20);

    for (let x = 0; x < a.length; x++) {
        const i = a[x].i;
        const j = a[x].j;
        const value = a[x].value;
        text(`${i},${j} ${value}`, myWidth-200, 20);
        
    }

}