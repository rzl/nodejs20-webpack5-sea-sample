const path = require('path');
const webpack = require('webpack');
const { readDirs } = require('../sea-cmd')


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

    ],
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({

            SEA_FILE_DATA: JSON.stringify(readDirs(['views', 'public', 'package.json'])),
        })
    ],
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
