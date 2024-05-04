

var fse = require('fs-extra')
const { sea_exec, sea_main } = require('../sea-cmd')


async function main() {
    await sea_exec(`npm run build`)
    await sea_main()
    // fse.copySync('public', 'dist/public')
    // fse.copySync('views', 'dist/views')
    fse.moveSync('hello.exe', 'dist/hello.exe', { overwrite: true })
    // fse.copySync('package.json', 'dist/package.json')

    console.log('\ncd dist && hello.exe\n')

}

main();



