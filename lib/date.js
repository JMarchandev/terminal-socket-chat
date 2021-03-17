var moment = require('moment');  

module.exports = {
	getFullDate: () => {
		return moment().format('LLL	');
	},
	getHourMinutes: () => {
		return moment().format('LT');
	}
};