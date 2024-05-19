function start() {

    background(68, 170, 0);
    handleKeyIsDown();

}

function linha() {
    stroke(0);
    line(-width, 0, width, 0);
    line(0, -height, 0, height);
}

function mx() {
    return mouseX.toFixed(0)
};
function my() {
    return mouseY.toFixed(0)
};

function lineX(a, b, c, d, strokeColor, dotted = false) {

    if (dotted) drawingContext.setLineDash([5, 5]);

    stroke(strokeColor);
    line(a, b, c, d);

    if (dotted) drawingContext.setLineDash([]);
}

function showRanhurasNormalized() {
    const pontos = pista.ranhuras;

    // console.table(pontos);

    // Normaliza.

    for (let p of pontos) {
        if (abs(p.a - p.c) < 20) {
            p.c = p.a;
        }
        if (abs(p.b - p.d) < 20) {
            p.d = p.b;
        }
    }


    let textPontos = '';

    for (const p of pontos) {
        textPontos += `    points.push({ a: ${p.a}, b: ${p.b}, c: ${p.c}, d: ${p.d}, m: ${p.m}, t: ${p.t} });\n`;
    }

    // console.table(pontos);

    console.log(textPontos);

}

function myRelu(v) {
    if (v > 0) {
        return 1
    }
    return 0;
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

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

function getHourMin() {
    const date = new Date();
    return addZero(date.getHours()) + ':' + addZero(date.getMinutes());
}

function getDateTime() {
    const date = new Date();
    return addZero(date.getDate()) + '/' + addZero(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes());
}

function oppositeBright(color) {

    const rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;

    const av = rgb.reduce((a, b) => a + b, 0) / 3;

    return av > 125 ? 0 : 255;

}

function hexToRGBArray(color) {

    if (color.length === 3)
        color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    else if (color.length !== 6)
        throw ('Invalid hex color: ' + color);
    let rgb = [];
    for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;

}

function numsNoRepeat(from, to, quantity) {

    const nums = [];

    if (from < to && to - from >= quantity) {
        let q = 0;
        while (q < quantity) {
            const newOne = Math.floor(Math.random() * (to - from + 1) + from);
            if (!nums.includes(newOne)) {
                nums.push(newOne)
                q++
            }
        }
    }

    return nums;

}

function intRandom(rMax) {
    return Number((random() * rMax).toFixed(0))
}

function createName() {
    const consoantes = 'BCDFGJKLMNPRSTVXZ';
    const vogais = 'AEIOU';
    let nome = '';
    let rand;

    for (let i = 0; i < 2; i++) {
        rand = (Math.random() * (consoantes.length - 1)).toFixed(0);
        nome = nome + consoantes[rand];
        rand = (Math.random() * (vogais.length - 1)).toFixed(0);
        nome = nome + vogais[rand];
    }
    return nome;
}

function round3(numb) {
    return Math.round(numb * 1000) / 1000
}



// ----- 

function splitWeight(str = '') {
    str = str.replace(/;/g, ',null,')
    return str.split(',')
}
function joinWeight(arr = []) {
    const str = arr.join(',').replace(/,null,/g, ';')
    return str
}

function weightSortedMap(strWeigths, action, maxMutations) {

    const arrWeight = splitWeight(strWeigths)
    const total = arrWeight.length
    maxMutations = maxMutations ? maxMutations : total - 2

    for (let m = 0; m < maxMutations; m++) {

        for (let x = 0; x < 999; x++) {
            const sorted = Math.round(Math.random() * (total - 1))
            if (arrWeight[sorted] !== 'null') {
                arrWeight[sorted] = action(Number(arrWeight[sorted]), sorted)
                break
            }
        }

    }

    return joinWeight(arrWeight)
}

// ---

function weightRandomMixString(mom = '', dad = '') {

    const arrMom = splitWeight(mom)
    const arrDad = splitWeight(dad)
    const arrSon = []

    for (let i = 0; i < arrMom.length; i++) {
        if (Math.random() > 0.5) {
            arrSon.push(arrMom[i])
        } else {
            arrSon.push(arrDad[i])
        }
    }

    return joinWeight(arrSon)

}

function feeling(dist) {


    // dist = dist > 300 ? 300 : dist

    if (dist == 0) {
        return 0.00
    }

    // return Number(map(dist, 0, 300, 0.01, 2.00).toFixed(2))
    return (dist / 100).toFixed(2)

}

function distToFibonacci(dist) {

    if (dist < 5) {
        return 0.0
    } else if (dist < 10) {
        return 0.1
    } else if (dist < 15) {
        return 0.2
    } else if (dist < 25) {
        return 0.3
    } else if (dist < 40) {
        return 0.4
    } else if (dist < 65) {
        return 0.5
    } else if (dist < 105) {
        return 0.6
    } else if (dist < 170) {
        return 0.7
    } else if (dist < 275) {
        return 0.8
    } else if (dist < 445) {
        return 0.9
    } else {
        return 1.0
    }
}