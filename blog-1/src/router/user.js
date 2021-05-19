const handleUserRouter = (req, res) => {
  console.log(res)
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '登录接口',

    }
  }
}

module.exports = handleUserRouter