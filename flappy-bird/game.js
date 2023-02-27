// We need access to game canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
// We need access to game container
const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = "assets/flappy_dunk.png";

// Game constant variables
// Flappy_Speed affects how big the bird can jump
const Flappy_Speed = -10;
const Bird_Width = 40;
const Bird_Height = 30;
const Wall_Width = 50;
const Wall_Gap = 125;

// Bird Variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0.85;
let birdAcceleration = 0.65;

// Wall Variables
let wallX = 400;
let wallY = canvas.height - 200;

// Score Variables
let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;

// Add a boolean variable, so when the Bird passes the wall we can increase the value of the score
let scored = false;

// Lets user control the bird with the space key
document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = Flappy_Speed;
  }
};

// Let's the user reset the game if they hit Game Over
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    hideEndMenu();
    restartGame();
    loop();
  });

// Increase Flappy Bird score
function increaseScore() {
  if (
    birdX > wallX + Wall_Width &&
    (birdY < wallY + Wall_Gap || birdY + Bird_Height > wallY + Wall_Gap) &&
    !scored
  ) {
    score++;
    scoreDiv.innerHTML = score;
    scored = true;
  }

  // Set the Counter if the Bird passes the Pipes
  if (birdX < wallX + Wall_Width) {
    scored = false;
  }
}

// Increase Speed/Difficulty if the Score increases
function increaseDifficulty() {
  if (score > 10) {
    birdVelocity = 0.5;
    birdAcceleration = 5;
  }
}

// Collision Check with Wall
function collisionCheck() {
  // Creating bounding Boxes for the bird and the walls

  const birdBox = {
    x: birdX,
    y: birdY,
    width: Bird_Width,
    height: Bird_Height,
  };

  const topWallBox = {
    x: wallX,
    y: wallY - Wall_Gap + Bird_Height,
    width: Bird_Width,
    height: wallY,
  };

  const bottomWallBox = {
    x: wallX,
    y: wallY + Wall_Gap + Bird_Height,
    width: Wall_Width,
    height: canvas.height - wallY - Wall_Gap,
  };

  // Checking for Collision with upper Walls
  if (
    birdBox.x + birdBox.width > topWallBox.x &&
    birdBox.x < topWallBox.x + topWallBox.width &&
    birdBox.y < topWallBox.y
  ) {
    return true;
  }

  // Checking for Collision with lower Walls
  if (
    birdBox.x + birdBox.width > bottomWallBox.x &&
    birdBox.x < bottomWallBox.x + bottomWallBox.width &&
    birdBox.y + birdBox.height > bottomWallBox.y
  ) {
    return true;
  }

  // Check if the bird hits the boundaries
  if (birdY < 0 || birdY + Bird_Height > canvas.height) {
    return true;
  }

  return false;
}

// Hide Menu
function hideEndMenu() {
  document.getElementById("end-menu").style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

// Display Menu
function displayEndMenu() {
  document.getElementById("end-menu").style.display = "block";
  gameContainer.classList.add("backdrop-blur");
  document.getElementById("end-score").innerHTML = score;

  // This is how we can update our highscore at the end of the game
  // If the user has a higher score than the previous
  if (highScore < score) {
    highScore = score;
  }
  document.getElementById("best-score").innerHTML = highScore;
}

// Reset Game Function
function restartGame() {
  birdX = 50;
  birdY = 50;
  birdVelocity = 0.85;
  birdAcceleration = 0.65;

  wallX = 400;
  wallY = canvas.height - 200;

  score = 0;
}

// Quit Game
function quitGame() {
  //   alert("Game over you lost");
  displayEndMenu();
}

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
    quitGame();
    return;
  }

  // call increaseScore function to increase the counter
  increaseScore();
  //   increaseDifficulty();
  requestAnimationFrame(loop);
}

loop();
