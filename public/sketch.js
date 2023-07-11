var circles = [];
var Play = true;
var coefficientOfRestitution = 0.9; // Elastic collision
var grabRadius = 40;
var grabbing = false;
var globalGrabDir = false;

// gui
var visible = true;
var gui, gui2;

function setup() {
  createCanvas(400, 400);

  circles.push(
    new Circle(
      50,
      height / 2 + 50,
      15,
      5,
      2,
      1,
      color(255, 0, 0)
    )
  );

  circles.push(
    new Circle(
      width - 50,
      height / 2,
      30,
      -2,
      4,
      5,
      color(0, 0, 255)
    )
  );

  circles.push(
    new Circle(
      width / 2,
      height / 2 - 50,
      45,
      0,
      10,
      5,
      color(125, 125, 0)
    )
  );

  gui = createGui('Main Control Panel [p]');
  sliderRange(0.1, 1, 0.01);
  gui.addGlobals('Play', 'coefficientOfRestitution');
  gui.setPosition(width + 10, 8);
}

function draw() {
  background(220);

  // setTimeout(draw, 2000);

  display();
}

function display() {

  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
    circles[i].displayLabels();
    if (Play) {
      circles[i].updatePosition(coefficientOfRestitution);
      for (let j = i + 1; j < circles.length; j++) {
        if (circles[i].checkCollision(circles[j])) {
          circles[i].handleCollision(circles[j]);
          circles[i].adjustPositions(circles[j]);
        }
      }
    } else {
      circles[i].grabChange(i+1);
    }
  }
}

// check for keyboard events
function keyPressed() {
  switch (key) {
    // type p to hide / show the GUI
    case 'p':
      visible = !visible;
      if (visible) gui.show(); else gui.hide();
      break;
  }
}

function mousePressed() {
  grabbing = true;
}

function mouseReleased() {
  grabbing = false;
  globalGrabDir = false;
}