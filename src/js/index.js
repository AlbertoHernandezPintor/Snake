eventHandler();

/*********************/
/*     Funciones     */
/*********************/

// Función que maneja los eventos del HTML
function eventHandler() {
    document.querySelector(".play-button").addEventListener("click", function(){initGame()});
}

// Función que incia la partida
function initGame() {
    var canvas = document.querySelector(".canvas");
    var context = canvas.getContext("2d");
    var scale = 10;
    var rows = canvas.height / scale;
    var columns = canvas.width / scale;
    var x = 0;
    var y = 0;

    var snake = new Snake();
    snake.drawSnake(x, y, context, scale);
}

/*********************/
/*       Clases      */
/*********************/

// Clase serpiente
class Snake {

    constructor() {
    }

    // Función que dibuja la serpiente
    drawSnake (x, y, context, scale) {
        context.fillStyle = "#1C8005";
        context.fillRect(x, y, scale, scale);
    }
}