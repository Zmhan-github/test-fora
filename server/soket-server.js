const socketIO = require('socket.io')

const Room = require('./models/room')


module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    console.log('connection')

    Room.findAll()
    .then(data => {
      io.emit('rooms all', data)
    })
    .catch(err => {
      console.log(err)
    })

    socket.on('join room', (data) => {
      socket.room = data.room
      socket.join(data.room)
    })

    socket.on('room add', (data) => {

      Room.create({ name: data.name })
      .then(room => {
        io.emit('room add', room)
      })
      .catch(err => {
        console.log(err)
      })

    })


    socket.on('message add', (data) => {
      io.to(socket.room).emit('message add', data)
    })

    socket.on('disconnect', (data) => {
      socket.leave(socket.room)
    })

  })
};