var express = require('express');

const router = express.Router();
const { getList, getDetail } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModal')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  // 管理员界面
  if (req.query.isAdmin) {
    if (req.session.username == null) {
      console.error('is admin, but no login')
      res.json(new SuccessModel('未登录'))
      return
    }
  }

  // 强制查询自己博客
  author = req.session.username

  const result = getList(author, keyword)
  return result.then(listData => {
    return res.json(new SuccessModel(listData))
  })
});

router.get('/detail', function(req, res, next) {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
      res.json(
          new SuccessModel(data)
      )
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
      if (val) {
          res.json(
              new SuccessModel()
          )
      } else {
          res.json(
              new ErrorModel('更新博客失败')
          )
      }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  return result.then(val => {
      if (val) {
          res.json(
              new SuccessModel()
          )
      } else {
          res.json(
              new ErrorModel('删除博客失败')
          )
      }
  })
})

// router.post('/new', loginCheck)

module.exports = router;