var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = [];

http.listen(8080);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/chat2.html');
});

io.on('connection',function(socket){

	socket.on('new user', function(data, callback){
		if(nicknames.indexOf(data) != -1){
			callback(false);//nickname exists
		}else{
			callback(true);
			socket.nickname = data;//socket also stores names
			nicknames.push(socket.nickname);//add to array
			updateNicknames();
		}
	
	});
	
	function updateNicknames(){
		io.emit('usernames',nicknames);
	}
	
	socket.on('send message', function(data){
		//senf message and socket's attached name
		io.emit('new message',{msg: data, nick: socket.nickname});
	});
	
	//socket method runs whenever user disconnects
	socket.on('disconnect',function(data){
		if(!socket.nickname) return; //they didn't choose a name
		//else remove from nicknames list and update list
		nicknames.splice(nicknames.indexOf(socket.nickname),1);
		updateNicknames();
	});

});