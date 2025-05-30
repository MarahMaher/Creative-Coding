let song;
let fft;
let beatDetector;
let hearts = [];
let bgColor;

function preload() {
  song = loadSound('sound.mp3'); // Replace with your song file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(240, 240, 250); // Soft background color
  
  // Setup audio analysis
  fft = new p5.FFT();
  fft.setInput(song);
  
  // Simple beat detection (no need for complex detectors)
  beatDetector = new p5.PeakDetect(20, 2000, 0.8, 20);
  
  // Create initial hearts
  for (let i = 0; i < 20; i++) {
    hearts.push(new Heart());
  }
}

function draw() {
  background(bgColor);
  
  // Analyze the music
  fft.analyze();
  beatDetector.update(fft);
  
  // Make background pulse slightly with music
  let energy = fft.getEnergy("bass") / 255;
  bgColor.setAlpha(200 + energy * 55);
  background(bgColor);
  
  // Show spectrum at bottom (simple version)
  drawSimpleSpectrum();
  
  // Update and display all hearts
  for (let heart of hearts) {
    heart.update(beatDetector.isDetected);
    heart.display();
  }
  
  // Add instructions
  fill(100);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Click to play or pause", width/2, 30);
}

function drawSimpleSpectrum() {
  let spectrum = fft.analyze();
  noFill();
  strokeWeight(2);
  
  // Draw bass frequencies (left side)
  stroke(255, 100, 100); // Red
  for (let i = 0; i < 50; i++) {
    let h = map(spectrum[i], 0, 255, 0, 100);
    rect(i * 10, height - 10, 8, -h);
  }
  
  // Draw treble frequencies (right side)
  stroke(100, 100, 255); // Blue
  for (let i = 50; i < 100; i++) {
    let h = map(spectrum[i], 0, 255, 0, 50);
    rect(i * 10, height - 10, 8, -h);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

// Simple Heart class
class Heart {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 40);
    this.color = color(
      random(150, 255),
      random(100, 200),
      random(150, 255)
    );
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.pulseSize = 0;
  }
  
  update(isBeat) {
    // Move heart
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
    
    // Pulse on beat
    if (isBeat) {
      this.pulseSize = 10;
      this.color = color(
        random(200, 255),
        random(100, 150),
        random(150, 200)
      );
    }
    this.pulseSize *= 0.9;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    scale(1 + this.pulseSize/100);
    
    fill(this.color);
    noStroke();
    
    // Draw heart shape (simplified)
    beginShape();
    vertex(0, 0);
    bezierVertex(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
    bezierVertex(this.size, 0, this.size/2, -this.size/2, 0, 0);
    endShape(CLOSE);
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}