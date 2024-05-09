const { fork } = require('node:child_process');
const normal = fork('./subprocess.js', ['normal']);
const special = fork('./subprocess.js', ['special']);

// Open up the server and send sockets to child. Use pauseOnConnect to prevent
// the sockets from being read before they are sent to the child process.
// const server = require('node:net').createServer({ pauseOnConnect: true });
// server.on('connection', (socket) => {

//   // If this is special priority...
//   if (socket.remoteAddress === '74.125.127.100') {
//     special.send('socket', socket);
//     return;
//   }
//   // This is normal priority.
//   normal.send('socket', socket);
// });
// server.listen(1337); 