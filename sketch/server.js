var express = require('express');

var app = express();
var server = app.listen(8080);

//host static files (unchanging files)
app.use(express.static('Public'));

console.log("Socket serverr is running!");

var socket = require('socket.io');

var io = socket(server);

io.on('connection', newConnection);

function newConnection(socket){
//console.log(socket);//spits out a lot of meta data
console.log('new connection: ' + socket.id);

socket.on('mouse', mouseMessage);
function mouseMessage(data){
	socket.broadcast.emit('mouseData',data);
	//io.sockets.emit('mouseData', data);//sent to all
	console.log(data);
}

socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });


}



