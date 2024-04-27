
var fse = require('fs-extra')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

async function my_exec(str) {
    console.log('start -----------------------------------------------------');
    console.log('my_exec:', str)
    const { stdout, stderr } = await exec(str);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
    console.log('my_exec:', str)
    console.log('done -----------------------------------------------------\n');
}

async function main() {
    await my_exec(`npm run build`)
    await my_exec(`node --experimental-sea-config sea-config.json`)
    await my_exec(`node -e "require('fs').copyFileSync(process.execPath, 'hello.exe')"`)
    await my_exec(`npx postject hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`)
    fse.copySync('public', 'dist/public')
    fse.copySync('views', 'dist/views')
    fse.moveSync('hello.exe', 'dist/hello.exe', { overwrite: true })
}

main();



