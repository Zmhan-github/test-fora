const socketIO = require('socket.io')

module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    console.log('connection')

    socket.on('room add', (data) => {
      io.emit('room add', data)
    })


    socket.on('message add', (data) => {
      io.emit('message add', data)
    })

  })
};