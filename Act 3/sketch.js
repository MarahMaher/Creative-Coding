let eyeSize = 0;
let eyeWiggle = 0;
let armAngle = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(0, 50, 80); // Dark blue background
  
  // Add some stars in the background
  drawStars();
  
  // Calculate distance from mouse to center for animations
  let distance = dist(mouseX, mouseY, width/2, height/2);
  
  // Eye animation values
  eyeSize = map(distance, 0, width/2, 0.15, 0.25, true);
  eyeWiggle = sin(frameCount * 0.1) * 0.05;
  
  // Arm wave animation
  armAngle = sin(frameCount * 0.2) * 0.3;
  
  // Draw the alien at mouse position
  drawAlien(mouseX, mouseY, 150);
}

function drawAlien(x, y, size) {
  // Main body (green)
  fill(100, 200, 100);
  ellipse(x, y, size, size*1.2);
  
  // Head (lighter green)
  fill(150, 240, 150);
  ellipse(x, y - size*0.4, size*0.7, size*0.7);
  
  // Eyes (big and black with animation)
  fill(0);
  ellipse(x - size*0.15 + eyeWiggle, y - size*0.45, size*eyeSize, size*(eyeSize + 0.1));
  ellipse(x + size*0.15 + eyeWiggle, y - size*0.45, size*eyeSize, size*(eyeSize + 0.1));
  
  // Eye shine (white dots)
  fill(255);
  ellipse(x - size*0.15 + eyeWiggle, y - size*0.5, size*0.05, size*0.05);
  ellipse(x + size*0.15 + eyeWiggle, y - size*0.5, size*0.05, size*0.05);
  
  // Mouth (smile that changes with mouse speed)
  let mouthHeight = map(abs(mouseX - pmouseX), 0, 20, 0.2, 0.4, true);
  arc(x, y - size*0.35, size*0.3, size*mouthHeight, 0, PI);
  
  // Arms (with waving animation)
  fill(100, 200, 100);
  push();
  translate(x - size*0.4, y - size*0.1);
  rotate(-armAngle);
  rect(0, 0, size*0.4, size*0.1);
  pop();
  
  push();
  translate(x + size*0.4, y - size*0.1);
  rotate(armAngle);
  rect(0, 0, size*0.4, size*0.1);
  pop();
  
  // Hands (circles at end of arms)
  fill(150, 240, 150);
  ellipse(x - size*0.4 - cos(armAngle)*size*0.4, y - size*0.1 - sin(armAngle)*size*0.4, size*0.15);
  ellipse(x + size*0.4 + cos(armAngle)*size*0.4, y - size*0.1 - sin(armAngle)*size*0.4, size*0.15);
  
  // Legs
  fill(100, 200, 100);
  rect(x - size*0.2, y + size*0.5, size*0.15, size*0.3);
  rect(x + size*0.05, y + size*0.5, size*0.15, size*0.3);
  
  // Antenna (with slight wiggle)
  fill(150, 240, 150);
  let antennaWiggle = sin(frameCount * 0.15) * 0.1;
  line(x - size*0.1, y - size*0.7, x - size*0.2 + antennaWiggle, y - size*0.9);
  line(x + size*0.1, y - size*0.7, x + size*0.2 + antennaWiggle, y - size*0.9);
  ellipse(x - size*0.2 + antennaWiggle, y - size*0.9, size*0.1);
  ellipse(x + size*0.2 + antennaWiggle, y - size*0.9, size*0.1);
}

function drawStars() {
  fill(255);
  for (let i = 0; i < 100; i++) {
    // Make stars twinkle slightly
    let twinkle = sin(frameCount * 0.1 + i * 10) * 0.5 + 1;
    let x = (noise(i) * width * 2) % width;
    let y = (noise(i + 100) * height * 2) % height;
    let size = noise(i + 200) * 3 * twinkle;
    ellipse(x, y, size, size);
  }
}