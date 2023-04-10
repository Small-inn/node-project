const http = require('http')
const url = require('url')

const server = http.createServer()

server.on('request', (req, res) => {
  // 1.0
  // res.setHeader('Content-type', 'text/plain;charset=utf-8')
  // res.write('666')
  // res.end()
  // // 对请求地址判断
  // if (req.url) {}

  // 2.0
  if (req.method === 'GET') {
    // 获取get请求参数
    console.log(req.url)
    const url = url.parse(req.url, true)
  } else if (req.method === 'POST'){
    // 获取post请求参数
    let data
    req.on('data', (d) => {
      data += d
      console.log(d)
    })
    req.on('end', () => {
      require('querystring').parse(data)
    })
  }
})

server.listen(8080, () => {
  console.log('listenning: 8080')
})