var canvas, ctx, scoreDiv, maxScoreDiv;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    scoreDiv = document.querySelector(".score"); // Get the score div
    maxScoreDiv = document.querySelector(".max-score"); // Get the max score div
    document.addEventListener("keydown", keyDownFn);
    var fps = 10; // Reduced frame rate to slow down the snake
    setInterval(draw, 1000 / fps); // Use fps to control the speed
}

var gridSize = 20; // Number of tiles in the grid (both width and height)
var tileSize = 20; // Size of each tile in pixels
var nextX = 0, nextY = 0;
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = 10, snakeY = 10;
var appleX = 15, appleY = 15;
var score = 0; // Variable to keep track of the score
var maxScore = 0; // Variable to keep track of the max score

function draw() {
    // Update snake position
    snakeX += nextX;
    snakeY += nextY;

    // Wrap snake position on edge of screen
    if (snakeX < 0) {
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
        snakeY = 0;
    }

    // Check if snake eats apple
    if (snakeX === appleX && snakeY === appleY) {
        tailSize++;
        score++; // Increment score when the snake eats an apple
        updateScore(); // Update the score display
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    // Clear the canvas
    ctx.fillStyle = "#283044";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#414E70";

    // Draw grid
    for (let i = 0; i < gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tileSize, 0);
        ctx.lineTo(i * tileSize, gridSize * tileSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * tileSize);
        ctx.lineTo(gridSize * tileSize, i * tileSize);
        ctx.stroke();
    }

    // Create linear gradient for snake
    var grd = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);
    grd.addColorStop(0.0, "#EDD040");
    grd.addColorStop(0.170, "#99ED40");
    grd.addColorStop(0.350, "#40D6ED");
    grd.addColorStop(0.500, "#9940ED");
    grd.addColorStop(0.690, "#ED40A8");
    grd.addColorStop(0.880, "#ED4040");
    grd.addColorStop(1.0, "#ED8540");

    ctx.fillStyle = grd; // Snake color

    // Draw snake
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(snakeTrail[i].x * tileSize, snakeTrail[i].y * tileSize, tileSize, tileSize);

        // Check collision with tail
        if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
            tailSize = defaultTailSize; // Restart the game
            if (score > maxScore) {
                maxScore = score; // Update max score if current score is higher
                updateMaxScore(); // Update the max score display
            }
            score = 0; // Reset the score
            updateScore(); // Update the score display
        }
    }

    // Draw apple
    ctx.fillStyle = grd; // Apple color
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // Update snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
}

function keyDownFn(e) {
    switch (e.keyCode) {
        case 37: // Left arrow
            if (nextX !== 1 || snakeTrail.length === 0) {
                nextX = -1;
                nextY = 0;
            }
            break;
        case 38: // Up arrow
            if (nextY !== 1 || snakeTrail.length === 0) {
                nextX = 0;
                nextY = -1;
            }
            break;
        case 39: // Right arrow
            if (nextX !== -1 || snakeTrail.length === 0) {
                nextX = 1;
                nextY = 0;
            }
            break;
        case 40: // Down arrow
            if (nextY !== -1 || snakeTrail.length === 0) {
                nextX = 0;
                nextY = 1;
            }
            break;
    }
}

function updateScore() {
    scoreDiv.textContent = "Score: " + score;
}

function updateMaxScore() {
    maxScoreDiv.textContent = "Max Score: " + maxScore;
}
