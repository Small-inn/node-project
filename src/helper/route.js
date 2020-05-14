const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Handlebars  = require('handlebars')
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require('../config/index');

const tplPath = path.join(__dirname, '../tmp/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.setHeader('Content-Type', contentType);

      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return
      }

      let rs;
      const { code, start, end } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end})
      }
      // fs.createReadStream(filePath).pipe(res);
      // let rs = fs.createReadStream(filePath);
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      // res.end(files.join(','));
      const dir = path.relative(conf.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files
      }
      res.end(template(data))
    }
  } catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file\n ${err}`);
    return;
  }
}
