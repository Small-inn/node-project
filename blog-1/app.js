const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data promise封装
const getPostData = (req, res) => {
  // console.log(req.method)
  // console.log(req.headers)
  return new Promise((resolve, reject) => {
    console.log(reject)
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    res.on('data', chunk => {
      // console.log(chunk)
      postData += chunk.toString()
    })
    res.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}


const serverHandle = (req, res) => {
  // 设置响应头，格式返回json
  res.setHeader('Content-type', 'application/json')
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理post data 
  getPostData(req, res).then(postdata => {
    console.log(postdata)
    req.body = postdata
    // 处理路由
    const blogData = handleBlogRouter(req, res)

    if (blogData) {
      res.end(JSON.stringify(blogData))
      return
    }

    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return 
    }
    // 异常处理
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 not found')
    res.end()
  })
}

module.exports = serverHandle