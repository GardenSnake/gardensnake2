var socket;
var blobs = [];
var blob;

function setup(){
	createCanvas(800,800);
	socket = io.connect();
	blob = new Blob(random(0,width),random(0,height), 16);
	var data = {x: blob.pos.x, y:blob.pos.y, r:blob.r};
	socket.emit('start',data);
	
	socket.on('heartbeat', function(data){
		blobs = data;
	});
}

function draw(){
	background(44);
	
	for(var i = blobs.length-1;i>=0;i--){//All blobs
		if(blobs[i].id.substring() !==socket.id){//if not this blob
			if(blobs[i].id.startsWith('food')){
				food = createVector(blobs[i].x,blobs[i].y);
				var d = p5.Vector.dist(blob.pos,food);
				if(d<blob.r+blobs[i].r){
					var sum = (PI * blob.r * blob.r + PI * blobs[i].r * blobs[i].r);
					blob.r = sqrt(sum/PI);
					var data = blobs[i].id;
					socket.emit('eaten',data);
				}
			}
		
			fill(0,0,255);
			ellipse(blobs[i].x,blobs[i].y,blobs[i].r*2,blobs[i].r*2);
		}
	}
	blob.show();
		blob.update();
	blob.constrain();
	
	var data = {x: blob.pos.x, y:blob.pos.y, r:blob.r};
	socket.emit('update',data);

}