class Scoreboard {
    constructor() {
        this.cars = [];
        this.mouseOver = false;
        this.mouseOff = null;
        this.width = 600;
        this.height = 250;
        this.rowHeight = 25;
        this.centerize();
    }
    centerize() {
        const top = ((windowHeight + this.height) / 2) - this.height;
        const left = ((windowWidth + this.width) / 2) - this.width;

        console.log(top, left);

        this.move(top, left);
    }
    move(top, left) {
        this.top = top;
        this.left = left;
        this.cols = [14, 40, 100, 200, 280, 350, 430].map(e => this.left + e);
    }
    update() {

        if (frameCount % 200 == 0) {

            this.cars = [];
            cars.sort((a, b) => (a.ranking() < b.ranking() ? 1 : -1));
            for (let i = 0; i < min(cars.length, 7); i++) {
                const car = cars[i];
                this.cars.push({
                    id: car.id,
                    lap: car.lap,
                    km: car.km,
                    mut: car.ia.mutated,
                    vm: map(car.getAverageSpeed(),0,3.5,0,100).toFixed(0),
                    cor: car.cor,
                    marca: car.marca,
                    alive: car.batido ? 'X' : '',
                    mn: car.ia.mutatedNeurons.substring(0,18)
                })
            }
        }

        this.mouseOver = false;

        if (mouseX >= this.left && mouseX <= this.left + this.width) {
            if (mouseY >= this.top && mouseY <= this.top + this.height) {
                this.mouseOver = true;
                if (mouseIsPressed) {
                    if (this.mouseOff == null) {
                        this.mouseOff = createVector(mouseX - this.left, mouseY - this.top);
                    }
                } else {
                    this.mouseOff = null
                }
            }
        }
        if (this.mouseOff) {
            this.move(mouseY - this.mouseOff.y, mouseX - this.mouseOff.x)
        }



    }
    show() {

        let row = this.top + 30;
        let icol = 0;

        strokeWeight(1)
        stroke(100);

        if (this.mouseOff)
            fill(255, 255, 255, 100);
        else
            if (this.mouseOver) {
                fill(255);
            } else {
                fill(255, 255, 255, 200);
            }

        rect(this.left, this.top, this.width, this.height, 4);

        // Title.
        textAlign(LEFT);
        textSize(20);
        noStroke();
        fill(125);
        textStyle('bold')
        text('', this.cols[icol++], row);
        text('POS', this.cols[icol++], row);
        text('CARRO', this.cols[icol++], row);
        text('KM', this.cols[icol++], row);
        text('KM/H', this.cols[icol++], row);
        text('MUT', this.cols[icol++], row);
        text('MUTAÇÕES', this.cols[icol++], row);

        // Table.        
        row += this.rowHeight;
        textSize(20);
        stroke(100);

        for (let i = 0; i < this.cars.length; i++) {
            icol = 0;
            const car = this.cars[i];
            fill(car.cor);
            row += this.rowHeight;
            text(car.alive, this.cols[icol++], row);
            text(i + 1 + "º", this.cols[icol++], row);
            text(car.id + ' ' + car.marca, this.cols[icol++], row);
            text(car.km + (car.lap > 0 ? ' (' + car.lap + ')' : ''), this.cols[icol++], row);
            text(car.vm, this.cols[icol++], row);
            text(car.mut, this.cols[icol++], row);
            text(car.mn, this.cols[icol++], row);
        }

        textAlign(LEFT);

    }

}