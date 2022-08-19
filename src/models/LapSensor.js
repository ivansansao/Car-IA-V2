class LapSensor {
    constructor() {
        this.pos = createVector(600, 70);
        this.width = 20;
        this.height = 80;
    }
    show() {
        noStroke();
        fill(120)
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }
}