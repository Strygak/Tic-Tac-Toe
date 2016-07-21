(function() {
var socket = io("http://localhost:3000/");
//var socket = io("https://blooming-lake-49901.herokuapp.com/"),
    canvas = document.getElementById("myCanvas"),
    counter = 0,
    squares = [];

ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 10;

var draw = {
  drawX: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
  },

  drawZero: function(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke();
  },

  drawSymbol: function (x1, y1, x2, y2, x3, y3, x4, y4, x, y, pos) {
    switch (counter % 2) {
      case 0:
        this.drawX(x1, y1, x2, y2, x3, y3, x4, y4, pos);
        break;
      case 1:
        this.drawZero(x, y);
    }
    socket.emit("draw", {
      s1: x1,
      s2: y1, 
      s3: x2, 
      s4: y2, 
      s5: x3, 
      s6: y3, 
      s7: x4, 
      s8: y4, 
      s9: x, 
      s10: y, 
      s11: pos 
    });
  },
  drawSymbol2: function (x1, y1, x2, y2, x3, y3, x4, y4, x, y, pos) {
    switch (counter % 2) {
      case 0:
        this.drawX(x1, y1, x2, y2, x3, y3, x4, y4, pos);
        break;
      case 1:
        this.drawZero(x, y);
    }
  },
}
  
draw.drawX(160, 0, 160, 500, 330, 0, 330, 500);
draw.drawX(0, 160, 500, 160, 0, 330, 500, 330);

canvas.onclick = function(e) {
  if (e.offsetY < 160 && e.offsetX < 160) {
    draw.drawSymbol(30, 30, 130, 130, 130, 30, 30, 130, 80, 80, 0);
  } 
  else if (e.offsetY < 160 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 30, 296, 130, 296, 30, 196, 130, 246, 80, 1);
  } 
  else if (e.offsetY < 160 && e.offsetX > 330) {
    draw.drawSymbol(362, 30, 462, 130, 462, 30, 362, 130, 412, 80, 2);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX < 160) {
    draw.drawSymbol(30, 196, 130, 296, 130, 196, 30, 296, 80, 246, 3);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 196, 296, 296, 296, 196, 196, 296, 246, 246, 4);
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 330) {
    draw.drawSymbol(362, 196, 462, 296, 462, 196, 362, 296, 412, 246, 5);
  } 
  else if (e.offsetY > 330 && e.offsetX < 160) {
    draw.drawSymbol(30, 362, 130, 462, 130, 362, 30, 462, 80, 412, 6);
  } 
  else if (e.offsetY > 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 362, 296, 462, 296, 362, 196, 462, 246, 412, 7);
  } 
  else if (e.offsetY > 330 && e.offsetX > 330) {
    draw.drawSymbol(362, 362, 462, 462, 462, 362, 362, 462, 412, 412, 8);
  }
  counter++;
}

socket.on('goDraw', function(data) {
    console.log(data);
    
    draw.drawSymbol2(data.s1, data.s2, data.s3,
                    data.s4, data.s5, data.s6, 
                    data.s7, data.s8, data.s9,
                    data.s10, data.s11);
    counter++;
});

}())