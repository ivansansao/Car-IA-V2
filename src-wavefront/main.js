const start = { i: 2, j: 3, value: 0 }; // linha, coluna, valor
let a = [start];
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
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, -1],
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
}

function doWave() {

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
            if (roads[i][j] == 0) {
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
            break;
        case 0:
            stroke(200);
            fill(255);
            break;

        default:
            stroke(200);
            noFill();
            break;
    }
    rect(x, y, w, h);

    if (row == start.i && col == start.j) {
        stroke(0);
        fill(0, 220, 220);
        rect(x, y, w, h);

    }

}
