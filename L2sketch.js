var Clifford = {
    x: 0,
    y: 0,
    w: 60,
    h: 30,
    xSpeed: 9,
    ySpeed: 1,
    colour: 'red',
    draw: function(){
        fill( this.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1;
        }
        if(this.y > height - this.h || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};

var Emily = {
    x: 40,
    y: 50,
    w: 30,
    h: 30,
    xSpeed: 2,
    ySpeed: 1,
    colour: 'blue',
    draw: function(){
        fill( this.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width){
            this.xSpeed *= -1;
        }
        if(this.y > height || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};
// redBrick.x++ returns current value then increments
// ++redBrick.x increments value and then returns   

var Clifford2 = {
    x: 0,
    y: 0,
    w: 70,
    h: 30,
    xSpeed: 6,
    ySpeed: 1,
    colour: 'red',
    draw: function(){
        fill( this.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1.1;
        }
        if(this.y > height - this.h || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};

function setup(){
    createCanvas(720,280);
}

function draw(){
    background('grey'); 
    Clifford.draw();
    Clifford.move();
    Emily.draw();
    Emily.move();
    Clifford2.draw();
    Clifford2.move();
}