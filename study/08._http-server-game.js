const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')


const game = require('./static/game')

let playerWon = 0

let playLastAction = null
let sameCount = 0

http.createServer(function(req, res) {
    console.log(req.url)
    const { pathname, query } = url.parse(req.url)

    if (pathname === '/favicon.ico') {
        res.writeHead(200)
        res.end()
        return
    }

    if (pathname === '/game') {
        const { action } = querystring.parse(query)
        // console.log(game(action))
        const gameResult = game(action)

        // 连续赢三次
        if (playerWon >= 3 || sameCount === 99) {
            res.writeHead(500)
            res.end('再也不和你玩了！')
            return
        }

        // 连续出三次同样的动作
        if (playLastAction && action === playLastAction) {
            sameCount++ 
        } else {
            sameCount = 0
        }
        playLastAction = action

        if (sameCount >= 3) {
            res.writeHead(400)
            res.end('你无赖！')
            sameCount = 99
            return
        }

        
        if (gameResult === 0) {
            res.end('平局！')
        } else if (gameResult === 1) {
            res.end('你赢了！')
            playerWon++
        } else {
            res.end('你输了！')
        }
        
    }

    if (pathname === '/') {
        fs.createReadStream(__dirname + '/static/02._index.html').pipe(res)
    }
    
}).listen(3000)