class LapSensor {
    constructor(name, x, y, onHit) {
        this.name = name;
        this.pos = createVector(x, y);
        this.width = 10;
        this.height = 80;
        this.onHit = onHit;
        this.whos = [];
        this.color = 120;

    }
    hit(who, cx, cy, cdia) {

        const hit = circRect(cx, cy, cdia / 2, this.pos.x, this.pos.y, this.width, this.height);        

        if (hit) {

            if (!this.whos.includes(who)) {

                this.whos.push(who);

                const where = this.nearestLine(cx, cy);

                if (typeof this.onHit == 'function') {
                    this.onHit(who, this, where, true);
                }

            }

        } else {

            if (this.whos.includes(who)) {

                this.whos = this.whos.filter((e) => e != who) // Delete specific object from array!
                
                const where = this.nearestLine(cx, cy);

                if (typeof this.onHit == 'function') {
                    this.onHit(who, this, where, false);
                }

            }
        }

        return hit
    }
    nearestLine(x, y) {

        const disL = abs(this.pos.x - x)
        const disR = abs(this.pos.x + this.width - x)
        const disT = abs(this.pos.y - y)
        const disB = abs(this.pos.y + this.height - y)

        let locals = '';

        locals += (disR < disL) ? 'R' : 'L';
        locals += (disT < disB) ? 'T' : 'B';

        return locals

    }

    show() {
        noStroke();
        fill(this.color);
 
        rect(this.pos.x, this.pos.y, this.width, this.height, 4)
    }

}