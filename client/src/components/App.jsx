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
    let socket = this.socket = io('http://localhost:3000/')
    socket.on('connect', this.onConnect.bind(this))
    socket.on('disconnect', this.onDisconnect.bind(this))
    socket.on('room add', this.onAddRoom.bind(this))
    socket.on('message add', this.onMessageAdd.bind(this))
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
    let { rooms } = this.state
    this.socket.emit('room add', { id: rooms.length, name })
  }

  setRoom(activeRoom) {
    this.setState({ activeRoom })
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
              users={this.state.users}
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