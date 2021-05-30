const { SuccessModel, ErrorModel } = require('../model/resModal')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')


const handleBlogRouter = (req) => {
  const method = req.method
  const id = req.query.id || ''
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

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
    req.body.author = '小二'
    // const postData = req.body
    console.log('req-body', req.body)
    newBlog(req.body).then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const postdata = req.body
    const result = updateBlog(id, postdata)
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
    const author = 'zhangsan'
    const resp = delBlog(id, author)
    return resp.then(val => {
      if (val) {
        return new SuccessModel('删除成功')
      } else {
        return ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter