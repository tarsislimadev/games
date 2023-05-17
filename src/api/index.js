const net = require('net')

const app = require('./app.js')

const { http: { port: PORT } } = require('./config.js')
const { Request, Response } = require('./libs/http/')

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const req = new Request(data)
    const res = new Response(req)
    //
    socket.write(app.run(req, res).toString())
    //
    socket.end()
  })
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
