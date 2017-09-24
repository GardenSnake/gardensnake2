//app is initialized to be a function handler
var app = require('express')();

//app is supplied to an http server
var http = require('http').Server(app);

//initialize instance of socket.io by passing the http (HTTP server) object
var io = require('socket.io')(http);

//route handler / is defined, gets called when website is hit
app.get('/', function(req,res){
	//res.send('<h1>Hello worldd</h1>');
	res.sendFile(__dirname + '/index.html');
});

//listen on 'connection' event for incoming sockets and log it to the console.
io.on('connection', function(socket){
	console.log('S: a user connected');
	
	//socket fired a disconnect event
	socket.on('disconnect', function(){
		console.log('S: user disconnected');
	});
	
	//message incoming
	socket.on('chat message', function(msg){
	
		//emit message to everyone including self
		io.emit('chat message',msg);
		console.log('S: message: '+msg);
	});
	
});

//make http server listen to port 3000
http.listen(3000,function(){
	console.log('S: listening on *:3000');
});