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
  const title = postData.title
  const content = postData.content
  const author = postData.author
  const createtime = Date.now()
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

const updateBlog = (id, postData = {}) => {
  const { title, content } = postData
  const sql = `update blog set title='${title}', content='${content}' where id='${id}'`
  return exec(sql).then(updateData => {
    if (updateData.affecteRows > 0) {
      return true
    } else {
      return false
    }
  })
}

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