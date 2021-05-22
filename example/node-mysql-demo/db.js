/*
 * @Author: lx 
 * @Date: 2021-05-Fr 11:14:34 
 * @Last Modified by: lx
 * @Last Modified time: 2021-05-Fr 11:14:34 
 */

const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'testblog'
})

// 开始连接
con.connect()

const sql = 'select * from user;'

// 执行语句
con.query(sql, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(res)
})

// 关闭连接
con.end()
