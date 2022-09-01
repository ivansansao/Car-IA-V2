let pesoG = '-0.16185849905014038,-0.04437238723039627';
let pesoM = '3.5740511417388916,4.524637699127197';

pesoG = pesoG.replace(/;/g, ',@,');
pesoM = pesoM.replace(/;/g, ',@,');

const arrayPesoG = pesoG.split(',');
const arrayPesoM = pesoM.split(',');

let iM = arrayPesoM.length - 1;

for (let i = arrayPesoG.length - 1; i >= 0; i--) {

    if (arrayPesoM[iM] == undefined)
        break;

    if (arrayPesoG[i] != 0 && arrayPesoM[iM] != 0 && arrayPesoG[i] != '@' && arrayPesoM[iM] != '@')
        arrayPesoG[i] = arrayPesoM[iM];

    iM--;

}

let newPesoG = arrayPesoG.toString().replace(/,@,/g, ';');

console.log(newPesoG)