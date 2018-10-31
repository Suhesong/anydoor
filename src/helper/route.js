const fs = require('fs');
const promisify = require('util').promisify;

const stat = promisify(fs.stat);
const read = promisify(fs.readdir);
/* eslint-disable */
module.exports = async (req, res, filepath) => {
    try {
        const stats = await stat(filepath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filepath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await read(filepath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','))
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('some error');
    }

}
/* eslint-enable */