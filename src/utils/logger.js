const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

const log = (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`);
};

const info = (message) => log(`INFO: ${message}`);
const error = (message) => log(`ERROR: ${message}`);

module.exports = { info, error };
