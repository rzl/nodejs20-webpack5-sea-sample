require('esbuild').build({
    entryPoints: ['index.js'],
    bundle: true,
    platform: 'node',
    loader: {'.node': 'file'},

    outfile: 'esb/out.js',
  }).catch(() => process.exit(1))