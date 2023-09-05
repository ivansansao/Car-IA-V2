class Scoreboard {
    constructor() {
        this.cars = [];
        this.mouseOver = false;
        this.mouseOff = null;
        this.width = 950;
        this.rowHeight = 25;
        this.rows = 10;
        this.height = 75 + (this.rowHeight * this.rows);
        this.marginTop = 30
        this.marginLeft = 14
        this.widths = [30, 60, 120, 80, 50, 60, 320, 245, 150]
        this.centerize();
    }
    centerize() {

        this.width = this.getCol(this.widths.length)

        const top = ((windowHeight + this.height) / 2) - this.height;
        const left = ((windowWidth + this.width) / 2) - this.width;
        this.move(top, left);
    }
    move(top, left) {
        this.top = top;
        this.left = left;

        this.cols = [14, 40, 120, 190, 290, 350, 430, 600, 780].map(e => this.left + e);
        this.nextColCount = 0;
    }
    update() {

        if (frameCount % 200 == 0) {

            this.cars = [];
            // cars.sort((a, b) => (a.ranking() < b.ranking() ? 1 : -1))
            genetic.classifyCars()
            for (let i = 0; i < min(cars.length, this.rows); i++) {
                const car = cars[i];
                this.cars.push({
                    id: car.id,
                    lap: car.lap,
                    km: pista.trackSize - car.km,
                    mut: car.ia.mutated,
                    vm: car.humanVm(),
                    cor: car.cor,
                    marca: car.marca,
                    alive: car.batido ? 'X' : '',
                    mn: car.ia.mutatedNeurons.substring(0, 30),
                    ranking: car.ranking(),
                    crc: crc32(car.ia.showWeights(true)),
                    parent: car.parent,
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
    getCol(c) {
        let sumWidth = this.widths[0]

        for (let i = 0; i < min(c, this.widths.length); i++) {
            sumWidth += this.widths[i]
        }

        return sumWidth

    }
    resetNextColLeft() {
        this.nextColCount = 0
    }
    getNextColLeft() {

        const c = this.left + this.marginLeft - this.getCol(0) + this.getCol(this.nextColCount)
        this.nextColCount++

        return c

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
        this.resetNextColLeft()
        text('', this.getNextColLeft(), row);
        text('POS', this.getNextColLeft(), row);
        text('CARRO', this.getNextColLeft(), row);
        text('KM', this.getNextColLeft(), row);
        text('VM', this.getNextColLeft(), row);
        text('MUT', this.getNextColLeft(), row);
        text('MUTAÇÕES', this.getNextColLeft(), row);
        text('CHAVE', this.getNextColLeft(), row);
        text('CRC-PESOS', this.getNextColLeft(), row);

        // Table.        
        row += this.rowHeight;
        textSize(18);
        stroke(100);


        for (let i = 0; i < this.cars.length; i++) {
            icol = 0;
            const car = this.cars[i];
            fill(car.cor);
            row += this.rowHeight;
            const sup = car.parent

            this.resetNextColLeft()
            text(car.alive, this.getNextColLeft(), row);
            text(i + 1 + "º", this.getNextColLeft(), row);
            text(car.marca + car.id + '|' + sup, this.getNextColLeft(), row);
            text((car.lap > 0 ? '(' + car.lap + ') ' : '') + car.km, this.getNextColLeft(), row);
            text(car.vm, this.getNextColLeft(), row);
            text(car.mut, this.getNextColLeft(), row);
            text(car.mn, this.getNextColLeft(), row);
            text(car.ranking, this.getNextColLeft(), row);
            text(car.crc, this.getNextColLeft(), row);
        }

        textAlign(LEFT);

    }

}