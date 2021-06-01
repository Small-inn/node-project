const { SuccessModel, ErrorModel } = require('../model/resModal')
const { login } = require('../controller/user')
const { getCookieExpires } = require('../utils/utils')

const handleUserRouter = (req, res) => {
  // console.log(res)
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    console.log(username, password)
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 设置session
        req,session.username = data.username
        req,session.password = data.password
        // 操作cookie
        // result.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          // username: req.cookie.username
          session: req.session
        })
      )
    }
    return Promise.resolve(new ErrorModel('尚未登录！'))
  }
}

module.exports = handleUserRouter