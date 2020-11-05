eventHandler();

/*********************/
/*     Funciones     */
/*********************/

// Función que maneja los eventos del HTML
function eventHandler() {
    document.querySelector(".play-button").addEventListener("click", function(){initGame()});
}

// Función que maneja los eventos de teclado
function keyEvents(match) {
    window.addEventListener('keydown', ((evt) => {
        match.direction = evt.key.replace('Arrow', '');
        match.changeDirection();
    }))
}

// Función que incia la partida
function initGame() {
    var canvas = document.querySelector(".canvas");

    var match = new Match(canvas, canvas.getContext("2d"), 10, 0, 0, "", 10, 0, canvas.clientHeight / 10, canvas.clientWidth / 10);
    var snake = new Snake([], 0);
    var tonic = new Tonic(0, 0, match);

    keyEvents(match);

    // Sacamos una tónica en un lugar al azar
    tonic.chooseLocation(match);

    window.setInterval(() => {
        match.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        tonic.drawTonic(match);
        snake.update(match);
        snake.drawSnake(match);

        if (snake.drinkTonic(tonic, match) === true) {
            tonic.chooseLocation(match);
        }
    }, 250);
}

/*********************/
/*       Clases      */
/*********************/

// Clase serpiente
class Snake {

    constructor(tail, total) {
        this.tail = tail;
        this.total = total;
    }

    // Función que dibuja la serpiente
    drawSnake (match) {
        match.context.fillStyle = "#1C8005";

        for (let i = 0; i < this.tail.length; i++) {
            match.context.fillRect(this.tail[i].x, this.tail[i].y, match.scale, match.scale);
        }
        match.context.fillRect(match.x, match.y, match.scale, match.scale);
    }

    // Función de actualización del estado del juego
    update (match) {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = {x: match.x, y: match.y};

        match.x += match.xSpeed;
        match.y += match.ySpeed;

        // Comprobamos si se sale de los límites para que aparezca en el otro extremo
        if (match.x > match.canvas.clientWidth) {
            match.x = 0;
        } else if (match.y > match.canvas.clientHeight) {
            match.y = 0;
        } else if (match.x < 0) {
            match.x = match.canvas.clientWidth;
        } else if (match.y < 0) {
            match.y = match.canvas.clientHeight;
        }
    }

    // Funbción que comprueba si la serpiente se ha tomado una tónica
    drinkTonic(tonic, match) {
        if (match.x === tonic.x && match.y === tonic.y) {
            this.total++;
            return true;
        }

        return false;
    }
}

// Clase tónico
class Tonic {

    constructor(x, y, match) {
        this.x = x;
        this.y = y;
        this.match = match;
    }

    chooseLocation(match) {
        this.x = (Math.floor(Math.random() * match.rows - 1) + 1) * match.scale;
        this.y = (Math.floor(Math.random() * match.columns - 1) + 1) * match.scale;
    }

    // Función que dibuja la tónica
    drawTonic (match) {
        match.context.fillStyle = "#FA0000";
        match.context.fillRect(this.x, this.y, match.scale, match.scale);
    }
}

// Clase con todos los parámetros de la partida
class Match {

    constructor(canvas, context, scale, x, y, direction, xSpeed, ySpeed, rows, columns) {
        this.canvas = canvas;
        this.context = context;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.rows = rows;
        this.columns = columns;
    }

    // Función que dependiendo de la dirección se cambia la velocidad para que se mueva en una dirección u otra
    changeDirection() {
        if (this.direction === 'Up') {
            this.xSpeed = 0;
            this.ySpeed = -this.scale * 1;
        } else if (this.direction === 'Down') {
            this.xSpeed = 0;
            this.ySpeed = this.scale * 1;
        } else if (this.direction === 'Left') {
            this.xSpeed = -this.scale * 1;
            this.ySpeed = 0;
        } else  {
            this.xSpeed = this.scale * 1;
            this.ySpeed = 0;
        }
    }
}