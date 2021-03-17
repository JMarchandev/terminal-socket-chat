const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const { getFullDate } = require('./date');

const greenMessage = (message) => {
	return console.log(chalk.greenBright(message));
};

const redMessage = (message) => {
	return console.log(chalk.redBright(message));
};

const yellowMessage = (message) => {
	return console.log(chalk.yellowBright(message));
};

const bigTitle = () => {
	return console.log(chalk.yellow(
		figlet.textSync('Secret Chat', { horizontalLayout: 'full' })
	));
};

const startingChat = (username, room) => {
	clear();
	bigTitle();
	console.log(chalk.red('=== start chatting ==='));
	console.log(chalk.red(`=== connected as ${username} ===`));
	console.log(chalk.red(`=== in ${room.type} room === `));
	if (room.id) {
		console.log(chalk.red(`=== room id ${room.id} === `));
	}
	console.log(getFullDate());
};

module.exports.greenMessage = greenMessage;
module.exports.redMessage = redMessage;
module.exports.yellowMessage = yellowMessage;
module.exports.bigTitle = bigTitle;
module.exports.startingChat = startingChat;
