class Car {

    constructor(marca = '?', inteligente = true, allowLazy = false, randomHeading = false) {

        this.pos = pista.localNascimento.copy();
        this.lastPos = createVector();
        this.heading = randomHeading ? random(360) : pista.anguloNascimento;
        this.rotation = 0;
        this.cor = 'hsla(' + Math.floor(Math.random() * 360) + ',100%,50%,0.8)';
        this.volanteAngle = '';
        this.ia = new RedeNeural();
        this.inteligente = inteligente;
        this.batido = false;
        this.km = 0;
        this.kmMax = 0;
        this.kmMin = 0;
        this.kmMMCount = 0;
        this.lastKm = 0;
        this.marca = marca;
        this.aliveTime = 0;
        this.updates = 0;
        this.showSensorValue = false;
        this.qtdReh = 0;
        this.ranhurasColetadas = [];
        this.allowLazy = allowLazy;
        this.id = Number(random(0, 9999).toFixed(0));
        this.luzes = true;
        this.lapCount = 0;
        this.showInfo = false;
        this.speed = 0;
        this.gear = 1; // -1 Reverse, 1 Dinamic
        this.braking = false;
        this.speedingUp = false;
        this.demo = new Demo();
        this.trail = [];
        this.rays = [];

        if (this.pos.x == -1) {
            this.pos = createVector(random(20, 1700), random(20, 800));
        }

        for (let i = 0; i < 360; i += 18) {
            this.rays.push(new Ray(this.pos.copy(), 20, radians(i), this.showRays));

        }

        this.setColor();

    }

    setColor() {
        if (this.marca.toLowerCase().includes('c') || this.marca.toLowerCase().includes('x')) {
            // this.cor = 'hsl(216, 100%, 50%)'; // Azul
            this.cor = 'rgb(255,255,255)';
        } else {
            // this.cor = 'hsla(' + Math.floor(this.ia.mutated / 10 * 360) + ',100%,50%,0.3)';
            this.cor = 'hsla(' + Math.floor(this.ia.mutated / 10 * 360) + ',100%,50%,1)';
        }
    }


    raciocinar(inputs) {

        if (!this.batido && this.inteligente) {

            /*
            0 - Acelera
            1 - Mantém aceleração
            2 - Desacelera
            3 - Freia

            4 - Engata a marcha Dinamic
            5 - Engata a marcha Ré
            6 - Vai pra direita
            7 - Vai reto
            8 - Vai pra esquerda
            */


            let resposta = this.ia.pensar(inputs);
            let maiorI;
            let maiorR;

            if (resposta[4] > resposta[5]) {
                this.engageDinamic(); // Marcha D
            } else {                
                this.engageReverse(); // Marcha R
            }

            maiorI = 0;
            maiorR = -Infinity;

            for (let i = 0; i <= 3; i++) {
                if (resposta[i] > maiorR) {
                    maiorR = resposta[i]
                    maiorI = i
                }
            }

            if (maiorI == 0) {
                this.speedUp();
            } else if (maiorI == 1) {
                this.freeSpeedUp();
            } else if (maiorI == 2) {
                this.brake();
            } else if (maiorI == 3) {
                // Mantém aceleração.
            }


            maiorI = 0;
            maiorR = -Infinity;
            for (let i = 6; i <= 8; i++) {
                if (resposta[i] > maiorR) {
                    maiorR = resposta[i];
                    maiorI = i;
                }
            }            

            if (maiorI == 6) {
                this.vaiPraDireita();
            } else if (maiorI == 7) {
                // Vai reto.
            } else if (maiorI == 8) {
                this.vaiPraEsquerda();
            }

            this.ia.selectedOutput = maiorI;

        }
    }

    randomizePos() {
        this.pos = createVector(random(20, windowWidth), random(20, windowHeight));;
    }

    speedUp() {
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

        this.speedingUp = true;
        this.braking = false;
    }

    freeSpeedUp() {
        if (this.speed > 0) {
            this.speed -= 0.004;
            if (this.speed < 0) {
                this.speed = 0;
            }
        }
        this.speedingUp = false;

    }

    brake() {

        this.speed -= 0.04;
        if (this.speed < 0) {
            this.speed = 0;
        }
        this.braking = true;
        if (this.speed > 1.2) {
            this.trail.push({ pos: this.pos.copy(), rotate: this.heading });
        }

    }

    vaiPraDireita() {

        if (this.speed > 0) {

            if (this.speed < 0.1) {
                if (this.gear == 1)
                    this.rotation = this.speed * 0.4; // this.speed * 0.4
                else if (this.gear == -1)
                    this.rotation = -this.speed * 0.4;
            } else {
                if (this.gear == 1)
                    this.rotation = 0.1; // this.speed * 0.4
                else if (this.gear == -1)
                    this.rotation = -0.1;
            }

        }
        this.volanteAngle = 'r';
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
        this.volanteAngle = 'l';
    }

    engageDinamic() {
        if (this.speed == 0) {
            this.gear = 1;
        }
    }

    engageReverse() {
        if (this.speed == 0) {
            this.gear = -1;
        }
    }

    update() {

        if (this.batido) {
            return false;
        }

        this.heading += this.rotation * 0.3;

        let irPara = p5.Vector.fromAngle(this.heading).mult(3).mult(this.gear == -1 ? -this.speed : this.speed);

        this.pos.add(irPara);
        
        this.aliveTime++;

        this.rotation = 0;
        this.speed = Number(this.speed.toFixed(3));

        const vel = Number(this.speed.toFixed(1)); 

        this.km += vel;

        if (this.inteligente) {
            this.verificaEstagnacao();
        }

        this.updateRays();

        pista.setMajorDistance(this.km);

        this.killLazier();

        if (this.aliveTime % pista.timeOutStopped == 0) {
            this.onEachTime();
        }        

    }
    killLazier() {

        if (!this.allowLazy) {
            const distance = pista.carMajorDistance - this.km;
            if (distance > 400) {
                this.aposentar();
            }
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

        this.kmMMCount++;

        if (this.km > this.kmMax) {
            this.kmMax = this.km;
            this.kmMMCount = 0;
        }

        if (this.km < this.kmMin) {
            this.kmMin = this.km;
            this.kmMMCount = 0;
        }

    }

    aposentar() {

        if (!this.batido) {

            vivos--;
            this.batido = true;
            genetic.setFlag();
            // if (pista.recordRanhuras > 0 && this.ranhurasColetadas.length == pista.recordRanhuras) {
            //     console.log(`Carro ${this.id} morreu em: km ${this.km} (x,y) ${this.pos.x},${this.pos.y}`);
            // }

        }
    }


    show() {

        if (!showCarsDetais) {

            strokeWeight(2);
            fill(this.cor);
            stroke(255);
            circle(this.pos.x, this.pos.y,10);

            return false;
        }

        this.showInfoCar();

        if (this.batido) {
            // imageMode(CENTER);
            // image(pista.spriteRip, this.pos.x, this.pos.y);
            strokeWeight(1);
            fill(0, 0, 255);
            stroke(255);
            circle(this.pos.x, this.pos.y, 5);
        } else {

            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            this.drawCar();

            pop();

            this.volanteAngle = '';
        }

        this.braking = false;

    }

    showInfoCar() {

        if (this.showInfo) {

            let x = this.pos.x - 50;
            let y = this.pos.y - 100;

            stroke(0, 0, 255);
            fill(255, 255, 255);
            strokeWeight(1);
            line(this.pos.x, y + 50, this.pos.x, this.pos.y);
            rect(x, y, 130, 65, 4);

            textSize(10);
            fill(0, 0, 255);
            noStroke();
            strokeWeight(1);

            text(`km: ${this.km}`, x + 2, y += 12);
            text(`Marcha: ${this.gear == 1 ? 'Auto' : 'Ré'} Ran: ${this.ranhurasColetadas.length}`, x + 2, y += 12);
            text(`Velocidade: ${this.speed}`, x + 2, y += 12);
            text(`Acelerador: ${this.speedingUp ? 'Acelerou' : 'Aliviou'}`, x + 2, y += 12);
            text(`Freio: ${this.braking ? 'Freiou' : 'Soltou'}`, x + 2, y += 12);

        }
    }

    drawTrail() {
        if (this.trail.length > 0) {

            strokeWeight(0);
            fill(0, 0, 0, 20);
            stroke(255);
            this.trail.forEach(element => {
                circle(element.pos.x - 4, element.pos.y - 4, 8);
                circle(element.pos.x + 4, element.pos.y + 4, 8);
            });
        }
    }
    onEachTime() {

        if (this.pos.x == this.lastPos.x && this.pos.y == this.lastPos.y) {
            this.aposentar();
        }

        if (this.km == this.lastKm) {
            this.aposentar();
        }

        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.lastKm = this.km;

        if (random() > 0.5) {
            this.luzes = !this.luzes;
        }
    }

    mutate(rate) {
        while (this.ia.mutated == 0) {
            this.ia.mutate(rate);
        }
        this.setColor();
    }
    look(walls) {

        if (this.batido) {
            return false;
        }

        // Percorre todas as paredes para achar a parece mais perto.

        for (ray of this.rays) {

            let maisPerto = Infinity;
            let menorHit = null;

            for (const wall of walls) {

                if (wall.id == this.id) {

                } else {

                    const hit = ray.cast(wall);

                    if (hit) {
                        const d = p5.Vector.dist(ray.pos, hit);
                        if (d < maisPerto) {
                            maisPerto = d;
                            menorHit = hit;
                        }
                    }
                }
            }

            ray.savedDistance = maisPerto;
            ray.show()

            if (menorHit && this.showRays) {

                fill(255, 0, 0);
                stroke(255, 0, 0);
                strokeWeight(1);
                lineX(ray.pos.x, ray.pos.y, menorHit.x, menorHit.y, 'hsl(0, 100%, 70%)');
                circle(menorHit.x, menorHit.y, 10);

                if (this.showSensorValue) {
                    noStroke();
                    fill(0, 0, 255);
                    text(`${maisPerto.toFixed(0)}`, menorHit.x + 6, menorHit.y + 2);
                }

            }

            if (ray.savedDistance < 10) {
                this.aposentar();
                break;
            }
        }
    }

    drawCar() {

        stroke(100);
        strokeWeight(2);

        fill(100);
        rect(-6, -12, 6, 4, 1); // Roda traseira
        rect(-6, 8, 6, 4, 1); // Roda traseira

        push();
        translate(23, -12);
        if (this.volanteAngle == 'l') rotate(-0.5);
        if (this.volanteAngle == 'r') rotate(0.5);
        rect(-3, 0, 6, 4, 1); // Roda dianteira
        pop();

        push();
        translate(23, 12);
        if (this.volanteAngle == 'l') rotate(-0.5);
        if (this.volanteAngle == 'r') rotate(0.5);
        rect(-3, -4, 6, 4, 1); // Roda dianteira direita
        pop();


        // Corpo do carro.
        stroke(0);
        fill(this.cor);
        rect(-8, -10, 40, 20, 5);

        // Vidros.
        noStroke();
        fill(0);
        rect(-8, -10, 28, 20, 4);

        // Teto.
        fill(this.cor);
        rect(-2, -9, 14, 17, 4);

        // Ré.
        if (this.braking) {

            stroke(255, 0, 0);
            strokeWeight(2);
            fill(0);
            rect(-9, 2, 3, 6, 4);
            rect(-9, -8, 3, 6, 4);

            // Faixa
            // fill(255, 0, 0, 100);
            // rect(-2, -12, -11, 24, 8);            

        } else if (this.gear == -1) {

            stroke(255, 255, 0);
            strokeWeight(2);
            fill(0);
            rect(-9, 2, 3, 6, 4);
            rect(-9, -8, 3, 6, 4);
        }



        if (this.luzes) {

            // Faróis dianteiros acesos.
            // strokeWeight(6);
            // stroke(255);
            // point(28, -6);
            // point(28, 6);

            noStroke();

            // Feixo de luz perto.                
            fill(255, 255, 255, 40);
            rect(60, -20, -30, 40, 10);

            // Feixo de luz longe.                
            fill(241, 255, 176, 40);
            rect(80, -25, -50, 50, 10);

        } else {
            // Faróis dianteiros apagados.
            strokeWeight(6);
            stroke(80);
            point(28, -6);
            point(28, 6);

        }

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

}

function eliminarTodosCars() {
    // console.log('Eliminando todos os carros...');
    for (const car of cars) {
        car.aposentar();
    }
}
