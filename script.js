const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 600;

// Fondo
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Bloque rojo
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 30, 30);