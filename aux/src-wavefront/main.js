const start = { i: 2, j: 3, value: 0 };
let a = [start];
let b = [];

const map = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, -1, -1, -1, -1, -1, -1, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, -1, -1, -1, -1, -1, -1, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, -1, -1, -1, -1, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    if (frameCount == 1) {
        background(255);
        showMap();
        waveFront();
    } else if (frameCount == 200) {
        background(255);
        showMap();
    }

}

function waveFront() {

    let value;
    let i;
    let j;

    while (a.length > 0) {

        for (let x = 0; x < a.length; x++) {

            value = a[x].value + 1;

            i = a[x].i;
            j = a[x].j + 1;
            if (map[i][j] == 0) {
                // Discovery new node.
                map[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i + 1;
            j = a[x].j;
            if (map[i][j] == 0) {
                // Discovery new node.
                map[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i;
            j = a[x].j - 1;
            if (map[i][j] == 0) {
                // Discovery new node.
                map[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i - 1;
            j = a[x].j;
            if (map[i][j] == 0) {
                // Discovery new node.
                map[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

        }

        a = [...b];
        b = [];

    }

    map[start.i][start.j] = 0;

}

function showMap() {

    let h = 60;
    let w = 60;
    let rows = map.length;
    let cols = map[0].length;

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            const x = col * w;
            const y = row * h;

            showBlock(x, y, w, h, map[row][col], row, col)

        }

    }

}

function showBlock(x, y, w, h, value, row, col) {

    textSize(22)
    textAlign(CENTER);

    if (row == start.i && col == start.j) {

        sayRect(stroke(200), fill(255), x, y, w, h);
        sayText(map[row][col], noStroke(), fill(0, 0, 255), x, y, w, h)

    } else if (value == -1) {
        
        sayRect(stroke(200), fill(220, 220, 220), x, y, w, h);
        sayText(map[row][col], noStroke(), fill(140, 140, 140), x, y, w, h)

    } else if (value == 0) {

        sayRect(stroke(200), fill(255), x, y, w, h);
        sayText(map[row][col], noStroke(), fill(255, 0, 0), x, y, w, h)

    } else {

        sayRect(stroke(200), noFill(), x, y, w, h);
        sayText(map[row][col], noStroke(), fill(255, 0, 0), x, y, w, h)
    }
    
}

function sayRect(stroke, fill, x, y, w, h) {
    rect(x, y, w, h);
}

function sayText(tex, stroke, fill, x, y, w, h) {
    text(tex, x + (w / 2), y + (h / 2));
}