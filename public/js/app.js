(function() {
//var socket = io("http://localhost:3000/");
//var socket = io("https://blooming-lake-49901.herokuapp.com/"),
    canvas = document.getElementById("myCanvas"),
    counter = 0,
    squares = [];

ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 10;

function drawCross(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function draw(x1, y1, x2, y2, x3, y3, x4, y4, x, y, pos) {
  if (!squares[pos]) {
    switch (counter % 2) {
      case 0:
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.stroke();
        squares[pos] = "cross";
        break;
      case 1: 
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.stroke();
        squares[pos] = "zero";
    }
    counter++;
  }
}
    
drawCross(160, 0, 160, 500);
drawCross(330, 0, 330, 500);
drawCross(0, 160, 500, 160);
drawCross(0, 330, 500, 330);

canvas.onclick = function(e) {
  if (e.offsetY < 160 && e.offsetX < 160) {
    draw(30, 30, 130, 130, 130, 30, 30, 130, 80, 80, 0);
  } 
  else if (e.offsetY < 160 && e.offsetX > 160 && e.offsetX < 330) {
    draw(196, 30, 296, 130, 296, 30, 196, 130, 246, 80, 1);
  } 
  else if (e.offsetY < 160 && e.offsetX > 330) {
    draw(362, 30, 462, 130, 462, 30, 362, 130, 412, 80, 2);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX < 160) {
    draw(30, 196, 130, 296, 130, 196, 30, 296, 80, 246, 3);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw(196, 196, 296, 296, 296, 196, 196, 296, 246, 246, 4);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 330) {
    draw(362, 196, 462, 296, 462, 196, 362, 296, 412, 246, 5);
  } 
  else if (e.offsetY > 330 && e.offsetX < 160) {
    draw(30, 362, 130, 462, 130, 362, 30, 462, 80, 412, 6);
  } 
  else if (e.offsetY > 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw(196, 362, 296, 462, 296, 362, 196, 462, 246, 412, 7);
  } 
  else if (e.offsetY > 330 && e.offsetX > 330) {
    draw(362, 362, 462, 462, 462, 362, 362, 462, 412, 412, 8);
  }
}
}())