var allthekitties = [];
var currentkitty = 0;
var kittyposition = {x: 100, y: 100, w: 100, h: 100};
var score = 0; // Track score
var kittyID = ""; // Store metadata for the current cat

function preload() {
    let url = 'https://api.thecatapi.com/v1/images/search?limit=15&category_ids=5';
    loadJSON(url, successCallback); // Fetch data from the Cat API
}

function successCallback(data) {
    console.log(data); // Log fetched data
    for (kitty of data) {
        var kittyImg = createImg(kitty.url); // Create image element for each kitty
        kittyImg.hide(); // Hide the image until it's displayed on the canvas
        allthekitties.push({img: kittyImg, id: kitty.id}); // Store image and metadata
    }
}

function setup() {
    createCanvas(600, 350);
    background('pink');
}

function draw() {
    background('pink'); // Clear the canvas

    // Draws cat
    image(allthekitties[currentkitty].img, kittyposition.x, kittyposition.y, kittyposition.w, kittyposition.h);

    // Mta Data &current score
    fill('black');
    textSize(16);
    text(`Cat ID: ${kittyID}`, 10, 20); // Display cat ID
    text(`Score: ${score}`, 10, 40); // Display score
}

function mousePressed() {
    // If the kitty is clicked, update the score and switch to the next kitty
    if (
        mouseX > kittyposition.x &&
        mouseX < kittyposition.x + kittyposition.w &&
        mouseY > kittyposition.y &&
        mouseY < kittyposition.y + kittyposition.h
    ) {
        currentkitty++;
        currentkitty = currentkitty % allthekitties.length; // Cycle through the kitties
        kittyposition.x = random(width - kittyposition.w);
        kittyposition.y = random(height - kittyposition.h);
        kittyID = allthekitties[currentkitty].id; // Update the displayed ID
        score++; // Increment score
    }
}
