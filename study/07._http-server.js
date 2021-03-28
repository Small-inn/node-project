const http = require('http')
const fs = require('fs')

http.createServer(function(req, res) {
    console.log(req.url)
    if (req.url == '/favicon.ico') {
        res.writeHead(200)
        res.end()
        return
    }
    res.writeHead(200)
    fs.createReadStream(__dirname + '/static/01._index.html').pipe(res)
}).listen(3000)