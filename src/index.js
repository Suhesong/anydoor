const yargs=require('yargs');
const Server=require('./app');

const argv=yargs
.usage('anydoor [option]')
.option('p',{
	alias:'port',
	describe:'端口号'
})
.option('h',{
	alias:'hostname',
	describe:'host'
})
.option('d',{
	alias:'root',
	describe:'root path'
})
.version()
.alias('v','version')
.help()
.argv;

console.log(argv);
const server =new Server(argv);
server.start();