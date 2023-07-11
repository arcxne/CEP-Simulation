let circles = [];
let coefficientOfRestitution = 0.9; // Elastic collision

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

  noStroke();
}

function draw() {
  background(220);

  // setTimeout(draw, 2000);

  for (let i = 0; i < circles.length; i++) {
    circles[i].updatePosition(coefficientOfRestitution);
    circles[i].draw();
    for (let j = i + 1; j < circles.length; j++) {
      if (circles[i].checkCollision(circles[j])) {
        circles[i].handleCollision(circles[j]);
        circles[i].adjustPositions(circles[j]);
      }
    }
  }
}
