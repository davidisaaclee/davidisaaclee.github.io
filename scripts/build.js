const pug = require('pug');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const paths = {
	public: path.join(__dirname, '..', 'public'),
	output: path.join(__dirname, '..', 'build'),
};

// copyPublicFiles :: () -> Promise<URLString>
// Returns a promise of the output URL.
function copyPublicFiles() {
	return new Promise((resolve, reject) => {
		ncp(paths.public, paths.output, err => {
			if (err) {
				reject(err);
			} else {
				resolve(paths.output);
			}
		});
	});
}

Promise.all([copyPublicFiles()])
	.then(() => process.exit(0))
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

