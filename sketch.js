var nvHours = 4;
var nhHours = 6;
var nvMin = 10;
var nhMin = 6;
var nvSec = 6;
var nhSec = 10;

//this gets called only once in the very beginning
function setup() {
	createCanvas(window.innerWidth,window.innerHeight);
}

//this gets called every frame (about 60 frames per second)
function draw() {
  let hColor = color(200, 70, 70);
  let mColor = color(47, 19, 69);
  let sColor = color(47, 19, 69);
  let strokeColor = color(158, 40, 49);
  let backgroundColor = color(47, 19, 69);

  background(backgroundColor);

  let h = hour();
  let m = minute();
  let s = second();
  
  mColor = color(
    (1 - m/60) * mColor.levels[0] + (m/60) * hColor.levels[0],
    (1 - m/60) * mColor.levels[1] + (m/60) * hColor.levels[1],
    (1 - m/60) * mColor.levels[2] + (m/60) * hColor.levels[2]
  );
  
  sColor = color(
    (1 - s/60) * sColor.levels[0] + (s/60) * mColor.levels[0],
    (1 - s/60) * sColor.levels[1] + (s/60) * mColor.levels[1],
    (1 - s/60) * sColor.levels[2] + (s/60) * mColor.levels[2]
  );
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  let hWidth = width / nhHours;
  let hHeight = height / nvHours;
  let mWidth = hWidth / nhMin;
  let mHeight = hHeight / nvMin;
  let sWidth = mWidth / nhSec;
  let sHeight = mHeight / nvSec;
  
  let xHourOffset = Math.floor((h % nhHours) * hWidth);
  let yHourOffset = Math.floor(Math.floor(h / nhHours) * hHeight);
  
  let xMinOffset = Math.floor(xHourOffset + (m % nhMin) * mWidth); 
  let yMinOffset = Math.floor(yHourOffset + Math.floor(m / nhMin) * mHeight);

  noStroke();
  fill(sColor);
  for (let ns = 0; ns < s; ns++) {
    let xPos = Math.floor(xMinOffset + (ns % nhSec) * sWidth);
    let yPos = Math.floor(yMinOffset + Math.floor(ns / nhSec) * sHeight);
    rect(xPos, yPos, sWidth +1, sHeight +1);
  }
  
  noStroke();
  fill(mColor);
  for (let nm = 0; nm < m; nm++) {
    let xPos = Math.floor(xHourOffset + (nm % nhMin) * mWidth);
    let yPos = Math.floor(yHourOffset + Math.floor(nm / nhMin) * mHeight);
    rect(xPos, yPos, mWidth +1, mHeight +1);
  }
  
  stroke(strokeColor);
  fill(hColor);
  for (let nh = 0; nh < h; nh++) {
    let xPos = (nh % nhHours) * hWidth;
    let yPos = Math.floor(nh / nhHours) * hHeight;
    rect(xPos, yPos, hWidth, hHeight);
  }
}
