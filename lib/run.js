const clear = require('clear');
const inquirer = require('./inquirer');

const { startPrivateRoom, startJoinPrivateRoom, addUser, joinGeneralRoom } = require('./socket');
const { createRoomId } = require('./uniqid');

const initApp = async (socket) => {
	/**
     * Prompt
     * name: ?string
     */
	const name = await inquirer.setUsername();
	addUser(name, socket);
	clear();

	/**
     * Prompt
     * type: JOIN_GENERAL_ROOM | JOIN_PRIVATE_ROOM | CREATE_PRIVATE_ROOM
     * id?: string
     */
	const startChatSelection = await inquirer.setChatConfig();
	const room = await initStartChatSelection(startChatSelection, socket);
	clear();

	return {
		username: name,
		room: room
	};
};

const initStartChatSelection = async (selection, socket) => {
	if (selection === 'JOIN_GENERAL_ROOM') {
		joinGeneralRoom(socket);

		clear();
		return {type: 'GENERAL'};
	}

	if (selection === 'JOIN_PRIVATE_ROOM') {
		const roomId = await inquirer.joinPrivateRoom();
		startJoinPrivateRoom(roomId, socket);

		clear();
		return { type: 'PRIVATE', id: roomId };
	}

	if (selection === 'CREATE_PRIVATE_ROOM') {
		const newRoom = await inquirer.createPrivateRoom();
		const newRoomId = await createRoomId(newRoom);
		startPrivateRoom(newRoomId, socket);

		clear();
		return { type: 'PRIVATE', id: newRoomId };
	}
};

module.exports.initApp = initApp;
module.exports.initStartChatSelection = initStartChatSelection;