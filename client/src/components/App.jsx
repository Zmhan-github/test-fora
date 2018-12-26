import  React, { Component } from 'react'
import io from 'socket.io-client'
import RoomSection from './rooms/RoomSection'
import UserSection from './users/UserSection'
import MessageSection from './messages/MessageSection';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      users: [],
      messages: [],
      activeRoom: {},
      connected: false
    }
  }

  componentDidMount() {
    let socket = this.socket = io('http://localhost:3006/')
    socket.on('connect', this.onConnect.bind(this))
    socket.on('disconnect', this.onDisconnect.bind(this))
    socket.on('room add', this.onAddRoom.bind(this))
    socket.on('rooms all', this.onShowAllRooms.bind(this))
    socket.on('message add', this.onMessageAdd.bind(this))
  }
  onShowAllRooms(roomsServer) {

    let { rooms } = this.state
    let { roomId } = this.props
    rooms = roomsServer
    this.setState({ rooms })

    if (roomsServer.length < 1) {
      return;
    } else {
      if (roomId) {
        let activeRoomArray = roomsServer.filter(room => room.id === roomId)
        this.setRoom(activeRoomArray[0])
      }
    }
  }
  onMessageAdd(message) {
    let { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  onConnect(){
    this.setState({ connected: true })
  }
  onDisconnect(){
    this.setState({ connected: false })
  }

  onAddRoom(room) {
    let { rooms } = this.state
    rooms.push(room)
    this.setState({ rooms })
  }

  addRoom(name) { // TODO: send to server
    this.socket.emit('room add', { name })
  }

  setRoom(activeRoom) {
    // Todo: messages filter id
    this.setState({ messages: [] })
    this.setState({ activeRoom })
    
    this.socket.emit('join room', { room: activeRoom.id })
  }

  setUserName(name) {
    let { users } = this.state
    users.push({ id: users.length, name})
    this.setState({ users })
  }

  addMessage(body) {
    let { activeRoom, messages, users } = this.state
    let createdAt = new Date()
    let author = users.length > 0 ? users[0].name : 'anonymous'
    this.socket.emit('message add', {
      id: messages.length,
      roomId: activeRoom.id,
      body,
      createdAt,
      author
    })
  }

    render() {
      return (
        <div className="app">
          <div className="nav">
            <RoomSection
              {...this.state}
              addRoom={this.addRoom.bind(this)}
              setRoom={this.setRoom.bind(this)}
            />
            <UserSection
              {...this.state}
              setUserName={this.setUserName.bind(this)}
            />
          </div>
          <MessageSection
            {...this.state}
            addMessage={this.addMessage.bind(this)}
          />
        </div>
      )
    }
}

export default App