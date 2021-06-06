const http = require('http')
const slice = Array.prototype.slice
class LikeExpress {
  constructor() {
    // 存放在中间件列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转为数组，存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一个参数开始，转为数组，存入stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }
  match(method, url) {
    let stack = []
    if (url === '/favicon.icon') {
      return stack
    }
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(e => {
      if (url.indexOf(e.path) === 0) {
        stack = stack.concat(e.stack)
      }
    })
    return stack
  }
  // 核心next机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到匹配的第一个中间件
      const middleware = stack.shift()
      if (middleware) {
        middleware(req, res, next)
      }
    }

    next()
  }
  cd() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.cb())
    server.listen(...args)
  }

}

module.exports = () => {
  return new LikeExpress()
}