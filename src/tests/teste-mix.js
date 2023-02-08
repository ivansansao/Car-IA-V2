let crc32 = function (r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++)a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; o[c] = a } for (var n = -1, t = 0; t < r.length; t++)n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return (-1 ^ n) >>> 0 };

reproduceMixing('a', 'b')
reproduceMixing('a,b', 'a,3')
reproduceMixing('a,b,c', 'a,b,3')
reproduceMixing('a,b,c,d', '1,2,3,4')
reproduceMixing('a,b,c,d', 'd,c,b,a')
reproduce('a,b,c', ['a,2,c', 'a,b,3'])

function reproduce(anc = '', rep = []) {

    console.log('Reproduzindo... ', crc32(anc), ' with: ', crc32(rep[0]))

    let son = '@';
    const arrRep = [];
    const arrAnc = anc.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });

    for (const r of rep) {
        arrRep.push(r.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() }));
    }

    for (let i = 0; i < arrAnc.length; i++) {

        let gen = arrAnc[i];

        for (let r = 0; r < arrRep.length; r++) {
            const genRep = arrRep[r][i];
            if (gen != genRep) {
                gen = genRep;
                break;
            }
        }

        son += ',' + gen;

    }

    son = son.replace(/@,/g, '');
    son = son.replace(/;,/g, ';');

    console.log('anc   ', anc)
    for (let i = 0; i < rep.length; i++) {
        console.log(`rep[${i}]`, rep[i])
    }
    console.log('son   ', son)
    console.log('Filho ', crc32(son))

    return son;

}

function reproduceMixing(anc = '', rep = '') {
    console.log('')

    const arrAnc = anc.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });
    const arrRep = rep.replace(/;/g, ';,').split(',').map((e) => { return e.toString().trim() });

    let son = anc;
    let part1 = 0
    let part2 = 0

    while ((part1 == 0 || part2 == 0) && arrAnc.length > 1 && arrRep.length > 1) {

        son = '@';

        for (let i = 0; i < arrAnc.length; i++) {

            if (Math.random() > 0.49 && arrRep[i] != undefined) {
                son += ',' + arrRep[i];
                part1++
            } else {
                son += ',' + arrAnc[i];
                part2++
            }
        }

        son = son.replace(/@,/g, '');
        son = son.replace(/;,/g, ';');


    }

    console.log('anc', anc)
    console.log('rep', rep)
    console.log('---------')
    console.log('son', son)

    return son;
}