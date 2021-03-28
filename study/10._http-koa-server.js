const fs = require('fs')
const koa = require('koa')
const mount = require('koa-mount')

const game = require('./static/game')


// 用户赢了三次及以上
let playerWon = 0
// 连续三次相同的动作
let playLastAction = null
let sameCount = 0

const app = new koa()

app.use(
    mount('/favicon.ico', (ctx) => {
        // koa比express做了更极致的response处理函数
        // 因为koa使用异步函数作为中间件的实现方式
        // 所以koa可以在等待所有中间件执行完毕之后再统一处理返回值，因此可以用赋值运算符
        ctx.status = 200
    })
)

const gameKoa = new koa()

app.use(
    mount(
        '/game', 
        gameKoa
    )
)

gameKoa.use(
    async (ctx, next) => {
        // 连续赢三次
        if (playerWon >= 3) {
            ctx.status = 500
            ctx.body = '我不玩了'
            return
        }

        await next()

        if (ctx.playerWon) {
            playerWon++
        }
    }
)

gameKoa.use(
    async (ctx, next) => {
        const query = ctx.query
        const action = query.action

        if (!action) {
            ctx.status = 400
            return
        }

        if (sameCount === 99) {
            ctx.status = 500
            ctx.body = '再也不和你玩了！'
        }

        if (playLastAction === action) {
            sameCount++
            if (sameCount >= 3) {
                ctx.status = 400
                ctx.body = '你作弊！我不玩了'
                sameCount = 99
                return
            } 
        } else {
            sameCount = 0
        }

        playLastAction = action
        ctx.action = action

        await next()
    }
)

gameKoa.use(
    async (ctx, next) => {
        const action = ctx.action
        const gameResult = game(action)

        await new Promise((resolve) => {
            setTimeout(() => {
                ctx.status = 200
                if (gameResult === 0) {
                    ctx.body = '平局！'
                } else if (gameResult === 1) {
                    ctx.body = '你赢了！'
                    ctx.playerWon = true
                } else {
                    ctx.body = '你输了！'
                }
                resolve()
            }, 500)
        })
    }
)

app.use(
    mount('/', (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/static/02._index.html', 'utf-8')
    })
)

app.listen(3000)
