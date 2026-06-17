const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const BLOCK_SIZE = 30;
let pieceX = 4;
let pieceY = 0;

canvas.width = 10 * BLOCK_SIZE;
canvas.height = 20 * BLOCK_SIZE;

// Mandos de la pieza
document.addEventListener("keydown", (event) => {

    if ((event.key === "ArrowLeft" || event.key.toLowerCase() === "a") && pieceX > 0) {
        pieceX--;
    }

    if ((event.key === "ArrowRight" || event.key.toLowerCase() === "d") && pieceX < 9) {
        pieceX++;
    }

    if ((event.key === "ArrowDown" || event.key.toLowerCase() === "s")) {

        if (pieceY >= 19) {
            spawnPiece();
        } else {
            pieceY++;
        }
    }

    draw();
});
//Llamamos a la funcion principal
draw();

// Hacemos que la pieza baje
setInterval(() => {

    if (pieceY >= 19) {
        spawnPiece();
    } else {
        pieceY++;
    }

    draw();

}, 1000);


// Fondo
function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();
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