const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, 'data.txt')

fs.readFile(filename, (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  // 此处data是二进制类型，需要转换toString
  console.log(data.toString())
})

const content = {
  a: 1,
  b: 2
}

fs.writeFile(filename, content, (err) => {
  if (err) console.log(err)
})