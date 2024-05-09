const { Readable } = require('stream');
const { Buffer } = require('node:buffer');
const path = require('node:path');
class BufferReadable extends Readable {
    constructor(buffer, options) {
        super(options);
        this.buffer = buffer;
        this.position = 0;
    }

    _read(size) {
        let end = this.position + size;
        if (end > this.buffer.length) end = this.buffer.length;
        if (end < this.position) end = this.position; // 防止读取位置超出 Buffer 长度  

        if (end === this.position) {
            // 如果没有数据可读，推送 null 结束流  
            this.push(null);
        } else {
            // 推送数据片段  
            const chunk = this.buffer.slice(this.position, end);
            this.position = end;
            this.push(chunk);
        }
    }
}

module.exports = function (...args) {
    var _require = this
    var module = args[0]
    if (module === 'fs') {
        var fs = _require(...args)
        if (WEBPACK_SEA_FILE_DATA) {
            var readFileSync = fs.readFileSync
            fs.readFileSync = function (...readFileSync_args) {
                try {
                    var relativeName = path.relative(__dirname, readFileSync_args[0]).replace(/\\/g, '/')

                    console.log(`get data from webpack ${relativeName}`)

                    return Buffer.from(WEBPACK_SEA_FILE_DATA[relativeName].data, 'base64')
                } catch (e) {
                    console.error('get from webpack failed')
                    console.error(e)
                }

                console.log(`get data from fs ${readFileSync_args[0]}`)

                return readFileSync(...readFileSync_args)
            }
            var statSync = fs.statSync
            fs.statSync = function (...statSync_args) {
                try {
                    var relativeName = path.relative(__dirname, statSync_args[0]).replace(/\\/g, '/')

                    return statSync(__filename)
                } catch (e) {
                    console.error('get from webpack failed')
                    console.error(e)
                }

                console.log(`get data from fs ${statSync_args[0]}`)

                return statSync(...statSync_args)
            }
            var stat = fs.stat
            fs.stat = function (...stat_args) {
                try {
                    var relativeName = path.relative(__dirname, stat_args[0]).replace(/\\/g, '/')
                    if (WEBPACK_SEA_FILE_DATA[relativeName]) {
                        let s = WEBPACK_SEA_FILE_DATA[relativeName].stat
                        return stat_args[1] && stat_args[1](null, Object.assign(
                            new fs.Stats(),
                            WEBPACK_SEA_FILE_DATA[relativeName].stat,
                            {
                                atime: new Date(s.atime),
                                mtime: new Date(s.mtime),
                                ctime: new Date(s.ctime),
                                birthtime: new Date(s.birthtime)
                            })
                        )
                    }
                } catch (e) {
                    console.error('get from webpack failed')
                    console.error(e)
                }

                console.log(`get data from fs ${stat_args[0]}`)

                return stat(...stat_args)
            }
            var createReadStream = fs.createReadStream
            fs.createReadStream = function (...createReadStream_args) {
                try {
                    var relativeName = path.relative(__dirname, createReadStream_args[0]).replace(/\\/g, '/')
                    if (WEBPACK_SEA_FILE_DATA[relativeName]) {
                        let data = WEBPACK_SEA_FILE_DATA[relativeName].data
                        return new BufferReadable(Buffer.from(data, 'base64'), createReadStream_args[1])
                    }
                } catch (e) {
                    console.error('get from webpack failed')
                    console.error(e)
                }

                console.log(`get data from fs ${stat_args[0]}`)

                return createReadStream(...createReadStream_args)
            }
        }

        return fs
    }


    return _require(...args)
}