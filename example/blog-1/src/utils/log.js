const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(writeStream + '\n')
}

// 生成write stream
function createWriteStream(filename) {
  const fullFillName = path.join(__dirname, '../', '../', 'logs', filename)
  const writeStream = fs.createReadStream(fullFillName, {
    flogs: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}