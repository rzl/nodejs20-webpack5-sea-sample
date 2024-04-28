const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
    externals: [
        nodeExternals()
    ],
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            /**
             *  因为sqlite3是动态引入node的模块，node-loader无法处理
             */
            // {
            //     test: /\.node$/,
            //     use: 'node-loader',
            // },
        ]
    }
}
module.exports = [serverConfig];
