// This will store all our bubbles
let bubbles = [];

function setup() {
  // Create a canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  noStroke(); // No outlines on bubbles
}

function draw() {
  // Semi-transparent background (creates fading trail)
  background(0, 20); 
  
  // Create a new bubble at mouse position when mouse is pressed
  if (mouseIsPressed) {
    bubbles.push(new Bubble(mouseX, mouseY));
  }
  
  // Update and draw all bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    
    // Remove bubble if it's too faded
    if (bubbles[i].isFaded()) {
      bubbles.splice(i, 1);
      i--; // Adjust index after removal
    }
  }
  
  // Display instructions
  fill(255);
  textSize(20);
  text("Create bubbles!", 20, 30);
}

class Bubble {
  constructor(x, y) {
    this.x = x; // X position
    this.y = y; // Y position
    this.size = random(10, 30); 
    this.color = color(
      random(150, 255), 
      random(150, 255),
      random(150, 255),
    );
    this.speedX = random(-1, 1); // Random X movement
    this.speedY = random(-1, 1); // Random Y movement
  }
  
  move() {
    this.x += this.speedX;
    this.y += this.speedY - 1; // Float upward slightly
    this.color.setAlpha(this.color.levels[3] - 1); // Fade out
  }
  
  show() {
    fill(this.color);
    circle(this.x, this.y, this.size);
    
    // Add a highlight to make it look shiny
    fill(255, 255, 255, 100);
    circle(this.x - this.size/5, this.y - this.size/5, this.size/4);
  }
  
  // Check if bubble is invisible
  isFaded() {
    return this.color.levels[3] <= 0;
  }
}