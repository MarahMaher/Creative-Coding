let shapes = [];
let bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(240, 240, 250);
  
  // Create some initial shapes
  for (let i = 0; i < 20; i++) {
    shapes.push(new FloatingShape());
  }
}

function draw() {
  background(bgColor);
  
  // Update and display all shapes
  for (let shape of shapes) {
    shape.update();
    shape.display();
  }
  
  // Simple instructions
  fill(100);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Press SPACE to change the color or click to add shapes", width/2, 30);
}

function keyPressed() {
  if (key === ' ') {
    // Add 5 new shapes when space is pressed
    for (let i = 0; i < 5; i++) {
      shapes.push(new FloatingShape());
    }
    // Change background color slightly
    bgColor = color(random(200, 240), random(200, 240), random(200, 250));
  }
}

function mousePressed() {
  // Add a new shape at mouse position
  shapes.push(new FloatingShape(mouseX, mouseY));
}

class FloatingShape {
  constructor(x, y) {
    this.x = x || random(width); // Use provided position or random
    this.y = y || random(height);
    this.size = random(20, 60);
    this.color = color(
      random(150, 255),
      random(150, 255),
      random(150, 255),
      180 // Slightly transparent
    );
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.shapeType = floor(random(3)); // 0=circle, 1=square, 2=triangle
    this.rotation = 0;
    this.rotateSpeed = random(-0.02, 0.02);
  }
  
  update() {
    // Move the shape
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
    
    // Rotate
    this.rotation += this.rotateSpeed;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    fill(this.color);
    
    // Draw different shape types
    if (this.shapeType === 0) {
      // Circle
      ellipse(0, 0, this.size);
    } else if (this.shapeType === 1) {
      // Square
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
    } else {
      // Triangle
      triangle(
        0, -this.size/2,
        -this.size/2, this.size/2,
        this.size/2, this.size/2
      );
    }
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}