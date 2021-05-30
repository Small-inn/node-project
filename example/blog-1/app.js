/*
 * @Author: liux
 * @Date: 2021-05-Tu 11:37:38 
 * @Last Modified by: liux 
 * @Last Modified time: 2021-05-Tu 11:37:38 
 */

const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getPostData } = require('./src/utils/utils')

// 处理请求与响应
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
    req.body = postdata
    // console.log(req.body)
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
      })
      return
    }

    // user
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        res.end(JSON.stringify(userData))
      })
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