const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const board = Array.from(
    { length: BOARD_HEIGHT },
    () => Array(BOARD_WIDTH).fill(0)
);

const BLOCK_SIZE = 50;// Tamaño del bloque en píxeles(tambien hace que se vea mas grande o mas pequeño el tablero)
// Posición inicial de la pieza
let pieceX = 4;
let pieceY = 0;

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

// Mandos de la pieza
document.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    if ((key === "ArrowLeft" || key === "a") && pieceX > 0) {
        pieceX--;
    }

    if ((key === "ArrowRight" || key === "d") && pieceX <  BOARD_WIDTH - 1) {
        pieceX++;
    }

    if ((key === "ArrowDown" || key === "s")) {

        if (canMoveDown()) {
            pieceY++;
        } else {
            lockPiece();
        }
    }

    draw();
});
//Llamamos a la funcion principal
draw();

// Hacemos que la pieza baje
setInterval(() => {

    if (canMoveDown()) {
        pieceY++;
    } else {
        lockPiece();
    }

    draw();

}, 1000);


// Fondo
function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawBoard();
    drawPiece();
}
// Color de la cuadrícula
function drawGrid() {
    ctx.strokeStyle = "#333";

    for (let x = 0; x <= canvas.width; x += BLOCK_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += BLOCK_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}
// Dibujar la pieza
function drawPiece() {
    ctx.fillStyle = "red";

    ctx.fillRect(
        pieceX * BLOCK_SIZE,
        pieceY * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
    );
}
    // Añadimos una nueva pieza
    function spawnPiece() {
        pieceX = 4;
        pieceY = 0;
    }
    // Dibijamos la pieza para que se quede en el tablero
    function lockPiece() {
        board[pieceY][pieceX] = 1;
        spawnPiece();
    }
    // Comprobamos si la pieza puede moverse hacia abajo
    function canMoveDown() {

    // Suelo
    if (pieceY >= BOARD_HEIGHT - 1) {
        return false;
    }

    // Bloque debajo
    if (board[pieceY + 1][pieceX] === 1) {
        return false;
    }

    return true;
}
// Dibujar el tablero y darle un array para poder dibujar las piezas que se han quedado en el tablero
function drawBoard() {

    ctx.fillStyle = "cyan";

    for (let y = 0; y < BOARD_HEIGHT; y++) {

        for (let x = 0; x < BOARD_WIDTH; x++) {

            if (board[y][x] === 1) {

                ctx.fillRect(
                    x * BLOCK_SIZE,
                    y * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        }
    }
}
