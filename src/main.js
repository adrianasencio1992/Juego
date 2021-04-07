let game;
let splashScreen;
let gameScreen;
let gameOverScreen;

// Creates DOM elements from a string representation
// buildDom
function buildDom(htmlString) {
    //tempDiv lo creamos para tener un elemento HTML (div) sobre el que transformar
    //nuestro string (htmlString) a formato HTML usando innerHTML
    //los strings que contengan el HTML deven tener UN SOLO ELEMENTO PADRE
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    //console.log(“tempDiv.children”, tempDiv.children)
    return tempDiv.children[0];
}

// -- splash screen
function createSplashScreen() { //Menú 
    //para un correcto tabulado del string, tabular de la línea 2 hasta el final
    splashScreen = buildDom(`
      <main>
       
        <section>
            <img id="consola" src="./imagenes/consola1.png" alt="">
            <video id="video" onloadedmetadata="this.muted=false">
                <source src="imagenes/nintendo.mp4">
            </video>
             <div id="contenedor">
             <video id="video2" onloadedmetadata="this.muted=false" loop>
                <source src="imagenes/guerra.mp4">
            </video>
            </div>
             <video id="video3" onloadedmetadata="this.muted=false">
                <source src="imagenes/videojuego1.mp4">
            </video>
            <video id="video4" onloadedmetadata="this.muted=false">
                <source src="imagenes/final.mp4">
            </video>
            
        </section>
        
        <div class="wrap">
        <button onclick="playVideo3()" id="button2">START</button>
        </div>
            <button onclick="playVideo(),playVideo2()" id="button" >ON</button>
        <footer>
        </footer>
        </main>
    `);
    //Una vez creado el elemento HTML con la función buildDom, cargamos ese HTML en la página principal
    document.body.appendChild(splashScreen);

    //seleccionamos el botón que hemos creado y le creamos un eventListener para después crear el juego
    const startButton = splashScreen.querySelector("#button2"); //ERRROR


    startButton.addEventListener("click", startGame);

}

function playVideo() { //Video de nintendo
    let video = document.querySelector('#video');
    document.querySelector('#video').style.zIndex = '5';
    video.volume = 0.1;
    video.play();
    on();

}




function playVideo2() { // Video primera Intro
    let video2 = document.querySelector('#video2');
    video2.volume = 0.1;

    setTimeout(() => { // Funcion para que empiece el segundo video
        document.querySelector('#contenedor').style.zIndex = '10';
        video2.play();
    }, 3300);

}

function playVideo3() { // Video para jugar!

    let video2 = document.querySelector('#video2');
    let video3 = document.querySelector('#video3');
    video3.volume = 0.1;
    video3.play();
    document.querySelector('#video3').style.zIndex = '15';
    document.querySelector('#button2').style.visibility = 'hidden';
    video2.pause();
}


function playVideo4() { //Video derrota
    let video4 = document.querySelector('#video4');
    document.querySelector('#video4').style.zIndex = '19';
    video4.play();

}

function returnVideo3() {
    let video5 = document.querySelector('#video3');


    document.querySelector('#video3').style.zIndex = '20';

}

function on() { // Encender consola
    let on = document.querySelector('#button');
    let pantalla = document.querySelector('#contenedor');
    button.id = "buttonGreen";
    setTimeout(() => { //Función para que salga el boton START
        document.querySelector('#button2').style.visibility = 'visible';
    }, 10800);

};




function off() { // Apagar consola
    let off = document.querySelector('#buttonGreen');
    buttonGreen.id = "button";

}

let audio = new Audio('guerra.mp3');

music = () => {
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.1;
}

musicStop = () => {
    audio.pause();
}


function removeSplashScreen() {
    // remove() is the DOM method that removes the Node from the page
    //splashScreen.remove();
    //console.log(splashScreen); //The value remains the same, but the code has been removed from the DOM.
}

// -- game screen
function createGameScreen() {
    //para un correcto tabulado del string, tabular de la línea 2 hasta el final
    gameScreen = buildDom(`
    <main class="game container">
        <header>
            <div class="lives">
                <span class="label">Lives:</span>
                <span class="value"></span>
            </div>

            <div class="score">
                <span class="label">Score:</span>
                <span class="value"></span>
            </div>
            
        </header>
        
        

        <div class="canvas-container">
            <canvas></canvas>
        </div>
       
        

    </main>
    `);

    document.body.appendChild(gameScreen);
    return gameScreen; //this we will explain later
}

function removeGameScreen() {
    gameScreen.remove();
}

// -- game over screen

function createGameOverScreen(score) {
    setTimeout(() => {
        gameOverScreen = buildDom(`
        <main id="maingameover">
            <h1 id="h1gameover">☠ GAME OVER ☠</h1>
            <p id="pgameover">Your score: <span>${score}</span> </p>
            <button id="button3" onclick="returnVideo3()">PLAY AGAIN</button>
        </main>
        `);
        const button3 = gameOverScreen.querySelector('#button3');
        button3.addEventListener("click", startGame)

        document.body.appendChild(gameOverScreen)
    }, 6000);
}



function removeGameOverScreen() {
    gameOverScreen.remove()
}
// -- Setting the game state - start or game over
contador = 0;

function startGame() {
    removeSplashScreen();
    if (gameOverScreen) {
        removeGameOverScreen();
    }
    if (contador == 0) {
        setTimeout(() => {
            createGameScreen();
            game = new Game(gameScreen);
            //game.gameScreen = gameScreen;
            game.start();
            contador++;
            music();

        }, 18000);

    } else {
        setTimeout(() => {
            createGameScreen();
            game = new Game(gameScreen);
            //game.gameScreen = gameScreen;
            game.start();
            contador++;
            music();

        }, 1000);
    }
}

function endGame(score) {
    removeGameScreen();
    createGameOverScreen(score);
    playVideo4()
    musicStop();
}

window.addEventListener("load", createSplashScreen);