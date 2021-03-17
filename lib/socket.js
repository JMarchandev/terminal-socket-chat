module.exports = {
	addUser: (username, socket) => {
		return socket.emit('ADD_USER', username);
	},
	joinGeneralRoom: (socket) => {
		return socket.emit('JOIN_GENERAL');
	},
	startPrivateRoom: (room, socket) => {
		return socket.emit('CREATE_ROOM', room);
	},
	startJoinPrivateRoom: (room, socket) => {
		return socket.emit('SWITCH_ROOM', room);
	},
	sendMessage: (message, socket) => {
		return socket.emit('MESSAGE', message);
	}
};