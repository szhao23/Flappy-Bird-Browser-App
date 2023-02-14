// We need access to game canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
// We need access to game container
const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = "assets/flappy_dunk.png";

// Game constant variables
const flappy_speed = -5;
const bird_width = 40;
const bird_height = 30;
const wall_height = 50;
const wall_gap = 125;

// Bird Variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// Wall Variables
let wallX = 400;
let wallY = canvas.height - 200;

// Score Variables
let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;

document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = flappy_speed;
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
  //   ctx.fillStyle = "#333";

  // Apply Gravity Mechanism to the Bird and allow it to move
  birdVelocity += birdAcceleration;
  birdY += birdVelocity;

  requestAnimationFrame(loop);
}

loop();
