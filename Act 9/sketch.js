let brands = ["ASUS", "MSI", "Gigabyte", "ZOTAC", "GALAX", "PNY", "Palit"];

let ratings = [97, 80, 87, 81, 77, 65, 60]; 
let barColors = [];

function setup() {
  createCanvas(900, 550);
  background(245);
  
  barColors = [
    color(255, 80, 80),   // ASUS - red
    color(65, 105, 225),  // MSI - blue
    color(60, 179, 113),  // Gigabyte - green
    color(220, 20, 60),   // ZOTAC - crimson
    color(138, 43, 226),  // GALAX - purple
    color(255, 165, 0),   // PNY - orange
    color(70, 130, 180)   // Palit - steel blue
  ];
}

function draw() {
  background(245);
  
  // Modern title with shadow
  fill(50);
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER);
  text("2025 Best Graphics Card Brand Ratings", width/2, 50);
  
  // Draw bars with 3D effect
  let barWidth = 90;
  let spacing = 15;
  let startX = (width - (brands.length * (barWidth + spacing))) / 2;
  let maxBarHeight = 350;
  
  for (let i = 0; i < brands.length; i++) {
    let barHeight = map(ratings[i], 0, 100, 0, maxBarHeight);
    let xPos = startX + i * (barWidth + spacing);
    
    // Bar shadow
    fill(200, 30);
    noStroke();
    rect(xPos + 5, height - 120 - barHeight + 5, barWidth, barHeight, 8);
    
    // Main bar with gradient
    let gradient = drawingContext.createLinearGradient(0, height-120-barHeight, 0, height-120);
    gradient.addColorStop(0, barColors[i]);
    gradient.addColorStop(1, color(red(barColors[i])*0.7, green(barColors[i])*0.7, blue(barColors[i])*0.7));
    
    drawingContext.fillStyle = gradient;
    rect(xPos, height - 120 - barHeight, barWidth, barHeight, 8);
    
    // Rating text inside bar
    fill(255);
    textSize(16);
    text(ratings[i] + "%", xPos + barWidth/2, height - 120 - barHeight/2);
    
    // Brand name
    fill(60);
    textSize(14);
    text(brands[i], xPos + barWidth/2, height - 90);
  }
  
  // Y-axis with markers
  stroke(200);
  line(startX - 20, height - 120, startX - 20, height - 120 - maxBarHeight);
  for (let y = 0; y <= 100; y += 20) {
    let yPos = map(y, 0, 100, 0, maxBarHeight);
    line(startX - 25, height - 120 - yPos, startX - 15, height - 120 - yPos);
    fill(100);
    textSize(12);
    text(y, startX - 40, height - 120 - yPos + 5);
  }
  
  // Footer note
  fill(120);
  textSize(12);
  textStyle(NORMAL);
  text("Market ratings forecasted for 2025 based on market trends", width/2, height-20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}