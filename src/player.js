class Player {
    constructor(canvas, lives) {
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
        this.move = false;
        this.num = 0;


        // this.direction = 0;
        //
        this.speed = 10;
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

        }
        if (this.keys[37] && this.x > 10) { // Valor atras
            this.x -= this.speed

        }
        if (this.keys[40] && this.y < 235) { // valor abajo
            this.y += this.speed;

        }
        if (this.keys[39] && this.x < 350) { // valor derecha
            this.x += this.speed;

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
                this.size += 10;

            }
    }

    draw() {
        //this.ctx.fillStyle = "#66D3FA";
        //fillRect(x, y, width, height)
        let img = document.createElement('img');
        img.src = 'imagenes/soldado.png';
        this.ctx.drawImage(img, this.x, this.y, this.size, this.size);



        //this.ctx.fillRect(this.x, this.y, this.size, this.size);
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