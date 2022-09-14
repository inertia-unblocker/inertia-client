const exec = require('child_process').exec;
const provider = process.argv[2];

const defaultHandler = (err, stdout, stderr) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stdout);
	console.log(stderr);
};

const fs = require('fs');
const fileName = './src/config/config.json';
const file = require(fileName);

file.prefix = '/inertia-client';

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
	if (err) return console.log(err);
	console.log(JSON.stringify(file, null, 4));
	console.log('writing to ' + fileName);
});

exec('npm run build', defaultHandler);