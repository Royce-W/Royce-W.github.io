var shapes = [];
var positions = [];
var speed = [];
var colours = [];
var rotations = [];
var numberOfShapes = 30;
var score = 0;
var basketWidth = 100;

var btn, input, slider, sliderLabel, timer;
var gameStarted = false;
var userName = "";
var shapeSpeed = 1;
var timeLimit = 4; // time
var startTime;
var mysound;
var showEndScreen = false;

function preload() {
    mysound = createAudio('mysound.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create button
    btn = createButton("Start Game");
    btn.position(10, 10);
    btn.mousePressed(startGame);

    // Create text input
    input = createInput();
    input.position(10, 50);
    input.input(updateUserName);

    // Create slider label
    sliderLabel = createDiv('Adjust Speed:');
    sliderLabel.position(10, 80);
    sliderLabel.style('color', 'white');
    
    // Create slider
    slider = createSlider(1, 10, shapeSpeed);
    slider.position(10, 110);
    slider.input(updateSpeed);

    initializeShapes();
    noStroke();
    rectMode(CENTER);
    textSize(20);
}

function draw() {
    background(100);

    if (gameStarted) {
        confetti();
        drawBasket(mouseX);

        fill(255);
        textAlign(LEFT, TOP);
        textSize(24);
        text("Score: " + score, 10, 150);
        text("Player: " + userName, 10, 180);
        text("Time: " + int(timeLimit - (millis() - startTime) / 1000), 10, 210); // Display remaining time

        if (millis() - startTime > timeLimit * 1000) { // Check if time limit is reached
            endGame();
        }
    } else if (showEndScreen) {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(36);
        text("Game Over! Your score: " + score, width / 2, height / 2);
    } else {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(36);
        text("Enter your name and start the game!", width / 2, height / 2);
    }
}

function confetti() {
    var interval = windowWidth / numberOfShapes;

    for (var i = 0; i < numberOfShapes; i++) {
        fill(colours[i]);
        push();
        translate(i * interval, positions[i]);
        rotate(rotations[i]);
        if (shapes[i] === "rect") {
            rect(0, 0, 5, 30);
        } else if (shapes[i] === "circle") {
            circle(0, 0, 10);
        } else if (shapes[i] === "emoji") {
            text("😍", 0, 0);
        }
        pop();

        positions[i] += speed[i] * shapeSpeed;
        if (positions[i] > height) {
            positions[i] = -50;
        }

        // Check for catching shapes
        if (positions[i] > height - 50 && abs(mouseX - i * interval) < basketWidth / 2) {
            score++;
            positions[i] = -50; // Reset shape position
        }
    }
}

function initializeShapes() {                                
    for (var i = 0; i < numberOfShapes; i++) {
        colours[i] = color(random(255), random(255), random(255));
        rotations[i] = random(PI / 2);
        positions[i] = random(windowHeight);
        speed[i] = random(1, 7);
        if (random() > 0.4) {
            shapes[i] = "rect";
        } else if (random() > 0.5) {
            shapes[i] = "circle";
        } else {
            shapes[i] = "emoji";
        }
    }
}

// Function to draw the basket
function drawBasket(x) {
    fill(255, 204, 0);
    rect(x, height - 25, basketWidth, 20);
}

// Callback function for button
function startGame() {
    gameStarted = true;
    showEndScreen = false;
    score = 0;
    startTime = millis(); // Record the start time
}

// Callback function for text input
function updateUserName() {
    userName = this.value();
}

// Callback function for slider
function updateSpeed() {
    shapeSpeed = slider.value();
}

function endGame() {
    gameStarted = false;
    showEndScreen = true;

    // Display the score in the middle
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Game Over! Your score: " + score, width / 2, height / 2);

    // Play the end game sound
    mysound.play();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
