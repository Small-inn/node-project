// 处理post data promise封装
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['Content-Type'] !== 'application/json') {
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

// 获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

module.exports = { getPostData, getCookieExpires }