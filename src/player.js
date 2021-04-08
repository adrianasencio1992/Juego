class Player {
    constructor(canvas, lives, playerImg) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        //Pasamos el valor de las vidas del jugador para así augmentar el dinamismo de nuestro juego
        this.lives = lives;
        //function createSplashScreen() {
        this.size = 60;
        // Posicionaremos a nuestro jugador a la mitad de la pantalla. Para eso debemos colocarlo en
        // medio del la altura del canvas menos el tamaño del propio jugador
        this.x = 50;
        this.y = this.canvas.height / 2 - this.size / 2;

        //gestionaremos la dirección de nuestro jugador con los numeros 1, 0, -1 (multiplicamos speed por direction)
        this.keys = [];
        this.num = 0;
        this.image = new Image();
        this.image.src = playerImg;
        this.framex = 0;
        this.framey = 0;
        this.width = 45;
        this.height = 65;
        this.moving = false
            // this.direction = 0;
            //
        this.speed = 5;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, //imagen
            this.image.width / 4 * this.framex, //multiplicacion matematica para que funcione
            this.image.height / 4 * this.framey,
            this.image.width / 4,
            this.image.height / 4,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.animate(framesCounter);
    }

    animate(framesCounter) {
        if (framesCounter % 6 === 0 && this.moving) {
            console.log(this.framex);
            this.framex++

                if (this.framex > 3) this.framex = 0;
        }
    }



    confirmeMove() { // Confirmar el movimiento
        document.body.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
            this.moving = true;

        })
        document.body.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
            this.moving = false;

        })
    }

    movePlayer() { // Movimiento
        if (this.keys[38] && this.y > 20) { // Valor arriba
            this.y -= this.speed;
            this.framey = 3

        }
        if (this.keys[37] && this.x > 10) { // Valor izquierda
            this.x -= this.speed
            this.framey = 1

        }
        if (this.keys[40] && this.y < 235) { // valor abajo
            this.y += this.speed;
            this.framey = 0

        }
        if (this.keys[39] && this.x < 350) { // valor derecha
            this.x += this.speed;
            this.framey = 2

        }
    }

    handleScreenCollision() {
        const screenTop = 0;
        const screenBottom = this.canvas.height;

        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        if (playerBottom >= screenBottom) this.setDirection("up");
        else if (playerTop <= screenTop) this.setDirection("down");
    }

    removeLife() {
        this.lives -= 1;
    }
    augmentLife() {
        this.lives += 1;
    }


    sizeLorgio() {
        this.num++
            if (this.num < 3) {
                this.width += 10;
                this.height += 10;

            }
    }



    didCollide(enemy) {
        //seleccionamos los 4 laterales del jugador
        const playerLeft = this.x;
        const playerRight = this.x + this.size;
        const playerTop = this.y;
        const playerBottom = this.y + this.size;

        //seleccionamos los 4 laterales del enemigo
        const enemyLeft = enemy.x;
        const enemyRight = enemy.x + enemy.width;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + enemy.height;

        //comprobamos si el enemigo ha entrado dentro del jugador por cualquiera de los 4 lados
        const crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
        const crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;
        const crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;
        const crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;

        //solo cuando 1 condición de verticalidad y 1 de horizontalidad se cumplen, podemos considerar que nuestros
        //cuadrados han colisionado
        if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
            return true;
        } else {
            return false
        }


    }
}