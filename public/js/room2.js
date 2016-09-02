var socket = io("http://localhost:4000") || ("https://blooming-lake-49901.herokuapp.com/"),
    canvas = document.getElementById("myCanvas"),
    counter = 0,
    squares = [],
    sq0 = sq1 = sq2 = sq3 = sq4 = sq5 = sq6 = sq7 = sq8 = false;

ctx = canvas.getContext("2d");
ctx.strokeStyle = "#4caf50";
ctx.lineWidth = 10;

$("#exitToRooms").on("submit", function() {
  $.ajax({
    type: "GET",
    url: "/rooms",
    succes: function (data) { console.log(data); },
    failure: function (data) { console.log(data); } 
  });
});

var draw = {
  drawX: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
  },

  drawZero: function(x, y, pos) {
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
        this.drawZero(x, y, pos);
    }
    socket.emit("drawRoom2", {
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
    canvas.onclick = false;
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

//***************************************
//handler for replay
//
function replayGame(message) {
    $("body").append(message);
    $(".congratulation").animate({ 
        height: "80%", 
        width: "85%",
        top: "70px",
        left: "100px" 
    }, 300);

    $(".congratulation").animate({
        height: "55%",
        width: "56%",
        top: "100px",
        left: "22%"
    }, 300);

    $(".congratulation button").on("click", function() {

        function createColor() {
          var r = Math.floor(Math.random() * 257);
          var g = Math.floor(Math.random() * 257);
          var b = Math.floor(Math.random() * 257);
          return "rgb" + "(" + ( r + "," + g + "," + b + ")" );
        }
         
        $(".congratulation").animate({ left: "100%" }, 400);
        setTimeout(function(){ $(".congratulation").remove(); }, 650);
      
        $("canvas").remove();

        counter = 0;
        sq0 = sq1 = sq2 = sq3 = sq4 = sq5 = sq6 = sq7 = sq8 = false;
    
        $("body").append("<canvas id='myCanvas' width='500'" +
                         "height='500'></canvas>");

        var canvas = document.getElementById("myCanvas");
        canvas.onclick = function(e) { setSymbol(e); }

        ctx = canvas.getContext("2d");
        ctx.strokeStyle = createColor();
        ctx.lineWidth = 10;

        draw.drawX(160, 0, 160, 500, 330, 0, 330, 500);
        draw.drawX(0, 160, 500, 160, 0, 330, 500, 330);
    }); 
}

//******************************************************
//handler function for check if draw three equal symbols and send its to server
//
function checkSquares() {
    var winnerName = localStorage.userName;
    var message = "<div class='congratulation'><h2>YOU ARE WINNER</h2>" +
                         "<button>OK</button></div>";

    if (sq0 && sq1 && sq2) { 
        draw.drawX(15, 80, 475, 80);
        socket.emit("lineRoom2", { x1: 15, y1: 80, x2: 475, y2: 80, name: winnerName });
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq3 && sq4 && sq5) { 
        draw.drawX(15, 245, 475, 245);
        socket.emit("lineRoom2", { x1: 15, y1: 245, x2: 475, y2: 245 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq6 && sq7 && sq8) { 
        draw.drawX(15, 410, 475, 410);
        socket.emit("lineRoom2", { x1: 15, y1: 410, x2: 475, y2: 410 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq0 && sq3 && sq6) { 
        draw.drawX(80, 15, 80, 475);
        socket.emit("lineRoom2", { x1: 80, y1: 15, x2: 80, y2: 475});
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq1 && sq4 && sq7) { 
        draw.drawX(245, 15, 245, 475);
        socket.emit("lineRoom2", { x1: 245, y1: 15, x2: 245, y2: 475 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq2 && sq5 && sq8) { 
        draw.drawX(412, 15, 412, 475);
        socket.emit("lineRoom2", { x1: 412, y1: 15, x2: 412, y2: 475 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq0 && sq4 && sq8) { 
        draw.drawX(20, 20, 470, 470);
        socket.emit("lineRoom2", { x1: 20, y1: 20, x2: 470, y2: 470 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    else if (sq2 && sq4 && sq6) { 
        draw.drawX(470, 22, 20, 472);
        socket.emit("lineRoom2", { x1: 470, y1: 22, x2: 20, y2: 472 }); 
        setTimeout(function() { replayGame(message); }, 400);
    }
    canvas.onclick = false;
}
//*****************
//draw net for play
draw.drawX(160, 0, 160, 500, 330, 0, 330, 500);
draw.drawX(0, 160, 500, 160, 0, 330, 500, 330);

//**************************************************
//handler function for click on canvas to set symbol
//*
function setSymbol(e){
  if (e.offsetY < 160 && e.offsetX < 160) {
    draw.drawSymbol(30, 30, 130, 130, 130, 30, 30, 130, 80, 80, 0);
    sq0 = true;
  } 
  else if (e.offsetY < 160 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 30, 296, 130, 296, 30, 196, 130, 246, 80, 1);
    sq1 = true;
  } 
  else if (e.offsetY < 160 && e.offsetX > 330) {
    draw.drawSymbol(362, 30, 462, 130, 462, 30, 362, 130, 412, 80, 2);
    sq2 = true;
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX < 160) {
    draw.drawSymbol(30, 196, 130, 296, 130, 196, 30, 296, 80, 246, 3);
    sq3 = true;
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 196, 296, 296, 296, 196, 196, 296, 246, 246, 4);
    sq4 = true;
  } 
  else if (e.offsetY > 160 && e.offsetY < 330 && e.offsetX > 330) {
    draw.drawSymbol(362, 196, 462, 296, 462, 196, 362, 296, 412, 246, 5);
    sq5 = true;
  } 
  else if (e.offsetY > 330 && e.offsetX < 160) {
    draw.drawSymbol(30, 362, 130, 462, 130, 362, 30, 462, 80, 412, 6);
    sq6 = true;
  } 
  else if (e.offsetY > 330 && e.offsetX > 160 && e.offsetX < 330) {
    draw.drawSymbol(196, 362, 296, 462, 296, 362, 196, 462, 246, 412, 7);
    sq7 = true;
  } 
  else if (e.offsetY > 330 && e.offsetX > 330) {
    draw.drawSymbol(362, 362, 462, 462, 462, 362, 362, 462, 412, 412, 8);
    sq8 = true;
  }
  counter++;
  checkSquares();
}

//*******************************     
//set handler for click on canvas
//
canvas.onclick = function(e) { setSymbol(e); }

socket.on('goDrawRoom2', function(data) {
  
    draw.drawSymbol2(data.s1, data.s2, data.s3,
                    data.s4, data.s5, data.s6, 
                    data.s7, data.s8, data.s9,
                    data.s10, data.s11);
    counter++;    
    canvas.onclick = function(e) { setSymbol(e); }
});

socket.on("sendLineRoom2", function(data) { 
    var name = data.winName;
    var message = "<div class='congratulation'><h2>" + name + " IS WINNER</h2>" +
                  "<button>OK</button></div>";
    draw.drawX(data.x1, data.y1, data.x2, data.y2); 
    canvas.onclick = false;
    
    setTimeout(function() { replayGame(message); }, 400);
});