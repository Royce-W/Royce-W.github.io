// fireworks!!!!
// origin point
// speed 
// timing
// drop
// radius
// colour
// fading
// removed embers

// a bunch of shapes
// single or multicolour
// density

var fireworks = [];
var addTriangles = true;

function createEmbers(x,y){
    var originx = x;
    var originy = y;
    for(var i = 0; i < 80; i++){
        var ember = {
            x: originx,
            y: originy,
            xspeed: random(-2,2),
            yspeed: random(-2,2),
            alpha: 255,
            colour: color(random(255), random(255), random(255), this.alpha),
            draw: function(){
                //stroke
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
    for(var i = 0; i < 80; i++){
        var ember = {
            x: originx,
            y: originy,
            xspeed: random(-2,2),
            yspeed: random(-2,2),
            alpha: 255,
            rotation: random(TWO_PI),
            colour: color(random(255), random(255), random(255), this.alpha),
            draw: function(){
                //stroke
                strokeWeight(2);
                fill(this.colour);
                noStroke();
                //point(this.x,this.y);
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
    createTriangles(width/2, height/2);
}

function draw(){
    background(20,60,100,10);
    strokeWeight(1);
    text(fireworks.length, 20,20);
    for(ember of fireworks){
        ember.draw();
    }
    if(frameCount % 30 === 0){
        if(addTriangles === true){
            createTriangles(random(width), random(height));
        }else{
            createEmbers(random(width), random(height));
        }
        addTriangles = !addTriangles;
    }
    // remove any embers that are off screen
    // filter method of arrays
    fireworks = fireworks.filter(function(ember){
        if(ember.alpha > 0){
            return true;
        }else{
            return false;
        }
    });

    fireworks = fireworks.filter(function(ember){
        if(ember.y < height){
            return true;
        }else{
            return false;
        }
    });

}

function mousePressed(){
    // createEmbers(mouseX, mouseY);
    if(addTriangles === true){
        createTriangles(mouseX, mouseY);
    }else{
        createEmbers(mouseX, mouseY);
    }
    addTriangles = !addTriangles;
}