const { SuccessModel, ErrorModel } = require('../model/resModal')
const { login } = require('../controller/user')

const handleUserRouter = (req) => {
  // console.log(res)
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // console.log(username, password)
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter