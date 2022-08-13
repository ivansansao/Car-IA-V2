const start = { i: 2, j: 3, value: 0 };
let a = [start];
let b = [];
let h = 60;
let w = 60;
let bot = {};

const world = [
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

function mouseClicked() {

    const cell = getMouseCell();

    if (cell) {
        bot = cell;
        console.log(getNeiborhoods());
    }

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(20)
}

function draw() {

    if (frameCount == 1) {
        background(255);
        showWorld();
        waveFront();
    } else if (frameCount > 20) {

        background(255);
        showWorld();

        const cell = getMouseCell();

        if (cell) {

            text(`${bot.value}  ${mouseX},${mouseY} [${cell.i},${cell.j}]`, width - 100, 20);
            sayRect(stroke(200), fill(255, 200, 200), cell.j * h, cell.i * w, w, h);
            sayText(cell.value, noStroke(), fill(255, 0, 0), cell.j * h, cell.i * w, w, h)
        }

        moveBot();

    }

}

function getNeiborhoods() {
    const neib = [];
    let i, j, value;

    if (bot) {

        i = bot.i;
        j = bot.j + 1;
        if (world[i][j])
            neib.push({ i, j, value: world[i][j] });
        else
            neib.push({});

        i = bot.i + 1;
        j = bot.j;
        if (world[i])
            neib.push({ i, j, value: world[i][j] });
        else
            neib.push({});


        i = bot.i;
        j = bot.j - 1;
        if (world[i][j])
            neib.push({ i, j, value: world[i][j] });
        else
            neib.push({});

        i = bot.i - 1;
        j = bot.j;
        if (world[i])
            neib.push({ i, j, value: world[i][j] });
        else
            neib.push({});


    }

    return neib;
}

function moveBot() {

    if (bot) {
        if (frameCount % 10 == 0) {

            let lessCell;


        }
    }

}


function getMouseCell() {

    let mouseCell = {};

    const mapI = floor(map(mouseY, 0, h * w, 0, h));
    const mapJ = floor(map(mouseX, 0, h * w, 0, h));

    if (world[mapI]) {

        if (world[mapI][mapJ] != undefined) {

            mouseCell = { i: mapI, j: mapJ, value: world[mapI][mapJ] };

        }

    }

    return mouseCell;
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
            if (world[i][j] == 0) {
                // Discovery new node.
                world[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i + 1;
            j = a[x].j;
            if (world[i][j] == 0) {
                // Discovery new node.
                world[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i;
            j = a[x].j - 1;
            if (world[i][j] == 0) {
                // Discovery new node.
                world[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i - 1;
            j = a[x].j;
            if (world[i][j] == 0) {
                // Discovery new node.
                world[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

        }

        a = [...b];
        b = [];

    }

    world[start.i][start.j] = 0;

}

function showWorld() {

    let rows = world.length;
    let cols = world[0].length;

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            const x = col * w;
            const y = row * h;

            showBlock(x, y, w, h, world[row][col], row, col)

        }

    }

}

function showBlock(x, y, w, h, value, row, col) {

    textSize(22)
    textAlign(CENTER);

    if (row == start.i && col == start.j) {

        sayRect(stroke(200), fill(255), x, y, w, h);
        sayText(world[row][col], noStroke(), fill(0, 0, 255), x, y, w, h)

    } else if (value == -1) {

        sayRect(stroke(200), fill(220, 220, 220), x, y, w, h);
        sayText(world[row][col], noStroke(), fill(140, 140, 140), x, y, w, h)

    } else if (value == 0) {

        sayRect(stroke(200), fill(255), x, y, w, h);
        sayText(world[row][col], noStroke(), fill(255, 0, 0), x, y, w, h)

    } else {

        sayRect(stroke(200), noFill(), x, y, w, h);
        sayText(world[row][col], noStroke(), fill(255, 0, 0), x, y, w, h)
    }

}

function sayRect(stroke, fill, x, y, w, h) {
    rect(x, y, w, h);
}

function sayText(tex, stroke, fill, x, y, w, h) {
    text(tex, x + (w / 2), y + (h / 2));
}

