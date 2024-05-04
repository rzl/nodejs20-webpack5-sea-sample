
const { readDirs } = require('../sea-cmd')

require('esbuild').build({
    entryPoints: ['bin/www'],
    bundle: true,
    define: {
        'SEA_FILE_DATA': JSON.stringify(readDirs(['views', 'public', 'package.json'])),
    },
    platform: 'node',
    outfile: 'esb/out.js',
  }).catch(() => process.exit(1))