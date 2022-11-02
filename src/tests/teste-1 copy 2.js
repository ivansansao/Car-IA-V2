class Bike {
    constructor(id) {
        this.id = id;
        this.rank = 0
    }
    ranking() {
        this.rank = String(Math.random() * 15);
        return this.rank;
    }
}

let bikes = [];

bikes.push(new Bike("bia"));
bikes.push(new Bike("ana"));
bikes.push(new Bike("car"));

// const points = [40, 100, 1, 5, 25, 10];
// points.sort(function(a, b){return a - b});

bikes.sort((a, b) => (a.ranking() > b.ranking() ? 1 : -1));

console.log(bikes)