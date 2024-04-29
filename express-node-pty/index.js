const path = require('path')
const os = require('os')
const express = require('express')
const app = express()
const pty = require("node-pty");
const port = 3000
require('express-ws')(app);
app.use(express.static(path.join(__dirname, 'public')));


const bindTerm = (opt) => {
  const shell = os.platform() === "win32" ? "cmd.exe" : "bash";
  var xterm = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: __dirname,
    env: process.env,
    ...opt
  });
  xterm.onExit(() => {
    console.log(xterm.pid.toString() + 'exit')
  })
  return xterm;

}

app.ws("/xterm/:rows/:cols", (ws, req) => {
  console.log('ws connect')
  var rows = parseInt(req.params.rows)
  var cols = parseInt(req.params.cols)

  var xterm = bindTerm({
    rows,
    cols
  })
  xterm.on("data", function (data) {
    ws.send(data)
  })

  ws.on("message", (data) => {
    xterm.write(data)
  })
  ws.on("close", function () {
    xterm.kill(0)
    console.log('close')
  });
  ws.on('error', (err) => {
    console.error(err)
  })

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
process.on('uncaughtException', (err) => {
  console.error(err)
})