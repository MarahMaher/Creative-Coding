let font;
let textY;
let waveSpeed = 0.05;
let waveHeight = 10;
function preload() {
  font = loadFont('Tagfont.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  textY = height / 2;
  // Text settings
  textFont(font);
  textSize(60);
  textAlign(CENTER, CENTER); // Center text horizontally and vertically
  noStroke(); // No outline on shapes
}
function draw() {
  background(220, 250, 255);
  let time = millis() / 1000;
  fill(150, 150, 150, 100);
  drawWavyText("welcome to bath spa university", 3, 3, time);
  // Draw main text
  fill(50, 80, 120); // Dark blue color
  drawWavyText("BATH SPA UNIVERSITY", 0, 0, time);
  
  // Add simple decoration
  drawDecorations(time);
}

// Helper function to draw wavy text
function drawWavyText(message, offsetX, offsetY, time) {
  push(); // Save current drawing settings
  translate(offsetX, offsetY); // Move everything by the offset
  
  // We'll draw each letter separately to make them wave
  let x = width/2 - textWidth(message)/2; // Starting x position
  
  for (let i = 0; i < message.length; i++) {
    let letter = message.charAt(i);
    
    // Calculate wave effect
    let wave = sin(time * 2 + x * 0.05) * waveHeight;
    
    // Draw the letter
    text(letter, x, textY + wave);
    
    // Move x position for next letter
    x += textWidth(letter);
  }
  
  pop(); // Restore original drawing settings
}

// Simple decorations
function drawDecorations(time) {
  fill(255, 150, 150, 100); // Light pink with transparency
  
  // Draw some circles that move with time
  for (let i = 0; i < 5; i++) {
    let x = width/2 + sin(time + i) * 200;
    let y = height/2 + cos(time * 0.7 + i) * 100;
    let size = 20 + sin(time * 2 + i) * 10;
    ellipse(x, y, size, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textY = height / 2; // Re-center vertically
}