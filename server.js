var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};
// Sends current users to provided socket

function sendCurrentUsers(socket) {
	var info = clientInfo[socket.id];
	var users = []

	if (typeof info === 'undefined') {
		return;
	}

	Object.keys(clientInfo).forEach(function (socketId) {
		var userInfo = clientInfo[socketId];

		if(info.room === userInfo.room) {
			users.push(userInfo.name);
		}
	});

	socket.emit('message', {
		name: 'System',
		text: 'Current users: ' + users.join(', '),
		timestamp: moment().valueOf()
	});
}

io.on('connection', function (socket) {
	console.log('user connected via socket.io!');

	socket.on('joinRoom', function (req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + 'has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('disconnect', function () {
		if (typeof clientInfo[socket.id] !== 'undefined') {
			socket.leave(clientInfo[socket.id].room);
			socket.to(clientInfo[socket.id].room).emit('message', {
				name: 'System',
				text: clientInfo[socket.id].name + 'has left the room',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id]
		}
	});

	socket.on('message', function (message) {
		console.log('Message recieved: ' + message.text);
		if(message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message);
		}

		
	});

	socket.emit('message', {
		name: 'System',
		text: 'welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('server started!');
})