const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


const serverHandle = (req, res) => {
  
  // 设置响应头，格式返回json
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[0])
  
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

  res.writeHead(404, {'Content-type': 'text/plain'})
  res.write('404 not found')
  res.end()
}

module.exports = serverHandle