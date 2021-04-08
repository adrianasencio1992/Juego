class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.enemies = [];
        this.player = null;
        this.gameIsOver = false;
        this.gameScreen = gameScreen;
        this.score = 0;
        this.livesElement = undefined;
        this.scoreElement = undefined;
        this.framesCounter = 0;

    }

    // Create `ctx`, a `player` and start the Canvas loop
    start() {
        // Save references to the score and lives elements
        this.livesElement = this.gameScreen.querySelector(".lives .value");
        this.scoreElement = this.gameScreen.querySelector(".score .value");

        // Get and create the canvas and it's context
        this.canvas = this.gameScreen.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // Set the canvas dimensions
        this.canvasContainer = this.gameScreen.querySelector(".canvas-container");
        this.containerWidth = this.canvasContainer.clientWidth;
        this.containerHeight = this.canvasContainer.clientHeight;
        this.canvas.setAttribute("width", this.containerWidth);
        this.canvas.setAttribute("height", this.containerHeight);

        this.player = new Player(this.canvas, 25, './imagenes/sprite.png'); //Vidas jugador

        this.startLoop();
    }

    startLoop() {

        let num = 0;

        setInterval(function() {
            num++;
            return num;

        }, 1000);

        const loop = () => {
            //1. ACTUALIZAR los estados del jugador y los enemigos
            // -- 1.0 Nuestro jugador ya esta creado en la función start
            // -- 1.1 Crear enemigos en posiciones aleatorias con una frecuencia aleatoria
            this.framesCounter++

                if (this.enemies.length < 10) {
                    if (Math.random() > 0.95) {
                        if (num >= 0 && num <= 10) {
                            const randomY2 = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy2 = new Enemy2(this.canvas, randomY2, 8, '#ffffff', "muerte2", './imagenes/spritebala2.png'); //velocidad
                            this.enemies.push(newEnemy2);

                        } else if (num >= 11 && num <= 30) {
                            const randomY = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy = new Enemy(this.canvas, randomY, 7, '#000000', "muerte", './imagenes/spritebala.png'); //velocidad
                            this.enemies.push(newEnemy);
                            const randomY2 = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy2 = new Enemy2(this.canvas, randomY2, 9, '#ffffff', "muerte2", './imagenes/spritebala2.png');
                            this.enemies.push(newEnemy2);

                        } else if (num >= 31 && num <= 60) {
                            const randomY = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy = new Enemy(this.canvas, randomY, 10, '#000000', "muerte", './imagenes/spritebala.png');
                            this.enemies.push(newEnemy);
                            const randomY2 = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy2 = new Enemy2(this.canvas, randomY2, 12, '#ffffff', "muerte2", './imagenes/spritebala2.png'); //velocidad
                            this.enemies.push(newEnemy2);

                        } else if (num >= 61) {
                            const randomY = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy = new Enemy(this.canvas, randomY, 12, '#000000', "muerte", './imagenes/spritebala.png'); //velocidad
                            this.enemies.push(newEnemy);
                            const randomY2 = Math.floor((this.canvas.height - 20) * Math.random()); //En que punto salen
                            const newEnemy2 = new Enemy2(this.canvas, randomY2, 14, '#ffffff', "muerte2", './imagenes/spritebala2.png');; //velocidad
                            this.enemies.push(newEnemy2);

                        }

                    }
                    if (Math.random() > 0.99) {
                        const randomY3 = Math.floor((this.canvas.height, 255) * Math.random()); //En que punto salen
                        const newEnemy3 = new Enemy3(this.canvas, randomY3, 4, '#ffffff', "vida", './imagenes/spritebotiquin.png'); //velocidad

                        this.enemies.push(newEnemy3);
                    }
                    if (Math.random() > 0.997) {
                        const randomY4 = Math.floor((this.canvas.height - 140) * Math.random()); //En que punto salen
                        const newEnemy4 = new Enemy4(this.canvas, randomY4, 3, '#ffffff', "muerte3", './imagenes/lorgio2.png');; //velocidad
                        this.enemies.push(newEnemy4);
                    }
                }

            this.player.confirmeMove();
            this.player.movePlayer();
            // -- 1.2 Comprobar si el jugador ha colisionado con algún enemigo
            this.checkCollisions();
            // -- 1.3 Actualizar la posición del jugador
            this.player.handleScreenCollision();
            // -- 1.4 Mover a todos los enemigos y filtrar a los que se queden fuera
            //Dado que el método filter recorre el array, lo aprovechamos para que también mueva a los enemigos
            this.enemies = this.enemies.filter((enemy) => {
                enemy.updatePosition();
                return enemy.isInsideScreen();
            });

            //2. LIMPIAR CANVAS
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //3. DIBUJAR DE NUEVO EL CANVAS CON LAS POSICIONES ACTUALIZADAS EN EL PASO 1
            this.player.draw(this.framesCounter);
            this.enemies.forEach((enemy) => {
                enemy.draw(this.framesCounter);
            });
            //4. ROMPER EL LOOP EN CASO DE GAME OVER (LIVES <= 0)
            if (!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            }
            //5. ACTUALIZAR PUNTUACIÓN Y VIDAS que mostramos por pantalla (HTML)
            this.updateGameStats();
        };
        loop();
    }
    checkCollisions() {
        //this.enemies contiene todos los enemigos que hemos ido creando durante el juego.
        //iteramos sobre este array para comprobar si cada uno de los enemigos ha colisionado con el player
        this.enemies.forEach((enemy) => {
            if (enemy.type === "muerte") {
                if (this.player.didCollide(enemy)) {
                    this.player.removeLife();


                    //mover el enemigo fuera de la pantalla
                    enemy.x = 0 - enemy.size;

                    if (this.player.lives === 0) {
                        this.gameOver();
                    }

                }
            }
            if (enemy.type === "muerte2") {
                if (this.player.didCollide(enemy)) {
                    this.player.removeLife();


                    //mover el enemigo fuera de la pantalla
                    enemy.x = 0 - enemy.size;

                    if (this.player.lives === 0) {
                        this.gameOver();
                    }

                }
            }
            if (enemy.type === "muerte3") {
                if (this.player.didCollide(enemy)) {
                    this.player.removeLife();
                    this.player.sizeLorgio();
                    this.player.risa();


                    //mover el enemigo fuera de la pantalla
                    enemy.x = 0 - enemy.size;

                    if (this.player.lives === 0) {
                        this.gameOver();
                    }

                }
            }


            if (enemy.type === "vida") {
                if (this.player.didCollide(enemy)) {
                    this.player.augmentLife();


                    //mover el enemigo fuera de la pantalla
                    enemy.x = 0 - enemy.size;

                }
            }
        })
    }



    gameOver() {
        this.gameIsOver = true;
        endGame(this.score);
    }
    updateGameStats() {
        this.score += 10;
        this.livesElement.innerHTML = this.player.lives;
        this.scoreElement.innerHTML = this.score;
    }
}