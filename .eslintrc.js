module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'node': true,
		'es6': true,
	},
	'globals': {
		'process': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 2021
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
