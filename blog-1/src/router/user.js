const { SuccessModel, ErrorModel } = require('../model/resModal')
const { login } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    console.log(username, password)
    const result = login(username, password)
    if (result) {
      return new SuccessModel('登录成功')
    } else {
      return new ErrorModel('登录失败')
    }
  }
}

module.exports = handleUserRouter