const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

//Array del tablero (formatos de 0 y 1)
const board = Array.from(
    { length: BOARD_HEIGHT },
    () => Array(BOARD_WIDTH).fill(0)
);
// Tamaño del bloque en píxeles
const BLOCK_SIZE = 50;
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

    render();
});


render();

// Bucle que hace que la pieza baje cada segundo
setInterval(() => {

    if (canMoveDown()) {// Si puede moverse hacia abajo, la pieza baja
        pieceY++;
    } else {
        lockPiece(); // Si no puede moverse hacia abajo, ponemos un 1 en el array del tablero y spawneamos la pieza arriba
    }

    render();

}, 1000);


// Imprimimos el tablero, la pieza azul estaticas y la pieza roja en movimiento
function render() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();//malla
    drawBoard();//pieza azul estatica
    drawPiece();//pieza roja en movimiento

}

// Dibujamos la cuadrícula del tablero y elegimos el color
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

// Dibujamos la pieza ya ocupada en el array del tablero, para que se quede en el tablero y no se mueva
function drawBoard() {

    ctx.fillStyle = "blue";

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

// Dibujar la pieza roja que se mueve
function drawPiece() {
    ctx.fillStyle = "red";

    ctx.fillRect(
        pieceX * BLOCK_SIZE,
        pieceY * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
    );
}




    // Spawneamos la pieza arriba
    function spawnPiece() {

        pieceX = 4;
        pieceY = 0;

    }

    // Cogemos las coordenadas de la pieza y en el array del tablero 
    // le damos un 1 para marcar que esta ocupada y volvemos a spawnear la pieza
    function lockPiece() {

        board[pieceY][pieceX] = 1;
        checkLines();
        spawnPiece();

    }

    // Comprobamos si la pieza puede moverse hacia abajo
    function canMoveDown() {

        // Debajo ya el suelo?  False es que no puede moverse hacia abajo
        if (pieceY >= BOARD_HEIGHT - 1) {
            return false;
        }

        // Debajo pieza ocupada?  False es que ya hay una pieza ocupada
        if (board[pieceY + 1][pieceX] === 1) {
            return false;
        }

        return true;
    }

    function checkLines() {

        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
            if (board[y].every(cell => cell === 1)) {
                // Borrar la fila completa
                board.splice(y, 1);
                // Añadir una nueva fila vacía en la parte superior
                board.unshift(Array(BOARD_WIDTH).fill(0));

                y++; // Revisa la misma fila nuevamente después de eliminarla
            }
        }
    }