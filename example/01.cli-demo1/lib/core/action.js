// import inquirer from 'inquirer'

var inquirer = require('inquirer')
const config = require('../../config')
const downloadFn = require('./download')
const myAction = (project, args) => {
  // 命令行执行的逻辑代码
  // console.log(project)
  // console.log(args)
  inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      choices: config.framwork,
      message: '请选择你使用的框架'
    }
  ]).then(answer => {
    console.log(answer)
    const url = config.framworkUrl[answer.framwork]
    downloadFn(url, project)
  })
}

module.exports = myAction