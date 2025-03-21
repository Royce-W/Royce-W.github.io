var bubbles = [];
var score = 0;
var timeRemaining = 30;
var currentTime = 0;
var popSound;
var bgImage;

function preload() {
    // Load the background image
    bgImage = loadImage('BubbleBackground.jpg'); // background image in folder
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Load the pop sound
    popSound = createAudio('PopSound.mp3');

    createBubbles(15); // Create initial bubbles
}

function createBubbles(numberOfBubbles) {
    for (var i = 0; i < numberOfBubbles; i++) {
        var bubble = {
            diameter: 25,
            pos: createVector(random(25, width - 25), random(25, height - 25)),
            vel: p5.Vector.random2D(),
            colour: 'blue',
            draw: function() {
                fill(this.colour);
                circle(this.pos.x, this.pos.y, this.diameter);
                this.pos.add(this.vel);
                // Bounce bubbles off edges
                if (this.pos.y < this.diameter / 2 || this.pos.y > height - this.diameter / 2) {
                    var n = createVector(0, 1);
                    this.vel.reflect(n);
                }
                if (this.pos.x < this.diameter / 2 || this.pos.x > width - this.diameter / 2) {
                    var n = createVector(1, 0);
                    this.vel.reflect(n);
                }
            }
        };
        bubbles.push(bubble);
    }
}

function draw() {
    // Draw the background image
    image(bgImage, 0, 0, width, height);

    // Check for bubble overlaps and handle collisions
    for (bubble of bubbles) {
        for (otherBubble of bubbles) {
            if (bubble === otherBubble) {
                continue;
            }
            if (bubble.pos.dist(otherBubble.pos) < bubble.diameter / 2 + otherBubble.diameter / 2) {
                var n = createVector(1, 1);
                bubble.vel.reflect(n);
            }
        }
    }

    // Draw the bubbles
    for (bubble of bubbles) {
        bubble.draw();
    }

    // Update and display the score and timer
    fill(0);
    text("Score: " + score, 20, 20);
    currentTime += deltaTime;
    timeRemaining = 30 - (currentTime / 1000);
    text("Time: " + timeRemaining.toFixed(1) + "s", 20, 40);

    // End the game when time runs out
    if (timeRemaining <= 0) {
        bubbles = [];
        noLoop();
    }
}

function mousePressed() {
    // Check if a bubble is clicked
    for (bubble of bubbles) {
        var mouseVec = createVector(mouseX, mouseY);
        var distance = bubble.pos.dist(mouseVec);
        if (distance < bubble.diameter / 2) {
            score++; // Increment score
            bubble.popMe = true; // Mark bubble for removal

            // Play the pop sound
            if (popSound) {
                popSound.play();
            }
        }
    }

    // Remove popped bubbles
    bubbles = bubbles.filter(function(bubble) {
        return !bubble.popMe;
    });

    // Add new bubbles if fewer than 2 remain
    if (bubbles.length <= 1) {
        createBubbles(7);
    }
}
