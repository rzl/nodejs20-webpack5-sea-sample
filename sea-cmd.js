
var os = require('os');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

async function sea_exec(str) {
    console.log('start -----------------------------------------------------');
    console.log('my_exec:', str)
    const { stdout, stderr } = await exec(str);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
    console.log('my_exec:', str)
    console.log('done -----------------------------------------------------\n');
}

var generateBlob = 'node --experimental-sea-config sea-config.json'
var cpExecutable = `node -e "require('fs').copyFileSync(process.execPath, 'hello.exe')"`
var injectInto = 'npx postject hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2'

if (os.platform() == 'linux') {
    cpExecutable = 'cp $(command -v node) hello.exe '
    injectInto = 'npx postject hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2'
} else if (os.platform() == 'darwin') {
    cpExecutable = 'cp $(command -v node) hello.exe '
    injectInto = 'npx postject hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --macho-segment-name NODE_SEA '
}

async function sea_main() {
    await sea_exec(generateBlob)
    await sea_exec(cpExecutable)
    await sea_exec(injectInto)
}


module.exports = {
    sea_main,
    sea_exec
}


