const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data promise封装
const getPostData = (req) => {
  console.log(req.method)
  // console.log(req.headers['Content-type'])
  return new Promise((resolve) => {
    // console.log(reject)
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['Content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      // console.log(chunk)
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      console.log(postData)
      resolve(JSON.parse(postData))
    })
  })
}

// 处理请求与响应
const serverHandle = (req, res) => {
  // console.log(Content-type)
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
    // blog
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(JSON.stringify(blogData))
    //   return
    // }
    const resultBlog = handleBlogRouter(req, res)
    if (resultBlog) {
      resultBlog.then(blogData => {
        res.end(JSON.stringify(blogData))
      }).catch(err => {
        console.log(err)
      })
    }

    // user
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return 
    }
    // 异常处理
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 not found')
    res.end()
  }).catch(err => {
    console.log(err)
  })
}

module.exports = serverHandle