class ManualLearning {
    static key_Up = 0
    static key_Keep = 0
    static key_Brake = 0
    static key_Reverse = 0
    static key_Dynamic = 0
    static key_Right = 0
    static key_Streight = 0
    static key_Left = 0
    static data = []

    static cleanKeys() {
        this.key_Up = 0
        this.key_Keep = 0
        this.key_Brake = 0
        this.key_Right = 0
        this.key_Streight = 0
        this.key_Left = 0
    }

    static saveManualCarStatus(car) {

        const line = [];

        line.push(car.gear);
        line.push(car.speed);

        line.push(car.getNormalizedDist(0, 200));
        line.push(car.getNormalizedDist(1, 200));
        line.push(car.getNormalizedDist(2, 200));
        line.push(car.getNormalizedDist(3, 200));
        line.push(car.getNormalizedDist(4, 200));
        line.push(car.getNormalizedDist(5, 200));

        line.push(car.getNormalizedDist(6, 200));
        line.push(car.getNormalizedDist(7, 200));
        line.push(car.getNormalizedDist(8, 200));
        line.push(car.getNormalizedDist(8, 200));
        line.push(car.getNormalizedDist(10, 200));
        line.push(car.getNormalizedDist(11, 200));
        line.push(car.getNormalizedDist(12, 200));
        line.push(car.getNormalizedDist(13, 200));
        line.push(car.getNormalizedDist(14, 200));

        line.push(car.getNormalizedDist(15, 200));
        line.push(car.getNormalizedDist(16, 200));
        line.push(car.getNormalizedDist(17, 200));
        line.push(car.getNormalizedDist(18, 200));
        line.push(car.getNormalizedDist(19, 200));

        line.push(this.key_Up)
        line.push(this.key_Keep)
        line.push(this.key_Brake)
        line.push(this.key_Reverse)
        line.push(this.key_Dynamic)
        line.push(this.key_Right)
        line.push(this.key_Streight)
        line.push(this.key_Left)



        if (!this.has(line) && this.data.length < 2000) {
            this.data.push(line)
            // console.log(this.data)
            this.showLine(this.data.length - 1)
        }

    }

    static has(inputs) {
        const el = this.data.find((e) => {
            for (let i = 0; i < e.length; i++) {
                if (e[i] !== inputs[i])
                    return false
            }
            return true
        })
        return el
    }
    static showLine(i) {
        let line = ''
        this.data[i].map((e) => {
            line += e + ";"
        })
        console.log(line)

    }
}
