let fullText = "Welcome to Bath Spa University";
let typedText = "";
let charIndex = 0;
let typingSpeed = 1;
let lastTypedFrame = 0;
let dots = [];
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Tagesschrift');
  textAlign(CENTER, CENTER);
  stroke(50,55,100);
  strokeWeight(3);

  for (let i = 0; i < 60; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      r: random(2, 6),
      dx: random(-0.3, 0.3),
      dy: random(-0.3, 0.3),
      alpha: random(50, 120)
    });
  }
}

function draw() {
  drawRadialBackground();
  drawFloatingDots();
  drawRipples();
  animateTitle();
}

function drawRadialBackground() {
  background(230, 240, 255);

  let gradientSize = max(width, height);
  for (let r = gradientSize; r > 0; r -= 10) {
    let alpha = map(r, gradientSize, 0, 0, 60 + sin(mouseY * 0.01) * 10);
    fill(200, 220, 255, alpha);
    ellipse(width / 2, height / 2, r, r);
  }
}

function drawFloatingDots() {
  for (let d of dots) {
    fill(255, 255, 255, d.alpha);
    ellipse(d.x, d.y, d.r);
    d.x += d.dx + sin(frameCount * 0.001 + d.y * 0.01) * 0.3 + (mouseX - width / 2) * 0.00005;
    d.y += d.dy + cos(frameCount * 0.001 + d.x * 0.01) * 0.3 + (mouseY - height / 2) * 0.00005;

    if (d.x > width) d.x = 0;
    if (d.x < 0) d.x = width;
    if (d.y > height) d.y = 0;
    if (d.y < 0) d.y = height;
  }
}

function drawRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    fill(255, r.alpha);
    ellipse(r.x, r.y, r.size);
    r.size += 2;
    r.alpha -= 2;
    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function animateTitle() {
  if (frameCount - lastTypedFrame > typingSpeed && charIndex < fullText.length) {
    typedText += fullText.charAt(charIndex);
    charIndex++;
    lastTypedFrame = frameCount;
  }

  for (let i = 5; i >= 1; i--) {
    fill(100, 180, 255, 8);
    textSize(72 + i * 1.5);
    text(typedText, width / 2, height / 2);
  }

  fill(255);
  textSize(72);
  text(typedText, width / 2, height / 2);
}

function mousePressed() {
  for (let i = 0; i < 10; i++) {
    ripples.push({
      x: mouseX + random(-10, 90),
      y: mouseY + random(-10, 90),
      size: random(5, 10),
      alpha: 255
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
