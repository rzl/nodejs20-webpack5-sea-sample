
const os = require('os');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const fs = require('fs');
const path = require('path');

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

function sea_assets(fileOrDir = []) {
    
}
function readDir(dir, result = {}, stat) {
  if (!stat) {
      var stat = fs.statSync(dir);
  }
  if (!stat.isDirectory()) {
      result[dir.replace(/\\/g, '/')] = { data: fs.readFileSync(dir).toString('base64'), stat: stat };
      return result;
  } else {
      var dirList = fs.readdirSync(dir);
      result[dir.replace(/\\/g, '/')] = { data: dirList, stat: stat };
      dirList.forEach((item) => {
          let pathName = path.join(dir, item)
          readDir(pathName, result);
      })
  }
  return result;
}

function readDirs(paths = []) {
  var res = {}
  paths.forEach((item) => {
      readDir(item, res)
  })
  return res
}


async function sea_main() {
    await sea_exec(generateBlob)
    await sea_exec(cpExecutable)
    await sea_exec(injectInto)
}


module.exports = {
    sea_main,
    sea_exec,
    sea_assets,
    readDir,
    readDirs
}


