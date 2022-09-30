// Sample

let pessoas = ['Ivan', 'Tita', 'Ana']

let [a, b] = pessoas

console.log(a, b) // Ivan Tita

// Sample

let [i, j] = [1, 8];
[i, j] = [j, i];
console.log(i, j);

// Sample 

class sensor {
    constructor() {
        this.caption = 'The sensor'
        this.x = 100
        this.y = 300
        this.r = 20
    }

}

let Sensor = new sensor();

let { caption, r } = Sensor

console.log(caption, r) // The sensor 20