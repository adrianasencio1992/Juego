class Enemy {
    constructor(canvas, positionY, speed, color, type) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.size = 25
        this.x = this.canvas.width;
        this.y = positionY;

        this.speed = speed;
        this.color = color;
        this.type = type;

    }

    draw() {
        //this.ctx.fillStyle = this.color;
        let img = document.createElement('img');
        img.src = 'imagenes/bala2.png';
        this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
        //  this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    updatePosition() {
        // Restamos la dirección para traer a los enemigos des de fuera del canvas hacia adentro
        this.x -= this.speed
    }

    isInsideScreen() {
        const enemyRight = this.x + this.size;
        const screenLeft = 0;
        const isInside = enemyRight > screenLeft;
        return isInside;
        //return this.x + this.size > 0;
    }
}

class Enemy2 extends Enemy {
    constructor(canvas, positionY, speed, color, type) {
        super(canvas, positionY, speed, color, type)
        this.color = '#ff0000';
    }
    draw() {
        // this.ctx.fillStyle = this.color;

        let img = document.createElement('img');
        img.src = 'imagenes/bala.png';
        this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }
}

class Enemy3 extends Enemy {
    constructor(canvas, positionY, speed, color, type) {
        super(canvas, positionY, speed, color, type)
        this.color = '#ff0000';
        this.size = 35;
    }
    draw() {
        // this.ctx.fillStyle = this.color;

        let img = document.createElement('img');
        img.src = 'imagenes/botiquin.png';
        this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }
}