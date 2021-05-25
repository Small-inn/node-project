const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blog where 1=1`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ` order by createtime desc;`
  console.log(sql)
  return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
  const sql = `select * from blog where id=${id}`
  return exec(sql).then(res => {
    return res[0]
  })
}
 
// 新增博客
const newBlog = (postData = {}) => {
  console.log(postData)
  return {
    id: 3
  }
}

const updateBlog = (id, postData = {}) => {
  console.log('update blog', id, postData)
  return true
}

const delBlog = (id) => {
  console.log(id)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}