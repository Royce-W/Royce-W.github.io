// References: (keep your existing references)
var fireworks = [];
var addTriangles = true;
var particleDensity = 80;
var densitySlider, toggleBtn;
var bgImage; // <-- Add this

function preload() {
  bgImage = loadImage('https://th.bing.com/th/id/OIP.Pe04Wpy35A5L-hT9oS7sZgHaE7?rs=1&pid=ImgDetMain'); // Example space image
}

// ... keep your existing setup and other functions ...

function draw(){
    image(bgImage, 0, 0, width, height); // <-- Replaced background(0)
    
    // ... rest of your existing draw code ...
}
function createEmbers(x,y){
    var originx = x;
    var originy = y;
    for(var i = 0; i < particleDensity; i++){ 
        var ember = {
            x: originx,
            y: originy,
            xspeed: random(-2,2),
            yspeed: random(-2,2),
            alpha: 255,
            colour: color(random(255), random(255), random(255), 255),
            draw: function(){
                strokeWeight(2);
                stroke(this.colour);
                point(this.x,this.y);
                this.update();
            },
            update: function(){
                this.x += this.xspeed;
                this.y += this.yspeed;
                this.yspeed += 0.05;
                this.alpha -= 2;
                this.colour.setAlpha(this.alpha);
            },
        };
        fireworks.push(ember);
    }
}

function createTriangles(x,y){
    var originx = x;
    var originy = y;
    for(var i = 0; i < particleDensity; i++){ 
        var ember = {
            x: originx,
            y: originy,
            xspeed: random(-2,2),
            yspeed: random(-2,2),
            alpha: 255,
            rotation: random(TWO_PI),
            colour: color(random(255), random(255), random(255), 255),
            draw: function(){
                fill(this.colour);
                noStroke();
                push();
                translate(this.x,this.y);
                rotate(this.rotation);
                triangle(0,0, 5,5, -5,5);
                pop();
                this.update();
            },
            update: function(){
                this.x += this.xspeed;
                this.y += this.yspeed;
                this.yspeed += 0.05;
                this.alpha -= 2;
                this.colour.setAlpha(this.alpha);
                this.rotation += 0.1;
            },
        };
        fireworks.push(ember);
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    // Create controls
    densitySlider = createSlider(10, 200, 80);
    densitySlider.position(10, 10);
    
    toggleBtn = createButton('Toggle Shape Type');
    toggleBtn.position(10, 40);
    toggleBtn.mousePressed(function() {
        addTriangles = !addTriangles; // Flip 
    });
    
    createTriangles(width/2, height/2);
}

function draw(){
    image(bgImage, 0, 0, width, height);
    
    // Update density from slider
    particleDensity = densitySlider.value();
    
    // Draw particles
    for(ember of fireworks){
        ember.draw();
    }
    
    // Auto-add particles every 30 frames
    if(frameCount % 30 === 0){
        if(addTriangles){
            createTriangles(random(width), random(height));
        }else{
            createEmbers(random(width), random(height));
        }
    }
    
    // Remove old particles
    fireworks = fireworks.filter(function(ember){
        return ember.alpha > 0 && ember.y < height;
    });
    
    // Display particle counter at bottom left
    fill(255);
    noStroke();
    textSize(16);
    text("Particles: " + fireworks.length, 10, height - 40);
    text("Density: " + particleDensity, 10, height - 20);
}

function mousePressed(){
    if(addTriangles){
        createTriangles(mouseX, mouseY);
    }else{
        createEmbers(mouseX, mouseY);
    }
}