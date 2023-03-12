#! /usr/bin/env node
const { program } = require('commander')
const myhelp = require('../lib/core/help')
const myCommander = require('../lib/core/mycommander')
myhelp(program)
myCommander(program)

/**
 * 1.0
 * */ 
// console.log('mycli')

// console.log(process.argv)

// program.option('-f --framework <framework>', '设置框架')
/**
 * 2.0
 * */ 
// program
// .command('create <project> [other...]')
// .alias('crt')
// .description('创建项目')
// .action((project, args) => { 
//   // 命令行执行的逻辑代码
//   console.log(project)
//   console.log(args)
// })

program.parse(process.argv)