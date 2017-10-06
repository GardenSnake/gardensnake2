// Keep track of our socket connection
var socket;
var rValue = 255, gValue = 255, bValue = 0;

function setup() {
  createCanvas(800, 800);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect();
  rValue = Math.floor(Math.random() * 256);
  gValue = Math.floor(Math.random() * 256);
  bValue = Math.floor(Math.random() * 256);
  
  // We make a named event called 'mouse' and write an
  // anonymous callback function, to handle recieved data
  socket.on('mouseData', function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw blue circles
      fill(data.r,data.g,data.b);
      noStroke();
      ellipse(data.x, data.y, 10, 10);
    }
  );
}

function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  fill(rValue,gValue,bValue);
  noStroke();
  ellipse(mouseX,mouseY,10,10);
  
  sendmouse(mouseX,mouseY,rValue,gValue,bValue);
}

// Function for sending mouse coordinates to the socket
function sendmouse(xpos, ypos,rValue,gValue,bValue) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with x and y
  var data = {
    x: xpos,
    y: ypos,
	r: rValue,
	g: gValue,
	b: bValue
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}