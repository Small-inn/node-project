const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const express = require('express')

const game = require('./static/game')
const parseurl = require('parseurl')

// 用户赢了三次及以上
let playerWon = 0
// 连续三次相同的动作
let playLastAction = null
let sameCount = 0

const app = express()

// app.use((req, res) => {

// })

// 路径
app.get('/favicon.ico', (req, res) => {
    res.status(200)
    return
})

app.get('/', (req, res) => {
    res.status(200)
    // fs.createReadStream(__dirname + '/static/02._index.html').pipe(res)
    res.send(fs.readFileSync(__dirname + '/static/02._index.html', 'utf-8'))
})

app.get('/game', 
    (req, res, next) => {
        // 连续赢三次
        if (playerWon >= 3 || sameCount === 99) {
            res.status(500)
            res.send('再也不和你玩了！')
            return
        }
        next()

        if (res.playerWon) {
            playerWon++
        }
    }, 
    (req, res, next) => {
        const query = req.query
        const { action } = query

        
        // 连续出三次同样的动作
        if (playLastAction && action === playLastAction) {
            sameCount++ 
        } else {
            sameCount = 0
        }

        if (sameCount >= 3) {
            res.status(400)
            res.send('你无赖！')
            sameCount = 99
            return
        }

        playLastAction = action
        res.action = action

        next()

    }, 
    (req, res) => {
        const action = res.action
        const gameResult = game(action)
        if (gameResult === 0) {
            res.send('平局！')
        } else if (gameResult === 1) {
            res.send('你赢了！')
            res.playerWon = true
        } else {
            res.send('你输了！')
        }
    }
)

app.listen(3000)
