
require('dotenv').config();

const port = process.env.NODE_SERVER_PORT;
const endpoint = process.env.NODE_SERVER_ENDPOINT;

const http = require('http').createServer();
const io = require('socket.io')(http);

const clear = require('clear');
const { greenMessage, redMessage } = require('./lib/chalk');
var usernames = {};
clear();

io.sockets.on('connection', (socket) => {
	greenMessage(`${socket.id} is now connected`);
	socket.on('message', (data) => {
		socket.broadcast.emit('message', data);
	});

	socket.on('ADD_USER', (username) => {
		socket.username = username;
		usernames[username] = username;
		greenMessage(`${socket.id} is now ${username}`);

		socket.room = 'LOBBY';
		socket.join('LOBBY');
		greenMessage(`${socket.id} (${username}) join LOBBY`);
	});

	socket.on('JOIN_GENERAL', () => {
		socket.join('GENERAL');
		io.sockets.in('GENERAL').emit('UPDATE_CHAT', 'SERVER', socket.username + ' is now connected');
		greenMessage(`${socket.id} (${socket.username}) join GENERAL`);
	});

	socket.on('CREATE_ROOM', (newroom) => {
		socket.leave(socket.room);
		socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', socket.username + ' is now disconnected');
		redMessage(`${socket.id} leave room: ${newroom}`);

		socket.room = newroom;
		socket.join(newroom);
		socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', socket.username + ' is now connected');
		greenMessage(`${socket.id} join room: ${newroom}`);
	});

	socket.on('SWITCH_ROOM', (newroom) => {
		socket.leave(socket.room);
		socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'SERVER', socket.username + ' is now disconnected');
		redMessage(`${socket.id} leave room: ${socket.room}`);

		socket.room = newroom;
		socket.join(newroom);
		io.sockets.to(newroom).emit('UPDATE_CHAT', 'SERVER', socket.username + ' is now connected');
		greenMessage(`${socket.id} join room: ${newroom}`);
	});

	socket.on('MESSAGE', (message) => {
		io.sockets.in(socket.room).emit('UPDATE_CHAT', socket.username, message);
	});

	socket.on('disconnect', () => {
		delete usernames[socket.username];
		socket.leave(socket.room);
		redMessage(`${socket.id} is now disconnected`);
	});
});

http.listen(port, () => console.log(`server listening on: ${endpoint}:${port}`));