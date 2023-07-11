class Circle {
  constructor(x, y, radius, speedX, speedY, mass, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.mass = mass;
    this.colour = colour;
  }

  updatePosition(e) {
    this.bounceOffWalls(e);
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  bounceOffWalls(e1) {
    let e2 = (1 + e1) / 2;
    if (this.x - this.radius < 0) {
      this.x = this.radius + 1;
      this.speedX *= -e2;
    }
    if (this.x + this.radius > width) {
      this.x = width - this.radius - 1;
      this.speedX *= -e2;
    }
    
    if (this.y - this.radius < 0) {
      this.y = this.radius + 1;
      this.speedY *= -e2;
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius - 1;
      this.speedY *= -e2;
    }
  }

  checkCollision(otherCircle) {
    let distance = dist(this.x, this.y, otherCircle.x, otherCircle.y);
    if (distance < this.radius + otherCircle.radius) {
      return true; // Collision detected
    } else {
      return false; // No collision
    }
  }

  handleCollision(otherCircle) {
    let angle = atan2(otherCircle.y - this.y, otherCircle.x - this.x);
    let v1 = createVector(this.speedX, this.speedY);
    let v2 = createVector(otherCircle.speedX, otherCircle.speedY);
    let rotatedV1 = this.rotateVector(v1, -angle);
    let rotatedV2 = this.rotateVector(v2, -angle);
    let finalV1 = this.calculateFinalVelocity(rotatedV1, rotatedV2, this.mass, otherCircle.mass);
    let finalV2 = this.calculateFinalVelocity(rotatedV2, rotatedV1, otherCircle.mass, this.mass);
    let newV1 = this.rotateVector(finalV1, angle);
    let newV2 = this.rotateVector(finalV2, angle);
    this.speedX = newV1.x;
    this.speedY = newV1.y;
    otherCircle.speedX = newV2.x;
    otherCircle.speedY = newV2.y;
  }

  adjustPositions(otherCircle) {
    let overlap = this.radius + otherCircle.radius - dist(this.x, this.y, otherCircle.x, otherCircle.y);
    let dx = this.x - otherCircle.x;
    let dy = this.y - otherCircle.y;
    let direction = createVector(dx, dy).normalize();
    this.x += direction.x * overlap / 2;
    this.y += direction.y * overlap / 2;
    otherCircle.x -= direction.x * overlap / 2;
    otherCircle.y -= direction.y * overlap / 2;
  }

  rotateVector(vector, angle) {
    let x = vector.x * cos(angle) - vector.y * sin(angle);
    let y = vector.x * sin(angle) + vector.y * cos(angle);
    return createVector(x, y);
  }

  calculateFinalVelocity(v1, v2, m1, m2) {
    let e = coefficientOfRestitution;
    let x1 = ((m1 - m2) * v1.x + (1 + e) * m2 * v2.x) / (m1 + m2);
    let y1 = v1.y;
    return createVector(x1, y1);
  }

  draw() {
    fill(this.colour);
    ellipse(this.x, this.y, this.radius * 2);
  }
}
