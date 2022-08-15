const start = { i: 2, j: 3, value: 0 };
let path = [];
let a = [start];
let b = [];
let h = 60;
let w = 60;
let bot = {};

const world = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, -1, +0, +0, +0, -1, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, -1],
    [-1, -1, -1, -1, -1, +0, +0, +0, -1, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, -1, -1, -1, +0, -1, -1, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, -1, +0, +0, +0, +0, -1, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, -1, +0, -1, -1, -1, -1, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, -1, -1, -1, -1, -1, +0, +0, +0, +0, +0, -1],
    [-1, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, +0, -1, +0, +0, -1, +0, +0, +0, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
];

function mouseClicked(retorno) {

    const cell = getMouseCell();

    if(mouseButton === RIGHT) {
        if (world[cell.i][cell.j] == -1) {
            world[cell.i][cell.j] = 0;
        } else {
            world[cell.i][cell.j] = -1;
        }

        path = [];

        let rows = world.length;
        let cols = world[0].length;
    
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (world[row][col] > 0) {
                    world[row][col] = 0;
                }
            }
    
        }

        waveFront();
    } else if (mouseButton === LEFT) {

        if (cell) {
            bot = cell;
            path = [bot];
        }

    }

    return retorno

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60)
}

function draw() {

    if (frameCount == 1) {
        background(255);
        showWorld();
        waveFront();
    } else if (frameCount > 2) {

        background(255);
        showWorld();

        const cell = getMouseCell();

        if (cell) {

            sayRect(stroke(200), fill(255, 255, 100), cell.j * h, cell.i * w, w, h);
            sayText(cell.value, noStroke(), fill(255, 0, 0), cell.j * h, cell.i * w, w, h)
        }

        moveBot();

        showPath();

    }

}

function showPath() {

    for (const cell of path) {
        sayRect(stroke(200), fill(255, 200, 200), cell.j * h, cell.i * w, w, h);
        sayText(cell.value, noStroke(), fill(255, 0, 0), cell.j * h, cell.i * w, w, h)
    
    }

}

function getBotNeiborhoods() {

    const neib = [];
    let i, j, value;
    
    if (bot) {

        i = bot.i;
        j = bot.j + 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i + 1;
        j = bot.j + 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i + 1;
        j = bot.j;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i + 1;
        j = bot.j - 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i;
        j = bot.j - 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i - 1;
        j = bot.j - 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i - 1;
        j = bot.j;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

        i = bot.i - 1;
        j = bot.j + 1;
        if (world[i] && world[i][j] != undefined && world[i][j] > -1) neib.push({ i, j, value: world[i][j] });

    }

    return neib;
}

function moveBot() {

    if (bot) {
        if (frameCount % 5 == 0) {

            const neibs = getBotNeiborhoods();

            // Get lestest value;
            let minor = { i: undefined, j: undefined, value: Infinity };

            for (let i = 0; i < neibs.length; i++) {
                if (neibs[i].value < minor.value) {
                    minor = neibs[i];
                }
            }

            if (world[bot.i] && world[bot.i][bot.j] < minor.value) {
                minor = bot;
            }

            if (minor.i != undefined) {
                bot = minor;
            }

            path.push(bot);

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

    a = [start];

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

    textSize(h*0.30)
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

    if (bot) {
        sayRect(stroke(0), fill(200, 200, 255), bot.j * w, bot.i * h, w, h);
        sayText(bot.value, noStroke(), fill(0, 0, 255), bot.j * w, bot.i * h, w, h)
    }

}

function sayRect(stroke, fill, x, y, w, h) {
    rect(x, y, w, h);
}

function sayText(tex, stroke, fill, x, y, w, h) {
    text(tex, x + (w / 2), y + (h / 2));
}

