var express = require('express');
var path = require('path');
var app = express();
var internalData;
var names = [];
var server = app.listen(8080);


app.use(express.static(path.join(__dirname, 'public')));

var socket = require('socket.io');

var io = socket(server);

io.on('connection', function(socket){
	
	console.log('new connection: ' + socket.id);
	socket.emit('output',internalData);//send data when first connected
	
	socket.on('new user', function(name, validName){
		if(names.indexOf(name) != -1){
			validName(false);
		}else{
			validName(true);
			socket.name = name;//attach to socket, for disconect
			names.push(name);//add to array
			updateNames();
		}
	
	});
	
	function updateNames(){
		io.emit('usernames',names);
	}

	socket.on('input', function (data){
		socket.broadcast.emit('output',data);//output to everyone else
		internalData = data;
		console.log("data: "+ data);
	});

	socket.on('disconnect', function() {
	if(!socket.name) return; //they didn't choose a name
	names.splice(names.indexOf(socket.name),1);
	updateNames();
    console.log(socket.name + " has disconnected");
    });



});