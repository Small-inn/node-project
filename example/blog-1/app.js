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
const { getCookieExpires } = require('./src/utils/utils')
const { access } = require('./src/utils/logs')

const SESSION_DATA = {}
// 处理请求与响应
const serverHandle = (req, res) => {
  // 记录日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
  // 设置响应头，格式返回json
  res.setHeader('Content-type', 'application/json')
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(e => {
    if (!e) return
    const arr = e.split('=')
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
  })
  console.log(req.cookie)
  // 解析session
  let userId = req.cookie.userid
  let needSetCookie = false
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    } 
  } else {
    needSetCookie = true
    userId = `${Date.now}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  // 处理post data 
  getPostData(req, res).then(postdata => {
    req.body = postdata
    // blog
    const resultBlog = handleBlogRouter(req, res)
    if (resultBlog) {
      resultBlog.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // user
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
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