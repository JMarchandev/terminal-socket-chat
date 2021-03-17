var uniqid = require('uniqid');

const createRoomId = (roomName) => {
	return uniqid(roomName + '-');
};

module.exports.createRoomId = createRoomId;