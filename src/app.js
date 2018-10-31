const http = require('http');
const chalk = require('chalk');
const config = require('./config/defaulconfig.js');
const path = require('path');
const route = require('./helper/route');
const openUrl = require('./helper/open');


class Server {
    constructor(conf) {
        this.config = Object.assign({}, config, conf);
    }
    start() {
        const server = http.createServer((req, res) => {
            const filepath = path.join(this.config.root, req.url);
            route(req, res, filepath);
        });

        server.listen(this.config.port, this.config.hostname, () => {
            const addr = `http://${this.config.hostname}:${this.config.port}`;
            console.log(`Server started at ${chalk.red(addr)}`);
            openUrl(addr);
        });
    }
}
module.exports=Server;