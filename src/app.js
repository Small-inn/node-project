const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config');
const fn = require('./helper/route')

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(conf.root, url);
  // 1.0 回调版本
  // fs.stat(filePath, (error, stats) => {
  //   if (error) {
  //     res.statusCode = 404;
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.end(`${filePath} is not a directory or file`);
  //     return;
  //   }
  //   if (stats.isFile()) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/plain');
  //     // fs.readFile(filePath, (err, data) => {
  //     //   res.end(data)
  //     // })
  //     // 以流的方式读取
  //     fs.createReadStream(filePath).pipe(res);
  //   } else if (stats.isDirectory()) {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end(files.join(','));
  //     })
  //   }
  // });
  // 2.0 异步处理
  fn(req, res, filePath)
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
