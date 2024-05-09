const esbuild = require('esbuild');
const fs = require('fs');
require('esbuild').build({
  entryPoints: ['./node_modules/node-pty/lib/worker/conoutSocketWorker.js'],
  bundle: true,
  platform: 'node',
  loader: { '.node': 'file' },
  outfile: 'out/conoutSocketWorker.js',
}).catch(() => process.exit(1))

var wd = fs.readFileSync('./out/conoutSocketWorker.js', 'utf-8')

// 定义一个简单的字符串替换插件  
const replaceStringsPlugin = {
  name: 'replace-strings',
  setup(build) {
    // 监听 onLoad 钩子，当 esbuild 需要加载文件时会触发  
    build.onLoad({ filter: /windowsConoutConnection\.js$/ }, (args) => {
      // 读取文件内容  
      console.log(args);
      const { path, namespace } = args;
      return new Promise((resolve, reject) => {
        // 假设我们使用 Node.js 的 fs 模块来读取文件  
        require('fs').readFile(path, 'utf8', (err, content) => {
          if (err) {
            reject(err);
          } else {
            // 替换字符串  
            // 这里只是简单地将所有的 'oldString' 替换为 'newString'  
            var ostr = ``
            const newContent = content.replace(
              `this._worker = new worker_threads_1.Worker(path_1.join(scriptPath, 'worker/conoutSocketWorker.js'), { workerData: workerData });`,
              `
              this._worker = new worker_threads_1.Worker(\`${wd}\`, { workerData: workerData, eval: true });
              `
            );

            // 返回一个包含新内容的 Response 对象  
            resolve({
              contents: newContent,
              loader: namespace === 'file' ? 'ts' : namespace, // 根据 namespace 设置适当的 loader  
            });
          }
        });
      });
    });
  },
};

// 使用 esbuild 和插件进行打包  
esbuild.build({
  entryPoints: ['index.js'], // 入口文件  
  bundle: true, // 打包成一个文件  
  platform: 'node',
  outfile: 'out/app.js', // 输出文件  
  loader: { '.node': 'copy' },
  plugins: [replaceStringsPlugin], // 添加插件  
}).catch((err) => {
  // 处理任何可能出现的错误  
  console.error('Build failed:', err);
});