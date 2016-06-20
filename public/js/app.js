(function() {
var socket = io("http://localhost:3000/");
//var socket = io("https://blooming-lake-49901.herokuapp.com/");
var canvas = document.getElementById("myCanvas");
var counter = 0;

ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 10;

function drawNet(x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function draw(x1, y1, x2, y2, x3, y3, x4, y4) {
  switch (counter % 2) {
    case 0:
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.moveTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.arc(x1, y1, 50, 0, 2 * Math.PI);
      ctx.stroke();
  }
  counter++;
}
    
drawNet(160, 0, 160, 500);
drawNet(330, 0, 330, 500);
drawNet(0, 160, 500, 160);
drawNet(0, 330, 500, 330);

canvas.onmousemove = function(e) {
  console.log(e.offsetY, e.offsetX);
}

canvas.onclick = function(e) {
  if (e.offsetY < 160 && e.offsetX < 160) {
    draw(25, 25, 135, 135, 135, 25, 25, 135);
  } else if (e.offsetY < 160 && e.offsetX > 160 && e.offsetX < 330) {
    draw(250, 80);
  } else if (e.offsetY < 160 && e.offsetX > 330) {
    console.log("pressed 3");
  } else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX < 160) {
    console.log("pressed 4");
  } else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 160 && e.offsetX < 330) {
    console.log("pressed 5");
  } else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 330) {
    console.log("pressed 6");
  } else if (e.offsetY > 330 && e.offsetX < 160) {
    console.log("pressed 7");
  } else if (e.offsetY > 330 && e.offsetX > 160 && e.offsetX < 330) {
    console.log("pressed 8");
  } else if (e.offsetY > 330 && e.offsetX > 330) {
    console.log("pressed 9");
  }
}
}())