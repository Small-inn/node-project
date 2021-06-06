const { exec } = require('../db/mysql')
const xss = require('xss')

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

// 获取博客
const getDetail = (id) => {
  const sql = `select * from blog where id=${id}`
  return exec(sql).then(res => {
    return res[0]
  })
}
 
// 新增博客
const newBlog = (blogData = {}) => {
 // blogData 是一个博客对象，包含 title content author 属性
  const title = xss(blogData.title)
  // console.log('title is', title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blog (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `
  return exec(sql).then(insertData => {
    console.log('insertData', insertData)
    return {
      id: insertData.insertId
    }
  })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `update blog set title='${title}', content='${content}' where id='${id}'`
  return exec(sql).then(updateData => {
    if (updateData.affecteRows > 0) {
      return true
    } else {
      return false
    }
  })
}

// 删除博客
const delBlog = (id, author) => {
  const sql = `delete from blog where id='${id}' and author='${author}'`
  return exec(sql).then(delData => {
    if (delData.affecteRows > 0) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}