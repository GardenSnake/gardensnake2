var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};//object holds sockets

http.listen(8080);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/chat3.html');
});

io.on('connection',function(socket){

	socket.on('new user', function(data, callback){
		if(data in users){
			callback(false);//name exists
		}else{
			callback(true);
			socket.nickname = data;//socket also stores names
			users[socket.nickname] = socket;//nickname is key
			updateUsers();
		}
	
	});
	
	function updateUsers(){
		io.emit('usernames',Object.keys(users));
	}
	
	socket.on('send message', function(data, callback){
		var msg = data.trim(); //trim whitespace before whisper
		if(msg.length==0) return;//prevent empty space
		if(msg.substr(0,3) === '/w '){//if starts with "/w "
			msg = msg.substr(3);//cut off "/w " part
			var ind = msg.indexOf(' ');//space after name
			if(ind !== -1){//if there is a message after name
				var name = msg.substring(0, ind);//get name
				msg = msg.substring(ind + 1);//message after name
				if(name in users){
					users[name].emit('whisper',{msg: msg, nick: socket.nickname});
				}else{
					callback('Enter a valid username');
				}
			}else{
				callback('Enter whisper message properly');
			}
		}else{//no whisper
		//send message and socket's attached name
		io.emit('new message',{msg: msg, nick: socket.nickname});
		}
	});
	
	//socket method runs whenever user disconnects
	socket.on('disconnect',function(data){
		if(!socket.nickname) return; //they didn't choose a name
		//else remove from users list and update list
		socket.broadcast.emit('user left', socket.nickname);
		delete users[socket.nickname];
		updateUsers();
	});

});