const getList = (author, keyword) => {
  console.log(author, keyword)
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '12321312312',
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: '12321312312',
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  console.log(id)
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '12321312312',
    author: 'zhangsan'
  }
}

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