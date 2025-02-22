// Orbit Control and Aim Combined
// Orbit Control Tutorial Link: https://p5js.org/examples/3d-orbit-control/ 
// Aim Tutorial Link: https://p5js.org/examples/angles-and-motion-aim/ 

let leftX, leftY, rightX, rightY; // Aim Tutorial

function setup() {                  //Orbit control
  createCanvas(710, 400, WEBGL);    //Orbit control
  angleMode(DEGREES);               //Orbit control
  strokeWeight(1);                  //Orbit Control
  noFill();                         //Orbit Control
  stroke(32, 8, 64);                //Orbit Control
  describe(
    'Users can click on the screen and drag to adjust their perspective in 3D space. The space contains a sphere of dark purple cubes on a light pink background with two 3D eyes that follow the cursor.'
  ); //Orbit Control


  // Position of eyes
  leftX = -150;                    //From Aim Tutorial with minor changes to positioning
  leftY = 0;                       //Aim
  rightX = 150;                    //Aim
  rightY = 0;                      //Aim
}

function draw() {                  //Orbit Control
  background(200, 100, 200);       //Orbit Control with minor value changes

  orbitControl();                  // Orbit Control code, Adjusts the camera based on mouse/touch

  
  for (let zAngle = 0; zAngle < 180; zAngle += 30) { // Orbit Control code, Rotates rings in a half circle to create a sphere of cubes
   
  for (let xAngle = 0; xAngle < 360; xAngle += 30) {  // Rotate cubes in a full circle to create a ring of cubes
      push();  

      // Rotate from center of sphere
      rotateZ(zAngle);                     //Orbit Control
      rotateX(xAngle);                     //Orbit Control

      // Then translate down 400 units
      translate(0, 400, 0);                //Orbit Control
      box();                               //Orbit Control
      pop();                               //Orbit Control
    }
  }

  // Calculates angles for eyes
  let leftAngle = atan2(mouseY - height / 2, mouseX - width / 2);  //Aim
  let rightAngle = atan2(mouseY - height / 2, mouseX - width / 2); //Aim

  //Code I added/mixed to draw a 3D left eye:
  push();
  translate(leftX, leftY, 100);  
  fill(255);
  sphere(25);  // Create 3D eyeball

  // Code I added/mixed Draw left pupil:
  rotateY(leftAngle);
  translate(12.5, 0, 0);
  fill(0);
  sphere(12.5);  // Create 3D pupil
  pop();

  //Code I added/mixed to draw right eye:
  push();
  translate(rightX, rightY, 100);  
  fill(255);
  sphere(25);  // Create 3D eyeball

  //Code I added/mixed to draw right pupil
  rotateY(rightAngle);
  translate(12.5, 0, 0);
  fill(0);
  sphere(12.5);  // Create 3D pupil
  pop();
}
