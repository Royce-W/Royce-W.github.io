var colourPicker; // function scope
let strokeWeightSlider;
var bgColourPicker;

function setup(){
    createCanvas(720,300);

    colourPicker = createColorPicker('deeppink');
    strokeWeightSlider = createSlider(1,10,5,1);
    bgColourPicker = createColorPicker('grey');

    var bgColorButton = createButton('Refresh');
    bgColorButton.mousePressed(repaint);
    bgColourPicker.changed( repaint );

    var randomImageButton = createButton('Doge Button');
    randomImageButton.position(320, 318);
    randomImageButton.mousePressed(createRandomImage);

    background(bgColourPicker.value());
}

function draw(){
    strokeWeight(strokeWeightSlider.value());
    stroke(colourPicker.value());

    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function repaint(){
    background(bgColourPicker.value());
}

function createRandomImage() {
    let img = createImg(
        'https://th.bing.com/th?id=OIP.xWtT98p9U3UlbVLuMROfyQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2',
        'Doge.'
    );
    img.size(100, 100); // Adjust the width and height as needed
    img.style('border-radius', '50%');

    let x = random(width - 100);
    let y = random(height - 100);

    img.position(x, y);
}

