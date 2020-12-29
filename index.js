const http = require('http')
const fs = require('fs')
const db = require('./db')

const server = http.createServer(async (req,res)=>{
    if(req.url == '/' && req.method == 'GET'){
        fs.readFile('./views/index.html',(err, file)=>{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(file, 'utf8')
            res.end()
        })
    }
    if(req.url == '/ahora' && req.method == 'GET'){
        res.writeHead(200,{'Content-Type': 'application/json'})
        const results = await db.getDate()
        res.write(JSON.stringify(results))
        res.end()
    }
})
server.listen(3000, () => console.log('escuchando en puerto 3000'))