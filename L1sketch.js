

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(0, 150, 50,);
    fill('green')
    stroke('white')
    for(var i = 0; i < 10000; i++){
        rect((i*100)%width,(i*100)%height,100,100, 100);
    }
    fill('blue');
    stroke('black');
    if(mouseX < 200){
        rect(mouseX, mouseY,10, 100);
        rect(mouseX, mouseY,100, 10);
        rect(mouseX, mouseY,-100, 10);
        rect(mouseX, mouseY,10, -90,);
    }else{
        rect(mouseX, mouseY, 50, 50, 25);
    }
}