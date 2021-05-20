const { SuccessModel, ErrorModel } = require('../model/resModal')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')


const handleBlogRouter = (req, res) => {
  console.log(res)

  const method = req.method
  const id = req.query.id || ''
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }
  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const postData = req.body
    const data = newBlog(postData)
    return new SuccessModel(data)
    // return {
    //   msg: '新建博客'
    // }
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const postdata = req.body
    console.log(postdata)
    const result = updateBlog(id, postdata)
    if (result) {
      return new SuccessModel('更新成功')
    } else {
      return ErrorModel('更新失败')
    }
  }
  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const resp = delBlog(id)
    if (resp) {
      return new SuccessModel('删除成功')
    } else {
      return ErrorModel('删除失败')
    }
  }
}
module.exports = handleBlogRouter