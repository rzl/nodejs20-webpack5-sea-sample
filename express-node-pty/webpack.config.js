const path = require('path');

const serverConfig = {
    target: 'node',
    node: {
        __dirname: false,
    },
    //entry: './bin/www.js',
    entry: {

        index: './index.js',
        conoutSocketWorker: './node_modules/node-pty/lib/worker/conoutSocketWorker.js'
    }
    ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (pathData) => {
            return pathData.chunk.name === 'index' ? 'lib.node.js' : 'worker/[name].js';
        },
    },
    externals: [
        // nodeExternals()
    ],
    optimization: {
        minimize: false
    },
    module: {

        rules: [
            {
                test: /\.node$/,
                use: 'node-loader',

            },
        ],
    }
}
module.exports = [serverConfig];
