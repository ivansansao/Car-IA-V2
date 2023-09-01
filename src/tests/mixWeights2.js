function randomGaussian() {
    return Math.random() - Math.random()
}

// ---- end imports 

console.log('--- 0 ---')

// 253 comes has real weigths

const sample = '1,2;3,4;5,6'
const splited = splitWeight(sample)
const joined = joinWeight(splited)
const mutad = weightSortedMap(sample, (value) => value + randomGaussian())


console.log('ANTES: ', sample)
console.log('DEPOS: ', joined)
console.log('MUTAD: ', mutad)

console.log('--- 1 ---')

const samDad = '7,8;9,0;1,1'
console.log('MOM  : ', sample)
console.log('DAD  : ', samDad)
console.log('-------------------')
console.log('SON  : ', weightRandomMixString(sample, samDad))

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

console.log('--- end ---')


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


