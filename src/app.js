const http = require('http');
const chalk = require('chalk');
const config = require('./config/defaulconfig.js');
const path = require('path');
const route = require('./helper/route');


const server = http.createServer((req, res) => {
    const filepath = path.join(config.root, req.url);
    route(req, res, filepath);
});

server.listen(config.port, config.hostname, () => {
    const addr = `http://${config.hostname}:${config.port}`;
    console.log(`Server started at ${chalk.red(addr)}`);
});