function Blob(x,y,size){
	this.pos = createVector(x,y);
	this.r = size;
	this.vel = createVector(0,0);
	
	this.show = function(){
		fill(200);
		ellipse(this.pos.x, this.pos.y, this.r*2,this.r*2);

	}
	
	this.update = function(){
		var newVel = createVector((mouseX-this.pos.x), (mouseY-this.pos.y));//mouse position - center of window
		newVel.setMag(3);//sets magnitude of vector
		this.vel.lerp(newVel,0.2);
		this.pos.add(this.vel);
	}
	
	this.constrain = function(){
		blob.pos.x = constrain(blob.pos.x,0,width);
		blob.pos.y = constrain(blob.pos.y,0,height);
	}
	
	
	
	
	
	
	
	
	
}