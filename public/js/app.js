(function() {
var canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 10;

function drawNet(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
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
    console.log("pressed 1");
  } else if (e.offsetY < 160 && e.offsetX > 160 && e.offsetX < 330) {
    console.log("pressed 2");
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