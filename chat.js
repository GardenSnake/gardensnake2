var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8080);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection',function(socket){

	//when 'send message' is recived on server, emit data to everyone
	socket.on('send message', function(data){
		io.emit('new message',data);
	});

});
