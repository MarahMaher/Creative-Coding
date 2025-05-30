let trail = [];
let y;

function setup() {
  createCanvas(400, 400);
  y = height + 50; // Start the motion from the bottom of the screen 
}

function draw() {
  background(200, 230, 255); // Light blue background

  // Move bee upward
  y -= 1; // Speed upward
  if (y < -50) {  // on loop
    y = height + 50;
    trail = [];
  }

  // Zigzag horizontal motion using sine wave
  let x = width / 2 + sin(y * 0.1) * 120; 

  // Stinger position
  let tailX = x;
  let tailY = y + 38;

  // Point to trail
  trail.push(createVector(tailX, tailY));
  if (trail.length > 100) trail.shift();

  // Dotted trail
  stroke(0);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  noFill();
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
  drawingContext.setLineDash([]);

  // Bee
  drawBee(x, y);
}

function drawBee(x, y) {
  push();
  translate(x, y);
  rotate(0); 

  // Wings
  fill(255);
  stroke(0);
  strokeWeight(1.5);
  ellipse(-20, -10, 30, 20);
  ellipse(20, -10, 30, 20);

  // Body
  noStroke();
  fill(0);
  ellipse(0, 0, 40, 60);

  // Yellow Stripes
  fill(255, 204, 0);
  ellipse(0, -10, 40, 15);
  ellipse(0, 10, 40, 15);

  // Head
  fill(0);
  ellipse(0, -35, 25, 25);

  // Eyes
  fill(255);
  ellipse(-6, -37, 5, 5);
  ellipse(6, -37, 5, 5);

  // Antennae
  stroke(0);
  noFill();
  strokeWeight(1.5);
  bezier(-6, -45, -10, -55, -15, -50, -13, -43);
  bezier(6, -45, 10, -55, 15, -50, 13, -43);

  // Stinger
  fill(0);
  triangle(0, 30, -5, 38, 5, 38);

  pop();
}