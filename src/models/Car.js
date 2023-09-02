class Car {

    constructor({ elitism, marca, parent, inteligente, randomHeading, f1, f2, priority }) {

        this.priority = priority | random(0, 50).toFixed(0)
        this.elitism = elitism | false;
        this.pos = pista.localNascimento.copy();
        this.lastPos = createVector();
        this.ray = 10;
        this.heading = randomHeading ? random(360) : pista.anguloNascimento;
        this.rotation = 0;
        this.cor = 'hsla(' + Math.floor(Math.random() * 360) + ',100%,50%,0.8)';
        this.volanteAngle = '';
        this.ia = new RedeNeural({ f1, f2 });
        this.inteligente = (inteligente === undefined) ? true : inteligente;;
        this.batido = false;
        this.timer = 0;
        this.rightDoorAngle = 0;
        this.leftDoorAngle = 0;
        this.lastKmVerified = 0;
        this.step = 0; // Length of step or moviment of car
        this._marca = marca || '?';
        this.parent = parent || '';
        this.aliveTime = 0;
        this.updates = 0;
        this.showSensorValue = false;
        this.qtdReh = 0;
        this.ranhurasColetadas = [];
        this.id = newCarId();
        this.luzes = true;
        this.lapCount = 0;
        this.showInfo = false;
        this.speed = 0;
        this.gear = 0; // -1 Reverse, 1 Dinamic
        this.braking = false;
        this.acceleration = '';
        this.demo = new Demo();
        this.rays = [];
        this.rayMaxLength = 0;
        this.showRays = false;
        this.lap = 0;
        this.engineSound = new EngineSound();
        this.deadWayType = { crashed: 0, stopped: 1, endOfTime: 2, offTrack: 3 };
        this.deadWay = undefined;
        this.normalDead = false;
        this.accHistory = [];
        this.initialTime = frameCount;
        this.finalTime = this.initialTime;
        this.km = Infinity
        this.lastKm = Infinity
        this.kmMax = 0;
        this.kmMin = 0;
        this.kmMMCount = 0;
        this.palette = [
            { name: 'verde água', cor: 157 },
            { name: 'azul água', cor: 186 },
            { name: 'amarelo', cor: 60 },
            { name: 'rosa', cor: 321 },
            { name: 'azul', cor: 219 },
            { name: 'roxo', cor: 269 },
        ];

        if (this.pos.x == -1) {
            this.pos = createVector(random(20, 1700), random(20, 800));
        }

        for (let i = 0; i < 360; i += 18) {
            this.rays.push(new Ray(this.pos.copy(), 20, radians(i), this.showRays));

        }
        // for (let i = 270; i < 450; i += 9) {
        //     this.rays.push(new Ray(this.pos.copy(), 20, radians(i), this.showRays));

        // }

        this.setColor();
        this.drawedDead = false;
        this.outLapCount = 0

    }

    get marca() {
        return this._marca
    }

    set marca(value) {
        this._marca = value
        this.setColor();
    }

    addAccHistory(action) {

        const last = this.accHistory[this.accHistory.length - 1];

        if (last != action) {
            this.accHistory.push(action);
        }

    }

    openDoor(door, much) {
        if (door == 'L') {
            this.leftDoorAngle = much;
        } else if (door == 'R') {
            this.rightDoorAngle = much;
        }
    }

    isParent() {
        const mark = this.marca.toLowerCase()
        return (mark[0] == 'c' || mark[0] == 'x');
    }

    setColor(corIndex) {

        if (this.elitism) {
            this.cor = 'rgb(255,255,255)';
        } else {

            let indexColor = 0;

            if (corIndex) {
                indexColor = this.palette[corIndex - 1].cor;
            } else {

                if (this.ia.mutated <= this.palette.length && this.ia.mutated > 0) {
                    indexColor = this.palette[this.ia.mutated - 1].cor;
                } else {

                    let indexMut = this.ia.mutated;
                    if (indexMut > 20) indexMut = 20;
                    indexColor = Math.floor(map(indexMut, 0, 20, 15, 300));
                }
            }

            this.cor = 'hsla(' + indexColor + ',100%,50%,1)';
        }
    }

    think(inputs) {

        if (!this.batido && this.inteligente) {

            /*
                0 - Up
                1 - Keep
                2 - Brake
                3 - Reverse
                4 - Dynamic
                5 - Right
                6 - Streight
                7 - Left
            */

            let resposta = this.ia.pensar(inputs);
            let maiorI;
            let maiorR;

            // Defines the speed.

            maiorI = 0;
            maiorR = -Infinity;

            for (let i = 0; i <= 2; i++) {
                if (resposta[i] > maiorR) {
                    maiorR = resposta[i]
                    maiorI = i
                }
            }

            if (maiorI == 0) {
                this.speedUp();
            } else if (maiorI == 1) {
                this.speedNoAction();
            } else if (maiorI == 2) {
                this.brake();
            }

            // Defines the gear.

            if (resposta[3] < resposta[4]) {
                this.engageDinamic(); // Marcha D
            } else {
                this.engageReverse(); // Marcha R
            }

            // Defines the direction.

            maiorI = 0;
            maiorR = -Infinity;
            for (let i = 5; i <= 7; i++) {
                if (resposta[i] > maiorR) {
                    maiorR = resposta[i];
                    maiorI = i;
                }
            }
            if (maiorI == 5) {
                this.vaiPraDireita();
            } else if (maiorI == 6) {
                this.vaiReto();
            } else if (maiorI == 7) {
                this.vaiPraEsquerda();
            }


            // End

            // this.ia.selectedOutput = maiorI;

        }
    }

    randomizePos() {
        this.pos = createVector(random(20, windowWidth), random(20, windowHeight));;
    }

    speedUp() {
        if (this.gear != 0) {

            this.speed += 0.005;

            if (this.gear == 1) {
                // Limita a velocidade pra frente em 2
                if (this.speed > 2) {
                    this.speed = 2;
                }
            } else {

                // Limita a velocidade da ré em 0.5
                if (this.speed > 0.5) {
                    this.speed = 0.5;
                }
            }

            this.acceleration = 'up';
            this.braking = false;
        }

        this.setEngineSound();
        this.speed = round3(this.speed)

    }

    freeSpeedUp() {

        if (this.speed > 0) {
            this.speed -= 0.004;
            if (this.speed < 0) {
                this.speed = 0;
            }
        }

        this.acceleration = 'down';
        this.braking = false;

        this.setEngineSound();
        this.speed = round3(this.speed)

    }

    setEngineSound() {
        if (this.isParent()) {
            if (world.engineSound) {
                this.engineSound.start();
                const freq = map(this.speed, 0, 2, 30, 50)
                this.engineSound.setFrequency(freq);
            }
        }

    }

    brake() {

        this.speed -= 0.04;
        if (this.speed < 0) {
            this.speed = 0;
        }

        this.braking = true;
        this.acceleration = 'down';
        this.setEngineSound();
        this.speed = round3(this.speed)

    }

    speedNoAction() {
        this.acceleration = '';
        this.braking = false;
    }

    vaiPraDireita() {

        if (this.speed > 0) {

            if (this.speed < 0.1) {
                if (this.gear == 1) { // Dynamic
                    this.rotation = this.speed * 0.4; // this.speed * 0.4
                } else if (this.gear == -1) {// Reverse
                    this.rotation = -this.speed * 0.4;
                }
            } else {
                if (this.gear == 1) {
                    this.rotation = 0.1;
                } else if (this.gear == -1) {
                    this.rotation = -0.1;
                }

            }

        }

        this.volanteAngle = this.volanteAngle == 'l' ? '' : 'r';
    }

    vaiReto() {
        this.volanteAngle = '';
    }

    vaiPraEsquerda() {
        if (this.speed > 0) {

            if (this.speed < 0.1) {
                if (this.gear == 1)
                    this.rotation = -this.speed * 0.4;
                else if (this.gear == -1)
                    this.rotation = this.speed * 0.4;
            } else {
                if (this.gear == 1)
                    this.rotation = -0.1;
                else if (this.gear == -1)
                    this.rotation = 0.1;
            }

        }
        this.volanteAngle = this.volanteAngle == 'r' ? '' : 'l';
    }

    engageDinamic() {
        if (this.speed == 0) {
            this.gear = 1
            this.addAccHistory('D');
        }
    }

    engageReverse() {
        if (this.speed == 0) {
            this.gear = -1
            this.addAccHistory('R');
        }
    }

    getRoadPosition() {

        let rs = false

        const x = Number(this.pos.x.toFixed(0));
        const y = Number(this.pos.y.toFixed(0));

        if (roads[x]) {
            rs = roads[x][y]
        }

        return rs
    }

    update() {

        if (this.batido) {
            return false;
        }

        if (this.km == Infinity) {
            this.km = this.getRoadPosition()
        }

        this.lastKm = this.km;
        this.heading += this.rotation * 0.3;

        const irPara = p5.Vector.fromAngle(this.heading).mult(3).mult(this.gear == -1 ? -this.speed : this.speed);

        this.pos.add(irPara);

        this.aliveTime++;
        this.finalTime = frameCount;

        this.rotation = 0;
        this.speed = Number(this.speed.toFixed(3));

        const posOnRoad = this.getRoadPosition()

        if (posOnRoad && posOnRoad > 0) {
            this.km = posOnRoad
        }

        this.timer = timer;

        if (this.inteligente) {
            this.verificaEstagnacao();
        }

        this.updateRays();

        pista.setMajorDistance(this.km);

        if (this.aliveTime % pista.timeOutStopped == 0) {
            if (this.inteligente) {
                this.onEachTime();
            }
        }

        if (posOnRoad == -1) {

            // console.log(`Carro '${this.marca}' vazou da pista vez -> `, this.outLapCount);
            if (this.outLapCount > 1) {

                // foo.speak('Carro vazou da pista');
                // console.log(`Carro '${this.marca}' vazou da pista`);
                this.km = Infinity;
                this.lap = 0;
                this.kill(false, this.deadWayType.offTrack);

            }
            this.outLapCount++

        } else {

            this.step = this.lastKm - this.km;

            if (this.step == Infinity) {
                this.step = 0;
            }

            if (abs(this.step) > 100) {
                const up = this.lastKm < this.km
                const moveAllowed = up // && abs(this.km) != Infinity
                this.hitFinishLine(moveAllowed)
            }

        }

    }

    hitFinishLine(allowedMove) {

        if (allowedMove) {
            console.log("VOLTA? ", this.km, this.lastKm)
            this.lap++;
            if (world.endsWhenFinishLine) {
                genetic.nextGeneration();
            } else {
                const newTimeOut = pista.trackSize * (this.lap + 1);
                pista.pistaTimeOut = max(pista.pistaTimeOut, newTimeOut);
            }

        } else {
            this.km = Infinity;
            this.kill(true, this.deadWayType.crashed);
        }

    }

    getPontoAfrente(offset = 0) {

        const dirRaio = this.pos.copy();
        const lat = p5.Vector.fromAngle(this.heading + offset).mult(50);

        return dirRaio.add(lat);

    }

    updateRays() {

        for (ray of this.rays) {

            ray.pos.x = this.pos.x;
            ray.pos.y = this.pos.y;

            const dirRaio = this.getPontoAfrente(ray.defAngle);

            if (this.showSensorPoint) circle(dirRaio.x, dirRaio.y, 4);

            ray.lookAt(dirRaio.x, dirRaio.y);

        }

    }
    verificaColisaoRanhura(ranhuras) {

        let hit;
        let cir = this.pos.copy();
        const irPara = p5.Vector.fromAngle(this.heading).mult(10);

        cir.add(irPara);

        if (this.showSensorRanhura) {
            circle(cir.x, cir.y, 10);
        }

        for (let i = 0; i < ranhuras.length; i++) {

            const r = ranhuras[i];

            if (r.t == 0) { // 0 Ranhuras que detectam qualquer direção.

                hit = collideLineCircle(r.a, r.b, r.c, r.d, cir.x, cir.y, 20);

                if (hit) {

                    if (!this.ranhurasColetadas.includes(i)) {
                        r.m = 1;
                        this.ranhurasColetadas.push(i);
                        ranhuras[i].w += 0.05;
                    }
                }
            } else if (r.t == -1) { // -1 Ranhuras que aceitam/detectam apenas ré.

                // Se está em um ângulo com traseira pra baixo!
                if (this.heading > 3.30 && this.heading < 4.5) {

                    if (this.lastMarcha == -1 && this.qtdReh > 5) {
                        hit = collideLineCircle(r.a, r.b, r.c, r.d, cir.x, cir.y, 20);

                        if (hit) {

                            if (!this.ranhurasColetadas.includes(i)) {
                                r.m = 1;
                                this.ranhurasColetadas.push(i);
                            }
                        }
                    }
                }
            }
        }


        // // Increase account lap.
        // if (hit) {
        //     if (ranhuras.length % this.ranhurasColetadas.length == 0) {
        //         console.log('They are equals!');
        //         this.ranhurasColetadas = [];
        //         this.lapCount++;
        //         console.log(this.ranhurasColetadas);
        //     }            
        // }

    }
    verificaEstagnacao() {

        // this.kmMMCount++;

        // if (this.km > this.kmMax) {
        //     this.kmMax = this.km;
        //     this.kmMMCount = 0;
        // }

        // if (this.km < this.kmMin) {
        //     this.kmMin = this.km;
        //     this.kmMMCount = 0;
        // }

    }

    getTravelledDistance() {
        return ((this.lap * pista.trackSize) + pista.trackSize - this.km);
    }

    getTravelledTime() {
        return this.finalTime - this.initialTime;
    }

    getAverageSpeed() {
        let as = this.getTravelledDistance() / this.getTravelledTime();

        if (as == Infinity) as = 0.0;

        return as;
    }

    ranking() {

        if (this.km == Infinity) {
            return '0000-00000-00.0000-000';
        }

        const lap = String(this.lap).padStart(4, '0');
        const km = String(pista.trackSize - this.km).padStart(5, '0');
        const imp = String(this.priority).padStart(2, '0');
        let mut;

        if (rankingMode == 0)
            mut = String(999 - this.ia.mutated).padStart(3, '0');
        else
            mut = String(this.ia.mutated).padStart(3, '0');

        const vm = String(this.getAverageSpeed().toFixed(4)).padStart(7, '0');

        return lap + '-' + km + '-' + vm + '-' + mut + '-' + imp;
    }

    kill(normalDead, deadWay) {

        if (!this.batido) {

            this.batido = true;
            // genetic.setFlag();
            genetic.deads++;

            this.engineSound.stop();
            this.normalDead = normalDead;
            this.deadWay = deadWay;

            vivos = cars.reduce((a, c) => a += c.batido ? 0 : 1, 0);

        }
    }


    show() {

        if (!showCarsDetais) {

            strokeWeight(2);
            if (this.batido) {
                noStroke();
                fill(100, 100, 100, 80);
            } else {
                stroke(0);
                fill(this.cor);
            }
            circle(this.pos.x, this.pos.y, 10);

            return false;
        }

        if (this.braking && this.speed > 0.5) {
            this.drawTrailPg();
        }

        if (this.batido) {

            if (showDeadCars && !this.drawedDead) {
                pg.push();
                pg.translate(this.pos.x, this.pos.y);
                pg.rotate(this.heading);
                this.drawDeadCar();
                pg.pop();
                this.drawedDead = true;
            }

        } else {

            this.showInfoCar();

            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            this.drawCar();
            pop();

        }

        // if (this.speed > 1 && this.volanteAngle != '') {

        //     if (random(0, 4) > 3) {
        //         pg.noStroke();
        //         pg.fill(127, 127, 127, 0.6);
        //         pg.circle(this.pos.x, this.pos.y, random(12, 22));
        //     }
        // }

    }

    showInfoCar() {

        if (this.showInfo) {

            let x = this.pos.x - 50;
            let y = this.pos.y - 100;

            stroke(0, 0, 255);
            fill(255, 255, 255);
            strokeWeight(1);
            line(this.pos.x, y + 50, this.pos.x, this.pos.y);
            rect(x, y, 160, 65, 4);

            textSize(10);
            fill(0, 0, 255);
            noStroke();
            strokeWeight(1);
            switch (this.acceleration) { case 'up': 'Acelerou'; case 'down': 'Desacelerou'; default: '' };

            text(`km: ${this.km} Voltas: ${this.lap} VM: ${this.getAverageSpeed().toFixed(3)}`, x + 2, y += 12);
            text(`Marcha: ${this.gear == 1 ? 'D' : this.gear == -1 ? 'R' : 'N'} Ran: ${this.ranhurasColetadas.length} ${this.lastKm} ${this.step}`, x + 2, y += 12);
            // text(`Velocidade: ${this.speed} NM: ${this.ia.mutatedNeurons}`, x + 2, y += 12);
            text(`Velocidade: ${this.speed}`, x + 2, y += 12);
            text(`Acelerador: ${this.acceleration == 'up' ? 'Acelerou' : this.acceleration == 'down' ? 'Desacelerou' : ''}`, x + 2, y += 12);
            text(`Freio: ${this.braking ? 'Freiou' : 'Soltou'} -  ${this.marca} Muts: ${this.ia.mutated} ID: ${this.id}`, x + 2, y += 12);


        }
    }

    drawTrailPg() {

        pg.push();

        pg.translate(this.pos.x, this.pos.y);
        pg.rotate(this.heading);
        pg.strokeWeight(0);
        pg.stroke(255);

        pg.fill(140, 140, 140, 20);
        // pg.square(-6, -12, 6, 10); // Left
        // pg.square(-6, +6, 6, 10); // Right

        // pg.circle(-6, -12, 10); // Left
        // pg.circle(-6, +6, 10); // Right

        // // pg.fill(0, 0, 200);
        // pg.rect(-6, -12, 8, 1, 10); // Left
        // // pg.fill(200, 0, 0);
        // pg.rect(-6, -10, 8, 1, 10); // Left

        // // pg.fill(0, 0, 200);
        // pg.rect(-6, +11, 8, 1, 10); // Right
        // // pg.fill(200, 0, 0);
        // pg.rect(-6, +9, 8, 1, 10); // Right

        pg.rect(-6, -12, 8, 2, 10); // Left
        pg.rect(-6, -9, 8, 2, 10); // Left

        pg.rect(-6, +10, 8, 2, 10); // Right
        pg.rect(-6, +7, 8, 2, 10); // Right        

        pg.pop();

    }

    onEachTime() {

        if (this.pos.x == this.lastPos.x && this.pos.y == this.lastPos.y) {
            this.kill(true, this.deadWayType.stopped);

        }
        if (this.lastKmVerified > 0) {

            if (abs(this.lastKmVerified - this.km) < 10) {
                this.kill(true, this.deadWayType.stopped);
            }
        }

        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.lastKmVerified = this.km;

        if (random() > 0.4) {

            this.luzes = !this.luzes;

            if (this.speed < 0.4) {

                if (random() > 0.5) {
                    if (this.volanteAngle == 'r') {
                        this.openDoor('L', random(0.5, 1.2));
                        this.openDoor('R', 0);
                    } else if (this.volanteAngle == 'l') {
                        this.openDoor('L', 0);
                        this.openDoor('R', 0.5, 1.2);
                    }
                }

            } else {
                if (random() > 0.4) this.openDoor('L', 0)
                if (random() > 0.4) this.openDoor('R', 0)

            }
        }
    }


    mutate(rate, maxMutations) {
        while (this.ia.mutated == 0) {
            // this.ia.mutateNoRepeat(rate, maxMutations);
            this.ia.mutate(rate, maxMutations);
        }
        this.setColor();

        return this.ia.mutated
    }

    getExternDistanceWall(i) {

        const fullDistance = this.rays[i].savedDistance;
        const offSet = this.getRayCollide(i);

        return fullDistance - offSet;

    }
    getNormalizedDist(i, maxDist) {
        const extDist = this.getExternDistanceWall(i)
        const normalized = map(min(extDist, maxDist), 0, maxDist, 0, 1)

        if (distNormalized) return normalized
        return extDist
    }

    look(walls) {

        if (this.batido) {
            return false;
        }



        // Percorre todas as paredes para achar a parece mais perto.

        // Scan rays
        for (let i = 0; i < this.rays.length; i++) {

            const ray = this.rays[i];

            let nearestWall = Infinity;
            let menorHit = null;
            let rayIndex = null;

            // Scan walls
            for (const wall of walls) {

                if (wall.id == this.id) {

                } else {

                    const hit = ray.cast(wall);

                    if (hit) {
                        const d = p5.Vector.dist(ray.pos, hit);
                        if (d < nearestWall) {
                            nearestWall = d;
                            menorHit = hit;
                            rayIndex = i;
                        }
                    }
                }
            }

            ray.savedDistance = Number(nearestWall.toFixed(0));
            this.rayMaxLength = max(this.rayMaxLength, ray.savedDistance)

            if (menorHit && this.showRays) {

                // if ([0, 1, 2, 3, 4, 5, 15, 16, 17, 18, 19].includes(i)) {

                fill(255, 0, 0);
                stroke(255, 0, 0);
                strokeWeight(1);
                lineX(ray.pos.x, ray.pos.y, menorHit.x, menorHit.y, 'hsl(0, 100%, 70%)');
                stroke(this.cor);
                circle(menorHit.x, menorHit.y, 10);
                fill(0, 0, 255);
                strokeWeight(1);
                stroke(255);
                textSize(12)
                // text(i, menorHit.x, menorHit.y);
                text(ray.savedDistance, menorHit.x, menorHit.y);

                if (this.showSensorValue) {
                    noStroke();
                    fill(0, 0, 255);
                    text(`${nearestWall.toFixed(0)} `, menorHit.x + 6, menorHit.y + 2);
                }
                // }

            }

            if (ray.savedDistance < this.getRayCollide(i)) {
                this.kill(true, this.deadWayType.crashed);
                break;
            }
        }
    }

    getRayCollide(rayIndex) {
        const limits = [
            { ray: 0, collide: 33 },

            { ray: 1, collide: 32.5 },
            { ray: 2, collide: 18.8 },
            { ray: 3, collide: 13.7 },
            { ray: 4, collide: 11.7 },
            { ray: 5, collide: 11.1 },
            { ray: 6, collide: 11.6 },
            { ray: 7, collide: 12.2 },
            { ray: 8, collide: 11.1 },
            { ray: 9, collide: 9.6 },

            { ray: 10, collide: 9.1 },

            { ray: 11, collide: 9.6 },
            { ray: 12, collide: 11.1 },
            { ray: 13, collide: 12.2 },
            { ray: 14, collide: 11.7 },
            { ray: 15, collide: 11.1 },
            { ray: 16, collide: 11.6 },
            { ray: 17, collide: 13.7 },
            { ray: 18, collide: 18.8 },
            { ray: 19, collide: 32.5 },
        ]

        return limits[rayIndex].collide;
    }

    drawDeadCar() {

        pg.stroke(100);
        pg.strokeWeight(2);

        pg.fill(100);
        pg.rect(-3, -11.5, 6, 4, 1); // Roda traseira esquerda
        pg.rect(-3, 7.5, 6, 4, 1); // Roda traseira direita

        pg.push();
        pg.translate(23, -12);

        let mapLWeel
        let mapRWeel

        if (this.volanteAngle == 'l') {
            mapLWeel = map(this.speed, 0, 2, 0.50, 0.02);
            mapRWeel = map(this.speed, 0, 2, 0.25, 0.01);
        }
        if (this.volanteAngle == 'r') {
            mapLWeel = map(this.speed, 0, 2, 0.25, 0.01);
            mapRWeel = map(this.speed, 0, 2, 0.50, 0.02);
        }

        if (this.volanteAngle == 'l') pg.rotate(-mapLWeel);
        if (this.volanteAngle == 'r') pg.rotate(mapLWeel);
        pg.rect(-3, 0.5, 6, 4, 1); // Roda dianteira esquerda        
        pg.pop();

        pg.push();
        pg.translate(23, 12);
        if (this.volanteAngle == 'l') pg.rotate(-mapRWeel);
        if (this.volanteAngle == 'r') pg.rotate(mapRWeel);
        pg.rect(-3, -4.5, 6, 4, 1); // Roda dianteira direita
        pg.pop();

        pg.strokeWeight(1); // Contorno fino preto do carro
        pg.stroke(0);
        pg.fill(this.cor);
        pg.rect(-9, -11, 42, 22, 5);

        // Portas.
        pg.stroke(this.cor)
        pg.fill(this.cor);
        pg.strokeWeight(3);

        pg.push();
        pg.translate(19, -9.5)
        pg.rotate(this.leftDoorAngle)
        pg.line(-10, 0, 0, 0)
        pg.noStroke();
        pg.arc(-3, -2, 8, 6, 5.0, 1.0, CHORD)
        pg.pop();

        pg.push();
        pg.translate(19, 9.5)
        pg.rotate(-this.rightDoorAngle)
        pg.line(-10, 0, 0, 0)
        pg.noStroke();
        pg.arc(-3, 2, 8, 6, -1.0, -5.0, CHORD)
        pg.pop();


        // Corpo do carro.
        pg.strokeWeight(2);
        pg.stroke(this.cor);
        pg.fill(this.cor);
        pg.rect(-8, -10, 40, 20, 5);

        // Vidros.
        pg.noStroke();
        pg.fill(0);
        pg.rect(-8, -10, 28, 20, 4);

        // Teto.
        pg.fill(this.cor);
        pg.rect(-2, -8, 15, 16, 0);

        // Colluns.

        pg.stroke(this.cor) // Frontal columns
        // stroke(255,0,0)
        pg.strokeWeight(0.8);
        pg.line(19, 9, 10, 7);
        pg.line(19, -9, 10, -7);

        pg.strokeWeight(0.8); // Rear columns
        pg.line(-6.6, 9, 0, 7);
        pg.line(-6.6, -9, 0, -7);

        // Hood frizes.
        pg.stroke(100)
        pg.strokeWeight(0.4);
        pg.line(32, 4, 20, 9);
        pg.line(32, 9 - 13, 20, 4 - 13);

        // Ré.
        if (this.braking) {

            pg.stroke(255, 0, 0);
            pg.strokeWeight(2);
            pg.fill(0);
            pg.rect(-9, 2, 3, 6, 4);
            pg.rect(-9, -8, 3, 6, 4);

        } else if (this.gear == -1) {

            pg.stroke(255, 255, 0);
            pg.strokeWeight(2);
            pg.fill(0);
            pg.rect(-9, 2, 3, 6, 4);
            pg.rect(-9, -8, 3, 6, 4);
        }

        // Frontal numeric.
        if (this.lap > 0) {

            pg.push();
            pg.translate(24, 0)
            pg.rotate(PI * 1.5)
            pg.noStroke();
            // fill(240);
            // circle(0, 0, 8);
            pg.fill(0);
            pg.textSize(4);
            pg.textAlign(CENTER);
            pg.text(this.id, 0, 1)
            pg.pop();

        }

        // Faróis dianteiros.
        pg.fill(this.luzes ? 180 : 100)
        pg.noStroke();
        pg.arc(27.5, -5, 9, 10, 4.6, 0.0, CHORD) // Left
        pg.arc(27.5, 5, 9, 10, 0.0, -4.6, CHORD) // Right
        pg.strokeWeight(0.1);
        pg.stroke(this.luzes ? 255 : this.cor);
        pg.noFill();
        pg.rect(29.5, -8.7, 0.5, 0.7);
        pg.line(29.5, -8.7, 28.5, -8.7);
        pg.rect(29.5, 8.0, 0.5, 0.7);
        pg.line(29.5, 8.7, 28.5, 8.7);

        pg.noStroke();

        if (showFlag) {
            pg.strokeWeight(1.5);
            pg.stroke(255);
            pg.fill(0)
            pg.text(this.km, 0, 0);
        }

    }

    drawCar() {

        if (showTrace) {
            if (frameCount % 10 == 0) {
                pg.strokeWeight(0.4); // Contorno fino
                pg.fill(this.cor);
                pg.circle(this.pos.x, this.pos.y, 4)
            }
        }

        // Fumaça de 'acelerada forte'.
        if (this.acceleration == 'up') {

            strokeWeight(0);
            const alSmoke = map(this.speed, 0, 2, 180, 50);
            const dist = map(this.speed, 0, 2, -2, 6);
            fill(160, 160, 160, alSmoke);

            circle(-random(13, 14) - dist, -7, random(4, 6));
            circle(-random(15, 19) - dist, -6, random(4, 6));
            circle(-random(15, 19) - dist, -8, random(4, 6));
            circle(-random(17, 21) - dist, -7, random(4, 6));


        } else {

            strokeWeight(0);
            fill(255, 255, 255, this.speed * 100);
            circle(-random(13, 15), -7, random(4, 6));
            // rect(-17, -6, 5, 5, 4);
            // rect(-17, -8, 5, 5, 4);

        }

        stroke(100);
        strokeWeight(3);

        fill(100);
        rect(-3, -11.5, 6, 4, 1); // Roda traseira esquerda
        rect(-3, 7.5, 6, 4, 1); // Roda traseira direita

        push();
        translate(23, -12);
        let mapLWeel
        let mapRWeel

        if (this.volanteAngle == 'l') {
            mapRWeel = map(this.speed, 0, 2, 0.50, 0.01);
            mapLWeel = map(this.speed, 0, 2, 0.75, 0.02);
        }
        if (this.volanteAngle == 'r') {
            mapLWeel = map(this.speed, 0, 2, 0.50, 0.01);
            mapRWeel = map(this.speed, 0, 2, 0.75, 0.02);
        }

        if (this.volanteAngle == 'l') rotate(-mapLWeel);
        if (this.volanteAngle == 'r') rotate(mapLWeel);
        rect(-3, 0.5, 6, 4, 1); // Roda dianteira esquerda        
        pop();

        push();
        translate(23, 12);
        if (this.volanteAngle == 'l') rotate(-mapRWeel);
        if (this.volanteAngle == 'r') rotate(mapRWeel);
        rect(-3, -4.5, 6, 4, 1); // Roda dianteira direita
        pop();

        strokeWeight(1); // Contorno fino preto do carro
        stroke(0);
        fill(this.cor);
        rect(-9, -11, 42, 22, 5);


        // Portas.
        stroke(this.cor)
        fill(this.cor);
        strokeWeight(3);

        push();
        translate(19, -9.5)
        rotate(this.leftDoorAngle)
        line(-10, 0, 0, 0)
        noStroke();
        arc(-3, -2, 8, 6, 5.0, 1.0, CHORD)
        pop();

        push();
        translate(19, 9.5)
        rotate(-this.rightDoorAngle)
        line(-10, 0, 0, 0)
        noStroke();
        arc(-3, 2, 8, 6, -1.0, -5.0, CHORD)
        pop();


        // Corpo do carro.
        strokeWeight(2);
        stroke(this.cor);
        fill(this.cor);
        rect(-8, -10, 40, 20, 5);

        // Vidros.
        noStroke();
        fill(0);
        rect(-8, -10, 28, 20, 4);

        // Teto.
        fill(this.cor);
        rect(-2, -8, 15, 16, 0);

        // Colluns.

        stroke(this.cor) // Frontal columns
        // stroke(255,0,0)
        strokeWeight(0.8);
        line(19, 9, 10, 7);
        line(19, -9, 10, -7);

        strokeWeight(0.8); // Rear columns
        line(-6.6, 9, 0, 7);
        line(-6.6, -9, 0, -7);

        // Hood frizes.
        stroke(100)
        strokeWeight(0.4);
        line(32, 4, 21, 5);
        line(32, -4, 21, -5);

        // Ré.
        if (this.braking) {

            stroke(255, 0, 0);
            strokeWeight(2);
            fill(0);
            rect(-9, 2, 3, 6, 4);
            rect(-9, -8, 3, 6, 4);

            // // Reflex brake light.
            // fill(255, 0, 0, 20);
            // noStroke();
            // rect(-20,-15,10,30,10);

            // Faixa
            // strokeWeight(4);
            // fill(255, 0, 0, 10);
            // rect(-2, -12, -11, 24, 8);            

        } else if (this.gear == -1) {

            stroke(255, 255, 0);
            strokeWeight(2);
            fill(0);
            rect(-9, 2, 3, 6, 4);
            rect(-9, -8, 3, 6, 4);
        }

        if (this.luzes) {

            noStroke();

            // Feixo de luz perto.                
            fill(255, 255, 255, 40);
            rect(60, -20, -30, 40, 10);

            // Feixo de luz longe.                
            fill(241, 255, 176, 40);
            rect(80, -25, -50, 50, 10);

        }

        // Frontal numeric.
        if (this.lap > 0) {

            push();
            translate(24, 0)
            rotate(PI * 1.5)
            noStroke();
            // fill(240);
            // circle(0, 0, 8);
            fill(0);
            textSize(4);
            textAlign(CENTER);
            text(this.id, 0, 1)
            pop();

        }

        // Faróis dianteiros.
        fill(this.luzes ? 180 : 100)
        noStroke();
        arc(27.5, -5, 9, 10, 4.6, 0.0, CHORD) // Left
        arc(27.5, 5, 9, 10, 0.0, -4.6, CHORD) // Right
        strokeWeight(0.1);
        stroke(this.luzes ? 255 : this.cor);
        noFill();
        rect(29.5, -8.7, 0.5, 0.7);
        line(29.5, -8.7, 28.5, -8.7);
        rect(29.5, 8.0, 0.5, 0.7);
        line(29.5, 8.7, 28.5, 8.7);

        noStroke();

    }

    runDemo(run) {

        if (!run) return

        if (frameCount % 50 == 0) {

            this.demo.think();

        }
        if (this.demo.brake) {
            this.brake();
        }
        if (this.demo.speedUp) {
            this.speedUp();
        } else if (this.demo.freeSpeedUp) {
            this.freeSpeedUp();
        }

        if (this.demo.gear == -1) {
            this.engageReverse();
        } else if (this.demo.gear == 1) {
            this.engageDinamic();
        }

        if (this.demo.side == 'r')
            this.vaiPraDireita();
        else if (this.demo.side == 'l')
            this.vaiPraEsquerda();

        if (this.pos.x > width)
            this.pos.x = 0;

        if (this.pos.x < 0)
            this.pos.x = width;

        if (this.pos.y > height)
            this.pos.y = 0;

        if (this.pos.y < 0)
            this.pos.y = height;
    }

    isBetterThan(car) {

        let isBetter = false;

        if (car) {
            if (this.lap > car.lap) {
                isBetter = true;
            } else if (this.lap == car.lap) {
                if (this.km < car.km) {
                    isBetter = true;
                }
            }
            return isBetter;
        }

        return true

    }

}

function eliminarTodosCars() {
    for (const car of cars) {
        car.kill(false, car.deadWayType.endOfTime);
    }
}

function killAllClearingWeights() {
    timer = pista.pistaTimeOut;
    eliminarTodosCars();

    const data = genetic.loadWeights(pista.selectedPista)
    genetic.pesos[pista.selectedPista] = { f1: data.f1, f2: data.f2, lap: 0, km: 99999, weights: '' };
    genetic.melhor = null;
    genetic.melhores = [];
    genetic.empatados = [];
    nGeracao = 0;
}

function stopCreateNewCars(quiet) {
    const newTimer = Number((pista.trackSize * 0.5).toFixed(0));
    if (timer <= newTimer) {
        if (!quiet) foo.speak('u');
        timer = newTimer;
    }

}
