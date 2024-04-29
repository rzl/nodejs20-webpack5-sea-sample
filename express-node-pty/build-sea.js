
var fse = require('fs-extra')
const {sea_exec, sea_main} = require('../sea-cmd')


async function main() {
    await sea_exec(`npm run build`)
    await sea_main()
    fse.copySync('public', 'dist/public')
    fse.moveSync('hello.exe', 'dist/hello.exe', { overwrite: true })
    console.log('\ncd dist && hello.exe\n')
}

main();



