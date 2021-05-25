const http = require('http')
const server = http.createServer((req, res) => {
  // console.log('req', req)
  // if (req.method === 'POST') {
  //   console.log(req.headers['content-type'])
  //   let postdata = ''
  //   req.on('data', chunk => {
  //     postdata += chunk.toString()
  //   })
  //   req.on('end', () => {
  //     console.log('postdata', postdata)
  //     res.end('hello world')
  //   })
  // }
  const url = req.url
  const path = url.split('?')[0]
  res.end(path)
  console.log(url, path)
})

server.listen(9000)
console.log('server start')