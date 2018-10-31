const fs = require('fs');
const promisify = require('util').promisify;
const Handlebars=require('handlebars');
const path=require('path');
const config=require('../config/defaulconfig');

const stat = promisify(fs.stat);
const read = promisify(fs.readdir);


const tplPath=__dirname+'/../template/dir.tpl';
const source=fs.readFileSync(tplPath,'utf-8');
const template=Handlebars.compile(source);
module.exports = async  function (req, res, filepath){
    try {
        const stats = await stat(filepath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filepath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await read(filepath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir =path.relative(config.root,filepath);
            const data={
                files,
                title:path.basename(filepath),
                dir:dir?`../${dir}`:''
            }
            res.end(template(data))
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('some error');
    }

}
