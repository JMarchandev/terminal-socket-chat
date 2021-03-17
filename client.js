require('dotenv').config();

const endpoint = process.env.NODE_SERVER_ENDPOINT;
const port = process.env.NODE_SERVER_PORT;

var socket = require('socket.io-client')(`http://${endpoint}:${port}`);
const repl = require('repl');
const clear = require('clear');

const { initApp } = require('./lib/run');
const { startingChat, yellowMessage, greenMessage } = require('./lib/chalk');
const { getHourMinutes } = require('./lib/date');
const { sendMessage } = require('./lib/socket');

clear();

socket.on('connect', async () => {
	const init = await initApp(socket);
	await startingChat(init.username, init.room);

	repl.start({
		prompt: '',
		eval: (cmd) => {
			sendMessage(cmd, socket);
		},
	});
});

socket.on('UPDATE_CHAT', (sender, message) => {
	yellowMessage(getHourMinutes() + ' : ' + sender + ' => ' + message);
});

socket.on('message', (cmd, username) => {
	greenMessage(username + ' => ' + cmd.split('\n')[0]);
});

socket.on('disconnect', function () {
	socket.emit('disconnect');
});
// const reply = (socket) => {
	
// };


