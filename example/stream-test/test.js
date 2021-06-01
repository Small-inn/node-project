const fs = require('fs')
const path = require('path')
const http = require('http')

// const file1 = path.resolve(__dirname, 'data.txt')
// const file2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream(file1)
// const writeStream = fs.createWriteStream(file2)

// readStream.pipe(writeStream)

// readStream.on('data', (chunk) => {
//   // data是二进制类型
//   console.log(chunk.toString())
// })

// readStream.on('end', () => {
//   console.log('copy done!')
// })

// 
const file1 = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(file1)
    readStream.pipe(res)
  }
})
server.listen(8080)
