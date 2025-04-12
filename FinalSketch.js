var spaceshipImg; // Spaceship image
var spaceship; // Spaceship object
var asteroids = []; // Array for asteroid objects
var bullets = []; // Array for bullets
var score = 0; // Player's score
var highScore = 0; // High score tracking
var gameOver = false; // Game over state
var gameStarted = false; // Tracks if the game has started
var restartButton; // Restart button

function setup() {
  // Create canvas and immediately set its CSS background to your space.jpg;
  var cnv = createCanvas(400, 800); 
  // Set the canvas’s background via style
  cnv.style("background", 'url("space.jpg") no-repeat center center');
  cnv.style("background-size", "cover");
  
  noCursor(); // Hide the default cursor

  // Create the spaceship image (using createImg, as before)
  spaceshipImg = createImg(
    'spaceship.png'
  );
  spaceshipImg.size(50, 50); // Resize the image
  spaceshipImg.style('position', 'absolute'); // Allow dynamic positioninghttps://th.bing.com/th?id=OIP.xWtT98p9U3UlbVLuMROfyQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2
  spaceshipImg.hide(); // Initially hide the spaceship image

  // Initialize the spaceship object
  spaceship = new Spaceship();

  // Create initial asteroids
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }

  // Handle the start button logic
  var startButton = document.getElementById('startButton');
  startButton.addEventListener('click', function () {
    gameStarted = true; // Start the game
    spaceshipImg.show(); // Show the spaceship image
    document.getElementById('startContainer').style.display = 'none'; // Hide the start screen
  });

  // Create the restart button (for Game Over screen)
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 50, height / 2 + 50); // Centered below "Game Over"
  restartButton.style("padding", "10px 20px");
  restartButton.style("background", "cyan");
  restartButton.style("border", "none");
  restartButton.style("border-radius", "5px");
  restartButton.style("cursor", "pointer");
  restartButton.hide(); // Initially hide the restart button
  restartButton.mousePressed(resetGame); // Attach reset logic
}

function draw() {
  if (!gameStarted) {
    return; // Prevents drawing of the game until "Start" is clicked
  }

  // Clear the canvas every frame (this makes the canvas show its CSS background)
  clear();

  // Display score and high score
  fill("white");
  textSize(20);
  text(`Score: ${score}`, 10, 25);
  text(`High Score: ${highScore}`, 10, 50);

  // Check if the game is over
  if (gameOver) {
    textSize(50);
    fill("red");
    text("Game Over!", width / 2 - 150, height / 2);

    restartButton.show(); // Show the restart button
    noLoop(); // Stop the game loop
    return;
  }
//****************************************************************************************************************************************************************************************************************************************************************
  // This is my favorite block of code because it prevents the spaceship from leaving the playable area without extra conditionals. It's a simple, effective solution that was sort of my aha moment when I was stuck figuring out how to set a restriction.
//****************************************************************************************************************************************************************************************************************************************************************
  var constrainedX = constrain(mouseX, 0, width);
  var constrainedY = constrain(mouseY, 0, height);
  spaceship.update(constrainedX, constrainedY); // Update the spaceship position
  spaceship.show();

  // Update and draw asteroids
  for (var asteroid of asteroids) {
    asteroid.update();
    asteroid.show();
    if (asteroid.hits(spaceship)) {
      gameOver = true; //summons game over
      highScore = max(highScore, score); // Update high score
    }
  }

  // Update and draw bullets
  for (var bullet of bullets) {
    bullet.update();
    bullet.show();
  }

  // Check for collisions between bullets and asteroids
  for (var i = bullets.length - 1; i >= 0; i--) {
    for (var j = asteroids.length - 1; j >= 0; j--) {
      if (bullets[i].hits(asteroids[j])) {
        score++; // Increment score
        bullets.splice(i, 1); // Remove bullet
        asteroids.splice(j, 1); // Remove asteroid
        asteroids.push(new Asteroid()); // Add new asteroid
        break;
      }
    }
  }
}

// Spaceship class
class Spaceship {
  constructor() {
    this.size = 50; // Size matches the spaceship image
  }

  update(x, y) {
    // Position the spaceship image based on mouse (constrained) position
    spaceshipImg.position(x - this.size / 2, y - this.size / 2);
    this.pos = createVector(x, y);
  }

  show() {
    // The spaceship image itself is drawn by the DOM element, so no additional drawing needed.
  }
}

// Asteroid type
class Asteroid {
  constructor() {
    this.pos = createVector(random(width), random(-500, -50));
    this.size = random(30, 60);
    this.vel = createVector(0, random(2, 5));
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y > height) {
      this.pos.y = random(-500, -50);
      this.pos.x = random(width);
    }
  }

  show() {
    fill("gray");
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  hits(spaceship) {
    var d = dist(this.pos.x, this.pos.y, spaceship.pos.x, spaceship.pos.y);
    return d < this.size / 2 + spaceship.size / 2;
  }
}

class Bullet {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -5);
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    fill("red");
    ellipse(this.pos.x, this.pos.y, 10, 20);
  }

  hits(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.size / 2;
  }
}

function mousePressed() {
  if (gameStarted && !gameOver) {
    // Fire a bullet when clicking
    bullets.push(new Bullet(mouseX, mouseY));
  }
}

function resetGame() {
  score = 0; // Reset score
  gameOver = false; // Reset game over state
  bullets = []; // Clear bullets
  asteroids = []; // Clear asteroids
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid()); // Create new asteroids
  }
  restartButton.hide(); // Hide the restart button
  spaceshipImg.show(); // Show the spaceship image again
  loop(); // Resume the game loop
}

