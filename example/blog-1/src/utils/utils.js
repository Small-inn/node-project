// 处理post data promise封装
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['Content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

module.exports = { getPostData }