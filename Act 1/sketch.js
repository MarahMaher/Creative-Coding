let x = 0;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  // Move the car
  x += 2;
  if (x > width + 100) {
    x = -100; // Reset position when off-screen
  }

  // Draw the car body
  fill(0, 0, 255); // blue
  rect(x, 300, 100, 40); // main body
  rect(x + 20, 270, 60, 30); // top cabin

  // Draw the wheels
  fill(0);
  ellipse(x + 20, 340, 20, 20);
  ellipse(x + 80, 340, 20, 20);
}
