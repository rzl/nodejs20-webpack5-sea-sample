

var fs = require('fs');
var path = require('path');
function readDir(dir, result = {}, stat) {
    if (!stat) {
        var stat = fs.statSync(dir);
    }
    if (!stat.isDirectory()) {
        result[dir] = { data: fs.readFileSync(dir).toString('base64'), stat: stat };
        return result;
    } else {
        var dirList = fs.readdirSync(dir);
        result[dir] = { data: dirList, stat: stat };
        dirList.forEach((item) => {
            let pathName = path.join(dir, item)
            readDir(pathName, result);
        })
    }
    return result;
}
function readDirs(paths= []) {
    var res = {}
    paths.forEach((item) => {
        readDir(item, res)
    })
    return res
}
var a = readDirs(['views', 'public', 'package.json'])
console.log(a)
return
var fse = require('fs-extra')
const { sea_exec, sea_main } = require('../sea-cmd')


async function main() {
    await sea_exec(`npm run build`)
    await sea_main()
    fse.copySync('public', 'dist/public')
    //fse.copySync('views', 'dist/views')
    fse.moveSync('hello.exe', 'dist/hello.exe', { overwrite: true })
    fse.copySync('package.json', 'dist/package.json')

    console.log('\ncd dist && hello.exe\n')

}

main();



