const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbname = 'myblog'

MongoClient.connect(
  url,
  {},
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('mongodb connect success')

    // 切换到数据库（控制台 use myblog）
    const db = client.db(dbname)
    console.log(db)
    // 关闭连接
    client.close()
  }
)