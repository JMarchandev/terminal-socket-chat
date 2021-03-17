const inquirer = require('inquirer');

const setUsername = async () => {
	let username = '';
	const request = await inquirer.prompt([
		{
			name: 'username',
			type: 'input',
			message: 'Enter a pseudo (press enter for anonymous):',
		},
	]);

	if (request.username) {
		username = request.username;
	} else {
		username = 'anonymous';
	}

	return username;
};

const setChatConfig = async () => {
	let response = '';
	const request = await inquirer.prompt([
		{
			name: 'config',
			type: 'rawlist',
			message: 'Choose an action:',
			choices: ['Join general room', 'Join Private room', 'Create Private Room'],
		}
	]);

	if (request.config === 'Join general room') {
		response = 'JOIN_GENERAL_ROOM';
	} else if (request.config === 'Join Private room') {
		response = 'JOIN_PRIVATE_ROOM';
	} else if (request.config === 'Create Private Room') {
		response = 'CREATE_PRIVATE_ROOM';
	}

	return response;
};

const createPrivateRoom = async () => {
	const request = await inquirer.prompt([
		{
			name: 'newRoom',
			type: 'input',
			message: 'Type name of room:',
		}
	]);
	return request.newRoom;
};

const joinPrivateRoom = async () => {
	const request = await inquirer.prompt([
		{
			name: 'room',
			type: 'input',
			message: 'Type id of room'
		}
	]);
	return request.room;
};

module.exports.setUsername = setUsername;
module.exports.setChatConfig = setChatConfig;
module.exports.createPrivateRoom = createPrivateRoom;
module.exports.joinPrivateRoom = joinPrivateRoom;