// We need access to game canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
// We need access to game container
const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = "assets/flappy_dunk.png";

// Game constant variables
const Flappy_Speed = -5;
const Bird_Width = 40;
const Bird_Height = 30;
const Wall_Width = 50;
const Wall_Gap = 125;

// Bird Variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0.2;
let birdAcceleration = 0.2;

// Wall Variables
let wallX = 400;
let wallY = canvas.height - 200;

// Score Variables
let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;

document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = Flappy_Speed;
  }
};

// Increase Flappy Bird score
function increaseScore() {
  //
}

// Collision Check with Wall
function collisionCheck() {
  //
}

// Hide Menu
function hideEndMenu() {
  document.getElementById("end.menu").style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

// Display Menu
function displayEndMenu() {
  document.getElementById("end.menu").style.display = "block";
  gameContainer.classList.add("backdrop-blur");
  document.getElementById("end-score").innerHTML = score;
}

// Reset Game Function
function restartGame() {
  //
}

// Quit Game
function quitGame() {}

// Loop
function loop() {
  // Reset the Context after every loop iteration
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

  // Draw the Flappy Bird
  ctx.drawImage(flappyImg, birdX, birdY);

  // Draw the Walls
  ctx.fillStyle = "#333";
  ctx.fillRect(wallX, -100, Wall_Width, wallY);
  ctx.fillRect(wallX, wallY + Wall_Gap, Wall_Width, canvas.height - wallY);

  // Move the Walls
  wallX -= 1.5;
  // if the Wall moves out of the frame we need to reset it
  if (wallX < -50) {
    wallX = 400;
    wallY = Math.random() * (canvas.height - Wall_Gap) + Wall_Width;
  }

  // Apply Gravity Mechanism to the Bird and allow it to move
  birdVelocity += birdAcceleration;
  birdY += birdVelocity;

  // Collision Check if bird hits the Wall(s) and Display End Menu if so and End the Game
  // Collision Check returns true if Wall is hit, otherwise returns false
  if (collisionCheck()) {
    endGame();
    return;
  }

  requestAnimationFrame(loop);
}

loop();
