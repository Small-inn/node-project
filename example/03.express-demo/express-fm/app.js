const express = require('express')
const fs = require('fs')
const { promisify } = require('util')
// const readFile = promisify(fs.readFile)

const app = express()

// app.use(express.urlencoded())
app.use(express.json())

// app.get('/', async (req, res) => {
//   let backData = await readFile('', 'utf8')
//   console.log(backData)
// })

app.post('/', async (req, res) => {
  console.log(req.body)
  let body = req.body || ''
  if (!body) {
    res.status(403).json({
      err: '缺少用户信息'
    })
  } else {
    res.status(200).json({
      data: '123'
    })
    res.end()
  }
})

app.listen(3000, () => {
  console.log('listen 3000 server')
})
