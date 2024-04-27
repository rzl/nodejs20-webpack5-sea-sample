const path = require('path');
const serverConfig = {
    target: 'node',
    node: {
        __dirname: false,
    },
    entry: './bin/www',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js',
    },
    externals:[

    ],
    optimization: {
        minimize: true
    },
    module: {

    }
}
module.exports = [serverConfig];
