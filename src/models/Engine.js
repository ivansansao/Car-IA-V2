class EngineSound {
    constructor() {
        this.started = false;
    }

    start() {

        if (!this.started) {

            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.freq = { step: 0, min: 50, max: 121 };

            let gain = this.audioCtx.createGain();
            this.osc = this.audioCtx.createOscillator()
            this.osc.connect(gain);

            gain.connect(this.audioCtx.destination);
            this.osc.type = "sine";
            this.osc.frequency.value = this.freq.min;
            gain.value = 0.0;
            this.osc.start();

            this.started = true;

        }

    }

    setFrequency(frequency) {
        if (this.started) {
            this.osc.frequency.value = frequency;
        }
    }
    stop() {
        if (this.started) {
            if (this.osc) {
                this.osc.stop();
                this.osc = null;               
                this.started = false;
                this.audioCtx = null;
            }
        }
    }
}



class EngineTone {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.freq = { step: 0, min: 20, max: 121 };
        this.intervalId;

    }

    up() {
        let self = this;

        let gain = this.audioCtx.createGain();
        this.osc = this.audioCtx.createOscillator()
        this.osc.connect(gain);

        gain.connect(this.audioCtx.destination);
        this.osc.type = "sawtooth";
        this.osc.frequency.value = this.freq.min + 0;
        gain.value = 0.0;
        this.osc.start();

        this.intervalId = setInterval(function () {
            let currFreq = self.osc.frequency.value;

            if ((self.freq.step < 0 && currFreq > self.freq.min) ||
                (self.freq.step > 0 && currFreq < self.freq.max)) {
                self.osc.frequency.value += self.freq.step;
            }
        }, 40);
    }
    turnOff() {
        if (this.osc) {
            this.osc.stop();
            this.osc = null;
            clearInterval(this.intervalId);
        }
    }
}