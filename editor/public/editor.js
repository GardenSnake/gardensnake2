(function($) {
	var socket = io.connect();
	var $textBox = $('#textBox');
	var $users = $('#users');
	var $nameForm = $('#setName');
	var $username = $('#name');
	var $nameError = $('#nameError');
	
	$nameForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user',$username.val(),function(data){
			if(data){
				$('#nameWrap').hide();
				$textBox.show();
				$users.show();
			}else{
				$nameError.html('username taken, try again');
			}
		});
		$username.val('');
	});
	
	$textBox.on("input", function(e){
	if($textBox.val().length>0)
		socket.emit('input', $textBox.val());
	});
	
	$textBox.trigger("input");

	socket.on('output', function(data) {
		document.getElementById("textBox").value = data;
	});
	
	socket.on('usernames',function(data){
		var html = '';
		for(var i=0;i<data.length;i++){
			html += data[i] + '<br\>';
		}
		$users.html(html);
	});

}(jQuery));


