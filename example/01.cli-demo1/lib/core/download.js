const download = require('download-git-repo')
const ora = require('ora')

const downloadFn = function(url, project) {
  const spinner = ora().start()
  spinner.text = '代码正在下载.....'

  download('direct:'+url, project, { clone: true }, err => {
    console.log(err)
    if (!err) {
      spinner.succeed('成功！')
      console.log('Done! You can run:')
      console.log('cd ' + project)
      console.log('npm install')
      console.log('npm run dev')
    } else {
      spinner.fail('失败！')
    }
  })
}

export default downloadFn

