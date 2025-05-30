function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  drawPattern();
}

function draw() {
  // drawPattern handles everything, so draw() stays empty
}

function drawPattern() {
  background("#E6E7F2"); // Light bluish background

  let cols = 10;
  let rows = 10;
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;

      let isEven = (i + j) % 2 === 0;

      let baseColor = isEven
        ? color(random(100, 180), random(100, 160), 255)  // Soft blue
        : color(180, random(100, 160), random(200, 255)); // Violet shades

      fill(baseColor);

      drawJitteredCircle(x, y, min(w, h) * 0.6);
    }
  }
}

function drawJitteredCircle(x, y, radius) {
  beginShape();
  let steps = 20;
  for (let i = 0; i < TWO_PI; i += TWO_PI / steps) {
    let r = radius / 2 + random(-5, 5); // jittered radius
    let vx = x + cos(i) * r;
    let vy = y + sin(i) * r;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  drawPattern(); // Refresh pattern on click
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawPattern(); // Redraw pattern on resize
}
