class Scoreboard {
    constructor() {
        this.cars = [];
        this.mouseOver = false;
        this.mouseOff = null;
        this.width = 400;
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
        this.cols = [14, 80, 180, 250, 320].map(e => this.left + e);
    }
    update() {

        if (frameCount % 50 == 0) {

            this.cars = [];
            cars.sort((a, b) => (a.ranking() < b.ranking() ? 1 : -1));
            for (let i = 0; i < min(cars.length, 7); i++) {
                const car = cars[i];
                this.cars.push({
                    id: car.id,
                    km: car.km,
                    mut: car.ia.mutated,
                    vm: car.getAverageSpeed().toFixed(4),
                    cor: car.cor,
                    marca: car.marca
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
        text('POS', this.cols[0], row);
        text('CARRO', this.cols[1], row);
        text('KM', this.cols[2], row);
        text('MUT', this.cols[3], row);
        text('VM', this.cols[4], row);

        // Table.
        row += this.rowHeight;
        textSize(20);
        stroke(100);


        for (let i = 0; i < this.cars.length; i++) {
            const car = this.cars[i];
            fill(car.cor);
            row += this.rowHeight;
            text(i + 1 + "º", this.cols[0], row);
            text(car.id +' '+car.marca, this.cols[1], row);
            text(car.km, this.cols[2], row);
            text(car.mut, this.cols[3], row);
            text(car.vm, this.cols[4], row);
        }

        textAlign(LEFT);

    }

}