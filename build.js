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

if (provider == 'github') {
	const fs = require('fs');
	const fileName = './src/config/config.json';
	const file = require(fileName);

	file.prefix = '/inertia-client';

	fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
		if (err) return console.log(err);
		console.log(JSON.stringify(file, null, 4));
		console.log('writing to ' + fileName);
	});
} else if (provider == 'vercel') {
	exec('git --version', (err, _stdout, _stderr) => {
		if (err) {
			console.log('git not found');
			console.log('getting zip for submodule manually');

			exec('curl https://codeload.github.com/inertia-unblocker/uv-scripts/zip/refs/heads/main -o main.zip', defaultHandler);
			exec('unzip -d ./public main.zip', defaultHandler);
			exec('rm main.zip', defaultHandler);
			exec('mv ./public/uv-scripts-main ./public/uv', defaultHandler);
			return;
		}

		exec('git submodule update --init --recursive', defaultHandler);
	});
}

exec('npm run build', defaultHandler);