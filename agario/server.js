function Blob(id,x,y,r){
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = r;
}
var blobs = [];
var totFood = 0;
var food = [];

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 8080, listen);

function listen(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));
var io = require('socket.io')(server);

setInterval(heartbeat,20);
function heartbeat(){
	io.sockets.emit('heartbeat',blobs);
}

io.sockets.on('connection', function(socket){
	console.log("A new client has appeared: "+socket.id);
	
	socket.on('start',function(data){
		console.log(socket.id+" : "+data.x+ " : "+data.y+" : "+data.r);
		var blob = new Blob(socket.id,data.x,data.y,data.r);
		blobs.push(blob);
		if(blobs.length ==1){
			for(var i =0;i<5;i++){
				var food = new Blob('food'+totFood++,Math.floor(Math.random() * 800) + 1,Math.floor(Math.random() * 800) + 1,7);
				blobs.push(food);
			}
		}
		console.log(blobs);
	});
	
	socket.on('update',function(data){
		//console.log(socket.id+" : "+data.x+ " : "+data.y+" : "+data.r);
		var blob;
		for(var i=0;i<blobs.length;i++){
			if(socket.id==blobs[i].id)
				blob=blobs[i];
		}
		blob.x = data.x;
		blob.y = data.y;
		blob.r = data.r;
	});
	
	socket.on('disconnect', function(){
		for(var i=0;i<blobs.length;i++){
			if(socket.id==blobs[i].id)
				blobs.splice(i,1);
		}
	});
	
	socket.on('eaten', function(data){
	console.log('EATEN');
		for(var i=0;i<blobs.length;i++){
			if(data==blobs[i].id){
				blobs.splice(i,1);
					var food = new Blob('food'+totFood++,Math.floor(Math.random() * 800) + 1,Math.floor(Math.random() * 800) + 1,7);
					blobs.push(food);
				}
		}
	});
	
	
});