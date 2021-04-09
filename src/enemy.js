class Enemy {
    constructor(canvas, positionY, speed, color, type, enemyImg) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.size = 25;
        this.x = this.canvas.width;
        this.y = positionY;

        this.speed = speed;
        this.color = color;
        this.type = type;
        this.image = new Image();
        this.image.src = enemyImg;
        this.framex = 0;
        this.framey = 0;
        this.width = 35;
        this.height = 35;
        this.frames = 4;
        this.framesIndex = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, //imagen
            this.framesIndex * Math.floor(this.image.width / this.frames), //multiplicacion matematica para que funcione
            0, //height
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.animate(framesCounter);



        // let img = document.createElement('img');
        // img.src = 'imagenes/bala2.png';
        // this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {

            this.framesIndex++

                if (this.framesIndex > 3) this.framesIndex = 0;
        }
    }


    updatePosition() {
        // Restamos la dirección para traer a los enemigos des de fuera del canvas hacia adentro
        this.x -= this.speed;
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
    constructor(canvas, positionY, speed, color, type, enemyImg) {
        super(canvas, positionY, speed, color, type, enemyImg);
        this.color = "#ff0000";
        this.image = new Image();
        this.image.src = enemyImg;
        this.framex = 0;
        this.framey = 0;
        this.width = 40;
        this.height = 40;
        this.frames = 7;
        this.framesIndex = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, //imagen
            this.framesIndex * Math.floor(this.image.width / this.frames), //multiplicacion matematica para que funcione
            0, //height
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.animate(framesCounter);

    }
    animate(framesCounter) {
        if (framesCounter % 10 === 0) {

            this.framesIndex++

                if (this.framesIndex > 3) this.framesIndex = 0;
        }
    }
}
class Enemy3 extends Enemy {
    constructor(canvas, positionY, speed, color, type, enemyImg) {
        super(canvas, positionY, speed, color, type, enemyImg);
        this.color = "#ff0000";
        this.image = new Image();
        this.image.src = enemyImg;
        this.framex = 0;
        this.framey = 0;
        this.width = 35;
        this.height = 25;
        this.frames = 4;
        this.framesIndex = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, //imagen
            this.framesIndex * Math.floor(this.image.width / this.frames), //multiplicacion matematica para que funcione
            0, //height
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.animate(framesCounter);

    }
    animate(framesCounter) {
        if (framesCounter % 16 === 0) {

            this.framesIndex++

                if (this.framesIndex > 3) this.framesIndex = 0;
        }
    }
}

class Enemy4 extends Enemy {
    constructor(canvas, positionY, speed, color, type, enemyImg) {
        super(canvas, positionY, speed, color, type, enemyImg);
        this.color = "#ff0000";
        this.image = new Image();
        this.image.src = enemyImg;
        this.framex = 0;
        this.framey = 0;
        this.width = 115;
        this.height = 90;
        this.frames = 10;
        this.framesIndex = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, //imagen
            this.framesIndex * Math.floor(this.image.width / this.frames), //multiplicacion matematica para que funcione
            0, //height
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.animate(framesCounter);

    }
    animate(framesCounter) {
        if (framesCounter % 6 === 0) {

            this.framesIndex++

                if (this.framesIndex > 3) this.framesIndex = 0;
        }
    }
}