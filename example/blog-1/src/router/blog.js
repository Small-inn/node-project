const { SuccessModel, ErrorModel } = require('../model/resModal')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
      return Promise.resolve(
          new ErrorModel('尚未登录')
      )
  }
}


// 路由处理
const handleBlogRouter = (req) => {
  const method = req.method
  const id = req.query.id || ''

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      // 强制查询自己的博客
      author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
      console.log(listData)
      return new SuccessModel(listData)
    }).catch(err => {
      console.log(err) 
    })
    
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return getDetail(id).then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // req.body.author = '小二'
    // const postData = req.body
    const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }

      req.body.author = req.session.username
      const result = newBlog(req.body)
      return result.then(data => {
        return new SuccessModel(data)
      })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    // const postdata = req.body
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const result = updateBlog(id, req.body)
    return result.then(res => {
      if (res) {
        return new SuccessModel('更新成功')
      } else {
        return ErrorModel('更新失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    // const author = 'zhangsan'
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel('删除成功')
      } else {
        return ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter