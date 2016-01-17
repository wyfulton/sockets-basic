var socket = io()
	now = moment()
	name = getQueryVariable('name') || 'Anonymous'
	room = getQueryVariable('room');

console.log(name + " wants to join " + room);

jQuery('.room-title').text(room)




socket.on('connect', function () {
	console.log('connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});




socket.on('message', function (message) {
	var time = moment.utc(message.timestamp).local().format('h:mma');
	var $messages = jQuery('.messages')
	var $message = jQuery('<li class="list-group-item"></li>')

	console.log('New message:');
	console.log(message.text);
	$message.append('<p><strong>' + message.name + ' ' + time + '</strong></p>')
	$message.append('<p>' + message.text + '</p>')
	$messages.append($message);
});

// handles submitting new message

var $form = jQuery('#message-form');

$form.on('submit', function () {
	event.preventDefault();

	socket.emit('message', {
		name: name,
		text: $form.find('input[name=message]').val()
	});

	$form.find('input[name=message]').val('')
});